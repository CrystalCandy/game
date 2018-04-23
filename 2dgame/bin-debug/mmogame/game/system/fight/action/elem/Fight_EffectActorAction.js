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
var Fight_EffectActorAction = (function (_super) {
    __extends(Fight_EffectActorAction, _super);
    function Fight_EffectActorAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_EffectActorAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.varName = checkNull(this.elemInfo.param1, ""); //定义变量
        this.targetName = checkNull(this.elemInfo.param2, "targetList");
        this.effectId = this.elemInfo.param3;
        this.speed = checkNull(this.elemInfo.param4, 1);
        this.boneName = this.elemInfo.param5 || "";
        this.offset_x = checkNull(this.elemInfo.param6, 0);
        this.offset_y = checkNull(this.elemInfo.param7, 0);
        this.bLastFrameDelay = checkNull(this.elemInfo.param8, false);
        this.bLastFrameLoop = checkNull(this.elemInfo.param9, false);
        this.layerType = checkNull(this.elemInfo.param10, "fg");
        var point = this.getOffsetByCaster(this.offset_x, this.offset_y);
        this.offset_x = point.x;
        this.offset_y = point.y;
        this.setAutoSendAttack(true);
        var autoRepeat = true;
        if (this.elemInfo.param11 != null) {
            autoRepeat = this.elemInfo.param11;
        }
        this.spellPre = this.fightResult.isSpellPrepare() && autoRepeat;
        if (this.fightResult) {
            this.speed = this.fightResult.getActionSpeed(this.speed);
        }
    };
    Fight_EffectActorAction.prototype.destory = function () {
        //非重复播放则返回，避免重复重复操作
        if (this.spellPre == false || this.effectList == null) {
            return;
        }
        this.spellPre = false;
        this.onFinish();
    };
    Fight_EffectActorAction.prototype.onPlay = function () {
        //标识着吟唱result以执行过一次
        if (this.spellPre == true && this.effectList != null) {
            return;
        }
        TLog.Assert(this.effectList == null);
        this.effectList = [];
        var bFinish = false;
        function callback(actor, index) {
            //一次性特效，自动删除，不用保存监听器实例
            var boneParam = {};
            boneParam.name = this.boneName;
            boneParam.order = 1;
            if (this.layerType == "bg") {
                boneParam.order = -1;
            }
            var effect = EffectManager.getInstance().createBindEffect(this.effectId, actor, boneParam, !this.bLastFrameDelay);
            effect.setAutoBindDelete(false);
            effect.setAnimSpeed(this.speed);
            //effect.setDir(actor.getDir())
            effect.setPositionXY(this.offset_x, this.offset_y);
            //不绑定骨骼，设置方向才有效
            if (this.boneName == "")
                effect.setDir(this.casterActor.getDir()); //人物特效需要根据人物面向设置
            effect.setCaster(this.casterActor);
            if (index == 0) {
                var listener = { this_index: this, function_index: this.handleAnimNotify };
                effect.addAnimListener(listener);
                bFinish = effect.isLoadError();
            }
            if (this.varName != "") {
                this.fightResult.addActionObject(this.varName, effect); //用于其他action使用
            }
            this.effectList.push(effect);
        }
        if (this.iteratorActorList(callback, [this.targetName]) == false) {
            this.finish();
        }
        else {
            if (bFinish) {
                this.finish();
            }
        }
    };
    Fight_EffectActorAction.prototype.onFinish = function () {
        var _this = this;
        if (this.effectList == null ||
            (this.spellPre == true && this.effectList != null)) {
            return;
        }
        this.effectList.forEach(function (v) {
            if (_this.varName != "") {
                _this.fightResult.removeActionObject(_this.varName, v);
            }
            v.clearAnimListener();
            v.deleteObj();
        });
        this.effectList = null;
    };
    Fight_EffectActorAction.prototype.onTick = function (delay) {
        this.effectList.forEach(function (v) {
            v.update(delay);
        });
    };
    return Fight_EffectActorAction;
}(Fight_BaseAction));
__reflect(Fight_EffectActorAction.prototype, "Fight_EffectActorAction");
//# sourceMappingURL=Fight_EffectActorAction.js.map