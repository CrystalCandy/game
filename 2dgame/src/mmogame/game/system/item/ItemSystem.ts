/*
作者:
    yangguiming
	
创建时间：
   2017.03.07(周二)

意图：
   物品系统
公共接口：
   
*/

class ItemSystem extends BaseSystem {
	itemList: any;
	storeItemList: any;
	entryItemList: any;

	isInit: boolean;

	skillLevel: number;
	skillData: any;


	resolveLib: any;
	shopSellItemList: any

	onekeyEquipIndex: number;
	onekeyEquipCount: number;


	public initObj(...args: any[]): void {
		this.onClear()
		this.isInit = true



		this.resolveLib = {}



		//RegisterEvent(EventDefine.ITEM_LIST, this.onGetItemList, this)
	}

	destory() {

	}


	prepareResource(workQueue) {

		GameConfig.initItemSystemCsv(workQueue);

	}


	onClear() {
		//TLog.Debug("ItemSystem.clear")
		this.itemList = {}							//以物品Uid为索引保存item对象
		this.storeItemList = {}

		//this.storeItemList = {[storeOptions.PACKET] : {},[storeOptions.EQUIP1] = {}, [storeOptions.EQUIP2] = {}, 
		//								 [storeOptions.PETITEM] = {}, [storeOptions.DEPOT] = {}, [storeOptions.WAREHOUSE] = {},
		//								 [storeOptions.FAIRYITEM] = {},[storeOptions.RIDEITEM] = {},
		//								}								//只保存物品的Uid
		for (let k in storeOptions) {
			let v = storeOptions[k]

			this.storeItemList[v] = this.storeItemList[v] || []
		}

		this.entryItemList = {}																									//保存相同entryId的物品的Uid
		this.isInit = true

		this.shopSellItemList = {}

		this.onekeyEquipIndex = 0
		this.onekeyEquipCount = 0

		this.skillLevel = null
		this.skillData = null
	}

