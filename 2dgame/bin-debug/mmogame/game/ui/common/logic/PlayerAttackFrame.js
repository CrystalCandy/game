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
/*
作者:
    liuziming
    
创建时间：
   2017.02.04(周六)

意图：
   混沌世界内攻击玩家
公共接口：
   
*/
var PlayerAttackFrame = (function (_super) {
    __extends(PlayerAttackFrame, _super);
    function PlayerAttackFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerAttackFrame.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.controlDataTable = {};
        this.timerList = {};
        this.playerId = -1;
        this.obj = null;
        this.callback = null;
    };
    PlayerAttackFrame.prototype.onLoad = function () {
        this.createFrame();
    };
    PlayerAttackFrame.prototype.onUnLoad = function () {
    };
    PlayerAttackFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = (true);
        this.refreshFrame();
    };
    PlayerAttackFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = (false);
        this.callback = null;
        this.obj = null;
        for (var _ in this.timerList) {
            var timer = this.timerList[_];
            KillTimer(timer);
        }
        this.timerList = {};
    };
    ////////////////////////////////////////////////////////////////////-
    PlayerAttackFrame.prototype.createFrame = function () {
        var width = 210, height = 120;
        UiUtil.setWH(this.mLayoutNode, width, height);
        UiUtil.setXY(this.mLayoutNode, 150, 200);
        this.mElemList = {};
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = "bg", _a["title"] = null, _a["font"] = null, _a["image"] = "ty_zhuangBeiBg00", _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["w"] = width, _a["h"] = height, _a["event_name"] = null, _a["fun_index"] = null, _a),
            (_b = {}, _b["index_type"] = eui.Image, _b["name"] = "player_kuang", _b["title"] = null, _b["font"] = "ht_24_cc_stroke", _b["image"] = "ty_pet_pinJieBg05", _b["color"] = gui.Color.white, _b["bAdapteWindow"] = true, _b["x"] = 20, _b["y"] = 0, _b["w"] = 77, _b["h"] = 77, _b["event_name"] = null, _b["fun_index"] = null, _b),
            (_c = {}, _c["index_type"] = eui.Image, _c["name"] = "player_icon", _c["parent"] = "player_kuang", _c["title"] = null, _c["font"] = "ht_24_cc_stroke", _c["image"] = "pet_3001", _c["color"] = gui.Color.white, _c["bAdapteWindow"] = true, _c["x"] = 0, _c["y"] = 0, _c["w"] = 77, _c["h"] = 77, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickHead, _c),
            (_d = {}, _d["index_type"] = eui.Label, _d["name"] = "player_name", _d["title"] = Localize_cns("TYPE_ACC_INFO"), _d["font"] = "ht_16_cc_stroke", _d["scale_image"] = "", _d["color"] = gui.Color.white, _d["x"] = 0, _d["y"] = 75, _d["w"] = 116, _d["h"] = 25, _d["event_name"] = null, _d["fun_index"] = null, _d["messageFlag"] = true, _d),
            (_e = {}, _e["index_type"] = eui.Label, _e["name"] = "player_level", _e["title"] = "Lv 24", _e["font"] = "ht_16_cc_stroke", _e["scale_image"] = "", _e["color"] = gui.Color.white, _e["x"] = 0, _e["y"] = 95, _e["w"] = 116, _e["h"] = 25, _e["event_name"] = null, _e["fun_index"] = null, _e["messageFlag"] = true, _e),
            (_f = {}, _f["index_type"] = gui.Button, _f["name"] = "attack", _f["title"] = Localize_cns("FIGHT_ATTACK_TITLE"), _f["font"] = "ht_20_cc_stroke", _f["image"] = "ty_tongYongBt07", _f["color"] = gui.Color.white, _f["x"] = 110, _f["y"] = 25, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onClickAttackBtn, _f),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        var _a, _b, _c, _d, _e, _f;
    };
    PlayerAttackFrame.prototype.refreshFrame = function () {
        var player = ActorManager.getInstance().getPlayer(this.playerId);
        TLog.Debug("this.playerId", this.playerId, player);
        if (player == null) {
            return this.hideWnd();
        }
        this.mElemList["attack"].enabled = (configRobber.mapId == MapSystem.getInstance().getMapId() || this.callback != null);
        this.playerInfo = player.getPropertyInfo();
        if (this.timerList["show"]) {
            KillTimer(this.timerList["show"]);
            delete this.timerList["show"];
        }
        this.timerList["show"] = SetTimer(this.showingTick, this, 5 * 1000, false);
        //this.mElemList["player_kuang"].source = (ProfessionSystem.getInstance().getProfessionQualityImage(this.playerInfo.vocation))
        this.mElemList["player_icon"].source = (GetProfessionIcon(this.playerInfo.vocation, this.playerInfo.sexId));
        this.mElemList["player_name"].text = (this.playerInfo.name);
        this.mElemList["player_level"].text = ("Lv." + this.playerInfo.level);
    };
    PlayerAttackFrame.prototype.showingTick = function (delay) {
        if (this.timerList["show"]) {
            KillTimer(this.timerList["show"]);
            delete this.timerList["show"];
        }
        this.hideWnd();
        //this.hideAction.run()
    };
    ////////////////////////////////////////////////////////////-响应函数//////////////////////////////////////////////////////////////////////
    PlayerAttackFrame.prototype.onClickAttackBtn = function (args) {
        if (this.obj && this.callback) {
            this.callback.call(this.obj, this.playerId, this.playerInfo);
        }
        else {
            // let activity = GetActivity(ActivityDefine.Robber)
            // activity.attackPlayer(this.playerId)
            // this.refreshFrame()
        }
    };
    PlayerAttackFrame.prototype.onClickHead = function (args) {
        var spacex = args.stageX;
        var spacey = args.stageY;
        var playerId = this.playerId;
        var wnd = WngMrg.getInstance().getWindow("MainPlayerFrame");
        wnd.showMainPlayerFrame(spacex, spacey, playerId);
    };
    ////////////////////////////////////////////////////////公共接口//////////////////////////////////////////////////-
    PlayerAttackFrame.prototype.showWithCallback = function (playerId, callback, obj) {
        this.playerId = playerId;
        this.obj = obj;
        this.callback = callback;
        if (this.isVisible() == false) {
            return this.showWnd();
        }
        else {
            return this.refreshFrame();
        }
    };
    return PlayerAttackFrame;
}(BaseWnd));
__reflect(PlayerAttackFrame.prototype, "PlayerAttackFrame");
//# sourceMappingURL=PlayerAttackFrame.js.map