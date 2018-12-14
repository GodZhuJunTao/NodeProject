// 利用Express中的Router实现路由模块化
const express = require('express');
let Router = express.Router();
const mongodb = require('mongodb');
const bodyParser = require('body-parser');

// 获取Mongo客户端
const MongoClient = mongodb.MongoClient;


let urlencodedParser = bodyParser.urlencoded({extended:false});
//登陆
Router.post('/',urlencodedParser,(req,res)=>{
    let {username,password} = req.body;
    console.log(req.body);
    MongoClient.connect('mongodb://localhost:27017',(err, database)=>{
        //连接成功后执行这个回调函数
        if(err) throw err;

        // 使用某个数据库，无则自动创建
        let db = database.db('jianyiwang');

        // 使用集合
        let user = db.collection('user_inf');

        // 处理password为数字的情况
        password = isNaN(password) ? password : password*1;
        console.log(password,username);
        //查询是否存在数据
        user.findOne({name:username,password},(err,result)=>{
            console.log(result);
            if(result){
                // 登录成功后,给前端发送用户表示 ：token
                res.send({
                    code:1,
                    data:result,
                    msg:'ok'
                })
            }else{
                res.send({
                    code:0,
                    data:[],
                    msg:'fail'
                })
            }
        });
        // 关闭数据库，避免资源浪费
        database.close();
    });
});

module.exports = Router;