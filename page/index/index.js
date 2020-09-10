(function (params) {
  initLayuiComnpent();
  renderWeXin();
  initSearchEvt();
  var key = null,
    pn = 10,
    isInit = false;

  /**
   * [initSearchEvt 初始化搜索点击事件]
   * @return {[]} [description]
   */
  function initSearchEvt() {
    //返回按钮
    $("#search-back").click(function (e) {
      e.preventDefault();
      $("#search-list").html("");
      $(".search-txt").val("");
      $(".carou-contian").show();
      $(".search-contian").hide();
    });
    //键盘entry绑定
    $(".search-txt").keydown(function (e) {
      if (e.keyCode == 13) {
        key = $(this).val().trim();
        isInit = true;
        doSearchEvt();
      }
    });
    //搜索点击事件绑定
    $("#search").click(function (event) {
      key = $(".search-txt").val().trim();
      doSearchEvt();
      isInit = true;
    });
  }
  /**
   * [doSearchEvt 搜索执行方法]
   * @return {[]} [description]
   */
  function doSearchEvt() {
    if (!key) {
      layer.closeAll();
      layer.open({
        title: "提示",
        type: 1,
        content: '<div class="megWindow">请输入搜索内容!</div>',
        btnAlign: "c", //按钮居中
        shade: 0.4, //遮罩
      });
    } else {
      renderRerult(key);
      $(".carou-contian").hide("100", function () {
        $(".search-contian").show();
      });
    }
  }
  /**
   * [renderRerult 渲染搜索結果]
   * @param  {[type]} key [搜索关键字]
   * @return {[type]}     [description]
   */
  function renderRerult(key) {
    // https://www.baidu.com/s?wd=加油&pn=10&rn=10&tn=json
    // wd：关键词
    // pn: 查询偏移位置
    // rn: 每页显示多少条，默认为10条，最多50条
    var queryStr = {
      wd: key,
      rn: 20,
      pn: pn,
    };
    laodWait(true);
    $.getJSON(appCom.searchUrl, queryStr, function (data, textStatus, jqXHR) {
      if (textStatus == "success") {
        // console.log(data);
        var list = data["feed"]["entry"];
        var html = template("result-tmp", { list: list });
        document.getElementById("search-list").innerHTML = html;
      }
      laodWait(false);
    });
  }

  /**
   * [renderTopNews 渲染微信精选数据]
   * @param {*}  [description]
   */
  function renderWeXin() {
    // 请求地址：http://v.juhe.cn/weixin/query
    // 请求参数：pno=2&ps=20&dtype=JSON&key=
    var queryStr = {
      pno: 1, //当前页数
      ps: 30, //每页返回条数
    };
    $.getJSON(appCom.wexinUrl, queryStr, function (data, textStatus, jqXHR) {
      if (textStatus == "success") {
        laypageRender("wexin", data);
      }
    });
  }
  /**
   * [renderTopNews 组件初始化公共方法]
   * @param {type}    组件id
   * @param {data}    返回数据
   */
  function laypageRender(type, data) {
    var pageId = type + "-page";
    var panelId = type + "-panel";
    data = data.result.data ? data.result.data : data.result.list;
    laypage.render({
      elem: pageId,
      limit: appCom.limit, //每页显示的条数
      count: data.length,
      theme: appCom.laypageColor,
      layout: ["page", "next"],
      jump: function (obj) {
        //模拟渲染
        console.time("渲染数据耗时");
        document.getElementById(panelId).innerHTML = (function () {
          var arr = [],
            thisData = data
              .concat()
              .splice(obj.curr * obj.limit - obj.limit, obj.limit);
          layui.each(thisData, function (index, item) {
            arr.push(
              '<p class="layui-col-title"><a href=' +
                item.url +
                ' target="_blank">' +
                item.title +
                "</a></p>"
            );
          });
          return arr.join("");
        })();
        console.timeEnd("渲染数据耗时");
      },
    });
  }
  /**
   * [initLayuiComnpent 初始化图片滚动件/分页组件]
   * @return {[type]}       [description]
   */
  function initLayuiComnpent() {
    // 图片滚动组件
    layui.use(["carousel", "form"], function () {
      var carousel = layui.carousel;
      carousel.render({
        elem: "#carou-ind",
        width: "100%",
        indicator: "none",
        arrow: "always",
        interval: 2000,
      });
    });
    // 分页组件
    layui.use(["laypage", "layer"], function () {
      laypage = layui.laypage;
      laypage.render({
        elem: "search-page",
        count: 200, //数据总数
        limit: 10, //每页显示的条数
        limits: [100, 300, 500],
        theme: appCom.laypageColor,
        jump: function (obj, first) {
          pn = obj.curr * 10;
          if (isInit) {
            doSearchEvt();
          }
        },
      });
    });
    //颜色面板显示
    $("#colorShow").click(function (e) {
      $(".colorOption").show();
    });
    //颜色面板隐藏
    $("#colorHide").click(function (e) {
      $(".colorOption").hide();
    });
    //点击切换
    $(".colorPanel").on("click", ".colorTheme", function (e) {
      var colorClass = $(this).prop("className").split(" ")[1];
      document.body.className = colorClass;
      appCom.setLocalStorage("bodyClass", colorClass);
    });
  }
})();
