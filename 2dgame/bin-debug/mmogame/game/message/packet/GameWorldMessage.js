// TypeScript file
//角色信息，第一次进入游戏加载
// class Message_G2C_HERO_INFO extends MessageBase {
//     info: HeroInfo;
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
//     public initObj(...params: any[]): void {
//     }
//     public unpack(reader: BinaryStream) {
//         this.info = HeroInfo.createObj();
//         this.info.read(reader);
//     }
// }
var Message_G2C_RPC_CALL = (function (_super) {
    __extends(Message_G2C_RPC_CALL, _super);
    function Message_G2C_RPC_CALL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_RPC_CALL.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_G2C_RPC_CALL.prototype.pack = function (writer) {
    };
    Message_G2C_RPC_CALL.prototype.unpack = function (reader) {
        RpcProxy.unpackMessage(reader);
    };
    return Message_G2C_RPC_CALL;
}(MessageBase));
__reflect(Message_G2C_RPC_CALL.prototype, "Message_G2C_RPC_CALL");
var Message_G2C_RPC_CALL_UPDATE = (function (_super) {
    __extends(Message_G2C_RPC_CALL_UPDATE, _super);
    function Message_G2C_RPC_CALL_UPDATE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_RPC_CALL_UPDATE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_G2C_RPC_CALL_UPDATE.prototype.pack = function (writer) {
    };
    Message_G2C_RPC_CALL_UPDATE.prototype.unpack = function (reader) {
        RpcProxy.unpackUpdateMessage(reader);
    };
    return Message_G2C_RPC_CALL_UPDATE;
}(MessageBase));
__reflect(Message_G2C_RPC_CALL_UPDATE.prototype, "Message_G2C_RPC_CALL_UPDATE");
//申请跳地图
var Message_C2G_MAP_ENTER = (function (_super) {
    __extends(Message_C2G_MAP_ENTER, _super);
    function Message_C2G_MAP_ENTER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_MAP_ENTER.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.addWriteProtocol(MessageProtocol.UINT32, "index");
    };
    return Message_C2G_MAP_ENTER;
}(MessageBase));
__reflect(Message_C2G_MAP_ENTER.prototype, "Message_C2G_MAP_ENTER");
//回应跳地图
var Message_G2C_MAP_ENTER = (function (_super) {
    __extends(Message_G2C_MAP_ENTER, _super);
    function Message_G2C_MAP_ENTER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_MAP_ENTER.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.addReadProtocol(MessageProtocol.UINT32, "mapId");
        this.addReadProtocol(MessageProtocol.UINT16, "cellx");
        this.addReadProtocol(MessageProtocol.UINT16, "celly");
    };
    return Message_G2C_MAP_ENTER;
}(MessageBase));
__reflect(Message_G2C_MAP_ENTER.prototype, "Message_G2C_MAP_ENTER");
//申请移动
var Message_C2G_MOVE = (function (_super) {
    __extends(Message_C2G_MOVE, _super);
    function Message_C2G_MOVE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_MOVE.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.num = 1;
        this.addWriteProtocol(MessageProtocol.UINT16, "num");
        this.addWriteProtocol(MessageProtocol.UINT16, "cellx");
        this.addWriteProtocol(MessageProtocol.UINT16, "celly");
        this.isdump = false;
    };
    return Message_C2G_MOVE;
}(MessageBase));
__reflect(Message_C2G_MOVE.prototype, "Message_C2G_MOVE");
//服务器响应移动
var Message_G2C_MOVE = (function (_super) {
    __extends(Message_G2C_MOVE, _super);
    function Message_G2C_MOVE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_MOVE.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.addReadProtocol(MessageProtocol.UINT32, "id");
        this.addReadProtocol(MessageProtocol.UINT16, "type");
        this.addReadProtocol(MessageProtocol.UINT16, "cellx");
        this.addReadProtocol(MessageProtocol.UINT16, "celly");
    };
    return Message_G2C_MOVE;
}(MessageBase));
__reflect(Message_G2C_MOVE.prototype, "Message_G2C_MOVE");
//增加角色
// class Message_G2C_ROLE_ADD extends MessageBase {
//     mapId: number;
//     cellx: number;
//     celly: number;
//     info: PlayerInfo;
//     public initObj(...params: any[]): void {
//     }
//     public unpack(reader: BinaryStream) {
//         //this.info = HeroInfo.createObj();
//         this.mapId = reader.readUShort()
//         this.cellx = reader.readUShort()
//         this.celly = reader.readUShort()
//         this.info = PlayerInfo.createObj();
//         this.info.read(reader)
//     }
// }
// //角色外形变化
// class Message_G2C_ROLE_CHANGE extends MessageBase {
//     mapId: number;
//     cellx: number;
//     celly: number;
//     info: PlayerInfo;
//     public initObj(...params: any[]): void {
//     }
//     public unpack(reader: BinaryStream) {
//         //this.info = HeroInfo.createObj();
//         this.mapId = reader.readUShort()
//         this.cellx = reader.readUShort()
//         this.celly = reader.readUShort()
//         this.info = PlayerInfo.createObj();
//         this.info.read(reader)
//     }
// }
//对象出现
// class Message_G2C_OBJECT_ADD extends MessageBase {
//     id: number;
//     Type: number;
//     oType: number;
//     info: NpcInfo;
//     public initObj(...params: any[]): void {
//     }
//     public unpack(reader: BinaryStream) {
//         //this.info = HeroInfo.createObj();
//         this.id = reader.readUInt()
//         this.Type = reader.readUShort()
//         this.oType = reader.readUShort()
//         this.info = NpcInfo.createObj();
//         this.info.read(reader)
//         this.info.id = this.id //记录info的id  
//         //this.info.args = table_load(reader.readString());
//     }
// }
//对象属性更新
// class Message_G2C_OBJECT_UPDATE extends MessageBase {
//     info: HeroInfo;
//     public initObj(...params: any[]): void {
//     }
//     public unpack(reader: BinaryStream) {
//         //this.info = HeroInfo.createObj();
//         this.info = HeroInfo.newObj();
//         this.info.readUpdate(reader)
//     }
// }
//收到结果码
var Message_SMSG_RESULT = (function (_super) {
    __extends(Message_SMSG_RESULT, _super);
    function Message_SMSG_RESULT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_SMSG_RESULT.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    Message_SMSG_RESULT.prototype.unpack = function (reader) {
        this.op = reader.readUShort(); // 客户端发出的命令
        this.result = reader.readUShort(); // 返回结果
        this.count = reader.readUShort(); // 参数个数
        var args = {}; // 参数表
        for (var i = 1; i <= this.count; i++) {
            var dtype = reader.readUShort(); // 参数类型
            var data;
            if (dtype == resultDataType.INT) {
                data = reader.readInt();
            }
            else if (dtype == resultDataType.FLOAT) {
                data = reader.readFloat();
            }
            else if (dtype == resultDataType.STRING) {
                data = reader.readString();
            }
            else if (dtype == resultDataType.LINK) {
                data = reader.readString();
            }
            else if (dtype == resultDataType.UINT) {
                data = reader.readUInt();
                // }else if(dtype == resultDataType.USHORT){
                //     data = reader.readUShort()
                // }else if(dtype == resultDataType.BYTE){
                //     data = reader.readUChar()
            }
            else {
                TLog.Debug("_________________________________type error");
            }
            args[i] = data;
        }
        this.args = args;
    };
    return Message_SMSG_RESULT;
}(MessageBase));
__reflect(Message_SMSG_RESULT.prototype, "Message_SMSG_RESULT");
//字符串消息
var Message_SMSG_RESULT_STRING = (function (_super) {
    __extends(Message_SMSG_RESULT_STRING, _super);
    function Message_SMSG_RESULT_STRING() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_SMSG_RESULT_STRING.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.addReadProtocol(MessageProtocol.STRING, "info");
        this.addReadProtocol(MessageProtocol.UINT8, "type");
    };
    return Message_SMSG_RESULT_STRING;
}(MessageBase));
__reflect(Message_SMSG_RESULT_STRING.prototype, "Message_SMSG_RESULT_STRING");
//后台踢下线
var Message_SMSG_RESULT_LOGOUT = (function (_super) {
    __extends(Message_SMSG_RESULT_LOGOUT, _super);
    function Message_SMSG_RESULT_LOGOUT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_SMSG_RESULT_LOGOUT.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.addReadProtocol(MessageProtocol.UINT32, "plrId");
    };
    return Message_SMSG_RESULT_LOGOUT;
}(MessageBase));
__reflect(Message_SMSG_RESULT_LOGOUT.prototype, "Message_SMSG_RESULT_LOGOUT");
//角色消失
// class Message_G2C_DISAPPEAR extends MessageBase {
//     id: number;
//     Type: number;
//     public initObj(...params: any[]): void {
//         this.addReadProtocol(MessageProtocol.UINT32, "id");
//         this.addReadProtocol(MessageProtocol.UINT16, "Type");
//     }
// }
//////////////////////////////////////////////////////////////////-
//战斗重链标志，保证只在战斗重链时才会发送，并且相邻于hero_info之前发送
var Message_G2C_FIGHT_RECONNECT_NOTICE = (function (_super) {
    __extends(Message_G2C_FIGHT_RECONNECT_NOTICE, _super);
    function Message_G2C_FIGHT_RECONNECT_NOTICE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_RECONNECT_NOTICE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_G2C_FIGHT_RECONNECT_NOTICE.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_RECONNECT_NOTICE.prototype.unpack = function (reader) {
    };
    return Message_G2C_FIGHT_RECONNECT_NOTICE;
}(MessageBase));
__reflect(Message_G2C_FIGHT_RECONNECT_NOTICE.prototype, "Message_G2C_FIGHT_RECONNECT_NOTICE");
//服务器等级
var Message_G2C_GLOBAL_SERVERLEVEL = (function (_super) {
    __extends(Message_G2C_GLOBAL_SERVERLEVEL, _super);
    function Message_G2C_GLOBAL_SERVERLEVEL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_GLOBAL_SERVERLEVEL.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.server_level = 0;
    };
    Message_G2C_GLOBAL_SERVERLEVEL.prototype.pack = function (writer) {
    };
    Message_G2C_GLOBAL_SERVERLEVEL.prototype.unpack = function (reader) {
        this.server_level = reader.readUInt();
    };
    return Message_G2C_GLOBAL_SERVERLEVEL;
}(MessageBase));
__reflect(Message_G2C_GLOBAL_SERVERLEVEL.prototype, "Message_G2C_GLOBAL_SERVERLEVEL");
var Message_C2G_FIGHT_TEST_PK = (function (_super) {
    __extends(Message_C2G_FIGHT_TEST_PK, _super);
    function Message_C2G_FIGHT_TEST_PK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_TEST_PK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.targetId = 0;
    };
    Message_C2G_FIGHT_TEST_PK.prototype.pack = function (writer) {
        writer.writeUInt(this.targetId);
    };
    Message_C2G_FIGHT_TEST_PK.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_TEST_PK;
}(MessageBase));
__reflect(Message_C2G_FIGHT_TEST_PK.prototype, "Message_C2G_FIGHT_TEST_PK");
// 发起PK
var Message_C2G_FIGHT_FPK = (function (_super) {
    __extends(Message_C2G_FIGHT_FPK, _super);
    function Message_C2G_FIGHT_FPK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_FPK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.targetId = 0;
    };
    Message_C2G_FIGHT_FPK.prototype.pack = function (writer) {
        writer.writeUInt(this.targetId);
    };
    Message_C2G_FIGHT_FPK.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_FPK;
}(MessageBase));
__reflect(Message_C2G_FIGHT_FPK.prototype, "Message_C2G_FIGHT_FPK");
// 进入空间  DAILY 代表爬塔
var Message_C2G_ROLE_ENTER_SPACE = (function (_super) {
    __extends(Message_C2G_ROLE_ENTER_SPACE, _super);
    function Message_C2G_ROLE_ENTER_SPACE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_ENTER_SPACE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.actIndex = OrdinaryActivityIndex.NULL; //OrdinaryActivityIndex
    };
    Message_C2G_ROLE_ENTER_SPACE.prototype.pack = function (writer) {
        writer.writeUInt(this.actIndex);
    };
    Message_C2G_ROLE_ENTER_SPACE.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_ENTER_SPACE;
}(MessageBase));
__reflect(Message_C2G_ROLE_ENTER_SPACE.prototype, "Message_C2G_ROLE_ENTER_SPACE");
// 进入空间  DAILY 代表爬塔
var Message_G2C_ROLE_ENTER_SPACE = (function (_super) {
    __extends(Message_G2C_ROLE_ENTER_SPACE, _super);
    function Message_G2C_ROLE_ENTER_SPACE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_ENTER_SPACE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.space = null;
    };
    Message_G2C_ROLE_ENTER_SPACE.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_ENTER_SPACE.prototype.unpack = function (reader) {
        this.space = reader.readString(); //"MINE"(航海)
    };
    return Message_G2C_ROLE_ENTER_SPACE;
}(MessageBase));
__reflect(Message_G2C_ROLE_ENTER_SPACE.prototype, "Message_G2C_ROLE_ENTER_SPACE");
//离开空间， null标识在生活场景
var Message_C2G_ROLE_LEAVE_SPACE = (function (_super) {
    __extends(Message_C2G_ROLE_LEAVE_SPACE, _super);
    function Message_C2G_ROLE_LEAVE_SPACE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_LEAVE_SPACE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_ROLE_LEAVE_SPACE.prototype.pack = function (writer) {
    };
    Message_C2G_ROLE_LEAVE_SPACE.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_LEAVE_SPACE;
}(MessageBase));
__reflect(Message_C2G_ROLE_LEAVE_SPACE.prototype, "Message_C2G_ROLE_LEAVE_SPACE");
//离开空间， null标识在生活场景
var Message_G2C_ROLE_LEAVE_SPACE = (function (_super) {
    __extends(Message_G2C_ROLE_LEAVE_SPACE, _super);
    function Message_G2C_ROLE_LEAVE_SPACE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_LEAVE_SPACE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_G2C_ROLE_LEAVE_SPACE.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_LEAVE_SPACE.prototype.unpack = function (reader) {
    };
    return Message_G2C_ROLE_LEAVE_SPACE;
}(MessageBase));
__reflect(Message_G2C_ROLE_LEAVE_SPACE.prototype, "Message_G2C_ROLE_LEAVE_SPACE");
//按钮提示消息
var Message_G2C_ROLE_STATUS_CHANGE = (function (_super) {
    __extends(Message_G2C_ROLE_STATUS_CHANGE, _super);
    function Message_G2C_ROLE_STATUS_CHANGE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_STATUS_CHANGE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.btnTipsList = null;
        // this.getType = null
        // this.fireEvent = true
        this.isdump = true;
    };
    Message_G2C_ROLE_STATUS_CHANGE.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_STATUS_CHANGE.prototype.unpack = function (reader) {
        //this.getType = reader.readInt()
        this.btnTipsList = table_load(reader.readString());
    };
    return Message_G2C_ROLE_STATUS_CHANGE;
}(MessageBase));
__reflect(Message_G2C_ROLE_STATUS_CHANGE.prototype, "Message_G2C_ROLE_STATUS_CHANGE");
var Message_C2G_ROLE_STATUS_CHANGE = (function (_super) {
    __extends(Message_C2G_ROLE_STATUS_CHANGE, _super);
    function Message_C2G_ROLE_STATUS_CHANGE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_STATUS_CHANGE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var windowIndex = null;
    };
    Message_C2G_ROLE_STATUS_CHANGE.prototype.pack = function (writer) {
        writer.writeUInt(this.windowIndex);
    };
    Message_C2G_ROLE_STATUS_CHANGE.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_STATUS_CHANGE;
}(MessageBase));
__reflect(Message_C2G_ROLE_STATUS_CHANGE.prototype, "Message_C2G_ROLE_STATUS_CHANGE");
// 系统公告
//class Message_G2C_CHANNEL_SYSTEM extends MessageBase{
//public initObj(...args:any[]):void {
//	this.content = null
//	this.count = 0
//}
//
//pack( writer){
//   
//}
//
//unpack( reader){
//	this.count = reader.readInt()
//	this.content = reader.readString()
//}
//}
//////////////////////////////////////////////////////////////////-
//冲值
var Message_C2G_PAY = (function (_super) {
    __extends(Message_C2G_PAY, _super);
    function Message_C2G_PAY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_PAY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.params = 0;
    };
    Message_C2G_PAY.prototype.pack = function (writer) {
        writer.writeString(this.params);
    };
    Message_C2G_PAY.prototype.unpack = function (reader) {
    };
    return Message_C2G_PAY;
}(MessageBase));
__reflect(Message_C2G_PAY.prototype, "Message_C2G_PAY");
//冲值 假的
var Message_C2G_PAY_CHEAT = (function (_super) {
    __extends(Message_C2G_PAY_CHEAT, _super);
    function Message_C2G_PAY_CHEAT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_PAY_CHEAT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.params = 0;
    };
    Message_C2G_PAY_CHEAT.prototype.pack = function (writer) {
        writer.writeString(this.params);
    };
    Message_C2G_PAY_CHEAT.prototype.unpack = function (reader) {
    };
    return Message_C2G_PAY_CHEAT;
}(MessageBase));
__reflect(Message_C2G_PAY_CHEAT.prototype, "Message_C2G_PAY_CHEAT");
//冲值
var Message_G2C_PAY = (function (_super) {
    __extends(Message_G2C_PAY, _super);
    function Message_G2C_PAY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_PAY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.chargeValue = 0; //冲了多少钱
        this.gainValue = 0; //得了多少晶石
        this.rebateValue = 0; //送了多少晶石
        this.firstRebateValue = 0; //首冲送了多少晶石
        this.warHornId = 0; //得了哪个号角
    };
    Message_G2C_PAY.prototype.pack = function (writer) {
    };
    Message_G2C_PAY.prototype.unpack = function (reader) {
        this.chargeValue = reader.readUInt();
        this.gainValue = reader.readUInt();
        this.rebateValue = reader.readUInt();
        this.firstRebateValue = reader.readUInt();
        this.warHornId = reader.readUInt();
    };
    return Message_G2C_PAY;
}(MessageBase));
__reflect(Message_G2C_PAY.prototype, "Message_G2C_PAY");
//分享
var Message_C2G_SHARE = (function (_super) {
    __extends(Message_C2G_SHARE, _super);
    function Message_C2G_SHARE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_SHARE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.params = "";
    };
    Message_C2G_SHARE.prototype.pack = function (writer) {
        writer.writeString(this.params);
    };
    Message_C2G_SHARE.prototype.unpack = function (reader) {
    };
    return Message_C2G_SHARE;
}(MessageBase));
__reflect(Message_C2G_SHARE.prototype, "Message_C2G_SHARE");
//分享
var Message_G2C_SHARE = (function (_super) {
    __extends(Message_G2C_SHARE, _super);
    function Message_G2C_SHARE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_SHARE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.goldValue = 0; //奖励了多少金币
        this.jinshiValue = 0; //奖励了多少晶石
    };
    Message_G2C_SHARE.prototype.pack = function (writer) {
    };
    Message_G2C_SHARE.prototype.unpack = function (reader) {
        reader.readUInt(this.goldValue);
        reader.readUInt(this.jinshiValue);
    };
    return Message_G2C_SHARE;
}(MessageBase));
__reflect(Message_G2C_SHARE.prototype, "Message_G2C_SHARE");
//分享奖励
var Message_C2G_PLAT_DAILY_SHARE = (function (_super) {
    __extends(Message_C2G_PLAT_DAILY_SHARE, _super);
    function Message_C2G_PLAT_DAILY_SHARE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_PLAT_DAILY_SHARE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.platKey = null;
    };
    Message_C2G_PLAT_DAILY_SHARE.prototype.pack = function (writer) {
        //writer.writeUInt(this.platKey)
        writer.writeString(this.platKey);
    };
    Message_C2G_PLAT_DAILY_SHARE.prototype.unpack = function (reader) {
    };
    return Message_C2G_PLAT_DAILY_SHARE;
}(MessageBase));
__reflect(Message_C2G_PLAT_DAILY_SHARE.prototype, "Message_C2G_PLAT_DAILY_SHARE");
//新手记录
var Message_G2C_ROLE_NEW_ERRANTRY = (function (_super) {
    __extends(Message_G2C_ROLE_NEW_ERRANTRY, _super);
    function Message_G2C_ROLE_NEW_ERRANTRY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_NEW_ERRANTRY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.recordList = {}; //新手记录
    };
    Message_G2C_ROLE_NEW_ERRANTRY.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_NEW_ERRANTRY.prototype.unpack = function (reader) {
        this.recordList = table_load(reader.readString());
    };
    return Message_G2C_ROLE_NEW_ERRANTRY;
}(MessageBase));
__reflect(Message_G2C_ROLE_NEW_ERRANTRY.prototype, "Message_G2C_ROLE_NEW_ERRANTRY");
//惊喜奖励
var Message_C2G_ROLE_SPECIAL_EVENT_PRIZE = (function (_super) {
    __extends(Message_C2G_ROLE_SPECIAL_EVENT_PRIZE, _super);
    function Message_C2G_ROLE_SPECIAL_EVENT_PRIZE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_SPECIAL_EVENT_PRIZE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.eventIndex = null;
    };
    Message_C2G_ROLE_SPECIAL_EVENT_PRIZE.prototype.pack = function (writer) {
        writer.writeUInt(this.eventIndex);
    };
    Message_C2G_ROLE_SPECIAL_EVENT_PRIZE.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_SPECIAL_EVENT_PRIZE;
}(MessageBase));
__reflect(Message_C2G_ROLE_SPECIAL_EVENT_PRIZE.prototype, "Message_C2G_ROLE_SPECIAL_EVENT_PRIZE");
//////////////////////////////////////////////////////////////////////////////
//查看玩家信息
var Message_C2G_ROLE_DETAILED_INFO = (function (_super) {
    __extends(Message_C2G_ROLE_DETAILED_INFO, _super);
    function Message_C2G_ROLE_DETAILED_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_DETAILED_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = null;
        this.checkType = null;
        //this.index = null
    };
    Message_C2G_ROLE_DETAILED_INFO.prototype.pack = function (writer) {
        writer.writeString(tostring(this.id));
        //writer.writeUInt(this.index)
        writer.writeUInt(this.checkType);
    };
    Message_C2G_ROLE_DETAILED_INFO.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_DETAILED_INFO;
}(MessageBase));
__reflect(Message_C2G_ROLE_DETAILED_INFO.prototype, "Message_C2G_ROLE_DETAILED_INFO");
//////////////////////////////////////////////////////////////////////////////
//
// function MessageUnpackVocationAndPetInfo(reader) {
//     let info: any = {}
//     info.basicInfo = {}
//     info.equipList = {}
//     let entryId = reader.readUInt()
//     if (entryId >= opVocation.BeginEntryId) {
//         info.basicInfo = ProfessionInfo.newObj()
//         info.basicInfo.read(reader)
//     } else {
//         info.basicInfo = PetInfo.newObj()
//         info.basicInfo.read(reader)
//     }
//     let object_type = reader.readUInt()
//     info.objectType = object_type
//     let guid = reader.readUInt()
//     let equipNum = reader.readUChar()
//     for (let j = 1; j <= tonumber(equipNum); j++) {
//         let equipInfo = ItemInfo.newObj()
//         equipInfo.read(reader)
//         info.equipList[equipInfo.position] = equipInfo
//     }
//     if (object_type == objectType.OBJECT_TYPE_VACATIONER) {
//         info.lastAbility = {}
//         readFinalLastAbility(reader, info.lastAbility)
//         info.level = reader.readUInt()
//         info.sexId = reader.readUChar()
//         info.name = reader.readString()
//         info.basicInfo.breakLevel = reader.readUChar()
//         info.basicInfo.awakeLevel = reader.readUChar()
//     }
//     return info
// }
//获取玩家信息
// class Message_G2C_ROLE_DETAILED_INFO extends MessageBase {
//     petList: any[];
//     checkType
//     defendInfo
//     yulingLevel
//     yulingInfo
//     public initObj(...args: any[]): void {
//         this.petList = []
//         this.checkType = null
//         //  	this.isdump = true
//     }
//     pack(writer) {
//     }
//     unpack(reader) {
//         this.petList = []
//         this.checkType = reader.readUShort()
//         if (this.checkType == opSelectPlayerInfo.BattleTypeInfo) {
//             let count = reader.readUInt()
//             for (let i = 1; i <= count; i++) {
//                 let info = MessageUnpackVocationAndPetInfo(reader)
//                 JsUtil.arrayInstert(this.petList, info)
//             }
//             /*
//                 }else if(this.checkType == opSelectPlayerInfo.FairyInfo ){
//                     this.fairyInfo ={}
//                     let count = reader.readUInt()
//                     for(let i = 1; i <=  count;i++){
//                         let fairyInfo = FairyInfo.newObj()
//                         fairyInfo.read(reader)
//                         JsUtil.arrayInstert(this.fairyInfo,fairyInfo)
//                     }
//             */
//         } else if (this.checkType == opSelectPlayerInfo.WingInfo) {
//             this.defendInfo = DefendInfo.newObj()
//             this.defendInfo.read(reader)
//             /*
//                 }else if(this.checkType == opSelectPlayerInfo.RideInfo ){
//                     let count = reader.readUInt()
//                     this.rideInfo = {}
//                     this.rideInfo.equipList = {}
//                     for(let i = 1; i <=  count , 1;i++){
//                         let equipInfo = ItemInfo.newObj()
//                         equipInfo.read(reader)
//                         this.rideInfo.equipList[equipInfo.position] = equipInfo
//                     }
//                     this.rideInfo.skillList = table_load(reader.readString())
//                     this.rideInfo.propertyList = table_load(reader.readString())
//             */
//         } else if (this.checkType == opSelectPlayerInfo.PlayerInfo) {
//             this.yulingLevel = reader.readUInt()
//             this.yulingInfo = table_load(reader.readString())
//         }
//     }
// }
var Message_G2C_GLOBAL_SERVER_STAR_TIME = (function (_super) {
    __extends(Message_G2C_GLOBAL_SERVER_STAR_TIME, _super);
    function Message_G2C_GLOBAL_SERVER_STAR_TIME() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_GLOBAL_SERVER_STAR_TIME.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.startTime = 0;
    };
    Message_G2C_GLOBAL_SERVER_STAR_TIME.prototype.pack = function (writer) {
    };
    Message_G2C_GLOBAL_SERVER_STAR_TIME.prototype.unpack = function (reader) {
        this.startTime = reader.readUInt();
    };
    return Message_G2C_GLOBAL_SERVER_STAR_TIME;
}(MessageBase));
__reflect(Message_G2C_GLOBAL_SERVER_STAR_TIME.prototype, "Message_G2C_GLOBAL_SERVER_STAR_TIME");
////-禁言禁号//////////////////////////////////-
var Message_G2C_ROLE_BAN_STATUS = (function (_super) {
    __extends(Message_G2C_ROLE_BAN_STATUS, _super);
    function Message_G2C_ROLE_BAN_STATUS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_BAN_STATUS.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.banStatus = 0;
        this.banReason = "";
        this.banEndTime = 0;
    };
    Message_G2C_ROLE_BAN_STATUS.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_BAN_STATUS.prototype.unpack = function (reader) {
        this.banStatus = reader.readUShort(); ////封禁状态,0为正常，1为禁止登录，2为禁言
        this.banReason = reader.readString();
        this.banEndTime = reader.readUInt();
    };
    return Message_G2C_ROLE_BAN_STATUS;
}(MessageBase));
__reflect(Message_G2C_ROLE_BAN_STATUS.prototype, "Message_G2C_ROLE_BAN_STATUS");
////-踢出跨服//////////////////////////////////-
var Message_G2C_GLOBAL_LOGOUT_CENTER = (function (_super) {
    __extends(Message_G2C_GLOBAL_LOGOUT_CENTER, _super);
    function Message_G2C_GLOBAL_LOGOUT_CENTER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_GLOBAL_LOGOUT_CENTER.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.value = 0;
    };
    Message_G2C_GLOBAL_LOGOUT_CENTER.prototype.pack = function (writer) {
    };
    Message_G2C_GLOBAL_LOGOUT_CENTER.prototype.unpack = function (reader) {
        this.value = reader.readUInt(); //值无作用，主要防发不了包
    };
    return Message_G2C_GLOBAL_LOGOUT_CENTER;
}(MessageBase));
__reflect(Message_G2C_GLOBAL_LOGOUT_CENTER.prototype, "Message_G2C_GLOBAL_LOGOUT_CENTER");
////////////////-设置使用法阵等级
var Message_C2G_PLAYER_SET_USE_SACHOOP_LV = (function (_super) {
    __extends(Message_C2G_PLAYER_SET_USE_SACHOOP_LV, _super);
    function Message_C2G_PLAYER_SET_USE_SACHOOP_LV() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_PLAYER_SET_USE_SACHOOP_LV.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.useLevel = null; // 100不使用  其它使用
    };
    Message_C2G_PLAYER_SET_USE_SACHOOP_LV.prototype.pack = function (writer) {
        writer.writeUInt(this.useLevel);
    };
    Message_C2G_PLAYER_SET_USE_SACHOOP_LV.prototype.unpack = function (reader) {
    };
    return Message_C2G_PLAYER_SET_USE_SACHOOP_LV;
}(MessageBase));
__reflect(Message_C2G_PLAYER_SET_USE_SACHOOP_LV.prototype, "Message_C2G_PLAYER_SET_USE_SACHOOP_LV");
//当前地图服务器创建的npc列表
var Message_C2G_ROLE_MAP_NPC_LIST = (function (_super) {
    __extends(Message_C2G_ROLE_MAP_NPC_LIST, _super);
    function Message_C2G_ROLE_MAP_NPC_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_MAP_NPC_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_ROLE_MAP_NPC_LIST.prototype.pack = function (writer) {
    };
    Message_C2G_ROLE_MAP_NPC_LIST.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_MAP_NPC_LIST;
}(MessageBase));
__reflect(Message_C2G_ROLE_MAP_NPC_LIST.prototype, "Message_C2G_ROLE_MAP_NPC_LIST");
var Message_G2C_ROLE_MAP_NPC_LIST = (function (_super) {
    __extends(Message_G2C_ROLE_MAP_NPC_LIST, _super);
    function Message_G2C_ROLE_MAP_NPC_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_MAP_NPC_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.npcList = {};
    };
    Message_G2C_ROLE_MAP_NPC_LIST.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_MAP_NPC_LIST.prototype.unpack = function (reader) {
        this.npcList = table_load(reader.readString()) || {}; //{npc.getEntryId(), npc.getId(), npc.getName(), pos.x, pos.y})
    };
    return Message_G2C_ROLE_MAP_NPC_LIST;
}(MessageBase));
__reflect(Message_G2C_ROLE_MAP_NPC_LIST.prototype, "Message_G2C_ROLE_MAP_NPC_LIST");
//# sourceMappingURL=GameWorldMessage.js.map