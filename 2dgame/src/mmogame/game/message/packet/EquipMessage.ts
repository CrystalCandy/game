/*
作者:
    panyuxiong
	
创建时间：
    2014.07.22(星期二) 

意图：
  		处理打造和分解信息

公共接口：
	
*/


//穿装备
class Message_C2G_SET_EQUIP extends MessageBase {
	actorType
	actorId
	itemId
	public initObj(...args: any[]): void {
		this.actorType = 0
		this.actorId = 0
		this.itemId = 0
	}

	pack(writer) {
		writer.writeUInt(this.actorType)
		writer.writeUInt(this.actorId)
		writer.writeUInt(this.itemId)
	}

	unpack(reader) {

	}

	//脱装备
}


// function readEquipInfo(reader) {

// 	let type = reader.readUInt()
// 	let id = reader.readUInt()
// 	let itemCount = reader.readUChar()
// 	let itemList = []

// 	//TLog.Debug("ssssssssss", type, id, itemCount)
// 	for (let j = 1; j <= itemCount; j++) {
// 		let item = ItemInfo.newObj()
// 		item.read(reader)
// 		JsUtil.arrayInstert(itemList, item)
// 	}

// 	let info: any = {}
// 	info.type = type
// 	info.id = id
// 	info.itemList = itemList

// 	return info
// }


class Message_C2G_OFF_EQUIP extends MessageBase {
	actorType
	actorId
	itemId
	public initObj(...args: any[]): void {
		this.actorType = 0
		this.actorId = 0
		this.itemId = 0
	}

	pack(writer) {
		writer.writeUInt(this.actorType)
		writer.writeUInt(this.actorId)
		writer.writeUInt(this.itemId)
	}

	unpack(reader) {

	}


}


//一键装备
class Message_C2G_EQUIP_ALL_EQUIPS_ON extends MessageBase {
	actorType
	actorId
	equipIdList
	public initObj(...args: any[]): void {
		this.actorType = 0
		this.actorId = 0
		this.equipIdList = {}
	}

	pack(writer) {
		writer.writeUInt(this.actorType)
		writer.writeUInt(this.actorId)
		writer.writeString(table_save(this.equipIdList))
	}

	unpack(reader) {

	}

	//一键脱装
}

class Message_C2G_EQUIP_ALL_EQUIPS_OFF extends MessageBase {
	actorType
	actorId
	public initObj(...args: any[]): void {
		this.actorType = 0
		this.actorId = 0
	}

	pack(writer) {
		writer.writeUInt(this.actorType)
		writer.writeUInt(this.actorId)
	}

	unpack(reader) {

	}


}

//装备列表更新（穿戴和脱下触发）
// class Message_G2C_EQUIP_LIST extends MessageBase {
// 	equipInfoList: any[]
// 	public initObj(...args: any[]): void {
// 		this.equipInfoList = []
// 	}

// 	pack(writer) {

// 	}

// 	unpack(reader) {

// 		this.equipInfoList = []
// 		let info = readEquipInfo(reader)
// 		JsUtil.arrayInstert(this.equipInfoList, info)
// 	}

// 	//登陆时候，更新主角的装备列表
// }

// class Message_G2C_ALL_EQUIP_LIST extends MessageBase {
// 	equipInfoList: any[]
// 	public initObj(...args: any[]): void {
// 		this.equipInfoList = []
// 	}

// 	pack(writer) {

// 	}

// 	unpack(reader) {
// 		this.equipInfoList = []

// 		let count = reader.readUInt()
// 		for (let i = 1; i <= count; i++) {
// 			let info = readEquipInfo(reader)
// 			JsUtil.arrayInstert(this.equipInfoList, info)
// 		}
// 	}


	
// }




//装备制作
class Message_C2G_ITEM_EQUIP_MAKE extends MessageBase {
	entryId
	isBetter
	equipId
	consumeRmb
	public initObj(...args: any[]): void {
		this.entryId = null
		this.isBetter = 0
		this.equipId = 0
	}

	pack(writer) {
		writer.writeUInt(this.entryId)
		writer.writeUInt(this.isBetter)
		writer.writeUInt(this.equipId)
		writer.writeUInt(this.consumeRmb)
	}

