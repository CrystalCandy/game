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
    2014.08.28(星期四)

意图：
  设置指定角色的显示/隐藏

公共接口：

*/
var Movie_VisiblePlayer = (function (_super) {
    __extends(Movie_VisiblePlayer, _super);
    function Movie_VisiblePlayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Movie_VisiblePlayer.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.visible = args[0].visible || false;
        this.playerId = args[0].var;
        //TLog.Debug("init",this.visible,args[1].visible)
    };
    Movie_VisiblePlayer.prototype.onBegin = function () {
        var player = MovieSystem.getInstance().getPlayer(this.playerId);
        if (player) {
            player.setVisible(this.visible);
            //TLog.Debug("Movie_VisiblePlayer.onBegi",this.visible)
        }
        this.finish();
    };
    Movie_VisiblePlayer.prototype.onTick = function (delay) {
    };
    Movie_VisiblePlayer.prototype.destory = function () {
    };
    Movie_VisiblePlayer.prototype.onFinish = function () {
    };
    return Movie_VisiblePlayer;
}(Movie_Elem));
__reflect(Movie_VisiblePlayer.prototype, "Movie_VisiblePlayer");
//# sourceMappingURL=Movie_VisiblePlayer.js.map