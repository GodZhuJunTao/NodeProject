// 利用Express中的Router实现路由模块化
const express = require('express');
let Router = express.Router();
let objectId = require('mongodb').ObjectId;
let newtime = require('./newTime');
const bodyParser = require('body-parser');

let urlencodedParser = bodyParser.urlencoded({extended:false});
const db = require('../db');
// RESTful风格api
Router.route('/')
    // 查
    .get(async (req,res)=>{
        let {page,limit} = req.query;
        limit = limit*1;
        let data
        try{
            data = await db.find('order',{},limit);
        }catch(err){
            data = err;
        }

        res.send(data);
    })
    // 删
    .delete(urlencodedParser,async(req,res)=>{
        let {id} = req.query;
        // console.log(id);
        var _id = objectId(id);
        var whereArgs = {
            _id: _id
        };
        let data
        try{
            data = await db.delete('order',whereArgs);
        }catch(err){
            data = err;
        }

        res.send(data);
    })
    
module.exports = Router;