/*
作者:
    yangguiming
	
创建时间：
   2017.2.12(周日)

意图：
   

公共接口：
   
*/



//登陆时初始化宠物列表
// class Message_G2C_PET_LIST extends MessageBase {
// 	petInfoList: PetInfo[];
// 	public initObj(...args: any[]): void {
// 		this.petInfoList = []
// 	}

// 	pack(writer) {

// 	}

// 	unpack(reader) {
// 		this.petInfoList = []
// 		let petCount = reader.readUShort()
// 		for (let i = 1; i <= petCount; i++) {
// 			let petInfo = PetInfo.newObj()
// 			petInfo.read(reader)
// 			JsUtil.arrayInstert(this.petInfoList, petInfo)
// 		}
// 	}


// }



//使用物品
class Message_C2G_PET_USEITEM extends MessageBase {
	petId
	itemId
	count
	public initObj(...args: any[]): void {
		this.petId = 0
		this.itemId = 0
		this.count = 0
	}

	pack(writer) {
		writer.writeUInt(this.petId)
		writer.writeUInt(this.itemId)
		writer.writeUInt(this.count)
	}

	unpack(reader) {

	}





	//接受宠物更新消息
}

class Message_G2C_PET_UPDATE extends MessageBase {
	petInfo: PetInfo
	public initObj(...args: any[]): void {
		this.petInfo = null
	}

	pack(writer) {

	}

	unpack(reader) {
		this.petInfo = PetInfo.newObj()
		this.petInfo.read(reader)
	}


}


//新加一只宠物
class Message_C2G_PET_ADD extends MessageBase {

	public initObj(...args: any[]): void {

	}

	pack(writer) {

	}

	unpack(reader) {

	}



}

// //新加一只宠物
// class Message_G2C_PET_ADD extends MessageBase {
// 	petInfo: PetInfo
// 	public initObj(...args: any[]): void {
// 		this.petInfo = null
// 	}

// 	pack(writer) {
// 	}

// 	unpack(reader) {
// 		this.petInfo = PetInfo.newObj()
// 		this.petInfo.read(reader)
// 	}


// }


// //接受宠物更新消息（只更新指定属性域）
// class Message_G2C_PET_UPDATE_FIELD extends MessageBase {
// 	petId
// 	updateProperty
// 	public initObj(...args: any[]): void {
// 		this.petId = null
// 		this.updateProperty = null
// 	}

// 	pack(writer) {

// 	}

// 	unpack(reader) {
// 		this.updateProperty = {}

// 		let count = reader.readUChar()
// 		this.petId = reader.readUInt()
// 		for (let i = 1; i <= count; i++) {
// 			let fieldIndex = reader.readUInt()
// 			let [_, data] = readDataTypeClient(reader)

// 			//战力string->number
// 			if (fieldIndex == objectField.ACTOR_FIELD_COMBAT_FORCE) {
// 				data = tonumber(data) || 0
// 			}

// 			this.updateProperty[fieldIndex] = data
// 		}
// 	}


// }

//英魂献祭
class Message_C2G_PET_SOUL_FETE extends MessageBase {
	petId
	itemList
	public initObj(...args: any[]): void {
		this.petId = null
		this.itemList = {}
	}
	pack(writer) {
		writer.writeUInt(this.petId)
		writer.writeString(table_save(this.itemList))
	}
	unpack(reader) {
	}

}

//鲜血契约，绑定宠物，发送到服务器
class Message_C2G_PET_BIND extends MessageBase {
	petId
	public initObj(...args: any[]): void {
		this.petId = null
	}

	pack(writer) {
		writer.writeUInt(this.petId)
	}

	unpack(reader) {
	}


}
//鲜血契约，绑定宠物，服务器返回
class Message_G2C_PET_BIND extends MessageBase {
	petId
	state
	public initObj(...args: any[]): void {
		this.petId = null
		this.state = null
	}

	pack(writer) {
	}

	unpack(reader) {
		this.petId = reader.readUInt()
		this.state = reader.readUInt()
	}



}

