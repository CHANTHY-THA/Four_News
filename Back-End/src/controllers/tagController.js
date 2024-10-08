const Response = require("../responseBody/Response");
const { PrismaClient } = require("@prisma/client");
const dayjs = require("dayjs");
const prisma = new PrismaClient();

const getTags = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit =
      parseInt(req.query.itemPerPage) || parseInt(process.env.PAGESIZE);
    let result = [];
    let recordSkip = (page - 1) * limit;

    let search = req.query.search || "";
    let whereConditions = {};
    if (search) {
      whereConditions.OR = [
        { name: { contains: search } },
        { created_by: { contains: search } },
      ];
    }
    whereConditions.status = 1;

    const totalRecord = await prisma.tags.findMany({
      where: whereConditions,
    });

    if (limit == -1) {
      recordSkip = 0;
      limit = totalRecord.length;
    }

    const totalRecordPerPage = await prisma.tags.findMany({
      where: whereConditions,
      skip: recordSkip,
      take: limit,
      orderBy: { ID: "desc" },
    });

    totalRecordPerPage.forEach((t) => {
      const createdAtFormat = dayjs(t.created_at);
      const updatedAtFormat = dayjs(t.updated_at);
      t.created_at = createdAtFormat.format("DD-MMM-YYYY h:mm A");
      t.updated_at = updatedAtFormat.format("DD-MMM-YYYY h:mm A");
      result.push(t);
    });

    const total_page = Math.ceil(totalRecord.length / limit);
    const pagination = {
      total_record: totalRecord.length,
      limit: limit,
      current_page: page,
      total_page: total_page,
      has_next: page < total_page,
    };
    return new Response(res)
      .setResponse({ tags: result, pagination: pagination })
      .setID(1)
      .send();
  } catch (err) {
    console.log("Error getTags:" + err.message);
    return new Response(res)
      .setID(0)
      .setStatusCode(500)
      .setMessage("Something went wrong.")
      .send();
  }
};

const getTagByID = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const foundTag = await prisma.tags.findFirst({
      where: {
        ID: id,
        status: 1,
      },
    });
    if (!foundTag) {
      return new Response(res)
        .setID(0)
        .setStatusCode(404)
        .setMessage("No data found.")
        .send();
    }
    const createdAtFormat = dayjs(foundTag.created_at);
    const updatedAtFormat = dayjs(foundTag.updated_at);
    foundTag.created_at = createdAtFormat.format("DD-MMM-YYYY h:mm A");
    foundTag.updated_at = updatedAtFormat.format("DD-MMM-YYYY h:mm A");
    return new Response(res).setResponse(foundTag).setID(1).send();
  } catch (err) {
    console.log("Error getTagByID:" + err.message);
    return new Response(res)
      .setID(0)
      .setStatusCode(500)
      .setMessage("Something went wrong.")
      .send();
  }
};

const getTagByFilter = async (req, res) => {
  try {
    const result = [];
    const name = req.query.name;
    const created_by = req.query.created_by;

    // pagination
    let page = parseInt(req.query.page) || 1;
    let limit =
      parseInt(req.query.itemPerPage) || parseInt(process.env.PAGESIZE);
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;

    let search = req.query.search || "";
    let whereConditions = { status: 1 };

    if (search) {
      whereConditions.OR = [
        { name: { contains: search } },
        { created_by: { contains: search } },
      ];
    }

    if (created_by) {
      whereConditions.created_by = { contains: created_by.toLowerCase() };
    }

    if (name) {
      whereConditions.name = { contains: name.toLowerCase() };
    }
    let tagList = await prisma.tags.findMany({
      where: whereConditions,
    });
    // if (created_by != "") {
    //   tagList = tagList.filter((tag) => tag.created_by == created_by);
    // }
    // if (name != "") {
    //   tagList = tagList.filter((tag) =>
    //     tag.name.toLowerCase().includes(name.toLowerCase())
    //   );
    // }

    if (limit == -1) {
      startIndex = 0;
      limit = tagList.length;
      endIndex = limit;
    }

    if (tagList.length == 0) {
      return new Response(res)
        .setID(0)
        .setStatusCode(404)
        .setMessage("No data found.")
        .send();
    }
    const tags = tagList.slice(startIndex, endIndex);

    tags.forEach((t) => {
      const createdAtFormat = dayjs(t.created_at);
      const updatedAtFormat = dayjs(t.updated_at);
      t.created_at = createdAtFormat.format("DD-MMM-YYYY h:mm A");
      t.updated_at = updatedAtFormat.format("DD-MMM-YYYY h:mm A");
      result.push(t);
    });
    const total_page = Math.ceil(tagList.length / limit);
    const pagination = {
      total_record: tagList.length,
      limit: limit,
      current_page: page,
      total_page: total_page,
      has_next: page < total_page,
    };
    return new Response(res)
      .setResponse({ tags: result, pagination: pagination })
      .setID(1)
      .send();
  } catch (err) {
    console.log("Error getTagByFilter:" + err.message);
    return new Response(res)
      .setID(0)
      .setStatusCode(500)
      .setMessage("Something went wrong.")
      .send();
  }
};

