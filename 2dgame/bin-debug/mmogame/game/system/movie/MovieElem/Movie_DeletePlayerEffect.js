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
    2014.08.27(星期三)

意图：
  

公共接口：

*/
var Movie_DeletePlayerEffect = (function (_super) {
    __extends(Movie_DeletePlayerEffect, _super);
    function Movie_DeletePlayerEffect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Movie_DeletePlayerEffect.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.actorId = args[0].var;
        this.effectId = args[0].effectId;
        //table_TLog.Debug(args[1])
    };
    Movie_DeletePlayerEffect.prototype.onBegin = function () {
        MovieSystem.getInstance().removePlayerEffect(this.actorId, this.effectId);
        return this.finish();
    };
    //onTick( delay){
    //	
    //}
    //destory(){
    //	
    //}
    Movie_DeletePlayerEffect.prototype.onFinish = function () {
    };
    return Movie_DeletePlayerEffect;
}(Movie_Elem));
__reflect(Movie_DeletePlayerEffect.prototype, "Movie_DeletePlayerEffect");
//# sourceMappingURL=Movie_DeletePlayerEffect.js.map