//每一类的effect要实现的接口
var buffEffectFunOptions = {
    //伤害与暴击
    immunizeDamage: 11,
    unableDamage: 12,
    acceptDamageAddition: 13,
    castDamageAddition: 14,
    immunizeCritical: 15,
    unableCritical: 16,
    acceptCriticalAddition: 17,
    castCriticalAddition: 18,
    dmgFloatCalc: 19,
    //反震,物理反击,魔法反击,连击
    canAntiDamage: 20,
    immunizeAntiDamage: 21,
    // canPhysicalAnti							:		22,	//可以物理反击吗。有物理反击buf,且受到移动物理伤害或普通攻击　且对方没有偷袭
    // immunizePhysicalAnti				:		23,	//免疫物理反击吗
    // canSpellAnti								:		24,	//可以法术反击吗。有法术反击buf,且受到移动物理伤害或普通攻击　且对方没有偷袭
    // immunizeSpellAnti						:		25,	//免疫法术反击吗
    checkCounter: 22,
    immunizeCounter: 23,
    immunizeSkill: 24,
    canSeries: 26,
    immunizeSeries: 27,
    forbidImmunizeSeries: 28,
    canSuckBlood: 29,
    immunizeSuckBlood: 30,
    canFightInNight: 31,
    elemDamageToRestore: 32,
    hideMyself: 33,
    seeHideTarget: 34,
    notAcceptBuff: 35,
    notAcceptRestore: 36,
    canChase: 37,
    afterSkillExecute: 38,
    combatStartAddBuf: 40,
    currentBoutStartChangeHPMP: 41,
    //dot hot//
    eachBoutStartExecute: 42,
    eachBoutEndExecute: 43,
    //buff debuff
    bufInitExecute: 44,
    getSkillCostPercent: 45,
    //封印
    modifyCommand: 46,
    fixTarget: 47,
    fixTargetFromMe: 48,
    fixBuffBout: 49,
    //回复													
    immunizeRestore: 50,
    acceptRestoreAddition: 51,
    forbidReborn: 52,
    // 伤害附加效果
    dmgExecute: 55,
    revcDmgExecute: 56,
    buffInfect: 57,
    checkTriggerTimes: 58,
    eachBoutEndPurgeBuff: 59,
    deathHandle: 60,
    fixHitRate: 61,
    useMedicine: 62,
    acceptMedicine: 63,
    defanceCmdEffect: 64,
};
//状态触发时机
var buffEffectTime = {
    NONE: 1,
    APPLY: 2,
    REMOVE: 3,
    DEAD: 4,
    DAMAGE: 5,
    INTERVAL: 6,
    Critial: 7,
    BeCritial: 8,
};
var bufDisappearOptions = (_a = {},
    _a['FIGHT_NEVER'] = 1,
    _a['FIGHT_BOUT_END'] = 2,
    _a['FIGHT_BOUT_START'] = 3,
    _a['FIGHT_COMMAND'] = 4,
    _a['FIGHT_TIME'] = 5,
    _a['FIGHT_BOUT_END_DYNAMIC'] = 6,
    _a['FIGHT_BOUT_START_DYNAMIC'] = 7,
    _a['LIVE_NEVER'] = 11,
    _a['LIVE_TIME'] = 12,
    _a);
var buffTypeOptions = (_b = {},
    _b['Buff'] = 1,
    _b['DeBuff'] = 2,
    _b['Hot'] = 3,
    _b['Dot'] = 4,
    _b['Seal'] = 5,
    _b['Null'] = 6,
    _b);
