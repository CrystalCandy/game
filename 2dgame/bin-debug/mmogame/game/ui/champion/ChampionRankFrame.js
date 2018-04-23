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
var ChampionRankFrame = (function (_super) {
    __extends(ChampionRankFrame, _super);
    function ChampionRankFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChampionRankFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.rankList = [];
    };
    ChampionRankFrame.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
    };
    ChampionRankFrame.prototype.onUnLoad = function () {
        _super.prototype.onUnLoad.call(this);
    };
    ChampionRankFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.ACTIVITY_RANK_UPDATE, this.refresh, this);
        _super.prototype.onShow.call(this);
        this.mElemList["label_wndName"].text = Localize_cns("JJC_TXT8");
        this.mElemList["tl4"].text = Localize_cns("JJC_TXT9");
        this.mElemList["reward_rd"].visible = true;
        this.mElemList["my_rank1"].text = "";
        this.mElemList["my_rank2"].text = "";
        this.sendRankRequire();
        this.refreshInfo();
    };
    ChampionRankFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ACTIVITY_RANK_UPDATE, this.refresh, this);
        this.mElemList["reward_rd"].visible = false;
        _super.prototype.onHide.call(this);
        this.mLayoutNode.visible = false;
    };
    ChampionRankFrame.prototype.refreshInfo = function () {
        var a = GetActivity(ActivityDefine.Champion);
        var info = a.getChampionInfo();
        var rank = info.rank;
        var rewardInfo = this.getDailyPrizeItemList(rank);
        if (rewardInfo == null) {
            AddRdContent(this.mElemList["reward_rd"], "", "ht_20_cc", "zongse");
            return;
        }
        var point = rewardInfo.point(rank);
        var bindCurrency = rewardInfo.bindCurrency(rank);
        var rdText = point + "#BIND_YUANBAO" + bindCurrency + "#JJC_POINT";
        AddRdContent(this.mElemList["reward_rd"], rdText, "ht_20_cc", "zongse");
    };
    ChampionRankFrame.prototype.refresh = function (info) {
        this.rankList = info.ranklist;
        _super.prototype.refreshFrame.call(this);
    };
    ChampionRankFrame.prototype.refreshItemWindow = function (window, config) {
        var name = window.name;
        var info = config;
        this.mElemList[name + "_star"].visible = false;
        this.mElemList[name + "reward_rd"].visible = true;
        var rankNum = info[0] || 1;
        this.mElemList[name + "_rank"].text = rankNum;
        this.mElemList[name + "_name"].text = info[2] || "";
        this.mElemList[name + "_force"].text = info[3] || 0;
        var rewardInfo = this.getDailyPrizeItemList(rankNum);
        if (rewardInfo == null) {
            AddRdContent(this.mElemList[name + "reward_rd"], "", "ht_20_cc", "zongse");
            return;
        }
        var point = rewardInfo.point(rankNum);
        var bindCurrency = rewardInfo.bindCurrency(rankNum);
        var rdText = point + "#BIND_YUANBAO" + bindCurrency + "#JJC_POINT";
        AddRdContent(this.mElemList[name + "reward_rd"], rdText, "ht_20_cc", "zongse");
        // let [enable, des, str] = FastJumpSystem.getInstance().checkFastJump(config[0], config[1])
        // this.mElemList[name + "_option"].enabled = (enable)
        // AddRdContent(this.mElemList[name + "_dec"], des, "ht_24_cc", "zongse")
        // this.controlDataTable[name + "_option"] = config
        // this.mElemList[name + "_block"].visible = (!enable)
        // if (enable == false) {
        // 	this.controlDataTable[name + "_block"] = str
        // }
    };
    //计算每日奖励
    ChampionRankFrame.prototype.getDailyPrizeItemList = function (rank) {
        for (var i in GameConfig.ChampionPrizeConfig) {
            var v = GameConfig.ChampionPrizeConfig[i];
            if (rank >= v.rankUp && rank <= v.rankDown) {
                return v;
            }
        }
        return null;
    };
    ChampionRankFrame.prototype.genConfigList = function () {
        return this.rankList;
    };
    //发送协议获取排行数据
    ChampionRankFrame.prototype.sendRankRequire = function () {
        var message = GetMessage(opCodes.C2G_ROLE_RANK);
        message.rankType = configRankType.RANK_JJC;
        message.index = 1;
        SendGameMessage(message);
    };
    return ChampionRankFrame;
}(ActivityRankBaseFrame));
__reflect(ChampionRankFrame.prototype, "ChampionRankFrame");
//# sourceMappingURL=ChampionRankFrame.js.map