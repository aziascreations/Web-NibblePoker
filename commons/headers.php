<?php
// Making sure the file is included and not accessed directly.
if(basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
    header('HTTP/1.1 403 Forbidden');
    die();
}
?>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
<meta name="viewport" content="width=device-width" />
<meta content="cache, store" http-equiv="Cache-Control">
<meta content="cache, store" http-equiv="Pragma">
<meta content="3600" http-equiv="Expires">
<meta name="theme-color" content="#1D2023">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="alternate icon" href="/favicon.ico">
<link rel="stylesheet" href="/resources/HalfMoon/1.1.1/css/halfmoon-variables.min.css" />
<link rel="stylesheet" href="/resources/FontAwesomePro/5.15.3/css/all.min.css">
<link rel="stylesheet" href="/resources/Azias/css/nibblepoker.lu.min.css">
<?php
// Causes Chrome to bitch about the cross-origin header.
// <link rel="preload" href="/resources/Quantum/Quantum.otf" as="font">
// <link rel="preload" href="/resources/FontAwesomePro/5.15.3/webfonts/fa-duotone-900.woff2" as="font">
// <link rel="preload" href="/resources/FontAwesomePro/5.15.3/webfonts/fa-brands-400.woff2" as="font">
// <link rel="preload" href="/resources/FontAwesomePro/5.15.3/webfonts/fa-solid-900.woff2" as="font">
// <link rel="preload" href="/resources/Azias/imgs/3px-tile-0.1.png" as="image">
// <link rel="preload" href="/resources/Azias/imgs/3px-tile.png" as="image">
?>
