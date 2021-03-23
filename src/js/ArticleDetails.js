window.onload = function() {
    // 获取url查询字符串
    function searchParam(url) {
        let search = location.search.slice(1) || '';
        let params = {};
        search && search.split('&').forEach(v => {
            let [key, value] = v.split('=')
            params[key] = decodeURIComponent(value)
        })
        return params;
    }
    let url = location.href;

    let { art_id } = searchParam(url)
    $.get(`http://127.0.0.1:5000/api/articleInfo/${art_id}`).then(res => {
        let { author, cat_name, content, cover, publish_date, title , cat_id } = res;
        if (cover) {
            cover = `http://127.0.0.1:5000/${cover}`;
        } else {
            cover = `http://placehold.it/500x200/000/fff?text=fore-end share`;
        }
        let newHtml = `<div class="image-wrapper">
        <img src="${cover}" alt="">
    </div>
    <div class="cardContent">
        <header>
            <h1 class="post-title">${title}</h1>
        </header>
        <div class="post-show-meta">
            <time>
            <b>作者：${author} · </b>
                <i class="iconfont icon-rili" style="margin-right:2px"></i>
                <span>${publish_date}</span> ·
                <a href="http://127.0.0.1:8000/AllCate?cat_id=${cat_id}" class="post-meta-link">${cat_name}</a>
                <hr>
            </time>
        </div>
        <!-- 富文本内容 -->
        <div style="font-size: 16px;">
            ${content}
        </div>
    </div>`
        $('#ArticleInfo').html(newHtml)
    })
}