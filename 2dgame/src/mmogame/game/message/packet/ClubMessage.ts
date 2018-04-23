/*
作者:
    徐贤
	
创建时间：
   2011.03.6(周三)

意图：
   帮派消息 、军团战消息

公共接口：
   
*/

// 创建帮派协议
class Message_C2G_FACTION_CREATE extends MessageBase {
    clubName
    clubTarget
    useUnit
    icon
    public initObj(...args: any[]): void {
        this.clubName = null
        this.clubTarget = null
        this.useUnit = null
        this.icon = null
    }

    pack(writer) {
        writer.writeString(this.clubName)
        writer.writeString(this.clubTarget)
        writer.writeUInt(this.icon)
    }

    unpack(reader) {

    }

    // 个人帮派信息
}

class Message_G2C_FACTION_SELF_UPDATE extends MessageBase {
    clubId
    clubName
    clubPost
    public initObj(...args: any[]): void {
        this.clubId = null
        this.clubName = null
        this.clubPost = null

    }

    pack(writer) {


    }

    unpack(reader) {
        this.clubId = reader.readUInt()
        if (this.clubId != 0) {
            this.clubName = reader.readString()
            this.clubPost = reader.readChar()
        }
    }


    // 帮派信息
}

class Message_G2C_FACTION_INFO_REFRESH extends MessageBase {
    clubInfo
    public initObj(...args: any[]): void {
        this.clubInfo = null

    }

    pack(writer) {


    }

    unpack(reader) {
        this.clubInfo = ClubInfo.newObj()
        this.clubInfo.read(reader)
    }



    // 请求帮派信息
}

class Message_C2G_FACTION_INFO_REFRESH extends MessageBase {
    public initObj(...args: any[]): void {


    }

    pack(writer) {

    }

    unpack(reader) {

    }

    // 帮派签到
}

class Message_C2G_FACTION_ATTENDANCE extends MessageBase {
    public initObj(...args: any[]): void {


    }

    pack(writer) {


    }

    unpack(reader) {

    }

    // 请求所有帮派列表
}

class Message_C2G_FACTION_INFO extends MessageBase {
    id
    public initObj(...args: any[]): void {
        this.id = 0

    }

    pack(writer) {
        writer.writeUInt(this.id)

    }

    unpack(reader) {

    }


    // 返回所有帮派列表
}

class Message_G2C_FACTION_INFO extends MessageBase {
    clubInfoList: ClubInfo[]
    public initObj(...args: any[]): void {
        this.clubInfoList = []

    }

    pack(writer) {


    }

    unpack(reader) {
        this.clubInfoList = []
        let count = reader.readUShort()
        for (let i = 1; i <= count; i++) {
            let info = ClubInfo.newObj()
            info.read(reader)
            JsUtil.arrayInstert(this.clubInfoList, info)
        }
    }

    // 查看某个帮派信息
}

class Message_C2G_FACTION_SINGLE_INFO extends MessageBase {
    clubId
    public initObj(...args: any[]): void {
        this.clubId = null

    }

    pack(writer) {
        writer.writeUInt(this.clubId)
    }

    unpack(reader) {

    }

    // 返回某个帮派信息
    //}

    //class Message_G2C_FACTION_SINGLE_INFO extends MessageBase{
    //public initObj(...args:any[]):void {
    //	this.clubSingleInfo = null
    //}
    //
    //pack( writer){
    // 
    //    
    //}
    //
    //unpack( reader){ 
    //       this.clubSingleInfo = ClubSingleInfo.newObj()
    //       this.clubSingleInfo.read(reader)
    //}



    // 申请加入帮派
}

class Message_C2G_FACTION_APPAY extends MessageBase {
    clubId
    applyReason
    public initObj(...args: any[]): void {
        this.clubId = null
        this.applyReason = null

    }

    pack(writer) {
        writer.writeUInt(this.clubId)
        writer.writeString(this.applyReason)
    }

    unpack(reader) {



    }

    //取消申请加入帮派
}

class Message_C2G_FACTION_CANCLE_APPLY extends MessageBase {
    clubId
    public initObj(...args: any[]): void {
        this.clubId = null

    }

    pack(writer) {
        writer.writeUInt(this.clubId)
    }

    unpack(reader) {

    }

    // 请求申请列表
}

class Message_C2G_FACTION_APPLY_REFRESH extends MessageBase {
    public initObj(...args: any[]): void {


    }

    pack(writer) {

    }

    unpack(reader) {

    }


    // 接受申请列表
}

class Message_G2C_FACTION_APPLY_REFRESH extends MessageBase {
    applyList: ApplyRoleInfo[]
    count: number
    public initObj(...args: any[]): void {
        this.applyList = []
        this.count = null
        this.fireEvent = true
    }

    pack(writer) {

    }

    unpack(reader) {
        this.applyList = []
        let count = reader.readUShort()
        this.count = count
        for (let i = 1; i <= count; i++) {
            let info = ApplyRoleInfo.newObj()
            info.read(reader)
            JsUtil.arrayInstert(this.applyList, info)
        }

    }



    // 修改公告
}

class Message_C2G_FACTION_NOTICE extends MessageBase {
    notice
    public initObj(...args: any[]): void {
        this.notice = null

    }

    pack(writer) {
        writer.writeString(this.notice)
    }

    unpack(reader) {

    }

    // update公告
}

class Message_G2C_FACTION_NOTICE extends MessageBase {
    notice
    public initObj(...args: any[]): void {
        this.notice = null

    }

    pack(writer) {

    }

    unpack(reader) {
        this.notice = reader.readString()
    }



    // 接受申请请求
}

class Message_C2G_FACTION_CHECK extends MessageBase {
    applyId
    isYes
    public initObj(...args: any[]): void {
        this.applyId = null
        this.isYes = null

    }

    pack(writer) {
        writer.writeUInt(this.applyId)
        writer.writeChar(this.isYes)
    }

    unpack(reader) {

    }



    // 请求成员列表
}

class Message_C2G_FACTION_MEMBER_REFRESH extends MessageBase {
    public initObj(...args: any[]): void {


    }

    pack(writer) {

    }

    unpack(reader) {

    }


    // 返回成员列表
}

class Message_G2C_FACTION_MEMBER_REFRESH extends MessageBase {
    menberList: ClubRoleInfo[]
    public initObj(...args: any[]): void {
        this.menberList = null

    }

    pack(writer) {

    }

    unpack(reader) {
        this.menberList = []
        let count = reader.readUShort()
        for (let i = 1; i <= count; i++) {
            let menberInfo = ClubRoleInfo.newObj()
            menberInfo.read(reader)
            //menberInfo.donateCount = reader.readUInt() //当前捐赠次数
            //menberInfo.historyCount = reader.readUInt()  //历史捐赠次数
            JsUtil.arrayInstert(this.menberList, menberInfo)

        }

    }



    // 修改宗旨
}

class Message_C2G_FACTION_INTRODUCTION extends MessageBase {
    strTarget
    public initObj(...args: any[]): void {
        this.strTarget = null

    }

    pack(writer) {
        writer.writeString(this.strTarget)
    }

    unpack(reader) {

    }

    // 更新宗旨
}

class Message_G2C_FACTION_INTRODUCTION extends MessageBase {
    strTarget
    legionID
    public initObj(...args: any[]): void {
        this.strTarget = null
        this.legionID = null
    }

