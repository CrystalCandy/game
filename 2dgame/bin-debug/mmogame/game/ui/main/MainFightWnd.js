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
var MainFightWnd = (function (_super) {
    __extends(MainFightWnd, _super);
    function MainFightWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainFightWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.select = false;
    };
    MainFightWnd.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "fire_wnd0", _a["messageFlag"] = true, _a),
            (_b = {}, _b["name"] = "fire_wnd1", _b["messageFlag"] = true, _b),
            (_c = {}, _c["name"] = "fire_wnd2", _c["messageFlag"] = true, _c),
            (_d = {}, _d["name"] = "auto_tip", _d["messageFlag"] = true, _d),
            (_e = {}, _e["name"] = "auto_pic", _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onClickBoss, _e),
            (_f = {}, _f["name"] = "auto_btn", _f["title"] = null, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onClickAuto, _f)
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        for (var i = 0; i < 3; i++) {
            this.mElemList["fire" + i].visible = false;
        }
        var _a, _b, _c, _d, _e, _f;
    };
    MainFightWnd.prototype.onUnLoad = function () {
    };
    MainFightWnd.prototype.onShow = function () {
        RegisterEvent(EventDefine.CAMPAIGN_MINE, this.refreshFireWnd, this);
        RegisterEvent(EventDefine.COMBAT_FIGHT_WIN, this.fightWin, this);
        RegisterEvent(EventDefine.COMBAT_FIGHT_LOST, this.fightLost, this);
        this.mElemList["auto_wnd"].visible = true;
        this.refreshFireWnd();
    };
    MainFightWnd.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.CAMPAIGN_MINE, this.refreshFireWnd, this);
        UnRegisterEvent(EventDefine.COMBAT_FIGHT_WIN, this.fightWin, this);
        UnRegisterEvent(EventDefine.COMBAT_FIGHT_LOST, this.fightLost, this);
        this.mElemList["auto_wnd"].visible = false;
    };
    MainFightWnd.prototype.refreshFireWnd = function () {
        var curmine = CampaignSystem.getInstance().getCurMine();
        var needmine = CampaignSystem.getInstance().getNeedMine();
        for (var i = 0; i < 3; i++) {
            this.mElemList["fire" + i].visible = (i < curmine);
            this.mElemList["fire_wnd" + i].visible = (i < needmine);
        }
    };
    MainFightWnd.prototype.fightWin = function () {
        var canFight = CampaignSystem.getInstance().bossCampaitnBattle();
        if (this.select && canFight) {
            var campaignId = CampaignSystem.getInstance().getCurOpenCampaign();
            RpcProxy.call("C2G_CampaginFight", campaignId);
        }
    };
    MainFightWnd.prototype.fightLost = function () {
        if (this.select) {
            this.select = false;
            this.mElemList["auto_btn"].source = "zjm_Bt33";
        }
    };
    MainFightWnd.prototype.onClickBoss = function () {
        ExecuteMainFrameFunction("guanka");
    };
    MainFightWnd.prototype.onClickAuto = function () {
        this.select = !this.select;
        if (this.select) {
            this.mElemList["auto_btn"].source = "zjm_Bt33_xz";
        }
        else {
            this.mElemList["auto_btn"].source = "zjm_Bt33";
        }
    };
    return MainFightWnd;
}(BaseCtrlWnd));
__reflect(MainFightWnd.prototype, "MainFightWnd");
//# sourceMappingURL=MainFightWnd.js.map