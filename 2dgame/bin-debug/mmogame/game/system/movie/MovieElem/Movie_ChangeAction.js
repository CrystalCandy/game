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
var Movie_ChangeAction = (function (_super) {
    __extends(Movie_ChangeAction, _super);
    function Movie_ChangeAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Movie_ChangeAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.playId = args[0].var;
        this.action = args[0].action;
        this.loop = args[0].loop;
        this.speed = args[0].speed || 1;
    };
    Movie_ChangeAction.prototype.onTick = function (delay) {
    };
    Movie_ChangeAction.prototype.destory = function () {
        var player = ActorManager.getInstance().getPlayer(this.playId);
        if (player) {
            player.changeAction("idle", 1, true);
        }
    };
    Movie_ChangeAction.prototype.onBegin = function () {
        var player = MovieSystem.getInstance().getPlayer(this.playId);
        if (!player) {
            this.finish();
            return;
        }
        //player.clearAnimListener()
        this.listener = { this_index: this, function_index: this.play_status_finish, notify_name: "end" };
        player.addAnimListener(this.listener);
        //if(player.switchToState(characterState.globalState_combat) ){
        //	this.oState = 
        //}
        player.changeAction(this.action, this.speed, this.loop);
        //this.finish()
    };
    Movie_ChangeAction.prototype.onFinish = function () {
        var player = MovieSystem.getInstance().getPlayer(this.playId);
        if (this.listener && player) {
            player.removeAnimListener(this.listener);
            this.listener = null;
            player.changeAction("idle", 1, true);
        }
    };
    Movie_ChangeAction.prototype.play_status_finish = function (notify, action_id) {
        var player = MovieSystem.getInstance().getPlayer(this.playId);
        if (this.listener && player) {
            player.removeAnimListener(this.listener);
            this.listener = null;
            player.changeAction("idle", 1, true);
        }
        this.finish();
    };
    return Movie_ChangeAction;
}(Movie_Elem));
__reflect(Movie_ChangeAction.prototype, "Movie_ChangeAction");
//# sourceMappingURL=Movie_ChangeAction.js.map