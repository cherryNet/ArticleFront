"use strict";var _page=1,_limit=5;function searchArticle(t){$.get("http://127.0.0.1:5000/api/fuzzyMatching?value=".concat(t)).then(function(t){if(t.length){var a="";t.forEach(function(t){a+='<a href="http://127.0.0.1:8000/articleDetails?art_id='.concat(t.art_id,'">\n            <div class="publish" id="btmArticle">\n                <div class="row articleLine">\n                    <div class="col-sm-9">\n                        <h3 class="post-title">').concat(t.title,'</h3>\n                        <p class="text-muted"><span>').concat(t.author,"</span>&nbsp;发布于&nbsp;<span>").concat(t.publish_date,'</span></p>\n                        <p class="text-muted">分类 ：<a href="javascript:;">').concat(t.name,'</a></p>\n                    </div>\n                    <div class="col-sm-3 hidden-xs pic">\n                        <img src="').concat(t.cover,'" alt="">\n                    </div>\n                </div>\n            </div>\n        </a>')}),$("#classifiedArticles").html(a)}})}function clickMore(t){var n=layer.load(1,{shade:[.1,"#fff"]});$.get("http://127.0.0.1:5000/api/fuzzyMatching?value=".concat(t,"&_page=").concat(_page,"&_limit=").concat(_limit)).then(function(t){if(layer.close(n),t.length){var a="";t.forEach(function(t){a+='<a href="http://127.0.0.1:8000/articleDetails?art_id='.concat(t.art_id,'">\n            <div class="publish" id="btmArticle">\n                <div class="row articleLine">\n                    <div class="col-sm-9">\n                        <h3 class="post-title">').concat(t.title,'</h3>\n                        <p class="text-muted"><span>').concat(t.author,"</span>&nbsp;发布于&nbsp;<span>").concat(t.publish_date,'</span></p>\n                        <p class="text-muted">分类 ：<a href="javascript:;">').concat(t.name,'</a></p>\n                    </div>\n                    <div class="col-sm-3 hidden-xs pic">\n                        <img src="').concat(t.cover,'" alt="">\n                    </div>\n                </div>\n            </div>\n        </a>')});var c=$("#classifiedArticles").html()+a;$("#classifiedArticles").html(c)}else alert("没有更多内容了")})}function debounce(a,c){var n;return function(){var t=this;clearInterval(n),n=setTimeout(function(){a.call(t)},c)}}$("#searchInput").on("keyup",debounce(function(){var t=$.trim(this.value);""!=t?(_page=1,searchArticle(t)):$("#classifiedArticles").html("")},500)),$("#searchInput").keyup(),$("#loadMore").on("click",function(){_page++;var t=$.trim($("#searchInput").val());console.log(t),""!=t&&(console.log(t),clickMore(t))});