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
var Fight_ScreenShakeAction = (function (_super) {
    __extends(Fight_ScreenShakeAction, _super);
    function Fight_ScreenShakeAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_ScreenShakeAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //this.shakeType = this.elemInfo.param1 , 0
        this.dir = checkNull(this.elemInfo.param1, 0);
        this.scope = checkNull(this.elemInfo.param2, 10); //幅度
        this.rate = checkNull(this.elemInfo.param3, 0); //每秒震动次数
        if (this.rate <= 0) {
            this.rate = 10;
        }
        if (this.fightResult) {
            this.rate = this.fightResult.getActionSpeed(this.rate);
        }
    };
    Fight_ScreenShakeAction.prototype.onPlay = function () {
        this.shakeId = SceneManager.getInstance().startShakeScreen(this.dir, this.scope, this.rate, this.casterActor);
    };
    Fight_ScreenShakeAction.prototype.onFinish = function () {
        SceneManager.getInstance().stopShakeScreen(this.shakeId);
    };
    return Fight_ScreenShakeAction;
}(Fight_BaseAction));
__reflect(Fight_ScreenShakeAction.prototype, "Fight_ScreenShakeAction");
//# sourceMappingURL=Fight_ScreenShakeAction.js.map