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

    const totalRecord = await prisma.News.findMany({
      where: {
        status: 1,
      },
    });

    const totalRecordPerPage = await prisma.News.findMany({
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
      .setResponse({ news: result, pagination: pagination })
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
    const foundNews = await prisma.News.findFirst({
      where: {
        ID: id,
        status: 1,
      },
    });
    if (!foundNews) {
      return new Response(res)
        .setID(0)
        .setStatusCode(404)
        .setMessage("No data found.")
        .send();
    }
    const createdAtFormat = dayjs(foundNews.created_at);
    const updatedAtFormat = dayjs(foundNews.updated_at);
    foundNews.created_at = createdAtFormat.format("DD-MMM-YYYY h:mm A");
    foundNews.updated_at = updatedAtFormat.format("DD-MMM-YYYY h:mm A");
    return new Response(res).setResponse(foundNews).setID(1).send();
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
    const content = req.query.content;
    const created_by = req.query.created_by;

    // pagination
    let page = parseInt(req.query.page) || 1;
    let limit = 2;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const newsList = await prisma.News.findMany({
      where: {
        title: { contains: title },
        content: content,
        created_by: created_by,
        status: 1,
      },
    });

    if (newsList.length == 0) {
      return new Response(res)
        .setID(0)
        .setStatusCode(404)
        .setMessage("No data found.")
        .send();
    }
    const news = newsList.slice(startIndex, endIndex);

    news.forEach((cat) => {
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
      tagId
    } = body;

    if (!title) {
      return new Response(res)
        .setID(0)
        .setStatusCode(400)
        .setMessage("News title is required.")
        .send();
    }
    const foundNews = await prisma.News.findFirst({
      where: { title: title },
    });
    if (!foundNews) {
      const news = await prisma.News.create({
        data: {
          categoryId: categoryId,
          authorId: authorId,
          userId: userId,
          title: title,
          image: image,
          short_description: short_description,
          content: content,
          created_by: req.user.username,
        },
      });

      await prisma.NewsTags.create({
        data: {
          newsId: news.ID,
          tagId: tagId,
          created_by: news.created_by,
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
    } = body;

    if (!title) {
      return new Response(res)
        .setID(0)
        .setStatusCode(400)
        .setMessage("title is required.")
        .send();
    }

    const foundNews = await prisma.News.findFirst({
      where: { ID: id, status: 1 },
    });
    console.log("data: " + foundNews);
    if (!foundNews) {
      return new Response(res)
        .setID(0)
        .setStatusCode(404)
        .setMessage("No data found.")
        .send();
    }

    const checkRecordExist = await prisma.News.findFirst({
      where: { title: title },
    });

    if (checkRecordExist && checkRecordExist?.ID != id) {
      return new Response(res)
        .setID(0)
        .setStatusCode(400)
        .setMessage("News already exist.")
        .send();
    } else {
      await prisma.News.update({
        where: { ID: id },
        data: {
          categoryId,
          authorId,
          userId,
          title,
          image,
          short_description,
          content,
          updated_by: req.user.username
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
    const foundNews = await prisma.News.findFirst({
      where: { ID: id, status: 1 },
    });

    if (!foundNews) {
      return new Response(res)
        .setID(0)
        .setStatusCode(404)
        .setMessage("No data found.")
        .send();
    }
    await prisma.News.update({
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
