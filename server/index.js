// node 后端服务器

const userApi = require('./api/userApi')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// 后端api路由
app.use('/api/user', userApi)


// 监听端口
app.listen(3003, () => {
  console.log('成功打通端口3003');
})
