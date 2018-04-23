// TypeScript file
//////////////////////////////////////////////////////////////////-
//发送角色信息
//}

//class Message_C2G_ROLE_SUIT_COLOR extends MessageBase{
//public initObj(...args:any[]):void {
//	this.hair = null
//	this.cloth = null
//}
//
//pack( writer){
// 	writer.writeUShort(this.hair)
// 	writer.writeUShort(this.cloth)
//}
//
//unpack( reader){
//	
//}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//改变当前装备
class Message_C2G_ROLE_POTENTIAL extends MessageBase {
	strength: any
	intellect: any
	agility: any
	stamina: any
	habitus: any
	public initObj(...args: any[]): void {
		this.strength = null
		this.intellect = null
		this.agility = null
		this.stamina = null
		this.habitus = null
	}

	pack(writer) {
		writer.writeInt(this.strength)
		writer.writeInt(this.intellect)
		writer.writeInt(this.agility)
		writer.writeInt(this.stamina)
		writer.writeInt(this.habitus)
	}

	unpack(reader) {
	}
	//人物升级
}

class Message_C2G_ROLE_LEVELUP extends MessageBase {
	public initObj(...args: any[]): void {
	}

	pack(writer) {
	}

	unpack(writer) {
	}



	// 设置播放剧情
	//}

	//class Message_C2G_ROLE_VIDEO extends MessageBase{
	//public initObj(...args:any[]):void {
	//}
	//  
	//pack( writer){
	//} 
	//
	//unpack( writer){
	//}

	// 取消剧情状态
}

class Message_C2G_ROLE_REFRESH_NPC extends MessageBase {
	public initObj(...args: any[]): void {
	}

	pack(writer) {
	}

	unpack(writer) {
	}

	//拜师任务跳地图
}

class Message_C2G_ROLE_JOIN_SCHOOL_JUMP extends MessageBase {
	mapId: any
	cellX: any
	cellY: any
	public initObj(...args: any[]): void {
		this.mapId = null
		this.cellX = null
		this.cellY = null
	}

	pack(writer) {
		writer.writeUInt(this.mapId)
		writer.writeUInt(this.cellX)
		writer.writeUInt(this.cellY)
	}

	unpack(reader) {

	}

	//设置自动加点
}

class Message_C2G_ROLE_SET_AUTO_POTENTIAL extends MessageBase {
	habitus: any
	intellect: any
	strength: any
	stamina: any
	agility: any
	public initObj(...args: any[]): void {
		this.habitus = null
		this.intellect = null
		this.strength = null
		this.stamina = null
		this.agility = null
	}

	pack(writer) {
		writer.writeChar(this.strength)
		writer.writeChar(this.intellect)
		writer.writeChar(this.habitus)
		writer.writeChar(this.agility)
		writer.writeChar(this.stamina)
	}

	unpack(reader) {

	}

	//获取自动加点


	// 系统设置
}

class Message_C2G_ROLE_SETTING extends MessageBase {
	team: any
	trade: any
	friend: any
	strange_info: any
	set: any
	public initObj(...args: any[]): void {
		// 组队，好友，交易，陌生人信息
		this.team = 0
		this.trade = 0
		this.friend = 0
		this.strange_info = 0
		this.set = 0
	}

	pack(writer) {
		this.set = this.team + this.trade * 2 + this.friend * 4 + this.strange_info * 8
		writer.writeUShort(this.set)
		RoleSystem.getInstance().setRoleSetting(this.set)
	}

	unpack(reader) {

	}
}

class Message_G2C_ROLE_SET_AUTO_POTENTIAL extends MessageBase {
	habitus: any
	intellect: any
	strength: any
	stamina: any
	agility: any
	public initObj(...args: any[]): void {
		this.habitus = null
		this.intellect = null
		this.strength = null
		this.stamina = null
		this.agility = null
	}

	pack(writer) {

	}

	unpack(reader) {
		this.strength = reader.readChar()
		this.intellect = reader.readChar()
		this.habitus = reader.readChar()
		this.agility = reader.readChar()
		this.stamina = reader.readChar()
	}

	//封妖战斗
}

class Message_C2G_ROLE_CANGBAO_FIGHT extends MessageBase {
	npcId: any
	public initObj(...args: any[]): void {
		this.npcId = 0
	}