//觉醒//-
class Message_C2G_PET_AWAKE extends MessageBase {
	petentryid
	tolevel
	itemidlist: number[]
	public initObj(...args: any[]): void {
		this.petentryid = null
		this.tolevel = null
		this.itemidlist = null
	}

	pack(writer) {
		writer.writeUInt(this.petentryid)
		writer.writeChar(this.tolevel)
		writer.writeChar(this.itemidlist.length)
		for (let _ in this.itemidlist) {
			let v = this.itemidlist[_]

			writer.writeUInt(v)
		}
	}

	unpack(reader) {

	}


}

//觉醒//-
class Message_G2C_PET_AWAKE extends MessageBase {
	petentryid
	tolevel
	code
	public initObj(...args: any[]): void {
		this.petentryid = null
		this.tolevel = null
		this.code = null
	}

	pack(writer) {

	}

	unpack(reader) {
		this.petentryid = reader.readUInt()
		this.tolevel = reader.readChar()
		this.code = reader.readChar()
	}


}
//突破//-
class Message_C2G_PET_BREAK extends MessageBase {
	petentryid
	tolevel
	soulidlist: number[]
	public initObj(...args: any[]): void {
		this.petentryid = null
		this.tolevel = null
		this.soulidlist = null
	}

	pack(writer) {
		writer.writeUInt(this.petentryid)
		writer.writeChar(this.tolevel)
		writer.writeChar(this.soulidlist.length)
		for (let _ in this.soulidlist) {
			let v = this.soulidlist[_]

			writer.writeUShort(v)
		}
	}

	unpack(reader) {

	}


}

//突破//-
class Message_G2C_PET_BREAK extends MessageBase {
	petentryid
	tolevel
	code
	public initObj(...args: any[]): void {
		this.petentryid = null
		this.tolevel = null
		this.code = null
	}

	pack(writer) {

	}

	unpack(reader) {
		this.petentryid = reader.readUInt()
		this.tolevel = reader.readChar()
		this.code = reader.readChar()
	}



}
//////////////////////////-解锁技能////////////////////////////////////////
class Message_C2G_PET_UPGRADE_SKILL extends MessageBase {
	entryid
	skillid
	tolevel
	public initObj(...args: any[]): void {
		this.entryid = null
		this.skillid = null
		this.tolevel = null
	}
	pack(writer) {
		writer.writeUInt(this.entryid)
		writer.writeUInt(this.skillid)
		writer.writeUShort(this.tolevel)
	}

	unpack(reader) {

	}

}

//一键技能
class Message_C2G_PET_ONE_KEY_SKILL_UP extends MessageBase {
	entryid
	skillid
	public initObj(...args: any[]): void {
		this.skillid = null
	}
	pack(writer) {
		writer.writeUInt(this.entryid)
		writer.writeUInt(this.skillid)
	}

	unpack(reader) {

	}



}

class Message_G2C_PET_UPGRADE_SKILL extends MessageBase {
	entryid
	skillid
	tolevel
	code
	public initObj(...args: any[]): void {
		this.entryid = null
		this.skillid = null
		this.tolevel = null
		this.code = null
	}
	pack(writer) {
	}
	unpack(reader) {
		this.entryid = reader.readUInt()
		this.skillid = reader.readUInt()
		this.tolevel = reader.readUShort()
		this.code = reader.readUChar()
	}




}

//////////////////////////-植入天赋石////////////////////////////////////////
class Message_C2G_SET_NATRUAL_STONE extends MessageBase {
	petentryid
	stoneentryid
	public initObj(...args: any[]): void {
		this.petentryid = null
		this.stoneentryid = null
	}
	pack(writer) {
		writer.writeUInt(this.petentryid)
		writer.writeUInt(this.stoneentryid)
	}

	unpack(reader) {

	}

}

class Message_G2C_SET_NATRUAL_STONE extends MessageBase {
	petentryid
	stoneentryid
	code

	public initObj(...args: any[]): void {
		this.petentryid = null
		this.stoneentryid = null
		this.code = null
	}

