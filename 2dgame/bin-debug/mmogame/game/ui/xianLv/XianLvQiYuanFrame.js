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
var XianLvQiYuanFrame = (function (_super) {
    __extends(XianLvQiYuanFrame, _super);
    function XianLvQiYuanFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XianLvQiYuanFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/xianlv/XianLvQiYuanLayout.exml"];
    };
    XianLvQiYuanFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        UiUtil.setFrameSize(this.mLayoutNode, 470, 430, 85, 215);
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        this.mElemList["rd_1"].setAlignFlag(gui.Flag.LEFT_CENTER);
        this.mElemList["rd_2"].setAlignFlag(gui.Flag.LEFT_CENTER);
        this.mElemList["rd_3"].setAlignFlag(gui.Flag.LEFT_TOP);
    };
    XianLvQiYuanFrame.prototype.onUnLoad = function () {
    };
    XianLvQiYuanFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP, this.hideWnd, this);
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.onRefresh();
    };
    XianLvQiYuanFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP, this.hideWnd, this);
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    XianLvQiYuanFrame.prototype.onRefresh = function () {
        //rd_1
        var jihuolist = XianLvSystem.getInstance().getJiHuoList();
        var jie = 0;
        for (var i = 0; i < jihuolist.length; i++) {
            jie += XianLvSystem.getInstance().getLevel(jihuolist[i]);
        }
        var jieStr = Localize_cns("XIANLV_QIYUAN_TXT1");
        AddRdContent(this.mElemList["rd_1"], jieStr, "ht_24_cc");
        //rd_2
        var str2 = Localize_cns("XIANLV_QIYUAN_TXT2");
        AddRdContent(this.mElemList["rd_2"], str2, "ht_24_cc");
        //rd_3
        var str3 = Localize_cns("XIANLV_QIYUAN_TXT3");
        AddRdContent(this.mElemList["rd_3"], str3, "ht_24_cc");
    };
    return XianLvQiYuanFrame;
}(BaseWnd));
__reflect(XianLvQiYuanFrame.prototype, "XianLvQiYuanFrame");
//# sourceMappingURL=XianLvQiYuanFrame.js.map