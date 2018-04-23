
class Message_C2G_TEAM_CREATE extends MessageBase {  //创建队伍
	activity
	public initObj(...args: any[]): void {
		this.activity = null
	}
	pack(writer) {
		writer.writeUInt(this.activity)
	}
	unpack(reader) {
	}

}

class Message_C2G_TEAM_APPLY extends MessageBase {  //申请队伍
	id
	public initObj(...args: any[]): void {
		this.id = null
	}

	pack(writer) {
		writer.writeUInt(this.id)
	}

	unpack(reader) {

	}

}

class Message_C2G_TEAM_REPLY_APPLY extends MessageBase {  //回应申请
	id
	result
	public initObj(...args: any[]): void {
		this.id = null
		this.result = null
	}
	pack(writer) {
		writer.writeUInt(this.id)
		writer.writeUChar(this.result)
	}

	unpack(reader) {

	}

}

class Message_C2G_TEAM_INVITE extends MessageBase {  //发送邀请
	id
	public initObj(...args: any[]): void {
		//this.Type = null
		this.id = null
	}
	pack(writer) {
		//writer.writeUChar(this.Type)
		writer.writeUInt(this.id)
	}
	unpack(reader) {

	}

}

class Message_C2G_TEAM_REPLY_INVITE extends MessageBase {  //回应邀请
	id
	result
	public initObj(...args: any[]): void {
		this.id = null
		this.result = null
	}
	pack(writer) {
		writer.writeUInt(this.id)
		writer.writeUChar(this.result)
	}
	unpack(reader) {
	}

}

class Message_C2G_TEAM_CAPTAIN extends MessageBase {  //升为队长
	id
	public initObj(...args: any[]): void {
		this.id = null
	}
	pack(writer) {
		writer.writeUInt(this.id)
	}
	unpack(reader) {
	}


}

class Message_C2G_TEAM_KICK extends MessageBase { //请离队伍
	id
	public initObj(...args: any[]): void {
		this.id = null
	}
	pack(writer) {
		writer.writeUInt(this.id)
	}
	unpack(reader) {
	}

}

class Message_C2G_TEAM_RANK extends MessageBase {  //更换队员位置
	id1
	id2
	public initObj(...args: any[]): void {
		this.id1 = null
		this.id2 = null
	}
	pack(writer) {
		writer.writeUInt(this.id1)
		writer.writeUInt(this.id2)
	}
	unpack(reader) {
	}

}

class Message_C2G_TEAM_LEAVE extends MessageBase { //退出队伍
	public initObj(...args: any[]): void {
	}
	pack(writer) {
	}
	unpack(reader) {
	}

}

class Message_C2G_TEAM_DISBAND extends MessageBase { //解散队伍
	public initObj(...args: any[]): void {
	}
	pack(writer) {
	}
	unpack(reader) {
	}

}

class Message_G2C_TEAM_INVITE extends MessageBase { //收到邀请组队
	id
	name
	level
	public initObj(...args: any[]): void {
		this.id = null
		this.name = null
		this.level = null
	}
	pack(writer) {
	}
	unpack(reader) {
		this.id = reader.readUInt()
		this.name = reader.readString()
		this.level = reader.readUShort()
	}

}

class Message_G2C_TEAM_APPLY extends MessageBase {  //申请列表
	applyInfo
	public initObj(...args: any[]): void {
		this.applyInfo = null

	}
	pack(writer) {
	}
	unpack(reader) {
		this.applyInfo = TeamApplyInfo.newObj()
		//let roleInfo = RoleInfo.newObj()
		this.applyInfo.read(reader)
		//[this.applyInfo.id, this.applyInfo.name, this.applyInfo.vocation, this.applyInfo.VipLevel, this.applyInfo.sexId] = roleInfo.getRoleInfo()
		this.applyInfo.level = reader.readUShort()
		//this.applyInfo.skytowerFloor = reader.readUInt()	
	}

}

class Message_G2C_TEAM_LEAVE extends MessageBase {    //组队成员退出队伍//////
	id
	public initObj(...args: any[]): void {
		this.id = null
	}
	pack(writer) {
	}
	unpack(reader) {
		this.id = reader.readUInt()
	}

}

class Message_G2C_TEAM_DISBAND extends MessageBase { //队伍解散
	public initObj(...args: any[]): void {
	}
	pack(writer) {
	}
	unpack(reader) {
	}

}

