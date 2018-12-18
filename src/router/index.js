// 把路由封装成模块
const express = require('express');

// 引入单独路由模块
const userRouter = require('./login');
const goodsRouter = require('./goodslist');
const userinfRouter = require('./userinf');
const uploadRouter = require('./upload');
const orderRouter = require('./order');
let Router = express.Router();

// 关于用户的路由
Router.use('/login',userRouter);
// 关于商品的路由
Router.use('/goodslist',goodsRouter);
// 关于商品分类的路由
Router.use('/userinf',userinfRouter);
// 关于订单的路由
Router.use('/order',orderRouter);
// 上传文件
Router.use('/upload',uploadRouter);

module.exports = Router;