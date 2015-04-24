<?php
header("Content-Type: image/".substr($_REQUEST["url"], -3));

sleep(mt_rand($_REQUEST["sleep"], $_REQUEST["sleep"] * 1.5));

readfile($_REQUEST["url"]);