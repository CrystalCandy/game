/*
作者:
    yangguiming
	
创建时间：
   2017.03.15(周三)

意图：
   检查是否有红点提示
   定义红点事件步骤：
   1.定义 GuideFuncCheckDefine
   2.定义 GuideFuncEvent，checkDefine对应的刷新事件
   3.定义检查函数
   
公共接口：
   
*/


module GuideFuncSpace {
	export let GuideFuncCheckDefine = {
		EVENT_EMAIL: "event_email", //是否有未读邮件
		EVENT_FRIEND_APPLY: "event_friend_apply", //好友申请
		EVENT_FRIEND_CHAT: "event_friend_chat", //好友聊天
		EVENT_ACTIVITY_OPEN: "event_activity_open", //活动正在开启
		EVENT_CHAMPION_FIGHT: "event_champion_fight", //竞技场挑战
		EVENT_ALWAYS_SHOW: "event_always_show", //首次显示



		//EVENT_PET_EQUIP: "event_pet_equip", //伙伴主角装备
		EVENT_PET_SKILLUPGRADE: "event_pet_skillupgrade", //伙伴主角技能升级


		EVENT_SERVER_NOTICE: "event_server_notice",	//简易（红点）事件通知,参数详见OpFunctionNotice
		EVENT_PAY_PRIZE: "event_pay_prize",	//充值活动奖励领取
		EVENT_VIP_DAILY: "event_vip_daily",	//VIP每日奖励


		EVENT_DYNAMIC_TIPS: "event_dynamic_tips", //动态提示
		EVENT_CLUB_NULL: "event_club_null", //没加入公会

		EVENT_ITEM_EXSIT: "event_item_exsit", //指定物品是否存在


		EVENT_COPY_MATERIAL: "event_copy_material", //材料副本
		EVENT_COPY_DRAGON: "event_copy_dragon", //龙王宝藏
		EVENT_COPY_TEMPLE: "event_copy_temple", //小雷音寺
		EVENT_COPY_HEAVEN: "event_copy_heaven", //天庭试炼
		EVENT_BOSS_SINGLE: "event_boss_single", //个人BOSS
		EVENT_BOSS_GLOBAL: "event_boss_global", //全民BOSS
		EVENT_EQUIPPACKET_FULL: "event_equippacket_full", //装备背包满了

		EVENT_COPY_DRAGONPRIZE: "event_copy_dragonprize", //龙王宝藏领奖
		EVENT_COPY_HEAVENPRIZE: "event_copy_heavenprize", //天庭试炼领奖

		EVENT_MEIRI_HAOLI: "event_meiri_haoli", //每日豪礼
		EVENT_WELFARE_SIGN: "event_welfare_sign", //福利大厅-签到奖励
		EVENT_WELFARE_SIGN_GIFT: "event_welfare_sign_gift", //每日签到奖励
		EVENT_WELFARE_LEVEL: "event_welfare_level", //福利大厅-等级奖励
		EVENT_WELFARE_MONTH_CARD: "event_welfare_month_card", //福利大厅-月卡
		EVENT_WELFARE_WEEK_CARD: "event_welfare_week_card", //福利大厅-周卡
		EVENT_MEIRI_PAY: "event_meiri_pay", //每日重置
		EVENT_WELFARE: "event_welfare", //福利大厅
		EVENT_WELFARE_WELFARE: "event_welfare_welfare", //福利大厅-福利
		//refreshDotTipsEvent

		EVENT_FUN_DAN: "event_fun_dan", //属性丹
		EVENT_FUN_EQUIP: "event_fun_equip", //通用装备
		EVENT_FUN_SKILL: "event_fun_skill", //通用技能
		EVENT_FUN_UPGRADE: "event_fun_upgrade", //通用升级

		EVENT_PET_UPGRADE: "event_pet_upgrade", //宠物升级
		EVENT_PET_EMBATTLE: "event_pet_embattle", //宠物出战和备战



		EVENT_FORGE_QIANGHUA: "event_forge_qianghua", //锻造强化
		EVENT_FORGE_JINGLIAN: "event_forge_jinglian", //锻造精炼
		EVENT_FORGE_DUANLIAN: "event_forge_duanlian", //锻造锻炼
		EVENT_FORGE_BAOSHI: "event_forge_baoshi", //锻造宝石

		EVENT_ROLE_EQUIP_TIPS: "event_role_equip_tips", //角色装备红点
		EVENT_ROLE_UPGRADE_TIPS: "event_role_upgrade_tips", //角色升级
		EVENT_ROLE_TITLE_TIPS: "event_role_title_tips", //角色称号
		EVENT_ROLE_FASHION_TIPS: "event_role_fashion_tips", //角色时装
		EVENT_ROLE_SKILL: "event_role_skill", //角色技能

		EVENT_XIANLV_TOTAL_UPGRADE: "event_xianlv_total_upgrade", //仙侣升阶
		EVENT_XIANLV_UPGRADE: "event_xianlv_upgrade", //仙侣升阶
		EVENT_XIANLV_TOTAL_UPSTART: "event_xianlv_total_upstart", //仙侣升星
		EVENT_XIANLV_UPSTART: "event_xianlv_upstart", //仙侣升星

		EVENT_XIANLV_JIHUO: "event_xianlv_jihuo",  ///仙侣激活

		EVENT_DAILY_XIANGYAO: "event_daily_xiangyao",  //日常降妖
		EVENT_DAILY_ZUDUI: "event_daily_zudui", 		//日常组队
		EVENT_DAILY_SANBAI: "event_daily_sanbai",  	//日常三百
		EVENT_DAILY_LILIAN: "event_daily_lilian",  	//日常历练

	}


	export let GuideFuncReadTypeDefine = {
		// PET_AWAKE: "awake",
		// PROFESSION_PROMOTE: "profession",
		// PET_HERO_LEVEL: "level",

		// PET_HERO_SKILLLEVEL: "skilllevel",

		// STONE_LINK: "link", //天赋石羁绊
		// STONE_LINKEMPTY: "linkempty", //天赋石多了个孔

		// SHOP_SELL: "shopsell",
		// ACTIVATE_GIFT: "actgift",

		TASK_CAMPAIN: "taskcampain",
	}


