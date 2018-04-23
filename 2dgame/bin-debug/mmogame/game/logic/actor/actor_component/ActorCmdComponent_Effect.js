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
var ActorCmdComponent_Effect = (function (_super) {
    __extends(ActorCmdComponent_Effect, _super);
    function ActorCmdComponent_Effect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActorCmdComponent_Effect.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.bindEffectList = [];
        this.addCommandHandler(ActorCommand.AddEffect, this.onHandleCommand_AddEffect);
        this.addCommandHandler(ActorCommand.RemoveEffect, this.onHandleCommand_RemoveEffect);
        this.addCommandHandler(ActorCommand.RemoveEffectById, this.onHandleCommand_RemoveEffectById);
        this.addCommandHandler(ActorCommand.RemoveEffectAll, this.removeAllEffect);
        //命名特效
        //this.addCommandHandler(ActorCommand.SetEffect, this.onHandleCommand_SetEffect)
        //this.addCommandHandler(ActorCommand.SetEffectVisible, this.onHandleCommand_SetEffectVisible)
        this.addCommandHandler(ActorCommand.SetEffectVisibleWithCaster, this.onHandleCommand_SetEffectVisibleWidthCaster);
    };
    //子类复写 析构函数
    ActorCmdComponent_Effect.prototype.destory = function () {
        this.removeAllEffect();
    };
    ActorCmdComponent_Effect.prototype.removeAllEffect = function () {
        while (this.bindEffectList.length > 0) {
            var effect = this.bindEffectList[0];
            if (effect.isAutoBindDelete()) {
                effect.deleteObj(); //内部调用Character.removeEffect
            }
            else {
                this.onHandleCommand_RemoveEffect(effect, false);
                //effect.setBindCharacter(null)
            }
        }
        TLog.Assert(this.bindEffectList.length == 0);
    };
    ActorCmdComponent_Effect.prototype.onHandleCommand_AddEffect = function (param1, param2) {
        var effect = param1;
        var boneParam = param2;
        if (JsUtil.arrayExsit(this.bindEffectList, effect)) {
            TLog.Warn("Character.addEffect effect%s already exsit", tostring(effect));
            return;
        }
        if (effect.isEnterMap()) {
            throw Error("onHandleCommand_AddEffect");
        }
        var effectId = effect.getEffectId();
        var bindBoneName = "";
        var bindOrder = 0;
        var bTransfrom = false;
        if (boneParam == null) {
            var effectRef = GameConfig.EffectConfig[effectId];
            if (effectRef) {
                bindBoneName = effectRef.bindBone;
                bindOrder = effectRef.bindOrder;
                //以战斗中站在左边的角色方向为基准
                var x = effectRef.offx || 0;
                var y = effectRef.offy || 0;
                //todo:yangguiming
                // if(this.owner.getSide ){
                //     if(this.owner.getSide() == fightSide.FIGHT_RIGHT ){
                //         x = -1 * x
                //     }
                // }
                effect.setPositionXY(x, y);
            }
        }
        else {
            bindBoneName = boneParam.name || "";
            bindOrder = boneParam.order || 0;
            bTransfrom = boneParam.transfrom || false;
        }
        //Order保证是所有骨骼之上
        //if(bindBoneName == "" ){
        if (bindOrder > 0) {
            bindOrder = 10000;
        }
        else if (bindOrder < 0) {
            bindOrder = -10000;
        }
        effect.setBindCharacter(this.owner);
        JsUtil.arrayPush(this.bindEffectList, effect);
        effect.setBindBone(bindBoneName);
        this.realActor.addChildSprite(bindBoneName, effect.realActor, bindOrder, bTransfrom);
    };
    ActorCmdComponent_Effect.prototype.onHandleCommand_RemoveEffect = function (param1, param2) {
        var effect = param1;
        var bDelete = param2;
        if (bDelete == null) {
            bDelete = true;
        }
        var flag = JsUtil.arrayExsit(this.bindEffectList, effect);
        if (flag) {
            if (bDelete) {
                effect.deleteObj();
            }
            else {
                this.realActor.removeChildSprite(effect.realActor);
                effect.setBindCharacter(null);
            }
        }
        JsUtil.arrayRemoveVal(this.bindEffectList, effect);
    };
    ActorCmdComponent_Effect.prototype.onHandleCommand_RemoveEffectById = function (param1, param2) {
        var effectId = param1;
        var removeEffect = null;
        for (var i = 0; i < this.bindEffectList.length; i++) {
            var v = this.bindEffectList[i];
            if (v.getEffectId() == effectId) {
                removeEffect = v;
                //table_remove(this.bindEffectList, v)
                break;
            }
        }
        if (removeEffect) {
            removeEffect.deleteObj();
        }
    };
    ActorCmdComponent_Effect.prototype.onHandleCommand_SetEffectVisible = function (param1, param2) {
        param1 = !!param1;
        this.bindEffectList.forEach(function (v) {
            v.setVisible(param1 == true);
        });
    };
    ActorCmdComponent_Effect.prototype.onHandleCommand_SetEffectVisibleWidthCaster = function (param1, param2) {
        this.bindEffectList.forEach(function (v) {
            if (v.getCaster() != param2) {
                v.setVisible(param1 == true);
            }
        });
    };
    return ActorCmdComponent_Effect;
}(ActorCmdComponent));
__reflect(ActorCmdComponent_Effect.prototype, "ActorCmdComponent_Effect");
//# sourceMappingURL=ActorCmdComponent_Effect.js.map