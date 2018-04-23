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
var CampaignRankFrame = (function (_super) {
    __extends(CampaignRankFrame, _super);
    function CampaignRankFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CampaignRankFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    CampaignRankFrame.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
    };
    CampaignRankFrame.prototype.onUnLoad = function () {
        _super.prototype.onUnLoad.call(this);
    };
    CampaignRankFrame.prototype.onShow = function () {
        _super.prototype.onShow.call(this);
        //RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mElemList["label_wndName"].text = Localize_cns("CAMPAIGN_TXT1");
        this.mElemList["tl4"].text = Localize_cns("CAMPAIGN_TXT2");
        this.mElemList["my_rank1"].text = Localize_cns("CAMPAIGN_TXT3");
    };
    CampaignRankFrame.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        //UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (false);
    };
    CampaignRankFrame.prototype.refreshItemWindow = function (window, config) {
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
    CampaignRankFrame.prototype.genConfigList = function () {
        return [1, 1, 1, 1, 1, 1, 1];
    };
    return CampaignRankFrame;
}(ActivityRankBaseFrame));
__reflect(CampaignRankFrame.prototype, "CampaignRankFrame");
//# sourceMappingURL=CampaignRankFrame.js.map