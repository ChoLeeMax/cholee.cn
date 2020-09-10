(
    function(param) {
        var list = "newlist",
            page = 1;
        initLayui();
        getTextData("29", list);
        /***
         * 初始化layui组件
         */
        function initLayui() {
            //导航栏
            layui.use('element', function() {
                var element = layui.element;
                //tab切换
                element.on('tab(tabTo)', function(elem) {
                    $('.jok-word').html("");
                    getTextData($(this).data("type"), "newlist");
                });
            });
            //图片下拉自动加载
            layui.use('flow', function() {
                flow = layui.flow;
            });
            //加载更多
            $('.laodMore').click(function(e) {
                getTextData("29", "list", ++page);
            });
        };
        /***
         * 获取段子部分数据
         * type: 10表示图片,29表示文字,41表示视频
         * a:newlist表示加载最新
         */
        function getTextData(type, list) {
            console.time("加载数据耗时");
            var _data = {
                type: type,
                page: page,
                list: list
            }
            laodWait(true);
            $.ajax({
                type: "GET",
                url: appCom.jokeUrl,
                data: _data,
                dataType: 'json',
                success: function(res) {
                    console.timeEnd("加载数据耗时");
                    console.time("渲染数据耗时");
                    if (res.list) {
                        if (type.toString() == "10") {
                            //渲染图片
                            renderFlow("jok-img", res.list);
                        } else if (type.toString() == "29") {
                            //渲染文字
                            $('#jok-word-list').append(template('jok-word-tmp', { list: res.list }));
                        } else if (type.toString() == "41") {
                            //视频模板
                            renderFlow("jok-video", res.list, 'jok-word-tmp');
                        }
                    }
                    console.timeEnd("渲染数据耗时");
                    laodWait(false);
                }
            });
        };
        /**
         * [renderFlow 组件初始化公共方法]
         * @param {id}    组件id
         * @param {data}  返回数据
         * @param {tmp}   模板名称
         */
        function renderFlow(id, data, tmp) {
            var elem = '#' + id + "-list";
            var temp = tmp ? tmp : id + "-tmp";
            flow.load({
                elem: elem,
                done: function(_page, _next) {
                    setTimeout(function() {
                        var lis = data.slice((_page - 1) * 4, _page * 4);
                        _next(template(temp, { list: lis }), _page < 6); //假设总页数为 10
                    }, appCom.flowTime);
                }
            });
        }
    }
)()