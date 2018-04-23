//opFirstRecharge = 
//{
// ItemList:any : {{300033,1}, {30002,2}, {30003, 2}},
//	PetEntryId = 18014,
//	Funds = 50000,
//}
//	战斗转化属性
//finalAbilityOptions = 
//{
//	physicalAttack   : 1,     // 物理攻击力
//	spellAttack      : 2,     // 法术攻击力	
//	speed            : 3,     // 速度
//	physicalDefence  : 4,     // 物理免伤率
//	physicalHitrate  : 5,     // 物理命中率
//	physicalDodge    : 6,     // 物理闪避率
//	physicalCritical : 7,     // 物理暴击率
//	physicalResist   : 8,     // 物抗率
//	spellDefence     : 9,     // 法术免伤率
//	spellHitrate     : 10,    // 法术命中率
//	spellDodge       : 11,    // 法术闪避率
//	spellCritical    : 12,    // 法术暴击率
//	spellResist      : 13,    // 法抗率
//	statusHitrate    : 14,    // 状态命中率
//	statusResist     : 15,    // 状态抗率
//}
var abilityPowerRatio = (_a = {},
    _a[objectField.UNIT_FIELD_MAX_HP] = 0.5,
    _a[objectField.UNIT_FIELD_SPEED] = 100,
    _a[objectField.UNIT_FIELD_ATTACK] = 4,
    _a[objectField.UNIT_FIELD_DEFENCE] = 4,
    _a[objectField.UNIT_FIELD_HITRATE] = 5,
    _a[objectField.UNIT_FIELD_DODGE] = 5,
    _a[objectField.UNIT_FIELD_CRITICAL] = 5,
    _a[objectField.UNIT_FIELD_CRITICAL_DEC] = 5,
    _a[objectField.UNIT_FIELD_DEF_THR] = 10,
    _a[objectField.UNIT_FIELD_DEF_THR_DEC] = 10,
    _a);
