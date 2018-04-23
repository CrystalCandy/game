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
var PlayerDetailsFrame = (function (_super) {
    __extends(PlayerDetailsFrame, _super);
    function PlayerDetailsFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerDetailsFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/role/PlayerDetailsLayout.exml"];
    };
    PlayerDetailsFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        UiUtil.setFrameSize(this.mLayoutNode, 564, 710, 38, 141);
        this.mLayoutNode.setLayer(3 /* Top */);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_back", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_changeHead", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onChangeHeadClick, _c),
            (_d = {}, _d["name"] = "btn_changeName", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onChangeNameClick, _d),
            (_e = {}, _e["name"] = "btn_settings", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onSettingClick, _e),
            (_f = {}, _f["name"] = "btn_VIP", _f["title"] = null, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onVIPClick, _f),
            (_g = {}, _g["name"] = "btn_yueKa", _g["title"] = null, _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = this.onYueKaClick, _g),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["rd_copyname"].setAlignFlag(gui.Flag.RIGHT_BOTTOM);
        this.actorView = UIActorView.newObj(this.mLayoutNode, "actorview", 0, 0, this.mElemList["actor"]);
        var _a, _b, _c, _d, _e, _f, _g;
    };
    PlayerDetailsFrame.prototype.onUnLoad = function () {
        var actorView = this.actorView;
        actorView.clearView();
    };
    PlayerDetailsFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.onRefresh();
    };
    PlayerDetailsFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
    };
    PlayerDetailsFrame.prototype.onRefresh = function () {
        var name = GetHeroProperty("name");
        var sex = GetHeroProperty("sexId");
        var sexStr = (sex == 1) ? Localize_cns("GUIDE_TXT5") : Localize_cns("GUIDE_TXT6");
        var level = GetHeroProperty("level");
        var bangHui = GetHeroProperty("faction") || Localize_cns("PLAYER_DETAILS_TXT7");
        var force = GetHeroProperty("force");
        this.mElemList["label_nickname"].text = name;
        var str = String.format(Localize_cns("PALYER_DETAILS_TXT5"), name, sexStr, level, bangHui);
        AddRdContent(this.mElemList["rd_des"], str, "ht_20_cc", "black");
        AddRdContent(this.mElemList["rd_copyname"], Localize_cns("PALYER_DETAILS_TXT4"), "ht_20_cc");
        this.mElemList["rect_name"].width = 80;
        //zhanLi
        DrawNumberStringImage(this.mElemList["bImage"], "zhanLi_", "z" + force, 0, 0, -3);
        var entryid = RoleSystem.getInstance().getRoleInfo("entryid");
        var playerInfo = GetHeroPropertyInfo();
        var actorView = this.actorView;
        actorView.updateByPlayerAppearInfo(playerInfo);
        //头像
        var icon = GetProfessionIcon(entryid, sex);
        this.mElemList["image_player"].source = icon;
    };
    ////////////btn_
    PlayerDetailsFrame.prototype.onChangeNameClick = function () {
        var name = GetHeroProperty("name");
        var wnd = WngMrg.getInstance().getWindow("PlayerDetailsRenameFrame");
        this.hideWnd();
        wnd.showWnd();
    };
    PlayerDetailsFrame.prototype.onChangeHeadClick = function () {
        MsgSystem.addTagTips(Localize_cns("PLAYER_DETAILS_TXT9"));
        this.hideWnd();
    };
    PlayerDetailsFrame.prototype.onSettingClick = function () {
        var wnd = WngMrg.getInstance().getWindow("SettingFrame");
        this.hideWnd();
        wnd.showWnd();
    };
    PlayerDetailsFrame.prototype.onVIPClick = function () {
        ExecuteMainFrameFunction("VIP");
        this.hideWnd();
    };
    PlayerDetailsFrame.prototype.onYueKaClick = function () {
        var wnd = WngMrg.getInstance().getWindow("WelfareFrame");
        wnd.showWndWithTabName(2);
        this.hideWnd();
    };
    return PlayerDetailsFrame;
}(BaseWnd));
__reflect(PlayerDetailsFrame.prototype, "PlayerDetailsFrame");
//# sourceMappingURL=PlayerDetailsFrame.js.map