const addTag = async (req, res) => {
  try {
    const body = req.body;
    const { name } = body;

    if (!name) {
      return new Response(res)
        .setID(0)
        .setStatusCode(400)
        .setMessage("Tag name is required.")
        .send();
    }
    const foundTag = await prisma.tags.findFirst({ where: { name: name } });
    if (!foundTag) {
      await prisma.tags.create({
        data: {
          name: name,
          created_by: req.user.username,
        },
      });
      return new Response(res)
        .setID(1)
        .setStatusCode(201)
        .setMessage("Tag created successfully.")
        .send();
    }
    return new Response(res)
      .setID(0)
      .setStatusCode(400)
      .setMessage("Tag already exist.")
      .send();
  } catch (err) {
    console.log("Error addTag:" + err.message);
    return new Response(res)
      .setID(0)
      .setStatusCode(500)
      .setMessage("Something went wrong.")
      .send();
  }
};

const updateTag = async (req, res) => {
  try {
    const body = req.body;
    const { name, id } = body;
    if (!name) {
      return new Response(res)
        .setID(0)
        .setStatusCode(400)
        .setMessage("name is required.")
        .send();
    }

    const foundTag = await prisma.tags.findFirst({
      where: { ID: id, status: 1 },
    });
    console.log("data: " + foundTag);
    if (!foundTag) {
      return new Response(res)
        .setID(0)
        .setStatusCode(404)
        .setMessage("No data found.")
        .send();
    }

    const checkRecordExist = await prisma.tags.findFirst({
      where: { name: name },
    });

    if (checkRecordExist && checkRecordExist?.ID != id) {
      return new Response(res)
        .setID(0)
        .setStatusCode(400)
        .setMessage("Tag already exist.")
        .send();
    } else {
      await prisma.tags.update({
        where: { ID: id },
        data: {
          name: name,
          updated_by: req.user.username,
        },
      });
      return new Response(res)
        .setID(1)
        .setMessage("Tag updated successfully.")
        .send();
    }
  } catch (err) {
    console.log("Error updateTag:" + err.message);
    return new Response(res)
      .setID(0)
      .setStatusCode(500)
      .setMessage("Something went wrong.")
      .send();
  }
};

const deleteTag = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return new Response(res)
        .setID(0)
        .setStatusCode(400)
        .setMessage("ID must be a number.").send;
    }
    const foundTag = await prisma.tags.findFirst({
      where: { ID: id, status: 1 },
    });

    if (!foundTag) {
      return new Response(res)
        .setID(0)
        .setStatusCode(404)
        .setMessage("No data found.")
        .send();
    }
    await prisma.tags.update({
      where: { ID: id },
      data: {
        status: 0,
      },
    });
    return new Response(res)
      .setID(1)
      .setMessage("Tag deleted successfully.")
      .send();
  } catch (err) {
    console.log("Error deleteTag:" + err.message);
    return new Response(res)
      .setID(0)
      .setStatusCode(500)
      .setMessage("Something went wrong.")
      .send();
  }
};

module.exports = {
  getTags,
  getTagByID,
  getTagByFilter,
  addTag,
  updateTag,
  deleteTag,
};
