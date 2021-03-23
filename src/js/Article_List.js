let _page = 1;
let _limit = 4;

function loadArticle() {
    //loading层
    var index = layer.load(1, {
        shade: [0.1, '#fff'] //0.1透明度的白色背景
    });

    $.get(`http://127.0.0.1:5000/api/article?_page=${_page}&_limit=${_limit}`).then(res => {
        // 关闭loading
        layer.close(index);

        if (!res.length) {
            //提示层
            alert('没有更多内容了')
            return;
        }

        let divHtml = ``;
        res.forEach(v => {
            !v.cover && (v.cover = 'http://placehold.it/700x200/000000.jpg/ffffff?text=placeholder');

            divHtml += `
        <a href="http://127.0.0.1:8000/articleDetails?art_id=${v.art_id}">
            <div class="row articleLine">
                <div class="col-sm-9">
                    <h3 class="post-title">${v.title}</h3>
                    <p class="text-muted"><span>${v.author}</span>&nbsp;发布于&nbsp;<span>${v.publish_date}</span></p>
                    <div class="hidden-xs contentPreview">
                        ${v.content}
                    </div>
                    <p class="text-muted"><a href="http://127.0.0.1:8000/AllCate?cat_id=${v.cat_id}">${v.name} · </a> 阅读(<span>2417</span>) 评论(<span>23</span>) 赞(<span>13</span>)</p>
                </div>
                <div class="col-sm-3 hidden-xs pic">
                    <img src="${v.cover}" alt="">
                </div>
            </div>
        </a>`
        })
        let oldBtmHtml = $('#btmArticle').html();
        // 要和原文章列表标签进行拼接再赋值
        let newBtmHtml = oldBtmHtml + divHtml;
        $('#btmArticle').html(newBtmHtml);
    })
}
loadArticle();

// 加载更多
$('#loadMore').on('click', function() {
    _page++;
    loadArticle();
})