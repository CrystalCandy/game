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
var FriendFindResultFrame = (function (_super) {
    __extends(FriendFindResultFrame, _super);
    function FriendFindResultFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FriendFindResultFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/friend/FriendFindResultLayout.exml"];
    };
    FriendFindResultFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "chatBtn", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onChatBtnClick, _c),
            (_d = {}, _d["name"] = "addFriendBtn", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onAddFriendBtnClick, _d),
            (_e = {}, _e["name"] = "blackBtn", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onBlackBtnClick, _e),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.petBox = UIPetBox.newObj(this.mLayoutNode, "petbox", 0, 0, this.mElemList["group_head"]);
        var _a, _b, _c, _d, _e;
    };
    FriendFindResultFrame.prototype.onUnLoad = function () {
    };
    FriendFindResultFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.refreshFrame();
        RegisterEvent(EventDefine.BLACK_INFO_LIST, this.refreshFrame, this);
    };
    FriendFindResultFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        UnRegisterEvent(EventDefine.BLACK_INFO_LIST, this.refreshFrame, this);
    };
    FriendFindResultFrame.prototype.onChatBtnClick = function () {
        if (this.playerInfo == null) {
            return;
        }
        var playerInfo = this.playerInfo;
        var playerId = playerInfo.roleId;
        var playerName = playerInfo.roleName;
        var playerBody = playerInfo.body;
        var VipLevel = playerInfo.VipLevel;
        var chatStranger = FriendSystem.getInstance().getChatPlayerInfo(playerId);
        if (!chatStranger) {
            var newStranger = StrangerInfo.newObj(playerId, playerName, playerInfo.vocation, playerInfo.icon, playerInfo.sexId, playerInfo.VipLevel, playerInfo.level);
            FriendSystem.getInstance().addChatStranger(newStranger);
        }
        // let window = WngMrg.getInstance().getWindow("FriendChatFrame")
        // window.loadWnd()
        // window.showFriendChatFrame(playerId, playerName, playerBody)
        ChatWithPlayer(playerId, playerName);
        this.hideWnd();
    };
    FriendFindResultFrame.prototype.onAddFriendBtnClick = function () {
        if (this.playerInfo == null) {
            return;
        }
        FriendSystem.getInstance().addFriend(this.playerInfo.roleId);
    };
    FriendFindResultFrame.prototype.onBlackBtnClick = function () {
        if (this.playerInfo == null) {
            return;
        }
        if (FriendSystem.getInstance().checkIsMyFriendByID(this.playerInfo.roleId)) {
            var t = {
                onDialogCallback: function (result, userData) {
                    if (result == true) {
                        FriendSystem.getInstance().addPlayerBlackList(this.playerInfo.roleId, this.playerInfo.roleName);
                    }
                }
            };
            MsgSystem.confirmDialog(Localize_cns("ADD_FRIENDS_TO_BLACK_TIPS"), t, null);
            return;
        }
        FriendSystem.getInstance().addPlayerBlackList(this.playerInfo.roleId, this.playerInfo.roleName);
    };
    FriendFindResultFrame.prototype.refreshFrame = function () {
        if (this.playerInfo == null) {
            return;
        }
        var playerInfo = this.playerInfo;
        this.mElemList["friend_name_level"].text = (playerInfo.roleName + "  " + "Lv " + playerInfo.level);
        if (!playerInfo.factionName || playerInfo.factionName == "") {
            this.mElemList["describe"].text = (Localize_cns("NO_JUNTUAN"));
        }
        else {
            this.mElemList["describe"].text = (playerInfo.factionName);
        }
        //this.petBox.updateByEntryAndSex(playerInfo.vocation, playerInfo.sexId,  playerInfo.id)
        this.updateBlackBtn();
    };
    FriendFindResultFrame.prototype.showWithPlayerInfo = function (playerInfo) {
        //查看G2C_FRIEND_SINGLE_INFO 
        this.playerInfo = playerInfo;
        this.showWnd();
    };
    FriendFindResultFrame.prototype.updateBlackBtn = function () {
        if (this.playerInfo == null) {
            return;
        }
        if (FriendSystem.getInstance().checkPlayerInBlack(this.playerInfo.roleId)) {
            this.mElemList["blackBtn"].text = (Localize_cns("NO_BLACK"));
        }
        else {
            this.mElemList["blackBtn"].text = (Localize_cns("ADD_BLACK"));
        }
    };
    return FriendFindResultFrame;
}(BaseWnd));
__reflect(FriendFindResultFrame.prototype, "FriendFindResultFrame");
//# sourceMappingURL=FriendFindResultFrame.js.map