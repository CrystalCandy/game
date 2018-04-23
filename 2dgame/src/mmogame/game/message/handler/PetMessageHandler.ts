/*
作者:
    liuziming
	
创建时间：
   2013.8.08(周四)

意图：
   

公共接口：
   
*/

class PetMessageHandler extends MessageHandler {

	public initObj(...args: any[]): void {

		//this.register(opCodes.G2C_PET_FREE,    							this.onRecvG2C_PET_FREE, this)								//放生一只宠物
		//this.register(opCodes.G2C_PET_DICTIONARY_UPDATE,    this.onRecvG2C_PET_DICTIONARY_UPDATE, this)		//更新宠物图鉴
		//this.register(opCodes.G2C_PET_HOLY_UPGRADE_NEED,    this.onRecvG2C_PET_HOLY_UPGRADE_NEED, this)		//返回神兽进修

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
		this.register(opCodes.G2C_PET_COMBAT_FORCE_CHNAGE, this.onRecvG2C_PET_COMBAT_FORCE_CHNAGE, this)  //战力变化
		//this.register(opCodes.G2C_PET_ADVANCEEX,            this.onRecvG2C_PET_ADVANCEEX,this) //异界邀请
		this.register(opCodes.G2C_PET_RECRUIT_RECORD_LIST, this.onRecvG2C_PET_RECRUIT_RECORD_LIST, this) //召唤记录

		//异界邀请攻略
		//this.register(opCodes.G2C_PET_ADVANCEEX_RECORD,     this.onRecvG2C_PET_ADVANCEEX_RECORD,this) //异界邀请攻略
		//this.register(opCodes.G2C_PET_REPLACE_SKILL,        this.onRecvG2C_PET_REPLACE_SKILL,this)    //技能升级
		//this.register(opCodes.G2C_PRAISE_RECORD,        this.onRecvG2C_PRAISE_RECORD,this)    //点赞记录返回
		//this.register(opCodes.G2C_GLOBAL_SERVER_PET_ADVANCEEX,   this.onRecvG2C_GLOBAL_SERVER_PET_ADVANCEEX,this)    //新记录通知
		//this.register(opCodes.G2C_PET_INHERIT,              this.onRecvG2C_PET_INHERIT,this)          //继承成功
		//this.register(opCodes.G2C_PET_ESSENCE_ABILITY,      this.onRecvG2C_PET_ESSENCE_ABILITY,this)  //查询返回属性点


		this.register(opCodes.G2C_ACTOR_PET_INFO, this.onRecvG2C_ACTOR_PET_INFO, this)									//新加入一只宠物																
		this.register(opCodes.G2C_PET_UPDATE, this.onRecvG2C_PET_UPDATE, this)							//宠物信息更新
		this.register(opCodes.G2C_PET_UPDATE_FIELD, this.onRecvG2C_PET_UPDATE_FIELD, this)				//宠物属性域信息更新
		this.register(opCodes.G2C_ACTOR_PET_INFO_LIST, this.onRecvG2C_ACTOR_PET_INFO_LIST, this)								//登录时初始化宠物列表
		// this.register(opCodes.G2C_PET_BIND, this.onRecvG2C_PET_BIND, this)         //宠物绑定
		// this.register(opCodes.G2C_DROP_PARTNER_OR_VOCATION, this.onRecvG2C_DROP_PARTNER_OR_VOCATION, this)         //移除伙伴或职业

		// this.register(opCodes.G2C_ENTER_PET_RECRUIT_HOOP, this.onRecvG2C_ENTER_PET_RECRUIT_HOOP, this)		//祭坛获取信息
		// this.register(opCodes.G2C_PET_QUICK_RECRUIT, this.onRecvG2C_PET_QUICK_RECRUIT, this)      //祭坛抽奖返回结果
		// this.register(opCodes.G2C_PET_QUALITY_PET_LIST, this.onRecvG2C_PET_QUALITY_PET_LIST, this)     //品质替换列表

		// this.register(opCodes.G2C_PET_AWAKE, this.onRecvG2C_PET_AWAKE, this)  //觉醒返回
		// this.register(opCodes.G2C_PET_BREAK, this.onRecvG2C_PET_BREAK, this)  //突破返回
		this.register(opCodes.G2C_PET_UPGRADE_SKILL, this.onRecvG2C_PET_UPGRADE_SKILL, this)		//升级技能

		// this.register(opCodes.G2C_SET_NATRUAL_STONE, this.onRecvG2C_SET_NATRUAL_STONE, this)  //镶嵌天赋石
		// this.register(opCodes.G2C_OFF_NATRUAL_STONE, this.onRecvG2C_OFF_NATRUAL_STONE, this)  //卸下天赋石
		// this.register(opCodes.G2C_NATRUAL_STONE_UP, this.onRecvG2C_NATRUAL_STONE_UP, this)		//天赋石升级

		// this.register(opCodes.G2C_PET_QUALITY_PET_LIST, this.onRecvG2C_PET_QUALITY_PET_LIST, this)     //品质替换列表

	}