	unpack(reader) {

	}



}

////////////////////////-装备强化//////////////////
class Message_C2G_ITEM_EQUIP_STRENGTHEN extends MessageBase {
	id
	lucky
	public initObj(...args: any[]): void {
		this.id = null
		this.lucky = 0
	}

	pack(writer) {
		writer.writeUInt(this.id)
		writer.writeUInt(this.lucky)
	}

	unpack(reader) {

	}


}


////////////////////////-装备一键强化//////////////////
class Message_C2G_EQUIP_ALL_ENHANCE extends MessageBase {
	id
	lucky
	public initObj(...args: any[]): void {
		this.id = null
		this.lucky = 0
	}

	pack(writer) {
		writer.writeUInt(this.id)
		writer.writeUInt(this.lucky)
	}

	unpack(reader) {

	}


}

////////////////////////-装备一键重塑//////////////////
class Message_C2G_EQUIP_ALL_CAST extends MessageBase {
	itemId
	count
	propertyid
	public initObj(...args: any[]): void {
		this.itemId = 0
		this.count = 0
		this.propertyid = 0
	}

	pack(writer) {
		writer.writeUInt(this.itemId)
		writer.writeChar(this.propertyid)
		writer.writeChar(this.count)
	}

	unpack(reader) {

	}

	////////////////////////-装备一键重塑返回//////////////////
}

class Message_G2C_EQUIP_ALL_CAST extends MessageBase {
	itemid
	property
	property_count
	count
	freeCount
	needgold
	public initObj(...args: any[]): void {
		this.itemid = 0
		this.property = 0
		this.property_count = 0
		this.count = 0
		this.freeCount = 0
		this.needgold = 0

	}

	pack(writer) {

	}

	unpack(reader) {
		this.itemid = reader.readUInt()	//装备id
		this.property = reader.readChar()	//属性
		this.property_count = reader.readChar()	//属性数量
		this.count = reader.readChar()	//重塑的次数
		this.freeCount = reader.readUShort()	//使用的免费次数
		this.needgold = reader.readUShort()		//需要的费用
	}



}

////////////////////////-装备继承//////////////////
class Message_C2G_EQUIP_INHERIT extends MessageBase {
	srcId
	destId
	public initObj(...args: any[]): void {
		this.srcId = 0
		this.destId = 0
	}

	pack(writer) {
		writer.writeUInt(this.srcId)
		writer.writeUInt(this.destId)
	}

	unpack(reader) {

	}

	//////////////////////////-装备打造//////////////////
}

class Message_G2C_ITEM_EQUIP_MAKE extends MessageBase {
	id
	uid
	public initObj(...args: any[]): void {
		this.id = null
	}

	pack(writer) {

	}

	unpack(reader) {
		this.id = reader.readUInt()
		this.uid = reader.readUInt()
	}


}


//装备鉴定
class Message_C2G_EQUIP_IDENTIFY extends MessageBase {
	itemId
	public initObj(...args: any[]): void {
		this.itemId = 0
	}

	pack(writer) {
		writer.writeUInt(this.itemId)
	}

	unpack(reader) {

	}



}
//装备技能鉴定结果
class Message_G2C_EQUIP_IDENTIFY_SUCCESS extends MessageBase {
	itemId
	public initObj(...args: any[]): void {
		this.itemId = 0

	}

	pack(writer) {


	}

	unpack(reader) {
		this.itemId = reader.readUInt()
	}



}
//御灵升级
class Message_C2G_LEARN_EQUIP_ENCHANT extends MessageBase {

	public initObj(...args: any[]): void {
		//this.index = null
	}

	pack(writer) {
		//writer.writeUInt(this.index)
	}

	unpack(reader) {

	}


}

//御灵返回
class Message_G2C_LEARN_EQUIP_ENCHANT extends MessageBase {
	skillLevel
	sacrifice
	public initObj(...args: any[]): void {
		this.skillLevel = null
		this.sacrifice = null
	}

	pack(writer) {

	}

	unpack(reader) {
		this.skillLevel = reader.readUInt()
		this.sacrifice = table_load(reader.readString())
	}





}