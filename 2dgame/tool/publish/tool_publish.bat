::call %~dp0tool_config.bat
::echo off



set OUT_PATH=%PUBLISH_RESOURCE_PATH%\%QD_RESOURCE%


::合并资源                                                                     
rmdir /s/q %PACK_TEMP_PATH%\resourcetemp

::备份
xcopy %PACK_ROOT_PATH%\%RESOURCE_PATH% 			  %PACK_TEMP_PATH%\resourcetemp /E /y /i /H

::复制当前语言的资源,删除language文件夹
xcopy %PACK_ROOT_PATH%\%RESOURCE_PATH%\language\%LANGUAGE%          %PACK_ROOT_PATH%\%RESOURCE_PATH% /E /y /i
rmdir /s/q %PACK_ROOT_PATH%\%RESOURCE_PATH%\language

::拷贝SDK资源
xcopy %SDK_ROOT_PATH%\%QD_PROJECT%\%RESOURCE_PATH% 			  %PACK_ROOT_PATH%\%RESOURCE_PATH% /E /y /i

::打包
publish_game.py %ARGS_CROSSDOMAIN% %ARGS_NATIVE%


::恢复
rmdir /s/q %PACK_ROOT_PATH%\%RESOURCE_PATH%
xcopy %PACK_TEMP_PATH%\resourcetemp 			  %PACK_ROOT_PATH%\%RESOURCE_PATH% /E /y /i /H


::输出到打包目录
rmdir /s/q %OUT_PATH%

::sdk的模板copy过去
xcopy %SDK_ROOT_PATH%\%QD_PROJECT%\template %PACK_ROOT_PATH%\bin-release\%RELEASE_TYPE%\out  /E /y /i

::拷贝资源
xcopy %PACK_ROOT_PATH%\bin-release\%RELEASE_TYPE%\out %OUT_PATH% /E /y /i
rmdir /s/q %PACK_TEMP_PATH%\resourcetemp



echo =========================完成=========================
echo RESOURCE_PATH=%RESOURCE_PATH%
echo LANGUAGE=%LANGUAGE%
echo OUT_PATH=%OUT_PATH%
echo QD_PROJECT=%QD_PROJECT%

