/*
作者:
    yangguiming
    
创建时间：
   2017.02.27(周一)

意图：
   军团副本协议
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
////////////////////////////////////////////////////////////////////////////
//-公会副本的创建
var Message_C2G_FACTIONMAP_CREATE = (function (_super) {
    __extends(Message_C2G_FACTIONMAP_CREATE, _super);
    function Message_C2G_FACTIONMAP_CREATE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTIONMAP_CREATE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.index = 0;
    };
    Message_C2G_FACTIONMAP_CREATE.prototype.pack = function (writer) {
        writer.writeUInt(this.index);
    };
    Message_C2G_FACTIONMAP_CREATE.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTIONMAP_CREATE;
}(MessageBase));
__reflect(Message_C2G_FACTIONMAP_CREATE.prototype, "Message_C2G_FACTIONMAP_CREATE");
////////////////////////////////////////////////////////////////////////////
//-公会副本的创建返回
var Message_G2C_FACTIONMAP_CREATE = (function (_super) {
    __extends(Message_G2C_FACTIONMAP_CREATE, _super);
    function Message_G2C_FACTIONMAP_CREATE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTIONMAP_CREATE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.index = 0;
    };
    Message_G2C_FACTIONMAP_CREATE.prototype.pack = function (writer) {
    };
    Message_G2C_FACTIONMAP_CREATE.prototype.unpack = function (reader) {
        this.index = reader.readUInt();
    };
    return Message_G2C_FACTIONMAP_CREATE;
}(MessageBase));
__reflect(Message_G2C_FACTIONMAP_CREATE.prototype, "Message_G2C_FACTIONMAP_CREATE");
////////////////////////////////////////////////////////////////////////////
//-公会副本的进入返回
var Message_C2G_FACTIONMAP_ENTER = (function (_super) {
    __extends(Message_C2G_FACTIONMAP_ENTER, _super);
    function Message_C2G_FACTIONMAP_ENTER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTIONMAP_ENTER.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.index = 0;
    };
    Message_C2G_FACTIONMAP_ENTER.prototype.pack = function (writer) {
        writer.writeUInt(this.index);
    };
    Message_C2G_FACTIONMAP_ENTER.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTIONMAP_ENTER;
}(MessageBase));
__reflect(Message_C2G_FACTIONMAP_ENTER.prototype, "Message_C2G_FACTIONMAP_ENTER");
////////////////////////////////////////////////////////////////////////////
//-公会副本的进入返回
var Message_G2C_FACTIONMAP_ENTER = (function (_super) {
    __extends(Message_G2C_FACTIONMAP_ENTER, _super);
    function Message_G2C_FACTIONMAP_ENTER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTIONMAP_ENTER.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.index = 0;
    };
    Message_G2C_FACTIONMAP_ENTER.prototype.pack = function (writer) {
    };
    Message_G2C_FACTIONMAP_ENTER.prototype.unpack = function (reader) {
        this.index = reader.readUInt();
    };
    return Message_G2C_FACTIONMAP_ENTER;
}(MessageBase));
__reflect(Message_G2C_FACTIONMAP_ENTER.prototype, "Message_G2C_FACTIONMAP_ENTER");
////////////////////////////////////////////////////////////////////////////
//-离开公会副本
var Message_C2G_FACTIONMAP_LEAVE = (function (_super) {
    __extends(Message_C2G_FACTIONMAP_LEAVE, _super);
    function Message_C2G_FACTIONMAP_LEAVE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTIONMAP_LEAVE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FACTIONMAP_LEAVE.prototype.pack = function (writer) {
    };
    Message_C2G_FACTIONMAP_LEAVE.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTIONMAP_LEAVE;
}(MessageBase));
__reflect(Message_C2G_FACTIONMAP_LEAVE.prototype, "Message_C2G_FACTIONMAP_LEAVE");
////////////////////////////////////////////////////////////////////////////
//-离开公会副本的返回
var Message_G2C_FACTIONMAP_LEAVE = (function (_super) {
    __extends(Message_G2C_FACTIONMAP_LEAVE, _super);
    function Message_G2C_FACTIONMAP_LEAVE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTIONMAP_LEAVE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_G2C_FACTIONMAP_LEAVE.prototype.pack = function (writer) {
    };
    Message_G2C_FACTIONMAP_LEAVE.prototype.unpack = function (reader) {
    };
    return Message_G2C_FACTIONMAP_LEAVE;
}(MessageBase));
__reflect(Message_G2C_FACTIONMAP_LEAVE.prototype, "Message_G2C_FACTIONMAP_LEAVE");
////////////////////////////////////////////////////////////////////////////
//-公会副本战斗
var Message_C2G_FACTIONMAP_FIGHT = (function (_super) {
    __extends(Message_C2G_FACTIONMAP_FIGHT, _super);
    function Message_C2G_FACTIONMAP_FIGHT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTIONMAP_FIGHT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.npcId = 0;
    };
    Message_C2G_FACTIONMAP_FIGHT.prototype.pack = function (writer) {
        writer.writeUInt(this.npcId);
    };
    Message_C2G_FACTIONMAP_FIGHT.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTIONMAP_FIGHT;
}(MessageBase));
__reflect(Message_C2G_FACTIONMAP_FIGHT.prototype, "Message_C2G_FACTIONMAP_FIGHT");
////////////////////////////////////////////////////////////////////////////
//-查询当前开启状态
var Message_C2G_FACTIONMAP_QUERY = (function (_super) {
    __extends(Message_C2G_FACTIONMAP_QUERY, _super);
    function Message_C2G_FACTIONMAP_QUERY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTIONMAP_QUERY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FACTIONMAP_QUERY.prototype.pack = function (writer) {
    };
    Message_C2G_FACTIONMAP_QUERY.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTIONMAP_QUERY;
}(MessageBase));
__reflect(Message_C2G_FACTIONMAP_QUERY.prototype, "Message_C2G_FACTIONMAP_QUERY");
////////////////////////////////////////////////////////////////////////////
//-查询当前开启状态返回
var Message_G2C_FACTIONMAP_QUERY = (function (_super) {
    __extends(Message_G2C_FACTIONMAP_QUERY, _super);
    function Message_G2C_FACTIONMAP_QUERY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTIONMAP_QUERY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.queryInfo = {};
    };
    Message_G2C_FACTIONMAP_QUERY.prototype.pack = function (writer) {
    };
    Message_G2C_FACTIONMAP_QUERY.prototype.unpack = function (reader) {
        this.queryInfo.index = reader.readUInt();
        if (this.queryInfo.index != 0) {
            this.queryInfo.stage = reader.readUInt(); //当前阶段
            this.queryInfo.killCount = reader.readUInt(); //当前阶段自己击杀数
            this.queryInfo.stageFinishTime = reader.readUInt(); //当前阶段剩余时间(自1970年)
            this.queryInfo.allKillCount = reader.readUInt(); //当前阶段公会击杀总数
            this.queryInfo.bossDisappearTime = reader.readUInt(); //哥布林消失时间
            this.queryInfo.bossKillCount = reader.readUInt(); //哥布林击杀数
            this.queryInfo.bossStatus = reader.readUChar(); //当前哥布林状态 1战斗 1空闲
        }
    };
    return Message_G2C_FACTIONMAP_QUERY;
}(MessageBase));
__reflect(Message_G2C_FACTIONMAP_QUERY.prototype, "Message_G2C_FACTIONMAP_QUERY");
////////////////////////////////////////////////////////////////////////////
//-军团死亡时候快速复活
var Message_C2G_FACTIONMAP_REVIVE = (function (_super) {
    __extends(Message_C2G_FACTIONMAP_REVIVE, _super);
    function Message_C2G_FACTIONMAP_REVIVE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTIONMAP_REVIVE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FACTIONMAP_REVIVE.prototype.pack = function (writer) {
    };
    Message_C2G_FACTIONMAP_REVIVE.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTIONMAP_REVIVE;
}(MessageBase));
__reflect(Message_C2G_FACTIONMAP_REVIVE.prototype, "Message_C2G_FACTIONMAP_REVIVE");
////////////////////////////////////////////////////////////////////////////
//-军团全服排名申请
var Message_C2G_FACTIONMAP_RANKDATA = (function (_super) {
    __extends(Message_C2G_FACTIONMAP_RANKDATA, _super);
    function Message_C2G_FACTIONMAP_RANKDATA() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTIONMAP_RANKDATA.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FACTIONMAP_RANKDATA.prototype.pack = function (writer) {
    };
    Message_C2G_FACTIONMAP_RANKDATA.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTIONMAP_RANKDATA;
}(MessageBase));
__reflect(Message_C2G_FACTIONMAP_RANKDATA.prototype, "Message_C2G_FACTIONMAP_RANKDATA");
////////////////////////////////////////////////////////////////////////////
//-军团全服排名申请
var Message_G2C_FACTIONMAP_RANKDATA = (function (_super) {
    __extends(Message_G2C_FACTIONMAP_RANKDATA, _super);
    function Message_G2C_FACTIONMAP_RANKDATA() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTIONMAP_RANKDATA.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.list = {};
    };
    Message_G2C_FACTIONMAP_RANKDATA.prototype.pack = function (writer) {
    };
    Message_G2C_FACTIONMAP_RANKDATA.prototype.unpack = function (reader) {
        var count = reader.readUInt();
        for (var i = 1; i <= count; i++) {
            var list = {};
            list.index = reader.readUInt();
            list.time = reader.readUInt();
            list.useTime = reader.readUInt();
            list.legionId = reader.readUInt();
            list.legionIcon = reader.readUInt();
            list.name = reader.readString();
            this.list[i] = list;
        }
    };
    return Message_G2C_FACTIONMAP_RANKDATA;
}(MessageBase));
__reflect(Message_G2C_FACTIONMAP_RANKDATA.prototype, "Message_G2C_FACTIONMAP_RANKDATA");
//接收组内事件(军团副本的开启，军团BOSS被击杀)
var Message_G2C_GLOBAL_GROUP_EVENT = (function (_super) {
    __extends(Message_G2C_GLOBAL_GROUP_EVENT, _super);
    function Message_G2C_GLOBAL_GROUP_EVENT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_GLOBAL_GROUP_EVENT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.event = null;
        this.data = {};
        this.fireEvent = true;
    };
    Message_G2C_GLOBAL_GROUP_EVENT.prototype.pack = function (writer) {
    };
    Message_G2C_GLOBAL_GROUP_EVENT.prototype.unpack = function (reader) {
        this.event = reader.readUInt();
        this.data = table_load(reader.readString());
    };
    return Message_G2C_GLOBAL_GROUP_EVENT;
}(MessageBase));
__reflect(Message_G2C_GLOBAL_GROUP_EVENT.prototype, "Message_G2C_GLOBAL_GROUP_EVENT");
//# sourceMappingURL=ClubFubenMessage.js.map