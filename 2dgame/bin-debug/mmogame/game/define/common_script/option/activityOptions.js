ImportType(opItemSuperType);
////////////////////////////////////////////////////////////////////////////////////////////
//西游活动配置
// 默认数值
var defaultValue = {
    DEFAULT_MAP: 1,
    DEFAULT_MAP2: 50001,
    DEFAULT_PET_BAG: 999,
    PACKET_SIZE: 200,
    PACKET_MAX_SIZE: 600,
    PACKET_UPSTEP_GOLD: 50,
    PACKET_UPSTEP_SIZE: 5,
    PACKET_PAGE_SIZE: (_a = {},
        _a[opItemSuperType.ITEM_SUPER_TYPE_EQUIP] = 170,
        //[opItemSuperType.ITEM_SUPER_TYPE_MATERIAL]    : 50,         // 素材背包
        //[opItemSuperType.ITEM_SUPER_TYPE_SOUL]        : 20,         // 英魂背包
        _a[opItemSuperType.ITEM_SUPER_TYPE_GOODS] = 200,
        _a[opItemSuperType.ITEM_SUPER_TYPE_MAGIC_STONE] = 100,
        _a[opItemSuperType.ITEM_SUPER_TYPE_ACTIVE_ITEM] = 30,
        _a[opItemSuperType.ITEM_SUPER_TYPE_EQUIP_STONE] = 100,
        _a),
    MAX_POWER: 5000,
    WAREHOUSE_SIZE: 40,
    WAREHOUSE_MAX: 200,
    WAREHOUSE_PET_SIZE: 5,
    WAREHOUSE_PET_MAX: 10,
    WORLD_MESSAGE_COUNT: 30,
    DEFAULT_EXPANSION: 10000,
    DEFAULT_FACTION_COUNT: 300,
    DEFAULT_FACTION_APPLY: 500,
    DEFALUT_VIP_LEVEL: 0,
    DEFALUT_VIP_MAX_LEVEL: 13,
    DEFALUT_EMAIL_MAX: 100,
    NEW_PET_RECRUIT: 18007,
    DEFALUT_CAMPAIGN_WIP: 0,
    SACRIFICE_MAX_LEVEL: 10,
    DAILY_POWER: 80,
    CHAT_RECORD_COUNT: 20,
    MAX_TOTALL_BIND_CURRENCY: 120000,
    FORCE_EXPRESS_VALUE: 500,
    CHAMPION_CHALLENGE_COUNT: 5,
    CLUB_FUBEN_HELP_COUNT: 5,
    CLUB_FUBEN_FIGHT_COUNT: 5,
};
//活动类型
var OrdinaryActivityType = {
    EVERYDAY: 1,
    LIMITTIME: 2,
};
//普通活动索引
var OrdinaryActivityIndex = {
    NULL: 0,
    //RUQIN               : 1,     //帮会入侵
    HUSONG: 2,
    DATI: 3,
    ZHENGBA: 4,
    MENGZHU: 5,
    ZhongKuiDemon: 6,
    PersonBoss: 7,
    WorldPlayerBoss: 8,
    WildBoss: 9,
    LifeAndDeathBoss: 10,
    MaterialBoss: 11,
    DragonBoss: 12,
    SmallThunderTemple: 13,
    HeavenTrial: 14,
    AutoFightMonster: 15,
    Champion: 16,
    FactInstZones: 17,
    Campaign: 18,
    CrossTeam: 19,
    CapturePet: 20,
    XiyouLilian: 21,
    FactionMonster: 22,
    ServerTeam: 23,
};
//单人活动对应的单人空间
var opActivityIndexToSingleSpace = {};
//冲值相关活动索引
var PayActivityIndex = {
    //TEST : 0,//空的，测试用
    FIRST_PAY: 1,
    CREATE_ROLE_SEVEN_DAY: 2,
    SINGLE_PAY_PRIZE: 3,
    SINGLE_CONSUME_PRIZE: 4,
    LIMIT_SINGLE_DAY_PAY_PRIZE: 5,
    LIMIT_SINGLE_DAY_CONSUME_PRIZE: 6,
    DAY_ACCUM_PAY_PRIZE: 7,
    DAY_ACCUM_CONSUME_PRIZE: 8,
    ACCUM_PAY_PRIZE: 9,
    ACCUM_CONSUME_PRIZE: 10,
    QUDAO_PAY_RETURN: 11,
    ALL_PAY_RETURN: 12,
    MULTI_PAY_RETURN: 13,
    GAME_PAY_RANK_PRIZE: 14,
    GAME_CONSUME_RANK_PRIZE: 15,
    SERVERS_PAY_RANK_PRIZE: 16,
    SERVERS_CONSUME_RANK_PRIZE: 17,
    SHOP_DISCOUNT: 18,
    PET_LOTTERY: 19,
    PAY_SIGNED_ON: 20,
    PET_LOTTERY_A: 21,
    //AccuBuyRecharge : 22, //累充购买
    LEVEL_FUNDS: 23,
    INVEST_PLAN: 24,
    DAILY_LOGIN: 25,
    STAGE_UP: 26,
    DAILY_EXPENSIVE_GIFT: 27,
};
//冲值活动的名字
var PayActivityName = (_b = {},
    _b[PayActivityIndex.FIRST_PAY] = "FirstPay",
    _b[PayActivityIndex.CREATE_ROLE_SEVEN_DAY] = "SevenDay",
    _b[PayActivityIndex.SINGLE_PAY_PRIZE] = "SinglePay",
    _b[PayActivityIndex.SINGLE_CONSUME_PRIZE] = "SingleConsume",
    _b[PayActivityIndex.LIMIT_SINGLE_DAY_PAY_PRIZE] = "LimitDayPay",
    _b[PayActivityIndex.LIMIT_SINGLE_DAY_CONSUME_PRIZE] = "LimitDayConsume",
    _b[PayActivityIndex.DAY_ACCUM_PAY_PRIZE] = "DayAccumPay",
    _b[PayActivityIndex.DAY_ACCUM_CONSUME_PRIZE] = "DayAccumConsume",
    _b[PayActivityIndex.ACCUM_PAY_PRIZE] = "AccumPay",
    _b[PayActivityIndex.ACCUM_CONSUME_PRIZE] = "AccumConsume",
    _b[PayActivityIndex.QUDAO_PAY_RETURN] = "QudaoPayReturn",
    _b[PayActivityIndex.ALL_PAY_RETURN] = "AllPayReturn",
    _b[PayActivityIndex.MULTI_PAY_RETURN] = "MultiPay",
    _b[PayActivityIndex.GAME_PAY_RANK_PRIZE] = "GamePayRank",
    _b[PayActivityIndex.GAME_CONSUME_RANK_PRIZE] = "GameConsumeRank",
    _b[PayActivityIndex.SERVERS_PAY_RANK_PRIZE] = "ServersPayRank",
    _b[PayActivityIndex.SERVERS_CONSUME_RANK_PRIZE] = "ServersConsumeRank",
    _b[PayActivityIndex.SHOP_DISCOUNT] = "ShopDiscount",
    _b[PayActivityIndex.PET_LOTTERY] = "PetLottery",
    _b[PayActivityIndex.PAY_SIGNED_ON] = "PaySignedOn",
    _b[PayActivityIndex.PET_LOTTERY_A] = "PetLotteryA",
    //[PayActivityIndex.AccuBuyRecharge] : "AccuBuyRecharge",//累充购买
    _b[PayActivityIndex.LEVEL_FUNDS] = "LEVEL_FUNDS",
    _b[PayActivityIndex.INVEST_PLAN] = "INVEST_PLAN",
    _b[PayActivityIndex.DAILY_LOGIN] = "DAILY_LOGIN",
    _b[PayActivityIndex.STAGE_UP] = "STAGE_UP",
    _b);
