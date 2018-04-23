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
var TouZiJiJinWindow = (function (_super) {
    __extends(TouZiJiJinWindow, _super);
    function TouZiJiJinWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouZiJiJinWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    TouZiJiJinWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_jihua_touzi", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onTouziClick, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["scroll"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "jijin_scroll", group.width, group.height, group);
        var _a;
    };
    TouZiJiJinWindow.prototype.onUnLoad = function () {
    };
    TouZiJiJinWindow.prototype.onShow = function () {
        this.mElemList["group_tab_1"].visible = true;
    };
    TouZiJiJinWindow.prototype.onHide = function () {
        this.mElemList["group_tab_1"].visible = false;
    };
    TouZiJiJinWindow.prototype.onRefresh = function () {
        //rd_time
        var time = getFormatDiffTime(1522166400);
        AddRdContent(this.mElemList["rd_time"], time, "ht_20_cc_stroke", "blue");
    };
    ///-------------响应事件
    TouZiJiJinWindow.prototype.onTouziClick = function () {
    };
    return TouZiJiJinWindow;
}(BaseCtrlWnd));
__reflect(TouZiJiJinWindow.prototype, "TouZiJiJinWindow");
//# sourceMappingURL=TouZiJiJinWindow.js.map