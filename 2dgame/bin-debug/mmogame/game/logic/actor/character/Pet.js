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
var Pet = (function (_super) {
    __extends(Pet, _super);
    function Pet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //子类复写 初始化函数
    Pet.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.setMovementNotifyEnable(true);
        this.actorType = actor_Type.ACTOR_TYPE_PET;
    };
    //子类复写 析构函数
    Pet.prototype.destory = function () {
        this.deleteShouHunEffect();
    };
    Pet.prototype.deleteShouHunEffect = function () {
        if (this.shouHunEffect) {
            this.shouHunEffect.deleteObj();
            this.shouHunEffect = null;
        }
    };
    Pet.prototype.setShouHunEffect = function (effectId) {
        effectId = effectId || 0;
        this.deleteShouHunEffect();
        if (effectId <= 0) {
            return;
        }
        var boneParam = {};
        boneParam.name = "";
        boneParam.order = -1;
        boneParam.transfrom = true;
        this.shouHunEffect = EffectManager.getInstance().createBindEffect(effectId, this, boneParam, true);
    };
    return Pet;
}(Character));
__reflect(Pet.prototype, "Pet");
//# sourceMappingURL=Pet.js.map