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
    liuziming
    
创建时间：
   2017.09.08(周五)

意图：
   特殊物品奖励弹窗
公共接口：
   
*/
var PrizeRareShowFrame = (function (_super) {
    __extends(PrizeRareShowFrame, _super);
    function PrizeRareShowFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PrizeRareShowFrame.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.controlDataTable = {};
        this.contrlList = {};
        this.timerList = {};
        this.itemList = [];
    };
    PrizeRareShowFrame.prototype.onLoad = function () {
        this.createFrame();
    };
    PrizeRareShowFrame.prototype.onUnLoad = function () {
        for (var _ in this.contrlList) {
            var v = this.contrlList[_];
            v.deleteObj();
        }
        this.contrlList = {};
        this.controlDataTable = {};
    };
    PrizeRareShowFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = (true);
        this.refreshFrame();
    };
    PrizeRareShowFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = (false);
        for (var _ in this.timerList) {
            var timer = this.timerList[_];
            KillTimer(timer);
        }
        this.timerList = {};
    };
    ////////////////////////////////////////////////////////////////////-
    PrizeRareShowFrame.prototype.createFrame = function () {
        this.mElemList = {};
        var width = 420;
        var height = 480;
        this.mLayoutNode.width = width;
        this.mLayoutNode.height = height;
        this.mLayoutNode.x = 0;
        this.mLayoutNode.y = 0;
        this.mLayoutNode.verticalCenter = 0;
        this.mLayoutNode.horizontalCenter = 0;
        var mElemInfo1 = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = "_bg", _a["image"] = "ty_UIDi01", _a["percentWidth"] = 100, _a["percentHeight"] = 100, _a),
            (_b = {}, _b["index_type"] = gui.Button, _b["name"] = "return", _b["image"] = "ty_bt_back04", _b["bottom"] = 0, _b["right"] = 0, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onReturn, _b),
        ];
        UiUtil.createElem(mElemInfo1, this.mLayoutNode, this.mElemList, this);
        var mElemInfo = [
            (_c = {}, _c["index_type"] = gui.RichDisplayer, _c["name"] = "rd", _c["x"] = 35, _c["y"] = 20, _c["w"] = 355, _c["h"] = 80, _c["event_name"] = null, _c["fun_index"] = null, _c),
            (_d = {}, _d["index_type"] = eui.Group, _d["name"] = "bg", _d["x"] = 35, _d["y"] = 90, _d["w"] = 0, _d["h"] = 0, _d),
            (_e = {}, _e["index_type"] = eui.Image, _e["name"] = "ibg", _e["parent"] = "bg", _e["image"] = "ty_ztJiangLiDi01", _e["color"] = gui.Color.white, _e["x"] = 0, _e["y"] = 0, _e["w"] = 0, _e["h"] = 0, _e),
            (_f = {}, _f["index_type"] = eui.Label, _f["name"] = "title", _f["title"] = Localize_cns("YOU_GET"), _f["font"] = "ht_24_cc_stroke_saddlebrown", _f["color"] = gui.Color.white, _f["x"] = 35, _f["y"] = 110, _f["w"] = 354, _f["h"] = 30, _f["messageFlag"] = true, _f),
            (_g = {}, _g["index_type"] = eui.Label, _g["name"] = "itemName", _g["parent"] = "bg", _g["title"] = Localize_cns("YOU_GET"), _g["font"] = "ht_24_cc", _g["color"] = gui.Color.white, _g["x"] = 100, _g["y"] = 188, _g["w"] = 160, _g["h"] = 30, _g["messageFlag"] = true, _g),
            (_h = {}, _h["index_type"] = gui.Button, _h["name"] = "confirm", _h["title"] = Localize_cns("TEMP_TXT2"), _h["font"] = "ht_24_cc_stroke_saddlebrown", _h["image"] = "ty_tongYongBt01", _h["color"] = gui.Color.white, _h["left"] = 135, _h["bottom"] = 20, _h["event_name"] = egret.TouchEvent.TOUCH_TAP, _h["fun_index"] = this.onClickConfirm, _h),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        //ui_util.CreateDrawRectPtr(this.mElemList["rd"], gui.Color32Half.green)
        this.mElemList["rd"].setAlignFlag(gui.Flag.H_CENTER);
        AddRdContent(this.mElemList["rd"], Localize_cns("TEMP_TXT1"), "ht_24_cc", "black", 5);
        this.mElemList["itemBox"] = UIItemBox.newObj(this.mLayoutNode, "itemBox", 130, 65, this.mElemList["bg"]);
        //this.mElemList["itemBox"]:updateByEntry(30004, 40)
        //this.mElemListOne["itemBox"]:setItemHintEnable(false)
        this.mElemList["oneEffectView"] = UIActorView.newObj(this.mLayoutNode, "oneEffectView", 210, 150, this.mLayoutNode);
        var _a, _b, _c, _d, _e, _f, _g, _h;
    };
    PrizeRareShowFrame.prototype.refreshFrame = function () {
        if (size_t(this.itemList) == 0) {
            return;
        }
        //单抽物品
        var info = this.itemList[0];
        var logicItem = null;
        var uid = info[3];
        if (uid) {
            logicItem = ItemSystem.getInstance().getItemLogicInfoByID(uid);
        }
        if (logicItem) {
            this.mElemList["itemBox"].updateByItem(logicItem);
        }
        else {
            this.mElemList["itemBox"].updateByEntry(info[0], info[1]);
        }
        this.mElemList["itemName"].text = (ItemSystem.getInstance().getItemName(info[0]));
        this.controlDataTable["confirm"] = SpecailItemId.LUCKYSTONE;
    };
    ////////////////////////////////////////////////////////////-响应函数//////////////////////////////////////////////////////////////////////
    PrizeRareShowFrame.prototype.onReturn = function (args) {
        return this.hideWnd();
    };
    PrizeRareShowFrame.prototype.onClickConfirm = function (args) {
        var name = args.target.name;
        if (!this.controlDataTable[name]) {
            return;
        }
        var entryId = this.controlDataTable[name];
        ExecuteMainFrameFunction("zhiye");
        this.hideWnd();
    };
    //////////////////////////////////////////-公共接口////////////////-
    PrizeRareShowFrame.prototype.showWithItemList = function (itemList) {
        //{entryId, count, type}
        this.itemList = itemList;
        if (size_t(this.itemList) > 10) {
            return;
        }
        this.showWnd();
    };
    return PrizeRareShowFrame;
}(BaseWnd));
__reflect(PrizeRareShowFrame.prototype, "PrizeRareShowFrame");
//# sourceMappingURL=PrizeRareShowFrame.js.map