// 战斗系数加成
//fightReviseOptions =
//{
//	maxHPRate : 3001, //基础血量百分比加成
//}
//五行属性( 1雷 2火 3水 4土）
//elementOptions = 
//{
//	NONE    : 0,
//	THUNDER : 1,
//	FIRE    : 2,
//	WATER   : 3,
//	EARTH   : 4,
//}
//新手默认数值
var ConfigPlayerDefault = {
    NEWBIE_LEVEL: 1,
    NEWBIE_POWER: 0,
    NEWBIE_TASK: 1005,
    NEWBIE_HERO: 18000,
    //NEWBIE_BODY                 : 18000,      // 默认外观
    //NEWBIE_AMBASSADOR_LEVEL     : 0,          // 默认邀请大使等级
    NEWBIE_FUNDS: 5000,
    //NEWBIE_MAGIC_STONE_ENERGY   : 50,         // 魔导石初始能量
    //NEWBIE_EQUIP_EVENT_CAMPAGIN : 1010,       // 新手装备事件触发关卡Id
    ENHANCE_COUNT: 4,
    NEWBIE_FAIRY: 50000,
    NEWBIE_WING: 30000,
    FRESH_TASK: 9 * 24 * 3600,
    NEWBIE_VOCATION: 40000,
    NEWBIE_TASTE_VOCATION: 40003,
    NEWBIEPRIZE: {},
    PET_EVENT: [18000, 16, 2],
    PET_SELECT_ID: 1,
    PET_SELECT_TYPE: 2,
    PLR_SELECT_ID: 1,
    PLR_SELECT_TYPE: 2,
    NEWBIE_KISS_NUM: 1,
    NEW_SUMMON_STONE_CAMPAGIN: 1036,
    NEW_SUMMON_STONE_SIGNE: 2,
    NEW_SUMMON_ENTRYID: 18002,
    NEW_ADVANCE_ENTRYID: 18008,
    NEW_PLR_FEEL_VALUE: 14,
};
//新手默认数据
var noviciateDefalultValue = {
    PETID: 18000,
    INTIMATE_EVENTID: 85,
    CONVERSATION_FIRST: 2006,
    CONVERSATION_SECOND: 2005,
    INTIMATE_VALUE: 5,
    INVITEMATE_ANIMATION: 2006,
    COMMON_CONVERSATION: 2000,
};
// 全局数据key
var globalDataKey = {
    ServerFirstKill: 1,
    LifeNpc: 2,
    Campaign: 3,
    ServerJJCRank: 4,
    ServerSkyTower: 5,
    UniqueId: 6,
    WuDouApply: 7,
    WuDouRank: 8,
    WuDouViedo: 9,
    ServerFactionMap: 10,
    CampaignVideo: 11,
    ZhenXing: 12,
    StartTime: 15,
    FactionWarApply: 16,
    FactionWarScore: 17,
    FactionWarMatch: 18,
    FactionWarRank: 19,
    Union: 20,
    WuDouTeamApply: 21,
    WuDouTeamRank: 22,
    WuDouTeamViedo: 23,
    FestivalData: 24,
    ServerDeadField: 25,
    MergeTime: 26,
    PetAdvanceExRecord: 27,
    ServerDeadFieldPersonal: 28,
    WordBossTime: 29,
    WordBossLevel: 30,
    unionPVPMatch: 31,
    unionPVPVideo: 32,
    unionPVPFinal: 33,
    auctionRecord: 34,
    charmNpcData: 35,
    CharmResetTime: 36,
    ItemTrade: 50,
    TowerDayRank: 70,
    TowerWeekRank: 80,
    BlackMarket: 90,
    FactionWarEndTime: 91,
    UnionMatrix: 92,
    UnionMatrixOpenList: 93,
    UnionMatrixRankList: 94,
    MonsterSiegeLevel: 95,
    RideAdvanceExRecord: 97,
    AllStartAutoFeedPlayer: 98,
    LastAllServerMessage: 99,
    firstFacForPoint: 100,
};
// 配置key
//configDataKey =
//{
//	rechargeBeginTime : 1,    //充值活动开始时间
//	rechargeEndTime   :	2,    //充值活动结束时间
//	activeEndTime     :	100,  //新服活动结束时间
//}
// 星期*
//opWeek =
//{
//	Sunday    : 1,
//	Monday    : 2,
//	Tuesday   : 3,
//	Wednesday : 4,
//	Thursday  : 5,
//	Friday    : 6,
//	Saturday  : 7,
//}
var opTime = {
    Hour: 3600,
    Day: 86400,
    Week: 604800,
    Month: 2592000,
};
// 货币单位
var opMoneyUnit = {
    funds: 1,
    bindgold: 2,
    gold: 3,
};
//server unit to gmt unit
//server 1元宝 2竞技积分 3灵石 6头目积分 7礼券
//gmt 1元宝；2战绩；3竞技积分；4灵石；5礼券
//opSwitchUnit = 
//{
//	[1] : 1,
//	[2] : 3,
//	[3] : 4,
//	[6] : 2,
//	[7] : 5 
//}
//consumeType = 
//{
//	IB_ITEM      : 1,
//	IB_SHOW      : 2,
//	FACTION_GOLD : 3,
//	MALL         : 4,
//	LOGOUT_EXP   : 5, //高效离线补偿消耗的元宝
//}
//opRegionNotice =
//{
//	NOTICE_FCM : 1,  // 防沉迷信息
//}
//opHealthDefine =
//{
//	HEALTH_GOOD : 0,		// 健康
//	HEALTH_TIRE : 1,		// 疲劳,收益减半
//	HEALTH_BAD  : 2,		// 瘫痪,无收益
//}
//
//opHealthTime =
//{
//	HEALTH_TIRE : 10800,	// 疲劳时间(s)
//	HEALTH_BAD	: 18000,	// 瘫痪时间(s)
//}
//获得金钱类型
//opMoneyType = 
//{
//	OTHER    : 1, //其他
//	TASK     : 2, //任务
//	FUBEN    : 3, //副本
//	ACTIVITY : 4, //活动
//	RECYCLE  : 5, //装备回收
//}
//////////////////- 擂台配置 ////////////////////////////
//opLeiTai = 
//{
//	mapId : 50006,
//	reliveX : 497,
//	reliveY : 275,
//	updateInterval : 1, // 队伍列表刷新间隔
// rect:any : {
//		{x:505, y:263},
//		{x:539, y:247},
//		{x:563, y:260},
//		{x:530, y:278},
//	},
//}
//日常活动索引
//opDailyIndex = 
//{
//	One 			: 1,		//日常一: 女王刀锋
//	Two				: 2,		//日常二: 女王叛乱
//	Three			: 3,		//日常三: 试炼之路
//	Four			: 4,		//日常四:	骑士学院
//	Five			: 5,		//日常五:	竞技场
//	Six				: 6,		//日常六:	天空之塔
//}
//竞技场配置
var ChampionConfig = {
    OpenLevel: 0,
    clearRmb: 10,
    increaseRmb: 5,
    totalTimes: 10,
    fightInterval: 300,
    prizeTimes: 10,
    calcPrizeTime: 23,
};
//日常配置
//战斗队列
var BattleQueueType = {
    Campaign: 1,
    //Champion         : 2,   //竞技场进攻阵型
    ChampionDefence: 3,
    //DailyOne         : 4,   //迷雾
    //DailyThree       : 5,   //死亡领域
    //DailyFour        : 6,   //终极境地
    DailySix: 7,
};
//不能上阵雇佣的队列
var opCannotEmployBattleQueueType = (_b = {},
    //[BattleQueueType.Champion]            : 1,
    _b[BattleQueueType.Campaign] = 2,
    _b[BattleQueueType.ChampionDefence] = 3,
    _b);
