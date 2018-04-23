////////////////////////////////////////////////////////////////////////////////////-
// 任务系统数据定义(taskOption)
// 版权所有: 昆仑万维
// 作者: lex, 
// 描述: 
//////////////////////////////////////////////////////////////////////////////////////
//任务类型:
//1、角色技能升级次数
//完成条件：接到任务起记录玩家技能升级次数，次数达到要求次数完成
//
//2、挑战boss关卡
//完成条件：通关关卡后完成任务
//
//3、宠物升级次数
//完成条件：接到任务后记录宠物升级次数，次数达到要求次数完成任务（使用一次升级道具即算一次，以下次数中同理）
//
//4、穿戴装备数量
//完成条件：角色当前穿戴装备数量满足要求数量完成任务
//
//5、强化装备次数
//完成条件：接到任务后记录装备强化次数，次数达到要求完成任务
//
//6、角色等级升到指定等级
//完成条件：角色等级达到任务要求等级后完成任务
//
//7、世界频道发言一次
//完成条件：世界频道发言一次，发言内容不限
//
//8、坐骑进阶次数
//完成条件：接到任务后记录坐骑进阶次数，次数达到后完成任务
//
//9、熔炼装备次数
//完成条件：每熔炼一件装备算一次，次数达到后完成任务
//
//10、前往指定新地图(xx)
//完成条件：切换到指定新地图后，完成任务
//
//11、开启关卡自动挑战(xx)
//完成条件：将开启自动挑战按钮后即完成任务
//
//12、进行一次个人boss(xx)
//完成条件：挑战一次个人boss，胜利或失败都算完成
//
//13、通关龙王宝藏第3关(xx)
//完成条件：通关指定龙王宝藏关卡后完成任务
//
//14、通关材料副本中坐骑副本(xx)
//完成条件：通关材料副本中坐骑副本，战胜才算完成任务
//
//15、坐骑等阶达到3阶
//完成条件：坐骑等阶达到指定等阶后，完成任务
//
//16、仙侣升级5次
//完成条件：接到任务后，记录仙侣升级次数，次数达到完成任务
//
//17、领取龙王星级奖励(xx)
//完成条件：成功领取一次龙王星级奖励后，完成任务
//
//18、参与擂台比武1次(xx)
//完成条件：参与一次擂台比武，无论胜负都算完成任务
//
//19、锻造精炼次数3次
//完成条件：接到任务后，记录锻造次数，次数达到完成任务
//
//20、完成3次钟馗伏魔(xx)
//完成条件：3次钟馗伏魔挑战胜利，任务完成
//
//21、完成5次组队副本(xx)
//完成条件：三人组队进行5次组队副本完成任务，战斗失败也计算次数
//
//22、天仙进阶3次
//完成条件：接到任务后，记录天仙进阶次数，次数达到任务完成
//
//23、通关小雷音寺第6层(xx)
//完成条件：小雷音寺层数达到指定层数完成任务
var taskFinishIdBegin = 3;
var taskFinishId = {
    R_SKILL_MAX_LV: taskFinishIdBegin + 1,
    R_SKILL_UP_NUM: taskFinishIdBegin + 2,
    R_EQUIP_MAX_NUM: taskFinishIdBegin + 3,
    R_EQUIP_CHANGE_NUM: taskFinishIdBegin + 4,
    R_EQ_QH_MAX_LEVEL: taskFinishIdBegin + 5,
    R_EQ_QH_MIN_LEVEL: taskFinishIdBegin + 6,
    R_EQ_QH_NUM: taskFinishIdBegin + 7,
    R_EQ_JL_MAX_LEVEL: taskFinishIdBegin + 8,
    R_EQ_JL_MIN_LEVEL: taskFinishIdBegin + 9,
    R_EQ_JL_NUM: taskFinishIdBegin + 10,
    R_EQ_DL_MAX_LEVEL: taskFinishIdBegin + 11,
    R_EQ_DL_MIN_LEVEL: taskFinishIdBegin + 12,
    R_EQ_DL_NUM: taskFinishIdBegin + 13,
    R_EQ_BS_MAX_LEVEL: taskFinishIdBegin + 14,
    R_EQ_BS_MIN_LEVEL: taskFinishIdBegin + 15,
    R_EQ_BS_NUM: taskFinishIdBegin + 16,
    R_EQ_MELT_NUM: taskFinishIdBegin + 17,
    ROLE_WORLD_TALK_NUM: taskFinishIdBegin + 18,
    CAMPAIGN_ID: taskFinishIdBegin + 19,
    CAMPAIGN_NUM: taskFinishIdBegin + 10,
    CAMPAIGN_SET_AUTO: taskFinishIdBegin + 21,
    ENTRY_MAP: taskFinishIdBegin + 22,
    PET_COUNT: taskFinishIdBegin + 23,
    PET_STAGE_STEP_NUM: taskFinishIdBegin + 24,
    PET_STAGE_MAX_LV: taskFinishIdBegin + 25,
    XL_COUNT: taskFinishIdBegin + 26,
    XL_STAGE_STEP_NUM: taskFinishIdBegin + 27,
    XL_STAGE_MAX_LV: taskFinishIdBegin + 28,
    RIDE_STAGE_STEP_NUM: taskFinishIdBegin + 29,
    RIDE_STAGE_LEVEL: taskFinishIdBegin + 30,
    WING_STAGE_STEP_NUM: taskFinishIdBegin + 31,
    WING_STAGE_LEVEL: taskFinishIdBegin + 32,
    TONGLIN_STAGE_STEP_NUM: taskFinishIdBegin + 33,
    TONGLIN_STAGE_LEVEL: taskFinishIdBegin + 34,
    SOUHUN_STAGE_STEP_NUM: taskFinishIdBegin + 35,
    SOUHUN_STAGE_LEVEL: taskFinishIdBegin + 36,
    FAZHEN_STAGE_STEP_NUM: taskFinishIdBegin + 37,
    FAZHEN_STAGE_LEVEL: taskFinishIdBegin + 38,
    XIANWEI_STAGE_STEP_NUM: taskFinishIdBegin + 39,
    XIANWEI_STAGE_LEVEL: taskFinishIdBegin + 40,
    TX_STAGE_STEP_NUM: taskFinishIdBegin + 41,
    TX_STAGE_LEVEL: taskFinishIdBegin + 42,
    TXWEAPON_STAGE_STEP_NUM: taskFinishIdBegin + 43,
    TXWEAPON_STAGE_LEVEL: taskFinishIdBegin + 44,
    TN_STAGE_STEP_NUM: taskFinishIdBegin + 45,
    TN_STAGE_LEVEL: taskFinishIdBegin + 46,
    TNXIANQI_STAGE_STEP_NUM: taskFinishIdBegin + 47,
    TNXIANQI_STAGE_LEVEL: taskFinishIdBegin + 48,
    TNHUANIAN_STAGE_STEP_NUM: taskFinishIdBegin + 49,
    TNHUANIAN_STAGE_LEVEL: taskFinishIdBegin + 50,
    TNLINGQI_STAGE_STEP_NUM: taskFinishIdBegin + 51,
    TNLINGQI_STAGE_LEVEL: taskFinishIdBegin + 52,
    //CAMPAIGN_SET_AUTO
    ROLE_MAX_LEVEL: taskFinishIdBegin + 53,
    ROLE_LEVEl_NUM: taskFinishIdBegin + 54,
    COPY_PERSON_COUNT: taskFinishIdBegin + 55,
    COPY_PERSON_NUM: taskFinishIdBegin + 56,
    COPY_DRAGON_LEVEL: taskFinishIdBegin + 57,
    COPY_DRAGON_MAX: taskFinishIdBegin + 58,
    COPY_DRAGON_NUM: taskFinishIdBegin + 59,
    COPY_DRAGON_START_NUM: taskFinishIdBegin + 60,
    COPY_MATERIAL_COUNT: taskFinishIdBegin + 61,
    COPY_MATERIAL_NUM: taskFinishIdBegin + 62,
    COPY_ZHONGKUI_COUNT: taskFinishIdBegin + 63,
    COPY_ZHONGKUI_NUM: taskFinishIdBegin + 64,
    COPY_THUNDER_MAX: taskFinishIdBegin + 65,
    COPY_THUNDER_NUM: taskFinishIdBegin + 66,
    COPY_TEAM_COMBAT_NUM: taskFinishIdBegin + 67,
    CHAMPION_NUM: taskFinishIdBegin + 68,
};
var taskFinishName = {};
for (var k in taskFinishId) {
    var v = taskFinishId[k];
    taskFinishName[v] = k;
}
//奖励ＩＤ////-
var taskPrizeId = {
    GOLD: 1,
    BGOLD: 2,
    FUNDS: 3,
    PLREXP: 4,
    ITEM: 5,
};
//
var taskPrizeName = {};
for (var k in taskPrizeId) {
    var v = taskPrizeId[k];
    taskPrizeName[v] = k;
}
// let taskPrizeStr: any = {
// 	GOLD: "YUANBAO",
// 	BGOLD: "BIND_YUANBAO",
// 	FUNDS: "JINBI",
// 	PLREXP: "ITEM_TXT6",
// 	ITEM: "CHAT_WUPIN",
// }
//////////////////////////-
//奖励ＩＤ////-
var taskInitId = {
    AUTO_COMMIT: 1,
};
//
var taskInitName = {};
for (var k in taskInitId) {
    var v = taskInitId[k];
    taskInitName[v] = k;
}
// 周
var taskWeek = {
    SUN: 0,
    MON: 1,
    TUES: 2,
    WEDNES: 3,
    THURS: 4,
    FRI: 5,
    SAT: 6,
};
// 任务周期
var taskPeriodic = {
    DAY: 0,
    WEEK: 1,
};
// 任务类型
var taskType = {
    Main: 1,
    Branch: 2,
    OptionTask: 29,
    FactionTask: 30,
    FactionItemTask: 31,
    FactionPubTask: 32,
    Fengmo: 33,
    ActivityNoTrace: 98,
    Activity: 99,
    Special: 100,
    FuBenTask: 101,
    HideTask: 102,
};
//同一种类型最多有多少个
var taskTypeNum = (_a = {},
    _a[taskType.Main] = 1,
    _a);
