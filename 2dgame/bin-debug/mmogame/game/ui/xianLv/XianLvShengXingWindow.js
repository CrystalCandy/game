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
var XianLvShengXingWindow = (function (_super) {
    __extends(XianLvShengXingWindow, _super);
    function XianLvShengXingWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XianLvShengXingWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    XianLvShengXingWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        this.mLayoutNode = this.mParentWnd.mLayoutNode;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_shengXing", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onShengXingClick, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a;
    };
    XianLvShengXingWindow.prototype.onUnLoad = function () {
        this.Player = this.mParentWnd.Player;
        if (this.Player) {
            var actorview = this.mElemList["actor_view"];
            this.Player.leaveViewer(actorview);
            this.Player.deleteObj();
            this.Player = null;
        }
    };
    XianLvShengXingWindow.prototype.onShow = function () {
        this.mElemList["group_xianLv"].visible = true;
        //this.mElemList["up_star_wnd"].visible = true
        this.mElemList["label_wndName"].text = "仙侣"; //Localize_cns("ROLE_TXT13");
        var controlList = XianLvSystem.getInstance().getControlList();
        this.mParentWnd.tabIndex = this.mParentWnd.tabWndList.getTabIndex();
        this.id = this.mParentWnd.selectId;
        if (this.id == 0)
            this.id = controlList[0].Id;
        this.onRefresh();
    };
    XianLvShengXingWindow.prototype.onHide = function () {
        this.mElemList["group_xianLv"].visible = false;
    };
    XianLvShengXingWindow.prototype.refreshWithId = function (id) {
        this.id = id;
        this.onRefresh();
    };
    XianLvShengXingWindow.prototype.onRefresh = function () {
        this.mParentWnd.selectId = this.id;
        var index = this.mParentWnd.tabIndex;
        if (index == 3) {
            this.mParentWnd.onRefresh();
        }
    };
    ///btn_响应事件
    XianLvShengXingWindow.prototype.onShengXingClick = function () {
        this.id = this.mParentWnd.selectId;
        var itemid = GameConfig.FunUpStarConfig["XianLv"][this.id].itemid;
        var star = XianLvSystem.getInstance().getStar(this.id);
        var itemnum = GameConfig.FunLevelNumConfig["XianLv"][star].num;
        var had = ItemSystem.getInstance().getItemCount(itemid);
        if (had < itemnum)
            return;
        RpcProxy.call("C2G_ACTOR_XIANLV_UP_START", this.id);
    };
    return XianLvShengXingWindow;
}(BaseCtrlWnd));
__reflect(XianLvShengXingWindow.prototype, "XianLvShengXingWindow");
//# sourceMappingURL=XianLvShengXingWindow.js.map