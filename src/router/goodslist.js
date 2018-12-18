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
            data = await db.find('shoppinglist',{},limit);
        }catch(err){
            data = err;
        }

        res.send(data);
    })

    // 插入
    .put(urlencodedParser,async (req,res)=>{
        let {sort,shoppingname,price,oldprice,store} = req.query;
        store = store*1;
        oldprice = oldprice*1;
        price = price*1;
        console.log(sort,shoppingname,price,oldprice,store,newtime());
        let data;
        try{
            data = await db.insert('shoppinglist',{
                shoppingname:shoppingname,
                oldprice:oldprice,
                price:price,
                store:store,
                sort:sort,
                time:newtime()
            });
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
            data = await db.delete('shoppinglist',whereArgs);
        }catch(err){
            data = err;
        }

        res.send(data);
    })
    // 改
    .post(urlencodedParser,async (req,res)=>{
        let {id,sort,shoppingname,price,oldprice,store,subhead,remark} = req.body;
        var _id = objectId(id);
        var whereArgs = {
            _id: _id
        };
        store = store*1;
        oldprice = oldprice*1;
        price = price*1;
        console.log(sort,shoppingname,price,oldprice,store,subhead,remark,newtime());
        let data;
        try{
            data = await db.update('shoppinglist',whereArgs,{$set:{
                shoppingname:shoppingname,
                oldprice:oldprice,
                price:price,
                store:store,
                sort:sort,
                subhead:subhead,
                remark:remark,
                time:newtime()
            }});
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
        data = await db.find('shoppinglist',whereArgs,limit);
    }catch(err){
        data = err;
    }

    res.send(data);
})
// 分类列表 的增删改查
Router.route('/category')
    // 查
    .get(async (req,res)=>{
        let {page,limit} = req.query;
        limit = limit*1;
        let data
        try{
            data = await db.find('goods_category',{},limit);
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
            data = await db.delete('goods_category',whereArgs);
        }catch(err){
            data = err;
        }

        res.send(data);
    })

    // 增
    .put(urlencodedParser,async (req,res)=>{
        let {name,remark} = req.query;
        console.log(name,remark,newtime());
        let data;
        try{
            data = await db.insert('goods_category',{
                name:name,
                remark:remark,
                time:newtime()
            });
        }catch(err){
            data = err;
        }

        res.send(data);
    })
    // 改
    .post(urlencodedParser,async (req,res)=>{
        let {id,name,remark} = req.body;
        var _id = objectId(id);
        var whereArgs = {
            _id: _id
        };
        console.log(name,remark,newtime());
        let data;
        try{
            data = await db.update('goods_category',whereArgs,{$set:{
                name:name,
                remark:remark,
                time:newtime()
            }});
        }catch(err){
            data = err;
        }

        res.send(data);
    })
// 分类的 改,先渲染
Router.get('/cg_editor',async(req,res)=>{
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
        data = await db.find('goods_category',whereArgs,limit);
    }catch(err){
        data = err;
    }

    res.send(data);
})
// RESTful风格api
// Router.route('/')
//     .get((req,res)=>{
//         MongoClient.connect('mongodb://localhost:27017',(err,database)=>{
//             //连接成功后执行这个回调函数
//             if(err) throw err;

//             // 使用某个数据库，无则自动创建
//             let db = database.db('jianyiwang');

//             let {page,limit} = req.query;
//             limit = limit*1;
//             // let num = page*limit*1;
//             // let jump = limit*(page-1)*1;
//             // console.log(page,qty);
//             // console.log(num,jump);
//             // 使用集合
//             let shoppinglist = db.collection('shoppinglist');
//             shoppinglist.find().limit(limit).toArray((err,result)=>{
//                 // let str = result.toString;
//                 // console.log(result);
//                 let code;
//                 if(result){
//                     code = {
//                         data:{
//                             item:result
//                         },
//                         status:0
//                     }
//                 }
//                 // console.log(code);
//                 res.send(code);
//             })
//         })
//     })

//     .post((req,res)=>{
//         res.send({
//             path:'修改商品信息',
//             id:req.params.id
//         })
//     })
//     .put((req,res)=>{
//         MongoClient.connect('mongodb://localhost:27017',(err,database)=>{
//             //连接成功后执行这个回调函数
//             if(err) throw err;
//             //使用某个数据库,无则自动创建
//             let db = database.db('jianyiwang');
//             let {sort,shoppingname,price,oldprice,store} = req.query;
//             // let time = new Data();
//             store = store*1;
//             oldprice = oldprice*1;
//             price = price*1;
//             console.log(sort,shoppingname,price,oldprice,store,newtime());
//             let shoppinglist = db.collection('shoppinglist');
//             shoppinglist.insertOne({
//                 shoppingname:shoppingname,
//                 oldprice:oldprice,
//                 price:price,
//                 store:store,
//                 sort:sort,
//                 time:newtime()
//             },(err,result)=>{
//                 console.log(result);
//                 res.send({
//                     path:'添加成功'
//                 })
//             })
//         })
//     })
//     .delete((req,res)=>{
//         MongoClient.connect('mongodb://localhost:27017',(err,database)=>{
//             //连接成功后执行这个回调函数
//             if(err) throw err;

//             // 使用某个数据库，无则自动创建
//             let db = database.db('jianyiwang');

//             let {id} = req.query;
//             // console.log(id);
//             var _id = objectId(id);
//             var whereArgs = {
//                 _id: _id
//             };
//             // collection.findOne(whereArgs, {}, function(err, doc)) {
//             //     // TODO 处理查询到的数据
//             // }
//             // gid = gid*1;
//             // console.log(whereArgs);
//             // 使用集合
//             let shoppinglist = db.collection('shoppinglist');
//             shoppinglist.deleteOne(whereArgs,(err,result)=>{
//                 // console.log(result);
//                 res.send({
//                     path:'删除商品'
//                 });
//             })
//         })
//     })

module.exports = Router;