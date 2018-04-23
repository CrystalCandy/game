/*
作者:
    yangguiming
    
创建时间：
    2014.07.31(星期四)

意图：
  活动定义

公共接口：
    
*/
////////////////////////////////////////////////////////////////////////////////
//PayActivityDefine = {
//	createRoleDailyRecharge  : "createRoleDailyRecharge", //创角每日充值
//	singleRecharge  : "singleRecharge", //单笔礼包
//	limitRecharge 		: "limitRecharge", //限时累冲
//	limitConsume 		: "limitConsume", //限时累消
//	
//}
ImportType(OrdinaryActivityIndex);
OrdinaryActivityIndex.UNDEFINEACTIVITY = -1; //未定义活动，表示有活动但OrdinaryActivityIndex里未定义
//七天活动天数
var SEVEN_ACTIVITY_DAY = 7;
////////////////////////////////////////////////////////////////////////////////
var ActivityDefine = {
    //领奖
    Welfare: 1,
    Champion: 2,
    Boss: 3,
    ClubMap: 4,
    //Robber : 3,
    AnswerQuestion: 8,
    SealedGround: 9,
    Robber: 10,
    Festival: 21,
    //Warfare : 10,
    //CampaignDouble : 11,	//关卡双倍活动
    //LightTemple : 12,			//光明神殿
    GodsWar: 13,
    FactionWar: 14,
    SkyTower: 20,
    BigBoss: 21,
    Relic: 22,
    //MonAggress	: 15,			//魔物攻城
    //TeamWarfare : 16,			//组队斗技
    //MiWuSenLin  : 17,     //迷雾森林
    //PuzzlePalace  : 18,     //迷雾宫殿
    //AbsoZone			: 19,		//死亡领域
    //CryptolaliaCondition : 20 ,//密语境地
    //RuinZone			: 22,		//毁灭领域活动
    //LegionPangaea : 23,		//军团PVE（远古领域）
    //UnionWar : 24,		//联盟战	
    //UnionPVE : 25,    //军团联盟PVE
    //KnightCopy : 26,    //骑士团副本
    //GlobalWarfare : 100,	//跨服斗技
    GlobalLegion: 101,
    GlobalLadder: 102,
    //GlobalNationWar : 103,		//跨服国战 
    //GlobalUnionWar : 104,		//跨服联盟战	
    HuSong: 105,
};
var ActivityMapDefine = (_a = {},
    // 	[ActivityDefine.Robber]: { ["name"]: "Activity_Robber", ["init"]: true, ["actIndex"]: OrdinaryActivityIndex.NULL },
    _a[ActivityDefine.Welfare] = (_b = {}, _b["name"] = "Activity_Welfare", _b["init"] = true, _b["actIndex"] = OrdinaryActivityIndex.NULL, _b),
    // 	[ActivityDefine.SkyTower]: { ["name"]: "Activity_SkyTower", ["init"]: true, ["actIndex"]: OrdinaryActivityIndex.SKYTOWER },
    // 	//[ActivityDefine.Robber] : {["name"] : "Activity_Robber", ["path"]:"robber/Activity_Robber.lua", ["init"]: true, ["actIndex"] : OrdinaryActivityIndex.SHENGDI},
    // 	[ActivityDefine.BigBoss]: { ["name"]: "Activity_BigBoss", ["path"]: "daily/Activity_BigBoss.lua", ["init"]: true, ["actIndex"]: OrdinaryActivityIndex.ZHONGJIMOLONG },
    _a[ActivityDefine.Champion] = (_c = {}, _c["name"] = "Activity_Champion", _c["init"] = false, _c["actIndex"] = OrdinaryActivityIndex.UNDEFINEACTIVITY, _c),
    _a[ActivityDefine.Boss] = (_d = {}, _d["name"] = "Activity_Boss", _d["init"] = true, _d["actIndex"] = OrdinaryActivityIndex.NULL, _d),
    _a[ActivityDefine.ClubMap] = (_e = {}, _e["name"] = "Activity_ClubMap", _e["init"] = true, _e["actIndex"] = OrdinaryActivityIndex.NULL, _e),
    // 	//航海(遗迹探索)
    // 	[ActivityDefine.Relic]: { ["name"]: "Activity_Navigation", ["path"]: "daily/Activity_Navigation.lua", ["init"]: false, ["actIndex"]: OrdinaryActivityIndex.Relic },
    // 	// ////答题
    _a[ActivityDefine.AnswerQuestion] = (_f = {}, _f["name"] = "Activity_AnswerQuestion", _f["init"] = false, _f["actIndex"] = OrdinaryActivityIndex.DATI, _f),
    // 	// ////武斗大会
    // 	[ActivityDefine.SealedGround]: { ["name"]: "Activity_SealedGround", ["path"]: "daily/Activity_SealedGround.lua", ["init"]: true, ["actIndex"]: OrdinaryActivityIndex.UNDEFINEACTIVITY },
    // 	//节日活动相关
    // 	[ActivityDefine.Festival]: { ["name"]: "Activity_Festival", ["path"]: "daily/Activity_Festival.lua", ["init"]: true, ["actIndex"]: OrdinaryActivityIndex.NULL },
    // 	//军团战
    // 	[ActivityDefine.FactionWar] : {["name"] : "Activity_FactionWar", ["path"]:"daily/Activity_FactionWar.lua", ["init"]: true, ["actIndex"] : OrdinaryActivityIndex.JUNCHUANZHAN},
    //   //众神之战
    // 	[ActivityDefine.GodsWar] : {["name"] : "Activity_GodsWar", ["path"]:"daily/Activity_GodsWar.lua", ["init"]: true, ["actIndex"] : OrdinaryActivityIndex.ZHENYING},
    // 	[ActivityDefine.GlobalLadder]: { ["name"]: "Activity_GlobalLadder", ["path"]: "daily/Activity_Ladder.lua", ["init"]: false },
    //   //西游护送
    _a[ActivityDefine.HuSong] = (_g = {}, _g["name"] = "Activity_HuSong", _g["init"] = false, _g["actIndex"] = OrdinaryActivityIndex.HUSONG, _g),
    _a);
