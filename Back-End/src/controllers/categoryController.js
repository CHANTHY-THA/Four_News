const Response = require("../responseBody/Response");
const { PrismaClient } = require("@prisma/client");
const dayjs = require("dayjs");
const prisma = new PrismaClient();

const getCategories = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.itemPerPage) || parseInt(process.env.PAGESIZE);
    let result = [];
    let recordSkip = (page - 1) * limit;

    const totalRecord = await prisma.categories.findMany({
      where: {
        status: 1,
      },
    });
    if(limit == -1){
      recordSkip = 0;
      limit=totalRecord.length;
    }

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
    console.log("Error getCategories:" + err.message);
    return new Response(res)
      .setID(0)
      .setStatusCode(500)
      .setMessage("Something went wrong.")
      .send();
  }
};

const getCategoryByID = async (req, res) => {
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
    console.log("Error getCategoryByID:" + err.message);
    return new Response(res)
      .setID(0)
      .setStatusCode(500)
      .setMessage("Something went wrong.")
      .send();
  }
};

const getCategoryByFilter = async (req, res) => {
  try {
    const result = [];
    const name = req.query.name;
    const created = req.query.created_by;
    const description = req.query.description;
    // pagination
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.itemPerPage) || parseInt(process.env.PAGESIZE);
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;

    let categoryList = await prisma.categories.findMany({
      where: {
        status: 1,
      },
    });
    if(created != "All" && created != ""){
      categoryList = categoryList.filter(cat=>cat.created_by==created);
    }
    if(name != ""){
      categoryList = categoryList.filter(cat=>cat.name.toLowerCase().includes(name.toLowerCase()));
    }
    if(description != ""){
      categoryList = categoryList.filter(cat=>cat.description.toLowerCase().includes(description.toLowerCase()));
    }

    if(limit == -1){
      startIndex = 0;
      limit=categoryList.length;
      endIndex = limit;
    }

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
    console.log("Error getCategoryByFilter:" + err.message);
    return new Response(res)
      .setID(0)
      .setStatusCode(500)
      .setMessage("Something went wrong.")
      .send();
  }
};

const addCategory = async (req, res) => {
  try {
    const body = req.body;
    const { name, description } = body;

    if (!name) {
      return new Response(res)
        .setID(0)
        .setStatusCode(400)
        .setMessage("Category name is required.")
        .send();
    }
    const foundCategory = await prisma.categories.findFirst({
      where: { name: name },
    });
    if (!foundCategory) {
      await prisma.categories.create({
        data: {
          name: name,
          description: description,
          created_by: req.user.username,
        },
      });
      return new Response(res)
        .setID(1)
        .setStatusCode(201)
        .setMessage("Category created successfully.")
        .send();
    }
    return new Response(res)
      .setID(0)
      .setStatusCode(400)
      .setMessage("Category already exist.")
      .send();
  } catch (err) {
    console.log("Error addCategory:" + err.message);
    return new Response(res)
      .setID(0)
      .setStatusCode(500)
      .setMessage("Something went wrong.")
      .send();
  }
};

const updateCategory = async (req, res) => {
  try {
    const body = req.body;
    const { name, description, id } = body;
    if (!name) {
      return new Response(res)
        .setID(0)
        .setStatusCode(400)
        .setMessage("name is required.")
        .send();
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

    const checkRecordExist = await prisma.categories.findFirst({
      where: { name: name },
    });

    if (checkRecordExist && checkRecordExist?.ID != id) {
      return new Response(res)
        .setID(0)
        .setStatusCode(400)
        .setMessage("Category already exist.")
        .send();
    } else {
      await prisma.categories.update({
        where: { ID: id },
        data: {
          name: name,
          description: description,
          updated_by: req.user.username,
        },
      });
      return new Response(res)
        .setID(1)
        .setMessage("Category updated successfully.")
        .send();
    }
  } catch (err) {
    console.log("Error updateCategory:" + err.message);
    return new Response(res)
      .setID(0)
      .setStatusCode(500)
      .setMessage("Something went wrong.")
      .send();
  }
};

const deleteCategory = async (req, res) => {
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
      .setMessage("Category deleted successfully.")
      .send();
  } catch (err) {
    console.log("Error deleteCategory:" + err.message);
    return new Response(res)
      .setID(0)
      .setStatusCode(500)
      .setMessage("Something went wrong.")
      .send();
  }
};

module.exports = {
  getCategories,
  addCategory,
  updateCategory,
  getCategoryByID,
  deleteCategory,
  getCategoryByFilter,
};
