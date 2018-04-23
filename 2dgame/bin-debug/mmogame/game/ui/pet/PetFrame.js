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
var PetFrame = (function (_super) {
    __extends(PetFrame, _super);
    function PetFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/pet/PetLayout.exml"];
        this.tabIndex = -1;
        this.petConfig = null;
        this.controlList = [];
    };
    PetFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var tabInfoList = [
            { name: "tab1", wnd: PetUpgradeWindow.newObj(this.mLayoutNode, this), check: this.upgradeCheck, obj: this },
            { name: "tab2", wnd: PetSkillWindow.newObj(this.mLayoutNode, this), check: this.skillCheck, obj: this },
            { name: "tongling", wnd: PetTongLinWindow.newObj(this.mLayoutNode, this), check: this.tongLinCheck, obj: this },
            { name: "shouhun", wnd: PetShouHunWindow.newObj(this.mLayoutNode, this), check: this.shouHunCheck, obj: this },
        ];
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList);
        this.tabWndList.setSelectedCallback(this.refreshDotTips, this);
        var group = this.mElemList["pet_group"];
        this.petListBox = UIPetListBox.newObj(this.mLayoutNode, "pet", 0, 6, group.width, group.height, group);
        this.petListBox.setClickListner(this.autoReceiveSelect, this);
        this.selectId = this.petListBox.setPetList();
        var _a, _b;
    };
    PetFrame.prototype.onUnLoad = function () {
    };
    PetFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.tabWndList.setWndVisible(true);
        if (this.tabIndex != -1) {
            this.tabWndList.changeTabWithIndex(this.tabIndex);
        }
        this.refreshFrame();
    };
    PetFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.tabWndList.setWndVisible(false);
        this.petConfig = null;
        this.controlList = [];
    };
    PetFrame.prototype.refreshFrame = function () {
    };
    PetFrame.prototype.autoReceiveSelect = function (petId) {
        this.selectId = petId;
        var curIndex = this.tabWndList.getTabIndex();
        if (curIndex == 1) {
            var petInfo = PetSystem.getInstance().getPetInfo(petId);
            if (petInfo == null) {
                this.tabWndList.changeTabWithIndex(0);
            }
        }
        this.tabWndList.getCurrentWnd().refreshFrameWithIndex(petId);
    };
    //////////////////////////////////////////
    PetFrame.prototype.upgradeCheck = function () {
        return true;
    };
    PetFrame.prototype.skillCheck = function () {
        if (this.selectId) {
            var info = PetSystem.getInstance().getPetInfo(this.selectId);
            if (info) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    PetFrame.prototype.tongLinCheck = function () {
        //MsgSystem.addTagTips(Localize_cns("45级开启"))
        return true;
    };
    PetFrame.prototype.shouHunCheck = function () {
        //MsgSystem.addTagTips(Localize_cns("55级开启"))
        return true;
    };
    PetFrame.prototype.getPetId = function () {
        return this.selectId;
    };
    ////////////////////红点提示/////////////////////
    //自定义红点继承实现
    PetFrame.prototype.refreshDotTipsImp = function () {
        FunUITools.refreshDanDotTIps(this.tabWndList.getCurrentWnd().soulType, this.tabWndList.getCurrentWnd());
        FunUITools.refreshEquipDotTIps(this.tabWndList.getCurrentWnd().soulType, this.tabWndList.getCurrentWnd());
        FunUITools.refreshSkillDotTIps(this.tabWndList.getCurrentWnd().soulType, this.tabWndList.getCurrentWnd());
        FunUITools.refreshUpgradeDotTIps(this.tabWndList.getCurrentWnd().soulType, this.tabWndList.getCurrentWnd());
        this.petListBox.refreshPetDotTips(this, this.tabWndList.getTabIndex());
    };
    PetFrame.prototype.getDotTipsArgsImp = function (checkParam) {
        var args = {};
        args.index = this.tabWndList.getTabIndex();
        args.type = this.tabWndList.getCurrentWnd().soulType;
        args.petId = this.selectId;
        return args;
    };
    //////////////////////////////////////////
    PetFrame.prototype.showWithIndex = function (index) {
        this.tabIndex = index;
        this.showWnd();
    };
    return PetFrame;
}(BaseWnd));
__reflect(PetFrame.prototype, "PetFrame");
//# sourceMappingURL=PetFrame.js.map