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
// TypeScript file
var FightCapttureWindow = (function (_super) {
    __extends(FightCapttureWindow, _super);
    function FightCapttureWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FightCapttureWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.controlDataTable = {};
    };
    FightCapttureWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_captrue", _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onClickCaptrue, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a;
        // let group = <eui.Group>this.mElemList["jie_scroll_group"]
        // this.scroll = UIScrollList.newObj(this.mLayoutNode, "jie_scroll", 0, 0, group.width, group.height, group)
    };
    FightCapttureWindow.prototype.onUnLoad = function () {
    };
    FightCapttureWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.COMBAT_FIGHT_ROUND_UPDATE, this.onFightRoundUpdate, this);
        this.mElemList["captrue_group"].visible = true;
    };
    FightCapttureWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.COMBAT_FIGHT_ROUND_UPDATE, this.onFightRoundUpdate, this);
        this.mElemList["captrue_group"].visible = false;
    };
    FightCapttureWindow.prototype.onFightRoundUpdate = function (args) {
        //this.refreshFrame()
    };
    FightCapttureWindow.prototype.onClickCaptrue = function (args) {
        RpcProxy.call("C2G_CreateBossFight", OrdinaryActivityIndex.CapturePet, 0);
        var message = GetMessage(opCodes.C2G_FIGHT_CMD);
        message.fightId = fightSide.FIGHT_RIGHT; //哪一边（默认右边）
        message.skillType = skillSuperType.CAPTURE;
        SendGameMessage(message);
    };
    return FightCapttureWindow;
}(BaseCtrlWnd));
__reflect(FightCapttureWindow.prototype, "FightCapttureWindow");
//# sourceMappingURL=FightCapttureWindow.js.map