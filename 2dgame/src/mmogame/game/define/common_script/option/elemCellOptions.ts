// TypeScript file
////
//角色
let cellOptionsIndex:any = {
	Hero : 1,//主角
	HeroEquip : 2, //主角装备
	HeroSkill : 3, //主角技能
	HeroRide : 4, //主角坐骑
	HeroWing : 5, //主角翅膀
	Pet : 6, //宠物
	PetSkill : 7,//宠物技能
	PetTongLin : 8,//宠物通灵
	PetSouHun : 9,//宠物兽魂
	XianLv : 10,//仙侣
	XianLvStart : 11,//仙侣升星
	XianLvFaZhen : 12,//仙侣法阵
	XianLvXianWei : 13,//仙侣仙位
	TianXian : 14,//天仙
	TianXianWeapon : 15,//天仙神兵
	TianXianDanYao : 16,//天仙丹药
	TianXianJingMai : 17,//天仙经脉
	TianNv : 18,//天女
	TianNvXianQi : 19,//天女仙器
	TianNvHuaNian : 20,//天女花辇
	TianNvLingQi : 21,//天女灵气
}

let cellOptionsName:any = [
	"Hero",// : 1,//主角
	"HeroEquip",// : 2, //主角装备
	"HeroSkill",// : 3, //主角技能
	"HeroRide",// : 4, //主角坐骑
	"HeroWing",// : 5, //主角翅膀
	"Pet",// : 6, //宠物
	"PetSkill",// : 7,//宠物技能
	"PetTongLin",// : 8,//宠物通灵
	"PetSouHun",// : 9,//宠物兽魂
	"XianLv",// : 10,//仙侣
	"XianLvStart",// : 11,//仙侣升星
	"XianLvFaZhen",// : 12,//仙侣法阵
	"XianLvXianWei",// : 13,//仙侣仙位
	"TianXian",// : 14,//天仙
	"TianXianWeapon",// : 15,//天仙神兵
	"TianXianDanYao",// : 16,//天仙丹药
	"TianXianJingMai",// : 17,//天仙经脉
	"TianNv",// : 18,//天女
	"TianNvXianQi",// : 18,//天女仙器
	"TianNvHuaNian",// : 18,//天女花辇
	"TianNvLingQi",// : 18,//天女灵气
]

let tempCellList:any = [
	cellOptionsIndex.HeroRide,//主角坐骑
	cellOptionsIndex.HeroWing,//主角翅膀
	cellOptionsIndex.PetTongLin,//宠物通灵
	cellOptionsIndex.PetSouHun,//宠物兽魂
	cellOptionsIndex.XianLvFaZhen,//仙侣法阵
	cellOptionsIndex.XianLvXianWei,//仙侣仙位
	cellOptionsIndex.TianXian,//天仙
	cellOptionsIndex.TianXianWeapon,//天仙神兵
	//cellOptionsIndex.TianNvHuaNian,//天女花辇
	//cellOptionsIndex.TianNvLingQi,//天女灵气
]

let simpleCellList = [
	cellOptionsIndex.TianXianDanYao, //天仙丹药
	cellOptionsIndex.TianXianJingMai,//天仙经脉
]

let funOptionsIndex:any = {
	ShowIndex : 1,//外形显示//
	UpgradeStage : 2,//升阶
	SkillCase : 3,//技能栏//-
	EquipCase : 4,//装备栏//-
	AbilityDrug : 5,//属性丹
	Skip : 6,//皮肤//
	Shape : 7,//外形//
	GrowAdd : 8,//资质//
	UpStart : 9,//升星//
	WashSkill : 10,//技能洗练//
	CombatPos : 11, //出战位置
}

let funOptionsName:any = [
	"ShowIndex",// : 1,
	"UpgradeStage",// : 2,
	"SkillCase",// : 3,
	"EquipCase",// : 4,
	"AbilityDrug",// : 5,
	"Skip",// : 6,
	"Shape",// : 7,
	"GrowAdd",// : 8,
	"UpStart",// : 9,
	"WashSkill",// : 10,
	"CombatPos",// : 11, //出战位置
]