	onRecvG2C_ACTOR_PET_INFO(dispatcher, message) {
		let petInfo = message.petInfo
		PetSystem.getInstance().addPetInfo(petInfo)
		//FireEvent(EventDefine.PET_ADD, PetUpdateEvent.newObj(petInfo.entry, petInfo, petInfo))
		FireEvent(EventDefine.PET_LIST_UPDATE, null)
	}

	onRecvG2C_PET_FREE(dispatcher, message) {
		let petId = message.petId
		TLog.Debug("PetMessageHandler.onRecvG2C_PET_FREE %d", message.petId)
		PetSystem.getInstance().removePetInfo(petId)

		FireEvent(EventDefine.PET_LIST_UPDATE, null)
	}


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

	onRecvG2C_PET_UPDATE(dispatcher, message) {
		let petInfo = message.petInfo
		PetSystem.getInstance().updatePetInfo(petInfo)

		FireEvent(EventDefine.PET_LIST_UPDATE, null)
	}

	onRecvG2C_PET_UPDATE_FIELD(dispatcher, message) {
		PetSystem.getInstance().updatePetInfoField(message.petId, message.updateProperty)

		FireEvent(EventDefine.PET_LIST_UPDATE, null)
	}

	onRecvG2C_ACTOR_PET_INFO_LIST(dispatcher, message) {
		let petInfoList = message.petInfoList
		PetSystem.getInstance().updatePetInfoList(petInfoList)

		//FireEvent(EventDefine.PET_LIST, null)
	}

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
	onRecvG2C_PET_UPGRADE_SKILL(dispatcher, message) {
		let setpos = 0
		if (message.code == 0) {
			setpos = PetSystem.getInstance().onSkillUpgrade(message.entryid, message.skillid, message.tolevel)
		}

		FireEvent(EventDefine.PET_SKILL_UPGRADE, NetMessageEvent.newObj(message))
		//if(setpos != 0 ){
		//	let msg:any = {['code'] : 0}
		//	FireEvent(EventDefine.VOC_SKILL_SET,msg)
		//}
	}

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





	onRecvG2C_PET_COMBAT_FORCE_CHNAGE(dispatcher, message) {
		if (message.delta != 0) {
			FireEvent(EventDefine.SHOW_COMBATFORCE_CHANGED, PetCombatForceToShow.newObj(18000, message.delta))
		}
	}

	onRecvG2C_PET_RECRUIT_RECORD_LIST(dispatcher, message) {
		PetSystem.getInstance().setPetSummonRecord(message.summonRecord)
		FireEvent(EventDefine.PET_SUMMON_RECORD_LIST, null)
	}




