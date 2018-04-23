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
var ChatDisplaySelect_PetWnd = (function (_super) {
    __extends(ChatDisplaySelect_PetWnd, _super);
    function ChatDisplaySelect_PetWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChatDisplaySelect_PetWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    ChatDisplaySelect_PetWnd.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        this.controlWndList = {};
    };
    ChatDisplaySelect_PetWnd.prototype.onUnLoad = function () {
    };
    ChatDisplaySelect_PetWnd.prototype.onShow = function () {
        RegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this);
        this.mElemList["pet_scroller"].visible = true;
        this.refreshFrame();
    };
    ChatDisplaySelect_PetWnd.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this);
        this.mElemList["pet_scroller"].visible = false;
    };
    ChatDisplaySelect_PetWnd.prototype.refreshFrame = function () {
        var petInfoList = PetSystem.getInstance().getPetInfoListBySort();
        this.mElemList["pet_wnd"].removeChildren();
        for (var i in petInfoList) {
            var data = petInfoList[i];
            var wnd = this.initItemWindow(i);
            if (wnd) {
                this.refreshItemWindow(wnd, i, data);
            }
        }
    };
    ChatDisplaySelect_PetWnd.prototype.initItemWindow = function (index) {
        //if (!this.controlWndList[index]) {
        var elemInfo = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = "pet_group_" + index, _a["parent"] = "pet_wnd", _a["x"] = 0, _a["y"] = 0, _a["w"] = 128, _a["h"] = 128, _a),
        ];
        UiUtil.createElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.controlWndList[index] = this.mElemList["pet_group_" + index];
        this.mElemList["petBox_" + index] = UIPetBox.newObj(this.mLayoutNode, "petBox_" + index, 0, 0, this.mElemList["pet_group_" + index]);
        this.mElemList["petBox_" + index].setClickListner(this.onClickPet, this, index);
        //}
        this.controlWndList[index].visible = false;
        return this.controlWndList[index];
        var _a;
    };
    ChatDisplaySelect_PetWnd.prototype.refreshItemWindow = function (wnd, index, data) {
        wnd.visible = true;
        if (this.mElemList["petBox_" + index]) {
            this.mElemList["petBox_" + index].updateByPet(data);
        }
    };
    ChatDisplaySelect_PetWnd.prototype.onClickPet = function (entryId, index) {
        var petInfoList = PetSystem.getInstance().getPetInfoListBySort();
        var petInfo = petInfoList[index];
        this.mParentWnd.onPetSelect(petInfo);
        return true;
    };
    return ChatDisplaySelect_PetWnd;
}(BaseCtrlWnd));
__reflect(ChatDisplaySelect_PetWnd.prototype, "ChatDisplaySelect_PetWnd");
//# sourceMappingURL=ChatDisplaySelect_PetWnd.js.map