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
  lintianfeng

创建时间：
  2014.1.04(周六)

意图：
    说话窗口，上下黑框

公共接口：

*/
var Movie_FullBlack = (function (_super) {
    __extends(Movie_FullBlack, _super);
    function Movie_FullBlack() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Movie_FullBlack.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.maxTime = args[0].var || 1000;
        this.blackType = args[0].blackType || false;
        this.blackTime = args[0].blackTime || 200;
        this.time = 0;
    };
    Movie_FullBlack.prototype.onBegin = function () {
        this.time = 0;
        var value = null;
        if (this.blackType != false) {
            value = 1;
        }
        this.window = WngMrg.getInstance().getWindow("FullBalckFrame");
        this.window.setWindowTYpe(value, this.blackTime);
        this.window.showWnd();
    };
    Movie_FullBlack.prototype.onTick = function (delay) {
        this.time = this.time + delay;
        var maxTime = this.maxTime;
        if (this.time > maxTime) {
            this.finish();
        }
    };
    Movie_FullBlack.prototype.destory = function () {
    };
    Movie_FullBlack.prototype.onFinish = function () {
        if (this.blackType != false) {
            //this.window.unLoadWnd()
            this.window.playAlphaChange(2);
        }
        else {
            this.window.hideWnd();
        }
    };
    return Movie_FullBlack;
}(Movie_Elem));
__reflect(Movie_FullBlack.prototype, "Movie_FullBlack");
//# sourceMappingURL=Movie_FullBlack.js.map