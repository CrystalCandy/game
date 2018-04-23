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
var InterceptRecordFrame = (function (_super) {
    __extends(InterceptRecordFrame, _super);
    function InterceptRecordFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InterceptRecordFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/xiyouhusong/InterceptRecordLayout.exml"];
    };
    InterceptRecordFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.mLayoutNode.width = 505;
        this.mLayoutNode.height = 664;
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_back", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["group_scroll"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group, UIScrollList.DIR_VERTICAL);
        var _a, _b;
    };
    InterceptRecordFrame.prototype.onUnLoad = function () {
    };
    InterceptRecordFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.onRefresh();
        RpcProxy.call("C2G_RobberEscortRecordList");
    };
    InterceptRecordFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    InterceptRecordFrame.prototype.updateWnd = function () {
        this.onRefresh();
    };
    InterceptRecordFrame.prototype.onRefresh = function () {
        var interceptlist = GetActivity(ActivityDefine.HuSong).getRobberRecordList();
        if (size_t(interceptlist) == 0) {
            return;
        }
        var scroll = this.scroll;
        scroll.clearItemList();
        for (var k = 0; k < size_t(interceptlist); k++) {
            var v = interceptlist[k];
            var window_1 = scroll.getItemWindow(k, 380, 60, 0, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v);
        }
        scroll.refreshScroll(true, true);
    };
    InterceptRecordFrame.prototype.initItemWindow = function (window) {
        var name = window.name;
        var mElemInfo = [
            (_a = {}, _a["index_type"] = eui.Label, _a["name"] = name + "_time", _a["title"] = "", _a["image"] = "", _a["font"] = "ht_16_lc", _a["x"] = 0, _a["y"] = 0, _a["w"] = 308, _a["h"] = 16, _a),
            (_b = {}, _b["index_type"] = gui.RichDisplayer, _b["name"] = name + "_des", _b["title"] = "", _b["image"] = "", _b["font"] = "ht_16_lc", _b["x"] = 0, _b["y"] = 25, _b["w"] = 308, _b["h"] = 16, _b),
            (_c = {}, _c["index_type"] = gui.RichDisplayer, _c["name"] = name + "_state", _c["title"] = "", _c["image"] = "", _c["font"] = "ht_16_lc", _c["x"] = 320, _c["y"] = 20, _c["w"] = 60, _c["h"] = 16, _c),
            (_d = {}, _d["index_type"] = eui.Rect, _d["name"] = name + "_rect", _d["parent"] = name + "_state", _d["color"] = gui.Color.green, _d["alpha"] = 0.5, _d["x"] = 0, _d["y"] = 16, _d["percentWidth"] = 100, _d["percentHeight"] = 20, _d),
            (_e = {}, _e["index_type"] = gui.Grid9Image, _e["name"] = name + "_line", _e["title"] = "", _e["autoScale"] = true, _e["image"] = "cz_uiLine01", _e["font"] = "", _e["x"] = 0, _e["y"] = 40, _e["w"] = 380, _e["h"] = 16, _e),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window);
        this.mElemList[name + "_des"].setAlignFlag(gui.Flag.LEFT_CENTER);
        this.mElemList[name + "_state"].setAlignFlag(gui.Flag.LEFT_BOTTOM);
        var _a, _b, _c, _d, _e;
    };
    InterceptRecordFrame.prototype.refreshItemWindow = function (window, config) {
        //config   --- id, name, time, windFlag, index , revegeFlag
        var name = window.name;
        var index = config.index || 1;
        var date = GetOSDate(config.time);
        this.mElemList[name + "_time"].text = String.format("%d-%d-%d  %d:%d:%d", date.year, date.month, date.day, date.hour, date.min, date.sec);
        var desColorList = ["#white", "#green", "#blue", "#purple", "#orange"];
        var cheColor = desColorList[index - 1];
        var desStr = "#green" + config.name + Localize_cns("ESCORT_RECORD_TXT4") + cheColor + GameConfig.EscortConfig[index].tips;
        var stateStr = "";
        var stateColor = "#green";
        var fillColor = gui.Color.green;
        this.mElemList[name + "_rect"].visible = true;
        if (config.id == GetHeroProperty("id")) {
            var state = config.winFlag;
            desStr = String.format(Localize_cns("ESCORT_RECORD_TXT5"), "#green" + config.name) + cheColor + GameConfig.EscortConfig[index].tips;
            stateStr = Localize_cns("ESCORT_RECORD_TXT6"); //成功
            if (state == 1) {
                stateStr = Localize_cns("ESCORT_RECORD_TXT3"); //失败
                stateColor = "#red";
            }
            this.mElemList[name + "_rect"].visible = false;
        }
        else {
            var state = config.revengeFlag;
            stateStr = Localize_cns("ESCORT_RECORD_TXT1"); //"复仇"
            if (state == 1) {
                stateStr = Localize_cns("ESCORT_RECORD_TXT2"); //"已复仇"
                stateColor = "#red";
                fillColor = gui.Color.red;
            }
            else if (state == 2) {
                stateStr = stateStr = Localize_cns("ESCORT_RECORD_TXT4"); // "复仇成功"
            }
            this.mElemList[name + "_state"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStateClick, this);
        }
        AddRdContent(this.mElemList[name + "_des"], desStr, "ht_16_lc", "black");
        // let t: eui.Rect
        //t.
        AddRdContent(this.mElemList[name + "_state"], stateColor + stateStr, "ht_16_lc", "black");
        this.mElemList[name + "_rect"].fillColor = fillColor;
        var rectlength = stateStr.length * 16 * 0.2;
        this.mElemList[name + "_rect"].width = rectlength;
    };
    ////响应事件
    InterceptRecordFrame.prototype.onStateClick = function (args) {
        var name = args.currentTarget.name;
        var index = name.replace(/[^0-9]/ig, "");
        if (this.mElemList["group" + index + "_rect"].visible == false)
            return;
        var list = GetActivity(ActivityDefine.HuSong).getRobberRecordList();
        var config = list[index];
        if (config.revengeFlag == 1) {
            MsgSystem.addTagTips(Localize_cns("ESCORT_RECORD_TXT2"));
            return;
        }
        var wnd = WngMrg.getInstance().getWindow("RevengeTipsFrame");
        wnd.onShowWnd(config);
    };
    return InterceptRecordFrame;
}(BaseWnd));
__reflect(InterceptRecordFrame.prototype, "InterceptRecordFrame");
//# sourceMappingURL=InterceptRecordFrame.js.map