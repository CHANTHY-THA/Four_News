const Response = require("../responseBody/Response");
const { PrismaClient } = require('@prisma/client');
const dayjs = require('dayjs');
const prisma = new PrismaClient();

const getAuthors = async (req, res) => {

   try{
        let page = parseInt(req.query.page) || 1;
        let limit = 10;
        let result = [];
        let recordSkip = (page - 1) * limit;
       
        const totalRecord = await prisma.authors.findMany({
           where:{
            status:1
           }
        });

        const totalRecordPerPage = await prisma.authors.findMany({
            where:{status:1},
            skip:recordSkip,
            take:limit,
            orderBy:{ID:'desc'}
        })

        totalRecordPerPage.forEach(t => {
            const createdAtFormat = dayjs(t.created_at);
            const updatedAtFormat = dayjs(t.updated_at);
            t.created_at = createdAtFormat.format("DD-MMM-YYYY h:mm A");
            t.updated_at = updatedAtFormat.format("DD-MMM-YYYY h:mm A");
            result.push(t);
        });

        const total_page = Math.ceil(totalRecord.length/limit);
        const pagination ={
            total_record : totalRecord.length,
            limit : limit,
            current_page : page,
            total_page : total_page,
            has_next : page < total_page
        }
        return new Response(res).setResponse({tags:result, pagination:pagination}).setID(1).send();

    }catch(err){
        console.log("Error getAuthors:" + err.message);
        return new Response(res).setID(0).setStatusCode(500).setMessage("Something went wrong.").send();
        
    }
};


const getAuthorByID = async (req, res) => {

    try{
        let id = parseInt(req.params.id);
        const foundAuthor = await prisma.authors.findFirst({
            where:{
                ID:id, 
                status : 1
            }
        });
        if(!foundAuthor){
            return new Response(res).setID(0).setStatusCode(404).setMessage("No data found.").send();
        } 
        const createdAtFormat = dayjs(foundAuthor.created_at);
        const updatedAtFormat = dayjs(foundAuthor.updated_at);
        foundAuthor.created_at = createdAtFormat.format("DD-MMM-YYYY h:mm A");
        foundAuthor.updated_at = updatedAtFormat.format("DD-MMM-YYYY h:mm A");

        return new Response(res).setResponse(foundAuthor).send();

     }catch(err){
        console.log("Error getAuthorByID:" + err.message);
        return new Response(res).setID(0).setStatusCode(500).setMessage("Something went wrong.").send();   
    }
};

const getAuthorByFilter = async (req, res) =>{

    try{
        const result = [];
        const username  = req.query.username;
        const created_by = req.query.created_by;
        let whereConditions = {};

        if (username) {
            whereConditions.username = { contains: username };
        }

        if (created_by) {
            whereConditions.created_by = created_by;
        }
        whereConditions.status = 1;

        const authorList = await prisma.authors.findMany({
            where: whereConditions
        });

        if (authorList.length === 0) {
            return new Response(res).setID(0).setStatusCode(404).setMessage("No data found.").send();
        }

        authorList.forEach(t => {
            const createdAtFormat = dayjs(t.created_at);
            const updatedAtFormat = dayjs(t.updated_at);
            t.created_at = createdAtFormat.format("DD-MMM-YYYY h:mm A");
            t.updated_at = updatedAtFormat.format("DD-MMM-YYYY h:mm A");
            result.push(t);
        });
        return new Response(res).setResponse(authorList).send();

    }catch(err){
        console.log("Error getAuthorByFilter:" + err.message);
        return new Response(res).setID(0).setStatusCode(500).setMessage("Something went wrong.").send();   
    }
}

const addAuthor = async (req, res) => {
    try{ 
        const body = req.body;
        const { username,biography, created_by } = body;
       
        if(!username){
            return new Response(res).setID(0).setStatusCode(400).setMessage(" username is required.").send();
        }

        const foundAuthor = await prisma.authors.findFirst(
            {where:{username:username}
        });

        if(!foundAuthor){
            const data = {
                username: username,
                created_by: created_by
            }
            if (biography) {
                data.biography = biography;
            }
            await prisma.authors.create({ data });
            return new Response(res).setID(1).setStatusCode(201).setMessage("Author created successfully.").send();
        }
        return new Response(res).setID(0).setStatusCode(400).setMessage("Author already exist.").send();

    }catch(err){
        console.log("Error addAuthor:" + err.message);
        return new Response(res).setID(0).setStatusCode(500).setMessage("Something went wrong.").send();
    }  
};

const updateAuthor = async (req,res) =>{
    try{
        const body = req.body;
        const { username,biography,id, updated_by } = body;
        if(!username){
            return new Response(res).setID(0).setStatusCode(400).setMessage("username is required.").send();
        }

        const foundAuthor = await prisma.authors.findFirst({
            where:{ID:id, status:1}
        });
        console.log("data: " + foundAuthor);
        if(!foundAuthor){
            return new Response(res).setID(0).setStatusCode(404).setMessage("No data found.").send();
        }

        const checkRecordExist = await prisma.authors.findFirst({where:{username:username}});

        if(checkRecordExist && checkRecordExist?.ID != id){
            return new Response(res).setID(0).setStatusCode(400).setMessage("author already exist.").send();
        }else{
            await prisma.authors.update({
                where:{ID:id},
                data:{
                    username : username,
                    biography : biography,
                    updated_by : updated_by
                }
            });
            return new Response(res).setID(1).setMessage("Author updated successfully.").send();
        }
    }catch(err){
        console.log("Error updateAuthor:" + err.message);
        return new Response(res).setID(0).setStatusCode(500).setMessage("Something went wrong.").send();
    } 
}

const deleteAuthor = async (req,res) =>{
    try{
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return new Response(res).setID(0).setStatusCode(400).setMessage("ID must be a number.").send;
        }
        const foundAuthor = await prisma.authors.findFirst({
            where:{ID:id, status:1}
        });

        if(!foundAuthor){
            return new Response(res).setID(0).setStatusCode(404).setMessage("No data found.").send();
        }
        await prisma.authors.update({
            where: {ID:id},
            data:{
               status:0 
            }
        });
        return new Response(res).setID(1).setMessage("Author deleted successfully.").send();

    }catch(err){
        console.log("Error deleteAuthor:" + err.message);
        return new Response(res).setID(0).setStatusCode(500).setMessage("Something went wrong.").send();
    } 
}


module.exports = {
    getAuthors,
    getAuthorByID,
    getAuthorByFilter,
    addAuthor,
    updateAuthor,
    deleteAuthor
};