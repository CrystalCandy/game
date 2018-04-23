ImportType(powerEffects);
ImportType(objectType);
ImportType(combatOptions);
//客户端专属定义
powerEffects.EFFECT_FREEZE_VIEW = 121; ////战斗画面冻结{effect, targetId}
powerEffects.EFFECT_CLIENT_FIGHT_END = 122; ////客户端战斗结束{effect, targetId}
powerEffects.EFFECT_CLIENT_FIGHT_DIALOG = 123; ////客户端战斗暂停出对话{effect, targetId, status}
opFightResultType.FIGHT_TYPE_CLIENT = 99; //客户端表演战斗的战斗类型
objectType.OBJECT_TYPE_FUNNAL = objectType.OBJECT_TYPE_WING; //8 只用于客户端的模拟对象，浮游炮（翅膀）
objectType.OBJECT_TYPE_HELPER = -1; //只用于客户端的援助（分身-半透明）对象类型
objectType.OBJECT_TYPE_GHOST = -2; //只用于客户端的援助（分身）对象类型
objectType.OBJECT_TYPE_FULLHELPER = -3; //只用于客户端的援助（分身-不透明）对象类型
objectType.OBJECT_TYPE_PET_HELPER = -4; //只用于客户端的援助（分身-半透明）对象类型——当部下对待
objectType.OBJECT_TYPE_TELEPORT = -5; //只用于客户端的召唤（分身-不透明-从上面瞬移）对象类型
//opFightType.FIGHT_TYPE_RELIC = opFightType.FIGHT_TYPE_RELIC_PVP
var ACTION_PARAM_COUNT = 15;
var MaxShowTime = 5000; //战斗表演最大时间
var MaxActionTime = 5000; //元素表演时间
var FUNNAL_ACTOR_POS = 20; //浮游炮（翅膀）的站位
var ROLE_MP_MAX = combatOptions.maxMP;
var FIGHT_COMBAT_ACTOR_COUNT = 3;
var FIGHT_COMBAT_ROW_COUNT = 6;
var FIGHT_MAP_ANGLE = -Math.PI / 6;
var FIGHT_CENTER_X = 320;
var FIGHT_CENTER_Y = 450;
//fight_action_template = 
//{
//    //起手
//		["elem_list_ready"] : {},
//		//表演
//		["elem_list_show"] = {},
//		//收手
//		["elem_list_}"] = {},
//}
//枚举行为元素
var ENUM_FIGHT_ACTION = (_a = {},
    _a["POWER"] = "Fight_ShowPowerAction",
    //人物动作
    _a["ACTOR_ATTACK"] = "Fight_ActorAttackAction",
    _a["ACTOR_RUSH"] = "Fight_ActorRushAction",
    //创建特效
    _a["EFFECT_ACTOR"] = "Fight_EffectActorAction",
    _a["EFFECT_MOVE"] = "Fight_EffectMoveAction",
    _a["EFFECT_SCENE"] = "Fight_EffectSceneAction",
    _a["EFFECT_SCREEN"] = "Fight_EffectScreenAction",
    //控制器
    _a["ALPHA"] = "Fight_AlphaAction",
    _a["FADE"] = "Fight_FadeAction",
    _a["MOVE"] = "Fight_MoveAction",
    _a["ROTATE"] = "Fight_RotateAction",
    _a["SCALE"] = "Fight_ScaleAction",
    _a["DIR"] = "Fight_DirAction",
    //屏幕相关
    _a["SCREEN_SHAKE"] = "Fight_ScreenShakeAction",
    _a["SCREEN_BLACK"] = "Fight_ScreenBlackAction",
    _a["SCREEN_IMAGE"] = "Fight_ScreenImageAction",
    _a["CAMERA_ZOOM"] = "Fight_CameraZoomAction",
    _a["CAMERA_MOVE"] = "Fight_CameraMoveAction",
    _a["CAMERA_TRACE"] = "Fight_CameraTraceAction",
    _a["ATTACKED_PLAYANIM"] = "Fight_AttackedPlayAnimAction",
    _a["ATTACKED_KNOCKFLY"] = "Fight_AttackedKnockAction",
    _a["ATTACKED_BEATBACK"] = "Fight_AttackedBackAction",
    //声音
    _a["ADD_SOUND"] = "Fight_AddFightSound",
    _a);