var buffStackOptions = {
    Normal: 1,
    Replace: 2,
    Stack: 3,
    Unique: 4,
};
//回合开始：即是在回合的开始时状态会发挥效用。
//回合结束：即是在回合的结束时状态会发挥效用。
//动作执行前：在状态拥有者的动作执行前发挥效用。
//动作执行后：在状态拥有者的动作执行后发挥效用。
//受击后：在状态拥有者在受击后发挥效用。
//条件决定：在状态拥有者满足状态判断条件时发挥效用
var buffEvent = {
    BOUT_BEGIN: 1,
    BOUT_END: 2,
    ON_TIME: 3,
    FIGHT_BEGIN: 4,
    ACTION_BEGIN: 5,
    ACTION_END: 6,
    DAMAGE: 7,
    APPLY_BUFF: 8,
    REVOKE_BUFF: 9,
    CAST_SKILL: 10,
    DIRECT_PHY_DAMAGE: 11,
    DIRECT_DAMAGE: 12,
    DEFENCE: 13,
    HP_CHANGE: 14,
    MP_CHANGE: 15,
    RP_CHANGE: 16,
    HEAL: 17,
    PURGE: 18,
    COUNTER: 19,
    DIRECT_DAMAGE_TARGET: 20,
    DIE: 21,
    DIRECT_PHY_DAMAGE_TARGET: 22,
    KILL_TARGET: 23,
    DIRECT_MAG_DAMAGE: 24,
    DIRECT_MAG_DAMAGE_TARGET: 25,
    SHIFT_TARGET: 26,
    CRITICAL: 27,
    ADD_EFFECT: 99,
    // live buff event
    FIGHT_END: 1001,
    USED: 1002,
    LOGIN: 1003,
};
var buffType = {
    ZHOU_SHU: 1,
    ZHONG_DU: 2,
    WU_LI: 3,
    FENG_YIN: 4,
    TE_SHU: 5,
    ALL: 100,
};
var buffKind = {
    POSITIVE: 1,
    NEGATIVE: 2,
    NEUTRAL: 3,
};
var buffIgnore = {
    PropRang: 1,
    Buff: 3,
    Element: 2,
    Command: 4,
    Target: 5,
};
var buffConst = {
    ADD_EFFECT_INDEX: 99,
    FIRE_ARG_INDEX: 100,
    GENERAL_ATTACK_IHNDEX: 300,
    PARAM_NUM: 101,
};
var buffEventName = {};
for (var k in buffEvent) {
    var v = buffEvent[k];
    buffEventName[v] = k;
}
// param 目前只有封印效果
var paramEffect = {
    ATTACK: 3,
    SKILL: 4,
    DEFENCT: 5,
    ITEM: 6,
    ESCAPE: 7,
    PROTECT: 8,
    CATCH: 9,
    CALL: 10,
    RECALL: 11,
    UNABLE_PHYSICAL: 31,
    UNABLE_SPELL: 32,
    UNABLE_SUNDER: 41,
    UNABLE_WIND: 42,
    UNABLE_WHATER: 43,
    UNABLE_FIRE: 44,
    UNABLE_EARTH: 45,
};
////////////////////////////////////////////////////////////////////////////////
//live buff config
////////////////////////////////////////////////////////////////////////////////
//状态持续种类
var configBuffType = {
    NO_TIME: 1,
    ONLINE_TIME: 2,
    REAL_TIME: 3,
    DECREASE_TIME: 4,
};
//状态
var configBuff = (_c = {},
    //[1] : {buffId : 1, buffName : "last", buffType : configBuffType.NO_TIME, buffLife : 0},
    //[2] = {buffId : 2, buffName : "online", buffType : configBuffType.ONLINE_TIME, buffLife : 20},
    //[3] = {buffId : 3, buffName : "real", buffType : configBuffType.REAL_TIME, buffLife : 20},
    //恶人
    _c[1] = { buffId: 1, buffName: "robber", buffType: configBuffType.ONLINE_TIME, buffLife: 0 },
    //天罚
    _c[2] = { buffId: 2, buffName: "tianfa", buffType: configBuffType.ONLINE_TIME, buffLife: 15, client: true },
    //猎杀者
    _c[3] = { buffId: 3, buffName: "lieshazhe", buffType: configBuffType.NO_TIME, buffLife: 0, client: true },
    //幸运星
    _c[4] = { buffId: 4, buffName: "xingyunxing", buffType: configBuffType.NO_TIME, buffLife: 0, client: true },
    //狂怒
    _c[5] = { buffId: 5, buffName: "kuangnu", buffType: configBuffType.NO_TIME, buffLife: 0, client: true },
    //不死
    _c[6] = { buffId: 6, buffName: "busi", buffType: configBuffType.NO_TIME, buffLife: 0, client: true },
    //鼓舞
    _c[7] = { buffId: 7, buffName: "guwu", buffType: configBuffType.ONLINE_TIME, buffLife: 180, client: true },
    //PK惩罚
    _c[9] = { buffId: 9, buffName: "killer", buffType: configBuffType.DECREASE_TIME, buffLife: 0, period: 90 },
    //围城鼓舞
    _c[8] = { buffId: 8, buffName: "msguwu", buffType: configBuffType.ONLINE_TIME, buffLife: 180, client: true },
    _c[10] = { buffId: 10, buffName: "rmjis", buffType: configBuffType.ONLINE_TIME, buffLife: 8, client: true },
    _c[11] = { buffId: 11, buffName: "rmds", buffType: configBuffType.ONLINE_TIME, buffLife: 8, client: true },
    _c[12] = { buffId: 12, buffName: "rmxf", buffType: configBuffType.ONLINE_TIME, buffLife: 15, client: true },
    _c[13] = { buffId: 13, buffName: "rmjas", buffType: configBuffType.ONLINE_TIME, buffLife: 10, client: true },
    _c[14] = { buffId: 14, buffName: "rmmy", buffType: configBuffType.ONLINE_TIME, buffLife: 8, client: true },
    _c[15] = { buffId: 15, buffName: "slguwu", buffType: configBuffType.ONLINE_TIME, buffLife: 180, client: true },
    _c[16] = { buffId: 16, buffName: "halloween", buffType: configBuffType.ONLINE_TIME, buffLife: 7200, client: true },
    _c[17] = { buffId: 17, buffName: "pkprotect", buffType: configBuffType.ONLINE_TIME, buffLife: 3600, client: true },
    _c[18] = { buffId: 18, buffName: "tryride", buffType: configBuffType.REAL_TIME, buffLife: 1800, client: true },
    //
    _c[19] = { buffId: 19, buffName: "sqgz", buffType: configBuffType.ONLINE_TIME, buffLife: 180, client: true },
    _c[20] = { buffId: 20, buffName: "rexue", buffType: configBuffType.ONLINE_TIME, buffLife: 180, client: true },
    _c[21] = { buffId: 21, buffName: "qiangz", buffType: configBuffType.ONLINE_TIME, buffLife: 180, client: true },
    _c[22] = { buffId: 22, buffName: "xianjin", buffType: configBuffType.ONLINE_TIME, buffLife: 8, client: true },
    _c[23] = { buffId: 23, buffName: "yinshen", buffType: configBuffType.ONLINE_TIME, buffLife: 60, client: true },
    _c[24] = { buffId: 24, buffName: "jskf", buffType: configBuffType.ONLINE_TIME, buffLife: 180, client: true },
    _c[25] = { buffId: 25, buffName: "guard", buffType: configBuffType.ONLINE_TIME, buffLife: 600, client: true },
    _c[26] = { buffId: 26, buffName: "shapeshifting", buffType: configBuffType.ONLINE_TIME, buffLife: 31, client: true },
    _c[27] = { buffId: 27, buffName: "lostDebuff", buffType: configBuffType.REAL_TIME, buffLife: 1800, client: true },
    _c[28] = { buffId: 28, buffName: "robberDead", buffType: configBuffType.REAL_TIME, buffLife: 0, client: false },
    _c);
var configBuffName = {};
for (var k in configBuff) {
    var v = configBuff[k];
    configBuffName[v.buffName] = v;
}
var _a, _b, _c;
//# sourceMappingURL=buffOptions.js.map