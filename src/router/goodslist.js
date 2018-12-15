// 利用Express中的Router实现路由模块化
const express = require('express');
let Router = express.Router();
const mongodb = require('mongodb');
let objectId = require('mongodb').ObjectId;
let newtime = require('./newTime');

const bodyParser = require('body-parser');
// 获取Mongo客户端
const MongoClient = mongodb.MongoClient;

// let urlencodedParser = bodyParser.urlencoded({extended:false});
// RESTful风格api
Router.route('/')
    .get((req,res)=>{
        MongoClient.connect('mongodb://localhost:27017',(err,database)=>{
            //连接成功后执行这个回调函数
            if(err) throw err;

            // 使用某个数据库，无则自动创建
            let db = database.db('jianyiwang');

            let {page,limit} = req.query;
            limit = limit*1;
            // let num = page*limit*1;
            // let jump = limit*(page-1)*1;
            // console.log(page,qty);
            // console.log(num,jump);
            // 使用集合
            let shoppinglist = db.collection('shoppinglist');
            shoppinglist.find().limit(limit).toArray((err,result)=>{
                // let str = result.toString;
                // console.log(result);
                let code;
                if(result){
                    code = {
                        data:{
                            item:result
                        },
                        status:0
                    }
                }
                // console.log(code);
                res.send(code);
            })
        })
    })

    .post((req,res)=>{
        res.send({
            path:'修改商品信息',
            id:req.params.id
        })
    })
    .put((req,res)=>{
        MongoClient.connect('mongodb://localhost:27017',(err,database)=>{
            //连接成功后执行这个回调函数
            if(err) throw err;
            //使用某个数据库,无则自动创建
            let db = database.db('jianyiwang');
            let {sort,shoppingname,price,oldprice,store} = req.query;
            // let time = new Data();
            store = store*1;
            oldprice = oldprice*1;
            price = price*1;
            console.log(sort,shoppingname,price,oldprice,store,newtime());
            let shoppinglist = db.collection('shoppinglist');
            shoppinglist.insertOne({
                shoppingname:shoppingname,
                oldprice:oldprice,
                price:price,
                store:store,
                sort:sort,
                time:newtime()
            },(err,result)=>{
                console.log(result);
                res.send({
                    path:'添加成功'
                })
            })
        })
    })
    .delete((req,res)=>{
        MongoClient.connect('mongodb://localhost:27017',(err,database)=>{
            //连接成功后执行这个回调函数
            if(err) throw err;

            // 使用某个数据库，无则自动创建
            let db = database.db('jianyiwang');

            let {id} = req.query;
            // console.log(id);
            var _id = objectId(id);
            var whereArgs = {
                _id: _id
            };
            // collection.findOne(whereArgs, {}, function(err, doc)) {
            //     // TODO 处理查询到的数据
            // }
            // gid = gid*1;
            // console.log(whereArgs);
            // 使用集合
            let shoppinglist = db.collection('shoppinglist');
            shoppinglist.deleteOne(whereArgs,(err,result)=>{
                // console.log(result);
                res.send({
                    path:'删除商品'
                });
            })
        })
    })

module.exports = Router;