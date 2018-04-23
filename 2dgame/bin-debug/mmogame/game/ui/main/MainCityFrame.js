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
var MainCityFrame = (function (_super) {
    __extends(MainCityFrame, _super);
    function MainCityFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainCityFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/MainCityLayout.exml"];
    };
    MainCityFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        this.mLayoutNode.setLayer(0 /* Bottom */);
        var elemInfo = [
            (_a = {}, _a["name"] = "club_btn", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onClubClick, _a),
            (_b = {}, _b["name"] = "champion_btn", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onChampionClick, _b),
            (_c = {}, _c["name"] = "boss_btn", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickBoss, _c),
            (_d = {}, _d["name"] = "activity_btn", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onActivityClick, _d),
            (_e = {}, _e["name"] = "fuben_btn", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onFubenClick, _e),
            (_f = {}, _f["name"] = "btn_yuanbao", _f["title"] = null, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onYuanBaoClick, _f),
            (_g = {}, _g["name"] = "btn_equip", _g["title"] = null, _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = this.onEquipClick, _g),
            (_h = {}, _h["name"] = "btn_pet", _h["title"] = null, _h["event_name"] = egret.TouchEvent.TOUCH_TAP, _h["fun_index"] = this.onPetClick, _h),
            (_j = {}, _j["name"] = "btn_jingji", _j["title"] = null, _j["event_name"] = egret.TouchEvent.TOUCH_TAP, _j["fun_index"] = this.onJingJiClick, _j),
            (_k = {}, _k["name"] = "btn_tianxian", _k["title"] = null, _k["event_name"] = egret.TouchEvent.TOUCH_TAP, _k["fun_index"] = this.onTianXianClick, _k),
            (_l = {}, _l["name"] = "btn_marry", _l["title"] = null, _l["event_name"] = egret.TouchEvent.TOUCH_TAP, _l["fun_index"] = this.onMarryClick, _l),
            (_m = {}, _m["name"] = "btn_suit", _m["title"] = null, _m["event_name"] = egret.TouchEvent.TOUCH_TAP, _m["fun_index"] = this.onSuitClick, _m),
            (_o = {}, _o["name"] = "btn_friends", _o["title"] = null, _o["event_name"] = egret.TouchEvent.TOUCH_TAP, _o["fun_index"] = this.onFriendsClick, _o),
            (_p = {}, _p["name"] = "cross_btn", _p["title"] = null, _p["event_name"] = egret.TouchEvent.TOUCH_TAP, _p["fun_index"] = this.onCrossClick, _p),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    };
    MainCityFrame.prototype.onUnLoad = function () {
    };
    MainCityFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.PAY_ACTIVITY_LIST, this.refreshFrame, this);
        this.mLayoutNode.visible = true;
        var wnd = WngMrg.getInstance().getWindow("MainFrame");
        if (wnd.isVisible() == true) {
            wnd.setChatViewerVisible(false);
        }
        this.refreshFrame();
    };
    MainCityFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.PAY_ACTIVITY_LIST, this.refreshFrame, this);
        this.mLayoutNode.visible = false;
        var wnd = WngMrg.getInstance().getWindow("MainFrame");
        if (wnd.mLayoutNode.visible == true) {
            wnd.setChatViewerVisible(true);
        }
    };
    MainCityFrame.prototype.refreshFrame = function () {
        var parentGroup = this.mElemList["group_actList"];
        parentGroup.removeChildren();
        this.controlData = {};
        var uiElemList = [];
        var uiConfigList = GetOpenActivityUiConfig("MainCity");
        for (var _i = 0, uiConfigList_1 = uiConfigList; _i < uiConfigList_1.length; _i++) {
            var config = uiConfigList_1[_i];
            var elem = (_a = {}, _a["index_type"] = gui.Button, _a["name"] = "dynamicButotn" + config.index, _a["font"] = null, _a["image"] = config.image, _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onClickActivityButton, _a);
            uiElemList.push(elem);
            this.controlData["dynamicButotn" + config.index] = config;
        }
        UiUtil.createElem(uiElemList, this.mLayoutNode, this.mElemList, this, parentGroup);
        var _a;
    };
    MainCityFrame.prototype.onClubClick = function () {
        ExecuteMainFrameFunction("gonghui");
    };
    MainCityFrame.prototype.onChampionClick = function () {
        ExecuteMainFrameFunction("jingjichang");
    };
    MainCityFrame.prototype.onClickBoss = function () {
        WngMrg.getInstance().showWindow("BossMainFrame");
    };
    MainCityFrame.prototype.onActivityClick = function () {
        ExecuteMainFrameFunction("huodong");
    };
    MainCityFrame.prototype.onFubenClick = function () {
        ExecuteMainFrameFunction("fuben");
    };
    ///Bottom
    MainCityFrame.prototype.onYuanBaoClick = function () {
        ExecuteMainFrameFunction("yuanbaoshangdian");
    };
    MainCityFrame.prototype.onEquipClick = function () {
        ExecuteMainFrameFunction("zhuangbeishangdian");
    };
    MainCityFrame.prototype.onPetClick = function () {
        ExecuteMainFrameFunction("chongwushangdian");
    };
    MainCityFrame.prototype.onJingJiClick = function () {
        ExecuteMainFrameFunction("jingjishangdian");
    };
    MainCityFrame.prototype.onTianXianClick = function () {
        ExecuteMainFrameFunction("tianxian");
    };
    //三生三世
    MainCityFrame.prototype.onMarryClick = function () {
        WngMrg.getInstance().showWindow("SanShengSanShiFrame");
        //	ExecuteMainFrameFunction("shouchong")
    };
    MainCityFrame.prototype.onSuitClick = function () {
        //   ExecuteMainFrameFunction("touzi")
    };
    MainCityFrame.prototype.onFriendsClick = function () {
        ExecuteMainFrameFunction("haoyou");
    };
    MainCityFrame.prototype.onCrossClick = function () {
        ExecuteMainFrameFunction("global");
    };
    MainCityFrame.prototype.onClickActivityButton = function (args) {
        var name = args.target.name;
        var config = this.controlData[name];
        ExecuteActivityIndex(config.index);
    };
    return MainCityFrame;
}(BaseWnd));
__reflect(MainCityFrame.prototype, "MainCityFrame");
//# sourceMappingURL=MainCityFrame.js.map