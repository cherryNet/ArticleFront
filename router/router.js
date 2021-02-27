const express = require('express');

// 得到一个路由器
let router = express.Router();

// 获取post 参数的中间件
router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// 展示首页页面
router.get(/^\/$|^\/index$/, (req, res) => {
    res.render('index.html');
})

// 文章内容页面
router.get('/articleDetails', (req, res) => {
    res.render('ArticleDetails.html')
})

// 全部分类页面
router.get('/AllCate', (req, res) => {
    res.render('AllCate.html')
})

// 文章列表页面
router.get('/Article_List', (req, res) => {
    res.render('Article_List.html')
})

// 暴露路由器
module.exports = router;