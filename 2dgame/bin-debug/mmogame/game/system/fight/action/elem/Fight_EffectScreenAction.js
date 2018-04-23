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
var Fight_EffectScreenAction = (function (_super) {
    __extends(Fight_EffectScreenAction, _super);
    function Fight_EffectScreenAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_EffectScreenAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.varName = checkNull(this.elemInfo.param1, ""); //定义变量
        this.effectId = this.elemInfo.param2;
        this.speed = checkNull(this.elemInfo.param3, 1);
        this.offset_x = checkNull(this.elemInfo.param4, 0);
        this.offset_y = checkNull(this.elemInfo.param5, 0);
        this.layerType = checkNull(this.elemInfo.param6, "");
        this.screenEffect = null;
        if (this.fightResult) {
            this.speed = this.fightResult.getActionSpeed(this.speed);
        }
    };
    Fight_EffectScreenAction.prototype.onPlay = function () {
        TLog.Assert(this.screenEffect == null);
        if (this.casterActor == null) {
            this.finish();
            return;
        }
        var pos = {};
        pos.x = this.offset_x;
        pos.y = this.offset_y;
        var layer = map.Camera.SCREEN_BACKGROUND;
        if (this.layerType == "fg") {
            layer = map.Camera.SCREEN_FOREGROUND;
        }
        //自动析构，不用保存实例
        this.screenEffect = EffectManager.getInstance().createScreenEffect(this.effectId, pos.x, pos.y, layer);
        this.screenEffect.setAnimSpeed(this.speed);
        this.screenEffect.setDir(this.casterActor.getDir());
        if (this.varName != "") {
            this.fightResult.addActionObject(this.varName, this.screenEffect); //用于其他action使用
        }
    };
    Fight_EffectScreenAction.prototype.onFinish = function () {
        if (this.screenEffect == null) {
            return;
        }
        if (this.varName != "") {
            this.fightResult.removeActionObject(this.varName, this.screenEffect);
        }
        this.screenEffect.deleteObj();
        this.screenEffect = null;
    };
    Fight_EffectScreenAction.prototype.onTick = function (delay) {
        if (this.screenEffect) {
            this.screenEffect.update(delay);
        }
    };
    return Fight_EffectScreenAction;
}(Fight_BaseAction));
__reflect(Fight_EffectScreenAction.prototype, "Fight_EffectScreenAction");
//# sourceMappingURL=Fight_EffectScreenAction.js.map