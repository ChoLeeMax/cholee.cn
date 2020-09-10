(function() {
    renderTopNews();
    /**
     * [renderTopNews 渲染头条数据]
     * @param {*}  [description]
     */
    function renderTopNews() {
        layui.use('flow', function() {
            flow = layui.flow;
        });
        var queryStr = {
            type: "top"
        };
        laodWait(true);
        $.getJSON(appCom.topNewsUrl, queryStr,
            function(data, textStatus, jqXHR) {
                if (textStatus == "success") {
                    renderFlow("top-list", data.result.data);
                    laodWait(false);
                }
            }
        );
    }
    /**
     * [renderFlow 组件初始化公共方法]
     * @param {id}    组件id
     * @param {data}  返回数据
     * @param {tmp}   模板名称
     */
    function renderFlow(id, data) {
        var elem = '#' + id;
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