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
var RoleMountsWindow = (function (_super) {
    __extends(RoleMountsWindow, _super);
    function RoleMountsWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoleMountsWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.type = cellOptionsIndex.HeroRide;
    };
    RoleMountsWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        this.Player = this.mParentWnd.Player;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_M_skin", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onSkinClick, _a),
            (_b = {}, _b["name"] = "btn_M_search", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onSearchClick, _b),
            (_c = {}, _c["name"] = "btn_property_dan", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onPropertyClick, _c),
            (_d = {}, _d["name"] = "btn_MleftC", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onLeftClick, _d),
            (_e = {}, _e["name"] = "btn_MrightC", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onRightClick, _e),
            (_f = {}, _f["name"] = "btn_M_unreal", _f["title"] = null, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onUnrealClick, _f),
            (_g = {}, _g["name"] = "btn_upgrade", _g["title"] = null, _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = this.onUpClick, _g),
            (_h = {}, _h["name"] = "btn_auto_upgrade", _h["title"] = null, _h["event_name"] = egret.TouchEvent.TOUCH_TAP, _h["fun_index"] = this.onAutoUpClick, _h),
            (_j = {}, _j["name"] = "btn_equip", _j["title"] = null, _j["event_name"] = egret.TouchEvent.TOUCH_TAP, _j["fun_index"] = this.onEquipClick, _j),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.select = 0;
        this.mElemList["rd_add_force"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["name_txt"].textColor = gui.Color.ublack;
        this.mElemList["stage_txt"].textColor = gui.Color.ublack;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    };
    RoleMountsWindow.prototype.onUnLoad = function () {
        if (this.Player) {
            var actorview = this.mElemList["actor_view"];
            this.Player.leaveViewer(actorview);
            this.Player.deleteObj();
            this.Player = null;
        }
    };
    RoleMountsWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.PET_FUN_INFO_REFRESH, this.onRefresh, this);
        RegisterEvent(EventDefine.PET_FUN_INFO_UPDATE, this.onRefresh, this);
        this.mElemList["group_mounts"].visible = true;
        this.mElemList["label_wndName"].text = Localize_cns("ROLE_TXT13");
        this.mElemList["HeroRide_checkbox"].visible = false;
        this.mElemList["HeroWing_checkbox"].visible = true;
        this.mElemList["actor_view"].visible = true;
        this.mElemList["image_skill"].source = "zq_text01";
        this.mElemList["image_equip"].source = "zq_text02";
        this.onRefresh();
    };
    RoleMountsWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.PET_FUN_INFO_REFRESH, this.onRefresh, this);
        UnRegisterEvent(EventDefine.PET_FUN_INFO_UPDATE, this.onRefresh, this);
        this.mElemList["group_mounts"].visible = false;
        this.mElemList["actor_view"].visible = false;
    };
    RoleMountsWindow.prototype.onRefresh = function () {
        this.recvList = FunSystem.getInstance().getFunInfoWithType(this.type);
        if (size_t(this.recvList) == 0)
            return;
        var arr = this.recvList;
        this.list = GameConfig.FunShapeConfig["HeroWing"];
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
        //装备
        var equiplist = FunUITools.checkWearEquip(this.type, this);
        if (size_t(equiplist) == 0) {
            this.mElemList["btn_equip"].visible = false;
        }
        else {
            this.mElemList["btn_equip"].visible = true;
        }
        //技能装备
        this.onInitItemBox();
        FunUITools.upgradeAutoFunctionCheck(this.type, this, "btn_auto_upgrade", "btn_upgrade");
    };
    RoleMountsWindow.prototype.onRefreshTop = function () {
        if (this.select == 0) {
            this.select = 1;
        }
        var arr = this.list;
        if (size_t(arr) == 0)
            return;
        var index = this.select;
        if (arr[this.select]) {
            //更新名字，阶数
            FunUITools.updateActorName(this.type, this, this.select);
            FunUITools.updateActorStage(this.type, this, this.select);
        }
        this.mElemList["group_M_effect"].visible = false;
        this.mElemList["turn_icon"].visible = false;
        this.mElemList["btn_M_unreal"].visible = false;
        this.mElemList["btn_MrightC"].enabled = true;
        this.mElemList["btn_MleftC"].enabled = true;
        if (index == this.unreal) {
            this.mElemList["turn_icon"].visible = true;
        }
        else if (index == this.endIndex) {
            this.mElemList["group_M_effect"].visible = true;
            this.mElemList["btn_MrightC"].enabled = false;
            FunUITools.updateAddForceNum(this.type, this);
        }
        else {
            this.mElemList["btn_M_unreal"].visible = true;
        }
        if (this.select == 1) {
            this.mElemList["btn_MleftC"].enabled = false;
        }
        if (this.Player == null) {
            this.Player = Player.newObj();
            this.mParentWnd.Player = this.Player;
        }
        //更新actorview
        FunUITools.updateActorModel(this.type, this, this.Player, this.select, 1, 3);
    };
    RoleMountsWindow.prototype.onInitItemBox = function () {
        FunUITools.updateEquipWnd(this.type, this);
        //更新技能 
        FunUITools.updateSkillWnd(this.type, this);
    };
    RoleMountsWindow.prototype.onSkillClick = function (event) {
        var name = event.target.name;
        var index = name.replace(/[^0-9]/ig, "");
    };
    RoleMountsWindow.prototype.onSkinClick = function () {
        if (this.mParentWnd.tabWndList.getTabIndex() == 2) {
            FunUITools.openSkinsFrame(this.type);
        }
    };
    RoleMountsWindow.prototype.onSearchClick = function () {
        if (this.mParentWnd.tabWndList.getTabIndex() == 2) {
            FunUITools.openFunPropertyFrame(this.type, this.select);
        }
    };
    RoleMountsWindow.prototype.onUnrealClick = function () {
        if (this.mParentWnd.tabWndList.getTabIndex() == 2) {
            //this.unreal = this.select;
            //this.onRefreshTop();
            FunUITools.sendTurnRequest(this.type, this.select);
        }
    };
    RoleMountsWindow.prototype.onRightClick = function () {
        if (this.mParentWnd.tabWndList.getTabIndex() == 2) {
            if (this.select == this.endIndex || this.select == -1)
                return;
            this.select = this.select + 1;
            this.onRefreshTop();
        }
    };
    RoleMountsWindow.prototype.onLeftClick = function () {
        if (this.mParentWnd.tabWndList.getTabIndex() == 2) {
            if (this.select == 1 || this.select == -1)
                return;
            this.select = this.select - 1;
            this.onRefreshTop();
        }
    };
    RoleMountsWindow.prototype.onPropertyClick = function () {
        if (this.mParentWnd.tabWndList.getTabIndex() == 2) {
            FunUITools.openPropertyFrame(this.type);
        }
    };
    RoleMountsWindow.prototype.onUpClick = function () {
        if (this.mParentWnd.tabWndList.getTabIndex() == 2) {
            FunUITools.upgradeFunction(this.type, this);
        }
    };
    RoleMountsWindow.prototype.onAutoUpClick = function () {
        if (this.mParentWnd.tabWndList.getTabIndex() == 2) {
            FunUITools.upgradeAutoFunction(this.type, this, "btn_auto_upgrade", "btn_upgrade");
        }
    };
    RoleMountsWindow.prototype.onEquipClick = function () {
        if (this.mParentWnd.tabWndList.getTabIndex() == 2) {
            var equiplist = FunUITools.checkWearEquip(this.type, this);
            if (size_t(equiplist) == 0)
                return;
            FunUITools.oneKeyWearEquip(this.type, this, equiplist);
        }
    };
    return RoleMountsWindow;
}(BaseCtrlWnd));
__reflect(RoleMountsWindow.prototype, "RoleMountsWindow");
//# sourceMappingURL=RoleMountsWindow.js.map