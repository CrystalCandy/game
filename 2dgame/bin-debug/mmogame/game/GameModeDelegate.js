var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameModeDelegate = (function () {
    function GameModeDelegate() {
    }
    //游戏开始
    GameModeDelegate.prototype.onGameStart = function () {
    };
    //游戏尝试关闭
    GameModeDelegate.prototype.onGameClose = function () {
        return true;
    };
    //游戏销毁
    GameModeDelegate.prototype.onGameExit = function () {
    };
    return GameModeDelegate;
}());
__reflect(GameModeDelegate.prototype, "GameModeDelegate");
//# sourceMappingURL=GameModeDelegate.js.map