// 任务目标类型
var taskTargetType = {
    Null: 0,
    Kill: 1,
    Collect: 2,
    NPCTalk: 3,
    Invest: 4,
};
// 任务事件类型
var taskEvent = {
    Null: 0,
    Talk: 1,
    Kill: 2,
    Item: 3,
    Trigger: 4,
    Invest: 5,
    DlgDefault: 6,
};
// 完成事件类型
var taskCompleteEventType = {
    Null: 0,
    UseItem: 1,
    UseSkill: 2,
};
// 任务接取标志
var taskAcceptFlag = {
    Player: 0x00000001,
    System: 0x00000002,
    Item: 0x00000004,
};
// 任务标识
var taskFlag = {
    Kill: 0x00000001,
    Item: 0x00000002,
    NPC_Talk: 0x00000004,
    Trigger: 0x00000008,
    Invest: 0x00000010,
};
// 任务人数限制
var taskLimit = {
    NoLimit: 0,
    Single: 1,
    Multi: 2,
};
//任务更新时间
var opTaskRefreshTime = [8, 30];
// 任务环定义
var taskHoopOptions = {};
// 任务数据字段定义
var taskField = {
    TASK_FIELD_BEGIN: 0,
    // 当前节点
    TASK_CURRENT_NODE: 1,
    // 接任务条件
    ACCEPT_FIELD_BEGIN: 100,
    ACCEPT_FIELD_END: 2000,
    // 初始化数据
    INIT_FIELD_BEGIN: 2000,
    INIT_FIELD_END: 4000,
    // 交任务条件
    FINISH_FIELD_BEGIN: 4000,
    FINISH_FIELD_END: 6000,
    // 任务奖励
    PRIZE_FIELD_BEGIN: 6000,
    PRIZE_FIELD_END: 7000,
    // 任务数据
    TASK_DATA_BEGIN: 7000,
    TASK_DATA_END: 8000,
    // 任务节点
    TASK_NODE_BEGIN: 8000,
    TASK_NODE_END: 10000,
    // 触发事件
    TASK_EVENT_BEGIN: 10000,
    TASK_EVENT_END: 12000,
    // 生成任务条件
    BUILD_FIELD_BEGIN: 12000,
    BUILD_FIELD_END: 14000,
    //任务失败处理
    TASK_FAIL_BEGIN: 14000,
    TASK_FAIL_END: 16000,
    //隐藏任务触发条件
    HIDE_TASK_BEGIN: 16000,
    HIDE_TASK_END: 18000,
    TASK_FIELD_END: 100000,
    // 客户端
    FUNCTION_FIELD_BEGIN: 100000,
    FUNCTION_FIELD_END: 110000,
    TASK_FINISH_STATIC: 120001,
};
// 生成任务数据
//taskField.FIELD_BUILD_GENERATE_MENPAI_SONGXIN			= taskField.BUILD_FIELD_BEGIN + 1 // 12001 生成动态数据-门派送信
//taskField.FIELD_BUILD_GENERATE_MENPAI_ZHAOWU			= taskField.BUILD_FIELD_BEGIN + 2 // 12002 生成动态数据-门派找物
//taskField.FIELD_BUILD_GENERATE_MENPAI_XUNLUO			= taskField.BUILD_FIELD_BEGIN + 3 // 12003 生成动态数据-门派巡逻
//taskField.FIELD_BUILD_GENERATE_MENPAI_ZHUOCHONG		= taskField.BUILD_FIELD_BEGIN + 4 // 12004 生成动态数据-门派捉宠物
//taskField.FIELD_BUILD_GENERATE_MENPAI_TIAOZHAN		= taskField.BUILD_FIELD_BEGIN + 5 // 12005 生成动态数据-门派挑战
//taskField.FIELD_BUILD_GENERATE_MENPAI_CHUMO				= taskField.BUILD_FIELD_BEGIN + 6 // 12006 生成动态数据-门派除魔
//taskField.FIELD_BUILD_GENERATE_MIEMO							= taskField.BUILD_FIELD_BEGIN + 11 // 12011 生成动态数据-灭魔任务
//taskField.FIELD_BUILD_GENERATE_HUSONG							= taskField.BUILD_FIELD_BEGIN + 12 // 12012 生成动态数据-护送任务
//taskField.FIELD_BUILD_GENERATE_TIANSHI						= taskField.BUILD_FIELD_BEGIN + 13 // 12013 生成动态数据-天师任务
//taskField.FIELD_BUILD_GENERATE_HUOYAN							= taskField.BUILD_FIELD_BEGIN + 14 // 12014 生成动态数据-火眼金睛任务
//taskField.FIELD_BUILD_GENERATE_CANGBAOTU					= taskField.BUILD_FIELD_BEGIN + 15 // 12015 生成动态数据-藏宝图任务
//taskField.FIELD_BUILD_GENERATE_ZONGSHI						=	taskField.BUILD_FIELD_BEGIN + 16 // 12016 生成动态数据-宗师任务
//taskField.FIELD_BUILD_GENERATE_FENGYIN						=	taskField.BUILD_FIELD_BEGIN + 17 // 12017	生成动态数据-封印任务
//taskField.FIELD_BUILD_GENERATE_LAOLIU_ZHAOREN			= taskField.BUILD_FIELD_BEGIN + 18 // 12018 生成动态数据-老刘找人
//taskField.FIELD_BUILD_GENERATE_LAOLIU_ZHANDOU			= taskField.BUILD_FIELD_BEGIN + 19 // 12019 生成动态数据-老刘战斗
//taskField.FIELD_BUILD_GENERATE_LAOLIU_XUNWU				= taskField.BUILD_FIELD_BEGIN + 20 // 12020 生成动态数据-老刘寻物
//taskField.FIELD_BUILD_GENERATE_LAOLIU_ZHUOCHONG		= taskField.BUILD_FIELD_BEGIN + 21 // 12021 生成动态数据-老刘捉宠
//taskField.FIELD_BUILD_GENERATE_XIUWEI_ZHAOREN			= taskField.BUILD_FIELD_BEGIN + 22 // 12022 生成动态数据-修炼找人
//taskField.FIELD_BUILD_GENERATE_XIUWEI_XUNWU				= taskField.BUILD_FIELD_BEGIN + 23 // 12023 生成动态数据-修炼寻物
//taskField.FIELD_BUILD_GENERATE_XIUWEI_ZHANDOU			= taskField.BUILD_FIELD_BEGIN + 24 // 12024 生成动态数据-修炼战斗
//taskField.FIELD_BUILD_GENERATE_XIUWEI_ZHUOCHONG		= taskField.BUILD_FIELD_BEGIN + 25 // 12025 生成动态数据-修炼捉宠
//taskField.FIELD_BUILD_GENERATE_XIUWEI_DATI				= taskField.BUILD_FIELD_BEGIN + 26 // 12026 生成动态数据-修炼答题
//taskField.FIELD_BUILD_GENERATE_SHUYUAN						= taskField.BUILD_FIELD_BEGIN + 30 // 12030 生成动态数据-书院任务
//taskField.FIELD_BUILD_GENERATE_SHOUHUN						= taskField.BUILD_FIELD_BEGIN + 32 // 12032 生成动态数据-兽魂任务
//taskField.FIELD_BUILD_GENERATE_TONGXIN						= taskField.BUILD_FIELD_BEGIN + 33 // 12033 生成动态数据-同心任务
//taskField.FIELD_BUILD_GENERATE_BAGUA							= taskField.BUILD_FIELD_BEGIN + 34 // 12034 生成动态数据-八卦任务
//taskField.FIELD_BUILD_GENERATE_SHOULING						= taskField.BUILD_FIELD_BEGIN + 35 // 12035 生成动态数据-兽灵任务
//taskField.FIELD_BUILD_GENERATE_GUOQING1						=	taskField.BUILD_FIELD_BEGIN + 44 // 12044 生成动态数据-国庆任务
//taskField.FIELD_BUILD_GENERATE_GUOQING2						=	taskField.BUILD_FIELD_BEGIN + 45 // 12045 生成动态数据-国庆任务
//taskField.FIELD_BUILD_GENERATE_FIND_NPC						=	taskField.BUILD_FIELD_BEGIN + 46 // 12046 生成动态数据-寻找NPC
//'ZHUA_GUI'={npcId, npcId, npcId} 抓鬼任务数据
// 任务初始化数据（CSV数据）
taskField.FIELD_INIT_TYPE = taskField.INIT_FIELD_BEGIN + 1; // 2001 任务类型
taskField.FIELD_INIT_HOOP = taskField.INIT_FIELD_BEGIN + 2; // 2002 所属任务环
taskField.FIELD_INIT_TIME = taskField.INIT_FIELD_BEGIN + 3; // 2003 任务限制时间(单位：秒)
taskField.FIELD_INIT_PRE_TASK = taskField.INIT_FIELD_BEGIN + 4; // 2004 前置任务ID
taskField.FIELD_INIT_NEXT_TASK = taskField.INIT_FIELD_BEGIN + 5; // 2005 后置任务ID
taskField.FIELD_INIT_AUTO_ATTACH_NEXT_TASK = taskField.INIT_FIELD_BEGIN + 6; // 2006 自动加载后续任务(现在暂时都是自动加载的)
taskField.FIELD_INIT_GENERATE_COLLECT_ITEM = taskField.INIT_FIELD_BEGIN + 7; // 2007 生成动态数据-搜集物品
taskField.FIELD_INIT_GENERATE_COLLECT_PET = taskField.INIT_FIELD_BEGIN + 8; // 2008 生成动态数据-搜集宠物
taskField.FIELD_INIT_GENERATE_KILL_MONSTER = taskField.INIT_FIELD_BEGIN + 9; // 2009 生成动态数据-击杀怪物
//taskField.FIELD_INIT_GENERATE_KILL_NPC						= taskField.INIT_FIELD_BEGIN + 10 // 2010 生成动态数据-战胜NPC
taskField.FIELD_INIT_GENERATE_NPC = taskField.INIT_FIELD_BEGIN + 11; // 2011 生成动态数据-NPC : {[npcid] : {mapid, x, y}, [npcid] =  {mapid, x, y}}
taskField.FIELD_INIT_PROTECT_ITEM = taskField.INIT_FIELD_BEGIN + 12; // 2012 护送物品 	itemEntry
taskField.FIELD_INIT_PROTECT_NPC = taskField.INIT_FIELD_BEGIN + 13; // 2013 护送NPC		npcId
taskField.FIELD_INIT_NOT_FIGHT = taskField.INIT_FIELD_BEGIN + 14; // 2014 不遇普通暗雷怪
taskField.FIELD_INIT_NOT_TIME_OUT = taskField.INIT_FIELD_BEGIN + 15; // 2015 超时不算失败
taskField.FIELD_INIT_REFRESH_NPC = taskField.INIT_FIELD_BEGIN + 16; // 2016 刷新周围的任务NPC
taskField.FIELD_INIT_NOT_FIND_ALL = taskField.INIT_FIELD_BEGIN + 17; // 2017 不需要找齐所有(npc)
taskField.FIELD_INIT_NOT_FIND_TIPS = taskField.INIT_FIELD_BEGIN + 18; // 2018 不需要显示叹号
taskField.FIELD_INIT_WEEK_HOOP = taskField.INIT_FIELD_BEGIN + 19; // 2019 一周更新环段
taskField.FIELD_INIT_FIGHT_SHARE = taskField.INIT_FIELD_BEGIN + 20; // 2020 任务战斗可共享(4004)
taskField.FIELD_INIT_FIGHT_SINGLE = taskField.INIT_FIELD_BEGIN + 21; // 2021 单人任务战斗
taskField.FIELD_INIT_START_TIME = taskField.INIT_FIELD_BEGIN + 22; // 2022 任务开始时间
taskField.FIELD_INIT_TIMEOUT_HIDENPC = taskField.INIT_FIELD_BEGIN + 23; // 2023 超时后隐藏任务NPC
taskField.FIELD_INIT_TIMER_COMBAT = taskField.INIT_FIELD_BEGIN + 24; // 2024 定时遇怪战斗(战斗场次、步数、秒数)
taskField.FIELD_INIT_NOT_JUBAO = taskField.INIT_FIELD_BEGIN + 25; // 2025 不受聚宝影响
taskField.FIELD_INIT_TEAM_SHARE_VICTORY = taskField.INIT_FIELD_BEGIN + 26; // 2026 队伍共同胜利
taskField.FIELD_INIT_GIVE_RES_NOT_COMMIT = taskField.INIT_FIELD_BEGIN + 27; // 2027 提交物品后不交任务
taskField.FIELD_INIT_NOT_DOUBLE_GINGER = taskField.INIT_FIELD_BEGIN + 28; // 2028 不受聚精会神状态影响
taskField.FIELD_INIT_LOGOUT_FAIL = taskField.INIT_FIELD_BEGIN + 29; // 2029 下线则失败
taskField.FIELD_INIT_LOGOUT_FAIL_DELETE = taskField.INIT_FIELD_BEGIN + 30; // 2030 下线时如果失败则删除任务
taskField.FIELD_INIT_COMMIT_COUNT = taskField.INIT_FIELD_BEGIN + 31; // 2031 成功提交任务才计算次数
taskField.FIELD_INIT_FINDNPC_GETITEM = taskField.INIT_FIELD_BEGIN + 32; // 2032 记录NPC时，获取指定物品：{[npcEntryId] : {itemEntryId, count}, ["inPacket"] = true/false, }
taskField.FIELD_INIT_AUTO_COMMIT = taskField.INIT_FIELD_BEGIN + 33; // 2033 任务完成自动提交
taskField.FIELD_INIT_AUTO_CANCEL = taskField.INIT_FIELD_BEGIN + 34; // 2034 任务失败自动放弃
taskField.FIELD_INIT_GENERATE_FACTION_TASK_NPC = taskField.INIT_FIELD_BEGIN + 35; // 2035 生成动态数据-NPC : {[npcid] : {mapid, x, y}, [npcid] =  {mapid, x, y}}
//COMMIT_CHECK_PACKET =size //提交任务检查背包空间
//AUTO_COMMIT = true //完成自动提交任务
//TEAM_COUNT_MIN = count //队伍最少人数
//FIGHT_SINGLE = 1 //单人战斗
//FIGHT_LOST_MSG = 1 //失败后提示
//NOT_NEED_CORRECT_ANSWER = 1 //不需要正确答案
//COMMIT_NPC = npcEntryId //提交任务npc
// 领任务条件（CSV数据）
taskField.FIELD_NEED_LEVEL_MIN = taskField.ACCEPT_FIELD_BEGIN + 1; // 101 最小等级
taskField.FIELD_NEED_LEVEL_MAX = taskField.ACCEPT_FIELD_BEGIN + 2; // 102 最大等级
taskField.FIELD_NEED_PERSION_NUMBER = taskField.ACCEPT_FIELD_BEGIN + 3; // 103 参与人数
taskField.FIELD_NEED_NO_TASK = taskField.ACCEPT_FIELD_BEGIN + 4; // 104 没有任务
taskField.FIELD_NEED_GENDER = taskField.ACCEPT_FIELD_BEGIN + 5; // 105 性别限制
taskField.FIELD_NEED_SCHOOL = taskField.ACCEPT_FIELD_BEGIN + 6; // 106 门派限制
taskField.FIELD_NEED_ITEM = taskField.ACCEPT_FIELD_BEGIN + 7; // 107 需要物品
taskField.FIELD_NEED_INTERVAL = taskField.ACCEPT_FIELD_BEGIN + 8; // 108 距离上次放弃时间 单位：秒
taskField.FIELD_NEED_TEAM_MEMBER = taskField.ACCEPT_FIELD_BEGIN + 9; // 109 组队人数，必须无人暂离,队伍所有人都有接到任务
taskField.FIELD_NEED_NOT_GROUP = taskField.ACCEPT_FIELD_BEGIN + 10; // 110 组团不可接任务
taskField.FIELD_NEED_NOT_TEAM = taskField.ACCEPT_FIELD_BEGIN + 11; // 111 不可组队
taskField.FIELD_NEED_SCHOOL_TASK = taskField.ACCEPT_FIELD_BEGIN + 12; // 112 需要做门派任务次数
taskField.FIELD_NEED_DO_LESS = taskField.ACCEPT_FIELD_BEGIN + 13; // 113 每天做该任务次数上限
taskField.FIELD_NEED_OPEN_FUNDS = taskField.ACCEPT_FIELD_BEGIN + 14; // 114 开启任务时需要储备金
taskField.FIELD_NEED_REOPEN_FUNDS = taskField.ACCEPT_FIELD_BEGIN + 15; // 115 放弃后重新开启需要储备金
taskField.FIELD_NEED_NOT_OPEN_TASK = taskField.ACCEPT_FIELD_BEGIN + 16; // 116 没有开启过某任务
taskField.FIELD_NEED_FINISH_TASK = taskField.ACCEPT_FIELD_BEGIN + 17; // 117 本周完成N次某任务{taskType, count}
taskField.FIELD_NEED_DO_WEEK = taskField.ACCEPT_FIELD_BEGIN + 18; // 118 每周做该任务上限
taskField.FIELD_NEED_REFRESH_TIME = taskField.ACCEPT_FIELD_BEGIN + 19; // 119 更新时间内不可接受
taskField.FIELD_NEED_FIGHT_PET = taskField.ACCEPT_FIELD_BEGIN + 20; // 120 必须要有参战宠物
taskField.FIELD_NEED_ADVANCE_SCHOOL = taskField.ACCEPT_FIELD_BEGIN + 21; // 121 职业进阶需求
taskField.FIELD_NEED_POSITION = taskField.ACCEPT_FIELD_BEGIN + 22; // 122 位置{mapid, x, y, range}
taskField.FIELD_NEED_BOSS = taskField.ACCEPT_FIELD_BEGIN + 23; // 123 没解锁某BOSS
taskField.FIELD_NEED_FACTION_MEMBER = taskField.ACCEPT_FIELD_BEGIN + 24; // 124 宗族成员
taskField.FIELD_NEED_XIANGSHI_OPEN = taskField.ACCEPT_FIELD_BEGIN + 25; // 125 乡试 会试 殿试开启
taskField.FIELD_NEED_DEADLINE = taskField.ACCEPT_FIELD_BEGIN + 26; // 126 接任务最迟时间{年、月、日}
taskField.FIELD_NEED_ACCEPT_COUNT = taskField.ACCEPT_FIELD_BEGIN + 27; // 127 接任务时间内能做的次数
taskField.FIELD_NEED_START_TIME = taskField.ACCEPT_FIELD_BEGIN + 28; // 128 开始能接任务的时间
taskField.FIELD_NEED_ACTIVITY_TIME = taskField.ACCEPT_FIELD_BEGIN + 29; // 129 新服活动时间才能接
//'TEAM_SHARE' = 1 //共享任务
//'SINGLE' = 1 //单人任务
//'ACCEPT_COUNT' = count //每天接该任务次数上限
// 完成任务条件（CSV数据）
taskField.FIELD_FINISH_KILLMONSTER = taskField.FINISH_FIELD_BEGIN + 1; // 4001 击杀怪物
taskField.FIELD_FINISH_COLLECTITEM = taskField.FINISH_FIELD_BEGIN + 2; // 4002 收集物品
taskField.FIELD_FINISH_COLLECTPET = taskField.FINISH_FIELD_BEGIN + 3; // 4003 收集宠物
taskField.FIELD_FINISH_FIGHTWIN = taskField.FINISH_FIELD_BEGIN + 4; // 4004 战胜NPC
taskField.FIELD_FINISH_FINDNPC = taskField.FINISH_FIELD_BEGIN + 5; // 4005 寻找NPC
taskField.FIELD_FINISH_LEVEL = taskField.FINISH_FIELD_BEGIN + 6; // 4006 角色升级
taskField.FIELD_FINISH_FIGHT_SKILL_LEVEL = taskField.FINISH_FIELD_BEGIN + 7; // 4007 战斗技能学习
taskField.FIELD_FINISH_WEARWEAPON = taskField.FINISH_FIELD_BEGIN + 8; // 4008 装备武器
taskField.FIELD_FINISH_FINDNPC_SCHOOL = taskField.FINISH_FIELD_BEGIN + 9; // 4009 寻找NPC-门派NPC列表
taskField.FIELD_FINISH_FINDNPC_ONEBYONE = taskField.FINISH_FIELD_BEGIN + 10; // 4010 寻找NPC-按顺序访问（即是线性访问，相对的可以离散的随意访问）
taskField.FIELD_FINISH_FINDNPC_ONLYONE = taskField.FINISH_FIELD_BEGIN + 11; // 4011 寻找NPC-只需要访问其中一个NPC即可。(标志用)
taskField.FIELD_FINISH_LIVING_SKILL_LEVEL = taskField.FINISH_FIELD_BEGIN + 12; // 4012 生活技能学习
taskField.FIELD_FINISH_FIGHTWIN_SCHOOL = taskField.FINISH_FIELD_BEGIN + 13; // 4013 战胜NPC-门派NPC列表
taskField.FIELD_FINISH_FIGHTWIN_ONEBYONE = taskField.FINISH_FIELD_BEGIN + 14; // 4014 战胜NPC-按顺序访问（即是线性访问，相对的可以离散的随意访问）
taskField.FIELD_FINISH_FIGHTWIN_ONLYONE = taskField.FINISH_FIELD_BEGIN + 15; // 4015 战胜NPC-只需要访问其中一个NPC即可。
taskField.FIELD_FINISH_COLLECTITEM_ONLYONE = taskField.FINISH_FIELD_BEGIN + 16; // 4016 搜集物品-只需要搜集其中一个即可。
taskField.FIELD_FINISH_COLLECTITEM_DELETE = taskField.FINISH_FIELD_BEGIN + 17; // 4017 搜集物品-完成后删除。
taskField.FIELD_FINISH_PET_LEVEL = taskField.FINISH_FIELD_BEGIN + 18; // 4018 宠物升级
taskField.FIELD_FINISH_ARRIVE_POSITION = taskField.FINISH_FIELD_BEGIN + 19; // 4019 到达坐标点
taskField.FIELD_FINISH_COLLECT_TYPE_ITEM = taskField.FINISH_FIELD_BEGIN + 20; // 4020 收集任意类型物品
taskField.FIELD_FINISH_PVP_EXERCISE = taskField.FINISH_FIELD_BEGIN + 21; // 4021 玩家和玩家打练习赛
taskField.FIELD_FINISH_USE_ITEM = taskField.FINISH_FIELD_BEGIN + 22; // 4022 使用物品
taskField.FIELD_FINISH_FORMATION_LEARN = taskField.FINISH_FIELD_BEGIN + 23; // 4023 阵型学习
taskField.FIELD_FINISH_ITEM_BAG_SPACE = taskField.FINISH_FIELD_BEGIN + 24; // 4024 物品背包空间足够
taskField.FIELD_FINISH_PET_BAG_SPACE = taskField.FINISH_FIELD_BEGIN + 25; // 4025 宠物背包空间足够
taskField.FIELD_FINISH_KILLMONSTER_NOT_MUST = taskField.FINISH_FIELD_BEGIN + 26; // 4026 击杀怪物（不是必须杀够）
taskField.FIELD_FINISH_GIVE_ITEM = taskField.FINISH_FIELD_BEGIN + 27; // 4027 给予物品
taskField.FIELD_FINISH_SEND_CHANNEL_MSG = taskField.FINISH_FIELD_BEGIN + 28; // 4028 发送频道消息
taskField.FIELD_FINISH_SEND_FILTER_PLAYER = taskField.FINISH_FIELD_BEGIN + 29; // 4029 屏蔽玩家
taskField.FIELD_FINISH_SEND_FILTER_STALL = taskField.FINISH_FIELD_BEGIN + 30; // 4030 屏蔽摊位
taskField.FIELD_FINISH_PVE_COUNT = taskField.FINISH_FIELD_BEGIN + 31; // 4031 战胜NPC计算次数(巡逻)
taskField.FIELD_FINISH_PVE_SCHOOL = taskField.FINISH_FIELD_BEGIN + 32; // 4032 挑战门派弟子
taskField.FIELD_FINISH_GIVE_RES = taskField.FINISH_FIELD_BEGIN + 33; // 4033 给予物品
taskField.FIELD_FINISH_KILL_NPC_MONSTER = taskField.FINISH_FIELD_BEGIN + 34; // 4034 击杀明雷怪物(除魔)
taskField.FIELD_FINISH_KILL_MAP_MONSTER = taskField.FINISH_FIELD_BEGIN + 35; // 4035 击杀地图的怪物(灭魔)-地图ID、x、y、总数量
taskField.FIELD_FINISH_SCHOOL_TASK = taskField.FINISH_FIELD_BEGIN + 36; // 4036 门派任务
taskField.FIELD_FINISH_GIVE_PET = taskField.FINISH_FIELD_BEGIN + 37; // 4037 给予宠物
taskField.FIELD_FINISH_CANGBAOTU = taskField.FINISH_FIELD_BEGIN + 38; // 4038 藏宝图
taskField.FIELD_FINISH_COLLECTPET_ONLYONE = taskField.FINISH_FIELD_BEGIN + 39; // 4039 搜集宠物-只需要一个即可
taskField.FIELD_FINISH_FIGHT_MAP_COUNT = taskField.FINISH_FIELD_BEGIN + 40; // 4040 在某地图战胜多少场-地图ID、x、y、总数量
taskField.FIELD_FINISH_CHANGE_SUIT = taskField.FINISH_FIELD_BEGIN + 41; // 4041 换装
taskField.FIELD_FINISH_KILL_BOSS = taskField.FINISH_FIELD_BEGIN + 43; // 4043 打败BOSS
taskField.FIELD_FINISH_ARRIVE_POINT = taskField.FINISH_FIELD_BEGIN + 44; // 4044 到达坐标点(跟4019差不多,客户端表现不同)
taskField.FIELD_FINISH_ENOUGH_GOLD = taskField.FINISH_FIELD_BEGIN + 45; // 4045 宗族有足够灵石
taskField.FIELD_FINISH_ADVANCE_SCHOOL = taskField.FINISH_FIELD_BEGIN + 46; // 4046 需要职业进阶
taskField.FIELD_FINISH_GINGER = taskField.FINISH_FIELD_BEGIN + 47; // 4047 需要领取高效精力
taskField.FIELD_FINISH_KILL_MAP_EX = taskField.FINISH_FIELD_BEGIN + 48; // 4048 灭魔的其他地图
taskField.FIELD_FINISH_FINDNPC2 = taskField.FINISH_FIELD_BEGIN + 49; // 4049 寻找NPC(乡试会试殿试)
taskField.FIELD_FINISH_TIME = taskField.FINISH_FIELD_BEGIN + 50; // 4050 任务完成时限
taskField.FIELD_FINISH_JOINSCHOOL = taskField.FINISH_FIELD_BEGIN + 51; // 4051	加入门派
taskField.FIELD_FINISH_FIGHT_NPC_WIN = taskField.FINISH_FIELD_BEGIN + 52; // 4052 战胜NPC(多个)
taskField.FIELD_FINISH_FINDNPC_COUNT = taskField.FINISH_FIELD_BEGIN + 53; // 4053 寻找npc(多次)
taskField.FIELD_FINISH_ARRIVE_NPC = taskField.FINISH_FIELD_BEGIN + 54; // 4054 到达npc位置
taskField.FIELD_FINISH_GRAB_ORE = taskField.FINISH_FIELD_BEGIN + 55; // 4055 掠夺矿洞
taskField.FIELD_FINISH_SKYTOWER_IN_TEAM = taskField.FINISH_FIELD_BEGIN + 56; // 4056 组队通关天空之塔
taskField.FIELD_FINISH_CAMPAIGN_COUNT = taskField.FINISH_FIELD_BEGIN + 57; // 4057 通关指定关卡
taskField.FIELD_FINISH_FIGHTWIN_FACTION_NPC = taskField.FINISH_FIELD_BEGIN + 58; // 4058 战胜军团任务NPC
taskField.FIELD_FINISH_COMMIT_ITEM = taskField.FINISH_FIELD_BEGIN + 59; // 4059 给NPC提交指定物品
taskField.FIELD_FINISH_CHANGE_DISPLAY = taskField.FINISH_FIELD_BEGIN + 60; // 4060 改变形象
taskField.FIELD_FINISH_WORLD_CHANNEL_TALK = taskField.FINISH_FIELD_BEGIN + 61; // 4061 世界频道说话
taskField.FIELD_FINISH_MAKE_OBLATION = taskField.FINISH_FIELD_BEGIN + 62; // 4062 打造祭品
//FEIXINGQ_QUESTION=questionId //飞行棋问题
//FIGHTWIN_NPC={npcEntryId}    //战胜NPC
//TASK_TYPE_COUNT={taskType, count} //完成某种类型任务次数
//QUESTION={问题,答案1,答案2,答案3}
//ANSWER_RESULT=ture/false 是否回答正确
//CAMPAIGN=campaignId  //关卡Id
//COLLECTITEM={itemId, count} //收集物品
//COLLECTGOLD=gold //收集金币
// 任务奖励（CSV数据
//GOLD 元宝
//FUNDS 金币
//PLREXP 经验
//POWER 体力
//PET 宠物
//BINDITEM 绑定道具 
//ITEM 道具
//FACTION_PRIZE 军团奖励
//FACTION_PRIZE_ITEM 军团道具类任务奖励
//FACTION_PRIZE_PUB 军团发布类任务奖励
// 任务流程
taskField.FIELD_NODE_LEVEL = taskField.TASK_NODE_BEGIN + 1; // 8001 等级
taskField.FIELD_CHECK_TASK_NODE = taskField.TASK_NODE_BEGIN + 2; //8002 节点
// 任务事件（CSV数据）
taskField.FIELD_EVENT_FIGHT = taskField.TASK_EVENT_BEGIN + 1; // 10001 战斗事件
taskField.FIELD_EVENT_REMOVE_ITEM = taskField.TASK_EVENT_BEGIN + 2; // 10002 删除物品事件
taskField.FIELD_EVENT_MOVETO = taskField.TASK_EVENT_BEGIN + 3; // 10003 跳转事件
taskField.FIELD_EVENT_USE_ITEM = taskField.TASK_EVENT_BEGIN + 4; // 10004 使用物品事件
taskField.FIELD_EVENT_USE_SKILL = taskField.TASK_EVENT_BEGIN + 5; // 10005 使用技能事件
taskField.FIELD_EVENT_MOVETO_SCHOOL = taskField.TASK_EVENT_BEGIN + 6; // 10006 门派跳转事件
taskField.FIELD_EVENT_FIGHT_SCHOOL = taskField.TASK_EVENT_BEGIN + 7; // 10007 门派战斗事件
taskField.FIELD_EVENT_REMOVE_PET = taskField.TASK_EVENT_BEGIN + 8; // 10008 删除宠物事件
taskField.FIELD_EVENT_GET_ITEM = taskField.TASK_EVENT_BEGIN + 9; // 10009 得到物品事件
taskField.FIELD_EVENT_COMBAT_DROP_ITEM = taskField.TASK_EVENT_BEGIN + 10; // 10010 战斗掉落物品事件
taskField.FIELD_EVENT_TIMED_PVE = taskField.TASK_EVENT_BEGIN + 11; // 10011 定时遇怪事件
taskField.FIELD_EVENT_TEMP_NPC = taskField.TASK_EVENT_BEGIN + 12; // 10012 临时NPC
taskField.FIELD_EVENT_GENERATE_COLLECT_ITEM = taskField.TASK_EVENT_BEGIN + 13; // 10013 生成动态数据-搜集物品
taskField.FIELD_EVENT_GENERATE_COLLECT_PET = taskField.TASK_EVENT_BEGIN + 14; // 10014 生成动态数据-搜集宠物
taskField.FIELD_EVENT_GENERATE_KILL_MONSTER = taskField.TASK_EVENT_BEGIN + 15; // 10015 生成动态数据-击杀怪物
taskField.FIELD_EVENT_GENERATE_KILL_NPC = taskField.TASK_EVENT_BEGIN + 16; // 10016 生成动态数据-战胜NPC
taskField.FIELD_EVENT_GENERATE_FIND_NPC = taskField.TASK_EVENT_BEGIN + 17; // 10017 生成动态数据-寻找NPC
taskField.FIELD_EVENT_TIMED_PATROL_PVE = taskField.TASK_EVENT_BEGIN + 18; // 10018 巡逻遇怪事件
taskField.FIELD_EVENT_TEMP_MONSTER_NPC = taskField.TASK_EVENT_BEGIN + 19; // 10019 明雷怪NPC
taskField.FIELD_EVENT_NOT_COMMON_FIGHT = taskField.TASK_EVENT_BEGIN + 20; // 10020 不遇普通暗雷怪
taskField.FIELD_EVENT_TIMED_PROTECT_PVE = taskField.TASK_EVENT_BEGIN + 21; // 10021 护送任务暗雷怪
taskField.FIELD_EVENT_FIGHT_PROTECT = taskField.TASK_EVENT_BEGIN + 22; // 10022 护送任务战
taskField.FIELD_EVENT_FIGHT_EX = taskField.TASK_EVENT_BEGIN + 23; // 10023 战斗事件扩展
taskField.FIELD_EVENT_OPEN_FUNDS = taskField.TASK_EVENT_BEGIN + 24; // 10024 开启任务时收取储备金
taskField.FIELD_EVENT_REOPEN_FUNDS = taskField.TASK_EVENT_BEGIN + 25; // 10025 放弃后重新开启任务收取储备金
taskField.FIELD_EVENT_FIGHT_SEND_MSG = taskField.TASK_EVENT_BEGIN + 26; // 10026 战斗失败后发送resultCode
taskField.FIELD_EVENT_APPLY_BUFF = taskField.TASK_EVENT_BEGIN + 27; // 10027 添加buff
taskField.FIELD_EVENT_FIGHT_CHANGE_SKILL = taskField.TASK_EVENT_BEGIN + 29; // 10029 战斗前改变技能
taskField.FIELD_EVENT_FIGHT_RESTORE_SKILL = taskField.TASK_EVENT_BEGIN + 30; // 10030 战斗后恢复技能
taskField.FIELD_EVENT_FIGHT_ADD_FIGHTER = taskField.TASK_EVENT_BEGIN + 31; // 10031 战斗前增加fighter
taskField.FIELD_EVENT_FIGHT_CHANGE_BODY = taskField.TASK_EVENT_BEGIN + 32; // 10032 战斗前改变身体
taskField.FIELD_EVENT_FIGHT_RESTORE_BODY = taskField.TASK_EVENT_BEGIN + 33; // 10033 战斗后恢复身体
taskField.FIELD_EVENT_ACCEPT_REMOVE_ITEM = taskField.TASK_EVENT_BEGIN + 35; // 10035 接受任务时回收物品
taskField.FIELD_EVENT_COMBAT_MAP_DROP_ITEM = taskField.TASK_EVENT_BEGIN + 36; // 10036 地图掉落物品事件
taskField.FIELD_EVENT_TIPS_COUNT = taskField.TASK_EVENT_BEGIN + 37; // 10037 完成任务后发送TIPS
taskField.FIELD_EVENT_TEAM_FIGHT = taskField.TASK_EVENT_BEGIN + 38; // 10038 战斗事件
//TEAM_FIGHT = monsterTeamId //战斗事件
//任务失败处理
taskField.FIELD_FAIL_HOOP_OUT = taskField.TASK_FAIL_BEGIN + 1; //	14001 失败断环
taskField.FIELD_FAIL_LEAVE_TEAM = taskField.TASK_FAIL_BEGIN + 2; //	14002 退出队伍则失败
taskField.FIELD_FAIL_FIGHT_LOSE = taskField.TASK_FAIL_BEGIN + 3; //	14003 战败则失败
taskField.FIELD_FAIL_DROP_ITEM = taskField.TASK_FAIL_BEGIN + 4; //	14004 失败丢弃物品
taskField.FIELD_FAIL_PRE_TASK = taskField.TASK_FAIL_BEGIN + 5; //	14005 失败回退到前一个任务
taskField.FIELD_FAIL_REMOVE_BUFF = taskField.TASK_FAIL_BEGIN + 6; //	14006 清除buff
// 记录在Task.data中的动态数据，一般此字段的数据ID使用其他字段的ID
taskField.TASK_DATA_DYNAMIC_ENTRY = taskField.TASK_DATA_BEGIN + 1; // 7001 动态生成的任务模板数据
taskField.TASK_DATA_INITED = taskField.TASK_DATA_BEGIN + 2; // 7002 任务动态条件已经生成 : true
taskField.TASK_DATA_TMPNPC = taskField.TASK_DATA_BEGIN + 3; // 7003 任务临时npc实例id : {npcid, npcid, }
taskField.TASK_DATA_DEADLINE = taskField.TASK_DATA_BEGIN + 4; // 7004 到期时间
taskField.TASK_DATA_NPCHP = taskField.TASK_DATA_BEGIN + 5; // 7005 护送NPC的血量
taskField.TASK_DATA_FAIL = taskField.TASK_DATA_BEGIN + 6; // 7006 任务失败
taskField.TASK_DATA_FOLLOWNPC = taskField.TASK_DATA_BEGIN + 7; // 7007 跟随npc的ID
taskField.TASK_DATA_WHERE = taskField.TASK_DATA_BEGIN + 8; // 7008 任务执行位置 {mapid, x, y, range, sumulateX, sumulateY}
taskField.TASK_DATA_ITEM = taskField.TASK_DATA_BEGIN + 9; // 7009 物品entry id
taskField.TASK_DATA_OPENMAP = taskField.TASK_DATA_BEGIN + 10; // 7010 地图开光 (value = 1开光)
taskField.TASK_DATA_FINISH = taskField.TASK_DATA_BEGIN + 11; // 7011 任务完成，可提交，
taskField.TASK_DATA_ANSWER = taskField.TASK_DATA_BEGIN + 12; // 7012 回答问题(书院任务)-{第几题,题目,上一题结果,上一题经验,正确数量,总经验}
taskField.TASK_DATA_COMMIT_COUNT = taskField.TASK_DATA_BEGIN + 17; // 7017 成功提交才计算任务次数
taskField.TASK_DATA_TIPS_COUNT = taskField.TASK_DATA_BEGIN + 18; // 7018 提示次数(藏宝图)
taskField.TASK_DATA_TOMORROW_TIME = taskField.TASK_DATA_BEGIN + 19; // 7019 明天凌晨的时间(书院任务放弃时用到)
taskField.TASK_DATA_ITEM_TIPS = taskField.TASK_DATA_BEGIN + 20; // 7020 获得物品提示(藏宝图)
taskField.TASK_DATA_ITEM_RES = taskField.TASK_DATA_BEGIN + 21; // 7021 提交的物品的信息{entry, quality, count}
taskField.TASK_DATA_BUFF_GINGER = taskField.TASK_DATA_BEGIN + 22; // 7022 接任务时多扣除的精力(聚精会神buff)
taskField.TASK_DATA_BUFF_RATE = taskField.TASK_DATA_BEGIN + 23; // 7023 接任务时多扣除精力的收益倍率
taskField.TASK_DATA_BUFF_GINGER2 = taskField.TASK_DATA_BEGIN + 26; // 7026 接任务时多扣除的精力(聚精会神buff)
//隐藏任务触发条件
taskField.HIDE_TASK_COMBAT = taskField.HIDE_TASK_BEGIN + 1; //16001	战斗触发
taskField.HIDE_TASK_BOSS_COMBAT = taskField.HIDE_TASK_BEGIN + 2; //16002	头目战触发
taskField.HIDE_TASK_TASK = taskField.HIDE_TASK_BEGIN + 3; //16003	任务触发
taskField.HIDE_TASK_USE_ITEM = taskField.HIDE_TASK_BEGIN + 4; //16004	物品触发
taskField.HIDE_TASK_SKILL = taskField.HIDE_TASK_BEGIN + 5; //16005	遗忘技能触发
taskField.HIDE_TASK_APPLY = taskField.HIDE_TASK_BEGIN + 6; //16006	客户端申请触发
taskField.HIDE_TASK_TASK_COMBAT = taskField.HIDE_TASK_BEGIN + 7; //16007	任务战触发
taskField.HIDE_TASK_FIGHT_BOUT = taskField.HIDE_TASK_BEGIN + 8; //16008	任务战每回合触发
taskField.HIDE_TASK_COUNTER = taskField.HIDE_TASK_BEGIN + 9; //16009 统计
taskField.HIDE_TASK_MAP = taskField.HIDE_TASK_BEGIN + 101; //16101	地图
taskField.HIDE_TASK_WIN_COUNT = taskField.HIDE_TASK_BEGIN + 102; //16102	地图胜利次数
taskField.HIDE_TASK_KILL_COUNT = taskField.HIDE_TASK_BEGIN + 103; //16103	杀死怪物数量
taskField.HIDE_TASK_KILL_MONSTER = taskField.HIDE_TASK_BEGIN + 104; //16104	杀死指定怪物数量
taskField.HIDE_TASK_BOSS = taskField.HIDE_TASK_BEGIN + 201; //16201	头目ID
taskField.HIDE_TASK_RIGHT_COUNT = taskField.HIDE_TASK_BEGIN + 202; //16202	己方参战人数
taskField.HIDE_TASK_BOSS_LIST = taskField.HIDE_TASK_BEGIN + 203; //16203	战胜过的boss(id,难度)
taskField.HIDE_TASK_FIGHT_BOUT1 = taskField.HIDE_TASK_BEGIN + 204; //16204	多少回合内(<=)
taskField.HIDE_TASK_FIGHT_BOUT2 = taskField.HIDE_TASK_BEGIN + 205; //16205	多少回合后(>=)
taskField.HIDE_TASK_FIGHTER_HP1 = taskField.HIDE_TASK_BEGIN + 206; //16206	怪物血量在%多少以上(entry, %)
taskField.HIDE_TASK_FIGHTER_HP2 = taskField.HIDE_TASK_BEGIN + 207; //16207	怪物血量在%多少以下(entry, %)
taskField.HIDE_TASK_FIGHTER_HP3 = taskField.HIDE_TASK_BEGIN + 208; //16208	怪物血量在多少以上(entry, hp)
taskField.HIDE_TASK_FIGHTER_HP4 = taskField.HIDE_TASK_BEGIN + 209; //16209	怪物血量在多少以下(entry, hp)
taskField.HIDE_TASK_TASK_ID = taskField.HIDE_TASK_BEGIN + 301; //16301	任务ID
taskField.HIDE_TASK_TASK_TYPE = taskField.HIDE_TASK_BEGIN + 302; //16302	任务类型
taskField.HIDE_TASK_TASK_COUNT = taskField.HIDE_TASK_BEGIN + 303; //16303	完成任务次数
taskField.HIDE_TASK_SHU_YUAN = taskField.HIDE_TASK_BEGIN + 304; //16304	当天书院正确完成次数
taskField.HIDE_TASK_FINISH_TIME = taskField.HIDE_TASK_BEGIN + 305; //16305	提前完成任务的时间(秒)
taskField.HIDE_TASK_DATA_COUNT = taskField.HIDE_TASK_BEGIN + 306; //16306 检查任务数据
taskField.HIDE_TASK_ITEM_ENTRY = taskField.HIDE_TASK_BEGIN + 401; //16401 物品entry
taskField.HIDE_TASK_DAY_USE_COUNT = taskField.HIDE_TASK_BEGIN + 402; //16402 物品当天使用次数
taskField.HIDE_TASK_DAY_USE_TOTAL = taskField.HIDE_TASK_BEGIN + 403; //16403 物品使用总数
taskField.HIDE_TASK_FORGET_COUNT = taskField.HIDE_TASK_BEGIN + 502; //16502 遗忘技能次数
taskField.HIDE_TASK_COUNT_KEY = taskField.HIDE_TASK_BEGIN + 901; //16901 
taskField.HIDE_TASK_COUNT_DIE = taskField.HIDE_TASK_BEGIN + 902; //16902 死亡次数
taskField.HIDE_TASK_COUNT_FRIEND = taskField.HIDE_TASK_BEGIN + 903; //16903 好友数量
taskField.HIDE_TASK_COUNT_PACKET = taskField.HIDE_TASK_BEGIN + 904; //16904 背包
taskField.HIDE_TASK_COUNT_UNMARRY = taskField.HIDE_TASK_BEGIN + 905; //16905 离婚次数
taskField.HIDE_TASK_COUNT_JIFEN = taskField.HIDE_TASK_BEGIN + 906; //16906 积分
taskField.HIDE_TASK_COUNT_STALL = taskField.HIDE_TASK_BEGIN + 907; //16907 摆摊现银(当天)
taskField.HIDE_TASK_COUNT_ZHANJI = taskField.HIDE_TASK_BEGIN + 908; //16908 战绩
taskField.HIDE_TASK_COUNT_BIAOQING = taskField.HIDE_TASK_BEGIN + 909; //16909 表情数量
// 功能 (客户端使用)
taskField.FIELD_CHECK_SCHOOL = taskField.FUNCTION_FIELD_BEGIN + 1; //100001//检查门派
taskField.FIELD_FIGHT_SKILL = taskField.FUNCTION_FIELD_BEGIN + 2; //100002//战斗技能
taskField.FIELD_LIVING_SKILL = taskField.FUNCTION_FIELD_BEGIN + 3; //100003//生活技能
taskField.FIELD_FIND_ANY_ITEM = taskField.FUNCTION_FIELD_BEGIN + 4; //100004//满足任意一个物品的数量即可
taskField.FIELD_CHECK_BAG = taskField.FUNCTION_FIELD_BEGIN + 5; //100005//检查背包空间
////////-宗族任务//////////////////
taskField.FIELD_CHECK_IN_FACTION = taskField.FUNCTION_FIELD_BEGIN + 6; //100006//检查角色是否在宗族内
taskField.FIELD_CHECK_IN_GROUP_OR_TEAM = taskField.FUNCTION_FIELD_BEGIN + 7; //100007//检查角色是否加入团队
taskField.FIELD_CHECK_HAVE_FATION_TASK = taskField.FUNCTION_FIELD_BEGIN + 8; //100008//检查角色是否已领取宗族任务
taskField.FIELD_CHECK_ISFINISH_FACTION_TASK = taskField.FUNCTION_FIELD_BEGIN + 9; //100009//检查角色是否达到完成宗族任务条件
taskField.FIELD_CHECK_GIVEUP_FATION_TASK_IN_TIME = taskField.FUNCTION_FIELD_BEGIN + 10; //100010//检查角色是否5分钟内有放弃过宗族任务
taskField.FIELD_CHECK_IS_PROBABILITY = taskField.FUNCTION_FIELD_BEGIN + 11; //100011//检查角色是否符合概率
// 定时器列表字段
var taskTimerField = {
    FIELD_PVE: 1,
    FIELD_COUNTDOWN: 2,
    FIELD_PATROL_PVE: 3,
    FIELD_PROTECT_PVE: 4,
};
// 怪物（宠物）
var taskMonsterField = {
    id: 1,
    level: 2,
    type: 3,
    count: 4,
    name: 5,
};
// 战斗敌友方字段
var taskEventFightField = {
    enemy_side: 1,
    friend_side: 2,
};
// 地图点字段
var taskMapPointField = {
    mapId: 1,
    posX: 2,
    posY: 3,
};
//
var opTaskFightLevel = {
    MAX: 1000,
    AVG: 1001,
};
//
var opTaskFightCount = {
    TEAM: 100,
    TEAM1: 101,
    TEAMMAX: 110,
};
//军团任务概率
var opFactionTaskRate = {
    itemRate: 0.0095,
    robberRate: 0.0095,
    robberRate2: 0.0095,
    robberRate3: 0.0095,
};
//军团发布任务常量
var opFactionPubTaskLimit = {
    taskPoolCountLimit: 50,
    taskPubTimeLimit: 86400,
};
//军团任务类型
var opFactionTaskType = {
    normalTask: 1,
    itemTask: 2,
    publishTask: 3,
};
//军团任务发布常量
var opFactionTaskPublish = {
    spendMoney: 30,
    publishPrize: [["item", 40452, 1]] //发布的任务被完成后获得的奖励
};
var _a;
//// 门派传送弟子
//taskSchoolTransferNPC = { 20012, 20013, 20015, 20017, 20016, 20014, 20018, 20019 }
//
//// 门派掌门
//taskSchoolLeaderNPC = { 10008, 10010, 10015, 10019, 10017, 10012, 10021, 10023 }
//
//// 门派大师兄
//taskSchoolSeniorNPC = { 10009, 10011, 10016, 10020, 10018, 10013, 10022, 10024 }
//
//
//// 门派任务ID {门派送信, 门派找物, 门派巡逻, 门派捉宠, 门派挑战, 门派除魔}
//taskSchoolTaskId = { 2003001, 2003002, 2003003, 2003004, 2003005, 2003006 }
//
//// 护送任务ID {护送采药、护送杀怪、护送到达地点}
//taskHuSongTaskId = {2007001, 2007002, 2007003}
//
////
//let notTeamTask:any = {2007001, 2007002, 2007003, 2009001, 2012001, 2003003, 2003005, 2003103, 2003105, 2016001, 2017001, 
//												1001024, 1001066,1005014,1006005,1007005, }
//let notTransTask:any = {2007001, 2007002, 2007003, 2016001, 1001024, 1001066, 1005014, 1006005, 1007005, }
//let notStallTask:any = {2007001, 2007002, 2007003, 1001024, 1001066, 1005014, 1006005, 1007005, }
//let notPkTask:any = {2007001, 2007002, 2007003, 2016001, 1001024, 1001066, 1005014, 1006005, 1007005, }
//
//let notChangeSchoolTask:any = {1001029,1001030,1001031,1001032,1001034,1001035,1001036,5000111,5000112,5000113,
//																5000121,5000122,5000123,5000124}
//
////禁止组队任务
//taskNotTeamId = {}
//
////禁止传送任务
//taskNotTransportId = {}
//
////禁止摆摊任务
//taskNotStallId = {}
//
////禁止PK任务
//taskNotPK = {}
//
////禁止转门派任务
//taskNotChangeSchool = {}
//
////生成任务限制table
//function serialTaskForbid(){
//	//组队限制
//	for(let k = 0; k < notTeamTask.length; k++){
//let v = notTeamTask[k]
//		taskNotTeamId[v] = 1
//	}
//	
//	//传送限制
//	for(let k = 0; k < notTransTask.length; k++){
//let v = notTransTask[k]
//		taskNotTransportId[v] = 1
//	}	
//	
//	//摆摊限制
//	for(let k = 0; k < notStallTask.length; k++){
//let v = notStallTask[k]
//		taskNotStallId[v] = 1
//	}	
//	
//	//PK限制
//	for(let k = 0; k < notPkTask.length; k++){
//let v = notPkTask[k]
//		taskNotPK[v] = 1
//	}
//	
//	//转门派
//	for(let k = 0; k < notChangeSchoolTask.length; k++){
//let v = notChangeSchoolTask[k]
//		taskNotChangeSchool[v] = 1
//	}
//}
//serialTaskForbid() 
//# sourceMappingURL=taskOption.js.map