/*
作者:
    yangguiming

创建时间：
   2013.6.13(周四)

意图：
   静态图片定义

公共接口：
    
*/
//-任务模型定义
//PlayBodyDefine_ = 
//{
//	human_male_1 : 1,   //青衫客
//	human_male_2 : 2,
//   //狂刀将
//	human_female_1 : 3,
// //淑侠女
//	human_female_2 : 4,
// //灵飞燕
//	
//	fairy_male_1 : 5,   //飞羽灵
//	fairy_male_2 : 6,
//   //御天将
//	fairy_female_1 : 7, //轻舞蝶
//	fairy_female_2 : 8, //飞天娇
//	
//	demon_male_1 : 9,   //巨蛮力
//	demon_male_2 : 10,
//  //狮头魔
//	demon_female_1 : 11,//幽影姬
//	demon_female_2 : 12,//玉玲珑
//}
//
//playName_BodyDefine = 
//{
//	[PlayBodyDefine_.human_male_1] : "MOWUSHENG",
//	[PlayBodyDefine_.human_male_2] : "KUANGDAOKE",
//	[PlayBodyDefine_.demon_male_1] : "JUMANWANG",
//	[PlayBodyDefine_.demon_male_2] : "SHIMOGUAI",
//	[PlayBodyDefine_.fairy_male_1] : "XIANYULING",
//	[PlayBodyDefine_.fairy_male_2] : "YUTIANJIANG",
//	
//	[PlayBodyDefine_.human_female_1] : "QIANNVXIA",
//	[PlayBodyDefine_.human_female_2] : "YEFEIYIN",
//	[PlayBodyDefine_.fairy_female_1] : "XUANCAIDIE",
//	[PlayBodyDefine_.fairy_female_2] : "WUTIANJIAO",
//	[PlayBodyDefine_.demon_female_1] : "YOUYINGJI",
//	[PlayBodyDefine_.demon_female_2] : "MEIMAONV",
//}
//
//
//
//PlayModel_BodyDefine = 
//{
//	[PlayBodyDefine_.human_male_1] : 10001,
//	[PlayBodyDefine_.human_female_1] : 10001,
//	[PlayBodyDefine_.demon_male_1] : 10001,
//	[PlayBodyDefine_.demon_female_1] : 10001,
//	[PlayBodyDefine_.fairy_male_1] : 10001,
//	[PlayBodyDefine_.fairy_female_1] : 10001,
//	
//	[PlayBodyDefine_.human_male_2] : 10002,
//	[PlayBodyDefine_.human_female_2] : 10002,
//	[PlayBodyDefine_.demon_male_2] : 10002,
//	[PlayBodyDefine_.demon_female_2] : 10002,
//	[PlayBodyDefine_.fairy_male_2] : 10002,
//	[PlayBodyDefine_.fairy_female_2] : 10002,
//}
//PlayIcon_Define =
//{
//	[PlayBodyDefine_.human_male_1] : "player_icon_1",
//	[PlayBodyDefine_.human_male_2] : "player_icon_2",
//	[PlayBodyDefine_.human_female_1] : "player_icon_3",
//	[PlayBodyDefine_.human_female_2] : "player_icon_4",
//	
//	[PlayBodyDefine_.fairy_male_1] : "player_icon_5",
//	[PlayBodyDefine_.fairy_male_2] : "player_icon_6",
//	[PlayBodyDefine_.fairy_female_1] : "player_icon_7",
//	[PlayBodyDefine_.fairy_female_2] : "player_icon_8",
//	
//	
//	[PlayBodyDefine_.demon_male_1] : "player_icon_9",
//	[PlayBodyDefine_.demon_male_2] : "player_icon_10",
//	[PlayBodyDefine_.demon_female_1] : "player_icon_11",
//	[PlayBodyDefine_.demon_female_2] : "player_icon_12",
//}
ImportType(opEquipQuality);
function GetPlayerModelByBody(body) {
    //if(PlayModel_BodyDefine[body] != null ){
    //	return PlayModel_BodyDefine[body]
    //}else{
    //	return PlayModel_BodyDefine[PlayBodyDefine_.human_male_1]
    //}
    return 10002;
}
var PetQualityImage = (_a = {},
    _a[opPetQuality.gray] = "zy_zhiYeTextBg01",
    _a[opPetQuality.green] = "zy_zhiYeTextBg02",
    _a[opPetQuality.blue] = "zy_zhiYeTextBg03",
    _a[opPetQuality.purple] = "zy_zhiYeTextBg04",
    _a[opPetQuality.gold] = "zy_zhiYeTextBg05",
    _a[opPetQuality.color] = "zy_zhiYeTextBg05",
    _a);
