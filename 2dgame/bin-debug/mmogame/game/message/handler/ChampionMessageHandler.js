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
var ChampionMessageHandler = (function (_super) {
    __extends(ChampionMessageHandler, _super);
    function ChampionMessageHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChampionMessageHandler.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.register(opCodes.G2C_FIGHT_CHAMPION_REFRESH, this.onRecvG2C_FIGHT_CHAMPION_REFRESH, this); //竞技场刷新
        this.register(opCodes.G2C_FIGHT_CHAMPION_TOP_RANK, this.onRecvG2C_FIGHT_CHAMPION_TOP_RANK, this); //竞技场最高排名
        //this.register(opCodes.G2C_FIGHT_CHAMPION_RECORD, this.onRecvG2C_FIGHT_CHAMPION_RECORD, this)		//竞技场对战记录
        this.register(opCodes.G2C_FIGHT_CHAMPION_REFRESH_EX, this.onRecvG2C_FIGHT_CHAMPION_REFRESH_EX, this); //竞技场晶石刷新
        this.register(opCodes.G2C_FIGHT_CHAMPION_EX_PRIZE, this.onRecvG2C_FIGHT_CHAMPION_EX_PRIZE, this); //竞技场排名奖励
    };
    ChampionMessageHandler.prototype.onRecvG2C_FIGHT_CHAMPION_REFRESH = function (dispatcher, message) {
        var activity = GetActivity(ActivityDefine.Champion);
        activity.setChampionInfo(message);
        FireEvent(EventDefine.CHAMPION_REFRESH, ChampionRefreshEvent.newObj(message.force, message.rank, message.times, message.maxTimes, message.time, message.enemyList));
    };
    ChampionMessageHandler.prototype.onRecvG2C_FIGHT_CHAMPION_TOP_RANK = function (dispatcher, message) {
        //FireEvent(EventDefine.CHAMPION_TOP_RANK, ChampionTopRankEvent.newObj(message.enemyList))
    };
    // onRecvG2C_FIGHT_CHAMPION_RECORD(dispatcher, message) {		//竞技场战斗记录
    //     CampaignSystem.getInstance().setChampionRecord(message.championRecordList)
    //     FireEvent(EventDefine.FIGHT_CHAMPION_RECORD, ChampionRecordEvent.newObj(message.championRecordList))
    //     let wnd = WngMrg.getInstance().getWindow("ChampionRecordFrame")
    //     if (wnd.isVisible()) {
    //         wnd.refreshRecodeWindow()
    //     }
    // }
    ChampionMessageHandler.prototype.onRecvG2C_FIGHT_CHAMPION_REFRESH_EX = function (dispatcher, message) {
        var activity = GetActivity(ActivityDefine.Champion);
        activity.setChampionInfo(message);
        //FireEvent(EventDefine.CHAMPION_REFRESH_EX, ChampionRefreshExEvent.newObj(message.times, message.maxTimes, message.time))
    };
    ChampionMessageHandler.prototype.onRecvG2C_FIGHT_CHAMPION_EX_PRIZE = function (dispatcher, message) {
        var activity = GetActivity(ActivityDefine.Champion);
        activity.setFightEndCallBack(message);
    };
    return ChampionMessageHandler;
}(MessageHandler));
__reflect(ChampionMessageHandler.prototype, "ChampionMessageHandler");
//# sourceMappingURL=ChampionMessageHandler.js.map