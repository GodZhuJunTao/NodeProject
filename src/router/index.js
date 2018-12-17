// 把路由封装成模块
const express = require('express');

// 引入单独路由模块
const userRouter = require('./login');
const goodsRouter = require('./goodslist');
const categoryRouter = require('./category');
const uploadRouter = require('./upload');
let Router = express.Router();

// 关于用户的路由
Router.use('/login',userRouter);
// 关于商品的路由
Router.use('/goodslist',goodsRouter);
// 关于商品分类的路由
Router.use('/category',categoryRouter);
// 上传文件
Router.use('/upload',uploadRouter);

module.exports = Router;