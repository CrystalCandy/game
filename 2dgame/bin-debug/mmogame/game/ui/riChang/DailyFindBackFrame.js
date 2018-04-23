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
var DailyFindBackFrame = (function (_super) {
    __extends(DailyFindBackFrame, _super);
    function DailyFindBackFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DailyFindBackFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/DailyFindBackLayout.exml"];
    };
    DailyFindBackFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.mLayoutNode.width = 580;
        this.mLayoutNode.height = 800;
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_oneKey", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onFindClick, _c),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["group_container"];
        this.scorll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group);
        var _a, _b, _c;
    };
    DailyFindBackFrame.prototype.onUnLoad = function () {
    };
    DailyFindBackFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.onRefresh();
        RpcProxy.call("C2G_XiyouLilian_RecordInfo");
    };
    DailyFindBackFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    DailyFindBackFrame.prototype.updateWnd = function () {
        this.onRefresh();
    };
    DailyFindBackFrame.prototype.onRefresh = function () {
        var actInfo = GetActivity(ActivityDefine.Boss).getFindBackInfo();
        if (size_t(actInfo) == 0)
            return;
        var scorll = this.scorll;
        scorll.clearItemList();
        for (var k = 1; k <= size_t(actInfo); k++) {
            var findInfo = actInfo[k - 1];
            var window_1 = scorll.getItemWindow(k, 454, 58, 0, 0);
            this.initWindow(window_1);
            this.refreshWindow(window_1, findInfo);
        }
        scorll.refreshScroll(true, true);
        scorll.restoreViewXY();
    };
    DailyFindBackFrame.prototype.initWindow = function (window) {
        var name = window.name;
        var elemInfo = [
            (_a = {}, _a["index_type"] = eui.Label, _a["name"] = "name_" + name, _a["parent"] = name, _a["title"] = "", _a["font"] = "ht_20_lc", _a["image"] = "", _a["color"] = gui.Color.ublack, _a["x"] = 0, _a["y"] = 19, _a["w"] = 120, _a["h"] = 20, _a["messageFlag"] = true, _a),
            (_b = {}, _b["index_type"] = eui.Label, _b["name"] = "num_" + name, _b["parent"] = name, _b["title"] = "", _b["font"] = "ht_20_lc", _b["image"] = "", _b["color"] = gui.Color.green, _b["x"] = 120, _b["y"] = 19, _b["w"] = 120, _b["h"] = 20, _b["messageFlag"] = true, _b),
            (_c = {}, _c["index_type"] = eui.Label, _c["name"] = "twice_" + name, _c["parent"] = name, _c["title"] = "", _c["font"] = "ht_20_lc", _c["image"] = "", _c["color"] = gui.Color.blue, _c["x"] = 258, _c["y"] = 19, _c["w"] = 120, _c["h"] = 20, _c["messageFlag"] = true, _c),
            (_d = {}, _d["index_type"] = gui.Button, _d["name"] = "btn_" + name, _d["parent"] = name, _d["title"] = Localize_cns("DAILY_FIND"), _d["font"] = "ht_20_cc_stroke", _d["color"] = gui.Color.white, _d["image"] = "ty_tongYongBt2", _d["x"] = 360, _d["y"] = 0, _d["w"] = 94, _d["h"] = 49, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onFindClick, _d),
            (_e = {}, _e["index_type"] = gui.Grid9Image, _e["name"] = "image_" + name, _e["parent"] = name, _e["title"] = "", _e["font"] = "ht_20_cc", _e["image"] = "cz_uiLine01", _e["x"] = -1, _e["y"] = 46, _e["w"] = 470, _e["h"] = 16, _e["messageFlag"] = true, _e),
        ];
        UiUtil.createElem(elemInfo, this.mLayoutNode, this.mElemList, this, window);
        var _a, _b, _c, _d, _e;
    };
    DailyFindBackFrame.prototype.refreshWindow = function (window, config) {
        var name = window.name;
        this.mElemList["name_" + name].text = config.name;
        var numStr = String.format(Localize_cns("DAILY_FIND_NUM"), config.backNum);
        this.mElemList["num_" + name].text = numStr;
        var twiceStr = String.format(Localize_cns("DAILY_TWICE_NUM"), config.exp);
        this.mElemList["twice_" + name].text = twiceStr;
    };
    ///----------响应
    DailyFindBackFrame.prototype.onFindClick = function (args) {
        var name = args.target.name;
        var wnd = WngMrg.getInstance().getWindow("DailyFindBackTipsFrame");
        if (name == "btn_oneKey") {
            wnd.showWnd();
            return;
        }
        var index = name.replace(/[^0-9]/ig, "");
        wnd.onShowWnd(tonumber(index));
    };
    return DailyFindBackFrame;
}(BaseWnd));
__reflect(DailyFindBackFrame.prototype, "DailyFindBackFrame");
//# sourceMappingURL=DailyFindBackFrame.js.map