	pack(writer) {
		writer.writeUInt(this.npcId)
	}

	unpack(reader) {
	}

	// 设置PK状态
}

class Message_C2G_FIGHT_PK_SWITCH extends MessageBase {
	status: any
	public initObj(...args: any[]): void {
		this.status = 0
	}

	pack(writer) {
		writer.writeUInt(this.status)
	}

	unpack(reader) {
	}

	// 购买人气值
}

class Message_C2G_BUY_POPULARITY extends MessageBase {
	index: any
	public initObj(...args: any[]): void {
		this.index = 0
	}

	pack(writer) {
		writer.writeUInt(this.index)
	}

	unpack(reader) {

	}


	// 自动升级
}

class Message_C2G_ROLE_AUTO_LEVEL_UP extends MessageBase {
	public initObj(...args: any[]): void {

	}

	pack(writer) {

	}

	unpack(reader) {

	}

	// 更改形象
}

class Message_C2G_ROLE_APPEAR extends MessageBase {
	petEntry
	public initObj(...args: any[]): void {
		this.petEntry = 0
	}

	pack(writer) {
		writer.writeUInt(this.petEntry)
	}

	unpack(reader) {

	}

}

// 彩蛋（惊喜）记录返回
class Message_G2C_ROLE_SPECIAL_EVENT_RECORD extends MessageBase {
	surpriseList
	public initObj(...args: any[]): void {
		this.surpriseList = null
	}

	pack(writer) {

	}

	unpack(reader) {
		//"{"11":{"4":{"21012":1}},"3":[1]}"
		this.surpriseList = {}

		let tempList = table_load(reader.readString())
		for(let k in tempList){
			let infoList = tempList[k]
			//这里的索引必须是1开始，但是lua转成js就是0开始，需要转一次
			if(Array.isArray(infoList) ){
				let info = {}
				for(let j = 0; j < infoList.length; j++){
					info[j+1] = infoList[j]
				}	
				this.surpriseList[k] = info;
			}else{
				this.surpriseList[k] = infoList;
			}
			
		}

	}




}


//彩蛋领取奖励
class Message_C2G_ROLE_SPECIAL_EVENT extends MessageBase {
	egType
	eventIndex
	entryId
	public initObj(...args: any[]): void {
		this.egType = 0
		this.eventIndex = 0
		this.entryId = 0
	}

	pack(writer) {
		writer.writeUShort(this.egType)
		writer.writeUShort(this.eventIndex)
		writer.writeUInt(this.entryId)
	}

	unpack(reader) {

	}


}


// 请求全服关卡首通名单数据
class Message_C2G_EXCITE_ALL_SERVER_FIRST_CAMP extends MessageBase {
	public initObj(...args: any[]): void {

	}

	pack(writer) {

	}

	unpack(reader) {

	}


	// 全服关卡首通名单数据返回
}

class Message_G2C_EXCITE_ALL_SERVER_FIRST_CAMP extends MessageBase {
	firstPasslist
	public initObj(...args: any[]): void {
		this.firstPasslist = {}
		//  this.tollgataID = null
		//  this.roleID = null
		//  this.rolename = null
		//  this.passpower = null

	}

	pack(writer) {

	}

	unpack(reader) {
		this.firstPasslist = []
		let num = reader.readUInt()	//通关记录条数
		for (let i = 1; i <= num; i++) {
			this.firstPasslist[i] = []
			let tollgataID = reader.readUInt()
			let roleID = reader.readUInt()
			let rolename = reader.readString()
			let passpower = reader.readUInt()
			let headID = reader.readUInt()
			let VipLevel = reader.readUInt()
			JsUtil.arrayInstert(this.firstPasslist[i], tollgataID)
			JsUtil.arrayInstert(this.firstPasslist[i], roleID)
			JsUtil.arrayInstert(this.firstPasslist[i], rolename)
			JsUtil.arrayInstert(this.firstPasslist[i], passpower)
			JsUtil.arrayInstert(this.firstPasslist[i], headID)
			JsUtil.arrayInstert(this.firstPasslist[i], VipLevel)
		}

	}

	//返回竞技场排名
}

class Message_G2C_ROLE_CHAMPION_RANK extends MessageBase {
	isFirst
	public initObj(...args: any[]): void {
		this.isFirst = 0 //为1表示是第一名
	}