var TJPetQualityImage = (_b = {},
    _b[opPetQuality.gray] = "TJ_hui",
    _b[opPetQuality.green] = "TJ_lv",
    _b[opPetQuality.blue] = "TJ_lan",
    _b[opPetQuality.purple] = "TJ_zi",
    _b[opPetQuality.gold] = "TJ_jin",
    _b[opPetQuality.color] = "TJ_jin",
    _b);
var FightPetQualityImage = (_c = {},
    _c[opPetQuality.gray] = "kuang_1",
    _c[opPetQuality.green] = "kuang_2",
    _c[opPetQuality.blue] = "kuang_3",
    _c[opPetQuality.purple] = "kuang_4",
    _c[opPetQuality.gold] = "kuang_5",
    _c[opPetQuality.color] = "kuang_5",
    _c);
var FightPetQualityCase = (_d = {},
    _d[opPetQuality.gray] = "ty_pet_pinJieBg01",
    _d[opPetQuality.green] = "ty_pet_pinJieBg02",
    _d[opPetQuality.blue] = "ty_pet_pinJieBg03",
    _d[opPetQuality.purple] = "ty_pet_pinJieBg04",
    _d[opPetQuality.gold] = "ty_pet_pinJieBg05",
    _d[opPetQuality.color] = "ty_pet_pinJieBg05",
    _d);
var EquipQualityImage = (_e = {},
    _e[opEquipQuality.gray] = "ty_zhuangBeiBg01",
    _e[opEquipQuality.green] = "ty_zhuangBeiBg02",
    _e[opEquipQuality.blue] = "ty_zhuangBeiBg03",
    _e[opEquipQuality.purple] = "ty_zhuangBeiBg04",
    _e[opEquipQuality.gold] = "ty_zhuangBeiBg05",
    _e[opEquipQuality.red] = "ty_zhuangBeiBg06",
    _e[opEquipQuality.color] = "ty_zhuangBeiBg07",
    _e);
//LegendQualityImage = 
//{
//	[opLegendEquipStar.Normal] 	: "kuang_4",
//	[opLegendEquipStar.Senior]	: "kuang_5",
//	[opLegendEquipStar.Precious]: "kuang_7",
//	[opLegendEquipStar.Holy]: "kuang_7",
//}
//EquitQualityColor=
//{
//	[opEquipQuality.White] 		:	gui.Color.navajowhite,
//	[opEquipQuality.Blue] 		:	gui.Color.lime,
//	[opEquipQuality.Gold] 		:	gui.Color.cyan,
//	[opEquipQuality.Orange] 	:	gui.Color.orange,
//	[opEquipQuality.Green] 		:	gui.Color.magenta,
//}
//关卡奖励（可能的奖励）
var CampaignPrizeType = {
    MONEY: 1,
    YUANBAO: 2,
    EQUIP: 3,
    POWER: 4,
};
var CampaignPrizeImage = (_f = {},
    _f[CampaignPrizeType.MONEY] = "item_50001",
    _f[CampaignPrizeType.YUANBAO] = "item_50002",
    _f[CampaignPrizeType.EQUIP] = "item_50003",
    _f[CampaignPrizeType.POWER] = "item_50004",
    _f);
//战斗艺术字体
var FightFontText = (_g = {},
    _g["baoji"] = "baoJi",
    _g["mianyi"] = "wuDi",
    _g["shanbi"] = "shanBi",
    _g["xishou"] = "xiShou",
    _g["break"] = "beiDaDuan",
    _g["nagative"] = "wuMuBiao",
    _g);
