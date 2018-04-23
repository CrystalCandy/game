/*
作者:
    yangguiming
    
创建时间：
   2013.9.22(周日)

意图：
   与charcter相关定义

公共接口：
   
*/
ImportType(opPetQuality);
//特效绑定部位
var EffectPart = {
    HEAD: 1,
    BODY: 2,
    SHOE: 3,
};
//角色状态
var characterState = {
    nullState: -999999,
    //全局状态
    globalState_Begin: 0,
    globalState_live: 1,
    globalState_combat: 2,
    globalState_End: 99,
    //动作状态
    actionState_Begin: 100,
    actionState_idle: 101,
    actionState_move: 102,
    actionState_attack: 103,
    actionState_attacked: 104,
    actionState_dead: 105,
    actionState_rush: 106,
    actionState_jump: 107,
    actionState_dodge: 108,
    actionState_knockfly: 109,
    actionState_beatback: 110,
    actionState_End: 199,
    //姿态状态
    postureState_Begin: 200,
    postureState_normal: 201,
    postureState_shape: 202,
    postureState_ride: 203,
    postureState_End: 299,
};
//Actor的身体部件定义
//ActorPartMap =
//{
//	body 			: 0,
//	cloth 		: 1,
//	weapon 		: 2,
//	wing 			: 3,
//	hair 			: 4,
//}
//引擎精灵dir的坐标系
//     7  6  5
//   	 \|/
//   0 ———|————4    
//   	 /|\
//     1  2  3		*/
//Actor的方向定义
var ActorDirMap = {
    RightUp: 5,
    Up: 6,
    LeftUp: 7,
    Left: 0,
    LeftBottom: 1,
    Bottom: 2,
    RightBottom: 3,
    Right: 4,
};
function IsFaceRight(actor) {
    var dir = actor.getDir();
    if (dir == ActorDirMap.Right || dir == ActorDirMap.RightBottom || dir == ActorDirMap.RightUp)
        return true;
    return false;
}
function IsFaceLeft(actor) {
    var dir = actor.getDir();
    return !this.IsFaceRight(actor);
}
var actor_Type = {
    ACTOR_TYPE_BASE: -1,
    ACTOR_TYPE_CHARACTER: 0,
    ACTOR_TYPE_COMBAT_CHARACTER: 1,
    ACTOR_TYPE_MONSTER: 2,
    ACTOR_TYPE_PET: 3,
    ACTOR_TYPE_MONSTERBOSS: 4,
    //ACTOR_TYPE_COMBAT_MONSTER : 3,
    //ACTOR_TYPE_COMBAT_BOSS 		: 4,
    //ACTOR_TYPE_COMBAT_PLAYER 	: 5,
    ACTOR_TYPE_NPC: 6,
    ACTOR_TYPE_PLAYER: 7,
    ACTOR_TYPE_HERO: 8,
    ACTOR_TYPE_STALL: 9,
    ACTOR_TYPE_EFFECT: 10,
    ACTOR_TYPE_FAIRY: 11,
    ACTOR_TYPE_RIDEPLAYER: 12,
    ACTOR_TYPE_AWARD: 13,
};
var ActorCommand = {
    //Effect
    AddEffect: 100,
    RemoveEffect: 101,
    RemoveEffectById: 102,
    SetEffect: 103,
    SetEffectVisible: 104,
    SetEffectVisibleWithCaster: 105,
    RemoveEffectAll: 106,
    //Visual              	
    ShowCombatNumber: 204,
    SetShadowVisible: 207,
    //UI
    SetNpcHeadFrameVisible: 300,
    AddChatBubble: 301,
    HideChatBubble: 302,
    SetHourGlassVisible: 303,
    SetName: 304,
    SetNameColor: 305,
    SetHpSlot: 306,
    SetMPSlot: 307,
    SetHpSlotVisible: 308,
    SetMPSlotVisible: 309,
    SetCaptainIconVisible: 310,
    showSkillName: 311,
    //SetFuncStayOpenVisible	: 311, //显示待开启功能提示 	param1:funcIndex (字符串)				,param2:visible
    SetCombatMarkVisible: 312,
    ShowCombatAutoHpSlot: 313,
    SetTeammateIconVisible: 314,
    ShowAwardModel: 315,
    SetMoreIcon: 316,
    SetNameFont: 317,
    SetStateIcon: 318,
    setTimeCountDown: 319,
    SetFactionName: 320,
    //SetLTIconRD							: 321,   //设置光明神像信息
    SetChengHaoTitle: 322,
    SetFightStateVisible: 323,
    ShowFloatText: 324,
};
var HeroSupriseEventIndex = {
    DENGLU: 5000,
    JIEMIAN: 5001,
    CHONGZHI: 5002,
    DAODADIDIAN: 5003,
    YAOSHOUJI: 5004,
    SHANGXIAXIAN: 5005,
};
var IsolationCharacterId = {
    SupriseNpc: -1,
    RobberNpcBegin: -50,
    RobberNpcEnd: -100,
    TaskNpcBegin: -101,
    TaskNpcEnd: -200,
    Examiner: -300,
    FogForestBoss: -400,
    SpecalEnd: -1000,
};
//突破等级对应品质
var PetAwakeLevelToQuality = (_a = {},
    _a[0] = opPetQuality.gray,
    _a[1] = opPetQuality.green,
    _a[2] = opPetQuality.blue,
    _a[3] = opPetQuality.purple,
    _a[4] = opPetQuality.gold,
    _a);
//机器人对白ID定义，策划要配合这里的ID定义范围
var FakeChatId = {
    SPROG_BEGIN: 10000,
    SPROG_END: 20000,
    SPROG_BOX_WORLD_BEGIN: 20000,
    SPROG_BOX_WORLD_End: 20100,
    SPROG_BOX_BEGIN: 20100,
    SPROG_BOX_End: 20200,
};
var _a;
//# sourceMappingURL=CharacterDefine.js.map