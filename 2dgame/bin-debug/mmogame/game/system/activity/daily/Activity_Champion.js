/*
作者:
    panjunhua
    
创建时间：
    2015.01.27(星期二)

意图：
  天空之塔活动

公共接口：
    
*/
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
var Activity_Champion = (function (_super) {
    __extends(Activity_Champion, _super);
    function Activity_Champion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Activity_Champion.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        RegisterEvent(EventDefine.UI_SHOW, this.onShowEventFunc, this);
        this.onClear();
    };
    Activity_Champion.prototype.destory = function () {
        UnRegisterEvent(EventDefine.UI_SHOW, this.onShowEventFunc, this);
    };
    Activity_Champion.prototype.onPrepareResource = function () {
    };
    Activity_Champion.prototype.onClear = function () {
        this.myForce = null; //战力
        this.myRank = null; //名次
        this.challengeCount = null; //拥有挑战次数
        this.refreshTime = null; //下次获得挑战次数倒计时
        this.enemyList = null; //几个对手
    };
    ////////////////////////////////////////////////////////////////-
    Activity_Champion.prototype.setChampionInfo = function (info) {
        this.myForce = GetHeroProperty("force") || 0;
        this.myRank = info.rank; //名次
        this.challengeCount = info.count; //剩下多少次
        this.refreshTime = info.time; //多长时间后可以再挑战
        this.enemyList = info.list; //几个对手	
    };
    Activity_Champion.prototype.getChampionInfo = function () {
        var info = {};
        info.force = this.myForce; //战力
        info.rank = this.myRank; //名次	
        info.count = this.challengeCount; //剩下多少次
        info.time = this.refreshTime; //最多多少次
        info.list = this.enemyList; //对手
        return info;
    };
    //竞技场战败处理
    Activity_Champion.prototype.onShowEventFunc = function (args) {
        // if (args.window.classname == "FightLostFrame") {
        //     if (args.window.getCurFightType() == opFightType.FIGHT_TYPE_CHAMPION) {
        //         let param: any = {}
        //         param.type = "cham"
        //         args.window.addReCallHandler(this, this.quickOutChampoin, param)
        //     }
        // }
    };
    //跳出战斗
    Activity_Champion.prototype.quickOutChampoin = function (param, showFrameName) {
        //TLog.Debug("Activity_SkyTower.fastEnterStopSkyTower",param.type)
        if (param.type == "cham" && showFrameName == "GemMenuFrame") {
            var wnd = WngMrg.getInstance().getWindow("ChampionFrame");
            wnd.OnClickReturn();
        }
    };
    Activity_Champion.prototype.setFightEndCallBack = function (message) {
        if (FightSystem.getInstance().isFight()) {
            return FightSystem.getInstance().addEndFightHandler(this.popHighPrizeFrame, this, message);
        }
        else {
            return this.popHighPrizeFrame(message);
        }
    };
    Activity_Champion.prototype.popHighPrizeFrame = function (message) {
        var wnd = WngMrg.getInstance().getWindow("ChampionFrame");
        wnd.showWnd();
        wnd = WngMrg.getInstance().getWindow("ChampionHighPrizeFrame");
        wnd.setInfoList(message);
        wnd.showWnd();
    };
    //计算每日奖励
    Activity_Champion.prototype.getDailyPrizeItemList = function () {
        var rank = this.myRank;
        for (var i in GameConfig.ChampionPrizeConfig) {
            var v = GameConfig.ChampionPrizeConfig[i];
            if (rank >= v.rankUp && rank <= v.rankDown) {
                return v;
            }
        }
        return null;
    };
    return Activity_Champion;
}(ActivityBase));
__reflect(Activity_Champion.prototype, "Activity_Champion");
//# sourceMappingURL=Activity_Champion.js.map