var ActivityTimeState = {
    FINISHED: 0,
    NOTBEGIN: 1,
    READY: 2,
    ONGOING: 3,
    ALLWAYS: 4
};
//定点活动 ready是提前多少秒即将开始
var ActivityTimeDefine = (_h = {},
    ////////////////////////////////////////////每日活动////////////////////////////////////////-
    // [OrdinaryActivityIndex.QIANGDA]: { ["day"]: ["9:00", "12:00", "14:00", "18:00", "21:15"], ["ready"]: 0 },
    // [OrdinaryActivityIndex.BAOXIANG]: { ["day"]: ["11:30", "20:30"], ["ready"]: 0 },
    // [OrdinaryActivityIndex.LINGTILI]: { ["day"]: ["11:00-13:00", "17:00-19:00"], ["ready"]: 0 },//H5不要 "21:00-23:00"
    // [OrdinaryActivityIndex.ZHONGJIMOLONG]: { ["day"]: ["12:00", "17:00"], ["ready"]: 0 },
    // [OrdinaryActivityIndex.HDSHUANGBEI]: { ["day"]: ["12:30-13:00", "19:30-20:00"], ["ready"]: 0 },
    // [OrdinaryActivityIndex.KUAFUTIANTI]: { ["day"]: ["22:00-23:00"], ["ready"]: 0 },
    _h[OrdinaryActivityIndex.DATI] = (_j = {}, _j["day"] = ["11:00-11:30", "21:30-22:00"], _j["ready"] = 0, _j),
    _h);