	//需要监听的事件列表
	export let GuideFuncEvent: any = {
		[GuideFuncCheckDefine.EVENT_EMAIL]: [EventDefine.MAIL_LIST,],
		[GuideFuncCheckDefine.EVENT_FRIEND_APPLY]: [EventDefine.FRIEND_APPLYLIST_UPDATE,],
		[GuideFuncCheckDefine.EVENT_FRIEND_CHAT]: [EventDefine.MESSAGE_UPDATE, EventDefine.OFFLINE_CHAT_MSG, EventDefine.FRIEND_UNREAD_UPDATE],
		[GuideFuncCheckDefine.EVENT_ACTIVITY_OPEN]: [EventDefine.ACTIVITY_STATE_LIST, EventDefine.HERO_INFO_UPDATE],
		[GuideFuncCheckDefine.EVENT_CHAMPION_FIGHT]: [EventDefine.HERO_INFO_UPDATE,],

		[GuideFuncCheckDefine.EVENT_PET_UPGRADE]: [EventDefine.ITEM_UPDATE, EventDefine.PET_LIST_UPDATE, EventDefine.PET_UPDATE],
		//[GuideFuncCheckDefine.EVENT_PET_EQUIP]: [EventDefine.ITEM_UPDATE, EventDefine.PET_LIST_UPDATE, EventDefine.HERO_INFO_UPDATE],
		[GuideFuncCheckDefine.EVENT_PET_SKILLUPGRADE]: [EventDefine.ITEM_UPDATE, EventDefine.PET_LIST_UPDATE, EventDefine.HERO_INFO_UPDATE],

		[GuideFuncCheckDefine.EVENT_SERVER_NOTICE]: [EventDefine.GUIDE_SERVER_NOTICE,],
		[GuideFuncCheckDefine.EVENT_PAY_PRIZE]: [EventDefine.PAY_ACTIVITY_INFO,],
		[GuideFuncCheckDefine.EVENT_VIP_DAILY]: [EventDefine.HERO_INFO_UPDATE,],
		[GuideFuncCheckDefine.EVENT_CLUB_NULL]: [EventDefine.HERO_INFO_UPDATE,],

		[GuideFuncCheckDefine.EVENT_ITEM_EXSIT]: [EventDefine.ITEM_UPDATE],

		[GuideFuncCheckDefine.EVENT_MEIRI_HAOLI]: [EventDefine.HERO_INFO_UPDATE, EventDefine.PAY_ACTIVITY_INFO],
		[GuideFuncCheckDefine.EVENT_WELFARE_SIGN]: [EventDefine.HERO_INFO_UPDATE],
		[GuideFuncCheckDefine.EVENT_WELFARE_SIGN_GIFT]: [EventDefine.ITEM_UPDATE],
		[GuideFuncCheckDefine.EVENT_WELFARE_LEVEL]: [EventDefine.HERO_INFO_UPDATE],
		[GuideFuncCheckDefine.EVENT_WELFARE_MONTH_CARD]: [EventDefine.HERO_INFO_UPDATE, EventDefine.PAY_ACTIVITY_MONTH_CARD],
		[GuideFuncCheckDefine.EVENT_WELFARE_WEEK_CARD]: [EventDefine.HERO_INFO_UPDATE, EventDefine.PAY_ACTIVITY_WEEK_CARD],
		[GuideFuncCheckDefine.EVENT_MEIRI_PAY]: [EventDefine.PAY_ACTIVITY_INFO, EventDefine.HERO_INFO_UPDATE],
		[GuideFuncCheckDefine.EVENT_WELFARE]: [EventDefine.HERO_INFO_UPDATE],
		[GuideFuncCheckDefine.EVENT_WELFARE_WELFARE]: [EventDefine.HERO_INFO_UPDATE],


		[GuideFuncCheckDefine.EVENT_COPY_MATERIAL]: [EventDefine.BOSSACTIVITY_INFO],
		[GuideFuncCheckDefine.EVENT_COPY_DRAGON]: [EventDefine.BOSSACTIVITY_INFO],
		[GuideFuncCheckDefine.EVENT_COPY_TEMPLE]: [EventDefine.BOSSACTIVITY_INFO],
		[GuideFuncCheckDefine.EVENT_COPY_HEAVEN]: [EventDefine.BOSSACTIVITY_INFO],

		[GuideFuncCheckDefine.EVENT_BOSS_SINGLE]: [EventDefine.BOSSACTIVITY_INFO],
		[GuideFuncCheckDefine.EVENT_BOSS_GLOBAL]: [EventDefine.BOSSACTIVITY_INFO, EventDefine.HERO_INFO_UPDATE],

		[GuideFuncCheckDefine.EVENT_EQUIPPACKET_FULL]: [EventDefine.ITEM_UPDATE, EventDefine.HERO_INFO_UPDATE],

		[GuideFuncCheckDefine.EVENT_COPY_DRAGONPRIZE]: [EventDefine.BOSSACTIVITY_INFO],
		[GuideFuncCheckDefine.EVENT_COPY_HEAVENPRIZE]: [EventDefine.BOSSACTIVITY_INFO],

		[GuideFuncCheckDefine.EVENT_FUN_DAN]: [EventDefine.ITEM_UPDATE],
		[GuideFuncCheckDefine.EVENT_FUN_EQUIP]: [EventDefine.ITEM_UPDATE, EventDefine.PET_FUN_INFO_REFRESH],
		[GuideFuncCheckDefine.EVENT_FUN_SKILL]: [EventDefine.ITEM_UPDATE],
		[GuideFuncCheckDefine.EVENT_FUN_UPGRADE]: [EventDefine.ITEM_UPDATE],

		[GuideFuncCheckDefine.EVENT_FORGE_BAOSHI]: [EventDefine.HERO_INFO_UPDATE],
		[GuideFuncCheckDefine.EVENT_FORGE_DUANLIAN]: [EventDefine.ITEM_UPDATE],
		[GuideFuncCheckDefine.EVENT_FORGE_JINGLIAN]: [EventDefine.ITEM_UPDATE],
		[GuideFuncCheckDefine.EVENT_FORGE_QIANGHUA]: [EventDefine.ITEM_UPDATE],

		[GuideFuncCheckDefine.EVENT_ROLE_EQUIP_TIPS]: [EventDefine.ITEM_UPDATE],
		[GuideFuncCheckDefine.EVENT_ROLE_UPGRADE_TIPS]: [EventDefine.ACTOR_ROLE_UPDATE],

		[GuideFuncCheckDefine.EVENT_ROLE_TITLE_TIPS]: [EventDefine.ITEM_UPDATE],
		[GuideFuncCheckDefine.EVENT_ROLE_FASHION_TIPS]: [EventDefine.ITEM_UPDATE],
		[GuideFuncCheckDefine.EVENT_ROLE_SKILL]: [EventDefine.HERO_INFO_UPDATE],

		[GuideFuncCheckDefine.EVENT_XIANLV_TOTAL_UPGRADE]: [EventDefine.ITEM_UPDATE, EventDefine.HERO_INFO_UPDATE, EventDefine.ACTOR_XIANLV_UPDATE],
		[GuideFuncCheckDefine.EVENT_XIANLV_UPGRADE]: [EventDefine.ITEM_UPDATE, EventDefine.HERO_INFO_UPDATE, EventDefine.ACTOR_XIANLV_UPDATE],
		[GuideFuncCheckDefine.EVENT_XIANLV_TOTAL_UPSTART]: [EventDefine.ITEM_UPDATE],
		[GuideFuncCheckDefine.EVENT_XIANLV_UPSTART]: [EventDefine.ITEM_UPDATE],
		[GuideFuncCheckDefine.EVENT_XIANLV_JIHUO]: [EventDefine.ITEM_UPDATE, EventDefine.ACTOR_XIANLV_UPDATE],

		[GuideFuncCheckDefine.EVENT_DAILY_XIANGYAO]: [EventDefine.BOSSACTIVITY_INFO],
		[GuideFuncCheckDefine.EVENT_DAILY_ZUDUI]: [EventDefine.BOSSACTIVITY_INFO],
		[GuideFuncCheckDefine.EVENT_DAILY_SANBAI]: [EventDefine.BOSSACTIVITY_INFO],
		[GuideFuncCheckDefine.EVENT_DAILY_LILIAN]: [EventDefine.BOSSACTIVITY_INFO],

		[GuideFuncCheckDefine.EVENT_PET_EMBATTLE]: [EventDefine.PET_UPDATE, EventDefine.PET_LIST_UPDATE],
	}



