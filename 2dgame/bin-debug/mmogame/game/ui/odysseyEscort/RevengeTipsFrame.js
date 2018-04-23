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
var RevengeTipsFrame = (function (_super) {
    __extends(RevengeTipsFrame, _super);
    function RevengeTipsFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RevengeTipsFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/xiyouhusong/RevengeTipsLayout.exml"];
    };
    RevengeTipsFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.mLayoutNode.width = 640;
        this.mLayoutNode.height = 430;
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close_top", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_goto", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onGotoClick, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a, _b;
    };
    RevengeTipsFrame.prototype.onUnLoad = function () {
    };
    RevengeTipsFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.onRefresh();
    };
    RevengeTipsFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    RevengeTipsFrame.prototype.onRefresh = function () {
        var config = this.config;
        if (config == null)
            return;
        var name = config.name;
        var banghui = config.banghui || Localize_cns("PLAYER_DETAILS_TXT7");
        var force = config.force || 0;
        var desStr = Localize_cns("ESCORT_ROBBER_TXT1") + name + "#br" + Localize_cns("ESCORT_ROBBER_TXT2") + banghui + "#br" + Localize_cns("ESCORT_ROBBER_TXT3") + force + "#br";
        //rd_des
        AddRdContent(this.mElemList["rd_des"], desStr, "ht_20_cc", "black");
        var index = config.index;
        var refConfig = GameConfig.EscortConfig[index];
        var prize = refConfig.revengePrize;
        var prizeList = AnalyPrizeFormat(prize);
        var icon = GetProfessionIcon(config.id, 1);
        this.mElemList["image_player"].source = icon;
        //GetProfessionModel  image_player
        for (var k in prizeList) {
            var item = prizeList[k];
            if (this.mElemList["prizeBox" + k] == null) {
                this.mElemList["prizeBox" + k] = UIItemBox.newObj(this.mLayoutNode, "prizeBox" + k, 0, 0, this.mElemList["group_prize"]);
            }
            this.mElemList["prizeBox" + k].updateByEntry(item[0], item[1]);
        }
        //rd_twice
        AddRdContent(this.mElemList["rd_twice"], Localize_cns("ESCORT_RECORD_TXT7"), "ht_20_cc");
    };
    ///--------------响应事件
    RevengeTipsFrame.prototype.onGotoClick = function () {
        RpcProxy.call("C2G_RobberEscort", this.config.id);
    };
    ///接口
    RevengeTipsFrame.prototype.onShowWnd = function (config) {
        this.config = config;
        this.showWnd();
    };
    return RevengeTipsFrame;
}(BaseWnd));
__reflect(RevengeTipsFrame.prototype, "RevengeTipsFrame");
//# sourceMappingURL=RevengeTipsFrame.js.map