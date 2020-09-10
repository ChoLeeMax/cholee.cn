/**
 * 页面初始化，如头部、脚部、天气信息等
 *Copyright: Copyright © 2018-2019 cholee AllRightsReserved
 *Created on 2018-12-28
 *Author:cholee
 *Version 1.0
 */
(function (param) {
  //设置页面主题色
  if (appCom.getLocalStorage("bodyClass")) {
    document.body.className = appCom.getLocalStorage("bodyClass");
  } else {
    document.body.className = "layui-bg-grayed";
  }
  //加载头部
  var header = document.getElementById("com-header");
  var pathName = window.location.pathname.split("/")[2]; //头部是否加载菜单
  if (pathName) {
    $(header).load("../../page/com/html/header.html", function (data) {
      document.getElementById(pathName).classList.add("layui-this");
    });
  } else {
    getLocat();
  }
  // 加载脚部
  var footer = document.getElementById("com-footer");
  $(footer).load("../../page/com/html/footer.html");

  window.onscroll = function () {
    var bodyTop = document.documentElement.scrollTop || document.body.scrollTop; //纵向滚动距离
    var scrol = document.getElementById("backTop");
    if (bodyTop > 10) {
      scrol.style.display = "block";
      $(".top-nav").addClass("top-nav-scroll");
    } else {
      scrol.style.display = "none";
      $(".top-nav").removeClass("top-nav-scroll");
    }
  };
  //返回顶部
  window.backTop = function (evt) {
    var bodyTop = document.documentElement.scrollTop || document.body.scrollTop; //纵向滚动距离
    if (bodyTop && bodyTop != 0) {
      evt.style.display = "none";
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    }
  };
  /**
   * loading加载
   */
  window.laodWait = function (flag) {
    var load = document.getElementsByClassName("com-loading")[0];
    if (flag) {
      load.style.display = "block";
    } else {
      load.style.display = "none";
    }
    // setTimeout(function(param) {
    //     laodWait(false);
    // }, 300);
  };
  /**
   * 获取位置信息
   */
  function getLocat() {
    //表示定位成功
    // localStorage.clear();
    if (appCom.getLocalStorage("location")) {
      initWeatherContent(appCom.getLocalStorage("location", cityName));
    } else {
      if (returnCitySN && returnCitySN["cname"]) {
        // 广东省深圳市宝安区
        var addRess = returnCitySN["cname"];
        var sInx = addRess.indexOf("省") + 1;
        var eInx = addRess.indexOf("市");
        var cityName = addRess.substring(sInx, eInx);
        //本地缓存，用于其他页面
        appCom.setLocalStorage("location", cityName);
        initWeatherContent(cityName);
      }
    }
  }
  /**
   * 初始化天气
   */
  function initWeatherContent(city) {
    var weatherUrl =
      appCom.weatherUrl + "?location=" + city + "&key=" + appCom.apiKey;
    $.get(weatherUrl, function (data) {
      var res = data.HeWeather6[0];
      if (res.status == "ok") {
        var obj = res.now;
        appCom.setLocalStorage("HeWeather", obj);
        renderContent(city, obj);
      }
    });
  }
  /**
   * 渲染天气数据
   * @param {*} city
   * @param {*} obj
   */
  function renderContent(city, obj) {
    var htmlStr = "";
    if (city && obj) {
      htmlStr =
        "<span>" +
        city +
        "：" +
        obj.tmp +
        "℃</span>" +
        // '<img title="' + obj.cond_txt + '" class="bgimg move" src="' + appCom.imgUrl + obj.cond_code + '.png">' +
        '<span class="line"></span>';
    }
    $("#weather-info").html(htmlStr);
    //天气更多点击事件
    $("#weather-info").click(function (e) {
      layer.closeAll();
      layer.open({
        title: "天气信息",
        skin: "custom-class",
        id: "weatherInfo",
        type: 2,
        area: ["520px", "310px"],
        content: "./page/com/html/weatherInfo.html",
      });
    });
  }

  /**
   * layui 头部加载组件初始化
   */
  layui.use("element", function () {
    var element = layui.element;
    //监听导航点击
    element.on("nav(hrefTo)", function (elem) {
    //   console.log(elem);
    });
  });

  // 弹出层
  layui.use("layer", function () {
    window.layer = layui.layer;
    layer.config({
      resize: false,
      btnAlign: "l", //按钮居中
      move: false,
      scrollbar: false,
      shade: appCom.layerShade, //遮罩
    });
  });

  //动画加载
  window.onload = function () {
    //配置
    var config = {
      vx: 4, //小球x轴速度,正为右，负为左
      vy: 4, //小球y轴速度
      height: 2, //小球高宽，其实为正方形，所以不宜太大
      width: 2,
      count: 150, //点个数
      color: "255, 255, 255", //点颜色
      stroke: "255, 255, 255", //线条颜色
      dist: 6000, //点吸附距离
      e_dist: 20000, //鼠标吸附加速距离
      max_conn: 10, //点到点最大连接数
    };
    //调用
    CanvasParticle(config);
  };
})();