    pack(writer) {

    }

    unpack(reader) {
        this.legionID = reader.readUInt()
        this.strTarget = reader.readString()
    }


    // 脱离帮派
}

class Message_C2G_FACTION_LEAVE extends MessageBase {
    public initObj(...args: any[]): void {


    }

    pack(writer) {

    }

    unpack(reader) {

    }


    // 帮派职位
}

class Message_C2G_FACTION_POST extends MessageBase {
    roleId
    postId
    public initObj(...args: any[]): void {
        this.roleId = null
        this.postId = null

    }

    pack(writer) {
        writer.writeUInt(this.roleId)
        writer.writeChar(this.postId)
    }

    unpack(reader) {

    }


    // 帮派开除
}

class Message_C2G_FACTION_FIRE extends MessageBase {
    roleId
    public initObj(...args: any[]): void {
        this.roleId = null


    }

    pack(writer) {
        writer.writeUInt(this.roleId)
    }

    unpack(reader) {

    }

}

class Message_G2C_FACTION_FIRE extends MessageBase {
    roleId
    public initObj(...args: any[]): void {
        this.roleId = null
    }

    pack(writer) {

    }

    unpack(reader) {

    }



    // 邀请加入帮派
}

class Message_C2G_FACTION_INVITE extends MessageBase {
    name
    public initObj(...args: any[]): void {
        this.name = null


    }

    pack(writer) {
        writer.writeString(this.name)
    }

    unpack(reader) {

    }



    //  帮派成员更新
}

class Message_G2C_FACTION_SINGLE_MEMBER_REFRESH extends MessageBase {
    clubRoleInfo
    public initObj(...args: any[]): void {
        this.clubRoleInfo = null


    }

    pack(writer) {

    }

    unpack(reader) {
        this.clubRoleInfo = ClubRoleInfo.newObj()
        this.clubRoleInfo.read(reader)

    }



    //  清除申请列表
}

class Message_C2G_FACTION_CLEAR_APPLY extends MessageBase {
    clubRoleInfo
    public initObj(...args: any[]): void {
        this.clubRoleInfo = null


    }

    pack(writer) {

    }

    unpack(reader) {

    }



    // 进入其他帮派
}

class Message_C2G_FACTION_ENTER_OTHER_MAP extends MessageBase {
    clubId
    public initObj(...args: any[]): void {
        this.clubId = null


    }

    pack(writer) {
        writer.writeUInt(this.clubId)
    }

    unpack(reader) {

    }




    //军团申请列表
}

class Message_G2C_ROLE_APPLY_FACTION_LIST extends MessageBase {
    apply_list
    public initObj(...args: any[]): void {
        this.apply_list = {}
    }

    pack(writer) {

    }

    unpack(reader) {
        this.apply_list = table_load(reader.readString())
    }


    //团长分配物品
}

class Message_C2G_FACTION_ITEM_CHOOSE extends MessageBase {
    itemId
    menberId
    count
    public initObj(...args: any[]): void {
        this.menberId = 0
        this.itemId = 0
        this.count = 0
    }

    pack(writer) {
        writer.writeUInt(this.itemId)
        writer.writeUInt(this.menberId)
        writer.writeUInt(this.count)
    }

    unpack(reader) {

    }

    //团长分配物品返回
}

class Message_G2C_FACTION_ITEM_CHOOSE extends MessageBase {
    Times
    itemId
    public initObj(...args: any[]): void {
        this.Times = 0
        this.itemId = 0
    }

    pack(writer) {

    }

    unpack(reader) {
        this.Times = reader.readUInt()
        this.itemId = reader.readUInt()
    }


    //申请军团副本里的物品
}

class Message_C2G_FACTION_WAREHOUSE_APPLY extends MessageBase {
    itemId
    public initObj(...args: any[]): void {
        this.itemId = 0
    }

    pack(writer) {
        writer.writeUInt(this.itemId)
    }

    unpack(reader) {

    }

    //申请军团副本里的物品返回
}

class Message_G2C_FACTION_WAREHOUSE_APPLY extends MessageBase {
    itemId
    public initObj(...args: any[]): void {
        this.itemId = 0
    }

    pack(writer) {

    }

    unpack(reader) {
        this.itemId = reader.readUInt()
    }

    //取消申请军团副本里的物品
}

class Message_C2G_FACTION_WAREHOUSE_CANCEL extends MessageBase {
    itemId
    public initObj(...args: any[]): void {
        this.itemId = 0
    }

    pack(writer) {
        writer.writeUInt(this.itemId)
    }

    unpack(reader) {

    }

    //取消申请军团副本里的物品返回
}

class Message_G2C_FACTION_WAREHOUSE_CANCEL extends MessageBase {
    itemId
    public initObj(...args: any[]): void {
        this.itemId = 0
    }

    pack(writer) {

    }

    unpack(reader) {
        this.itemId = reader.readUInt()
    }


    //申请军团仓库分配列表
}

class Message_C2G_FACTION_ALLOCA_RECORD extends MessageBase {
    public initObj(...args: any[]): void {

    }

    pack(writer) {

    }

    unpack(reader) {

    }

    //接收军团仓库分配列表
}

class Message_G2C_FACTION_ALLOCA_RECORD extends MessageBase {
    allotRecordList
    public initObj(...args: any[]): void {
        this.allotRecordList = []
    }

    pack(writer) {

    }

    unpack(reader) {
        this.allotRecordList = []
        let count = reader.readUInt()
        for (let i = 1; i <= count; i++) {
            let recordInfo: any = {}
            recordInfo = table_load(reader.readString())
            JsUtil.arrayInstert(this.allotRecordList, recordInfo)
        }

    }



    ////////////////////////////////////////////////////////////////////////////////////-
    ////申请查看
}

class Message_C2G_FACTION_WAREHOUSE_LIST extends MessageBase {
    public initObj(...args: any[]): void {

    }

    pack(writer) {

    }

    unpack(reader) {

    }

    ////////////////////////////////////////////////////////////////////////////////////-
    ////军团仓库
}

// class Message_G2C_FACTION_WAREHOUSE_LIST extends MessageBase {
//     list: Item[];
//     public initObj(...args: any[]): void {
//         this.list = []
//     }

//     pack(writer) {

//     }

//     unpack(reader) {
//         let num = reader.readUInt()
//         this.list = []
//         for (let i = 1; i <= num; i++) {
//             let info = ItemInfo.newObj()
//             info.read(reader)
//             let item = Item.newObj(info)
//             table_insert(this.list, item)
//         }
//     }


    
// }

//申请军团购买记录列表
class Message_C2G_FACTION_BUY_RECORD extends MessageBase {
    public initObj(...args: any[]): void {

    }

    pack(writer) {

    }

    unpack(reader) {

    }

    //接收军团购买记录列表
}

class Message_G2C_FACTION_BUY_RECORD extends MessageBase {
    buyRecordList
    public initObj(...args: any[]): void {
        this.buyRecordList = []
    }

    pack(writer) {

    }

    unpack(reader) {
        this.buyRecordList = []
        let count = reader.readUInt()
        for (let i = 1; i <= count; i++) {
            let recordInfo: any = {}
            recordInfo = table_load(reader.readString())
            JsUtil.arrayInstert(this.buyRecordList, recordInfo)
        }

    }

    //查询军团公告
}

