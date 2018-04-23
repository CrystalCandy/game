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
var Message_C2G_TEAM_CREATE = (function (_super) {
    __extends(Message_C2G_TEAM_CREATE, _super);
    function Message_C2G_TEAM_CREATE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TEAM_CREATE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.activity = null;
    };
    Message_C2G_TEAM_CREATE.prototype.pack = function (writer) {
        writer.writeUInt(this.activity);
    };
    Message_C2G_TEAM_CREATE.prototype.unpack = function (reader) {
    };
    return Message_C2G_TEAM_CREATE;
}(MessageBase));
__reflect(Message_C2G_TEAM_CREATE.prototype, "Message_C2G_TEAM_CREATE");
var Message_C2G_TEAM_APPLY = (function (_super) {
    __extends(Message_C2G_TEAM_APPLY, _super);
    function Message_C2G_TEAM_APPLY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TEAM_APPLY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = null;
    };
    Message_C2G_TEAM_APPLY.prototype.pack = function (writer) {
        writer.writeUInt(this.id);
    };
    Message_C2G_TEAM_APPLY.prototype.unpack = function (reader) {
    };
    return Message_C2G_TEAM_APPLY;
}(MessageBase));
__reflect(Message_C2G_TEAM_APPLY.prototype, "Message_C2G_TEAM_APPLY");
var Message_C2G_TEAM_REPLY_APPLY = (function (_super) {
    __extends(Message_C2G_TEAM_REPLY_APPLY, _super);
    function Message_C2G_TEAM_REPLY_APPLY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TEAM_REPLY_APPLY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = null;
        this.result = null;
    };
    Message_C2G_TEAM_REPLY_APPLY.prototype.pack = function (writer) {
        writer.writeUInt(this.id);
        writer.writeUChar(this.result);
    };
    Message_C2G_TEAM_REPLY_APPLY.prototype.unpack = function (reader) {
    };
    return Message_C2G_TEAM_REPLY_APPLY;
}(MessageBase));
__reflect(Message_C2G_TEAM_REPLY_APPLY.prototype, "Message_C2G_TEAM_REPLY_APPLY");
var Message_C2G_TEAM_INVITE = (function (_super) {
    __extends(Message_C2G_TEAM_INVITE, _super);
    function Message_C2G_TEAM_INVITE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TEAM_INVITE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //this.Type = null
        this.id = null;
    };
    Message_C2G_TEAM_INVITE.prototype.pack = function (writer) {
        //writer.writeUChar(this.Type)
        writer.writeUInt(this.id);
    };
    Message_C2G_TEAM_INVITE.prototype.unpack = function (reader) {
    };
    return Message_C2G_TEAM_INVITE;
}(MessageBase));
__reflect(Message_C2G_TEAM_INVITE.prototype, "Message_C2G_TEAM_INVITE");
var Message_C2G_TEAM_REPLY_INVITE = (function (_super) {
    __extends(Message_C2G_TEAM_REPLY_INVITE, _super);
    function Message_C2G_TEAM_REPLY_INVITE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TEAM_REPLY_INVITE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = null;
        this.result = null;
    };
    Message_C2G_TEAM_REPLY_INVITE.prototype.pack = function (writer) {
        writer.writeUInt(this.id);
        writer.writeUChar(this.result);
    };
    Message_C2G_TEAM_REPLY_INVITE.prototype.unpack = function (reader) {
    };
    return Message_C2G_TEAM_REPLY_INVITE;
}(MessageBase));
__reflect(Message_C2G_TEAM_REPLY_INVITE.prototype, "Message_C2G_TEAM_REPLY_INVITE");
var Message_C2G_TEAM_CAPTAIN = (function (_super) {
    __extends(Message_C2G_TEAM_CAPTAIN, _super);
    function Message_C2G_TEAM_CAPTAIN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TEAM_CAPTAIN.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = null;
    };
    Message_C2G_TEAM_CAPTAIN.prototype.pack = function (writer) {
        writer.writeUInt(this.id);
    };
    Message_C2G_TEAM_CAPTAIN.prototype.unpack = function (reader) {
    };
    return Message_C2G_TEAM_CAPTAIN;
}(MessageBase));
__reflect(Message_C2G_TEAM_CAPTAIN.prototype, "Message_C2G_TEAM_CAPTAIN");
var Message_C2G_TEAM_KICK = (function (_super) {
    __extends(Message_C2G_TEAM_KICK, _super);
    function Message_C2G_TEAM_KICK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TEAM_KICK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = null;
    };
    Message_C2G_TEAM_KICK.prototype.pack = function (writer) {
        writer.writeUInt(this.id);
    };
    Message_C2G_TEAM_KICK.prototype.unpack = function (reader) {
    };
    return Message_C2G_TEAM_KICK;
}(MessageBase));
__reflect(Message_C2G_TEAM_KICK.prototype, "Message_C2G_TEAM_KICK");
var Message_C2G_TEAM_RANK = (function (_super) {
    __extends(Message_C2G_TEAM_RANK, _super);
    function Message_C2G_TEAM_RANK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TEAM_RANK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id1 = null;
        this.id2 = null;
    };
    Message_C2G_TEAM_RANK.prototype.pack = function (writer) {
        writer.writeUInt(this.id1);
        writer.writeUInt(this.id2);
    };
    Message_C2G_TEAM_RANK.prototype.unpack = function (reader) {
    };
    return Message_C2G_TEAM_RANK;
}(MessageBase));
__reflect(Message_C2G_TEAM_RANK.prototype, "Message_C2G_TEAM_RANK");
var Message_C2G_TEAM_LEAVE = (function (_super) {
    __extends(Message_C2G_TEAM_LEAVE, _super);
    function Message_C2G_TEAM_LEAVE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TEAM_LEAVE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_TEAM_LEAVE.prototype.pack = function (writer) {
    };
    Message_C2G_TEAM_LEAVE.prototype.unpack = function (reader) {
    };
    return Message_C2G_TEAM_LEAVE;
}(MessageBase));
__reflect(Message_C2G_TEAM_LEAVE.prototype, "Message_C2G_TEAM_LEAVE");
var Message_C2G_TEAM_DISBAND = (function (_super) {
    __extends(Message_C2G_TEAM_DISBAND, _super);
    function Message_C2G_TEAM_DISBAND() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TEAM_DISBAND.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_TEAM_DISBAND.prototype.pack = function (writer) {
    };
    Message_C2G_TEAM_DISBAND.prototype.unpack = function (reader) {
    };
    return Message_C2G_TEAM_DISBAND;
}(MessageBase));
__reflect(Message_C2G_TEAM_DISBAND.prototype, "Message_C2G_TEAM_DISBAND");
var Message_G2C_TEAM_INVITE = (function (_super) {
    __extends(Message_G2C_TEAM_INVITE, _super);
    function Message_G2C_TEAM_INVITE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_TEAM_INVITE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = null;
        this.name = null;
        this.level = null;
    };
    Message_G2C_TEAM_INVITE.prototype.pack = function (writer) {
    };
    Message_G2C_TEAM_INVITE.prototype.unpack = function (reader) {
        this.id = reader.readUInt();
        this.name = reader.readString();
        this.level = reader.readUShort();
    };
    return Message_G2C_TEAM_INVITE;
}(MessageBase));
__reflect(Message_G2C_TEAM_INVITE.prototype, "Message_G2C_TEAM_INVITE");
var Message_G2C_TEAM_APPLY = (function (_super) {
    __extends(Message_G2C_TEAM_APPLY, _super);
    function Message_G2C_TEAM_APPLY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_TEAM_APPLY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.applyInfo = null;
    };
    Message_G2C_TEAM_APPLY.prototype.pack = function (writer) {
    };
    Message_G2C_TEAM_APPLY.prototype.unpack = function (reader) {
        this.applyInfo = TeamApplyInfo.newObj();
        //let roleInfo = RoleInfo.newObj()
        this.applyInfo.read(reader);
        //[this.applyInfo.id, this.applyInfo.name, this.applyInfo.vocation, this.applyInfo.VipLevel, this.applyInfo.sexId] = roleInfo.getRoleInfo()
        this.applyInfo.level = reader.readUShort();
        //this.applyInfo.skytowerFloor = reader.readUInt()	
    };
    return Message_G2C_TEAM_APPLY;
}(MessageBase));
__reflect(Message_G2C_TEAM_APPLY.prototype, "Message_G2C_TEAM_APPLY");
var Message_G2C_TEAM_LEAVE = (function (_super) {
    __extends(Message_G2C_TEAM_LEAVE, _super);
    function Message_G2C_TEAM_LEAVE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_TEAM_LEAVE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = null;
    };
    Message_G2C_TEAM_LEAVE.prototype.pack = function (writer) {
    };
    Message_G2C_TEAM_LEAVE.prototype.unpack = function (reader) {
        this.id = reader.readUInt();
    };
    return Message_G2C_TEAM_LEAVE;
}(MessageBase));
__reflect(Message_G2C_TEAM_LEAVE.prototype, "Message_G2C_TEAM_LEAVE");
var Message_G2C_TEAM_DISBAND = (function (_super) {
    __extends(Message_G2C_TEAM_DISBAND, _super);
    function Message_G2C_TEAM_DISBAND() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_TEAM_DISBAND.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_G2C_TEAM_DISBAND.prototype.pack = function (writer) {
    };
    Message_G2C_TEAM_DISBAND.prototype.unpack = function (reader) {
    };
    return Message_G2C_TEAM_DISBAND;
}(MessageBase));
__reflect(Message_G2C_TEAM_DISBAND.prototype, "Message_G2C_TEAM_DISBAND");
var Message_G2C_TEAM_UPDATE = (function (_super) {
    __extends(Message_G2C_TEAM_UPDATE, _super);
    function Message_G2C_TEAM_UPDATE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_TEAM_UPDATE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.team = null;
    };
    Message_G2C_TEAM_UPDATE.prototype.pack = function (writer) {
    };
    Message_G2C_TEAM_UPDATE.prototype.unpack = function (reader) {
        this.team = TeamInfo.newObj();
        this.team.id = reader.readUInt();
        this.team.captainId = reader.readUInt();
        this.team.state = reader.readUChar();
        this.team.skytowerFloor = reader.readUInt();
        this.team.count = reader.readUChar();
        this.team.teamDefenseQueue = table_load(reader.readString());
        this.team.teamTag = reader.readUChar();
        for (var i = 1; i <= this.team.count; i++) {
            var member = TeamMember.newObj();
            // let roleInfo:RoleInfo = RoleInfo.newObj()
            // roleInfo.read(reader)
            // [member.id, member.name, member.vocation, member.VipLevel, member.sexId] = roleInfo.getRoleInfo()
            member.read(reader);
            member.level = reader.readUShort();
            member.pos = reader.readUChar();
            member.status = reader.readUChar();
            this.team.membersList[member.id] = member;
        }
        //TLog.Debug("Message_G2C_TEAM_UPDATE.unpack")
    };
    return Message_G2C_TEAM_UPDATE;
}(MessageBase));
__reflect(Message_G2C_TEAM_UPDATE.prototype, "Message_G2C_TEAM_UPDATE");
var Message_G2C_TEAM_DISAPPEAR = (function (_super) {
    __extends(Message_G2C_TEAM_DISAPPEAR, _super);
    function Message_G2C_TEAM_DISAPPEAR() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_TEAM_DISAPPEAR.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.teamId = null;
    };
    Message_G2C_TEAM_DISAPPEAR.prototype.pack = function (writer) {
    };
    Message_G2C_TEAM_DISAPPEAR.prototype.unpack = function (reader) {
        this.teamId = reader.readUInt();
    };
    return Message_G2C_TEAM_DISAPPEAR;
}(MessageBase));
__reflect(Message_G2C_TEAM_DISAPPEAR.prototype, "Message_G2C_TEAM_DISAPPEAR");
var Message_C2G_TEAM_CLEAR_APPLY = (function (_super) {
    __extends(Message_C2G_TEAM_CLEAR_APPLY, _super);
    function Message_C2G_TEAM_CLEAR_APPLY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TEAM_CLEAR_APPLY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_TEAM_CLEAR_APPLY.prototype.pack = function (writer) {
    };
    Message_C2G_TEAM_CLEAR_APPLY.prototype.unpack = function (reader) {
    };
    return Message_C2G_TEAM_CLEAR_APPLY;
}(MessageBase));
__reflect(Message_C2G_TEAM_CLEAR_APPLY.prototype, "Message_C2G_TEAM_CLEAR_APPLY");
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
var Message_G2C_TEAM_MEMBER_OFFLINE = (function (_super) {
    __extends(Message_G2C_TEAM_MEMBER_OFFLINE, _super);
    function Message_G2C_TEAM_MEMBER_OFFLINE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_TEAM_MEMBER_OFFLINE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = null;
    };
    Message_G2C_TEAM_MEMBER_OFFLINE.prototype.pack = function (writer) {
    };
    Message_G2C_TEAM_MEMBER_OFFLINE.prototype.unpack = function (reader) {
        this.id = reader.readUInt();
    };
    return Message_G2C_TEAM_MEMBER_OFFLINE;
}(MessageBase));
__reflect(Message_G2C_TEAM_MEMBER_OFFLINE.prototype, "Message_G2C_TEAM_MEMBER_OFFLINE");
var Message_G2C_TEAM_MEMBER_ONLINE = (function (_super) {
    __extends(Message_G2C_TEAM_MEMBER_ONLINE, _super);
    function Message_G2C_TEAM_MEMBER_ONLINE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_TEAM_MEMBER_ONLINE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = null;
    };
    Message_G2C_TEAM_MEMBER_ONLINE.prototype.pack = function (writer) {
    };
    Message_G2C_TEAM_MEMBER_ONLINE.prototype.unpack = function (reader) {
        this.id = reader.readUInt();
    };
    return Message_G2C_TEAM_MEMBER_ONLINE;
}(MessageBase));
__reflect(Message_G2C_TEAM_MEMBER_ONLINE.prototype, "Message_G2C_TEAM_MEMBER_ONLINE");
var Message_C2G_TEAM_ACTIVITY_QUERY = (function (_super) {
    __extends(Message_C2G_TEAM_ACTIVITY_QUERY, _super);
    function Message_C2G_TEAM_ACTIVITY_QUERY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TEAM_ACTIVITY_QUERY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.activity = null;
    };
    Message_C2G_TEAM_ACTIVITY_QUERY.prototype.pack = function (writer) {
        writer.writeUInt(this.activity);
    };
    Message_C2G_TEAM_ACTIVITY_QUERY.prototype.unpack = function (reader) {
    };
    return Message_C2G_TEAM_ACTIVITY_QUERY;
}(MessageBase));
__reflect(Message_C2G_TEAM_ACTIVITY_QUERY.prototype, "Message_C2G_TEAM_ACTIVITY_QUERY");
var Message_G2C_TEAM_ACTIVITY_QUERY = (function (_super) {
    __extends(Message_G2C_TEAM_ACTIVITY_QUERY, _super);
    function Message_G2C_TEAM_ACTIVITY_QUERY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_TEAM_ACTIVITY_QUERY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.activity = null;
        this.teamCount = null;
        this.teamList = [];
    };
    Message_G2C_TEAM_ACTIVITY_QUERY.prototype.pack = function (writer) {
    };
    Message_G2C_TEAM_ACTIVITY_QUERY.prototype.unpack = function (reader) {
        this.activity = reader.readUInt();
        this.teamCount = reader.readUInt();
        this.teamList = [];
        for (var i = 1; i <= this.teamCount; i++) {
            var teamInfo = TeamListInfo.newObj();
            teamInfo.id = reader.readUInt();
            teamInfo.captainID = reader.readUInt();
            teamInfo.count = reader.readChar();
            teamInfo.skytowerFloor = reader.readUInt(); //活动天空之塔层数
            for (var j = 1; j <= teamInfo.count; j++) {
                var memberInfo = TeamListMemberInfo.newObj();
                //let roleInfo = RoleInfo.newObj()
                memberInfo.read(reader);
                //[memberInfo.id, memberInfo.name, memberInfo.vocation, memberInfo.VipLevel, memberInfo.sexId] = roleInfo.getRoleInfo()
                memberInfo.level = reader.readUShort();
                JsUtil.arrayInstert(teamInfo.membersList, memberInfo);
            }
            JsUtil.arrayInstert(this.teamList, teamInfo);
        }
    };
    return Message_G2C_TEAM_ACTIVITY_QUERY;
}(MessageBase));
__reflect(Message_G2C_TEAM_ACTIVITY_QUERY.prototype, "Message_G2C_TEAM_ACTIVITY_QUERY");
var Message_C2G_TEAM_QUEUE = (function (_super) {
    __extends(Message_C2G_TEAM_QUEUE, _super);
    function Message_C2G_TEAM_QUEUE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TEAM_QUEUE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.op = null;
        this.args = {};
    };
    Message_C2G_TEAM_QUEUE.prototype.pack = function (writer) {
        writer.writeUInt(this.op);
        if (this.op == ConfigTeamQueue.READY || this.op == ConfigTeamQueue.SET) {
            writer.writeUChar(this.args[0]); //位置1
            writer.writeUInt(this.args[1]); //部下entryId
            writer.writeUChar(this.args[2]); //位置2
            writer.writeUInt(this.args[3]); //部下entryId
            writer.writeUChar(this.args[4]); //位置3
            writer.writeUInt(this.args[5]); //部下entryId
        }
        else if (this.op == ConfigTeamQueue.UNREADY) {
        }
        else if (this.op == ConfigTeamQueue.MOVE) {
            writer.writeUChar(this.args[0]);
            writer.writeUChar(this.args[1]);
        }
    };
    Message_C2G_TEAM_QUEUE.prototype.unpack = function (reader) {
    };
    return Message_C2G_TEAM_QUEUE;
}(MessageBase));
__reflect(Message_C2G_TEAM_QUEUE.prototype, "Message_C2G_TEAM_QUEUE");
var Message_G2C_TEAM_QUEUE = (function (_super) {
    __extends(Message_G2C_TEAM_QUEUE, _super);
    function Message_G2C_TEAM_QUEUE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_TEAM_QUEUE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.teamDefenseQueue = null;
    };
    Message_G2C_TEAM_QUEUE.prototype.pack = function (writer) {
    };
    Message_G2C_TEAM_QUEUE.prototype.unpack = function (reader) {
        this.teamDefenseQueue = table_load(reader.readString());
    };
    return Message_G2C_TEAM_QUEUE;
}(MessageBase));
__reflect(Message_G2C_TEAM_QUEUE.prototype, "Message_G2C_TEAM_QUEUE");
var Message_G2C_TEAM_SPACE_MOVE = (function (_super) {
    __extends(Message_G2C_TEAM_SPACE_MOVE, _super);
    function Message_G2C_TEAM_SPACE_MOVE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_TEAM_SPACE_MOVE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.plrId = 0;
        this.mapId = 0;
        this.x = 0;
        this.y = 0;
        this.isdump = false;
    };
    Message_G2C_TEAM_SPACE_MOVE.prototype.pack = function (writer) {
    };
    Message_G2C_TEAM_SPACE_MOVE.prototype.unpack = function (reader) {
        this.mapId = reader.readUShort();
        this.plrId = reader.readUInt();
        this.x = reader.readUShort();
        this.y = reader.readUShort();
    };
    return Message_G2C_TEAM_SPACE_MOVE;
}(MessageBase));
__reflect(Message_G2C_TEAM_SPACE_MOVE.prototype, "Message_G2C_TEAM_SPACE_MOVE");
var Message_C2G_TEAM_SET_STATUS = (function (_super) {
    __extends(Message_C2G_TEAM_SET_STATUS, _super);
    function Message_C2G_TEAM_SET_STATUS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TEAM_SET_STATUS.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.teamState = null;
    };
    Message_C2G_TEAM_SET_STATUS.prototype.pack = function (writer) {
        writer.writeUInt(this.teamState);
    };
    Message_C2G_TEAM_SET_STATUS.prototype.unpack = function (reader) {
    };
    return Message_C2G_TEAM_SET_STATUS;
}(MessageBase));
__reflect(Message_C2G_TEAM_SET_STATUS.prototype, "Message_C2G_TEAM_SET_STATUS");
var Message_C2G_TEAM_MEMBER_NOTICE = (function (_super) {
    __extends(Message_C2G_TEAM_MEMBER_NOTICE, _super);
    function Message_C2G_TEAM_MEMBER_NOTICE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TEAM_MEMBER_NOTICE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.key = null;
        this.value = null;
    };
    Message_C2G_TEAM_MEMBER_NOTICE.prototype.pack = function (writer) {
        writer.writeUInt(this.key);
        writer.writeUInt(this.value);
    };
    Message_C2G_TEAM_MEMBER_NOTICE.prototype.unpack = function (reader) {
    };
    return Message_C2G_TEAM_MEMBER_NOTICE;
}(MessageBase));
__reflect(Message_C2G_TEAM_MEMBER_NOTICE.prototype, "Message_C2G_TEAM_MEMBER_NOTICE");
var Message_G2C_TEAM_MEMBER_NOTICE = (function (_super) {
    __extends(Message_G2C_TEAM_MEMBER_NOTICE, _super);
    function Message_G2C_TEAM_MEMBER_NOTICE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_TEAM_MEMBER_NOTICE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.key = null;
        this.value = null;
    };
    Message_G2C_TEAM_MEMBER_NOTICE.prototype.pack = function (writer) {
    };
    Message_G2C_TEAM_MEMBER_NOTICE.prototype.unpack = function (reader) {
        this.key = reader.readUInt();
        this.value = reader.readUInt();
    };
    return Message_G2C_TEAM_MEMBER_NOTICE;
}(MessageBase));
__reflect(Message_G2C_TEAM_MEMBER_NOTICE.prototype, "Message_G2C_TEAM_MEMBER_NOTICE");
var Message_C2G_SKYTOWER_INVITE_LIST = (function (_super) {
    __extends(Message_C2G_SKYTOWER_INVITE_LIST, _super);
    function Message_C2G_SKYTOWER_INVITE_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_SKYTOWER_INVITE_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_SKYTOWER_INVITE_LIST.prototype.pack = function (writer) {
    };
    Message_C2G_SKYTOWER_INVITE_LIST.prototype.unpack = function (reader) {
    };
    return Message_C2G_SKYTOWER_INVITE_LIST;
}(MessageBase));
__reflect(Message_C2G_SKYTOWER_INVITE_LIST.prototype, "Message_C2G_SKYTOWER_INVITE_LIST");
var Message_G2C_SKYTOWER_INVITE_LIST = (function (_super) {
    __extends(Message_G2C_SKYTOWER_INVITE_LIST, _super);
    function Message_G2C_SKYTOWER_INVITE_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_SKYTOWER_INVITE_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.inviteCount = null;
        this.inviteList = [];
    };
    Message_G2C_SKYTOWER_INVITE_LIST.prototype.pack = function (writer) {
    };
    Message_G2C_SKYTOWER_INVITE_LIST.prototype.unpack = function (reader) {
        this.inviteCount = reader.readUInt();
        this.inviteList = [];
        for (var i = 1; i <= this.inviteCount; i++) {
            var playerInfo = TeamSkyTowerInviteInfo.newObj();
            //let roleInfo = RoleInfo.newObj()
            playerInfo.read(reader);
            //[playerInfo.roleId, playerInfo.roleName, playerInfo.body, playerInfo.VipLevel, playerInfo.sexId] = roleInfo.getRoleInfo()
            playerInfo.level = reader.readUInt();
            playerInfo.skytowerFloor = reader.readUInt();
            JsUtil.arrayInstert(this.inviteList, playerInfo);
        }
    };
    return Message_G2C_SKYTOWER_INVITE_LIST;
}(MessageBase));
__reflect(Message_G2C_SKYTOWER_INVITE_LIST.prototype, "Message_G2C_SKYTOWER_INVITE_LIST");
var Message_G2C_TEAM_ACTIVITY_DATA = (function (_super) {
    __extends(Message_G2C_TEAM_ACTIVITY_DATA, _super);
    function Message_G2C_TEAM_ACTIVITY_DATA() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_TEAM_ACTIVITY_DATA.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.activityType = null; //活动类型
        this.dataList = null; //数据列表
    };
    Message_G2C_TEAM_ACTIVITY_DATA.prototype.pack = function (writer) {
    };
    Message_G2C_TEAM_ACTIVITY_DATA.prototype.unpack = function (reader) {
        this.activityType = reader.readUInt(); //活动
        this.dataList = table_load(reader.readString()); //数据
    };
    return Message_G2C_TEAM_ACTIVITY_DATA;
}(MessageBase));
__reflect(Message_G2C_TEAM_ACTIVITY_DATA.prototype, "Message_G2C_TEAM_ACTIVITY_DATA");
var Message_C2G_TEAM_ACTIVITY_DATA = (function (_super) {
    __extends(Message_C2G_TEAM_ACTIVITY_DATA, _super);
    function Message_C2G_TEAM_ACTIVITY_DATA() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TEAM_ACTIVITY_DATA.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.activityType = null; //活动类型
    };
    Message_C2G_TEAM_ACTIVITY_DATA.prototype.pack = function (writer) {
        writer.writeUInt(this.activityType);
    };
    Message_C2G_TEAM_ACTIVITY_DATA.prototype.unpack = function (reader) {
    };
    return Message_C2G_TEAM_ACTIVITY_DATA;
}(MessageBase));
__reflect(Message_C2G_TEAM_ACTIVITY_DATA.prototype, "Message_C2G_TEAM_ACTIVITY_DATA");
var Message_C2G_TEAM_ALL_INVITE = (function (_super) {
    __extends(Message_C2G_TEAM_ALL_INVITE, _super);
    function Message_C2G_TEAM_ALL_INVITE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TEAM_ALL_INVITE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_TEAM_ALL_INVITE.prototype.pack = function (writer) {
    };
    Message_C2G_TEAM_ALL_INVITE.prototype.unpack = function (reader) {
    };
    return Message_C2G_TEAM_ALL_INVITE;
}(MessageBase));
__reflect(Message_C2G_TEAM_ALL_INVITE.prototype, "Message_C2G_TEAM_ALL_INVITE");
var Message_C2G_TEAM_ALL_APPLY = (function (_super) {
    __extends(Message_C2G_TEAM_ALL_APPLY, _super);
    function Message_C2G_TEAM_ALL_APPLY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TEAM_ALL_APPLY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.activityType = 0;
    };
    Message_C2G_TEAM_ALL_APPLY.prototype.pack = function (writer) {
        writer.writeUInt(this.activityType);
    };
    Message_C2G_TEAM_ALL_APPLY.prototype.unpack = function (reader) {
    };
    return Message_C2G_TEAM_ALL_APPLY;
}(MessageBase));
__reflect(Message_C2G_TEAM_ALL_APPLY.prototype, "Message_C2G_TEAM_ALL_APPLY");
//成员状态设置
var Message_C2G_TEAM_SET_MEMBER_STATUS = (function (_super) {
    __extends(Message_C2G_TEAM_SET_MEMBER_STATUS, _super);
    function Message_C2G_TEAM_SET_MEMBER_STATUS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TEAM_SET_MEMBER_STATUS.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.status = 0;
    };
    Message_C2G_TEAM_SET_MEMBER_STATUS.prototype.pack = function (writer) {
        writer.writeUChar(this.status);
    };
    return Message_C2G_TEAM_SET_MEMBER_STATUS;
}(MessageBase));
__reflect(Message_C2G_TEAM_SET_MEMBER_STATUS.prototype, "Message_C2G_TEAM_SET_MEMBER_STATUS");
//组队意愿
//创建组队意愿
var Message_C2G_TEAM_CREATE_WILL_TEAM = (function (_super) {
    __extends(Message_C2G_TEAM_CREATE_WILL_TEAM, _super);
    function Message_C2G_TEAM_CREATE_WILL_TEAM() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TEAM_CREATE_WILL_TEAM.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.actIndex = 0;
        this.intro = "";
    };
    Message_C2G_TEAM_CREATE_WILL_TEAM.prototype.pack = function (writer) {
        writer.writeUInt(this.actIndex);
        writer.writeString(this.intro);
    };
    Message_C2G_TEAM_CREATE_WILL_TEAM.prototype.unpack = function (reader) {
    };
    return Message_C2G_TEAM_CREATE_WILL_TEAM;
}(MessageBase));
__reflect(Message_C2G_TEAM_CREATE_WILL_TEAM.prototype, "Message_C2G_TEAM_CREATE_WILL_TEAM");
var Message_G2C_TEAM_WILL_TEAM_LIST = (function (_super) {
    __extends(Message_G2C_TEAM_WILL_TEAM_LIST, _super);
    function Message_G2C_TEAM_WILL_TEAM_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_TEAM_WILL_TEAM_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.actIndex = 0;
        this.willList = [];
    };
    Message_G2C_TEAM_WILL_TEAM_LIST.prototype.pack = function (writer) {
    };
    Message_G2C_TEAM_WILL_TEAM_LIST.prototype.unpack = function (reader) {
        this.willList = [];
        this.actIndex = reader.readUInt();
        var count = reader.readUInt();
        for (var i = 1; i <= count; i++) {
            var t = {};
            t.id = reader.readUInt(); //玩家ID
            t.name = reader.readString(); //玩家名字
            t.vocation = reader.readUInt(); //玩家职业
            t.sexId = reader.readUChar(); //玩家性别
            t.icon = reader.readString(); //玩家头像
            t.level = reader.readUChar(); //玩家等级
            t.vipLevel = reader.readUChar(); //玩家vip等级
            t.text = reader.readString(); //留言信息
            t.process = table_load(reader.readString()) || {}; //活动索引
            JsUtil.arrayInstert(this.willList, t);
        }
    };
    return Message_G2C_TEAM_WILL_TEAM_LIST;
}(MessageBase));
__reflect(Message_G2C_TEAM_WILL_TEAM_LIST.prototype, "Message_G2C_TEAM_WILL_TEAM_LIST");
var Message_C2G_TEAM_WILL_TEAM_LIST = (function (_super) {
    __extends(Message_C2G_TEAM_WILL_TEAM_LIST, _super);
    function Message_C2G_TEAM_WILL_TEAM_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TEAM_WILL_TEAM_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.actIndex = 0;
    };
    Message_C2G_TEAM_WILL_TEAM_LIST.prototype.pack = function (writer) {
        writer.writeUInt(this.actIndex);
    };
    Message_C2G_TEAM_WILL_TEAM_LIST.prototype.unpack = function (reader) {
    };
    return Message_C2G_TEAM_WILL_TEAM_LIST;
}(MessageBase));
__reflect(Message_C2G_TEAM_WILL_TEAM_LIST.prototype, "Message_C2G_TEAM_WILL_TEAM_LIST");
var Message_C2G_TEAM_SET_WILL_TEAM = (function (_super) {
    __extends(Message_C2G_TEAM_SET_WILL_TEAM, _super);
    function Message_C2G_TEAM_SET_WILL_TEAM() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TEAM_SET_WILL_TEAM.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.actIndex = 0;
        this.intro = "";
    };
    Message_C2G_TEAM_SET_WILL_TEAM.prototype.pack = function (writer) {
        writer.writeUInt(this.actIndex);
        writer.writeString(this.intro);
    };
    Message_C2G_TEAM_SET_WILL_TEAM.prototype.unpack = function (reader) {
    };
    return Message_C2G_TEAM_SET_WILL_TEAM;
}(MessageBase));
__reflect(Message_C2G_TEAM_SET_WILL_TEAM.prototype, "Message_C2G_TEAM_SET_WILL_TEAM");
//# sourceMappingURL=TeamMessage.js.map