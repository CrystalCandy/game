/*
作者:
    
    
创建时间：
   2013.8.26(周一)

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
//请求竞技场信息
var Message_C2G_FIGHT_CHAMPION_REFRESH = (function (_super) {
    __extends(Message_C2G_FIGHT_CHAMPION_REFRESH, _super);
    function Message_C2G_FIGHT_CHAMPION_REFRESH() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_CHAMPION_REFRESH.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FIGHT_CHAMPION_REFRESH.prototype.pack = function (writer) {
    };
    Message_C2G_FIGHT_CHAMPION_REFRESH.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_CHAMPION_REFRESH;
}(MessageBase));
__reflect(Message_C2G_FIGHT_CHAMPION_REFRESH.prototype, "Message_C2G_FIGHT_CHAMPION_REFRESH");
//竞技场信息
var Message_G2C_FIGHT_CHAMPION_REFRESH = (function (_super) {
    __extends(Message_G2C_FIGHT_CHAMPION_REFRESH, _super);
    function Message_G2C_FIGHT_CHAMPION_REFRESH() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_CHAMPION_REFRESH.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_G2C_FIGHT_CHAMPION_REFRESH.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_CHAMPION_REFRESH.prototype.unpack = function (reader) {
        this.force = tonumber(reader.readString()) || 0; //战力
        this.rank = reader.readUInt(); //名次
        this.times = reader.readUInt(); //剩下多少次
        this.maxTimes = reader.readUInt(); //最多多少次
        this.time = reader.readUInt(); //多长时间后可以再挑战
        this.winStreak = reader.readUInt(); //连胜次数
        var num = reader.readUShort(); //多少个对手
        this.enemyList = [];
        for (var i = 1; i <= num; i++) {
            var enemy = ReadChampionEnemy(reader);
            JsUtil.arrayInstert(this.enemyList, enemy);
        }
    };
    return Message_G2C_FIGHT_CHAMPION_REFRESH;
}(MessageBase));
__reflect(Message_G2C_FIGHT_CHAMPION_REFRESH.prototype, "Message_G2C_FIGHT_CHAMPION_REFRESH");
function ReadChampionEnemy(reader) {
    var ret = {};
    ret.id = reader.readUInt();
    ret.name = reader.readString();
    ret.vocation = reader.readUInt();
    ret.rank = reader.readUInt();
    ret.wins = reader.readUInt();
    ret.force = reader.readUInt();
    ret.level = reader.readUInt();
    ret.sex = reader.readUInt();
    ret.queue = table_load(reader.readString()); //{entryId, uid, state}
    ret.breakList = table_load(reader.readString()) || {}; //{[pos] : breakLevel}
    ret.qualityList = table_load(reader.readString()) || {}; //{[pos] : qualityLevel}
    //for(let i = 1; i <= 18;i++){
    //	let id = reader.readUInt()
    //	JsUtil.arrayInstert(ret.queue, id)
    //}
    return ret;
}
//排名
var Message_C2G_FIGHT_CHAMPION_TOP_RANK = (function (_super) {
    __extends(Message_C2G_FIGHT_CHAMPION_TOP_RANK, _super);
    function Message_C2G_FIGHT_CHAMPION_TOP_RANK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_CHAMPION_TOP_RANK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FIGHT_CHAMPION_TOP_RANK.prototype.pack = function (writer) {
    };
    Message_C2G_FIGHT_CHAMPION_TOP_RANK.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_CHAMPION_TOP_RANK;
}(MessageBase));
__reflect(Message_C2G_FIGHT_CHAMPION_TOP_RANK.prototype, "Message_C2G_FIGHT_CHAMPION_TOP_RANK");
//排名
var Message_G2C_FIGHT_CHAMPION_TOP_RANK = (function (_super) {
    __extends(Message_G2C_FIGHT_CHAMPION_TOP_RANK, _super);
    function Message_G2C_FIGHT_CHAMPION_TOP_RANK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_CHAMPION_TOP_RANK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_G2C_FIGHT_CHAMPION_TOP_RANK.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_CHAMPION_TOP_RANK.prototype.unpack = function (reader) {
        var num = reader.readUShort(); //多少个对手
        this.enemyList = [];
        for (var i = 1; i <= num; i++) {
            var enemy = ReadChampionEnemy(reader);
            JsUtil.arrayInstert(this.enemyList, enemy);
        }
    };
    return Message_G2C_FIGHT_CHAMPION_TOP_RANK;
}(MessageBase));
__reflect(Message_G2C_FIGHT_CHAMPION_TOP_RANK.prototype, "Message_G2C_FIGHT_CHAMPION_TOP_RANK");
var Message_C2G_FIGHT_CHAMPION_BATTLE = (function (_super) {
    __extends(Message_C2G_FIGHT_CHAMPION_BATTLE, _super);
    function Message_C2G_FIGHT_CHAMPION_BATTLE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_CHAMPION_BATTLE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.rank = 0;
        this.name = "";
        this.playerID = null;
    };
    Message_C2G_FIGHT_CHAMPION_BATTLE.prototype.pack = function (writer) {
        writer.writeUInt(this.rank);
        writer.writeString(this.name);
        writer.writeUInt(this.playerID);
    };
    Message_C2G_FIGHT_CHAMPION_BATTLE.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_CHAMPION_BATTLE;
}(MessageBase));
__reflect(Message_C2G_FIGHT_CHAMPION_BATTLE.prototype, "Message_C2G_FIGHT_CHAMPION_BATTLE");
var Message_C2G_FIGHT_CHAMPION_RECORD = (function (_super) {
    __extends(Message_C2G_FIGHT_CHAMPION_RECORD, _super);
    function Message_C2G_FIGHT_CHAMPION_RECORD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_CHAMPION_RECORD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FIGHT_CHAMPION_RECORD.prototype.pack = function (writer) {
    };
    Message_C2G_FIGHT_CHAMPION_RECORD.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_CHAMPION_RECORD;
}(MessageBase));
__reflect(Message_C2G_FIGHT_CHAMPION_RECORD.prototype, "Message_C2G_FIGHT_CHAMPION_RECORD");
var Message_G2C_FIGHT_CHAMPION_RECORD = (function (_super) {
    __extends(Message_G2C_FIGHT_CHAMPION_RECORD, _super);
    function Message_G2C_FIGHT_CHAMPION_RECORD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_CHAMPION_RECORD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.championRecordList = [];
    };
    Message_G2C_FIGHT_CHAMPION_RECORD.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_CHAMPION_RECORD.prototype.unpack = function (reader) {
        this.championRecordList = [];
        var count = reader.readChar(); //记录数量
        for (var i = 1; i <= count; i++) {
            var recordInfo = {};
            recordInfo.result = reader.readChar(); //结果
            recordInfo.id = reader.readUInt(); //录像ID
            recordInfo.ownerID = reader.readUInt(); //拥有者ID
            recordInfo.playerInfo = {};
            recordInfo.playerInfo.id = reader.readUInt(); //id
            recordInfo.playerInfo.name = reader.readString(); //名字
            recordInfo.playerInfo.vocation = reader.readUShort(); //职业
            recordInfo.playerInfo.level = reader.readUShort(); //等级
            recordInfo.playerInfo.force = reader.readUInt(); //战力
            recordInfo.playerInfo.sex = reader.readChar(); //性别
            recordInfo.selfInfo = {};
            recordInfo.selfInfo.id = reader.readUInt(); //id
            recordInfo.selfInfo.name = reader.readString(); //名字
            recordInfo.selfInfo.vocation = reader.readUShort(); //职业
            recordInfo.selfInfo.level = reader.readUShort(); //等级
            recordInfo.selfInfo.force = reader.readUInt(); //战力
            recordInfo.selfInfo.sex = reader.readChar(); //性别
            JsUtil.arrayInstert(this.championRecordList, recordInfo);
        }
    };
    return Message_G2C_FIGHT_CHAMPION_RECORD;
}(MessageBase));
__reflect(Message_G2C_FIGHT_CHAMPION_RECORD.prototype, "Message_G2C_FIGHT_CHAMPION_RECORD");
//观看录像
var Message_C2G_FIGHT_CHAMPION_VIEDO = (function (_super) {
    __extends(Message_C2G_FIGHT_CHAMPION_VIEDO, _super);
    function Message_C2G_FIGHT_CHAMPION_VIEDO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_CHAMPION_VIEDO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.viedoID = null;
        this.roleId = 0;
    };
    Message_C2G_FIGHT_CHAMPION_VIEDO.prototype.pack = function (writer) {
        writer.writeUInt(this.viedoID);
        writer.writeUInt(this.roleId);
    };
    Message_C2G_FIGHT_CHAMPION_VIEDO.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_CHAMPION_VIEDO;
}(MessageBase));
__reflect(Message_C2G_FIGHT_CHAMPION_VIEDO.prototype, "Message_C2G_FIGHT_CHAMPION_VIEDO");
//观看全局录像
var Message_C2G_FIGHT_GLOBAL_VIEDO = (function (_super) {
    __extends(Message_C2G_FIGHT_GLOBAL_VIEDO, _super);
    function Message_C2G_FIGHT_GLOBAL_VIEDO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_GLOBAL_VIEDO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.viedoID = null;
        this.roleId = 0;
    };
    Message_C2G_FIGHT_GLOBAL_VIEDO.prototype.pack = function (writer) {
        writer.writeUInt(this.viedoID);
        writer.writeUInt(this.roleId);
    };
    Message_C2G_FIGHT_GLOBAL_VIEDO.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_GLOBAL_VIEDO;
}(MessageBase));
__reflect(Message_C2G_FIGHT_GLOBAL_VIEDO.prototype, "Message_C2G_FIGHT_GLOBAL_VIEDO");
//清除等待时间
var Message_C2G_FIGHT_CHAMPION_CLEAR = (function (_super) {
    __extends(Message_C2G_FIGHT_CHAMPION_CLEAR, _super);
    function Message_C2G_FIGHT_CHAMPION_CLEAR() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_CHAMPION_CLEAR.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FIGHT_CHAMPION_CLEAR.prototype.pack = function (writer) {
    };
    Message_C2G_FIGHT_CHAMPION_CLEAR.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_CHAMPION_CLEAR;
}(MessageBase));
__reflect(Message_C2G_FIGHT_CHAMPION_CLEAR.prototype, "Message_C2G_FIGHT_CHAMPION_CLEAR");
//竞技场刷新
var Message_C2G_FIGHT_CHAMPION_REFRESH_EX = (function (_super) {
    __extends(Message_C2G_FIGHT_CHAMPION_REFRESH_EX, _super);
    function Message_C2G_FIGHT_CHAMPION_REFRESH_EX() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_CHAMPION_REFRESH_EX.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FIGHT_CHAMPION_REFRESH_EX.prototype.pack = function (writer) {
    };
    Message_C2G_FIGHT_CHAMPION_REFRESH_EX.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_CHAMPION_REFRESH_EX;
}(MessageBase));
__reflect(Message_C2G_FIGHT_CHAMPION_REFRESH_EX.prototype, "Message_C2G_FIGHT_CHAMPION_REFRESH_EX");
//竞技场刷新返回
var Message_G2C_FIGHT_CHAMPION_REFRESH_EX = (function (_super) {
    __extends(Message_G2C_FIGHT_CHAMPION_REFRESH_EX, _super);
    function Message_G2C_FIGHT_CHAMPION_REFRESH_EX() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //topList:any
    Message_G2C_FIGHT_CHAMPION_REFRESH_EX.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.times = null; //剩下多少次
        this.maxTimes = null; //最多多少次
        this.time = null; //多长时间后可以再挑战
        this.winStreak = null; //连胜次数
        this.force = null; //战力
    };
    Message_G2C_FIGHT_CHAMPION_REFRESH_EX.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_CHAMPION_REFRESH_EX.prototype.unpack = function (reader) {
        this.times = reader.readUInt(); //剩下多少次
        this.maxTimes = reader.readUInt(); //最多多少次
        this.time = reader.readUInt(); //多长时间后可以再挑战	
        this.winStreak = reader.readUInt(); //连胜次数
        this.force = tonumber(reader.readString()) || 0; //战力
        //this.topList = table_load(reader.readString())
    };
    return Message_G2C_FIGHT_CHAMPION_REFRESH_EX;
}(MessageBase));
__reflect(Message_G2C_FIGHT_CHAMPION_REFRESH_EX.prototype, "Message_G2C_FIGHT_CHAMPION_REFRESH_EX");
var Message_G2C_FIGHT_CHAMPION_EX_PRIZE = (function (_super) {
    __extends(Message_G2C_FIGHT_CHAMPION_EX_PRIZE, _super);
    function Message_G2C_FIGHT_CHAMPION_EX_PRIZE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_CHAMPION_EX_PRIZE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.bestRank = null; //最高排名
        this.plrRank = null; //当前排名
        this.rankUp = null; //上升排名
        //this.prizeList = null //奖励
    };
    Message_G2C_FIGHT_CHAMPION_EX_PRIZE.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_CHAMPION_EX_PRIZE.prototype.unpack = function (reader) {
        this.bestRank = reader.readUInt(); //最高排名
        this.plrRank = reader.readUInt(); //当前排名
        this.rankUp = reader.readUInt(); //上升排名
        //this.prizeList = table_load(reader.readString()) //奖励
    };
    return Message_G2C_FIGHT_CHAMPION_EX_PRIZE;
}(MessageBase));
__reflect(Message_G2C_FIGHT_CHAMPION_EX_PRIZE.prototype, "Message_G2C_FIGHT_CHAMPION_EX_PRIZE");
var Message_C2G_FIGHT_CHAMPION_INCREASE = (function (_super) {
    __extends(Message_C2G_FIGHT_CHAMPION_INCREASE, _super);
    function Message_C2G_FIGHT_CHAMPION_INCREASE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_CHAMPION_INCREASE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.buyTime = 1;
    };
    Message_C2G_FIGHT_CHAMPION_INCREASE.prototype.pack = function (writer) {
        writer.writeUInt(this.buyTime);
    };
    Message_C2G_FIGHT_CHAMPION_INCREASE.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_CHAMPION_INCREASE;
}(MessageBase));
__reflect(Message_C2G_FIGHT_CHAMPION_INCREASE.prototype, "Message_C2G_FIGHT_CHAMPION_INCREASE");
//# sourceMappingURL=EveryDayMessage.js.map