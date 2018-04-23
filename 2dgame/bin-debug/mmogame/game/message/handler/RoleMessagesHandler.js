/*
作者:
    xuxian
    
创建时间：
   2014.2.08(周六)
意图：
   

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
var RoleMessageHandler = (function (_super) {
    __extends(RoleMessageHandler, _super);
    function RoleMessageHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoleMessageHandler.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //this.register(opCodes.G2C_ROLE_SET_AUTO_POTENTIAL, 									this.onRecvG2C_ROLE_SET_AUTO_POTENTIAL, this)									//获取自动加点																
        this.register(opCodes.G2C_ROLE_NEWBIE_SETTING_RECORD, this.onRecvG2C_ROLE_NEWBIE_SETTING_RECORD, this); //获取自动加点																
        this.register(opCodes.G2C_ROLE_SPECIAL_EVENT_RECORD, this.onRecvG2C_ROLE_SPECIAL_EVENT_RECORD, this); //获取自动加点																
        //this.register(opCodes.G2C_ROLE_RANK, 								this.onRecvG2C_ROLE_RANK, this)									//获取排行榜																
        this.register(opCodes.G2C_EXCITE_ALL_SERVER_FIRST_CAMP, this.onRecvG2C_EXCITE_ALL_SERVER_FIRST_CAMP, this); //获取全服关卡首通名单																
        this.register(opCodes.G2C_ROLE_CHAMPION_RANK, this.onRecvG2C_ROLE_CHAMPION_RANK, this);
        this.register(opCodes.G2C_ROLE_WUDOU_RANK, this.onRecvG2C_ROLE_WUDOU_RANK, this);
        this.register(opCodes.G2C_ROLE_CREATE_TIME, this.onRecvG2C_ROLE_CREATE_TIME, this);
        this.register(opCodes.G2C_ROLE_INVITE_FRIEND_LIST, this.onRecvG2C_ROLE_INVITE_FRIEND_LIST, this);
        // this.register(opCodes.G2C_HERO_DISCOUNT_QUERY, this.onRecvG2C_HERO_DISCOUNT_QUERY, this)          //查询限时召集部下
        // this.register(opCodes.G2C_ROLE_HONOR_TITLE_LIST, this.onRecvG2C_ROLE_HONOR_TITLE_LIST, this)        //查询成就达成记录
        // this.register(opCodes.G2C_ROLE_HONOR_TITLE, this.onRecvG2C_ROLE_HONOR_TITLE, this)             //角色当前称号
        //this.register(opCodes.G2C_ROLE_HONOR_HINT, this.onRecvG2C_ROLE_HONOR_HINT, this)  //新获取成就列表
        //新vip等级
        this.register(opCodes.G2C_ROLE_VIP_ENTER_MAP, this.onRecvG2C_ROLE_VIP_ENTER_MAP, this); //vip进入地图
        //改名
        this.register(opCodes.G2C_ROLE_CHANGE_NAME, this.onRecvG2C_ROLE_CHANGE_NAME, this); //vip进入地图
        //this.register(opCodes.G2C_ROLE_PET_COURAGE_QUALITY, this.onRecvG2C_ROLE_PET_COURAGE_QUALITY,this) //角色魄力等阶
        // this.register(opCodes.G2C_ROLE_PET_SOUL_POINT, this.onRecvG2C_ROLE_PET_SOUL_POINT, this) //角色碎魂
        //各种活动的积分
        //this.register(opCodes.G2C_ROLE_MONEY_UNIT_POINT, this.onRecvG2C_ROLE_MONEY_UNIT_POINT, this)  //各种活动的积分
        //获取奖励
        this.register(opCodes.G2C_COMMON_PRIZE_LIST, this.onRecvG2C_COMMON_PRIZE_LIST, this); //获取奖励
        //功能红点提醒
        this.register(opCodes.G2C_ROLE_FUNCTION_NOTICE, this.onRecvG2C_ROLE_FUNCTION_NOTICE, this); //功能红点提醒
        //神兽
        // this.register(opCodes.G2C_GODANIMAL_INFO, this.onRecvG2C_GODANIMAL_INFO, this) //神兽等级
        // this.register(opCodes.G2C_GODANIMAL_PREVIEW_FORCE, this.onRecvG2C_GODANIMAL_PREVIEW_FORCE, this) //神兽下一级可加战力
        // this.register(opCodes.G2C_GODANIMAL_EXPER, this.onRecG2C_GODANIMAL_EXPER, this) //神兽体验结束
        // //角色装备技能
        // this.register(opCodes.G2C_ACTOR_ROLE_UPDATE, this.onRecvG2C_ACTOR_ROLE_UPDATE, this)     //角色更新
        // this.register(opCodes.G2C_ACTOR_ROLE_INFO_LIST, this.onRecvG2C_ACTOR_ROLE_INFO_LIST , this) //角色技能
        // //时装称号
        // this.register(opCodes.G2C_ACTOR_ROLE_FASHION_UNLOCK, this.onRecvG2C_ACTOR_ROLE_TITLE_UNLOCK , this) //角色时装
        // this.register(opCodes.G2C_ACTOR_ROLE_TITLE_UNLOCK, this.onRecvG2C_ACTOR_ROLE_TITLE_UNLOCK , this) //角色称号
    };
    // onRecvG2C_ROLE_SET_AUTO_POTENTIAL(dispatcher, message) {
    // 	let potentiallist: any = {}
    // 	potentiallist.habitus = message.habitus
    // 	potentiallist.intellect = message.intellect
    // 	potentiallist.strength = message.strength
    // 	potentiallist.agility = message.agility
    // 	potentiallist.stamina = message.stamina
    // 	RoleSystem.getInstance().setPotential(potentiallist)
    // 	FireEvent(EventDefine.HERO_GET_AUTO_POTENTIAL, GetAtuoPotentialEvent.newObj(potentiallist))
    // }
    RoleMessageHandler.prototype.onRecvG2C_ROLE_NEWBIE_SETTING_RECORD = function (dispatcher, message) {
        GuideSystem.getInstance().setFuncState(message.errantry);
    };
    RoleMessageHandler.prototype.onRecvG2C_ROLE_SPECIAL_EVENT_RECORD = function (dispatcher, message) {
        RoleSystem.getInstance().setSurpriseFinishList(message.surpriseList);
        FireEvent(EventDefine.SPECIAL_EVENT_FINISH_LIST, null);
    };
    //刷新排行
    // onRecvG2C_ROLE_RANK(dispatcher, message) {
    // 	if (message.ranktype == configRankType.RANK_PLR_LEVEL) {
    // 		FireEvent(EventDefine.RANKLIST_ROLE_LEVEL, RankListEvent.newObj(message.ranktype, message.ranklist))
    // 	} else if (message.ranktype == configRankType.RANK_PLR_FORCE) {
    // 		FireEvent(EventDefine.RANKLIST_ROLE_PLR_FORCE, RankListEvent.newObj(message.ranktype, message.ranklist))
    // 	} else if (message.ranktype == configRankType.RANK_PET_NUM) {
    // 		FireEvent(EventDefine.RANKLIST_ROLE_PLR_COUNT, RankListEvent.newObj(message.ranktype, message.ranklist))
    // 	} else if (message.ranktype == configRankType.RNAK_VIP) {
    // 		FireEvent(EventDefine.RANKLIST_ROLE_VIP_LEVEL, RankListEvent.newObj(message.ranktype, message.ranklist))
    // 	} else if (message.ranktype == configRankType.RANK_PET_MAX_FROCE) {
    // 		FireEvent(EventDefine.RANKLIST_UNDERLING_STRONGEST, RankListEvent.newObj(message.ranktype, message.ranklist))
    // 	} else if (message.ranktype == configRankType.RANK_EQUIP_FORCE) {
    // 		FireEvent(EventDefine.RANKLIST_UNDERLING_EQUIP_POWER, RankListEvent.newObj(message.ranktype, message.ranklist))
    // 	} else if (message.ranktype == configRankType.RANK_FACT_LEVEL) {
    // 		FireEvent(EventDefine.RANKLIST_LEGION_LEVEL, RankListEvent.newObj(message.ranktype, message.ranklist))
    // 	} else if (message.ranktype == configRankType.RANK_FACT_REN_QI) {
    // 		FireEvent(EventDefine.RANKLIST_LEGION_POPULARITY, RankListEvent.newObj(message.ranktype, message.ranklist))
    // 	} else if (message.ranktype == configRankType.RANK_FACT_FORCE) {
    // 		FireEvent(EventDefine.RANKLIST_LEGION_TOTALPOWER, RankListEvent.newObj(message.ranktype, message.ranklist))
    // 	}
    // }
    //全服首通关卡
    RoleMessageHandler.prototype.onRecvG2C_EXCITE_ALL_SERVER_FIRST_CAMP = function (dispatcher, message) {
        FireEvent(EventDefine.TOLLGATE_FIRSTPASS_LIST, FirstPassListEvent.newObj(message.firstPasslist));
    };
    RoleMessageHandler.prototype.onRecvG2C_ROLE_CHAMPION_RANK = function (dispatcher, message) {
        FireEvent(EventDefine.IS_CHAMPION_FIRST, CHAMPION_FIRST_RESULT.newObj(message.isFirst));
    };
    RoleMessageHandler.prototype.onRecvG2C_ROLE_WUDOU_RANK = function (dispatcher, message) {
        FireEvent(EventDefine.IS_WUDOU_FIRST, WUDOU_FIRST_RESULT.newObj(message.isFirst));
    };
    RoleMessageHandler.prototype.onRecvG2C_ROLE_CREATE_TIME = function (dispatcher, message) {
        RoleSystem.getInstance().setRoleCreateTime(message.creatRoleTime);
        FireHeroUpdateInfo();
    };
    RoleMessageHandler.prototype.onRecvG2C_ROLE_INVITE_FRIEND_LIST = function (dispatcher, message) {
        RoleSystem.getInstance().updateInviteList(message.inviteType, table_copy(message.inviteList));
        FireEvent(EventDefine.ROLE_INVITE_LIST, RoleInviteListEvent.newObj(message.inviteType, message.inviteList));
    };
    // onRecvG2C_HERO_DISCOUNT_QUERY(dispatcher, message) {
    // 	PetSystem.getInstance().setPetListToCallInLimitTime(message.callPetInfo.data, message.callPetInfo.stime, message.callPetInfo.etime)
    // 	FireEvent(EventDefine.CALL_PET_DISCOUNT, CallPetInTimeInfo.newObj(message.callPetInfo))
    // }
    // onRecvG2C_ROLE_HONOR_TITLE_LIST(dispatcher, message) {
    // 	//let wnd = WngMrg.getInstance().getWindow("HonorListFrame")
    // 	//if(wnd ){
    // 	//	wnd.setHonorRecord(message.chengHaoRecord)
    // 	//	FireEvent(EventDefine.ROLE_HONOR_UPDATE, null)
    // 	//}
    // }
    // onRecvG2C_ROLE_HONOR_TITLE(dispatcher, message) {
    // 	//RoleSystem.getInstance().setHeroHonorId(message.chengHaoId)
    // 	//FireEvent(EventDefine.ROLE_HONOR_UPDATE, null)
    // }
    // // onRecvG2C_ROLE_HONOR_POINT(dispatcher, message) {
    // // 	FireEvent(EventDefine.ROLE_CHENGJIU_UPDATE, RoleChengJiuEvent.newObj(message.chengJiuDian))
    // // }
    // onRecvG2C_ROLE_HONOR_HINT(dispatcher, message) {
    // }
    RoleMessageHandler.prototype.onRecvG2C_ROLE_VIP_ENTER_MAP = function (dispatcher, message) {
        //FireEvent(EventDefine.ROLE_CHENGJIU_UPDATE,RoleChengJiuEvent.newObj(message.chengJiuDian))
        RoleSystem.getInstance().addOneNpcSay(message.roleInfo);
    };
    RoleMessageHandler.prototype.onRecvG2C_ROLE_CHANGE_NAME = function (dispatcher, message) {
        FireEvent(EventDefine.ROLE_CHANGE_NAME, null);
    };
    // onRecvG2C_ROLE_PET_COURAGE_QUALITY(dispatcher, message) {
    // 	let heroInfo = GetHeroPropertyInfo()
    // 	if (!heroInfo) {
    // 		return
    // 	}
    // 	heroInfo.courageQuality = message.courageQuality
    // 	FireEvent(EventDefine.HERO_COURAGE_QUALITY_UPDATE, null)
    // }
    // onRecvG2C_ROLE_PET_SOUL_POINT(dispatcher, message) {
    // 	let heroInfo = GetHeroPropertyInfo()
    // 	if (!heroInfo) {
    // 		return
    // 	}
    // 	heroInfo.petSoulPoint = message.petSoulPoint
    // 	FireEvent(EventDefine.HERO_PET_SOUL_POINT_UPDATE, null)
    // }
    // onRecvG2C_ROLE_MONEY_UNIT_POINT(dispatcher, message) {
    // 	let heroInfo = GetHeroPropertyInfo()
    // 	if (!heroInfo) {
    // 		return
    // 	}
    // 	for(let k in message.itemUnitPoint){
    // 		let varName = GetHeroMoneyVar(tonumber(k))
    // 		if(varName != null){
    // 			heroInfo[varName] = message.itemUnitPoint[k]
    // 		}
    // 	}
    // }
    RoleMessageHandler.prototype.onRecvG2C_COMMON_PRIZE_LIST = function (dispatcher, message) {
        function func() {
            var prizeItemList = table_copy(message.prizeList);
            //引导二转（二级职业的开锁），后面需要通用化
            // let elem = null
            // for(let k = 0; k < prizeItemList.length; k++){
            // 	let v = prizeItemList[k]
            // 	if(v[0] == SpecailItemId.LUCKYSTONE ){
            // 		elem = v
            // 		//JsUtil.arrayRemove(prizeItemList, k)
            // 		break
            // 	}
            // }
            // if (elem != null){
            // 	let proList:any = [40001, 40002]				//二转相关职业entryId
            // 	let lockAll = true
            // 	for(let _ in proList){
            // 		let entryId = proList[_]
            // 		if(ProfessionSystem.getInstance().isProfessionUnlock(entryId) ){
            // 			if(lockAll ){
            // 				lockAll = false
            // 			}
            // 		}
            // 	}
            // 	if(lockAll == true ){
            // 		let wnd = WngMrg.getInstance().getWindow("PrizeRareShowFrame")
            // 		wnd.showWithItemList([elem])
            // 		return
            // 	}
            // }
            if (prizeItemList.length > 0) {
                var prizetype = prizeItemList[0][2];
                if (prizetype == 1) {
                    var petid = prizeItemList[0][0];
                    var wnd_1 = WngMrg.getInstance().getWindow("ActorShowFrame");
                    wnd_1.showGainPartner(petid);
                    return;
                }
            }
            var wnd = WngMrg.getInstance().getWindow("PrizeShowFrame");
            wnd.showWithPrizeList(prizeItemList);
        }
        if (FightSystem.getInstance().isFight()) {
            return FightSystem.getInstance().addEndFightHandler(func, this);
        }
        else {
            return func();
        }
    };
    RoleMessageHandler.prototype.onRecvG2C_ROLE_FUNCTION_NOTICE = function (dispatcher, message) {
        GuideFuncSystem.getInstance().onRecvServerNotice(message.noticeList);
        FireEvent(EventDefine.GUIDE_SERVER_NOTICE, null);
    };
    return RoleMessageHandler;
}(MessageHandler));
__reflect(RoleMessageHandler.prototype, "RoleMessageHandler");
//# sourceMappingURL=RoleMessagesHandler.js.map