//处理类型
var PayActivityHandleType = {
    Recharge: 1,
    Consume: 2,
};
//发送奖励方式
var PayActivitySendType = {
    SendRequest: 1,
    SendAtOnce: 2,
    SendAtFinish: 3,
};
//奖励类型
var PayActivityPrizeType = {
    ItemList: 1,
    Diamond: 2,
    Funds: 3,
    RatioDiamod: 4,
};
//生存类型
var PayActivityLiveType = {
    Timing: 1,
    Always: 2,
};
//请求奖励类型 
var PayActivityRequestType = {
    One: 1,
    Much: 2,
};
//冲值活动模板类//
var PayActivityClassType = {
    AccumulativePrize: 1,
    DaySinglePrize: 2,
    DaySoonPrize: 3,
    LimitDaySinglePrize: 4,
    LimitDaySinglePrizeBorn: 5,
    PayRankPrize: 6,
};
////活动分类
//PayActivityGroupType = {
//	PayThenReqPrize : 1, //冲值或消费达到一定的条件，可以激活奖励，需要手工领取+//	PayRankFinishPrize : 2,//冲值或消费排行，活动结束后邮件发送奖励//
//	PayFeedback : 3,//冲值或消费后马上反馈奖励 //
//}
//冲值活动删掉类型//
var PayActivityRemoveType = {
    AtOnce: 1,
    Minu10: 2,
    Minu30: 3,
    Hour1: 4,
    Hour2: 5,
    Hour4: 6,
    Hour8: 7,
    Hour12: 8,
    Day1: 9,
    Day2: 10,
    Day3: 11,
    Day4: 12,
};
var PayActivityRemoveTime = [
    0,
    600,
    1800,
    3600,
    7200,
    14400,
    28800,
    43200,
    86400,
    172800,
    259200,
    345600,
];
//冲值活动类型定义
var PayActivityTypeDefine = (_c = {},
    _c[PayActivityIndex.CREATE_ROLE_SEVEN_DAY] = (_d = {},
        _d['handle'] = PayActivityHandleType.Recharge,
        _d['send'] = PayActivitySendType.SendRequest,
        _d['prize'] = PayActivityPrizeType.ItemList,
        _d['live'] = PayActivityLiveType.Always,
        _d['request'] = PayActivityRequestType.One,
        _d),
    _c[PayActivityIndex.SINGLE_PAY_PRIZE] = (_e = {},
        _e['handle'] = PayActivityHandleType.Recharge,
        _e['send'] = PayActivitySendType.SendRequest,
        _e['prize'] = PayActivityPrizeType.ItemList,
        _e['live'] = PayActivityLiveType.Timing,
        _e['request'] = PayActivityRequestType.Much,
        _e),
    _c[PayActivityIndex.SINGLE_CONSUME_PRIZE] = (_f = {},
        _f['handle'] = PayActivityHandleType.Consume,
        _f['send'] = PayActivitySendType.SendRequest,
        _f['prize'] = PayActivityPrizeType.ItemList,
        _f['live'] = PayActivityLiveType.Timing,
        _f['request'] = PayActivityRequestType.Much,
        _f),
    _c[PayActivityIndex.LIMIT_SINGLE_DAY_PAY_PRIZE] = (_g = {},
        _g['handle'] = PayActivityHandleType.Recharge,
        _g['send'] = PayActivitySendType.SendRequest,
        _g['prize'] = PayActivityPrizeType.ItemList,
        _g['live'] = PayActivityLiveType.Timing,
        _g['request'] = PayActivityRequestType.One,
        _g),
    _c[PayActivityIndex.LIMIT_SINGLE_DAY_CONSUME_PRIZE] = (_h = {},
        _h['handle'] = PayActivityHandleType.Consume,
        _h['send'] = PayActivitySendType.SendRequest,
        _h['prize'] = PayActivityPrizeType.ItemList,
        _h['live'] = PayActivityLiveType.Timing,
        _h['request'] = PayActivityRequestType.One,
        _h),
    _c[PayActivityIndex.DAY_ACCUM_PAY_PRIZE] = (_j = {},
        _j['handle'] = PayActivityHandleType.Recharge,
        _j['send'] = PayActivitySendType.SendRequest,
        _j['prize'] = PayActivityPrizeType.ItemList,
        _j['live'] = PayActivityLiveType.Timing,
        _j['request'] = PayActivityRequestType.One,
        _j),
    _c[PayActivityIndex.DAY_ACCUM_CONSUME_PRIZE] = (_k = {},
        _k['handle'] = PayActivityHandleType.Consume,
        _k['send'] = PayActivitySendType.SendRequest,
        _k['prize'] = PayActivityPrizeType.ItemList,
        _k['live'] = PayActivityLiveType.Timing,
        _k['request'] = PayActivityRequestType.One,
        _k),
    _c[PayActivityIndex.ACCUM_PAY_PRIZE] = (_l = {},
        _l['handle'] = PayActivityHandleType.Recharge,
        _l['send'] = PayActivitySendType.SendRequest,
        _l['prize'] = PayActivityPrizeType.ItemList,
        _l['live'] = PayActivityLiveType.Timing,
        _l['request'] = PayActivityRequestType.One,
        _l),
    _c[PayActivityIndex.ACCUM_CONSUME_PRIZE] = (_m = {},
        _m['handle'] = PayActivityHandleType.Consume,
        _m['send'] = PayActivitySendType.SendRequest,
        _m['prize'] = PayActivityPrizeType.ItemList,
        _m['live'] = PayActivityLiveType.Timing,
        _m['request'] = PayActivityRequestType.One,
        _m),
    _c[PayActivityIndex.QUDAO_PAY_RETURN] = (_o = {},
        _o['handle'] = PayActivityHandleType.Recharge,
        _o['send'] = PayActivitySendType.SendAtOnce,
        _o['prize'] = PayActivityPrizeType.Diamond,
        _o['live'] = PayActivityLiveType.Always,
        _o['request'] = PayActivityRequestType.Much,
        _o),
    _c[PayActivityIndex.ALL_PAY_RETURN] = (_p = {},
        _p['handle'] = PayActivityHandleType.Recharge,
        _p['send'] = PayActivitySendType.SendAtOnce,
        _p['prize'] = PayActivityPrizeType.Diamond,
        _p['live'] = PayActivityLiveType.Always,
        _p['request'] = PayActivityRequestType.Much,
        _p),
    _c[PayActivityIndex.MULTI_PAY_RETURN] = (_q = {},
        _q['handle'] = PayActivityHandleType.Recharge,
        _q['send'] = PayActivitySendType.SendAtOnce,
        _q['prize'] = PayActivityPrizeType.RatioDiamod,
        _q['live'] = PayActivityLiveType.Timing,
        _q['request'] = PayActivityRequestType.Much,
        _q),
    _c[PayActivityIndex.GAME_PAY_RANK_PRIZE] = (_r = {},
        _r['handle'] = PayActivityHandleType.Recharge,
        _r['send'] = PayActivitySendType.SendAtFinish,
        _r['prize'] = PayActivityPrizeType.ItemList,
        _r['live'] = PayActivityLiveType.Timing,
        _r['request'] = PayActivityRequestType.One,
        _r['final'] = PayActivityRemoveType.Day1,
        _r),
    _c[PayActivityIndex.GAME_CONSUME_RANK_PRIZE] = (_s = {},
        _s['handle'] = PayActivityHandleType.Consume,
        _s['send'] = PayActivitySendType.SendAtFinish,
        _s['prize'] = PayActivityPrizeType.ItemList,
        _s['live'] = PayActivityLiveType.Timing,
        _s['request'] = PayActivityRequestType.One,
        _s['final'] = PayActivityRemoveType.Day1,
        _s),
    _c[PayActivityIndex.SERVERS_PAY_RANK_PRIZE] = (_t = {},
        _t['handle'] = PayActivityHandleType.Recharge,
        _t['send'] = PayActivitySendType.SendAtFinish,
        _t['prize'] = PayActivityPrizeType.ItemList,
        _t['live'] = PayActivityLiveType.Timing,
        _t['request'] = PayActivityRequestType.One,
        _t['final'] = PayActivityRemoveType.Day1,
        _t),
    _c[PayActivityIndex.SERVERS_CONSUME_RANK_PRIZE] = (_u = {},
        _u['handle'] = PayActivityHandleType.Consume,
        _u['send'] = PayActivitySendType.SendAtFinish,
        _u['prize'] = PayActivityPrizeType.ItemList,
        _u['live'] = PayActivityLiveType.Timing,
        _u['request'] = PayActivityRequestType.One,
        _u['final'] = PayActivityRemoveType.Day1,
        _u),
    _c);
