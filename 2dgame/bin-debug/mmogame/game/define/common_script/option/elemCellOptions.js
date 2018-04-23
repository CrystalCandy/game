// TypeScript file
////
//角色
var cellOptionsIndex = {
    Hero: 1,
    HeroEquip: 2,
    HeroSkill: 3,
    HeroRide: 4,
    HeroWing: 5,
    Pet: 6,
    PetSkill: 7,
    PetTongLin: 8,
    PetSouHun: 9,
    XianLv: 10,
    XianLvStart: 11,
    XianLvFaZhen: 12,
    XianLvXianWei: 13,
    TianXian: 14,
    TianXianWeapon: 15,
    TianXianDanYao: 16,
    TianXianJingMai: 17,
    TianNv: 18,
    TianNvXianQi: 19,
    TianNvHuaNian: 20,
    TianNvLingQi: 21,
};
var cellOptionsName = [
    "Hero",
    "HeroEquip",
    "HeroSkill",
    "HeroRide",
    "HeroWing",
    "Pet",
    "PetSkill",
    "PetTongLin",
    "PetSouHun",
    "XianLv",
    "XianLvStart",
    "XianLvFaZhen",
    "XianLvXianWei",
    "TianXian",
    "TianXianWeapon",
    "TianXianDanYao",
    "TianXianJingMai",
    "TianNv",
    "TianNvXianQi",
    "TianNvHuaNian",
    "TianNvLingQi",
];
var tempCellList = [
    cellOptionsIndex.HeroRide,
    cellOptionsIndex.HeroWing,
    cellOptionsIndex.PetTongLin,
    cellOptionsIndex.PetSouHun,
    cellOptionsIndex.XianLvFaZhen,
    cellOptionsIndex.XianLvXianWei,
    cellOptionsIndex.TianXian,
    cellOptionsIndex.TianXianWeapon,
];
var simpleCellList = [
    cellOptionsIndex.TianXianDanYao,
    cellOptionsIndex.TianXianJingMai,
];
var funOptionsIndex = {
    ShowIndex: 1,
    UpgradeStage: 2,
    SkillCase: 3,
    EquipCase: 4,
    AbilityDrug: 5,
    Skip: 6,
    Shape: 7,
    GrowAdd: 8,
    UpStart: 9,
    WashSkill: 10,
    CombatPos: 11,
};
var funOptionsName = [
    "ShowIndex",
    "UpgradeStage",
    "SkillCase",
    "EquipCase",
    "AbilityDrug",
    "Skip",
    "Shape",
    "GrowAdd",
    "UpStart",
    "WashSkill",
    "CombatPos",
];
//升阶
var elemUpgradeStageOptions = (_a = {},
    //['csv'] : csv.FunUpgradeStage,
    //最高等级 ，扣资源的标志
    _a[cellOptionsIndex.HeroRide] = (_b = {}, _b['MaxLevel'] = 6, _b),
    _a[cellOptionsIndex.HeroWing] = (_c = {}, _c['MaxLevel'] = 6, _c),
    _a);
//装备栏//-
var elemEquipCaseElemConfig = (_d = {},
    //['csv'] : csv.FunEquipCase,
    //有多少个部位// 
    _d[cellOptionsIndex.HeroEquip] = (_e = {}, _e['MaxNum'] = 10, _e),
    _d[cellOptionsIndex.HeroRide] = (_f = {}, _f['MaxNum'] = 4, _f),
    _d);
//技能栏//-
var elemSkillCaseElemConfig = (_g = {},
    //['csv'] : csv.FunSkillCase,
    //有多少个部位////最高等级
    _g[cellOptionsIndex.HeroWing] = (_h = {}, _h['MaxNum'] = 4, _h['MaxLevel'] = 40, _h),
    _g[cellOptionsIndex.HeroRide] = (_j = {}, _j['MaxNum'] = 4, _j['MaxLevel'] = 40, _j),
    _g);
//属性丹
var elemAbilityDrugOptions = (_k = {},
    //['csv'] : csv.FunAbilityDrug,
    //最高用多少个
    _k[cellOptionsIndex.HeroWing] = (_l = {}, _l['MaxLevel'] = 40, _l),
    _k[cellOptionsIndex.HeroRide] = (_m = {}, _m['MaxLevel'] = 40, _m),
    _k);
//皮肤//
var elemSkipOptions = (_o = {},
    //['csv'] : csv.FunSkin,
    //最高用多少个
    _o[cellOptionsIndex.HeroWing] = (_p = {}, _p['MaxNum'] = 10, _p),
    _o[cellOptionsIndex.HeroRide] = (_q = {}, _q['MaxNum'] = 10, _q),
    _o);
//外形//
var elemShapeOptions = (_r = {},
    //['csv'] : csv.FunShape,
    //最高用多少个
    _r[cellOptionsIndex.HeroWing] = (_s = {}, _s['MaxNum'] = 10, _s),
    _r[cellOptionsIndex.HeroRide] = (_t = {}, _t['MaxNum'] = 10, _t),
    _r);
//-技能圈////-
var elemSkillLoopOptions = (_u = {},
    //['csv'] : csv.FunSpendMoneyItem,
    //最高用多少个
    _u[cellOptionsIndex.HeroSkill] = (_v = {}, _v['MaxNum'] = 8, _v['MaxLevel'] = 100, _v['UnlockLevel'] = [1, 5, 10, 15, 20, 10000, 10001, 10002], _v),
    _u);
//宠物资质提升//
var elemGrowAddOptions = {};
//仙侣升星//
var elemUpStartOptions = (_w = {},
    //['csv'] : csv.FunUpStart,
    //最高用多少个
    _w[cellOptionsIndex.XianLvStart] = (_x = {}, _x['MaxNum'] = 6, _x),
    _w);
//宠物技能洗练//
var elemWashSkillOptions = (_y = {},
    //['csv'] : csv.FunSkillWash,
    //洗练星级最多7级，当洗200次是升为2级，当洗500次时升为3级..+//锁定一个技能需要50元宝，锁定两个需要70...+
    _y[cellOptionsIndex.PetSkill] = (_z = {}, _z['MaxNum'] = 6, _z['HighAddNum'] = 10, _z['MaxStart'] = 7, _z['StartArea'] = [200, 500, 1000, 1500, 2000, 2500], _z['LockSpend'] = [50, 70, 100, 150, 200], _z),
    _y);
//铸造功能//////
var elemForgeNames = [
    'qianghua',
    'jinglian',
    'duanlian',
    'baoshi',
];
var elemForgeIndexs = (_0 = {},
    _0['qianghua'] = 1,
    _0['jinglian'] = 2,
    _0['duanlian'] = 3,
    _0['baoshi'] = 4,
    _0);
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
// let elemForgeOptions:any = {
//  PartNum:any : {10, 10, 10, 10},//每个玩法有10个升级部分
// }
//# sourceMappingURL=elemCellOptions.js.map