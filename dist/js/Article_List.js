"use strict";var _page=1,_limit=4;function loadArticle(){var c=layer.load(1,{shade:[.1,"#fff"]});$.get("http://127.0.0.1:5000/api/article?_page=".concat(_page,"&_limit=").concat(_limit)).then(function(t){if(layer.close(c),t.length){var a="";t.forEach(function(t){!t.cover&&(t.cover="http://placehold.it/700x200/000000.jpg/ffffff?text=placeholder"),a+='\n        <a href="http://127.0.0.1:8000/articleDetails?art_id='.concat(t.art_id,'">\n            <div class="row articleLine">\n                <div class="col-sm-9">\n                    <h3 class="post-title">').concat(t.title,'</h3>\n                    <p class="text-muted"><span>').concat(t.author,"</span>&nbsp;发布于&nbsp;<span>").concat(t.publish_date,'</span></p>\n                    <div class="hidden-xs contentPreview">\n                        ').concat(t.content,'\n                    </div>\n                    <p class="text-muted"><a href="javascript:;">').concat(t.name,' · </a> 阅读(<span>2417</span>) 评论(<span>23</span>) 赞(<span>13</span>)</p>\n                </div>\n                <div class="col-sm-3 hidden-xs pic">\n                    <img src="').concat(t.cover,'" alt="">\n                </div>\n            </div>\n        </a>')});var n=$("#btmArticle").html()+a;$("#btmArticle").html(n)}else alert("没有更多内容了")})}loadArticle(),$("#loadMore").on("click",function(){_page++,loadArticle()});