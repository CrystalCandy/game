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
var DailyPrizeTipsFrame = (function (_super) {
    __extends(DailyPrizeTipsFrame, _super);
    function DailyPrizeTipsFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DailyPrizeTipsFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/DailyPrizeTipsLayout.exml"];
    };
    DailyPrizeTipsFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.mLayoutNode.width = 640;
        this.mLayoutNode.height = 500;
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a, _b;
    };
    DailyPrizeTipsFrame.prototype.onUnLoad = function () {
    };
    DailyPrizeTipsFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.onRefresh();
    };
    DailyPrizeTipsFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    DailyPrizeTipsFrame.prototype.onRefresh = function () {
        var level = GetHeroProperty("level");
        var tempConfig = GetActivity(ActivityDefine.Boss).getSanBaiConfigByLevel(level);
        if (tempConfig == null)
            return;
        var config = tempConfig[this.index];
        if (config == null)
            return;
        var prizeList = AnalyPrizeFormat(config.prize);
        for (var k in prizeList) {
            var prize = prizeList[k];
            if (this.mElemList["prize_" + k] == null) {
                this.mElemList["prize_" + k] = UIItemBox.newObj(this.mLayoutNode, "prize_" + k, 0, 0, this.mElemList["group_prize"]);
            }
            this.mElemList["prize_" + k].updateByEntry(prize[0], prize[1]);
        }
    };
    DailyPrizeTipsFrame.prototype.onShowWnd = function (index) {
        this.index = index;
        this.showWnd();
    };
    return DailyPrizeTipsFrame;
}(BaseWnd));
__reflect(DailyPrizeTipsFrame.prototype, "DailyPrizeTipsFrame");
//# sourceMappingURL=DailyPrizeTipsFrame.js.map