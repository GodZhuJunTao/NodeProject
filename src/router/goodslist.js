// 利用Express中的Router实现路由模块化
const express = require('express');
let Router = express.Router();
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
// 获取Mongo客户端
const MongoClient = mongodb.MongoClient;

let urlencodedParser = bodyParser.urlencoded({extended:false});
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
            let num = page*limit*1;
            let jump = limit*(page-1)*1;
            // console.log(page,qty);
            // console.log(num,jump);
            // 使用集合
            let shoppinglist = db.collection('shoppinglist');
            shoppinglist.find({gid:{$lte:num}}).skip(jump).limit(limit).toArray((err,result)=>{
                // let str = result.toString;
                console.log(result);
                let code;
                if(result){
                    code = {
                        data:{
                            item:result
                        },
                        status:0
                    }
                }
                console.log(code);
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
        res.send({
            path:'添加商品',
            id:req.params.id
        })
    })
    .delete((req,res)=>{
        res.send({
            path:'删除商品',
            id:req.params.id
        })
    })

module.exports = Router;