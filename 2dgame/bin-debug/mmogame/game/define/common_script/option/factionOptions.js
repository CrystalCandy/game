//官职
var opFactionOfficeOptions = {
    LEADER: 1,
    SUB_LEADER: 2,
    ELDER: 3,
    TANG_ZHU: 4,
    XIANG_ZHU: 5,
    ELITE: 6,
    MEMBER: 7,
    BUSINESSMAN: 8,
};
var opOfficeToStr = (_a = {},
    _a[opFactionOfficeOptions.LEADER] = "CLUB_POS_1",
    _a[opFactionOfficeOptions.SUB_LEADER] = "CLUB_POS_2",
    _a[opFactionOfficeOptions.MEMBER] = "CLUB_POS_3",
    _a);
//官职人数上限
var opFactionOfficeCount = (_b = {},
    _b[opFactionOfficeOptions.LEADER] = 1,
    _b[opFactionOfficeOptions.SUB_LEADER] = 2,
    _b[opFactionOfficeOptions.TANG_ZHU] = 5,
    _b[opFactionOfficeOptions.XIANG_ZHU] = 10,
    _b[opFactionOfficeOptions.ELITE] = 20,
    _b[opFactionOfficeOptions.MEMBER] = 199,
    _b[opFactionOfficeOptions.BUSINESSMAN] = 3,
    _b);
//帮派建筑类型
var opFactionBuild = {
    MAIN: 1,
    JIN_KU: 2,
    SHU_YUAN: 3,
    YAO_FANG: 4,
    CANG_KU: 5,
    XIANG_FANG: 6,
};
//帮派技能类型
var opFactionSkill = {
    DA_ZAO: 1,
    LIAN_JIN: 2,
    CAI_FENG: 3,
    QIAO_JIANG: 4,
    LIAN_YAO: 5,
    PENG_REN: 6,
    QIANG_SHEN: 7,
    AN_QI: 8,
    TAO_LI: 9,
    ZHUI_BU: 10,
    YANG_SHENG_SHU: 11,
    JIAN_SHEN_SHU: 12,
};
// 大殿等级与衰减资材对应关系
// [level] = value
var opFactionMaterialReduction = (_c = {},
    _c[1] = 10,
    _c[2] = 15,
    _c[3] = 20,
    _c[4] = 15,
    _c[5] = 50,
    _c[6] = 80,
    _c[7] = 130,
    _c[8] = 160,
    _c[9] = 200,
    _c[10] = 300,
    _c);