	pack(writer) {
	}

	unpack(reader) {
		this.isFirst = reader.readUInt()
	}

	//查询竞技场排名
}

class Message_C2G_ROLE_CHAMPION_RANK extends MessageBase {

	public initObj(...args: any[]): void {
	}

	pack(writer) {
	}

	unpack(reader) {
	}

	//返回斗技大赛排名
}

class Message_G2C_ROLE_WUDOU_RANK extends MessageBase {
	isFirst
	public initObj(...args: any[]): void {
		this.isFirst = 0 //为1表示是第一名
	}

	pack(writer) {
	}

	unpack(reader) {
		this.isFirst = reader.readUInt()
	}

	//查询斗技大赛排名
}

class Message_C2G_ROLE_WUDOU_RANK extends MessageBase {

	public initObj(...args: any[]): void {
	}

	pack(writer) {
	}

	unpack(reader) {
	}


	//创建时间
}

class Message_G2C_ROLE_CREATE_TIME extends MessageBase {
	creatRoleTime
	public initObj(...args: any[]): void {
		this.creatRoleTime = null
	}

	pack(writer) {
	}

	unpack(reader) {
		this.creatRoleTime = reader.readUInt()
	}

	//新手操作节点
}

class Message_C2G_ROLE_OPER_NODE extends MessageBase {
	guideIndex
	public initObj(...args: any[]): void {
		this.guideIndex = null
		//this.isdump = true
	}

	pack(writer) {
		writer.writeUInt(this.guideIndex)
	}

	unpack(reader) {

	}


	//申请账号绑定奖励
}

class Message_C2G_ROLE_BIND_ACCOUNT extends MessageBase {

	public initObj(...args: any[]): void {

	}

	pack(writer) {

	}

	unpack(reader) {

	}

	//好友邀请相关
}

class Message_C2G_ROLE_INVITE_FRIEND extends MessageBase {
	inviteType
	name
	public initObj(...args: any[]): void {
		this.inviteType = 0
		this.name = ""

		this.addResponseMsg(opCodes.G2C_ROLE_INVITE_FRIEND_LIST)
	}

	pack(writer) {
		writer.writeUInt(this.inviteType)
		writer.writeString(this.name)
	}

	unpack(reader) {

	}
}

class Message_G2C_ROLE_INVITE_FRIEND extends MessageBase {

	public initObj(...args: any[]): void {

	}

	pack(writer) {

	}

	unpack(reader) {

	}

	//申请列表
}

class Message_C2G_ROLE_INVITE_FRIEND_LIST extends MessageBase {
	inviteType
	public initObj(...args: any[]): void {
		this.inviteType = 0
	}

	pack(writer) {
		writer.writeUInt(this.inviteType)
	}

	unpack(reader) {

	}

}

class Message_G2C_ROLE_INVITE_FRIEND_LIST extends MessageBase {
	inviteType
	inviteList
	public initObj(...args: any[]): void {
		this.inviteType = 0
		this.inviteList = {}
	}

	pack(writer) {

	}

	unpack(reader) {
		this.inviteType = reader.readUInt()
		let count = reader.readUInt()

		let list: any = {}
		for (let i = 1; i <= count; i++) {
			let t: any = {}
			JsUtil.arrayInstert(t, reader.readString())		//名字或id
			JsUtil.arrayInstert(t, reader.readUInt())					//邀請时间

			JsUtil.arrayInstert(list, t)
		}

		this.inviteList = list
	}

	//fb好友奖励
}

class Message_C2G_ROLE_INVITE_FRIEND_PRIZE extends MessageBase {
	inviteType
	index
	public initObj(...args: any[]): void {
		this.inviteType = 0
		this.index = 0
	}

	pack(writer) {
		writer.writeUInt(this.inviteType)
		writer.writeUInt(this.index)
	}

	unpack(reader) {

	}

	//投资
}

class Message_C2G_ROLE_LEVEL_FUND extends MessageBase {
	investment
	public initObj(...args: any[]): void {
		this.investment = 0
	}

	pack(writer) {
		writer.writeUInt(this.investment)
	}

	unpack(reader) {
	}

	//投资返回
}