var moneyIconConfig = (_h = {},
    _h[opItemUnit.FUNDS] = "#JINBI",
    _h[opItemUnit.BIND_CURRENCY] = "#BIND_YUANBAO",
    _h[opItemUnit.CURRENCY] = "#YUANBAO",
    _h[opItemUnit.POWER] = "#POWER",
    _h[opItemUnit.JJC_POINT] = "#JJC_POINT",
    //[opItemUnit.ROBBER_PIECES]	: "#ROBBER_PIECES",
    _h[opItemUnit.WUDOU_POINT] = "#WUDOU_POINT",
    _h[opItemUnit.WUDOUTEAM_POINT] = "#WUDOUTEAM_POINT",
    _h[opItemUnit.WUDOUSERVER_POINT] = "#GLOBAL_WPOINT",
    _h[opItemUnit.ZHENXING_POINT] = "#CAMP_POINT",
    _h[opItemUnit.HONOR_POINT] = "#HONORPOINT",
    _h[opItemUnit.LEAGUE_POINT] = "#GLOBAL_LPOINT",
    _h[opItemUnit.GUOZHAN_POINT] = "#NATION_WAR_ICON",
    _h[opItemUnit.FACTION_POINT] = "#FACTION_BUILD_POINT",
    _h);
// let WingTotemImage:any = {
// 	//速度
// 	[objectField.WING_FIELD_TOTEM_SPEED_DEC] : 
// 		{
// 			[opWingTotemQuality.gray]    : "tt_tuTeng03_1",
// 			[opWingTotemQuality.green]   : "tt_tuTeng03_2",
// 			[opWingTotemQuality.blue]    : "tt_tuTeng03_3",
// 			[opWingTotemQuality.purple]  : "tt_tuTeng03_4",
// 			[opWingTotemQuality.gold]    : "tt_tuTeng03_5",
// 			[opWingTotemQuality.colour]  : "tt_tuTeng03_6",
// 		},
// 	//暴伤减免
// 	[objectField.WING_FIELD_TOTEM_CRI_ATT_DEC] : 
// 		{
// 			[opWingTotemQuality.gray]    : "tt_tuTeng01_1", 
// 			[opWingTotemQuality.green]   : "tt_tuTeng01_2", 
// 			[opWingTotemQuality.blue]    : "tt_tuTeng01_3", 
// 			[opWingTotemQuality.purple]  : "tt_tuTeng01_4", 
// 			[opWingTotemQuality.gold]    : "tt_tuTeng01_5", 
// 			[opWingTotemQuality.colour]  : "tt_tuTeng01_6", 
// 		},
// 	//抗暴
// 	[objectField.WING_FIELD_TOTEM_CRITICAL_DEC] : 
// 		{
// 			[opWingTotemQuality.gray]    : "tt_tuTeng02_1", 
// 			[opWingTotemQuality.green]   : "tt_tuTeng02_2", 
// 			[opWingTotemQuality.blue]    : "tt_tuTeng02_3", 
// 			[opWingTotemQuality.purple]  : "tt_tuTeng02_4", 
// 			[opWingTotemQuality.gold]    : "tt_tuTeng02_5", 
// 			[opWingTotemQuality.colour]  : "tt_tuTeng02_6", 
// 		},
// 	////伤害减免
// 	//[objectField.WING_FIELD_TOTEM_DAMAGE_DEC] = 
// 	//	{
// 	//		[opWingTotemQuality.gray]    : "tt_tuTeng04_1", 
// 	//		[opWingTotemQuality.green]   : "tt_tuTeng04_2", 
// 	//		[opWingTotemQuality.blue]    : "tt_tuTeng04_3", 
// 	//		[opWingTotemQuality.purple]  : "tt_tuTeng04_4", 
// 	//		[opWingTotemQuality.gold]    : "tt_tuTeng04_5", 
// 	//		[opWingTotemQuality.colour]  : "tt_tuTeng04_6", 
// 	//	},
// }
// let WingTotemImageSelect:any = {
// 	[objectField.WING_FIELD_TOTEM_SPEED_DEC] : "tt_tuTengXZ03",
// 	[objectField.WING_FIELD_TOTEM_CRI_ATT_DEC] : "tt_tuTengXZ01",
// 	[objectField.WING_FIELD_TOTEM_CRITICAL_DEC] : "tt_tuTengXZ02", 
// 	//[objectField.WING_FIELD_TOTEM_DAMAGE_DEC] : "tt_tuTengXZ04",
// }		      
var ProfessionQualityIcon = (_j = {},
    _j[opPetQuality.gray] = "ty_pet_pinJieBg01",
    _j[opPetQuality.green] = "ty_pet_pinJieBg02",
    _j[opPetQuality.blue] = "ty_pet_pinJieBg03",
    _j[opPetQuality.purple] = "ty_pet_pinJieBg04",
    _j[opPetQuality.gold] = "ty_pet_pinJieBg05",
    _j[opPetQuality.color] = "ty_pet_pinJieBg06",
    _j);