//宗族字节限制
var opFactionCharMax = {
    NOTICE: 600,
    INTRODUCTION: 600,
    MAX_NAME: 21,
    MIN_NAME: 1,
};
//基本配置
var opFactionBaseOptions = {
    CREATE_LEVEL: 0,
    CREATE_MONEY: 9600000,
    CREATE_GOLD: 100,
    MAX_COUNT: 200,
    BACKGROUND: 40,
    EDGE: 40,
    MAINBOX: 40,
    MAP: 51002,
    ENTER_X: 107,
    ENTER_Y: 86,
    LEAVE_MAP: 50006,
    LEAVE_X: 484,
    LEAVE_Y: 210,
    FLAG_COUNT: 300,
    FLAG_TIME: 86400,
    FACTION_NOTE_COUNT: 200,
    LEAVE_NOTE_COUNT: 100,
    JOIN_LEVEL: 0,
    CREATE_RENQI: 0,
    MAX_RENQI: 20000,
    MAX_DEGREE: 5000,
    CHANGE_NOTICE_POWER: 3,
    RECOMMEND_MONEY: 500000,
    CHANGE_NAME_MONEY: 500,
};
// 宗族系统默认数值
var opFactionDefaultValue = {
    FACTION_ICON: 1,
    FACTION_LEVEL: 1,
    FACTION_MAX_LEVEL: 10,
    //BASE_MATERIAL         : 2000000, //帮派初始资金
    //BASE_SUM_MATERIAL     : 2000000, //帮派初始总资金
    //BASE_GOLD             : 0,       //帮派初始资材
    BASE_DEGREE: 0,
    //BASE_RENQI            : 0,    	 //帮派初始人气值
    //BASE_STUDY            : 2000,    //帮派初始研究力
    //BASE_SKILL_LEVEL      : 55,      //帮派技能初始等级
    //MAX_SKILL_LEVEL       : 120,     //帮派技能最高等级
    BASE_ALLOCACOUNT: 1,
    BASE_WARE_HOUSE_MAX: 150,
    //DAY_DEGREE				 		: 0,			 //帮派每日经验
    //MAX_DAY_DEGREE				: 100,		 //帮派每日最大经验
    DAY_RENQI: 0,
    //MAX_DAY_RENQI					: 900,		 //帮派每日最大人气
    DAY_MAP_COUNT: 1,
    MAX_DAY_MAP_COUNT: 1,
};
//宗族记录
var opFactionNote = {
    CREATE: 1,
    CHANGE_LEADER: 2,
    SAVE_GOLD: 3,
    LEAVE: 4,
    FIRE: 5,
    ACKREWARD: 100,
};
// 宗族任务编号
var opFactionTaskId = {
    TASK_JIANSHE_SONGXIN: 2004001,
    TASK_JIANSHE_XUNLUO: 2004002,
    TASK_JIANSHE_ZHUOCHONG: 2004003,
    TASK_ZICAI_XUNWU: 2005001,
    TASK_ZICAI_XUNLUO: 2005002,
    TASK_NINGXIN: 2026001,
    TASK_HUQI: 2027001,
};
// 宗族更新时间域索引
var opFactionUpdateTimeFieldIndex = {
    hour: 1,
    minu: 2,
    wday: 3,
    yday: 4,
    sec: 5,
    year: 6,
    isDst: 7,
};
//宗族图标
var opFactionLogo = {
    LOGO1: 1,
    LOGO2: 2,
    LOGO3: 3,
    LOGO4: 4,
    LOGO5: 5,
    LOGO6: 6,
    LOGO7: 7,
    LOGO8: 8,
    LOGO9: 9,
};
//军团副本
// let ConfigFactionMap:any = {
// 	stageOneTime : 30*60,                      //一阶段持续时间(单人)
// 	stageTwoTime : 1*60,                       //二阶段持续时间(暴走预备)
// 	stageThreeTime : 3*60,                     //三阶段持续时间(暴走)
// 	bossTimeOut : 60,                          //开始暴走(哥布林第一次出现)时间间隔
//  bossAppearRandTime:any : {30, 30},             //哥布林出现时间间隔
// 	bossAppearTime = 6,                        //哥布林存在时间
// 	bossKillCount = 1,                         //击杀哥布林数量限制
// 	//buffs = {
// 	//	[1] : {index:1, last:300},
// 	//	[2] = {index:2, last:180},
// 	//	[3] = {index:3, last:300},
// 	//	[4] = {index:4, last:300},
// 	//	[5] = {index:5, last:300},
// 	//	[6] = {index:6, last:300},
// 	//}
// }
// //军团pve
// let opFactionPVEConfig:any = {
// 	minLevel : 5,            //开启等级
// 	rmbGold  : 0,            //消耗晶石
// 	fightCount : 3,          //每日可以挑战次数
// 	fightRecordCount : 5,    //战斗记录条数   
// 	bossFightCount : 100,    //boss战胜场次 
// 	rankCount : 10,          //排名人数
// 	bossTime : 15*60,        //boss时间间隔 
// 	openBossStar : 30,       //boss开启三星数量
// 	plrLevel : 60,           //60级才可以参加
// }
// let opFactionBuildConfig:any = {
// 	build_cangku : 1,			//仓库
// 	build_shitang : 2,		//食堂
// 	build_sushe : 3,			//宿舍
// 	build_liliang : 4,		//力量研究所
// 	build_minjie : 5,			//敏捷研究所
// 	build_yiliao : 6,			//医疗所
// 	maxDonateCount : 10 , //每日最大捐献次数
// 	perDonateAdd : 1 ,    //每次捐献提升建筑值
// }
//灵阵守卫
var opMatrixError = {
    OPEN_SUCCESS: 0,
    OPEN_NO_FACTION: 1,
    OPEN_NO_UNION: 2,
    OPEN_EXIST: 3,
    OPEN_NOT_LEADER: 4,
    OPEN_TOO_MUCH: 5,
    OPEN_MEMBER_OPEN_MUCH: 6,
    OPEN_NOT_ENOUGH_RENQI: 7,
    OPEN_MEMBER_NOT_ENOUGH_RENQI: 8,
    OPEN_JOIN_TIME_LIMIT: 9,
    PROMOTE_SUCCESS: 0,
    PROMOTE_MAXT_LEVEL: 1,
    PROMOTE_COOLDOWN: 2,
    PROMOTE_NOT_ENOUGH_GOLD: 3,
    PROMOTE_MTX_CLOSE: 4,
};
var opMatrixConfig = {
    retPointMapId: defaultValue.DEFAULT_MAP2,
    retPointX: 64,
    retPointY: 42,
    mapNum: 6,
    createBossTimeOut: 5,
    closeSelfTimeOut: 10,
    closeMatrixTimeOut: 18000,
    rankNum: 5,
    needRenqi: 500,
    machineMaxLevel: 5,
    promoteCooldown: 10,
    serverRankNum: 3,
};
//军团任务
var opFactionTaskConfig = {
    additionTaskLimit: 20,
    releaseSpend: 200,
    dailyCountLimit: 4,
    taskCount: 6,
};
var opFactionWarApply = {
    auto: 0,
    cancel: 1,
};
// let opFactionTask:any = { 
// 	facBuild : 15,
// 	timeLimit : 7*24*3600,
// 	statueNpcEntry : 11006,
// 	statueNpcMapId : defaultValue.DEFAULT_MAP2,//军棋NPC所在地图ID
//  statueNpcCoords:any : {180, 48},
//  fightEffect:any = {{0.15, 0.1},{0.1, 0.05},{0.05, 0.03}}
// }
// //公会任务建设
// let opFactionGroupTask:any = {
// 	[1] : {51510,20,20},
// 	[2] = {210,70,70},
// 	[3] = {1200,400,400},
// }
//帮会上香
var opFactionConfig = {
    RenqiFunds: 100,
    RenqiBindGold: 101,
    RenqiGold: 102,
    MaxActiveLevel: 10,
    CollectOneyKeyGold: 180,
    MonsterOneyKeyGold: 180,
};
//帮会地图任务
var opFactionMapTaskType = {
    Collect: 1,
    Monster: 2,
};
//帮会活跃任务
var opFactionActiveTaskType = {
    GUAIWU: "guaiwu",
    SHOUGOU: "shougou",
    SHANGXIANG: "shangxiang",
    FUBEN: "fuben",
    XIAOGUAI: "xiaoguai",
    CAIJI: "caiji",
};
//创建帮会需要元宝
var opCreateNeedMoney = {
    POOR: 2080,
    RICH: 2800,
};
//创建帮会需要VIP等级
var opCreateNeedVIP = {
    POOR: 4,
    RICH: 7,
};
//帮会记录
var opFacRecord = {
    Join: 100,
    Kick: 101,
    Exit: 102,
    LevelUP: 103,
    Appoinit: 104,
    Fire: 105,
};
var _a, _b, _c;
//# sourceMappingURL=factionOptions.js.map