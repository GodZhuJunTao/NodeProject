/*
    封装数据库的增删改查
*/
const mongodb = require('mongodb');

// 获取Mongo客户端
const MongoClient = mongodb.MongoClient;

// 连接数据库
function connect(collectionName){
    return new Promise((resolve,reject)=>{
        MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
            if(err){
                reject(err);
                return;
            }

            // 使用数据库
            let db = client.db('jianyiwang');
            // 使用集合
            let col = db.collection(collectionName);
            resolve({col,client});
        })
    })
}
//查
exports.find = (collectionName, query,limit) => {
    return new Promise(async(resolve,reject)=>{
        let {col,client} = await connect(collectionName);

        // 查询所有分类
        col.find(query).limit(limit).toArray((err,result)=>{
            let code;
            if(result){
                code = {
                    data:{
                        item:result
                    },
                    status:0
                }
            }
            reject(code);
            client.close();
        })
    })
};
//增
exports.insert = (collectionName, query) => {
    return new Promise(async(resolve,reject)=>{
        let {col,client} = await connect(collectionName);

        col[Array.isArray(query) ? 'insertMany':'insertOne'](query,(err,result)=>{
            if(err){
                reject({
                    code:0,
                    mag:'插入失败',
                    data:arr
                });
            }else{
                resolve({
                    code:1,
                    msg:'success',
                    data:result
                });
            }
            // 关闭数据库,避免资源浪费
            client.close();
        });
    })
};
//删
exports.delete = (collectionName, query) => {
    return new Promise(async(resolve,reject)=>{
        let {col,client} = await connect(collectionName);

        col[Array.isArray(query) ? 'deleteMany':'deleteOne'](query,(err,result)=>{
            if(err){
                reject({
                    code:0,
                    mag:'插入失败',
                    data:arr
                });
            }else{
                resolve({
                    code:1,
                    msg:'success',
                    data:result
                });
            }
            // 关闭数据库,避免资源浪费
            client.close();
        });
    })
};
//改
exports.update = (collectionName, query, newDate) => {
    return new Promise(async(resolve,reject)=>{
        let {col,client} = await connect(collectionName);

        col.update(query,newDate,(err,result)=>{
            if(err){
                reject({
                    code:0,
                    mag:'插入失败',
                    data:arr
                });
            }else{
                resolve({
                    code:1,
                    msg:'success',
                    data:result
                });
            }
            // 关闭数据库,避免资源浪费
            client.close();
        })
    })
};