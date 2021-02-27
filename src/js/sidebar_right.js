$.get('http://127.0.0.1:5000/api/article?_page=1&_limit=8').then(res => {
    let newHtml = ``;
    res.forEach(v => {
        newHtml += `<div class="recent-posts-list">
        <div class="recent-posts-item">
            <div class="recent-posts-item-title">${v.publish_date}</div>
            <a href="http://127.0.0.1:8000/articleDetails?art_id=${v.art_id}">
                <div class="recent-posts-item-content">${v.title}</div>
            </a>
        </div>
    </div>`
    })

    let RecArticles = `<div class="recent-posts-header">
    <i class="iconfont icon-wendang1" style="padding-right:3px"></i>最近文章
</div>`

    RecArticles += newHtml;
    $('#RecentArticles').html(RecArticles)
})