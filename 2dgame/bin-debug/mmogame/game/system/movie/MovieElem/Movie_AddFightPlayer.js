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
    2014.10.24(星期五)

意图：
  

公共接口：

*/
var Movie_AddFightPlayer = (function (_super) {
    __extends(Movie_AddFightPlayer, _super);
    function Movie_AddFightPlayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Movie_AddFightPlayer.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.figherListIndex = args[0].index || 0;
    };
    Movie_AddFightPlayer.prototype.onBegin = function () {
        if (FightSystem.getInstance().isFight() == false) {
            return this.finish();
        }
        var _a = FightSystem.getInstance().getConfigSystem().getClientFightConfig(this.figherListIndex), playerList = _a[0], _ = _a[1];
        FightSystem.getInstance().addMovieFighterList(playerList);
        this.finish();
    };
    Movie_AddFightPlayer.prototype.onTick = function (delay) {
    };
    Movie_AddFightPlayer.prototype.destory = function () {
    };
    Movie_AddFightPlayer.prototype.onFinish = function () {
    };
    return Movie_AddFightPlayer;
}(Movie_Elem));
__reflect(Movie_AddFightPlayer.prototype, "Movie_AddFightPlayer");
//# sourceMappingURL=Movie_AddFightPlayer.js.map