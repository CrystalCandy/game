::call %~dp0tool_config.bat
::echo off



set OUT_PATH=%PUBLISH_RESOURCE_PATH%\%QD_RESOURCE%


::�ϲ���Դ                                                                     
rmdir /s/q %PACK_TEMP_PATH%\resourcetemp

::����
xcopy %PACK_ROOT_PATH%\%RESOURCE_PATH% 			  %PACK_TEMP_PATH%\resourcetemp /E /y /i /H

::���Ƶ�ǰ���Ե���Դ,ɾ��language�ļ���
xcopy %PACK_ROOT_PATH%\%RESOURCE_PATH%\language\%LANGUAGE%          %PACK_ROOT_PATH%\%RESOURCE_PATH% /E /y /i
rmdir /s/q %PACK_ROOT_PATH%\%RESOURCE_PATH%\language

::����SDK��Դ
xcopy %SDK_ROOT_PATH%\%QD_PROJECT%\%RESOURCE_PATH% 			  %PACK_ROOT_PATH%\%RESOURCE_PATH% /E /y /i

::���
publish_game.py %ARGS_CROSSDOMAIN% %ARGS_NATIVE%


::�ָ�
rmdir /s/q %PACK_ROOT_PATH%\%RESOURCE_PATH%
xcopy %PACK_TEMP_PATH%\resourcetemp 			  %PACK_ROOT_PATH%\%RESOURCE_PATH% /E /y /i /H


::��������Ŀ¼
rmdir /s/q %OUT_PATH%

::sdk��ģ��copy��ȥ
xcopy %SDK_ROOT_PATH%\%QD_PROJECT%\template %PACK_ROOT_PATH%\bin-release\%RELEASE_TYPE%\out  /E /y /i

::������Դ
xcopy %PACK_ROOT_PATH%\bin-release\%RELEASE_TYPE%\out %OUT_PATH% /E /y /i
rmdir /s/q %PACK_TEMP_PATH%\resourcetemp



echo =========================���=========================
echo RESOURCE_PATH=%RESOURCE_PATH%
echo LANGUAGE=%LANGUAGE%
echo OUT_PATH=%OUT_PATH%
echo QD_PROJECT=%QD_PROJECT%

