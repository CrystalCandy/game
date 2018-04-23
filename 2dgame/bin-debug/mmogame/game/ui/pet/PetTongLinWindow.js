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
var PetTongLinWindow = (function (_super) {
    __extends(PetTongLinWindow, _super);
    function PetTongLinWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetTongLinWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.soulType = cellOptionsIndex.PetTongLin;
        this.soulInfo = {};
        this.select = 1;
    };
    PetTongLinWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "left_btn", _a["title"] = null, _a["event_name"] = gui.TouchEvent.TOUCH_SHORT, _a["fun_index"] = this.onClickRefreshBtn, _a),
            (_b = {}, _b["name"] = "right_btn", _b["title"] = null, _b["event_name"] = gui.TouchEvent.TOUCH_SHORT, _b["fun_index"] = this.onClickRefreshBtn, _b),
            (_c = {}, _c["name"] = "btn_property_dan", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickProperty, _c),
            (_d = {}, _d["name"] = "turn_btn", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onClickTurn, _d),
            (_e = {}, _e["name"] = "btn_upgrade", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onClickUpgrade, _e),
            (_f = {}, _f["name"] = "btn_auto_upgrade", _f["title"] = null, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onClickAutoUpgrade, _f),
            (_g = {}, _g["name"] = "wear_equip_btn", _g["title"] = null, _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = this.onClickWearEquip, _g),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["turn_rd"].setAlignFlag(gui.Flag.H_CENTER);
        this.mElemList["btn_shootUp"].visible = (false);
        var _a, _b, _c, _d, _e, _f, _g;
    };
    PetTongLinWindow.prototype.onUnLoad = function () {
        if (this.Player) {
            var actorview = this.mElemList["actor_view"];
            this.Player.leaveViewer(actorview);
            this.Player.deleteObj();
            this.Player = null;
        }
    };
    PetTongLinWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.PET_FUN_INFO_REFRESH, this.refreshFrame, this);
        RegisterEvent(EventDefine.PET_FUN_INFO_UPDATE, this.refreshFrame, this);
        this.mElemList["soul_group"].visible = true;
        this.initTongLinWnd();
        this.refreshFrame();
    };
    PetTongLinWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.PET_FUN_INFO_REFRESH, this.refreshFrame, this);
        UnRegisterEvent(EventDefine.PET_FUN_INFO_UPDATE, this.refreshFrame, this);
        this.mElemList["soul_group"].visible = false;
    };
    PetTongLinWindow.prototype.initTongLinWnd = function () {
        this.mElemList["title"].text = Localize_cns("PET_TXT2");
        this.mElemList["PetTongLin_checkbox"].visible = true;
        this.mElemList["PetSouHun_checkbox"].visible = false;
        this.mElemList["name_wnd"].visible = false;
        this.mElemList["skill_pic"].source = "cw_text09";
        this.mElemList["equip_pic"].source = "cw_text10";
        this.mElemList["turn_btn"].visible = false;
        this.mElemList["turn_icon"].visible = false;
        this.mElemList["turn_rd"].visible = false;
        var list = FunUITools.checkWearEquip(this.soulType, this);
        this.mElemList["wear_equip_btn"].visible = size_t(list) > 0;
        this.equipList = list;
    };
    PetTongLinWindow.prototype.refreshFrame = function () {
        var soulInfo = {};
        soulInfo = FunSystem.getInstance().getFunInfoWithType(this.soulType);
        if (soulInfo == null || soulInfo.showindex == 0) {
            return;
        }
        this.soulInfo = soulInfo;
        //更新战力
        FunUITools.updateForceNum(this.soulType, this);
        //更新actor
        this.select = soulInfo.stage || 1;
        this.updateRefreshState(null, this.select);
        this.refreshActorWnd();
        //更新技能
        FunUITools.updateSkillWnd(this.soulType, this);
        //更新装备
        FunUITools.updateEquipWnd(this.soulType, this);
        //更新进度条
        FunUITools.updateExpProgress(this.soulType, this);
        //消耗材料
        FunUITools.updateNeedMaterial(this.soulType, this);
        //自动升阶
        FunUITools.upgradeAutoFunctionCheck(this.soulType, this, "btn_auto_upgrade", "btn_upgrade");
    };
    PetTongLinWindow.prototype.refreshActorWnd = function () {
        //选中阶数
        FunUITools.updateActorStage(this.soulType, this, this.select);
        //更新actorview
        if (this.Player == null) {
            this.Player = Player.newObj();
        }
        FunUITools.updateActorModel(this.soulType, this, this.Player, this.select);
        //幻化
        var stage = this.soulInfo.stage || 1;
        if (this.select >= stage + 1) {
            this.mElemList["turn_btn"].visible = false;
            this.mElemList["turn_icon"].visible = false;
            this.mElemList["turn_rd"].visible = true;
            var force = 0;
            var str = String.format(Localize_cns("PET_TXT35"), force);
            AddRdContent(this.mElemList["turn_rd"], str, "ht_24_cc_stroke", "white");
        }
        else {
            var curshape = this.soulInfo.curshape; //当前外形索引
            if (curshape && curshape == this.select) {
                this.mElemList["turn_btn"].visible = false;
                this.mElemList["turn_icon"].visible = true;
                this.mElemList["turn_rd"].visible = false;
            }
            else {
                this.mElemList["turn_btn"].visible = true;
                this.mElemList["turn_icon"].visible = false;
                this.mElemList["turn_rd"].visible = false;
            }
        }
    };
    PetTongLinWindow.prototype.updateRefreshState = function (name, stage) {
        var leftBtn = this.mElemList["left_btn"];
        var rightBtn = this.mElemList["right_btn"];
        leftBtn.enabled = true;
        rightBtn.enabled = true;
        if (name == "left_btn") {
            this.select = this.select - 1;
        }
        else if (name == "right_btn") {
            this.select = this.select + 1;
        }
        else {
        }
        if (this.select <= 1) {
            this.select = 1;
            leftBtn.enabled = false;
            rightBtn.enabled = true;
        }
        if (stage == 10 || (this.select >= stage + 1)) {
            leftBtn.enabled = true;
            rightBtn.enabled = false;
        }
    };
    ////////////////////////////////////响应事件//////////////////////////////////
    PetTongLinWindow.prototype.onClickRefreshBtn = function (event) {
        if (this.mParentWnd.tabWndList.getTabIndex() == 2) {
            var target = event.target;
            var name_1 = target.name;
            var stage = this.soulInfo.stage || 1;
            this.updateRefreshState(name_1, stage);
            this.refreshActorWnd();
        }
    };
    //幻化
    PetTongLinWindow.prototype.onClickTurn = function (event) {
        if (this.mParentWnd.tabWndList.getTabIndex() == 2) {
            FunUITools.sendTurnRequest(this.soulType, this.select);
        }
    };
    //升阶
    PetTongLinWindow.prototype.onClickUpgrade = function (event) {
        if (this.mParentWnd.tabWndList.getTabIndex() == 2) {
            FunUITools.upgradeFunction(this.soulType, this);
        }
    };
    //自动升阶
    PetTongLinWindow.prototype.onClickAutoUpgrade = function (event) {
        if (this.mParentWnd.tabWndList.getTabIndex() == 2) {
            FunUITools.upgradeAutoFunction(this.soulType, this, "btn_auto_upgrade", "btn_upgrade");
        }
    };
    //属性丹
    PetTongLinWindow.prototype.onClickProperty = function (event) {
        if (this.mParentWnd.tabWndList.getTabIndex() == 2) {
            FunUITools.openPropertyFrame(this.soulType);
        }
    };
    //换装
    PetTongLinWindow.prototype.onClickWearEquip = function (event) {
        if (this.mParentWnd.tabWndList.getTabIndex() == 2) {
            FunUITools.oneKeyWearEquip(this.soulType, this, this.equipList);
        }
    };
    return PetTongLinWindow;
}(BaseCtrlWnd));
__reflect(PetTongLinWindow.prototype, "PetTongLinWindow");
//# sourceMappingURL=PetTongLinWindow.js.map