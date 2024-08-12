const Response = require("../responseBody/Response");
const { PrismaClient } = require("@prisma/client");
const dayjs = require("dayjs");
const prisma = new PrismaClient();
// const { v4: uuidv4 } = require('uuid');

const getNews = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(process.env.PAGESIZE);
    let result = [];
    let recordSkip = (page - 1) * limit;

    const totalRecord = await prisma.News.findMany({
      where: {
        status: 1,
      },
    });

    const newsList = await prisma.news.findMany({
      where: { status: 1 },
      include: {
        category: true,
        author: true,
        user: true,
        tag: true,
      },
      skip: recordSkip,
      take: limit,
      orderBy: { updated_at: "desc" },
    });

    newsList.forEach((news) => {
      const createdAtFormat = dayjs(news.created_at);
      const updatedAtFormat = dayjs(news.updated_at);
      news.created_at = createdAtFormat.format("DD-MMM-YYYY h:mm A");
      news.updated_at = updatedAtFormat.format("DD-MMM-YYYY h:mm A");
      news.image = `http://localhost:${process.env.PORT}/api/image/${getImage(news.image)}`;
      result.push(news);
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

function getImage(image) {
  if (image === null) {
    return "default-profile.jpg";
  } else {
    return image;
  }
}

const getCountNews = async (req, res) => {
  try {
    const countNews = await prisma.News.count({
      where: {
        status: 1,
      },
    });

    return new Response(res).setResponse(countNews).setID(1).send();
  } catch (error) { // You had err here, but the variable is named error
    console.log("Error getCountNews:" + error.message);
    return new Response(res)
      .setID(0)
      .setStatusCode(500)
      .setMessage("Something went wrong.")
      .send();
  }
}

const getNewsByID = async (req, res) => {

  try {
    const id = parseInt(req.params.id);
    const foundNews = await prisma.News.findFirst({
      where: {
        ID: id,
        status: 1,
      },
      include: {
        category: true,
        author: true,
        user: true,
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
    foundNews.image = `http://localhost:${process.env.PORT}/api/image/${getImage(foundNews.image)}`;
    return new Response(res)
    .setResponse({ news: foundNews })
    .setID(1)
    .send();
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
    // const categoryname = req.query.categoryname;
    // const created_by = req.query.created_by;

    // pagination
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(process.env.PAGESIZE);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let recordSkip = (page - 1) * limit;

    // const category = await prisma.categories.findFirst({
    //   where: {
    //     name: { contains: categoryname },
    //     status: 1
    //   }
    // })

    // console.log("category ", category);

    const newsList = await prisma.news.findMany({
      include: {
        category: true,
        author: true,
        user: true,
        tag: true,
      },

      where: {
        title: { contains: title },
        // categoryId: category.ID,
        // created_by: created_by,
        status: 1,
      },
      skip: recordSkip,
      take: limit,
      orderBy: { updated_at: "desc" },
    });

    if (newsList.length == 0) {
      return new Response(res)
        .setID(0)
        .setStatusCode(404)
        .setMessage("No data found.")
        .send();
    }
    const news = newsList.slice(startIndex, endIndex);

    newsList.forEach((news) => {
      const createdAtFormat = dayjs(news.created_at);
      const updatedAtFormat = dayjs(news.updated_at);
      news.created_at = createdAtFormat.format("DD-MMM-YYYY h:mm A");
      news.updated_at = updatedAtFormat.format("DD-MMM-YYYY h:mm A");
      news.image = `http://localhost:${process.env.PORT}/api/image/${getImage(news.image)}`;
      result.push(news);
    });

    const total_page = Math.ceil(newsList.length / limit);
    const pagination = {
      total_record: newsList.length,
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
      tagId,
      title,
      short_description,
      content,
      image
    } = body;

    if (!title) {
      return new Response(res)
        .setID(0)
        .setStatusCode(400)
        .setMessage("News title is required.")
        .send();
    }

    const foundNews = await prisma.news.findFirst({
      where: { title: title },
    });

    if (!foundNews) {
      const news = await prisma.News.create({
        data: {
          categoryId: categoryId,
          authorId: authorId,
          userId: userId,
          tagId: tagId,
          title: title,
          image: image,
          short_description: short_description,
          content: content,
          created_by: req.user.username,
          updated_by: req.user.username,
        },
      });

      // await prisma.NewsTags.create({
      //   data: {
      //     newsId: news.ID,
      //     tagId: tagId,
      //     created_by: news.created_by,
      //   },
      // });

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

const uploadImage = async (req, res) => {
  new Response(res)
    .setResponse({ filename: req.file.filename })
    .setID(1)
    .send();

}

const updateNews = async (req, res) => {
  try {
    const body = req.body;
    const {
      id,
      categoryId,
      authorId,
      userId,
      tagId,
      title,
      image,
      short_description,
      content
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
          tagId,
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
  getCountNews,
  getNewsByID,
  getNewsByFilter,
  addNews,
  updateNews,
  deleteNews,
  uploadImage
};
