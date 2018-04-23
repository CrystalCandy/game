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
var ChampionRecordFrame = (function (_super) {
    __extends(ChampionRecordFrame, _super);
    function ChampionRecordFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChampionRecordFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/champion/ChampionRecordLayout.exml"];
    };
    ChampionRecordFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        //this.setFullScreen(true)
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["scroll_wnd"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group);
        var _a;
    };
    ChampionRecordFrame.prototype.onUnLoad = function () {
    };
    ChampionRecordFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.refreshFrame();
    };
    ChampionRecordFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    ChampionRecordFrame.prototype.refreshFrame = function () {
        var group = this.mElemList["scroll_wnd"];
        this.scroll.clearItemList();
        var list = [];
        for (var i = 0; i < size_t(list); i++) {
            var v = list[i];
            var window_1 = this.scroll.getItemWindow(i, group.width, 61, 0, 0, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v, i);
        }
        this.scroll.refreshScroll();
    };
    ChampionRecordFrame.prototype.initItemWindow = function (window) {
        var name = window.name;
        var w = window.width;
        var h = window.height;
        var elemInfo = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = "bg_" + name, _a["title"] = null, _a["image"] = "ty_uiDi03", _a["x"] = 0, _a["y"] = 0, _a["w"] = w, _a["h"] = h, _a),
            (_b = {}, _b["index_type"] = gui.RichDisplayer, _b["name"] = "result_rd_" + name, _b["title"] = null, _b["x"] = 10, _b["y"] = h / 2 - 18, _b["w"] = 110, _b["h"] = 36, _b),
            (_c = {}, _c["index_type"] = gui.RichDisplayer, _c["name"] = "name_rd_" + name, _c["title"] = null, _c["x"] = 130, _c["y"] = h / 2 - 10, _c["w"] = 200, _c["h"] = 24, _c),
            (_d = {}, _d["index_type"] = gui.RichDisplayer, _d["name"] = "time_rd_" + name, _d["title"] = null, _d["x"] = 290, _d["y"] = h / 2 - 10, _d["w"] = 240, _d["h"] = 24, _d),
        ];
        UiUtil.createElem(elemInfo, this.mLayoutNode, this.mElemList, this, window);
        this.mElemList["time_rd_" + name].setAlignFlag(gui.Flag.RIGHT);
        var _a, _b, _c, _d;
    };
    ChampionRecordFrame.prototype.refreshItemWindow = function (window, data, index) {
        var name = window.name;
        AddRdContent(this.mElemList["result_rd_" + name], "#WIN#lime45", "ht_24_cc", "ublack");
        var playerName = data.name;
        AddRdContent(this.mElemList["name_rd_" + name], Localize_cns("JJC_TXT11") + playerName, "ht_20_cc", "ublack");
        var time = data.time;
        AddRdContent(this.mElemList["time_rd_" + name], getFormatTime(time) + "#space_10" + getFormatTimeSec(time), "ht_20_cc", "ublack");
    };
    return ChampionRecordFrame;
}(BaseWnd));
__reflect(ChampionRecordFrame.prototype, "ChampionRecordFrame");
//# sourceMappingURL=ChampionRecordFrame.js.map