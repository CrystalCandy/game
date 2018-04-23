class ItemMessageHandler extends MessageHandler {

	public initObj(...args: any[]): void {

		// this.register(opCodes.G2C_ITEM_LIST, this.onRecvG2C_ITEM_LIST, this)		//物品列表
		// this.register(opCodes.G2C_ITEM_UPDATE, this.onRecvG2C_ITEM_UPDATE, this)	//物品更新
		// this.register(opCodes.G2C_ITEM_DROP, this.onRecvG2C_ITEM_DROP, this)		//物品丢弃


		////////////////////////////商店////////////////////////////
		this.register(opCodes.G2C_ITEM_TRADE_LIMIT, this.onRecvG2C_ITEM_TRADE_LIMIT, this)   //交易所限购
		this.register(opCodes.G2C_ITEM_TRADE_LIST, this.onRecvG2C_ITEM_TRADE_LIST, this)		//商店列表
		this.register(opCodes.G2C_ITEM_TRADE_ITEM_INFO, this.onRecvG2C_ITEM_TRADE_ITEM_INFO, this)		//商店单个物品信息
		//this.register(opCodes.G2C_ITEM_SELL_LIST, this.onRecvG2C_ITEM_SELL_LIST, this) //积分商店列表

		////////////////////////////装备////////////////////////////
		// this.register(opCodes.G2C_EQUIP_IDENTIFY_SUCCESS, this.onRecvG2C_EQUIP_IDENTIFY_SUCCESS, this) //装备鉴定
		// this.register(opCodes.G2C_ITEM_EQUIP_MAKE, this.onRecvG2C_ITEM_EQUIP_MAKE, this)
		// this.register(opCodes.G2C_EQUIP_ALL_CAST, 			this.onRecvG2C_EQUIP_ALL_CAST, this)		//一键重塑返回

		this.register(opCodes.G2C_EQUIP_LIST, this.onRecvG2C_EQUIP_LIST, this)		//装备更新
		this.register(opCodes.G2C_ALL_EQUIP_LIST, this.onRecvG2C_EQUIP_LIST, this)		//装备更新
	
		//
		// this.register(opCodes.G2C_PET_DEVELOP_QUALITY,        this.onG2C_PET_DEVELOP_QUALITY,this)      	//伙伴进化返回

		////////////////////////////御灵////////////////////////////
		// this.register(opCodes.G2C_LEARN_EQUIP_ENCHANT, this.onRecvG2C_LEARN_EQUIP_ENCHANT, this)

		////////////////////////////溶解////////////////////////////
		// this.register(opCodes.G2C_ITEM_LOTTERY_LIB, this.onRecvG2C_ITEM_LOTTERY_LIB, this)   //物品库
		// this.register(opCodes.G2C_ITEM_ENTER_LOTTERY, this.onRecvG2C_ITEM_ENTER_LOTTERY, this) //初始化
		//this.register(opCodes.G2C_ITEM_LOTTERY, this.onRecvG2C_ITEM_LOTTERY, this)  //抽奖结果

		//this.register(opCodes.G2C_ITEM_ADD, 		this.onRecvG2C_ITEM_ADD, this)	//物品更新

		//this.register(opCodes.G2C_ITEM_TRADE , this.onRecvG2C_ITEM_TRADE, this) //物品交易


		//this.register(opCodes.G2C_ITEM_FLY_RECORD, this.onRecvG2C_ITEM_FLY_RECORD, this)		//飞行旗
		//this.register(opCodes.G2C_ITEM_FLY_INFO, this.onRecvG2C_ITEM_FLY_INFO, this)		//飞行旗

		//
		//this.register(opCodes.G2C_ITEM_TRADE_PRICE, this.onRecvG2C_ITEM_TRADE_PRICE, this)		//背包灵石物品

		//this.register(opCodes.G2C_LIVESKILL_BEGIN_MAKING, this.onRecvG2C_LIVESKILL_BEGIN_MAKING, this)

		//this.register(opCodes.G2C_LIVESKILL_MAKING_GET, this.onRecvG2C_LIVESKILL_MAKING_GET, this)

		//this.register(opCodes.G2C_LIVESKILL_COOKING_GET , this.onRecvG2C_LIVESKILL_COOKING_GET, this) //烹饪成功返回

		//this.register(opCodes.G2C_LIVESKILL_MAKED_GET , this.onRecvG2C_LIVESKILL_MAKED_GET, this) //打造成功返回

		//this.register(opCodes.G2C_NEW_ITEM_ADD , this.onRecvG2C_NEW_ITEM_ADD, this) //分解获得物品

		//this.register(opCodes.G2C_REBUILD_RANGE , this.onRecvG2C_REBUILD_RANGE, this) //分解范围

		this.register(opCodes.G2C_ACTIVE_DUIHUAN_SELECT, this.onRecvG2C_ACTIVE_DUIHUAN_SELECT, this)			//玩家进入空间 "DAILY" 表示爬塔
		//
		//this.register(opCodes.G2C_MAGIC_STONE_ENERGY, 		this.onRecvG2C_MAGIC_STONE_ENERGY, this)			//魔导石能量值
		//
		//this.register(opCodes.G2C_MAGIC_STONE_FORGE, 		this.onRecvG2C_MAGIC_STONE_FORGE, this)			//魔导石升级返回
		//
		//this.register(opCodes.G2C_MAGIC_STONE_ADD_ENERGY, 		this.onRecvG2C_MAGIC_STONE_ADD_ENERGY, this)			//魔导石注入能量返回
		//
		//this.register(opCodes.G2C_MAGIC_STONE_INSTRUCT,       this.onRecvG2C_MAGIC_STONE_INSTRUCT,this)   //所有魔导仪等级
		//

		//this.register(opCodes.G2C_EQUIP_STONE_COMPOUNDS_ALL, this.onRecvG2C_EQUIP_STONE_COMPOUNDS_ALL,this) //全部合成返回
		//this.register(opCodes.G2C_EQUIP_STONE_COMPOUNDS,     this.onRecvG2C_EQUIP_STONE_COMPOUNDS,this)
		//this.register(opCodes.G2C_EQUIP_ADD_STAR,     			 this.onRecvG2C_EQUIP_ADD_STAR,this)            //装备加星



		//
		//////////////////////////////黑市//////////////////////-
		//this.register(opCodes.G2C_ITEM_BLACK_MARKET_LIST, this.onRecvG2C_ITEM_BLACK_MARKET_LIST,this)   //黑市列表
		//
		//
		//this.register(opCodes.G2C_EQUIP_FUSE,this.onRecvG2C_EQUIP_FUSE,this)   
		//
		//                //圣器融合
		////////////////////-拍卖行//////////
		//this.register(opCodes.G2C_AUCTION_ITEM_LIST,this.onRecvG2C_AUCTION_ITEM_LIST,this)  
		//this.register(opCodes.G2C_AUCTION_QUERY_ITEM,this.onRecvG2C_AUCTION_QUERY_ITEM,this)
		//this.register(opCodes.G2C_AUCTION_QUERY_MY_BUY_LIST,this.onRecvG2C_AUCTION_QUERY_MY_BUY_LIST,this)
		//this.register(opCodes.G2C_AUCTION_RECORD_LIST,this.onRecvG2C_AUCTION_RECORD_LIST,this)
		//this.register(opCodes.G2C_AUCTION_ADD_PRIZE_RECORD,this.onRecvG2C_AUCTION_ADD_PRIZE_RECORD,this)

	}

	onRecvG2C_EQUIP_LIST(dispatcher, message) {

		//参照opEquipTypeToIndex

		let bHeroUpdate = false
		let bPetUpdate = false
		let bItemUpdate = false

		//穿上的装备，不在背包里，这里需要添加进来
		for (let _ = 0; _ < message.equipInfoList.length; _++) {
			let info = message.equipInfoList[_]

			let actorInfo = null
			if (info.type == objectType.OBJECT_TYPE_VACATIONER) {
				actorInfo = GetHeroPropertyInfo()
				bHeroUpdate = true
			} else if (info.type == objectType.OBJECT_TYPE_PET) {
				actorInfo = PetSystem.getInstance().getPetInfo(info.id)
				bPetUpdate = true
			}

			//重置各部位装备
			ResetActorEquip(actorInfo)

			//物品列表
			for (let index = 0; index < info.itemList.length; index++) {
				let itemInfo = info.itemList[index]

				if (itemInfo.store == storeOptions.PETITEM) {
					let item = Item.newObj(itemInfo)

					SetActorEquip(actorInfo, item)

					ItemSystem.getInstance().addItem(item)
					bItemUpdate = true
				}
			}
		}


		if (bHeroUpdate) {
			FireHeroUpdateInfo()
		}

		if (bPetUpdate) {
			FireEvent(EventDefine.PET_LIST_UPDATE, null)
		}

		if (bItemUpdate) {
			FireEvent(EventDefine.ITEM_UPDATE, null)
		}

	}


	// onRecvG2C_ITEM_LIST(dispatcher, message) {
	// 	let count = message.ItemList.length
	// 	for (let k = 0; k < message.ItemList.length; k++) {
	// 		let v = message.ItemList[k]

	// 		let logicItem = Item.newObj(v)
	// 		ItemSystem.getInstance().addItem(logicItem)
	// 	}
	// 	ItemSystem.getInstance().onGetItemList()
	// 	FireEvent(EventDefine.ITEM_UPDATE, null)
	// }


	// onRecvG2C_ITEM_UPDATE(dispatcher, message) {
	// 	//TLog.Debug("ItemMessageHandler.onRecvG2C_ITEM_UPDATE")
	// 	//TLog.Debug_r(message.ItemList)
	// 	//io.read()
	// 	let count = message.ItemList.length
	// 	for (let k = 0; k < message.ItemList.length; k++) {
	// 		let v = message.ItemList[k]

	// 		let logicItem = Item.newObj(v)
	// 		let itemEntryId = logicItem["propertyInfo"]["entry"]
	// 		let itemId = logicItem["id"]
	// 		//TLog.Debug("UPDATE", itemEntryId, itemId)
	// 		ItemSystem.getInstance().addItem(logicItem)
	// 		//得到装备兑换用粉末
	// 		//if(itemEntryId == 40038 ){
	// 		//	FireEvent(EventDefine.GOT_POWDER_BOX,ItemAddEvent.newObj(itemId))
	// 		//}
	// 	}
	// 	//FireEvent(EventDefine.ITEM_UPDATE_LIST, ItemUpdateListEvent.new(message.ItemList))
	// 	FireEvent(EventDefine.ITEM_UPDATE, null)
	// }


	// onRecvG2C_ITEM_DROP(dispatcher, message) {

	// 	ItemSystem.getInstance().removeItem(message.id)
	// 	FireEvent(EventDefine.ITEM_UPDATE, null)
	// }


	//////////////////////////-交易所//////////////////////////////////-
	onRecvG2C_ITEM_TRADE_LIMIT(dispatcher, message) {
		//ItemSystem.getInstance().setTradeLimit(message.limitList)
		FireEvent(EventDefine.SHOP_DEAL_LIMIT, NetMessageEvent.newObj(message))
	}

	onRecvG2C_ITEM_TRADE_LIST(dispatcher, message) {
		let list = message.itemList
		//ItemSystem.getInstance().SetDealList(list,message.first_type)
		FireEvent(EventDefine.SHOP_DEAL_LIST, NetMessageEvent.newObj(message))
	}

	onRecvG2C_ITEM_TRADE_ITEM_INFO(dispatcher, message) {
		FireEvent(EventDefine.SHOP_DEAL_ITEM, NetMessageEvent.newObj(message))
	}

	// onRecvG2C_ITEM_SELL_LIST(dispatcher, message) {
	// 	//local count = #message.itemList
	// 	//local store = ItemSystem.getInstance():getStore(itemRefStore.NpcShop)
	// 	//store:setItemListBatch(message.sellId, message.itemList)
	// 	ItemSystem.getInstance().setShopSellItemList(message.shopIndex, message.itemList)
	// 	FireEvent(EventDefine.ITEM_SELL_LIST, NetMessageEvent.newObj(message))
	// }



	//////////////////////////-装备//////////////////////////////////-
	// onRecvG2C_EQUIP_IDENTIFY_SUCCESS(dispatcher, message) {
	// 	let itemId = message.itemId
	// 	FireEvent(EventDefine.EQUIP_IDENTIFY_SUCCESS, ItemEvent.newObj(itemId))
	// }

	// onRecvG2C_EQUIP_ALL_CAST( dispatcher, message){
	// 	FireEvent(EventDefine.EQUIP_ALL_CAST,NetMessageEvent.newObj(message) )
	// }

	// onG2C_PET_DEVELOP_QUALITY( dispatcher, message){
	// 	let petid = message.petentryid
	// 	let wnd = WngMrg.getInstance().getWindow("ActorShowFrame")
	// 	wnd.showEvolvePartner(petid)
	// }


	// onRecvG2C_ITEM_EQUIP_MAKE(dispatcher, message) {
	// 	FireEvent(EventDefine.EQUIP_MAKE_SUCCESS, ItemEvent.newObj(message.id))

	// 	let entryId = message.id
	// 	let uid = message.uid

	// 	DelayEvecuteFunc(0, function () {
	// 		let wnd = WngMrg.getInstance().getWindow("PrizeShowFrame")
	// 		let templist = [[entryId, 1, 0, uid]]
	// 		wnd.showWithItemList(templist)
	// 	}, this)

	// }

	////////////////////////////-御灵////////////////////////////////
	// onRecvG2C_LEARN_EQUIP_ENCHANT(dispatcher, message) {

	// 	ItemSystem.getInstance().SetSkill(message.skillLevel, message.sacrifice)

	// }

	////////////////////////////-溶解//////////////////////////////-
	// onRecvG2C_ITEM_LOTTERY_LIB(dispatcher, message) {
	// 	ItemSystem.getInstance().SetResolveLib(message.ItemList)
	// 	FireEvent(EventDefine.RESOLVE_ITEM_LIB, null)
	// }

	// onRecvG2C_ITEM_ENTER_LOTTERY(dispatcher, message) {
	// 	FireEvent(EventDefine.RESOLVE_ITEM_INIT, null)
	// }

	// onRecvG2C_ITEM_LOTTERY(dispatcher, message) {
	// 	FireEvent(EventDefine.RESOLVE_ITEM_RESULT, ResolveResult.newObj(message.num, message.ItemList))
	// }






	//onRecvG2C_ITEM_TRADE( dispatcher, message){
	//	let status = message.status
	//	if(status == opTradeStatus.TRADE_STATUS_ITEM_UPDATE ){
	//		ItemSystem.getInstance().clearStoreItemList(itemRefStore.TRADE_TARGET)
	//		for(let i = 0; i < message.itemList.length; i++){
	//			let v = message.itemList[i]
	//	
	//			ItemSystem.getInstance().addStoreItem(v, itemRefStore.TRADE_TARGET)
	//		}
	//	}else{//if(status == opTradeStatus.TRADE_STATUS_MONEY_UPDATE ){
	//		FireEvent(EventDefine.TRADE_TARGET_UPDATE, TradeEvent.newObj(message.status, message.targetId, message.money, message.name, message.level))
	//	}
	//}
	//
	//
	//
	////所有魔导仪等级
	//onRecvG2C_MAGIC_STONE_INSTRUCT(dispatcher, message){
	//	ItemSystem.getInstance().setGemLevelInfo(message.levels)
	//	FireEvent(EventDefine.MAGIC_STONE_LEVEL_UPDATE,AllMagicStoneLevel.newObj(message.levels))
	//}
	//
	////当前魔导仪等级
	//onRecvG2C_MAGIC_STONE_FORGE(dispatcher, message){
	//	FireEvent(EventDefine.CURRENT_MAGIC_STONE_LEVEL_UPDATE,CurrentMagicStoneLevel.newObj(message.currentLevel))
	//}
	//
	//
	////-装备分解范围
	//onRecvG2C_REBUILD_RANGE(dispatcher, message){
	//		ItemSystem.getInstance().SetRebuildRange_list(message.list)
	//}
	//
	////-装备分解获得物品
	//onRecvG2C_NEW_ITEM_ADD(dispatcher, message){
	//		ItemSystem.getInstance().SetRetrun_list(message.itemList)
	//		FireEvent(EventDefine.EQUIP_RESOLVE_SUCCESS,null)
	//}
	//
	//
	//
	//
	//

	//
	//onRecvG2C_ITEM_FLY_RECORD( dispatcher, message){
	//	ItemSystem.getInstance().updateStoreItem(message.id, message, itemRefStore.Fly)
	//}
	//
	//onRecvG2C_ITEM_FLY_INFO( dispatcher, message){
	//	let list = message.list
	//	for(let i in list){
	//			let v = list[i]
	//	
	//		ItemSystem.getInstance().updateStoreItem(v.id, v, itemRefStore.Fly)
	//	}
	//}
	//
	//

	//
	//onRecvG2C_ITEM_TRADE_PRICE( dispatcher, message){
	//	let list = message.itemList
	//	FireEvent(EventDefine.ITEM_LINGSHI_SELL_LIST, ItemLingshiListEvent.newObj(list))
	//}
	//
	//onRecvG2C_LIVESKILL_BEGIN_MAKING( dispatcher, message){
	//	let itemList = message.itemList
	//	ItemSystem.getInstance().updateMakeDrawingList(itemList)
	//}
	//
	//onRecvG2C_LIVESKILL_MAKING_GET( dispatcher, message){
	//	let itemEntryId = message.itemEntryId
	//	FireEvent(EventDefine.DRUG_MAKING_RESULT, DrugMakingResultEvent.newObj(itemEntryId))
	//}
	//
	//
	//
	//
	//
	//
	//onRecvG2C_LIVESKILL_COOKING_GET( dispatcher, message){
	//	let store = ItemSystem.getInstance().getStore(itemRefStore.MakeResult)
	//	store.setResult(message.entryId, message.count)
	//}
	//
	//onRecvG2C_LIVESKILL_MAKED_GET( dispatcher, message){
	//	let store = ItemSystem.getInstance().getStore(itemRefStore.MakeResult)
	//	store.setResult(message.id, 1)
	//}
	//
	//晶石兑换金币或者体力剩余次数
	onRecvG2C_ACTIVE_DUIHUAN_SELECT(dispatcher, message) {
		//ItemSystem.getInstance().SetGoldSurplus(message.count,message.cost)
		FireEvent(EventDefine.JINGSHI_CHANGE_LIST_UPDATA, NetMessageEvent.newObj(message))
	}
	//
	////-魔导石能力值
	//onRecvG2C_MAGIC_STONE_ENERGY( dispatcher, message){
	//		ItemSystem.getInstance().SetGemValue(message.value)
	//		FireEvent(EventDefine.GEM_POWER_VALUE_UPDATE, null)
	//}
	//
	////-魔导石炼金返回
	//onRecvG2C_MAGIC_STONE_FORGE( dispatcher, message){
	//		FireEvent(EventDefine.GEM_UPDATA, GemUpdataEvent.newObj(message.isSuccess))
	//}
	//
	////-魔导石注入能量返回
	//onRecvG2C_MAGIC_STONE_ADD_ENERGY( dispatcher, message){
	//		FireEvent(EventDefine.GEM_ENTER_VALUE_UPDATA, GemEnterValueUpdataEvent.newObj(message.isSuccess))
	//}
	//
	//
	//
	//
	//
	//onRecvG2C_ITEM_BLACK_MARKET_LIST( dispatcher, message){
	//	FireEvent(EventDefine.BLACK_MARKET_LIST_RETURN,BlackMarketListEvent.newObj(message.getType,message.getList))
	//}
	//
	//onRecvG2C_EQUIP_STONE_COMPOUNDS_ALL( dispatcher, message){
	//	let successCount = message.successCount
	//	let failureCount = message.failureCount
	//	MsgSystem.AddTagTips(String.format(Localize_cns("COMPOSE_ALL_RESULT"),successCount,failureCount))
	//}
	//
	//onRecvG2C_EQUIP_STONE_COMPOUNDS( dispatcher, message){
	//	if(message.successFlag == 0 ){
	//		MsgSystem.AddTagTips(Localize_cns("COMPOSE_FAILED"))
	//	}else{
	//		MsgSystem.AddTagTips(Localize_cns("COMPOSE_SUCCESS"))
	//	}
	//}
	//
	//onRecvG2C_EQUIP_ADD_STAR( dispatcher, message){
	//	if(message.result == 1 ){
	//		MsgSystem.AddTagTips(Localize_cns("ADD_STAR_SUCCESS"))
	//	}else{
	//		MsgSystem.AddTagTips(Localize_cns("ADD_STAR_FAILED"))
	//	}
	//}
	//
	////
	//onRecvG2C_EQUIP_FUSE(dispatcher,message){
	//	//独占处理，一般不推荐这种处理方式
	//	let wnd = WngMrg.getInstance().getWindow("EquipHallowsFusingFrame")
	//	wnd.setFuseItemUid(message.uId)
	//}
	//
	//////////////////////////////拍卖行////////-
	//onRecvG2C_AUCTION_ITEM_LIST(dispatcher,message){
	//	ItemSystem.getInstance().setAHAllItemList(message.list)
	//	FireEvent(EventDefine.AH_ITEM_UPDATE,null)
	//}
	//onRecvG2C_AUCTION_QUERY_ITEM(dispatcher,message){
	//	ItemSystem.getInstance().setAHOneItem(message.info)
	//	FireEvent(EventDefine.AH_ITEM_UPDATE,null)
	//}
	//onRecvG2C_AUCTION_QUERY_MY_BUY_LIST(dispatcher,message){
	//	ItemSystem.getInstance().setAHMyBuyList(message.list)
	//	FireEvent(EventDefine.AH_MY_BUY_LIST_UPDATE,null)
	//}
	//onRecvG2C_AUCTION_RECORD_LIST(dispatcher,message){
	//	ItemSystem.getInstance().setAHMyRecordList(message.list)
	//	FireEvent(EventDefine.AH_MY_RECORD_UPDATE,null)
	//}
	//onRecvG2C_AUCTION_ADD_PRIZE_RECORD(dispatcher,message){
	//	ItemSystem.getInstance().setAHPrizeRecordList(message.list)
	//	FireEvent(EventDefine.AH_MY_RECORD_UPDATE,null)
	//}

}