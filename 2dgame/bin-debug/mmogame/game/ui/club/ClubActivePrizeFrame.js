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
var ClubActivePrizeFrame = (function (_super) {
    __extends(ClubActivePrizeFrame, _super);
    function ClubActivePrizeFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClubActivePrizeFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/club/ClubActivePrizeLayout.exml"];
    };
    ClubActivePrizeFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["scroll_wnd"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 10, 10, group.width - 20, group.height - 20, group);
        var _a, _b;
    };
    ClubActivePrizeFrame.prototype.onUnLoad = function () {
    };
    ClubActivePrizeFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.refreshFrame();
    };
    ClubActivePrizeFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
    };
    ClubActivePrizeFrame.prototype.refreshFrame = function () {
        var activeData = ClubSystem.getInstance().getClubActiveInfo();
        if (activeData == null)
            return;
        var curActiveLevel = activeData.level;
        var limit = 20;
        var prizeConfig = GameConfig.FactionActiveLevelConfig;
        var list = [];
        for (var i in prizeConfig) {
            var index = tonumber(prizeConfig[i].ID);
            if (index >= curActiveLevel - limit && index <= curActiveLevel + limit) {
                table_insert(list, prizeConfig[i]);
            }
        }
        this.scroll.clearItemList();
        this.list = list;
        var group = this.mElemList["scroll_wnd"];
        for (var i = 0; i < size_t(list); i++) {
            var v = list[i];
            var window_1 = this.scroll.getItemWindow(i, group.width - 20, 105, 0, 0, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v);
        }
    };
    ClubActivePrizeFrame.prototype.initItemWindow = function (window) {
        var name = window.name;
        var w = window.width;
        var h = window.height;
        var Info = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = name + "_bg", _a["image"] = "ty_uiDi03", _a["x"] = 0, _a["y"] = 0, _a["w"] = w, _a["h"] = h, _a),
            (_b = {}, _b["index_type"] = eui.Label, _b["name"] = name + "_lv", _b["title"] = "", _b["font"] = "ht_24_lc", _b["color"] = gui.Color.ublack, _b["x"] = 20, _b["y"] = 36, _b["w"] = 100, _b["h"] = 30, _b),
            (_c = {}, _c["index_type"] = gui.Grid9Image, _c["name"] = name + "_get_icon", _c["image"] = "bh_text02", _c["x"] = 380, _c["y"] = 30, _c["w"] = 120, _c["h"] = 39, _c),
            (_d = {}, _d["index_type"] = eui.Label, _d["name"] = name + "_get_txt", _d["title"] = Localize_cns("CLUB_TXT51"), _d["font"] = "ht_24_cc", _d["color"] = gui.Color.saddlebrown, _d["x"] = 380, _d["y"] = 35, _d["w"] = 120, _d["h"] = 30, _d),
        ];
        UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window);
        this.mElemList[name + "_get_icon"].visible = false;
        this.mElemList[name + "_get_txt"].visible = false;
        for (var i = 0; i < 3; i++) {
            this.mElemList[name + "_itemBox_" + i] = UIItemBox.newObj(this.mLayoutNode, name + "_itemBox_" + i, 130 + i * 86, 12, window);
            this.mElemList[name + "_itemBox_" + i].setVisible(false);
        }
        var _a, _b, _c, _d;
    };
    ClubActivePrizeFrame.prototype.refreshItemWindow = function (window, data) {
        var name = window.name;
        this.mElemList[name + "_lv"].text = String.format(Localize_cns("CLUB_TXT96"), data.ID);
        var prizeList = AnalyPrizeFormat(data.prize);
        for (var i = 0; i < 3; i++) {
            this.mElemList[name + "_itemBox_" + i].setVisible(false);
            if (prizeList[i]) {
                this.mElemList[name + "_itemBox_" + i].updateByEntry(prizeList[i][0], prizeList[i][1]);
                this.mElemList[name + "_itemBox_" + i].setVisible(true);
            }
        }
        //领取记录
        var activeData = ClubSystem.getInstance().getClubActiveInfo() || {};
        var activeLv = activeData.level;
        if (data.ID > activeLv) {
            this.mElemList[name + "_get_icon"].visible = false;
            this.mElemList[name + "_get_txt"].visible = true;
        }
        else {
            this.mElemList[name + "_get_icon"].visible = true;
            this.mElemList[name + "_get_txt"].visible = false;
        }
    };
    return ClubActivePrizeFrame;
}(BaseWnd));
__reflect(ClubActivePrizeFrame.prototype, "ClubActivePrizeFrame");
//# sourceMappingURL=ClubActivePrizeFrame.js.map