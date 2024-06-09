const Response = require("../responseBody/Response");
const { PrismaClient } = require("@prisma/client");
const dayjs = require("dayjs");
const prisma = new PrismaClient();

const getNews = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = 10;
    let result = [];
    let recordSkip = (page - 1) * limit;

    const totalRecord = await prisma.categories.findMany({
      where: {
        status: 1,
      },
    });

    const totalRecordPerPage = await prisma.categories.findMany({
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
      .setResponse({ categories: result, pagination: pagination })
      .setID(1)
      .send();
  } catch (err) {
    console.log("Error getNews:" + err.message);
    return new Response(res)
      .setID(0)
      .setStatusCode(500)
      .setMessage("Something went wrong.")
      .send();
  }
};

const getNewsByID = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const foundCategory = await prisma.categories.findFirst({
      where: {
        ID: id,
        status: 1,
      },
    });
    if (!foundCategory) {
      return new Response(res)
        .setID(0)
        .setStatusCode(404)
        .setMessage("No data found.")
        .send();
    }
    const createdAtFormat = dayjs(foundCategory.created_at);
    const updatedAtFormat = dayjs(foundCategory.updated_at);
    foundCategory.created_at = createdAtFormat.format("DD-MMM-YYYY h:mm A");
    foundCategory.updated_at = updatedAtFormat.format("DD-MMM-YYYY h:mm A");
    return new Response(res).setResponse(foundCategory).setID(1).send();
  } catch (err) {
    console.log("Error getNewsByID:" + err.message);
    return new Response(res)
      .setID(0)
      .setStatusCode(500)
      .setMessage("Something went wrong.")
      .send();
  }
};

const getNewsByFilter = async (req, res) => {
  try {
    const result = [];
    const title = req.query.title;
    const created_by = req.query.created_by;

    // pagination
    let page = parseInt(req.query.page) || 1;
    let limit = 2;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const categoryList = await prisma.categories.findMany({
      where: {
        title: { contains: title },
        created_by: created_by,
        status: 1,
      },
    });

    if (categoryList.length == 0) {
      return new Response(res)
        .setID(0)
        .setStatusCode(404)
        .setMessage("No data found.")
        .send();
    }
    const categories = categoryList.slice(startIndex, endIndex);

    categories.forEach((cat) => {
      const createdAtFormat = dayjs(cat.created_at);
      const updatedAtFormat = dayjs(cat.updated_at);
      cat.created_at = createdAtFormat.format("DD-MMM-YYYY h:mm A");
      cat.updated_at = updatedAtFormat.format("DD-MMM-YYYY h:mm A");
      result.push(cat);
    });

    const total_page = Math.ceil(categoryList.length / limit);
    const pagination = {
      total_record: categoryList.length,
      limit: limit,
      current_page: page,
      total_page: total_page,
      has_next: page < total_page,
    };
    return new Response(res)
      .setResponse({ categories: result, pagination: pagination })
      .setID(1)
      .send();
  } catch (err) {
    console.log("Error getNewsByFilter:" + err.message);
    return new Response(res)
      .setID(0)
      .setStatusCode(500)
      .setMessage("Something went wrong.")
      .send();
  }
};

const addNews = async (req, res) => {
  try {
    const body = req.body;
    const {
      categoryId,
      authorId,
      userId,
      title,
      image,
      short_description,
      content,
      created_by
    } = body;

    if (!title) {
      return new Response(res)
        .setID(0)
        .setStatusCode(400)
        .setMessage("News title is required.")
        .send();
    }
    const foundCategory = await prisma.categories.findFirst({
      where: { name: title },
    });
    if (!foundCategory) {
      await prisma.categories.create({
        data: {
          categoryId: categoryId,
          authorId: authorId,
          userId: userId,
          name: title,
          image: image,
          short_description: short_description,
          content: content,
          created_by: created_by,
        },
      });
      return new Response(res)
        .setID(1)
        .setStatusCode(201)
        .setMessage("News created successfully.")
        .send();
    }
    return new Response(res)
      .setID(0)
      .setStatusCode(400)
      .setMessage("News already exist.")
      .send();
  } catch (err) {
    console.log("Error addNews:" + err.message);
    return new Response(res)
      .setID(0)
      .setStatusCode(500)
      .setMessage("Something went wrong.")
      .send();
  }
};

const updateNews = async (req, res) => {
  try {
    const body = req.body;
    const {
      id,
      categoryId,
      authorId,
      userId,
      title,
      image,
      short_description,
      content,
      created_by
    } = body;

    if (!title) {
      return new Response(res)
        .setID(0)
        .setStatusCode(400)
        .setMessage("title is required.")
        .send();
    }

    const foundCategory = await prisma.categories.findFirst({
      where: { ID: id, status: 1 },
    });
    console.log("data: " + foundCategory);
    if (!foundCategory) {
      return new Response(res)
        .setID(0)
        .setStatusCode(404)
        .setMessage("No data found.")
        .send();
    }

    const checkRecordExist = await prisma.categories.findFirst({
      where: { name: title },
    });

    if (checkRecordExist && checkRecordExist?.ID != id) {
      return new Response(res)
        .setID(0)
        .setStatusCode(400)
        .setMessage("News already exist.")
        .send();
    } else {
      await prisma.categories.update({
        where: { ID: id },
        data: {
          ID,
          categoryId,
          authorId,
          userId,
          title,
          image,
          short_description,
          content,
          created_by
        },
      });
      return new Response(res)
        .setID(1)
        .setMessage("News updated successfully.")
        .send();
    }
  } catch (err) {
    console.log("Error updateNews:" + err.message);
    return new Response(res)
      .setID(0)
      .setStatusCode(500)
      .setMessage("Something went wrong.")
      .send();
  }
};

const deleteNews = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return new Response(res)
        .setID(0)
        .setStatusCode(400)
        .setMessage("ID must be a number.").send;
    }
    const foundCategory = await prisma.categories.findFirst({
      where: { ID: id, status: 1 },
    });

    if (!foundCategory) {
      return new Response(res)
        .setID(0)
        .setStatusCode(404)
        .setMessage("No data found.")
        .send();
    }
    await prisma.categories.update({
      where: { ID: id },
      data: {
        status: 0,
      },
    });
    return new Response(res)
      .setID(1)
      .setMessage("News deleted successfully.")
      .send();
  } catch (err) {
    console.log("Error deleteNews:" + err.message);
    return new Response(res)
      .setID(0)
      .setStatusCode(500)
      .setMessage("Something went wrong.")
      .send();
  }
};

module.exports = {
  getNews,
  addNews,
  updateNews,
  getNewsByID,
  deleteNews,
  getNewsByFilter,
};
