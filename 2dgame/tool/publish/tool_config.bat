::@echo off

::��ԴĿ¼
set RESOURCE_PATH=resource


::��ʱ���Ŀ¼
set PACK_TEMP_PATH=%~dp0
::�����Ŀ¼
set PACK_ROOT_PATH=%~dp0\..\..\


set SDK_ROOT_PATH=%PACK_ROOT_PATH%\src\enginesdk


set RELEASE_TYPE=web
set LANGUAGE=zh-cn


::�����ԴĿ¼
set PUBLISH_RESOURCE_PATH=%PACK_ROOT_PATH%\..\publish_resource



::�����в���
::native��� -n
set ARGS_NATIVE=

::����(����ͼƬΪjs) -c
set ARGS_CROSSDOMAIN=