	export let guideFuncCheckHandler: any = {}


	//////////////////////////////////////////////////-
	//未读邮件
	function checkEmail(param, args) {
		return MailSystem.getInstance().getUnreadEmailCount() > 0
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_EMAIL] = checkEmail

	//////////////////////////////////////////////////-
	//好友申请
	function checkFriendApply(param, args) {
		return FriendSystem.getInstance().getApplyStrangerCount() > 0
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_FRIEND_APPLY] = checkFriendApply

	//////////////////////////////////////////////////-
	//好友聊天未读
	function checkFriendUnReadMsgCount(param, args) {
		return FriendSystem.getInstance().getFriendUnReadMsgCount(-1) > 0
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_FRIEND_CHAT] = checkFriendUnReadMsgCount

	//////////////////////////////////////////////////-
	//活动开启
	function checkActivityOpen(param, args) {
		let exceptList: any = [OrdinaryActivityIndex.QIANGDA, OrdinaryActivityIndex.BAOXIANG, OrdinaryActivityIndex.SHENDIAN, OrdinaryActivityIndex.ROBBER_TICKET, OrdinaryActivityIndex.HDSHUANGBEI]

		for (let index in ActivityTimeDefine) {
			let _ = ActivityTimeDefine[index]

			if (table_isExsit(exceptList, tonumber(index)) == false) {
				let stateInfo = GetActivityTimeState(index)
				if (stateInfo && stateInfo.state == ActivityTimeState.ONGOING) {
					return true
				}
			}
		}
		return false
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_ACTIVITY_OPEN] = checkActivityOpen

	//////////////////////////////////////////////////-
	//竞技场挑战
	function checkChampionFight(param, args) {
		//return FriendSystem.getInstance().getFriendUnReadMsgCount(-1) > 0
		let times = checkNull(getSaveRecord(opSaveRecordKey.championTimes), ChampionConfig.totalTimes)
		let lastTime = getSaveRecord(opSaveRecordKey.championTime) || 0

		return times > 0 && GetServerTime() > lastTime
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_CHAMPION_FIGHT] = checkChampionFight


	//////////////////////////////////////////////////-
	//首次打开精彩活动
	function checkFirstShow(param, args) {
		if (param["shengdi"]) {				//圣地
			let power = GetHeroProperty("power")
			return power > 0
		}

		return true
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_ALWAYS_SHOW] = checkFirstShow


	//////////////////////////////////////////////////-
	//宠物升级
	function checkPetUpgrade(param, args) {
		// let curInfo = null
		// if (args) {
		// 	curInfo = args.curInfo
		// }

		// let heroInfo = GetHeroPropertyInfo()
		// if (heroInfo == null) {
		// 	return false
		// }
		// //let heroLevel = heroInfo.level || 0

		// //if(heroLevel > 20 ){ //角色大于20级，不提示升级红点
		// //	return false
		// //}

		// return this.checkCommonFunc(this.checkUpgradeExp, param, args)

		if (args == null || args.petId == null) {
			return false
		}

		let petId = args.petId
		return GuideFuncSystem.getInstance().checkPetUpgrade(petId)
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_PET_UPGRADE] = checkPetUpgrade


