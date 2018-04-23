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
    ljq
    
创建时间：
   2018.03.21(周三)

意图：
   商店框通用控件
   
公共接口：
   
*/
var UIShopBox = (function (_super) {
    __extends(UIShopBox, _super);
    function UIShopBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIShopBox.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mParentNode = args[0];
        this.name = args[1];
        var x = args[2];
        var y = args[3];
        var parentWnd = args[4];
        var scale = 1;
        var w = 270;
        var h = 150;
        if (args[5]) {
            scale = args[5];
            w = w * scale;
            h = h * scale;
        }
        this.rootWnd = null;
        var bgImg = "ty_uiDi03";
        this.mElemList = {};
        var itemBoxName = this.name;
        var mElemInfo = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = itemBoxName, _a["x"] = x, _a["y"] = y, _a["w"] = w, _a["h"] = h, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = null, _a),
            (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = this.name + "_bg", _b["parent"] = itemBoxName, _b["title"] = "", _b["font"] = "ht_20_cc", _b["image"] = bgImg, _b["color"] = gui.Color.white, _b["x"] = 0, _b["y"] = 0, _b["w"] = w, _b["h"] = h, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onClickBox, _b),
            (_c = {}, _c["index_type"] = gui.RichDisplayer, _c["name"] = this.name + "_rd_name", _c["parent"] = itemBoxName, _c["titile"] = "", _c["font"] = "ht_20_cc", _c["image"] = "", _c["color"] = gui.Color.white, _c["x"] = 0, _c["y"] = 5, _c["w"] = w, _c["h"] = 20, _c["messageFlag"] = true, _c),
            (_d = {}, _d["index_type"] = gui.Grid9Image, _d["name"] = this.name + "_line", _d["parent"] = itemBoxName, _d["title"] = "", _d["font"] = "ht_20_cc", _d["image"] = "cz_uiLine01", _d["color"] = gui.Color.white, _d["x"] = 14, _d["y"] = 30, _d["w"] = 232, _d["h"] = 16, _d["messageFlag"] = true, _d),
            (_e = {}, _e["index_type"] = eui.Group, _e["name"] = this.name + "_item", _e["parent"] = itemBoxName, _e["title"] = "", _e["font"] = "ht_20__cc", _e["color"] = gui.Color.white, _e["x"] = 20, _e["y"] = 53, _e["w"] = 80, _e["h"] = 80, _e["messageFlag"] = true, _e),
            (_f = {}, _f["index_type"] = gui.RichDisplayer, _f["name"] = this.name + "_rd_cost", _f["parent"] = itemBoxName, _f["titile"] = "", _f["font"] = "ht_20_cc", _f["image"] = "", _f["color"] = gui.Color.white, _f["x"] = 122, _f["y"] = 63, _f["w"] = 118, _f["h"] = 20, _f["messageFlag"] = true, _f),
            (_g = {}, _g["index_type"] = gui.RichDisplayer, _g["name"] = this.name + "_rd_limit", _g["parent"] = itemBoxName, _g["title"] = "", _g["font"] = "ht_18_cc_stroke", _g["image"] = "", _g["color"] = gui.Color.white, _g["x"] = 122, _g["y"] = 93, _g["w"] = 200, _g["h"] = 20, _g["messageFlag"] = true, _g),
        ];
        UiUtil.createElem(mElemInfo, this.mParentNode, this.mElemList, this, parentWnd);
        this.mElemList[this.name + "_itemBox"] = UIItemBox.newObj(this.mParentNode, this.name + "_itemBox", 0, 0, this.mElemList[this.name + "_item"]);
        this.rootWnd = this.mElemList[itemBoxName];
        this.mElemList[this.name + "_rd_name"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList[this.name + "_rd_cost"].setAlignFlag(gui.Flag.LEFT_CENTER);
        this.mElemList[this.name + "_rd_limit"].setAlignFlag(gui.Flag.LEFT_CENTER);
        //逻辑数据
        this.bEnable = true;
        this.logicItem = null;
        this.enableIcon = true;
        this.needCount = null;
        this.frameList = null;
        this.isShowFrontFrame = false;
        var _a, _b, _c, _d, _e, _f, _g;
    };
    UIShopBox.prototype.destory = function () {
    };
    UIShopBox.prototype.setVisible = function (b) {
        this.rootWnd.visible = (b);
    };
    UIShopBox.prototype.setXY = function (x, y) {
        this.rootWnd.x = x;
        this.rootWnd.y = y;
    };
    UIShopBox.prototype.createElem = function (mElemInfo, mElemList, obj, parent) {
        UiUtil.createElem(mElemInfo, this.mParentNode, mElemList, obj, parent || this.rootWnd);
    };
    UIShopBox.prototype.updateByEntry = function (shopEntry, index) {
        this.shopEntry = shopEntry;
        this.index = index;
        var tempConfig = GameConfig.ShopCommodityConfig[shopEntry][index];
        var id = tempConfig.itemEntry;
        var quality = tempConfig.quality;
        var count = tempConfig.buyNumber;
        var name = GameConfig.itemConfig[id].name;
        //名字
        AddRdContent(this.mElemList[this.name + "_rd_name"], name, "ht_20_cc", "black");
        this.mElemList[this.name + "_itemBox"].updateByEntry(id, count, quality);
        //消耗物品
        var costStr = ShopSystem.getInstance().getShopCostStr(shopEntry, index);
        AddRdContent(this.mElemList[this.name + "_rd_cost"], costStr, "ht_20_cc", "black");
        //解锁条件
        var jieSuoStr = ShopSystem.getInstance().getShopJudgeStr(shopEntry, index);
        AddRdContent(this.mElemList[this.name + "_rd_limit"], jieSuoStr, "ht_18_cc", "black");
    };
    //点击事件
    UIShopBox.prototype.onClickBox = function (args) {
        var wnd = WngMrg.getInstance().getWindow("ShopItemBuyFrame");
        wnd.onShowWnd(this.shopEntry, this.index);
    };
    return UIShopBox;
}(TClass));
__reflect(UIShopBox.prototype, "UIShopBox");
//# sourceMappingURL=UIShopBox.js.map