var PayActivityNameToId = {};
for (var index in PayActivityName) {
    var name_1 = PayActivityName[index];
    PayActivityNameToId[name_1] = index;
}
//boss活动索引
var opActivityIndexToName = (_v = {},
    _v[OrdinaryActivityIndex.ZhongKuiDemon] = "ZhongKui",
    _v[OrdinaryActivityIndex.PersonBoss] = "PersonBoss",
    _v[OrdinaryActivityIndex.WorldPlayerBoss] = "WorldBoss",
    _v[OrdinaryActivityIndex.WildBoss] = "WildBoss",
    _v[OrdinaryActivityIndex.LifeAndDeathBoss] = "LifeDeath",
    _v[OrdinaryActivityIndex.MaterialBoss] = "Material",
    _v[OrdinaryActivityIndex.DragonBoss] = "Dragon",
    _v[OrdinaryActivityIndex.SmallThunderTemple] = "SmallThunder",
    _v[OrdinaryActivityIndex.HeavenTrial] = "Heaven",
    _v[OrdinaryActivityIndex.AutoFightMonster] = "Auto",
    _v[OrdinaryActivityIndex.HUSONG] = "escort",
    _v);
var opBossActivityConfig = (_w = {},
    _w[OrdinaryActivityIndex.ZhongKuiDemon] = {
        sweepLevel: 4,
        killCount: 10,
        stagePrize: [["item", 30001, 10], ["item", 30002, 10], ["rmb", 10], ["bindRmb", 100]],
    },
    //[OrdinaryActivityIndex.DragonBoss] = 
    //{
    // starPrize:any : {[6]:{{30001,2},{30002,2}},[12]={{30001,2},{30002,2}},[18]={{30001,2},{30002,2}}}, //累积星奖励
    //	sweepVipLevel = 4,       //一键挖宝需要vip等级
    // starConfig:any = {{1,4,3},{5,7,2},{8,10,1}}
    //},
    _w[OrdinaryActivityIndex.WildBoss] = {
        existStatus: 1,
        runStatus: 2,
        killStatus: 3,
        runTime: 25 * 60,
    },
    _w);
