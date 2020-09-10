##从远程获取最新版本到本地
1.查看远程分支  git remote -v  
2.远程获取最新版本到本地  git fetch origin master:temp
3.比较远程与本地代码  git diff temp  
4.合并远程本地代码 git merge temp
5.删除temp分支 git branch -d temp 

##将本地代码推送到远程
1.初始化版本库 git init    
2.添加到缓存区 git add .
3.把添加的文件提交 git commit -m "update readme"
4.把本地库与远程库关联 git remote add origin git@github.com:ChoLeeMax/weChrom.git
5.第一次推送（提交）代码时：git push -u origin master 
后续提交时 git push origin master 
6 提示出错信息：fatal: remote origin already exists.
解决办法如下: 
先输入$ git remote rm origin, 
再输入$ git remote add origin git@github.com:ChoLeeMax/weChrom.git 就不会报错了！


##查看提交日志
git log -参数

选项	说明
-p	按补丁格式显示每个更新之间的差异。
--word-diff	按 word diff 格式显示差异。
--stat	显示每次更新的文件修改统计信息。
--shortstat	只显示 --stat 中最后的行数修改添加移除统计。
--name-only	仅在提交信息后显示已修改的文件清单。
--name-status	显示新增、修改、删除的文件清单。
--abbrev-commit	仅显示 SHA-1 的前几个字符，而非所有的 40 个字符。
--relative-date	使用较短的相对时间显示（比如，“2 weeks ago”）。
--graph	显示 ASCII 图形表示的分支合并历史。
--pretty	使用其他格式显示历史提交信息。可用的选项包括 oneline，short，full，fuller 和 format（后跟指定格式）。
--oneline	--pretty=oneline --abbrev-commit 的简化用法。


##百度搜索
<!-- <form action="http://www.baidu.com/baidu" target="_blank">
    <input type=text name=word size=40><input type="submit" value="百度搜索">
</form> -->

##中国天气
    <!-- cholee -->
    <div id="weather-view-he"></div>
    <script>
        WIDGET = {
            ID: 'Qq7qu57hrk'
        };
    </script>
    <script type="text/javascript" src="https://apip.weatherdt.com/view/static/js/r.js?v=1111"></script>


https://query.aliyun.com/rest/yundashi.hot-article
https://query.aliyun.com/rest/yundashi.activity_config