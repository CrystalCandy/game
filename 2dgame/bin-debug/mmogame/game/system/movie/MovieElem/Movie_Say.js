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
var Movie_Say = (function (_super) {
    __extends(Movie_Say, _super);
    function Movie_Say() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Movie_Say.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.playId = args[0].var;
        this.text = args[0].text;
        this.max_time = args[0].showTime || 3000;
        this.time = 0;
    };
    Movie_Say.prototype.onBegin = function () {
        this.showFrame();
    };
    Movie_Say.prototype.onTick = function (delay) {
        this.time = this.time + delay;
        if (this.time > this.max_time) {
            this.finish();
        }
    };
    Movie_Say.prototype.destory = function () {
    };
    Movie_Say.prototype.onFinish = function () {
        var player = MovieSystem.getInstance().getPlayer(this.playId);
        if (!player) {
            return;
        }
        player.doCommand(ActorCommand.HideChatBubble, null, null);
    };
    //////////////////////////////////////////////////////
    Movie_Say.prototype.showFrame = function () {
        var player = MovieSystem.getInstance().getPlayer(this.playId);
        if (!player) {
            return;
        }
        player.doCommand(ActorCommand.AddChatBubble, this.text, null);
    };
    return Movie_Say;
}(Movie_Elem));
__reflect(Movie_Say.prototype, "Movie_Say");
//# sourceMappingURL=Movie_Say.js.map