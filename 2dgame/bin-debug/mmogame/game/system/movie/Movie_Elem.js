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
     表演元素的基类

公共接口：
   isFinish(){
     tick( delay){
     begin(){
     finish(){
    
     //子类继承
     onBegin(){
     onTick( dalay){
     onFinish(){
*/
var Movie_Elem = (function (_super) {
    __extends(Movie_Elem, _super);
    function Movie_Elem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Movie_Elem.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.bFinish = false;
        this.bBegin = false;
        this.show_time = 0;
        // 最大播放时间,超过直接显示完成
        this.show_max_time = args[0].showTime || 10000;
    };
    Movie_Elem.prototype.destory = function () {
    };
    Movie_Elem.prototype.isFinish = function () {
        return this.bFinish;
    };
    Movie_Elem.prototype.tick = function (delay) {
        if (this.isFinish()) {
            return true;
        }
        this.show_time = this.show_time + delay;
        if (this.show_max_time == -1) {
            this.onTick(delay);
        }
        else {
            if (this.show_time < this.show_max_time) {
                this.onTick(delay);
            }
            else {
                this.finish();
            }
        }
    };
    Movie_Elem.prototype.begin = function () {
        this.bBegin = true;
        this.onBegin();
    };
    Movie_Elem.prototype.finish = function () {
        if (this.bFinish == true ||
            this.bBegin == false) {
            return;
        }
        this.bFinish = true;
        this.onFinish();
    };
    // 子类继承
    Movie_Elem.prototype.onBegin = function () {
    };
    Movie_Elem.prototype.onTick = function (dalay) {
        this.finish();
    };
    Movie_Elem.prototype.onFinish = function () {
    };
    return Movie_Elem;
}(TClass));
__reflect(Movie_Elem.prototype, "Movie_Elem");
//# sourceMappingURL=Movie_Elem.js.map