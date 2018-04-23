::@echo off

::资源目录
set RESOURCE_PATH=resource


::临时打包目录
set PACK_TEMP_PATH=%~dp0
::打包根目录
set PACK_ROOT_PATH=%~dp0\..\..\


set SDK_ROOT_PATH=%PACK_ROOT_PATH%\src\enginesdk


set RELEASE_TYPE=web
set LANGUAGE=zh-cn


::打包资源目录
set PUBLISH_RESOURCE_PATH=%PACK_ROOT_PATH%\..\publish_resource



::命令行参数
::native打包 -n
set ARGS_NATIVE=

::跨域(编译图片为js) -c
set ARGS_CROSSDOMAIN=

