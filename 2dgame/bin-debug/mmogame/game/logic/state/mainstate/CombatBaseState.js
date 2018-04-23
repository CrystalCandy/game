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
var CombatBaseState = (function (_super) {
    __extends(CombatBaseState, _super);
    function CombatBaseState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //子类复写 初始化函数
    CombatBaseState.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mouseDown = false;
        this.lastBackGroundMusic = null;
    };
    //子类复写 析构函数
    CombatBaseState.prototype.destory = function () {
    };
    CombatBaseState.prototype.Activate = function () {
        this.lastBackGroundMusic = GameSound.getInstance().getCurMusicName() || null;
        GameSound.getInstance().playEffect(SystemSound.effect_kaizhan);
        var _a = FightSystem.getInstance().getCurFightType(), fightType = _a[0], _ = _a[1];
        if (fightType != opFightResultType.PATROL) {
            GameSound.getInstance().playMusic(SystemSound.music_combat, true);
        }
        else {
            this.lastBackGroundMusic = null;
        }
        //SceneManager.getInstance().setScenePersScale(SCENE_PERS_SCALE_FIGHT)//精灵缩放比例
    };
    CombatBaseState.prototype.Deactive = function () {
        GameSound.getInstance().unloadAllEffect(); //卸载所有音响
        if (this.lastBackGroundMusic != null)
            GameSound.getInstance().playMusic(this.lastBackGroundMusic, true);
    };
    CombatBaseState.prototype.EnableSubState = function (statetype) {
        return (statetype >= state_type.COMBAT_BASE_STATE && statetype <= state_type.COMBAT_BASE_STATE_END);
    };
    CombatBaseState.prototype.onClickActor = function (actor, args) {
        //TLog.Debug("combat_base_state.OnClickActor")
        if (actor.getActorType() == actor_Type.ACTOR_TYPE_AWARD) {
            actor.onClickActor(args);
        }
        else {
            FireEvent(EventDefine.COMBAT_FIGHTER_CLICK, ActorEvent.newObj(actor));
        }
    };
    //
    CombatBaseState.prototype.onMouseDown = function (args) {
        var hitActorList = SceneManager.getInstance().findHitActorListWithSceenXY(args.stageX, args.stageY);
        var hitActor = null;
        if (size_t(hitActorList)) {
            var _a = FightSystem.getInstance().isDefendSkillPicking(), flag = _a[0], _ = _a[1];
            if (flag == true) {
                for (var _1 in hitActorList) {
                    var actor = hitActorList[_1];
                    if (actor.getActorType() != actor_Type.ACTOR_TYPE_AWARD) {
                        hitActor = actor;
                        break;
                    }
                }
            }
            else {
                for (var _2 in hitActorList) {
                    var actor = hitActorList[_2];
                    if (actor.getActorType() == actor_Type.ACTOR_TYPE_AWARD) {
                        hitActor = actor;
                        break;
                    }
                }
            }
        }
        if (hitActor) {
            this.onClickActor(hitActor, args);
        }
        else {
            FireEvent(EventDefine.COMBAT_FIGHT_CLICK_MAP, null);
        }
        this.mouseDown = true;
        return true;
    };
    CombatBaseState.prototype.onMouseMove = function (args) {
        if (this.mouseDown == false) {
            return;
        }
        var hitActor = SceneManager.getInstance().findHitActorWithSceenXY(args.x, args.y);
        if (hitActor) {
            this.onClickActor(hitActor, args);
        }
        return true;
    };
    CombatBaseState.prototype.onMouseUp = function (args) {
        this.mouseDown = false;
        return true;
    };
    return CombatBaseState;
}(BaseState));
__reflect(CombatBaseState.prototype, "CombatBaseState");
//# sourceMappingURL=CombatBaseState.js.map