class Message_G2C_TEAM_UPDATE extends MessageBase { //队伍更新信息
	team
	public initObj(...args: any[]): void {
		this.team = null
	}
	pack(writer) {


	}
	unpack(reader) {
		this.team = TeamInfo.newObj()
		this.team.id = reader.readUInt()
		this.team.captainId = reader.readUInt()
		this.team.state = reader.readUChar()
		this.team.skytowerFloor = reader.readUInt()
		this.team.count = reader.readUChar()
		this.team.teamDefenseQueue = table_load(reader.readString())
		this.team.teamTag = reader.readUChar()
		for (let i = 1; i <= this.team.count; i++) {
			let member = TeamMember.newObj()
			// let roleInfo:RoleInfo = RoleInfo.newObj()
			// roleInfo.read(reader)
			// [member.id, member.name, member.vocation, member.VipLevel, member.sexId] = roleInfo.getRoleInfo()
			member.read(reader)
			member.level = reader.readUShort()
			member.pos = reader.readUChar()
			member.status = reader.readUChar()

			this.team.membersList[member.id] = member
		}
		//TLog.Debug("Message_G2C_TEAM_UPDATE.unpack")
	}

}

class Message_G2C_TEAM_DISAPPEAR extends MessageBase { //队伍消失信息
	teamId
	public initObj(...args: any[]): void {
		this.teamId = null
	}
	pack(writer) {
	}
	unpack(reader) {
		this.teamId = reader.readUInt()
	}

}

class Message_C2G_TEAM_CLEAR_APPLY extends MessageBase {// 清空申请列表
	public initObj(...args: any[]): void {
	}
	pack(writer) {
	}
	unpack(reader) {
	}

}

// class Message_C2G_ROLE_CHECK extends MessageBase {//角色检查
// 	id
// 	public initObj(...args: any[]): void {
// 		this.id = null
// 	}
// 	pack(writer) {
// 		writer.writeUInt(this.id)
// 	}
// 	unpack(reader) {
// 	}

// 	// 擂台队伍信息
// }

// class Message_C2G_LEITAI_TEAM_LIST extends MessageBase {
// 	public initObj(...args: any[]): void {

// 	}

// 	pack(writer) {

// 	}

// 	unpack(reader) {

// 	}

// }

// class Message_G2C_LEITAI_TEAM_LIST extends MessageBase {
// 	count
// 	teamList: any[]
// 	public initObj(...args: any[]): void {
// 		this.count = 0
// 		this.teamList = []
// 	}

// 	pack(writer) {

// 	}

// 	unpack(reader) {
// 		this.count = reader.readUShort()
// 		this.teamList = []
// 		for (let i = 1; i <= this.count; i++) {
// 			let info: any = {}
// 			info.id = reader.readUInt()
// 			info.name = reader.readString()
// 			info.level = reader.readUShort()
// 			info.school = reader.readChar()
// 			info.teamCount = reader.readChar()
// 			info.state = reader.readChar()
// 			info.isTeam = reader.readChar()
// 			JsUtil.arrayInstert(this.teamList, info)
// 		}
// 	}

// 	//玩家离线
// }

class Message_G2C_TEAM_MEMBER_OFFLINE extends MessageBase {
	id
	public initObj(...args: any[]): void {
		this.id = null
	}
	pack(writer) {
	}
	unpack(reader) {
		this.id = reader.readUInt()
	}

	//玩家上线
}

class Message_G2C_TEAM_MEMBER_ONLINE extends MessageBase {
	id
	public initObj(...args: any[]): void {
		this.id = null
	}
	pack(writer) {
	}
	unpack(reader) {
		this.id = reader.readUInt()
	}

	//查看队伍列表
}

class Message_C2G_TEAM_ACTIVITY_QUERY extends MessageBase {
	activity
	public initObj(...args: any[]): void {
		this.activity = null
	}
	pack(writer) {
		writer.writeUInt(this.activity)
	}
	unpack(reader) {

	}

	//返回队伍列表
}

