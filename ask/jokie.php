<?php 
header('Access-Control-Allow-Origin:*');
header('Content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Methods:POST,GET'); // 允许请求的类型
header('Access-Control-Allow-Credentials: true'); // 设置是否允许发送 cookies
header('Access-Control-Allow-Headers: Content-Type,Content-Length,Accept-Encoding,X-Requested-with, Origin'); 
//phpinfo();
//暂时使用get请求
$type = $_GET['type'];
$a = $_GET['list'];
$page = $_GET['page'];

date_default_timezone_set('PRC');//设置中国时区
//************1.星座运势************
//分页
//https://api.budejie.com/api/api_open.php?a=list&c=data&type=10&page=1&maxtime=0
$url = "https://api.budejie.com/api/api_open.php";
$maxtime=time();
$params = array(
    "a" => $a,
    "c" => 'data',
    "page"=>$page,
    "maxtime"=>$maxtime,
    "type" => $type,//type: 10表示图片,29表示文字,41表示视频
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
    // curl_setopt( $ch, CURLOPT_USERAGENT , 'cholee' );
    // curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT , 30 );
    // curl_setopt( $ch, CURLOPT_TIMEOUT , 30);
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER , true );
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt( $ch , CURLOPT_URL , $url.'?'.$params );
    $response = curl_exec( $ch );
    curl_close( $ch );
    return $response;
}
 ?>