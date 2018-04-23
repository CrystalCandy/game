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
   2013.10.28(周一)

意图：
   

公共接口：
   
*/
var Movie_DeleteEffect = (function (_super) {
    __extends(Movie_DeleteEffect, _super);
    function Movie_DeleteEffect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Movie_DeleteEffect.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = args[0].var;
    };
    Movie_DeleteEffect.prototype.destory = function () {
    };
    Movie_DeleteEffect.prototype.onBegin = function () {
        MovieSystem.getInstance().removeEffect(this.id);
        this.finish();
    };
    //onTick( delay){
    //	let effect = MovieSystem.getInstance().getEffectList(this.id)
    //	if(effect ){
    //		MovieSystem.getInstance().removeEffect(this.id)
    //	}else{
    //		this.finish()
    //	}
    //}
    Movie_DeleteEffect.prototype.onFinish = function () {
    };
    return Movie_DeleteEffect;
}(Movie_Elem));
__reflect(Movie_DeleteEffect.prototype, "Movie_DeleteEffect");
//# sourceMappingURL=Movie_DeleteEffect.js.map