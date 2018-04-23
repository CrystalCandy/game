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
var MainContentFrame = (function (_super) {
    __extends(MainContentFrame, _super);
    function MainContentFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainContentFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.wndList = {};
        this.mLayoutPaths = ["layouts/MainContentLayout.exml"];
    };
    MainContentFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreenRaw(true);
        this.initSkinElemList();
        this.mLayoutNode.touchEnabled = false;
        this.mLayoutNode.setLayer(0 /* Bottom */);
        var elemInfo = [
            (_a = {}, _a["name"] = "map_wnd", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onClickMapWnd, _a),
            (_b = {}, _b["name"] = "capture_btn", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onClickCapture, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["map_name"].setAlignFlag(gui.Flag.H_CENTER);
        this.mElemList["map_xy"].setAlignFlag(gui.Flag.H_CENTER);
        this.wndList["task"] = MainTaskWnd.newObj(this.mLayoutNode, this);
        this.wndList["preview"] = MainPreviewWnd.newObj(this.mLayoutNode, this); //yangguiming 暂时屏蔽
        this.wndList["fight"] = MainFightWnd.newObj(this.mLayoutNode, this);
        this.wndList["activity"] = MainActivityWnd.newObj(this.mLayoutNode, this);
        var group = this.mElemList["preview_wnd"];
        group.touchEnabled = false;
        RegisterEvent(EventDefine.COMBAT_BEGIN, this.onCombatBegin, this);
        RegisterEvent(EventDefine.COMBAT_END, this.onCombatEnd, this);
        var _a, _b;
    };
    // test(){
    // 	UnRegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.test, this)
    // }
    MainContentFrame.prototype.onUnLoad = function () {
        UnRegisterEvent(EventDefine.COMBAT_BEGIN, this.onCombatBegin, this);
        UnRegisterEvent(EventDefine.COMBAT_END, this.onCombatEnd, this);
    };
    MainContentFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.PLAYER_MOVE, this.refreshMapPos, this);
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this);
        // RegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.test, this)
        this.mLayoutNode.visible = true;
        this.mLayoutNode.moveToBack();
        this.wndList["task"].showWnd();
        this.wndList["preview"].showWnd();
        this.wndList["fight"].showWnd();
        this.wndList["activity"].showWnd();
        this.refreshFrame();
    };
    MainContentFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.PLAYER_MOVE, this.refreshMapPos, this);
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this);
        this.mLayoutNode.visible = false;
        this.wndList["task"].hideWnd();
        this.wndList["preview"].hideWnd();
        this.wndList["fight"].showWnd();
        this.wndList["activity"].hideWnd();
    };
    MainContentFrame.prototype.refreshFrame = function () {
        //捕捉按钮
        var record = checkNull(getSaveRecord(opSaveRecordKey.capturePet), []);
        if (!record[0]) {
            this.mElemList["capture_btn"].visible = false;
        }
        else {
            this.mElemList["capture_btn"].visible = true;
        }
    };
    //背包
    // onBeiBaoClick(args) {
    // 	ExecuteMainFrameFunction("beibao")
    // }
    // onDailyClick(args) {
    // 	ExecuteMainFrameFunction("richang")
    // }
    MainContentFrame.prototype.onClickMapWnd = function () {
        ExecuteMainFrameFunction("ditu");
    };
    MainContentFrame.prototype.onClickCapture = function (args) {
        RpcProxy.call("C2G_CreateBossFight", OrdinaryActivityIndex.CapturePet, 0);
    };
    MainContentFrame.prototype.onCombatBegin = function () {
        var _a = FightSystem.getInstance().getCurFightType(), fightType = _a[0], _ = _a[1];
        if (fightType == opFightResultType.PATROL) {
            this.showWnd();
        }
        else {
            this.hideWnd();
        }
    };
    MainContentFrame.prototype.onCombatEnd = function () {
        this.showWnd();
    };
    MainContentFrame.prototype.refreshMapPos = function (args) {
        var mapId = MapSystem.getInstance().getMapId();
        AddRdContent(this.mElemList["map_name"], "", "ht_24_cc_stroke", "white");
        for (var _ in GameConfig.MapEnterList) {
            var config = GameConfig.MapEnterList[_];
            if (config.inMapId == mapId) {
                AddRdContent(this.mElemList["map_name"], config.inMapName, "ht_24_cc_stroke", "white");
            }
        }
        var campId = CampaignSystem.getInstance().getCurOpenCampaign();
        if (campId) {
            AddRdContent(this.mElemList["map_xy"], GameConfig.CampaignConfig[campId].indexName, "ht_20_cc_stroke", "lime");
        }
        else {
            var target = args.actor;
            var x = target.getCellX();
            var y = target.getCellY();
            AddRdContent(this.mElemList["map_xy"], "[" + x + "," + y + "]", "ht_20_cc_stroke", "lime");
        }
    };
    return MainContentFrame;
}(BaseWnd));
__reflect(MainContentFrame.prototype, "MainContentFrame");
//# sourceMappingURL=MainContentFrame.js.map