class Message_G2C_ROLE_LEVEL_FUND extends MessageBase {

	public initObj(...args: any[]): void {
	}

	pack(writer) {
	}

	unpack(reader) {
	}

	//领取奖励
}

class Message_C2G_ROLE_LEVEL_FUND_REWARD extends MessageBase {

	public initObj(...args: any[]): void {
	}

	pack(writer) {
	}

	unpack(reader) {
	}

	//查询部下限时召集
}

class Message_C2G_HERO_DISCOUNT_QUERY extends MessageBase {

	public initObj(...args: any[]): void {
	}

	pack(writer) {
	}

	unpack(reader) {
	}

	//部下限时召集详情
}

class Message_G2C_HERO_DISCOUNT_QUERY extends MessageBase {
	callPetInfo
	public initObj(...args: any[]): void {
		this.callPetInfo = {}
	}

	pack(writer) {
	}

	unpack(reader) {
		this.callPetInfo = table_load(reader.readString())
	}

	//查询称号
}

class Message_C2G_ROLE_HONOR_TITLE_LIST extends MessageBase {
	chengHaoType
	public initObj(...args: any[]): void {
		this.chengHaoType = 0
	}

	pack(writer) {
		writer.writeUInt(this.chengHaoType)
	}

	unpack(reader) {
	}

	//查询称号返回
}

class Message_G2C_ROLE_HONOR_TITLE_LIST extends MessageBase {
	chengHaoRecord
	public initObj(...args: any[]): void {
		this.chengHaoRecord = {}
	}

	pack(writer) {
	}

	unpack(reader) {
		this.chengHaoRecord = table_load(reader.readString())
		//table_TLog.Debug(this.chengHaoRecord)
	}

	//自己称号
}

class Message_G2C_ROLE_HONOR_TITLE extends MessageBase {
	chengHaoId
	public initObj(...args: any[]): void {
		this.chengHaoId = 0
	}

	pack(writer) {
	}

	unpack(reader) {
		this.chengHaoId = reader.readUInt()
	}

	//设置当前称号
}

class Message_C2G_ROLE_HONOR_TITLE extends MessageBase {
	chengHaoId
	public initObj(...args: any[]): void {
		this.chengHaoId = 0
	}

	pack(writer) {
		writer.writeUInt(this.chengHaoId)
	}

	unpack(reader) {
	}

	//查询当前成就点
}

class Message_C2G_ROLE_HONOR_POINT extends MessageBase {

	public initObj(...args: any[]): void {
	}

	pack(writer) {
	}

	unpack(reader) {
	}

	//返回当前成就点
}

class Message_G2C_ROLE_HONOR_POINT extends MessageBase {
	chengJiuDian
	public initObj(...args: any[]): void {
		this.chengJiuDian = 0
	}

	pack(writer) {
	}

	unpack(reader) {
		this.chengJiuDian = reader.readUInt()
	}

}

class Message_C2G_ROLE_HONOR_POINT_PRIZE extends MessageBase {
	index
	public initObj(...args: any[]): void {
		this.index = 0
	}

	pack(writer) {
		writer.writeUInt(this.index)
	}

	unpack(reader) {
	}

	//////////////////-新获取称号成就//////////////////-
}

class Message_G2C_ROLE_HONOR_HINT extends MessageBase {
	getHonorList
	fireEvent
	public initObj(...args: any[]): void {
		this.getHonorList = null
		this.fireEvent = true
		this.isdump = true
	}
	pack(writer) {

	}
	unpack(reader) {
		this.getHonorList = table_load(reader.readString())
	}

	//////////////////-vip进入地图//////////////////-
}

class Message_G2C_ROLE_VIP_ENTER_MAP extends MessageBase {
	roleInfo
	public initObj(...args: any[]): void {
		this.roleInfo = null
	}
	pack(writer) {

	}
	unpack(reader) {
		this.roleInfo = {}
		this.roleInfo.id = reader.readUInt()
		this.roleInfo.vipLevel = reader.readUShort()
		this.roleInfo.name = reader.readString()
	}

	//////////////////-角色改名协议//////////////////-
}

class Message_C2G_ROLE_CHANGE_NAME extends MessageBase {
	itemID
	newName
	public initObj(...args: any[]): void {
		this.itemID = null
		this.newName = null
	}
	pack(writer) {
		writer.writeUInt(this.itemID)
		writer.writeString(this.newName)
	}
	unpack(reader) {

	}

}

