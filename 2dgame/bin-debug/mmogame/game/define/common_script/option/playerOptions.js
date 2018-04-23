////////////////////////////////////////////////////////////////////////////////
//人物定义
////////////////////////////////////////////////////////////////////////////////
var genderOptions = {
    MALE: 1,
    FEMALE: 2,
};
//狗狗模型
//let dogOption:any = {0,1,2,3}
var playerOptions = {
    autoLevel: 100,
    maxLevel: 200,
    powerTime: 1800,
    powerPoint: 4,
    powerDayInc: 100,
    //inviteAmbassadorLevel	: 3, 	//邀请大使最高等级
    rmbGoldToPower: 0,
    rmbGoldToPowerAdd: 300,
    rmbGoldToFunds: 0,
    rmbGoldToFundsAdd: 0,
    renQiCount: 80,
    offlinePreTime: 30,
    offlineMaxTime: 21600,
};
var opSaveRecordKey = {
    dailyTowerTimes: 1,
    autoIncPower: 2,
    acceptType: 3,
    meiRiQianDao: 5,
    mainTask: 6,
    dailyActivity: 9,
    autoIncInteractCount: 10,
    rmbGoldToFundsCount: 11,
    //rmbGoldToPowerCount  : 12, //晶石兑换体力次数
    newBiePetAndTask: 13,
    robberLostTimes: 15,
    robberPunishTime: 16,
    worldbossInspire: 17,
    worldbossWait: 18,
    reconnectCount: 19,
    robberTicket: 20,
    factionmapWait: 21,
    championTimes: 23,
    championTime: 24,
    dailyFourTimes: 25,
    interactCount: 26,
    worldMessageCount: 27,
    factionAttendance: 28,
    //warHornReward          : 29, //战争号角
    meirichoujiang: 30,
    queenAttendance: 31,
    invitedAmbassador: 32,
    springMagicPower: 33,
    pushEventId: 39,
    giveUpEventIdList: 40,
    CampaignToTalTime: 44,
    RecruitBateFreeCount: 45,
    RecruitHoopFreeCount: 46,
    RecruitHoop: 47,
    RecruitHoopCount: 48,
    IsFirstRecharge: 49,
    haveWarHorn: 50,
    petRecruitNew: 51,
    pushEventFinishTime: 53,
    burstEventFinishTime: 54,
    pushEventCount: 55,
    recoverPowerFirst: 56,
    recuritPetList: 58,
    recruitWipe: 59,
    SkyTowerChallenge: 60,
    itemMgrCountLimit: 61,
    vipGifts: 62,
    //equipLotteryCount    : 63, //装备抽奖次数
    //equipLottery         : 64, //单次抽取装备计数
    //equipLotteryTime     : 65, //单次抽取时间
    relicMineFailed: 66,
    relicMineCount: 67,
    RecruitTime: 68,
    quickRecruitList: 69,
    riddleBoxCount: 70,
    spaceTimeRobber: 71,
    ambassadorDailyPrize: 72,
    cardQQPrize: 73,
    cardWeiXinPrize: 74,
    secondRecharge: 76,
    dailyRecharge: 77,
    dailyPower: 78,
    equipNeedCount: 79,
    monthCard: 80,
    addBody: 81,
    levelFund: 82,
    levelFundReward: 83,
    cardPhonePrize: 84,
    lostTempleCD: 85,
    lostTemplePrizeTimes: 86,
    equipEnhanceEvent: 87,
    equipRefineEvent: 88,
    equipCastEvent: 89,
    zhenxingInspire: 90,
    factionWarTicket: 91,
    factionWarWait: 92,
    monsterSiegeWait: 93,
    monsterSiegeInspire: 94,
    monsterSiegeBuff: 95,
    robberBeKillTimes: 96,
    itemMgrWeekLimit: 97,
    honorPointPrize: 98,
    vipLogin: 99,
    vipEnterMap: 100,
    magicStoneEffectList: 101,
    combatTeamFetters: 102,
    magicStoneLock: 103,
    runmanDeadWait: 104,
    wingFaileCount: 105,
    midAutumnChangeCount: 106,
    deadFieldResetCount: 107,
    deadFieldPower: 108,
    bookLotteryCount: 109,
    secretLandInspire: 110,
    secretLandWait: 111,
    oldName: 112,
    changeNameTime: 113,
    singlesDayGoddess: 114,
    singlesDayEncounter: 115,
    loverValue: 116,
    singlesDayQuestion: 117,
    singlesDayReward: 118,
    disCountLimitCount: 119,
    guozhanBuyPoint: 120,
    springMonsterCount: 121,
    activityRecharge: 122,
    slotDayCount: 123,
    goldenEggsRecharge: 124,
    fortuneCatTimes: 125,
    cardNextTime: 126,
    operateActiveValue: 127,
    operateActivePrize: 128,
    childCardNextTime: 129,
    factPVETime: 130,
    factionDonateCount: 131,
    unionPVPFlagTime: 132,
    unionPVPWait: 133,
    welfareLotteryFreeTime: 134,
    unionPVPItemCD: 135,
    unionPVPEnterTime: 136,
    unionPVPBossTime: 137,
    matrixmapWait: 138,
    powerGetCount: 139,
    worldBossBoxCount: 140,
    worldBossFightCount: 141,
    onlineRightCount: 142,
    robberMutilIncome: 143,
    facPubTaskCount: 144,
    luxuryWeddingPoint: 145,
    //新加
    growBuyLiveNum: 146,
    skyTowerChangeVocation: 147,
    chooseSex: 148,
    homePagePraiseCount: 149,
    newPlrGrow: 150,
    robberRefreshCount: 151,
    newSummonStone: 152,
    robberBuffList: 153,
    inviteFriend: 154,
    resetInviteTime: 155,
    reviveSkyTower: 156,
    newBieRobber: 157,
    relicMineRobCount: 158,
    relicMineRobPrizeCount: 159,
    fengMoFinishCount: 160,
    //彩蛋相关
    easterEggTaklTimes: 161,
    campaignFailData: 162,
    equipEnhanceFailData: 163,
    egEmployCount: 164,
    firstLostRobberKey: 165,
    growWrongAnswerTimes: 166,
    robberBossBox: 167,
    robberBossEntryId: 168,
    robberNoDroptimes: 169,
    //
    skyTowerDiscount: 180,
    dailyEmployCount: 181,
    identifyCount: 182,
    monthCardRecruitTimes: 183,
    monthCardRecruitCD: 184,
    recruitItemCount: 185,
    hoopItemCount: 186,
    chooseDog: 187,
    campaignGifts: 188,
    castCount: 189,
    superMonthCard: 190,
    robberTicketEntryId: 191,
    examServerConfig: 192,
    firstChampionPoint: 193,
    monthQualityStone: 194,
    newBieQuenchValueRatio: 195,
    immorFreeExper: 196,
    newFeelLottery: 197,
    dayFactPoint: 198,
    facTaskPrize: 199,
    newBieBox: 200,
    newBieBoxTime: 201,
    godAnimalExpTime: 202,
    //
    zhongKuiFuMoKill: 203,
    zhongKuiFuMoPrize: 204,
    facRenqiSet: 205,
    facDailyRenqiPrize: 206,
    facDailyActiveExp: 207,
    facDailyActivePrize: 208,
    facMapTaskFinishCount: 209,
    facMapTaskPrizeGet: 210,
    facMapTaskResetCount: 211,
    facExchangeItemRefreshCount: 212,
    facExchangeItemRefreshTime: 213,
    escortRemainCount: 215,
    escortRobberCount: 216,
    factionMapPrizeCount: 217,
    factionMapHelpCount: 218,
    treasureLottery: 219,
    petLottery: 220,
    investPlan: 219,
    investPlanReward: 220,
    //dailyLogin							: 221, //每日登陆
    //dailyLoginReward				: 222, //登陆奖励
    //dailyLoginCount					: 223, //登陆次数(7天奖励结束清除)
    stageUp: 224,
    monthCardReward: 225,
    weekCard: 226,
    weekCardReward: 227,
    levelReward: 228,
    xiyouWelfareReward: 229,
    xiyouLilianScore: 230,
    wildBossCoolTime: 231,
    //	oldName                 = 232, --改名的旧名
    escortNum: 233,
    capturePet: 234,
    //任务相关 600 ~ 3000
    taskCancelTime: {},
    taskHoop: {},
    taskAcceptCount: {},
    taskCount: {},
    taskWeekCancel: {},
    taskWeekOpen: {},
    taskWeekCount: {},
    rechargeReward: {},
    //honorTitleKey 	= {},	//荣誉称号 3200-3300
    dailyShare: {},
    firstShare: {},
};
var opVocation = {
    AutoOpenId: 40004,
    MaxSkillNum: 5,
    MaxSkillLevel: 30,
    BeginEntryId: 40000,
};
//任务放弃时间
//opSaveRecordKey.taskCancelTime[3] 	= 600
//opSaveRecordKey.taskCancelTime[4] 	= 601
//opSaveRecordKey.taskCancelTime[5] 	= 602
//opSaveRecordKey.taskCancelTime[8] 	= 603
//opSaveRecordKey.taskCancelTime[9] 	= 604
//opSaveRecordKey.taskCancelTime[16] 	= 605
//opSaveRecordKey.taskCancelTime[19] 	= 606
//opSaveRecordKey.taskCancelTime[20] 	= 607
//opSaveRecordKey.taskCancelTime[21] 	= 608
//opSaveRecordKey.taskCancelTime[7] 	= 609
//任务环段
//opSaveRecordKey.taskHoop[3]  = 1000 //师门任务
//opSaveRecordKey.taskHoop[7]  = 1001 //护送任务
//opSaveRecordKey.taskHoop[8]  = 1002
//opSaveRecordKey.taskHoop[9]  = 1003
//opSaveRecordKey.taskHoop[11] = 1004
//opSaveRecordKey.taskHoop[12] = 1005
//opSaveRecordKey.taskHoop[13] = 1006
//opSaveRecordKey.taskHoop[14] = 1007	//修炼任务
//opSaveRecordKey.taskHoop[18] = 1009
//opSaveRecordKey.taskHoop[23] = 1010
//opSaveRecordKey.taskHoop[24] = 1011
//opSaveRecordKey.taskHoop[25] = 1012 //帮派建筑
//opSaveRecordKey.taskHoop[26] = 1013 //帮派玄武
//opSaveRecordKey.taskHoop[27] = 1014 //帮派跑商
//opSaveRecordKey.taskHoop[28] = 1015 //飞行旗
//任务每天接的次数
//opSaveRecordKey.taskAcceptCount[7] = 1400 //压镖
//任务每天做的次数
opSaveRecordKey.taskCount[33] = 1511; //封魔任务
//	
////任务每周做的次数
//opSaveRecordKey.taskWeekCount[19] = 1600
//opSaveRecordKey.taskWeekCount[20] = 1601
//opSaveRecordKey.taskWeekCount[21] = 1602
//opSaveRecordKey.taskWeekCount[10] = 1603
//	
////任务本周是否放弃过
//opSaveRecordKey.taskWeekCancel[13] = 1800
//opSaveRecordKey.taskWeekCancel[14] = 1801	//
//opSaveRecordKey.taskWeekCancel[15] = 1801	//
//opSaveRecordKey.taskWeekCancel[25] = 1802	
//
////任务本周是否开启过
//opSaveRecordKey.taskWeekOpen[13] = 1850	
//opSaveRecordKey.taskWeekOpen[14] = 1851	
//opSaveRecordKey.taskWeekOpen[15] = 1852
//opSaveRecordKey.taskWeekOpen[25] = 1853
//等级奖励
//opSaveRecordKey.levelReward[10]						= 3121			//10级奖励
//opSaveRecordKey.levelReward[20]						= 3122			//20级奖励
//opSaveRecordKey.levelReward[30]						= 3123			//30级奖励
//opSaveRecordKey.levelReward[40]						= 3124			//40级奖励
//opSaveRecordKey.levelReward[50]						= 3125			//50级奖励
//opSaveRecordKey.levelReward[60]						= 3126			//60级奖励
//充值奖励
opSaveRecordKey.rechargeRewardBegin = 3131;
opSaveRecordKey.rechargeRewardEnd = 3150;
opSaveRecordKey.dailyShare.qq = 3601; //qq(null 未分享)
opSaveRecordKey.dailyShare.xinLang = 3602; //新浪微博(null 未分享)	
opSaveRecordKey.dailyShare.weiXin = 3603; //微信(null 未分享)
opSaveRecordKey.firstShare.qq = 3611; //qq(null 已分享)
opSaveRecordKey.firstShare.xinLang = 3612; //新浪微博(null 已分享)	
opSaveRecordKey.firstShare.weiXin = 3613; //微信(null 已分享)
//封禁状态,0为正常，1为禁止登录，2为禁言,
var opBanStatus = {
    NORMAL: 0,
    LOGIN: 1,
    TALK: 2,
};
//战争号角
//warHornConfig = 
//{
//	leastRmbGold  				: 50,							//至少50晶石
//	maxLastTime						: 180*24*3600,		//最大持续时间
//	minLastTime						: 0,							//最小持续时间
//	time									: 30*24*3600,			//每次激活持续时间
//	canGetRmbGold					: 100,            //每天可领取的晶石
//}
//御灵索引配置
var opSacrificeIndex = {
    BEGIN: 294,
    END: 301,
};
//祭祀属性
var opSacrificeField = {
    LEVEL: 1,
    RATE: 2,
    STATU: 3,
    TIME: 4,
};
//祭祀状态
var opSacrificeStatus = {
    CAN: 1,
    NOT: 2,
    YES: 3,
};
var opHonorTitleType = {
    Normal: 1,
    Senior: 2,
    Super: 3,
};
var opGlobalCombinedSkillConfig = {
    useSkillCount: 3,
    skillCD: 60,
    commonType: 100,
    skillLevelUpCD: 7200,
    goldPerMinu: 0.2,
};
//修改性别
var opChangeSex = {
    needItem: [40516, 1],
};
var opPartnerBreak = {
    SoulItemSubType: 12,
    SameSoulItemPoint: 10,
    DifferentSoulItemPoint: 5,
};
//
var configLoaclRecord = {
    robberHeroHp: 1,
    burstEventCount: 2,
    robberPiece: 3,
    towerResetCount: 4,
    robberPower: 5,
    pushEventRecordTime: 9,
    startChangeInteract: 10,
    heroTaskPrize: 11,
    quickRecruit: 12,
    skyTowerRewardChoose: 13,
    robberKillTimes: 14,
    wudouPoint: 15,
    robberCounter: 16,
    activeCode: 17,
    firstRechargeValue: 18,
    firstRechargeReward: 19,
    compensate: 20,
    GMBody: 21,
    factionRenQi: 22,
    factionMapCount: 23,
    factionCreate: 25,
    robberkiller: 26,
    rivalPrize: 27,
    robberMultiRatio: 28,
    campaginMultiRatio: 29,
    itemTradeList: 30,
    worksDayRecharge: 31,
    eliteKillCount: 32,
    rmbGoldToPowerCount: 33,
    //rmbGoldToFundsCount    : 34, //金币购买
    firstCampaign: 35,
    magicStoneFailCount: 36,
    equipLotteryCount: 37,
    bindAccount: 38,
    //inviteFriend           : 39, //好友邀请
    campaginStar: 40,
    accumulative: 41,
    serverCompensate: 42,
    blackMarket: 43,
    consume: 44,
    skyTowerReward: 45,
    firstRecuritHoop: 46,
    recentRecharge: 47,
    robberMultiRatioItem: 48,
    campaginMultiRatioItem: 49,
    robberBoxCount: 50,
    secondRecuitHoop: 51,
    thirdRecuitHoop: 52,
    castUpEvent: 53,
    refineUpEvent: 54,
    lostTempleHpRp: 55,
    payRebate: 56,
    lostTemplePick: 57,
    sevenDayPrize: 58,
    sevenDayPrizeEx: 59,
    petInteractCount: 60,
    lostTemplePKTimes: 61,
    equipStrength: 62,
    skyTowerPrizeRecord: 63,
    equipStoneRecord: 64,
    robberPieceEx: 65,
    factionWarFlag: 66,
    everydayprice: 67,
    doubleprice: 68,
    payservers: 69,
    blackroles: 70,
    rejectFriends: 71,
    newBieFairy: 72,
    wudouTeamPoint: 73,
    honorTimeRecord: 74,
    honorCampaginRecord: 75,
    questionTime: 76,
    honorLostTemp: 77,
    honorTempRecord: 78,
    forestResetRecord: 79,
    wudouServerPoint: 80,
    forestExternalPrize: 81,
    quitFactionCDTime: 82,
    honorZhenYingTeam: 83,
    honorActivityTime: 84,
    createCombatTeamTime: 85,
    honorQiangda: 86,
    honorRecruitHoop: 87,
    welfareLotteryCount: 88,
    outCombatTeamTime: 89,
    everyDayAccuPay: 90,
    everyDayAccuConsume: 91,
    festivalCompensate: 92,
    midautumnExchange: 93,
    facwarServerFlag: 94,
    dayOnlineTime: 95,
    NationalExchange: 96,
    NationalHunDun: 97,
    ChampionPKTimes: 98,
    NationalExchange2: 99,
    deadFieldReset: 100,
    wingSkillLottery: 101,
    setWingSkillFlag: 102,
    honorDelete: 103,
    HalloweenKill1: 104,
    HalloweenExchange2: 105,
    HalloweenCount: 106,
    HalloweenBody: 107,
    HalloweenBodyPrize: 108,
    HalloweenBuy: 109,
    HalloweenKill2: 110,
    oldPlayerReturn: 111,
    SinglesDayKill: 112,
    SDEncounterRward: 113,
    SDEncounterCount: 114,
    ContinuousLogin: 115,
    petAdvanceExPraise: 116,
    VIPSignIn: 117,
    DailyRechargeAmount: 118,
    combatTeamPrize: 119,
    LeagueBuy: 120,
    ChristmasDayRecord: 121,
    NewYearDayRecord: 122,
    deadFieldPersonal: 123,
    freshManTask: 124,
    freshManTaskPrize: 125,
    singleDayRmbLimit: 126,
    springOnlineGift: 127,
    springMonsterPrize: 128,
    vowBox: 129,
    redEnvelopeList: 130,
    slotTotalCount: 131,
    bindAccountEx: 132,
    goldenEggsDailyProfit: 133,
    goldenEggsGot: 134,
    goldenEggsRemainHammer: 135,
    kiteDailyTime: 136,
    cardDailyTime: 137,
    cardLastPrizeTime: 138,
    playerKitCount: 139,
    childrenPrizeTime: 140,
    childCardIsRequest: 141,
    childCardDailyTime: 142,
    childTodayOnline: 143,
    factionPVECount: 144,
    factionPVECountEx: 145,
    fortuneCatTimes: 146,
    singlePayRebate: 147,
    noTroubleMode: 148,
    friendShip: 149,
    chatGroupTime: 150,
    factionMtxEnter: 151,
    facTaskTodayList: 152,
    factionTaskDaily: 153,
    tryRide: 154,
    facTaskCancelTimes: 155,
    facTaskItemList: 156,
    factionMtxPromote: 157,
    worldMessageCount: 158,
    facTaskTimeRec: 159,
    facTaskTimePoint: 160,
    tryRideList: 161,
    facItemTaskTimeRec: 162,
    facItemTaskCancelTimes: 163,
    facItemTaskCountWeek: 164,
    facItemTaskTimePoint: 165,
    facItemTaskItemList: 166,
    facItemLimitClear: 167,
    facItemTaskWeek: 168,
    robberItemColdTime: 169,
    combatTeamPVE: 170,
    independenceExchange: 171,
    meatDailyTime: 172,
    playerMeatCount: 173,
    hundunDropCount: 174,
    combatTeamPVELayer: 175,
    // facPubTaskCount     : 176, //军团任务当天发布次数
    facPubTaskTimeRec: 177,
    facPubTaskCancelTimes: 178,
    facPubTaskTimePoint: 179,
    facPubTaskItemList: 180,
    // rideFeedColdTime    : 181, //坐骑喂养冷却结束时间
    facPubTaskRecord: 182,
    plrFacPubTask: 183,
    rideFeedTimeRec: 184,
    rideFeedTimePoint: 185,
    returnCodeFlag: 186,
    couplePrize: 187,
    requestDivorceTime: 188,
    pickCandyTimes: 189,
    plrMarryRequest: 190,
    robberOffline: 191,
    redEnvelopeCount: 192,
    elementStoneRecord: 193,
    sendRedCount: 194,
    //
    robberTimerBox: 195,
    setVocationCooldown: 196,
    //recuritPetList         : 197, //招募列表
    quickRecruitList: 198,
    championWinStreak: 199,
    championWinStreakPrize: 200,
    homePagePraise: 201,
    championPrizeTimes: 202,
    //冲值活动统一
    payAccum: 203,
    consumeAccum: 204,
    dayPayAccum: 205,
    dayConsumeAccum: 206,
    //
    newPlrWeapon: 207,
    newPlrCloth: 208,
    newPetGrow: 209,
    dailyEmployCount: 210,
    receiveItemCount: 211,
    sendItemCount: 212,
    sendPlayerList: 213,
    robberLotteryLib: 214,
    robberBuffsList: 215,
    newPlrGrow: 216,
    robberPrizeInfo: 217,
    newPlrSpellWeapon: 218,
    recruitBreakLevel: 219,
    robberBossPrizeCount: 220,
    robberBossGrabCount: 221,
    robberOfflineHaveTime: 222,
    robberOfflineUsePower: 223,
    charmRecoverTime: 224,
    factionMapBossCount: 225,
    rentEmployCount: 226,
    skyTowerDiscountEvent: 227,
    pickSmallFlower: 228,
    pickBigFlower: 229,
    disCountNewEvent: 230,
    clearDailyRecord: 231,
    newRobberItem: 232,
    factionWarBigTicket: 233,
    newRobberVocItem: 234,
    newFeelValue: 235,
    newVocationTaste: 236,
    newRobberPetItem: 237,
    tempChatWindowList: 238,
    godAnimalUpRecord: 239,
    //zhongKuiKillList       : 240, //钟馗伏魔
    personBossList: 241,
    lifeAndDeathRecord: 242,
    lifeAndDeathCount: 243,
    materialPrizeRecord: 244,
    dragonPrizeRecord: 245,
    facActiveTaskCount: 246,
    //dragonStarRecord       : 247, //龙王宝藏累星奖励
    heavenTrialRecord: 248,
    facExchangeItemList: 250,
    treasureLottery: 251,
    monsterFight: 252,
    gettreasure: 253,
    meirisanbaiquick: 254,
    xiyouLilianTaskCount: 255,
};
var opVocationError = {
    Success: 0,
    EntryIdNotFound: 1,
    PreEntryIdNotFound: 2,
    KissNotEnough: 3,
    GrowAbilityNotEnough: 4,
    LastAbilityNotEnough: 5,
    TaskNotFinish: 6,
    ItemListNotEnough: 7,
    EntryIdUnlocked: 8,
    ItemListNotFound: 9,
    RateNotHit: 10,
    AtLeastOneItem: 11,
    HasUnlock: 12,
};
var opSetVocationError = {
    Success: 0,
    EntryIdNotFound: 1,
    Cooldown: 2,
};
////清掉职业切换ＣＤ//
//opClearVocationCooldownError = 
//{
//	Success : 0,
//	NoNeed : 1,//不需要////-
//	GoldNotEnough : 2, //钻石不足////-
//}
var opVocationSkillError = {
    Success: 0,
    EntryIdNotFound: 1,
    PreEntryIdNotFound: 2,
    LevelNotEnough: 3,
    GrowAbilityNotEnough: 4,
    LastAbilityNotEnough: 5,
    ItemListNotEnough: 6,
    FundNotEnough: 7,
    LevelWrong: 8,
    VocationIdNotFound: 9,
};
var opVocationSetSkillError = {
    Success: 0,
    EntryIdNotFound: 1,
    SkillNotFound: 2,
    SkillNoUnlock: 3,
    SkillPosError: 4,
    SkillNotBelongThePos: 5,
    VocationIdNotFound: 6,
};
var opPartnerSkillError = {
    Success: 0,
    EntryIdNotFound: 1,
    LevelNotEnough: 2,
    GrowAbilityNotEnough: 3,
    LastAbilityNotEnough: 4,
    ItemListNotEnough: 5,
    FundNotEnough: 6,
    LevelWrong: 7,
    PartnerIdNotFound: 8,
    BreakLevelNotEnough: 9,
};
var opAwakeError = {
    Success: 0,
    EntryIdNotFound: 1,
    LevelNotEnough: 2,
    GrowAbilityNotEnough: 3,
    ItemListNotEnough: 4,
    ExpItemListNotEnough: 5,
    FundNotEnough: 6,
    RateNotHit: 7,
    AwakeLevelWrong: 8,
    MaxAwakeLevel: 9,
    PartnerIdNotFound: 10,
};
var opNaturalStoneUpgrade = {
    Success: 0,
    EntryIdNotFound: 1,
    LevelNotEnough: 2,
    ItemListNotEnough: 3,
    FundNotEnough: 4,
    StoneNotThere: 5,
    PartnerIdNotFound: 6,
    RateNotHit: 7,
};
var opNaturalOff = {
    Success: 0,
    EntryIdNotFound: 1,
    GoldNotEnough: 2,
    PartnerIdNotFound: 3,
    PacketIsFull: 4,
};
var opNaturalImplant = {
    Success: 0,
    PartnerIdNotFound: 1,
    EntryIdNotFound: 2,
    LevelNotEnough: 3,
    FundNotEnough: 4,
    ExceptVocationType: 5,
    ExceptVocation: 6,
    ExceptPartner: 7,
    RateNotHit: 8,
    CellNumNotEnough: 9,
    //GoldNotEnough : 10,//晶石不足//-
    SameStoneSubType: 11,
};
var opSkillCode = {
    Success: 0,
    NotSuccess: 1,
    SkillLevelMax: 2,
    LevelNotEnough: 3,
    PlrLevelNotEnough: 4,
    ItemListNotEnought: 5,
    GoldNotEnought: 6,
    FundNotEnough: 7,
    NotEntryInfo: 8,
};
var opGrowSelectError = {
    Success: 0,
    NotEnoughChannel: 1,
    OldGrowNotFinish: 2,
    NotEnoughLive: 3,
    CanNotGetSelectId: 4,
    OwnerIdNotFound: 5,
};
var opGrowEventError = {
    Success: 0,
    EventNotExist: 1,
    EventEntryNotExist: 2,
    ItemNotEnough: 3,
    WaittingCombat: 4,
    CombatLost: 5,
};
var opGrowSoonFinishError = {
    Success: 0,
    OwnerNotFound: 1,
    MustPayMoreGold: 2,
    GoldNotEnough: 3,
};
var opBuyLiveError = {
    Success: 0,
    MaxBuyNumNotEnough: 1,
    LiveValueEnough: 2,
    GoldNotEnough: 3,
};
var growOptions = {
    growAreaNum: 5,
    feelingAreaNum: 3,
    growTypeNum: 5,
    selectTypeNum: 5,
    maxFeelingEventId: 9999,
    areaAddValue: [0, 1, 2, 3, 3],
    maxFeeling: 15,
    maxLive: 100,
    addLivePeriod: 1800,
    addLivePerTime: 2,
    maxGrowValue: 150,
    playerOwnerId: 7656,
    RightSelectAdd: 2,
    NotRightSelectAdd: 1,
    PerfectSelectAdd: 7,
    RightToPerfectRate: 16.6,
    SelectPayLive: 20,
    RightFeelingAdd: 1,
    NotRightFeelingAdd: -1,
    SelectActionDelay: 900,
    SelectActionSplitNum: 8,
    SelectActionEachPeriod: 112,
    AddEventRate: 10,
    MaxFeelingAddEventRate: 20,
    maxEventNum: 10,
    eventCombat: 1,
    eventSubmit: 2,
    eventTalk: 3,
    eventPrize: 4,
    eventCombatSelect: 1,
    eventSubmitSelect: 1,
    //buyLivePay : 100, //花多少钻石可以买一次活力值
    buyLiveNum: 30,
    initBuyLiveNum: 15,
};
//神兽
var opGodAnimal = {
    MAXLEVEL: 10,
    freeExperCampId: 1120,
    freeExperTime: 10 * 60,
    freeExperLevel: 1,
};
//
var playerSysIndex = {
    Begin: 1,
    Role: 1,
    Pet: 2,
    Xunlv: 3,
    TempCell: 4,
    End: 4,
};
// let playerSysName:any = {
// 	"Role",// : 1,
// 	"Pet",// : 2,
// 	"Xunlv",// : 3,
// 	"TempCell",// : 4,
// }
var playerSysName = {
    "Role": 1,
    "Pet": 2,
    "Xunlv": 3,
    "TempCell": 4,
};
var godEquip = {
    propertyCount: 3,
    typeRefineNum: 3,
    propertyRefineNum: 3,
};
//洗练类型
var godEquipRefineType = {
    typeRefine: 1,
    propertyRefine: 2,
};
//# sourceMappingURL=playerOptions.js.map