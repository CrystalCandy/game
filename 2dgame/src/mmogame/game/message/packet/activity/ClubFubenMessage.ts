
/*
作者:
    yangguiming
	
创建时间：
   2017.02.27(周一)

意图：
   军团副本协议
公共接口：
   
*/



////////////////////////////////////////////////////////////////////////////
//-公会副本的创建
class Message_C2G_FACTIONMAP_CREATE extends MessageBase {
    index: number
    public initObj(...args: any[]): void {
        this.index = 0
    }

    pack(writer) {
        writer.writeUInt(this.index)
    }

    unpack(reader) {

    }
}

////////////////////////////////////////////////////////////////////////////
//-公会副本的创建返回
class Message_G2C_FACTIONMAP_CREATE extends MessageBase {
    index: number
    public initObj(...args: any[]): void {
        this.index = 0
    }

    pack(writer) {

    }

    unpack(reader) {
        this.index = reader.readUInt()
    }
}

////////////////////////////////////////////////////////////////////////////
//-公会副本的进入返回
class Message_C2G_FACTIONMAP_ENTER extends MessageBase {
    index: number
    public initObj(...args: any[]): void {
        this.index = 0
    }

    pack(writer) {
        writer.writeUInt(this.index)
    }

    unpack(reader) {

    }
}

////////////////////////////////////////////////////////////////////////////
//-公会副本的进入返回
class Message_G2C_FACTIONMAP_ENTER extends MessageBase {
    index: number
    public initObj(...args: any[]): void {
        this.index = 0
    }

    pack(writer) {
       
    }

    unpack(reader) {
        this.index = reader.readUInt()
    }
}

////////////////////////////////////////////////////////////////////////////
//-离开公会副本
class Message_C2G_FACTIONMAP_LEAVE extends MessageBase {
    public initObj(...args: any[]): void {

    }

    pack(writer) {

    }

    unpack(reader) {

    }
}

////////////////////////////////////////////////////////////////////////////
//-离开公会副本的返回
class Message_G2C_FACTIONMAP_LEAVE extends MessageBase {
    public initObj(...args: any[]): void {

    }

    pack(writer) {

    }

    unpack(reader) {

    }
}

////////////////////////////////////////////////////////////////////////////
//-公会副本战斗
class Message_C2G_FACTIONMAP_FIGHT extends MessageBase {
    npcId: number
    public initObj(...args: any[]): void {
        this.npcId = 0
    }

    pack(writer) {
        writer.writeUInt(this.npcId)
    }

    unpack(reader) {

    }
}

////////////////////////////////////////////////////////////////////////////
//-查询当前开启状态
class Message_C2G_FACTIONMAP_QUERY extends MessageBase {
    public initObj(...args: any[]): void {

    }

    pack(writer) {

    }

    unpack(reader) {

    }
}

////////////////////////////////////////////////////////////////////////////
//-查询当前开启状态返回
class Message_G2C_FACTIONMAP_QUERY extends MessageBase {
    queryInfo: any
    public initObj(...args: any[]): void {
        this.queryInfo = {}
    }

    pack(writer) {

    }

    unpack(reader) {
        this.queryInfo.index = reader.readUInt()
        if (this.queryInfo.index != 0) {
            this.queryInfo.stage = reader.readUInt() //当前阶段
            this.queryInfo.killCount = reader.readUInt()		//当前阶段自己击杀数
            this.queryInfo.stageFinishTime = reader.readUInt()  //当前阶段剩余时间(自1970年)
            this.queryInfo.allKillCount = reader.readUInt()			//当前阶段公会击杀总数
            this.queryInfo.bossDisappearTime = reader.readUInt()			//哥布林消失时间
            this.queryInfo.bossKillCount = reader.readUInt()			//哥布林击杀数
            this.queryInfo.bossStatus = reader.readUChar()			//当前哥布林状态 1战斗 1空闲
        }
    }
}

////////////////////////////////////////////////////////////////////////////
//-军团死亡时候快速复活
class Message_C2G_FACTIONMAP_REVIVE extends MessageBase {
    public initObj(...args: any[]): void {

    }

    pack(writer) {

    }

    unpack(reader) {

    }
}

////////////////////////////////////////////////////////////////////////////
//-军团全服排名申请
class Message_C2G_FACTIONMAP_RANKDATA extends MessageBase {
    public initObj(...args: any[]): void {

    }

    pack(writer) {

    }

    unpack(reader) {

    }
}

////////////////////////////////////////////////////////////////////////////
//-军团全服排名申请
class Message_G2C_FACTIONMAP_RANKDATA extends MessageBase {
    list: any
    public initObj(...args: any[]): void {
        this.list = {}
    }

    pack(writer) {

    }

    unpack(reader) {
        let count = reader.readUInt()

        for (let i = 1; i <= count; i++) {
            let list: any = {}
            list.index = reader.readUInt()
            list.time = reader.readUInt()
            list.useTime = reader.readUInt()
            list.legionId = reader.readUInt()
            list.legionIcon = reader.readUInt()
            list.name = reader.readString()
            this.list[i] = list
        }
    }
}

//接收组内事件(军团副本的开启，军团BOSS被击杀)
class Message_G2C_GLOBAL_GROUP_EVENT extends MessageBase {
    event: any
    data: any
    public initObj(...args: any[]): void {
        this.event = null
        this.data = {}
        this.fireEvent = true
    }

    pack(writer) {

    }

    unpack(reader) {
        this.event = reader.readUInt()
        this.data = table_load(reader.readString())

    }
}