var opDragonBossBaseConfig = {
    sweepVipLevel: 4,
    starConfig: [[1, 4, 3], [5, 7, 2], [8, 10, 1]]
};
//龙王宝藏配置
var opDragonBossIndexConfig = {
    getPrize: 0x1,
    oneStar: 0x2,
    twoStar: 0x4,
    threeStar: 0x8,
};
//龙王宝藏配置
var opDragonBossChapterConfig = {
    sixStar: 0x1,
    twelve: 0x2,
    eighteen: 0x4,
};
//西游护送
var opEscort = {
    scortMaxCount: 3,
    robberMaxCount: 5,
    lastTime: 15 * 60,
    normalRand: 50,
    specialRand: 480,
};
//限时活动（投资，基金...）
var opLimitTimeActive = {
    levelFunds: 20000,
    investPlan: 8888,
    investPlanDay: 9,
    stageUpNeedMoney: 1000,
    stageUpSpecialDay: 8,
    stageUpNormalDay: 10,
};
//限时活动（投资，基金...）
var dailyPrizeType = {
    accumulateLogin: 100,
    dailyLogin: 101,
    vipLogin: 102,
    rechangeLogin: 103,
};
////////////////////////////////////////////////////////////////////////////////
//废弃部分
//混沌时空
var configRobber = {
    mapId: 50014,
    bestPlayerCount: 10,
    maxPlayerCount: 200,
    transferX: 22,
    transferY: 37,
    plrLevel: 1,
    power: 1,
    //ticketNpcEntry : 40003, //挑战令牌npcId
    //bossBoxEntry : 22002,   //boss宝箱
    bossBoxCount: 10,
    bossBoxLife: 10 * 60,
    bossBoxLib: 222,
    copyMapEffect: [[1, 15, 100], [16, 30, 95], [31, 60, 80], [61, 100, 60]],
    shapeshiftingId: 40000049,
    powerCalcInterval: 10,
    regionId: 50014,
    layer: 1,
    minFightTime: 6,
    maxFightTime: 15,
    reviseTime: 2,
    eliteKillCount: 3,
    hangStatus: 1,
    leisure: 0,
    protectLevel: 10,
    prizeRatio: (_x = {},
        _x[opStatusType.STATUS_TYPE_BAOTU] = 0.5,
        _x[opStatusType.STATUS_TYPE_MOTOU] = 0.25,
        _x),
    //
    refreshPowder: 10,
    lotteryPowder: 30,
    lotteryDiscount: 1,
    refreshFreeCount: 0,
    maxOfflineHangTime: 8 * 60 * 60,
    monthCardRatio: 0.2,
    offlineBaseRatio: 0.5,
    minRemainPower: 100,
};
//圣地返回码
var opRobberErrorConfig = {
    PUNISH_TIME: -1,
    SUCCESS: 0,
    NO_IN_ACTIVE: 1,
    ACTIVITY_NOT_ACTIVE: 2,
    NO_ROOM: 3,
    ROOM_COUNT_LIMIT: 4,
    PLAYER_LEVEL_LIMIT: 5,
    IN_VIRTUAL_COMBAT: 6,
};
//祷告
var opAttendanceConfig = {
    noAttendance: 1,
    noReward: 2,
    rewarded: 3,
};
//每日抽奖
var opFateLottery = {
    //命运占卜
    LotteryCount: 3,
    LotteryConsumeGold: 50,
    //装备抽奖
    equipLotteryCount: 5,
    timeLotteryGold: 10,
    equipLotteryGold: 30,
    LegendEquipCount: 10,
    equipLotteryTime: 600,
    equipDisCount: 0.9,
};
//装备抽奖类型
var opLotteryEquipType = {
    Once: 1,
    Times: 2,
};
//通过等级范围获取二级索引
//{minLevel, maxLevel, index}
//opLotteryEquipLevelToIndex = 
//{
//	[1] : {1,  10, 1},
//	[2] = {11, 20, 2},
//	[3] = {21, 30, 3},
//	[4] = {31, 40, 4},
//	[5] = {41, 50, 5},
//	[6] = {51, 61, 6},
//}
//世界boss
var ConfigWorldBoss = {
    //beginHour : 12,//多少点开始
    //beginMinute : 0,//多少分开始
    //endHour : 12,//多少点结束
    //endMinute : 30,//多少分结束
    delayTime: 20 * 60,
    mapId: 50033,
    transferX: 19,
    transferY: 44,
    playerCount: 30,
    levelLimit: 1,
    boxInterval: 600,
    boxCount: 20,
    boxNpcEntry: 22001,
    maxPickCount: 5,
    bossNpcId: 22000,
    bossPosX: 70,
    bossPosY: 25,
    bossEntryId: 81084042,
    bossFightPos: 15,
    //bossAttack : 99999999, //boss攻击
    //spellAttack : 99999999, //boss攻击
    //bossDefence : 4000, //护甲
    //inspireRmb : 5,  //鼓舞元宝
    deadwaitRmb: 5,
    //bossHp 		: 2000000000,//boss血量
    //bossMaxHP   : 100000000000,
    bossLiveMinTime: 10 * 60,
    addLevelInterval: 15 * 60,
    addBossHpPerLevel: 0.25,
    maxLevel: 50,
    //timeInterval :    //魔龙死亡时间对应血量增长百分比
    //{
    //	{0*60,  15*60, 0.2},
    //},
    maxPickBoxCount: 3,
    maxFightCount: 40,
};
//世界boss鼓舞[level]=钻石
var opWorldBossInspireRmb = (_y = {},
    _y[1] = 20,
    _y[2] = 40,
    _y[3] = 60,
    _y[4] = 80,
    _y[5] = 100,
    _y);
