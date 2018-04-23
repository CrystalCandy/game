// TypeScript file
//服务器时间
var nowServerTime = 0;
var lastUpdateServerTime = 0;
var pingIndex = 0;
//server,client 时间差
var diffZoneTime = 0; //时区相差
var diffSCTime = 0; //客户端服务器误差时间
function ConfirmRetryLogin(msg, bforce, bautoconnect) {
    bautoconnect = (bautoconnect == null && true || false);
    var callback = {
        onDialogCallback: function (result, userData) {
            if (result == false) {
                return;
            }
            if (bforce) {
                LoginSystem.getInstance().setQuickLogin(false);
                LoginSystem.getInstance().setAutoLogin(bautoconnect);
            }
            LoginSystem.getInstance().changeLoginPrecedure();
        }
    };
    if (bforce) {
        MsgSystem.confirmDialog_YES(msg, callback, null);
    }
    else {
        MsgSystem.confirmDialog(msg, callback, null);
    }
}
function ConfirmRetryQuickLogin(msg) {
    var t = {
        onDialogCallback: function (result, userData) {
            if (result == false) {
                return;
            }
            LoginSystem.getInstance().setQuickLogin(true);
            LoginSystem.getInstance().changeLoginPrecedure();
        }
        //PrecedureManager.getInstance():changePrecedure(PRECEDURE_LOGIN)
    };
    MsgSystem.confirmDialog_YES(msg, t, null);
}
function getDayCount(beginTime, endTime) {
    if (beginTime >= endTime) {
        return 0;
    }
    var d = new Date();
    d.setTime(beginTime * 1000);
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    var newt = Math.floor(d.getTime() / 1000);
    return Math.floor((endTime - newt) / 86400);
}
// function getDayTimeFromMorning(t) {
// 	let d = new Date()
// 	d.setTime(t * 1000)
// 	d.setHours(0)
// 	d.setMinutes(0)
// 	d.setSeconds(0)
// 	d.setMilliseconds(0)
// 	let newt = Math.floor(d.getTime() / 1000)
// 	return newt
// }
//当天指定时间,返回秒
function GetTodayTime(time, hour, min, sec) {
    var d = new Date();
    if (time != null) {
        d.setTime(time * 1000);
    }
    d.setHours(hour || 0);
    d.setMinutes(min || 0);
    d.setSeconds(sec || 0);
    return Math.floor(d.getTime() / 1000);
}
//返回明天凌晨时间
function GetTomorrowTime(time) {
    return GetTodayTime(time) + 86400;
}
function GetTimeDiff(time1, time2) {
    //time1为时间上限
    if (time1 < time2) {
        var temp = time1;
        time1 = time2;
        time2 = temp;
    }
    var min_secs = 60;
    var hour_secs = 3600;
    var day_secs = 86400;
    var diffTime = time1 - time2;
    var time = {};
    time.days = Math.floor(diffTime / day_secs);
    diffTime = diffTime % day_secs;
    time.hours = Math.floor(diffTime / hour_secs);
    diffTime = diffTime % hour_secs;
    time.mins = Math.floor(diffTime / min_secs);
    time.secs = diffTime % min_secs;
    return time;
}
// function SetServerTime(time){
//     nowServerTime = time
//     lastUpdateServerTime =  Math.ceil(core.getCpuTime()/1000) ;
// }
// function GetServerTime():number{
//     return nowServerTime + (Math.ceil(core.getCpuTime()/1000) - lastUpdateServerTime);
// }
function SendSynGameTime() {
    pingIndex = pingIndex + 1;
    var message = GetMessage(ServerOpcodes.CMSG_PING); //发送ping
    message.index = pingIndex;
    SendGameMessage(message);
}
//同一个time，在北京和中国的date是不同的。
//所以初始化时间时，除了发送ServerTime还会发送dateTime，和本地的dateTime作差值
function SetSCDiffTime(serverDateTime) {
    if (!serverDateTime) {
        return;
    }
    diffZoneTime = (serverDateTime - diffSCTime) - GetOSTime();
    //时区最小差30分钟 = 1800秒
    var minZoneSec = 1800;
    if (diffZoneTime < 0) {
        minZoneSec = -1800;
    }
    diffZoneTime = diffZoneTime - (diffZoneTime % minZoneSec);
}
function SetServerTime(time, ispp) {
    diffSCTime = time - GetOSTime();
    nowServerTime = time;
    lastUpdateServerTime = GetCurMillSec();
    // if(ispp ){
    // //	AntiPlugSystem.getInstance().onEventServerPingPongTimeUpdate(time)
    // }
}
function GetServerTime() {
    return nowServerTime + Math.floor((GetCurMillSec() - lastUpdateServerTime) / 1000);
}
//服务器和客户端有可能时区不一致
function GetServerDate(t) {
    if (t == null) {
        t = GetOSTime();
    }
    t = t + diffZoneTime;
    return GetOSDate(t);
}
/////////////////////////////////////////////////////////////////////////////////////////
//时间格式化
function simple_transform_time(difftime) {
    if (difftime < 0) {
        difftime = 0;
    }
    var t = {};
    var time_count = [60 * 60, 60]; //小时，分，秒
    t.hours = Math.floor(difftime / time_count[0]);
    t.mins = Math.floor((difftime - t.hours * time_count[0]) / time_count[1]);
    t.secs = difftime - t.hours * time_count[0] - t.mins * time_count[1];
    return t;
}
//精确到时分
function getFormatTimeEx(time) {
    var dateTime = GetServerDate(time);
    return String.format("%s-%02d-%02d %02d:%02d", dateTime.year, dateTime.month, dateTime.day, dateTime.hour, dateTime.min);
}
function getFormatTime(time) {
    var dateTime = GetServerDate(time);
    return String.format("%s-%02d-%02d", dateTime.year, dateTime.month, dateTime.day);
}
//只显示时分秒
function getFormatTimeSec(time) {
    var dateTime = GetServerDate(time);
    return String.format("%02d:%02d:%02d", dateTime.hour, dateTime.min, dateTime.sec);
}
//时:分:秒
function getFormatDiffTime(difftime) {
    var t = simple_transform_time(difftime);
    return String.format("%02d:%02d:%02d", t.hours, t.mins, t.secs);
}
//分:秒
function getFormatDiffTimeSimple(difftime) {
    var t = simple_transform_time(difftime);
    return String.format("%02d:%02d", t.mins, t.secs);
}
//时:分
function getFormatDiffTimDayHour(difftime) {
    var t = simple_transform_time(difftime);
    return String.format("%02d:%02d", t.hours, t.mins);
}
var g_serverOpenTime = 0;
function SetServerOpenTime(time) {
    g_serverOpenTime = time;
}
//开服时间
function GetServerOpenTime(time) {
    return g_serverOpenTime;
}
//服务器开服天数
function GetServerDay() {
    if (g_serverOpenTime == 0)
        return 1;
    var nowTime = GetServerTime();
    var openTime = GetTodayTime(g_serverOpenTime);
    var diffTime = nowTime - openTime;
    if (diffTime <= 0)
        return 1;
    var day = Math.floor(diffTime / 86400) + 1;
    return day;
}
/////////////////////////////////跨服处理////////////////////////////////////////////////////
var CS_BEGIN = 1; //连接跨服
var CS_FINISH = 2; //连接本服
var g_CrossServerInfo = null;
function IsCrossServer() {
    return g_CrossServerInfo && g_CrossServerInfo.state == CS_BEGIN;
}
//跨服连接
function ConfirmBeginCrossServer(msg, ip, port, nickName, userId) {
    var func = function () {
        g_CrossServerInfo = {};
        g_CrossServerInfo.ip = ip;
        g_CrossServerInfo.port = port;
        g_CrossServerInfo.state = CS_BEGIN;
        g_CrossServerInfo.userId = userId;
        g_CrossServerInfo.nickName = nickName;
        LoginSystem.getInstance().changeLoginPrecedure();
    };
    if (msg && msg != "") {
        var t = {
            onDialogCallback: function (result, userData) {
                if (result == false) {
                    return;
                }
                func();
                //PrecedureManager.getInstance().changePrecedure(PRECEDURE_LOGIN)
            }
        };
        MsgSystem.confirmDialog(msg, t, null);
    }
    else {
        func();
    }
}
function ConfirmFinishCrossServer(msg) {
    if (!IsCrossServer()) {
        return;
    }
    TLog.Assert(g_CrossServerInfo);
    function func() {
        g_CrossServerInfo.state = CS_FINISH;
        LoginSystem.getInstance().changeLoginPrecedure();
    }
    if (msg && msg != "") {
        var t = {
            onDialogCallback: function (result, userData) {
                if (result == false) {
                    return;
                }
                return func();
            }
        };
        return MsgSystem.confirmDialog(msg, t, null);
    }
    func();
}
//返回null表示不再任何跨服活动内；返回false表示不再指定跨服活动但在跨服服务器内；true
function IsInGlobalActvity(actIndex) {
    if (!g_CrossServerInfo) {
        return null;
    }
    return g_CrossServerInfo.userId == actIndex;
}
//返回null表示不在任何跨服内或跨服中但不在活动中
function GetGlobalActivityIndex() {
    if (!g_CrossServerInfo) {
        return null;
    }
    return g_CrossServerInfo.userId;
}
//# sourceMappingURL=Interface_Core.js.map