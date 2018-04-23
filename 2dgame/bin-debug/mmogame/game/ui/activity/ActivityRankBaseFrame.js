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
// TypeScript file
//排行界面的通用基类，主要实现genConfigList refreshItemWindow refreshHeroRank三个接口，如果有特殊调整，可以在子类先调用super.initItemWindow再创建子类适用的控件等
var ActivityRankBaseFrame = (function (_super) {
    __extends(ActivityRankBaseFrame, _super);
    function ActivityRankBaseFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActivityRankBaseFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/activity/ActivityRankBaseLayout.exml"];
    };
    ActivityRankBaseFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        var mElemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_back", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["scroll_group"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group);
        this.mElemList["reward_rd"].setAlignFlag(gui.Flag.H_CENTER);
        var _a, _b;
    };
    ActivityRankBaseFrame.prototype.onUnLoad = function () {
    };
    ActivityRankBaseFrame.prototype.onShow = function () {
        //RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (true);
        this.refreshFrame();
    };
    ActivityRankBaseFrame.prototype.onHide = function () {
        //UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (false);
    };
    ActivityRankBaseFrame.prototype.initItemWindow = function (window) {
        var name = window.name;
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = name + "_bg", _a["title"] = null, _a["font"] = null, _a["image"] = "ty_uiDi03", _a["autoScale"] = true, _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["w"] = window.width, _a["h"] = window.height, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = null, _a),
            (_b = {}, _b["index_type"] = eui.Label, _b["name"] = name + "_rank", _b["title"] = "", _b["font"] = "ht_22_cc", _b["color"] = gui.Color.black, _b["x"] = 0, _b["y"] = 15, _b["w"] = 80, _b["h"] = 25, _b["fun_index"] = null, _b["messageFlag"] = true, _b),
            (_c = {}, _c["index_type"] = eui.Label, _c["name"] = name + "_name", _c["title"] = Localize_cns("BOSS_TXT12"), _c["font"] = "ht_22_cc", _c["color"] = gui.Color.black, _c["x"] = 80, _c["y"] = 15, _c["w"] = 140, _c["h"] = 25, _c["fun_index"] = null, _c["messageFlag"] = true, _c),
            (_d = {}, _d["index_type"] = eui.Label, _d["name"] = name + "_force", _d["title"] = "", _d["font"] = "ht_22_cc", _d["color"] = gui.Color.orange, _d["x"] = 220, _d["y"] = 15, _d["w"] = 120, _d["h"] = 25, _d["fun_index"] = null, _d["messageFlag"] = true, _d),
            (_e = {}, _e["index_type"] = eui.Label, _e["name"] = name + "_star", _e["title"] = "", _e["font"] = "ht_22_cc", _e["color"] = gui.Color.saddlebrown, _e["x"] = 370, _e["y"] = 15, _e["w"] = 160, _e["h"] = 25, _e["fun_index"] = null, _e["messageFlag"] = true, _e),
            (_f = {}, _f["index_type"] = gui.RichDisplayer, _f["name"] = name + "reward_rd", _f["font"] = "ht_20_cc", _f["color"] = gui.Color.white, _f["x"] = 370, _f["y"] = 15, _f["w"] = 180, _f["h"] = 25, _f["fun_index"] = null, _f["messageFlag"] = true, _f),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window);
        this.mElemList[name + "reward_rd"].setAlignFlag(gui.Flag.H_CENTER);
        this.mElemList[name + "reward_rd"].visible = false;
        var _a, _b, _c, _d, _e, _f;
        //ui_util.CreateDrawRectPtr(this.mElemList[name +"_dec"], gui.Color32Half.green)
        //AddRdContent(this.mElemList[name + "_dec"], Localize_cns("CHAT_ERROE_JINYAN"), "ht_20_cc", "zongse")
    };
    ActivityRankBaseFrame.prototype.refreshItemWindow = function (window, config) {
        // let name = window.name
        // let [enable, des, str] = FastJumpSystem.getInstance().checkFastJump(config[0], config[1])
        // this.mElemList[name + "_option"].enabled = (enable)
        // AddRdContent(this.mElemList[name + "_dec"], des, "ht_24_cc", "zongse")
        // this.controlDataTable[name + "_option"] = config
        // this.mElemList[name + "_block"].visible = (!enable)
        // if (enable == false) {
        // 	this.controlDataTable[name + "_block"] = str
        // }
    };
    ActivityRankBaseFrame.prototype.refreshFrame = function () {
        var list = this.genConfigList(); //[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1 ,1 ]
        var group = this.mElemList["scroll_group"];
        var scroll = this.scroll;
        scroll.clearItemList();
        this.controlDataTable = {};
        var myConfig = null;
        var myRank = null;
        for (var k = 0; k < list.length; k++) {
            var v = list[k];
            var window_1 = scroll.getItemWindow(k, group.width - 3, 60, 3, 5, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v);
        }
        this.refreshHeroRank(myRank, myConfig);
    };
    /////////////////////////////////////////////////////////////////
    ActivityRankBaseFrame.prototype.genConfigList = function () {
        return [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    };
    ActivityRankBaseFrame.prototype.refreshHeroRank = function (myRank, myConfig) {
    };
    return ActivityRankBaseFrame;
}(BaseWnd));
__reflect(ActivityRankBaseFrame.prototype, "ActivityRankBaseFrame");
//# sourceMappingURL=ActivityRankBaseFrame.js.map