var ConfigMonsterSiege = {
    mapId: 50074,
    transferX: 17,
    transferY: 33,
    playerCount: 30,
    levelLimit: 1,
    buffNpcInterval: 300,
    buffNpcCount: 10,
    buffNpcEntry: 12001,
    bossPosX: 181,
    bossPosY: 33,
    bossFightPos: 2,
    inspireRmb: 10,
    inspaireTimes: 10,
    deadwaitRmb: 10,
    maxRound: 5,
    roundTime: 360,
    bossMoveInterval: 60,
    bossCreateInterval: 30,
    bossKillRewardCount: 5,
};
var opMonsterInspaireRmb = (_z = {},
    _z[1] = 20,
    _z[2] = 40,
    _z[3] = 60,
    _z[4] = 80,
    _z[5] = 80,
    _z[6] = 80,
    _z[7] = 80,
    _z[8] = 80,
    _z[9] = 80,
    _z[10] = 80,
    _z);
//天空之塔复活晶石
var opSkyTowerReviveGold = (_0 = {},
    _0[1] = 10,
    _0[2] = 20,
    _0[3] = 30,
    _0);
var opSkyTowerConfig = {
    maxReviveCount: 50,
    maxReviveGold: 50,
    maxFloor: 100,
};
//答题配置
//答题配置
var ConfigWorldQuestion = {
    mapId: 50035,
    levelLimit: 0,
    playerCount: 50,
    npcId: 50000,
    npcPos: { x: 20, y: 20 },
    enterPos: { x: 18, y: 24 },
    questionCount: 30,
    questionInterval: 23,
    followCount: 2,
    doubleCount: 2,
};
//////////////////////////////-
//遗迹探索
var opRelicExploreConfig = {
    MaxMinesCount: 270,
    RegionCount: 45,
    FightCount: 3,
    robCount: 3,
    prizeRobCount: 3,
    GiftsLastTime: 900,
    GiftsGenerateMin: 7200,
    GiftsGenerateMax: 18000,
    MaxGiftsCount: 5,
    BuyRobRmb: 30,
};
//矿洞子类型
var opRelicMineType = {
    Small: 1,
    Middle: 2,
    Big: 3,
};
//矿洞结算方式
var opRelicMineClearType = {
    Evicted: 1,
    Leave: 2,
    Auto: 3,
};
//矿洞产出类型
var opRelicMineProduceType = {
    //非防守
    Funds: 1,
    PetSoul: 2,
    //防守
    DefFunds: 4,
    DefPetSoul: 5,
};
//矿洞是否可以保护(1可以0不可以)
var opRelicMineTypeProtect = (_1 = {},
    _1[opRelicMineType.Small] = 1,
    _1[opRelicMineType.Middle] = 0,
    _1[opRelicMineType.Big] = 0,
    _1);
