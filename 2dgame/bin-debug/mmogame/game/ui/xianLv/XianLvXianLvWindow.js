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
var XianLvXianLvWindow = (function (_super) {
    __extends(XianLvXianLvWindow, _super);
    function XianLvXianLvWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XianLvXianLvWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    XianLvXianLvWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        this.mLayoutNode = this.mParentWnd.mLayoutNode;
    };
    XianLvXianLvWindow.prototype.onUnLoad = function () {
        this.Player = this.mParentWnd.Player;
        if (this.Player) {
            var actorview = this.mElemList["actor_view"];
            this.Player.leaveViewer(actorview);
            this.Player.deleteObj();
            this.Player = null;
        }
    };
    XianLvXianLvWindow.prototype.onShow = function () {
        this.mElemList["group_xianLv"].visible = true;
        this.mElemList["label_wndName"].text = "仙侣"; //Localize_cns("ROLE_TXT13");
        var controlList = XianLvSystem.getInstance().getControlList();
        this.mParentWnd.tabIndex = this.mParentWnd.tabWndList.getTabIndex();
        this.id = this.mParentWnd.selectId;
        if (this.id == 0) {
            //this.mParentWnd.petListBox.mElemList[]
            this.id = controlList[0].Id;
        }
        this.onRefresh();
    };
    XianLvXianLvWindow.prototype.onHide = function () {
        this.mElemList["group_xianLv"].visible = false;
    };
    XianLvXianLvWindow.prototype.refreshWithId = function (id) {
        this.id = id;
        this.onRefresh();
    };
    XianLvXianLvWindow.prototype.onRefresh = function () {
        this.mParentWnd.selectId = this.id;
        var index = this.mParentWnd.tabIndex;
        if (index == 0) {
            this.mParentWnd.onRefresh();
        }
    };
    return XianLvXianLvWindow;
}(BaseCtrlWnd));
__reflect(XianLvXianLvWindow.prototype, "XianLvXianLvWindow");
//# sourceMappingURL=XianLvXianLvWindow.js.map