	pack(writer) {

	}

	unpack(reader) {
		this.petentryid = reader.readUInt()
		this.stoneentryid = reader.readUInt()
		this.code = reader.readUChar()
	}




}
//////////////////////////-卸载天赋石////////////////////////////////////////
class Message_C2G_OFF_NATRUAL_STONE extends MessageBase {
	petentryid
	stoneentryid
	public initObj(...args: any[]): void {
		this.petentryid = null
		this.stoneentryid = null
	}
	pack(writer) {
		writer.writeUInt(this.petentryid)
		writer.writeUInt(this.stoneentryid)
	}

	unpack(reader) {

	}

}

class Message_G2C_OFF_NATRUAL_STONE extends MessageBase {
	petentryid
	stoneentryid
	code
	public initObj(...args: any[]): void {
		this.petentryid = null
		this.stoneentryid = null
		this.code = null
	}
	pack(writer) {
	}
	unpack(reader) {
		this.petentryid = reader.readUInt()
		this.stoneentryid = reader.readUInt()
		this.code = reader.readUChar()
	}


	//////////////////////////-升级天赋石////////////////////////////////////////

}

class Message_C2G_NATRUAL_STONE_UP extends MessageBase {
	petentryid
	stoneentryid
	public initObj(...args: any[]): void {
		this.petentryid = null
		this.stoneentryid = null
		//this.tolevel = null
	}
	pack(writer) {
		writer.writeUInt(this.petentryid)
		writer.writeUInt(this.stoneentryid)
		//writer.writeUChar(this.tolevel)
	}

	unpack(reader) {

	}

}

class Message_G2C_NATRUAL_STONE_UP extends MessageBase {
	petentryid
	stoneentryid
	code
	public initObj(...args: any[]): void {
		this.petentryid = null
		this.stoneentryid = null
		//this.tolevel = null
		this.code = null
	}

	pack(writer) {

	}

	unpack(reader) {
		this.petentryid = reader.readUInt()
		this.stoneentryid = reader.readUInt()
		//this.tolevel = reader.readUChar()
		this.code = reader.readUChar()
	}



	//////////////////////////-获得当前奖励列表////////////////////////////////////////
}

class Message_C2G_ENTER_PET_RECRUIT_HOOP extends MessageBase {
	public initObj(...args: any[]): void {
	}

	pack(writer) {
	}

	unpack(reader) {
	}


}

//返回
class Message_G2C_ENTER_PET_RECRUIT_HOOP extends MessageBase {
	prizeList
	discount
	breakLevel
	public initObj(...args: any[]): void {
		this.prizeList = {}
		this.discount = 1
		this.breakLevel = 0
	}

	pack(writer) {
	}

	unpack(reader) {
		this.prizeList = table_load(reader.readString())//{{entryId, count, isPet},{entryId, count, isPet},....}   isPet为1代表是伙伴，0是物品
		this.discount = reader.readUInt() / 100
		this.breakLevel = reader.readUInt()
	}

	//////////////////////////-刷新抽奖奖励////////////////////////////////////////
}

class Message_C2G_PET_RECRUIT_HOOP extends MessageBase {
	public initObj(...args: any[]): void {
	}

	pack(writer) {
	}

	unpack(reader) {
	}

	////返回
	//}

	//class Message_G2C_PET_RECRUIT_HOOP extends MessageBase{
	//public initObj(...args:any[]):void {
	//	this.prizeList = {}
	//	this.discount = 1
	//}
	//
	//pack(writer){
	//}
	//
	//unpack(reader){
	//	this.prizeList = table_load(reader.readString())//{{entryId, count, isPet},{entryId, count, isPet},....}   isPet为1代表是伙伴，0是物品
	//	this.discount = reader.readUInt() / 100
	//} 


}

////////////////////////已召唤的次数记录//////////////////////////////////////////////////
class Message_C2G_PET_RECRUIT_RECORD_LIST extends MessageBase {
	public initObj(...args: any[]): void {

	}

