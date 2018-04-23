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
var Fight_FadeAction = (function (_super) {
    __extends(Fight_FadeAction, _super);
    function Fight_FadeAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_FadeAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.targetName = checkNull(this.elemInfo.param1, "caster");
        this.new_interval = checkNull(this.elemInfo.param2, 10);
        this.alive_interval = checkNull(this.elemInfo.param3, 1000);
        this.max_count = 50;
        this.targetNameList = splitString(this.targetName, ",");
    };
    Fight_FadeAction.prototype.onPlay = function () {
        var callback = function (actor, index) {
            actor.createFade(this.new_interval, this.alive_interval, this.max_count);
        };
        if (this.iteratorActorList(callback, this.targetNameList) == false) {
            this.finish();
        }
    };
    Fight_FadeAction.prototype.onFinish = function () {
        function callback(actor, index) {
            actor.clearFade();
        }
        if (this.iteratorActorList(callback, this.targetNameList) == false) {
            this.finish();
        }
    };
    return Fight_FadeAction;
}(Fight_BaseAction));
__reflect(Fight_FadeAction.prototype, "Fight_FadeAction");
//# sourceMappingURL=Fight_FadeAction.js.map