const express = require('express');
const multer = require('multer');
const { MulterError } = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

// 通过 dest 指定了保存的目录
// const upload = multer({ dest: 'uploads/' });

// 自己指定怎么存储，multer.distkStorage 是磁盘存储，通过 destination、filename 的参数分别指定保存的目录和文件名
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.mkdirSync(path.join(process.cwd(), 'uploads'));
    } catch (e) {}
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      '-' +
      file.originalname;
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});
const upload = multer({ storage });

// 单文件上传
app.post('/aaa', upload.single('aaa'), function (req, res, next) {
  // req.file 可以拿到文件字段，其余非文件字段在 req.body
  console.log('req.file', req.file);
  console.log('req.body', req.body);
});

// 多文件上传
app.post(
  '/bbb',
  upload.array('bbb', 2),
  function (req, res, next) {
    // req.files 可以拿到文件字段，其余非文件字段在 req.body
    console.log('req.files', req.files);
    console.log('req.body', req.body);
  },
  // 在 express 里，约定有 4 个参数的中间件为错误处理中间件
  // 一旦某个中间件出了错，express 就会向后找错误处理中间件来调用，如果没有，那就用默认错误处理中间件，返回 500 响应。
  function (err, req, res, next) {
    if (
      err instanceof multer.MulterError &&
      err.code === 'LIMIT_UNEXPECTED_FILE'
    ) {
      res.status(400).end('Too many files uploaded');
    }
    console.log('err', err, err.code);
  },
);

// 多文件多字段上传
app.post(
  '/ccc',
  upload.fields([
    { name: 'aaa', maxCount: 3 },
    { name: 'bbb', maxCount: 2 },
  ]),
  function (req, res, next) {
    // req.files 可以拿到文件字段，其余非文件字段在 req.body
    // req.files 会多返回 fieldname
    console.log('req.files', req.files);
    console.log('req.body', req.body);
  },
  // 在 express 里，约定有 4 个参数的中间件为错误处理中间件
  // 一旦某个中间件出了错，express 就会向后找错误处理中间件来调用，如果没有，那就用默认错误处理中间件，返回 500 响应。
  function (err, req, res, next) {
    if (err instanceof MulterError && err.code === 'LIMIT_UNEXPECTED_FILE') {
      res.status(400).end('Too many files uploaded');
    }
    console.log('err', err);
  },
);

// 多文件自己找字段上传
app.post('/ddd', upload.any(), function (req, res, next) {
  // req.files 会多返回 fieldname
  console.log('req.files', req.files);
  console.log('req.body', req.body);
});

app.listen(3333);
