<?php 
header('Access-Control-Allow-Origin:*');
header('Content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Methods:POST,GET'); // 允许请求的类型
header('Access-Control-Allow-Credentials: true'); // 设置是否允许发送 cookies
header('Access-Control-Allow-Headers: Content-Type,Content-Length,Accept-Encoding,X-Requested-with, Origin'); 
//phpinfo();
//暂时使用get请求
$wd = $_GET['wd'];
$rn = $_GET['rn'];
$pn = $_GET['pn'];


//************1.百度搜索************
//分页
// https://www.baidu.com/s?wd=加油&pn=50&rn=50&tn=json
// wd：关键词
// pn :  查询偏移位置
// rn:  每页显示多少条，默认为10条，最多50条
$url = "https://www.baidu.com/s";

$params = array(
    "wd" => $wd,
    "pn" => $pn,
    "rn" => $rn,
    "tn" => 'json'
);
$paramstring = http_build_query($params);
$content = juhecurl($url,$paramstring);
$result = json_decode($content,true);
if($result){
    print_r($content);
}else{
    echo "请求失败";
}
/**
 * 请求接口返回内容
 * @param  string $url [请求的URL地址]
 * @param  string $params [请求的参数]
 * @param  int $ipost [是否采用POST形式]
 * @return  string
 */
function juhecurl($url,$params=false,$ispost=0){
    $httpInfo = array();
    $ch = curl_init();
    curl_setopt( $ch, CURLOPT_HTTP_VERSION , CURL_HTTP_VERSION_1_1 );
    curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT , 30 );
    curl_setopt( $ch, CURLOPT_TIMEOUT , 30);
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER , true );
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt( $ch , CURLOPT_URL , $url.'?'.$params );
    $response = curl_exec( $ch );
    curl_close( $ch );
    return $response;
}
 ?>