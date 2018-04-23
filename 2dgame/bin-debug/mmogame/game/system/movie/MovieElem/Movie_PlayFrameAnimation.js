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
    panjunhua
    
创建时间：
   2014.12.3(周三)

意图：
   

公共接口：
   
*/
var Movie_PlayFrameAnimation = (function (_super) {
    __extends(Movie_PlayFrameAnimation, _super);
    function Movie_PlayFrameAnimation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Movie_PlayFrameAnimation.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.frameName = args[0].var;
    };
    Movie_PlayFrameAnimation.prototype.onBegin = function () {
        RegisterEvent(EventDefine.UI_HIDE, this.checkEvent, this); //记录刷新
        TLog.Debug("Movie_PlayFrameAnimation.onBegin show", this.frameName);
        //Icon_OpenLoadedWindows(this.frameName)
        WngMrg.getInstance().showWindow(this.frameName);
        this.registerEvent = true;
    };
    Movie_PlayFrameAnimation.prototype.destory = function () {
        var wnd = WngMrg.getInstance().getWindow(this.frameName);
        if (wnd.isVisible()) {
            wnd.hideWnd();
        }
        if (this.registerEvent) {
            UnRegisterEvent(EventDefine.UI_HIDE, this.checkEvent, this);
            this.registerEvent = false;
        }
    };
    Movie_PlayFrameAnimation.prototype.checkEvent = function (args) {
        if (this.frameName == args.window.classname) {
            TLog.Debug("Movie_PlayFrameAnimation.checkEvent", args.window.classname, this.frameName);
            this.finish();
        }
    };
    Movie_PlayFrameAnimation.prototype.onTick = function (delay) {
    };
    Movie_PlayFrameAnimation.prototype.onFinish = function () {
        UnRegisterEvent(EventDefine.UI_HIDE, this.checkEvent, this); //记录刷新
        //TLog.Debug("Movie_PlayFrameAnimation.onFinish")
        //io.read()
        var wnd = WngMrg.getInstance().getWindow(this.frameName);
        if (wnd.isVisible()) {
            wnd.hideWnd();
        }
        this.registerEvent = false;
    };
    return Movie_PlayFrameAnimation;
}(Movie_Elem));
__reflect(Movie_PlayFrameAnimation.prototype, "Movie_PlayFrameAnimation");
//# sourceMappingURL=Movie_PlayFrameAnimation.js.map