class Message_C2G_FACTION_QUERY_INTRODUCT extends MessageBase {
    legionID
    public initObj(...args: any[]): void {
        this.legionID = null
    }

    pack(writer) {
        writer.writeUInt(this.legionID)
    }
    unpack(reader) {

    }

    //////////////军团联盟////////////////
}

class Message_G2C_APPLY_ADD_UNION extends MessageBase {
    unionFactionID
    unionFactionName
    unionFactionMemberCount
    unionFactionLevel
    public initObj(...args: any[]): void {
        this.unionFactionID = null
        this.unionFactionName = null
        this.unionFactionMemberCount = null
        this.unionFactionLevel = null
    }
    pack(writer) {

    }
    unpack(reader) {
        this.unionFactionID = reader.readUInt()
        this.unionFactionName = reader.readString()
        this.unionFactionMemberCount = reader.readUInt()
        this.unionFactionLevel = reader.readUInt()
    }

}

class Message_C2G_APPLY_ADD_UNION extends MessageBase {
    addLegionID
    public initObj(...args: any[]): void {
        this.addLegionID = null
    }
    pack(writer) {
        writer.writeUInt(this.addLegionID)
    }
    unpack(reader) {

    }

    //同意/拒绝加入
}

class Message_C2G_AGREEN_ADD_UNION extends MessageBase {
    factionID
    public initObj(...args: any[]): void {
        this.factionID = null
    }
    pack(writer) {
        writer.writeUInt(this.factionID)
    }
    unpack(reader) {

    }

}

class Message_G2C_AGREEN_ADD_UNION extends MessageBase {
    public initObj(...args: any[]): void {

    }
    pack(writer) {

    }
    unpack(reader) {

    }

}

class Message_C2G_REFUSE_ADD_UNION extends MessageBase {
    factionID
    public initObj(...args: any[]): void {
        this.factionID = null
    }
    pack(writer) {
        writer.writeUInt(this.factionID)
    }
    unpack(reader) {

    }
}

class Message_G2C_REFUSE_ADD_UNION extends MessageBase {
    public initObj(...args: any[]): void {

    }
    pack(writer) {

    }
    unpack(reader) {

    }

    //离开联盟
}

class Message_C2G_LEAVE_UNION extends MessageBase {
    public initObj(...args: any[]): void {

    }
    pack(writer) {

    }
    unpack(reader) {

    }

}

class Message_G2C_LEAVE_UNION extends MessageBase {
    public initObj(...args: any[]): void {

    }
    pack(writer) {

    }
    unpack(reader) {

    }

    //查询我的联盟信息
}

class Message_C2G_UNION_INFO extends MessageBase {
    public initObj(...args: any[]): void {

    }
    pack(writer) {

    }
    unpack(reader) {

    }

}

class Message_G2C_UNION_INFO extends MessageBase {
    myUnionInfo
    public initObj(...args: any[]): void {
        this.myUnionInfo = null
    }
    pack(writer) {

    }
    unpack(reader) {
        this.myUnionInfo = table_load(reader.readString())
    }


    //////////////////////////////军团建筑 begin//////////////////////////////
    //查询军团建筑信息
}

class Message_C2G_FACTION_BUILD_INFO extends MessageBase {
    public initObj(...args: any[]): void {

    }
    pack(writer) {

    }
    unpack(reader) {
    }

    //查询军团建筑信息返回
}

class Message_G2C_FACTION_BUILD_INFO extends MessageBase {
    list
    public initObj(...args: any[]): void {
        this.list = null
    }
    pack(writer) {


    }
    unpack(reader) {
        this.list = {}
        let count = reader.readUInt()
        for (let i = 1; i <= count; i++) {
            let info: any = {}
            info.bType = reader.readUInt() //建筑类型
            info.level = reader.readUInt() //建筑等级
            info.schedule = reader.readUInt() //建筑当前贡献度
            //JsUtil.arrayInstert(this.list,info)		
            this.list[info.bType] = info
        }
    }

    //贡献某个建筑
}

class Message_C2G_FACTION_BUILD_DONATE extends MessageBase {
    buildType
    itemList
    public initObj(...args: any[]): void {
        this.buildType = 0
        this.itemList = {}
    }
    pack(writer) {
        writer.writeUInt(this.buildType)
        writer.writeString(table_save(this.itemList))
    }
    unpack(reader) {
    }

    //申请军团建筑积分
}

class Message_C2G_FACTION_BUILD_POINT extends MessageBase {
    public initObj(...args: any[]): void {
    }
    pack(writer) {
    }
    unpack(reader) {
    }

    //军团建筑积分返回
}

class Message_G2C_FACTION_BUILD_POINT extends MessageBase {
    buildPoint
    public initObj(...args: any[]): void {
        this.buildPoint = 0
    }
    pack(writer) {
    }
    unpack(reader) {
        this.buildPoint = reader.readUInt()
    }

    //////////////////////////////军团建筑 }//////////////////////////////
    //申请军团技能等级信息
}

class Message_C2G_FACTION_SKILL_INFO extends MessageBase {
    public initObj(...args: any[]): void {
    }
    pack(writer) {
    }
    unpack(reader) {
    }
    //军团技能等级信息返回
}

class Message_G2C_FACTION_SKILL_INFO extends MessageBase {
    pointRecord
    list
    public initObj(...args: any[]): void {
        this.pointRecord = 0
        this.list = {}
    }
    pack(writer) {
    }
    unpack(reader) {
        this.pointRecord = reader.readUInt()
        this.list = table_load(reader.readString())
        //TLog.Debug("************************")
        //TLog.Debug(this.pointRecord)
        //io.read()
    }

    //申请军团技能升级
}

class Message_C2G_FACTION_SKILL_LEVEL_UP extends MessageBase {
    skillType
    public initObj(...args: any[]): void {
        this.skillType = 0
    }
    pack(writer) {
        writer.writeUInt(this.skillType)
    }
    unpack(reader) {
    }
    //////////////////////////////军团建筑 }//////////////////////////////
    //查询联盟信息
}

class Message_C2G_UNIONPVP_GROUP_INFO extends MessageBase {
    public initObj(...args: any[]): void {

    }
    pack(writer) {
    }
    unpack(reader) {

    }

    //联盟信息返回
}

class Message_G2C_UNIONPVP_GROUP_INFO extends MessageBase {
    info
    public initObj(...args: any[]): void {
        this.info = null
    }
    pack(writer) {

    }
    unpack(reader) {
        this.info = {}
        this.info.myUnion = []			//我方联盟
        let count = reader.readUInt()
        for (let i = 1; i <= count; i++) {
            let legionInfo: any = {}
            legionInfo.id = reader.readUInt() //id
            legionInfo.logo = reader.readUInt() //logo
            legionInfo.name = reader.readString() //name
            JsUtil.arrayInstert(this.info.myUnion, legionInfo)
        }
        this.info.enemyUnion = []	//敌方联盟
        count = reader.readUInt()
        for (let i = 1; i <= count; i++) {
            let legionInfo: any = {}
            legionInfo.id = reader.readUInt() //id
            legionInfo.logo = reader.readUInt() //logo
            legionInfo.name = reader.readString() //name
            JsUtil.arrayInstert(this.info.enemyUnion, legionInfo)
        }
        this.info.myUnionCount = reader.readUInt() //我方参与人数
        this.info.enemyUnionCount = reader.readUInt() //敌方参与人数
        this.info.myUnionScore = reader.readUInt() //我方积分
        this.info.enemyUnionScore = reader.readUInt() //敌方积分
        this.info.myScore = reader.readUInt() //我的积分
        this.info.mySide = reader.readUInt() //左右
    }

