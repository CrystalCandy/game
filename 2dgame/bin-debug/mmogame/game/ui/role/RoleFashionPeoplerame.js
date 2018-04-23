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
var RoleFashionPeopleFrame = (function (_super) {
    __extends(RoleFashionPeopleFrame, _super);
    function RoleFashionPeopleFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoleFashionPeopleFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/role/RoleFashionPeopleLayout.exml"];
    };
    RoleFashionPeopleFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        UiUtil.setFrameSize(this.mLayoutNode, 470, 400, 85, 225);
        this.initSkinElemList();
        var t = this.mElemList["group_1"];
        t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideWnd, this);
        this.mElemList["rd_now"].setAlignFlag(gui.Flag.LEFT_CENTER);
        this.mElemList["rd_next"].setAlignFlag(gui.Flag.LEFT_TOP);
    };
    RoleFashionPeopleFrame.prototype.onUnLoad = function () {
    };
    RoleFashionPeopleFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.onRefresh();
    };
    RoleFashionPeopleFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    RoleFashionPeopleFrame.prototype.onRefresh = function () {
        //装备
        var equiplist = RoleSystem.getInstance().getRoleInfo("euqiplist");
        for (var k in equiplist) {
        }
        //rd_now
        var nowEffect = "xxxxxxxxxxxxxxxxxx";
        var wuShi = 124;
        var jianShao = 234;
        var nowStr = String.format(Localize_cns("ROLE_FMAN_TXT1"), nowEffect, wuShi, jianShao);
        AddRdContent(this.mElemList["rd_now"], nowStr, "ht_24_cc", "white");
        //rd_next
        var nextEffect = "xxxxxxxxxxxxxxxxxx";
        var nextWuShi = 124;
        var nextJianShao = 234;
        var zhanLi = 298099;
        var nextStr = String.format(Localize_cns("ROLE_FMAN_TXT2"), nextEffect, nextWuShi, nextJianShao, zhanLi);
        AddRdContent(this.mElemList["rd_next"], nextStr, "ht_24_cc", "white");
    };
    return RoleFashionPeopleFrame;
}(BaseWnd));
__reflect(RoleFashionPeopleFrame.prototype, "RoleFashionPeopleFrame");
//# sourceMappingURL=RoleFashionPeoplerame.js.map