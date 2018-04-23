/*
作者:
    yangguiming
    
创建时间：
   2017.2.12(周日)

意图：
   

公共接口：
   
*/
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
var Message_C2G_PET_USEITEM = (function (_super) {
    __extends(Message_C2G_PET_USEITEM, _super);
    function Message_C2G_PET_USEITEM() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_PET_USEITEM.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petId = 0;
        this.itemId = 0;
        this.count = 0;
    };
    Message_C2G_PET_USEITEM.prototype.pack = function (writer) {
        writer.writeUInt(this.petId);
        writer.writeUInt(this.itemId);
        writer.writeUInt(this.count);
    };
    Message_C2G_PET_USEITEM.prototype.unpack = function (reader) {
    };
    return Message_C2G_PET_USEITEM;
}(MessageBase));
__reflect(Message_C2G_PET_USEITEM.prototype, "Message_C2G_PET_USEITEM");
var Message_G2C_PET_UPDATE = (function (_super) {
    __extends(Message_G2C_PET_UPDATE, _super);
    function Message_G2C_PET_UPDATE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_PET_UPDATE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petInfo = null;
    };
    Message_G2C_PET_UPDATE.prototype.pack = function (writer) {
    };
    Message_G2C_PET_UPDATE.prototype.unpack = function (reader) {
        this.petInfo = PetInfo.newObj();
        this.petInfo.read(reader);
    };
    return Message_G2C_PET_UPDATE;
}(MessageBase));
__reflect(Message_G2C_PET_UPDATE.prototype, "Message_G2C_PET_UPDATE");
//新加一只宠物
var Message_C2G_PET_ADD = (function (_super) {
    __extends(Message_C2G_PET_ADD, _super);
    function Message_C2G_PET_ADD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_PET_ADD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_PET_ADD.prototype.pack = function (writer) {
    };
    Message_C2G_PET_ADD.prototype.unpack = function (reader) {
    };
    return Message_C2G_PET_ADD;
}(MessageBase));
__reflect(Message_C2G_PET_ADD.prototype, "Message_C2G_PET_ADD");
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
var Message_C2G_PET_SOUL_FETE = (function (_super) {
    __extends(Message_C2G_PET_SOUL_FETE, _super);
    function Message_C2G_PET_SOUL_FETE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_PET_SOUL_FETE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petId = null;
        this.itemList = {};
    };
    Message_C2G_PET_SOUL_FETE.prototype.pack = function (writer) {
        writer.writeUInt(this.petId);
        writer.writeString(table_save(this.itemList));
    };
    Message_C2G_PET_SOUL_FETE.prototype.unpack = function (reader) {
    };
    return Message_C2G_PET_SOUL_FETE;
}(MessageBase));
__reflect(Message_C2G_PET_SOUL_FETE.prototype, "Message_C2G_PET_SOUL_FETE");
//鲜血契约，绑定宠物，发送到服务器
var Message_C2G_PET_BIND = (function (_super) {
    __extends(Message_C2G_PET_BIND, _super);
    function Message_C2G_PET_BIND() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_PET_BIND.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petId = null;
    };
    Message_C2G_PET_BIND.prototype.pack = function (writer) {
        writer.writeUInt(this.petId);
    };
    Message_C2G_PET_BIND.prototype.unpack = function (reader) {
    };
    return Message_C2G_PET_BIND;
}(MessageBase));
__reflect(Message_C2G_PET_BIND.prototype, "Message_C2G_PET_BIND");
//鲜血契约，绑定宠物，服务器返回
var Message_G2C_PET_BIND = (function (_super) {
    __extends(Message_G2C_PET_BIND, _super);
    function Message_G2C_PET_BIND() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_PET_BIND.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petId = null;
        this.state = null;
    };
    Message_G2C_PET_BIND.prototype.pack = function (writer) {
    };
    Message_G2C_PET_BIND.prototype.unpack = function (reader) {
        this.petId = reader.readUInt();
        this.state = reader.readUInt();
    };
    return Message_G2C_PET_BIND;
}(MessageBase));
__reflect(Message_G2C_PET_BIND.prototype, "Message_G2C_PET_BIND");
//觉醒//-
var Message_C2G_PET_AWAKE = (function (_super) {
    __extends(Message_C2G_PET_AWAKE, _super);
    function Message_C2G_PET_AWAKE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_PET_AWAKE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petentryid = null;
        this.tolevel = null;
        this.itemidlist = null;
    };
    Message_C2G_PET_AWAKE.prototype.pack = function (writer) {
        writer.writeUInt(this.petentryid);
        writer.writeChar(this.tolevel);
        writer.writeChar(this.itemidlist.length);
        for (var _ in this.itemidlist) {
            var v = this.itemidlist[_];
            writer.writeUInt(v);
        }
    };
    Message_C2G_PET_AWAKE.prototype.unpack = function (reader) {
    };
    return Message_C2G_PET_AWAKE;
}(MessageBase));
__reflect(Message_C2G_PET_AWAKE.prototype, "Message_C2G_PET_AWAKE");
//觉醒//-
var Message_G2C_PET_AWAKE = (function (_super) {
    __extends(Message_G2C_PET_AWAKE, _super);
    function Message_G2C_PET_AWAKE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_PET_AWAKE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petentryid = null;
        this.tolevel = null;
        this.code = null;
    };
    Message_G2C_PET_AWAKE.prototype.pack = function (writer) {
    };
    Message_G2C_PET_AWAKE.prototype.unpack = function (reader) {
        this.petentryid = reader.readUInt();
        this.tolevel = reader.readChar();
        this.code = reader.readChar();
    };
    return Message_G2C_PET_AWAKE;
}(MessageBase));
__reflect(Message_G2C_PET_AWAKE.prototype, "Message_G2C_PET_AWAKE");
//突破//-
var Message_C2G_PET_BREAK = (function (_super) {
    __extends(Message_C2G_PET_BREAK, _super);
    function Message_C2G_PET_BREAK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_PET_BREAK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petentryid = null;
        this.tolevel = null;
        this.soulidlist = null;
    };
    Message_C2G_PET_BREAK.prototype.pack = function (writer) {
        writer.writeUInt(this.petentryid);
        writer.writeChar(this.tolevel);
        writer.writeChar(this.soulidlist.length);
        for (var _ in this.soulidlist) {
            var v = this.soulidlist[_];
            writer.writeUShort(v);
        }
    };
    Message_C2G_PET_BREAK.prototype.unpack = function (reader) {
    };
    return Message_C2G_PET_BREAK;
}(MessageBase));
__reflect(Message_C2G_PET_BREAK.prototype, "Message_C2G_PET_BREAK");
//突破//-
var Message_G2C_PET_BREAK = (function (_super) {
    __extends(Message_G2C_PET_BREAK, _super);
    function Message_G2C_PET_BREAK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_PET_BREAK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petentryid = null;
        this.tolevel = null;
        this.code = null;
    };
    Message_G2C_PET_BREAK.prototype.pack = function (writer) {
    };
    Message_G2C_PET_BREAK.prototype.unpack = function (reader) {
        this.petentryid = reader.readUInt();
        this.tolevel = reader.readChar();
        this.code = reader.readChar();
    };
    return Message_G2C_PET_BREAK;
}(MessageBase));
__reflect(Message_G2C_PET_BREAK.prototype, "Message_G2C_PET_BREAK");
//////////////////////////-解锁技能////////////////////////////////////////
var Message_C2G_PET_UPGRADE_SKILL = (function (_super) {
    __extends(Message_C2G_PET_UPGRADE_SKILL, _super);
    function Message_C2G_PET_UPGRADE_SKILL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_PET_UPGRADE_SKILL.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.entryid = null;
        this.skillid = null;
        this.tolevel = null;
    };
    Message_C2G_PET_UPGRADE_SKILL.prototype.pack = function (writer) {
        writer.writeUInt(this.entryid);
        writer.writeUInt(this.skillid);
        writer.writeUShort(this.tolevel);
    };
    Message_C2G_PET_UPGRADE_SKILL.prototype.unpack = function (reader) {
    };
    return Message_C2G_PET_UPGRADE_SKILL;
}(MessageBase));
__reflect(Message_C2G_PET_UPGRADE_SKILL.prototype, "Message_C2G_PET_UPGRADE_SKILL");
//一键技能
var Message_C2G_PET_ONE_KEY_SKILL_UP = (function (_super) {
    __extends(Message_C2G_PET_ONE_KEY_SKILL_UP, _super);
    function Message_C2G_PET_ONE_KEY_SKILL_UP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_PET_ONE_KEY_SKILL_UP.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.skillid = null;
    };
    Message_C2G_PET_ONE_KEY_SKILL_UP.prototype.pack = function (writer) {
        writer.writeUInt(this.entryid);
        writer.writeUInt(this.skillid);
    };
    Message_C2G_PET_ONE_KEY_SKILL_UP.prototype.unpack = function (reader) {
    };
    return Message_C2G_PET_ONE_KEY_SKILL_UP;
}(MessageBase));
__reflect(Message_C2G_PET_ONE_KEY_SKILL_UP.prototype, "Message_C2G_PET_ONE_KEY_SKILL_UP");
var Message_G2C_PET_UPGRADE_SKILL = (function (_super) {
    __extends(Message_G2C_PET_UPGRADE_SKILL, _super);
    function Message_G2C_PET_UPGRADE_SKILL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_PET_UPGRADE_SKILL.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.entryid = null;
        this.skillid = null;
        this.tolevel = null;
        this.code = null;
    };
    Message_G2C_PET_UPGRADE_SKILL.prototype.pack = function (writer) {
    };
    Message_G2C_PET_UPGRADE_SKILL.prototype.unpack = function (reader) {
        this.entryid = reader.readUInt();
        this.skillid = reader.readUInt();
        this.tolevel = reader.readUShort();
        this.code = reader.readUChar();
    };
    return Message_G2C_PET_UPGRADE_SKILL;
}(MessageBase));
__reflect(Message_G2C_PET_UPGRADE_SKILL.prototype, "Message_G2C_PET_UPGRADE_SKILL");
//////////////////////////-植入天赋石////////////////////////////////////////
var Message_C2G_SET_NATRUAL_STONE = (function (_super) {
    __extends(Message_C2G_SET_NATRUAL_STONE, _super);
    function Message_C2G_SET_NATRUAL_STONE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_SET_NATRUAL_STONE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petentryid = null;
        this.stoneentryid = null;
    };
    Message_C2G_SET_NATRUAL_STONE.prototype.pack = function (writer) {
        writer.writeUInt(this.petentryid);
        writer.writeUInt(this.stoneentryid);
    };
    Message_C2G_SET_NATRUAL_STONE.prototype.unpack = function (reader) {
    };
    return Message_C2G_SET_NATRUAL_STONE;
}(MessageBase));
__reflect(Message_C2G_SET_NATRUAL_STONE.prototype, "Message_C2G_SET_NATRUAL_STONE");
var Message_G2C_SET_NATRUAL_STONE = (function (_super) {
    __extends(Message_G2C_SET_NATRUAL_STONE, _super);
    function Message_G2C_SET_NATRUAL_STONE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_SET_NATRUAL_STONE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petentryid = null;
        this.stoneentryid = null;
        this.code = null;
    };
    Message_G2C_SET_NATRUAL_STONE.prototype.pack = function (writer) {
    };
    Message_G2C_SET_NATRUAL_STONE.prototype.unpack = function (reader) {
        this.petentryid = reader.readUInt();
        this.stoneentryid = reader.readUInt();
        this.code = reader.readUChar();
    };
    return Message_G2C_SET_NATRUAL_STONE;
}(MessageBase));
__reflect(Message_G2C_SET_NATRUAL_STONE.prototype, "Message_G2C_SET_NATRUAL_STONE");
//////////////////////////-卸载天赋石////////////////////////////////////////
var Message_C2G_OFF_NATRUAL_STONE = (function (_super) {
    __extends(Message_C2G_OFF_NATRUAL_STONE, _super);
    function Message_C2G_OFF_NATRUAL_STONE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_OFF_NATRUAL_STONE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petentryid = null;
        this.stoneentryid = null;
    };
    Message_C2G_OFF_NATRUAL_STONE.prototype.pack = function (writer) {
        writer.writeUInt(this.petentryid);
        writer.writeUInt(this.stoneentryid);
    };
    Message_C2G_OFF_NATRUAL_STONE.prototype.unpack = function (reader) {
    };
    return Message_C2G_OFF_NATRUAL_STONE;
}(MessageBase));
__reflect(Message_C2G_OFF_NATRUAL_STONE.prototype, "Message_C2G_OFF_NATRUAL_STONE");
var Message_G2C_OFF_NATRUAL_STONE = (function (_super) {
    __extends(Message_G2C_OFF_NATRUAL_STONE, _super);
    function Message_G2C_OFF_NATRUAL_STONE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_OFF_NATRUAL_STONE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petentryid = null;
        this.stoneentryid = null;
        this.code = null;
    };
    Message_G2C_OFF_NATRUAL_STONE.prototype.pack = function (writer) {
    };
    Message_G2C_OFF_NATRUAL_STONE.prototype.unpack = function (reader) {
        this.petentryid = reader.readUInt();
        this.stoneentryid = reader.readUInt();
        this.code = reader.readUChar();
    };
    return Message_G2C_OFF_NATRUAL_STONE;
}(MessageBase));
__reflect(Message_G2C_OFF_NATRUAL_STONE.prototype, "Message_G2C_OFF_NATRUAL_STONE");
var Message_C2G_NATRUAL_STONE_UP = (function (_super) {
    __extends(Message_C2G_NATRUAL_STONE_UP, _super);
    function Message_C2G_NATRUAL_STONE_UP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_NATRUAL_STONE_UP.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petentryid = null;
        this.stoneentryid = null;
        //this.tolevel = null
    };
    Message_C2G_NATRUAL_STONE_UP.prototype.pack = function (writer) {
        writer.writeUInt(this.petentryid);
        writer.writeUInt(this.stoneentryid);
        //writer.writeUChar(this.tolevel)
    };
    Message_C2G_NATRUAL_STONE_UP.prototype.unpack = function (reader) {
    };
    return Message_C2G_NATRUAL_STONE_UP;
}(MessageBase));
__reflect(Message_C2G_NATRUAL_STONE_UP.prototype, "Message_C2G_NATRUAL_STONE_UP");
var Message_G2C_NATRUAL_STONE_UP = (function (_super) {
    __extends(Message_G2C_NATRUAL_STONE_UP, _super);
    function Message_G2C_NATRUAL_STONE_UP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_NATRUAL_STONE_UP.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petentryid = null;
        this.stoneentryid = null;
        //this.tolevel = null
        this.code = null;
    };
    Message_G2C_NATRUAL_STONE_UP.prototype.pack = function (writer) {
    };
    Message_G2C_NATRUAL_STONE_UP.prototype.unpack = function (reader) {
        this.petentryid = reader.readUInt();
        this.stoneentryid = reader.readUInt();
        //this.tolevel = reader.readUChar()
        this.code = reader.readUChar();
    };
    return Message_G2C_NATRUAL_STONE_UP;
}(MessageBase));
__reflect(Message_G2C_NATRUAL_STONE_UP.prototype, "Message_G2C_NATRUAL_STONE_UP");
var Message_C2G_ENTER_PET_RECRUIT_HOOP = (function (_super) {
    __extends(Message_C2G_ENTER_PET_RECRUIT_HOOP, _super);
    function Message_C2G_ENTER_PET_RECRUIT_HOOP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ENTER_PET_RECRUIT_HOOP.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_ENTER_PET_RECRUIT_HOOP.prototype.pack = function (writer) {
    };
    Message_C2G_ENTER_PET_RECRUIT_HOOP.prototype.unpack = function (reader) {
    };
    return Message_C2G_ENTER_PET_RECRUIT_HOOP;
}(MessageBase));
__reflect(Message_C2G_ENTER_PET_RECRUIT_HOOP.prototype, "Message_C2G_ENTER_PET_RECRUIT_HOOP");
//返回
var Message_G2C_ENTER_PET_RECRUIT_HOOP = (function (_super) {
    __extends(Message_G2C_ENTER_PET_RECRUIT_HOOP, _super);
    function Message_G2C_ENTER_PET_RECRUIT_HOOP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ENTER_PET_RECRUIT_HOOP.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.prizeList = {};
        this.discount = 1;
        this.breakLevel = 0;
    };
    Message_G2C_ENTER_PET_RECRUIT_HOOP.prototype.pack = function (writer) {
    };
    Message_G2C_ENTER_PET_RECRUIT_HOOP.prototype.unpack = function (reader) {
        this.prizeList = table_load(reader.readString()); //{{entryId, count, isPet},{entryId, count, isPet},....}   isPet为1代表是伙伴，0是物品
        this.discount = reader.readUInt() / 100;
        this.breakLevel = reader.readUInt();
    };
    return Message_G2C_ENTER_PET_RECRUIT_HOOP;
}(MessageBase));
__reflect(Message_G2C_ENTER_PET_RECRUIT_HOOP.prototype, "Message_G2C_ENTER_PET_RECRUIT_HOOP");
var Message_C2G_PET_RECRUIT_HOOP = (function (_super) {
    __extends(Message_C2G_PET_RECRUIT_HOOP, _super);
    function Message_C2G_PET_RECRUIT_HOOP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_PET_RECRUIT_HOOP.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_PET_RECRUIT_HOOP.prototype.pack = function (writer) {
    };
    Message_C2G_PET_RECRUIT_HOOP.prototype.unpack = function (reader) {
    };
    return Message_C2G_PET_RECRUIT_HOOP;
}(MessageBase));
__reflect(Message_C2G_PET_RECRUIT_HOOP.prototype, "Message_C2G_PET_RECRUIT_HOOP");
////////////////////////已召唤的次数记录//////////////////////////////////////////////////
var Message_C2G_PET_RECRUIT_RECORD_LIST = (function (_super) {
    __extends(Message_C2G_PET_RECRUIT_RECORD_LIST, _super);
    function Message_C2G_PET_RECRUIT_RECORD_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_PET_RECRUIT_RECORD_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_PET_RECRUIT_RECORD_LIST.prototype.pack = function (writer) {
    };
    Message_C2G_PET_RECRUIT_RECORD_LIST.prototype.unpack = function (reader) {
    };
    return Message_C2G_PET_RECRUIT_RECORD_LIST;
}(MessageBase));
__reflect(Message_C2G_PET_RECRUIT_RECORD_LIST.prototype, "Message_C2G_PET_RECRUIT_RECORD_LIST");
var Message_G2C_PET_RECRUIT_RECORD_LIST = (function (_super) {
    __extends(Message_G2C_PET_RECRUIT_RECORD_LIST, _super);
    function Message_G2C_PET_RECRUIT_RECORD_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_PET_RECRUIT_RECORD_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.summonRecord = {};
    };
    Message_G2C_PET_RECRUIT_RECORD_LIST.prototype.pack = function (writer) {
    };
    Message_G2C_PET_RECRUIT_RECORD_LIST.prototype.unpack = function (reader) {
        this.summonRecord = table_load(reader.readString()) || {}; //{[entryId] : count, }
    };
    return Message_G2C_PET_RECRUIT_RECORD_LIST;
}(MessageBase));
__reflect(Message_G2C_PET_RECRUIT_RECORD_LIST.prototype, "Message_G2C_PET_RECRUIT_RECORD_LIST");
//////////////////////////-抽奖////////////////////////////////////////
var Message_C2G_PET_QUICK_RECRUIT = (function (_super) {
    __extends(Message_C2G_PET_QUICK_RECRUIT, _super);
    function Message_C2G_PET_QUICK_RECRUIT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_PET_QUICK_RECRUIT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.count = 1;
    };
    Message_C2G_PET_QUICK_RECRUIT.prototype.pack = function (writer) {
        writer.writeUInt(this.count);
    };
    Message_C2G_PET_QUICK_RECRUIT.prototype.unpack = function (reader) {
    };
    return Message_C2G_PET_QUICK_RECRUIT;
}(MessageBase));
__reflect(Message_C2G_PET_QUICK_RECRUIT.prototype, "Message_C2G_PET_QUICK_RECRUIT");
//抽奖返回
var Message_G2C_PET_QUICK_RECRUIT = (function (_super) {
    __extends(Message_G2C_PET_QUICK_RECRUIT, _super);
    function Message_G2C_PET_QUICK_RECRUIT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_PET_QUICK_RECRUIT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.prizeList = {};
    };
    Message_G2C_PET_QUICK_RECRUIT.prototype.pack = function (writer) {
    };
    Message_G2C_PET_QUICK_RECRUIT.prototype.unpack = function (reader) {
        this.prizeList = table_load(reader.readString()); //{{entryId, count, isPet},{entryId, count, isPet},....}   isPet为1代表是伙伴，0是物品
    };
    return Message_G2C_PET_QUICK_RECRUIT;
}(MessageBase));
__reflect(Message_G2C_PET_QUICK_RECRUIT.prototype, "Message_G2C_PET_QUICK_RECRUIT");
//-丢弃伙伴或者职业
var Message_G2C_DROP_PARTNER_OR_VOCATION = (function (_super) {
    __extends(Message_G2C_DROP_PARTNER_OR_VOCATION, _super);
    function Message_G2C_DROP_PARTNER_OR_VOCATION() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_DROP_PARTNER_OR_VOCATION.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.entryId = 0;
    };
    Message_G2C_DROP_PARTNER_OR_VOCATION.prototype.pack = function (writer) {
    };
    Message_G2C_DROP_PARTNER_OR_VOCATION.prototype.unpack = function (reader) {
        this.entryId = reader.readUInt();
    };
    return Message_G2C_DROP_PARTNER_OR_VOCATION;
}(MessageBase));
__reflect(Message_G2C_DROP_PARTNER_OR_VOCATION.prototype, "Message_G2C_DROP_PARTNER_OR_VOCATION");
//职业和宠物战力变化
var Message_G2C_PET_COMBAT_FORCE_CHNAGE = (function (_super) {
    __extends(Message_G2C_PET_COMBAT_FORCE_CHNAGE, _super);
    function Message_G2C_PET_COMBAT_FORCE_CHNAGE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_PET_COMBAT_FORCE_CHNAGE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.delta = 0;
    };
    Message_G2C_PET_COMBAT_FORCE_CHNAGE.prototype.pack = function (writer) {
    };
    Message_G2C_PET_COMBAT_FORCE_CHNAGE.prototype.unpack = function (reader) {
        this.delta = tonumber(reader.readString()) || 0;
    };
    return Message_G2C_PET_COMBAT_FORCE_CHNAGE;
}(MessageBase));
__reflect(Message_G2C_PET_COMBAT_FORCE_CHNAGE.prototype, "Message_G2C_PET_COMBAT_FORCE_CHNAGE");
//选择品质
var Message_C2G_PET_SELECT_QUALITY = (function (_super) {
    __extends(Message_C2G_PET_SELECT_QUALITY, _super);
    function Message_C2G_PET_SELECT_QUALITY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_PET_SELECT_QUALITY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.operate = 0; //opQuickRecruitConfig.Soul 获得碎魂；opQuickRecruitConfig.LotteryCount 获得抽奖次数
    };
    Message_C2G_PET_SELECT_QUALITY.prototype.pack = function (writer) {
        writer.writeUInt(this.operate);
    };
    Message_C2G_PET_SELECT_QUALITY.prototype.unpack = function (reader) {
    };
    return Message_C2G_PET_SELECT_QUALITY;
}(MessageBase));
__reflect(Message_C2G_PET_SELECT_QUALITY.prototype, "Message_C2G_PET_SELECT_QUALITY");
var Message_G2C_PET_QUALITY_PET_LIST = (function (_super) {
    __extends(Message_G2C_PET_QUALITY_PET_LIST, _super);
    function Message_G2C_PET_QUALITY_PET_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_PET_QUALITY_PET_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petQualityList = {};
    };
    Message_G2C_PET_QUALITY_PET_LIST.prototype.pack = function (writer) {
    };
    Message_G2C_PET_QUALITY_PET_LIST.prototype.unpack = function (reader) {
        this.petQualityList = table_load(reader.readString()) || {}; //{entryId, quality}
    };
    return Message_G2C_PET_QUALITY_PET_LIST;
}(MessageBase));
__reflect(Message_G2C_PET_QUALITY_PET_LIST.prototype, "Message_G2C_PET_QUALITY_PET_LIST");
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
var Message_C2G_ACTOR_PET_UNLOCK = (function (_super) {
    __extends(Message_C2G_ACTOR_PET_UNLOCK, _super);
    function Message_C2G_ACTOR_PET_UNLOCK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ACTOR_PET_UNLOCK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petId = 0;
    };
    Message_C2G_ACTOR_PET_UNLOCK.prototype.pack = function (writer) {
        writer.writeUInt(this.petId);
    };
    Message_C2G_ACTOR_PET_UNLOCK.prototype.unpack = function (reader) {
    };
    return Message_C2G_ACTOR_PET_UNLOCK;
}(MessageBase));
__reflect(Message_C2G_ACTOR_PET_UNLOCK.prototype, "Message_C2G_ACTOR_PET_UNLOCK");
//新加一只宠物
var Message_G2C_ACTOR_PET_INFO = (function (_super) {
    __extends(Message_G2C_ACTOR_PET_INFO, _super);
    function Message_G2C_ACTOR_PET_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ACTOR_PET_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petInfo = null;
    };
    Message_G2C_ACTOR_PET_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_ACTOR_PET_INFO.prototype.unpack = function (reader) {
        this.petInfo = PetInfo.newObj();
        this.petInfo.read(reader);
    };
    return Message_G2C_ACTOR_PET_INFO;
}(MessageBase));
__reflect(Message_G2C_ACTOR_PET_INFO.prototype, "Message_G2C_ACTOR_PET_INFO");
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
var Message_C2G_ACTOR_PET_UPGRADE = (function (_super) {
    __extends(Message_C2G_ACTOR_PET_UPGRADE, _super);
    function Message_C2G_ACTOR_PET_UPGRADE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ACTOR_PET_UPGRADE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petId = 0;
        this.autoBuy = 0; //0不自动买 1自动买
    };
    Message_C2G_ACTOR_PET_UPGRADE.prototype.pack = function (writer) {
        writer.writeUInt(this.petId);
        writer.writeUChar(this.autoBuy);
    };
    Message_C2G_ACTOR_PET_UPGRADE.prototype.unpack = function (reader) {
    };
    return Message_C2G_ACTOR_PET_UPGRADE;
}(MessageBase));
__reflect(Message_C2G_ACTOR_PET_UPGRADE.prototype, "Message_C2G_ACTOR_PET_UPGRADE");
//上战
var Message_C2G_ACTOR_PET_COMBAT_SET = (function (_super) {
    __extends(Message_C2G_ACTOR_PET_COMBAT_SET, _super);
    function Message_C2G_ACTOR_PET_COMBAT_SET() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ACTOR_PET_COMBAT_SET.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petId = 0;
        this.combatPos = 0; //0代表没有出战 1代表出战 2代表备战1 3代表备战2
    };
    Message_C2G_ACTOR_PET_COMBAT_SET.prototype.pack = function (writer) {
        writer.writeUInt(this.petId);
        writer.writeUChar(this.combatPos);
    };
    Message_C2G_ACTOR_PET_COMBAT_SET.prototype.unpack = function (reader) {
    };
    return Message_C2G_ACTOR_PET_COMBAT_SET;
}(MessageBase));
__reflect(Message_C2G_ACTOR_PET_COMBAT_SET.prototype, "Message_C2G_ACTOR_PET_COMBAT_SET");
//展示到世界聊天
var Message_C2G_ACTOR_PET_SHOW = (function (_super) {
    __extends(Message_C2G_ACTOR_PET_SHOW, _super);
    function Message_C2G_ACTOR_PET_SHOW() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ACTOR_PET_SHOW.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petId = 0;
    };
    Message_C2G_ACTOR_PET_SHOW.prototype.pack = function (writer) {
        writer.writeUInt(this.petId);
    };
    Message_C2G_ACTOR_PET_SHOW.prototype.unpack = function (reader) {
    };
    return Message_C2G_ACTOR_PET_SHOW;
}(MessageBase));
__reflect(Message_C2G_ACTOR_PET_SHOW.prototype, "Message_C2G_ACTOR_PET_SHOW");
//资质升级
var Message_C2G_ACTOR_PET_GROW_UP = (function (_super) {
    __extends(Message_C2G_ACTOR_PET_GROW_UP, _super);
    function Message_C2G_ACTOR_PET_GROW_UP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ACTOR_PET_GROW_UP.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petId = 0;
    };
    Message_C2G_ACTOR_PET_GROW_UP.prototype.pack = function (writer) {
        writer.writeUInt(this.petId);
    };
    Message_C2G_ACTOR_PET_GROW_UP.prototype.unpack = function (reader) {
    };
    return Message_C2G_ACTOR_PET_GROW_UP;
}(MessageBase));
__reflect(Message_C2G_ACTOR_PET_GROW_UP.prototype, "Message_C2G_ACTOR_PET_GROW_UP");
//改名
var Message_C2G_ACTOR_PET_RENAME = (function (_super) {
    __extends(Message_C2G_ACTOR_PET_RENAME, _super);
    function Message_C2G_ACTOR_PET_RENAME() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ACTOR_PET_RENAME.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petId = 0;
        this.name = "";
    };
    Message_C2G_ACTOR_PET_RENAME.prototype.pack = function (writer) {
        writer.writeUInt(this.petId);
        writer.writeString(this.name);
    };
    Message_C2G_ACTOR_PET_RENAME.prototype.unpack = function (reader) {
    };
    return Message_C2G_ACTOR_PET_RENAME;
}(MessageBase));
__reflect(Message_C2G_ACTOR_PET_RENAME.prototype, "Message_C2G_ACTOR_PET_RENAME");
//洗技能
var Message_C2G_ACTOR_PET_SKILL_WASH = (function (_super) {
    __extends(Message_C2G_ACTOR_PET_SKILL_WASH, _super);
    function Message_C2G_ACTOR_PET_SKILL_WASH() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ACTOR_PET_SKILL_WASH.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petId = 0;
        this.washType = 0;
        this.autoBuy = 0;
        this.lockNum = 0;
        this.lockList = [];
    };
    Message_C2G_ACTOR_PET_SKILL_WASH.prototype.pack = function (writer) {
        writer.writeUInt(this.petId);
        writer.writeUChar(this.washType);
        writer.writeUChar(this.autoBuy);
        writer.writeUChar(this.lockNum);
        for (var i in this.lockList) {
            writer.writeUChar(this.lockList[i]);
        }
    };
    Message_C2G_ACTOR_PET_SKILL_WASH.prototype.unpack = function (reader) {
    };
    return Message_C2G_ACTOR_PET_SKILL_WASH;
}(MessageBase));
__reflect(Message_C2G_ACTOR_PET_SKILL_WASH.prototype, "Message_C2G_ACTOR_PET_SKILL_WASH");
//接受洗出来的技能
var Message_C2G_ACTOR_PET_SKILL_ACCEPT = (function (_super) {
    __extends(Message_C2G_ACTOR_PET_SKILL_ACCEPT, _super);
    function Message_C2G_ACTOR_PET_SKILL_ACCEPT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ACTOR_PET_SKILL_ACCEPT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petId = 0;
    };
    Message_C2G_ACTOR_PET_SKILL_ACCEPT.prototype.pack = function (writer) {
        writer.writeUInt(this.petId);
    };
    Message_C2G_ACTOR_PET_SKILL_ACCEPT.prototype.unpack = function (reader) {
    };
    return Message_C2G_ACTOR_PET_SKILL_ACCEPT;
}(MessageBase));
__reflect(Message_C2G_ACTOR_PET_SKILL_ACCEPT.prototype, "Message_C2G_ACTOR_PET_SKILL_ACCEPT");
////////////////////////////////仙侣///////////////////////////////////
//仙侣列表
var Message_G2C_ACTOR_XIANLV_INFO_LIST = (function (_super) {
    __extends(Message_G2C_ACTOR_XIANLV_INFO_LIST, _super);
    function Message_G2C_ACTOR_XIANLV_INFO_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ACTOR_XIANLV_INFO_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_G2C_ACTOR_XIANLV_INFO_LIST.prototype.pack = function (writer) {
    };
    Message_G2C_ACTOR_XIANLV_INFO_LIST.prototype.unpack = function (reader) {
    };
    return Message_G2C_ACTOR_XIANLV_INFO_LIST;
}(MessageBase));
__reflect(Message_G2C_ACTOR_XIANLV_INFO_LIST.prototype, "Message_G2C_ACTOR_XIANLV_INFO_LIST");
//新加仙侣
var Message_G2C_ACTOR_XIANLV_ADD = (function (_super) {
    __extends(Message_G2C_ACTOR_XIANLV_ADD, _super);
    function Message_G2C_ACTOR_XIANLV_ADD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ACTOR_XIANLV_ADD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_G2C_ACTOR_XIANLV_ADD.prototype.pack = function (writer) {
    };
    Message_G2C_ACTOR_XIANLV_ADD.prototype.unpack = function (reader) {
    };
    return Message_G2C_ACTOR_XIANLV_ADD;
}(MessageBase));
__reflect(Message_G2C_ACTOR_XIANLV_ADD.prototype, "Message_G2C_ACTOR_XIANLV_ADD");
//# sourceMappingURL=PetMessage.js.map