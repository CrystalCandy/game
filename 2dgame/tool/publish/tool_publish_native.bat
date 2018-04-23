call %~dp0tool_config.bat
echo off

set ARGS_NATIVE=-n

::set QD_PROJECT=Win32GameSdk
::set QD_RESOURCE=win32

call %~dp0tool_publish.bat


pause