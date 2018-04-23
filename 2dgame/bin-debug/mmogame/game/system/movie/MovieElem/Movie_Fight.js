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
   2013.10.29(周二)

意图：
   

公共接口：
   
*/
var Movie_Fight = (function (_super) {
    __extends(Movie_Fight, _super);
    function Movie_Fight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Movie_Fight.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.fightId = args[0].fightId;
        this.show_max_time = 1000 * 60 * 60;
        this.mapID = args[0].map || 50009;
        this.ignoreRun = args[0].ignoreRun || true;
    };
    Movie_Fight.prototype.destory = function () {
    };
    Movie_Fight.prototype.onBegin = function () {
        //let message = GetMessage(opCodes.C2G_ROLE_TEAM_COMBAT)
        //message.fight_id = this.fightId
        //SendGameMessage(message)
        //TaskExecutor.getInstance().executeNpcDialogOp(DialogOpDefine.FIELD_START_FIGHT, 40001, this.fightId, null, null)
        RegisterEvent(EventDefine.COMBAT_END, this.onCombatEnd, this);
        MovieSystem.getInstance().hideAllPlayer();
        MovieSystem.getInstance().hideAllEffect();
        FightSystem.getInstance().showClientFight(this.fightId, this.mapID, this.ignoreRun);
    };
    Movie_Fight.prototype.onTick = function (delay) {
    };
    Movie_Fight.prototype.onFinish = function () {
        UnRegisterEvent(EventDefine.COMBAT_END, this.onCombatEnd, this);
        StateManager.getInstance().ActiveSubState(state_type.LIVE_STORY_STATE);
        //FireEvent(EventDefine.PRECEDURE_DEACTIVE, PrecedureEvent.newObj(PRECEDURE_GAME))
        MovieSystem.getInstance().hideAllPeople();
        MovieSystem.getInstance().showAllPlayer();
        MovieSystem.getInstance().showAllEffect();
    };
    Movie_Fight.prototype.onCombatEnd = function (args) {
        this.finish();
    };
    return Movie_Fight;
}(Movie_Elem));
__reflect(Movie_Fight.prototype, "Movie_Fight");
//# sourceMappingURL=Movie_Fight.js.map