var FIGHT_ACTOR_AI = (_b = {},
    _b[objectType.OBJECT_TYPE_PET] = "FightActorAI",
    _b[objectType.OBJECT_TYPE_FUNNAL] = "FightFunnalAI",
    _b[objectType.OBJECT_TYPE_HELPER] = "FightHelperAI",
    _b[objectType.OBJECT_TYPE_ASSIST] = "FightBackerAI",
    _b[objectType.OBJECT_TYPE_GHOST] = "FightGhostAI",
    _b[objectType.OBJECT_TYPE_FULLHELPER] = "FightHelperAI",
    _b[objectType.OBJECT_TYPE_PET_HELPER] = "FightHelperAI",
    _b[objectType.OBJECT_TYPE_TELEPORT] = "FightTeleportAI",
    _b);
//需要延迟表演result的actor类型，对应AI需要实现方法~AI.setBackerResult////delayBeginResult
var FIGHT_ACOTCONTROL_MAPPING = [
    objectType.OBJECT_TYPE_ASSIST,
    objectType.OBJECT_TYPE_TELEPORT,
    objectType.OBJECT_TYPE_FUNNAL,
];
//翅膀（浮游炮）id
var FIGHT_FUNNAL_ID = (_c = {},
    _c[fightSide.FIGHT_LEFT] = 1000,
    _c[fightSide.FIGHT_RIGHT] = 1001,
    _c);
//动作优先级,优先级越大越靠先执行
var FIGHT_ACTION_PRIORITY = (_d = {},
    _d["SCREEN_BLACK"] = 200,
    _d["ACTOR_ATTACK"] = 100,
    _d["ACTOR_RUSH"] = 100,
    _d["EFFECT_ACTOR"] = 80,
    _d["EFFECT_MOVE"] = 80,
    _d["EFFECT_SCENE"] = 80,
    _d["EFFECT_SCREEN"] = 80,
    _d);