//function GetServerTime(){
//	return os.time()
//}
var s_activityTimeState = {};
function CheckNewActivity(newState) {
    if (IsInGlobalActvity() != null) {
        return false;
    }
    if (GuideSystem.getInstance().isCanClientAutoUI() == false || FightSystem.getInstance().isFight() == true) {
        return false;
    }
    // let activity = GetActivity(ActivityDefine.Robber)
    // let isRobberStart = activity.isStart()
    //if (StateManager.getInstance().GetCurrentStateType() != state_type.LIVE_BASE_STATE && isRobberStart != true) {
    if (StateManager.getInstance().GetCurrentStateType() != state_type.LIVE_BASE_STATE) {
        return false;
    }
    function executeMainFuncion(param) {
        ExecuteMainFrameFunction(param);
    }
    function checkMainFuncion(param) {
        var _a = CheckMainFrameFunction(param), flag = _a[0], _ = _a[1];
        return flag;
    }
    var checkActivityInfo = (_a = {},
        _a[OrdinaryActivityIndex.DATI] = (_b = {}, _b["title"] = Localize_cns("ACTIVITY_TXT51"), _b["callback"] = executeMainFuncion, _b["param"] = "dati", _b["check"] = checkMainFuncion, _b),
        _a[OrdinaryActivityIndex.ZHONGJIMOLONG] = (_c = {}, _c["title"] = Localize_cns("ACTIVITY_TXT55"), _c["callback"] = executeMainFuncion, _c["param"] = "boss", _c["check"] = checkMainFuncion, _c),
        _a);
    var nexActIndex = -1;
    for (var _index in newState) {
        var index = tonumber(_index);
        if (s_activityTimeState[index] == null) {
            if (checkActivityInfo[index]) {
                nexActIndex = index;
                break;
            }
        }
    }
    if (nexActIndex > 0) {
        var info_1 = checkActivityInfo[nexActIndex];
        if (info_1.check.call(null, info_1.param) == false) {
            return false;
        }
        var t = {
            onDialogCallback: function (result, userData) {
                if (result == true) {
                    // let isRobberStart = activity.isStart()
                    // if (isRobberStart) {
                    // 	activity.requestStopAndCall(info.callback, null, info.param)
                    // } else {
                    info_1.callback.call(null, info_1.param);
                    //}
                }
            }
        };
        MsgSystem.confirmDialog(String.format(Localize_cns("ACTIVITY_TXT10"), info_1.title), t, ConfirmFrom.AUTO_SHOW_ACTIVITY, false);
    }
    return true;
    var _a, _b, _c;
}
//更新当前活动状态，C2G_ACTIVITY_TIME_INFO返回的结果
function UpdateActivityTimeState(state) {
    //let flag = CheckNewActivity(state)
    s_activityTimeState = state || {};
}
function IsActivityTimeOpened(index) {
    //let flag = table_isExsit(s_activityTimeState, index)
    //return flag
    return s_activityTimeState[index] != null;
}
//index传入ActivityTimeDefine的索引,获得活动状态
function GetActivityTimeState(index) {
    //TLog.Debug(index)
    var timeDef = ActivityTimeDefine[index];
    TLog.Assert(timeDef != null);
    var curTime = GetServerTime();
    var date = GetServerDate(curTime);
    var weekDay = date.wday;
    var hours = date.hour;
    var mins = date.min;
    var curSecs = hours * 3600 + mins * 60; //今天过了多少秒
    var readyTime = timeDef.ready; //即将开始时间差
    var retState = ActivityTimeState.NOTBEGIN;
    var retTime = -1; //活动开启时间
    var retTimeIndex = -1; //当天时间索引
    var retWeek = -1; //活动开启时候的星期
    var notFinishAll = false;
    if (timeDef.day) {
        //检查每日活动
        retWeek = weekDay;
        for (var index_1 = timeDef.day.length - 1; index_1 >= 0; index_1--) {
            var timeStr = timeDef.day[index_1];
            var _a = StringUtil.stringMatch(timeStr, /(\d+):(\d+)/), h_ = _a[0], m_ = _a[1];
            var h = tonumber(h_);
            var m = tonumber(m_);
            var nextSecs = h * 3600 + m * 60;
            // h = tonumber(h)
            // m = tonumber(m)
            if (curSecs < nextSecs) {
                var diffSecs = nextSecs - curSecs;
                notFinishAll = true;
                retTime = curTime - curSecs + nextSecs;
                retTimeIndex = index_1;
                if (diffSecs <= readyTime) {
                    retState = ActivityTimeState.READY;
                    break;
                }
            }
            else {
                if (notFinishAll == false) {
                    retState = ActivityTimeState.ONGOING; //找到第一个大于活动时间的，就是认为已经开启了（判断结束需要发送协议查询）
                    retTime = curTime - curSecs + nextSecs;
                    retTimeIndex = index_1;
                }
                break;
            }
        }
    }
    else if (timeDef.week) {
        //检查周活动
        for (var nextWeek_ in timeDef.week) {
            var nextWeek = tonumber(nextWeek_);
            var timeList = timeDef.week[nextWeek];
            if (nextWeek == weekDay) {
                retWeek = weekDay;
                //for(let index = 0; index < timeList.length; index++){
                var timeStr = timeList[index];
                for (var index_2 = timeList.length - 1; index_2 >= 0; index_2--) {
                    var timeStr_1 = timeList[index_2];
                    var _b = StringUtil.stringMatch(timeStr_1, /(\d+):(\d+)/), h_ = _b[0], m_ = _b[1];
                    var h = tonumber(h_);
                    var m = tonumber(m_);
                    var nextSecs = h * 3600 + m * 60;
                    // h = tonumber(h)
                    // m = tonumber(m)
                    if (curSecs < nextSecs) {
                        var diffSecs = nextSecs - curSecs;
                        retTime = curTime - curSecs + nextSecs;
                        retTimeIndex = index_2;
                        notFinishAll = true;
                        if (diffSecs <= readyTime) {
                            retState = ActivityTimeState.READY;
                            break;
                        }
                    }
                    else {
                        if (notFinishAll == false) {
                            retState = ActivityTimeState.ONGOING; //找到第一个大于活动时间的，就是认为已经开启了（判断结束需要发送协议查询）
                            retTime = curTime - curSecs + nextSecs;
                            retTimeIndex = index_2;
                        }
                        break;
                    }
                }
                break;
            }
        }
    }
    else if (timeDef.res) {
        retState = ActivityTimeState.ALLWAYS;
    }
    //TLog.Debug(s_activityTimeState)
    //可能是GM指令开启的
    if (s_activityTimeState[index]) {
        retState = ActivityTimeState.ONGOING;
    }
    if (retState == ActivityTimeState.ONGOING) {
        //时间如果大于活动时间，则查询服务器状态活动是否开启
        if (s_activityTimeState[index] == null) {
            retState = ActivityTimeState.FINISHED;
        }
        if (OrdinaryActivityIndex.LINGTILI == index && getSaveRecord(opSaveRecordKey.dailyPower)) {
            retState = ActivityTimeState.FINISHED;
        }
    }
    var info = {};
    info.state = retState; //当前活动状态
    info.startTime = retTime; //活动开始时间(如果活动是ready，可用来倒计时)
    info.timeIndex = retTimeIndex; //当天时间列表里的索引（活动列表显示需要用到）
    info.week = retWeek; //活动开启时候的星期
    //TLog.Debug_r(info)
    return info;
}
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
//# sourceMappingURL=ActivityDefine.js.map