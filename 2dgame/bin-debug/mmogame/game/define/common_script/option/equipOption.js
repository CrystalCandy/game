////////////////////////////////////////////////////////////////////////////////
//装备配置
////////////////////////////////////////////////////////////////////////////////
////////宠物装备//////////////////-
//////////////////////////////////-
var opPetEquipConfig = {
    MaxEnhanceLevel: 10,
    SplitNeedRmbGold: 0,
    SplitRatio: 0.7,
    LockNeedGold: 50,
    PromoteMaxLevel: 10,
    PromoteEnhanceLevel: 50,
    MaxLevel: 10,
    EquipResonateNum: 6,
    IdentifyCount: 3,
    StoneResonateNum: 3,
};
//宠物装备格子位置对应的装备
var opPetEquipPosIndex = (_a = {},
    _a[1] = "weapon",
    _a[2] = "cap",
    _a[3] = "cloth",
    _a[4] = "mask",
    _a[5] = "neck",
    _a[6] = "shoes",
    _a);
// 装备类型对应的位置索引
var opEquipTypeToIndex = (_b = {},
    _b[opItemType.ITEM_TYPE_WEAPON] = 1,
    _b[opItemType.ITEM_TYPE_CAP] = 2,
    _b[opItemType.ITEM_TYPE_CLOTH] = 3,
    _b[opItemType.ITEM_TYPE_MASK] = 4,
    _b[opItemType.ITEM_TYPE_NECK] = 5,
    _b[opItemType.ITEM_TYPE_SHOE] = 6,
    _b);
//装备品质
var opEquipQuality = {
    gray: 1,
    green: 2,
    blue: 3,
    purple: 4,
    gold: 5,
    red: 6,
    color: 7,
};
//
var configColorToQuality = (_c = {},
    _c['gray'] = opEquipQuality.gray,
    _c['green'] = opEquipQuality.green,
    _c['blue'] = opEquipQuality.blue,
    _c['purple'] = opEquipQuality.purple,
    _c['gold'] = opEquipQuality.gold,
    _c['red'] = opEquipQuality.red,
    _c['color'] = opEquipQuality.color,
    _c);
//法宝位置范围
var opTalismanEquipPos = {
    begin: 11,
    end: 14,
};
//装备收购系数
//opEquipBuyRatio = 
//{
//	[opEquipQuality.White]   : 1,      //灰色装备
//	[opEquipQuality.Green]   : 1.5,    //绿色装备	
//	[opEquipQuality.Blue]    : 2,      //蓝色装备
//	[opEquipQuality.Gold]    : 3,      //金色装备
//	[opEquipQuality.Orange]  : 3,      //套装(备用)
//}
var opLegendEquipStar = {
    Normal: 1,
    Senior: 2,
    Precious: 3,
    Holy: 4,
    Ultimate: 5,
};
var opEquipStarToQuality = (_d = {},
    _d[opLegendEquipStar.Normal] = opEquipQuality.White,
    _d[opLegendEquipStar.Senior] = opEquipQuality.Green,
    _d[opLegendEquipStar.Precious] = opEquipQuality.Blue,
    _d[opLegendEquipStar.Holy] = opEquipQuality.Gold,
    _d[opLegendEquipStar.Ultimate] = opEquipQuality.Orange,
    _d);
//评分系数
// let opLegendEquipScoreRatio:any = {
// 	[opLegendEquipStar.Normal]       : 0.5,
// 	[opLegendEquipStar.Senior]       : 1,
// 	[opLegendEquipStar.Precious]     : 1.5,
// 	[opLegendEquipStar.Holy]         : 2,
// 	[opLegendEquipStar.Ultimate]     : 2.5,
// }
//装备保存索引
var opEquipBuildConfig = {
    baseFactorValue: 1,
    lastFactorValue: 2,
    specialEffect: 3,
};
//特技分类索引
var opSpecialEffectIndex = {
    skill: 1,
    attri: 2,
};
var opSpeicalSkillId = {
    IgnoreUseLevel: 600169,
    upSkillLevel: 600180,
    splitRatio: 600175,
};
//鉴定生成特殊属性概率
var opSpecialBuildRate = {
    Normal: 0.25,
    Exquisite: 0.5,
};
//属性操作
var opEquipRebuildOperate = {
    Cast: 1,
    Refine: 2,
    Enhance: 3,
    Skill: 4,
};
//重塑消耗晶石
var opEquipCastNeedRmb = 20;
//装备类型对应的名字
var opEquipTypeToName = (_e = {},
    _e[opItemType.ITEM_TYPE_WEAPON] = "weapon",
    _e[opItemType.ITEM_TYPE_CLOTH] = "cloth",
    _e[opItemType.ITEM_TYPE_CAP] = "cap",
    _e[opItemType.ITEM_TYPE_SHOE] = "shoe",
    _e[opItemType.ITEM_TYPE_NECK] = "neck",
    _e[opItemType.ITEM_TYPE_MASK] = "mask",
    _e);
