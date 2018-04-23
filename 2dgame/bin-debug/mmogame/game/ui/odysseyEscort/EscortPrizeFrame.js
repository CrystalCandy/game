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
var EscortPrizeFrame = (function (_super) {
    __extends(EscortPrizeFrame, _super);
    function EscortPrizeFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EscortPrizeFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/xiyouhusong/EscortPrizeLayout.exml"];
    };
    EscortPrizeFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.mLayoutNode.width = 640;
        this.mLayoutNode.height = 600;
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_get", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onGetClick, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["group_scroll"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group, UIScrollList.DIR_VERTICAL);
        var _a;
    };
    EscortPrizeFrame.prototype.onUnLoad = function () {
    };
    EscortPrizeFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.onRefresh();
    };
    EscortPrizeFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    EscortPrizeFrame.prototype.onRefresh = function () {
        var actInfo = GetActivity(ActivityDefine.HuSong).getActInfo();
        var prizeInfo = GetActivity(ActivityDefine.HuSong).getHusongPrize();
        if (size_t(actInfo) == 0)
            return;
        var index = actInfo.index;
        var refConfig = GameConfig.EscortConfig[index];
        var colorList = [
            gui.Color.ublack, gui.Color.green, gui.Color.blue, gui.Color.purple, gui.Color.orange
        ];
        this.mElemList["label_mache"].textColor = colorList[index];
        this.mElemList["label_mache"].text = refConfig.tips;
        var prizeList = AnalyPrizeFormat(refConfig.prize);
        var prizeStr = "#green";
        for (var k in prizeList) {
            var prize = prizeList[k];
            var name_1 = GameConfig.itemConfig[prize[0]].name;
            prizeStr += name_1 + ":" + prize[1] + "#space";
            if (tonumber(k) == 1 || tonumber(k) == 3) {
                prizeStr += "#br";
            }
        }
        AddRdContent(this.mElemList["rd_des"], prizeStr, "ht_20_cc");
        var scroll = this.scroll;
        scroll.clearItemList();
        var list = prizeInfo.recordList;
        for (var k = 0; k < size_t(list); k++) {
            var config = list[k];
            var window_1 = scroll.getItemWindow(k, 470, 20, 0, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, config, index);
        }
        scroll.refreshScroll(true, true);
        scroll.restoreViewXY();
    };
    EscortPrizeFrame.prototype.initItemWindow = function (window) {
        var name = window.name;
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.RichDisplayer, _a["name"] = name + "_des", _a["title"] = "", _a["image"] = "", _a["font"] = "ht_20_cc", _a["x"] = 0, _a["y"] = 0, _a["w"] = 470, _a["h"] = 20, _a),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window);
        this.mElemList[name + "_des"].setAlignFlag(gui.Flag.LEFT_CENTER);
        var _a;
    };
    EscortPrizeFrame.prototype.refreshItemWindow = function (window, config, myIndex) {
        var name = window.name;
        var desColorList = ["#ublack", "#green", "#blue", "#purple", "#orange"];
        var cheColor = desColorList[myIndex];
        var desStr = "#green" + config.name + Localize_cns("ESCORT_RECORD_TXT4") + "#" + cheColor + GameConfig.EscortConfig[myIndex].tips;
    };
    ///-------------------响应事件btn_get
    EscortPrizeFrame.prototype.onGetClick = function () {
        RpcProxy.call("C2G_GetEscortPrize");
        RpcProxy.call("C2G_EnterEscortActivity");
        this.hideWnd();
    };
    return EscortPrizeFrame;
}(BaseWnd));
__reflect(EscortPrizeFrame.prototype, "EscortPrizeFrame");
//# sourceMappingURL=EscortPrizeFrame.js.map