    //查询我方积分
}

class Message_C2G_UNIONPVP_MY_NODE_SCORE_LIST extends MessageBase {
    checkIndex
    public initObj(...args: any[]): void {
        this.checkIndex = null //1 我方 2敌方
        //opUnionConfig.factScore = 1,              //查看军团成员积分
        //opUnionConfig.unionScore = 2,             //查看联盟成员积分
    }
    pack(writer) {
        writer.writeUInt(this.checkIndex)
    }
    unpack(reader) {

    }
    //我方积分返回 
}

class Message_G2C_UNIONPVP_MY_NODE_SCORE_LIST extends MessageBase {
    infoList
    checkType
    public initObj(...args: any[]): void {
        this.infoList = null
        this.checkType = null
    }
    pack(writer) {
    }
    unpack(reader) {
        this.infoList = []
        let count = reader.readUInt()
        for (let i = 1; i <= count; i++) {
            let memberInfo: any = {}
            memberInfo.score = reader.readUInt() //积分
            memberInfo.id = reader.readUInt() //id
            memberInfo.name = reader.readString() //name
            memberInfo.body = reader.readUInt() //body
            memberInfo.level = reader.readUInt() //lv
            JsUtil.arrayInstert(this.infoList, memberInfo)
        }
        this.checkType = reader.readUInt()
    }
    //查询积分
}

class Message_C2G_UNIONPVP_BOTH_NODE_SCORE_LIST extends MessageBase {
    checkIndex
    public initObj(...args: any[]): void {
        this.checkIndex = null //1 我方 2敌方
        //opUnionConfig.myNodeScore = 1,            //查看我方成员积分
        //opUnionConfig.otherNodeScore = 2,         //查看敌方成员积分
    }
    pack(writer) {
        writer.writeUInt(this.checkIndex)
    }
    unpack(reader) {

    }
    //敌方分返回
}

class Message_G2C_UNIONPVP_BOTH_NODE_SCORE_LIST extends MessageBase {
    info
    checkType
    public initObj(...args: any[]): void {
        this.info = null
        this.checkType = null
    }
    pack(writer) {
    }
    unpack(reader) {
        this.info = {}
        this.info.myTotalScore = reader.readUInt()				//我方总积分
        this.info.enemyTotalScore = reader.readUInt()			//敌方总结分
        let count = reader.readUInt()
        this.info.list = {}
        for (let i = 1; i <= count; i++) {
            let memberInfo: any = {}
            memberInfo.score = reader.readUInt() //积分
            memberInfo.id = reader.readUInt() //id
            memberInfo.name = reader.readString() //name
            memberInfo.body = reader.readUInt() //body
            memberInfo.level = reader.readUInt() //lv
            JsUtil.arrayInstert(this.info.list, memberInfo)
        }
        this.checkType = reader.readUInt()
    }

    //双方积分情况 
}

class Message_G2C_UNIONPVP_SCORE extends MessageBase {
    info
    public initObj(...args: any[]): void {
        this.info = null
    }
    pack(writer) {
    }
    unpack(reader) {
        this.info = {}
        this.info.leftScore = reader.readUInt()
        this.info.rightScore = reader.readUInt()
        this.info.mySide = reader.readUInt()
    }
    //申请进入
}

class Message_C2G_UNIONPVP_ENTER extends MessageBase {
    public initObj(...args: any[]): void {

    }
    pack(writer) {
    }
    unpack(reader) {

    }
    //进入返回
}

class Message_G2C_UNIONPVP_ENTER extends MessageBase {
    battleIndex
    public initObj(...args: any[]): void {
        this.battleIndex = null
    }
    pack(writer) {
    }
    unpack(reader) {
        this.battleIndex = reader.readUInt()
    }

    //拾取旗帜
}

class Message_C2G_UNIONPVP_PICK_FLAG extends MessageBase {
    npcId
    public initObj(...args: any[]): void {
        this.npcId = null
    }
    pack(writer) {
        writer.writeUInt(this.npcId)
    }
    unpack(reader) {

    }
    //打开旗帜
}

class Message_C2G_UNIONPVP_OPEN_FLAG extends MessageBase {
    public initObj(...args: any[]): void {

    }
    pack(writer) {
    }
    unpack(reader) {

    }

    //PK
}

class Message_C2G_UNIONPVP_CREATE_FIGHT extends MessageBase {
    playerId
    public initObj(...args: any[]): void {
        this.playerId = null
    }
    pack(writer) {
        writer.writeUInt(this.playerId)
    }
    unpack(reader) {

    }

    //离开
}

class Message_C2G_UNIONPVP_LEAVE extends MessageBase {
    public initObj(...args: any[]): void {

    }
    pack(writer) {
    }
    unpack(reader) {

    }

}

class Message_G2C_UNIONPVP_LEAVE extends MessageBase {
    info
    public initObj(...args: any[]): void {
        this.info = null
    }
    pack(writer) {
    }
    unpack(reader) {
        this.info = reader.readUInt()
    }

    //活动状态

}

class Message_C2G_UNIONPVP_GAME_STAGE extends MessageBase {
    public initObj(...args: any[]): void {

    }
    pack(writer) {
    }
    unpack(reader) {

    }

}

class Message_G2C_UNIONPVP_GAME_STAGE extends MessageBase {
    status
    public initObj(...args: any[]): void {
        this.status = null
    }
    pack(writer) {
    }
    unpack(reader) {
        this.status = reader.readUInt()
    }

}

class Message_C2G_UNIONPVP_CHANGE_MAP extends MessageBase {
    npcId
    public initObj(...args: any[]): void {
        this.npcId = null
    }
    pack(writer) {
        writer.writeUInt(this.npcId)
    }
    unpack(reader) {

    }

    //查看旗帜分布
}

class Message_C2G_UNIONPVP_FLAG_INFO extends MessageBase {
    public initObj(...args: any[]): void {

    }
    pack(writer) {

    }
    unpack(reader) {

    }
    //查看旗帜分布返回
}

class Message_G2C_UNIONPVP_FLAG_INFO extends MessageBase {
    info
    public initObj(...args: any[]): void {
        this.info = null
    }
    pack(writer) {

    }
    unpack(reader) {
        this.info = {}
        let count = reader.readUInt()
        for (let i = 1; i <= count; i++) {
            let roomIndex = reader.readUInt()
            let smallCount = reader.readUInt()
            let bigCount = reader.readUInt()
            JsUtil.arrayInstert(this.info, [i, smallCount, bigCount])
        }

    }
    //查看决赛
}

class Message_C2G_UNIONPVP_SECOND_FIGHT_INFO extends MessageBase {
    public initObj(...args: any[]): void {

    }
    pack(writer) {

    }
    unpack(reader) {

    }
    //决赛信息返回
}

