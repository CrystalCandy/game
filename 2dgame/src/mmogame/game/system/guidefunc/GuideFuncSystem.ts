/*
作者:
    yangguiming
	
创建时间：
   2017.03.15(周三)

意图：
   引导新功能系统（红点）
公共接口：
   
*/


let GuideEquipState: any = {
	EQUIP_NORMAL: 0,  //普通
	EQUIP_NO: 1,  //没装备
	EQUIP_NEEDLEVEL: 2,  //等级不足

	EQUIP_YES: 4,  //可装备
	EQUIP_CHANGE: 5,  //可更换
	//EQUIP_CANMAKE: 6,  //可打造
	EQUIP_CANPROMOTE: 7,  //可晋升
}


class GuideFuncSystem extends BaseSystem {

	wndAndPathsToConfigList: any;
	showWndToConfigList: any;
	hideWndToConfigList: any;
	timerList: any;
	equipPosNameList: any


	manualWndTimesMap: any;
	manualCloseResultMap: any;
	dynamicTipsMap: any;
	simpleServerNotice: any[];

	applyGuideCheckMessage: any[];

	gold: number;

	public initObj(...args: any[]): void {
		this.wndAndPathsToConfigList = {}

		this.showWndToConfigList = {}
		this.hideWndToConfigList = {}

		this.timerList = {}

		RegisterEvent(EventDefine.UI_SHOW, this.onUIShowEvent, this)
		RegisterEvent(EventDefine.UI_HIDE, this.onUIHideEvent, this)
		RegisterEvent(EventDefine.UI_CTRL_SHOW, this.onUIShowEvent, this)
		RegisterEvent(EventDefine.UI_CTRL_HIDE, this.onUIHideEvent, this)
		RegisterEvent(EventDefine.HERO_ENTER_GAME, this.onEnterGameCheck, this)



		this.onClear()
	}

	destory() {
		UnRegisterEvent(EventDefine.UI_SHOW, this.onUIShowEvent, this)
		UnRegisterEvent(EventDefine.UI_HIDE, this.onUIHideEvent, this)
		UnRegisterEvent(EventDefine.UI_CTRL_SHOW, this.onUIShowEvent, this)
		UnRegisterEvent(EventDefine.UI_CTRL_HIDE, this.onUIHideEvent, this)
		UnRegisterEvent(EventDefine.HERO_ENTER_GAME, this.onEnterGameCheck, this)

	}


	onClear() {
		this.manualWndTimesMap = {} //手动关闭红点次数
		this.manualCloseResultMap = {} //关闭的事件记录
		this.dynamicTipsMap = {}
		this.simpleServerNotice = []

		for (let _ in this.timerList) {
			let timer = this.timerList[_]

			KillTimer(timer)
		}
		this.timerList = {}

	}

	prepareResource(workQueue) {
		GameConfig.initGuideFuncSystem(workQueue)
		workQueue.addWorkUnit(CallbackWorkUnit.newObj(this.initBtnTipsConfig, this));
	}

