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
var ChatDisplaySelect_ItemWnd = (function (_super) {
    __extends(ChatDisplaySelect_ItemWnd, _super);
    function ChatDisplaySelect_ItemWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChatDisplaySelect_ItemWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    ChatDisplaySelect_ItemWnd.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        this.tabIndex = this.mParentWnd.tabWndList.getTabIndex() + 1;
        this.controlWndList = {};
    };
    ChatDisplaySelect_ItemWnd.prototype.onUnLoad = function () {
    };
    ChatDisplaySelect_ItemWnd.prototype.onShow = function () {
        RegisterEvent(EventDefine.ITEM_UPDATE, this.refreshFrame, this);
        this.mElemList["item_scroller"].visible = true;
        this.refreshFrame();
    };
    ChatDisplaySelect_ItemWnd.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ITEM_UPDATE, this.refreshFrame, this);
        this.mElemList["item_scroller"].visible = false;
    };
    ChatDisplaySelect_ItemWnd.prototype.refreshFrame = function () {
        this.tabIndex = this.mParentWnd.tabWndList.getTabIndex() + 1;
        var itemList = this.getItemList();
        this.mElemList["item_wnd"].removeChildren();
        for (var i in itemList) {
            var data = itemList[i];
            var wnd = this.initItemWindow(i);
            if (wnd) {
                this.refreshItemWindow(wnd, i, data);
            }
        }
    };
    ChatDisplaySelect_ItemWnd.prototype.initItemWindow = function (index) {
        //if (!this.controlWndList[index]) {
        var elemInfo = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = "item_group_" + index, _a["parent"] = "item_wnd", _a["x"] = 0, _a["y"] = 0, _a["w"] = 88, _a["h"] = 88, _a),
        ];
        UiUtil.createElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.controlWndList[index] = this.mElemList["item_group_" + index];
        this.mElemList["itemBox_" + index] = UIItemBox.newObj(this.mLayoutNode, "itemBox_" + index, 0, 0, this.mElemList["item_group_" + index]);
        this.mElemList["itemBox_" + index].setItemTipsListner(this.onClickItem, this, index);
        //}
        this.controlWndList[index].visible = false;
        return this.controlWndList[index];
        var _a;
    };
    ChatDisplaySelect_ItemWnd.prototype.refreshItemWindow = function (wnd, index, data) {
        wnd.visible = true;
        if (this.mElemList["itemBox_" + index]) {
            this.mElemList["itemBox_" + index].updateByItem(data);
        }
    };
    ChatDisplaySelect_ItemWnd.prototype.getItemList = function () {
        var itemList = {};
        if (this.tabIndex == chatDisplayType.ID_TAB_DISPLAYSELECT_EQUIP) {
            itemList = ItemSystem.getInstance().getEquipItemList();
        }
        else if (this.tabIndex == chatDisplayType.ID_TAB_DISPLAYSELECT_BOOK) {
            itemList = ItemSystem.getInstance().getItemLogicInfoByType(opItemType.ITEM_TYPE_ACTIVE_ITEM);
        }
        else if (this.tabIndex == chatDisplayType.ID_TAB_DISPLAYSELECT_GOODS) {
            itemList = ItemSystem.getInstance().getItemLogicInfoByType(opItemType.ITEM_TYPE_GOODS);
        }
        TLog.Debug("ChatDisplaySelect_ItemWnd.getItemList", this.tabIndex);
        return itemList;
    };
    ChatDisplaySelect_ItemWnd.prototype.onClickItem = function (logicItem, index) {
        this.mParentWnd.onItemSelect(logicItem);
        return true;
    };
    return ChatDisplaySelect_ItemWnd;
}(BaseCtrlWnd));
__reflect(ChatDisplaySelect_ItemWnd.prototype, "ChatDisplaySelect_ItemWnd");
//# sourceMappingURL=ChatDisplaySelect_ItemWnd.js.map