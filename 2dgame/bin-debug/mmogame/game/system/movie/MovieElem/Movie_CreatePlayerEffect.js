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
  创建角色绑定特效

公共接口：

*/
var Movie_CreatePlayerEffect = (function (_super) {
    __extends(Movie_CreatePlayerEffect, _super);
    function Movie_CreatePlayerEffect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Movie_CreatePlayerEffect.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.effectId = args[0].effectId;
        this.var = args[0].var;
        this.offx = args[0].offx || 0;
        this.offy = args[0].offy || 0;
        this.id = args[0].id;
        this.bOnce = args[0].bOnce || false;
    };
    Movie_CreatePlayerEffect.prototype.onBegin = function () {
        if (!this.effectId || !this.id) {
            TLog.Error("Movie_CreatePlayerEffect.onBegin the effectId || id is null!");
            return this.finish();
        }
        MovieSystem.getInstance().createPlayerEffect(this.effectId, this.offx, this.offy, this.id, this.var, this.bOnce);
        this.finish();
    };
    //onTick( delay){
    //	
    //}
    Movie_CreatePlayerEffect.prototype.destory = function () {
    };
    Movie_CreatePlayerEffect.prototype.onFinish = function () {
    };
    return Movie_CreatePlayerEffect;
}(Movie_Elem));
__reflect(Movie_CreatePlayerEffect.prototype, "Movie_CreatePlayerEffect");
//# sourceMappingURL=Movie_CreatePlayerEffect.js.map