//产出系数配置
//opRelicMineProduceRatio = 
//{
//	timeRatioConfig				:								//时间段
//	{
//		[1]		: 0.134,
//		[2]		: 0.268,
//		[3]		: 0.402,
//		[4]		: 0.536,
//		[5]		: 0.670,
//		[6]		: 0.804,
//		[7]		: 0.804,
//		[8]		: 0.804,
//		[9]		: 0.804,
//		[10]		: 0.804,
//		[6]		: 0.804,
//		[6]		: 0.804,
//	}, 							
//	decayTimeRatioConfig  	= 								//随时间衰减攻击力
//	{
//		[1]		: 0,
//		[2]		: 0,
//		[3]		: 0.05,
//		[4]		: 0.10,
//		[5]		: 0.20,
//		[6]		: 0.30,
//	},
//}
//opRelicMineProduceItemType = 
//{
//	[1] : {30001, 30002, 30003, 30004},
//}
//矿洞列表类型
//opRelicMineListPT = 
//{
//	Funds         : 1, //金币
//	PetSoul       : 2, //伙伴经验
//}
//////////////////////////////////////-
//快速招募
var opQuickRecruitConfig = {
    RecruitHoopFreeCount: 3,
    RecruitBateFreeCount: 1,
    WipeCount: 10,
    WipeNeedRmb: 450,
    SingleNeedRmb: 50,
    RefreshRmb: 50,
    WipeCountEx: 120,
    WipeNeedRmbEx: 4800,
    Soul: 0,
    LotteryCount: 1,
};
//快速招募类型
var opQuickRecruitPrizeType = {
    Item: 0,
    Pet: 1,
    Soul: 2,
};
//全服/组内 事件通知
//用于组内红点提示
//改变活动阶段状态
//全服特殊事件 如:结婚 主城非忙碌玩家表演结婚动画
//注意:全服活动开启关闭通知用 Activity.broadActivityStatus()
var ConfigServerEvent = {
    HOME_PAGE_FLOWER: 31,
    FACTION_MAP_CREATE: 32,
    FACTION_MAP_BOSS: 33,
    FACTION_PVE_OPEN: 34,
    FACTION_PVE_CLOSE: 35,
    FACTION_PVE_BOSS_OPEN: 36,
    FACTION_PVE_BOSS_CLOSE: 37,
    ROBBER_FIRST_KILL: 38,
    ROBBER_BOSS_REFRESH: 39,
    ROBBER_BOSS_KILLED: 40,
    ROBBER_BOSS_BOX: 41,
};
//迷之宝箱
var opRiddleBoxConfig = {
    LimitCount: 3,
    RiddleBoxCount: 20,
    NpcId: 22003,
    MapList: (_2 = {},
        _2[1] = defaultValue.DEFAULT_MAP2,
        _2),
};
//时空盗贼
var opSpaceTimeRobber = {
    LimitCount: 5,
    SpaceTimeRobberCount: 10,
    RobberLife: 600,
    NpcId: (_3 = {},
        _3[defaultValue.DEFAULT_MAP2] = 70001,
        _3[50002] = 70002,
        _3),
    MapList: (_4 = {},
        _4[1] = defaultValue.DEFAULT_MAP2,
        _4[2] = 50002,
        _4),
};
//ConfigWuDou = 
//{
// stageTime:any : {
//	 STAGE_APPLY_START:any : {wday:3, hour:0, minu:0},  //周三0点
//	 STAGE_APPLY_NOTICE:any = {wday:2, hour:18, minu:0},//周二18点
//	 STAGE_APPLY_END:any = {wday:2, hour:19, minu:0},   //周二19点
//	 STAGE_GAME:any = {wday:2, hour:20, minu:0},        //周二20点
//	},
//	gameInterval = 120,
//	limitLevel = 0,
//	maxPlayerCount = 128,
//	betPrize = 50,
//}
//平台分享奖励saveRecordKey配置
//opPlatFormRewardCofig =
//{
//	firstShare : 
//	{
//		firstQQShare 						: 3611,
//		firstXinLangShare				: 3612,
//		firstWeiXinShare				: 3613,
//	},
//	dailyShare = 
//	{
//		dailyQQShare						: 3601,
//		dailyXinLangShare				: 3602,
//		dailyWeiXinShare				: 3603,
//	}
//}
//opFirstKeyToDailyKey = 
//{
//	[opPlatFormRewardCofig.firstShare.firstQQShare]				: 	opPlatFormRewardCofig.dailyShare.dailyQQShare,
//	[opPlatFormRewardCofig.firstShare.firstXinLangShare]	: 	opPlatFormRewardCofig.dailyShare.dailyXinLangShare,
//	[opPlatFormRewardCofig.firstShare.firstWeiXinShare]		: 	opPlatFormRewardCofig.dailyShare.dailyWeiXinShare,
//}
var FactionWarStage = {
    STAGE_ONE: 5,
    STAGE_TWO: 4,
    STAGE_THREE: 3,
    STAGE_FOUR: 2,
    STAGE_APPLY: 1,
    STAGE_NONE: 0,
    STAGE_ONE_PREPARE: 15,
    STAGE_TWO_PREPARE: 14,
    STAGE_THREE_PREPARE: 13,
    STAGE_FOUR_PREPARE: 12,
};
//ConfigFactionWar = {
//	TEST_MODE : false,
// enterPosLeft1:any : {x:21, y:36},
// enterPosRight1:any = {x:58, y:36},
// enterPosLeft2:any = {x:21, y:36},
// enterPosRight2:any = {x:58, y:36},
//	
// npcPosLeft1:any = {x:18, y:40},
// npcPosRight1:any = {x:140, y:40},
// npcPosLeft2:any = {x:18, y:40},
// npcPosRight2:any = {x:158, y:40},
//	
//	ticketNpcEntry = 40001,
//	bigTicketNpcEntry = 40068,
//	flagNpcEntry = 11001,//军棋NPC
//	flagNpcMapId = defaultValue.DEFAULT_MAP2,//军棋NPC所在地图ID
//	flagNpcMapX = 96,//军棋NPC所在地图X坐标
//	flagNpcMapY = 122,//军棋NPC所在地图Y坐标
// stageTime:any = {
//		//一周两轮 周二淘汰赛，周三冠军赛  周六淘汰赛，周日冠军赛
//	 STAGE_APPLY_START:any : {{wday:1, hour:0, minu:0},{wday:4, hour:0, minu:0}},  //周一0点  报名开始
//	 STAGE_APPLY_PREEND:any = {{wday:2, hour:18, minu:0},{wday:6, hour:18, minu:0}},//周六18点 报名结束预告
//	 STAGE_APPLY_END:any = {{wday:2, hour:19, minu:0},{wday:6, hour:19, minu:0}},   //周六19点 报名结束		//1.(24+19)*60*60=154800s		2.(24+24+19)*60*60=241200s
//		
//		//STAGE_ONE_PRESTART = {wday:6, hour:19, minu:0},//周六19点 淘汰赛预告
//	 STAGE_ONE_START:any = {{wday:2, hour:20, minu:0},{wday:6, hour:20, minu:0}},   //周六20点 淘汰赛
//		
//	 STAGE_THREE_PRESTART:any = {{wday:3, hour:19, minu:0},{wday:0, hour:19, minu:0}}, //周日19点 冠军赛预告
//	 STAGE_THREE_START:any = {{wday:3, hour:20, minu:0}, {wday:0, hour:20, minu:0}}, //周日20点 冠军赛
//		
//		//STAGE_GAME_END = {wday:0, hour:22, minu:0}, //周日22点 结束
//	},
//	gameInterval = 60,
//	map16And8Id = 50061,  //淘汰赛地图
//	map4And2Id = 50061,  //冠军赛地图
//	
//	//令牌刷新点
// grids1:any = {{56,22},{37,42},{15,58},{8,91},{163,78},{211,84},{226,40},{200,21},{174,33},
//	{146,28},{144,134},{174,150},{210,156},{148,192},{182,202},{206,224},{95,132},{77,159},{10,165},{33,200}},
// grids2:any = {{56,22},{37,42},{15,58},{8,91},{163,78},{211,84},{226,40},{200,21},{174,33},
//	{146,28},{144,134},{174,150},{210,156},{148,192},{182,202},{206,224},{95,132},{77,159},{10,165},{33,200}},
//	
// applytime:any = {154800,241200},
//	stageOnePreTime = 3600,	//第一场预告时间 1小时
//	stageThreePreTime = 3600,//第三场预告时间 1小时
//	stageOneGameTime = 1500,   //比赛时间 25分钟
//	stageThreeGameTime = 1200,   //第三轮第四轮比赛时间 26分钟 抢旗20 分钟，精英赛准备加开始6分钟	
//	stateOnePrepareTime = 600, //准备时间 第一场结束后,相隔多长时间第二场  10分钟
//	stateThreePrepareTime = 540, //准备时间 第三场结束后,相隔多长时间第四场  9分钟
//	preSeniorTime = 180, //精英赛准备时间  3分钟
//	seniorTime = 180, //精英赛比赛时间 3分钟
//	clearDeathPay = 10, //清掉死亡等待CD需要花费多少晶石
// SeniorWinScore:any = {1500,1000,850},//精英赛胜利得多少积分
// SeniorLostScore:any = {0,0,0},
//	PKWinScore = 15,//正常PK胜利得多少积分
//	PKLostScore = 5,
// nextWarTime:any = {158400,244800,24*60*60}, //下一场比赛的时间间隔 1、2：报名-16进8  3：16进8开始到4进2开始 
//	flagCount = 20,
// flagScore:any = {30,100},
// flagRefreshTime:any = {{5,10,15,20,40,45,50,55},{5,10,15,40,45,50}},	//旗子刷新时间
//	participateScore = 3,         //参与活动每分钟获得的分数
//	flagCD = 120,
//}
//精英队员准备操作返回码
//opFacWarSeniorReadyCode = {
//	Success : 0,
//	NoFaction : 1,//没有加入公会//
//	StageWrong : 2,//当前时间不可以设置准备了
//	NoSeniorList : 3,//没有设置参战列表
//	NotInSeniorList : 4,//不在参战成员列表里
//	NotInTree : 5,//公会不在比赛队列里
//}
//
////查询精英对战信息
//opFacWarQueryReadyCode = {
//	Success : 0,
//	NoFaction : 1,//没有加入公会//
//	StageWrong : 2,//当前时间不是精英赛时间
//	NotInTree : 3,//公会不在比赛队列里
//}
//
//opFogForestConfig = 
//{
//	limitLevel : 50,
//	maxLayer : 20,
//}
//
////迷雾森林技能
//opFogForestSkillIndex = 
//{
//	guideDoor : 1,
//	godBless  : 2,
//}
//
////死亡领域活动版配置
//opDeadFieldConfig = 
//{
//	limitLevel : 60,
//	maxlayer : 7,
//	interval : 5,
//	needPower : 0,
//}
//
////亡领域活动版技能数量配置
//opDeadFieldSkillCountConfig = 
//{
//	[1]   : 1,                 //时空暂停
//	[2]   : 1,                 //神圣之光
//	[3]   : 1,                 //士气激励
//	[4]   : 1,                 //勇往直前
//	[5]   : 1,                 //胆战心惊
//}
//
////死亡领域个人日常版配置
//opDeadFieldPersonalConfig = 
//{
//	limitLevel : 70,
//	maxlayer : 7,
//	needPower : 0,
//	maxOrder : 3,
//}
//
////死亡领域个人日常版技能数量配置
//opDeadFieldPersonalSkillCountConfig = 
//{
//	[1]   : 1,                 //天神守护
//	[2]   : 1,                 //勇往直前
//	[3]   : 1,                 //邪恶束缚
//}
//
////密语境地
//opSecretLandConfig = 
//{
//	mapId : 50090,
//	limitLevel : 50,
// questionCount:any : {3,3},
//	transferX = 17,
//	transferY = 33,
//	timeInterval = 600,
//	boxLifeTime = 600,
//	npcTimeInterval = 3,
//	refreshInterval = 10,
//	boxCount = 5,
//	boxNpcEntryId = 90005,
//	fightCount = 1,
//	limitBoxCount = 3,
//	inspaireTimes = 10,
//	inspaireRmb = 10,
//	deadWaitRmb = 10,
//	deBuff = 0.05,
//	boxLibId = 55,
//}
//
//opSecretInspaireRmb = 
//{
//	[1]        : 5,
//	[2]        : 10,
//	[3]        : 15,
//	[4]        : 20,
//	[5]        : 20,
//	[6]        : 20,
//	[7]        : 20,
//	[8]        : 20,
//	[9]        : 20,
//	[10]       : 20,
//}
//报纸配置
//opNewsPaperConfig = 
//{
//	maxCount : 10,                  //刊数
//}
// //联盟配置
// let opUnionConfig:any = {
// 	TEST_MODE : false,
// 	STAGE_APPLY_BEGIN : 0,      //报名阶段
// 	STAGE_APPLY_END : 1,        //报名结束阶段  
// 	STAGE_ONE : 2,              //初赛阶段 
// 	STAGE_TWO_PREPARE : 3,      //决赛准备
// 	STAGE_TWO : 4,              //决赛阶段
// 	STAGE_TWO_END : 5,          //决赛结束阶段
// 	guardFairyEntryId : 90012,  //精灵守护
// 	fairyMonsterEntryId : 30000050,
// 	guardFairyHP : 2000000,     //精灵守卫血量
// 	leftFairyRoomIndex : 2,     //左边精灵守护地图索引
// 	rightFairyRoomIndex : 4,    //右边精灵守护地图索引
// 	guardUnionEntryId : 90013,  //联盟守护
// 	unionMonsterEntryId : 30000051,
// 	guardUnionHP : 2000000000,  //联盟守卫血量
//  guardFairyPos:any : {24,80},    //精灵守护位置
//  guardUnionPos:any = {24,85},    //联盟守护位置
// 	publicMapIndex = 3,         //公共地图索引
// 	leftSide = 1,               //左边阵营
// 	rightSide = 2,              //右边阵营
// 	transferEntryId1 = 90014,   //隐藏传送门(1-5/5-1)
//  leftTransferPos1:any = {106,49},//隐藏传送门(1-5/5-1)左边位置
//  rightTransferPos1:any = {45,30},//隐藏传送门(1-5/5-1)右边位置
// 	transferEntryId2 = 90014,   //隐藏传送门(2-4/4-2)
//  leftTransferPos2:any = {90,80}, //隐藏传送门(2-4/4-2)左边位置
//  rightTransferPos2:any = {10,25},//隐藏传送门(2-4/4-2)右边位置
// 	boxEntryId = 90008,         //宝箱
// 	guardInterval = 10*60,      //联盟守卫复活时间
// 	transferInterval = 1*60,    //临时传送门持续时间
// 	guardFightCount = 90,       //联盟守卫战斗次数
// 	fairyFightCount = 30,       //精灵守卫战斗次数
// 	bossFightTime = 20,         //联盟守卫战斗间隔
// 	normalFlagEntryId = 90010,  //普通旗帜
// 	seniorFlagEntryId = 90011,  //高级旗帜
// 	normalFlagCount = 15,       //普通旗帜数量
// 	seniorFlagCount = 5,        //高级旗帜数量
// 	flagLiveTime = 120,         //战旗转化时间
// 	seniorFlagScore = 100,      //高级战旗积分  
// 	normalFlagScore = 20,       //普通战旗积分
// 	winScore = 5,               //胜利积分
// 	lostScore = 0,              //失败积分
// 	factScore = 1,              //查看军团成员积分
// 	unionScore = 2,             //查看联盟成员积分
// 	myNodeScore = 1,            //查看我方成员积分
// 	otherNodeScore = 2,         //查看敌方成员积分
// 	firstMatch = 1,             //初赛
// 	secondMatch = 2,            //决赛
// 	secondWinScore =            //决赛胜利加分
// 	{
// 		[1] : 1000,
// 		[2] : 1300,
// 		[3] : 2000,
// 	},
//  buffList:any = {1,2,3,4,5,6,7}, //随机buff列表
// }
//骑士团pve副本配置
var opCombatTeamPVEConfig = {
    limitLevel: 40,
    maxlayer: 7,
    needPower: 0,
    maxOrder: 1,
    resetTimes: 1,
    layerCount: 2,
};
//骑士团pve副本配置
var opCombatTeamPVESkillConfig = (_5 = {},
    _5[1] = 1,
    _5[2] = 1,
    _5[3] = 1,
    _5);
