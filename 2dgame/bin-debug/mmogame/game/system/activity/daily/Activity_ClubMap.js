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
/*
作者:
    
创建时间：

意图：
    公会地图

公共接口：
    
*/
var CLUB_COLLECT_ID = 22041;
var CLUB_INSTRUSION_ID = 22042;
var Activity_ClubMap = (function (_super) {
    __extends(Activity_ClubMap, _super);
    function Activity_ClubMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Activity_ClubMap.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Activity_ClubMap.prototype.onClear = function () {
    };
    Activity_ClubMap.prototype.destory = function () {
    };
    Activity_ClubMap.prototype.onPrepareResource = function () {
    };
    //活动请求开始
    Activity_ClubMap.prototype.requestStart = function () {
        if (CheckEndFightNow() == false)
            return;
        RpcProxy.call("C2G_FactionMapEnter");
    };
    Activity_ClubMap.prototype.requestStop = function () {
        RpcProxy.call("C2G_FactionMapLeave");
    };
    Activity_ClubMap.prototype.onStart = function () {
        RegisterEvent(EventDefine.HERO_ENTER_MAP, this.onHeroEnterMap, this);
        RegisterEvent(EventDefine.COMBAT_BEGIN, this.onBattleBegin, this);
        RegisterEvent(EventDefine.COMBAT_END, this.onBattleEnd, this);
        PushUIShow(null, ["MainFrame"]);
        StateManager.getInstance().ActiveSubState(state_type.LIVE_ACTIVITY_STATE);
        var wnd = WngMrg.getInstance().getWindow("ClubMapFrame");
        wnd.showWnd();
        wnd = WngMrg.getInstance().getWindow("MainFrame");
        wnd.doCommand("setHeadGroupVisible", true);
    };
    Activity_ClubMap.prototype.onStop = function () {
        if (FightSystem.getInstance().isFight() == true) {
            FightSystem.getInstance().addEndFightHandler(this._Stop, this, null);
        }
        else {
            this._Stop();
        }
    };
    Activity_ClubMap.prototype._Stop = function () {
        UnRegisterEvent(EventDefine.HERO_ENTER_MAP, this.onHeroEnterMap, this);
        UnRegisterEvent(EventDefine.COMBAT_BEGIN, this.onBattleBegin, this);
        UnRegisterEvent(EventDefine.COMBAT_END, this.onBattleEnd, this);
        PopUIShow();
        StateManager.getInstance().DeactiveSubState(state_type.LIVE_ACTIVITY_STATE);
        var wnd = WngMrg.getInstance().getWindow("MainFrame");
        wnd.doCommand("setHeadGroupVisible", true);
        this.removeCollectNpc();
        this.removeInstrusionNpc();
    };
    Activity_ClubMap.prototype.onBattleBegin = function () {
        this.coltNPC = null;
        this.coltNpcId = null;
        this.intrNpcId = null;
    };
    Activity_ClubMap.prototype.onBattleEnd = function () {
        this.initTask();
    };
    Activity_ClubMap.prototype.initTask = function () {
        this.initCollectTask();
        this.initInstrusionTask();
    };
    Activity_ClubMap.prototype.initCollectTask = function () {
        if (this.checkCollectComplete()) {
            return;
        }
        var npcInfo = {};
        var pos = this.getRandLocalPosition(GetHero().getCellX(), GetHero().getCellY());
        npcInfo["cellx"] = pos[0];
        npcInfo["celly"] = pos[1];
        npcInfo["dir"] = 3;
        npcInfo["entryId"] = CLUB_COLLECT_ID;
        this.coltNpcId = GenCharaterId();
        npcInfo["id"] = this.coltNpcId;
        npcInfo["name"] = "";
        npcInfo["param"] = {};
        npcInfo["taskInfo"] = {};
        this.coltNPC = ActorManager.getInstance().createNpc(npcInfo);
    };
    Activity_ClubMap.prototype.changeCollectNpc = function () {
        var pos = this.getRandLocalPosition(GetHero().getCellX(), GetHero().getCellY());
        var cellx = pos[0];
        var celly = pos[1];
        if (this.coltNPC) {
            this.coltNPC.setCellXY(cellx, celly);
        }
    };
    Activity_ClubMap.prototype.removeCollectNpc = function () {
        ActorManager.getInstance().deleteNpc(this.coltNpcId);
        this.coltNpcId = null;
        this.coltNPC = null;
    };
    Activity_ClubMap.prototype.initInstrusionTask = function () {
        if (this.checkInstrusionComplete()) {
            return;
        }
        var npcInfo = {};
        var pos = this.getRandLocalPosition(GetHero().getCellX(), GetHero().getCellY());
        npcInfo["cellx"] = pos[0];
        npcInfo["celly"] = pos[1];
        npcInfo["dir"] = 3;
        npcInfo["entryId"] = CLUB_INSTRUSION_ID;
        this.intrNpcId = GenCharaterId();
        npcInfo["id"] = this.intrNpcId;
        npcInfo["name"] = "";
        npcInfo["param"] = {};
        npcInfo["taskInfo"] = {};
        ActorManager.getInstance().createNpc(npcInfo);
    };
    Activity_ClubMap.prototype.removeInstrusionNpc = function () {
        ActorManager.getInstance().deleteNpc(this.intrNpcId);
        this.intrNpcId = null;
    };
    Activity_ClubMap.prototype.getRandLocalPosition = function (cellx, celly, scope) {
        scope = scope || 30;
        var RandomNUm = Math.ceil(Math.random() * scope * 2);
        var dx = RandomNUm - scope;
        var dy = RandomNUm - scope;
        var maxdeep = 30;
        var deep = 0;
        var wantX = cellx + dx;
        var wantY = celly + dy;
        while (SceneManager.getInstance().isBlock(wantX, wantY)) {
            var dx_1 = RandomNUm - scope;
            var dy_1 = RandomNUm - scope;
            wantX = cellx + dx_1;
            wantY = celly + dy_1;
            deep = deep + 1;
            if (deep >= maxdeep) {
                wantX = cellx;
                wantY = celly;
                break;
            }
        }
        return [wantX, wantY];
    };
    Activity_ClubMap.prototype.checkCollectComplete = function () {
        var recordList = getSaveRecord(opSaveRecordKey.facMapTaskFinishCount) || [];
        var coltTime = recordList[0] || 0;
        var coltLimit = GameConfig.FactionMapTaskConfig[1].maxCount;
        return coltTime == coltLimit;
    };
    Activity_ClubMap.prototype.checkInstrusionComplete = function () {
        var recordList = getSaveRecord(opSaveRecordKey.facMapTaskFinishCount) || [];
        var intrTime = recordList[1] || 0;
        var intrLimit = GameConfig.FactionMapTaskConfig[2].maxCount;
        return intrTime == intrLimit;
    };
    Activity_ClubMap.prototype.setExchangeData = function (array, count, time) {
        this.array = array;
        this.count = count;
        this.time = time;
    };
    Activity_ClubMap.prototype.getExchangeData = function () {
        var t = {};
        t.array = this.array;
        t.count = this.count;
        t.time = this.time;
        return t;
    };
    /////////////////////////////////////////////////////////////////
    //-进入活动关闭窗口
    Activity_ClubMap.prototype.onHeroEnterMap = function (index) {
        var mapId = MapSystem.getInstance().getMapId();
        if (mapId != 50100) {
            return;
        }
        this.initTask();
    };
    return Activity_ClubMap;
}(ActivityBase));
__reflect(Activity_ClubMap.prototype, "Activity_ClubMap");
//# sourceMappingURL=Activity_ClubMap.js.map