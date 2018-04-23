// TypeScript file
/*
作者:
    yangguiming
	
创建时间：
   2017.03.10(周五)

意图：
   运营充值活动消息
公共接口：
   
*/


//限时单笔充值
class Message_C2G_RECHARGE_REBATE_QUERY extends MessageBase{
public initObj(...args:any[]):void {
	
}

pack(writer){
	
}

unpack(reader){
	
}

}

class Message_G2C_RECHARGE_REBATE_QUERY extends MessageBase{
    info
public initObj(...args:any[]):void {
	this.info = {}
}

pack(writer){
	
}

unpack(reader){
	this.info.actInfo 	= table_load(reader.readString())
	this.info.heroInfo = table_load(reader.readString())
	this.info.etime = tonumber(reader.readString()) || 0
}

//限时单笔充值领取
}

class Message_C2G_RECHARGE_REBATE_PRIZE extends MessageBase{
    itemId
public initObj(...args:any[]):void {
	this.itemId = 0
}

pack(writer){
	writer.writeUInt(this.itemId)
}

unpack(reader){
	
}


//////////////////////////////////////////////////////////////-
//限时累冲
}

class Message_C2G_RECHARGE_ACCUMULATIVE extends MessageBase{
public initObj(...args:any[]):void {
	
}

pack(writer){

}

unpack(reader){
	
}

}

class Message_G2C_RECHARGE_ACCUMULATIVE extends MessageBase{
    actInfo
public initObj(...args:any[]):void {
	this.actInfo = {}
}

pack(writer){

}

unpack(reader){
	this.actInfo = table_load(reader.readString())
}


}

class Message_C2G_PLAYER_RECHARGE_ACCUMULATIVE extends MessageBase{
public initObj(...args:any[]):void {
	
}

pack(writer){
	
}

unpack(reader){
	
}

//
}

class Message_G2C_PLAYER_RECHARGE_ACCUMULATIVE extends MessageBase{
    heroInfo
public initObj(...args:any[]):void {
	this.heroInfo = {}
}

pack(writer){
	
}

unpack(reader){
	this.heroInfo  		= table_load(reader.readString())
}


//累冲活动领取
}

class Message_C2G_GIVE_RECHARGE_ACCUMULATIVE extends MessageBase{
    actKey
    payQudao
    givePoint
public initObj(...args:any[]):void {
	this.actKey = ""
	this.payQudao = ""
	this.givePoint = 0
}

pack(writer){
	writer.writeString(this.actKey)
	writer.writeString(this.payQudao)
	writer.writeUInt(this.givePoint)
}

unpack(reader){
	
}


//////////////////////////////////////////////////////////////-
//限时累计消费回馈
}

class Message_C2G_CONSUME_ACCUMULATIVE extends MessageBase{
public initObj(...args:any[]):void {
	
}

pack(writer){
	
}

unpack(reader){
	
}

}

class Message_G2C_CONSUME_ACCUMULATIVE extends MessageBase{
    info
public initObj(...args:any[]):void {
	this.info = {}
}

pack(writer){
	
}

unpack(reader){
	this.info = null
	this.info = {}
	this.info.actInfo 	= table_load(reader.readString())
	this.info.heroInfo = table_load(reader.readString())
}




//////////////////////////////////////////////////-
////冲值活动列表
}

class Message_G2C_QUERY_ACTIVITY_LIST extends MessageBase{
    list
public initObj(...args:any[]):void {
    this.list = []
}

pack(writer){
	
}

unpack(reader){
	TLog.Debug("Message_G2C_QUERY_ACTIVITY_LIST")
	let num = reader.readUShort()
	TLog.Debug("num", num)
	this.list = null
	this.list = {}	
	this.list = []
	for(let i = 1; i <=  num;i++){
		let index = reader.readUShort()
		TLog.Debug("index", index)
		JsUtil.arrayInstert(this.list, index)
	}
}

//////////////////////////////////////////////////-
////冲值活动信息
}

