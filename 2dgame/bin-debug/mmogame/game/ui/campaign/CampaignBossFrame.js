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
var CampaignBossFrame = (function (_super) {
    __extends(CampaignBossFrame, _super);
    function CampaignBossFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CampaignBossFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/campaign/CampaignBossLayout.exml"];
    };
    CampaignBossFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.initSkinElemList();
        this.setFullScreen(true);
        var mElemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["color"] = gui.Color.white, _a["right"] = 0, _a["top"] = 0, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["color"] = gui.Color.white, _b["right"] = 0, _b["bottom"] = 0, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "help_btn", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickHelp, _c),
            (_d = {}, _d["name"] = "fight_btn", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onClickFight, _d),
            (_e = {}, _e["name"] = "rank_enter", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onClickRank, _e),
        ];
        UiUtil.initElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["actor_view"] = UIActorView.newObj(this.mLayoutNode, "actor_view", 60, 150, this.mElemList["actor_wnd"]);
        //通关奖励
        this.mElemList["passItemBox"] = UIItemBox.newObj(this.mLayoutNode, "passItemBox", 0, 0, this.mElemList["pass_item_wnd"]);
        //概率掉落
        for (var i = 0; i < 5; i++) {
            this.mElemList["dropItemBox" + i] = UIItemBox.newObj(this.mLayoutNode, "dropItemBox" + i, 0, 0, this.mElemList["drop_item_wnd"]);
        }
        this.mElemList["fight_btn"].visible = false;
        this.mElemList["fight_tips"].visible = false;
        this.mElemList["help_btn"].visible = false;
        var _a, _b, _c, _d, _e;
    };
    CampaignBossFrame.prototype.onUnLoad = function () {
    };
    CampaignBossFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.CAMPAIGN_MINE, this.refreshFrame, this);
        this.mLayoutNode.visible = (true);
        this.refreshFrame();
    };
    CampaignBossFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.CAMPAIGN_MINE, this.refreshFrame, this);
        this.mLayoutNode.visible = (false);
    };
    CampaignBossFrame.prototype.refreshFrame = function () {
        this.campaignId = CampaignSystem.getInstance().getCurOpenCampaign();
        if (!this.campaignId) {
            return;
        }
        this.mElemList["camp_name"].text = CampaignSystem.getInstance().getCampaignName(this.campaignId);
        var list = [];
        this.updateSmallRank(list);
        this.updateHelpRd();
        this.updatePassWnd();
        this.updateActorModel();
        //更新掉落物品
        var prizeList = AnalyPrizeFormat(CampaignSystem.getInstance().getCampaignPrize(this.campaignId));
        for (var i = 0; i < 5; i++) {
            var v = prizeList[i];
            if (v) {
                this.mElemList["dropItemBox" + i].updateByEntry(v[0], v[1]);
            }
        }
        //挑战状态更新
        var isCanBattle = CampaignSystem.getInstance().bossCampaitnBattle();
        if (isCanBattle) {
            this.mElemList["fight_btn"].visible = true;
            this.mElemList["fight_tips"].visible = false;
            this.mElemList["help_btn"].visible = true;
        }
        else {
            this.mElemList["fight_btn"].visible = false;
            this.mElemList["fight_tips"].visible = true;
            this.mElemList["help_btn"].visible = false;
            var needMine = CampaignSystem.getInstance().getNeedMine(this.campaignId);
            var curMine = CampaignSystem.getInstance().getCurMine();
            this.mElemList["fight_tips"].text = String.format(Localize_cns("CAMPAIGN_TXT11"), needMine - curMine);
            this.mElemList["fight_tips"].textColor = gui.Color.ublack;
        }
    };
    //更新前三
    CampaignBossFrame.prototype.updateSmallRank = function (list) {
        var colorStr = ["#orange", "#magenta", "#cyan"];
        var rankStr = "";
        var nameStr = "";
        var passStr = "";
        for (var i = 0; i < 3; i++) {
            var v = list[i];
            if (v) {
                rankStr += colorStr[i] + (tonumber(i) + 1) + "#br";
                nameStr += colorStr[i] + v.name + "#br";
                passStr += colorStr[i] + v.pass + Localize_cns("CAMPAIGN_TXT10") + "#br";
            }
        }
        AddRdContent(this.mElemList["rank_rd"], rankStr, "ht_24_cc", "white", 6);
        AddRdContent(this.mElemList["name_rd"], nameStr, "ht_24_cc", "white", 6);
        AddRdContent(this.mElemList["pass_rd"], passStr, "ht_24_cc", "white", 6);
    };
    //求助信息
    CampaignBossFrame.prototype.updateHelpRd = function () {
        var request = 0;
        var requestLimit = 5;
        var help = 0;
        var helpLimit = 10;
        var str = String.format(Localize_cns("CAMPAIGN_TXT9"), request, requestLimit, help, helpLimit);
        AddRdContent(this.mElemList["help_rd"], str, "ht_20_cc", "ublack", 3);
    };
    //更新通关奖励和进度
    CampaignBossFrame.prototype.updatePassWnd = function () {
        var itemId = 60012;
        this.mElemList["passItemBox"].updateByEntry(itemId, 15);
        UiUtil.updateProgress(this.mElemList["pass_imb"], 10, 10);
    };
    //更新ActorView
    CampaignBossFrame.prototype.updateActorModel = function () {
        var modeID = GetCampaignBossModel(this.campaignId);
        var actorview = this.mElemList["actor_view"];
        var actor = actorview.updateByPlayer(modeID);
        actor.setScale(1.5);
    };
    //////////////////////////////////////////
    CampaignBossFrame.prototype.onClickFight = function (args) {
        if (CheckBeiBaoEquipWillFull()) {
            return;
        }
        if (CheckFightState() == true) {
            return;
        }
        RpcProxy.call("C2G_CampaginFight", this.campaignId);
    };
    CampaignBossFrame.prototype.onClickHelp = function (args) {
        if (CheckBeiBaoEquipWillFull()) {
            return;
        }
        if (CheckFightState() == true) {
            return;
        }
    };
    CampaignBossFrame.prototype.onClickRank = function (args) {
    };
    return CampaignBossFrame;
}(BaseWnd));
__reflect(CampaignBossFrame.prototype, "CampaignBossFrame");
//# sourceMappingURL=CampaignBossFrame.js.map