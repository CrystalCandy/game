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
var Fight_AlphaAction = (function (_super) {
    __extends(Fight_AlphaAction, _super);
    function Fight_AlphaAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_AlphaAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.targetName = checkNull(this.elemInfo.param1, "caster"); //可能以逗号隔开
        this.srcValue = checkNull(this.elemInfo.param2, 1);
        this.dstValue = checkNull(this.elemInfo.param3, 1);
        this.targetNameList = this.targetName.split(',');
        this.init = false;
    };
    Fight_AlphaAction.prototype.updateTransform = function () {
        function callback(actor, index) {
            var colorInfo = (_a = {}, _a["alpha"] = 255, _a);
            if (actor.classname == "FightActor") {
                colorInfo = actor.getActorColor();
            }
            var s = this.srcValue + this.timeProcess * (this.dstValue - this.srcValue);
            actor.setAlpha(s * colorInfo.alpha);
            if (this.init == false) {
                if (actor.classname == "FightActor") {
                    actor.setAlphaFlag(1);
                }
            }
            var _a;
        }
        if (this.iteratorActorList(callback, this.targetNameList) == false) {
            this.finish();
        }
        this.init = true;
    };
    Fight_AlphaAction.prototype.onPlay = function () {
        this.updateTransform();
    };
    Fight_AlphaAction.prototype.onFinish = function () {
        function callback(actor, index) {
            var colorInfo = (_a = {}, _a["alpha"] = 255, _a);
            if (actor.classname == "FightActor") {
                colorInfo = actor.getActorColor();
            }
            actor.setAlpha(this.dstValue * colorInfo.alpha);
            if (this.init == true) {
                if (actor.classname == "FightActor") {
                    actor.setAlphaFlag(-1);
                }
            }
            var _a;
        }
        this.iteratorActorList(callback, this.targetNameList);
    };
    Fight_AlphaAction.prototype.onTick = function (delay) {
        this.updateTransform();
    };
    return Fight_AlphaAction;
}(Fight_BaseAction));
__reflect(Fight_AlphaAction.prototype, "Fight_AlphaAction");
//# sourceMappingURL=Fight_AlphaAction.js.map