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
/*
作者:
    liuziming
    
创建时间：
   2017.08.04(周五)

意图：
   剧情表演时黑色背景
公共接口：
   
*/
var MovieBackGroundFrame = (function (_super) {
    __extends(MovieBackGroundFrame, _super);
    function MovieBackGroundFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MovieBackGroundFrame.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.controlDataTable = {};
        this.contrlList = {};
        this.timerList = {};
    };
    MovieBackGroundFrame.prototype.onLoad = function () {
        this.createFrame();
    };
    MovieBackGroundFrame.prototype.onUnLoad = function () {
        for (var _ in this.contrlList) {
            var v = this.contrlList[_];
            v.deleteObj();
        }
        this.contrlList = {};
        this.controlDataTable = {};
    };
    MovieBackGroundFrame.prototype.onShow = function () {
        this.reactClick = false;
        this.mLayoutNode.visible = (true);
        this.refreshFrame();
    };
    MovieBackGroundFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = (false);
        for (var _ in this.timerList) {
            var timer = this.timerList[_];
            KillTimer(timer);
        }
        this.timerList = {};
    };
    ////////////////////////////////////////////////////////////////////-
    MovieBackGroundFrame.prototype.createFrame = function () {
        this.setFullScreen(true);
        this.mLayoutNode.setLayer(3 /* Top */);
        var ElemInfo = [
            (_a = {}, _a["index_type"] = eui.Rect, _a["name"] = "wnd", _a["color"] = gui.Color.black, _a["alpha"] = 1, _a["x"] = 0, _a["y"] = 0, _a["percentWidth"] = 100, _a["percentHeight"] = 100, _a["event_name"] = null, _a["fun_index"] = null, _a["touchEnabled"] = false, _a),
        ];
        UiUtil.createElem(ElemInfo, this.mLayoutNode, this.mElemList, this);
        this.mLayoutNode.touchChildren = false;
        this.mLayoutNode.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickFrame, this);
        var _a;
    };
    MovieBackGroundFrame.prototype.refreshFrame = function () {
    };
    ////////////////////////////////////////////////////////////-响应函数//////////////////////////////////////////////////////////////////////
    MovieBackGroundFrame.prototype.onReturn = function (args) {
        return this.hideWnd();
    };
    MovieBackGroundFrame.prototype.onClickFrame = function (args) {
        if (this.reactClick == false) {
            return;
        }
        MovieSystem.getInstance().skipNextElem();
    };
    ////////////////////////////////////////////////////////////公共接口////////////////////////////////
    MovieBackGroundFrame.prototype.setClickEnable = function (enable) {
        this.reactClick = enable;
    };
    return MovieBackGroundFrame;
}(BaseWnd));
__reflect(MovieBackGroundFrame.prototype, "MovieBackGroundFrame");
//# sourceMappingURL=MovieBackGroundFrame.js.map