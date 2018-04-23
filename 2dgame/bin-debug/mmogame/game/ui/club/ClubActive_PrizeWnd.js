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
var ClubActive_PrizeWnd = (function (_super) {
    __extends(ClubActive_PrizeWnd, _super);
    function ClubActive_PrizeWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClubActive_PrizeWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    ClubActive_PrizeWnd.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var group = this.mElemList["prize_wnd"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "prize_scroll", 10, 5, group.width - 20, group.height - 10, group);
    };
    ClubActive_PrizeWnd.prototype.onUnLoad = function () {
    };
    ClubActive_PrizeWnd.prototype.onShow = function () {
        this.mElemList["prize_wnd"].visible = true;
        this.refreshFrame();
    };
    ClubActive_PrizeWnd.prototype.onHide = function () {
        this.mElemList["prize_wnd"].visible = false;
    };
    ClubActive_PrizeWnd.prototype.refreshFrame = function () {
        var prizeCfgList = [];
        var prizeConfig = GameConfig.FactionActiveDailyiPrizeConfig;
        for (var k in prizeConfig) {
            var config = prizeConfig[k];
            prizeCfgList.push(config);
        }
        prizeCfgList.sort(function (a, b) {
            return a.dailyExp - b.dailyExp;
        });
        this.scroll.clearItemList();
        this.list = prizeCfgList;
        var group = this.mElemList["prize_wnd"];
        for (var i = 0; i < size_t(prizeCfgList); i++) {
            var v = prizeCfgList[i];
            var window_1 = this.scroll.getItemWindow(i, group.width - 20, 130, 0, 0, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v);
        }
    };
    ClubActive_PrizeWnd.prototype.initItemWindow = function (window) {
        var name = window.name;
        var w = window.width;
        var h = window.height;
        var Info = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = name + "_bg", _a["image"] = "ty_uiDi03", _a["x"] = 0, _a["y"] = 0, _a["w"] = w, _a["h"] = h, _a),
            (_b = {}, _b["index_type"] = gui.RichDisplayer, _b["name"] = name + "_rd", _b["x"] = 10, _b["y"] = 10, _b["w"] = 400, _b["h"] = 30, _b),
            (_c = {}, _c["index_type"] = gui.Grid9Image, _c["name"] = name + "_lq_icon", _c["image"] = "bh_text02", _c["x"] = 400, _c["y"] = 45, _c["w"] = 120, _c["h"] = 39, _c),
            (_d = {}, _d["index_type"] = eui.Label, _d["name"] = name + "_wdc_lb", _d["title"] = Localize_cns("CLUB_TXT51"), _d["font"] = "ht_30_cc", _d["color"] = gui.Color.saddlebrown, _d["x"] = 390, _d["y"] = 50, _d["w"] = 120, _d["h"] = 30, _d),
            (_e = {}, _e["index_type"] = gui.Button, _e["name"] = name + "_lq_btn", _e["title"] = Localize_cns("CLUB_TXT50"), _e["font"] = "ht_24_cc_stroke", _e["image"] = "ty_tongYongBt1", _e["color"] = gui.Color.white, _e["x"] = 380, _e["y"] = 40, _e["w"] = 147, _e["h"] = 55, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = null, _e),
        ];
        UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window);
        for (var i = 0; i < 4; i++) {
            this.mElemList[name + "itemBox" + i] = UIItemBox.newObj(this.mElemList, name + "itemBox" + i, 10 + 86 * i, 45, window);
        }
        this.mElemList[name + "_lq_icon"].visible = false;
        this.mElemList[name + "_wdc_lb"].visible = false;
        this.mElemList[name + "_lq_btn"].visible = false;
        var _a, _b, _c, _d, _e;
    };
    ClubActive_PrizeWnd.prototype.refreshItemWindow = function (window, config) {
        var name = window.name;
        for (var i = 0; i < 4; i++) {
            var itemBox = this.mElemList[name + "itemBox" + i];
            if (config.prize[i]) {
                var prize = AnalyPrizeFormat(config.prize)[i];
                itemBox.setVisible(true);
                itemBox.updateByEntry(prize[0], prize[1]);
            }
            else {
                itemBox.setVisible(false);
            }
        }
        var dailyExp = getSaveRecord(opSaveRecordKey.facDailyActiveExp) || 0; //每日活跃经验
        var prizeRecord = getSaveRecord(opSaveRecordKey.facDailyActivePrize) || {};
        if (dailyExp < config.dailyExp) {
            this.mElemList[name + "_lq_icon"].visible = false;
            this.mElemList[name + "_wdc_lb"].visible = true;
            this.mElemList[name + "_lq_btn"].visible = false;
        }
        else if (prizeRecord[config.ID] == null) {
            this.mElemList[name + "_lq_icon"].visible = false;
            this.mElemList[name + "_wdc_lb"].visible = false;
            this.mElemList[name + "_lq_btn"].visible = true;
        }
        else {
            this.mElemList[name + "_lq_icon"].visible = true;
            this.mElemList[name + "_wdc_lb"].visible = false;
            this.mElemList[name + "_lq_btn"].visible = false;
        }
        var str = String.format(Localize_cns("CLUB_TXT68"), config.dailyExp, dailyExp, config.dailyExp);
        AddRdContent(this.mElemList[name + "_rd"], str, "ht_24_cc", "ublack");
    };
    return ClubActive_PrizeWnd;
}(BaseCtrlWnd));
__reflect(ClubActive_PrizeWnd.prototype, "ClubActive_PrizeWnd");
//# sourceMappingURL=ClubActive_PrizeWnd.js.map