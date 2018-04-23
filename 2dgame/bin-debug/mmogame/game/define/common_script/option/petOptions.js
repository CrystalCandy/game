////////////////////////////////////////////////////////////////////////////////
//部下配置
////////////////////////////////////////////////////////////////////////////////
var HeroConfig = {
    MAX_LEVEL: 60,
    MAX_BREAK: 5,
    MAX_LINK: 5,
    MAX_AWAKE: 5,
    MAX_SKILL_LEVEL: 30,
    MAX_QUALITY_LEVEL: 3,
};
var petBreakRatio = [
    1,
    1.25,
    1.55,
    1.93,
    2.4,
    3 //5级//
];
var opBreakError = {
    Success: 0,
    EntryIdNotFound: 1,
    SoulZero: 2,
    ExpItemListNotEnough: 3,
    SoulNotEnough: 4,
    LevelNotRight: 5,
    MaxLevel: 6,
};
// 技能种类
//petSkillType = 
//{	
//	NORMAL	: 1,	// 普通技能
//	EQUIP		: 2,	// 装备技能
//	SOULP		: 3,	// 觉醒技能
//}
// 宠物状态(state)
var petState = {
    UNBIND: 0x0001,
    BIND: 0x0002,
    EMPLOYNO: 0x0004,
    EMPLOYIN: 0x0008,
    EMPLOYOUT: 0x0010,
    CONTROL: 0x0020,
};
//宠物类型
var opPetType = {
    Priest: 1,
    Warrior: 2,
    Mage: 3,
    Rogue: 4,
};
// 宠物品质
var opPetQuality = {
    gray: 1,
    green: 2,
    blue: 3,
    purple: 4,
    gold: 5,
    red: 6,
    color: 7,
};
//宠物上阵
var opPetCombatPos = {
    Rest: 0,
    Battle: 1,
    Prepare1: 2,
    Prepare2: 3,
};
var opPetRange = {
    Pet: 20000,
    XianLv: 17000,
};
//亲密度事件配置
var opIntimateEvent = {
    OnlineTime: 15 * 60,
    Interval: 30 * 60,
    Rate: 0.3,
};
//推送事件配置
var opPushEvent = {
    OnlineTime: 300,
    Interval: 300,
    LimitCount: 10,
    plrLevel: 20,
};
//突发事件配置
var opBurstEvent = {
    OnlineTime: 300,
    Interval: 300,
    LimitCount: 3,
    totallCount: 10,
    plrLevel: 20,
};
//互动金币消耗品质系数
var opInteractQualityRate = (_a = {},
    _a[opPetQuality.gray] = 0.5,
    _a[opPetQuality.green] = 1,
    _a[opPetQuality.blue] = 5,
    _a[opPetQuality.purple] = 8,
    _a[opPetQuality.gold] = 10,
    _a);
//宠物经验类型
var opPetExpType = {
    Normal: 1,
    Task: 2,
    Activity: 3,
    Campaign: 4,
    Prize: 5,
    Other: 6,
};
//升级所需经验系数
//opPetLevelUpRatio = 
//{
//	[opPetQuality.gray] 		: 	1,	// 灰色 
//	[opPetQuality.green] 		: 	1,  // 绿色 
//	[opPetQuality.blue]	 		: 	1,  // 蓝色 
//	[opPetQuality.purple] 		: 	2,  // 紫色 
//	[opPetQuality.gold] 		: 	4,  // 金色 
//}
//魔导石槽位状态
var opPetMagicStoneStatus = {
    UnActive: 0,
    Active: 1,
};
//部下魄力
var opPetCourageConfig = {
    needLevel: 60,
    qualityMaxLevel: 5,
    levelMaxLevel: 30,
    rateItemCount: 1,
    rateItemEntryId: 40315,
    addRate: 0.5,
};
//部下传承配置
var opPetInheritConfig = {
    plrLevel: 30,
};
//部下专精
var opPetEssenceConfig = {
    plrLevel: 60,
    petLevel: 60,
    resetGold: 50,
};
//部下专精操作类型
var opPetEssenceOperateType = {
    addAbility: 1,
    decAbility: 2,
};
//伙伴品质
var opPetQualityLevel = {
    Normal: 0,
    Legend: 1,
    Fiend: 2,
    Epic: 3,
};
//伙伴品质 //{碎魂数, 抽奖次数}
var opPetQualityToSoulAndLottery = (_b = {},
    _b[opPetQualityLevel.Normal] = [45, 18],
    _b[opPetQualityLevel.Legend] = [45, 18],
    _b[opPetQualityLevel.Fiend] = [45, 18],
    _b[opPetQualityLevel.Epic] = [45, 18],
    _b);