class Message_G2C_ROLE_CHANGE_NAME extends MessageBase {
	newName
	public initObj(...args: any[]): void {
		this.newName = null
	}
	pack(writer) {

	}
	unpack(reader) {
		this.newName = reader.readString()
	}

	//角色魄力等级
}

class Message_G2C_ROLE_PET_COURAGE_QUALITY extends MessageBase {
	courageQuality
	public initObj(...args: any[]): void {
		this.courageQuality = 0
	}
	pack(writer) {

	}
	unpack(reader) {
		this.courageQuality = reader.readUInt()
	}

	//角色碎魂
}

class Message_G2C_ROLE_PET_SOUL_POINT extends MessageBase {
	petSoulPoint
	public initObj(...args: any[]): void {
		this.petSoulPoint = {}
	}
	pack(writer) {

	}
	unpack(reader) {
		this.petSoulPoint = table_load(reader.readString())
	}

	//获取货币
}

// class Message_G2C_ROLE_MONEY_UNIT_POINT extends MessageBase {
// 	itemUnitPoint
// 	public initObj(...args: any[]): void {
// 		this.itemUnitPoint = {}
// 	}
// 	pack(writer) {

// 	}
// 	unpack(reader) {
// 		this.itemUnitPoint = {}
// 		let count = reader.readUShort()
// 		for (let i = 1; i <= count; i++) {
// 			let itemUnit = reader.readUShort()
// 			let point = reader.readUInt()

// 			this.itemUnitPoint[itemUnit] = point
// 		}
// 	}

// 	////奖励弹出界面
// }

class Message_G2C_COMMON_PRIZE_LIST extends MessageBase {
	prizeList
	public initObj(...args: any[]): void {
		this.prizeList = {}
	}

	pack(writer) {
	}

	unpack(reader) {
		this.prizeList = table_load(reader.readString())//{{entryId, count, isPet},{entryId, count, isPet},....}   isPet为1代表是伙伴，0是物品
	}

	//功能红点提醒
}

class Message_G2C_ROLE_FUNCTION_NOTICE extends MessageBase {
	noticeList
	public initObj(...args: any[]): void {
		this.noticeList = {}
	}

	pack(writer) {
	}

	unpack(reader) {
		this.noticeList = table_load(reader.readString())
	}
}



////////////////////////神兽////////////////////////////-
class Message_C2G_GODANIMAL_INFO extends MessageBase {
	public initObj(...args: any[]): void {

	}

	pack(writer) {
	}

	unpack(reader) {

	}

}

class Message_G2C_GODANIMAL_INFO extends MessageBase {
	level
	savelist
	public initObj(...args: any[]): void {
		this.level = null
		this.savelist = null
	}

	pack(writer) {
	}

	unpack(reader) {
		this.level = reader.readUChar()
		this.savelist = table_load(reader.readString())
	}

}

class Message_C2G_GODANIMAL_LEVEL_UP extends MessageBase {
	public initObj(...args: any[]): void {

	}

	pack(writer) {
	}

	unpack(reader) {

	}

}

class Message_G2C_GODANIMAL_PREVIEW_FORCE extends MessageBase {
	power
	public initObj(...args: any[]): void {
		this.power = null
	}

	pack(writer) {
	}

	unpack(reader) {
		this.power = tonumber(reader.readString())
	}
}


//星灵结束
// class Message_G2C_GODANIMAL_EXPER extends MessageBase {
// 	time
// 	experienceInfo: ImmortalsExperienceInfo
// 	public initObj(...args: any[]): void {
// 		this.time = null
// 	}

// 	pack(writer) {
// 	}

// 	unpack(reader) {
// 		let info = ImmortalsExperienceInfo.newObj()
// 		info.read(reader)
// 		this.experienceInfo = info
// 	}



// }

class Message_C2G_ROLE_REMOVE_TIMER extends MessageBase {
	opSaveRecordKey: number
	public initObj(...args: any[]): void {
		this.opSaveRecordKey = -1
	}

	pack(writer) {
		writer.writeUInt(this.opSaveRecordKey)
	}

	unpack(reader) {

	}

}
