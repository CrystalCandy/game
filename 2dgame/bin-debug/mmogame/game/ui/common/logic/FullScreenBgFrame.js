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
   2017.02.24(周五)

意图：
   全屏界面底图
公共接口：
   
*/
var FullScreenBgFrame = (function (_super) {
    __extends(FullScreenBgFrame, _super);
    function FullScreenBgFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FullScreenBgFrame.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        RegisterEvent(EventDefine.UI_SHOW, this.onWndUIShow, this);
        RegisterEvent(EventDefine.UI_HIDE, this.onWndUIHide, this);
    };
    FullScreenBgFrame.prototype.destory = function () {
        UnRegisterEvent(EventDefine.UI_SHOW, this.onWndUIShow, this);
        UnRegisterEvent(EventDefine.UI_HIDE, this.onWndUIHide, this);
    };
    FullScreenBgFrame.prototype.onLoad = function () {
        this.mLayoutNode.setLayer(0 /* Bottom */);
        this.setFullScreenRaw(true);
        var mElemInfo = [
            (_a = {}, _a["index_type"] = eui.Image, _a["name"] = "_bg_", _a["title"] = null, _a["image"] = "ty_ztUiDi01", _a["x"] = 0, _a["y"] = 0, _a),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        var _a;
    };
    FullScreenBgFrame.prototype.onUnLoad = function () {
    };
    FullScreenBgFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = (true);
        this.mLayoutNode.moveToBack();
    };
    FullScreenBgFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = (false);
    };
    ////////////////////////////////////////////////////////////////////-
    FullScreenBgFrame.prototype.onWndUIShow = function (args) {
        var className = args.window.classname;
        if (g_FullScreenRegisterMap[className]) {
            this.showWnd();
        }
    };
    FullScreenBgFrame.prototype.onWndUIHide = function (args) {
        var className = args.window.classname;
        if (g_FullScreenRegisterMap[className]) {
            var wngMrg = WngMrg.getInstance();
            var bHide = true;
            for (var wndName in g_FullScreenRegisterMap) {
                if (className != wndName) {
                    if (wngMrg.isVisible(wndName)) {
                        bHide = false;
                        break;
                    }
                }
            }
            if (bHide) {
                this.hideWnd();
            }
        }
    };
    return FullScreenBgFrame;
}(BaseWnd));
__reflect(FullScreenBgFrame.prototype, "FullScreenBgFrame");
//# sourceMappingURL=FullScreenBgFrame.js.map