// TypeScript file
//////////////////////////////////////////////////////////////////-
//发送角色信息
//}
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
var Message_C2G_ROLE_POTENTIAL = (function (_super) {
    __extends(Message_C2G_ROLE_POTENTIAL, _super);
    function Message_C2G_ROLE_POTENTIAL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_POTENTIAL.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.strength = null;
        this.intellect = null;
        this.agility = null;
        this.stamina = null;
        this.habitus = null;
    };
    Message_C2G_ROLE_POTENTIAL.prototype.pack = function (writer) {
        writer.writeInt(this.strength);
        writer.writeInt(this.intellect);
        writer.writeInt(this.agility);
        writer.writeInt(this.stamina);
        writer.writeInt(this.habitus);
    };
    Message_C2G_ROLE_POTENTIAL.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_POTENTIAL;
}(MessageBase));
__reflect(Message_C2G_ROLE_POTENTIAL.prototype, "Message_C2G_ROLE_POTENTIAL");
var Message_C2G_ROLE_LEVELUP = (function (_super) {
    __extends(Message_C2G_ROLE_LEVELUP, _super);
    function Message_C2G_ROLE_LEVELUP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_LEVELUP.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_ROLE_LEVELUP.prototype.pack = function (writer) {
    };
    Message_C2G_ROLE_LEVELUP.prototype.unpack = function (writer) {
    };
    return Message_C2G_ROLE_LEVELUP;
}(MessageBase));
__reflect(Message_C2G_ROLE_LEVELUP.prototype, "Message_C2G_ROLE_LEVELUP");
var Message_C2G_ROLE_REFRESH_NPC = (function (_super) {
    __extends(Message_C2G_ROLE_REFRESH_NPC, _super);
    function Message_C2G_ROLE_REFRESH_NPC() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_REFRESH_NPC.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_ROLE_REFRESH_NPC.prototype.pack = function (writer) {
    };
    Message_C2G_ROLE_REFRESH_NPC.prototype.unpack = function (writer) {
    };
    return Message_C2G_ROLE_REFRESH_NPC;
}(MessageBase));
__reflect(Message_C2G_ROLE_REFRESH_NPC.prototype, "Message_C2G_ROLE_REFRESH_NPC");
var Message_C2G_ROLE_JOIN_SCHOOL_JUMP = (function (_super) {
    __extends(Message_C2G_ROLE_JOIN_SCHOOL_JUMP, _super);
    function Message_C2G_ROLE_JOIN_SCHOOL_JUMP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_JOIN_SCHOOL_JUMP.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mapId = null;
        this.cellX = null;
        this.cellY = null;
    };
    Message_C2G_ROLE_JOIN_SCHOOL_JUMP.prototype.pack = function (writer) {
        writer.writeUInt(this.mapId);
        writer.writeUInt(this.cellX);
        writer.writeUInt(this.cellY);
    };
    Message_C2G_ROLE_JOIN_SCHOOL_JUMP.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_JOIN_SCHOOL_JUMP;
}(MessageBase));
__reflect(Message_C2G_ROLE_JOIN_SCHOOL_JUMP.prototype, "Message_C2G_ROLE_JOIN_SCHOOL_JUMP");
var Message_C2G_ROLE_SET_AUTO_POTENTIAL = (function (_super) {
    __extends(Message_C2G_ROLE_SET_AUTO_POTENTIAL, _super);
    function Message_C2G_ROLE_SET_AUTO_POTENTIAL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_SET_AUTO_POTENTIAL.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.habitus = null;
        this.intellect = null;
        this.strength = null;
        this.stamina = null;
        this.agility = null;
    };
    Message_C2G_ROLE_SET_AUTO_POTENTIAL.prototype.pack = function (writer) {
        writer.writeChar(this.strength);
        writer.writeChar(this.intellect);
        writer.writeChar(this.habitus);
        writer.writeChar(this.agility);
        writer.writeChar(this.stamina);
    };
    Message_C2G_ROLE_SET_AUTO_POTENTIAL.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_SET_AUTO_POTENTIAL;
}(MessageBase));
__reflect(Message_C2G_ROLE_SET_AUTO_POTENTIAL.prototype, "Message_C2G_ROLE_SET_AUTO_POTENTIAL");
var Message_C2G_ROLE_SETTING = (function (_super) {
    __extends(Message_C2G_ROLE_SETTING, _super);
    function Message_C2G_ROLE_SETTING() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_SETTING.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // 组队，好友，交易，陌生人信息
        this.team = 0;
        this.trade = 0;
        this.friend = 0;
        this.strange_info = 0;
        this.set = 0;
    };
    Message_C2G_ROLE_SETTING.prototype.pack = function (writer) {
        this.set = this.team + this.trade * 2 + this.friend * 4 + this.strange_info * 8;
        writer.writeUShort(this.set);
        RoleSystem.getInstance().setRoleSetting(this.set);
    };
    Message_C2G_ROLE_SETTING.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_SETTING;
}(MessageBase));
__reflect(Message_C2G_ROLE_SETTING.prototype, "Message_C2G_ROLE_SETTING");
var Message_G2C_ROLE_SET_AUTO_POTENTIAL = (function (_super) {
    __extends(Message_G2C_ROLE_SET_AUTO_POTENTIAL, _super);
    function Message_G2C_ROLE_SET_AUTO_POTENTIAL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_SET_AUTO_POTENTIAL.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.habitus = null;
        this.intellect = null;
        this.strength = null;
        this.stamina = null;
        this.agility = null;
    };
    Message_G2C_ROLE_SET_AUTO_POTENTIAL.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_SET_AUTO_POTENTIAL.prototype.unpack = function (reader) {
        this.strength = reader.readChar();
        this.intellect = reader.readChar();
        this.habitus = reader.readChar();
        this.agility = reader.readChar();
        this.stamina = reader.readChar();
    };
    return Message_G2C_ROLE_SET_AUTO_POTENTIAL;
}(MessageBase));
__reflect(Message_G2C_ROLE_SET_AUTO_POTENTIAL.prototype, "Message_G2C_ROLE_SET_AUTO_POTENTIAL");
var Message_C2G_ROLE_CANGBAO_FIGHT = (function (_super) {
    __extends(Message_C2G_ROLE_CANGBAO_FIGHT, _super);
    function Message_C2G_ROLE_CANGBAO_FIGHT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_CANGBAO_FIGHT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.npcId = 0;
    };
    Message_C2G_ROLE_CANGBAO_FIGHT.prototype.pack = function (writer) {
        writer.writeUInt(this.npcId);
    };
    Message_C2G_ROLE_CANGBAO_FIGHT.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_CANGBAO_FIGHT;
}(MessageBase));
__reflect(Message_C2G_ROLE_CANGBAO_FIGHT.prototype, "Message_C2G_ROLE_CANGBAO_FIGHT");
var Message_C2G_FIGHT_PK_SWITCH = (function (_super) {
    __extends(Message_C2G_FIGHT_PK_SWITCH, _super);
    function Message_C2G_FIGHT_PK_SWITCH() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_PK_SWITCH.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.status = 0;
    };
    Message_C2G_FIGHT_PK_SWITCH.prototype.pack = function (writer) {
        writer.writeUInt(this.status);
    };
    Message_C2G_FIGHT_PK_SWITCH.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_PK_SWITCH;
}(MessageBase));
__reflect(Message_C2G_FIGHT_PK_SWITCH.prototype, "Message_C2G_FIGHT_PK_SWITCH");
var Message_C2G_BUY_POPULARITY = (function (_super) {
    __extends(Message_C2G_BUY_POPULARITY, _super);
    function Message_C2G_BUY_POPULARITY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_BUY_POPULARITY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.index = 0;
    };
    Message_C2G_BUY_POPULARITY.prototype.pack = function (writer) {
        writer.writeUInt(this.index);
    };
    Message_C2G_BUY_POPULARITY.prototype.unpack = function (reader) {
    };
    return Message_C2G_BUY_POPULARITY;
}(MessageBase));
__reflect(Message_C2G_BUY_POPULARITY.prototype, "Message_C2G_BUY_POPULARITY");
var Message_C2G_ROLE_AUTO_LEVEL_UP = (function (_super) {
    __extends(Message_C2G_ROLE_AUTO_LEVEL_UP, _super);
    function Message_C2G_ROLE_AUTO_LEVEL_UP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_AUTO_LEVEL_UP.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_ROLE_AUTO_LEVEL_UP.prototype.pack = function (writer) {
    };
    Message_C2G_ROLE_AUTO_LEVEL_UP.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_AUTO_LEVEL_UP;
}(MessageBase));
__reflect(Message_C2G_ROLE_AUTO_LEVEL_UP.prototype, "Message_C2G_ROLE_AUTO_LEVEL_UP");
var Message_C2G_ROLE_APPEAR = (function (_super) {
    __extends(Message_C2G_ROLE_APPEAR, _super);
    function Message_C2G_ROLE_APPEAR() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_APPEAR.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petEntry = 0;
    };
    Message_C2G_ROLE_APPEAR.prototype.pack = function (writer) {
        writer.writeUInt(this.petEntry);
    };
    Message_C2G_ROLE_APPEAR.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_APPEAR;
}(MessageBase));
__reflect(Message_C2G_ROLE_APPEAR.prototype, "Message_C2G_ROLE_APPEAR");
// 彩蛋（惊喜）记录返回
var Message_G2C_ROLE_SPECIAL_EVENT_RECORD = (function (_super) {
    __extends(Message_G2C_ROLE_SPECIAL_EVENT_RECORD, _super);
    function Message_G2C_ROLE_SPECIAL_EVENT_RECORD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_SPECIAL_EVENT_RECORD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.surpriseList = null;
    };
    Message_G2C_ROLE_SPECIAL_EVENT_RECORD.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_SPECIAL_EVENT_RECORD.prototype.unpack = function (reader) {
        //"{"11":{"4":{"21012":1}},"3":[1]}"
        this.surpriseList = {};
        var tempList = table_load(reader.readString());
        for (var k in tempList) {
            var infoList = tempList[k];
            //这里的索引必须是1开始，但是lua转成js就是0开始，需要转一次
            if (Array.isArray(infoList)) {
                var info = {};
                for (var j = 0; j < infoList.length; j++) {
                    info[j + 1] = infoList[j];
                }
                this.surpriseList[k] = info;
            }
            else {
                this.surpriseList[k] = infoList;
            }
        }
    };
    return Message_G2C_ROLE_SPECIAL_EVENT_RECORD;
}(MessageBase));
__reflect(Message_G2C_ROLE_SPECIAL_EVENT_RECORD.prototype, "Message_G2C_ROLE_SPECIAL_EVENT_RECORD");
//彩蛋领取奖励
var Message_C2G_ROLE_SPECIAL_EVENT = (function (_super) {
    __extends(Message_C2G_ROLE_SPECIAL_EVENT, _super);
    function Message_C2G_ROLE_SPECIAL_EVENT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_SPECIAL_EVENT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.egType = 0;
        this.eventIndex = 0;
        this.entryId = 0;
    };
    Message_C2G_ROLE_SPECIAL_EVENT.prototype.pack = function (writer) {
        writer.writeUShort(this.egType);
        writer.writeUShort(this.eventIndex);
        writer.writeUInt(this.entryId);
    };
    Message_C2G_ROLE_SPECIAL_EVENT.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_SPECIAL_EVENT;
}(MessageBase));
__reflect(Message_C2G_ROLE_SPECIAL_EVENT.prototype, "Message_C2G_ROLE_SPECIAL_EVENT");
// 请求全服关卡首通名单数据
var Message_C2G_EXCITE_ALL_SERVER_FIRST_CAMP = (function (_super) {
    __extends(Message_C2G_EXCITE_ALL_SERVER_FIRST_CAMP, _super);
    function Message_C2G_EXCITE_ALL_SERVER_FIRST_CAMP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_EXCITE_ALL_SERVER_FIRST_CAMP.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_EXCITE_ALL_SERVER_FIRST_CAMP.prototype.pack = function (writer) {
    };
    Message_C2G_EXCITE_ALL_SERVER_FIRST_CAMP.prototype.unpack = function (reader) {
    };
    return Message_C2G_EXCITE_ALL_SERVER_FIRST_CAMP;
}(MessageBase));
__reflect(Message_C2G_EXCITE_ALL_SERVER_FIRST_CAMP.prototype, "Message_C2G_EXCITE_ALL_SERVER_FIRST_CAMP");
var Message_G2C_EXCITE_ALL_SERVER_FIRST_CAMP = (function (_super) {
    __extends(Message_G2C_EXCITE_ALL_SERVER_FIRST_CAMP, _super);
    function Message_G2C_EXCITE_ALL_SERVER_FIRST_CAMP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_EXCITE_ALL_SERVER_FIRST_CAMP.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.firstPasslist = {};
        //  this.tollgataID = null
        //  this.roleID = null
        //  this.rolename = null
        //  this.passpower = null
    };
    Message_G2C_EXCITE_ALL_SERVER_FIRST_CAMP.prototype.pack = function (writer) {
    };
    Message_G2C_EXCITE_ALL_SERVER_FIRST_CAMP.prototype.unpack = function (reader) {
        this.firstPasslist = [];
        var num = reader.readUInt(); //通关记录条数
        for (var i = 1; i <= num; i++) {
            this.firstPasslist[i] = [];
            var tollgataID = reader.readUInt();
            var roleID = reader.readUInt();
            var rolename = reader.readString();
            var passpower = reader.readUInt();
            var headID = reader.readUInt();
            var VipLevel = reader.readUInt();
            JsUtil.arrayInstert(this.firstPasslist[i], tollgataID);
            JsUtil.arrayInstert(this.firstPasslist[i], roleID);
            JsUtil.arrayInstert(this.firstPasslist[i], rolename);
            JsUtil.arrayInstert(this.firstPasslist[i], passpower);
            JsUtil.arrayInstert(this.firstPasslist[i], headID);
            JsUtil.arrayInstert(this.firstPasslist[i], VipLevel);
        }
    };
    return Message_G2C_EXCITE_ALL_SERVER_FIRST_CAMP;
}(MessageBase));
__reflect(Message_G2C_EXCITE_ALL_SERVER_FIRST_CAMP.prototype, "Message_G2C_EXCITE_ALL_SERVER_FIRST_CAMP");
var Message_G2C_ROLE_CHAMPION_RANK = (function (_super) {
    __extends(Message_G2C_ROLE_CHAMPION_RANK, _super);
    function Message_G2C_ROLE_CHAMPION_RANK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_CHAMPION_RANK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.isFirst = 0; //为1表示是第一名
    };
    Message_G2C_ROLE_CHAMPION_RANK.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_CHAMPION_RANK.prototype.unpack = function (reader) {
        this.isFirst = reader.readUInt();
    };
    return Message_G2C_ROLE_CHAMPION_RANK;
}(MessageBase));
__reflect(Message_G2C_ROLE_CHAMPION_RANK.prototype, "Message_G2C_ROLE_CHAMPION_RANK");
var Message_C2G_ROLE_CHAMPION_RANK = (function (_super) {
    __extends(Message_C2G_ROLE_CHAMPION_RANK, _super);
    function Message_C2G_ROLE_CHAMPION_RANK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_CHAMPION_RANK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_ROLE_CHAMPION_RANK.prototype.pack = function (writer) {
    };
    Message_C2G_ROLE_CHAMPION_RANK.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_CHAMPION_RANK;
}(MessageBase));
__reflect(Message_C2G_ROLE_CHAMPION_RANK.prototype, "Message_C2G_ROLE_CHAMPION_RANK");
var Message_G2C_ROLE_WUDOU_RANK = (function (_super) {
    __extends(Message_G2C_ROLE_WUDOU_RANK, _super);
    function Message_G2C_ROLE_WUDOU_RANK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_WUDOU_RANK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.isFirst = 0; //为1表示是第一名
    };
    Message_G2C_ROLE_WUDOU_RANK.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_WUDOU_RANK.prototype.unpack = function (reader) {
        this.isFirst = reader.readUInt();
    };
    return Message_G2C_ROLE_WUDOU_RANK;
}(MessageBase));
__reflect(Message_G2C_ROLE_WUDOU_RANK.prototype, "Message_G2C_ROLE_WUDOU_RANK");
var Message_C2G_ROLE_WUDOU_RANK = (function (_super) {
    __extends(Message_C2G_ROLE_WUDOU_RANK, _super);
    function Message_C2G_ROLE_WUDOU_RANK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_WUDOU_RANK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_ROLE_WUDOU_RANK.prototype.pack = function (writer) {
    };
    Message_C2G_ROLE_WUDOU_RANK.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_WUDOU_RANK;
}(MessageBase));
__reflect(Message_C2G_ROLE_WUDOU_RANK.prototype, "Message_C2G_ROLE_WUDOU_RANK");
var Message_G2C_ROLE_CREATE_TIME = (function (_super) {
    __extends(Message_G2C_ROLE_CREATE_TIME, _super);
    function Message_G2C_ROLE_CREATE_TIME() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_CREATE_TIME.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.creatRoleTime = null;
    };
    Message_G2C_ROLE_CREATE_TIME.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_CREATE_TIME.prototype.unpack = function (reader) {
        this.creatRoleTime = reader.readUInt();
    };
    return Message_G2C_ROLE_CREATE_TIME;
}(MessageBase));
__reflect(Message_G2C_ROLE_CREATE_TIME.prototype, "Message_G2C_ROLE_CREATE_TIME");
var Message_C2G_ROLE_OPER_NODE = (function (_super) {
    __extends(Message_C2G_ROLE_OPER_NODE, _super);
    function Message_C2G_ROLE_OPER_NODE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_OPER_NODE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.guideIndex = null;
        //this.isdump = true
    };
    Message_C2G_ROLE_OPER_NODE.prototype.pack = function (writer) {
        writer.writeUInt(this.guideIndex);
    };
    Message_C2G_ROLE_OPER_NODE.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_OPER_NODE;
}(MessageBase));
__reflect(Message_C2G_ROLE_OPER_NODE.prototype, "Message_C2G_ROLE_OPER_NODE");
var Message_C2G_ROLE_BIND_ACCOUNT = (function (_super) {
    __extends(Message_C2G_ROLE_BIND_ACCOUNT, _super);
    function Message_C2G_ROLE_BIND_ACCOUNT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_BIND_ACCOUNT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_ROLE_BIND_ACCOUNT.prototype.pack = function (writer) {
    };
    Message_C2G_ROLE_BIND_ACCOUNT.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_BIND_ACCOUNT;
}(MessageBase));
__reflect(Message_C2G_ROLE_BIND_ACCOUNT.prototype, "Message_C2G_ROLE_BIND_ACCOUNT");
var Message_C2G_ROLE_INVITE_FRIEND = (function (_super) {
    __extends(Message_C2G_ROLE_INVITE_FRIEND, _super);
    function Message_C2G_ROLE_INVITE_FRIEND() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_INVITE_FRIEND.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.inviteType = 0;
        this.name = "";
        this.addResponseMsg(opCodes.G2C_ROLE_INVITE_FRIEND_LIST);
    };
    Message_C2G_ROLE_INVITE_FRIEND.prototype.pack = function (writer) {
        writer.writeUInt(this.inviteType);
        writer.writeString(this.name);
    };
    Message_C2G_ROLE_INVITE_FRIEND.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_INVITE_FRIEND;
}(MessageBase));
__reflect(Message_C2G_ROLE_INVITE_FRIEND.prototype, "Message_C2G_ROLE_INVITE_FRIEND");
var Message_G2C_ROLE_INVITE_FRIEND = (function (_super) {
    __extends(Message_G2C_ROLE_INVITE_FRIEND, _super);
    function Message_G2C_ROLE_INVITE_FRIEND() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_INVITE_FRIEND.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_G2C_ROLE_INVITE_FRIEND.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_INVITE_FRIEND.prototype.unpack = function (reader) {
    };
    return Message_G2C_ROLE_INVITE_FRIEND;
}(MessageBase));
__reflect(Message_G2C_ROLE_INVITE_FRIEND.prototype, "Message_G2C_ROLE_INVITE_FRIEND");
var Message_C2G_ROLE_INVITE_FRIEND_LIST = (function (_super) {
    __extends(Message_C2G_ROLE_INVITE_FRIEND_LIST, _super);
    function Message_C2G_ROLE_INVITE_FRIEND_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_INVITE_FRIEND_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.inviteType = 0;
    };
    Message_C2G_ROLE_INVITE_FRIEND_LIST.prototype.pack = function (writer) {
        writer.writeUInt(this.inviteType);
    };
    Message_C2G_ROLE_INVITE_FRIEND_LIST.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_INVITE_FRIEND_LIST;
}(MessageBase));
__reflect(Message_C2G_ROLE_INVITE_FRIEND_LIST.prototype, "Message_C2G_ROLE_INVITE_FRIEND_LIST");
var Message_G2C_ROLE_INVITE_FRIEND_LIST = (function (_super) {
    __extends(Message_G2C_ROLE_INVITE_FRIEND_LIST, _super);
    function Message_G2C_ROLE_INVITE_FRIEND_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_INVITE_FRIEND_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.inviteType = 0;
        this.inviteList = {};
    };
    Message_G2C_ROLE_INVITE_FRIEND_LIST.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_INVITE_FRIEND_LIST.prototype.unpack = function (reader) {
        this.inviteType = reader.readUInt();
        var count = reader.readUInt();
        var list = {};
        for (var i = 1; i <= count; i++) {
            var t = {};
            JsUtil.arrayInstert(t, reader.readString()); //名字或id
            JsUtil.arrayInstert(t, reader.readUInt()); //邀請时间
            JsUtil.arrayInstert(list, t);
        }
        this.inviteList = list;
    };
    return Message_G2C_ROLE_INVITE_FRIEND_LIST;
}(MessageBase));
__reflect(Message_G2C_ROLE_INVITE_FRIEND_LIST.prototype, "Message_G2C_ROLE_INVITE_FRIEND_LIST");
var Message_C2G_ROLE_INVITE_FRIEND_PRIZE = (function (_super) {
    __extends(Message_C2G_ROLE_INVITE_FRIEND_PRIZE, _super);
    function Message_C2G_ROLE_INVITE_FRIEND_PRIZE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_INVITE_FRIEND_PRIZE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.inviteType = 0;
        this.index = 0;
    };
    Message_C2G_ROLE_INVITE_FRIEND_PRIZE.prototype.pack = function (writer) {
        writer.writeUInt(this.inviteType);
        writer.writeUInt(this.index);
    };
    Message_C2G_ROLE_INVITE_FRIEND_PRIZE.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_INVITE_FRIEND_PRIZE;
}(MessageBase));
__reflect(Message_C2G_ROLE_INVITE_FRIEND_PRIZE.prototype, "Message_C2G_ROLE_INVITE_FRIEND_PRIZE");
var Message_C2G_ROLE_LEVEL_FUND = (function (_super) {
    __extends(Message_C2G_ROLE_LEVEL_FUND, _super);
    function Message_C2G_ROLE_LEVEL_FUND() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_LEVEL_FUND.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.investment = 0;
    };
    Message_C2G_ROLE_LEVEL_FUND.prototype.pack = function (writer) {
        writer.writeUInt(this.investment);
    };
    Message_C2G_ROLE_LEVEL_FUND.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_LEVEL_FUND;
}(MessageBase));
__reflect(Message_C2G_ROLE_LEVEL_FUND.prototype, "Message_C2G_ROLE_LEVEL_FUND");
var Message_G2C_ROLE_LEVEL_FUND = (function (_super) {
    __extends(Message_G2C_ROLE_LEVEL_FUND, _super);
    function Message_G2C_ROLE_LEVEL_FUND() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_LEVEL_FUND.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_G2C_ROLE_LEVEL_FUND.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_LEVEL_FUND.prototype.unpack = function (reader) {
    };
    return Message_G2C_ROLE_LEVEL_FUND;
}(MessageBase));
__reflect(Message_G2C_ROLE_LEVEL_FUND.prototype, "Message_G2C_ROLE_LEVEL_FUND");
var Message_C2G_ROLE_LEVEL_FUND_REWARD = (function (_super) {
    __extends(Message_C2G_ROLE_LEVEL_FUND_REWARD, _super);
    function Message_C2G_ROLE_LEVEL_FUND_REWARD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_LEVEL_FUND_REWARD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_ROLE_LEVEL_FUND_REWARD.prototype.pack = function (writer) {
    };
    Message_C2G_ROLE_LEVEL_FUND_REWARD.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_LEVEL_FUND_REWARD;
}(MessageBase));
__reflect(Message_C2G_ROLE_LEVEL_FUND_REWARD.prototype, "Message_C2G_ROLE_LEVEL_FUND_REWARD");
var Message_C2G_HERO_DISCOUNT_QUERY = (function (_super) {
    __extends(Message_C2G_HERO_DISCOUNT_QUERY, _super);
    function Message_C2G_HERO_DISCOUNT_QUERY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_HERO_DISCOUNT_QUERY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_HERO_DISCOUNT_QUERY.prototype.pack = function (writer) {
    };
    Message_C2G_HERO_DISCOUNT_QUERY.prototype.unpack = function (reader) {
    };
    return Message_C2G_HERO_DISCOUNT_QUERY;
}(MessageBase));
__reflect(Message_C2G_HERO_DISCOUNT_QUERY.prototype, "Message_C2G_HERO_DISCOUNT_QUERY");
var Message_G2C_HERO_DISCOUNT_QUERY = (function (_super) {
    __extends(Message_G2C_HERO_DISCOUNT_QUERY, _super);
    function Message_G2C_HERO_DISCOUNT_QUERY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_HERO_DISCOUNT_QUERY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.callPetInfo = {};
    };
    Message_G2C_HERO_DISCOUNT_QUERY.prototype.pack = function (writer) {
    };
    Message_G2C_HERO_DISCOUNT_QUERY.prototype.unpack = function (reader) {
        this.callPetInfo = table_load(reader.readString());
    };
    return Message_G2C_HERO_DISCOUNT_QUERY;
}(MessageBase));
__reflect(Message_G2C_HERO_DISCOUNT_QUERY.prototype, "Message_G2C_HERO_DISCOUNT_QUERY");
var Message_C2G_ROLE_HONOR_TITLE_LIST = (function (_super) {
    __extends(Message_C2G_ROLE_HONOR_TITLE_LIST, _super);
    function Message_C2G_ROLE_HONOR_TITLE_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_HONOR_TITLE_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.chengHaoType = 0;
    };
    Message_C2G_ROLE_HONOR_TITLE_LIST.prototype.pack = function (writer) {
        writer.writeUInt(this.chengHaoType);
    };
    Message_C2G_ROLE_HONOR_TITLE_LIST.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_HONOR_TITLE_LIST;
}(MessageBase));
__reflect(Message_C2G_ROLE_HONOR_TITLE_LIST.prototype, "Message_C2G_ROLE_HONOR_TITLE_LIST");
var Message_G2C_ROLE_HONOR_TITLE_LIST = (function (_super) {
    __extends(Message_G2C_ROLE_HONOR_TITLE_LIST, _super);
    function Message_G2C_ROLE_HONOR_TITLE_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_HONOR_TITLE_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.chengHaoRecord = {};
    };
    Message_G2C_ROLE_HONOR_TITLE_LIST.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_HONOR_TITLE_LIST.prototype.unpack = function (reader) {
        this.chengHaoRecord = table_load(reader.readString());
        //table_TLog.Debug(this.chengHaoRecord)
    };
    return Message_G2C_ROLE_HONOR_TITLE_LIST;
}(MessageBase));
__reflect(Message_G2C_ROLE_HONOR_TITLE_LIST.prototype, "Message_G2C_ROLE_HONOR_TITLE_LIST");
var Message_G2C_ROLE_HONOR_TITLE = (function (_super) {
    __extends(Message_G2C_ROLE_HONOR_TITLE, _super);
    function Message_G2C_ROLE_HONOR_TITLE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_HONOR_TITLE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.chengHaoId = 0;
    };
    Message_G2C_ROLE_HONOR_TITLE.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_HONOR_TITLE.prototype.unpack = function (reader) {
        this.chengHaoId = reader.readUInt();
    };
    return Message_G2C_ROLE_HONOR_TITLE;
}(MessageBase));
__reflect(Message_G2C_ROLE_HONOR_TITLE.prototype, "Message_G2C_ROLE_HONOR_TITLE");
var Message_C2G_ROLE_HONOR_TITLE = (function (_super) {
    __extends(Message_C2G_ROLE_HONOR_TITLE, _super);
    function Message_C2G_ROLE_HONOR_TITLE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_HONOR_TITLE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.chengHaoId = 0;
    };
    Message_C2G_ROLE_HONOR_TITLE.prototype.pack = function (writer) {
        writer.writeUInt(this.chengHaoId);
    };
    Message_C2G_ROLE_HONOR_TITLE.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_HONOR_TITLE;
}(MessageBase));
__reflect(Message_C2G_ROLE_HONOR_TITLE.prototype, "Message_C2G_ROLE_HONOR_TITLE");
var Message_C2G_ROLE_HONOR_POINT = (function (_super) {
    __extends(Message_C2G_ROLE_HONOR_POINT, _super);
    function Message_C2G_ROLE_HONOR_POINT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_HONOR_POINT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_ROLE_HONOR_POINT.prototype.pack = function (writer) {
    };
    Message_C2G_ROLE_HONOR_POINT.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_HONOR_POINT;
}(MessageBase));
__reflect(Message_C2G_ROLE_HONOR_POINT.prototype, "Message_C2G_ROLE_HONOR_POINT");
var Message_G2C_ROLE_HONOR_POINT = (function (_super) {
    __extends(Message_G2C_ROLE_HONOR_POINT, _super);
    function Message_G2C_ROLE_HONOR_POINT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_HONOR_POINT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.chengJiuDian = 0;
    };
    Message_G2C_ROLE_HONOR_POINT.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_HONOR_POINT.prototype.unpack = function (reader) {
        this.chengJiuDian = reader.readUInt();
    };
    return Message_G2C_ROLE_HONOR_POINT;
}(MessageBase));
__reflect(Message_G2C_ROLE_HONOR_POINT.prototype, "Message_G2C_ROLE_HONOR_POINT");
var Message_C2G_ROLE_HONOR_POINT_PRIZE = (function (_super) {
    __extends(Message_C2G_ROLE_HONOR_POINT_PRIZE, _super);
    function Message_C2G_ROLE_HONOR_POINT_PRIZE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_HONOR_POINT_PRIZE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.index = 0;
    };
    Message_C2G_ROLE_HONOR_POINT_PRIZE.prototype.pack = function (writer) {
        writer.writeUInt(this.index);
    };
    Message_C2G_ROLE_HONOR_POINT_PRIZE.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_HONOR_POINT_PRIZE;
}(MessageBase));
__reflect(Message_C2G_ROLE_HONOR_POINT_PRIZE.prototype, "Message_C2G_ROLE_HONOR_POINT_PRIZE");
var Message_G2C_ROLE_HONOR_HINT = (function (_super) {
    __extends(Message_G2C_ROLE_HONOR_HINT, _super);
    function Message_G2C_ROLE_HONOR_HINT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_HONOR_HINT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.getHonorList = null;
        this.fireEvent = true;
        this.isdump = true;
    };
    Message_G2C_ROLE_HONOR_HINT.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_HONOR_HINT.prototype.unpack = function (reader) {
        this.getHonorList = table_load(reader.readString());
    };
    return Message_G2C_ROLE_HONOR_HINT;
}(MessageBase));
__reflect(Message_G2C_ROLE_HONOR_HINT.prototype, "Message_G2C_ROLE_HONOR_HINT");
var Message_G2C_ROLE_VIP_ENTER_MAP = (function (_super) {
    __extends(Message_G2C_ROLE_VIP_ENTER_MAP, _super);
    function Message_G2C_ROLE_VIP_ENTER_MAP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_VIP_ENTER_MAP.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.roleInfo = null;
    };
    Message_G2C_ROLE_VIP_ENTER_MAP.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_VIP_ENTER_MAP.prototype.unpack = function (reader) {
        this.roleInfo = {};
        this.roleInfo.id = reader.readUInt();
        this.roleInfo.vipLevel = reader.readUShort();
        this.roleInfo.name = reader.readString();
    };
    return Message_G2C_ROLE_VIP_ENTER_MAP;
}(MessageBase));
__reflect(Message_G2C_ROLE_VIP_ENTER_MAP.prototype, "Message_G2C_ROLE_VIP_ENTER_MAP");
var Message_C2G_ROLE_CHANGE_NAME = (function (_super) {
    __extends(Message_C2G_ROLE_CHANGE_NAME, _super);
    function Message_C2G_ROLE_CHANGE_NAME() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_CHANGE_NAME.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.itemID = null;
        this.newName = null;
    };
    Message_C2G_ROLE_CHANGE_NAME.prototype.pack = function (writer) {
        writer.writeUInt(this.itemID);
        writer.writeString(this.newName);
    };
    Message_C2G_ROLE_CHANGE_NAME.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_CHANGE_NAME;
}(MessageBase));
__reflect(Message_C2G_ROLE_CHANGE_NAME.prototype, "Message_C2G_ROLE_CHANGE_NAME");
var Message_G2C_ROLE_CHANGE_NAME = (function (_super) {
    __extends(Message_G2C_ROLE_CHANGE_NAME, _super);
    function Message_G2C_ROLE_CHANGE_NAME() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_CHANGE_NAME.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.newName = null;
    };
    Message_G2C_ROLE_CHANGE_NAME.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_CHANGE_NAME.prototype.unpack = function (reader) {
        this.newName = reader.readString();
    };
    return Message_G2C_ROLE_CHANGE_NAME;
}(MessageBase));
__reflect(Message_G2C_ROLE_CHANGE_NAME.prototype, "Message_G2C_ROLE_CHANGE_NAME");
var Message_G2C_ROLE_PET_COURAGE_QUALITY = (function (_super) {
    __extends(Message_G2C_ROLE_PET_COURAGE_QUALITY, _super);
    function Message_G2C_ROLE_PET_COURAGE_QUALITY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_PET_COURAGE_QUALITY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.courageQuality = 0;
    };
    Message_G2C_ROLE_PET_COURAGE_QUALITY.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_PET_COURAGE_QUALITY.prototype.unpack = function (reader) {
        this.courageQuality = reader.readUInt();
    };
    return Message_G2C_ROLE_PET_COURAGE_QUALITY;
}(MessageBase));
__reflect(Message_G2C_ROLE_PET_COURAGE_QUALITY.prototype, "Message_G2C_ROLE_PET_COURAGE_QUALITY");
var Message_G2C_ROLE_PET_SOUL_POINT = (function (_super) {
    __extends(Message_G2C_ROLE_PET_SOUL_POINT, _super);
    function Message_G2C_ROLE_PET_SOUL_POINT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_PET_SOUL_POINT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petSoulPoint = {};
    };
    Message_G2C_ROLE_PET_SOUL_POINT.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_PET_SOUL_POINT.prototype.unpack = function (reader) {
        this.petSoulPoint = table_load(reader.readString());
    };
    return Message_G2C_ROLE_PET_SOUL_POINT;
}(MessageBase));
__reflect(Message_G2C_ROLE_PET_SOUL_POINT.prototype, "Message_G2C_ROLE_PET_SOUL_POINT");
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
var Message_G2C_COMMON_PRIZE_LIST = (function (_super) {
    __extends(Message_G2C_COMMON_PRIZE_LIST, _super);
    function Message_G2C_COMMON_PRIZE_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_COMMON_PRIZE_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.prizeList = {};
    };
    Message_G2C_COMMON_PRIZE_LIST.prototype.pack = function (writer) {
    };
    Message_G2C_COMMON_PRIZE_LIST.prototype.unpack = function (reader) {
        this.prizeList = table_load(reader.readString()); //{{entryId, count, isPet},{entryId, count, isPet},....}   isPet为1代表是伙伴，0是物品
    };
    return Message_G2C_COMMON_PRIZE_LIST;
}(MessageBase));
__reflect(Message_G2C_COMMON_PRIZE_LIST.prototype, "Message_G2C_COMMON_PRIZE_LIST");
var Message_G2C_ROLE_FUNCTION_NOTICE = (function (_super) {
    __extends(Message_G2C_ROLE_FUNCTION_NOTICE, _super);
    function Message_G2C_ROLE_FUNCTION_NOTICE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_FUNCTION_NOTICE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.noticeList = {};
    };
    Message_G2C_ROLE_FUNCTION_NOTICE.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_FUNCTION_NOTICE.prototype.unpack = function (reader) {
        this.noticeList = table_load(reader.readString());
    };
    return Message_G2C_ROLE_FUNCTION_NOTICE;
}(MessageBase));
__reflect(Message_G2C_ROLE_FUNCTION_NOTICE.prototype, "Message_G2C_ROLE_FUNCTION_NOTICE");
////////////////////////神兽////////////////////////////-
var Message_C2G_GODANIMAL_INFO = (function (_super) {
    __extends(Message_C2G_GODANIMAL_INFO, _super);
    function Message_C2G_GODANIMAL_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_GODANIMAL_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_GODANIMAL_INFO.prototype.pack = function (writer) {
    };
    Message_C2G_GODANIMAL_INFO.prototype.unpack = function (reader) {
    };
    return Message_C2G_GODANIMAL_INFO;
}(MessageBase));
__reflect(Message_C2G_GODANIMAL_INFO.prototype, "Message_C2G_GODANIMAL_INFO");
var Message_G2C_GODANIMAL_INFO = (function (_super) {
    __extends(Message_G2C_GODANIMAL_INFO, _super);
    function Message_G2C_GODANIMAL_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_GODANIMAL_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.level = null;
        this.savelist = null;
    };
    Message_G2C_GODANIMAL_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_GODANIMAL_INFO.prototype.unpack = function (reader) {
        this.level = reader.readUChar();
        this.savelist = table_load(reader.readString());
    };
    return Message_G2C_GODANIMAL_INFO;
}(MessageBase));
__reflect(Message_G2C_GODANIMAL_INFO.prototype, "Message_G2C_GODANIMAL_INFO");
var Message_C2G_GODANIMAL_LEVEL_UP = (function (_super) {
    __extends(Message_C2G_GODANIMAL_LEVEL_UP, _super);
    function Message_C2G_GODANIMAL_LEVEL_UP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_GODANIMAL_LEVEL_UP.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_GODANIMAL_LEVEL_UP.prototype.pack = function (writer) {
    };
    Message_C2G_GODANIMAL_LEVEL_UP.prototype.unpack = function (reader) {
    };
    return Message_C2G_GODANIMAL_LEVEL_UP;
}(MessageBase));
__reflect(Message_C2G_GODANIMAL_LEVEL_UP.prototype, "Message_C2G_GODANIMAL_LEVEL_UP");
var Message_G2C_GODANIMAL_PREVIEW_FORCE = (function (_super) {
    __extends(Message_G2C_GODANIMAL_PREVIEW_FORCE, _super);
    function Message_G2C_GODANIMAL_PREVIEW_FORCE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_GODANIMAL_PREVIEW_FORCE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.power = null;
    };
    Message_G2C_GODANIMAL_PREVIEW_FORCE.prototype.pack = function (writer) {
    };
    Message_G2C_GODANIMAL_PREVIEW_FORCE.prototype.unpack = function (reader) {
        this.power = tonumber(reader.readString());
    };
    return Message_G2C_GODANIMAL_PREVIEW_FORCE;
}(MessageBase));
__reflect(Message_G2C_GODANIMAL_PREVIEW_FORCE.prototype, "Message_G2C_GODANIMAL_PREVIEW_FORCE");
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
var Message_C2G_ROLE_REMOVE_TIMER = (function (_super) {
    __extends(Message_C2G_ROLE_REMOVE_TIMER, _super);
    function Message_C2G_ROLE_REMOVE_TIMER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_REMOVE_TIMER.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.opSaveRecordKey = -1;
    };
    Message_C2G_ROLE_REMOVE_TIMER.prototype.pack = function (writer) {
        writer.writeUInt(this.opSaveRecordKey);
    };
    Message_C2G_ROLE_REMOVE_TIMER.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_REMOVE_TIMER;
}(MessageBase));
__reflect(Message_C2G_ROLE_REMOVE_TIMER.prototype, "Message_C2G_ROLE_REMOVE_TIMER");
//# sourceMappingURL=RoleMessage.js.map