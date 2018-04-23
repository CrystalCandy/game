// TypeScript file
/*
作者:
    yangguiming
	
创建时间：
   2017.03.10(周五)

意图：
   运营活动
公共接口：
   
*/

class PayActivityMessageHandler extends MessageHandler {

	public initObj(...args: any[]): void {
		//this.register(opCodes.G2C_RECHARGE_REBATE_QUERY, 				this.onRecvG2C_RECHARGE_REBATE_QUERY, this)		//限时单笔充值
		//this.register(opCodes.G2C_RECHARGE_ACCUMULATIVE, 	this.onRecvG2C_RECHARGE_ACCUMULATIVE,this)	//限时累冲
		//this.register(opCodes.G2C_PLAYER_RECHARGE_ACCUMULATIVE, 	this.onRecvG2C_PLAYER_RECHARGE_ACCUMULATIVE,this)//累冲个人信息
		//this.register(opCodes.G2C_CONSUME_ACCUMULATIVE, 				this.onRecvG2C_CONSUME_ACCUMULATIVE, this)		//限时累计消费

		// this.register(opCodes.G2C_QUERY_ACTIVITY_LIST, this.onRecvG2C_QUERY_ACTIVITY_LIST, this)		//冲值活动开放列表
		// this.register(opCodes.G2C_QUERY_ACTIVITY_INFO, this.onRecvG2C_QUERY_ACTIVITY_INF, this)		//冲值活动信息
		// this.register(opCodes.G2C_QUERY_ACTIVITY_PLAYER, this.onRecvG2C_QUERY_ACTIVITY_PLAYER, this)		//冲值活动玩家信息
		// this.register(opCodes.G2C_QUERY_ACTIVITY_PLAYER_INFO, this.onRecvG2C_QUERY_ACTIVITY_PLAYER_INFO, this)		//限时累计消费
		// this.register(opCodes.G2C_ITEM_TRADE_DISCOUNT_INFO, this.onRecvG2C_ITEM_TRADE_DISCOUNT_INFO, this)		//商店折扣
		this.register(opCodes.G2C_RECHARGE_SERVERS_PRICE, this.onRecvG2C_RECHARGE_SERVERS_PRICE, this)		//跨服冲值活动
		this.register(opCodes.G2C_PLAYER_RECHARGE_SERVERS_PRICE, this.onRecvG2C_PLAYER_RECHARGE_SERVERS_PRICE, this)		//跨服冲值玩家信息
		// this.register(opCodes.G2C_ROLE_RECHARGE_BUY_PET, this.onRecvG2C_ROLE_RECHARGE_BUY_PET, this)		//伙伴直购
	}


	//onRecvG2C_RECHARGE_REBATE_QUERY( dispatcher, message){
	//
	//	table_sort(message.info.actInfo, function(a, b) return a.diamond < b.diamond })
	//	ActivitySystem.getInstance().setRechargeActivityInfo(message.info, PayActivityDefine.singleRecharge)
	//	FireEvent(EventDefine.PAY_ACTIVITY_UPDATE, null)
	//}