var opCombatTeamPVEFightTimeConfig = [
    [0, 10000, 2],
    [10000, 30000, 1],
    [30000, 60000, 0.74],
    [60000, 80000, 0.5],
    [80000, 800000, 0],
];
//回归码距离开服N天
var opReturnCodeCofig = {
    limitCount: 30,
    intervalTime: 30 * 24 * 3600,
    limitLevel: 30,
};
//节日公共配置
var opFestiveConfig = {
    singlesDayFlower: 40345,
    encounterGold: 199,
};
//红包配置
var opRedEnvelopeConfig = {
    factType: 1,
    friendType: 2,
    overTime: 12 * 3600,
    factLevel: 5,
    dailyCount: 5,
    recordCount: 100,
    maxSendCount: 5,
    maxCount: 10,
    sendContribute: 100,
    getContribute: 50,
    //factLevel       : 5,          //军团等级
    plrLevel: 60,
    vipLevel: 6,
    plrMaxCount: 5,
    getPlrLevel: 40,
    plrSendCount: 1,
};
//红包金额
var opRedEnvelopeRmbConfig = {
    firstLevel: 500,
    secondLevel: 2000,
};
//红包金额对应领取次数
var opRedEnvelopeRmbToCountConfig = (_6 = {},
    _6[opRedEnvelopeRmbConfig.firstLevel] = 10,
    _6[opRedEnvelopeRmbConfig.secondLevel] = 20,
    _6);
