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
var ChampionPeerlessWindow = (function (_super) {
    __extends(ChampionPeerlessWindow, _super);
    function ChampionPeerlessWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChampionPeerlessWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    ChampionPeerlessWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
    };
    ChampionPeerlessWindow.prototype.onUnLoad = function () {
    };
    ChampionPeerlessWindow.prototype.onShow = function () {
        this.mElemList["Peerless_wnd"].visible = true;
    };
    ChampionPeerlessWindow.prototype.onHide = function () {
        this.mElemList["Peerless_wnd"].visible = false;
    };
    return ChampionPeerlessWindow;
}(BaseCtrlWnd));
__reflect(ChampionPeerlessWindow.prototype, "ChampionPeerlessWindow");
//# sourceMappingURL=ChampionPeerlessWindow.js.map