// 利用Express中的Router实现路由模块化
const express = require('express');
let Router = express.Router();

Router.get('/',(req,res)=>{
    res.send('goods list')
});

// RESTful风格api
Router.route('/:id')
    .get((req,res)=>{
        res.send({
            path:'获取商品信息',
            id:req.params.id
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