//哈迪斯
var opSpecialPet = [18016, 18019, 18020, 18021];
//////////////////////////-精灵////////////////////////
var opFairyState = {
    follow: 0x0001,
    unfollow: 0x0002,
    fight: 0x0004,
    unfight: 0x0010,
};
//精灵配置
var opFairyConfig = {
    MaxLevel: 10,
    NormalDevelopRate: 0.875,
    SmallDevelopRate: 0.1,
    SeniorDevelopRate: 0.025,
    NormalDevelopRatio: 1,
    SmallDevelopRatio: 3,
    SeniorDevelopRatio: 10,
    ReformGold: 20,
    pearlMaxLevel: 10,
};
//培养液对应的暴击率
var opDevelopItemToDevelopRate = (_c = {},
    _c[40125] = opFairyConfig.NormalDevelopRate,
    _c[40126] = opFairyConfig.SeniorDevelopRate,
    _c);
//培养液对应的暴击系数
var opDevelopItemToDevelopRatio = (_d = {},
    _d[40125] = opFairyConfig.NormalDevelopRatio,
    _d[40126] = opFairyConfig.SeniorDevelopRatio,
    _d);
//精灵技能位置对应的灵珠条件
var opFairySkillIndexCond = (_e = {},
    _e[6] = 7,
    _e[7] = 10,
    _e[8] = true,
    _e[9] = true,
    _e[10] = true,
    _e);
////////////////////-翅膀////////////////////////
//翅膀状态
var opWingState = {
    On: 0x0001,
    Off: 0x0002,
};
//翅膀配置
var opWingConfig = {
    MaxLevel: 20,
    ModelUnlockVip: 2,
    ModelOnVip: 0,
    DefaultModel: 90057,
    Active: 1,
    UnActive: 0,
    ActiveItemList: [70017, 5],
    ReviseParamModelId: 90065,
    SkillHole: 6,
    skillBookLib: 200,
    skillBookLibEnergy: 200,
    skillBookLotteryRmb: 200,
    skillBookLotteryEnergy: 200,
    NormalSkillPosCount: 4,
    SeniorSkillPosCount: 6,
    specialSkill: [800001, 800004, 800005, 800010],
    MaxRefiningLevel: 10,
    RefineVisibleLevel: 30,
    RefineEnable: 75,
};
var opWingUnlockType = {
    image: 1,
    level: 2,
    item: 3,
};
//每次增加的祝福值
//opWingFaileBlessValue = 
//{
//	{0, 20, 75},
//	{3, 6, 75},
//	{7, 9, 75},
//}
//翅膀技能类型
var opWingSkillType = {
    base: 1,
    normal: 2,
    senior: 3,
};
//翅膀技能孔类型
var opWingSkillHoleType = {
    normal: 1,
    senior: 2,
};
//翅膀技能植入方式
var opWingSkillImplantType = {
    skill: 1,
    item: 2,
};
var opWingSkillBookLotteryType = {
    rmbGold: 1,
    energy: 2,
};
var opWingSkillBookLib = {
    rmbGold: 1,
    energy: 2,
};
var opWingSkillColor = {
    gold: 103,
    bule: 102,
    green: 101,
};
var opWingSkillLotteryDisCount = (_f = {},
    _f[1] = 1,
    _f[10] = 1,
    _f);
//图腾配置
var opWingTotemConfig = {
    resetGold: 1000,
    openLevel: 45,
    maxQuality: 6,
    maxLevel: 60,
};
//图腾品质
var opWingTotemQuality = {
    gray: 1,
    green: 2,
    blue: 3,
    purple: 4,
    gold: 5,
    colour: 6,
};
//品质对应最高等级
var opWingTotemQualityToMaxLevel = (_g = {},
    _g[opWingTotemQuality.gray] = 10,
    _g[opWingTotemQuality.green] = 20,
    _g[opWingTotemQuality.blue] = 30,
    _g[opWingTotemQuality.purple] = 40,
    _g[opWingTotemQuality.gold] = 50,
    _g[opWingTotemQuality.colour] = 60,
    _g);
var opWingDevelopType = {
    ONCE: 0,
    ALL: 1,
};
////////////////////-坐骑////////////////////////
//自动喂养
var opRideAutoFeed = {
    needItem: [40526, 1]
};
//工会坐骑
var opFactionRideEntryId = 60000;
var opFactionRideItemEntryId = 40102;
////////-进化石相关//////-
//不能进化列表
var opNotDevelopQuality = (_h = {},
    _h[18008] = true,
    _h);
//进化石
var evolutionaryStone = {
    changEStone: 40029,
    haDiSiStone: 40028,
    aBoLuoStone: 40081,
    normalStone: 40095,
    weinasiStone: 40100,
    keluonuosiStone: 40103,
};
//-神兵系统//////
var opImmortalsState = {
    On: 0x0001,
    Off: 0x0002,
};
//神兵配置
var opImmortalsConfig = {
    entryId: 20000,
    maxLevel: 10,
    notWearEntryId: 40004,
    quenchValueRatio: 100,
    freeExperLevel: 1,
    freeExperTime: 10 * 60,
    freeExperCampId: 1027,
};
var _a, _b, _c, _d, _e, _f, _g, _h;
//# sourceMappingURL=petOptions.js.map