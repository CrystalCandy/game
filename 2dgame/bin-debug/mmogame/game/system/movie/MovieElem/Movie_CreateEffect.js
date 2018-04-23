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
   删除特效

公共接口：
   
*/
var Movie_CreateEffect = (function (_super) {
    __extends(Movie_CreateEffect, _super);
    function Movie_CreateEffect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Movie_CreateEffect.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.effectId = args[0].id;
        this.x, this.y = args[0].x, args[0].y; //cellXY
        this.bOnce = args[0].bOnce;
        this.id = args[0].var;
        this.coorType = args[0].coor || "map";
        this.dir = args[0].dir || null;
        this.effect = null;
    };
    Movie_CreateEffect.prototype.destory = function () {
        if (this.effect) {
            MovieSystem.getInstance().removeEffect(this.id);
        }
    };
    Movie_CreateEffect.prototype.onBegin = function () {
        if (this.coorType == "view") {
            var pos = SceneManager.getInstance().screenXYtoMapXY(this.x, this.y);
            var mapPos = SceneManager.getInstance().mapXYtoCellXY(pos.x, pos.y);
            this.x = mapPos.x;
            this.y = mapPos.y;
        }
        this.effect = MovieSystem.getInstance().createEffect(this.effectId, this.x, this.y, this.bOnce, this.id);
        if (this.dir) {
            TLog.Debug("setDir", this.dir);
            this.effect.setDir(this.dir);
        }
        this.finish();
    };
    //onTick( delay){
    //	
    //}
    Movie_CreateEffect.prototype.onFinish = function () {
    };
    return Movie_CreateEffect;
}(Movie_Elem));
__reflect(Movie_CreateEffect.prototype, "Movie_CreateEffect");
//# sourceMappingURL=Movie_CreateEffect.js.map