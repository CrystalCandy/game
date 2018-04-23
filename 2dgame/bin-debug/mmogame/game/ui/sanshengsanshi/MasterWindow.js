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
var MasterWindow = (function (_super) {
    __extends(MasterWindow, _super);
    function MasterWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MasterWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    MasterWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
    };
    MasterWindow.prototype.onUnLoad = function () {
    };
    MasterWindow.prototype.onShow = function () {
        this.mElemList["group3"].visible = true;
        this.mElemList["btn_rule"].visible = true;
        this.mElemList["weiwang_shop"].visible = true;
        this.mElemList["title"].text = Localize_cns("SANSHENG_TXT9");
    };
    MasterWindow.prototype.onHide = function () {
        this.mElemList["group3"].visible = false;
        this.mElemList["btn_rule"].visible = false;
        this.mElemList["weiwang_shop"].visible = false;
    };
    MasterWindow.prototype.onRefresh = function () {
    };
    MasterWindow.prototype.initItemWindow = function (window) {
    };
    MasterWindow.prototype.refreshItemWindow = function (window, data) {
    };
    return MasterWindow;
}(BaseCtrlWnd));
__reflect(MasterWindow.prototype, "MasterWindow");
//# sourceMappingURL=MasterWindow.js.map