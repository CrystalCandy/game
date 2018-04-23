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
var Fight_AddFightSound = (function (_super) {
    __extends(Fight_AddFightSound, _super);
    function Fight_AddFightSound() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_AddFightSound.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.soundName = this.elemInfo.param1 || SystemSound.effect_chuxian;
        this.soundName2 = checkNull(this.elemInfo.param2, ""); //女声音
        this.targetType = checkNull(this.elemInfo.param3, null); //声音播放类型
        this.testMale = checkNull(this.elemInfo.param4, false); //测试男声
    };
    Fight_AddFightSound.prototype.onFinish = function () {
        var actor = null;
        if (this.targetType != null) {
            if (this.targetType == "caster") {
                actor = this.casterActor;
            }
            else if (this.targetType == "targetList") {
                actor = this.fightResult.getActionObjectByName("targetList")[1];
            }
        }
        if (actor == null) {
            GameSound.getInstance().playEffect(this.soundName);
        }
        else {
            var _a = GetFightActorConfig(actor), _ = _a[0], info = _a[1];
            var sex = 0;
            if (info && info.sex != 0) {
                sex = info.sex;
            }
            if (GAME_TOOL == GAME_MODE) {
                if (this.testMale) {
                    sex = genderOptions.MALE;
                }
                else {
                    sex = genderOptions.FEMALE;
                }
            }
            if (sex == genderOptions.FEMALE) {
                GameSound.getInstance().playEffect(this.soundName2);
            }
            else if (sex == genderOptions.MALE) {
                GameSound.getInstance().playEffect(this.soundName);
            }
        }
    };
    return Fight_AddFightSound;
}(Fight_BaseAction));
__reflect(Fight_AddFightSound.prototype, "Fight_AddFightSound");
//# sourceMappingURL=Fight_AddFightSound.js.map