	//////////////////////////////////////////////////-
	//检查装备穿戴
	// function checkPetEquip(param, args) {

	// 	return this.checkPetFunc(this.checkEquipInternal, param, args)

	// }
	// guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_PET_EQUIP] = checkPetEquip



	//////////////////////////////////////////////////-
	//检查技能升级
	function checkPetSkillUpgrade(param, args) {

		return this.checkCommonFunc(this.checkSkillUpgrade, param, args)
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_PET_SKILLUPGRADE] = checkPetSkillUpgrade



	//服务器简单（红点）通知提示
	function checkServerNotice(param, args) {
		let notice = GuideFuncSystem.getInstance().getServerNotice()
		let flag = false

		////临时处理
		//if(param && param["index"] && param["index"] >= 100 ){
		//	if(CheckMainFrameFunction("zudui") == false ){
		//		return false
		//	}
		//}else{
		//	if(CheckMainFrameFunction("homepage") == false ){
		//		return false
		//	}
		//}

		if (param["index"]) {
			for (let _ in notice) {
				let index = notice[_]

				if (index == param["index"]) {
					flag = true
					break
				}
			}
		}

		return flag
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_SERVER_NOTICE] = checkServerNotice


	//服务器简单（红点）通知提示
	function checkPayPrize(param, args) {
		let list = GuideFuncSystem.getInstance().checkPayActivityPrize()

		return size_t(list) > 0
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_PAY_PRIZE] = checkPayPrize


	//VIP每日奖励
	function checkVipDaily(param, args) {
		let level = VipSystem.getInstance().GetVipLevel()
		let flag = true
		if (level <= 0) {
			level = 1
			flag = false
		}
		let record = getSaveRecord(opSaveRecordKey.vipGifts)

		if (record) {
			flag = false
		}

		return flag
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_VIP_DAILY] = checkVipDaily

	//////////////////////////////////////////////////-
	//动态提示
	function checkDynamicTips(param, args) {
		let dynamicType = param["type"]

		if (this.dynamicTipsMap[dynamicType]) {
			return true
		}
		return false
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_DYNAMIC_TIPS] = checkDynamicTips




	//未加入公会
	function checkClubNull(param, args) {

		//let check = CheckMainFrameFunction("gonghui")
		//if(check == false ){
		//	return false;
		//}


		let factionId = GetHeroProperty("faction") || 0
		let heroLevel = GetHeroProperty("level") || 0
		if (heroLevel > 40) {
			return false
		}

		return factionId == 0
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_CLUB_NULL] = checkClubNull



	//物品存在
	function checkItemExsit(param, args) {
		let itemlist = param["itemlist"]
		if (itemlist == null || itemlist.length == 0) {
			return false
		}

		let exsit = false
		for (let _ = 0; _ < itemlist.length; _++) {
			let v = itemlist[_]

			let entryId = v[0]
			let count = v[1]

			if (ItemSystem.getInstance().getItemCount(entryId) >= count) {
				exsit = true
				break
			}
		}

		return exsit
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_ITEM_EXSIT] = checkItemExsit



	//材料副本
	function checkCopyMaterial(param, args) {
		let actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.MaterialBoss)
		if (actInfo == null)
			return false;

		let heroLevel = GetHeroProperty("level") || 0

