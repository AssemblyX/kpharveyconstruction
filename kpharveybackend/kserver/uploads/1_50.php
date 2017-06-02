<?php
include_once("class/class.mysql.php");
include_once("class/class.mysqlfilter.php");
$db = new MysqlFilter();
$txt = file_get_contents('php://input');


$a = array();
$a["data_json"] = $txt;
$session_id = $db->fInsert("lol.tbl_data", $a);
