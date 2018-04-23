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
var TianNvXianQiWindow = (function (_super) {
    __extends(TianNvXianQiWindow, _super);
    function TianNvXianQiWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TianNvXianQiWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.type = cellOptionsIndex.TianNvXianQi;
    };
    TianNvXianQiWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        this.Player = this.mParentWnd.Player;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_property_dan", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onPropertyClick, _a),
            (_b = {}, _b["name"] = "btn_search", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onSearchClick, _b),
            (_c = {}, _c["name"] = "btn_left", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onLeftClick, _c),
            (_d = {}, _d["name"] = "btn_right", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onRightClick, _d),
            (_e = {}, _e["name"] = "btn_unreal", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onUnrealClick, _e),
            (_f = {}, _f["name"] = "btn_upgrade", _f["title"] = null, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onUpClick, _f),
            (_g = {}, _g["name"] = "btn_auto_upgrade", _g["title"] = null, _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = this.onAutoUpClick, _g),
            (_h = {}, _h["name"] = "btn_equip", _h["title"] = null, _h["event_name"] = egret.TouchEvent.TOUCH_TAP, _h["fun_index"] = this.onEquipClick, _h),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.select = 0;
        this.mElemList["rd_add_force"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["stage_txt"].textColor = gui.Color.ublack;
        var _a, _b, _c, _d, _e, _f, _g, _h;
    };
    TianNvXianQiWindow.prototype.onUnLoad = function () {
        if (this.Player) {
            var actorview = this.mElemList["actor_view"];
            this.Player.leaveViewer(actorview);
            this.Player.deleteObj();
            this.Player = null;
        }
    };
    TianNvXianQiWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.PET_FUN_INFO_REFRESH, this.onRefresh, this);
        RegisterEvent(EventDefine.PET_FUN_INFO_UPDATE, this.onRefresh, this);
        this.mElemList["group_tiannv"].visible = true;
        this.mElemList["label_wndName"].text = Localize_cns("TIANNV_TITLE_TXT2");
        this.mElemList["TianNv_checkbox"].visible = false;
        this.mElemList["TianNvXianQi_checkbox"].visible = true;
        this.mElemList["TianNvHuaNian_checkbox"].visible = false;
        this.mElemList["TianNvLingQi_checkbox"].visible = false;
        this.onRefresh();
    };
    TianNvXianQiWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.PET_FUN_INFO_REFRESH, this.onRefresh, this);
        UnRegisterEvent(EventDefine.PET_FUN_INFO_UPDATE, this.onRefresh, this);
        this.mElemList["group_tiannv"].visible = false;
    };
    TianNvXianQiWindow.prototype.onRefresh = function () {
        this.mElemList["btn_skin"].visible = false;
        this.recvList = FunSystem.getInstance().getFunInfoWithType(this.type);
        if (size_t(this.recvList) == 0) {
            return;
        }
        var arr = this.recvList;
        this.list = GameConfig.FunShapeConfig[cellOptionsName[this.type - 1]];
        var stage = arr["stage"];
        var exp = arr["stageexp"];
        this.endIndex = stage + 1;
        this.unreal = arr["curshape"];
        this.select = stage;
        this.onRefreshTop();
        //本级经验 现在经验
        FunUITools.updateExpProgress(this.type, this);
        //消耗
        FunUITools.updateNeedMaterial(this.type, this);
        //更新战力
        FunUITools.updateForceNum(this.type, this);
        //
        this.onInitItemBox();
        var templist = FunUITools.checkWearEquip(this.type, this);
        if (size_t(templist) == 0) {
            this.mElemList["btn_equip"].visible = false;
        }
        else {
            this.mElemList["btn_equip"].visible = true;
        }
        FunUITools.upgradeAutoFunctionCheck(this.type, this, "btn_auto_upgrade", "btn_upgrade");
    };
    TianNvXianQiWindow.prototype.onRefreshTop = function () {
        if (this.select == 0) {
            this.select = 1;
        }
        var arr = this.list;
        if (size_t(arr) == 0)
            return;
        var index = this.select;
        if (arr[this.select]) {
            //更新名字，阶数
            FunUITools.updateActorStage(this.type, this, this.select);
        }
        this.mElemList["group_effect"].visible = false;
        this.mElemList["turn_icon"].visible = false;
        this.mElemList["btn_unreal"].visible = false;
        this.mElemList["btn_right"].enabled = true;
        this.mElemList["btn_left"].enabled = true;
        if (index == this.unreal) {
            this.mElemList["turn_icon"].visible = true;
        }
        else if (index == this.endIndex) {
            this.mElemList["group_effect"].visible = true;
            this.mElemList["btn_right"].enabled = false;
            FunUITools.updateAddForceNum(this.type, this);
        }
        else {
            this.mElemList["btn_unreal"].visible = true;
        }
        if (this.select == 1) {
            this.mElemList["btn_left"].enabled = true;
            //	}else if(this.select == this.endIndex){		
        }
        this.mElemList["btn_left"].visible = true;
        this.mElemList["btn_right"].visible = true;
        if (this.Player == null) {
            this.Player = Player.newObj();
            this.mParentWnd.Player = this.Player;
        }
        //更新actorview
        FunUITools.updateActorModel(this.type, this, this.Player, this.select);
    };
    TianNvXianQiWindow.prototype.onInitItemBox = function () {
        //  FunUITools.updateEquipWnd(this.type, this)
        //更新技能 
        var typelist = [
            //  cellOptionsIndex.TianNv ,
            cellOptionsIndex.TianNvXianQi,
        ];
        this.mElemList["fun_skill_wnd1"].visible = false;
        this.mElemList["fun_skill_wnd2"].visible = true;
        FunUITools.updateTianNvSkillWnd(typelist, this, this.mElemList["fun_skill_wnd2"], "lingqiskill");
        for (var i = 0; i < size_t(typelist); i++) {
            this.mElemList["lingqiskill" + i].setClickCallBack(this.onShowFunFrame, this, [typelist, i]);
        }
    };
    TianNvXianQiWindow.prototype.onShowFunFrame = function (list) {
        var typelist = [
            cellOptionsIndex.TianNv,
            cellOptionsIndex.TianNvXianQi,
            cellOptionsIndex.TianNvHuaNian,
            cellOptionsIndex.TianNvLingQi
        ];
        var wnd = WngMrg.getInstance().getWindow("FunSkillFrame");
        wnd.showWithTypeListAndIndex(typelist, 1);
    };
    TianNvXianQiWindow.prototype.onUnrealClick = function () {
        if (this.mParentWnd.tabWndList.getTabIndex() == 1) {
            //this.unreal = this.select;
            //this.onRefreshTop();
            FunUITools.sendTurnRequest(this.type, this.select);
        }
    };
    TianNvXianQiWindow.prototype.onRightClick = function () {
        if (this.mParentWnd.tabWndList.getTabIndex() == 1) {
            if (this.select == this.endIndex || this.select == -1)
                return;
            this.select = this.select + 1;
            this.onRefreshTop();
        }
    };
    TianNvXianQiWindow.prototype.onLeftClick = function () {
        if (this.mParentWnd.tabWndList.getTabIndex() == 1) {
            if (this.select == 1 || this.select == -1)
                return;
            this.select = this.select - 1;
            this.onRefreshTop();
        }
    };
    TianNvXianQiWindow.prototype.onPropertyClick = function () {
        if (this.mParentWnd.tabWndList.getTabIndex() == 1) {
            FunUITools.openPropertyFrame(this.type);
        }
    };
    TianNvXianQiWindow.prototype.onUpClick = function () {
        if (this.mParentWnd.tabWndList.getTabIndex() == 1) {
            FunUITools.upgradeFunction(this.type, this);
        }
    };
    TianNvXianQiWindow.prototype.onAutoUpClick = function () {
        if (this.mParentWnd.tabWndList.getTabIndex() == 1) {
            FunUITools.upgradeAutoFunction(this.type, this, "btn_auto_upgrade", "btn_upgrade");
        }
    };
    TianNvXianQiWindow.prototype.onEquipClick = function () {
        if (this.mParentWnd.tabWndList.getTabIndex() == 1) {
            var templist = FunUITools.checkWearEquip(this.type, this);
            FunUITools.oneKeyWearEquip(this.type, this, templist);
        }
    };
    TianNvXianQiWindow.prototype.onSearchClick = function () {
        if (this.mParentWnd.tabWndList.getTabIndex() == 1) {
            FunUITools.openFunPropertyFrame(this.type, this.select);
        }
    };
    return TianNvXianQiWindow;
}(BaseCtrlWnd));
__reflect(TianNvXianQiWindow.prototype, "TianNvXianQiWindow");
//# sourceMappingURL=TianNvXianQiWindow.js.map