//多件装备共鸣所需要的装备数量
//装备共鸣类型
var opEquipResonateType = {
    resonateLevel: 1,
    resonateStone: 2,
};
//装备宝石基本配置
var opEquipStoneConfig = {
    MaxLevel: 12,
    OffRmbGold: 10,
    StrengthStar: 5,
    EnhanceLevel: 60,
    StoneResonateNum: 3,
    StoneResonateMinLevel: 3,
};
//装备品阶对应的宝石孔数
var opEquipStarToStoneCount = {};
//装备融合配置
var opEquipFuseConfig = {
    EnhancLevel: 80,
    StarLevel: 10,
    EquipStar: opLegendEquipStar.Holy,
    promateIndex: 4,
};
//鉴定消耗晶石
var opEquipIdentifyConfig = (_f = {},
    _f[opLegendEquipStar.Precious] = 200,
    _f[opLegendEquipStar.Holy] = 200,
    _f[opLegendEquipStar.Ultimate] = 200,
    _f);
//一键强化每个阶段的等级
var opEquipEnhanceStage = {
    One: 6,
    Two: 7,
    Three: 10,
};
//主属性计算公式(当前值)
//随机系数*基础值*词库等级修正 * (1 + 强化修正*强化系数)
function calcEquipBaseAtrri(baseWord, baseFactor, baseValue, enhanceRevise, enhanceAddRatio, levelRevise) {
    var fieldIndex = abilityNameToIndex[baseWord];
    if (!fieldIndex) {
        return;
    }
    var calcFinalValue = baseFactor * baseValue * levelRevise * (1 + enhanceRevise * enhanceAddRatio);
    calcFinalValue = tonumber(String.format("%.4f", calcFinalValue));
    return [fieldIndex, calcFinalValue];
}
//附加属性计算公式
//随即系数 * 基础值 * 词库等级修正
function calcEquipLastAttri(lastWord, lastFactor, lastValue, enhanceRevise, enhanceAddRatio, levelRevise) {
    var fieldIndex = abilityNameToIndex[lastWord];
    if (!fieldIndex) {
        return;
    }
    var calcFinalValue = lastFactor * lastValue * levelRevise;
    calcFinalValue = tonumber(String.format("%.4f", calcFinalValue));
    return [fieldIndex, calcFinalValue];
}
//暴击率/抗爆率
//暴击率=(攻击者暴击-受击者抗暴)/(1.02^(目标等级-1)*300+50)
function calcCriticalOrOpposeCriticalRate(criticalValueOrOpposeValue, level) {
    return (criticalValueOrOpposeValue - 0) / (Math.pow(1.02, level - 1) * 300 + 50);
}
//基本命中率 (角色基础命中率+命中值/(1.02^(角色等级-1)*450+75))
//基本命中率=命中值/(1.02^(被攻击目标等级-1)*450+75)
function calcDisplayHitRate(hitValue, level) {
    if (hitValue <= 0) {
        return 0;
    }
    var baseHitRate = 1;
    var hitRate = 1 + hitValue / (Math.pow(1.02, level - 1) * 450 + 75);
    return hitRate;
}
//基本闪避率
//基本闪避率=闪避值/(1.02^(角色等级-1)*450+75)
function calcDisplayMissRate(dodgeValue, level) {
    if (dodgeValue <= 0) {
        return 0;
    }
    var dodgeRate = dodgeValue / (Math.pow(1.02, level - 1) * 450 + 75);
    dodgeRate = Math.max(0, dodgeRate);
    return dodgeRate;
}
////////////////////////-精灵装备//////////////////////
//类型对应装备位置
var opFairyEquipTypeToIndex = (_g = {},
    _g[opItemType.ITEM_TYPE_FAIRY_CAP] = 1,
    _g[opItemType.ITEM_TYPE_FAIRY_WEAPON] = 2,
    _g[opItemType.ITEM_TYPE_FAIRY_CLOTH] = 3,
    _g[opItemType.ITEM_TYPE_FAIRY_SHOE] = 4,
    _g);
var opFairyEquipConfig = {
    PromoteMaxLevel: 10,
};
var opFairyEquipQuality = {
    Normal: 1,
    Senior: 2,
    Precious: 3,
};
var opFairyExchangeConfig = {
    Powder: 1,
    RMB: 2,
    needRMB: 450,
    needPowder: 60000,
};
////////////////////////-坐骑装备//////////////////////
//类型对应装备位置
var opRideEquipTypeToIndex = (_h = {},
    _h[opItemType.ITEM_TYPE_RIDE_CAP] = 1,
    _h[opItemType.ITEM_TYPE_RIDE_WEAPON] = 2,
    _h[opItemType.ITEM_TYPE_RIDE_CLOTH] = 3,
    _h[opItemType.ITEM_TYPE_RIDE_SHOE] = 4,
    _h);
var opRideEquipConfig = {
    PromoteMaxLevel: 10,
};
var opRideEquipQuality = {
    Normal: 1,
    Senior: 2,
    Precious: 3,
};
var opRideExchangeConfig = {
    Powder: 1,
    RMB: 2,
    needRMB: 450,
    needPowder: 60000,
};
var _a, _b, _c, _d, _e, _f, _g, _h;
//# sourceMappingURL=equipOption.js.map