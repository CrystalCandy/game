call %~dp0tool_config.bat
echo off

ARGS_CROSSDOMAIN=

set QD_PROJECT=Win32GameSdk
set QD_RESOURCE=win32

call %~dp0tool_publish.bat


::Êä³öµ½win32 publishÄ¿Â¼
set PUBLISH_PC_PATH=%PACK_ROOT_PATH%\..\..\..\..\publish
rmdir /s/q %PUBLISH_PC_PATH%\resource\
xcopy %PACK_ROOT_PATH%\bin-release\%RELEASE_TYPE%\out %PUBLISH_PC_PATH% /E /y /i

pause