	//onRecvG2C_RECHARGE_ACCUMULATIVE( dispatcher, message){
	//	
	//	if(size_t(message.actInfo) == 1 ){
	//		let info = ActivitySystem.getInstance().getRechargeActivityInfo(PayActivityDefine.limitRecharge) || {}
	//		info.actInfo = message.actInfo
	//		ActivitySystem.getInstance().setRechargeActivityInfo(info, PayActivityDefine.limitRecharge)
	//		FireEvent(EventDefine.PAY_ACTIVITY_UPDATE, null)
	//		
	//		//活动期间，获得个人累冲信息
	//		let _, info = next(message.actInfo)
	//		if(info && info["etime"] && info["stime"] ){
	//			let curTime = GetServerTime()
	//			if(info["etime"] > curTime && info["stime"] < curTime ){
	//				let message = GetMessage(opCodes.C2G_PLAYER_RECHARGE_ACCUMULATIVE)
	//				SendGameMessage(message)			
	//			}		
	//		}
	//	}
	//	
	//	
	//}
	//
	//onRecvG2C_PLAYER_RECHARGE_ACCUMULATIVE( dispatcher, message){
	//	let info = ActivitySystem.getInstance().getRechargeActivityInfo(PayActivityDefine.limitRecharge) || {}
	//	info.heroInfo =message.heroInfo
	//	ActivitySystem.getInstance().setRechargeActivityInfo(info, PayActivityDefine.limitRecharge)
	//	
	//	FireEvent(EventDefine.PAY_ACTIVITY_UPDATE, null)
	//	
	//}
	//
	//onRecvG2C_CONSUME_ACCUMULATIVE( dispatcher, message){
	//
	//	ActivitySystem.getInstance().setRechargeActivityInfo(message.info, PayActivityDefine.limitConsume)
	//	FireEvent(EventDefine.PAY_ACTIVITY_UPDATE, null)
	//}

	// onRecvG2C_QUERY_ACTIVITY_LIST(dispatcher, message) {//冲值活动开放列表
	// 	ActivitySystem.getInstance().setOperateActivityOpenList(message.list)
	// 	message.list = null
	// 	FireEvent(EventDefine.PAY_ACTIVITY_LIST, null);//NetMessageEvent.newObj(message.list))	
	// }

	// onRecvG2C_QUERY_ACTIVITY_INF(dispatcher, message) {//冲值活动信息
	// 	ActivitySystem.getInstance().setPayActivityInfo(message.info)
	// 	message.info = null
	// 	FireEvent(EventDefine.PAY_ACTIVITY_INFO, null);//NetMessageEvent.newObj(message.info))
	// }

	// onRecvG2C_QUERY_ACTIVITY_PLAYER(dispatcher, message) {//冲值活动相关玩家信息
	// 	ActivitySystem.getInstance().setOperatePlayerInfo(message.info)
	// 	message.info = null
	// 	FireEvent(EventDefine.PAY_ACTIVITY_INFO, null);//NetMessageEvent.newObj(message.info))
	// }

	// onRecvG2C_QUERY_ACTIVITY_PLAYER_INFO(dispatcher, message) {//冲值活动和玩家信息
	// 	ActivitySystem.getInstance().setPayActivityInfo(message.info)
	// 	ActivitySystem.getInstance().setOperatePlayerInfo(message.info)
	// 	message.info = null
	// 	FireEvent(EventDefine.PAY_ACTIVITY_INFO, null);//NetMessageEvent.newObj(message.info))
	// }

	// onRecvG2C_ITEM_TRADE_DISCOUNT_INFO(dispatcher, message) {//冲值活动和玩家信息
	// 	ActivitySystem.getInstance().setRechargeActivityInfo(message.discountInfo)
	// 	FireEvent(EventDefine.PAY_ACTIVITY_INFO, null)
	// }

	//跨服冲值活动
	onRecvG2C_RECHARGE_SERVERS_PRICE(dispatcher, message) {
		ActivitySystem.getInstance().setServersRankActivityInfo(message.info)
		FireEvent(EventDefine.PAY_ACTIVITY_INFO, null)
	}

	//跨服冲值玩家信息
	onRecvG2C_PLAYER_RECHARGE_SERVERS_PRICE(dispatcher, message) {
		ActivitySystem.getInstance().setServersRankPlrInfo(message.value)
		FireEvent(EventDefine.PAY_ACTIVITY_INFO, null)
	}

	//伙伴直购
	// onRecvG2C_ROLE_RECHARGE_BUY_PET(dispatcher, message) {
	// 	PaySystem.getInstance().updatePaySellRecord(message.record)
	// 	FireEvent(EventDefine.PAY_ACTIVITY_SELLPET, null)
	// }

}