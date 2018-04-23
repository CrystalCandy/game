/*
作者:
    yangguiming
    
创建时间：
   2013.7.10(周三)

意图：
   战斗系统消息处理

公共接口：
   
*/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var FightMessageHandler = (function (_super) {
    __extends(FightMessageHandler, _super);
    function FightMessageHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FightMessageHandler.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.register(opCodes.G2C_FIGHT_BEGIN, this.onRecvG2C_FIGHT_BEGIN, this); //战斗开始
        this.register(opCodes.G2C_FIGHT_ESOTERIC_POWER, this.onRecvG2C_FIGHT_ESOTERIC_POWER, this); //战斗开始初始化角色MP
        this.register(opCodes.G2C_FIGHT_ADD, this.onRecvG2C_FIGHT_ADD, this); //增加战斗成员
        //this.register(opCodes.G2C_FIGHT_BOUT, 			this.onRecvG2C_FIGHT_BOUT, this)		//回合开始
        this.register(opCodes.G2C_FIGHT_END, this.onRecvG2C_FIGHT_END, this); //战斗结束
        this.register(opCodes.G2C_FIGHT_RESULT, this.onRecvG2C_FIGHT_RESULT, this); //回合战斗结果
        this.register(opCodes.G2C_FIGHT_SEQUENCE, this.onRecvG2C_FIGHT_SEQUENCE, this); //战斗出手队列
        this.register(opCodes.G2C_FIGHT_REBEGIN, this.onRecvG2C_FIGHT_REBEGIN, this); //战斗重连
        //this.register(opCodes.G2C_FIGHT_READY, 		this.onRecvG2C_FIGHT_READY, this)			//战斗出手标记
        //this.register(opCodes.G2C_GET_WANTED_LIST, 		this.onRecvG2C_GET_WANTED_LIST, this)			//通缉犯名单
        // this.register(opCodes.G2C_FIGHT_GET_BATTLE_QUEUE, 	this.onRecvG2C_FIGHT_GET_BATTLE_QUEUE, this)		//获取出战列表
        this.register(opCodes.G2C_FIGHT_WIN, this.onRecvG2C_FIGHT_WIN, this); //通关奖励
        // this.register(opCodes.G2C_CHAMPION_WEAP, 						this.onRecvG2C_CHAMPION_WEAP, this)							//横扫关卡奖励
        // this.register(opCodes.G2C_FIGHT_CAMPAIGN_RECORD, 		this.onRecvG2C_FIGHT_CAMPAIGN_RECORD, this)			//获取通关记录列表
        // this.register(opCodes.G2C_FIGHT_RESERVE_LINE_UP, 		this.onRecvG2C_FIGHT_RESERVE_LINE_UP, this)			//获取替补记录
        this.register(opCodes.G2C_FIGHT_LOST, this.onRecvG2C_FIGHT_LOST, this); //战斗失败
        // this.register(opCodes.G2C_FIGHT_CHAMPION_TOP_RANK, 							this.onRecvG2C_FIGHT_CHAMPION_TOP_RANK, this)		//竞技场最高排名
        this.register(opCodes.G2C_FIGHT_CHAMPION_REFRESH, this.onRecvG2C_FIGHT_CHAMPION_REFRESH, this); //竞技场刷新
        // this.register(opCodes.G2C_FIGHT_CHAMPION_RECORD, 								this.onRecvG2C_FIGHT_CHAMPION_RECORD, this)		//竞技场对战记录
        // this.register(opCodes.G2C_FIGHT_CHAMPION_REFRESH_EX, 								this.onRecvG2C_FIGHT_CHAMPION_REFRESH_EX, this)		//竞技场晶石刷新
        // this.register(opCodes.G2C_FIGHT_CHAMPION_EX_PRIZE, 								this.onRecvG2C_FIGHT_CHAMPION_EX_PRIZE, this)		//竞技场排名奖励
        this.register(opCodes.G2C_FIGHT_VIEDO, this.onRecvG2C_FIGHT_VIEDO, this); //战斗录像
        this.register(opCodes.G2C_FIGHT_VIEDO_PAGE, this.onRecvG2C_FIGHT_VIEDO_PAGE, this); //战斗录像分布
        this.register(opCodes.G2C_EXCITE_SERVER_FIRST_CAMPAIGN, this.onRecvG2C_EXCITE_SERVER_FIRST_CAMPAIGN, this); //战斗录像
        this.register(opCodes.G2C_FIGHT_SYNC_TICKTIME, this.onRecvG2C_FIGHT_SYNC_TICKTIME, this); //战斗录像
        this.register(opCodes.G2C_FIGHT_SPIRIT_POINT, this.onRecvG2C_FIGHT_SPIRIT_POINT, this); //战斗录像
        //this.register(opCodes.G2C_FIGHT_ASSIST_SKILL, 					this.onRecvG2C_FIGHT_ASSIST_SKILL, this)		//援助技能
        this.register(opCodes.G2C_FIGHT_LINE_UP_DATA, this.onRecvG2C_FIGHT_LINE_UP_DATA, this); //替补列表
        this.register(opCodes.G2C_FIGHT_DAMAGE, this.onRecvG2C_FIGHT_DAMAGE, this); //双方总输出
        this.register(opCodes.G2C_WAR_FORMATION_INFO, this.onRecvG2C_WAR_FORMATION_INFO, this); //战阵信息
        //组队关卡
        this.register(opCodes.G2C_FIGHT_ENTER_CAMPAIGN_INFO, this.onRecvG2C_FIGHT_ENTER_CAMPAIGN_INFO, this); //开始战斗
        this.register(opCodes.G2C_EXCITE_LIMIT_CAMPAIGN, this.onRecvG2C_EXCITE_LIMIT_CAMPAIGN, this); //个人限时通关
        this.register(opCodes.G2C_EXCITE_NOT_SERVER_FIRST_CAMP, this.onRecvG2C_EXCITE_NOT_SERVER_FIRST_CAMP, this); //全服首通
    };
    FightMessageHandler.prototype.onRecvG2C_FIGHT_BEGIN = function (dispatcher, message) {
        //let wnd = WngMrg.getInstance().getWindow("TeamMemberFrame")
        //TLog.Debug("onRecvG2C_FIGHT_BEGIN message.fightType", message.fightType,wnd.isVisible())
        //WngMrg.getInstance().hideWindow("TeamMemberFrame")
        //if(wnd.isVisible() ){
        //	wnd.hideWnd()
        //	TLog.Debug("hide wnd")		
        //}
        FightSystem.getInstance().beginFight(message.fightType, message.campainId, message.fightSide);
    };
    FightMessageHandler.prototype.onRecvG2C_FIGHT_ESOTERIC_POWER = function (dispatcher, message) {
        FightSystem.getInstance().getActorSystem().setRoleMp(GetHeroProperty("id"), message.mp);
    };
    FightMessageHandler.prototype.onRecvG2C_FIGHT_ADD = function (dispatcher, message) {
        FightSystem.getInstance().addFighterList(message.fighterList);
        //FightSystem.getInstance().addFighterList({GreateFunnalInfo(fightSide.FIGHT_LEFT, 11)})
    };
    FightMessageHandler.prototype.onRecvG2C_FIGHT_BOUT = function (dispatcher, message) {
        //CombatSystem.getInstance().begin_bout(message.bout)
    };
    FightMessageHandler.prototype.onRecvG2C_FIGHT_END = function (dispatcher, message) {
        FightSystem.getInstance().endFight();
    };
    FightMessageHandler.prototype.onRecvG2C_FIGHT_RESULT = function (dispatcher, message) {
        for (var i = 0; i < message.resultList.length; i++) {
            var v = message.resultList[i];
            FightSystem.getInstance().addResult(v);
        }
    };
    FightMessageHandler.prototype.onRecvG2C_FIGHT_SEQUENCE = function (dispatcher, message) {
        FireEvent(EventDefine.COMBAT_FIGHT_SEQUENCE_UPDATE, FightSequenceEvent.newObj(message.list));
    };
    FightMessageHandler.prototype.onRecvG2C_FIGHT_REBEGIN = function (dispatcher, message) {
        TLog.Debug("onRecvG2C_FIGHT_REBEGIN message.fightType", message.fightType, message.comapignId);
        FightSystem.getInstance().reBeginFight(message.fightType, message.comapignId, message.fightSide, message.mpPoint);
        SetGlobalInputStatus(true, "Main");
    };
    FightMessageHandler.prototype.onRecvG2C_FIGHT_READY = function (dispatcher, message) {
        //CombatSystem.getInstance().fighter_ready(message.id)
    };
    // onRecvG2C_GET_WANTED_LIST( dispatcher, message){
    // 	FireEvent(EventDefine.TONGJI_LIST_UPDATE, TongjiListEvent.newObj(message.playerList))
    // }
    // onRecvG2C_FIGHT_GET_BATTLE_QUEUE( dispatcher, message){
    // 	// return CampaignSystem.getInstance().updateCampaignArray(message.queue, message.queueType)
    // }
    FightMessageHandler.prototype.onRecvG2C_FIGHT_WIN = function (dispatcher, message) {
        //战役记录
        //let campaignId = null
        // if(message.fightType == opFightType.FIGHT_TYPE_COMMON ){
        // 	// campaignId = CampaignSystem.getInstance().finishCampaign(message.commonList.campaignId, message.commonList.star, message.fightType)
        // }
        //战斗结算流程
        FightSystem.getInstance().addFightAccountSettle(true, message);
    };
    // onRecvG2C_CHAMPION_WEAP( dispatcher, message){
    // 	//let campaignId = null
    // 	// if(message.fightType != opFightType.FIGHT_TYPE_COMMON ){
    // 	// 	return
    // 	// }
    // 	// let campaignId = CampaignSystem.getInstance().finishCampaign(message.commonList.campaignId, message.commonList.star, message.fightType)
    // 	//战斗结算流程
    // 	// FightSystem.getInstance().sweepAwayFight(message, campaignId)
    // }
    // onRecvG2C_FIGHT_CAMPAIGN_RECORD( dispatcher, message){
    // 	// CampaignSystem.getInstance().initFinishCampaignList(message.finishedCampaignList)
    // }
    // onRecvG2C_FIGHT_RESERVE_LINE_UP( dispatcher, message){
    // 	// CampaignSystem.getInstance().setAltemate(message.arrayType, message.altemate, true)
    // 	// FireEvent(EventDefine.CAMPAIGN_ALTEMATE_UPDATE, null)
    // }
    FightMessageHandler.prototype.onRecvG2C_FIGHT_LOST = function (dispatcher, message) {
        //战斗结算流程
        FightSystem.getInstance().addFightAccountSettle(false, message);
    };
    FightMessageHandler.prototype.onRecvG2C_FIGHT_CHAMPION_TOP_RANK = function (dispatcher, message) {
        //FireEvent(EventDefine.CHAMPION_TOP_RANK, ChampionTopRankEvent.newObj(message.enemyList))
    };
    FightMessageHandler.prototype.onRecvG2C_FIGHT_CHAMPION_REFRESH = function (dispatcher, message) {
        var activity = GetActivity(ActivityDefine.Champion);
        activity.setChampionInfo(message);
        FireEvent(EventDefine.CHAMPION_REFRESH, ChampionRefreshEvent.newObj(message.force, message.rank, message.times, message.maxTimes, message.time, message.enemyList, message.topList));
    };
    // onRecvG2C_FIGHT_CHAMPION_REFRESH_EX( dispatcher, message){		//竞技场刷新
    // 	let activity = GetActivity(ActivityDefine.Champion)	
    // 	activity.setChampionInfo(message)
    // 	FireEvent(EventDefine.CHAMPION_REFRESH_EX, ChampionRefreshExEvent.newObj(message.times, message.maxTimes, message.time))
    // }
    // onRecvG2C_FIGHT_CHAMPION_EX_PRIZE( dispatcher, message){
    //   let activity = GetActivity(ActivityDefine.Champion)	
    // 	activity.setFightEndCallBack(message) 
    // }
    // onRecvG2C_FIGHT_CHAMPION_RECORD( dispatcher, message){		//竞技场战斗记录
    // 	CampaignSystem.getInstance().setChampionRecord(message.championRecordList)
    // 	FireEvent(EventDefine.FIGHT_CHAMPION_RECORD, ChampionRecordEvent.newObj(message.championRecordList))
    // 	let wnd = WngMrg.getInstance().getWindow("ChampionRecodeFrame")		
    // 	if(wnd.isVisible() ){
    // 		wnd.refreshRecodeWindow()
    // 	}
    // }
    FightMessageHandler.prototype.onRecvG2C_FIGHT_VIEDO = function (dispatcher, message) {
        var beginMessage = message.message_fight_begin;
        var fighterAddMessage = message.message_fighter_add;
        if (FightSystem.getInstance().isFight() == true) {
            if (FightSystem.getInstance().isFightEnding() == false || FightSystem.getInstance().isFightVideo() == true) {
                return;
            }
        }
        FightSystem.getInstance().beginFightVideo();
        FightSystem.getInstance().beginFight(beginMessage.fightType, beginMessage.campainId);
        FightSystem.getInstance().addFighterList(fighterAddMessage.fighterList);
    };
    FightMessageHandler.prototype.onRecvG2C_FIGHT_VIEDO_PAGE = function (dispatcher, message) {
        var resultAddMessage = message.message_fight_result;
        if (FightSystem.getInstance().isFight() == false || FightSystem.getInstance().isFightVideo() == false) {
            return;
        }
        for (var i = 0; i < resultAddMessage.resultList.length; i++) {
            var v = resultAddMessage.resultList[i];
            FightSystem.getInstance().addResult(v);
        }
        FightSystem.getInstance().endFight();
    };
    FightMessageHandler.prototype.onRecvG2C_EXCITE_SERVER_FIRST_CAMPAIGN = function (dispatcher, message) {
        // return CampaignSystem.getInstance().setFirstPass(message)
    };
    FightMessageHandler.prototype.onRecvG2C_FIGHT_SYNC_TICKTIME = function (dispatcher, message) {
        FightSystem.getInstance().onSyncTickRound(message.fightTime);
    };
    FightMessageHandler.prototype.onRecvG2C_FIGHT_SPIRIT_POINT = function (dispatcher, message) {
        //if(message.skillId == 0 ){
        FightSystem.getInstance().updateFunnalPoint(message.leftPoint);
        //}
        FireEvent(EventDefine.COMBAT_FIGHT_FUNNAL_POINT, FunnalPointEvent.newObj(message.skillId, message.leftPoint, message.cooldownTime));
    };
    // onRecvG2C_FIGHT_ASSIST_SKILL( dispatcher, message){
    // 	CombinedSkillSystem.getInstance().setFightAssSkillList(message.skillList)
    // 	FireEvent(EventDefine.COMBAT_FIGHT_ASSIST_SKILL, AssSkillEvent.newObj(message.commonCD))
    // }
    FightMessageHandler.prototype.onRecvG2C_FIGHT_LINE_UP_DATA = function (dispatcher, message) {
        FightSystem.getInstance().setAltemateList(message.altemateList);
    };
    FightMessageHandler.prototype.onRecvG2C_FIGHT_DAMAGE = function (dispatcher, message) {
        FightSystem.getInstance().setFightDamage(message.leftDamage, message.rightDamage);
    };
    FightMessageHandler.prototype.onRecvG2C_WAR_FORMATION_INFO = function (dispatcher, message) {
        var wnd = WngMrg.getInstance().getWindow("FormationFrame");
        wnd.setFormationInfo(message.formationInfo, message.formationUsed);
    };
    FightMessageHandler.prototype.onRecvG2C_FIGHT_ENTER_CAMPAIGN_INFO = function (dispatcher, message) {
        // CampaignSystem.getInstance().setCurTeamCampaign(message.campaignId, message.curCampaignId)
        // FireEvent(EventDefine.CAMPAIGN_TEAM_CURCAM, null)
    };
    FightMessageHandler.prototype.onRecvG2C_EXCITE_LIMIT_CAMPAIGN = function (dispatcher, message) {
        // CampaignSystem.getInstance().updateLimitPassData(message.campaignIndex, message.campaignDeadLine)
        // FireEvent(EventDefine.EXCITE_LIMIT_CAMPAIGN, null)
    };
    ////全服首次通关
    FightMessageHandler.prototype.onRecvG2C_EXCITE_NOT_SERVER_FIRST_CAMP = function (dispatcher, message) {
        FireEvent(EventDefine.CAMPAIGN_NOTPASS_SERVER, CampaignEvent.newObj(message.campaignId));
    };
    return FightMessageHandler;
}(MessageHandler));
__reflect(FightMessageHandler.prototype, "FightMessageHandler");
//# sourceMappingURL=FightMessageHandler.js.map