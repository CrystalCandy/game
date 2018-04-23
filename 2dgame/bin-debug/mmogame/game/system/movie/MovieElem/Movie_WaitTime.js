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
   2013.10.26(周六)

意图：
   暂停动作

公共接口：
   
*/
var Movie_WaitTime = (function (_super) {
    __extends(Movie_WaitTime, _super);
    function Movie_WaitTime() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Movie_WaitTime.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.max_time = args[0].time || 3000;
        this.time = 0;
    };
    Movie_WaitTime.prototype.onBegin = function () {
    };
    Movie_WaitTime.prototype.onTick = function (delay) {
        this.time = this.time + delay;
        if (this.time > this.max_time) {
            this.finish();
        }
    };
    Movie_WaitTime.prototype.destory = function () {
    };
    Movie_WaitTime.prototype.onFinish = function () {
        this.time = this.max_time;
    };
    return Movie_WaitTime;
}(Movie_Elem));
__reflect(Movie_WaitTime.prototype, "Movie_WaitTime");
//# sourceMappingURL=Movie_WaitTime.js.map