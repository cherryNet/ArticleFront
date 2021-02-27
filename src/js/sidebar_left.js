// 获取文章分类
$.get('http://127.0.0.1:5000/api/cate').then(res => {
    $('#sort_mun').html(res.length)
    let newHtml = '';
    res.forEach(v => {
        newHtml += `<a href="/AllCate?cat_id=${v.cat_id}">
            <div class="categories-list-item">
            <span>${v.name}</span>
            <span class="categories-list-item-badge">${v.total}</span>
            </div>
            </a>`;
    })
    $('#sort_left').html(newHtml);
})

// 获取所有文章数量
$.get('http://127.0.0.1:5000/api/articleSta').then(res => {
    $('#articleSta').html(res.length)
})

// 点击弹出QQ二维码
$('#qqContact').on('click', function() {
    //页面层
    layer.open({
        title: '',
        type: 1,
        // skin: 'layui-layer-rim', //加上边框
        area: ['226.35px', '300px'], //宽高
        content: '<img src="/public/image/QQ.jpg" alt="" style="height: 100%;">'
    });
})