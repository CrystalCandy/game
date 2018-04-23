/*
作者:
    yangguiming
    
创建时间：
   2013.6.06(周四)

意图：
   常用游戏变量定义

公共接口：
   
*/
ImportType(opItemUnit);
var FRAME_MIN_EXCURSION = 10;
var FRAME_MAX_EXCURSION = FRAME_MIN_EXCURSION + 30;
var NPCTALK_MIN_SCOPE = 3; //NPC谈话最小范围
var NPCTALK_MAX_SCOPE = 6; //NPC谈话最大范围
var MAX_MSG_WAIT_TIME = 10000; //网络包最大等待时间
var MOVE_DELAY_TIME = 800; //跳地图延迟毫秒
var ZHUCHENG_MAPID = 50014; //主城地图ID
// var SCENE_PERS_SCALE_LIVE = 0.86 //非战斗时候的角色缩放
//var SCENE_PERS_SCALE_FIGHT = 1 //战斗时候的角色缩放
//是否主城
function IsMainMap() {
    return MapSystem.getInstance().getMapId() == ZHUCHENG_MAPID;
}
var PET_COUNT = 18;
//资源加载定义
var ResourceGroupDefine = {
    Group_Static: "static",
    Group_EnterGame: "entergame",
    //Group_LiveCommon : "livecommon",//生活场景加载通用
    Group_LiveState: "livestate",
    Group_CombatState: "combatstate",
    Group_Guide: "guide",
    Group_LOGINPRELOAD: "loginpreload",
};
//////////////////////////////////////////////////////////////////////////////////-
// 系统音乐效
var SystemSound = {
    effect_btnClick: "click.mp3",
    effect_levelUp: "",
    effect_finishTask: "finishtask.mp3",
    effect_newMsg: "newmsg.mp3",
    effect_itemUse: "",
    effect_jiaoyi: "jinbi.mp3",
    effect_lotteryGet: "lottery_get.mp3",
    effect_kaizhan: "",
    effect_win: "win.mp3",
    effect_fail: "fail.mp3",
    effect_skill: "dazhao.mp3",
    effect_chuxian: "chuxian.mp3",
    effect_shouji_nv: "",
    effect_shouji_nan: "",
    effect_shouji: "",
    effect_Death_nv: "",
    effect_Death_nan: "",
    effect_Death: "",
    music_login: "",
    music_combat: "fight.mp3",
};
var wndToJump = {
    FINAL_DRAGON: 1,
    MESS_WORLD: 2,
    QRENA: 3,
    SKY_TOWER: 4,
    PET_RECRUIT: 5,
    ACT_WARFARE: 6,
    NOBLE_EXAMINE: 7,
    CAMPWAR: 8,
    MONAGGRESS: 9,
};
var ConfirmFrom = {
    BUY_POWER: "BUY_POWER",
    BUY_GOLD: "BUY_GOLD",
};
//格式：LinkSign..channelOption.WND..";"..wndToJump.FINAL_DRAGON..";终极魔龙"..LinkSign
//////////////////////////////////////////////////////////////////////////////////-
// 特效 ModelEffect.csv配置
var effectIndex = {
    // 	ChuanQiOrange			: 90011,			 //传奇橙色
    // 	ChuanQiSuit				: 90013,			 //传奇套装
    // 	ChuanQiSuitDrop 	: 90023,			 //装备射
    // 	ChuanQiOrangeDrop : 90024,			 //传橙射
    // 	ZhanDouFaZhen			: 90027,			 //战斗法阵
    // 	ClickMap          : 90001, //点击地图
    Death: 90002,
    // 	FightStart     		: 90003, //战斗开场
    // 	FightWin	     		: 90145, //战斗胜利
    LevelUp: 90007,
};
//游戏状态
////////////////////////////////////////////////////////////////////////////////////
var state_type = {
    BASE_STATE: 0,
    LIVE_BASE_STATE: 10,
    COMBAT_BASE_STATE: 100,
};
state_type.LIVE_STORY_STATE = state_type.LIVE_BASE_STATE + 1; //剧情表演
state_type.LIVE_TRADE_STATE = state_type.LIVE_BASE_STATE + 2; //交易
//state_type.LIVE_GIVE_STATE = state_type.LIVE_BASE_STATE + 3			    //给予
//state_type.LIVE_STALL_STATE = state_type.LIVE_BASE_STATE + 4			  //摆摊
//state_type.LIVE_ADDFRIEND_STATE = state_type.LIVE_BASE_STATE + 5	  //加为好友
//state_type.LIVE_IB_ATTACK_STATE = state_type.LIVE_BASE_STATE + 6		//强制IB_PK攻击
//state_type.LIVE_ATTACK_STATE = state_type.LIVE_BASE_STATE + 7			  //切磋PK
//state_type.LIVE_USEITEM_STATE = state_type.LIVE_BASE_STATE + 8			  //使用背包物品
//state_type.LIVE_GIVE_SELECT_STATE = state_type.LIVE_BASE_STATE + 9		//给予玩家选择状态
//state_type.LIVE_TRADE_SELECT_STATE = state_type.LIVE_BASE_STATE + 10	//交易玩家选择状态
//state_type.TASK_CANGBAOTU_STATE = state_type.LIVE_BASE_STATE + 11			//打开藏宝图
//state_type.LIVE_BIWU_STATE      = state_type.LIVE_BASE_STATE + 12			//进入房间比武状态
state_type.LIVE_DRAMA_STATE = state_type.LIVE_BASE_STATE + 13; //进入剧情状态
//state_type.LIVE_ACTIVITY_BROKENHISTORY      = state_type.LIVE_BASE_STATE + 14 //混沌世界		
//state_type.LIVE_ACTIVITY_SINGLE_BOSS      = state_type.LIVE_BASE_STATE + 15 //终极魔龙
//state_type.LIVE_ACTIVITY_ANSWER_QUESTION  = state_type.LIVE_BASE_STATE + 16 //答题
//state_type.LIVE_ACTIVITY_SEALED_GROUND_QUESTION  = state_type.LIVE_BASE_STATE + 17 //军团副本
//state_type.LIVE_ACTIVITY_WARFARE	  = state_type.LIVE_BASE_STATE + 18 //武斗会
//state_type.LIVE_ACTIVITY_LIGHT_TEMPLE	  = state_type.LIVE_BASE_STATE + 19 //光明神殿
//state_type.LIVE_ACTIVITY_FACTION_WAR	  = state_type.LIVE_BASE_STATE + 20 //军团战
//state_type.LIVE_ACTIVITY_MON_AGGRESS  = state_type.LIVE_BASE_STATE + 21 //魔物攻城
//state_type.LIVE_ACTIVITY_MIWU_SEN_LIN = state_type.LIVE_BASE_STATE + 22 //迷雾森林
state_type.LIVE_ACTIVITY_STATE = state_type.LIVE_BASE_STATE + 50; //活动通用状态
state_type.LIVE_ACTIVITY_MSG_STATE = state_type.LIVE_BASE_STATE + 51; //活动，可以响应IconMessage的状态
state_type.LIVE_BASE_STATE_END = state_type.LIVE_BASE_STATE + 99;
//state_type.COMBAT_ACTION_STATE = state_type.COMBAT_BASE_STATE + 1		//战斗表演
//state_type.COMBAT_ATTACK_STATE = state_type.COMBAT_BASE_STATE + 2   //战斗攻击
//state_type.COMBAT_SPELL_STATE = state_type.COMBAT_BASE_STATE + 3    //战斗施法
//state_type.COMBAT_ITEM_STATE = state_type.COMBAT_BASE_STATE + 4     //战斗道具
//state_type.COMBAT_PROTECT_STATE = state_type.COMBAT_BASE_STATE + 5  //战斗保护
//state_type.COMBAT_CATCH_STATE = state_type.COMBAT_BASE_STATE + 6    //战斗捕抓
//state_type.COMBAT_CLOCK_STATE = state_type.COMBAT_BASE_STATE + 7    //战斗时钟
//state_type.COMBAT_WAIT_STATE = state_type.COMBAT_BASE_STATE + 8     //战斗等待
//state_type.COMBAT_DIRECT_STATE = state_type.COMBAT_BASE_STATE + 9     //战斗指挥
//state_type.COMBAT_DIRECT_DEL_STATE = state_type.COMBAT_BASE_STATE + 10//战斗指挥取消
//state_type.COMBAT_ITEM_SELECT_STATE = state_type.COMBAT_BASE_STATE + 11//战斗选择道具
state_type.COMBAT_STORY_STATE = state_type.COMBAT_BASE_STATE + 12; //战斗中的电影状态
state_type.COMBAT_BASE_STATE_END = state_type.COMBAT_BASE_STATE + 99;
////////////////////////////////////////////////////////////////////
var DAY_SECS = 24 * 3600; //一天多少秒
var NotificationType = {
    Cycle: 100,
    Event: 200,
};
//周期IOS只支持1天，7天
var TimeNotificationConfig = {};
// GetNotificationDelayTime = function(currentTime, info)
// 	let currentDate = os.date("*t", currentTime)
// 	if(info.week.length == 0 ){
// 		return -1
// 	}
// 	let delayTime = -1
// 	let currentWeek = currentDate.wday - 1
// 	//先检查当日是否符合星期条件,而且尚未开始的
// 	for(let _ = 0; _ < info.week.length; _++){
// 			let week = info.week[_]
// 		if(week == currentWeek ){
// 				let hour, min = string.match(info.time,"(%d+):(%d+)")
// 				hour = tonumber(hour)
// 				min = tonumber(min)
// 				let targetTime = hour* 3600 + min* 60
// 				let srcTime = currentDate.hour* 3600 + currentDate.min * 60 + currentDate.sec
// 				let diffTime = targetTime - srcTime
// 				if(diffTime > 0 ){
// 					delayTime = diffTime
// 				}
// 		}
// 	}
// 	//如果当日不符合，再检查距离下次开启
// 	if(delayTime == -1 ){
// 		//寻找离当日最近的日期
// 		let minDiffDay = 999
// 		for(let _ = 0; _ < info.week.length; _++){
// 			let week = info.week[_]
// 			let diffDay = week - currentWeek
// 			if(diffDay <= 0 ){
// 				diffDay = diffDay + 7//循环一周
// 			}
// 			if(diffDay < minDiffDay ){
// 				minDiffDay = diffDay
// 			}
// 		}
// 		//首次开启时间
// 		let minBeginTime = -1
// 		let hour, min = string.match(info.time,"(%d+):(%d+)")
// 		hour = tonumber(hour)
// 		min = tonumber(min)
// 		let minBeginTime = hour * 3600 + min * 60
// 		//当日剩余时间
// 		let remainSec = DAY_SECS - (currentDate.hour* 3600 + currentDate.min * 60 + currentDate.sec)
// 		delayTime = remainSec + minBeginTime + (minDiffDay-1) * DAY_SECS
// 	}
// 	TLog.Assert(delayTime >= 0)
// 	return delayTime
// }
var SpecialWingSkill = (_a = {},
    _a[800001] = 40208,
    _a[800004] = 40209,
    _a[800005] = 40210,
    _a[800010] = 40212,
    _a);