class Message_G2C_UNIONPVP_SECOND_FIGHT_INFO extends MessageBase {
    superInfo
    public initObj(...args: any[]): void {
        this.superInfo = null
    }
    pack(writer) {

    }
    unpack(reader) {
        this.superInfo = []
        let count = reader.readUInt()
        for (let i = 1; i <= count; i++) {
            let playerInfo: any = {}
            playerInfo.pos = reader.readUInt()
            playerInfo.score = reader.readUInt()
            playerInfo.id = reader.readUInt()
            playerInfo.name = reader.readString()
            playerInfo.body = reader.readUInt()
            playerInfo.level = reader.readUInt()
            playerInfo.status = reader.readUInt()
            JsUtil.arrayInstert(this.superInfo, playerInfo)
        }
    }

    //设置成员
}

class Message_C2G_UNIONPVP_SET_MEMBER extends MessageBase {
    memberId
    setPos
    public initObj(...args: any[]): void {
        this.memberId = null
        this.setPos = null
    }
    pack(writer) {
        writer.writeUInt(this.setPos)
        writer.writeUInt(this.memberId)
    }
    unpack(reader) {

    }
}

class Message_C2G_UNIONPVP_CANCEL_SET_MEMBER extends MessageBase {
    memberId
    setPos
    public initObj(...args: any[]): void {
        this.memberId = null
        this.setPos = null
    }
    pack(writer) {
        writer.writeUInt(this.setPos)
        writer.writeUInt(this.memberId)
    }
    unpack(reader) {

    }

    //准备
}

class Message_C2G_UNIONPVP_SET_STATUS extends MessageBase {
    status
    public initObj(...args: any[]): void {
        this.status = null  //1准备 0不准备
    }
    pack(writer) {
        writer.writeUInt(this.status)
    }
    unpack(reader) {

    }
    //离开组合赛
}

class Message_C2G_UNIONPVP_LEAVE_SECOND_FIGHT extends MessageBase {
    public initObj(...args: any[]): void {

    }
    pack(writer) {

    }
    unpack(reader) {

    }
    //精灵守卫
}

class Message_G2C_UNIONPVP_FAIRY_GUARD_LIST extends MessageBase {
    myFairyList
    public initObj(...args: any[]): void {
        this.myFairyList = null
    }
    pack(writer) {

    }
    unpack(reader) {
        this.myFairyList = table_load(reader.readString())
        //fairyList = {[roomIndex]:npcId, [roomIndex]:npcId}
    }
    //当前层数
}

class Message_G2C_UNIONPVP_ROOM_INDEX extends MessageBase {
    curRoomIndex
    public initObj(...args: any[]): void {
        this.curRoomIndex = null
    }
    pack(writer) {

    }
    unpack(reader) {
        this.curRoomIndex = reader.readUInt()
    }

}

class Message_C2G_UNIONPVP_SECOND_ALL_INFO extends MessageBase {
    public initObj(...args: any[]): void {

    }
    pack(writer) {

    }
    unpack(reader) {

    }

}

class Message_G2C_UNIONPVP_SECOND_ALL_INFO extends MessageBase {
    info
    public initObj(...args: any[]): void {
        this.info = null
    }
    pack(writer) {

    }
    unpack(reader) {
        this.info = {}
        this.info.leftList = []
        let count = reader.readUInt()
        for (let i = 1; i <= count; i++) {
            let playerInfo: any = {}
            playerInfo.pos = reader.readUInt()
            playerInfo.score = reader.readUInt()
            playerInfo.id = reader.readUInt()
            playerInfo.name = reader.readString()
            playerInfo.body = reader.readUInt()
            playerInfo.level = reader.readUInt()
            playerInfo.status = reader.readUInt()
            JsUtil.arrayInstert(this.info.leftList, playerInfo)
        }
        this.info.rightList = []
        count = reader.readUInt()
        for (let i = 1; i <= count; i++) {
            let playerInfo: any = {}
            playerInfo.pos = reader.readUInt()
            playerInfo.score = reader.readUInt()
            playerInfo.id = reader.readUInt()
            playerInfo.name = reader.readString()
            playerInfo.body = reader.readUInt()
            playerInfo.level = reader.readUInt()
            playerInfo.status = reader.readUInt()
            JsUtil.arrayInstert(this.info.rightList, playerInfo)
        }
    }
    //申请报名列表
}

class Message_C2G_UNIONPVP_APPLY_LIST_INFO extends MessageBase {
    public initObj(...args: any[]): void {

    }
    pack(writer) {

    }
    unpack(reader) {

    }
    //报名列表返回
}

class Message_G2C_UNIONPVP_APPLY_LIST_INFO extends MessageBase {
    info
    public initObj(...args: any[]): void {
        this.info = null
    }
    pack(writer) {

    }
    unpack(reader) {
        this.info = []
        let count = reader.readUInt()
        for (let i = 1; i <= count; i++) {
            let unionInfo = table_load(reader.readString())
            JsUtil.arrayInstert(this.info, unionInfo)
        }
    }

}

class Message_C2G_UNIONPVP_USE_ITEM extends MessageBase {
    itemUid
    public initObj(...args: any[]): void {
        this.itemUid = null
    }
    pack(writer) {
        writer.writeUInt(this.itemUid)
    }
    unpack(reader) {

    }

}

class Message_C2G_UNIONPVP_APPLY extends MessageBase {
    public initObj(...args: any[]): void {

    }
    pack(writer) {

    }
    unpack(reader) {

    }


    //////////////////////////////////军团联盟PVE start////////////////////////////////////////////////
    //开启灵阵
}

class Message_C2G_UNIONMTX_CREATE extends MessageBase {
    public initObj(...args: any[]): void {
        this.isdump = true
    }
    pack(writer) {

    }
    unpack(reader) {

    }
    //开启灵阵返回
}

class Message_G2C_UNIONMTX_CREATE extends MessageBase {
    openState
    public initObj(...args: any[]): void {
        this.openState = 0
        this.isdump = true
    }
    pack(writer) {

    }
    unpack(reader) {
        this.openState = reader.readUInt()
    }
    //进入阵眼
}

class Message_C2G_UNIONMTX_ENTER extends MessageBase {
    mapindex
    public initObj(...args: any[]): void {
        this.mapindex = 0
        this.isdump = true
    }

    pack(writer) {
        writer.writeUInt(this.mapindex)
    }
    unpack(reader) {

    }
    //进入阵眼返回
}

class Message_G2C_UNIONMTX_ENTER extends MessageBase {
    mapIndex
    public initObj(...args: any[]): void {
        this.mapIndex = 0
        this.isdump = true
    }
    pack(writer) {

    }
    unpack(reader) {
        this.mapIndex = reader.readUInt()
    }
    //离开阵眼
}

class Message_C2G_UNIONMTX_LEAVE extends MessageBase {
    public initObj(...args: any[]): void {
        this.isdump = true
    }
    pack(writer) {
    }
    unpack(reader) {
    }
    //离开阵眼返回
}

class Message_G2C_UNIONMTX_LEAVE extends MessageBase {
    mapIndex
    public initObj(...args: any[]): void {
        this.mapIndex = 0
        this.isdump = true
    }
    pack(writer) {
    }
    unpack(reader) {
        this.mapIndex = reader.readUInt()
    }
    //开始战斗
}

class Message_C2G_UNIONMTX_FIGHT extends MessageBase {
    npcId
    public initObj(...args: any[]): void {
        this.npcId = 0
        this.isdump = true
    }
    pack(writer) {
        writer.writeUInt(this.npcId)
    }
    unpack(reader) {
    }
    //查询灵阵活动开启状态
}

