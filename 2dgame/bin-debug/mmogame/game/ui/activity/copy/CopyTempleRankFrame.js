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
var CopyTempleRankFrame = (function (_super) {
    __extends(CopyTempleRankFrame, _super);
    function CopyTempleRankFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CopyTempleRankFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    CopyTempleRankFrame.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
    };
    CopyTempleRankFrame.prototype.onUnLoad = function () {
        _super.prototype.onUnLoad.call(this);
    };
    CopyTempleRankFrame.prototype.onShow = function () {
        _super.prototype.onShow.call(this);
        //RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mElemList["label_wndName"].text = Localize_cns("COPY_TXT21");
        this.mElemList["tl4"].text = Localize_cns("CAMPAIGN_TXT2");
        this.mElemList["my_rank1"].text = Localize_cns("CAMPAIGN_TXT3");
    };
    CopyTempleRankFrame.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        //UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (false);
    };
    CopyTempleRankFrame.prototype.refreshItemWindow = function (window, config) {
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
    CopyTempleRankFrame.prototype.genConfigList = function () {
        return [1, 2, 1, 1, 1, 1, 1];
    };
    return CopyTempleRankFrame;
}(ActivityRankBaseFrame));
__reflect(CopyTempleRankFrame.prototype, "CopyTempleRankFrame");
//# sourceMappingURL=CopyTempleRankFrame.js.map