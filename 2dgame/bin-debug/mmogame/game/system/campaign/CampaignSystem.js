/*
作者:
    liuziming
    
创建时间：
   2014.6.17(周二)

意图：
   战役相关的数据处理（关卡、竞技场）

公共接口：

*/
//PET_COUNT = 18
//let CAMPAIGN_BEGIN_ID = 1
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
var CampaignSystem = (function (_super) {
    __extends(CampaignSystem, _super);
    function CampaignSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CampaignSystem.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    CampaignSystem.prototype.destory = function () {
    };
    //准备资源，把自己的workunit加载队列里
    CampaignSystem.prototype.prepareResource = function (workQueue) {
        GameConfig.initCampaignSystemCsv(workQueue);
        // workQueue.addWorkUnit(CallbackWorkUnit.newObj(this.initChapterList, this));
    };
    CampaignSystem.prototype.onClear = function () {
    };
    CampaignSystem.prototype.sendCampaignBattle = function (campaignId) {
        RpcProxy.call("C2G_CampaginFight", campaignId);
    };
    //////////////////////////////////////////////////////////////////////////////-
    CampaignSystem.prototype.setCampaignInfo = function (campaignId, mine) {
        this.campaignId = campaignId;
        this.mine = mine;
    };
    CampaignSystem.prototype.initFinishCampaignList = function (recordList) {
        this.recordList = recordList;
    };
    ////////////////////////////////////////////////
    CampaignSystem.prototype.isCampaignPass = function (campId) {
        return campId < this.campaignId;
    };
    CampaignSystem.prototype.getCampaignName = function (campId) {
        if (GameConfig.CampaignConfig[campId]) {
            return GameConfig.CampaignConfig[campId].name;
        }
        return "";
    };
    CampaignSystem.prototype.getFinishedCampaignList = function () {
        return this.recordList;
    };
    CampaignSystem.prototype.getCurOpenCampaign = function () {
        return this.campaignId;
    };
    CampaignSystem.prototype.getCurMine = function () {
        return this.mine;
    };
    CampaignSystem.prototype.getNeedMine = function (campId) {
        if (GameConfig.CampaignConfig[campId]) {
            return GameConfig.CampaignConfig[campId].autoFightNum;
        }
        if (GameConfig.CampaignConfig[this.campaignId]) {
            return GameConfig.CampaignConfig[this.campaignId].autoFightNum;
        }
        return 3;
    };
    CampaignSystem.prototype.getCampaignPrize = function (campId) {
        if (GameConfig.CampaignConfig[campId]) {
            return GameConfig.CampaignConfig[campId].basePrize;
        }
        return {};
    };
    //是否可以挑战boss
    CampaignSystem.prototype.bossCampaitnBattle = function () {
        if (GameConfig.CampaignConfig[this.campaignId]) {
            var needMine = GameConfig.CampaignConfig[this.campaignId].autoFightNum;
            return this.mine >= needMine;
        }
        else {
            return false;
        }
    };
    return CampaignSystem;
}(BaseSystem));
__reflect(CampaignSystem.prototype, "CampaignSystem");
//# sourceMappingURL=CampaignSystem.js.map