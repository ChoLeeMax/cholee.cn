/**
 * 项目公共方法、公共配置读取文件
 *Copyright: Copyright © 2018-2019 cholee AllRightsReserved
 *Created on 2018-12-28
 *Author:cholee
 *Version 1.0
 */
(function(win) {
    var appCom = {};
    //下拉刷新delay
    appCom.flowTime = 500;
    // 遮罩透明度
    appCom.layerShade = 0.4;
    appCom.aliPromote = "https://promotion.aliyun.com/ntms/yunparter/invite.html?userCode=2w2innsn";
    //http://t.cn/EMWx18n
    appCom.limit = 6; //分页显示条数目
    //分页按钮颜色
    appCom.laypageColor = "#1E9FFF";
    // nba排名
    appCom.nbaRank = "http://www.cholee.cn/ask/nba.php";
    // 天气请求配置
    appCom.weatherUrl = "https://free-api.heweather.net/s6/weather";
    appCom.apiKey = "7d4883c5e452421488debab9be7dd81f";
    //段子数据接口
    appCom.jokeUrl = "http://localhost:3001/api/joke_list/";
    //历史数据接口
    appCom.historyUrl = "http://www.cholee.cn/ask/history.php";
    //星座运势接口
    appCom.luckyStarUrl = "http://www.cholee.cn/ask/constellatory.php";
    //黄历查询
    appCom.huanliUrl = "http://www.cholee.cn/ask/huanli.php";
    // 百度搜索
    appCom.searchUrl = "http://www.cholee.cn/ask/search.php";
    // 新闻入口
    appCom.topNewsUrl = "http://www.cholee.cn/ask/getnews.php";
    // 微信精选
    appCom.wexinUrl = "http://www.cholee.cn/ask/wexin.php";
    //头条地址
    appCom.toutiao='https://landing.toutiao.com';
    appCom.toutiaoUrl='http://localhost:3001/api/news_list/';
    // 公共ajax方法
    appCom.comAjax = function(url, type, data, callback) {
        $.ajax({
            type: type,
            url: url,
            data: data,
            dataType: "jsonp",
            success: callback(res)
        });
    };
    //数组排序
    /**
     * 数组排序
     * data,表示原数组，如[{val:4},{val:2}]
     * key,表示要排序的属性值val
     * flag,true表示顺序，false表示降序
     */
    appCom.sortArr = function(arry, key, flag) {
        var sortFun;
        if (flag) {
            sortFun = function(a, b) {
                return a[key] - b[key];
            }
        } else {
            sortFun = function(a, b) {
                return b[key] - a[key];
            }
        }
        arry.sort(sortFun);
        return arry;
    };
    /**
     * 保存本地缓存
     * @param {*} key 缓存索引
     * @param {*} data 缓存数据可以是数组/对象/字符串等
     */
    appCom.setLocalStorage = function(key, data) {
        localStorage.setItem(key, data);
    };
    /**
     * 获取本地缓存
     * @param {*} key 缓存索引
     * return boolean
     */
    appCom.getLocalStorage = function(key) {
        var bool = localStorage.getItem(key);
        if(!bool){
            bool-false;
        }
        return bool;
    };
    /**
     * 获取本地缓存
     * @param {*} key
     */
    appCom.delLocalStorage = function(key) {
        if (key) {
            localStorage.removeItem(key);
            return;
        }　
        //不传参数清楚所有缓存
        localStorage.clear();
    };

    /**
     * 初始化时间、时间格式
     * @param {*} formart 时间格式 yyyy年MM月dd日/yyyy-MM-dd
     */
    appCom.initTime = function(formart) {
        //生成读秒
        var timer = new Date();
        // var H = timer.getHours();
        // var M = timer.getMinutes();
        // var S = timer.getSeconds();
        var Y = timer.getFullYear();
        var MH = timer.getMonth() + 1;
        var D = timer.getDate();
        // M = M >= 10 ? M : "0" + M;
        // S = S >= 10 ? S : "0" + S;
        MH = MH >= 10 ? MH : "0" + MH;
        D = D >= 10 ? D : "0" + D;

        if (formart == "yyyy年MM月dd日") {
            return Y + "年" + MH + "月" + D + "日";
        }
        if (formart == "yyyy-MM-dd") {
            return Y + "-" + MH + "-" + D;
        }
    };
    window.appCom = appCom;
})(window);