var FIGHT_BLACK_SCREEN_TYPE = {
    CASTER: 0,
    TARGETLIST: 1,
    CASTER_TARGETLIST: 2,
    ALL_HIDE: 3,
};
var ENUM_FIGHT_POWER = (_e = {},
    _e[powerEffects.EFFECT_HP_PLUS] = "Fight_HPPower",
    _e[powerEffects.EFFECT_HP_LESS] = "Fight_HPPower",
    _e[powerEffects.EFFECT_MAXHP_PLUS] = "Fight_HPPower",
    _e[powerEffects.EFFECT_MAXHP_LESS] = "Fight_HPPower",
    //[powerEffects.EFFECT_CRIHP_PLUS] 	: "Fight_HPPower",
    //[powerEffects.EFFECT_CRIHP_LESS] 	: "Fight_HPPower",
    _e[powerEffects.EFFECT_MP_PLUS] = "Fight_MPPower",
    _e[powerEffects.EFFECT_MP_LESS] = "Fight_MPPower",
    _e[powerEffects.EFFECT_MP_VALUE] = "Fight_MPPower",
    _e[powerEffects.EFFECT_ABSORB] = "Fight_HPPower",
    _e[powerEffects.EFFECT_RP_PLUS] = "Fight_RPPower",
    _e[powerEffects.EFFECT_RP_LESS] = "Fight_RPPower",
    _e[powerEffects.EFFECT_RP_VALUE] = "Fight_RPPower",
    _e[powerEffects.EFFECT_ATTACKED] = "Fight_AttackedPower",
    _e[powerEffects.EFFECT_BREAK] = "Fight_BreakPower",
    //[powerEffects.EFFECT_RESULT] 			: "Fight_AddResultPower",	
    _e[powerEffects.EFFECT_MISS] = "Fight_DodgePower",
    _e[powerEffects.EFFECT_DODGE] = "Fight_DodgePower",
    _e[powerEffects.EFFECT_NOTARGET] = "Fight_DodgePower",
    _e[powerEffects.EFFECT_ADD_BUFF] = "Fight_BuffPower",
    _e[powerEffects.EFFECT_DEL_BUFF] = "Fight_BuffPower",
    _e[powerEffects.EFFECT_UPDATE_BUFF] = "Fight_BuffPower",
    _e[powerEffects.EFFECT_IMMUNIZE] = "Fight_BuffPower",
    _e[powerEffects.EFFECT_DROP_GOLD] = "Fight_AwardPower",
    _e[powerEffects.EFFECT_DROP_ITEM] = "Fight_AwardPower",
    _e[powerEffects.EFFECT_SPIRIT_CD] = "Fight_SpiritCDPower",
    _e[powerEffects.EFFECT_FIGHTER_ADD] = "Fight_HelperPower",
    _e[powerEffects.EFFECT_FIGHTER_DISAPPEAR] = "Fight_HelperPower",
    _e[powerEffects.EFFECT_REBOUND] = "Fight_ReboundPower",
    _e[powerEffects.EFFECT_RESERVE] = "Fight_AltematePower",
    _e[powerEffects.EFFECT_SKILL_CD] = "Fight_SkillCDPower",
    //客户端
    _e[powerEffects.EFFECT_FREEZE_VIEW] = "Fight_FreezeViewPower",
    _e[powerEffects.EFFECT_CLIENT_FIGHT_END] = "Fight_EndClientFightPower",
    _e[powerEffects.EFFECT_CLIENT_FIGHT_DIALOG] = "Fight_ShowDialogPower",
    _e);
var ENUM_FIGHT_STATE = (_f = {},
    _f[powerStatus.PSTATUS_TARGET_DIE] = "Fight_DieState",
    _f[powerStatus.PSTATUS_DEATH_NOT_DISAPPEAR] = "Fight_DieState",
    _f["DIZZY"] = [],
    _f["FROZEN"] = [],
    _f);
//站位
var POS_DEFINE = (_g = {},
    //左边
    _g[fightSide.FIGHT_LEFT] = [
        [250, 120], [250, 180], [250, 240],
        //[200,150],[200,210],[200,270],
        [100, 150], [100, 210], [100, 270],
    ],
    //右边
    _g[fightSide.FIGHT_RIGHT] = [
        [550, 120], [550, 180], [550, 240],
        //[600,150],[600,210],[600,270],
        [700, 150], [700, 210], [700, 270],
    ],
    _g);
