let _page = 1;
let _limit = 5;
// 获取搜索的文章
function searchArticle(value) {

    $.get(`http://127.0.0.1:5000/api/fuzzyMatching?value=${value}`).then(res => {
        if (!res.length) {
            return;
        }

        let divHtml = ``;
        res.forEach(v => {
            divHtml += `<a href="http://127.0.0.1:8000/articleDetails?art_id=${v.art_id}">
            <div class="publish" id="btmArticle">
                <div class="row articleLine">
                    <div class="col-sm-9">
                        <h3 class="post-title">${v.title}</h3>
                        <p class="text-muted"><span>${v.author}</span>&nbsp;发布于&nbsp;<span>${v.publish_date}</span></p>
                        <p class="text-muted">分类 ：<a href="javascript:;">${v.name}</a></p>
                    </div>
                    <div class="col-sm-3 hidden-xs pic">
                        <img src="${v.cover}" alt="">
                    </div>
                </div>
            </div>
        </a>`
        })
        $('#classifiedArticles').html(divHtml);
    })
}

// 输入文章名
$('#searchInput').on('keyup', debounce(function() {
    let value = $.trim(this.value)
    if (value == '') {
        $('#classifiedArticles').html('');
        return;
    }
    _page = 1;
    searchArticle(value);
}, 500))

$('#searchInput').keyup();

// 点击加载更多
$('#loadMore').on('click', function() {
    _page++;
    let value = $.trim($('#searchInput').val());
    console.log(value);
    if (value == '') { return; }
    console.log(value);
    clickMore(value);
})

// 加载更多
function clickMore(value) {
    //loading层
    var index = layer.load(1, {
        shade: [0.1, '#fff'] //0.1透明度的白色背景
    });

    $.get(`http://127.0.0.1:5000/api/fuzzyMatching?value=${value}&_page=${_page}&_limit=${_limit}`).then(res => {
        // 关闭loading
        layer.close(index);

        if (!res.length) {
            alert('没有更多内容了')
                //提示层
            return;
        }

        let divHtml = ``;
        res.forEach(v => {
                divHtml += `<a href="http://127.0.0.1:8000/articleDetails?art_id=${v.art_id}">
            <div class="publish" id="btmArticle">
                <div class="row articleLine">
                    <div class="col-sm-9">
                        <h3 class="post-title">${v.title}</h3>
                        <p class="text-muted"><span>${v.author}</span>&nbsp;发布于&nbsp;<span>${v.publish_date}</span></p>
                        <p class="text-muted">分类 ：<a href="javascript:;">${v.name}</a></p>
                    </div>
                    <div class="col-sm-3 hidden-xs pic">
                        <img src="${v.cover}" alt="">
                    </div>
                </div>
            </div>
        </a>`
            })
            // 要和原文章列表标签进行拼接再赋值
        let oldBtmHtml = $('#classifiedArticles').html();
        let newAllcate = oldBtmHtml + divHtml;

        $('#classifiedArticles').html(newAllcate);
    })
}


// 封装一个防抖函数
function debounce(fn, time) {
    var times;
    return function() {
        var _this = this;
        clearInterval(times);
        times = setTimeout(function() {
            fn.call(_this);
        }, time);
    }
}