class Message_C2G_UNIONMTX_QUERY extends MessageBase {
    public initObj(...args: any[]): void {
        this.isdump = true
    }
    pack(writer) {
    }
    unpack(reader) {
    }
    //查询灵阵活动开启状态返回

}

class Message_G2C_UNIONMTX_QUERY extends MessageBase {
    info
    public initObj(...args: any[]): void {
        this.info = null
        this.isdump = true
    }
    pack(writer) {
    }
    unpack(reader) {
        this.info = {}
        let t: any = {}
        t.starttime = reader.readUInt()
        t.map1close = reader.readUShort()					//(1表示已经破)
        t.map2close = reader.readUShort()
        t.map3close = reader.readUShort()
        t.map4close = reader.readUShort()
        t.map5close = reader.readUShort()
        t.map6close = reader.readUShort()
        this.info = t
    }
    //查询阵眼开启状态
}

class Message_C2G_UNIONMTX_QUERY_MTX extends MessageBase {
    mapindex
    public initObj(...args: any[]): void {
        this.mapindex = 0
        this.isdump = true
    }
    pack(writer) {
        writer.writeUInt(this.mapindex)
    }
    unpack(reader) {
    }
    //查询阵眼开启状态返回
}

class Message_G2C_UNIONMTX_QUERY_MTX extends MessageBase {
    info
    public initObj(...args: any[]): void {
        this.info = null
        this.isdump = true
    }
    pack(writer) {
    }
    unpack(reader) {
        this.info = {}
        let t: any = {}
        t.mapindex = reader.readUInt()						//(阵眼开启名)
        t.allkillcount = reader.readUInt()				//联盟已杀死的小怪
        t.mykillcount = reader.readUInt()         //自己总共杀死的小怪
        t.playercount = reader.readUInt()         //阵眼中的玩家数量
        t.bossAppearTime = reader.readUInt()      //阵眼守护者出现
        t.buffid = reader.readUInt()              //魔法id
        this.info = t
    }
    //查询强化师状态
}

class Message_C2G_UNIONMTX_QUERY_TCH extends MessageBase {
    public initObj(...args: any[]): void {
        this.isdump = true
    }
    pack(writer) {
    }
    unpack(reader) {
    }
    //查询强化师的状态返回
}

class Message_G2C_UNIONMTX_QUERY_TCH extends MessageBase {
    info
    public initObj(...args: any[]): void {
        this.info = null
        this.isdump = true
    }
    pack(writer) {
    }
    unpack(reader) {
        this.info = {}
        let t: any = {}
        t.nextappeartime = reader.readUInt()   //强化师下一次出现的时间
        t.appear = reader.readUInt()           //强化师是否出现
        t.curHp = reader.readUInt()            //强化师当前的血量
        t.maxHp = reader.readUInt()            //强化石的最大血量
        this.info = t
    }
    //查询BOSS状态
}

class Message_C2G_UNIONMTX_QUERY_BOSS extends MessageBase {
    public initObj(...args: any[]): void {
        this.isdump = true
    }
    pack(writer) {
    }
    unpack(reader) {
    }
    //查询Boss的状态返回
}

class Message_G2C_UNIONMTX_QUERY_BOSS extends MessageBase {
    bossInfo
    public initObj(...args: any[]): void {
        this.bossInfo = null
        this.isdump = true
    }
    pack(writer) {
    }
    unpack(reader) {
        this.bossInfo = {}
        let t: any = {}
        t.nextfighttime = reader.readUInt()   //Boss下一次出现的时间
        t.open = reader.readUInt()             //是否可以打boss
        t.curcount = reader.readUInt()           //当前挑战boss的数量
        t.maxcount = reader.readUInt()            //可挑战boss的最大数量
        //t.maxHp = reader.readUInt()            //最大血量
        this.bossInfo = t
    }
    //查询排行信息
}

class Message_C2G_UNIONMTX_RANKDATA extends MessageBase {
    public initObj(...args: any[]): void {
        this.isdump = true
    }
    pack(writer) {
    }
    unpack(reader) {
    }
    //查询排行信息返回
}

class Message_G2C_UNIONMTX_RANKDATA extends MessageBase {
    rankInfo
    public initObj(...args: any[]): void {
        this.rankInfo = null
        this.isdump = true
    }
    pack(writer) {
    }
    unpack(reader) {
        this.rankInfo = []
        let count = reader.readUInt()
        for (let i = 1; i <= count; i++) {
            let t: any = {}
            t.roleid = reader.readUInt()            //角色的ID
            t.body = reader.readUInt()              //角色头像
            t.rolename = reader.readString()    //角色的名字
            t.attackhp = reader.readUInt()          //角色的伤害
            JsUtil.arrayInstert(this.rankInfo, t)
        }
        //		t.roleid = 0           //角色的ID
        //		t.body = 18000             //角色头像
        //		t.rolename = "asa"   //角色的名字
        //		t.attackhp = 10000          //角色的伤害
        //		JsUtil.arrayInstert(this.rankInfo,t)
    }

    //开始打强化师
}

class Message_C2G_UNIONMTX_TEACHER_FIGHT extends MessageBase {
    public initObj(...args: any[]): void {
        this.isdump = true
    }
    pack(writer) {
    }
    unpack(reader) {
    }

    //开始打boss
}

class Message_C2G_UNIONMTX_BOSS_FIGHT extends MessageBase {
    public initObj(...args: any[]): void {
        this.isdump = true
    }
    pack(writer) {
    }
    unpack(reader) {
    }

    //注册通知
}

class Message_C2G_UNIONMTX_REGISTER extends MessageBase {
    public initObj(...args: any[]): void {
        this.isdump = true
    }
    pack(writer) {
    }
    unpack(reader) {
    }

    //取消通知
}

class Message_C2G_UNIONMTX_UNREGISTER extends MessageBase {
    public initObj(...args: any[]): void {
        this.isdump = true
    }
    pack(writer) {
    }
    unpack(reader) {
    }

    //提升福利机器
}

class Message_C2G_UNIONMTX_PROMOTE_MCH extends MessageBase {
    public initObj(...args: any[]): void {
        this.isdump = true
    }
    pack(writer) {
    }
    unpack(reader) {
    }

    //福利机器返回
}

class Message_G2C_UNIONMTX_PROMOTE_MCH extends MessageBase {
    code
    public initObj(...args: any[]): void {
        this.code = 0
        this.isdump = true
    }
    pack(writer) {
    }
    unpack(reader) {
        this.code = reader.readUInt()
    }

    //查询福利机器
}

class Message_C2G_UNIONMTX_QUERY_MCH extends MessageBase {
    public initObj(...args: any[]): void {
        this.isdump = true
    }
    pack(writer) {
    }
    unpack(reader) {
    }

    //查询福利机器返回
}

class Message_G2C_UNIONMTX_QUERY_MCH extends MessageBase {
    machineInfo
    public initObj(...args: any[]): void {
        this.machineInfo = null
        this.isdump = true
    }
    pack(writer) {
    }
    unpack(reader) {
        this.machineInfo = {}
        let t: any = {}
        t.level = reader.readUInt()       //等级
        t.curgold = reader.readUInt()            //当前拥有晶石
        this.machineInfo = t
    }

    //查询全服排名
}

