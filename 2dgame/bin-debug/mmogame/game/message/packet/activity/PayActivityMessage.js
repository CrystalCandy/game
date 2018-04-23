// TypeScript file
/*
作者:
    yangguiming
    
创建时间：
   2017.03.10(周五)

意图：
   运营充值活动消息
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
//限时单笔充值
var Message_C2G_RECHARGE_REBATE_QUERY = (function (_super) {
    __extends(Message_C2G_RECHARGE_REBATE_QUERY, _super);
    function Message_C2G_RECHARGE_REBATE_QUERY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_RECHARGE_REBATE_QUERY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_RECHARGE_REBATE_QUERY.prototype.pack = function (writer) {
    };
    Message_C2G_RECHARGE_REBATE_QUERY.prototype.unpack = function (reader) {
    };
    return Message_C2G_RECHARGE_REBATE_QUERY;
}(MessageBase));
__reflect(Message_C2G_RECHARGE_REBATE_QUERY.prototype, "Message_C2G_RECHARGE_REBATE_QUERY");
var Message_G2C_RECHARGE_REBATE_QUERY = (function (_super) {
    __extends(Message_G2C_RECHARGE_REBATE_QUERY, _super);
    function Message_G2C_RECHARGE_REBATE_QUERY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_RECHARGE_REBATE_QUERY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.info = {};
    };
    Message_G2C_RECHARGE_REBATE_QUERY.prototype.pack = function (writer) {
    };
    Message_G2C_RECHARGE_REBATE_QUERY.prototype.unpack = function (reader) {
        this.info.actInfo = table_load(reader.readString());
        this.info.heroInfo = table_load(reader.readString());
        this.info.etime = tonumber(reader.readString()) || 0;
    };
    return Message_G2C_RECHARGE_REBATE_QUERY;
}(MessageBase));
__reflect(Message_G2C_RECHARGE_REBATE_QUERY.prototype, "Message_G2C_RECHARGE_REBATE_QUERY");
var Message_C2G_RECHARGE_REBATE_PRIZE = (function (_super) {
    __extends(Message_C2G_RECHARGE_REBATE_PRIZE, _super);
    function Message_C2G_RECHARGE_REBATE_PRIZE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_RECHARGE_REBATE_PRIZE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.itemId = 0;
    };
    Message_C2G_RECHARGE_REBATE_PRIZE.prototype.pack = function (writer) {
        writer.writeUInt(this.itemId);
    };
    Message_C2G_RECHARGE_REBATE_PRIZE.prototype.unpack = function (reader) {
    };
    return Message_C2G_RECHARGE_REBATE_PRIZE;
}(MessageBase));
__reflect(Message_C2G_RECHARGE_REBATE_PRIZE.prototype, "Message_C2G_RECHARGE_REBATE_PRIZE");
var Message_C2G_RECHARGE_ACCUMULATIVE = (function (_super) {
    __extends(Message_C2G_RECHARGE_ACCUMULATIVE, _super);
    function Message_C2G_RECHARGE_ACCUMULATIVE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_RECHARGE_ACCUMULATIVE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_RECHARGE_ACCUMULATIVE.prototype.pack = function (writer) {
    };
    Message_C2G_RECHARGE_ACCUMULATIVE.prototype.unpack = function (reader) {
    };
    return Message_C2G_RECHARGE_ACCUMULATIVE;
}(MessageBase));
__reflect(Message_C2G_RECHARGE_ACCUMULATIVE.prototype, "Message_C2G_RECHARGE_ACCUMULATIVE");
var Message_G2C_RECHARGE_ACCUMULATIVE = (function (_super) {
    __extends(Message_G2C_RECHARGE_ACCUMULATIVE, _super);
    function Message_G2C_RECHARGE_ACCUMULATIVE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_RECHARGE_ACCUMULATIVE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.actInfo = {};
    };
    Message_G2C_RECHARGE_ACCUMULATIVE.prototype.pack = function (writer) {
    };
    Message_G2C_RECHARGE_ACCUMULATIVE.prototype.unpack = function (reader) {
        this.actInfo = table_load(reader.readString());
    };
    return Message_G2C_RECHARGE_ACCUMULATIVE;
}(MessageBase));
__reflect(Message_G2C_RECHARGE_ACCUMULATIVE.prototype, "Message_G2C_RECHARGE_ACCUMULATIVE");
var Message_C2G_PLAYER_RECHARGE_ACCUMULATIVE = (function (_super) {
    __extends(Message_C2G_PLAYER_RECHARGE_ACCUMULATIVE, _super);
    function Message_C2G_PLAYER_RECHARGE_ACCUMULATIVE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_PLAYER_RECHARGE_ACCUMULATIVE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_PLAYER_RECHARGE_ACCUMULATIVE.prototype.pack = function (writer) {
    };
    Message_C2G_PLAYER_RECHARGE_ACCUMULATIVE.prototype.unpack = function (reader) {
    };
    return Message_C2G_PLAYER_RECHARGE_ACCUMULATIVE;
}(MessageBase));
__reflect(Message_C2G_PLAYER_RECHARGE_ACCUMULATIVE.prototype, "Message_C2G_PLAYER_RECHARGE_ACCUMULATIVE");
var Message_G2C_PLAYER_RECHARGE_ACCUMULATIVE = (function (_super) {
    __extends(Message_G2C_PLAYER_RECHARGE_ACCUMULATIVE, _super);
    function Message_G2C_PLAYER_RECHARGE_ACCUMULATIVE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_PLAYER_RECHARGE_ACCUMULATIVE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.heroInfo = {};
    };
    Message_G2C_PLAYER_RECHARGE_ACCUMULATIVE.prototype.pack = function (writer) {
    };
    Message_G2C_PLAYER_RECHARGE_ACCUMULATIVE.prototype.unpack = function (reader) {
        this.heroInfo = table_load(reader.readString());
    };
    return Message_G2C_PLAYER_RECHARGE_ACCUMULATIVE;
}(MessageBase));
__reflect(Message_G2C_PLAYER_RECHARGE_ACCUMULATIVE.prototype, "Message_G2C_PLAYER_RECHARGE_ACCUMULATIVE");
var Message_C2G_GIVE_RECHARGE_ACCUMULATIVE = (function (_super) {
    __extends(Message_C2G_GIVE_RECHARGE_ACCUMULATIVE, _super);
    function Message_C2G_GIVE_RECHARGE_ACCUMULATIVE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_GIVE_RECHARGE_ACCUMULATIVE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.actKey = "";
        this.payQudao = "";
        this.givePoint = 0;
    };
    Message_C2G_GIVE_RECHARGE_ACCUMULATIVE.prototype.pack = function (writer) {
        writer.writeString(this.actKey);
        writer.writeString(this.payQudao);
        writer.writeUInt(this.givePoint);
    };
    Message_C2G_GIVE_RECHARGE_ACCUMULATIVE.prototype.unpack = function (reader) {
    };
    return Message_C2G_GIVE_RECHARGE_ACCUMULATIVE;
}(MessageBase));
__reflect(Message_C2G_GIVE_RECHARGE_ACCUMULATIVE.prototype, "Message_C2G_GIVE_RECHARGE_ACCUMULATIVE");
var Message_C2G_CONSUME_ACCUMULATIVE = (function (_super) {
    __extends(Message_C2G_CONSUME_ACCUMULATIVE, _super);
    function Message_C2G_CONSUME_ACCUMULATIVE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_CONSUME_ACCUMULATIVE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_CONSUME_ACCUMULATIVE.prototype.pack = function (writer) {
    };
    Message_C2G_CONSUME_ACCUMULATIVE.prototype.unpack = function (reader) {
    };
    return Message_C2G_CONSUME_ACCUMULATIVE;
}(MessageBase));
__reflect(Message_C2G_CONSUME_ACCUMULATIVE.prototype, "Message_C2G_CONSUME_ACCUMULATIVE");
var Message_G2C_CONSUME_ACCUMULATIVE = (function (_super) {
    __extends(Message_G2C_CONSUME_ACCUMULATIVE, _super);
    function Message_G2C_CONSUME_ACCUMULATIVE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_CONSUME_ACCUMULATIVE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.info = {};
    };
    Message_G2C_CONSUME_ACCUMULATIVE.prototype.pack = function (writer) {
    };
    Message_G2C_CONSUME_ACCUMULATIVE.prototype.unpack = function (reader) {
        this.info = null;
        this.info = {};
        this.info.actInfo = table_load(reader.readString());
        this.info.heroInfo = table_load(reader.readString());
    };
    return Message_G2C_CONSUME_ACCUMULATIVE;
}(MessageBase));
__reflect(Message_G2C_CONSUME_ACCUMULATIVE.prototype, "Message_G2C_CONSUME_ACCUMULATIVE");
var Message_G2C_QUERY_ACTIVITY_LIST = (function (_super) {
    __extends(Message_G2C_QUERY_ACTIVITY_LIST, _super);
    function Message_G2C_QUERY_ACTIVITY_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_QUERY_ACTIVITY_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.list = [];
    };
    Message_G2C_QUERY_ACTIVITY_LIST.prototype.pack = function (writer) {
    };
    Message_G2C_QUERY_ACTIVITY_LIST.prototype.unpack = function (reader) {
        TLog.Debug("Message_G2C_QUERY_ACTIVITY_LIST");
        var num = reader.readUShort();
        TLog.Debug("num", num);
        this.list = null;
        this.list = {};
        this.list = [];
        for (var i = 1; i <= num; i++) {
            var index = reader.readUShort();
            TLog.Debug("index", index);
            JsUtil.arrayInstert(this.list, index);
        }
    };
    return Message_G2C_QUERY_ACTIVITY_LIST;
}(MessageBase));
__reflect(Message_G2C_QUERY_ACTIVITY_LIST.prototype, "Message_G2C_QUERY_ACTIVITY_LIST");
var Message_G2C_QUERY_ACTIVITY_INFO = (function (_super) {
    __extends(Message_G2C_QUERY_ACTIVITY_INFO, _super);
    function Message_G2C_QUERY_ACTIVITY_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_QUERY_ACTIVITY_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.info = {};
        //this.index = 0
        //this.stime = 0
        //this.etime = 0
        //this.actkey = ""
        //this.prizelist = {}
    };
    Message_G2C_QUERY_ACTIVITY_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_QUERY_ACTIVITY_INFO.prototype.unpack = function (reader) {
        this.info = null;
        this.info = {};
        this.info.index = reader.readUShort();
        this.info.stime = reader.readUInt();
        this.info.etime = reader.readUInt();
        this.info.prizetype = reader.readUChar();
        //this.info.actkey = reader.readString()
        this.info.prizelist = [];
        var num = reader.readUChar();
        for (var i = 1; i <= num; i++) {
            var prizeinfo = {};
            prizeinfo.point = reader.readUInt();
            if (this.info.prizetype == PayActivityPrizeType.ItemList) {
                var prizenum = reader.readUChar();
                prizeinfo.prize = [];
                for (var j = 1; j <= prizenum; j++) {
                    var itemid = reader.readUInt();
                    var itemnum = reader.readUShort();
                    JsUtil.arrayInstert(prizeinfo.prize, [itemid, itemnum]);
                }
            }
            else {
                prizeinfo.prize = reader.readUInt();
            }
            JsUtil.arrayInstert(this.info.prizelist, prizeinfo);
        }
    };
    return Message_G2C_QUERY_ACTIVITY_INFO;
}(MessageBase));
__reflect(Message_G2C_QUERY_ACTIVITY_INFO.prototype, "Message_G2C_QUERY_ACTIVITY_INFO");
var Message_G2C_QUERY_ACTIVITY_PLAYER = (function (_super) {
    __extends(Message_G2C_QUERY_ACTIVITY_PLAYER, _super);
    function Message_G2C_QUERY_ACTIVITY_PLAYER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_QUERY_ACTIVITY_PLAYER.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.info = {};
        //this.index = 0
        //this.value = 0//当前活动的累计数据
        //this.reachlist = {}//哪些档位达成条件，或已经领取等
    };
    Message_G2C_QUERY_ACTIVITY_PLAYER.prototype.pack = function (writer) {
    };
    Message_G2C_QUERY_ACTIVITY_PLAYER.prototype.unpack = function (reader) {
        this.info = null;
        this.info = {};
        this.info.index = reader.readUShort();
        this.info.value = reader.readUInt();
        this.info.reachlist = [];
        this.info.ranklist = [];
        var num = reader.readUChar();
        for (var i = 1; i <= num; i++) {
            var reach = reader.readUShort();
            JsUtil.arrayInstert(this.info.reachlist, reach);
        }
        var ranknum = reader.readUChar();
        for (var i = 1; i <= ranknum; i++) {
            var rankrow = table_load(reader.readString());
            JsUtil.arrayInstert(this.info.ranklist, rankrow);
        }
    };
    return Message_G2C_QUERY_ACTIVITY_PLAYER;
}(MessageBase));
__reflect(Message_G2C_QUERY_ACTIVITY_PLAYER.prototype, "Message_G2C_QUERY_ACTIVITY_PLAYER");
var Message_G2C_QUERY_ACTIVITY_PLAYER_INFO = (function (_super) {
    __extends(Message_G2C_QUERY_ACTIVITY_PLAYER_INFO, _super);
    function Message_G2C_QUERY_ACTIVITY_PLAYER_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_QUERY_ACTIVITY_PLAYER_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.info = {};
    };
    Message_G2C_QUERY_ACTIVITY_PLAYER_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_QUERY_ACTIVITY_PLAYER_INFO.prototype.unpack = function (reader) {
        this.info = null;
        this.info = {};
        this.info.index = reader.readUShort();
        this.info.stime = reader.readUInt();
        this.info.etime = reader.readUInt();
        this.info.prizetype = reader.readUChar();
        //this.info.actkey = reader.readString()
        this.info.prizelist = [];
        var num = reader.readUChar();
        for (var i = 1; i <= num; i++) {
            var prizeinfo = {};
            prizeinfo.point = reader.readUInt();
            if (this.info.prizetype == PayActivityPrizeType.ItemList) {
                var prizenum = reader.readUChar();
                prizeinfo.prize = [];
                for (var j = 1; j <= prizenum; j++) {
                    var itemid = reader.readUInt();
                    var itemnum = reader.readUShort();
                    JsUtil.arrayInstert(prizeinfo.prize, [itemid, itemnum]);
                }
            }
            else {
                prizeinfo.prize = reader.readUInt();
            }
            JsUtil.arrayInstert(this.info.prizelist, prizeinfo);
        }
        //this.info.index = reader.readUShort()
        this.info.value = reader.readUInt();
        this.info.reachlist = [];
        var num2 = reader.readUChar();
        for (var i = 1; i <= num2; i++) {
            var reach = reader.readUShort();
            JsUtil.arrayInstert(this.info.reachlist, reach);
        }
        this.info.ranklist = [];
        var ranknum = reader.readUChar();
        for (var i = 1; i <= ranknum; i++) {
            var rankrow = table_load(reader.readString());
            JsUtil.arrayInstert(this.info.ranklist, rankrow);
        }
    };
    return Message_G2C_QUERY_ACTIVITY_PLAYER_INFO;
}(MessageBase));
__reflect(Message_G2C_QUERY_ACTIVITY_PLAYER_INFO.prototype, "Message_G2C_QUERY_ACTIVITY_PLAYER_INFO");
var Message_C2G_QUERY_ACTIVITY_INFO = (function (_super) {
    __extends(Message_C2G_QUERY_ACTIVITY_INFO, _super);
    function Message_C2G_QUERY_ACTIVITY_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_QUERY_ACTIVITY_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.index = 0;
    };
    Message_C2G_QUERY_ACTIVITY_INFO.prototype.pack = function (writer) {
        writer.writeUShort(this.index);
    };
    Message_C2G_QUERY_ACTIVITY_INFO.prototype.unpack = function (reader) {
    };
    return Message_C2G_QUERY_ACTIVITY_INFO;
}(MessageBase));
__reflect(Message_C2G_QUERY_ACTIVITY_INFO.prototype, "Message_C2G_QUERY_ACTIVITY_INFO");
var Message_C2G_QUERY_ACTIVITY_PLAYER = (function (_super) {
    __extends(Message_C2G_QUERY_ACTIVITY_PLAYER, _super);
    function Message_C2G_QUERY_ACTIVITY_PLAYER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_QUERY_ACTIVITY_PLAYER.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.index = 0;
    };
    Message_C2G_QUERY_ACTIVITY_PLAYER.prototype.pack = function (writer) {
        writer.writeUShort(this.index);
    };
    Message_C2G_QUERY_ACTIVITY_PLAYER.prototype.unpack = function (reader) {
    };
    return Message_C2G_QUERY_ACTIVITY_PLAYER;
}(MessageBase));
__reflect(Message_C2G_QUERY_ACTIVITY_PLAYER.prototype, "Message_C2G_QUERY_ACTIVITY_PLAYER");
var Message_C2G_QUERY_ACTIVITY_PLAYER_INFO = (function (_super) {
    __extends(Message_C2G_QUERY_ACTIVITY_PLAYER_INFO, _super);
    function Message_C2G_QUERY_ACTIVITY_PLAYER_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_QUERY_ACTIVITY_PLAYER_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.index = 0;
    };
    Message_C2G_QUERY_ACTIVITY_PLAYER_INFO.prototype.pack = function (writer) {
        writer.writeUShort(this.index);
    };
    Message_C2G_QUERY_ACTIVITY_PLAYER_INFO.prototype.unpack = function (reader) {
    };
    return Message_C2G_QUERY_ACTIVITY_PLAYER_INFO;
}(MessageBase));
__reflect(Message_C2G_QUERY_ACTIVITY_PLAYER_INFO.prototype, "Message_C2G_QUERY_ACTIVITY_PLAYER_INFO");
var Message_C2G_QUERY_ACTIVITY_PRIZE = (function (_super) {
    __extends(Message_C2G_QUERY_ACTIVITY_PRIZE, _super);
    function Message_C2G_QUERY_ACTIVITY_PRIZE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_QUERY_ACTIVITY_PRIZE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.index = 0;
        this.prizeindex = 0;
    };
    Message_C2G_QUERY_ACTIVITY_PRIZE.prototype.pack = function (writer) {
        writer.writeUShort(this.index);
        writer.writeUChar(this.prizeindex);
    };
    Message_C2G_QUERY_ACTIVITY_PRIZE.prototype.unpack = function (reader) {
    };
    return Message_C2G_QUERY_ACTIVITY_PRIZE;
}(MessageBase));
__reflect(Message_C2G_QUERY_ACTIVITY_PRIZE.prototype, "Message_C2G_QUERY_ACTIVITY_PRIZE");
var Message_C2G_ITEM_TRADE_DISCOUNT_INFO = (function (_super) {
    __extends(Message_C2G_ITEM_TRADE_DISCOUNT_INFO, _super);
    function Message_C2G_ITEM_TRADE_DISCOUNT_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ITEM_TRADE_DISCOUNT_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_ITEM_TRADE_DISCOUNT_INFO.prototype.pack = function (writer) {
    };
    Message_C2G_ITEM_TRADE_DISCOUNT_INFO.prototype.unpack = function (reader) {
    };
    return Message_C2G_ITEM_TRADE_DISCOUNT_INFO;
}(MessageBase));
__reflect(Message_C2G_ITEM_TRADE_DISCOUNT_INFO.prototype, "Message_C2G_ITEM_TRADE_DISCOUNT_INFO");
var Message_G2C_ITEM_TRADE_DISCOUNT_INFO = (function (_super) {
    __extends(Message_G2C_ITEM_TRADE_DISCOUNT_INFO, _super);
    function Message_G2C_ITEM_TRADE_DISCOUNT_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ITEM_TRADE_DISCOUNT_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.discountInfo = {};
    };
    Message_G2C_ITEM_TRADE_DISCOUNT_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_ITEM_TRADE_DISCOUNT_INFO.prototype.unpack = function (reader) {
        this.discountInfo = table_load(reader.readString());
        //g_payStoreDiscount ={
        //	['stime'] : 1441468800,
        //	['etime'] : 1441728000,
        //	['actkey'] : "abc", 
        //	['data'] : {
        //		//礼包的名字,这个礼包的ＩＤ,原价多少晶,现价多少晶,包括的物品列表
        //		{"护卫英魂礼包", 3001, 1000, 800,{{30001,5},{30002,15},{30003,25}}	},
        //		{"王者英魂礼包", 3002, 2000, 1000,{{30006,5},{30007,15},{30008,25}}	},
        //		{"互动之书礼包", 3003, 3000, 2000,{{40024,5},{40025,15}}	},
        //		{"十一礼包", 3004, 4000, 3000,{{40080,5},{40081,15},{40082,25}}	},
        //	}
        //}
    };
    return Message_G2C_ITEM_TRADE_DISCOUNT_INFO;
}(MessageBase));
__reflect(Message_G2C_ITEM_TRADE_DISCOUNT_INFO.prototype, "Message_G2C_ITEM_TRADE_DISCOUNT_INFO");
var Message_C2G_ITEM_TRADE_DISCOUNT_BUY = (function (_super) {
    __extends(Message_C2G_ITEM_TRADE_DISCOUNT_BUY, _super);
    function Message_C2G_ITEM_TRADE_DISCOUNT_BUY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ITEM_TRADE_DISCOUNT_BUY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.actKey = null;
        this.giftId = null;
    };
    Message_C2G_ITEM_TRADE_DISCOUNT_BUY.prototype.pack = function (writer) {
        writer.writeString(this.actKey);
        writer.writeUInt(this.giftId);
    };
    Message_C2G_ITEM_TRADE_DISCOUNT_BUY.prototype.unpack = function (reader) {
    };
    return Message_C2G_ITEM_TRADE_DISCOUNT_BUY;
}(MessageBase));
__reflect(Message_C2G_ITEM_TRADE_DISCOUNT_BUY.prototype, "Message_C2G_ITEM_TRADE_DISCOUNT_BUY");
//C2G查询跨服冲值活动//
var Message_C2G_RECHARGE_SERVERS_PRICE = (function (_super) {
    __extends(Message_C2G_RECHARGE_SERVERS_PRICE, _super);
    function Message_C2G_RECHARGE_SERVERS_PRICE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_RECHARGE_SERVERS_PRICE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_RECHARGE_SERVERS_PRICE.prototype.pack = function (writer) {
    };
    Message_C2G_RECHARGE_SERVERS_PRICE.prototype.unpack = function (reader) {
    };
    return Message_C2G_RECHARGE_SERVERS_PRICE;
}(MessageBase));
__reflect(Message_C2G_RECHARGE_SERVERS_PRICE.prototype, "Message_C2G_RECHARGE_SERVERS_PRICE");
var Message_G2C_RECHARGE_SERVERS_PRICE = (function (_super) {
    __extends(Message_G2C_RECHARGE_SERVERS_PRICE, _super);
    function Message_G2C_RECHARGE_SERVERS_PRICE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_RECHARGE_SERVERS_PRICE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.info = {};
    };
    Message_G2C_RECHARGE_SERVERS_PRICE.prototype.pack = function (writer) {
    };
    Message_G2C_RECHARGE_SERVERS_PRICE.prototype.unpack = function (reader) {
        this.info = table_load(reader.readString());
    };
    return Message_G2C_RECHARGE_SERVERS_PRICE;
}(MessageBase));
__reflect(Message_G2C_RECHARGE_SERVERS_PRICE.prototype, "Message_G2C_RECHARGE_SERVERS_PRICE");
var Message_C2G_PLAYER_RECHARGE_SERVERS_PRICE = (function (_super) {
    __extends(Message_C2G_PLAYER_RECHARGE_SERVERS_PRICE, _super);
    function Message_C2G_PLAYER_RECHARGE_SERVERS_PRICE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_PLAYER_RECHARGE_SERVERS_PRICE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_PLAYER_RECHARGE_SERVERS_PRICE.prototype.pack = function (writer) {
    };
    Message_C2G_PLAYER_RECHARGE_SERVERS_PRICE.prototype.unpack = function (reader) {
    };
    return Message_C2G_PLAYER_RECHARGE_SERVERS_PRICE;
}(MessageBase));
__reflect(Message_C2G_PLAYER_RECHARGE_SERVERS_PRICE.prototype, "Message_C2G_PLAYER_RECHARGE_SERVERS_PRICE");
var Message_G2C_PLAYER_RECHARGE_SERVERS_PRICE = (function (_super) {
    __extends(Message_G2C_PLAYER_RECHARGE_SERVERS_PRICE, _super);
    function Message_G2C_PLAYER_RECHARGE_SERVERS_PRICE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_PLAYER_RECHARGE_SERVERS_PRICE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.value = 0;
    };
    Message_G2C_PLAYER_RECHARGE_SERVERS_PRICE.prototype.pack = function (writer) {
    };
    Message_G2C_PLAYER_RECHARGE_SERVERS_PRICE.prototype.unpack = function (reader) {
        this.value = reader.readUInt();
    };
    return Message_G2C_PLAYER_RECHARGE_SERVERS_PRICE;
}(MessageBase));
__reflect(Message_G2C_PLAYER_RECHARGE_SERVERS_PRICE.prototype, "Message_G2C_PLAYER_RECHARGE_SERVERS_PRICE");
var Message_C2G_ROLE_RECHARGE_BUY_PET = (function (_super) {
    __extends(Message_C2G_ROLE_RECHARGE_BUY_PET, _super);
    function Message_C2G_ROLE_RECHARGE_BUY_PET() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ROLE_RECHARGE_BUY_PET.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_ROLE_RECHARGE_BUY_PET.prototype.pack = function (writer) {
    };
    Message_C2G_ROLE_RECHARGE_BUY_PET.prototype.unpack = function (reader) {
    };
    return Message_C2G_ROLE_RECHARGE_BUY_PET;
}(MessageBase));
__reflect(Message_C2G_ROLE_RECHARGE_BUY_PET.prototype, "Message_C2G_ROLE_RECHARGE_BUY_PET");
var Message_G2C_ROLE_RECHARGE_BUY_PET = (function (_super) {
    __extends(Message_G2C_ROLE_RECHARGE_BUY_PET, _super);
    function Message_G2C_ROLE_RECHARGE_BUY_PET() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ROLE_RECHARGE_BUY_PET.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.record = {};
    };
    Message_G2C_ROLE_RECHARGE_BUY_PET.prototype.pack = function (writer) {
    };
    Message_G2C_ROLE_RECHARGE_BUY_PET.prototype.unpack = function (reader) {
        this.record = table_load(reader.readString()) || {};
    };
    return Message_G2C_ROLE_RECHARGE_BUY_PET;
}(MessageBase));
__reflect(Message_G2C_ROLE_RECHARGE_BUY_PET.prototype, "Message_G2C_ROLE_RECHARGE_BUY_PET");
//# sourceMappingURL=PayActivityMessage.js.map