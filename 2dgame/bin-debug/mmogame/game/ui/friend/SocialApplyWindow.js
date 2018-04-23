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
var SocialApplyWindow = (function (_super) {
    __extends(SocialApplyWindow, _super);
    function SocialApplyWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SocialApplyWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.list = [];
    };
    SocialApplyWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var ElemInfo = [
            (_a = {}, _a["name"] = "btn_apply1", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["index_type"] = this.onClickAddFriendBtn, _a)
        ];
        var group = this.mElemList["apply_scroll_wnd"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "apply_scroll", 0, 0, group.width, group.height, group);
        var _a;
    };
    SocialApplyWindow.prototype.onUnLoad = function () {
    };
    SocialApplyWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.RECOMMEND_FRIEND, this.refreshRecommendFriendFrame, this);
        RegisterEvent(EventDefine.FRIEND_APPLYLIST_UPDATE, this.refresh, this);
        RegisterEvent(EventDefine.CHAT_GROUP_INVITE_LIST, this.refresh, this);
        RegisterEvent(EventDefine.CHAT_GROUP_AGREE_JOIN, this.refresh, this);
        RegisterEvent(EventDefine.APPLY_TO_FRIEND, this.refresh, this);
        this.mElemList["apply_wnd"].visible = true;
        this.refresh();
    };
    SocialApplyWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.RECOMMEND_FRIEND, this.refreshRecommendFriendFrame, this);
        UnRegisterEvent(EventDefine.FRIEND_APPLYLIST_UPDATE, this.refresh, this);
        UnRegisterEvent(EventDefine.CHAT_GROUP_INVITE_LIST, this.refresh, this);
        UnRegisterEvent(EventDefine.CHAT_GROUP_AGREE_JOIN, this.refresh, this);
        UnRegisterEvent(EventDefine.APPLY_TO_FRIEND, this.refresh, this);
        this.mElemList["apply_wnd"].visible = (false);
    };
    SocialApplyWindow.prototype.onShowRecommendWnd = function () {
        this.mElemList["recommand_player1"].visible = (true);
        this.mElemList["recommand_player2"].visible = (true);
        // let group = <eui.Group>this.mElemList["apply_scroll_wnd"]
        // UiUtil.setWH(group, 560, 365)
        // this.scroll.refreshScroll()
    };
    SocialApplyWindow.prototype.onHideRecommendWnd = function () {
        this.mElemList["recommand_player1"].visible = (false);
        this.mElemList["recommand_player2"].visible = (false);
        // let group = <eui.Group>this.mElemList["apply_scroll_wnd"]
        // UiUtil.setWH(group, 560, 672)
        // this.scroll.refreshScroll()
    };
    //推荐好友
    SocialApplyWindow.prototype.refreshRecommendFriendFrame = function () {
        var recommendList = FriendSystem.getInstance().getRecommendFriendList();
        if (recommendList.length > 0) {
            this.onShowRecommendWnd();
            for (var i = 1; i <= 2; i++) {
                var friendInfo = recommendList[i - 1];
                var wnd = this.mElemList["recommand_player" + i];
                if (friendInfo == null) {
                    wnd.visible = (false);
                }
                else {
                    //存在则显示它,注意z顺序与定义顺序一致
                    var str = "#saddlebrown" + friendInfo.roleName + "#rfLv." + friendInfo.level;
                    if (!friendInfo.factionName || friendInfo.factionName == "") {
                        str = str + "#br#ublack" + (Localize_cns("NO_JUNTUAN"));
                    }
                    else {
                        str = str + "#br#ublack" + (friendInfo.factionName);
                    }
                    AddRdContent(this.mElemList["name_rd" + i], str, "ht_24_cc", "ublack", 3);
                    this.mElemList["player_icon" + i].source = GetProfessionIcon(friendInfo.vocation, friendInfo.sexId);
                }
            }
        }
        else {
            this.onHideRecommendWnd();
        }
    };
    SocialApplyWindow.prototype.refresh = function () {
        MsgSystem.removeIconMsgByType(IconMsgType.FRIEND_APPLY);
        var strangerList = FriendSystem.getInstance().getApplyStrangerList();
        var show_list = [];
        for (var _strangerId in strangerList) {
            var strangerId = tonumber(_strangerId);
            var strangerInfo = strangerList[strangerId];
            show_list.push({ strangerId: strangerId, strangerInfo: strangerInfo });
        }
        this.list = show_list;
        this.scroll.clearItemList();
        for (var i = 0; i < size_t(show_list); i++) {
            var v = show_list[i];
            var window_1 = this.scroll.getItemWindow(i, 560, 130, 0, 0, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v);
        }
        this.scroll.refreshScroll();
        this.refreshRecommendFriendFrame();
    };
    SocialApplyWindow.prototype.initItemWindow = function (window) {
        var name = window.name;
        var Info = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = name + "_bg", _a["title"] = null, _a["font"] = null, _a["image"] = "ty_uiDi03", _a["color"] = null, _a["x"] = 0, _a["y"] = 0, _a["w"] = 560, _a["h"] = 130, _a["messageFlag"] = true, _a),
            (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = name + "_iconBg", _b["title"] = null, _b["font"] = null, _b["image"] = "ty_renWuKuang01", _b["color"] = null, _b["x"] = 10, _b["y"] = 2, _b["w"] = 140, _b["h"] = 140, _b["messageFlag"] = true, _b),
            (_c = {}, _c["index_type"] = gui.Grid9Image, _c["name"] = name + "_icon", _c["title"] = null, _c["font"] = null, _c["image"] = "zctx_90001", _c["color"] = null, _c["x"] = 17, _c["y"] = 0, _c["w"] = 140, _c["h"] = 140, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c),
            (_d = {}, _d["index_type"] = gui.RichDisplayer, _d["name"] = name + "_rd", _d["x"] = 155, _d["y"] = 30, _d["w"] = 250, _d["h"] = 70, _d["messageFlag"] = true, _d),
            (_e = {}, _e["index_type"] = gui.Button, _e["name"] = name + "_refuse_btn", _e["title"] = Localize_cns("FRIENDS_TXT8"), _e["font"] = "ht_24_cc_stroke", _e["image"] = "ty_tongYongBt2", _e["color"] = gui.Color.white, _e["x"] = 446, _e["y"] = 10, _e["w"] = 94, _e["h"] = 49, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = null, _e),
            (_f = {}, _f["index_type"] = gui.Button, _f["name"] = name + "_agree_btn", _f["title"] = Localize_cns("FRIENDS_TXT9"), _f["font"] = "ht_24_cc_stroke", _f["image"] = "ty_tongYongBt2", _f["color"] = gui.Color.white, _f["x"] = 446, _f["y"] = 66, _f["w"] = 94, _f["h"] = 49, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = null, _f),
        ];
        UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window);
        var _a, _b, _c, _d, _e, _f;
    };
    SocialApplyWindow.prototype.refreshItemWindow = function (window, data) {
        var strangerId = data.strangerId;
        var strangerInfo = data.strangerInfo;
        var name = window.name;
        //存在则显示它,注意z顺序与定义顺序一致
        var str = "#saddlebrown" + strangerInfo.roleName + "#rfLv." + strangerInfo.level;
        if (!strangerInfo.factionName || strangerInfo.factionName == "") {
            str = str + "#br#ublack" + (Localize_cns("NO_JUNTUAN"));
        }
        else {
            str = str + "#br#ublack" + (strangerInfo.factionName);
        }
        AddRdContent(this.mElemList[name + "_rd"], str, "ht_24_cc", "ublack", 3);
        this.mElemList[name + "_icon"].source = GetProfessionIcon(strangerInfo.vocation, strangerInfo.sexId);
    };
    //////////////////////////////////////////////////////////////////////
    //推荐好友
    SocialApplyWindow.prototype.onClickAddFriendBtn = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        var recommendList = FriendSystem.getInstance().getRecommendFriendList();
        var playerID = recommendList[index - 1];
        if (!playerID) {
            return TLog.Error("FriendFrame get playerID  Error  can't find ", name);
        }
        FriendSystem.getInstance().removeRecommendFriendByID(playerID);
        // let message = GetMessage(opCodes.C2G_DELETE_RECOMMEND_FRIEND)
        // message.deleteID = playerID
        // SendGameMessage(message)
        FriendSystem.getInstance().addFriend(playerID);
    };
    SocialApplyWindow.prototype.onAgreeClick = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        var strangerInfo = this.list[index].strangerInfo;
        // let message = GetMessage(opCodes.C2G_APPLY_FRIEND_ADD_AGREE)
        // message.friendId = tonumber(strangerInfo.roleId)
        // message.isAgree = 1
        // SendGameMessage(message)
    };
    SocialApplyWindow.prototype.onRefuseClick = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        var strangerInfo = this.list[index].strangerInfo;
        // let message = GetMessage(opCodes.C2G_APPLY_FRIEND_ADD_AGREE)
        // message.friendId = tonumber(strangerInfo.roleId)
        // message.isAgree = 0
        // SendGameMessage(message)
    };
    return SocialApplyWindow;
}(BaseCtrlWnd));
__reflect(SocialApplyWindow.prototype, "SocialApplyWindow");
//# sourceMappingURL=SocialApplyWindow.js.map