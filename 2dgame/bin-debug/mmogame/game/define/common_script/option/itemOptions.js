//
//let field = objectField
var storeOptions = {
    PACKET: 1,
    ROLEEQUIP: 2,
    COMMONEQUIP: 3,
};
//sexType =
//{
//	[0] : "无限制",
//	[1] : "男",
//	[2] : "女",
//}
var useTimeOptions = {
    BOTH: 0,
    IN_COMBAT: 1,
    OUT_COMBAT: 2,
    LEITAI_COMBAT: 3,
};
//useObjects =
//{
//	NONE  : 0,  //不能在战斗中使用
//	SELF  :	1,  //对己方使用
//	BOTH  :	2,  //对已方和敌方使用
//	ENEMY :	3,  //对敌方使用
//}
//equipQuality =
//{
//	NORMAL    :	1, //普通
//	GOOD      :	2, //优良
//	EXQUISITE : 3, //精致
//	LEGEND    :	4, //传说
//	EXTREME   :	5, //神工
//}
var opItemStatus = {
    NONE: 0,
    BIND: 1,
    PASSIVEBIND: 2,
    UNBIND: 3,
};
var opTradeStatus = {
    TRADE_STATUS_OFFER: 1,
    TRADE_STATUS_ACCEPT_OFFER: 2,
    TRADE_STATUS_REJECT_OFFER: 3,
    TRADE_STATUS_ITEM_UPDATE: 4,
    TRADE_STATUS_PET_UPDATE: 5,
    TRADE_STATUS_MONEY_UPDATE: 6,
    TRADE_STATUS_LOCK: 7,
    TRADE_STATUS_CANCEL_LOCK: 8,
    TRADE_STATUS_LOCK_SUCCESS: 9,
    TRADE_STATUS_LOCK_FAIL: 10,
    TRADE_STATUS_ACCEPT_LOCK: 11,
    TRADE_STATUS_REJECT_LOCK: 12,
    TRADE_STATUS_SUCCESS: 13,
    TRADE_STATUS_FAIL: 14,
    TRADE_STATUS_PRE: 15,
    TRADE_STATUS_ING: 16,
    TRADE_STATUS_OK: 17,
};
var opTradeRet = {
    TRADE_RET_NONE: 0,
    TRADE_RET_BUSY: 1,
    TRADE_RET_TEAM: 2,
    TRADE_RET_FIGHT: 3,
    TRADE_RET_TOOFAR: 4,
    TRADE_RET_MONEY_ERROR: 5,
    TRADE_RET_ITEM_ERROR: 6,
    TRADE_RET_PET_ERROR: 7,
    TRADE_RET_OFFLINE: 8,
    TRADE_RET_SELF_MAXMONEY: 9,
    TRADE_RET_TARGET_MAXMONEY: 10,
    TRADE_RET_SELF_PACKET: 11,
    TRADE_RET_TARGET_PACKET: 12,
    TRADE_RET_SELF_MAXPET: 13,
    TRADE_RET_TARGET_MAXPET: 14,
    TRADE_RET_STALL: 15,
    TRADE_RET_OTHER: 30,
};
var opItems = {
    MAX_PRICE: 999999999,
    STALL_LEVEL: 10,
    UNBIND_TIME: 72 * 60 * 60,
    STORE_DAY: 30,
    FLY_MAX_INDEX: 9,
    WAREHOUSE_LOCK: 72 * 60 * 60,
};
var opItemUnit = {
    FUNDS: 1,
    BIND_CURRENCY: 2,
    CURRENCY: 3,
    POWER: 4,
    JJC_POINT: 6,
    FACCONTRIBUTE_POINT: 7,
};
var opItemTrade = {
    TRADE: 1,
    GIVE: 2,
};
var opPassword = {
    WAREHOUSE: 1,
    IBSHOP: 2,
    SHOW: 3,
    MALL: 4,
};
//////-宠物装备////////-
//装备系数
var opPetEquipCoefficient = [
    [[1, 1.3], 30],
    [[1.3, 1.6], 35],
    [[1.6, 1.9], 20],
    [[1.9, 2.2], 10],
    [[2.2, 2.5], 5],
];
//装备等级
//opPetEquipLevel =
//{ //根据entryId 获取对应的等级
//	[311100] : 1,
//	[312100] : 1,
//	[313100] : 1,
//	[311200] : 2,
//	[312200] : 2,
//	[313200] : 2,
//	[311300] : 3,
//	[312300] : 3,
//	[313300] : 3,
//	[311400] : 4,
//	[312400] : 4,
//	[313400] : 4,
//}
//护符生成技能数
//opHufuGenerateSkill =
//{
//	[1] : {{1,70},{2,30}},
//	[2] = {{1,60},{2,40}},
//	[3] = {{1,50},{2,50}},
//	[4] = {{1,40},{2,60}},
//}
// 物品来源
var opItemSource = {
    grank: 1,
    shop: 2,
    IBShop: 3,
    make: 4,
    task: 5,
    trade: 6,
    pet: 7,
    fairy: 8,
    ride: 9,
    player: 10,
    GM: 11,
    Compensate: 12,
    Robber: 13,
    FactionWar: 14,
    SFactionWar: 15,
    FactionMatrix: 16,
    FactionMap: 17,
    UnionWar: 18,
    SUnionWar: 19,
    FactionTask: 20,
};
//魔导石星级
//opMagicStoneStar =
//{
//	Green  : 1100,  //绿色
//	Bule   : 1101,  //蓝色
//	Purple : 1102,  //紫色
//	Gold   : 1103,  //金色
//}
//魔导石基本配置
//opMagicStoneConfig =
//{
//	[opMagicStoneStar.Green]    : 20,
//	[opMagicStoneStar.Bule]     : 20,
//	[opMagicStoneStar.Purple]   : 10,
//	[opMagicStoneStar.Gold]     : 10,
//}
//拍卖行配置
var opAuctionConfig = {
    maxCount: 100,
    indexToTime: {
        first: 1 * 3600,
        second: 2 * 3600,
        third: 4 * 3600,
    },
    timeToPrize: (_a = {},
        _a[1 * 3600] = 0.05,
        _a[2 * 3600] = 0.06,
        _a[4 * 3600] = 0.08,
        _a),
    baseRatio: 0.1,
    tradeRecordCount: 50,
    priceRecordCount: 20,
    commisionRatio: 0.1,
};
// 元素石相关常量
var opElementStone = {
    levelLimit: 5,
};
//转换物品EntryId
var SpecailItemId = {
    FUNDS: 60055,
    GOLD: 60057,
    B_GOLD: 60056,
    EXP: 60061,
    EQUIP: 50003,
    POWER: 50004,
    STONE: 40070,
    BLUEEQUIP: 60069,
    PURPLEEQUIP: 60070,
    BANGGONG: 60072,
    SAODANG: 40021,
    ZIZHAOHUAN: 40043,
    JINZHAOHUAN: 40039,
    SHENGSHUI: 40054,
    GAIZAOSHENGSHUI: 40480,
    LINGZHUSHENGSHUI: 40481,
    QIANGHUASHI: 20058,
    HEROSPIRIT: 50024,
    SHENHUN: 40030,
    ZHUANGBEI: 40031,
    JINENGSHU: 40032,
    WANNENGSHI: 91000,
    WANNENGZHAOHUAN: 40416,
    BSDSHUIPIAN: 91002,
    BSDZHAOHUAN: 40426,
    LUCKYSTONE: 21012,
};
var opItemColorStr = [
    "gray",
    "lime",
    "blue",
    "purple",
    "orange",
    "red",
];
var opJudgeJieSuo = {
    LEVELNUM: "levelNum",
    GAMECASENUM: "gameCaseNum",
    FACTIONLEVEL: "factionLevel",
    RANKINGNUM: "rankingNum",
    CONVOYNUM: "convoyNum",
    ANSWERNUM: "answerNum",
};
var _a;
//# sourceMappingURL=itemOptions.js.map