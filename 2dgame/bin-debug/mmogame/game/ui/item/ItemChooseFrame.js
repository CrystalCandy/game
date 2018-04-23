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
var ItemChooseFrame = (function (_super) {
    __extends(ItemChooseFrame, _super);
    function ItemChooseFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemChooseFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/ItemBatchUseLayout.exml"];
        this.maxNum = 100;
        this.curNum = 1;
        this.longSchedule = null;
        this.selectName = null;
        this.obj = null;
    };
    ItemChooseFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "leftBtn", _b["title"] = null, _b["event_name"] = gui.TouchEvent.TOUCH_SHORT, _b["fun_index"] = this.onClickChangeBtn, _b),
            (_c = {}, _c["name"] = "rightBtn", _c["title"] = null, _c["event_name"] = gui.TouchEvent.TOUCH_SHORT, _c["fun_index"] = this.onClickChangeBtn, _c),
            (_d = {}, _d["name"] = "useBtn", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onClickUseItem, _d),
            (_e = {}, _e["name"] = "choose_slider", _e["title"] = null, _e["event_name"] = egret.Event.CHANGE, _e["fun_index"] = this.onSliderChange, _e),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["itemBox"] = UIItemBox.newObj(this.mLayoutNode, "itemBox", 0, 0, this.mElemList["group_item"]);
        this.mElemList["itemBox"].setCountVisible(false);
        this.mElemList["dec_rd"].setAlignFlag(gui.Flag.RIGHT);
        var _a, _b, _c, _d, _e;
    };
    ItemChooseFrame.prototype.onUnLoad = function () {
    };
    ItemChooseFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.curNum = 1;
        this.refreshFrame();
        this.refreshSlider();
    };
    ItemChooseFrame.prototype.onHide = function () {
    };
    ItemChooseFrame.prototype.refreshFrame = function () {
        if (!this.itemInfo) {
            this.hideWnd();
            return;
        }
        this.mElemList["storeCount"].text = (this.useTitle);
        this.maxNum = checkNull(this.itemInfo.getProperty("count"), 1);
        this.mElemList["useCount"].text = ("x" + this.curNum);
        this.mElemList["itemBox"].updateByItem(this.itemInfo);
    };
    ItemChooseFrame.prototype.onClickChangeBtn = function (args) {
        var name = args.target.name;
        var dirty = false;
        if (name == "leftBtn") {
            if (this.curNum - 1 > 0) {
                this.curNum = this.curNum - 1;
                dirty = true;
            }
        }
        else if (name == "rightBtn") {
            if (this.curNum + 1 <= this.maxNum) {
                this.curNum = this.curNum + 1;
                dirty = true;
            }
        }
        if (dirty) {
            this.refreshFrame();
            this.refreshSlider();
        }
    };
    ItemChooseFrame.prototype.onSliderChange = function (args) {
        var slilder = args.target;
        this.curNum = Math.ceil(slilder.pendingValue);
        //引擎有误差,percent为0时，absolute不为0
        if (this.curNum == 0 || args.percent == 0) {
            this.curNum = 1;
        }
        //TLog.Debug("DealItemFrame.onSliderChange",args.percent, args.absolute,	this.curNum, this.maxNum)
        //强制调整slider
        if (this.maxNum == 1) {
            this.refreshSlider();
        }
        this.refreshFrame();
    };
    ItemChooseFrame.prototype.refreshSlider = function () {
        var maxNum = this.maxNum;
        var curNum = this.curNum;
        if (maxNum < 1) {
            maxNum = 1;
        }
        if (curNum < 1) {
            curNum = 1;
        }
        var slider = this.mElemList["choose_slider"];
        slider.maximum = maxNum;
        slider.minimum = 1;
        slider.value = curNum;
        slider.snapInterval = 1; ///通过 snapInterval 属性设置增加的有效值。
        //this.mElemList["choose_slider"].enabled = (this.maxNum > 1)
        //this.mElemList["leftBtn"].enabled = (this.maxNum > 1)
        //this.mElemList["rightBtn"].enabled = (this.maxNum > 1)
    };
    ItemChooseFrame.prototype.onClickUseItem = function (args) {
        if (this.clickCallback) {
            if (this.clickCallback(this.obj, this.itemInfo, this.curNum, this.userData)) {
                this.hideWnd();
            }
        }
    };
    /////////////////////////////////////////////////////
    ItemChooseFrame.prototype.showWithItemInfo = function (item, tips, callback, obj, userData) {
        TLog.Assert(item != null);
        this.itemInfo = item;
        this.clickCallback = callback;
        this.obj = obj;
        this.userData = userData;
        this.useTitle = tips;
        this.showWnd();
    };
    return ItemChooseFrame;
}(BaseWnd));
__reflect(ItemChooseFrame.prototype, "ItemChooseFrame");
//# sourceMappingURL=ItemChooseFrame.js.map