// ECHO = function (...)
// 	TLog.Debug(...)
// }
// WARN = function (...)
// 	TLog.Warn(...)
// }
var ENUM_FIGHT_MOVE_TYPE = {
    MOVE_LINE_TIME: 1,
    //MOVE_LINE : 2, //直线移动（按速度）
    MOVE_CURVE: 3,
    MOVE_TRACE: 4,
    MOVE_INSTANT: 5,
};
var ELEM_IGNORE_POWER = [
    //powerEffects.EFFECT_HP_PLUS      ,
    //powerEffects.EFFECT_HP_LESS      ,
    //powerEffects.EFFECT_MAXHP_PLUS   ,
    //powerEffects.EFFECT_MAXHP_LESS   ,
    //powerEffects.EFFECT_RP_PLUS      ,
    //powerEffects.EFFECT_RP_LESS      ,
    //powerEffects.EFFECT_MISS         ,
    //powerEffects.EFFECT_DODGE        ,
    //powerEffects.EFFECT_ATTACKED     ,
    //powerEffects.EFFECT_ADD_BUFF     ,
    //powerEffects.EFFECT_DEL_BUFF     ,
    //powerEffects.EFFECT_UPDATE_BUFF  ,
    //powerEffects.EFFECT_IMMUNIZE     ,
    powerEffects.EFFECT_RESIST,
    //powerEffects.EFFECT_BREAK        ,
    powerEffects.EFFECT_MOVE,
    powerEffects.EFFECT_STATUS,
];
//////////////////////////////////////////////////////////////-
var POS_MAPPING_DEFINE = {};
var FIGHT_POSITION_DEFINE = {};
//let positionConfig = readCSV("data\\config\\Combat\\nidongde.csv")
//let initPositionDefine = function()
//	let t = positionConfig[1] || {}
//
//	let startX 			= t.startX || 70
//	let startY 			= t.startY || 200
//	let rowX			 	= t.rowX || 140
//	let rowY				= t.rowY || 120
//	let lineOff			= t.lineOff || 50
//	
//	for(let i = 1; i <=  3;i++){
//		let inte = 0
//		for(let j = 1; j <=  5;j++){
//			if(j == 3 ){
//				inte = t.inte || -70
//			}
//			
//			let pos:any = {
//			
//				startX + rowX * (j - 1) + inte, 
//				startY + rowY * i + lineOff * (j % 2)
//			
//			}
//			let t:any = {}
//			let flag = false
//			//TLog.Debug(pos[1], pos[2])
//			t[1] = pos
//			t[2] = flag
//			
//			FIGHT_POSITION_DEFINE[i] = FIGHT_POSITION_DEFINE[i] || {}
//			FIGHT_POSITION_DEFINE[i][j] = t
//		}
//	}
//	
//}
// //方案二
// let positionConfig = readCSV("data\\config\\Combat\\fighterPosition.csv")
// let initPositionDefine = function ()
//  POS_MAPPING_DEFINE: any = {}
// 	for (let _ in positionConfig) {
// 		let v = positionConfig[_]
// 		let lx = v.x > 320 && 320 || v.x
// 		let ly = v.y
// 		let rx = 640 - lx
// 		POS_MAPPING_DEFINE[fightSide.FIGHT_LEFT] = POS_MAPPING_DEFINE[fightSide.FIGHT_LEFT] || {}
// 		POS_MAPPING_DEFINE[fightSide.FIGHT_LEFT][v.pos] = { lx, ly }
// 		POS_MAPPING_DEFINE[fightSide.FIGHT_RIGHT] = POS_MAPPING_DEFINE[fightSide.FIGHT_RIGHT] || {}
// 		POS_MAPPING_DEFINE[fightSide.FIGHT_RIGHT][v.pos] = { rx, ly }
// 	}
// }
// initPositionDefine()
// positionConfig = null
////////////////////////////////////////////////////////////////-
//原来默认是3 3 3排列，为了适应不同阵型规则，需要预设最大适配模式6 6 6
var DEFAULT_ATTACK_OBJECT = (_h = {},
    _h[1] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    _h[2] = [2, 1, 3, 4, 5, 6, 8, 7, 9, 10, 11, 12, 14, 13, 15, 16, 17, 18],
    _h[3] = [3, 2, 4, 1, 5, 6, 9, 8, 10, 7, 11, 12, 15, 14, 16, 13, 17, 18],
    _h[4] = [4, 3, 5, 2, 6, 1, 10, 9, 11, 8, 12, 7, 16, 15, 17, 14, 18, 13],
    _h[5] = [5, 4, 6, 3, 2, 1, 11, 10, 12, 9, 8, 7, 17, 16, 18, 15, 14, 13],
    _h[6] = [6, 5, 4, 3, 2, 1, 12, 11, 10, 9, 8, 7, 18, 17, 16, 15, 14, 13],
    _h[7] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    _h[8] = [2, 1, 3, 4, 5, 6, 8, 7, 9, 10, 11, 12, 14, 13, 15, 16, 17, 18],
    _h[9] = [3, 2, 4, 1, 5, 6, 9, 8, 10, 7, 11, 12, 15, 14, 16, 13, 17, 18],
    _h[10] = [4, 3, 5, 2, 6, 1, 10, 9, 11, 8, 12, 7, 16, 15, 17, 14, 18, 13],
    _h[11] = [5, 4, 6, 3, 2, 1, 11, 10, 12, 9, 8, 7, 17, 16, 18, 15, 14, 13],
    _h[12] = [6, 5, 4, 3, 2, 1, 12, 11, 10, 9, 8, 7, 18, 17, 16, 15, 14, 13],
    _h[13] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    _h[14] = [2, 1, 3, 4, 5, 6, 8, 7, 9, 10, 11, 12, 14, 13, 15, 16, 17, 18],
    _h[15] = [3, 2, 4, 1, 5, 6, 9, 8, 10, 7, 11, 12, 15, 14, 16, 13, 17, 18],
    _h[16] = [4, 3, 5, 2, 6, 1, 10, 9, 11, 8, 12, 7, 16, 15, 17, 14, 18, 13],
    _h[17] = [5, 4, 6, 3, 2, 1, 11, 10, 12, 9, 8, 7, 17, 16, 18, 15, 14, 13],
    _h[18] = [6, 5, 4, 3, 2, 1, 12, 11, 10, 9, 8, 7, 18, 17, 16, 15, 14, 13],
    _h);
