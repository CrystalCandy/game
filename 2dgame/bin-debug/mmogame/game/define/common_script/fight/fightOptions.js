//damageTypeOptions = 
//{
//	PHYSICAL : 1,//phyDem物理伤害加成
//	SPELL    : 2,//法术伤害加成
//	FIXED    : 3,//固定数值伤害加成
//	HIDE     : 4,//暗器伤害加成
//	SPECIAL  : 5,//特殊固定伤害加成
//	DOT      : 6,//dot伤害伤害	
//}
//damageTypeToIdOptions =
//{
//	['PHYSICAL'] : 1,//phyDem物理伤害
//	['SPELL']    : 2,//法术伤害
//	['FIXED']    : 3,//固定数值伤害
//	['HIDE']     : 4,//暗器伤害
//	['SPECIAL']  : 5,//特殊固定伤害
//	['DOT']      : 6,//dot伤害	
//}
//criticalTypeOptions =
//{
//	PHYSICAL : 1,//物理暴击
//	SPELL    : 2,//法术暴击
//	HIDE     : 3,//暗器暴击
//}
//criticalTypeToIdOptions =
//{
//	['PHYSICAL'] : 1,//物理暴击
//	['SPELL']    : 2,//法术暴击
//	['HIDE']     : 3,//暗器暴击
//}
//restoreTypeOptions = 
//{
//	HP		: 1,	//生命
//	MP		: 2,	//魔法
//	MHP		: 3,	//内伤
//	RP		: 4,	//怒气
//}
//restoreTypeToIdOptions = 
//{
//	['HP']		: 1,	//生命
//	['MP']		: 2,  //魔法
//	['MHP']		: 3,  //内伤
//	['RP']		: 4,  //怒气
//}
var combatOptions = {
    maxRP: 150,
    maxMP: 100,
    lostHpAddRp: 0.0133,
};
//fightOptions = 
//{
//	FCMD_IDEL         : 1,   //待机
//	FCMD_MOVE         : 2,   //移动
//	FCMD_ATTACK       : 3,   //攻击
//	FCMD_SPELL        : 4,   //技能
//	FCMD_DEFENCE      : 5,   //防御
//	FCMD_USEITEM      : 6,   //道具
//	FCMD_ESCAPE       : 7,   //逃跑
//	FCMD_PROTECT      : 8,   //保护
//	FCMD_CATCH        : 9,   //收服
//	FCMD_CALL         : 10,  //召唤
//	FCMD_BACK         : 11,  //召还
//	FCMD_SPECIALSPELL :	12,  //特效
//}
//commandNameToIdOptions =
//{
//	['IDEL'] 					:	fightOptions.FCMD_IDEL						,			//待机
//	['MOVE'] 					:	fightOptions.FCMD_MOVE						, 			//移动
//	['ATTACK'] 				:	fightOptions.FCMD_ATTACK					, 			//攻击
//	['SPELL'] 				:	fightOptions.FCMD_SPELL					, 			//技能
//	['DEFENCE'] 			:	fightOptions.FCMD_DEFENCE				,			//防御
//	['USEITEM'] 			:	fightOptions.FCMD_USEITEM				,			//道具
//	['ESCAPE'] 				:	fightOptions.FCMD_ESCAPE					,			//逃跑
//	['PROTECT'] 			:	fightOptions.FCMD_PROTECT				,			//保护
//	['CATCH'] 				:	fightOptions.FCMD_CATCH					, 			//收服
//	['CALL'] 					:	fightOptions.FCMD_CALL						,			//召唤
//	['BACK'] 					:	fightOptions.FCMD_BACK						,			//召还
//	['SPECIALSPELL'] 	:	fightOptions.FCMD_SPECIALSPELL		,			//特技
//}
// 测试用
//var fightOptionsName:any = {}
//for(let k in fightOptions){
//			let v = fightOptions[k]
//	fightOptionsName[v] = k
//}
var fightSide = {
    FIGHT_RIGHT: 1,
    FIGHT_LEFT: 2,
};
//位置配置
var fightPosConfig = {
    FRONT_ROW_BEGIIN: 1,
    FRONT_ROW_END: 6,
    MID_ROW_BEGIN: 7,
    MID_ROW_END: 12,
    BACK_ROW_BEGIN: 13,
    BACK_ROW_END: 18,
    //
    ALL_NORMAL_BEGIN: 1,
    ALL_NORMAL_END: 18,
    //
    SIDE_MAX_NUM: 9,
};
//五行属性( 1雷  2水 3火 4土）
//elementOptions = 
//{
//	NONE		:	0,
//	THUNDER		:	1,
//	WATER		:	2,
//	FIRE		:	3,
//	EARTH		:	4,
//}
//技能伤害类型
var opDamageElementName = (_a = {},
    _a['NONE'] = 0,
    _a['FIRE'] = 1,
    _a['ICE'] = 2,
    _a['HOLY'] = 3,
    _a['DARKLY'] = 4,
    _a);
