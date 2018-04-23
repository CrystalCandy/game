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
   2014.12.25(周四)

意图：
   
公共接口：
   
*/
var Movie_SetPlayerXY = (function (_super) {
    __extends(Movie_SetPlayerXY, _super);
    function Movie_SetPlayerXY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Movie_SetPlayerXY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.playerId = args[0].var;
        this.x = args[0].x || 0;
        this.y = args[0].y || 0;
    };
    Movie_SetPlayerXY.prototype.onBegin = function () {
        this.finish();
    };
    Movie_SetPlayerXY.prototype.onTick = function (delay) {
    };
    Movie_SetPlayerXY.prototype.destory = function () {
    };
    Movie_SetPlayerXY.prototype.onFinish = function () {
        var player = MovieSystem.getInstance().getPlayer(this.playerId);
        if (!player) {
            return;
        }
        player.setMapXY(this.x, this.y);
    };
    return Movie_SetPlayerXY;
}(Movie_Elem));
__reflect(Movie_SetPlayerXY.prototype, "Movie_SetPlayerXY");
//# sourceMappingURL=Movie_SetPlayerXY.js.map