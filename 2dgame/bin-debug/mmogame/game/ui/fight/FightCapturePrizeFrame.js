// TypeScript file
//捕捉成果界面
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
var FightCapturePrizeFrame = (function (_super) {
    __extends(FightCapturePrizeFrame, _super);
    function FightCapturePrizeFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FightCapturePrizeFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/fight/FightCapturePrizeLayout.exml"];
    };
    FightCapturePrizeFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        // this.mLayoutNode.setLayer(gui.GuiLayer.Top)
        this.mLayoutNode.verticalCenter = -100;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onReturn, _a),
        ];
        // }
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        //let petEntry = 20001
        this.actorView = UIActorView.newObj(this.mLayoutNode, "actorview", 0, 0, this.mElemList["group_actorview"]);
        this.actorView.setActorScale(1.2);
        var _a;
    };
    FightCapturePrizeFrame.prototype.onUnLoad = function () {
    };
    FightCapturePrizeFrame.prototype.onShow = function () {
        _super.prototype.onShow.call(this);
        this.bAutoHide = true;
        this.maxDelayTime = 10 * 1000;
        this.mLayoutNode.visible = true;
        GameSound.getInstance().playEffect(SystemSound.effect_win);
        this.refreshFrame();
    };
    FightCapturePrizeFrame.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        this.mLayoutNode.visible = false;
        this.actorView.clearView();
    };
    FightCapturePrizeFrame.prototype.refreshFrame = function () {
        //param:{commonPrize: {funds=0, bindCurrency=0, currency=0, plrExp=0, itemList={}, star=3, campaignId=0, petEntry=0}
        //         fightType: }
        var petEntry = 20001;
        if (this.param && this.param.commonPrize) {
            petEntry = this.param.commonPrize.petEntry;
        }
        this.actorView.updateByPlayer(GetPetModel(petEntry));
    };
    FightCapturePrizeFrame.prototype.starShowCombatEnd = function () {
        return this.showWnd();
    };
    FightCapturePrizeFrame.prototype.autoHideTick = function (leftTime) {
        this.mElemList["btn_close"].text = Localize_cns("SURE") + "(" + Math.floor(leftTime / 1000) + ")";
    };
    FightCapturePrizeFrame.prototype.onReturn = function (args) {
        this.endShowCombatEnd();
    };
    return FightCapturePrizeFrame;
}(FightEndBaseFrame));
__reflect(FightCapturePrizeFrame.prototype, "FightCapturePrizeFrame");
//# sourceMappingURL=FightCapturePrizeFrame.js.map