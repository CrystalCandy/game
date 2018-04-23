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
var DailyGhostFrame = (function (_super) {
    __extends(DailyGhostFrame, _super);
    function DailyGhostFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DailyGhostFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/DailyGhostLayout.exml"];
    };
    DailyGhostFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        // this.mLayoutNode.setLayer(gui.GuiLayer.Top)
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_challenge", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onChallengeClick, _c),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["rd_2"].setAlignFlag(gui.Flag.RIGHT_CENTER);
        var _a, _b, _c;
    };
    DailyGhostFrame.prototype.onUnLoad = function () {
        if (this.Player) {
            var actorview = this.mElemList["actor_view"];
            this.Player.leaveViewer(actorview);
            this.Player.deleteObj();
            this.Player = null;
        }
    };
    DailyGhostFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.onRefresh();
    };
    DailyGhostFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    DailyGhostFrame.prototype.onRefresh = function () {
        // if(!this.npcId || !this.star){
        //     return
        // }
        var actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.ZhongKuiDemon);
        if (size_t(actInfo) == 0)
            return;
        //let activeList = {}
        var npcList = actInfo.npcList;
        for (var k in npcList) {
            var v = npcList[k];
            var osTime = GetServerTime();
            if ((v <= osTime)) {
                // activeList[k] = v
                this.npcId = tonumber(k);
                break;
            }
        }
        //rd_1
        var guankaId = CampaignSystem.getInstance().getCurOpenCampaign();
        var guankaName = CampaignSystem.getInstance().getCampaignName(guankaId);
        var str1 = String.format(Localize_cns("DAILY_BOSS_TXT1"), this.npcId, guankaName);
        AddRdContent(this.mElemList["rd_1"], str1, "ht_24_cc", "black");
        var str2 = String.format(Localize_cns("DAILY_BOSS_TXT3"));
        AddRdContent(this.mElemList["rd_2"], str2, "ht_24_cc", "black");
        var config = GameConfig.ZhongKuiDemonConfig[this.npcId];
        var desStr = "";
        var desRight = "";
        var starRatio = config.star;
        for (var k in starRatio) {
            if (tonumber(k) % 2 != 0) {
                desStr += String.format(Localize_cns("DAILY_BOSS_TXT2"), k, FormatNumberInt(starRatio[k] * 100) + "%");
            }
            else {
                desRight += String.format(Localize_cns("DAILY_BOSS_TXT2"), k, FormatNumberInt(starRatio[k] * 100) + "%");
            }
        }
        // let str2 = Localize_cns("DAILY_BOSS_TXT2")
        AddRdContent(this.mElemList["rd_des"], desStr, "ht_24_cc", "black");
        AddRdContent(this.mElemList["rd_right"], desRight, "ht_24_cc", "black");
        var list = config.prize;
        var prizeList = AnalyPrizeFormat(list);
        this.onRefreshPrize(prizeList);
        var monsterId = config.entryId;
        if (this.Player == null) {
            this.Player = Player.newObj();
        }
        this.onRefreshActor(monsterId);
        var star = actInfo.star;
        this.onRefreshStar(star);
    };
    DailyGhostFrame.prototype.onRefreshPrize = function (list) {
        for (var i = 0; i < size_t(list); i++) {
            var config = list[0];
            if (!this.mElemList["prizeBox" + i]) {
                this.mElemList["prizeBox" + i] = UIItemBox.newObj(this.mLayoutNode, "prizeBox" + i, 0, 0, this.mElemList["group_prize"]);
            }
            this.mElemList["prizeBox" + i].updateByEntry(config[0], config[1]);
        }
    };
    ///刷新
    DailyGhostFrame.prototype.onRefreshStar = function (num) {
        for (var i = 1; i <= num; i++) {
            this.mElemList["image_" + i].source = "ty_star01";
        }
        if (num < 7) {
            for (var i = num + 1; i <= 7; i++) {
                this.mElemList["image_" + i].source = "ty_starDi01";
            }
        }
    };
    DailyGhostFrame.prototype.onRefreshActor = function (id) {
        var actorview = this.mElemList["actor_view"];
        var actor = this.Player;
        var modelId = id;
        actor.loadModel(modelId);
        actor.changeAction("idle", 1.0, true);
        actor.setPositionXY(0, 0);
        actor.enterViewer(actorview);
        //缩放
        actor.setScale(1.0);
        //方向
        actor.setDir(3);
    };
    //--------------响应事件
    DailyGhostFrame.prototype.onChallengeClick = function () {
        if (this.npcId == null)
            return;
        RpcProxy.call("C2G_CreateBossFight", OrdinaryActivityIndex.ZhongKuiDemon, this.npcId); //"C2G_CreateBossFight":"uint16;uint16",  --创建战斗 activityIndex,npcIndex
        this.hideWnd();
    };
    ///---------接口
    DailyGhostFrame.prototype.onShowWnd = function (type) {
        this.npcId = type;
        // this.star = star
        this.showWnd();
    };
    return DailyGhostFrame;
}(BaseWnd)); // TypeScript file
__reflect(DailyGhostFrame.prototype, "DailyGhostFrame");
//# sourceMappingURL=DailyGhostFrame.js.map