	//onRecvG2C_PET_SET_COLOR( dispatcher, message){
	//  let petId = message.petId
	//  let color1 = message.color1
	//  let color2 = message.color2
	//	FireEvent(EventDefine.PET_SET_COLOR, PetColorResultEvent.newObj(petId,color1,color2))
	//}
	//
	//onRecvG2C_PET_SELECT_AUTO( dispatcher, message){
	//  let petId = message.petId
	//  let potentiallist:any = {}
	//  potentiallist.habitus = message.habitus
	//  potentiallist.intellect = message.intellect
	//  potentiallist.strength = message.strength
	//  potentiallist.agility = message.agility
	//  potentiallist.stamina = message.stamina 
	//	FireEvent(EventDefine.PET_SET_POTENTIAL, PetPotentialAutoEvent.newObj(petId,potentiallist))
	//}
	//
	//onRecvG2C_ITEM_WAREHOUSE_PET( dispatcher, message){
	//	let petInfoList = message.petInfoList
	//	FireEvent(EventDefine.ITEM_STORE_PET, ItemStorePetEvent.newObj(petInfoList))
	//}
	//
	//
	//
	////宠物亲密度事件
	//onRecvG2C_PET_INTIMATE_EVENT( dispatcher, message){
	//	let petId = message.petId
	//	let eventId = message.eventId
	//	
	//	let wnd = WngMrg.getInstance().getWindow("OnLineInteractionFrame")		
	//	wnd.showOnLineInteractionFrame(petId,eventId)
	//}
	//
	////宠物可用互动次数
	//onRecvG2C_PET_ENTER_INTERACT( dispatcher, message){
	//	let interactCount = message.interactCount
	//	let interval = message.interval
	//	let interactEvent=message.interactEvent
	//	FireEvent(EventDefine.PET_INTERACT_COUNT, PetInteractCountEvent.newObj(interactCount,interval,interactEvent))
	//}
	//
	////宠物互动事件
	//onRecvG2C_PET_INTERACT_EVENT( dispatcher, message){
	//	let eventId = message.eventId
	//	let itemEntryId =message.itemEntryId
	//	FireEvent(EventDefine.PET_INTERACT_EVENT_ID, PetInteractEventIdEvent.newObj(eventId,itemEntryId))
	//}
	//
	//onRecvG2C_PET_INVITE_LIST( dispatcher, message){
	//	let inviteList=message.inviteList
	//	//PetSystem.getInstance().setInviteResult(inviteList)
	//	//FireEvent(EventDefine.PET_INVITE_LIST_UPDATE,null)
	//}
	//
	//onRecvG2C_PET_ADVANCE_RESULT( dispatcher, message){
	//	let petEntryId=message.petEntryId
	//	FireEvent(EventDefine.PET_INVITE_RESULT,PetInviteResultEvent.newObj(petEntryId))
	//}
	//
	//onRecvG2C_ROLE_PET_ACTIVATE( dispatcher, message){
	//	let activatedList=message.activatedList
	//	PetSystem.getInstance().setActivatedList(activatedList)
	//}
	//
	//onRecvG2C_PET_APPRECIATE( dispatcher, message){
	//	let undressInfo=message.undressInfo
	//	FireEvent(EventDefine.PET_UNDRESS_UPDATE,PetUndressEvent.newObj(undressInfo))
	//}
	//
	//onRecvG2C_ROLE_ALL_PET( dispatcher, message){
	//	let unlockPetList=message.unlockPetList
	//	PetSystem.getInstance().setUnlockPetList(unlockPetList)
	//}
	//
	//
	//
	//onRecvG2C_PET_QUICK_RECRUIT_EX( dispatcher, message){
	//	//let sweepPrice=message.sweepPrice 
	//	//PetSystem.getInstance().setChallengePrizeEx(sweepPrice)
	//	let sweepPrice=message.sweepPrice 
	//	let recvType = message.recvType
	//	//if(recvType == opQuickRecruitType.Combate ){
	//		PetSystem.getInstance().setChallengePrizeEx(sweepPrice)
	//	//}else if(recvType == opQuickRecruitType.Wipe ){
	//	//	FireEvent(EventDefine.PET_QUICK_RECRUIT_PRIZE,PetQuickRecruitPrizeEvent.newObj(sweepPrice))
	//	//}
	//}
	//
	//
	//onRecvG2C_UPDATE_QUICK_RECRUIT( dispatcher, message){
	//	let remainTimes = message.remainTimes
	//	FireEvent(EventDefine.PET_UPDATE_QUICK_RECRUIT,PetUpdateQuickRecruitEvent.newObj(remainTimes))
	//}                        
	//
	//onRecvG2C_PET_PUSH_EVENT( dispatcher, message){
	//	let petEntry = message.petEntry
	//	let eventId  = message.pushEventId
	//	FireEvent(EventDefine.PET_PUSH_EVENT,PetPushEvent.newObj(petEntry,eventId))
	//}
	//
	//onRecvG2C_PET_INVITE_ADVANCE( dispatcher, message){
	//	let successRate = message.successRate
	//	FireEvent(EventDefine.SUCCESS_RATE_UPDATE,PetInviteSuccessRate.newObj(successRate))
	//	FireEvent(EventDefine.SUCCESS_RATE_UPDATE_FOR_FAILED,PetInviteSuccessRate.newObj(successRate))
	//}
	//
	//
	//
	//onRecvG2C_PET_PUSH_EVENT_REMOVE( dispatcher, message){
	//	if(message.result == 1 ){
	//		FireEvent(EventDefine.PET_EVENT_DELETE_SUCCESS,null)
	//	}
	//}
	//
	//onRecvG2C_PET_PUSH_EVENT_FINISH( dispatcher, message){
	//	if(message.result == 1 ){
	//		FireEvent(EventDefine.PET_EVENT_FINISH_SUCCESS,null)
	//		FireEvent(EventDefine.PET_EVENT_DELETE_SUCCESS,null)
	//	}
	//}
	//
	//
	//
	////挑战消耗
	//onRecvG2C_PET_RECRUIT_BATE_CONSUME( dispatcher, message){
	//	let args:any = {}
	//	args.freeBateCount = message.freeBateCount  //免费挑战次数
	//	args.bateNeedGold = message.bateNeedGold   	//挑战所需晶石
	//	args.wideNeedGold = message.wideNeedGold  	//扫荡所需晶石
	//	args.remainTimes = message.remainTimes			//剩余挑战次数
	//	PetSystem.getInstance().setQuickRecruitArgs(args)
	//	FireEvent(EventDefine.PET_RECRUIT_BATE_CONSUME,PetRecruitBateConsume.newObj(message.freeBateCount,message.bateNeedGold,message.wideNeedGold,message.remainTimes))		
	//}
	//
	//onRecvG2C_PET_CAMPAIGN_INTIMATE( dispatcher, message){
	//	FireEvent(EventDefine.PET_PASS_BATTLE_EVENT,PetSurpriseEvent.newObj(message.petEntry))
	//}
	//
	//onRecvG2C_PET_PUSH_EVENT_UPDATE( dispatcher, message){
	//	let updateList = message.updateList
	//	PetSystem.getInstance().setPushEvenFinishProgress(updateList)
	//	FireEvent(EventDefine.PET_PUSH_EVENT_PROGRESS_UPDATE,null)
	//}
	//
	//onRecvG2C_PET_BURST_EVENT( dispatcher, message){
	//	let petEntry = message.petEntry
	//	let eventData = message.eventData
	//	FireEvent(EventDefine.PET_BREAK_OUT_EVENT,PetBreakOutEvent.newObj(petEntry,eventData))
	//	
	//}
	//
	//onRecvG2C_PET_AWAKE_RESULT( dispatcher, message){
	//	//let petEntry = message.petEntry
	//	//FireEvent(EventDefine.MSG_WAIT_END, null)
	//	//FireEvent(EventDefine.PET_AWAKE_SUCCESS,PetAwakeSuccess.newObj(petEntry))
	//}
	//
	//onRecvG2C_PET_BURST_EVENT_FINISH( dispatcher, message){
	//	let result = message.result
	//	if(result == 1 || result ==0 ){
	//		FireEvent(EventDefine.PET_BREAK_OUT_EVENT_FINISH,null)
	//	}
	//	
	//	function finishEvent(){
	//		let wnd = WngMrg.getInstance().getWindow("BreakOutEventSelectorFrame")
	//		if(wnd.isVisible() ){
	//			//wnd.onFinishEvent()
	//			wnd.showReact()
	//		}
	//	}
	//	
	//	if(FightSystem.getInstance().isFight() == true ){
	//		FightSystem.getInstance().addEndFightHandler(finishEvent, this, null)
	//	//}else{
	//	//	finishEvent()
	//	}
	//}
	//
	//onRecvG2C_PET_COLLECT_PRIZE_INFO( dispatcher, message){
	//	PetSystem.getInstance().setCollectPrize(message.prize)
	//	//FireEvent(EventDefine.PET_COLLECT_PRIZE_INFO,PetCollectPrizeInfo.newObj(message.prize))
	//	FireEvent(EventDefine.PET_COLLECT_PRIZE_UPDATE,null)
	//}
	//
	//onRecvG2C_PET_RECRUIT_HOOP_EX( dispatcher, message){
	//	//TLog.Error("now receive the result")
	//	//table_TLog.Debug(message.turnResult)
	//	FireEvent(EventDefine.ONE_KEY_TURN_RESULT,PetOneKeyTurnEvent.newObj(message.turnResult))
	//}
	//
	//onRecvG2C_PET_ACTIVE_INFO( dispatcher, message){
	//	FireEvent(EventDefine.PET_ACTIVE_INFO,PetActiveInfo.newObj(message.friendShipList))
	//}
	//
	//
	//onRecvG2C_PET_ADVANCEEX( dispatcher, message){
	//	FireEvent(EventDefine.INVITE_RETURN,InviteReturnEvent.newObj(message.successFlag,message.resultType,message.destPetEntryId))
	//}
	//onRecvG2C_PET_ADVANCEEX_RECORD( dispatcher, message){
	//	PetSystem.getInstance().setSuperCallPetInfo(message.petEntry,message.petInfo)
	//	FireEvent(EventDefine.SUPER_CALL_SHARE_RECORD,null)
	//}
	//
	//onRecvG2C_PET_REPLACE_SKILL( dispatcher, message){
	//	FireEvent(EventDefine.PET_REPLACE_SKILL,PetReplaceSkillEvent.newObj(message.oldSkill,message.newObjSkill))
	//}
	//onRecvG2C_PRAISE_RECORD( dispatcher, message){
	//	PetSystem.getInstance().setSuperCallPraiseRecord(message.savePraiseRecord)
	//	FireEvent(EventDefine.SUPER_CALL_PRAISE_RECORD,null)
	//}
	//
	//onRecvG2C_GLOBAL_SERVER_PET_ADVANCEEX( dispatcher, message){
	//	PetSystem.getInstance().addSuperCallEntry(message.petEntry)
	//}
	//
	//onRecvG2C_PET_INHERIT( dispatcher, message){
	//	FireEvent(EventDefine.PET_INHERIT_SUCCESS,null)
	//}
	//
	//onRecvG2C_PET_ESSENCE_ABILITY( dispatcher, message){
	//	FireEvent(EventDefine.PET_POINT_RETURN,PetPointEvent.newObj(message.values,message.point,message.exchange,message.ratio))
	//	let wnd = WngMrg.getInstance().getWindow("PetMasteryFrame")
	//	wnd.setArgs(message.values,message.point,message.exchange,message.ratio)
	//}

}