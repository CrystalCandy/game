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
var InterceptTipsFrame = (function (_super) {
    __extends(InterceptTipsFrame, _super);
    function InterceptTipsFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InterceptTipsFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/xiyouhusong/InterceptTipsLayout.exml"];
    };
    InterceptTipsFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.mLayoutNode.width = 640;
        this.mLayoutNode.height = 400;
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close_top", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_lanjie", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onLanjieClick, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a, _b;
    };
    InterceptTipsFrame.prototype.onUnLoad = function () {
    };
    InterceptTipsFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.onRefresh();
    };
    InterceptTipsFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    InterceptTipsFrame.prototype.onRefresh = function () {
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
        var colorList = [
            gui.Color.ublack, gui.Color.green, gui.Color.blue, gui.Color.purple, gui.Color.orange
        ];
        this.mElemList["label_mache"].textColor = colorList[index - 1];
        this.mElemList["label_mache"].text = refConfig.tips;
        var prize = refConfig.robberPrize;
        var prizeList = AnalyPrizeFormat(prize);
        //GetProfessionModel
        for (var k in prizeList) {
            var item = prizeList[k];
            if (this.mElemList["prizeBox" + k] == null) {
                this.mElemList["prizeBox" + k] = UIItemBox.newObj(this.mLayoutNode, "prizeBox" + k, 0, 0, this.mElemList["group_prize"]);
            }
            this.mElemList["prizeBox" + k].updateByEntry(item[0], item[1]);
        }
        //拦截次数
        var actInfo = GetActivity(ActivityDefine.HuSong).getActInfo();
        var lanjie = Localize_cns("ESCORT_TXT2") + actInfo.lanjieTwice + "/" + 5;
        AddRdContent(this.mElemList["rd_lanjie"], lanjie, "ht_20_cc", "black");
    };
    InterceptTipsFrame.prototype.onLanjieClick = function () {
        RpcProxy.call("C2G_RobberEscort", this.config.id);
        this.hideWnd();
    };
    ///接口
    InterceptTipsFrame.prototype.onShowWnd = function (config) {
        this.config = config;
        this.showWnd();
    };
    return InterceptTipsFrame;
}(BaseWnd));
__reflect(InterceptTipsFrame.prototype, "InterceptTipsFrame");
//# sourceMappingURL=InterceptTipsFrame.js.map