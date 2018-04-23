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
/*
作者:
    panyuxiong
    
创建时间：
    2014.07.15(星期二)

意图：
        处理活动的消息

公共接口：
    
*/
//////////////////////////////////////////////////////////////////////////////////
//-活动BUFF更新
var Message_G2C_BUFF_UPDATE = (function (_super) {
    __extends(Message_G2C_BUFF_UPDATE, _super);
    function Message_G2C_BUFF_UPDATE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_BUFF_UPDATE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.buffName = null;
        this.buffLeftTime = null;
        this.buffData = null;
    };
    Message_G2C_BUFF_UPDATE.prototype.pack = function (writer) {
    };
    Message_G2C_BUFF_UPDATE.prototype.unpack = function (reader) {
        this.buffName = reader.readString(); //buff名称
        this.buffLeftTime = reader.readUInt(); //剩余时间
        this.buffData = table_load(reader.readString()); //buff数据
    };
    return Message_G2C_BUFF_UPDATE;
}(MessageBase));
__reflect(Message_G2C_BUFF_UPDATE.prototype, "Message_G2C_BUFF_UPDATE");
var Message_G2C_BUFF_REMOVE = (function (_super) {
    __extends(Message_G2C_BUFF_REMOVE, _super);
    function Message_G2C_BUFF_REMOVE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_BUFF_REMOVE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.buffName = null;
    };
    Message_G2C_BUFF_REMOVE.prototype.pack = function (writer) {
    };
    Message_G2C_BUFF_REMOVE.prototype.unpack = function (reader) {
        this.buffName = reader.readString();
    };
    return Message_G2C_BUFF_REMOVE;
}(MessageBase));
__reflect(Message_G2C_BUFF_REMOVE.prototype, "Message_G2C_BUFF_REMOVE");
var Message_C2G_ROLE_RANK = (function (_super) {
    __extends(Message_C2G_ROLE_RANK, _super);
    function Message_C2G_ROLE_RANK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_RANK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.rankType = 0;
        this.index = 0; //用来分组，默认赋值1
    };
    Message_C2G_ROLE_RANK.prototype.pack = function (writer) {
        writer.writeUInt(this.rankType);
        writer.writeUInt(this.index);
    };
    Message_C2G_ROLE_RANK.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_RANK;
}(MessageBase));
__reflect(Message_C2G_ROLE_RANK.prototype, "Message_C2G_ROLE_RANK");
var Message_G2C_ROLE_RANK = (function (_super) {
    __extends(Message_G2C_ROLE_RANK, _super);
    function Message_G2C_ROLE_RANK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_RANK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.ranklist = [];
        this.ranktype = null;
    };
    Message_G2C_ROLE_RANK.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_RANK.prototype.unpack = function (reader) {
        this.ranklist = [];
        this.ranktype = reader.readUShort(); //排行榜类型
        var num = reader.readUShort(); //玩家数量
        for (var j = 1; j <= num; j++) {
            var rankInfo = table_load(reader.readString()); //玩家排名信息
            JsUtil.arrayInstert(this.ranklist, rankInfo);
        }
        this.firstAppearData = table_load(reader.readString());
    };
    return Message_G2C_ROLE_RANK;
}(MessageBase));
__reflect(Message_G2C_ROLE_RANK.prototype, "Message_G2C_ROLE_RANK");
var Message_C2G_EXCITE_DATA = (function (_super) {
    __extends(Message_C2G_EXCITE_DATA, _super);
    function Message_C2G_EXCITE_DATA() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_EXCITE_DATA.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.exciteType = null; // "serverjjc"  "serverTower"  "singlejjc" "singletower"
    };
    Message_C2G_EXCITE_DATA.prototype.pack = function (writer) {
        writer.writeString(this.exciteType);
        //TLog.Debug("send Message_C2G_EXCITE_DATA",this.exciteType)
    };
    Message_C2G_EXCITE_DATA.prototype.unpack = function (reader) {
    };
    return Message_C2G_EXCITE_DATA;
}(MessageBase));
__reflect(Message_C2G_EXCITE_DATA.prototype, "Message_C2G_EXCITE_DATA");
var Message_G2C_EXCITE_DATA = (function (_super) {
    __extends(Message_G2C_EXCITE_DATA, _super);
    function Message_G2C_EXCITE_DATA() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_EXCITE_DATA.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //this.exciteType = null
        this.exciteData = null;
        this.exciteType = null;
        this.fireEvent = true;
    };
    Message_G2C_EXCITE_DATA.prototype.pack = function (writer) {
    };
    Message_G2C_EXCITE_DATA.prototype.unpack = function (reader) {
        this.exciteType = reader.readString();
        this.exciteData = table_load(reader.readString());
    };
    return Message_G2C_EXCITE_DATA;
}(MessageBase));
__reflect(Message_G2C_EXCITE_DATA.prototype, "Message_G2C_EXCITE_DATA");
var Message_C2G_EXCITE_GET_PRIZE = (function (_super) {
    __extends(Message_C2G_EXCITE_GET_PRIZE, _super);
    function Message_C2G_EXCITE_GET_PRIZE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_EXCITE_GET_PRIZE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.exciteType = null;
        this.getIndex = null;
    };
    Message_C2G_EXCITE_GET_PRIZE.prototype.pack = function (writer) {
        writer.writeString(this.exciteType);
        writer.writeUInt(this.getIndex);
    };
    Message_C2G_EXCITE_GET_PRIZE.prototype.unpack = function (reader) {
    };
    return Message_C2G_EXCITE_GET_PRIZE;
}(MessageBase));
__reflect(Message_C2G_EXCITE_GET_PRIZE.prototype, "Message_C2G_EXCITE_GET_PRIZE");
var Message_C2G_ACTIVITY_TIME_INFO = (function (_super) {
    __extends(Message_C2G_ACTIVITY_TIME_INFO, _super);
    function Message_C2G_ACTIVITY_TIME_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ACTIVITY_TIME_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.actIndexList = {};
    };
    Message_C2G_ACTIVITY_TIME_INFO.prototype.pack = function (writer) {
        writer.writeString(table_save(this.actIndexList));
    };
    Message_C2G_ACTIVITY_TIME_INFO.prototype.unpack = function (reader) {
    };
    return Message_C2G_ACTIVITY_TIME_INFO;
}(MessageBase));
__reflect(Message_C2G_ACTIVITY_TIME_INFO.prototype, "Message_C2G_ACTIVITY_TIME_INFO");
var Message_G2C_ACTIVITY_TIME_INFO = (function (_super) {
    __extends(Message_G2C_ACTIVITY_TIME_INFO, _super);
    function Message_G2C_ACTIVITY_TIME_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ACTIVITY_TIME_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.stateList = {};
    };
    Message_G2C_ACTIVITY_TIME_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_ACTIVITY_TIME_INFO.prototype.unpack = function (reader) {
        this.stateList = {};
        var list = table_load(reader.readString());
        for (var _ in list) {
            var index = tonumber(list[_]);
            this.stateList[index] = true;
        }
        //for(let k in list){
        //		let v = list[k]
        //
        //	if(v[2] == 1 ){
        //		this.stateList[v[1*/ = true
        //	}else{
        //		this.stateList[v[1*/ = null
        //	}
        //}
    };
    return Message_G2C_ACTIVITY_TIME_INFO;
}(MessageBase));
__reflect(Message_G2C_ACTIVITY_TIME_INFO.prototype, "Message_G2C_ACTIVITY_TIME_INFO");
var Message_G2C_RECHARGE_REWARD_INFO = (function (_super) {
    __extends(Message_G2C_RECHARGE_REWARD_INFO, _super);
    function Message_G2C_RECHARGE_REWARD_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_RECHARGE_REWARD_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.list = [];
        //this.count = null
    };
    Message_G2C_RECHARGE_REWARD_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_RECHARGE_REWARD_INFO.prototype.unpack = function (reader) {
        var count = reader.readUInt();
        this.list = [];
        for (var i = 1; i <= count; i++) {
            var list = {};
            list.number = reader.readUInt();
            list.prize = table_load(reader.readString());
            this.list.push(list);
        }
        //this.list["recordList"]= table_load(reader.readString())
        //this.list.time = reader.readUInt()
    };
    return Message_G2C_RECHARGE_REWARD_INFO;
}(MessageBase));
__reflect(Message_G2C_RECHARGE_REWARD_INFO.prototype, "Message_G2C_RECHARGE_REWARD_INFO");
var Message_C2G_RECHARGE_REWARD_INFO = (function (_super) {
    __extends(Message_C2G_RECHARGE_REWARD_INFO, _super);
    function Message_C2G_RECHARGE_REWARD_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_RECHARGE_REWARD_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_RECHARGE_REWARD_INFO.prototype.pack = function (writer) {
    };
    Message_C2G_RECHARGE_REWARD_INFO.prototype.unpack = function (reader) {
    };
    return Message_C2G_RECHARGE_REWARD_INFO;
}(MessageBase));
__reflect(Message_C2G_RECHARGE_REWARD_INFO.prototype, "Message_C2G_RECHARGE_REWARD_INFO");
var Message_C2G_BUY_VIP_GIFTS = (function (_super) {
    __extends(Message_C2G_BUY_VIP_GIFTS, _super);
    function Message_C2G_BUY_VIP_GIFTS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_BUY_VIP_GIFTS.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_BUY_VIP_GIFTS.prototype.pack = function (writer) {
    };
    Message_C2G_BUY_VIP_GIFTS.prototype.unpack = function (reader) {
    };
    return Message_C2G_BUY_VIP_GIFTS;
}(MessageBase));
__reflect(Message_C2G_BUY_VIP_GIFTS.prototype, "Message_C2G_BUY_VIP_GIFTS");
var Message_G2C_WAR_HORN_REWARD_INFO = (function (_super) {
    __extends(Message_G2C_WAR_HORN_REWARD_INFO, _super);
    function Message_G2C_WAR_HORN_REWARD_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_WAR_HORN_REWARD_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.list = {};
    };
    Message_G2C_WAR_HORN_REWARD_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_WAR_HORN_REWARD_INFO.prototype.unpack = function (reader) {
        //this.list = table_load(reader.readString())
        var index = null;
        var time = null;
        this.list = {};
        this.list.index = reader.readUInt();
        this.list.time = reader.readUInt();
        this.list.isget = reader.readUInt();
    };
    return Message_G2C_WAR_HORN_REWARD_INFO;
}(MessageBase));
__reflect(Message_G2C_WAR_HORN_REWARD_INFO.prototype, "Message_G2C_WAR_HORN_REWARD_INFO");
var Message_C2G_WAR_HORN_REWARD_INFO = (function (_super) {
    __extends(Message_C2G_WAR_HORN_REWARD_INFO, _super);
    function Message_C2G_WAR_HORN_REWARD_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_WAR_HORN_REWARD_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_WAR_HORN_REWARD_INFO.prototype.pack = function (writer) {
    };
    Message_C2G_WAR_HORN_REWARD_INFO.prototype.unpack = function (reader) {
    };
    return Message_C2G_WAR_HORN_REWARD_INFO;
}(MessageBase));
__reflect(Message_C2G_WAR_HORN_REWARD_INFO.prototype, "Message_C2G_WAR_HORN_REWARD_INFO");
var Message_C2G_GET_WAR_HORN_REWARD = (function (_super) {
    __extends(Message_C2G_GET_WAR_HORN_REWARD, _super);
    function Message_C2G_GET_WAR_HORN_REWARD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_GET_WAR_HORN_REWARD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.index = null;
    };
    Message_C2G_GET_WAR_HORN_REWARD.prototype.pack = function (writer) {
        writer.writeUInt(this.index);
    };
    Message_C2G_GET_WAR_HORN_REWARD.prototype.unpack = function (reader) {
    };
    return Message_C2G_GET_WAR_HORN_REWARD;
}(MessageBase));
__reflect(Message_C2G_GET_WAR_HORN_REWARD.prototype, "Message_C2G_GET_WAR_HORN_REWARD");
var Message_G2C_QIANDAO_TIME = (function (_super) {
    __extends(Message_G2C_QIANDAO_TIME, _super);
    function Message_G2C_QIANDAO_TIME() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_QIANDAO_TIME.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.times = 0;
        this.isget = 0;
    };
    Message_G2C_QIANDAO_TIME.prototype.pack = function (writer) {
    };
    Message_G2C_QIANDAO_TIME.prototype.unpack = function (reader) {
        this.times = reader.readUInt();
        this.isget = reader.readUInt();
    };
    return Message_G2C_QIANDAO_TIME;
}(MessageBase));
__reflect(Message_G2C_QIANDAO_TIME.prototype, "Message_G2C_QIANDAO_TIME");
var Message_C2G_QIANDAO_AWARD = (function (_super) {
    __extends(Message_C2G_QIANDAO_AWARD, _super);
    function Message_C2G_QIANDAO_AWARD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_QIANDAO_AWARD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.Date1 = 0;
    };
    Message_C2G_QIANDAO_AWARD.prototype.pack = function (writer) {
        writer.writeUInt(this.Date1);
    };
    Message_C2G_QIANDAO_AWARD.prototype.unpack = function (reader) {
    };
    return Message_C2G_QIANDAO_AWARD;
}(MessageBase));
__reflect(Message_C2G_QIANDAO_AWARD.prototype, "Message_C2G_QIANDAO_AWARD");
var Message_G2C_GLOBAL_SERVER_EVENT = (function (_super) {
    __extends(Message_G2C_GLOBAL_SERVER_EVENT, _super);
    function Message_G2C_GLOBAL_SERVER_EVENT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_GLOBAL_SERVER_EVENT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.event = 0;
        this.data = {};
    };
    Message_G2C_GLOBAL_SERVER_EVENT.prototype.pack = function (writer) {
    };
    Message_G2C_GLOBAL_SERVER_EVENT.prototype.unpack = function (reader) {
        this.event = reader.readUInt();
        this.data = table_load(reader.readString());
    };
    return Message_G2C_GLOBAL_SERVER_EVENT;
}(MessageBase));
__reflect(Message_G2C_GLOBAL_SERVER_EVENT.prototype, "Message_G2C_GLOBAL_SERVER_EVENT");
var Message_C2G_ROLE_GET_POWER = (function (_super) {
    __extends(Message_C2G_ROLE_GET_POWER, _super);
    function Message_C2G_ROLE_GET_POWER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_GET_POWER.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_ROLE_GET_POWER.prototype.pack = function (writer) {
    };
    Message_C2G_ROLE_GET_POWER.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_GET_POWER;
}(MessageBase));
__reflect(Message_C2G_ROLE_GET_POWER.prototype, "Message_C2G_ROLE_GET_POWER");
var Message_C2G_ROLE_GET_NEW_SUMMON_STONE = (function (_super) {
    __extends(Message_C2G_ROLE_GET_NEW_SUMMON_STONE, _super);
    function Message_C2G_ROLE_GET_NEW_SUMMON_STONE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_GET_NEW_SUMMON_STONE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_ROLE_GET_NEW_SUMMON_STONE.prototype.pack = function (writer) {
    };
    Message_C2G_ROLE_GET_NEW_SUMMON_STONE.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_GET_NEW_SUMMON_STONE;
}(MessageBase));
__reflect(Message_C2G_ROLE_GET_NEW_SUMMON_STONE.prototype, "Message_C2G_ROLE_GET_NEW_SUMMON_STONE");
var Message_C2G_SEVEN_DAY_PRIZE_INFO = (function (_super) {
    __extends(Message_C2G_SEVEN_DAY_PRIZE_INFO, _super);
    function Message_C2G_SEVEN_DAY_PRIZE_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_SEVEN_DAY_PRIZE_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_SEVEN_DAY_PRIZE_INFO.prototype.pack = function (writer) {
    };
    Message_C2G_SEVEN_DAY_PRIZE_INFO.prototype.unpack = function (reader) {
    };
    return Message_C2G_SEVEN_DAY_PRIZE_INFO;
}(MessageBase));
__reflect(Message_C2G_SEVEN_DAY_PRIZE_INFO.prototype, "Message_C2G_SEVEN_DAY_PRIZE_INFO");
// class Message_G2C_SEVEN_DAY_PRIZE_INFO extends MessageBase {
//     prizeInfo:any
//     dailyPrizeInfo
//     public initObj(...args: any[]): void {
//         this.prizeInfo = null
//         this.dailyPrizeInfo = null
//     }
//     pack(writer) {
//     }
//     unpack(reader) {
//         let count = reader.readUInt()
//         this.prizeInfo = {}
//         //有达成进度 但是还没有领取的
//         for (let i = 1; i <= count; i++) {
//             let index = reader.readUInt()
//             let cur = reader.readUInt()//完成进度
//             let target = reader.readUInt()//目标
//             let success = reader.readUChar()//达成
//             let prize = reader.readUChar()//已经领取            
//             //let info = table_load(reader.readString())						//{{0, target, successFlag, prizeFlag}, {0, target, successFlag, prizeFlag}}			1为是；0为否
//             this.prizeInfo[index] = [cur, target, success, prize]
//             //this.prizeInfo.push(info)
//         }
//         //已经完成并领取的 只给一个ID就行
//         let finishCount = reader.readUInt()
//         for (let i = 1; i <= finishCount; i++) {
//             let index = reader.readUInt()
// 		    let entryInfo = GameConfig.SevenDayDetailPrizeConfig[index]
//             this.prizeInfo[index] = [entryInfo.target, entryInfo.target, 1, 1]           
//         }
//         //没有任何达成进度的 通过读配置还原出来
// 		for (let index_ in GameConfig.SevenDayDetailPrizeConfig) {
//             let index = tonumber(index_)
// 			let entryInfo = GameConfig.SevenDayDetailPrizeConfig[index_]
//             if (this.prizeInfo[index] == null){
//                 this.prizeInfo[index] = [0, entryInfo.target, 0, 0]  
//             }
//         }
//         this.dailyPrizeInfo = table_load(reader.readString())     //{[dayIndex1] : 1/0, [dayIndex2] : 1/0}		1表示已领取，0表示不能领取，2表示未领取（客户端检查数量条件不满足时优先看作不能领取）
//     }
// }
var Message_C2G_SEVEN_DAY_GET_PRIZE = (function (_super) {
    __extends(Message_C2G_SEVEN_DAY_GET_PRIZE, _super);
    function Message_C2G_SEVEN_DAY_GET_PRIZE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_SEVEN_DAY_GET_PRIZE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.getIndex = null; //奖励类型(单条奖励类型传0, 天数奖励传1)
        this.prizeIndex = null; //励索引(单条传任务索引，否则天数)
    };
    Message_C2G_SEVEN_DAY_GET_PRIZE.prototype.pack = function (writer) {
        writer.writeUInt(this.getIndex);
        writer.writeUInt(this.prizeIndex);
    };
    Message_C2G_SEVEN_DAY_GET_PRIZE.prototype.unpack = function (reader) {
    };
    return Message_C2G_SEVEN_DAY_GET_PRIZE;
}(MessageBase));
__reflect(Message_C2G_SEVEN_DAY_GET_PRIZE.prototype, "Message_C2G_SEVEN_DAY_GET_PRIZE");
var Message_G2C_SEVEN_DAY_GET_PRIZE = (function (_super) {
    __extends(Message_G2C_SEVEN_DAY_GET_PRIZE, _super);
    function Message_G2C_SEVEN_DAY_GET_PRIZE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_SEVEN_DAY_GET_PRIZE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_G2C_SEVEN_DAY_GET_PRIZE.prototype.pack = function (writer) {
    };
    Message_G2C_SEVEN_DAY_GET_PRIZE.prototype.unpack = function (reader) {
    };
    return Message_G2C_SEVEN_DAY_GET_PRIZE;
}(MessageBase));
__reflect(Message_G2C_SEVEN_DAY_GET_PRIZE.prototype, "Message_G2C_SEVEN_DAY_GET_PRIZE");
var Message_C2G_OPERATE_INFO_LIST = (function (_super) {
    __extends(Message_C2G_OPERATE_INFO_LIST, _super);
    function Message_C2G_OPERATE_INFO_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_OPERATE_INFO_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_OPERATE_INFO_LIST.prototype.pack = function (writer) {
    };
    Message_C2G_OPERATE_INFO_LIST.prototype.unpack = function (reader) {
    };
    return Message_C2G_OPERATE_INFO_LIST;
}(MessageBase));
__reflect(Message_C2G_OPERATE_INFO_LIST.prototype, "Message_C2G_OPERATE_INFO_LIST");
// class Message_G2C_OPERATE_INFO_LIST extends MessageBase {
//     everyDayInfo:any
//     public initObj(...args: any[]): void {
//         this.everyDayInfo = {}
//     }
//     pack(writer) {
//     }
//     unpack(reader) {
//         this.everyDayInfo = []
//         let count = reader.readUInt()
//         //有达成进度 但是还没有领取的
//         for (let i = 1; i <= count; i++) {
//             let index = reader.readUInt()
//             let cur = reader.readUInt()//完成进度
//             let target = reader.readUInt()//目标
//             let success = reader.readUChar()//达成
//             let prize = reader.readUChar()//已经领取            
//             //let info = table_load(reader.readString())						//{进度, 目标, 完成标志(0未完成/1完成), 领奖标志(0未领取/1领取)} －－有效时间不传
//             this.everyDayInfo[index] = [cur, target, success, prize]
//             //this.prizeInfo.push(info)
//         }
//         //已经完成并领取的 只给一个ID就行
//         let finishCount = reader.readUInt()
//         for (let i = 1; i <= finishCount; i++) {
//             let index = reader.readUInt()
// 		    let entryInfo = GameConfig.StartOperationConfig[index]
//             this.everyDayInfo[index] = [entryInfo.target, entryInfo.target, 1, 1]           
//         }
//         //没有任何达成进度的 通过读配置还原出来
// 		for (let index_ in GameConfig.StartOperationConfig) {
//             let index = tonumber(index_)
// 			let entryInfo = GameConfig.StartOperationConfig[index_]
//             if (this.everyDayInfo[index] == null){
//                 this.everyDayInfo[index] = [0, entryInfo.target, 0, 0]  
//             }
//         }        
//     }
//     //单条信息更新
// }
var Message_G2C_OPERATE_INFO_UPDATE = (function (_super) {
    __extends(Message_G2C_OPERATE_INFO_UPDATE, _super);
    function Message_G2C_OPERATE_INFO_UPDATE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_OPERATE_INFO_UPDATE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.singalIndex = null;
        this.singalInfo = null;
    };
    Message_G2C_OPERATE_INFO_UPDATE.prototype.pack = function (writer) {
    };
    Message_G2C_OPERATE_INFO_UPDATE.prototype.unpack = function (reader) {
        this.singalIndex = reader.readUInt();
        var cur = reader.readUInt(); //完成进度
        var target = reader.readUInt(); //目标
        var success = reader.readUChar(); //达成
        var prize = reader.readUChar(); //已经领取  
        this.singalInfo = [cur, target, success, prize];
    };
    return Message_G2C_OPERATE_INFO_UPDATE;
}(MessageBase));
__reflect(Message_G2C_OPERATE_INFO_UPDATE.prototype, "Message_G2C_OPERATE_INFO_UPDATE");
var Message_C2G_OPERATE_INFO_PRIZE = (function (_super) {
    __extends(Message_C2G_OPERATE_INFO_PRIZE, _super);
    function Message_C2G_OPERATE_INFO_PRIZE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_OPERATE_INFO_PRIZE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.index = 0;
    };
    Message_C2G_OPERATE_INFO_PRIZE.prototype.pack = function (writer) {
        writer.writeUInt(this.index);
    };
    Message_C2G_OPERATE_INFO_PRIZE.prototype.unpack = function (reader) {
    };
    return Message_C2G_OPERATE_INFO_PRIZE;
}(MessageBase));
__reflect(Message_C2G_OPERATE_INFO_PRIZE.prototype, "Message_C2G_OPERATE_INFO_PRIZE");
var Message_C2G_OPERATE_ACTIVE_PRIZE = (function (_super) {
    __extends(Message_C2G_OPERATE_ACTIVE_PRIZE, _super);
    function Message_C2G_OPERATE_ACTIVE_PRIZE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_OPERATE_ACTIVE_PRIZE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.index = 0;
    };
    Message_C2G_OPERATE_ACTIVE_PRIZE.prototype.pack = function (writer) {
        writer.writeUInt(this.index);
    };
    Message_C2G_OPERATE_ACTIVE_PRIZE.prototype.unpack = function (reader) {
    };
    return Message_C2G_OPERATE_ACTIVE_PRIZE;
}(MessageBase));
__reflect(Message_C2G_OPERATE_ACTIVE_PRIZE.prototype, "Message_C2G_OPERATE_ACTIVE_PRIZE");
var Message_G2C_OPERATE_ACTIVE_PRIZE = (function (_super) {
    __extends(Message_G2C_OPERATE_ACTIVE_PRIZE, _super);
    function Message_G2C_OPERATE_ACTIVE_PRIZE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_OPERATE_ACTIVE_PRIZE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_G2C_OPERATE_ACTIVE_PRIZE.prototype.pack = function (writer) {
    };
    Message_G2C_OPERATE_ACTIVE_PRIZE.prototype.unpack = function (reader) {
    };
    return Message_G2C_OPERATE_ACTIVE_PRIZE;
}(MessageBase));
__reflect(Message_G2C_OPERATE_ACTIVE_PRIZE.prototype, "Message_G2C_OPERATE_ACTIVE_PRIZE");
var Message_C2G_PLAT_FORM_CODE = (function (_super) {
    __extends(Message_C2G_PLAT_FORM_CODE, _super);
    function Message_C2G_PLAT_FORM_CODE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_PLAT_FORM_CODE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.code = null;
    };
    Message_C2G_PLAT_FORM_CODE.prototype.pack = function (writer) {
        writer.writeString(this.code);
    };
    Message_C2G_PLAT_FORM_CODE.prototype.unpack = function (reader) {
    };
    return Message_C2G_PLAT_FORM_CODE;
}(MessageBase));
__reflect(Message_C2G_PLAT_FORM_CODE.prototype, "Message_C2G_PLAT_FORM_CODE");
//////////////////////邀请码start////////////////////////////////////////////-
//查询奖励信息
var Message_C2G_FRIEND_INVITE_CODE_INFO = (function (_super) {
    __extends(Message_C2G_FRIEND_INVITE_CODE_INFO, _super);
    function Message_C2G_FRIEND_INVITE_CODE_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FRIEND_INVITE_CODE_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FRIEND_INVITE_CODE_INFO.prototype.pack = function (writer) {
    };
    Message_C2G_FRIEND_INVITE_CODE_INFO.prototype.unpack = function (reader) {
    };
    return Message_C2G_FRIEND_INVITE_CODE_INFO;
}(MessageBase));
__reflect(Message_C2G_FRIEND_INVITE_CODE_INFO.prototype, "Message_C2G_FRIEND_INVITE_CODE_INFO");
//邀请人数
var Message_G2C_FRIEND_INVITE_CODE_INFO = (function (_super) {
    __extends(Message_G2C_FRIEND_INVITE_CODE_INFO, _super);
    function Message_G2C_FRIEND_INVITE_CODE_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FRIEND_INVITE_CODE_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.finishFlag = 0;
        this.friendsNum = 0;
        this.myInviteCode = "";
    };
    Message_G2C_FRIEND_INVITE_CODE_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_FRIEND_INVITE_CODE_INFO.prototype.unpack = function (reader) {
        this.finishFlag = reader.readUInt();
        this.friendsNum = reader.readUInt();
        this.myInviteCode = reader.readString();
    };
    return Message_G2C_FRIEND_INVITE_CODE_INFO;
}(MessageBase));
__reflect(Message_G2C_FRIEND_INVITE_CODE_INFO.prototype, "Message_G2C_FRIEND_INVITE_CODE_INFO");
//查询奖励信息返回
var Message_G2C_INVITE_PRIZE_INFO = (function (_super) {
    __extends(Message_G2C_INVITE_PRIZE_INFO, _super);
    function Message_G2C_INVITE_PRIZE_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_INVITE_PRIZE_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.list = {};
    };
    Message_G2C_INVITE_PRIZE_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_INVITE_PRIZE_INFO.prototype.unpack = function (reader) {
        var listtemp = table_load(reader.readString());
        if (Array.isArray(listtemp)) {
            if (listtemp.length == 0) {
                return;
            }
            for (var i = 0; i < listtemp.length; ++i) {
                this.list[i + 1] = listtemp[i];
            }
        }
        else {
            this.list = listtemp;
        }
    };
    return Message_G2C_INVITE_PRIZE_INFO;
}(MessageBase));
__reflect(Message_G2C_INVITE_PRIZE_INFO.prototype, "Message_G2C_INVITE_PRIZE_INFO");
//领取奖励
var Message_C2G_GET_INVITE_PRIZE = (function (_super) {
    __extends(Message_C2G_GET_INVITE_PRIZE, _super);
    function Message_C2G_GET_INVITE_PRIZE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_GET_INVITE_PRIZE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.prizeIndex = 0;
    };
    Message_C2G_GET_INVITE_PRIZE.prototype.pack = function (writer) {
        writer.writeUInt(this.prizeIndex);
    };
    Message_C2G_GET_INVITE_PRIZE.prototype.unpack = function (reader) {
    };
    return Message_C2G_GET_INVITE_PRIZE;
}(MessageBase));
__reflect(Message_C2G_GET_INVITE_PRIZE.prototype, "Message_C2G_GET_INVITE_PRIZE");
//填写邀请码
var Message_C2G_INVITE_FILL_OUT_CODE = (function (_super) {
    __extends(Message_C2G_INVITE_FILL_OUT_CODE, _super);
    function Message_C2G_INVITE_FILL_OUT_CODE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_INVITE_FILL_OUT_CODE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.code = "";
    };
    Message_C2G_INVITE_FILL_OUT_CODE.prototype.pack = function (writer) {
        writer.writeString(this.code);
    };
    Message_C2G_INVITE_FILL_OUT_CODE.prototype.unpack = function (reader) {
    };
    return Message_C2G_INVITE_FILL_OUT_CODE;
}(MessageBase));
__reflect(Message_C2G_INVITE_FILL_OUT_CODE.prototype, "Message_C2G_INVITE_FILL_OUT_CODE");
////////////////////////-冲榜////////////////////////
//}
//class Message_C2G_NEW_SERVER_RANK_INFO extends MessageBase{
//public initObj(...args:any[]):void {
//	
//}
//
//pack( writer){
//	
//}
//
//unpack( reader){
//
//}
var Message_G2C_NEW_SERVER_RANK_INFO = (function (_super) {
    __extends(Message_G2C_NEW_SERVER_RANK_INFO, _super);
    function Message_G2C_NEW_SERVER_RANK_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_NEW_SERVER_RANK_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.openTime = null;
    };
    Message_G2C_NEW_SERVER_RANK_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_NEW_SERVER_RANK_INFO.prototype.unpack = function (reader) {
        this.openTime = reader.readUInt();
    };
    return Message_G2C_NEW_SERVER_RANK_INFO;
}(MessageBase));
__reflect(Message_G2C_NEW_SERVER_RANK_INFO.prototype, "Message_G2C_NEW_SERVER_RANK_INFO");
var Message_C2G_FESTIVAL_SINGLEDAY_INFO = (function (_super) {
    __extends(Message_C2G_FESTIVAL_SINGLEDAY_INFO, _super);
    function Message_C2G_FESTIVAL_SINGLEDAY_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FESTIVAL_SINGLEDAY_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FESTIVAL_SINGLEDAY_INFO.prototype.pack = function (writer) {
    };
    Message_C2G_FESTIVAL_SINGLEDAY_INFO.prototype.unpack = function (reader) {
    };
    return Message_C2G_FESTIVAL_SINGLEDAY_INFO;
}(MessageBase));
__reflect(Message_C2G_FESTIVAL_SINGLEDAY_INFO.prototype, "Message_C2G_FESTIVAL_SINGLEDAY_INFO");
var Message_G2C_FESTIVAL_SINGLEDAY_INFO = (function (_super) {
    __extends(Message_G2C_FESTIVAL_SINGLEDAY_INFO, _super);
    function Message_G2C_FESTIVAL_SINGLEDAY_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FESTIVAL_SINGLEDAY_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.beginTime = null;
        this.endTime = null;
        this.itemList = null;
    };
    Message_G2C_FESTIVAL_SINGLEDAY_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_FESTIVAL_SINGLEDAY_INFO.prototype.unpack = function (reader) {
        this.beginTime = reader.readUInt();
        this.endTime = reader.readUInt();
        this.itemList = table_load(reader.readString());
    };
    return Message_G2C_FESTIVAL_SINGLEDAY_INFO;
}(MessageBase));
__reflect(Message_G2C_FESTIVAL_SINGLEDAY_INFO.prototype, "Message_G2C_FESTIVAL_SINGLEDAY_INFO");
//# sourceMappingURL=ActivityMessage.js.map