class Message_C2G_UNIONMTX_QUERY_SRANK extends MessageBase {
    public initObj(...args: any[]): void {
        this.isdump = true
    }
    pack(writer) {
    }
    unpack(reader) {
    }

    //全服排名返回
}

class Message_G2C_UNIONMTX_QUERY_SRANK extends MessageBase {
    unionRank
    public initObj(...args: any[]): void {
        this.unionRank = null
        this.isdump = true
    }
    pack(writer) {
    }
    unpack(reader) {
        this.unionRank = []
        let count = reader.readUShort()
        for (let i = 1; i <= count; i++) {
            let t: any = {}
            t.fationList = []
            t.unionid = reader.readUInt()                       //联盟ID
            t.attackhp = reader.readString()                      //总伤害
            t.hightattackid = reader.readUInt()                  //最高伤害id
            t.hightattackname = reader.readString()          //最高伤害名字
            t.num = reader.readUShort()                            //联盟内军团数
            for (let i = 1; i <= t.num, 1; i++) {
                let s: any = {}
                s.factionid = reader.readUInt()                       //军团ID
                s.factionicon = reader.readUInt()                       //军团头像
                s.factionname = reader.readString()               //军团名字
                JsUtil.arrayInstert(t.fationList, s)
            }
            JsUtil.arrayInstert(this.unionRank, t)
        }
        //  this.unionRank = {}
        //	for(let i = 1; i <= 7,1;i++){ 
        //		let t:any = {}
        //		t.fationList = {}
        //		t.unionid = 10                       //联盟ID
        //		t.attackhp = 1000                      //总伤害
        //		t.hightattackid = 0                 //最高伤害id
        //		t.hightattackname = "as"          //最高伤害名字
        //		t.num = 2
        //		for(let i = 1; i <= 3,1;i++){	
        //			let s:any = {}
        //		  s.factionid = 1                       //军团ID
        //		  s.factionicon = 2                     //军团头像
        //		  s.factionname = "awsassa"               //军团名字
        //			JsUtil.arrayInstert(t.fationList,s)
        //		}
        //		JsUtil.arrayInstert(this.unionRank,t)
        //	}
    }
    //////////////////////////-军团联盟PVE }//////////////////////////////////////////

    //////////////////////////-军团集体任务////////////////////////////////////////-
    //申请军团道具类任务
}

class Message_C2G_FACTION_ITEM_TASK_REQUEST extends MessageBase {
    public initObj(...args: any[]): void {
        this.isdump = true
    }
    pack(writer) {

    }
    unpack(reader) {

    }

    //申请军团道具类返回
}

class Message_G2C_FACTION_ITEM_TASK_REQUEST extends MessageBase {
    coolDown
    cancelDiamond
    sumCount
    myCount
    public initObj(...args: any[]): void {
        this.coolDown = 0						//冻结时间
        this.cancelDiamond = 0			//取消任务所需晶石
        this.sumCount = 0						//军团总次数
        this.myCount = 0						//自己完成次数

        this.isdump = true
    }
    pack(writer) {

    }
    unpack(reader) {
        this.coolDown = reader.readUInt()
        this.cancelDiamond = reader.readUInt()
        this.sumCount = reader.readUInt()
        this.myCount = reader.readUInt()
    }

    //申请军团任务排行
}

class Message_C2G_FACTION_TASK_COUNT_RANK extends MessageBase {
    public initObj(...args: any[]): void {
        this.isdump = true
    }
    pack(writer) {

    }
    unpack(reader) {

    }

    //申请军团返回排行
}

class Message_G2C_FACTION_TASK_COUNT_RANK extends MessageBase {
    rankList
    public initObj(...args: any[]): void {
        this.rankList = []
        this.isdump = true
    }
    pack(writer) {

    }
    unpack(reader) {
        let list: any = []
        let count = reader.readUInt()

        for (let i = 1; i <= count; i++) {
            let t: any = {}
            t.id = reader.readUInt()
            t.name = reader.readString()
            t.level = reader.readUShort()
            t.body = reader.readUShort()
            t.tCount = reader.readUInt()

            JsUtil.arrayInstert(list, t)
        }

        this.rankList = list
    }

    ////////////////////////////////-军团红包////////////////////////////////
    //查询红包列表
}

class Message_C2G_RED_ENVELOPE_LIST extends MessageBase {
    public initObj(...args: any[]): void {

    }
    pack(writer) {

    }
    unpack(reader) {

    }
    //查询红包列表返回
}

class Message_G2C_RED_ENVELOPE_LIST extends MessageBase {
    list
    public initObj(...args: any[]): void {
        this.list = null
    }
    pack(writer) {

    }
    unpack(reader) {
        this.list = []
        let count = reader.readUInt()
        for (let i = 1; i <= count; i++) {
            let info = table_load(reader.readString())
            JsUtil.arrayInstert(this.list, info)
        }
    }
    //查询领红包记录
}

class Message_C2G_RED_ENVELOPE_RECORD extends MessageBase {
    public initObj(...args: any[]): void {

    }
    pack(writer) {

    }
    unpack(reader) {

    }
    //查询领红包记录返回
}

class Message_G2C_RED_ENVELOPE_RECORD extends MessageBase {
    list
    public initObj(...args: any[]): void {
        this.list = null
    }
    pack(writer) {

    }
    unpack(reader) {
        this.list = []
        let count = reader.readUInt()
        for (let i = 1; i <= count; i++) {
            let info = table_load(reader.readString())
            JsUtil.arrayInstert(this.list, info)
        }
    }
    //发红包
}

class Message_C2G_RED_ENVELOPE_SEND extends MessageBase {
    rmbNum
    public initObj(...args: any[]): void {
        this.rmbNum = null
    }
    pack(writer) {
        writer.writeUInt(this.rmbNum)
    }
    unpack(reader) {

    }
    //抢红包
}

class Message_C2G_RED_ENVELOPE_GET extends MessageBase {
    uid
    public initObj(...args: any[]): void {
        this.uid = null
    }
    pack(writer) {
        writer.writeUInt(this.uid)
    }
    unpack(reader) {

    }
    ////////////////////////////////-军团红包 }////////////////////////////////

    //设置公会战自动报名
}

class Message_C2G_FACTIONWAR_AUTO_APPLY extends MessageBase {
    autoStatus
    public initObj(...args: any[]): void {
        this.autoStatus = 0
    }
    pack(writer) {
        writer.writeUChar(this.autoStatus)
    }
    unpack(reader) {

    }

    //公会战自动报名返回
}

class Message_G2C_FACTIONWAR_AUTO_APPLY extends MessageBase {
    autoStatus
    public initObj(...args: any[]): void {
        this.autoStatus = 0
    }
    pack(writer) {

    }
    unpack(reader) {
        this.autoStatus = reader.readUChar()
    }
}


//////////////////////////公会任务//////////////////////////-

//请求积分排行
class Message_C2G_FACTION_TASK_POINT_RANK extends MessageBase{
public initObj(...args:any[]):void {
	
}
pack( writer){
	
}
unpack( reader){
	
}

//积分排行返回
}