class Message_G2C_QUERY_ACTIVITY_INFO extends MessageBase{
    info
public initObj(...args:any[]):void {
	this.info = {}
	//this.index = 0
	//this.stime = 0
	//this.etime = 0
	//this.actkey = ""
	//this.prizelist = {}
}

pack(writer){
	
}

unpack(reader){
	this.info = null
	this.info = {}	
	this.info.index = reader.readUShort()
	this.info.stime = reader.readUInt()
	this.info.etime = reader.readUInt()
	this.info.prizetype = reader.readUChar()
	//this.info.actkey = reader.readString()
	this.info.prizelist = []
	let num = reader.readUChar()
	for(let i = 1; i <=  num;i++){
		let prizeinfo:any = {}
		prizeinfo.point = reader.readUInt()
		if(this.info.prizetype == PayActivityPrizeType.ItemList ){
			let prizenum = reader.readUChar()
			prizeinfo.prize = []
			for(let j = 1; j <= prizenum;j++){
				let itemid = reader.readUInt()
				let itemnum = reader.readUShort()
                JsUtil.arrayInstert(prizeinfo.prize, [itemid, itemnum])
			}
		}else{
			prizeinfo.prize = reader.readUInt()
		}
		JsUtil.arrayInstert(this.info.prizelist, prizeinfo)
	}
}

//////////////////////////////////////////////////-
////冲值活动与玩家相关的信息
}

class Message_G2C_QUERY_ACTIVITY_PLAYER extends MessageBase{
    info
public initObj(...args:any[]):void {
	this.info = {}
	//this.index = 0
	//this.value = 0//当前活动的累计数据
	//this.reachlist = {}//哪些档位达成条件，或已经领取等
}

pack(writer){
	
}

unpack(reader){
	this.info = null
	this.info = {}
	this.info.index = reader.readUShort()
	this.info.value = reader.readUInt()
	this.info.reachlist = []
	this.info.ranklist = []

	let num = reader.readUChar()
	for(let i = 1; i <=  num;i++){
		let reach = reader.readUShort()
		JsUtil.arrayInstert(this.info.reachlist, reach)
	}
	let ranknum = reader.readUChar()
	for(let i = 1; i <=  ranknum;i++){
		let rankrow = table_load(reader.readString())
		JsUtil.arrayInstert(this.info.ranklist, rankrow)
	}	
}

////////////////////////////////////////////////-
//冲值活动信息
}

class Message_G2C_QUERY_ACTIVITY_PLAYER_INFO extends MessageBase{
    info
public initObj(...args:any[]):void {
	this.info = {}
}

pack(writer){
	
}

unpack(reader){
	this.info = null
	this.info = {}	
	this.info.index = reader.readUShort()
	this.info.stime = reader.readUInt()
	this.info.etime = reader.readUInt()
	this.info.prizetype = reader.readUChar()
	//this.info.actkey = reader.readString()
	this.info.prizelist = []
	let num = reader.readUChar()
	for(let i = 1; i <=  num;i++){
		let prizeinfo:any = {}
		prizeinfo.point = reader.readUInt()
		if(this.info.prizetype == PayActivityPrizeType.ItemList ){
			let prizenum = reader.readUChar()
			prizeinfo.prize = []
			for(let j = 1; j <= prizenum;j++){
				let itemid = reader.readUInt()
				let itemnum = reader.readUShort()
                JsUtil.arrayInstert(prizeinfo.prize, [itemid, itemnum])
			}
		}else{
			prizeinfo.prize = reader.readUInt()
		}
		JsUtil.arrayInstert(this.info.prizelist, prizeinfo)
	}
	
	//this.info.index = reader.readUShort()
	this.info.value = reader.readUInt()
	this.info.reachlist = []
	let num2 = reader.readUChar()
	for(let i = 1; i <=  num2;i++){
		let reach = reader.readUShort()
		JsUtil.arrayInstert(this.info.reachlist, reach)
	}

	this.info.ranklist = []
	let ranknum = reader.readUChar()
	for(let i = 1; i <=  ranknum;i++){
		let rankrow = table_load(reader.readString())
		JsUtil.arrayInstert(this.info.ranklist, rankrow)
	}	
}
//////////////////////////////////////////////////////////////-
//查询活动信息
}

class Message_C2G_QUERY_ACTIVITY_INFO extends MessageBase{
    index
public initObj(...args:any[]):void {
	this.index = 0
}

pack(writer){
	writer.writeUShort(this.index)
}

unpack(reader){
	
}

//////////////////////////////////////////////////////////////-
//查询玩家信息
}

class Message_C2G_QUERY_ACTIVITY_PLAYER extends MessageBase{
    index
public initObj(...args:any[]):void {
	this.index = 0
}

pack(writer){
	writer.writeUShort(this.index)
}

unpack(reader){
	
}

//////////////////////////////////////////////////////////////-
//查询活动和玩家信息
}

class Message_C2G_QUERY_ACTIVITY_PLAYER_INFO extends MessageBase{
    index
public initObj(...args:any[]):void {
	this.index = 0
}

pack(writer){
	writer.writeUShort(this.index)
}

unpack(reader){
	
}

//////////////////////////////////////////////////////////////-
//请求奖励//
}

