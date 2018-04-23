/*
作者:
    yangguiming
    
创建时间：
   2013.6.18(周二)

意图：
   人物动作的有限状态机，只是为了控制角色动作
   状态机暂时有3层子状态，全局，动作，姿态。

公共接口：
    
    //public initObj(...args:any[]):void {
    //isState( statetype){//检查当前状态
    //setState( statetype){//设置状态，不会检查
    //canToState( statetype){//检查是否可以状态转移
    //isBlock( curState, toState){//检查curState是否阻挡toState


*/
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
ImportType(characterState);
//状态阻挡规则
//[当前状态]不能跳转到{目标状态列表}
var characterStateBlockRule = (_a = {},
    _a[characterState.globalState_live] = [],
    _a[characterState.globalState_combat] = [],
    _a[characterState.actionState_idle] = [],
    _a[characterState.actionState_move] = [],
    _a[characterState.actionState_attack] = [characterState.actionState_attacked,
        //characterState.actionState_rush,
        characterState.actionState_move,
        characterState.actionState_dodge,
        characterState.actionState_knockfly,
        characterState.actionState_beatback,],
    _a[characterState.actionState_attacked] = [],
    _a[characterState.actionState_dodge] = [],
    _a[characterState.actionState_rush] = [characterState.actionState_move,
        //characterState.actionState_attack,
        characterState.actionState_attacked,
        characterState.actionState_jump,
        characterState.actionState_dodge,
        characterState.actionState_knockfly,
        characterState.actionState_beatback,],
    _a[characterState.actionState_jump] = [],
    _a[characterState.actionState_dead] = [characterState.actionState_idle,
        characterState.actionState_move,
        characterState.actionState_attack,
        characterState.actionState_attacked,
        characterState.actionState_rush,
        characterState.actionState_jump,
        characterState.actionState_dodge,
        characterState.actionState_knockfly,
        characterState.actionState_beatback,],
    _a[characterState.actionState_knockfly] = [characterState.actionState_move,
        characterState.actionState_attack,
        characterState.actionState_attacked,
        characterState.actionState_jump,
        characterState.actionState_dodge,
        characterState.actionState_beatback,],
    _a[characterState.actionState_beatback] = [characterState.actionState_move,
        characterState.actionState_attack,
        characterState.actionState_attacked,
        characterState.actionState_jump,
        characterState.actionState_dodge,
        characterState.actionState_knockfly,],
    _a[characterState.postureState_normal] = [],
    _a[characterState.postureState_shape] = [],
    _a[characterState.postureState_ride] = [],
    _a);
var CharacterFSM = (function (_super) {
    __extends(CharacterFSM, _super);
    function CharacterFSM() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CharacterFSM.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mCharacter = args[0];
        this.mGlobalState = characterState.nullState;
        this.mActionState = characterState.nullState;
        this.mPostureState = characterState.nullState;
    };
    CharacterFSM.prototype.isGlobalState = function (statetype) {
        return statetype > characterState.globalState_Begin && statetype < characterState.globalState_End;
    };
    CharacterFSM.prototype.isActionState = function (statetype) {
        return statetype > characterState.actionState_Begin && statetype < characterState.actionState_End;
    };
    CharacterFSM.prototype.isPostureState = function (statetype) {
        return statetype > characterState.postureState_Begin && statetype < characterState.postureState_End;
    };
    CharacterFSM.prototype.isState = function (statetype) {
        if (this.isGlobalState(statetype)) {
            return this.mGlobalState == statetype;
        }
        else if (this.isActionState(statetype)) {
            return this.mActionState == statetype;
        }
        else if (this.isPostureState(statetype)) {
            return this.mPostureState == statetype;
        }
        return false;
    };
    CharacterFSM.prototype.setState = function (statetype) {
        //if(characterState[statetype] == null ){
        //	TLog.Error("CharacterFSM.setState %s ! exsit", tostring(statetype))
        //	return
        //}
        var oldState = -1;
        if (statetype > characterState.globalState_Begin && statetype < characterState.globalState_End) {
            oldState = this.mGlobalState;
            this.mGlobalState = statetype;
        }
        else if (statetype > characterState.actionState_Begin && statetype < characterState.actionState_End) {
            oldState = this.mActionState;
            this.mActionState = statetype;
        }
        else if (statetype > characterState.postureState_Begin && statetype < characterState.postureState_End) {
            oldState = this.mPostureState;
            this.mPostureState = statetype;
        }
        else {
            TLog.Error("CharacterFSM.setState %s ! scope in characterState", tostring(statetype));
        }
        if (oldState != -1 && oldState != statetype) {
            this.mCharacter.onStateChange(oldState, statetype);
        }
    };
    CharacterFSM.prototype.canToState = function (statetype) {
        if (this.isBlock(this.mGlobalState, statetype)) {
            return false;
        }
        else if (this.isBlock(this.mActionState, statetype)) {
            return false;
        }
        else if (this.isBlock(this.mPostureState, statetype)) {
            return false;
        }
        return true;
    };
    CharacterFSM.prototype.isBlock = function (curState, toState) {
        var stateRule = characterStateBlockRule[curState];
        //没有定义规则，则不阻挡
        if (stateRule == null) {
            return false;
        }
        for (var _ = 0; _ < stateRule.length; _++) {
            var v = stateRule[_];
            if (v == toState) {
                return true;
            }
        }
        return false;
    };
    return CharacterFSM;
}(TClass));
__reflect(CharacterFSM.prototype, "CharacterFSM");
var _a;
//# sourceMappingURL=CharacterFSM.js.map