		for (let k in GameConfig.CopyMaterialConfig) {
			let config = GameConfig.CopyMaterialConfig[k]

			if (heroLevel < config.level)
				continue;
			let count = 0
			//扫荡过的次数
			if (actInfo.prizeRecord[config.index]) {
				count = actInfo.prizeRecord[config.index]
			}

			if (count < config.chance) //有免费挑战次数
				return true;

		}
		return false
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_COPY_MATERIAL] = checkCopyMaterial


	//龙王宝藏
	function checkCopyDragon(param, args) {
		let actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.DragonBoss)
		if (actInfo == null)
			return false

		if (actInfo.maxIndex == 0)//最新通关关卡
			return true

		//下一关
		let nextIndex = actInfo.maxIndex + 1
		let config = GameConfig.CopyDragonConfig[nextIndex]
		if (config == null)
			return false

		return true
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_COPY_DRAGON] = checkCopyDragon

	//小雷音寺
	function checkCopyTemple(param, args) {
		let actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.SmallThunderTemple)
		if (actInfo == null)
			return false

		if (actInfo.maxIndex == 0)
			return true;
		//下一关
		let nextIndex = actInfo.maxIndex + 1
		let config = GameConfig.CopyTempleConfig[nextIndex]
		if (config == null)
			return false

		return true
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_COPY_TEMPLE] = checkCopyTemple

	//天庭试炼
	function checkCopyHeaven(param, args) {
		let actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.HeavenTrial)
		if (actInfo == null)
			return false

		if (actInfo.maxIndex == 0)
			return true;
		//下一关
		let nextIndex = actInfo.maxIndex + 1
		let config = GameConfig.CopyHeavenConfig[nextIndex]
		if (config == null)
			return false

		return true
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_COPY_HEAVEN] = checkCopyHeaven


	//个人BOSS
	function checkBossSingle(param, args) {
		let actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.PersonBoss)
		if (actInfo == null)
			return false;
		let npcList = actInfo.npcList

		let heroLevel = GetHeroProperty("level")

		for (let k in GameConfig.BossSingleConfig) {
			let config = GameConfig.BossSingleConfig[k]
			if (heroLevel.level < config.level)
				continue

			//剩余次数
			let count = config.chance
			if (npcList[config.index]) {
				count = count - npcList[config.index]
			}
			if (count > 0)
				return true
		}
		return false
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_BOSS_SINGLE] = checkCopyHeaven

	//全民BOSS
	function checkBossGlobal(param, args) {
		let actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.WorldPlayerBoss)
		if (actInfo == null)
			return false;
		if (actInfo.remainCount <= 0)//我的剩余战斗次数
			return false
		let npcList = actInfo.npcList

		let serverTime = GetServerTime()
		let heroLevel = GetHeroProperty("level")
		for (let k in GameConfig.BossGlobalConfig) {
			let config = GameConfig.BossGlobalConfig[k]
			if (heroLevel < config.level) //等级不足
				continue;

			let bossInfo = npcList[config.index]
			if (bossInfo == null)
				continue

			if (bossInfo.refreshTime == 0 || serverTime >= bossInfo.refreshTime) {//已刷新，血量不为0
				if (bossInfo.hpPercent > 0) {
					return true;
				}
			}
		}

		return false
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_BOSS_GLOBAL] = checkCopyHeaven

	//装备满了
	function checkEquipPacketFull(param, args) {
		return ItemSystem.getInstance().isEquipPacketAlmostFull()
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_EQUIPPACKET_FULL] = checkEquipPacketFull



	//龙王宝藏领奖
	function checkCopyDragonPrize(param, args) {
		let actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.DragonBoss)
		if (actInfo == null)
			return false

		if (actInfo.maxIndex == 0)
			return false

		//类型"sixStar", "twelve", "eighteen"
		let type = param["type"]
		let andOp = opDragonBossChapterConfig[type]
		if (andOp == null)
			return false

		let config = GameConfig.CopyDragonConfig[actInfo.maxIndex]
		if (config == null)
			return false
		//按位与
		let state = actInfo.stageList[config.chapter]
		if (state == null)
			return false

		return (state & andOp) == andOp
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_COPY_DRAGONPRIZE] = checkCopyDragonPrize

	function checkCopyHeavenPrize(param, args) {
		// let actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.HeavenTrial)
		// if (actInfo == null)
		// 	return false;
		// let maxIndex = actInfo.maxIndex//历史最大进度
		// if (maxIndex == 0)
		// 	return false;
		// let boxIndex = actInfo.boxIndex//宝箱领取进度（已领取的）

		// for (let i = boxIndex; i < maxIndex; i++) {
		// 	let config = GameConfig.CopyHeavenConfig[i]
		// 	if (size_t(config.box)) {
		// 		return true
		// 	}
		// }

		return false
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_COPY_HEAVENPRIZE] = checkCopyHeavenPrize

	//每日豪礼
	function checkMeiriHaoli(param, args) {
		let dailyPayCount = getSaveRecord(opSaveRecordKey.dailyRecharge) || 0
		let rmb = GetRmbFromGold(dailyPayCount)
		let playerInfo = ActivitySystem.getInstance().getOperatePlayerInfo(PayActivityIndex.DAILY_EXPENSIVE_GIFT)
		if (playerInfo == null) {
			return false
		}
		let isGet = playerInfo[1]	//0未领取 //1已领取
		if (isGet == 0 && rmb >= 100) {
			return true
		}
		return false
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_MEIRI_HAOLI] = checkMeiriHaoli

	//福利大厅-签到奖励
	function checkWelfareSign(param, args) {
		let meiRiInfo = getSaveRecord(opSaveRecordKey.meiRiQianDao)
		let getPrize = meiRiInfo.getPrize
		if (getPrize[dailyPrizeType.accumulateLogin] == 0 || getPrize[dailyPrizeType.dailyLogin] == 0) {
			return true
		}
		let curVip = VipSystem.getInstance().GetVipLevel()
		if (curVip >= 4 && getPrize[dailyPrizeType.vipLogin] == 0) {
			return true
		}

		let dailyPayCount = getSaveRecord(opSaveRecordKey.dailyRecharge) || 0
		if (dailyPayCount > 0 && getPrize[dailyPrizeType.rechangeLogin] == 0) {
			return true
		}
		return false
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_WELFARE_SIGN] = checkWelfareSign

	//每日签到奖励
	function checkWelfareSignGift(param, args) {
		let meiRiInfo = getSaveRecord(opSaveRecordKey.meiRiQianDao)
		let getPrize = meiRiInfo.getPrize
		return getPrize[dailyPrizeType.accumulateLogin] == 0
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_WELFARE_SIGN_GIFT] = checkWelfareSignGift

	//福利大厅-等级奖励
	function checkWelfareLevel(param, args) {
		let levelInfo = getSaveRecord(opSaveRecordKey.levelReward)
		let curLevel = GetHeroProperty("level") || 0
		let list = []
		for (let _ in GameConfig.LevelRewardConfig) {
			let v = GameConfig.LevelRewardConfig[_]
			table_insert(list, v)
		}

		for (let i = 0; i < size_t(list); i++) {
			let info = list[i]
			let needLevel = info.leve	//这个命名神坑
			if (curLevel >= needLevel) {
				if (levelInfo == null) {
					return true
				} else {
					if (levelInfo[needLevel] == null) {
						return true
					}
				}
			}
		}
		return false
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_WELFARE_LEVEL] = checkWelfareLevel

	//福利大厅-月卡
	function checkWelfareMonthCard(param, args) {
		let isBuy = PaySystem.getInstance().isMonthCardActive()
		let monthCardInfo = PaySystem.getInstance().getMonthCardInfo()
		if (monthCardInfo == undefined) {
			return false
		}
		if (monthCardInfo.isGet == 0 && isBuy) {
			return true
		}
		return false
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_WELFARE_MONTH_CARD] = checkWelfareMonthCard

	//周卡
	function checkWelfareWeekCard(param, args) {
		let isBuy = PaySystem.getInstance().isWeekCardActive()
		let weekCardInfo = PaySystem.getInstance().getWeekCardInfo()
		if (weekCardInfo == undefined) {
			return false
		}
		if (weekCardInfo.isGet == 0 && isBuy) {
			return true
		}
		return false
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_WELFARE_WEEK_CARD] = checkWelfareWeekCard

	//每日充值
	function checkMeiriPay(param, args) {
		let playerInfo = ActivitySystem.getInstance().getOperatePlayerInfo(PayActivityIndex.DAY_ACCUM_PAY_PRIZE)
		let activityInfo = ActivitySystem.getInstance().getOperateActivityInfo(PayActivityIndex.DAY_ACCUM_PAY_PRIZE)
		if (playerInfo == null || activityInfo == null) {
			return false
		}
		let canGet = false
		for (let val of playerInfo.reachList) {
			if (val == 1) {
				canGet = true
			}
		}
		return canGet
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_MEIRI_PAY] = checkMeiriPay

	//福利大厅-福利
	function checkWelfareWelfare(param, args) {
		let jifenNum = getSaveRecord(opSaveRecordKey.xiyouLilianScore) || 0
		let recordList = getSaveRecord(opSaveRecordKey.xiyouWelfareReward) || []
		let list = []
		let index = 100
		for (let _ in GameConfig.XiyouWelfareConfig) {
			let v = GameConfig.XiyouWelfareConfig[_]
			if (jifenNum >= v.score) {
				if (recordList == null || recordList[v.index] == null) {
					return true
				}
			}
			index = index + 1
		}
		return false
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_WELFARE_WELFARE] = checkWelfareWelfare


	//福利大厅
	function checkWelfare(param, args) {
		////////////////////////////////签到奖励
		// let meiRiInfo = getSaveRecord(opSaveRecordKey.meiRiQianDao)
		// let getPrize = meiRiInfo.getPrize
		// if (getPrize[dailyPrizeType.accumulateLogin] == 0 || getPrize[dailyPrizeType.dailyLogin] == 0) {
		// 	return true
		// }
		// let curVip = VipSystem.getInstance().GetVipLevel()
		// if (curVip >= 4 && getPrize[dailyPrizeType.vipLogin] == 0) {
		// 	return true
		// }

		// let dailyPayCount = getSaveRecord(opSaveRecordKey.dailyRecharge) || 0
		// if (dailyPayCount > 0 && getPrize[dailyPrizeType.rechangeLogin] == 0) {
		// 	return true
		// }
		// ////////////////////////////////等级奖励
		// ////////////////////////////////
		// let levelInfo = getSaveRecord(opSaveRecordKey.levelReward)
		// let curLevel = GetHeroProperty("level") || 0
		// let list = []
		// for (let _ in GameConfig.LevelRewardConfig) {
		// 	let v = GameConfig.LevelRewardConfig[_]
		// 	table_insert(list, v)
		// }
		// for (let i = 0; i < size_t(list); i++) {
		// 	let info = list[i]
		// 	let needLevel = info.leve	//这个命名神坑
		// 	if (curLevel >= needLevel) {
		// 		if (levelInfo == null) {
		// 			return true
		// 		} else {
		// 			if (levelInfo[needLevel] == null) {
		// 				return true
		// 			}
		// 		}
		// 	}
		// }
		// ////////////////////////////////月卡
		// ////////////////////////////////
		// let isBuy = PaySystem.getInstance().isMonthCardActive()
		// let monthCardInfo = PaySystem.getInstance().getMonthCardInfo()
		// if (monthCardInfo != undefined && monthCardInfo.isGet == 0 && isBuy) {
		// 	return true
		// }
		// ////////////////////////////////周卡
		// ////////////////////////////////
		// let isBuyWeekCard = PaySystem.getInstance().isWeekCardActive()
		// let weekCardInfo = PaySystem.getInstance().getWeekCardInfo()
		// if (weekCardInfo != undefined && weekCardInfo.isGet == 0 && isBuyWeekCard) {
		// 	return true
		// }
		// ////////////////////////////////
		// ////////////////////////////////福利大厅
		// let jifenNum = getSaveRecord(opSaveRecordKey.xiyouLilianScore) || 0
		// let recordList = getSaveRecord(opSaveRecordKey.xiyouWelfareReward) || []
		// let index = 100
		// for (let _ in GameConfig.XiyouWelfareConfig) {
		// 	let v = GameConfig.XiyouWelfareConfig[_]
		// 	if (jifenNum >= v.score) {
		// 		if (recordList == null || recordList[v.index] == null) {
		// 			return true
		// 		}
		// 	}
		// 	index = index + 1
		// }
		////////////////////////////////
		return false
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_WELFARE] = checkWelfare

	//属性丹
	function checkFunDan(param, args) {
		let funType = param["type"]

		if (!cellOptionsName[funType - 1]) {
			return false
		}

		return GuideFuncSystem.getInstance().checkPropertyDan(funType)
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_FUN_DAN] = checkFunDan

	//通用装备
	function checkFunEquip(param, args) {
		let funType = param["type"]
		if (!funType) {
			return false
		}

		let canwear = false
		for (let i = 0; i < 4; i++) {
			canwear = GuideFuncSystem.getInstance().checkOneFunEquip(funType, i)
			if (canwear) {
				break
			}
		}
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_FUN_EQUIP] = checkFunEquip

	//通用技能
	function checkFunSkill(param, args) {
		let funType = param["type"]
		if (!funType) {
			return false
		}

		let canUpgrade = false
		for (let i = 0; i < 4; i++) {
			canUpgrade = GuideFuncSystem.getInstance().checkOneFunSkill(funType, i)
			if (canUpgrade) {
				break
			}
		}
		return canUpgrade
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_FUN_SKILL] = checkFunSkill

	//通用升阶
	function checkFunUpgrade(param, args) {
		let funType = param["type"]
		return GuideFuncSystem.getInstance().checkFunUpgrade(funType)
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_FUN_UPGRADE] = checkFunUpgrade


	//锻造强化
	function checkForgeStrength(param, args) {
		let type = param["type"]
		let typeName = elemForgeNames[type - 1]
		let level = ForgeSystem.getInstance().getForgeTypeLevel(typeName) || 0
		let toLevel = level + 1
		let config = GameConfig.FunForgeConfig[typeName][toLevel]
		if (config == null || config.money == null) {
			return false
		}

		let itemId = param["itemId"]

		let had = GetHeroMoney(itemId)

		if (had < config.money) {
			return false
		}

		return true
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_FORGE_QIANGHUA] = checkForgeStrength


	//锻造精炼
	function checkForgeRefine(param, args) {
		let type = param["type"]
		let typeName = elemForgeNames[type - 1]
		let level = ForgeSystem.getInstance().getForgeTypeLevel(typeName) || 0
		let toLevel = level + 1
		let config = GameConfig.FunForgeConfig[typeName][toLevel]
		if (config == null || config.money == null) {
			return false
		}

		let itemId = param["itemId"]

		let had = ItemSystem.getInstance().getItemCount(itemId)

		return had >= config.itemnum
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_FORGE_JINGLIAN] = checkForgeRefine


	//锻造锻炼
	function checkForgeDuanLian(param, args) {
		let type = param["type"]
		let typeName = elemForgeNames[type - 1]
		let level = ForgeSystem.getInstance().getForgeTypeLevel(typeName) || 0
		let toLevel = level + 1
		let config = GameConfig.FunForgeConfig[typeName][toLevel]
		if (config == null || config.money == null) {
			return false
		}

		let itemId = param["itemId"]

		let had = ItemSystem.getInstance().getItemCount(itemId)

		return had >= config.itemnum
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_FORGE_DUANLIAN] = checkForgeDuanLian

	//锻造宝石
	function checkForgeBaoShi(param, args) {
		let type = param["type"]
		let typeName = elemForgeNames[type - 1]
		let level = ForgeSystem.getInstance().getForgeTypeLevel(typeName) || 0
		let toLevel = level + 1
		let config = GameConfig.FunForgeConfig[typeName][toLevel]
		if (config == null || config.money == null) {
			return false
		}

		let itemId = param["itemId"]

		let had = ItemSystem.getInstance().getItemCount(itemId)
		return had >= config.itemnum
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_FORGE_BAOSHI] = checkForgeBaoShi


	//角色装备
	function checkRoleEquip(param, args) {
		let roleInfo = RoleSystem.getInstance().getRecvList()
		if (roleInfo == null) return false
		//检查装备
		let itemlist = RoleSystem.getInstance().getRoleEquipList()
		if (size_t(itemlist) > 0) return true

		return false
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_ROLE_EQUIP_TIPS] = checkRoleEquip

	//角色升级
	function checkRoleUpgrade(param, args) {
		let roleInfo = RoleSystem.getInstance().getRecvList()
		if (roleInfo == null) return false
		//检查升级
		let level = roleInfo.stage
		if (level >= 80) {
			let exp = roleInfo.stageexp
			let maxExp = GameConfig.FunUpgradeStageConfig["Hero"][level].maxexp
			if (exp >= maxExp) return true
		}

		return false
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_ROLE_UPGRADE_TIPS] = checkRoleUpgrade

	//角色时装
	function checkRoleTitle(param, args) {
		let type = param["type"]
		let typeNameList = {
			Hero: "unlocktitlelist",
			HeroEquip: "unlockfashionlist"
		}
		let typeName = typeNameList[cellOptionsName[type - 1]]
		let roleInfo = RoleSystem.getInstance().getRoleInfo(typeName)
		let arr = GameConfig.FunSkinConfig[cellOptionsName[type - 1]];
		for (let k in arr) {
			let config = arr[k]
			let itemid = config.itemid
			if (table_isExsit(roleInfo, config.Index)) continue
			let had = ItemSystem.getInstance().getItemCount(itemid)
			if (had >= config.itemnum) return true
		}

		return false
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_ROLE_TITLE_TIPS] = checkRoleTitle
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_ROLE_FASHION_TIPS] = checkRoleTitle

	//角色技能
	function checkRoleSkillUpgrade(param, args) {
		let levelList = RoleSystem.getInstance().getRoleInfo("skilllevellist")

		for (let k in levelList) {
			let level = levelList[k]
			if (level == 0) continue
			let heroStage = RoleSystem.getInstance().getRoleInfo("stage")
			if (level == heroStage) continue
			let config = GameConfig.FunSpendMoneyItemConfig["HeroSkill"][level]
			let needMony = config.money
			let had = GetHeroMoney(config.moneyunit)
			if (had >= needMony) {
				return true
			}
		}
		return false
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_ROLE_SKILL] = checkRoleSkillUpgrade

	//仙侣升阶 -- 总的
	function checkXianLvTotalUpgrade(param, args) {
		let jihuoList = XianLvSystem.getInstance().getJiHuoList()
		/*if(!args || args.xianlvId == null){
			return false
		}
		let select = args.xianlvId */
		for (let k in jihuoList) {
			let xianlvId = jihuoList[k]
			//if(xianlvId != select) continue
			let lv = XianLvSystem.getInstance().getLevel(xianlvId)
			let upgradeConfig = GameConfig.FunUpgradeStageConfig["XianLv"][lv]
			let costCount = upgradeConfig.itemnum
			let had = ItemSystem.getInstance().getItemCount(upgradeConfig.itemid)
			if (had < costCount) continue
			let money = upgradeConfig.money
			let hadMoney = GetHeroMoney(upgradeConfig.moneyunit)
			if (hadMoney < money) continue
			return true
		}
		return false
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_XIANLV_TOTAL_UPGRADE] = checkXianLvTotalUpgrade

	//仙侣升阶 ---单个
	function checkXianLvUpgrade(param, args) {
		let jihuoList = XianLvSystem.getInstance().getJiHuoList()
		if (!args || args.xianlvId == null) {
			return false
		}
		let xianlvId = args.xianlvId
		if (table_isExsit(jihuoList, xianlvId) == false) return false
		/*for(let k in jihuoList){
			let xianlvId = jihuoList[k]
			if(xianlvId != select) continue*/
		let lv = XianLvSystem.getInstance().getLevel(xianlvId)
		let upgradeConfig = GameConfig.FunUpgradeStageConfig["XianLv"][lv]
		let costCount = upgradeConfig.itemnum
		let had = ItemSystem.getInstance().getItemCount(upgradeConfig.itemid)
		if (had < costCount) return false
		let money = upgradeConfig.money
		let hadMoney = GetHeroMoney(upgradeConfig.moneyunit)
		if (hadMoney < money) return false
		return true
		/*}
		return false*/
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_XIANLV_UPGRADE] = checkXianLvUpgrade

	//仙侣升星 --- 总的
	function checkXianLvTotalUpStart(param, args) {
		let jihuoList = XianLvSystem.getInstance().getJiHuoList()
		/*if(!args || args.xianlvId == null){
			return false
		}
		let select = args.xianlvId */
		for (let k in jihuoList) {
			let xianlvId = jihuoList[k]
			//if(xianlvId != select) continue
			let star = XianLvSystem.getInstance().getStar(xianlvId)
			let upgradeConfig = GameConfig.FunUpStarConfig["XianLv"][xianlvId]
			let costCount = GameConfig.FunLevelNumConfig["XianLv"][star].num
			let had = ItemSystem.getInstance().getItemCount(upgradeConfig.itemid)
			if (had < costCount) continue
			return true
		}
		return false
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_XIANLV_TOTAL_UPSTART] = checkXianLvTotalUpStart

	//仙侣升星 -- 单个
	function checkXianLvUpStart(param, args) {
		let jihuoList = XianLvSystem.getInstance().getJiHuoList()
		if (!args || args.xianlvId == null) {
			return false
		}
		let xianlvId = args.xianlvId
		if (table_isExsit(jihuoList, xianlvId) == false) return false
		/*for(let k in jihuoList){
			let xianlvId = jihuoList[k]
			if(xianlvId != select) continue*/
		let star = XianLvSystem.getInstance().getStar(xianlvId)
		let upgradeConfig = GameConfig.FunUpStarConfig["XianLv"][xianlvId]
		let costCount = GameConfig.FunLevelNumConfig["XianLv"][star].num
		let had = ItemSystem.getInstance().getItemCount(upgradeConfig.itemid)
		if (had < costCount) return false
		return true
		/*}
		return false*/
	}

	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_XIANLV_UPSTART] = checkXianLvUpStart

	//仙侣激活
	function checkXianLvJiHuo(param, args) {
		let jihuoList = XianLvSystem.getInstance().getJiHuoList()
		if (!args || args.xianlvId == null) {
			return false
		}
		let xianlvId = args.xianlvId
		let jiHuoItem = GameConfig.ActorXianLvConfig[xianlvId].itemid
		let jiHuoCost = GameConfig.ActorXianLvConfig[xianlvId].itemnum
		let jiHuoHad = ItemSystem.getInstance().getItemCount(jiHuoItem)
		if (jiHuoHad >= jiHuoCost) {
			return true
		}
		return false

	}

	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_XIANLV_JIHUO] = checkXianLvJiHuo


	//日常降妖
	function checkDailyXiangYao(param, args) {
		let level = GetHeroProperty("level")
		if (level < 40) return false
		let actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.ZhongKuiDemon)
		if (actInfo == null) return false
		let npcList = actInfo.npcList
		for (let k in npcList) {
			let npc = npcList[k]
			if (npc - GetServerTime() <= 0) {
				return true
			}
		}
		return false

	}

	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_DAILY_XIANGYAO] = checkDailyXiangYao

	//日常组队
	function checkDailyZuDui(param, args) {

		return false

	}

	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_DAILY_ZUDUI] = checkDailyZuDui

	//日常三百
	function checkDailySanBai(param, args) {
		let level = GetHeroProperty("level")
		if (level < 40) return false
		let actInfo = GetActivity(ActivityDefine.Boss).getSanBaiInfo()
		if (size_t(actInfo) == 0) return false
		//如果是vip
		if (actInfo.isVip == 1) {
			if (actInfo.state != 3) {
				return true
			}
		}

		let curhuan = actInfo.curhuan
		if (curhuan >= 100 && curhuan < 200 && curhuan < 1) {
			return true
		} else if (curhuan >= 200 && curhuan < 300 && curhuan < 2) {
			return true
		} else if (curhuan >= 300 && curhuan < 3) {
			return true
		}

		return false

	}

	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_DAILY_SANBAI] = checkDailySanBai

	//日常历练
	function checkDailyLiLian(param, args) {
		let stage = GetHeroProperty("level")
		if (stage < 40) return false
		let actInfo = GetActivity(ActivityDefine.Boss).getXiyouInfo()
		if (size_t(actInfo) == 0) return false

		let level = actInfo.level || 0
		let curexp = actInfo.curexp || 0
		let xiyouConfig = GameConfig.EveryDayLiLianUpConfig[level]
		if (xiyouConfig == null)
			return false
		if (curexp >= xiyouConfig.exp) {
			return true
		}

		return false
	}

	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_DAILY_LILIAN] = checkDailyLiLian

	//宠物布阵
	function checkPetEmbattle(param, args) {
		let petList = PetSystem.getInstance().getPetActiveList()
		for (let i in petList) {
			let petId = petList[i]
			if (GuideFuncSystem.getInstance().checkPetEmbattle(petId)) {
				return true
			}
		}

		return false
	}
	guideFuncCheckHandler[GuideFuncCheckDefine.EVENT_PET_EMBATTLE] = checkPetEmbattle

	//////////////////////////////////////回收////////////////////////////////////////////-
	export let recycleFuncHandler: any = {}
	//服务器简单（红点）通知提示
	function recycleServerNotice(config, param) {
		let notice = GuideFuncSystem.getInstance().getServerNotice()

		table_remove(notice, param["index"] || 0)
		delete this.manualCloseResultMap[config.id]
	}
	recycleFuncHandler[GuideFuncCheckDefine.EVENT_SERVER_NOTICE] = recycleServerNotice

}