//升阶
let elemUpgradeStageOptions:any = {
//['csv'] : csv.FunUpgradeStage,
//最高等级 ，扣资源的标志
[cellOptionsIndex.HeroRide] : {['MaxLevel'] : 6},//主角坐骑 
[cellOptionsIndex.HeroWing] : {['MaxLevel'] : 6},//主角翅膀 
}

//装备栏//-
let elemEquipCaseElemConfig:any = {
//['csv'] : csv.FunEquipCase,
//有多少个部位// 
[cellOptionsIndex.HeroEquip] : {['MaxNum'] : 10},
[cellOptionsIndex.HeroRide] : {['MaxNum'] : 4},
}

//技能栏//-
let elemSkillCaseElemConfig:any = {
//['csv'] : csv.FunSkillCase,
//有多少个部位////最高等级
[cellOptionsIndex.HeroWing] : {['MaxNum'] : 4, ['MaxLevel'] : 40},
[cellOptionsIndex.HeroRide] : {['MaxNum'] : 4, ['MaxLevel'] : 40},
}

//属性丹
let elemAbilityDrugOptions:any = {
//['csv'] : csv.FunAbilityDrug,
//最高用多少个
[cellOptionsIndex.HeroWing] : {['MaxLevel'] : 40},
[cellOptionsIndex.HeroRide] : {['MaxLevel'] : 40},
}

//皮肤//
let elemSkipOptions:any = {
//['csv'] : csv.FunSkin,
//最高用多少个
[cellOptionsIndex.HeroWing] : {['MaxNum'] : 10},
[cellOptionsIndex.HeroRide] : {['MaxNum'] : 10},

}

//外形//
let elemShapeOptions:any = {
//['csv'] : csv.FunShape,
//最高用多少个
[cellOptionsIndex.HeroWing] : {['MaxNum'] : 10},
[cellOptionsIndex.HeroRide] : {['MaxNum'] : 10},

}

//-技能圈////-
let elemSkillLoopOptions:any = {
//['csv'] : csv.FunSpendMoneyItem,
//最高用多少个
[cellOptionsIndex.HeroSkill] : {['MaxNum'] : 8, ['MaxLevel'] : 100, ['UnlockLevel'] : [1, 5, 10, 15, 20,10000,10001,10002]}
}

//宠物资质提升//
let elemGrowAddOptions:any = {
//['csv'] : csv.FunGrowAdd,
}
//仙侣升星//
let elemUpStartOptions:any = {
//['csv'] : csv.FunUpStart,
//最高用多少个
[cellOptionsIndex.XianLvStart] : {['MaxNum'] : 6}
}

//宠物技能洗练//
let elemWashSkillOptions:any = {
//['csv'] : csv.FunSkillWash,
//洗练星级最多7级，当洗200次是升为2级，当洗500次时升为3级..+//锁定一个技能需要50元宝，锁定两个需要70...+
[cellOptionsIndex.PetSkill] : {['MaxNum'] : 6, ['HighAddNum'] : 10, ['MaxStart'] : 7, ['StartArea'] : [200, 500, 1000, 1500, 2000, 2500], ['LockSpend'] : [50,70,100,150,200]}
}


//铸造功能//////
let elemForgeNames = [
	'qianghua',//强化
	'jinglian',//精炼
	'duanlian',//锻炼
	'baoshi',//宝石
]

let elemForgeIndexs:any = {
	['qianghua'] : 1,//强化
	['jinglian'] : 2,//精炼
	['duanlian'] : 3,//锻炼
	['baoshi'] : 4,//宝石
}

// let elemForgeOptions:any = {
//  PartNum:any : {10, 10, 10, 10},//每个玩法有10个升级部分
// }
