(function(param) {
    // 图片url
    var imgBaseSrc = 'https://china.nba.com/media/img/teams/logos/name_logo.svg'; //name=POR
    //比赛url
    var gameBaseUrl = "https://china.nba.com/static/data/scores/daily_time.json";
    //排名请求路径
    var baseRankUrl = "https://china.nba.com/static/data/season/conferencestanding.json";
    // 球队详情
    var teamBaseUrl = "https://china.nba.com/team/";
    initLayDate();
    initTeamScores(appCom.initTime("yyyy-MM-dd"));
    /**
     * [initLayDate 初始化时间控件]
     * @ [description]
     */
    function initLayDate() {
        var startDat = appCom.initTime("yyyy年MM月dd日");
        layui.use('laydate', function() {
            var laydate = layui.laydate;
            //初始赋值
            laydate.render({
                elem: '#selDate',
                value: startDat,
                format: 'yyyy年MM月dd日',
                isInitValue: true,
                calendar: true,
                btns: ['now', 'confirm'],
                done: function(value, date) {
                    var selDat = value.replace('年', '-').replace('月', '-').replace('日', '');
                    initTeamScores(selDat);
                }
            });
        });
        layui.use('element', function() {
            var element = layui.element;
            //监听导航点击
            element.on('tab(tabclick)', function(elem) {
                if (elem.index === 1) {
                    initTeamRank();
                }
            });
        });
    }
    /**
     * [initTeamRank NBA排名、赛程]
     * @return  [description]
     */
    function initTeamRank() {
        laodWait(true);
        $.getJSON(appCom.nbaRank + '?baseUrl=' + baseRankUrl,
            function(data, textStatus, jqXHR) {
                laodWait(false);
                if (textStatus == "success") {
                    for (let i = 0; i < data.payload.standingGroups.length; i++) {
                        const item = data.payload.standingGroups[i];
                        renderTable(item);
                    }
                }
            }
        );
    }
    /**
     * [initTeamRank NBA排名、赛程]
     * @return {[]} [description]
     */
    function initTeamScores(time) {
        var tempdata = [];
        laodWait(true);
        $.getJSON(appCom.nbaRank + '?baseUrl=' + gameBaseUrl.replace('time', time),
            function(data, textStatus, jqXHR) {
                laodWait(false);
                var respDate = data.payload.date;
                $('.paneltitle').text(respDate.gameCount);
                respDate["games"].forEach(function(item, index) {
                    var dt = new Date(parseInt(item.profile.utcMillis));
                    var mn = dt.getMinutes();
                    mn = mn < 10 ? '0' + mn : mn
                    item.profile.time = dt.getHours() + ':' + mn;
                    var homeObj = item.homeTeam,
                        awayObj = item.awayTeam;
                    homeObj.imgSrc = imgBaseSrc.replace('name', homeObj.profile.abbr);
                    homeObj.teamSrc = teamBaseUrl.replace('team', homeObj.profile.code);
                    awayObj.imgSrc = imgBaseSrc.replace('name', awayObj.profile.abbr);
                    awayObj.teamSrc = teamBaseUrl.replace('team', awayObj.profile.code);
                    if (homeObj.matchup.wins != "0" && homeObj.matchup.losses != "0") {
                        homeObj.games = homeObj.matchup.wins + "-" + homeObj.matchup.losses;
                        awayObj.games = awayObj.matchup.wins + "-" + awayObj.matchup.losses;
                    }
                    tempdata.push(item);
                });
                var strH5 = template('score-list-tmp', { list: respDate.games });
                document.getElementById('score-list').innerHTML = strH5;
            }
        );
    }


    function renderTable(data) {
        var tempdata = [];
        var idFlag = "";
        data['teams'].forEach(function(item, index) {
            var obj = item.standings;
            obj.name = item.profile.name;
            obj.imgSrc = imgBaseSrc.replace('name', item.profile.abbr);
            obj.teamSrc = teamBaseUrl.replace('team', item.profile.code);
            obj.homeGame = obj.homeWin + "-" + obj.homeLoss;
            obj.roadGame = obj.roadWin + "-" + obj.roadLoss;
            tempdata.push(obj);
        });
        if (data.conference.toLowerCase().indexOf("west") >= 0) {
            idFlag = '#westReamRank';
        } else {
            idFlag = '#eastTeamRank';
        }
        //table组件

        layui.use('table', function() {
            var laytable = layui.table;
            laytable.render({
                elem: idFlag,
                // height: 313,
                skin: "line", // line行边框风格,row列边框风格,nob无边框风格
                data: appCom.sortArr(tempdata, "wins"), //数据接口
                limit: 20,
                even: true,
                cols: [
                    [
                        { field: '', width: 60, title: '排名', templet: '<div><span>{{d.LAY_INDEX}}</span></div>' },
                        { field: 'name', width: 120, title: '球队', templet: '<div><a href={{d.teamSrc}} target="_Blank"><img class="teamImg" src={{d.imgSrc}}><span>{{d.name}}</span></div></a>' },
                        { field: 'wins', width: 60, title: '胜', sort: true },
                        { field: 'losses', width: 60, title: '负' },
                        { field: 'winPct', title: '胜率' },
                        { field: 'confGamesBehind', title: '胜场差' },
                        { field: 'homeGame', title: '主场' },
                        { field: 'roadGame', title: '客场' },
                        { field: 'streak', title: '连续胜负' },
                        { field: 'pointsFor', title: '场均得分' },
                        { field: 'pointsAgainst', title: '场均失分' }
                    ]
                ]
            });
        });
    }
})();