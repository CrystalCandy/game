var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//////////////////////////////////////////////////////////////////-
//发送聊天
var Message_C2G_CHANNEL_SEND = (function (_super) {
    __extends(Message_C2G_CHANNEL_SEND, _super);
    function Message_C2G_CHANNEL_SEND() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_CHANNEL_SEND.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.channel = 0;
        this.data = "";
        this.name = "";
        this.groupId = 0;
    };
    Message_C2G_CHANNEL_SEND.prototype.pack = function (writer) {
        writer.writeUChar(this.channel);
        writer.writeString(this.data);
        if (this.channel == channelType.CHAT) {
            writer.writeUInt(this.name);
        }
        else if (this.channel == channelType.GROUP) {
            writer.writeUInt(Math.abs(this.groupId)); //客户端的讨论组id为负值
        }
    };
    Message_C2G_CHANNEL_SEND.prototype.unpack = function (reader) {
    };
    return Message_C2G_CHANNEL_SEND;
}(MessageBase));
__reflect(Message_C2G_CHANNEL_SEND.prototype, "Message_C2G_CHANNEL_SEND");
var ChannelMsgPacket = (function (_super) {
    __extends(ChannelMsgPacket, _super);
    function ChannelMsgPacket() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChannelMsgPacket.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.roleId = 0; //角色
        this.name = null; //名字
        this.sexId = 0; //性别
        this.channel = 0; //当前频道
        this.data = ""; //聊天信息内容
        this.vocation = 0; //职业entryId
        this.icon = "";
        //组队
        //this.type			= 0
        //this.teamInfo = null
        //this.count		= 0
        //this.school		= 0
        //this.level		= 0
    };
    ChannelMsgPacket.prototype.read = function (reader) {
        _super.prototype.read.call(this, reader);
        this.roleId = this.id;
    };
    return ChannelMsgPacket;
}(RoleInfo));
__reflect(ChannelMsgPacket.prototype, "ChannelMsgPacket");
var Message_G2C_CHANNEL_SEND = (function (_super) {
    __extends(Message_G2C_CHANNEL_SEND, _super);
    function Message_G2C_CHANNEL_SEND() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_CHANNEL_SEND.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.packet = null;
    };
    Message_G2C_CHANNEL_SEND.prototype.pack = function (writer) {
    };
    Message_G2C_CHANNEL_SEND.prototype.unpack = function (reader) {
        this.packet = ChannelMsgPacket.newObj();
        this.packet.roleId = reader.readUInt(); //ID
        this.packet.name = reader.readString(); //名字
        this.packet.vocation = reader.readUInt(); //职业
        this.packet.sexId = reader.readUChar(); //性别
        this.packet.VipLevel = reader.readUChar(); //Vip等级
        this.packet.icon = reader.readString(); //头像
        this.packet.channel = reader.readUChar();
        this.packet.data = reader.readString() || "";
        this.packet.serverID = reader.readUInt() || 0;
        this.packet.chatBubbleType = reader.readUChar();
        //this.packet.factionID = reader.readUInt()
    };
    return Message_G2C_CHANNEL_SEND;
}(MessageBase));
__reflect(Message_G2C_CHANNEL_SEND.prototype, "Message_G2C_CHANNEL_SEND");
//设置聊天气泡
var Message_C2G_CHANNEL_WINDOW_TYPE = (function (_super) {
    __extends(Message_C2G_CHANNEL_WINDOW_TYPE, _super);
    function Message_C2G_CHANNEL_WINDOW_TYPE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_CHANNEL_WINDOW_TYPE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.chatBubbleType = 0;
    };
    Message_C2G_CHANNEL_WINDOW_TYPE.prototype.pack = function (writer) {
        writer.writeUChar(this.chatBubbleType);
    };
    Message_C2G_CHANNEL_WINDOW_TYPE.prototype.unpack = function (reader) {
    };
    return Message_C2G_CHANNEL_WINDOW_TYPE;
}(MessageBase));
__reflect(Message_C2G_CHANNEL_WINDOW_TYPE.prototype, "Message_C2G_CHANNEL_WINDOW_TYPE");
//已解锁聊天气泡
var Message_G2C_ROLE_CHAT_WINDOW_LIST = (function (_super) {
    __extends(Message_G2C_ROLE_CHAT_WINDOW_LIST, _super);
    function Message_G2C_ROLE_CHAT_WINDOW_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_CHAT_WINDOW_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.chatBubbleList = {};
    };
    Message_G2C_ROLE_CHAT_WINDOW_LIST.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_CHAT_WINDOW_LIST.prototype.unpack = function (reader) {
        this.chatBubbleList = table_load(reader.readString());
    };
    return Message_G2C_ROLE_CHAT_WINDOW_LIST;
}(MessageBase));
__reflect(Message_G2C_ROLE_CHAT_WINDOW_LIST.prototype, "Message_G2C_ROLE_CHAT_WINDOW_LIST");
//申请查看玩家信息
var Message_C2G_CHANNEL_PLAYER = (function (_super) {
    __extends(Message_C2G_CHANNEL_PLAYER, _super);
    function Message_C2G_CHANNEL_PLAYER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_CHANNEL_PLAYER.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.playerId = 0;
    };
    Message_C2G_CHANNEL_PLAYER.prototype.pack = function (writer) {
        writer.writeUInt(this.playerId);
    };
    Message_C2G_CHANNEL_PLAYER.prototype.unpack = function (reader) {
    };
    return Message_C2G_CHANNEL_PLAYER;
}(MessageBase));
__reflect(Message_C2G_CHANNEL_PLAYER.prototype, "Message_C2G_CHANNEL_PLAYER");
var Message_G2C_CHANNEL_PLAYER = (function (_super) {
    __extends(Message_G2C_CHANNEL_PLAYER, _super);
    function Message_G2C_CHANNEL_PLAYER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_CHANNEL_PLAYER.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.playerInfo = {};
    };
    Message_G2C_CHANNEL_PLAYER.prototype.pack = function (writer) {
    };
    Message_G2C_CHANNEL_PLAYER.prototype.unpack = function (reader) {
        var playerInfo = {};
        playerInfo.id = reader.readUInt();
        if (playerInfo.id != 0) {
            playerInfo.school = reader.readUShort();
            playerInfo.sex = reader.readUShort();
            playerInfo.name = reader.readString();
            playerInfo.level = reader.readUInt();
            playerInfo.body = reader.readUInt();
            playerInfo.faction = reader.readString();
            this.playerInfo = playerInfo;
        }
    };
    return Message_G2C_CHANNEL_PLAYER;
}(MessageBase));
__reflect(Message_G2C_CHANNEL_PLAYER.prototype, "Message_G2C_CHANNEL_PLAYER");
var Message_G2C_CHANNEL_SYSTEM = (function (_super) {
    __extends(Message_G2C_CHANNEL_SYSTEM, _super);
    function Message_G2C_CHANNEL_SYSTEM() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_CHANNEL_SYSTEM.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.sysType = 0;
        this.content = "";
        this.isborad = 0;
    };
    Message_G2C_CHANNEL_SYSTEM.prototype.pack = function (writer) {
    };
    Message_G2C_CHANNEL_SYSTEM.prototype.unpack = function (reader) {
        this.isborad = reader.readChar(); //是否滚屏     0否 1是
        this.sysType = reader.readChar(); //是否系统频道 0否 1是
        this.content = reader.readString();
    };
    return Message_G2C_CHANNEL_SYSTEM;
}(MessageBase));
__reflect(Message_G2C_CHANNEL_SYSTEM.prototype, "Message_G2C_CHANNEL_SYSTEM");
var Message_C2G_CHANNEL_PET_ITEM = (function (_super) {
    __extends(Message_C2G_CHANNEL_PET_ITEM, _super);
    function Message_C2G_CHANNEL_PET_ITEM() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_CHANNEL_PET_ITEM.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.playerId = null;
        this.rage = null;
        this.uId = null;
    };
    Message_C2G_CHANNEL_PET_ITEM.prototype.pack = function (writer) {
        writer.writeUInt(this.playerId);
        writer.writeUInt(this.rage);
        writer.writeUInt(this.uId);
    };
    Message_C2G_CHANNEL_PET_ITEM.prototype.unpack = function (reader) {
    };
    return Message_C2G_CHANNEL_PET_ITEM;
}(MessageBase));
__reflect(Message_C2G_CHANNEL_PET_ITEM.prototype, "Message_C2G_CHANNEL_PET_ITEM");
// class Message_G2C_CHANNEL_PET_ITEM extends MessageBase {
// 	info
// 	rage
// 	roleId
// 	public initObj(...args: any[]): void {
// 		this.rage = 0
// 		this.info = null
// 		this.roleId = 0
// 	}
// 	pack(writer) {
// 	}
// 	unpack(reader) {
// 		this.rage = 0
// 		this.info = null
// 		this.rage = reader.readUShort()
// 		this.roleId = reader.readUInt()
// 		if (this.rage == 1) {											//宠物
// 			let petInfo = PetInfo.newObj()
// 			petInfo.read(reader)
// 			//读取装备
// 			let equipMsg = Message_G2C_EQUIP_LIST.newObj()
// 			equipMsg.unpack(reader)
// 			//设置装备
// 			ResetActorEquip(petInfo)
// 			for (let _ = 0; _ < equipMsg.equipInfoList.length; _++) {
// 				let info = equipMsg.equipInfoList[_]
// 				//物品列表
// 				for (let index = 0; index < info.itemList.length; index++) {
// 					let itemInfo = info.itemList[index]
// 					if (itemInfo.store == storeOptions.PETITEM) {
// 						let item = Item.newObj(itemInfo)
// 						SetActorEquip(petInfo, item)
// 					}
// 				}
// 			}
// 			this.info = petInfo
// 		} else if (this.rage == 2) {									//物品
// 			let itemInfo = ItemInfo.newObj()
// 			itemInfo.read(reader)
// 			this.info = itemInfo
// 		}
// 	}
// }
// 	//语音////////////////////////-
var Message_C2G_CHANNEL_VOICE = (function (_super) {
    __extends(Message_C2G_CHANNEL_VOICE, _super);
    function Message_C2G_CHANNEL_VOICE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_CHANNEL_VOICE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.channel = null;
        this.roleId = null;
        this.recordBuffer = null;
        this.recordSize = null;
        this.recordTime = null;
    };
    Message_C2G_CHANNEL_VOICE.prototype.pack = function (writer) {
        writer.writeUChar(this.channel);
        writer.writeUShort(this.recordSize);
        writer.writeRawData(this.recordBuffer, this.recordSize);
        writer.writeUInt(this.recordTime);
        writer.writeUInt(this.roleId);
    };
    Message_C2G_CHANNEL_VOICE.prototype.unpack = function (reader) {
    };
    return Message_C2G_CHANNEL_VOICE;
}(MessageBase));
__reflect(Message_C2G_CHANNEL_VOICE.prototype, "Message_C2G_CHANNEL_VOICE");
var Message_G2C_CHANNEL_VOICE = (function (_super) {
    __extends(Message_G2C_CHANNEL_VOICE, _super);
    function Message_G2C_CHANNEL_VOICE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_CHANNEL_VOICE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = null;
        this.name = null;
        this.body = null;
        this.VipLevel = null;
        this.size = null;
        this.buf = null;
        this.channel = null;
        this.recordTime = null;
        this.roleInfo = null;
        this.factionID = null;
    };
    Message_G2C_CHANNEL_VOICE.prototype.pack = function (writer) {
    };
    Message_G2C_CHANNEL_VOICE.prototype.unpack = function (reader) {
        // this.roleInfo = RoleInfo.newObj()
        // this.roleInfo.read(reader)
        // this.id, this.name, this.vocation, this.VIPlevel, this.sexId = this.roleInfo.getRoleInfo()
        // this.channel = reader.readUChar()
        // this.size = reader.readUShort()
        // this.buf = Core.IAllocator.instance.Alloc(this.size, 0) //生成缓冲,主要接受的时候要析构
        // reader.readRawData(this.buf, this.size)
        // this.recordTime = reader.readUInt()
        // this.factionID = reader.readUInt()
    };
    return Message_G2C_CHANNEL_VOICE;
}(MessageBase));
__reflect(Message_G2C_CHANNEL_VOICE.prototype, "Message_G2C_CHANNEL_VOICE");
var Message_G2C_CHANNEL_VOICE_UID = (function (_super) {
    __extends(Message_G2C_CHANNEL_VOICE_UID, _super);
    function Message_G2C_CHANNEL_VOICE_UID() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_CHANNEL_VOICE_UID.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = null;
        this.name = null;
        this.body = null;
        this.VipLevel = null;
        this.channel = null;
        this.recordTime = null;
        this.voiceID = null;
    };
    Message_G2C_CHANNEL_VOICE_UID.prototype.pack = function (writer) {
    };
    Message_G2C_CHANNEL_VOICE_UID.prototype.unpack = function (reader) {
        // let roleInfo = RoleInfo.newObj()
        // roleInfo.read(reader)
        // this.id, this.name, this.vocation, this.VipLevel, this.sexId = roleInfo.getRoleInfo()
        // this.channel = reader.readUChar()
        // this.voiceID = reader.readUInt()
        // this.recordTime = reader.readUInt()
    };
    return Message_G2C_CHANNEL_VOICE_UID;
}(MessageBase));
__reflect(Message_G2C_CHANNEL_VOICE_UID.prototype, "Message_G2C_CHANNEL_VOICE_UID");
var Message_C2G_CHANNEL_GET_VOICE = (function (_super) {
    __extends(Message_C2G_CHANNEL_GET_VOICE, _super);
    function Message_C2G_CHANNEL_GET_VOICE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_CHANNEL_GET_VOICE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.channel = null;
        this.voiceID = null;
    };
    Message_C2G_CHANNEL_GET_VOICE.prototype.pack = function (writer) {
        writer.writeUInt(this.channel);
        writer.writeUInt(this.voiceID);
    };
    Message_C2G_CHANNEL_GET_VOICE.prototype.unpack = function (reader) {
    };
    return Message_C2G_CHANNEL_GET_VOICE;
}(MessageBase));
__reflect(Message_C2G_CHANNEL_GET_VOICE.prototype, "Message_C2G_CHANNEL_GET_VOICE");
var Message_G2C_CHANNEL_GET_VOICE = (function (_super) {
    __extends(Message_G2C_CHANNEL_GET_VOICE, _super);
    function Message_G2C_CHANNEL_GET_VOICE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_CHANNEL_GET_VOICE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.channel = null;
        this.voiceID = null;
    };
    Message_G2C_CHANNEL_GET_VOICE.prototype.pack = function (writer) {
    };
    Message_G2C_CHANNEL_GET_VOICE.prototype.unpack = function (reader) {
        // this.channel = reader.readUInt()
        // this.voiceID = reader.readUInt()
        // this.size = reader.readUShort()
        // this.buf = Core.IAllocator.instance.Alloc(this.size, 0) //生成缓冲,主要接受的时候要析构
        // reader.readRawData(this.buf, this.size)
    };
    return Message_G2C_CHANNEL_GET_VOICE;
}(MessageBase));
__reflect(Message_G2C_CHANNEL_GET_VOICE.prototype, "Message_G2C_CHANNEL_GET_VOICE");
var Message_G2C_QIANGDA_QUESTION = (function (_super) {
    __extends(Message_G2C_QIANGDA_QUESTION, _super);
    function Message_G2C_QIANGDA_QUESTION() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_QIANGDA_QUESTION.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.questionIndex = 0;
    };
    Message_G2C_QIANGDA_QUESTION.prototype.pack = function (writer) {
    };
    Message_G2C_QIANGDA_QUESTION.prototype.unpack = function (reader) {
        this.questionIndex = reader.readUInt();
    };
    return Message_G2C_QIANGDA_QUESTION;
}(MessageBase));
__reflect(Message_G2C_QIANGDA_QUESTION.prototype, "Message_G2C_QIANGDA_QUESTION");
var Message_C2G_CHANNEL_RECARD_SEND = (function (_super) {
    __extends(Message_C2G_CHANNEL_RECARD_SEND, _super);
    function Message_C2G_CHANNEL_RECARD_SEND() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_CHANNEL_RECARD_SEND.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.channelId = 0;
    };
    Message_C2G_CHANNEL_RECARD_SEND.prototype.pack = function (writer) {
        writer.writeUInt(this.channelId);
    };
    Message_C2G_CHANNEL_RECARD_SEND.prototype.unpack = function (reader) {
    };
    return Message_C2G_CHANNEL_RECARD_SEND;
}(MessageBase));
__reflect(Message_C2G_CHANNEL_RECARD_SEND.prototype, "Message_C2G_CHANNEL_RECARD_SEND");
var Message_G2C_CHANNEL_RECARD_SEND = (function (_super) {
    __extends(Message_G2C_CHANNEL_RECARD_SEND, _super);
    function Message_G2C_CHANNEL_RECARD_SEND() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_CHANNEL_RECARD_SEND.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.recordList = [];
    };
    Message_G2C_CHANNEL_RECARD_SEND.prototype.pack = function (writer) {
    };
    Message_G2C_CHANNEL_RECARD_SEND.prototype.unpack = function (reader) {
        this.recordList = [];
        var channel = reader.readUChar();
        var count = reader.readUInt();
        for (var i = 1; i <= count; i++) {
            var packet = ChannelMsgPacket.newObj();
            //let roleInfo = RoleInfo.newObj()
            packet.read(reader);
            //[packet.roleId, packet.name, packet.vocation, packet.VipLevel, this.sexId] = roleInfo.getRoleInfo()
            if (channel == channelType.UNION) {
                packet.factionID = reader.readUInt();
            }
            packet.icon = reader.readString(); //头像
            packet.data = reader.readString() || "";
            packet.serverID = reader.readUInt() || 0;
            packet.chatBubbleType = reader.readUChar();
            packet.offlineChat = true;
            JsUtil.arrayInstert(this.recordList, packet);
        }
        for (var _ = 0; _ < this.recordList.length; _++) {
            var packet = this.recordList[_];
            packet.channel = channel;
        }
    };
    return Message_G2C_CHANNEL_RECARD_SEND;
}(MessageBase));
__reflect(Message_G2C_CHANNEL_RECARD_SEND.prototype, "Message_G2C_CHANNEL_RECARD_SEND");
//# sourceMappingURL=ChatMessage.js.map