	onGetItemList(args) {
		this.isInit = false
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	updateEquipPos(logicItem) {
		let ownerId = logicItem.getOwnerId()
		let store = logicItem.getProperty("store")
		if (ownerId > 0) {
			let actorInfo = null
			if (ownerId == GetHeroProperty("id")) {
				actorInfo = GetHeroPropertyInfo()
			} else {
				actorInfo = PetSystem.getInstance().getPetInfoEntry(ownerId)
			}
			if (actorInfo) {
				SetActorEquip(actorInfo, logicItem)
			}
		}
	}

	//添加一个物品,被动响应服务器的消息
	addItem(logicItem) {
		if (null == logicItem) {
			return
		}

		//标识物品是hero身上的
		logicItem.setPrivateFlag(true)

		let logicStore = logicItem.getProperty("store")

		// 先查找是否有个这个物品存在，是则删除，再重新加入
		let id = logicItem.getId()
		let originalItem = this.getItemLogicInfoByID(id)
		let isExsit = this.updateItem(id, logicItem)
		this.updateEquipPos(logicItem)

		// 添加到目标包里，并刷新该包
		if (logicStore == storeOptions.PACKET) {
			if (!this.isInit && !isExsit) {																					//排除登陆时加入物品
				if (!originalItem) {																	//原来没有
					FireEvent(EventDefine.ITEM_GAIN, ItemGainEvent.newObj(logicItem.getEntryId(), logicItem.getProperty("count"), logicItem))
				} else if (originalItem.getProperty("count") < logicItem.getProperty("count")) { //数量增加了
					FireEvent(EventDefine.ITEM_GAIN, ItemGainEvent.newObj(logicItem.getEntryId(), logicItem.getProperty("count") - originalItem.getProperty("count"), logicItem))
				}
				//GameSound.getInstance().playEffect(SystemSound.effect_gainItem)
			}
		}

		//FireEvent(EventDefine.ITEM_UPDATE, ItemUpdateEvent.newObj(logicStore, logicItem))
	}

	//物品更新，列表中原来就有或者没有都通过更新来处理，返回原来的拥有状况
	updateItem(itemId, item) {
		let isExsit = false
		let originalItem = this.itemList[itemId] || null
		this.entryItemList[item.getProperty("entry")] = this.entryItemList[item.getProperty("entry")] || []

		if (originalItem) {
			let store = originalItem.getProperty("store")
			isExsit = store != storeOptions.PACKET

			//处理storeItemList
			table_remove(this.storeItemList[store], itemId)
			table_remove(this.entryItemList[originalItem.getProperty("entry")], itemId)
		}
		this.itemList[itemId] = item

		//处理一下storeItemList和entryItemList

		table_insert(this.storeItemList[item.getProperty("store")], itemId)
		table_insert(this.entryItemList[item.getProperty("entry")], itemId)
		return isExsit
	}

	//删除一个物品，被动响应服务器消息
	removeItem(itemId) {
		let item = this.itemList[itemId] || null

		if (item) {
			let store = item.getProperty("store")
			let entryId = item.getProperty("entry")

			this.entryItemList[entryId] = this.entryItemList[entryId] || {}

			//处理storeItemList
			table_remove(this.storeItemList[store], itemId)
			table_remove(this.entryItemList[entryId], itemId)
			delete this.itemList[itemId]

			//FireEvent(EventDefine.ITEM_UPDATE, ItemUpdateEvent.newObj(store, item))
		}
	}

	//通过物品ID取得物品信息 return itemData
	getItemLogicInfoByID(itemId) {
		return this.itemList[itemId]
	}

	//通过物品entryId获取物品信息（列表）
	getItemLogicInfoByEntry(entryId) {
		let list = this.entryItemList[entryId] || []
		let itemList: any = []

		for (let _ = 0; _ < list.length; _++) {
			let itemId = list[_]

			let item = this.getItemLogicInfoByID(itemId)
			if (item) {
				JsUtil.arrayInstert(itemList, item)
			}
		}

		return itemList
	}
	getEquipItemList() {
		let itemList = []
		for (let i in this.itemList) {
			let item = this.itemList[i]

			if (item.isEquip()) {
				JsUtil.arrayInstert(itemList, item)
			}
		}
		return itemList
	}

	//通过物品类型获取物品信息（列表）
	getItemLogicInfoByType(type, subtype?) {
		let itemList = []

		for (let i in this.itemList) {
			let item = this.itemList[i]

			if (subtype != null) {
				if (item.getRefProperty("type") == type && item.getRefProperty("subtype") == subtype) {
					JsUtil.arrayInstert(itemList, item)
				}
			} else {
				if (item.getRefProperty("type") == type) {
					JsUtil.arrayInstert(itemList, item)
				}
			}
		}

		return itemList
	}

	//获取指定仓库位置的物品Uid
	getItemIdListByStore(store) {
		return this.storeItemList[store] || []
	}

	//通过物品entryId获取物品数量
	getItemCount(entryId) {
		let itemList = this.getItemLogicInfoByEntry(entryId)
		let count = 0

		for (let _ = 0; _ < itemList.length; _++) {
			let item = itemList[_]

			count = count + item.getProperty("count")
		}

		return count
	}

	useItem(itemId, count) {
		//if(logicItem.isEquip() ){ 
		//	let msg = GetMessage(opCodes.C2G_ITEM_EQUIP_PUTON)
		//	msg.id = logicItem.getId()
		//	SendGameMessage(msg)
		//}else{
		let msg = GetMessage(opCodes.C2G_ITEM_USE)
		msg.id = itemId
		msg.count = checkNull(count, 1)
		SendGameMessage(msg)
		//}
	}

	////////////////////////////////////////////////////////////////////////////-
	//常用物品属性接口（图标、名字、字体颜色、品质框等）

	getItemTemplateInfo(entryId) {
		if (entryId == 0 || entryId == -1)
			return null

		if (GameConfig.itemConfig[entryId] != null) {
			return GameConfig.itemConfig[entryId]
		}
		TLog.Error("ItemSystem.getItemTemplateInfo:%s", tostring(entryId))
		return null
	}

	getItemTemplateInfoValue(entryId, index) {
		let ref = this.getItemTemplateInfo(entryId)
		if (!ref) {
			TLog.Error("ItemSystem.getItemTemplateInfo:%s", tostring(entryId))
			return null
		}

		return ref[index] || null
	}

	getItemName(entryId) {
		let itemRef = this.getItemTemplateInfo(entryId)
		if (itemRef) {
			return itemRef.name
		}
		return "ErrorItemName"
	}




	//////////////////////////////////////////////////////////////////////////////////////-
	getLocationWithEntryId(entryId, quality) {
		let locationName: any = {
			//[storeOptions.PACKET] 		: Localize_cns("ITEM_TIPS_LOCATION_BEIBAO"),
			//[storeOptions.EQUIP1] 		: Localize_cns(""), 
			//[storeOptions.EQUIP2] 		: Localize_cns(""), 
			//[storeOptions.PETITEM] 		: Localize_cns("ITEM_TIPS_LOCATION_ZHUANGBEI"), 
			//[storeOptions.DEPOT] 			: Localize_cns(""), 
			//[storeOptions.WAREHOUSE] 	: Localize_cns(""),
			["email"]: Localize_cns("ITEM_TIPS_LOCATION_YOUXIANG"),

		}

		let storeName = 0
		let list = this.getItemLogicInfoByEntry(entryId)
		for (let _ = 0; _ < list.length; _++) {
			let item = list[_]

			if (quality) {
				if (item.getProperty("equip_quality") == quality) {
					storeName = item.getProperty("store")
					break
				}
			} else {
				storeName = item.getProperty("store")
				break
			}
		}

		// if(storeName == 0 ){
		// 	let list = MailSystem.getInstance().getMailList()
		// 	for(let _ in list){
		// 		let mail = list[_]

		// 		for(let k in mail.item){
		// 		let v = mail.item[k]

		// 			if(v[1] == entryId ){
		// 				storeName = "email"
		// 				break
		// 			}
		// 		}
		// 	}
		// }

		return locationName[storeName] || ""
	}


	showItemTipsByEntry(entry, count) {
		let itemInfo: any = {}
		itemInfo.entry = entry
		itemInfo.id = -1
		itemInfo.count = checkNull(count, 1)
		itemInfo.previewCount = checkNull(count, 1)

		let item = Item.newObj(itemInfo)
		this.showItemTips(item)
	}


	showItemTips(logicItem) {
		let window = WngMrg.getInstance().getWindow("ItemHintFrame")
		window.showItemHint(logicItem)
	}


	//打开物品信息界面
	showItemHint(dataList) {
		if (dataList.logicItem == null) {
			return
		}
		//兼容接口
		this.showItemTips(dataList.logicItem)


	}

	//////////////////////////////////////////////////////////////////////////////
	////御灵信息保存
	SetSkill(level, skillData) {

		this.skillLevel = level
		this.skillData = skillData
		FireEvent(EventDefine.SACRIFICE_UPDATE, null)
	}

	//////////////////////////////////////////////////////////////////////////////
	////获取御灵保存信息和配置信息
	// GetSkill() {
	// 	let nowValueList = []
	// 	let nowHPValue = 0
	// 	let nowMagicValue = 0
	// 	let nowPhysicValue = 0

	// 	let HPWord = ""
	// 	let MagicWord = ""
	// 	let PhysicWord = ""

	// 	let nextValueList = []
	// 	let nextHPValue = 0
	// 	let nextMagicValue = 0
	// 	let nextPhysicValue = 0

	// 	//新的做法，读表
	// 	let skillToLevelList: any = {}
	// 	let nextSkillToLevelList: any = {}
	// 	for (let i = 294; i <= 301; i++) {
	// 		let level = this.getSkillLevelList(i)
	// 		skillToLevelList[i] = level
	// 		level = this.getNextSkillLevelList(i)
	// 		nextSkillToLevelList[i] = level
	// 	}

	// 	for (let i = 294; i <= 301; i++) {
	// 		for (let k in GameConfig.SacrificeConfig[i]) {
	// 			let v = GameConfig.SacrificeConfig[i][k]
	// 			HPWord = v.effect[0][0]
	// 			MagicWord = v.effect[1][0]
	// 			PhysicWord = v.effect[2][0]

	// 			if (v.level <= skillToLevelList[i]) {
	// 				nowHPValue = nowHPValue + v.effect[0][1]
	// 				nowMagicValue = nowMagicValue + v.effect[1][1]
	// 				nowPhysicValue = nowPhysicValue + v.effect[2][1]
	// 			}
	// 			if (v.level <= nextSkillToLevelList[i]) {
	// 				nextHPValue = nextHPValue + v.effect[0][1]
	// 				nextMagicValue = nextMagicValue + v.effect[1][1]
	// 				nextPhysicValue = nextPhysicValue + v.effect[2][1]
	// 			}
	// 		}
	// 	}
	// 	JsUtil.arrayInstert(nowValueList, { "data": nowHPValue, "word": HPWord })
	// 	JsUtil.arrayInstert(nowValueList, { "data": nowMagicValue, "word": MagicWord })
	// 	JsUtil.arrayInstert(nowValueList, { "data": nowPhysicValue, "word": PhysicWord })

	// 	JsUtil.arrayInstert(nextValueList, { "data": nextHPValue, "word": HPWord })
	// 	JsUtil.arrayInstert(nextValueList, { "data": nextMagicValue, "word": MagicWord })
	// 	JsUtil.arrayInstert(nextValueList, { "data": nextPhysicValue, "word": PhysicWord })

	// 	return [this.skillLevel, this.skillData, nowValueList, nextValueList]
	// }

	// //根据状态获取御灵当前等级
	// getSkillLevelList(index) {
	// 	let level = 0
	// 	let curCanActiva = null
	// 	if (this.skillData == null) {
	// 		return 0
	// 	}
	// 	for (let k in this.skillData) {
	// 		let v = this.skillData[k]

	// 		let state: any
	// 		if (Array.isArray(v)) {
	// 			state = v[2]
	// 		} else {
	// 			state = v[3]
	// 		}

	// 		if (state && state == opSacrificeStatus.CAN) {
	// 			curCanActiva = k
	// 		}
	// 	}

	// 	if (curCanActiva && this.skillLevel < defaultValue.SACRIFICE_MAX_LEVEL) {
	// 		if (index < curCanActiva) {
	// 			level = this.skillLevel + 1
	// 		} else {
	// 			level = this.skillLevel
	// 		}
	// 	} else {
	// 		level = defaultValue.SACRIFICE_MAX_LEVEL
	// 	}
	// 	return level
	// }

	// //根据状态获取御灵下一个等级
	// getNextSkillLevelList(index) {
	// 	let level = 0
	// 	let curCanActiva = null
	// 	if (this.skillData == null) {
	// 		return 0
	// 	}
	// 	for (let k in this.skillData) {
	// 		let v = this.skillData[k]

	// 		let state: any
	// 		if (Array.isArray(v)) {
	// 			state = v[2]
	// 		} else {
	// 			state = v[3]
	// 		}

	// 		if (state && state == opSacrificeStatus.CAN) {
	// 			curCanActiva = k
	// 		}
	// 	}

	// 	if (curCanActiva && this.skillLevel < defaultValue.SACRIFICE_MAX_LEVEL) {
	// 		if (index <= curCanActiva) {
	// 			level = this.skillLevel + 1
	// 		} else {
	// 			level = this.skillLevel
	// 		}
	// 	} else {
	// 		level = defaultValue.SACRIFICE_MAX_LEVEL
	// 	}
	// 	return level
	// }

	// //御灵升级需要的材料
	// getNextSkillNeedMaterial() {
	// 	if (this.skillData == null) {
	// 		return null
	// 	}

	// 	let level = this.skillLevel
	// 	if (level >= defaultValue.SACRIFICE_MAX_LEVEL) {
	// 		return null
	// 	}

	// 	let bgindex = 7
	// 	for (let _i in this.skillData) {
	// 		let i = tonumber(_i)
	// 		let v = this.skillData[i]

	// 		if (v[3] == opSacrificeStatus.CAN) {
	// 			bgindex = i - 294
	// 			break
	// 		}
	// 	}

	// 	let sacrList = GameConfig.SacrificeConfig[294 + bgindex][level + 1]
	// 	return sacrList.item
	// }


	getSortItemByMaxLevel(itemList, level) {
		if (itemList.length == 0) {
			return itemList
		}

		//先按可以使用的最高等级
		let sortList1 = []//可以使用的
		let sortList2 = []//不可以使用的
		for (let _ = 0; _ < itemList.length; _++) {
			let v = itemList[_]

			if (v.getRefProperty("uselevel") <= level) {
				JsUtil.arrayInstert(sortList1, v)
			} else {
				JsUtil.arrayInstert(sortList2, v)
			}
		}

		table_sort(sortList1, function (a, b) {
			let aLevel = a.getRefProperty("uselevel")
			let bLevel = b.getRefProperty("uselevel")
			//return aLevel > bLevel
			return bLevel - aLevel
		})
		table_merge(sortList1, sortList2)
		return sortList1
	}




	getSortEquipList(itemList, level): Item[] {
		if (itemList.length == 0) {
			return itemList
		}

		//先按可以使用的最高等级，再按装备评分
		let sortList1: any = []//可以使用的
		let sortList2: any = []//不可以使用的
		for (let _ = 0; _ < itemList.length; _++) {
			let v = itemList[_]

			if (v.getRefProperty("uselevel") <= level || v.isUseLevelIgnore()) {
				JsUtil.arrayInstert(sortList1, v)
			} else {
				JsUtil.arrayInstert(sortList2, v)
			}
		}

		table_sort(sortList1, function (a, b) {
			let aLevel = a.getRefProperty("level")
			let bLevel = b.getRefProperty("level")
			if (aLevel == bLevel) {
				let aScroe = a.getProperty("equip_score") || 0
				let bScroe = b.getProperty("equip_score") || 0
				if (aScroe == bScroe) {
					let aEnhance = a.getProperty("enhance_level") || 0
					let bEnhance = b.getProperty("enhance_level") || 0

					return bEnhance - aEnhance
				} else {
					return bScroe - aScroe
				}
			} else {
				return bLevel - aLevel
			}
		})

		table_sort(sortList2, function (a, b) {
			let aLevel = a.getRefProperty("level")
			let bLevel = b.getRefProperty("level")
			if (aLevel == bLevel) {
				let aScroe = a.getProperty("equip_score") || 0
				let bScroe = b.getProperty("equip_score") || 0
				if (aScroe == bScroe) {
					let aEnhance = a.getProperty("enhance_level") || 0
					let bEnhance = b.getProperty("enhance_level") || 0

					return bEnhance - aEnhance
				} else {
					return bScroe - aScroe
				}
			} else {
				return aLevel - bLevel						//不可使用的等级从小到大
			}
		})
		for (let _ = 0; _ < sortList2.length; _++) {
			let v = sortList2[_]

			JsUtil.arrayInstert(sortList1, v)
		}
		//table_merge(sortList1, sortList2)
		return sortList1
	}

	//通过物品类型获取物品信息（列表）
	getEquipListByTypeAndVocation(itemtype, vocationType) {
		vocationType = checkNull(vocationType, -1)

		let itemList = []
		if (!(itemtype >= opItemType.PLAYER_EQUIP_START && itemtype <= opItemType.PLAYER_EQUIP_END)) {
			return itemList
		}

		for (let i in this.itemList) {
			let item = this.itemList[i]

			if (item.getRefProperty("type") == itemtype) {

				if (vocationType == -1) {
					JsUtil.arrayInstert(itemList, item)
				} else {
					let vocationTypeList = item.getRefProperty("heroId")
					if (table_isExsit(vocationTypeList, vocationType)) {
						JsUtil.arrayInstert(itemList, item)
					}
				}
			}
		}

		return itemList
	}


	//获得装备列表，根据指定排序 curInfo(PetInfo, heroInfo)
	// getSortEquipListByInfo(itemtype, curInfo): Item[] {
	// 	//角色等级
	// 	let vocationType = -1
	// 	let level = 0

	// 	let heroInfo = GetHeroPropertyInfo()

	// 	if (curInfo) {
	// 		let isHero = (IsHeroInfo(curInfo))
	// 		level = curInfo.level || 0
	// 		if (isHero) {
	// 			vocationType = ProfessionSystem.getInstance().getProfessionType(curInfo.vocation)
	// 		} else {
	// 			vocationType = PetSystem.getInstance().getProfessionType(curInfo.entry)
	// 		}
	// 	} else if (heroInfo) {
	// 		level = heroInfo.level || 0
	// 	}
	// 	//职业
	// 	let itemList = this.getEquipListByTypeAndVocation(itemtype, vocationType)

	// 	//let itemList:any = {}
	// 	//if(! (itemtype >= opItemType.PLAYER_EQUIP_START && itemtype <= opItemType.PLAYER_EQUIP_END ) ){
	// 	//	TLog.Debug("getSortEquipList11111111111")
	// 	//	return itemList
	// 	//}
	// 	//
	// 	//for(let i in this.itemList){
	// 	//		let item = this.itemList[i]
	// 	//
	// 	//	if(item.getRefProperty("type") == itemtype ){
	// 	//		
	// 	//		if(vocation == -1 ){
	// 	//			JsUtil.arrayInstert(itemList, item)
	// 	//		}else{
	// 	//			let vocationTypeList = item.getRefProperty("heroId")
	// 	//		 	let type = ProfessionSystem.getInstance().getProfessionType(vocation)
	// 	//		 	
	// 	//		 	if(table_isExsit(vocationTypeList, type) ){
	// 	//		 		JsUtil.arrayInstert(itemList, item)
	// 	//		 	}
	// 	//		}
	// 	//	}
	// 	//}

	// 	return this.getSortEquipList(itemList, level)
	// }

	// //得到材料列表//
	// getMaterialList(entryid, level) {
	// 	if (GameConfig.MaterialListConfig[entryid] != null) {
	// 		return GameConfig.MaterialListConfig[entryid][level]
	// 	}
	// }

	getItemList() {
		return this.itemList
	}

	setShopSellItemList(shopIndex, itemList) {
		this.shopSellItemList[shopIndex] = itemList

	}

	getShopSellItemList(type) {
		return this.shopSellItemList[type] || []
	}


	//////////////////////////////溶解////////////////////////////////-
	getResolveList() {
		let resolveList = []
		let beibaoList = this.getItemIdListByStore(storeOptions.PACKET)
		for (let _ in beibaoList) {
			let v = beibaoList[_]

			let itemInfo = this.getItemLogicInfoByID(v)
			let entryId = itemInfo.entryId
			if (GameConfig.itemConfig[entryId]) {
				let config = GameConfig.itemConfig[entryId]
				if (config.splitPowder > 0) {
					JsUtil.arrayInstert(resolveList, itemInfo)
				}
			}
		}

		table_sort(resolveList, function (a, b) {
			let aConfig = a.getRefPropertyInfo()
			let bConfig = b.getRefPropertyInfo()

			return bConfig.splitPowder - aConfig.splitPowder
		})

		return resolveList
	}

	SetResolveLib(list) {
		this.resolveLib = []
		for (let i in list) {
			let v = list[i]

			if (v) {
				JsUtil.arrayInstert(this.resolveLib, v)
			}
		}
	}

	GetResolveLib() {
		return this.resolveLib
	}

	// isEquipPromoteType(itemEntry) {
	// 	let config = GameConfig.EquipmakeConfig[itemEntry]
	// 	if (config == null) {
	// 		return false
	// 	}
	// 	return config.needEquip > 0
	// }

	// checkEquipPromoteMaterial(itemEntry) {
	// 	let makeInfo = GameConfig.EquipmakeConfig[itemEntry]
	// 	if (makeInfo == false)
	// 		return false;

	// 	let bMaterialEngough = true
	// 	for (let i = 0; i < makeInfo.material.length; i++) {
	// 		let v = makeInfo.material[i]

	// 		let entryId = v[0]
	// 		let count = v[1]

	// 		if (this.getItemCount(entryId) < count) {
	// 			bMaterialEngough = false
	// 			break
	// 		}
	// 	}

	// 	if (bMaterialEngough && makeInfo.needEquip > 0) {
	// 		if (this.getItemCount(makeInfo.needEquip) < 1) {
	// 			bMaterialEngough = false
	// 		}
	// 	}

	// 	let curCash = GetHeroProperty("funds") || 0
	// 	return bMaterialEngough && curCash >= makeInfo.funds
	// }

	//物品来源
	getItemSourceText(itemSource) {
		for (let _ in opItemSource) {
			let v = opItemSource[_]

			if (v == itemSource) {
				return Localize_cns("ITEM_SOURCE" + v)
			}
		}
		return Localize_cns("ROBBER_TXT118")
	}


	getSkillLevel() {
		return this.skillLevel
	}

	onGetEquipIndex() {
		return this.onekeyEquipIndex
	}
	onSetEquipIndex(index) {
		this.onekeyEquipIndex = index
	}
	onGetEquipCount() {
		return this.onekeyEquipCount
	}
	onSetEquipCount(index) {
		this.onekeyEquipCount = index
	}


	//某个类型某个等阶通用装备列表
	getFunEquipListByStage(subType, stage) {
		let equipList = this.getItemLogicInfoByType(opItemType.COMMON_EQUIP)
		let list: any[] = []
		for (let i in equipList) {
			let equip = <Item>equipList[i]
			let mStage = equip.getRefProperty("level")
			let mSubType = equip.getRefProperty("subtype")
			if (mSubType == subType && mStage == stage) {
				JsUtil.arrayInstert(list, equip)
			}
		}
		return list
	}

	//某个类型某个等阶限制装备列表(拿等阶最近的装备)
	getFunEquipListWithStage(subtype, stage) {
		for (let i = stage; i > 0; i--) {
			let equipList = this.getFunEquipListByStage(subtype, i)
			if (size_t(equipList) != 0) {
				return equipList
			}
		}
		return []
	}

	//获取到熔炼的
	getBeiBaoSmeltList(level) {
		let equipitemlist = []
		for (let i = 201; i <= 210; i++) {
			let equipList = this.getItemLogicInfoByType(opItemType.ROLE_EQUIP, i)
			let templist = this.getEquipSubtypeSmeltList(equipList, i)
			for (let k in templist) {
				table_insert(equipitemlist, templist[k])
			}

		}
		return equipitemlist

	}
	//获取某个位置可以熔炼的装备列表
	getEquipSubtypeSmeltList(itemlist, subtype) {
		let roleItem = RoleSystem.getInstance().getRoleEquipItem(subtype)
		if (roleItem == null) {
			return []
		}
		let recvlist = []
		for (let k in itemlist) {
			let item = <Item>itemlist[k]
			let ePro = GetRoleEquipBaseProperty(roleItem.entryId, roleItem.getProperty("quality"))
			let eForce = GetForceMath(ePro)
			let itemPro = GetRoleEquipBaseProperty(item.entryId, item.getProperty("quality"))
			let itemForce = GetForceMath(itemPro)
			if (itemForce < eForce) {
				table_insert(recvlist, item)
			}
		}
		return recvlist
	}

	//帮派升级材料
	getFactionMaterial() {
		let list = []
		for (let i in this.itemList) {
			let item: Item = this.itemList[i]
			if (item.getRefProperty("action") == "facExp") {
				for (let i = 0; i < item.getProperty("count"); i++) {
					table_insert(list, item)
				}
			}
		}
		return list
	}

	//装备背包格子数量
	getEquipPacketCount() {
		let equipItemList = this.getItemLogicInfoByType(opItemType.ROLE_EQUIP)
		let equipItemList2 = this.getItemLogicInfoByType(opItemType.COMMON_EQUIP)

		return equipItemList.length + equipItemList2.length
	}

	isEquipPacketFull() {
		let maxCount = GetHeroProperty("equipMax") || 0
		let currentCount = this.getEquipPacketCount()
		return currentCount >= maxCount
	}

	isEquipPacketAlmostFull() {
		let maxCount = GetHeroProperty("equipMax") || 0
		let currentCount = this.getEquipPacketCount()
		return currentCount >= maxCount * 0.9
	}
}