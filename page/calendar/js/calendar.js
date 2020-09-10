(
    function(param) {
        initLayui();
        getHistory();
        queryCalendar();
        getStarData("白羊座");
        renderTable();
        /***
         * 初始化layui组件
         */
        function initLayui() {
            //导航栏
            layui.use('element', function() {
                var element = layui.element;
                //tab切换点击事件
                element.on('tab(tabTo)', function(elem) {
                    console.log(elem);
                });
            });
            //下拉刷新
            layui.use('flow', function() {
                flow = layui.flow;
            });
            // 初始化时间组件
            layui.use('laydate', function() {
                var laydate = layui.laydate;
                laydate.render({
                    elem: '#dateSelect',
                    calendar: true, //开启节日
                    showBottom: false, //不现实地图按钮
                    position: 'static',
                    done: function(value, date) {
                        queryCalendar(value);
                    },
                    change: function(value, date) {
                        queryCalendar(value);
                    }
                });
            });
            //首页星座运势点击事件
            $('.luckyStar-sel .luckyStar-btn').click(function(e) {
                e.preventDefault();
                var star = $(this).text();
                $(this).addClass('luckyStar-warm').siblings().removeClass('luckyStar-warm');
                $('#luckyStar-title').html(star);
                getStarData(star);
            });
        }

        function renderTable() {
            //table组件
            layui.use('table', function() {
                var laytable = layui.table;
                laytable.render({
                    elem: '#layui-starTable',
                    height: 313,
                    skin: "line", // line行边框风格,row列边框风格,nob无边框风格
                    url: './json/luckyStar.json', //数据接口
                    cols: [
                        [ //表头
                            { field: 'name', title: '星座' },
                            { field: 'date', title: '日期', sort: true },
                            { field: 'jieqi', title: '节气' },
                            { field: 'wuxin', title: '元素' },
                            { field: 'hubu', title: '互补' }
                        ]
                    ]
                });
            });
        }

        /**
         * 星座运势数据
         * name 星座名称(白羊座)
         */
        function getStarData(name) {
            var _url = appCom.luckyStarUrl;
            var _data = {
                "name": name
            };
            var _class = ["career", "love", "health", "finance"];
            laodWait(true);
            $.ajax({
                type: "GET",
                url: _url,
                data: _data,
                dataType: "JSON",
                success: function(res) {
                    if (res['error_code'] == "0") {
                        $('.lukey-info').html(res['mima'].info);
                        $('.lukey-text').html(res['mima'].text[0]);
                        _class.forEach(function(item) {
                            if (res[item]) {
                                $('.lukey-' + item + '').html(res[item]);
                            }
                        });
                    }
                    laodWait(false);
                }
            });
        }
        /**
         * 历史数据加载
         */

        function getHistory() {
            var _timer = new Date();
            var _url = appCom.historyUrl;
            var _data = {
                "month": _timer.getMonth() + 1,
                "day": _timer.getDate(),
            };
            laodWait(true);
            $.ajax({
                type: "GET",
                url: _url,
                data: _data,
                dataType: "JSON",
                success: function(res) {
                    var sortData = appCom.sortArr(res["result"], "year", false);
                    flow.load({
                        elem: "#tody-list",
                        done: function(_page, _next) {
                            setTimeout(function() {
                                var lis = sortData.slice((_page - 1) * 6, _page * 6);
                                _next(template('tody-tmp', { list: lis }), _page < 6); //假设总页数为 10
                            }, appCom.flowTime);
                        }
                    });
                    laodWait(false);
                }

            });
        }
        /**
         * 黄历查询
         * date 2019-01-01
         */
        function queryCalendar(dateSel) {
            if (!dateSel) {
                var timer = new Date();
                var MH = timer.getMonth() + 1;
                dateSel = timer.getFullYear() + "-" + MH + "-" + timer.getDate();
            }
            var _url = appCom.huanliUrl;
            var _data = {
                "date": dateSel
            };
            laodWait(true);
            $.ajax({
                type: "GET",
                url: _url,
                data: _data,
                dataType: "JSON",
                success: function(res) {
                    if (res['error_code'] == "0") {
                        var obj = res.result;
                        var domArr = document.getElementsByClassName("huanli-text");
                        $.each($(domArr), function() {
                            $(this).html(obj[$(this).data("key")]);
                        });
                    }
                    laodWait(false);
                }
            });

        }
    }
)();