	pack(writer) {

	}

	unpack(reader) {

	}

}

class Message_G2C_PET_RECRUIT_RECORD_LIST extends MessageBase {
	summonRecord
	public initObj(...args: any[]): void {
		this.summonRecord = {}
	}

	pack(writer) {

	}

	unpack(reader) {
		this.summonRecord = table_load(reader.readString()) || {}					//{[entryId] : count, }
	}

}

//////////////////////////-抽奖////////////////////////////////////////
class Message_C2G_PET_QUICK_RECRUIT extends MessageBase {
	count
	public initObj(...args: any[]): void {
		this.count = 1
	}

	pack(writer) {
		writer.writeUInt(this.count)
	}

	unpack(reader) {
	}


}
//抽奖返回
class Message_G2C_PET_QUICK_RECRUIT extends MessageBase {
	prizeList
	public initObj(...args: any[]): void {
		this.prizeList = {}
	}

	pack(writer) {
	}

	unpack(reader) {
		this.prizeList = table_load(reader.readString())//{{entryId, count, isPet},{entryId, count, isPet},....}   isPet为1代表是伙伴，0是物品
	}

}


//-丢弃伙伴或者职业
class Message_G2C_DROP_PARTNER_OR_VOCATION extends MessageBase {
	entryId
	public initObj(...args: any[]): void {
		this.entryId = 0
	}

	pack(writer) {
	}

	unpack(reader) {
		this.entryId = reader.readUInt()
	}
}


//职业和宠物战力变化
class Message_G2C_PET_COMBAT_FORCE_CHNAGE extends MessageBase {
	delta
	public initObj(...args: any[]): void {
		this.delta = 0
	}

	pack(writer) {
	}

	unpack(reader) {
		this.delta = tonumber(reader.readString()) || 0
	}
}


//选择品质
class Message_C2G_PET_SELECT_QUALITY extends MessageBase {
	operate
	public initObj(...args: any[]): void {
		this.operate = 0						//opQuickRecruitConfig.Soul 获得碎魂；opQuickRecruitConfig.LotteryCount 获得抽奖次数
	}

	pack(writer) {
		writer.writeUInt(this.operate)
	}

	unpack(reader) {
	}

	//品质替换列表
}

class Message_G2C_PET_QUALITY_PET_LIST extends MessageBase {
	petQualityList
	public initObj(...args: any[]): void {
		this.petQualityList = {}
	}

	pack(writer) {
	}