class Message_G2C_FACTION_TASK_POINT_RANK extends MessageBase{
    rankList
    myRank
public initObj(...args:any[]):void {
	this.rankList = {}
	this.myRank = 0
}
pack( writer){
	
}
unpack( reader){
	let count = reader.readUChar()
	this.rankList = []
	for(let i = 1; i <=  count;i++){
		let t:any = {}
		t.rankIndex = reader.readUInt()
		t.playerId = reader.readUInt()
		t.playerName = reader.readString()
		t.playerPro = reader.readUInt()
		t.playerSex = reader.readUChar()
		t.historyPoint = reader.readUInt()
		t.todayPoint = reader.readUInt()

		JsUtil.arrayInstert(this.rankList, t)
	}
	this.myRank = reader.readUInt()
}

//任务单条
}

class Message_C2G_FACTION_TASK_INFO_UPDATA extends MessageBase{
public initObj(...args:any[]):void {

}
pack( writer){

}
unpack( reader){

}

//任务单条更新
}

class Message_G2C_FACTION_TASK_INFO_UPDATA extends MessageBase{
    taskInfo
    todayPoint
    historyPoint
    clubWeekPoint
public initObj(...args:any[]):void {
	this.taskInfo = {}
	this.todayPoint = 0
	this.historyPoint = 0
	//this.clubPoint = 0
	this.clubWeekPoint = 0
}
pack( writer){

}
unpack( reader){
	this.taskInfo = {}
	this.taskInfo.taskIndex = reader.readUInt()//index
	this.taskInfo.process = reader.readUInt()//进度
	this.taskInfo.target = reader.readUInt()//目标
	this.taskInfo.isFinish = reader.readUChar()//完成标识
	this.taskInfo.isGet = reader.readUChar()//领取标识
	this.taskInfo.isGroup = reader.readUChar()//0个人1集体
	this.todayPoint = reader.readUShort()//当天积分
	this.historyPoint = reader.readUInt()//个人历史积分
	//this.clubPoint = reader.readUInt()//公会总积分
	this.clubWeekPoint = reader.readUInt()//公会周积分
}

//公会任务列表
}

class Message_C2G_FACTION_TASK_INFO_LIST extends MessageBase{
    isGroup
public initObj(...args:any[]):void {
	this.isGroup = 0 //0个人 1集体
}
pack( writer){
	writer.writeUInt(this.isGroup)
}
unpack( reader){
	
}

//公会任务列表
}

class Message_G2C_FACTION_TASK_INFO_LIST extends MessageBase{
    taskList
    todayPoint
    historyPoint
    clubWeekPoint
    
public initObj(...args:any[]):void {
	this.taskList = {}
	this.todayPoint = 0
	this.historyPoint = 0
	//this.clubPoint = 0
	this.clubWeekPoint = 0
}
pack( writer){

}
unpack( reader){
	this.taskList = []
	let count = reader.readUInt()
	for(let i = 1; i <=  count;i++){
		let t:any = {}
		t.taskIndex = reader.readUInt()//index
		t.process = reader.readUInt()//进度
		t.target = reader.readUInt()//目标
		t.isFinish = reader.readUChar()//完成标识
		t.isGet = reader.readUChar()//领取标识
		t.isGroup = reader.readUChar()//0个人1集体

		JsUtil.arrayInstert(this.taskList, t)
	}
	this.todayPoint = reader.readUShort()//当天积分
	this.historyPoint = reader.readUInt()//个人历史积分
	//this.clubPoint = reader.readUInt()//公会总积分
	this.clubWeekPoint = reader.readUInt()//公会周积分
}

//领取积分
}

class Message_C2G_FACTION_TASK_GET_POINT extends MessageBase{
    taskIndex
    choose
public initObj(...args:any[]):void {
	this.taskIndex = 0
	this.choose = 0
}
pack( writer){
	writer.writeUInt(this.taskIndex)
	writer.writeUChar(this.choose)
}
unpack( reader){
	
}

//领取积分奖励
}

class Message_C2G_FACTION_TASK_POINT_PRIZE extends MessageBase{
    prizeIndex
public initObj(...args:any[]):void {
	this.prizeIndex = 0
}
pack( writer){
	writer.writeUInt(this.prizeIndex)
}
unpack( reader){
	
}

//进入藏宝阁
}

// class Message_C2G_FACTION_ENTER_TREA_HOUSE extends MessageBase{
// public initObj(...args:any[]):void {

// }
// pack( writer){

// }
// unpack( reader){
	
// }

// //藏宝阁列表
// }

// class Message_G2C_FACTION_TREASURE_LIST extends MessageBase{
//     treasureList
// public initObj(...args:any[]):void {
// 	this.treasureList = {}
// }
// pack( writer){

// }
// unpack( reader){
// 	this.treasureList = []
// 	let count = reader.readUShort()
// 	for(let i = 1; i <=  count;i++){
// 		let t:any = {}
// 		t.itemEntryId = reader.readUInt()
// 		t.count = reader.readUShort()

// 		JsUtil.arrayInstert(this.treasureList, t)
// 	}	
// }

// //藏宝阁分配记录
// }

class Message_C2G_FACTION_TREA_HOUSE_RECORD extends MessageBase{
public initObj(...args:any[]):void {

}
pack( writer){

}
unpack( reader){
	
}

//藏宝阁分配记录返回
}

class Message_G2C_FACTION_TREA_HOUSE_RECORD extends MessageBase{
    recordList
public initObj(...args:any[]):void {
	this.recordList = {}
}
pack( writer){

}
unpack( reader){
	this.recordList = []
	let count = reader.readUChar()
	for(let i = 1; i <=  count;i++){
		let t:any = {}
		t[1] = reader.readString() 
		t[2] = reader.readUInt()
		t[3] = reader.readUShort()
		t[4] = reader.readUInt()

		JsUtil.arrayInstert(this.recordList, t)
	}
}

//藏宝阁分配奖励
}

class Message_C2G_FACTION_TREA_HOUSE_ALLOCA extends MessageBase{
    itemId
    menberId
    count
public initObj(...args:any[]):void {
	this.itemId = 0
	this.menberId = 0
	this.count = 0
}
pack( writer){
	writer.writeUInt(this.itemId)
	writer.writeUInt(this.menberId)
	writer.writeUShort(this.count)
}
unpack( reader){
	
}

//本周累计积分
}

class Message_C2G_FACTION_TASK_RANK_INFO extends MessageBase{
public initObj(...args:any[]):void {

}
pack( writer){

}
unpack( reader){
	
}

//本周累计积分返回
}

class Message_G2C_FACTION_TASK_RANK_INFO extends MessageBase{
    facWeekPoint
    firstFacName
public initObj(...args:any[]):void {
	this.facWeekPoint = 0
	this.firstFacName = ""
}
pack( writer){

}
unpack( reader){
	this.facWeekPoint = reader.readUInt()
	this.firstFacName = reader.readString()
}

}


//公会任务结算排行
class Message_C2G_FACTION_TASK_RANK_PRIZE extends MessageBase{
public initObj(...args:any[]):void {

}
pack( writer){

}
unpack( reader){
	
}

//公会任务结算排行
}

class Message_G2C_FACTION_TASK_RANK_PRIZE extends MessageBase{
    rankResultList:any[]
public initObj(...args:any[]):void {
	this.rankResultList = []
}
pack( writer){

}
unpack( reader){
	this.rankResultList = []
	let count = reader.readUShort()
	for(let i = 1; i <=  count;i++){
		let t:any = {}
		t.rankIndex = reader.readUChar()
		t.clubId = reader.readUInt()
		JsUtil.arrayInstert(this.rankResultList, t)
	}
}

}