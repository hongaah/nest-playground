
show dbs; // 显示 database
show databases;

use hello-mongo; // 切换或者创建 database

db; // 查看当前 database

db.dropDatabase(); // 删除 database

db.createCollection('aaa'); // 创建 collection，需要有 collection 之后才会把 database 写入硬盘

db.xxx.drop() //删除 collection

db.xxx.insertOne({ name: 'person', age: 20, phone: '13222222222'});// 插入一条 document
db.xxx.insertMany([{ name: 'dong', age: 21}, {name: 'xxx', hobbies: ['writing']}]); // 插入多条

db.xxx.updateOne({ name: 'person'}, { $set: {age: 27}, $currentDate: { aaa: true } }) // updateOne 更新，在更新的时候带上时间戳

db.xxx.replaceOne({name: 'person'}, { age: 27}) // name 为 person 的整体替换

db.xxx.deleteMany({ age: { $gt: 20 }}); // deleteOne、deleteMany 删除


db.xxx.findOne({ age: 20});
db.xxx.findOne(); // 查询所有 collection

db.xxx.find({age: 20}); // 查询 collection
db.xxx.find({ age: { $in: [20, 21]}}) // 使用 in、nin 查询多个值
db.xxx.find({ $and: [{age: { $gte: 20 }}, { name: /dong\d/}]}) // 使用 and 指定多个条件同时成立
db.xxx.find({ $or: [{age: { $gt: 20 }}, { name: /dong*/}]}) // 使用 or 表示或者
db.xxx.find().skip(1).limit(2) // 使用 skip + limit 实现分页，从第一条 Document 开始，取 2 条

db.xxx.find().sort({ age: -1}) // sort 可以排序，1 是升序、-1 是降序
db.xxx.find().sort({ age: -1, name: 1}) // 先按照 age 降序，再按照 name 升序

db.xxx.countDocuments() // 计数
db.xxx.countDocuments({ name: /person/}) // 有条件计数


