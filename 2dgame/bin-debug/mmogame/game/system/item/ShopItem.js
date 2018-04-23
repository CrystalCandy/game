/*
作者:
    yangguiming
    
创建时间：
   2017.02.24(周五)

意图：
   商店显示的物品
公共接口：
   
*/
// ImportType(ConfigZhenYing)
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
var ShopScoreType = {
    SHILIAN: 1,
    JINGJI: 2,
    // DOUJI: 3, //斗技
    JUNTUAN: 7,
    TIANTI: 13,
    //ZHONGSHEN : ConfigZhenYing.npcItemEntry, //众神之战
    XINSHOU: 4,
    CHAOZHI: 5,
    SLSHENMI: 6,
};
var ShopDealType = {
    JINGYAN: 1,
    SHENSHI: 2,
    DAOJU: 3,
    JINENG: 4,
};
var ShopItem = (function (_super) {
    __extends(ShopItem, _super);
    function ShopItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShopItem.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.entryId = args[0]; //物品ID
        this.count = args[1]; //剩余数量
        this.priceType = args[2]; //价格类型   opItemUnit
        this.price = args[3]; //价格
        this.limitCount = -1; //每天限购
        this.limitWeekCount = -1; //每周限购
        this.buyDescribe = "";
        this.data = null;
        this.refPropertyInfo = ItemSystem.getInstance().getItemTemplateInfo(this.entryId); //获得引用数据
    };
    ShopItem.prototype.destory = function () {
    };
    ShopItem.prototype.setLimitCount = function (limitCount, weekLimitCount) {
        var resultLimit = -1;
        var resultWeekLimit = -1;
        if (limitCount && limitCount > 0) {
            resultLimit = limitCount;
        }
        if (weekLimitCount && weekLimitCount > 0) {
            resultWeekLimit = weekLimitCount;
        }
        this.limitCount = resultLimit; //每天限购
        this.limitWeekCount = resultWeekLimit; //每周限购
    };
    ShopItem.prototype.setBuyDescrib = function (str) {
        this.buyDescribe = str;
    };
    //自定义信息
    ShopItem.prototype.setData = function (data) {
        this.data = data;
    };
    ShopItem.prototype.getRefProperty = function (key) {
        if (this.refPropertyInfo == null) {
            return null;
        }
        return this.refPropertyInfo[key];
    };
    return ShopItem;
}(TClass));
__reflect(ShopItem.prototype, "ShopItem");
//# sourceMappingURL=ShopItem.js.map