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
   2014.6.12(周四)

意图：
   在电影剧情里播放技能表演（战斗中才能用）

公共接口：
   
*/
var Movie_AddFightResult = (function (_super) {
    __extends(Movie_AddFightResult, _super);
    function Movie_AddFightResult() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Movie_AddFightResult.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.index = args[0].index;
        this.show_max_time = 30500;
        this.resultList = [];
    };
    Movie_AddFightResult.prototype.destory = function () {
    };
    Movie_AddFightResult.prototype.onBegin = function () {
        RegisterEvent(EventDefine.COMBAT_FIGHT_RESULT_END, this.onResultEnd, this);
        if (FightSystem.getInstance().isFight() == false) {
            return this.finish();
        }
        var _a = FightSystem.getInstance().getConfigSystem().getClientFightConfig(this.index), pl = _a[0], rl = _a[1];
        var _b = FightSystem.getInstance().getCurFightTime(), nowFightTime = _b[0], _ = _b[1];
        for (var _1 in rl) {
            var result = rl[_1];
            result.time = result.time + nowFightTime;
            var _c = StringUtil.stringMatch(tostring(result.caster), /(\d+)0(\d+)/), side = _c[0], pos = _c[1];
            if (side && pos) {
                side = tonumber(side);
                pos = tonumber(pos);
                var actor = GetFightActorByPos(side, pos);
                if (actor) {
                    result.caster = actor.getCombatId();
                }
            }
            var matchResult = StringUtil.stringMatch(tostring(result.target), /(\d+)0(\d+)/);
            if (matchResult) {
                var target_side = tonumber(matchResult[0]);
                var target_pos = tonumber(matchResult[1]);
                var actor = GetFightActorByPos(target_side, target_pos);
                if (actor) {
                    result.target = actor.getCombatId();
                }
            }
            for (var j in result.fightPowers) {
                var power = result.fightPowers[j];
                var matchResult_1 = StringUtil.stringMatch(tostring(power.target), /(\d+)0(\d+)/);
                if (matchResult_1) {
                    var power_target_side = tonumber(matchResult_1[0]);
                    var power_target_pos = tonumber(matchResult_1[1]);
                    var actor = GetFightActorByPos(power_target_side, power_target_pos);
                    if (actor) {
                        result.fightPowers[j].target = actor.getCombatId();
                    }
                }
            }
            FightSystem.getInstance().addResult(result);
        }
        this.resultList = rl;
        MovieSystem.getInstance().setSkippAble(false);
    };
    Movie_AddFightResult.prototype.onTick = function (delay) {
    };
    Movie_AddFightResult.prototype.onFinish = function () {
        UnRegisterEvent(EventDefine.COMBAT_FIGHT_RESULT_END, this.onResultEnd, this);
        for (var _ in this.resultList) {
            var v = this.resultList[_];
            FightSystem.getInstance().getShowSystem().stopShowResult(v.caster);
        }
        MovieSystem.getInstance().setSkippAble(true);
    };
    Movie_AddFightResult.prototype.onResultEnd = function (args) {
        table_remove(this.resultList, args.result);
        if (size_t(this.resultList) == 0) {
            this.finish();
        }
    };
    return Movie_AddFightResult;
}(Movie_Elem));
__reflect(Movie_AddFightResult.prototype, "Movie_AddFightResult");
//# sourceMappingURL=Movie_AddFightResult.js.map