var NpcItemSellIdIndex = {
    TIANTI: 6,
    GUOZHAN: 14,
    FACTION_BUILD: 15,
    KNIGHT_SHOP: 16,
};
// let WingTotemTitle:any = {
// 	[objectField.WING_FIELD_TOTEM_SPEED_DEC] : "WING_TOTEM_JIANSHU",
// 	[objectField.WING_FIELD_TOTEM_CRI_ATT_DEC] : "WING_TOTEM_BAOMIAN",
// 	[objectField.WING_FIELD_TOTEM_CRITICAL_DEC] : "WING_TOTEM_KANGBAO", 
// 	//[objectField.WING_FIELD_TOTEM_DAMAGE_DEC] : "WING_TOTEM_MIANSHANG",
// }
var OrdinaryActivityName = {};
var ItemUnitName = (_b = {},
    _b[opItemUnit.FUNDS] = "JINBI",
    _b[opItemUnit.BIND_CURRENCY] = "BIND_YUANBAO",
    _b[opItemUnit.CURRENCY] = "YUANBAO",
    _b[opItemUnit.POWER] = "MAIN_TILI",
    _b[opItemUnit.JJC_POINT] = "JJC_TXT43",
    _b[opItemUnit.SKY_TOWER_POINT] = "SKYTOWER_TXT23",
    _b[opItemUnit.ZHENXING_POINT] = "GODSWAR_TEXT29",
    _b[opItemUnit.HOME_PAGE_CHARM] = "PER_HOMEPAGE_TEXT72",
    _b[opItemUnit.LEGEND_POWDER] = "ITEM_RESOLVE_TXT9",
    _b);
var IconMsgType = {
    FRIEND_CHAT: "FRIEND_CHAT",
    FRIEND_APPLY: "FRIEND_APPLY",
    TEAM_APPLY: "TEAM_APPLY",
    TEAM_INVITE: "TEAM_INVITE",
    TEAM_STATUS: "TEAM_STATUS",
    EMAIL_LIST: "EMAIL_LIST",
    CLUB_FUBEN: "CLUB_FUBEN",
    CLUB_APPLY: "CLUB_APPLY",
    CLUB_HIRE: "CLUB_HIRE",
    GROW: "GROW",
    GROW_EVENT: "GROW_EVENT",
    ROBBER_INCOME: "ROBBER_INCOME",
};
var _a, _b;
//# sourceMappingURL=CommonDefine.js.map