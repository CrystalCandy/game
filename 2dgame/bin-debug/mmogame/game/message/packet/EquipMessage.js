/*
作者:
    panyuxiong
    
创建时间：
    2014.07.22(星期二)

意图：
        处理打造和分解信息

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
//穿装备
var Message_C2G_SET_EQUIP = (function (_super) {
    __extends(Message_C2G_SET_EQUIP, _super);
    function Message_C2G_SET_EQUIP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_SET_EQUIP.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.actorType = 0;
        this.actorId = 0;
        this.itemId = 0;
    };
    Message_C2G_SET_EQUIP.prototype.pack = function (writer) {
        writer.writeUInt(this.actorType);
        writer.writeUInt(this.actorId);
        writer.writeUInt(this.itemId);
    };
    Message_C2G_SET_EQUIP.prototype.unpack = function (reader) {
    };
    return Message_C2G_SET_EQUIP;
}(MessageBase));
__reflect(Message_C2G_SET_EQUIP.prototype, "Message_C2G_SET_EQUIP");
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
var Message_C2G_OFF_EQUIP = (function (_super) {
    __extends(Message_C2G_OFF_EQUIP, _super);
    function Message_C2G_OFF_EQUIP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_OFF_EQUIP.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.actorType = 0;
        this.actorId = 0;
        this.itemId = 0;
    };
    Message_C2G_OFF_EQUIP.prototype.pack = function (writer) {
        writer.writeUInt(this.actorType);
        writer.writeUInt(this.actorId);
        writer.writeUInt(this.itemId);
    };
    Message_C2G_OFF_EQUIP.prototype.unpack = function (reader) {
    };
    return Message_C2G_OFF_EQUIP;
}(MessageBase));
__reflect(Message_C2G_OFF_EQUIP.prototype, "Message_C2G_OFF_EQUIP");
//一键装备
var Message_C2G_EQUIP_ALL_EQUIPS_ON = (function (_super) {
    __extends(Message_C2G_EQUIP_ALL_EQUIPS_ON, _super);
    function Message_C2G_EQUIP_ALL_EQUIPS_ON() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_EQUIP_ALL_EQUIPS_ON.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.actorType = 0;
        this.actorId = 0;
        this.equipIdList = {};
    };
    Message_C2G_EQUIP_ALL_EQUIPS_ON.prototype.pack = function (writer) {
        writer.writeUInt(this.actorType);
        writer.writeUInt(this.actorId);
        writer.writeString(table_save(this.equipIdList));
    };
    Message_C2G_EQUIP_ALL_EQUIPS_ON.prototype.unpack = function (reader) {
    };
    return Message_C2G_EQUIP_ALL_EQUIPS_ON;
}(MessageBase));
__reflect(Message_C2G_EQUIP_ALL_EQUIPS_ON.prototype, "Message_C2G_EQUIP_ALL_EQUIPS_ON");
var Message_C2G_EQUIP_ALL_EQUIPS_OFF = (function (_super) {
    __extends(Message_C2G_EQUIP_ALL_EQUIPS_OFF, _super);
    function Message_C2G_EQUIP_ALL_EQUIPS_OFF() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_EQUIP_ALL_EQUIPS_OFF.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.actorType = 0;
        this.actorId = 0;
    };
    Message_C2G_EQUIP_ALL_EQUIPS_OFF.prototype.pack = function (writer) {
        writer.writeUInt(this.actorType);
        writer.writeUInt(this.actorId);
    };
    Message_C2G_EQUIP_ALL_EQUIPS_OFF.prototype.unpack = function (reader) {
    };
    return Message_C2G_EQUIP_ALL_EQUIPS_OFF;
}(MessageBase));
__reflect(Message_C2G_EQUIP_ALL_EQUIPS_OFF.prototype, "Message_C2G_EQUIP_ALL_EQUIPS_OFF");
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
var Message_C2G_ITEM_EQUIP_MAKE = (function (_super) {
    __extends(Message_C2G_ITEM_EQUIP_MAKE, _super);
    function Message_C2G_ITEM_EQUIP_MAKE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ITEM_EQUIP_MAKE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.entryId = null;
        this.isBetter = 0;
        this.equipId = 0;
    };
    Message_C2G_ITEM_EQUIP_MAKE.prototype.pack = function (writer) {
        writer.writeUInt(this.entryId);
        writer.writeUInt(this.isBetter);
        writer.writeUInt(this.equipId);
        writer.writeUInt(this.consumeRmb);
    };
    Message_C2G_ITEM_EQUIP_MAKE.prototype.unpack = function (reader) {
    };
    return Message_C2G_ITEM_EQUIP_MAKE;
}(MessageBase));
__reflect(Message_C2G_ITEM_EQUIP_MAKE.prototype, "Message_C2G_ITEM_EQUIP_MAKE");
////////////////////////-装备强化//////////////////
var Message_C2G_ITEM_EQUIP_STRENGTHEN = (function (_super) {
    __extends(Message_C2G_ITEM_EQUIP_STRENGTHEN, _super);
    function Message_C2G_ITEM_EQUIP_STRENGTHEN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ITEM_EQUIP_STRENGTHEN.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = null;
        this.lucky = 0;
    };
    Message_C2G_ITEM_EQUIP_STRENGTHEN.prototype.pack = function (writer) {
        writer.writeUInt(this.id);
        writer.writeUInt(this.lucky);
    };
    Message_C2G_ITEM_EQUIP_STRENGTHEN.prototype.unpack = function (reader) {
    };
    return Message_C2G_ITEM_EQUIP_STRENGTHEN;
}(MessageBase));
__reflect(Message_C2G_ITEM_EQUIP_STRENGTHEN.prototype, "Message_C2G_ITEM_EQUIP_STRENGTHEN");
////////////////////////-装备一键强化//////////////////
var Message_C2G_EQUIP_ALL_ENHANCE = (function (_super) {
    __extends(Message_C2G_EQUIP_ALL_ENHANCE, _super);
    function Message_C2G_EQUIP_ALL_ENHANCE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_EQUIP_ALL_ENHANCE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = null;
        this.lucky = 0;
    };
    Message_C2G_EQUIP_ALL_ENHANCE.prototype.pack = function (writer) {
        writer.writeUInt(this.id);
        writer.writeUInt(this.lucky);
    };
    Message_C2G_EQUIP_ALL_ENHANCE.prototype.unpack = function (reader) {
    };
    return Message_C2G_EQUIP_ALL_ENHANCE;
}(MessageBase));
__reflect(Message_C2G_EQUIP_ALL_ENHANCE.prototype, "Message_C2G_EQUIP_ALL_ENHANCE");
////////////////////////-装备一键重塑//////////////////
var Message_C2G_EQUIP_ALL_CAST = (function (_super) {
    __extends(Message_C2G_EQUIP_ALL_CAST, _super);
    function Message_C2G_EQUIP_ALL_CAST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_EQUIP_ALL_CAST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.itemId = 0;
        this.count = 0;
        this.propertyid = 0;
    };
    Message_C2G_EQUIP_ALL_CAST.prototype.pack = function (writer) {
        writer.writeUInt(this.itemId);
        writer.writeChar(this.propertyid);
        writer.writeChar(this.count);
    };
    Message_C2G_EQUIP_ALL_CAST.prototype.unpack = function (reader) {
    };
    return Message_C2G_EQUIP_ALL_CAST;
}(MessageBase));
__reflect(Message_C2G_EQUIP_ALL_CAST.prototype, "Message_C2G_EQUIP_ALL_CAST");
var Message_G2C_EQUIP_ALL_CAST = (function (_super) {
    __extends(Message_G2C_EQUIP_ALL_CAST, _super);
    function Message_G2C_EQUIP_ALL_CAST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_EQUIP_ALL_CAST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.itemid = 0;
        this.property = 0;
        this.property_count = 0;
        this.count = 0;
        this.freeCount = 0;
        this.needgold = 0;
    };
    Message_G2C_EQUIP_ALL_CAST.prototype.pack = function (writer) {
    };
    Message_G2C_EQUIP_ALL_CAST.prototype.unpack = function (reader) {
        this.itemid = reader.readUInt(); //装备id
        this.property = reader.readChar(); //属性
        this.property_count = reader.readChar(); //属性数量
        this.count = reader.readChar(); //重塑的次数
        this.freeCount = reader.readUShort(); //使用的免费次数
        this.needgold = reader.readUShort(); //需要的费用
    };
    return Message_G2C_EQUIP_ALL_CAST;
}(MessageBase));
__reflect(Message_G2C_EQUIP_ALL_CAST.prototype, "Message_G2C_EQUIP_ALL_CAST");
////////////////////////-装备继承//////////////////
var Message_C2G_EQUIP_INHERIT = (function (_super) {
    __extends(Message_C2G_EQUIP_INHERIT, _super);
    function Message_C2G_EQUIP_INHERIT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_EQUIP_INHERIT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.srcId = 0;
        this.destId = 0;
    };
    Message_C2G_EQUIP_INHERIT.prototype.pack = function (writer) {
        writer.writeUInt(this.srcId);
        writer.writeUInt(this.destId);
    };
    Message_C2G_EQUIP_INHERIT.prototype.unpack = function (reader) {
    };
    return Message_C2G_EQUIP_INHERIT;
}(MessageBase));
__reflect(Message_C2G_EQUIP_INHERIT.prototype, "Message_C2G_EQUIP_INHERIT");
var Message_G2C_ITEM_EQUIP_MAKE = (function (_super) {
    __extends(Message_G2C_ITEM_EQUIP_MAKE, _super);
    function Message_G2C_ITEM_EQUIP_MAKE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ITEM_EQUIP_MAKE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = null;
    };
    Message_G2C_ITEM_EQUIP_MAKE.prototype.pack = function (writer) {
    };
    Message_G2C_ITEM_EQUIP_MAKE.prototype.unpack = function (reader) {
        this.id = reader.readUInt();
        this.uid = reader.readUInt();
    };
    return Message_G2C_ITEM_EQUIP_MAKE;
}(MessageBase));
__reflect(Message_G2C_ITEM_EQUIP_MAKE.prototype, "Message_G2C_ITEM_EQUIP_MAKE");
//装备鉴定
var Message_C2G_EQUIP_IDENTIFY = (function (_super) {
    __extends(Message_C2G_EQUIP_IDENTIFY, _super);
    function Message_C2G_EQUIP_IDENTIFY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_EQUIP_IDENTIFY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.itemId = 0;
    };
    Message_C2G_EQUIP_IDENTIFY.prototype.pack = function (writer) {
        writer.writeUInt(this.itemId);
    };
    Message_C2G_EQUIP_IDENTIFY.prototype.unpack = function (reader) {
    };
    return Message_C2G_EQUIP_IDENTIFY;
}(MessageBase));
__reflect(Message_C2G_EQUIP_IDENTIFY.prototype, "Message_C2G_EQUIP_IDENTIFY");
//装备技能鉴定结果
var Message_G2C_EQUIP_IDENTIFY_SUCCESS = (function (_super) {
    __extends(Message_G2C_EQUIP_IDENTIFY_SUCCESS, _super);
    function Message_G2C_EQUIP_IDENTIFY_SUCCESS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_EQUIP_IDENTIFY_SUCCESS.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.itemId = 0;
    };
    Message_G2C_EQUIP_IDENTIFY_SUCCESS.prototype.pack = function (writer) {
    };
    Message_G2C_EQUIP_IDENTIFY_SUCCESS.prototype.unpack = function (reader) {
        this.itemId = reader.readUInt();
    };
    return Message_G2C_EQUIP_IDENTIFY_SUCCESS;
}(MessageBase));
__reflect(Message_G2C_EQUIP_IDENTIFY_SUCCESS.prototype, "Message_G2C_EQUIP_IDENTIFY_SUCCESS");
//御灵升级
var Message_C2G_LEARN_EQUIP_ENCHANT = (function (_super) {
    __extends(Message_C2G_LEARN_EQUIP_ENCHANT, _super);
    function Message_C2G_LEARN_EQUIP_ENCHANT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_LEARN_EQUIP_ENCHANT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //this.index = null
    };
    Message_C2G_LEARN_EQUIP_ENCHANT.prototype.pack = function (writer) {
        //writer.writeUInt(this.index)
    };
    Message_C2G_LEARN_EQUIP_ENCHANT.prototype.unpack = function (reader) {
    };
    return Message_C2G_LEARN_EQUIP_ENCHANT;
}(MessageBase));
__reflect(Message_C2G_LEARN_EQUIP_ENCHANT.prototype, "Message_C2G_LEARN_EQUIP_ENCHANT");
//御灵返回
var Message_G2C_LEARN_EQUIP_ENCHANT = (function (_super) {
    __extends(Message_G2C_LEARN_EQUIP_ENCHANT, _super);
    function Message_G2C_LEARN_EQUIP_ENCHANT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_LEARN_EQUIP_ENCHANT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.skillLevel = null;
        this.sacrifice = null;
    };
    Message_G2C_LEARN_EQUIP_ENCHANT.prototype.pack = function (writer) {
    };
    Message_G2C_LEARN_EQUIP_ENCHANT.prototype.unpack = function (reader) {
        this.skillLevel = reader.readUInt();
        this.sacrifice = table_load(reader.readString());
    };
    return Message_G2C_LEARN_EQUIP_ENCHANT;
}(MessageBase));
__reflect(Message_G2C_LEARN_EQUIP_ENCHANT.prototype, "Message_G2C_LEARN_EQUIP_ENCHANT");
//# sourceMappingURL=EquipMessage.js.map