class Message_G2C_TEAM_ACTIVITY_QUERY extends MessageBase {
	activity
	teamCount
	teamList: any[]
	public initObj(...args: any[]): void {
		this.activity = null
		this.teamCount = null
		this.teamList = []
	}
	pack(writer) {

	}
	unpack(reader) {
		this.activity = reader.readUInt()
		this.teamCount = reader.readUInt()
		this.teamList = []
		for (let i = 1; i <= this.teamCount; i++) {
			let teamInfo = TeamListInfo.newObj()
			teamInfo.id = reader.readUInt()
			teamInfo.captainID = reader.readUInt()
			teamInfo.count = reader.readChar()
			teamInfo.skytowerFloor = reader.readUInt()   //活动天空之塔层数
			for (let j = 1; j <= teamInfo.count; j++) {
				let memberInfo = TeamListMemberInfo.newObj()
				//let roleInfo = RoleInfo.newObj()
				memberInfo.read(reader)
				//[memberInfo.id, memberInfo.name, memberInfo.vocation, memberInfo.VipLevel, memberInfo.sexId] = roleInfo.getRoleInfo()
				memberInfo.level = reader.readUShort()
				JsUtil.arrayInstert(teamInfo.membersList, memberInfo)
			}
			JsUtil.arrayInstert(this.teamList, teamInfo)
		}
	}


	//设置战斗队列
}

class Message_C2G_TEAM_QUEUE extends MessageBase {
	op
	args
	public initObj(...args: any[]): void {
		this.op = null
		this.args = {}
	}
	pack(writer) {
		writer.writeUInt(this.op)
		if (this.op == ConfigTeamQueue.READY || this.op == ConfigTeamQueue.SET) {		 //准备 //上阵
			writer.writeUChar(this.args[0])		  //位置1
			writer.writeUInt(this.args[1])			//部下entryId
			writer.writeUChar(this.args[2])			//位置2
			writer.writeUInt(this.args[3])			//部下entryId
			writer.writeUChar(this.args[4])			//位置3
			writer.writeUInt(this.args[5])			//部下entryId
		} else if (this.op == ConfigTeamQueue.UNREADY) { //取消准备

		} else if (this.op == ConfigTeamQueue.MOVE) { 	//移动部下 位置1到位置2
			writer.writeUChar(this.args[0])
			writer.writeUChar(this.args[1])
		}
	}
	unpack(reader) {

	}

	//战斗队列返回
}

class Message_G2C_TEAM_QUEUE extends MessageBase {
	teamDefenseQueue
	public initObj(...args: any[]): void {
		this.teamDefenseQueue = null
	}
	pack(writer) {

	}
	unpack(reader) {
		this.teamDefenseQueue = table_load(reader.readString())
	}


	//队长移动返回
}

class Message_G2C_TEAM_SPACE_MOVE extends MessageBase {
	plrId
	mapId
	x
	y

	public initObj(...args: any[]): void {
		this.plrId = 0
		this.mapId = 0
		this.x = 0
		this.y = 0
		this.isdump = false
	}
	pack(writer) {

	}
	unpack(reader) {
		this.mapId = reader.readUShort()
		this.plrId = reader.readUInt()
		this.x = reader.readUShort()
		this.y = reader.readUShort()
	}

	//设置队伍状态
}

class Message_C2G_TEAM_SET_STATUS extends MessageBase {
	teamState
	public initObj(...args: any[]): void {
		this.teamState = null

	}
	pack(writer) {
		writer.writeUInt(this.teamState)

	}
	unpack(reader) {

	}

	////-通知队员改变改变状态
}

class Message_C2G_TEAM_MEMBER_NOTICE extends MessageBase {
	key
	value
	public initObj(...args: any[]): void {
		this.key = null
		this.value = null
	}
	pack(writer) {
		writer.writeUInt(this.key)
		writer.writeUInt(this.value)
	}
	unpack(reader) {

	}

	////-通知队员改变改变状态
}

class Message_G2C_TEAM_MEMBER_NOTICE extends MessageBase {
	key
	value
	public initObj(...args: any[]): void {
		this.key = null
		this.value = null
	}
	pack(writer) {

	}
	unpack(reader) {
		this.key = reader.readUInt()
		this.value = reader.readUInt()
	}

	////-组队申请天空之塔邀请列表
}

class Message_C2G_SKYTOWER_INVITE_LIST extends MessageBase {
	public initObj(...args: any[]): void {

	}
	pack(writer) {

	}
	unpack(reader) {

	}
	////-服务器天空之塔邀请列表返回
}