	initBtnTipsConfig() {

		this.wndAndPathsToConfigList = {}

		for (let _ in GameConfig.ButtonTipsConfig) {
			let v = GameConfig.ButtonTipsConfig[_]


			for (let _ = 0; _ < v.buttonList.length; _++) {
				let path = v.buttonList[_]

				let wndName = StringUtil.stringMatch(path, /(\w+)\//)[0]
				let wndinfo = WngMrg.getInstance().findWndMapInfo(wndName)
				if (wndinfo == null) {
					TLog.Error("GuideFuncSystem.initBtnTipsConfig error:%s", path)
					TLog.Assert(false)
				}
				//（一个窗口，可能多个红点对应）
				let pathsToConfigList = this.wndAndPathsToConfigList[wndName] || {}
				pathsToConfigList[path] = pathsToConfigList[path] || []
				JsUtil.arrayInstert(pathsToConfigList[path], v)

				this.wndAndPathsToConfigList[wndName] = pathsToConfigList
			}

			let closeEvent = v.manualCloseParam
			if (closeEvent.show) {
				if (this.showWndToConfigList[closeEvent.show] == null) {
					this.showWndToConfigList[closeEvent.show] = []
				}
				JsUtil.arrayInstert(this.showWndToConfigList[closeEvent.show], v)
			}

			if (closeEvent.hide) {
				if (this.hideWndToConfigList[closeEvent.hide] == null) {
					this.hideWndToConfigList[closeEvent.hide] = []
				}
				JsUtil.arrayInstert(this.hideWndToConfigList[closeEvent.hide], v)
			}

		}

	}


	getConfigList(wndName) {
		//每个BaseWnd下面，保存一个控件路径列表，每个控件路径保存一个事件检查列表
		//wndAndPathsToConfigList ={
		//	[wndName] : {
		//		[path] : {config, config,...}
		//		[path] = {config, config,...}
		//	},
		//	[wndName] = {
		//		[path] : {config, config,...}
		//		[path] = {config, config,...}
		//	},
		//}	
		return this.wndAndPathsToConfigList[wndName]
	}

	//重置为未读
	resetReadState(type, id?) {
		if (id == null)
			id = 0;

		let prefix = type + id
		IGlobal.setting.setRoleSetting(UserSetting.TYPE_NUMBER, prefix, -1)
		FireEvent(EventDefine.GUIDE_FUNC_REFRESH, null)
	}

	//设置已读状态
	setReadState(type, id?) {
		if (id == null)
			id = 0;
		let prefix = type + id
		IGlobal.setting.setRoleSetting(UserSetting.TYPE_NUMBER, prefix, 1)
		FireEvent(EventDefine.GUIDE_FUNC_REFRESH, null)
	}

	//获取读取状态
	getReadState(type, id?) {
		if (id == null)
			id = 0;
		let prefix = type + id
		return IGlobal.setting.getRoleSetting(UserSetting.TYPE_NUMBER, prefix, -1)
	}



	showDynamicTips(type) {

		for (let _ in GameConfig.ButtonTipsConfig) {
			let v = GameConfig.ButtonTipsConfig[_]

			if (v.checkEvent == GuideFuncSpace.GuideFuncCheckDefine.EVENT_DYNAMIC_TIPS) {
				if (v.checkParam.type == type) {
					let id = v.id
					delete this.manualCloseResultMap[id]
					let closeParam = v.manualCloseParam
					if (closeParam.show) {
						delete this.manualWndTimesMap[closeParam.show]
					}
					if (closeParam.hide) {
						delete this.manualWndTimesMap[closeParam.hide]
					}
				}
			}
		}

		this.dynamicTipsMap[type] = true
		FireEvent(EventDefine.GUIDE_FUNC_REFRESH, null)
	}

	hideDynamicTips(type) {
		delete this.dynamicTipsMap[type]
		FireEvent(EventDefine.GUIDE_FUNC_REFRESH, null)
	}




	handleUIEvent(wndName, wndToConfigList) {
		let configList = wndToConfigList[wndName]
		if (configList == null) {
			return
		}

		//记录打开关闭次数次数
		let times = this.manualWndTimesMap[wndName] || 0
		times = times + 1
		this.manualWndTimesMap[wndName] = times

		let bFireEvent = false
		for (let _ in configList) {
			let config = configList[_]

			if (!this.manualCloseResultMap[config.id]) {

				let allTimes = checkNull(config.manualCloseParam.times, 1)
				let result = (times >= allTimes)
				if (result) {
					this.manualCloseResultMap[config.id] = true
					bFireEvent = true

					//完成“引导”后回收（回调）
					this.recycleFuncHandler(config)
				}
			}

		}

		if (bFireEvent) {
			FireEvent(EventDefine.GUIDE_FUNC_REFRESH, null)
		}

	}

	onUIShowEvent(args) {
		this.handleUIEvent(args.window.classname, this.showWndToConfigList)
	}

	onUIHideEvent(args) {
		this.handleUIEvent(args.window.classname, this.hideWndToConfigList)
	}



	checkEquipState(curInfo, equipType) {

		if (curInfo == null) {
			return GuideEquipState.EQUIP_NORMAL
		}

		let isHero = curInfo == GetHeroPropertyInfo()
		let roleInfo = curInfo
		let level = roleInfo.level

		let vocationType = -1
		// if (isHero) {
		// 	vocationType = ProfessionSystem.getInstance().getProfessionType(curInfo.vocation)//主角
		// } else {
		// 	vocationType = PetSystem.getInstance().getProfessionType(curInfo.entry)//伙伴
		// }


		// let itemRef = this.getRecommandEquipRef(curInfo, equipType, true)
		// if (itemRef) {
		// 	if (ItemSystem.getInstance().isEquipPromoteType(itemRef.ItemEntry)) {
		// 		return GuideEquipState.EQUIP_CANPROMOTE
		// 		//}else{
		// 		//	return GuideEquipState.EQUIP_CANMAKE
		// 	}
		// }


		let curEquip = GetActorEquipByType(roleInfo, equipType) //当前部分的装备
		let equipList = ItemSystem.getInstance().getEquipListByTypeAndVocation(equipType, vocationType)

		//1.当前没装备
		if (curEquip == null) {

			let useList = []

			for (let i = 0; i < equipList.length; i++) {
				let v = equipList[i]

				let ownerId = v.getOwnerId()
				if (ownerId < 0) {
					let userLevel = v.getRefProperty("uselevel")
					if (userLevel <= level || v.isUseLevelIgnore() == true) {
						return GuideEquipState.EQUIP_YES
					}

					JsUtil.arrayInstert(useList, v)
				}
			}

			if (useList.length == 0) {
				return GuideEquipState.EQUIP_NO
			}

			return GuideEquipState.EQUIP_NEEDLEVEL
		}

		//2.检查装备
		//可更换:背包里的装备没人使用，使用等级小于角色等级，而且大于当前装备的等级
		//可升级:背包的装备人没使用，而且大于角色等级

		let bchange = false
		let bneedLevel = false
		let curEquipLevel = curEquip.getRefProperty("level")

		for (let i = 0; i < equipList.length; i++) {
			let v = equipList[i]

			let ownerId = v.getOwnerId()
			if (ownerId < 0) {

				let userLevel = v.getRefProperty("uselevel")
				let equipLevel = v.getRefProperty("level")
				if (equipLevel > curEquipLevel) {

					if (userLevel <= level || v.isUseLevelIgnore() == true) {
						bchange = true  //背包的装备
					} else {
						bneedLevel = true
					}

				}

				if (bchange || bneedLevel) {
					break
				}

			}
		}

		//优先判断可更换
		if (bchange) {
			return GuideEquipState.EQUIP_CHANGE
		}

		if (bneedLevel) {
			return GuideEquipState.EQUIP_NEEDLEVEL
		}


		return GuideEquipState.EQUIP_NORMAL

	}

	checkEquipInternal(curInfo) {
		let info = this.checkEquip(curInfo)
		return info[0]
	}

	checkEquip(curInfo) {
		if (curInfo == null) {
			return [false, GuideEquipState.EQUIP_NORMAL]
		}

		let equipPosTypeInfo = GetActorEquipPosTypeInfo()

		for (let pos in equipPosTypeInfo) {
			let type = equipPosTypeInfo[pos]

			let state = this.checkEquipState(curInfo, type)
			if (state >= GuideEquipState.EQUIP_YES) {
				return [true, state]
			}
		}
		return [false, GuideEquipState.EQUIP_NORMAL]
	}

	checkXianLvUpgrade(xianlvId) {
		//let controlist = XianLvSystem.getInstance().getControlList()
		//let netInfo = XianLvSystem.getInstance().getRecvInfo(xianlvId)
		let jihuoList = XianLvSystem.getInstance().getJiHuoList()
		let level = XianLvSystem.getInstance().getLevel(xianlvId)
		let start = XianLvSystem.getInstance().getStar(xianlvId)
		let upgradeConfig = GameConfig.FunUpgradeStageConfig["XianLv"][level]

		let isJiHuo = table_isExsit(jihuoList, xianlvId)
		if (isJiHuo == false) {
			//激活
			let jiHuoItem = GameConfig.ActorXianLvConfig[xianlvId].itemid
			let jiHuoCost = GameConfig.ActorXianLvConfig[xianlvId].itemnum
			let jiHuoHad = ItemSystem.getInstance().getItemCount(jiHuoItem)
			if (jiHuoHad >= jiHuoCost) {
				return true
			}
			return false
		}

		//升阶
		let upHad = ItemSystem.getInstance().getItemCount(upgradeConfig.itemid)
		if (upHad >= upgradeConfig.itemnum) {
			let hadMoney = GetHeroMoney(upgradeConfig.moneyunit)
			if (hadMoney < upgradeConfig.money) {
				return false
			}
			return true
		}

		return false
	}

	checkXialvUpStart(xianlvId) {
		//let controlist = XianLvSystem.getInstance().getControlList()
		//let netInfo = XianLvSystem.getInstance().getRecvInfo(xianlvId)
		let jihuoList = XianLvSystem.getInstance().getJiHuoList()
		let level = XianLvSystem.getInstance().getLevel(xianlvId)
		let start = XianLvSystem.getInstance().getStar(xianlvId)
		let upgradeConfig = GameConfig.FunUpgradeStageConfig["XianLv"][level]

		let isJiHuo = table_isExsit(jihuoList, xianlvId)
		if (isJiHuo == false) {
			//激活
			let jiHuoItem = GameConfig.ActorXianLvConfig[xianlvId].itemid
			let jiHuoCost = GameConfig.ActorXianLvConfig[xianlvId].itemnum
			let jiHuoHad = ItemSystem.getInstance().getItemCount(jiHuoItem)
			if (jiHuoHad >= jiHuoCost) {
				return true
			}
			return false
		}

		//升星
		let starItem = GameConfig.FunUpStarConfig["XianLv"][xianlvId].itemid
		let starHad = ItemSystem.getInstance().getItemCount(starItem)
		let starCost = GameConfig.FunLevelNumConfig["XianLv"][start].num
		if (starHad >= starCost) {
			return true
		}

		return false
	}


	checkHeroTitle(title) {
		let itemId = title.itemid
		let itemnum = title.itemnum
		let had = ItemSystem.getInstance().getItemCount(itemId)
		return had >= itemnum
	}


	//充值活动可领奖
	checkPayActivityPrize() {
		let prizeState: any = {}

		let allList = ActivitySystem.getInstance().getAllRechergeActivity()
		for (let _ in allList) {
			let index = allList[_]

			if (ActivitySystem.getInstance().isPayActivityIndex(index)) {					//只检查充值相关活动
				let info = ActivitySystem.getInstance().getOperateActivityInfo(index)
				let plrinfo = ActivitySystem.getInstance().getOperatePlayerInfo(index)

				if (info) {
					if (index == PayActivityIndex.CREATE_ROLE_SEVEN_DAY ||										//创角七日每天冲值
						index == PayActivityIndex.LIMIT_SINGLE_DAY_PAY_PRIZE || 							//限时每日冲值
						index == PayActivityIndex.LIMIT_SINGLE_DAY_CONSUME_PRIZE ||					//限时每日消费
						index == PayActivityIndex.ACCUM_PAY_PRIZE ||													//累计冲值
						index == PayActivityIndex.ACCUM_CONSUME_PRIZE ||										//累计消费
						index == PayActivityIndex.DAY_ACCUM_PAY_PRIZE ||										//每日累计冲值
						index == PayActivityIndex.DAY_ACCUM_CONSUME_PRIZE) {								//每日累计消费

						let list = info.prizeList
						for (let k = 0; k < list.length; k++) {
							let v = list[k]

							let reachvalue = 0	//0是没有达到 1是达到了没有领取 2是领取了//
							if (plrinfo != null) {
								reachvalue = plrinfo.reachlist[k] || 0
							}

							if (reachvalue == 1) {
								prizeState[index] = true
								break
							}
						}
					} else if (index == PayActivityIndex.SINGLE_PAY_PRIZE ||				//单笔冲值返回物品列表
						index == PayActivityIndex.SINGLE_CONSUME_PRIZE) {			//单笔消费返回物品列表

						let list = info.prizeList
						for (let k = 0; k < list.length; k++) {
							let v = list[k]

							let getTimes = 0 //单笔奖励次数
							if (plrinfo) {
								getTimes = plrinfo.reachlist[k] || 0
							}

							if (getTimes > 0) {
								prizeState[index] = true
								break
							}
						}
					}
				}
			}
		}

		return prizeState
	}


	checkCommonFunc(func, param, args) {
		let curInfo = null
		if (args) {
			curInfo = args.curInfo
		}

		let exceptInfo = null
		if ((param.except == "current") && curInfo) {
			exceptInfo = curInfo
		}

		if (exceptInfo != curInfo && curInfo) {
			return func.call(this, curInfo, param, true) //传入true，是正在选中的
		}

		// let heroInfo = GetHeroPropertyInfo()
		// if (exceptInfo != heroInfo && func.call(this, heroInfo, param)) {
		// 	return true
		// }
		if (param.type == "pet") {
			let petInfoList = PetSystem.getInstance().getPetInfoList()
			for (let id in petInfoList) {
				let petInfo = petInfoList[id]

				if (exceptInfo != petInfo && func.call(this, petInfo, param)) {
					return true
				}
			}
		} else if (param.type == "xianlv") {
			let xianlvInfoList = XianLvSystem.getInstance().getJiHuoList()
			for (let i in xianlvInfoList) {
				let xianlvInfo = xianlvInfoList[i]

				if (exceptInfo != xianlvInfo && func.call(this, xianlvInfo, param)) {
					return true
				}
			}
		}



		return false


	}


	checkFunc(config, args) {
		//if(! GuideSystem.getInstance().isFinishGuide()  ){
		//	return false
		//}

		if (this.manualCloseResultMap[config.id]) {
			return false
		}

		let checkEvent = config.checkEvent
		let checkParam = config.checkParam

		if (GuideFuncSpace.guideFuncCheckHandler[checkEvent]) {
			if (checkParam.check) {
				let [check, _] = CheckMainFrameFunction(checkParam.check)
				if (check == false) {
					return false
				}
			}

			if (checkParam.checkCamp) {
				let check = CampaignSystem.getInstance().isCampaignPass(checkParam.checkCamp)
				if (check == false) {
					return false
				}
			}

			if (checkParam.checkLevel) {
				let heroLevel = GetHeroProperty("level") || 0
				if (heroLevel < checkParam.checkLevel)
					return false
			}

			return GuideFuncSpace.guideFuncCheckHandler[checkEvent].call(this, checkParam, args)
		} else {
			TLog.Debug("the check handler is null!		%s", checkEvent)
			TLog.Throw()
		}
	}



	recycleFuncHandler(config) {
		let checkEvent = config.checkEvent
		let checkParam = config.checkParam

		if (GuideFuncSpace.recycleFuncHandler[checkEvent]) {
			if (checkParam.check) {
				let [check, _] = CheckMainFrameFunction(checkParam.check)
				if (check == false) {
					return
				}
			}

			return GuideFuncSpace.recycleFuncHandler[checkEvent].call(this, config, checkParam)
		}
	}



	////////////////////////////////////////////////////////////////////-回收、作引导记录//////////////////////////////////////-
	//简易性突发提示（服务器即时通知）
	onRecvServerNotice(notice) {
		for (let _ in notice) {
			let v = notice[_]

			if (!table_isExsit(this.simpleServerNotice, v)) {
				table_insert(this.simpleServerNotice, v)
			}
		}
	}

	getServerNotice() {
		return this.simpleServerNotice || []
	}
	//////////////////////////////////////////////////////////////////
	//控制流畅，登录后依次申请相关的数据


	onCheckActivity(applyGuideCheckMessage) {

		function applyBossActivity() {
			RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.MaterialBoss)
			RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.DragonBoss)
			RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.SmallThunderTemple)
			RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.HeavenTrial)
			RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.PersonBoss)
			RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.WorldPlayerBoss)
			RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.ZhongKuiDemon)
			RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.FactionMonster)
		}
		JsUtil.arrayInstert(applyGuideCheckMessage, applyBossActivity)
	}

	onEnterGameCheck(args) {
		if (this.timerList["apply"]) {
			KillTimer(this.timerList["apply"])
			delete this.timerList["apply"]
		}

		if (IsInGlobalActvity() != null) {
			return
		}
		let applyGuideCheckMessage = []

		this.onCheckActivity(applyGuideCheckMessage)

		//月卡信息
		function applyPayPrizeInfo9() {
			RpcProxy.call("C2G_MonthCardInfo")
		}
		JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo9)

		//周卡信息
		function applyPayPrizeInfo10() {
			RpcProxy.call("C2G_WeekCardInfo")
		}
		JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo10)

		//每日首充
		function applyPayPrizeInfo11() {
			RpcProxy.call("C2G_SendOperateAndPlayerData", PayActivityIndex.DAY_ACCUM_PAY_PRIZE)
		}
		JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo11)

		//日常三百
		function applyPayPrizeInfo12() {
			RpcProxy.call("C2G_MEIRISANBAI_MonsterNum")
		}
		JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo12)

		//日常历练
		function applyPayPrizeInfo13() {
			RpcProxy.call("C2G_XiyouLilian_Info")
		}
		JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo13)

		//护送
		function applyPayPrizeInfo14() {
			RpcProxy.call("C2G_EnterEscortActivity")
		}
		JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo14)

		//充值活动（活动信息-个人活动信息）
		//累计冲值
		// function applyPayPrizeInfo1() {
		// 	let message = GetMessage(opCodes.C2G_QUERY_ACTIVITY_PLAYER_INFO)
		// 	message.index = PayActivityIndex.ACCUM_PAY_PRIZE
		// 	SendGameMessage(message)
		// }
		// JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo1)

		// //累计消费
		// function applyPayPrizeInfo2() {
		// 	let message = GetMessage(opCodes.C2G_QUERY_ACTIVITY_PLAYER_INFO)
		// 	message.index = PayActivityIndex.ACCUM_CONSUME_PRIZE
		// 	SendGameMessage(message)
		// }
		// JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo2)

		// //单日累计冲值
		// function applyPayPrizeInfo3() {
		// 	let message = GetMessage(opCodes.C2G_QUERY_ACTIVITY_PLAYER_INFO)
		// 	message.index = PayActivityIndex.DAY_ACCUM_PAY_PRIZE
		// 	SendGameMessage(message)
		// }
		// JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo3)

		// //单日累计消费
		// function applyPayPrizeInfo4() {
		// 	let message = GetMessage(opCodes.C2G_QUERY_ACTIVITY_PLAYER_INFO)
		// 	message.index = PayActivityIndex.DAY_ACCUM_CONSUME_PRIZE
		// 	SendGameMessage(message)
		// }
		// JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo4)

		// //单笔冲值
		// function applyPayPrizeInfo5() {
		// 	let message = GetMessage(opCodes.C2G_QUERY_ACTIVITY_PLAYER_INFO)
		// 	message.index = PayActivityIndex.SINGLE_PAY_PRIZE
		// 	SendGameMessage(message)
		// }
		// JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo5)

		// //单笔消费
		// function applyPayPrizeInfo6() {
		// 	let message = GetMessage(opCodes.C2G_QUERY_ACTIVITY_PLAYER_INFO)
		// 	message.index = PayActivityIndex.SINGLE_CONSUME_PRIZE
		// 	SendGameMessage(message)
		// }
		// JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo6)

		// //限时每日冲值
		// function applyPayPrizeInfo7() {
		// 	let message = GetMessage(opCodes.C2G_QUERY_ACTIVITY_PLAYER_INFO)
		// 	message.index = PayActivityIndex.LIMIT_SINGLE_DAY_PAY_PRIZE
		// 	SendGameMessage(message)
		// }
		// JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo7)

		// //限时每日消费
		// function applyPayPrizeInfo8() {
		// 	let message = GetMessage(opCodes.C2G_QUERY_ACTIVITY_PLAYER_INFO)
		// 	message.index = PayActivityIndex.LIMIT_SINGLE_DAY_CONSUME_PRIZE
		// 	SendGameMessage(message)
		// }
		// JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo8)

		// //创角七日每天冲值
		// function applyPayPrizeInfo9() {
		// 	let message = GetMessage(opCodes.C2G_QUERY_ACTIVITY_PLAYER_INFO)
		// 	message.index = PayActivityIndex.CREATE_ROLE_SEVEN_DAY
		// 	SendGameMessage(message)
		// }
		// JsUtil.arrayInstert(applyGuideCheckMessage, applyPayPrizeInfo9)

		// //竞技场首通
		// function applyChampoinAward() {
		// 	let message = GetMessage(opCodes.C2G_EXCITE_DATA)
		// 	message.exciteType = "singlejjc"
		// 	SendGameMessage(message)

		// 	message = GetMessage(opCodes.C2G_EXCITE_DATA)
		// 	message.exciteType = "serverjjc"
		// 	SendGameMessage(message)
		// }
		// JsUtil.arrayInstert(applyGuideCheckMessage, applyChampoinAward)

		// //地宫首通
		// function applySkyTowerAward() {
		// 	let message = GetMessage(opCodes.C2G_EXCITE_DATA)
		// 	message.exciteType = "servertower"
		// 	SendGameMessage(message)

		// 	message = GetMessage(opCodes.C2G_EXCITE_DATA)
		// 	message.exciteType = "singletower"
		// 	SendGameMessage(message)
		// }
		// JsUtil.arrayInstert(applyGuideCheckMessage, applySkyTowerAward)


		// //航海占领
		// function applyNavOccupy() {
		// 	let activity = GetActivity(ActivityDefine.Relic)
		// 	activity.sendMsgGetMyRelicList()
		// }
		// JsUtil.arrayInstert(applyGuideCheckMessage, applyNavOccupy)



		// //商城特惠礼包
		// function applShopItem() {
		// 	let message = GetMessage(opCodes.C2G_ITEM_SELL_LIST)
		// 	message.seller = Message_C2G_ITEM_SELL_LIST.NPC_TYPE
		// 	message.entryId = ShopScoreType.CHAOZHI
		// 	SendGameMessage(message)
		// }
		// JsUtil.arrayInstert(applyGuideCheckMessage, applShopItem)

		// //七夕活动
		// function valentineItem() {
		// 	let message = GetMessage(opCodes.C2G_FESTIVAL_SINGLEDAY_INFO)
		// 	SendGameMessage(message)
		// }
		// JsUtil.arrayInstert(applyGuideCheckMessage, valentineItem)

		// function zhigouRecord() {
		// 	let message = GetMessage(opCodes.C2G_ROLE_RECHARGE_BUY_PET)
		// 	SendGameMessage(message)
		// }
		// JsUtil.arrayInstert(applyGuideCheckMessage, zhigouRecord)


		let count = applyGuideCheckMessage.length
		let i = 0
		function tick(delay) {
			let func = applyGuideCheckMessage[i]
			if (!func) {
				if (this.timerList["apply"]) {
					KillTimer(this.timerList["apply"])
					delete this.timerList["apply"]
				}
			} else {
				func.call(this)
				i = i + 1
			}
		}
		this.timerList["apply"] = SetTimer(tick, this, 0.5 * 1000, false)
		// this.resetReadState(GuideFuncSpace.GuideFuncReadTypeDefine.SHOP_SELL)
		// this.resetReadState(GuideFuncSpace.GuideFuncReadTypeDefine.ACTIVATE_GIFT)

	}

	//////通用//////////////////////////////////////////////////////////////
	checkOneFunEquip(funType, pos) {
		let funInfo = FunSystem.getInstance().getFunInfoWithType(funType)
		if (!funInfo) {
			return false
		}
		let funStage = funInfo.stage || 1
		let subType = FunSystem.getInstance().getFunSubTypeWithPos(funType, pos)
		//可穿戴装备列表
		let equipList = ItemSystem.getInstance().getFunEquipListWithStage(subType, funStage)
		//已穿戴装备
		let wearEquip = FunSystem.getInstance().getWearEquipWithPos(funType, pos)
		let wearForce = 0
		if (wearEquip && wearEquip.entry) {
			wearForce = GetForceMath(GetFunEquipProperty(wearEquip.entry, wearEquip.quality, wearEquip.add_num))
		}

		let canwear = false
		for (let i in equipList) {
			let equip = <Item>equipList[i]
			let equipForce = GetForceMath(GetFunEquipProperty(equip.entryId, equip.getProperty("quality"), equip.getProperty("add_num")))
			if (wearForce < equipForce) {
				canwear = true
				break
			}
		}
		return canwear
	}

	checkOneFunSkill(funType, pos) {
		let funInfo = FunSystem.getInstance().getFunInfoWithType(funType)
		if (!funInfo) {
			return false
		}

		let skillInfo = FunSystem.getInstance().getFunSkillConfigWithPos(funType, pos + 1)
		let skillList = funInfo.skilllevellist
		let skillLevel = skillList[pos] || 0
		if (skillLevel == 0) { //未解锁
			return false
		}
		else {
			let materialId = skillInfo.itemid
			let info = FunSystem.getInstance().getFunSkillMaterialWithLv(funType, skillLevel)
			let needCount = info.num
			let ownCount = ItemSystem.getInstance().getItemCount(materialId) || 0
			if (ownCount >= needCount) {
				return true
			}
		}

		return false
	}

	checkFunUpgrade(funType) {
		if (!funType) {
			return false
		}

		let funInfo = FunSystem.getInstance().getFunInfoWithType(funType)
		if (!funInfo) {
			return false
		}

		let material = FunSystem.getInstance().getFunUpgradeMaterial(funType, funInfo.stage)
		let ownNum = ItemSystem.getInstance().getItemCount(material.itemId)
		let needNum = material.itemNum

		let needMoney = material.money
		let ownMoney = GetHeroMoney(material.moneyUnit)

		if (ownNum >= needNum && ownMoney >= needMoney) {
			return true
		}
		return false
	}

	////////宠物////////////////////////////////////////////////////////////////////
	checkPetUpgrade(petId) {
		let petConfigInfo = PetSystem.getInstance().getPetEntryInfo(petId)
		let petNetInfo = PetSystem.getInstance().getPetInfo(petId)

		if (!petNetInfo) {
			return false
		}

		let material = FunSystem.getInstance().getFunUpgradeMaterial(cellOptionsIndex.Pet, petNetInfo.stage)
		let ownCount = ItemSystem.getInstance().getItemCount(material.itemId)
		let needCount = material.itemNum
		let ownFunds = GetHeroProperty("funds")
		let needFunds = material.money

		return ownCount >= needCount && ownFunds >= needFunds
	}

	checkPetEmbattle(petId) {

	}

	checkPetNaturl(petId) {
		let petConfigInfo = PetSystem.getInstance().getPetEntryInfo(petId)
		let petNetInfo = PetSystem.getInstance().getPetInfo(petId)
		if (!petNetInfo) {
			return false
		}

		let combatPos = petNetInfo.combatpos || opPetCombatPos.Rest

		//0代表没有出战，1代表出战 2代表备战1 3代表备战2
		let posList = PetSystem.getInstance().getEmbattlePosList()
		if (size_t(posList) < 3 && combatPos == opPetCombatPos.Rest) {
			return true
		} else {
			return false
		}
	}

	checkPetUpgradeWnd(petId) {
		let check = false
		let checkFuncs = [this.checkPetUpgrade, this.checkPetNaturl]
		for (let i in checkFuncs) {
			let func = checkFuncs[i]
			if (func.call(this, petId)) {
				return true
			}
		}
		return check
	}

	checkPetSkillWnd(petId) {
		return false
	}

	//帮会妖怪
	checkFactionMonster() {
		let info = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.FactionMonster)
		if (!info) {
			return false
		}

		let hpPercent = info.hpPercent || 0
		let isLinQu = info.prize || 0

		let clubInfo = ClubSystem.getInstance().getCurClubInfo() || {}
		let clubLv = clubInfo.level || 1

		//时间段
		let timeConfig = GameConfig.FactionMonsterConfig[clubLv].activeTime
		let timeSlot1 = timeConfig[0]
		let timeSlot2 = timeConfig[1]

		let serverTime = GetServerTime()

		let timeStart1 = GetTodayTime(serverTime, timeSlot1[0], timeSlot1[1])
		let timeEnd1 = GetTodayTime(serverTime, timeSlot1[2], timeSlot1[3])

		let timeStart2 = GetTodayTime(serverTime, timeSlot1[0], timeSlot1[1])
		let timeEnd2 = GetTodayTime(serverTime, timeSlot1[2], timeSlot1[3])

		if (serverTime >= timeStart1 && serverTime <= timeEnd1) { //活动时间段1
			if (hpPercent == 0 && isLinQu > 0) { //已领取
				return false
			} else {
				return true
			}
		} else if (serverTime >= timeStart2 && serverTime <= timeEnd2) { //活动时间段2
			if (hpPercent == 0 && isLinQu > 0) { //已领取
				return false
			} else {
				return true
			}
		} else { //未开启
			return false
		}
	}

	//护送
	checkHuSong() {
		let act = GetActivity(ActivityDefine.HuSong)
		let info = act.getActInfo()
		if (!info) {
			return false
		}

		let hadHusong = info.husongTwice || 0
		let hadLanjie = info.lanjieTwice || 0

		if (hadHusong > 0) {
			return true
		} else {
			return false
		}
	}

	//属性丹
	checkPropertyDan(funType) {
		let drugConfig = GameConfig.FunAbilityDrugConfig[cellOptionsName[funType - 1]];
		if (!drugConfig) {
			return false
		}
		let danId = drugConfig["itemid"]

		let itemCount = ItemSystem.getInstance().getItemCount(danId)
		return itemCount > 0
	}
}
