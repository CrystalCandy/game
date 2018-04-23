/*
    用于内嵌控件的window基类

    class TemplateWnd extends BaseCtrlWnd{
        public initObj(...params:any[]):void{
        }
        public onLoad():void{
        }
        public onUnLoad():void{
        }
        public onShow():void{
        }
        public onHide():void{
        }
    }
}
*/
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
//控件内的loadWnd，不能用layoutPath
var BaseCtrlWnd = (function (_super) {
    __extends(BaseCtrlWnd, _super);
    function BaseCtrlWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //子类复写 初始化函数
    BaseCtrlWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mVisible = false;
        this.mbLoad = false;
        this.mLayoutNode = params[0];
        this.mParentWnd = params[1];
    };
    //子类复写 析构函数
    BaseCtrlWnd.prototype.destory = function () {
        this.unLoadWnd();
    };
    BaseCtrlWnd.prototype.onLoad = function () {
    };
    BaseCtrlWnd.prototype.onUnLoad = function () {
    };
    BaseCtrlWnd.prototype.onShow = function () {
    };
    BaseCtrlWnd.prototype.onHide = function () {
    };
    BaseCtrlWnd.prototype.loadWnd = function () {
        if (this.mbLoad == false) {
            this.mbLoad = true;
            this.mElemList = {};
            this.onLoad();
        }
    };
    BaseCtrlWnd.prototype.unLoadWnd = function () {
        this.hideWnd();
        if (this.mbLoad) {
            this.mbLoad = false;
            this.onUnLoad();
            this.mElemList = null;
        }
    };
    BaseCtrlWnd.prototype.showWnd = function () {
        this.loadWnd();
        if (this.mVisible == false) {
            this.mVisible = true;
            this.loadWnd();
            this.onShow();
            FireEvent(EventDefine.UI_CTRL_SHOW, UIShowEvent.newObj(this));
        }
    };
    BaseCtrlWnd.prototype.hideWnd = function () {
        if (this.mbLoad && this.isVisible()) {
            this.mVisible = false;
            this.onHide();
            FireEvent(EventDefine.UI_CTRL_HIDE, UIShowEvent.newObj(this));
        }
    };
    BaseCtrlWnd.prototype.isVisible = function () {
        return this.mVisible;
    };
    return BaseCtrlWnd;
}(TClass));
__reflect(BaseCtrlWnd.prototype, "BaseCtrlWnd");
//# sourceMappingURL=BaseCtrlWnd.js.map