// 目标类型
var opTarget = {
    CANNOT: 0,
    CAN: 1,
    NOEFFECT: 2,
};
var _a;
//移动方向
//opMoveDirection = 
//{
//	Up    : 1,
//	Down  : 2,
//	Left  : 3,
//	Right : 4,
//}
//var crossMap:any = {
//	{1, 4,  7},
//	{2, 5,  8},
//	{3, 6,  9},
//}
//
// var crossMap:any = {
// 	{1, 7,  13},
// 	{2, 8,  14},
// 	{3, 9,  15},
// 	{4, 10, 16},
// 	{5, 11, 17},
// 	{6, 12, 18},
// }
// var defaultFormation:any = {
// 	{-1, 0, 0}, {0, 0, 0},  {-1, 0, 0}, {0, 0, 0},  {-1, 0, 0}, {0, 0, 0},
// 	{0, 0, 0},  {-1, 0, 0}, {0, 0, 0},  {-1, 0, 0}, {0, 0, 0},  {-1, 0, 0},
// 	{-1, 0, 0}, {0, 0, 0},  {-1, 0, 0}, {0, 0, 0},  {-1, 0, 0}, {0, 0, 0},
// }
// var teamPosToDefaultFormationPos:any = {
// 	[1] : 2,
// 	[2] : 4,
// 	[3] : 6,
// 	[4] : 7,
// 	[5] : 9,
// 	[6] : 11,
// 	[7] : 14,
// 	[8] : 16,
// 	[9] : 18,
// }
//元素相克
//Earth地 Water水 Fire火 Wind风 Light光 Dark暗 None无属性
//elementRelateTable =
//{
//	['Earth'] : {['Earth']:0, ['Water']:1.1, ['Fire']:0, ['Wind']:0.833, ['Light']:0, ['Dark']:0, ['None']:0},
//	['Water'] = {['Earth']:0.909, ['Water']:0, ['Fire']:1.15, ['Wind']:0, ['Light']:0, ['Dark']:0, ['None']:0},
//	['Fire']  = {['Earth']:0, ['Water']:0.87, ['Fire']:0, ['Wind']:1.35, ['Light']:0, ['Dark']:0, ['None']:0},
//	['Wind']  = {['Earth']:1.2, ['Water']:0, ['Fire']:0.741, ['Wind']:0, ['Light']:0, ['Dark']:0, ['None']:0},
//	['Light'] = {['Earth']:0, ['Water']:0, ['Fire']:0, ['Wind']:0, ['Light']:0, ['Dark']:1.2, ['None']:0},
//	['Dark']  = {['Earth']:0, ['Water']:0, ['Fire']:0, ['Wind']:0, ['Light']:1.2, ['Dark']:0, ['None']:0},
//	['None']  = {['Earth']:0, ['Water']:0, ['Fire']:0, ['Wind']:0, ['Light']:0, ['Dark']:0, ['None']:0},
//} 
//# sourceMappingURL=fightOptions.js.map