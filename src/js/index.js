    let _page = 1;
    let _limit = 8;

    $.get(`http://127.0.0.1:5000/api/article?_page=1&_limit=5`).then(res => {
        // 头部文章显示
        let TopNewHtml = '';
        res.forEach(v => {
            !v.cover && (v.cover = 'http://placehold.it/700x200/000000.jpg/ffffff?text=placeholder');
            TopNewHtml += `<li art_id="${v.art_id}">
             <a href="javascript:;">
                 <img src="${v.cover}" alt="">
                 <p>${v.title}</p>
             </a>
         </li>`
        })
        $('#TopArticle').html(TopNewHtml);
    })

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
                layer.msg('没有更多内容了');
                return;
            }


            // 下部分文章显示
            let ix = 5;
            (_page != 1) && (ix = 0);
            let btmNewHtml = '';
            for (let i = ix; i < res.length; i++) {
                !res[i].cover && (res[i].cover = 'http://placehold.it/700x200/000000.jpg/ffffff?text=placeholder');

                btmNewHtml += `
                <a href="http://127.0.0.1:8000/articleDetails?art_id=${res[i].art_id}">
                    <div class="row articleLine">
                        <div class="col-sm-9">
                            <h3 class="post-title">${res[i].title}</h3>
                            <p class="text-muted"><span>${res[i].author}</span>&nbsp;发布于&nbsp;<span>${res[i].publish_date}</span></p>
                            <div class="hidden-xs contentPreview">
                                ${res[i].content}
                            </div>
                            <p class="text-muted"><a href="http://127.0.0.1:8000/AllCate?cat_id=${res[i].cat_id}">${res[i].name} · </a> 阅读(<span>2417</span>) 评论(<span>23</span>) 赞(<span>13</span>)</p>
                        </div>
                        <div class="col-sm-3 hidden-xs pic">
                            <img src="${res[i].cover}" alt="">
                        </div>
                    </div>
                </a>`
            }

            let oldBtmHtml = $('#btmArticle').html();
            // 要和原文章列表标签进行拼接再赋值
            let newBtmHtml = oldBtmHtml + btmNewHtml;
            $('#btmArticle').html(newBtmHtml);
        })




        //头部九宫格 获取文章详情页
        $('#TopArticle').on('click', 'li', function() {
            let art_id = $(this).attr('art_id');
            location.href = `http://127.0.0.1:8000/articleDetails?art_id=${art_id}`
        })
    }
    loadArticle();

    $('#loadMore').on('click', function() {
        _page++;
        loadArticle();
    })