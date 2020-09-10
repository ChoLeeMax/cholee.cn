(function() {
  var type=1;
  initEvent();
  renderTopNews(initEvent);
  function initEvent (param) { 
    layui.use("flow", function() {
      flow = layui.flow;
    });
    
    $('.top-nav').on('click','.top-nav-item', function (e) {
        e.stopPropagation();
        laodWait(false);
        $(this).addClass('select').siblings().removeClass('select');
        type=$(this).attr('type');
        $("#top-list").html('');
        renderTopNews(type);
    });
   }
  /**
   * [renderTopNews 渲染头条数据]
   * @param {*}  [description]
   */
  function renderTopNews(type) {
    var queryStr = {};
    laodWait(true);
    $.getJSON(appCom.topNewsUrl+type, queryStr, function(
      data,
      jqXHR
    ) {
      if (data.code == "200") {
        // renderFlow("top-list", data.data);//数据本地处理流
        data.data.forEach(item => {
            var commonTime=new Date(item.behot_time* 1000);
            commonTime=commonTime.getMonth()+'/'+commonTime.getDay()+' '+commonTime.getHours()+':'+commonTime.getMinutes();
            item.times=commonTime;
            item.host=appCom.toutiao;
        });
        $("#top-list").append(template('top-list-tmp', { list: data.data }));
        //加载更多
        $(".laodMore").show().click(function(e) {
            renderTopNews(type);
        });
        laodWait(false);
      }
    });
  }

  /**
   * [renderFlow 组件初始化公共方法]
   * @param {id}    组件id
   * @param {data}  返回数据
   * @param {tmp}   模板名称
   */
  function renderFlow(id, data) {
    var elem = "#" + id;
    var temp = id + "-tmp";
    flow.load({
      elem: elem,
      done: function(_page, _next) {
        setTimeout(function() {
          var lis = data.slice((_page - 1) * 4, _page * 4);
          _next(template(temp, { list: lis }), _page < 7);
        }, appCom.flowTime);
      }
    });
  }
})();
