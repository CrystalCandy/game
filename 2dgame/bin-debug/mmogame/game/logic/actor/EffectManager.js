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
var EffectManager = (function (_super) {
    __extends(EffectManager, _super);
    function EffectManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //子类复写 初始化函数
    EffectManager.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    //子类复写 析构函数
    EffectManager.prototype.destory = function () {
    };
    EffectManager.prototype._initEffect = function (effect, loop) {
        var effectId = effect.getEffectId();
        var modelId = 9002;
        var bError = false;
        var speed = 1.0;
        //print("effectId", EffectConfig[effectId], effectId)
        TLog.Assert(effectId != null);
        var effectRef = GameConfig.EffectConfig[effectId];
        if (effectRef != null) {
            if (effectRef.sound != "") {
                GameSound.getInstance().playEffect(effectRef.sound);
            }
            if (effectRef.speed && effectRef.speed != 0) {
                speed = effectRef.speed;
            }
            modelId = effectRef.model;
        }
        else {
            TLog.Error("initeffect.%s  not exsit", tostring(effectId));
            bError = true;
        }
        effect.loadModel(modelId);
        effect.changeAction("", speed, loop); //播放默认动作
        effect.loadError = bError;
        return bError;
    };
    EffectManager.prototype.createEffect = function (effectId, loop) {
        var effect = Effect.newObj(effectId);
        var bError = this._initEffect(effect, loop);
        return effect;
    };
    //_createScreenEffect()
    EffectManager.prototype.createSceneEffect = function (effectId, cellx, celly, isOnce, loop) {
        var effect = this.createEffect(effectId, loop);
        effect.setCellXY(cellx, celly);
        effect.enterMap(); //场景特效需要enterMap
        if (isOnce) {
            effect.setShowTimes(1); //一次特效
        }
        return effect;
    };
    //一次特效（播放一次自动销毁）
    EffectManager.prototype.createBindOnceEffect = function (effectId, character, boneParam) {
        var effect = this.createBindEffect(effectId, character, boneParam, true);
        effect.setShowTimes(1); //一次特效
        return effect;
    };
    //buffer特效
    EffectManager.prototype.createBindEffect = function (effectId, character, boneParam, loop) {
        var effect = this.createEffect(effectId, loop);
        character.doCommand(ActorCommand.AddEffect, effect, boneParam);
        return effect;
    };
    //删除buffer特效
    EffectManager.prototype.removeBindEffect = function (character, effect) {
        character.doCommand(ActorCommand.RemoveEffect, effect, true);
    };
    EffectManager.prototype.createScreenEffect = function (effectId, x, y, layer) {
        if (layer == null) {
            //layer = map.ICamera.eScreenLayer_Background
            layer = 0;
        }
        var effect = ScreenEffect.newObj(effectId);
        this._initEffect(effect);
        effect.setPositionXY(x, y);
        effect.setScreenLayer(layer);
        SceneManager.getInstance().addScreenEffect(effect);
        return effect;
    };
    return EffectManager;
}(TClass));
__reflect(EffectManager.prototype, "EffectManager");
//# sourceMappingURL=EffectManager.js.map