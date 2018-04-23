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
var TianXian_ArtifactWnd = (function (_super) {
    __extends(TianXian_ArtifactWnd, _super);
    function TianXian_ArtifactWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TianXian_ArtifactWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.type = cellOptionsIndex.TianXianWeapon;
    };
    TianXian_ArtifactWnd.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        this.Player = this.mParentWnd.Player;
        this.actor = this.mParentWnd.actor;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_skin", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onSkinClick, _a),
            (_b = {}, _b["name"] = "btn_property_dan", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onPropertyClick, _b),
            (_c = {}, _c["name"] = "btn_search", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onSearchClick, _c),
            (_d = {}, _d["name"] = "btn_left", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onLeftClick, _d),
            (_e = {}, _e["name"] = "btn_right", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onRightClick, _e),
            (_f = {}, _f["name"] = "btn_unreal", _f["title"] = null, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onUnrealClick, _f),
            (_g = {}, _g["name"] = "btn_upgrade", _g["title"] = null, _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = this.onUpClick, _g),
            (_h = {}, _h["name"] = "btn_auto_upgrade", _h["title"] = null, _h["event_name"] = egret.TouchEvent.TOUCH_TAP, _h["fun_index"] = this.onAutoUpClick, _h),
            (_j = {}, _j["name"] = "btn_equip", _j["title"] = null, _j["event_name"] = egret.TouchEvent.TOUCH_TAP, _j["fun_index"] = this.onEquipClick, _j),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.select = 0;
        this.mElemList["material_rd"].setAlignFlag(gui.Flag.LEFT_BOTTOM);
        this.mElemList["rd_add_force"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["name_txt"].textColor = gui.Color.ublack;
        this.mElemList["stage_txt"].textColor = gui.Color.ublack;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    };
    TianXian_ArtifactWnd.prototype.onUnLoad = function () {
        if (this.Player) {
            var actorview = this.mElemList["actor_view"];
            this.Player.leaveViewer(actorview);
            this.Player.deleteObj();
            this.Player = null;
        }
        var actorView = this.actor;
        actorView.clearView();
    };
    TianXian_ArtifactWnd.prototype.onShow = function () {
        RegisterEvent(EventDefine.PET_FUN_INFO_REFRESH, this.onRefresh, this);
        RegisterEvent(EventDefine.PET_FUN_INFO_UPDATE, this.onRefresh, this);
        this.mElemList["fairy_group"].visible = true;
        this.mElemList["title"].text = Localize_cns("TianXianWeapon");
        this.mElemList["TianXian_checkbox"].visible = true;
        this.mElemList["TianXianWeapon_checkbox"].visible = false;
        this.mElemList["image_skill"].source = "tx_text03";
        this.mElemList["image_equip"].source = "tx_text04";
        this.onRefresh();
    };
    TianXian_ArtifactWnd.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.PET_FUN_INFO_REFRESH, this.onRefresh, this);
        UnRegisterEvent(EventDefine.PET_FUN_INFO_UPDATE, this.onRefresh, this);
        this.mElemList["fairy_group"].visible = false;
    };
    TianXian_ArtifactWnd.prototype.onRefresh = function () {
        this.recvList = FunSystem.getInstance().getFunInfoWithType(this.type);
        if (size_t(this.recvList) == 0)
            return;
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
        //装备
        var templist = FunUITools.checkWearEquip(this.type, this);
        if (size_t(templist) == 0) {
            this.mElemList["btn_equip"].visible = false;
        }
        else {
            this.mElemList["btn_equip"].visible = true;
        }
        //
        this.onInitItemBox();
        FunUITools.upgradeAutoFunctionCheck(this.type, this, "btn_auto_upgrade", "btn_upgrade");
    };
    TianXian_ArtifactWnd.prototype.onRefreshTop = function () {
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
        this.mElemList["group_effect"].visible = false;
        this.mElemList["turn_icon"].visible = false;
        this.mElemList["btn_unreal"].visible = false;
        this.mElemList["btn_right"].enabled = true;
        this.mElemList["btn_left"].enabled = true;
        UiUtil.grayComponent(this.mElemList["preview_pic"], false);
        if (index == this.unreal) {
            this.mElemList["turn_icon"].visible = true;
        }
        else if (index == this.endIndex) {
            this.mElemList["group_effect"].visible = true;
            this.mElemList["btn_right"].enabled = false;
            UiUtil.grayComponent(this.mElemList["preview_pic"], true);
            FunUITools.updateAddForceNum(this.type, this);
        }
        else {
            this.mElemList["btn_unreal"].visible = true;
        }
        if (this.select == 1) {
            this.mElemList["btn_left"].enabled = false;
        }
        if (this.Player == null) {
            this.Player = Player.newObj();
            this.mParentWnd.Player = this.Player;
        }
        //更新actorview
        //FunUITools.updateActorModel(this.type, this, this.Player, this.select)
        this.mElemList["actor_view"].visible = false;
        var playerInfo = GetHeroPropertyInfo();
        var modelList = {
            rideShapeId: playerInfo.rideShapeId,
            wingShapeId: playerInfo.wingShapeId,
            weaponShapeId: this.list[this.select].Shape
        };
        this.actor.updateByPlayerSomeInfo(playerInfo, modelList);
    };
    TianXian_ArtifactWnd.prototype.onInitItemBox = function () {
        FunUITools.updateEquipWnd(this.type, this);
        //更新技能 
        FunUITools.updateSkillWnd(this.type, this);
    };
    TianXian_ArtifactWnd.prototype.onUnrealClick = function () {
        if (this.mParentWnd.tabWndList.getTabIndex() == 1) {
            //this.unreal = this.select;
            //this.onRefreshTop();
            FunUITools.sendTurnRequest(this.type, this.select);
        }
    };
    TianXian_ArtifactWnd.prototype.onRightClick = function () {
        if (this.mParentWnd.tabWndList.getTabIndex() == 1) {
            if (this.select == this.endIndex || this.select == -1)
                return;
            this.select = this.select + 1;
            this.onRefreshTop();
        }
    };
    TianXian_ArtifactWnd.prototype.onLeftClick = function () {
        if (this.mParentWnd.tabWndList.getTabIndex() == 1) {
            if (this.select == 1 || this.select == -1)
                return;
            this.select = this.select - 1;
            this.onRefreshTop();
        }
    };
    TianXian_ArtifactWnd.prototype.onPropertyClick = function () {
        if (this.mParentWnd.tabWndList.getTabIndex() == 1) {
            FunUITools.openPropertyFrame(this.type);
        }
    };
    TianXian_ArtifactWnd.prototype.onSkinClick = function () {
        if (this.mParentWnd.tabWndList.getTabIndex() == 1) {
            FunUITools.openSkinsFrame(this.type);
        }
    };
    TianXian_ArtifactWnd.prototype.onSearchClick = function () {
        if (this.mParentWnd.tabWndList.getTabIndex() == 1) {
            FunUITools.openFunPropertyFrame(this.type, this.select);
        }
    };
    TianXian_ArtifactWnd.prototype.onUpClick = function () {
        if (this.mParentWnd.tabWndList.getTabIndex() == 1) {
            FunUITools.upgradeFunction(this.type, this);
        }
    };
    TianXian_ArtifactWnd.prototype.onAutoUpClick = function () {
        if (this.mParentWnd.tabWndList.getTabIndex() == 1) {
            FunUITools.upgradeAutoFunction(this.type, this, "btn_auto_upgrade", "btn_upgrade");
        }
    };
    TianXian_ArtifactWnd.prototype.onEquipClick = function () {
        if (this.mParentWnd.tabWndList.getTabIndex() == 1) {
            var templist = FunUITools.checkWearEquip(this.type, this);
            FunUITools.oneKeyWearEquip(this.type, this, templist);
        }
    };
    return TianXian_ArtifactWnd;
}(BaseCtrlWnd));
__reflect(TianXian_ArtifactWnd.prototype, "TianXian_ArtifactWnd");
//# sourceMappingURL=TianXian_ArtifactWnd.js.map