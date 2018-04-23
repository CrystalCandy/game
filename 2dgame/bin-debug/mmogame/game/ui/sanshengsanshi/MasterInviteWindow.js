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
var MasterInviteWindow = (function (_super) {
    __extends(MasterInviteWindow, _super);
    function MasterInviteWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MasterInviteWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    MasterInviteWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
    };
    MasterInviteWindow.prototype.onUnLoad = function () {
    };
    MasterInviteWindow.prototype.onShow = function () {
        this.mElemList["group3"].visible = true;
    };
    MasterInviteWindow.prototype.onHide = function () {
        this.mElemList["group3"].visible = false;
    };
    MasterInviteWindow.prototype.onRefresh = function () {
    };
    MasterInviteWindow.prototype.initItemWindow = function (window) {
    };
    MasterInviteWindow.prototype.refreshItemWindow = function (window, data) {
    };
    return MasterInviteWindow;
}(BaseCtrlWnd));
__reflect(MasterInviteWindow.prototype, "MasterInviteWindow");
//# sourceMappingURL=MasterInviteWindow.js.map