var ProfessionQualityNameBG = (_k = {},
    _k[opPetQuality.gray] = "zy_zhiYeTextBg01",
    _k[opPetQuality.green] = "zy_zhiYeTextBg02",
    _k[opPetQuality.blue] = "zy_zhiYeTextBg03",
    _k[opPetQuality.purple] = "zy_zhiYeTextBg04",
    _k[opPetQuality.gold] = "zy_zhiYeTextBg05",
    _k[opPetQuality.color] = "zy_zhiYeTextBg05",
    _k);
var ProfessionQualityBG = (_l = {},
    _l[opPetQuality.gray] = "ty_petTextDi01",
    _l[opPetQuality.green] = "ty_petTextDi02",
    _l[opPetQuality.blue] = "ty_petTextDi03",
    _l[opPetQuality.purple] = "ty_petTextDi04",
    _l[opPetQuality.gold] = "ty_petTextDi05",
    _l[opPetQuality.color] = "ty_petTextDi05",
    _l);
var PlayerStatusToName = (_m = {},
    _m[opStatusType.STATUS_TYPE_TICKET] = "BROKENHISTORY_TXT40",
    _m[opStatusType.STATUS_TYPE_EREN] = "BROKENHISTORY_TXT41",
    _m[opStatusType.STATUS_TYPE_BAOTU] = "BROKENHISTORY_TXT42",
    _m[opStatusType.STATUS_TYPE_MOTOU] = "BROKENHISTORY_TXT43",
    _m[opStatusType.STATUS_TYPE_TEAMMATE] = "BROKENHISTORY_TXT44",
    _m[opStatusType.STATUS_TYPE_ROBBER_BBOX] = "BROKENHISTORY_TXT54",
    _m[opStatusType.STATUS_TYPE_FACT_WAR] = "BROKENHISTORY_TXT40",
    _m);
//状态对应图标
var PlayerStatusToImage = (_o = {},
    _o[opStatusType.STATUS_TYPE_FIGHT] = "TB_zhanDou",
    _o[opStatusType.STATUS_TYPE_TICKET] = "TB_lingPai",
    _o[opStatusType.STATUS_TYPE_EREN] = "TB_eRen",
    _o[opStatusType.STATUS_TYPE_BAOTU] = "TB_baoTu",
    _o[opStatusType.STATUS_TYPE_MOTOU] = "TB_moTou",
    _o[opStatusType.STATUS_TYPE_TEAM] = "TB_duiZhang",
    _o[opStatusType.STATUS_TYPE_TEAMMATE] = "TB_duiYuan",
    _o[opStatusType.STATUS_TYPE_ROBBER_BBOX] = "TB_xuRuo",
    _o[opStatusType.STATUS_TYPE_EMPTY_FIGHT] = "TB_ShengDiGuaJi",
    _o[opStatusType.STATUS_TYPE_FACT_WAR] = "TB_junTuanZhan",
    _o);
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
//# sourceMappingURL=StaticImageDefine.js.map