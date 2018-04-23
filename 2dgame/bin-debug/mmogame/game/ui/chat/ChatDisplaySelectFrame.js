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
var chatDisplayType = {
    "ID_TAB_DISPLAYSELECT_PET": 1,
    "ID_TAB_DISPLAYSELECT_EQUIP": 2,
    "ID_TAB_DISPLAYSELECT_BOOK": 3,
    "ID_TAB_DISPLAYSELECT_GOODS": 4,
};
var ChatDisplaySelectFrame = (function (_super) {
    __extends(ChatDisplaySelectFrame, _super);
    function ChatDisplaySelectFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChatDisplaySelectFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/ChatDisplaySelectLayout.exml"];
    };
    ChatDisplaySelectFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        //this.setFullScreen(true)
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        this.curTabIndex = chatDisplayType.ID_TAB_DISPLAYSELECT_PET;
        this.tabIndex = -1;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var tabInfoList = [
            { name: "tab1", wnd: ChatDisplaySelect_PetWnd.newObj(this.mLayoutNode, this) },
            { name: "tab2", wnd: ChatDisplaySelect_ItemWnd.newObj(this.mLayoutNode, this) },
            { name: "tab3", wnd: ChatDisplaySelect_ItemWnd.newObj(this.mLayoutNode, this) },
            { name: "tab4", wnd: ChatDisplaySelect_ItemWnd.newObj(this.mLayoutNode, this) },
        ];
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList);
        this.mElemList["pet_scroller"].visible = false;
        this.mElemList["item_scroller"].visible = false;
        var _a, _b;
    };
    ChatDisplaySelectFrame.prototype.onUnLoad = function () {
    };
    ChatDisplaySelectFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.tabWndList.setWndVisible(true);
        if (this.tabIndex != -1) {
            this.tabWndList.changeTabWithIndex(this.tabIndex);
        }
    };
    ChatDisplaySelectFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.tabWndList.setWndVisible(false);
        this.selectCallBack = null;
        this.callbackObj = null;
    };
    ////////////////////////////////////////////////////////
    ChatDisplaySelectFrame.prototype.onPetSelect = function (petInfo) {
        if (petInfo == null) {
            return;
        }
        var typeToShow = channelOption.PET;
        var petID = petInfo.id;
        var playerId = GetHeroProperty("id");
        var name = petInfo.name;
        var xmlLink = typeToShow + ";" + playerId + ";" + petID + ";" + name;
        TLog.Debug(xmlLink, name);
        if (this.selectCallBack) {
            this.selectCallBack.call(this.callbackObj, xmlLink, name);
            this.hideWnd();
        }
    };
    ChatDisplaySelectFrame.prototype.onItemSelect = function (logicItem) {
        //TLog.Debug("onItemSelect", logicItem)
        if (logicItem == null) {
            return;
        }
        var typeToShow = channelOption.ITEM;
        var itemId = logicItem.id;
        var playerId = GetHeroProperty("id");
        var content = logicItem.getRefProperty("name");
        var xmlLink = typeToShow + ";" + playerId + ";" + itemId + ";" + content;
        TLog.Debug(xmlLink, content);
        if (this.selectCallBack) {
            this.selectCallBack.call(this.callbackObj, xmlLink, content);
            this.hideWnd();
        }
    };
    ///////////////////////////////////////////////////////
    ChatDisplaySelectFrame.prototype.showWndWithSelectCallback = function (callback, obj) {
        this.selectCallBack = callback;
        this.callbackObj = obj;
        this.showWnd();
    };
    return ChatDisplaySelectFrame;
}(BaseWnd));
__reflect(ChatDisplaySelectFrame.prototype, "ChatDisplaySelectFrame");
//# sourceMappingURL=ChatDisplaySelectFrame.js.map