//不可以上阵超过三个的队列
var opCannotMultFighterBattleQueueType = {};
//日常起始楼层
//opTowerBeginFloor = 
//{
//	[opDailyIndex.One]   : 1,
//	[opDailyIndex.Two]   : 1,
//	[opDailyIndex.Three] : 1,
//	[opDailyIndex.Four]  : 1,
//	[opDailyIndex.Six]   : 1,
//}
//////////////////////-邮件配置//////////////////////-
var opEmailStatus = {
    UnReadNoGet: 5,
    ReadedNoGet: 6,
    ReadedGot: 7,
};
//邮件标题
var opEmailTitle = {
    NORMAL: 1,
    SYSTEM_NOTICE: 2,
    SYSTEM_GIFT: 3,
    PACKET_FULL: 4,
};
//邮件类型
var opEmailType = {
    NORMAL: 1,
    SYSTEM_NOTICE: 2,
    SYSTEM_ANNEX: 3,
    SYSTEM_EVENT: 4,
    SYSTEM_ANNEX_EX: 5,
};
var opSendEmailType = {
    GAME: 1,
    PHP: 2,
};
////////////////////////////////////////////////////-
//公共地图
//let publicMaps:any = {defaultValue.DEFAULT_MAP2}
//向组内发送事件通知
//opGroupEvent = 
//{
//	FACTION_MAP_CREATE     : 1,	 // 帮派副本开启
//	FACTION_MAP_BOSS       : 2,	 // 帮派boss死亡(副本关闭)
//	FACTION_PVE_OPEN       : 3,  // 帮派pve开启(开启副本)
//	FACTION_PVE_CLOSE      : 4,  // 帮派pve关闭(23:59关闭)
//	FACTION_PVE_BOSS_OPEN  : 5,  // 帮派pveboss开启(boss开启)
//	FACTION_PVE_BOSS_CLOSE : 6,  // 帮派pveboss关闭(boss关闭)
//}
//购买金币的配置
var opBuyFundsLevelConfig = [
    [1, 9, 11314],
    [10, 19, 14483],
    [20, 29, 18539],
    [30, 39, 23732],
    [40, 49, 30379],
    [50, 59, 38888],
    [60, 99, 49780],
];
//查询角色信息
var opSelectPlayerInfo = {
    PlayerInfo: 1,
    BattleTypeInfo: 2,
    FairyInfo: 3,
    WingInfo: 4,
    RideInfo: 5,
};
//查询雇佣列表
var opSelectEmployList = {
    systemList: 1,
    playerList: 2,
    factionList: 3,
};
//替补配置
var opReserveLineUpConfig = {
    defaultLine: [0, 0],
    count: 2,
    level: 60,
};
//战阵配置
var opWarFormationConfig = {
    openLevel: 70,
    minLevel: 0,
    maxLevel: 5,
};
//参于战斗的人数
var opVipFighterNum = (_c = {},
    _c[0] = 9,
    _c[1] = 9,
    _c[2] = 9,
    _c[3] = 9,
    _c[4] = 9,
    _c[5] = 9,
    _c[6] = 9,
    _c[7] = 9,
    _c[8] = 9,
    _c[9] = 9,
    _c[10] = 9,
    _c[11] = 9,
    _c[12] = 9,
    _c[13] = 9,
    _c[14] = 9,
    _c[15] = 9,
    _c[16] = 9,
    _c);
//情报系统不记录的角色
var opDoNotRecordActor = (_d = {},
    _d[40004] = 1,
    _d[40000] = 1,
    _d[18008] = 1,
    _d);
var _a, _b, _c, _d;
//# sourceMappingURL=options.js.map