//雇佣
var opEmployConfig = {
    plrMaxEmployGroup: 300,
    sysMaxEmployGroup: 60,
    maxEmployOutCount: 3,
    plrEmployOutCount: 1,
    plrEmployInCount: 4,
    employLastTime: 3 * 60,
    leastOutTime: 24 * 3600,
    plrDailyMaxCount: 2,
    dailyRentCount: 1,
};
var opCreateTeamCode = {
    Success: 0,
    NotLogin: 1,
    HasTeam: 2,
    NotFreeState: 3,
    NotEnoughCount: 4,
    NotActive: 5,
};
var opInviteTeamCode = {
    Success: 0,
    NotLogin: 1,
    NotHasTeam: 2,
    NotFreeState: 3,
    CanNotFind: 4,
    TargetHasTeam: 5,
    TargetNotFreeState: 6,
    TargetScoreLimit: 7,
    TargetNotEnoughCount: 8,
};
var opKickTeamCode = {
    Success: 0,
    NotLogin: 1,
    NotHasTeam: 2,
    NotFreeState: 3,
    NotCaption: 4,
    CanNotFind: 5,
};
var opReplyTeamCode = {
    Success: 0,
    TeamNotHere: 1,
    CaptionNotHere: 2,
    CaptionNotFree: 3,
    TeamFull: 4,
    SelfNotLogin: 5,
    SelfHasTeam: 6,
    SelfNotFreeState: 7,
    NotEnoughCount: 8,
};
var opLeagueBeginMatchCode = {
    Success: 0,
    InBattle: 1,
    NotActive: 2,
    CountNotEnought: 3,
    NotFree: 4,
    MemberNotEnoughCount: 5,
    NotCaption: 6,
};
var opLeagueCancelMatchCode = {
    Success: 0,
    InBattle: 1,
    NotMatch: 2,
};
var opLeagueDisbandCode = {
    Success: 0,
    NotLogin: 1,
    NotHasTeam: 2,
    NotFreeState: 3,
    NotCaption: 4,
};
var opLeagueLeaveCode = {
    Success: 0,
    NotLogin: 1,
    NotHasTeam: 2,
    NotFreeState: 3,
    IsCaption: 4,
};
var opLeagueQuitQueueCode = {
    Success: 0,
    NotLogin: 1,
    NotQueueState: 2,
    NotHasBattleId: 3,
};
var opLeagueFinishCode = {
    Success: 0,
    Fail: 1,
    SomeOneCancel: 2,
};
//生死劫奖励配置
var opLifeAndDeathPrizeValueConfig = {
    fightPrize: 0x1,
    boxPrize: 0x2,
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6;
//阵营战
//ConfigZhenYing = {
//	needLevel : 1,  //参加等级
//	redTeam : 1,  //红
//	blueTeam : 2, //蓝
//	
//	//每周的周二，周三，周四，22:00-22:30
// startTime:any : {
//		{wday:1, hour:20, minu:0},
//		{wday:4, hour:20, minu:0},
//		{wday:5, hour:20, minu:0},
//		{wday:6, hour:15, minu:0},
//		{wday:0, hour:15, minu:0},
//	},
// endTime:any = {
//		{wday:1, hour:20, minu:30},
//		{wday:4, hour:20, minu:30},
//		{wday:5, hour:20, minu:30},
//		{wday:6, hour:15, minu:30},
//		{wday:0, hour:15, minu:30},
//	},
//	
//	matchInterval = 20, //匹配间隔
// inspireRate:any = {1, 1, 1, 1, 1, 1, 1, 1, 1, 1}, //鼓舞成功率
// inspireEffect:any = {0.1, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6}, //鼓舞效果
//	inspireNeed = 20, //鼓舞晶石
//	
//	//winGold = 10000*3, //胜利金币
//	//loseGold = 20000, //失败金币
//	npcItemEntry = 3, //积分商城索引
//	lastTime = 1800, //持续时间
//}
//boss活动索引
//opBossActivityIndex = 
//{
//	
//}
//# sourceMappingURL=activityOptions.js.map