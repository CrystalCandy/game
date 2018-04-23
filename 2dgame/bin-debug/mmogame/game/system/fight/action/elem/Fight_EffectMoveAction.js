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
var Fight_EffectMoveAction = (function (_super) {
    __extends(Fight_EffectMoveAction, _super);
    function Fight_EffectMoveAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_EffectMoveAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.varName = checkNull(this.elemInfo.param1, ""); //定义变量
        this.effectId = this.elemInfo.param2;
        this.speed = checkNull(this.elemInfo.param3, 1);
        this.bAutoRotate = checkNull(this.elemInfo.param4, false);
        this.useType = checkNull(this.elemInfo.param5, "one"); //默认是场景的，创建一个
        if (this.fightResult) {
            this.speed = this.fightResult.getActionSpeed(this.speed);
        }
    };
    Fight_EffectMoveAction.prototype.createOnceEffect = function () {
        var effect = EffectManager.getInstance().createSceneEffect(this.effectId, 0, 0, false);
        effect.setAnimSpeed(this.speed);
        //effect.changeTopMapLayer( )
        if (this.casterActor == g_pauseSkillCaster) {
            effect.changeTopMapLayer();
        }
        effect.setMoveAutoRotate(this.bAutoRotate);
        effect.setDir(this.casterActor.getDir()); //人物特效需要根据人物面向设置
        if (this.varName != "") {
            this.fightResult.addActionObject(this.varName, effect); //用于其他action使用
        }
        effect.setPositionXY(-100, -100);
        this.effectList.push(effect);
    };
    Fight_EffectMoveAction.prototype.onPlay = function () {
        TLog.Assert(this.effectList == null);
        this.effectList = [];
        if (this.casterActor == null) {
            this.finish();
            return;
        }
        if (this.useType == "multi") {
            var callback = function (actor, index) {
                this.createOnceEffect();
            };
            if (this.iteratorActorList(callback, ["targetList"]) == false) {
                this.finish();
            }
        }
        else if (this.useType == "one") {
            this.createOnceEffect();
        }
        else {
            this.finish();
        }
    };
    Fight_EffectMoveAction.prototype.onFinish = function () {
        var _this = this;
        this.effectList.forEach(function (effect) {
            if (_this.varName != "") {
                _this.fightResult.removeActionObject(_this.varName, effect);
            }
            effect.deleteObj();
        });
        this.effectList = null;
    };
    Fight_EffectMoveAction.prototype.onTick = function (delay) {
        this.effectList.forEach(function (v) {
            v.update(delay);
        });
    };
    return Fight_EffectMoveAction;
}(Fight_BaseAction));
__reflect(Fight_EffectMoveAction.prototype, "Fight_EffectMoveAction");
//# sourceMappingURL=Fight_EffectMoveAction.js.map