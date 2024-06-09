const Response = require("../responseBody/Response");
const { PrismaClient } = require("@prisma/client");
const dayjs = require("dayjs");
const prisma = new PrismaClient();

const getNewsTag = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = 10;
    let result = [];
    let recordSkip = (page - 1) * limit;

    const totalRecord = await prisma.NewsTags.findMany({
      where: {
        status: 1,
      },
    });

    const totalRecordPerPage = await prisma.NewsTags.findMany({
      where: { status: 1 },
      skip: recordSkip,
      take: limit,
      orderBy: { ID: "desc" },
    });

    totalRecordPerPage.forEach((cat) => {
      const createdAtFormat = dayjs(cat.created_at);
      const updatedAtFormat = dayjs(cat.updated_at);
      cat.created_at = createdAtFormat.format("DD-MMM-YYYY h:mm A");
      cat.updated_at = updatedAtFormat.format("DD-MMM-YYYY h:mm A");
      result.push(cat);
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
      .setResponse({ NewsTags: result, pagination: pagination })
      .setID(1)
      .send();
  } catch (err) {
    console.log("Error getNewsTags:" + err.message);
    return new Response(res)
      .setID(0)
      .setStatusCode(500)
      .setMessage("Something went wrong.")
      .send();
  }
};

const getNewsTagByID = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const foundNewsTag = await prisma.NewsTags.findFirst({
      where: {
        ID: id,
        status: 1,
      },
    });
    if (!foundNewsTag) {
      return new Response(res)
        .setID(0)
        .setStatusCode(404)
        .setMessage("No data found.")
        .send();
    }
    const createdAtFormat = dayjs(foundNewsTag.created_at);
    const updatedAtFormat = dayjs(foundNewsTag.updated_at);
    foundNewsTag.created_at = createdAtFormat.format("DD-MMM-YYYY h:mm A");
    foundNewsTag.updated_at = updatedAtFormat.format("DD-MMM-YYYY h:mm A");
    return new Response(res).setResponse(foundNewsTag).setID(1).send();
  } catch (err) {
    console.log("Error getNewsTagByID:" + err.message);
    return new Response(res)
      .setID(0)
      .setStatusCode(500)
      .setMessage("Something went wrong.")
      .send();
  }
};

const addNewsTag = async (req, res) => {
  try {
    const body = req.body;
    const {
      newsId,
      tagId,
    } = body;

    await prisma.NewsTags.create({
      data: {
        newsId: newsId,
        tagId: tagId,
        created_by: req.user.username,
      },
    });
    return new Response(res)
      .setID(1)
      .setStatusCode(201)
      .setMessage("NewsTag created successfully.")
      .send();

  } catch (err) {
    console.log("Error addNewsTag:" + err.message);
    return new Response(res)
      .setID(0)
      .setStatusCode(500)
      .setMessage("Something went wrong.")
      .send();
  }
};

const updateNewsTag = async (req, res) => {
  try {
    const body = req.body;
    const {
      id,
      newsId,
      tagId,
    } = body;

    const foundNewsTag = await prisma.NewsTags.findFirst({
      where: { ID: id, status: 1 },
    });
    console.log("data: " + foundNewsTag);
    if (!foundNewsTag) {
      return new Response(res)
        .setID(0)
        .setStatusCode(404)
        .setMessage("No data found.")
        .send();
    }

    await prisma.NewsTags.update({
      where: { ID: id },
      data: {
        newsId: newsId,
        tagId: tagId,
        updated_by: req.user.username,
      },
    });
    return new Response(res)
      .setID(1)
      .setMessage("NewsTags updated successfully.")
      .send();

  } catch (err) {
    console.log("Error updateNewsTags:" + err.message);
    return new Response(res)
      .setID(0)
      .setStatusCode(500)
      .setMessage("Something went wrong.")
      .send();
  }
};

const deleteNewsTag = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return new Response(res)
        .setID(0)
        .setStatusCode(400)
        .setMessage("ID must be a number.").send;
    }
    const foundNewsTags = await prisma.NewsTags.findFirst({
      where: { ID: id, status: 1 },
    });

    if (!foundNewsTags) {
      return new Response(res)
        .setID(0)
        .setStatusCode(404)
        .setMessage("No data found.")
        .send();
    }
    await prisma.NewsTags.update({
      where: { ID: id },
      data: {
        status: 0,
      },
    });
    return new Response(res)
      .setID(1)
      .setMessage("NewsTags deleted successfully.")
      .send();
  } catch (err) {
    console.log("Error deleteNewsTags:" + err.message);
    return new Response(res)
      .setID(0)
      .setStatusCode(500)
      .setMessage("Something went wrong.")
      .send();
  }
};

module.exports = {
  getNewsTag,
  addNewsTag,
  updateNewsTag,
  getNewsTagByID,
  deleteNewsTag,
};
