/*
作者:
    liuziming
    
创建时间：
   2013.8.08(周四)

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
var PetMessageHandler = (function (_super) {
    __extends(PetMessageHandler, _super);
    function PetMessageHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetMessageHandler.prototype.initObj = function () {
        //this.register(opCodes.G2C_PET_FREE,    							this.onRecvG2C_PET_FREE, this)								//放生一只宠物
        //this.register(opCodes.G2C_PET_DICTIONARY_UPDATE,    this.onRecvG2C_PET_DICTIONARY_UPDATE, this)		//更新宠物图鉴
        //this.register(opCodes.G2C_PET_HOLY_UPGRADE_NEED,    this.onRecvG2C_PET_HOLY_UPGRADE_NEED, this)		//返回神兽进修
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //this.register(opCodes.G2C_PET_SET_COLOR,    				this.onRecvG2C_PET_SET_COLOR , this)					//染色返回方案
        //this.register(opCodes.G2C_PET_SELECT_AUTO,    			this.onRecvG2C_PET_SELECT_AUTO , this)			//返回宠物自动加点
        //this.register(opCodes.G2C_ITEM_WAREHOUSE_PET,    		this.onRecvG2C_ITEM_WAREHOUSE_PET , this)	//仓库宠物列表
        //this.register(opCodes.G2C_PET_INTIMATE_EVENT,				this.onRecvG2C_PET_INTIMATE_EVENT,this)		//宠物亲密度事件
        //this.register(opCodes.G2C_PET_ENTER_INTERACT,				this.onRecvG2C_PET_ENTER_INTERACT,this)		//可用互动次数
        //this.register(opCodes.G2C_PET_INTERACT_EVENT,				this.onRecvG2C_PET_INTERACT_EVENT,this)		//宠物互动事件ID
        //this.register(opCodes.G2C_PET_INVITE_LIST,					this.onRecvG2C_PET_INVITE_LIST,this)			//可邀请宠物列表
        //this.register(opCodes.G2C_PET_ADVANCE_RESULT,				this.onRecvG2C_PET_ADVANCE_RESULT,this)			//命运邀请结果
        //this.register(opCodes.G2C_PET_APPRECIATE,				    this.onRecvG2C_PET_APPRECIATE,this)			    //破甲鉴赏
        //this.register(opCodes.G2C_ROLE_ALL_PET,							this.onRecvG2C_ROLE_ALL_PET,this)						//曾经拥有过的宠物
        //this.register(opCodes.G2C_PET_QUICK_RECRUIT_EX,     this.onRecvG2C_PET_QUICK_RECRUIT_EX,this)   //额外扫荡奖励
        //this.register(opCodes.G2C_UPDATE_QUICK_RECRUIT,     this.onRecvG2C_UPDATE_QUICK_RECRUIT,this)   //更新剩余必然获得宠物次数
        //this.register(opCodes.G2C_PET_PUSH_EVENT,           this.onRecvG2C_PET_PUSH_EVENT,this)
        //this.register(opCodes.G2C_PET_INVITE_ADVANCE,       this.onRecvG2C_PET_INVITE_ADVANCE,this) 		  //收到成功率
        //this.register(opCodes.G2C_PET_PUSH_EVENT_REMOVE,    this.onRecvG2C_PET_PUSH_EVENT_REMOVE,this)    //移除事件
        //this.register(opCodes.G2C_PET_PUSH_EVENT_FINISH,    this.onRecvG2C_PET_PUSH_EVENT_FINISH,this)
        //this.register(opCodes.G2C_PET_RECRUIT_BATE_CONSUME, this.onRecvG2C_PET_RECRUIT_BATE_CONSUME,this) //免费挑战次数
        //this.register(opCodes.G2C_PET_CAMPAIGN_INTIMATE,    this.onRecvG2C_PET_CAMPAIGN_INTIMATE,this)
        //this.register(opCodes.G2C_PET_PUSH_EVENT_UPDATE,    this.onRecvG2C_PET_PUSH_EVENT_UPDATE,this)    //推送事件更新进度
        //this.register(opCodes.G2C_PET_BURST_EVENT,          this.onRecvG2C_PET_BURST_EVENT,this)
        //this.register(opCodes.G2C_PET_ACTIVE_ADVANCE,       this.onRecvG2C_PET_AWAKE_RESULT,this)         //接收到觉醒成功
        //this.register(opCodes.G2C_PET_BURST_EVENT_FINISH,   this.onRecvG2C_PET_BURST_EVENT_FINISH,this)
        //this.register(opCodes.G2C_PET_COLLECT_PRIZE_INFO,   this.onRecvG2C_PET_COLLECT_PRIZE_INFO,this)
        //this.register(opCodes.G2C_ROLE_PET_ACTIVATE,        this.onRecvG2C_ROLE_PET_ACTIVATE,this)        //觉醒联动更新
        //this.register(opCodes.G2C_PET_RECRUIT_HOOP_EX,      this.onRecvG2C_PET_RECRUIT_HOOP_EX,this)      //一键转动结果
        //this.register(opCodes.G2C_PET_ACTIVE_INFO,          this.onRecvG2C_PET_ACTIVE_INFO,this)          //宠物的羁绊进程
        this.register(opCodes.G2C_PET_COMBAT_FORCE_CHNAGE, this.onRecvG2C_PET_COMBAT_FORCE_CHNAGE, this); //战力变化
        //this.register(opCodes.G2C_PET_ADVANCEEX,            this.onRecvG2C_PET_ADVANCEEX,this) //异界邀请
        this.register(opCodes.G2C_PET_RECRUIT_RECORD_LIST, this.onRecvG2C_PET_RECRUIT_RECORD_LIST, this); //召唤记录
        //异界邀请攻略
        //this.register(opCodes.G2C_PET_ADVANCEEX_RECORD,     this.onRecvG2C_PET_ADVANCEEX_RECORD,this) //异界邀请攻略
        //this.register(opCodes.G2C_PET_REPLACE_SKILL,        this.onRecvG2C_PET_REPLACE_SKILL,this)    //技能升级
        //this.register(opCodes.G2C_PRAISE_RECORD,        this.onRecvG2C_PRAISE_RECORD,this)    //点赞记录返回
        //this.register(opCodes.G2C_GLOBAL_SERVER_PET_ADVANCEEX,   this.onRecvG2C_GLOBAL_SERVER_PET_ADVANCEEX,this)    //新记录通知
        //this.register(opCodes.G2C_PET_INHERIT,              this.onRecvG2C_PET_INHERIT,this)          //继承成功
        //this.register(opCodes.G2C_PET_ESSENCE_ABILITY,      this.onRecvG2C_PET_ESSENCE_ABILITY,this)  //查询返回属性点
        this.register(opCodes.G2C_ACTOR_PET_INFO, this.onRecvG2C_ACTOR_PET_INFO, this); //新加入一只宠物																
        this.register(opCodes.G2C_PET_UPDATE, this.onRecvG2C_PET_UPDATE, this); //宠物信息更新
        this.register(opCodes.G2C_PET_UPDATE_FIELD, this.onRecvG2C_PET_UPDATE_FIELD, this); //宠物属性域信息更新
        this.register(opCodes.G2C_ACTOR_PET_INFO_LIST, this.onRecvG2C_ACTOR_PET_INFO_LIST, this); //登录时初始化宠物列表
        // this.register(opCodes.G2C_PET_BIND, this.onRecvG2C_PET_BIND, this)         //宠物绑定
        // this.register(opCodes.G2C_DROP_PARTNER_OR_VOCATION, this.onRecvG2C_DROP_PARTNER_OR_VOCATION, this)         //移除伙伴或职业
        // this.register(opCodes.G2C_ENTER_PET_RECRUIT_HOOP, this.onRecvG2C_ENTER_PET_RECRUIT_HOOP, this)		//祭坛获取信息
        // this.register(opCodes.G2C_PET_QUICK_RECRUIT, this.onRecvG2C_PET_QUICK_RECRUIT, this)      //祭坛抽奖返回结果
        // this.register(opCodes.G2C_PET_QUALITY_PET_LIST, this.onRecvG2C_PET_QUALITY_PET_LIST, this)     //品质替换列表
        // this.register(opCodes.G2C_PET_AWAKE, this.onRecvG2C_PET_AWAKE, this)  //觉醒返回
        // this.register(opCodes.G2C_PET_BREAK, this.onRecvG2C_PET_BREAK, this)  //突破返回
        this.register(opCodes.G2C_PET_UPGRADE_SKILL, this.onRecvG2C_PET_UPGRADE_SKILL, this); //升级技能
        // this.register(opCodes.G2C_SET_NATRUAL_STONE, this.onRecvG2C_SET_NATRUAL_STONE, this)  //镶嵌天赋石
        // this.register(opCodes.G2C_OFF_NATRUAL_STONE, this.onRecvG2C_OFF_NATRUAL_STONE, this)  //卸下天赋石
        // this.register(opCodes.G2C_NATRUAL_STONE_UP, this.onRecvG2C_NATRUAL_STONE_UP, this)		//天赋石升级
        // this.register(opCodes.G2C_PET_QUALITY_PET_LIST, this.onRecvG2C_PET_QUALITY_PET_LIST, this)     //品质替换列表
    };
    PetMessageHandler.prototype.onRecvG2C_ACTOR_PET_INFO = function (dispatcher, message) {
        var petInfo = message.petInfo;
        PetSystem.getInstance().addPetInfo(petInfo);
        //FireEvent(EventDefine.PET_ADD, PetUpdateEvent.newObj(petInfo.entry, petInfo, petInfo))
        FireEvent(EventDefine.PET_LIST_UPDATE, null);
    };
    PetMessageHandler.prototype.onRecvG2C_PET_FREE = function (dispatcher, message) {
        var petId = message.petId;
        TLog.Debug("PetMessageHandler.onRecvG2C_PET_FREE %d", message.petId);
        PetSystem.getInstance().removePetInfo(petId);
        FireEvent(EventDefine.PET_LIST_UPDATE, null);
    };
    // onRecvG2C_DROP_PARTNER_OR_VOCATION(dispatcher, message) {
    // 	let entryId = message.entryId
    // 	if (GameConfig.ProfessionConfig[entryId]) {					//职业
    // 		ProfessionSystem.getInstance().removeProfession(entryId)
    // 	} else {
    // 		let petInfo = PetSystem.getInstance().getPetInfoEntry(entryId)
    // 		if (petInfo) {
    // 			TLog.Debug("PetMessageHandler.onRecvG2C_DROP_PARTNER_OR_VOCATION %d", petInfo.id)
    // 			PetSystem.getInstance().removePetInfo(petInfo.id)
    // 			FireEvent(EventDefine.PET_LIST_UPDATE, null)
    // 		}
    // 	}
    // }
    PetMessageHandler.prototype.onRecvG2C_PET_UPDATE = function (dispatcher, message) {
        var petInfo = message.petInfo;
        PetSystem.getInstance().updatePetInfo(petInfo);
        FireEvent(EventDefine.PET_LIST_UPDATE, null);
    };
    PetMessageHandler.prototype.onRecvG2C_PET_UPDATE_FIELD = function (dispatcher, message) {
        PetSystem.getInstance().updatePetInfoField(message.petId, message.updateProperty);
        FireEvent(EventDefine.PET_LIST_UPDATE, null);
    };
    PetMessageHandler.prototype.onRecvG2C_ACTOR_PET_INFO_LIST = function (dispatcher, message) {
        var petInfoList = message.petInfoList;
        PetSystem.getInstance().updatePetInfoList(petInfoList);
        //FireEvent(EventDefine.PET_LIST, null)
    };
    //宠物绑定
    // onRecvG2C_PET_BIND(dispatcher, message) {
    // 	let petId = message.petId
    // 	let petInfo = PetSystem.getInstance().getPetInfo(petId)
    // 	petInfo.state = message.state
    // 	PetSystem.getInstance().updatePetInfo(petInfo)
    // 	FireEvent(EventDefine.PET_UPDATE, null)
    // }
    // onRecvG2C_ENTER_PET_RECRUIT_HOOP(dispatcher, message) {
    // 	FireEvent(EventDefine.PET_HOOP_UPDATE, PetHoop.newObj(message.prizeList, message.discount, message.breakLevel))
    // }
    // onRecvG2C_PET_RECRUIT_HOOP(dispatcher, message) {
    // 	FireEvent(EventDefine.PET_HOOP_UPDATE, PetHoop.newObj(message.prizeList, message.discount, message.breakLevel))
    // }
    // onRecvG2C_PET_QUICK_RECRUIT(dispatcher, message) {
    // 	FireEvent(EventDefine.PET_QUICK_RECRUIT_PRIZE, PetQuickRecruitPrizeEvent.newObj(message.prizeList))
    // 	let wnd = WngMrg.getInstance().getWindow("GrowPrizeAnimFrame")
    // 	if (wnd && wnd.isVisible()) {
    // 		return
    // 	}
    // 	let prizeItemList = message.prizeList
    // 	if (prizeItemList.length > 0) {
    // 		let flag = false
    // 		let elem = null
    // 		for (let _ in prizeItemList) {
    // 			let v = prizeItemList[_]
    // 			if (v[2] == 1) {				//伙伴
    // 				flag = true
    // 				elem = v
    // 			}
    // 		}
    // 		//有pet动画 120抽必有pet
    // 		if (flag == true) {
    // 			let petid = elem[0]
    // 			let wnd = WngMrg.getInstance().getWindow("ActorShowFrame")
    // 			wnd.showGainPartner(petid, function () {
    // 				let wnd = WngMrg.getInstance().getWindow("PetMagicCircleFrame")
    // 				wnd.showWithPetId(petid)
    // 			}, this)
    // 		} else {
    // 			//id count type 
    // 			//type 0:物品 Item 1:宠物 Pet 2:碎魂 Soul
    // 			//物品情形 这里实际做单抽和10抽物品动画
    // 			if (prizeItemList.length == 1) {
    // 				let itemList: any[] = [prizeItemList[0][0], prizeItemList[0][1]]
    // 				if (prizeItemList[0][2] == opQuickRecruitPrizeType.Soul) {
    // 					let itemCount = GameConfig.PartnerSpiritConfig[prizeItemList[0][0]].soulCount
    // 					let itemId = GameConfig.PartnerSpiritConfig[prizeItemList[0][0]].soulEntryId
    // 					itemList = [itemId, itemCount]
    // 				}
    // 				let wnd = WngMrg.getInstance().getWindow("ActorShowFrame")
    // 				wnd.showOneItemAnim(itemList)
    // 			} else if (prizeItemList.length == 10) {
    // 				let itemList: any[] = []
    // 				for (let i in prizeItemList) {
    // 					let elem = prizeItemList[i]
    // 					let t: any[] = [elem[0], elem[1]]
    // 					if (elem[2] == opQuickRecruitPrizeType.Soul) {
    // 						let itemCount = GameConfig.PartnerSpiritConfig[elem[0]].soulCount
    // 						let itemId = GameConfig.PartnerSpiritConfig[elem[0]].soulEntryId
    // 						t = [itemId, itemCount]
    // 					}
    // 					JsUtil.arrayInstert(itemList, t)
    // 				}
    // 				let wnd = WngMrg.getInstance().getWindow("ActorShowFrame")
    // 				wnd.showTenItemAnim(itemList)
    // 			}
    // 		}
    // 	}
    // }
    // onRecvG2C_PET_QUALITY_PET_LIST(dispatcher, message) {
    // 	let wnd = WngMrg.getInstance().getWindow("PetSummonReplayFrame")
    // 	wnd.showFrameWithList(message.petQualityList)
    // }
    // //觉醒返回
    // onRecvG2C_PET_AWAKE(dispatcher, message) {
    // 	TLog.Debug("PetMessageHandler.onRecvG2C_PET_AWAKE")
    // 	if (GameConfig.PetConfig[message.petentryid]) {				//伙伴
    // 		PetSystem.getInstance().onPetAwake(message)
    // 		// let wnd = WngMrg.getInstance().getWindow("ActorShowFrame")
    // 		// wnd.showPartnerWake(message.petentryid)
    // 	} else {															//主角
    // 		RoleSystem.getInstance().onHeroAwake(message)
    // 	}
    // 	FireEvent(EventDefine.PET_AWAKE, NetMessageEvent.newObj(message))
    // 	//TLog.Debug("EventDefine.PET_AWAKE", EventDefine.PET_AWAKE)
    // 	//TLog.Debug_r(EventDefine)
    // 	//FireEvent(EventDefine.HERO_PET_SOUL_POINT_UPDATE,null)
    // }
    // //突破返回
    // onRecvG2C_PET_BREAK(dispatcher, message) {
    // 	if (message.code == 0) {
    // 		if (GameConfig.PetConfig[message.petentryid]) {
    // 			PetSystem.getInstance().onPetBreak(message.petentryid, message.tolevel)
    // 		} else {
    // 			RoleSystem.getInstance().onHeroBreak(message)
    // 		}
    // 	}
    // 	FireEvent(EventDefine.PET_BREAK, NetMessageEvent.newObj(message))
    // }
    //升级技能
    PetMessageHandler.prototype.onRecvG2C_PET_UPGRADE_SKILL = function (dispatcher, message) {
        var setpos = 0;
        if (message.code == 0) {
            setpos = PetSystem.getInstance().onSkillUpgrade(message.entryid, message.skillid, message.tolevel);
        }
        FireEvent(EventDefine.PET_SKILL_UPGRADE, NetMessageEvent.newObj(message));
        //if(setpos != 0 ){
        //	let msg:any = {['code'] : 0}
        //	FireEvent(EventDefine.VOC_SKILL_SET,msg)
        //}
    };
    //镶嵌天赋石
    // onRecvG2C_SET_NATRUAL_STONE(dispatcher, message) {
    // 	if (message.code == 0) {
    // 		if (message.petentryid >= opVocation.BeginEntryId) {
    // 			ProfessionSystem.getInstance().onNaturalStoneImplant(message.petentryid, message.stoneentryid)
    // 		} else {
    // 			let info = PetSystem.getInstance().getPetInfoEntry(message.petentryid)
    // 			let newinfo: any = {}
    // 			newinfo.id = info.id
    // 			newinfo.naturalStoneList = table_simplecopyvalue(info.naturalStoneList)
    // 			JsUtil.arrayInstert(newinfo.naturalStoneList, message.stoneentryid)
    // 			PetSystem.getInstance().updatePetInfo(newinfo)
    // 		}
    // 	}
    // 	FireEvent(EventDefine.SET_NATRUAL_STONE, NetMessageEvent.newObj(message))
    // }
    // //卸下天赋石
    // onRecvG2C_OFF_NATRUAL_STONE(dispatcher, message) {
    // 	if (message.code == 0) {
    // 		if (message.petentryid >= opVocation.BeginEntryId) {
    // 			ProfessionSystem.getInstance().onNaturalStoneRemove(message.petentryid, message.stoneentryid)
    // 		} else {
    // 			let info = PetSystem.getInstance().getPetInfoEntry(message.petentryid)
    // 			let newinfo: any = {}
    // 			newinfo.id = info.id
    // 			newinfo.naturalStoneList = table_simplecopyvalue(info.naturalStoneList)
    // 			for (let i in newinfo.naturalStoneList) {
    // 				let id = newinfo.naturalStoneList[i]
    // 				if (id == message.stoneentryid) {
    // 					JsUtil.arrayRemove(newinfo.naturalStoneList, i)
    // 					break
    // 				}
    // 			}
    // 			PetSystem.getInstance().updatePetInfo(newinfo)
    // 		}
    // 	}
    // 	FireEvent(EventDefine.OFF_NATRUAL_STONE, NetMessageEvent.newObj(message))
    // }
    //天赋石升级
    // onRecvG2C_NATRUAL_STONE_UP(dispatcher, message) {
    // 	if (message.code == 0) {
    // 		if (message.petentryid >= opVocation.BeginEntryId) {
    // 			ProfessionSystem.getInstance().onNaturalStoneUpgrade(message.petentryid, message.stoneentryid)
    // 		} else {
    // 			let info = PetSystem.getInstance().getPetInfoEntry(message.petentryid)
    // 			let newinfo: any = {}
    // 			newinfo.id = info.id
    // 			newinfo.naturalStoneList = table_simplecopyvalue(info.naturalStoneList)
    // 			let upgradeinfo = GameConfig.NaturalStoneUpgradeConfig[message.stoneentryid]
    // 			let tostoneentryid = upgradeinfo.upgradeToId || 0
    // 			for (let i in newinfo.naturalStoneList) {
    // 				let id = newinfo.naturalStoneList[i]
    // 				if (id == message.stoneentryid) {
    // 					newinfo.naturalStoneList[i] = tostoneentryid
    // 					break
    // 				}
    // 			}
    // 			PetSystem.getInstance().updatePetInfo(newinfo)
    // 		}
    // 	}
    // 	FireEvent(EventDefine.NATRUAL_STONE_UP, NetMessageEvent.newObj(message))
    // }
    PetMessageHandler.prototype.onRecvG2C_PET_COMBAT_FORCE_CHNAGE = function (dispatcher, message) {
        if (message.delta != 0) {
            FireEvent(EventDefine.SHOW_COMBATFORCE_CHANGED, PetCombatForceToShow.newObj(18000, message.delta));
        }
    };
    PetMessageHandler.prototype.onRecvG2C_PET_RECRUIT_RECORD_LIST = function (dispatcher, message) {
        PetSystem.getInstance().setPetSummonRecord(message.summonRecord);
        FireEvent(EventDefine.PET_SUMMON_RECORD_LIST, null);
    };
    return PetMessageHandler;
}(MessageHandler));
__reflect(PetMessageHandler.prototype, "PetMessageHandler");
//# sourceMappingURL=PetMessageHandler.js.map