class Message_G2C_SKYTOWER_INVITE_LIST extends MessageBase {
	inviteCount
	inviteList: any[]
	public initObj(...args: any[]): void {
		this.inviteCount = null
		this.inviteList = []
	}
	pack(writer) {

	}
	unpack(reader) {
		this.inviteCount = reader.readUInt()
		this.inviteList = []
		for (let i = 1; i <= this.inviteCount; i++) {
			let playerInfo: TeamSkyTowerInviteInfo = TeamSkyTowerInviteInfo.newObj()
			//let roleInfo = RoleInfo.newObj()
			playerInfo.read(reader)
			//[playerInfo.roleId, playerInfo.roleName, playerInfo.body, playerInfo.VipLevel, playerInfo.sexId] = roleInfo.getRoleInfo()
			playerInfo.level = reader.readUInt()
			playerInfo.skytowerFloor = reader.readUInt()
			JsUtil.arrayInstert(this.inviteList, playerInfo)
		}
	}
	//-服务器返回混沌世界信息
}

class Message_G2C_TEAM_ACTIVITY_DATA extends MessageBase {
	activityType
	dataList

	public initObj(...args: any[]): void {
		this.activityType = null  //活动类型
		this.dataList = null			//数据列表
	}
	pack(writer) {

	}
	unpack(reader) {
		this.activityType = reader.readUInt()  //活动
		this.dataList = table_load(reader.readString()) //数据
	}

}

class Message_C2G_TEAM_ACTIVITY_DATA extends MessageBase {
	activityType

	public initObj(...args: any[]): void {
		this.activityType = null  //活动类型
	}
	pack(writer) {
		writer.writeUInt(this.activityType)
	}
	unpack(reader) {

	}

	//一键喊话
}

class Message_C2G_TEAM_ALL_INVITE extends MessageBase {

	public initObj(...args: any[]): void {
	}

	pack(writer) {
	}

	unpack(reader) {
	}

	//一键申请
}

class Message_C2G_TEAM_ALL_APPLY extends MessageBase {
	activityType
	public initObj(...args: any[]): void {
		this.activityType = 0
	}

	pack(writer) {
		writer.writeUInt(this.activityType)
	}

	unpack(reader) {
	}


}


//成员状态设置
class Message_C2G_TEAM_SET_MEMBER_STATUS extends MessageBase {
	status: number
	public initObj(...args: any[]): void {
		this.status = 0
	}

	pack(writer) {
		writer.writeUChar(this.status)
	}


}



//组队意愿
//创建组队意愿
class Message_C2G_TEAM_CREATE_WILL_TEAM extends MessageBase {
	actIndex
	intro
	public initObj(...args: any[]): void {
		this.actIndex = 0
		this.intro = ""
	}

	pack(writer) {
		writer.writeUInt(this.actIndex)
		writer.writeString(this.intro)
	}

	unpack(reader) {

	}

	//组队意愿列表
}

class Message_G2C_TEAM_WILL_TEAM_LIST extends MessageBase {
	actIndex
	willList: any[]
	public initObj(...args: any[]): void {
		this.actIndex = 0
		this.willList = []
	}

	pack(writer) {
	}

	unpack(reader) {
		this.willList = []
		this.actIndex = reader.readUInt()
		let count = reader.readUInt()
		for (let i = 1; i <= count; i++) {
			let t: any = {}
			t.id = reader.readUInt()						//玩家ID
			t.name = reader.readString()			//玩家名字
			t.vocation = reader.readUInt()						//玩家职业
			t.sexId = reader.readUChar()					//玩家性别
			t.icon = reader.readString()			//玩家头像
			t.level = reader.readUChar()					//玩家等级
			t.vipLevel = reader.readUChar()					//玩家vip等级
			t.text = reader.readString()			//留言信息
			t.process = table_load(reader.readString()) || {}						//活动索引

			JsUtil.arrayInstert(this.willList, t)
		}
	}

	//组队意愿列表
}

class Message_C2G_TEAM_WILL_TEAM_LIST extends MessageBase {
	actIndex
	public initObj(...args: any[]): void {
		this.actIndex = 0
	}

	pack(writer) {
		writer.writeUInt(this.actIndex)
	}

	unpack(reader) {
	}

	//设置组队意愿
}

class Message_C2G_TEAM_SET_WILL_TEAM extends MessageBase {
	actIndex
	intro
	public initObj(...args: any[]): void {
		this.actIndex = 0
		this.intro = ""
	}

	pack(writer) {
		writer.writeUInt(this.actIndex)
		writer.writeString(this.intro)
	}

	unpack(reader) {

	}
}