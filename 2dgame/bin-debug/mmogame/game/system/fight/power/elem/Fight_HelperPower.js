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
var Fight_HelperPower = (function (_super) {
    __extends(Fight_HelperPower, _super);
    function Fight_HelperPower() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_HelperPower.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Fight_HelperPower.prototype.onFinish = function () {
        if (this.powerInfo.effect == powerEffects.EFFECT_FIGHTER_DISAPPEAR) {
            var actor = GetFightActor(this.powerInfo.id);
            if (actor && actor.getProperty("type_id") == objectType.OBJECT_TYPE_ASSIST) {
                return FightSystem.getInstance().removeFighter(this.powerInfo.id);
            }
            if (actor) {
                actor.changeDieState();
            }
            FightSystem.getInstance().getShowSystem().stopShowResult(this.powerInfo.id);
            return FightSystem.getInstance().removeFighter(this.powerInfo.id);
        }
        else {
            var fighterInfo = JsUtil.objectCopy(this.powerInfo);
            fighterInfo.effect = null;
            fighterInfo.times = null;
            //处理召唤类型
            var type_id = PetSystem.getInstance().getSummonType(fighterInfo.entry);
            if (type_id && fighterInfo.type_id != objectType.OBJECT_TYPE_ASSIST) {
                fighterInfo.type_id = type_id;
            }
            var flag = table_isExsit(objectType, fighterInfo.type_id);
            if (!flag) {
                fighterInfo.type_id = objectType.OBJECT_TYPE_HELPER;
            }
            if (fighterInfo.type_id != objectType.OBJECT_TYPE_ASSIST) {
                //fighterInfo.type_id = objectType.OBJECT_TYPE_HELPER
                fighterInfo.host = this.fightResult.result.caster;
            }
            fighterInfo.pos = CreateHelperClientPos();
            return FightSystem.getInstance().addFighterList({ fighterInfo: fighterInfo });
        }
    };
    return Fight_HelperPower;
}(Fight_BasePower));
__reflect(Fight_HelperPower.prototype, "Fight_HelperPower");
//# sourceMappingURL=Fight_HelperPower.js.map