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
var Fight_ScreenBlackAction = (function (_super) {
    __extends(Fight_ScreenBlackAction, _super);
    function Fight_ScreenBlackAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_ScreenBlackAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //施法者可见，施法者和受法者可见，受法者可见，和全不可见四类
        this.type = checkNull(this.elemInfo.param1, 0);
        this.bHideUI = this.elemInfo.param2 || false; //隐藏界面
        this.pauseCtrl = false;
    };
    Fight_ScreenBlackAction.prototype.onPlay = function () {
        //是否已发送了攻击帧，如果没有，则在结束的时候发一次
        if (!this.casterActor) {
            this.finish();
            return;
        }
        this.pauseCtrl = FightSystem.getInstance().beginPauseSkillShow(this.casterActor, this.type);
        if (this.bHideUI) {
            IGlobal.guiManager.setUIVisible(false);
        }
    };
    Fight_ScreenBlackAction.prototype.onFinish = function () {
        if (this.casterActor && this.pauseCtrl == true) {
            FightSystem.getInstance().stopPauseSkillShow(this.casterActor);
        }
        if (this.bHideUI) {
            IGlobal.guiManager.setUIVisible(true);
        }
    };
    return Fight_ScreenBlackAction;
}(Fight_BaseAction));
__reflect(Fight_ScreenBlackAction.prototype, "Fight_ScreenBlackAction");
//# sourceMappingURL=Fight_ScreenBlackAction.js.map