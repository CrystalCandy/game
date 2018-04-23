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
var MainFrame = (function (_super) {
    __extends(MainFrame, _super);
    function MainFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/MainLayout.exml"];
    };
    MainFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreenRaw(true);
        this.initSkinElemList();
        this.mLayoutNode.touchEnabled = false;
        //this.mLayoutNode.setLayer(gui.GuiLayer.Bottom)
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_playerDetails", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onPlayerDetailsClick, _a),
            (_b = {}, _b["name"] = "vip_btn", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onClickVip, _b),
            (_c = {}, _c["name"] = "rank_btn", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickRank, _c),
            (_d = {}, _d["name"] = "copper_btn", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onClickCopper, _d),
            (_e = {}, _e["name"] = "silver_btn", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onClickSilver, _e),
            (_f = {}, _f["name"] = "gold_btn", _f["title"] = null, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onClickGold, _f),
            (_g = {}, _g["name"] = "role_exp", _g["messageFlag"] = true, _g),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mChatViewr = UIChatViewer.newObj(this, this.mLayoutNode, "chatviewer", 0, 0, this.mElemList["chat_wnd"]);
        //this.mCombatWnd = MainCombatWindow.newObj(this.mLayoutNode, this)
        this.mElemList["name_rd"].setAlignFlag(gui.Flag.LEFT_CENTER);
        var radioGroup = new eui.RadioButtonGroup();
        for (var i = 0; i < 6; i++) {
            var elem = this.mElemList["tab" + i];
            elem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTab, this);
            elem.group = radioGroup;
            elem.value = i;
        }
        //注册事件
        var tab_btn_list = {
            tab0: { keyfunc: null, callback: null },
            tab1: { keyfunc: "zhucheng", funcname: "MainCityFrame" },
            tab2: { keyfunc: "jiaose", funcname: "RoleFrame" },
            tab3: { keyfunc: "duanzao", funcname: "ForgeFrame" },
            tab4: { keyfunc: "xianlv", funcname: "XianLvFrame", callback: this.onXianLvClick },
            tab5: { keyfunc: "chongwu", funcname: "PetFrame" },
        };
        this.tab_btn_list = tab_btn_list;
        //选中第一个
        this.mElemList["tab0"].selected = true;
        var _a, _b, _c, _d, _e, _f, _g;
        //this.refreshCombat()
    };
    MainFrame.prototype.onUnLoad = function () {
    };
    MainFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this);
        //RegisterEvent(EventDefine.COMBAT_BEGIN, this.onCombatBegin, this)
        this.mChatViewr.setVisible(true);
        this.mLayoutNode.visible = true;
        this.mLayoutNode.moveToBack();
        if (GAME_MODE == GAME_NORMAL) {
            this.refreshFrame();
        }
    };
    MainFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this);
        //UnRegisterEvent(EventDefine.COMBAT_BEGIN, this.onCombatBegin, this)
        this.mChatViewr.setVisible(false);
        this.mLayoutNode.visible = false;
    };
    MainFrame.prototype.refreshFrame = function () {
        var heroInfo = GetHeroPropertyInfo();
        if (heroInfo == null)
            return;
        //更新coin
        this.mElemList["copper_txt"].text = heroInfo.funds;
        this.mElemList["silver_txt"].text = heroInfo.bindGold;
        this.mElemList["gold_txt"].text = heroInfo.gold;
        //更新头像window
        this.mElemList["btn_playerDetails"].source = GetProfessionIcon(heroInfo.vocation, heroInfo.sexId);
        AddRdContent(this.mElemList["name_rd"], "Lv." + heroInfo.level + "#space_10" + heroInfo.name, "ht_20_cc", "ublack");
        var force = GetHeroProperty("force") || 0;
        this.mElemList["force_batch"].beginDraw();
        this.mElemList["force_batch"].drawNumberString("zhanLi_", force, 0, 0, -3);
        this.mElemList["force_batch"].endDraw();
        var vipBatch = this.mElemList["vip_batch"];
        var offx = (1 - heroInfo.VIP_level.toString().length) * 8;
        vipBatch.beginDraw();
        vipBatch.drawNumberString("vip_", heroInfo.VIP_level, offx, 0);
        vipBatch.endDraw();
        //更新经验
        var limitExp = RoleSystem.getInstance().getLevelupExp();
        UiUtil.updateProgress(this.mElemList["role_exp"], heroInfo.exp, limitExp, null, 1000);
    };
    // refreshCombat() {
    // 	let combatWnd = WngMrg.getInstance().getWindow("FightFrame")
    // 	if (!combatWnd.isVisible()) {
    // 		combatWnd.showWnd()
    // 		//this.mCityWnd.hideWnd()
    // 		WngMrg.getInstance().hideWindow("MainCityFrame")
    // 	}
    // }
    // refreshCity() {
    // 	let cityWnd = WngMrg.getInstance().getWindow("MainCityFrame")
    // 	let combatWnd = WngMrg.getInstance().getWindow("FightFrame")
    // 	if (cityWnd.isVisible()) {
    // 		this.refreshCombat()
    // 	} else {
    // 		combatWnd.hideWnd()
    // 		cityWnd.showWnd()
    // 	}
    // }
    MainFrame.prototype.hideRegistWnd = function (name) {
        // if (MainAutoHideUI[name] && WngMrg.getInstance().isVisible(name)) {
        // 	return true
        // }
        var isVisible = WngMrg.getInstance().isVisible(name);
        for (var registname in MainAutoHideUI) {
            WngMrg.getInstance().hideWindow(registname);
        }
        return isVisible;
    };
    // onCombatBegin(args) {
    // 	if (args.fightType != opFightResultType.PATROL) {
    // 		this.refreshCombat()
    // 	}
    // }
    /////////////////////////响应事件//////////////////////////
    MainFrame.prototype.onClickTab = function (event) {
        var target = event.target;
        var v = this.tab_btn_list[target.name];
        if (this.hideRegistWnd(v.funcname))
            return;
        if (v == null) {
            TLog.Error("onClickMoreSubBtn %s", target.name);
            return;
        }
        if (v.callback) {
            v.callback.call(this, event);
            return;
        }
        if (ExecuteMainFrameFunction(v.keyfunc)) {
        }
    };
    MainFrame.prototype.onClickCopper = function (args) {
        var wnd = WngMrg.getInstance().getWindow("MoneyChargeFrame");
        wnd.showWnd();
    };
    MainFrame.prototype.onClickSilver = function (args) {
    };
    MainFrame.prototype.onClickGold = function (args) {
        ExecuteMainFrameFunction("chongzhi");
    };
    //玩家详情
    MainFrame.prototype.onPlayerDetailsClick = function (args) {
        ExecuteMainFrameFunction("wanjia");
    };
    MainFrame.prototype.onXianLvClick = function () {
        var checkList = CheckMainFrameFunction(GuideFuncDefine.FIELD_FUNC_TIANNV);
        if (checkList[0] == true) {
            var wnd = WngMrg.getInstance().getWindow("CommonOpenTipsFrame");
            if (wnd.isVisible() == true) {
                wnd.hideWnd();
                return;
            }
            wnd.onShowWnd(4, 350, 827);
            return;
        }
        ExecuteMainFrameFunction("xianlv");
    };
    MainFrame.prototype.onClickVip = function (args) {
        ExecuteMainFrameFunction("VIP");
    };
    MainFrame.prototype.onClickRank = function (args) {
        ExecuteMainFrameFunction("paihangbang");
    };
    ///////////////////////////////////////////////////////
    MainFrame.prototype.getDotTipsArgsImp = function (checkParam) {
    };
    ///////////////////////////////////////////////////////
    MainFrame.prototype.setHeadGroupVisible = function (b) {
        this.mElemList["head_group"].visible = b;
        this.mElemList["coin_group"].visible = b;
    };
    /////////////////////////////////////////////
    MainFrame.prototype.setChatViewerVisible = function (visible) {
        this.mChatViewr.setVisible(visible);
    };
    return MainFrame;
}(BaseWnd));
__reflect(MainFrame.prototype, "MainFrame");
//# sourceMappingURL=MainFrame.js.map