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
            data = await db.find('user_inf',{},limit);
        }catch(err){
            data = err;
        }

        res.send(data);
    })

    // 增
    .put(urlencodedParser,async (req,res)=>{
        let {user,age,password,time,sex,tel,email,sdads} = req.query;
        console.log(req.query);
        console.log(user,age,password,time,sex,tel,email,sdads);
        let data;
        try{
            data = await db.insert('user_inf',{
                user:user,
                age:age,
                password:password,
                time:time,
                sex:sex,
                tel:tel,
                email:email,
                sdads:sdads
            });
        }catch(err){
            data = err;
        }

        res.send(data);
    })

//     // 删
    .delete(urlencodedParser,async(req,res)=>{
        let {id} = req.query;
        // console.log(id);
        var _id = objectId(id);
        var whereArgs = {
            _id: _id
        };
        let data
        try{
            data = await db.delete('user_inf',whereArgs);
        }catch(err){
            data = err;
        }

        res.send(data);
    })
    // 改
    .post(urlencodedParser,async (req,res)=>{
        let {id,user,age,password,time,sex,tel,email,sdads} = req.body;
        var _id = objectId(id);
        var whereArgs = {
            _id: _id
        };
        console.log(req.body);
        console.log(id,user,age,password,time,sex,tel,email,sdads);
        let data;
        try{
            data = await db.update('user_inf',whereArgs,{
                user:user,
                age:age,
                password:password,
                time:time,
                sex:sex,
                tel:tel,
                email:email,
                sdads:sdads
            });
        }catch(err){
            data = err;
        }

        res.send(data);
    })
Router.get('/editor',async(req,res)=>{
    let {id} = req.query;
    let limit = 1;
    console.log(id);
    console.log(123);
    var _id = objectId(id);
    var whereArgs = {
        _id: _id
    };
    let data
    try{
        data = await db.find('user_inf',whereArgs,limit);
    }catch(err){
        data = err;
    }

    res.send(data);
})

module.exports = Router;