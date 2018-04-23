/*
作者:
    yangguiming
    
创建时间：
   2013.6.20(周四)

意图：
   物品系统消息

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
//物品列表
//////////////////////////////////////////////////////////////////-
// class Message_G2C_ITEM_LIST extends MessageBase{
// 	ItemList:ItemInfo[]
// public initObj(...args:any[]):void {
// 	this.ItemList = null
// 	//this.fireEvent=true
// 	//this.isdump = true 
// }
// pack( writer){
// }
// unpack( reader){
// 	this.ItemList = []
// 	let num = reader.readUInt()
// 	for(let i = 1; i <=  num;i++){
// 		let info = ItemInfo.newObj()
// 		info.read(reader)
// 		table_insert(this.ItemList, info)
// 	}
// }
//}
//物品更新
//////////////////////////////////////////////////////////////////-
// class Message_G2C_ITEM_UPDATE extends MessageBase{
// 	ItemList:ItemInfo[]
// public initObj(...args:any[]):void {
// 	this.ItemList = []
// 	//this.fireEvent=true 
// }
// pack( writer){
// }
// unpack( reader){
// 	this.ItemList = []
// 	let num = reader.readUShort()
// 	for(let i = 1; i <=  num;i++){
// 		let info = ItemInfo.newObj()
// 		info.read(reader)
// 		table_insert(this.ItemList, info)
// 	}
// }
// }
var Message_C2G_ITEM_USE = (function (_super) {
    __extends(Message_C2G_ITEM_USE, _super);
    function Message_C2G_ITEM_USE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ITEM_USE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = 0;
        this.count = 0;
    };
    Message_C2G_ITEM_USE.prototype.pack = function (writer) {
        writer.writeUInt(this.id);
        writer.writeUInt(this.count);
    };
    Message_C2G_ITEM_USE.prototype.unpack = function (reader) {
    };
    return Message_C2G_ITEM_USE;
}(MessageBase));
__reflect(Message_C2G_ITEM_USE.prototype, "Message_C2G_ITEM_USE");
//伙伴进化
var Message_C2G_PET_DEVELOP_QUALITY = (function (_super) {
    __extends(Message_C2G_PET_DEVELOP_QUALITY, _super);
    function Message_C2G_PET_DEVELOP_QUALITY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_PET_DEVELOP_QUALITY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = 0;
        this.entryid = 0;
    };
    Message_C2G_PET_DEVELOP_QUALITY.prototype.pack = function (writer) {
        TLog.Debug("this.id..............." + this.id);
        TLog.Debug("this.entryid..............." + this.entryid);
        writer.writeUInt(this.id);
        writer.writeUShort(this.entryid);
    };
    Message_C2G_PET_DEVELOP_QUALITY.prototype.unpack = function (reader) {
    };
    return Message_C2G_PET_DEVELOP_QUALITY;
}(MessageBase));
__reflect(Message_C2G_PET_DEVELOP_QUALITY.prototype, "Message_C2G_PET_DEVELOP_QUALITY");
var Message_G2C_PET_DEVELOP_QUALITY = (function (_super) {
    __extends(Message_G2C_PET_DEVELOP_QUALITY, _super);
    function Message_G2C_PET_DEVELOP_QUALITY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_PET_DEVELOP_QUALITY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petentryid = 0;
        this.level = 0;
    };
    Message_G2C_PET_DEVELOP_QUALITY.prototype.pack = function (writer) {
    };
    Message_G2C_PET_DEVELOP_QUALITY.prototype.unpack = function (reader) {
        this.petentryid = reader.readUShort();
        this.level = reader.readUChar();
    };
    return Message_G2C_PET_DEVELOP_QUALITY;
}(MessageBase));
__reflect(Message_G2C_PET_DEVELOP_QUALITY.prototype, "Message_G2C_PET_DEVELOP_QUALITY");
//物品丢弃回应
//////////////////////////////////////////////////////////////////-
// class Message_G2C_ITEM_DROP extends MessageBase{
// 	id
// public initObj(...args:any[]):void {
// 	this.id = 0
// }
// pack( writer){
// }
// unpack( reader){
// 	this.id = reader.readUInt()
// }
// }
////////////////////////////////////////////////////////////////////////////////////-
// 查看商品列表
var Message_C2G_ITEM_TRADE_LIST = (function (_super) {
    __extends(Message_C2G_ITEM_TRADE_LIST, _super);
    function Message_C2G_ITEM_TRADE_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ITEM_TRADE_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.first_type = 0;
        //this.second_type = 0
    };
    Message_C2G_ITEM_TRADE_LIST.prototype.pack = function (writer) {
        writer.writeUInt(this.first_type);
        //writer.writeUInt(this.second_type)
    };
    Message_C2G_ITEM_TRADE_LIST.prototype.unpack = function (reader) {
    };
    return Message_C2G_ITEM_TRADE_LIST;
}(MessageBase));
__reflect(Message_C2G_ITEM_TRADE_LIST.prototype, "Message_C2G_ITEM_TRADE_LIST");
// 获取商品列表
var Message_G2C_ITEM_TRADE_LIST = (function (_super) {
    __extends(Message_G2C_ITEM_TRADE_LIST, _super);
    function Message_G2C_ITEM_TRADE_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ITEM_TRADE_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.first_type = 0;
        this.second_type = 0;
        this.itemList = [];
    };
    Message_G2C_ITEM_TRADE_LIST.prototype.pack = function (writer) {
    };
    Message_G2C_ITEM_TRADE_LIST.prototype.unpack = function (reader) {
        this.first_type = reader.readUInt();
        //this.second_type = reader.readUInt()
        var count = reader.readUInt();
        this.itemList = [];
        for (var i = 1; i <= count; i++) {
            var item = {};
            item.entryId = reader.readUInt(); //物品ID
            item.sell_price = table_load(reader.readString()); //卖出价格				//服务器买
            item.buy_price = table_load(reader.readString()); //买进价格					//服务器卖
            item.sell_count = reader.readInt(); //我卖数量					//服务器收购
            item.sell_max = reader.readInt(); //我卖上限					//服务器收购总数
            item.buy_max = reader.readInt(); //我可买总数量				//服务器出售总数
            var buy_count = reader.readInt(); //我可买数量 		//服务器出售数量
            item.buy_count = item.buy_max - buy_count;
            JsUtil.arrayInstert(this.itemList, item);
        }
    };
    return Message_G2C_ITEM_TRADE_LIST;
}(MessageBase));
__reflect(Message_G2C_ITEM_TRADE_LIST.prototype, "Message_G2C_ITEM_TRADE_LIST");
//商城单个物品信息
var Message_C2G_ITEM_TRADE_ITEM_INFO = (function (_super) {
    __extends(Message_C2G_ITEM_TRADE_ITEM_INFO, _super);
    function Message_C2G_ITEM_TRADE_ITEM_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ITEM_TRADE_ITEM_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.entryId = 0;
    };
    Message_C2G_ITEM_TRADE_ITEM_INFO.prototype.pack = function (writer) {
        writer.writeUInt(this.entryId);
    };
    Message_C2G_ITEM_TRADE_ITEM_INFO.prototype.unpack = function (reader) {
    };
    return Message_C2G_ITEM_TRADE_ITEM_INFO;
}(MessageBase));
__reflect(Message_C2G_ITEM_TRADE_ITEM_INFO.prototype, "Message_C2G_ITEM_TRADE_ITEM_INFO");
var Message_G2C_ITEM_TRADE_ITEM_INFO = (function (_super) {
    __extends(Message_G2C_ITEM_TRADE_ITEM_INFO, _super);
    function Message_G2C_ITEM_TRADE_ITEM_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ITEM_TRADE_ITEM_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.first_type = 0;
        this.dealItemInfo = {};
    };
    Message_G2C_ITEM_TRADE_ITEM_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_ITEM_TRADE_ITEM_INFO.prototype.unpack = function (reader) {
        this.first_type = reader.readUInt();
        var item = {};
        item.entryId = reader.readUInt(); //物品ID
        item.sell_price = table_load(reader.readString()); //卖出价格				//服务器买
        item.buy_price = table_load(reader.readString()); //买进价格					//服务器卖
        item.sell_count = reader.readInt(); //我卖数量					//服务器收购
        item.sell_max = reader.readInt(); //我卖上限					//服务器收购总数
        item.buy_max = reader.readInt(); //我可买总数量				//服务器出售总数
        var buy_count = reader.readInt(); //我可买数量 		//服务器出售数量
        item.buy_count = item.buy_max - buy_count;
        this.dealItemInfo = item;
    };
    return Message_G2C_ITEM_TRADE_ITEM_INFO;
}(MessageBase));
__reflect(Message_G2C_ITEM_TRADE_ITEM_INFO.prototype, "Message_G2C_ITEM_TRADE_ITEM_INFO");
var Message_G2C_ITEM_TRADE_LIMIT = (function (_super) {
    __extends(Message_G2C_ITEM_TRADE_LIMIT, _super);
    function Message_G2C_ITEM_TRADE_LIMIT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ITEM_TRADE_LIMIT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.limitList = {};
    };
    Message_G2C_ITEM_TRADE_LIMIT.prototype.pack = function (writer) {
    };
    Message_G2C_ITEM_TRADE_LIMIT.prototype.unpack = function (reader) {
        this.limitList = {};
        this.limitList = table_load(reader.readString());
    };
    return Message_G2C_ITEM_TRADE_LIMIT;
}(MessageBase));
__reflect(Message_G2C_ITEM_TRADE_LIMIT.prototype, "Message_G2C_ITEM_TRADE_LIMIT");
var Message_C2G_ITEM_SELL_LIST = (function (_super) {
    __extends(Message_C2G_ITEM_SELL_LIST, _super);
    function Message_C2G_ITEM_SELL_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ITEM_SELL_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.seller = Message_C2G_ITEM_SELL_LIST.NPC_TYPE; // 0代表玩家，1代表NPC
        this.entryId = 0; // 玩家或者NPC的ID
    };
    Message_C2G_ITEM_SELL_LIST.prototype.pack = function (writer) {
        writer.writeUChar(this.seller);
        writer.writeUInt(this.entryId);
    };
    Message_C2G_ITEM_SELL_LIST.prototype.unpack = function (reader) {
    };
    Message_C2G_ITEM_SELL_LIST.NPC_TYPE = 1;
    Message_C2G_ITEM_SELL_LIST.PLAYER_TYPE = 2;
    return Message_C2G_ITEM_SELL_LIST;
}(MessageBase));
__reflect(Message_C2G_ITEM_SELL_LIST.prototype, "Message_C2G_ITEM_SELL_LIST");
// class Message_G2C_ITEM_SELL_LIST extends MessageBase{
// 	itemList:ItemInfo[]
// 	shopIndex
// public initObj(...args:any[]):void {
// 	this.itemList = []
// 	this.shopIndex = 0
// }
// pack( writer){
// }
// unpack( reader){
// 	this.itemList = []
//   this.shopIndex = reader.readUInt()   
//   let number = reader.readUInt()
//   for(let i = 1; i <= number;i++){
//     let info = ItemInfo.newObj()
// 		info.read(reader)
// 		let logicItem = Item.newObj(info)
//     table_insert(this.itemList, logicItem)   
//   }   
// }
// }
// 购买物品(积分商城使用)
var Message_C2G_ITEM_BUY = (function (_super) {
    __extends(Message_C2G_ITEM_BUY, _super);
    function Message_C2G_ITEM_BUY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ITEM_BUY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.npc_id = 0;
        this.id = 0;
        this.count = 0;
        this.priceType = 0;
    };
    Message_C2G_ITEM_BUY.prototype.pack = function (writer) {
        writer.writeUInt(this.npc_id);
        writer.writeUInt(this.id);
        writer.writeUInt(this.count);
        writer.writeUInt(this.priceType);
    };
    Message_C2G_ITEM_BUY.prototype.unpack = function (reader) {
    };
    return Message_C2G_ITEM_BUY;
}(MessageBase));
__reflect(Message_C2G_ITEM_BUY.prototype, "Message_C2G_ITEM_BUY");
// 晶石购买物品
var Message_C2G_ITEM_TRADE_SALE = (function (_super) {
    __extends(Message_C2G_ITEM_TRADE_SALE, _super);
    function Message_C2G_ITEM_TRADE_SALE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ITEM_TRADE_SALE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = 0;
        this.count = 0;
    };
    Message_C2G_ITEM_TRADE_SALE.prototype.pack = function (writer) {
        writer.writeUInt(this.id);
        writer.writeUInt(this.count);
    };
    Message_C2G_ITEM_TRADE_SALE.prototype.unpack = function (reader) {
    };
    return Message_C2G_ITEM_TRADE_SALE;
}(MessageBase));
__reflect(Message_C2G_ITEM_TRADE_SALE.prototype, "Message_C2G_ITEM_TRADE_SALE");
////////////////////////////////////////////////////////////////////////////////////-
////使用王者英魂
var Message_C2G_FETE_PLAYER = (function (_super) {
    __extends(Message_C2G_FETE_PLAYER, _super);
    function Message_C2G_FETE_PLAYER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FETE_PLAYER.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.itemList = {};
    };
    Message_C2G_FETE_PLAYER.prototype.pack = function (writer) {
        writer.writeString(table_save(this.itemList));
    };
    Message_C2G_FETE_PLAYER.prototype.unpack = function (reader) {
    };
    return Message_C2G_FETE_PLAYER;
}(MessageBase));
__reflect(Message_C2G_FETE_PLAYER.prototype, "Message_C2G_FETE_PLAYER");
////晶石兑换金币或者体力剩余次数
var Message_C2G_ACTIVE_DUIHUAN_SELECT = (function (_super) {
    __extends(Message_C2G_ACTIVE_DUIHUAN_SELECT, _super);
    function Message_C2G_ACTIVE_DUIHUAN_SELECT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ACTIVE_DUIHUAN_SELECT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.index = null;
    };
    Message_C2G_ACTIVE_DUIHUAN_SELECT.prototype.pack = function (writer) {
        writer.writeUInt(this.index);
    };
    Message_C2G_ACTIVE_DUIHUAN_SELECT.prototype.unpack = function (reader) {
    };
    return Message_C2G_ACTIVE_DUIHUAN_SELECT;
}(MessageBase));
__reflect(Message_C2G_ACTIVE_DUIHUAN_SELECT.prototype, "Message_C2G_ACTIVE_DUIHUAN_SELECT");
var Message_G2C_ACTIVE_DUIHUAN_SELECT = (function (_super) {
    __extends(Message_G2C_ACTIVE_DUIHUAN_SELECT, _super);
    function Message_G2C_ACTIVE_DUIHUAN_SELECT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ACTIVE_DUIHUAN_SELECT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.count = null;
        this.cost = null;
    };
    Message_G2C_ACTIVE_DUIHUAN_SELECT.prototype.pack = function (writer) {
    };
    Message_G2C_ACTIVE_DUIHUAN_SELECT.prototype.unpack = function (reader) {
        this.count = reader.readUInt();
        this.cost = reader.readUInt();
    };
    return Message_G2C_ACTIVE_DUIHUAN_SELECT;
}(MessageBase));
__reflect(Message_G2C_ACTIVE_DUIHUAN_SELECT.prototype, "Message_G2C_ACTIVE_DUIHUAN_SELECT");
var Message_C2G_ACTIVE_DUIHUAN = (function (_super) {
    __extends(Message_C2G_ACTIVE_DUIHUAN, _super);
    function Message_C2G_ACTIVE_DUIHUAN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ACTIVE_DUIHUAN.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.index = null;
    };
    Message_C2G_ACTIVE_DUIHUAN.prototype.pack = function (writer) {
        writer.writeUInt(this.index);
    };
    Message_C2G_ACTIVE_DUIHUAN.prototype.unpack = function (reader) {
    };
    return Message_C2G_ACTIVE_DUIHUAN;
}(MessageBase));
__reflect(Message_C2G_ACTIVE_DUIHUAN.prototype, "Message_C2G_ACTIVE_DUIHUAN");
////////////////////////////////////////////////////////////////////////////////////////////////////////-
//溶解物品
var Message_C2G_ITEM_EQUIP_SPLIT = (function (_super) {
    __extends(Message_C2G_ITEM_EQUIP_SPLIT, _super);
    function Message_C2G_ITEM_EQUIP_SPLIT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ITEM_EQUIP_SPLIT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.list = {};
    };
    Message_C2G_ITEM_EQUIP_SPLIT.prototype.pack = function (writer) {
        writer.writeString(table_save(this.list));
    };
    Message_C2G_ITEM_EQUIP_SPLIT.prototype.unpack = function (reader) {
    };
    return Message_C2G_ITEM_EQUIP_SPLIT;
}(MessageBase));
__reflect(Message_C2G_ITEM_EQUIP_SPLIT.prototype, "Message_C2G_ITEM_EQUIP_SPLIT");
////////////////////////-装备重铸//////////////////
var Message_C2G_EQUIP_CAST = (function (_super) {
    __extends(Message_C2G_EQUIP_CAST, _super);
    function Message_C2G_EQUIP_CAST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_EQUIP_CAST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.itemId = null;
    };
    Message_C2G_EQUIP_CAST.prototype.pack = function (writer) {
        writer.writeUInt(this.itemId);
    };
    Message_C2G_EQUIP_CAST.prototype.unpack = function (reader) {
    };
    return Message_C2G_EQUIP_CAST;
}(MessageBase));
__reflect(Message_C2G_EQUIP_CAST.prototype, "Message_C2G_EQUIP_CAST");
//装备重铸选择
var Message_C2G_EQUIP_CAST_CHOOSE = (function (_super) {
    __extends(Message_C2G_EQUIP_CAST_CHOOSE, _super);
    function Message_C2G_EQUIP_CAST_CHOOSE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_EQUIP_CAST_CHOOSE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.itemId = null;
    };
    Message_C2G_EQUIP_CAST_CHOOSE.prototype.pack = function (writer) {
        writer.writeUInt(this.itemId);
    };
    Message_C2G_EQUIP_CAST_CHOOSE.prototype.unpack = function (reader) {
    };
    return Message_C2G_EQUIP_CAST_CHOOSE;
}(MessageBase));
__reflect(Message_C2G_EQUIP_CAST_CHOOSE.prototype, "Message_C2G_EQUIP_CAST_CHOOSE");
var Message_C2G_EQUIP_CAST_CANCEL = (function (_super) {
    __extends(Message_C2G_EQUIP_CAST_CANCEL, _super);
    function Message_C2G_EQUIP_CAST_CANCEL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_EQUIP_CAST_CANCEL.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.itemId = null;
    };
    Message_C2G_EQUIP_CAST_CANCEL.prototype.pack = function (writer) {
        writer.writeUInt(this.itemId);
    };
    Message_C2G_EQUIP_CAST_CANCEL.prototype.unpack = function (reader) {
    };
    return Message_C2G_EQUIP_CAST_CANCEL;
}(MessageBase));
__reflect(Message_C2G_EQUIP_CAST_CANCEL.prototype, "Message_C2G_EQUIP_CAST_CANCEL");
//初始化物品库
var Message_C2G_ITEM_ENTER_LOTTERY = (function (_super) {
    __extends(Message_C2G_ITEM_ENTER_LOTTERY, _super);
    function Message_C2G_ITEM_ENTER_LOTTERY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ITEM_ENTER_LOTTERY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_ITEM_ENTER_LOTTERY.prototype.pack = function (writer) {
    };
    Message_C2G_ITEM_ENTER_LOTTERY.prototype.unpack = function (reader) {
    };
    return Message_C2G_ITEM_ENTER_LOTTERY;
}(MessageBase));
__reflect(Message_C2G_ITEM_ENTER_LOTTERY.prototype, "Message_C2G_ITEM_ENTER_LOTTERY");
//初始化结果
var Message_G2C_ITEM_ENTER_LOTTERY = (function (_super) {
    __extends(Message_G2C_ITEM_ENTER_LOTTERY, _super);
    function Message_G2C_ITEM_ENTER_LOTTERY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ITEM_ENTER_LOTTERY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_G2C_ITEM_ENTER_LOTTERY.prototype.pack = function (writer) {
    };
    Message_G2C_ITEM_ENTER_LOTTERY.prototype.unpack = function (reader) {
    };
    return Message_G2C_ITEM_ENTER_LOTTERY;
}(MessageBase));
__reflect(Message_G2C_ITEM_ENTER_LOTTERY.prototype, "Message_G2C_ITEM_ENTER_LOTTERY");
//获取物品库
var Message_G2C_ITEM_LOTTERY_LIB = (function (_super) {
    __extends(Message_G2C_ITEM_LOTTERY_LIB, _super);
    function Message_G2C_ITEM_LOTTERY_LIB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_ITEM_LOTTERY_LIB.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.ItemList = null;
    };
    Message_G2C_ITEM_LOTTERY_LIB.prototype.pack = function (writer) {
    };
    Message_G2C_ITEM_LOTTERY_LIB.prototype.unpack = function (reader) {
        this.ItemList = {};
        this.ItemList = table_load(reader.readString());
    };
    return Message_G2C_ITEM_LOTTERY_LIB;
}(MessageBase));
__reflect(Message_G2C_ITEM_LOTTERY_LIB.prototype, "Message_G2C_ITEM_LOTTERY_LIB");
var Message_C2G_ITEM_LOTTERY_REFRESH = (function (_super) {
    __extends(Message_C2G_ITEM_LOTTERY_REFRESH, _super);
    function Message_C2G_ITEM_LOTTERY_REFRESH() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ITEM_LOTTERY_REFRESH.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_ITEM_LOTTERY_REFRESH.prototype.pack = function (writer) {
    };
    Message_C2G_ITEM_LOTTERY_REFRESH.prototype.unpack = function (reader) {
    };
    return Message_C2G_ITEM_LOTTERY_REFRESH;
}(MessageBase));
__reflect(Message_C2G_ITEM_LOTTERY_REFRESH.prototype, "Message_C2G_ITEM_LOTTERY_REFRESH");
//发送抽奖 一次和十次
var Message_C2G_ITEM_LOTTERY = (function (_super) {
    __extends(Message_C2G_ITEM_LOTTERY, _super);
    function Message_C2G_ITEM_LOTTERY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ITEM_LOTTERY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.index = null;
    };
    Message_C2G_ITEM_LOTTERY.prototype.pack = function (writer) {
        writer.writeUInt(this.index);
    };
    Message_C2G_ITEM_LOTTERY.prototype.unpack = function (reader) {
    };
    return Message_C2G_ITEM_LOTTERY;
}(MessageBase));
__reflect(Message_C2G_ITEM_LOTTERY.prototype, "Message_C2G_ITEM_LOTTERY");
// class Message_G2C_ITEM_LOTTERY extends MessageBase{
// 	num
// 	ItemList:ItemInfo[]
// public initObj(...args:any[]):void {
// 	  this.num = null
// 		this.ItemList = null
// }
// pack( writer){
// }
// unpack( reader){
// 	this.ItemList = []
// 	this.num = reader.readUInt()
// 	for(let i = 1; i <=  this.num;i++){
// 		let pos = reader.readUInt()
// 		let info = ItemInfo.newObj()
// 		info.lottoPos = pos
// 		info.read(reader)
// 		JsUtil.arrayInstert(this.ItemList,info)
// 	}
// }
//} 
//# sourceMappingURL=ItemMessage.js.map