	unpack(reader) {
		this.petQualityList = table_load(reader.readString()) || {}//{entryId, quality}
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//宠物列表
// class Message_G2C_ACTOR_PET_INFO_LIST extends MessageBase {
// 	petInfoList: PetInfo[];

// 	public initObj(...args: any[]): void {
// 		this.petInfoList = []
// 	}

// 	pack(writer) {

// 	}

// 	unpack(reader) {
// 		this.petInfoList = []
// 		let petCount = reader.readUShort()
// 		for (let i = 1; i <= petCount; i++) {
// 			let petInfo = PetInfo.newObj()
// 			petInfo.read(reader)
// 			JsUtil.arrayInstert(this.petInfoList, petInfo)
// 		}
// 	}
// }

//激活一个宠物
class Message_C2G_ACTOR_PET_UNLOCK extends MessageBase {
	petId: number

	public initObj(...args: any[]): void {
		this.petId = 0
	}

	pack(writer) {
		writer.writeUInt(this.petId)
	}

	unpack(reader) {

	}
}

//新加一只宠物
class Message_G2C_ACTOR_PET_INFO extends MessageBase {
	petInfo: PetInfo

	public initObj(...args: any[]): void {
		this.petInfo = null
	}

	pack(writer) {
	}

	unpack(reader) {
		this.petInfo = PetInfo.newObj()
		this.petInfo.read(reader)
	}
}

//接受宠物更新消息（只更新指定属性域）
// class Message_G2C_ACTOR_PET_UPDATE extends MessageBase {
// 	petId
// 	updateProperty

// 	public initObj(...args: any[]): void {
// 		this.petId = null
// 		this.updateProperty = null
// 	}

// 	pack(writer) {

// 	}

// 	unpack(reader) {
// 		this.updateProperty = {}

// 		this.petId = reader.readUInt()
// 		let count = reader.readUChar()
// 		for (let i = 1; i <= count; i++) {
// 			let fieldIndex = reader.readUInt()
// 			let [_, data] = readDataTypeClient(reader)

// 			this.updateProperty[fieldIndex] = data
// 		}
// 	}
// }

//升级
class Message_C2G_ACTOR_PET_UPGRADE extends MessageBase {
	petId: number;
	autoBuy: number;

	public initObj(...args: any[]): void {
		this.petId = 0
		this.autoBuy = 0 //0不自动买 1自动买
	}

	pack(writer) {
		writer.writeUInt(this.petId)
		writer.writeUChar(this.autoBuy)
	}

	unpack(reader) {

	}
}
//上战
class Message_C2G_ACTOR_PET_COMBAT_SET extends MessageBase {
	petId: number;
	combatPos: number;

	public initObj(...args: any[]): void {
		this.petId = 0
		this.combatPos = 0 //0代表没有出战 1代表出战 2代表备战1 3代表备战2
	}

	pack(writer) {
		writer.writeUInt(this.petId)
		writer.writeUChar(this.combatPos)
	}

	unpack(reader) {

	}
}
//展示到世界聊天
class Message_C2G_ACTOR_PET_SHOW extends MessageBase {
	petId: number;

	public initObj(...args: any[]): void {
		this.petId = 0
	}

	pack(writer) {
		writer.writeUInt(this.petId)
	}

	unpack(reader) {

	}
}
//资质升级
class Message_C2G_ACTOR_PET_GROW_UP extends MessageBase {
	petId: number;

	public initObj(...args: any[]): void {
		this.petId = 0
	}

	pack(writer) {
		writer.writeUInt(this.petId)
	}

	unpack(reader) {

	}
}
//改名
class Message_C2G_ACTOR_PET_RENAME extends MessageBase {
	petId: number;
	name: string;

	public initObj(...args: any[]): void {
		this.petId = 0
		this.name = ""
	}

	pack(writer) {
		writer.writeUInt(this.petId)
		writer.writeString(this.name)
	}

	unpack(reader) {

	}
}
//洗技能
class Message_C2G_ACTOR_PET_SKILL_WASH extends MessageBase {
	petId: number;
	washType: number; //0正常洗 1高级洗
	autoBuy: number; //1自动买
	lockNum: number; //锁定多少个技能
	lockList: any[]; //每一个锁定的位置列表

	public initObj(...args: any[]): void {
		this.petId = 0
		this.washType = 0
		this.autoBuy = 0
		this.lockNum = 0
		this.lockList = []
	}

	pack(writer) {
		writer.writeUInt(this.petId)
		writer.writeUChar(this.washType)
		writer.writeUChar(this.autoBuy)
		writer.writeUChar(this.lockNum)
		for (let i in this.lockList) {
			writer.writeUChar(this.lockList[i])
		}
	}

	unpack(reader) {

	}
}
//接受洗出来的技能
class Message_C2G_ACTOR_PET_SKILL_ACCEPT extends MessageBase {
	petId: number;

	public initObj(...args: any[]): void {
		this.petId = 0
	}

	pack(writer) {
		writer.writeUInt(this.petId)
	}

	unpack(reader) {

	}
}

////////////////////////////////仙侣///////////////////////////////////
//仙侣列表
class Message_G2C_ACTOR_XIANLV_INFO_LIST extends MessageBase {

	public initObj(...args: any[]): void {
		
	}

	pack(writer) {
		
	}

	unpack(reader) {

	}
}

//新加仙侣
class Message_G2C_ACTOR_XIANLV_ADD extends MessageBase {

	public initObj(...args: any[]): void {
		
	}

	pack(writer) {
		
	}

	unpack(reader) {

	}
}