class Message_C2G_QUERY_ACTIVITY_PRIZE extends MessageBase{
    index
    prizeindex
public initObj(...args:any[]):void {
	this.index = 0
	this.prizeindex = 0
}

pack(writer){
	writer.writeUShort(this.index)
	writer.writeUChar(this.prizeindex)
}

unpack(reader){
	
}

}


class Message_C2G_ITEM_TRADE_DISCOUNT_INFO extends MessageBase{

public initObj(...args:any[]):void {
	
}

pack(writer){	
	
}

unpack(reader){
}


//G2C查询特惠礼包
}

class Message_G2C_ITEM_TRADE_DISCOUNT_INFO extends MessageBase{
discountInfo
public initObj(...args:any[]):void {
	this.discountInfo = {}
}

pack(writer){	
}

unpack(reader){
	this.discountInfo = table_load(reader.readString())
	//g_payStoreDiscount ={
	//	['stime'] : 1441468800,
	//	['etime'] : 1441728000,
	//	['actkey'] : "abc", 
	//	['data'] : {
	//		//礼包的名字,这个礼包的ＩＤ,原价多少晶,现价多少晶,包括的物品列表
	//		{"护卫英魂礼包", 3001, 1000, 800,{{30001,5},{30002,15},{30003,25}}	},
	//		{"王者英魂礼包", 3002, 2000, 1000,{{30006,5},{30007,15},{30008,25}}	},
	//		{"互动之书礼包", 3003, 3000, 2000,{{40024,5},{40025,15}}	},
	//		{"十一礼包", 3004, 4000, 3000,{{40080,5},{40081,15},{40082,25}}	},
	//	}
	//}
	
}


//购买打折特惠礼包
}

class Message_C2G_ITEM_TRADE_DISCOUNT_BUY extends MessageBase{
actKey
giftId
public initObj(...args:any[]):void {
	this.actKey = null
	this.giftId = null
}

pack(writer){	
	writer.writeString(this.actKey)
	writer.writeUInt(this.giftId)
}

unpack(reader){
}

////////////////////////////////////////////////////////////////-
////请求不区分渠道的充值返利活动//
//}

//class Message_C2G_QUERY_ACTIVITY_PAY_RETURNE extends MessageBase{
//public initObj(...args:any[]):void {
//
//}
//
//pack(writer){
//
//}
//
//unpack(reader){
//	
//}
//
//}

//class Message_G2C_QUERY_ACTIVITY_PAY_RETURNE extends MessageBase{
//public initObj(...args:any[]):void {
//	this.prizelist = null
//}
//
//pack(writer){
//
//}
//
//unpack(reader){
//	this.prizelist = {}
//	let num = reader.readUChar()
//	for(let i = 1; i <=  num;i++){
//		let prizeinfo:any = {}
//		prizeinfo.point = reader.readUInt()
//		prizeinfo.prize = reader.readUInt()
//		JsUtil.arrayInstert(this.prizelist, prizeinfo)
//	}	
//}

}



//C2G查询跨服冲值活动//
class Message_C2G_RECHARGE_SERVERS_PRICE extends MessageBase{

public initObj(...args:any[]):void {
	
}

pack(writer){	
	
}

unpack(reader){
}

//G2C查询跨服冲值活动//
}

class Message_G2C_RECHARGE_SERVERS_PRICE extends MessageBase{
info
public initObj(...args:any[]):void {
	this.info = {}
}

pack(writer){	
	
}

unpack(reader){
	this.info = table_load(reader.readString())
}

//C2G查询跨服冲值玩家信息//
}

class Message_C2G_PLAYER_RECHARGE_SERVERS_PRICE extends MessageBase{

public initObj(...args:any[]):void {
	
}

pack(writer){	
	
}

unpack(reader){
}

//G2C查询跨服冲值玩家信息//
}

class Message_G2C_PLAYER_RECHARGE_SERVERS_PRICE extends MessageBase{
value
public initObj(...args:any[]):void {
	this.value = 0
}

pack(writer){	
	
}

unpack(reader){
	this.value = reader.readUInt()
}

//伙伴直购
}

class Message_C2G_ROLE_RECHARGE_BUY_PET extends MessageBase{

public initObj(...args:any[]):void {
	
}

pack(writer){	
	
}

unpack(reader){
}

//伙伴直购//
}

class Message_G2C_ROLE_RECHARGE_BUY_PET extends MessageBase{
record
public initObj(...args:any[]):void {
	this.record = {}
}

pack(writer){	
	
}

unpack(reader){
	this.record = table_load(reader.readString()) || {}
}
}