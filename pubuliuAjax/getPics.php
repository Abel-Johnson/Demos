<?php
/**
 * 使用国外网站API请求瀑布流图片
 * @authors Your Name (you@example.org)
 * @date    2017-02-22 17:50:56
 * @version $Id$
 */

header('content-type:text/html; charset="utf-8"');
/*
	API: 
	getPics.php

	参数: 
	cpage: 获取哪一页的图片数据
*/

$cpage = isset($_POST['cpage'])?$_POST['cpage']:1;
$url = 'http://www.wookmark.com/api/json/popular?page='.$cpage;
$content = file_get_contents($url);
$content = iconv('gbk','utf-8',$content);

echo $content;