var DEFAULT_FIGHT_ACTOR_COUNT = 9;
////////////////////////////////////////////////////////////////-
//战斗完成后不恢复的界面列表
var FIGHT_NOT_RESOTE_UI = [
    "BossWildFrame", "CampaignBossFrame", "FullScreenBgFrame"
    // "CampaignFrame","CommonEmbattleFrame","ThumbnailFrame","PayFrame","TaskDialogFrame","CommonEmbattleTeamFrame",
    //  "ItemRecommendFrame","PersonalHomepageFrame","PlayerInfoFrame","LadderEmbattleFrame","ClubWarEmbattleTeamFrame", 
    //   "CopyCardFrame", "ActivityListFrame", "PetPreviewFrame"
    // "CopyCardFrame", "PayFrame", "CampaignFrame", "PlayerForceEvaluateFrame",
    // "PlayerPetForceEvaluateFrame","GlodAndPowerBuyFrame", 
    // "FeedBackFrame", 
    // "GemPetArrayFrame", "TaskDialogFrame", "PlayerAllInfoFrame", 
    // "CombinedSkillFrame", "GemInlayFrame","AltemateFrame", 
    // "ActivityFightFrame", "FormationFrame",
    // "FormationRestrictionFrame", "LegionPangaeaCampFrame", "LegionPangaeaCampBossFrame",
    // "ScreenTipsFrame", "MainMenuTopHeadFrame","FullBalckFrame",
    // "LegionStrongManFrame", "SettingFrame", "LadderEmbattleFrame",
];
//战斗结算界面相关配置
var FightFinishWndDefend = (_j = {},
    _j["win"] = (_k = {},
        // [opFightResultType.PATROL]: "FightPrizeFrame",					//巡逻
        _k[opFightResultType.CAMPAGIN] = "FightPrizeFrame",
        _k[opFightResultType.CAPTURE] = "FightCapturePrizeFrame",
        _k[opFightResultType.LIFEANDDEATH] = "FightPrizeFrame",
        _k),
    _j["lost"] = (_l = {},
        // [opFightResultType.PATROL]: "FightPrizeFrame",					//巡逻
        _l[opFightResultType.CAMPAGIN] = "FightLostFrame",
        _l),
    _j);
var FIGHT_NOT_HIDE_UI = ["MainFrame"];
var initFightNotHideUi = function () {
    for (var _ in FightFinishWndDefend) {
        var v = FightFinishWndDefend[_];
        for (var fType in v) {
            var wndName = v[fType];
            if (table_isExsit(FIGHT_NOT_HIDE_UI, wndName) == false) {
                table_insert(FIGHT_NOT_HIDE_UI, wndName);
            }
        }
    }
};
initFightNotHideUi();
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
//# sourceMappingURL=FightDefine.js.map