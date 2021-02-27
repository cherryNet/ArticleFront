window.onload = function() {
    // 是否为 获取全部分类
    let isAll; //获取全部就为1  否则就为2

    function selectSty() {
        $('#nav-pills').on('click', 'a', function() {
            $(this).addClass('underline').siblings('a').removeClass('underline')
        })
    }
    // 获取全部分类
    function AllClas() {
        $.get(`http://127.0.0.1:5000/api/cate`).then(res => {
            let AllHtml = `<a href="javascript:;" class="underline">
        全部分类
    </a>`
            let cateHtml = ``;
            res.forEach(v => {
                cateHtml += `<a href="javascript:;" cat_id='${v.cat_id}'>${v.name}</a>`;
            })
            let PillsHtml = (AllHtml + cateHtml);
            $('#nav-pills').html(PillsHtml);
            // 排他
            selectSty();

            // 当前分类的cat_id
            currentCals();

            // 调用判断cat_id的函数
            isCatId();
        })

    }
    AllClas();


    // 显示所有分类文章
    let _page = 1;
    let _limit = 5;

    function AllCate() {
        //loading层
        var index = layer.load(1, {
            shade: [0.1, '#fff'] //0.1透明度的白色背景
        });

        $.get(`http://127.0.0.1:5000/api/article?_page=${_page}&_limit=${_limit}`).then(res => {
            // 关闭loading
            layer.close(index);

            if (!res.length) {
                alert('没有更多内容了')
                    //提示层
                return;
            }

            let allcate = ``;
            res.forEach(v => {
                !v.cover && (v.cover = 'http://placehold.it/700x200/000000.jpg/ffffff?text=placeholder');
                allcate += `<a href="http://127.0.0.1:8000/articleDetails?art_id=${v.art_id}"> 
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
            </a>`;
            })

            // 要和原文章列表标签进行拼接再赋值
            let oldBtmHtml = $('#classifiedArticles').html();
            let newAllcate = oldBtmHtml + allcate;

            $('#classifiedArticles').html(newAllcate);
        })
    }

    // 当前cat_id
    let dangqianCat_id;
    // 点击加载更多
    $('#loadMore').on('click', function() {
        _page++;
        if (isAll == 1) {
            // console.log('全部');
            AllCate();
        } else {
            // console.log('某个');
            assignArt(dangqianCat_id);
        }
    })

    // 获取当前分类标签的cat_id
    function currentCals() {
        $('#nav-pills').on('click', 'a', function() {
            _page = 1;
            $('#classifiedArticles').html('');
            let cat_id = $(this).attr('cat_id');
            if (!cat_id) {
                // 点击了全部分类
                isAll = 1;
                AllCate();
                return;
            }
            isAll = 2;
            dangqianCat_id = cat_id;
            assignArt(cat_id);
        })
    }

    // 获取某个分类的文章
    function assignArt(cat_id) {
        //loading层
        var index = layer.load(1, {
            shade: [0.1, '#fff'] //0.1透明度的白色背景
        });

        $.get(`http://127.0.0.1:5000/api/getCateArticle/${cat_id}?_page=${_page}&_limit=${_limit}`).then(res => {
            console.log(11);
            // 关闭loading
            layer.close(index);

            if (!res.length) {
                alert('没有更多内容了')
                return;
            }

            let artHtml = ``;
            res.forEach(v => {
                    artHtml += `<a href="http://127.0.0.1:8000/articleDetails?art_id=${v.art_id}">
                <div class="publish" id="btmArticle">
                    <div class="row articleLine">
                        <div class="col-sm-9">
                            <h3 class="post-title">${v.title}</h3>
                            <p class="text-muted"><span>${v.author}</span>&nbsp;发布于&nbsp;<span>${v.publish_date}</span></p>
                            <p class="text-muted">分类 ：<a href="javascript:;">${v.cat_name}</a></p>
                        </div>
                        <div class="col-sm-3 hidden-xs pic">
                            <img src="${v.cover}" alt="">
                        </div>
                    </div>
                </div>
            </a>`;
                })
                // 要和原文章列表标签进行拼接再赋值
            let oldBtmHtml = $('#classifiedArticles').html();
            let newAllcate = oldBtmHtml + artHtml;

            $('#classifiedArticles').html(newAllcate);
        })
    }

    // 获取url查询字符
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

    function isCatId() {
        if (!Object.keys(searchParam(url)).length) {
            // 没有 cat_id
            isAll = 1;
            AllCate();
        } else {
            // 有 cat_id
            isAll = 2;
            let { cat_id } = searchParam(url);
            let arr = [...$('#nav-pills a')];
            for (let i = 1; i < arr.length; i++) {
                if ($(arr[i]).attr('cat_id') == cat_id) {
                    $(arr[i]).addClass('underline').siblings('a').removeClass('underline');
                }
            }
            dangqianCat_id = cat_id;
            assignArt(cat_id);
        }
    }

}