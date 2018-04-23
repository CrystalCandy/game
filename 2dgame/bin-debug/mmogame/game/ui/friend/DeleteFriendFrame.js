// TypeScript file
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
var DeleteFriendFrame = (function (_super) {
    __extends(DeleteFriendFrame, _super);
    function DeleteFriendFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeleteFriendFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.deleteType = DeleteFriendFrame.deleteWndType.deleteFriend;
    };
    DeleteFriendFrame.prototype.onLoad = function () {
        // 创建普通信息提示框
        UiUtil.setWH(this.mLayoutNode, 300, 160);
        this.setAlignCenter(true, true);
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = "deleteBG", _a["title"] = "", _a["font"] = null, _a["image"] = "ty_UIBg01", _a["color"] = null, _a["x"] = 0, _a["y"] = 0, _a["percentWidth"] = 100, _a["percentHeight"] = 100, _a["event_name"] = null, _a["fun_index"] = null, _a),
            (_b = {}, _b["index_type"] = gui.Button, _b["name"] = "delete_btn", _b["title"] = Localize_cns("DELETE_FRIEND"), _b["font"] = "ht_24_cc_stroke", _b["image"] = "ty_tongYongBt01", _b["color"] = gui.Color.white, _b["horizontalCenter"] = 0, _b["verticalCenter"] = 0, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onDeleteFriendBtnClick, _b),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        var _a, _b;
    };
    DeleteFriendFrame.prototype.onUnLoad = function () {
    };
    DeleteFriendFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this);
    };
    DeleteFriendFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this);
    };
    DeleteFriendFrame.prototype.setDeleteTypeAndShow = function (deleteType, friendIdToDelete) {
        this.deleteType = deleteType;
        this.friendIdToDelete = friendIdToDelete;
        this.showWnd();
        var deleteWndType = DeleteFriendFrame.deleteWndType;
        if (deleteType == deleteWndType.deleteFriend) {
            this.mElemList["delete_btn"].text = (Localize_cns("DELETE_FRIEND"));
        }
        else if (deleteType == deleteWndType.deleteChat) {
            this.mElemList["delete_btn"].text = (Localize_cns("DELETE_CHAT"));
        }
        else if (deleteType == deleteWndType.deleteMsg) {
            this.mElemList["delete_btn"].text = (Localize_cns("PER_HOMEPAGE_TEXT62"));
        }
    };
    DeleteFriendFrame.prototype.onDeleteFriendBtnClick = function (args) {
        TLog.Debug("DeleteFriendFrame.onDeleteFriendBtnClick", this.deleteType);
        var deleteWndType = DeleteFriendFrame.deleteWndType;
        if (this.deleteType == deleteWndType.deleteFriend) {
            FriendSystem.getInstance().deleteFriend(this.friendIdToDelete);
        }
        else if (this.deleteType == deleteWndType.deleteChat) {
            FriendSystem.getInstance().deleteChatInfoByID(this.friendIdToDelete);
            WngMrg.getInstance().getWindow("FriendsFrame").refreshFrame();
        }
        else if (this.deleteType == deleteWndType.deleteMsg) {
            var message = GetMessage(opCodes.C2G_ROLE_HOME_PAGE_MESSAGE_CLEAR);
            message.msgIndex = this.friendIdToDelete;
            message.isAllClear = 0;
            SendGameMessage(message);
        }
        else {
        }
        this.hideWnd();
    };
    DeleteFriendFrame.prototype.onMouseDown = function (args) {
        var target = args.touchEvent.target;
        var isExclude = UiUtil.isExcludeChild(target, [this.mLayoutNode]);
        if (isExclude) {
            this.hideWnd();
        }
    };
    DeleteFriendFrame.deleteWndType = {
        deleteFriend: 1,
        deleteChat: 2,
        deleteEmail: 3,
        deleteMsg: 4,
    };
    return DeleteFriendFrame;
}(BaseWnd));
__reflect(DeleteFriendFrame.prototype, "DeleteFriendFrame");
//# sourceMappingURL=DeleteFriendFrame.js.map