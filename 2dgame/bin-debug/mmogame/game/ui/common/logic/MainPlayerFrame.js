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
/*
作者:
    liuziming
    
创建时间：
   2017.02.24(周五)

意图：
   生活场景，对玩家的相关操作界面
公共接口：
   
*/
var MainPlayerFrame = (function (_super) {
    __extends(MainPlayerFrame, _super);
    function MainPlayerFrame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.funcList = (_a = {},
            _a["xinxi"] = Localize_cns("TEAM_TXT25"),
            _a["gerenzhuye"] = Localize_cns("PER_HOMEPAGE_TEXT"),
            _a["songhua"] = Localize_cns("PER_HOMEPAGE_TEXT8"),
            _a["tianjia"] = Localize_cns("TEAM_TXT26"),
            _a["heimingdan"] = Localize_cns("ADD_BLACK"),
            _a["xiaoxi"] = Localize_cns("TEAM_TXT27"),
            _a["zudui"] = Localize_cns("TEAM_TXT41"),
            _a["jiaru"] = Localize_cns("TEAM_TXT42"),
            _a["zhuanyang"] = Localize_cns("TEAM_TXT24"),
            _a["tichu"] = Localize_cns("TEAM_TXT28"),
            _a["zhuanrxm"] = Localize_cns("UNION_TEXT24"),
            _a["tichuxm"] = Localize_cns("UNION_TEXT25"),
            _a["tichutt"] = Localize_cns("LADDER_TXT45"),
            _a);
        return _this;
        var _a;
    }
    MainPlayerFrame.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    MainPlayerFrame.prototype.onLoad = function () {
        this.createFrame();
    };
    MainPlayerFrame.prototype.onUnLoad = function () {
    };
    MainPlayerFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this);
        this.mLayoutNode.visible = (true);
        this.refreshFrame();
    };
    MainPlayerFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this);
        this.mLayoutNode.visible = (false);
    };
    ////////////////////////////////////////////////////////////////////-
    MainPlayerFrame.prototype.createFrame = function () {
        this.mLayoutNode.setLayer(3 /* Top */);
        //UiUtil.setWH(this.mLayoutNode, 300, 300)
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = "bg", _a["image"] = "ty_xiTongTextBg", _a["x"] = 0, _a["y"] = 0, _a["percentWidth"] = 100, _a["percentHeight"] = 100, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = null, _a),
            (_b = {}, _b["index_type"] = eui.Group, _b["name"] = "group_content", _b["x"] = 0, _b["y"] = 0, _b["percentWidth"] = 100, _b["percentHeight"] = 100, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = null, _b),
        ];
        for (var k in this.funcList) {
            var v = this.funcList[k];
            var info = (_c = {}, _c["index_type"] = gui.Button, _c["name"] = k, _c["parent"] = "group_content", _c["image"] = "ty_tongYongBt20", _c["title"] = v, _c["font"] = "ht_20_cc_stroke", _c["w"] = 110, _c["h"] = 40, _c["color"] = gui.Color.white, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickOption, _c);
            mElemInfo.push(info);
        }
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["group_content"];
        var tLayout = new eui.TileLayout();
        tLayout.paddingTop = 10;
        tLayout.paddingLeft = 10;
        tLayout.paddingRight = 10;
        tLayout.paddingBottom = 10;
        tLayout.requestedColumnCount = 2;
        group.layout = tLayout;
        var _a, _b, _c;
    };
    MainPlayerFrame.prototype.refreshFrame = function () {
        var list = this.getPlayerStateList(); //{"zhuanyang", "xinxi", "tianjia",  "tichu"}
        this.refreshFrameWithList(list);
    };
    MainPlayerFrame.prototype.refreshFrameWithList = function (list) {
        for (var index in this.funcList) {
            var v = this.funcList[index];
            UiUtil.setVisible(this.mElemList[index], false, false);
        }
        for (var i = 0; i < list.length; i++) {
            var index = list[i];
            UiUtil.setVisible(this.mElemList[index], true, true);
        }
        this.mLayoutNode.validateNow();
        var x = this.spacex, y = this.spacey;
        x = MathUtil.clamp(x, 0, IGlobal.stageWidth - this.mLayoutNode.width);
        y = MathUtil.clamp(y, 0, IGlobal.stageHeight - this.mLayoutNode.height);
        UiUtil.setXY(this.mLayoutNode, x, y);
    };
    MainPlayerFrame.prototype.getPlayerStateList = function () {
        // let playerId = this.playerId
        var playerId = this.playerId;
        var list = ["xinxi", "xiaoxi", "gerenzhuye"];
        if (IsInGlobalActvity() != null) {
            return ["xinxi"];
        }
        //是否好友
        if (FriendSystem.getInstance().checkIsMyFriendByID(playerId) == false) {
            JsUtil.arrayInstert(list, "tianjia");
        }
        //是否黑名单
        if (FriendSystem.getInstance().checkPlayerInBlack(playerId) == false) {
            JsUtil.arrayInstert(list, "heimingdan");
        }
        //return list
        // //转让队长
        // if (HeroIsInTeam()) {
        //     if (HeroIsCaptain()) {
        //         if (PlayerIsInTeam(playerId)) {
        //             let memberInfo = TeamSystem.getInstance().getMemberInfo(playerId)
        //             if(memberInfo.status == ConfigTeamMemberStatus.ONLINE){
        //                 JsUtil.arrayInstert(list, "zhuanyang")
        //             }
        //             JsUtil.arrayInstert(list, "tichu")
        //         } else {
        //             let player = ActorManager.getInstance().getPlayer(playerId)
        //             if (player) {
        //                 let playerInfo = player.getPropertyInfo()
        //                 if (bit.band(playerInfo.status, opStatusType.STATUS_TYPE_TEAM) == 0) {
        //                     JsUtil.arrayInstert(list, "zudui")
        //                 }
        //             }
        //         }
        //     }
        // } else {							//组队
        //     let player = ActorManager.getInstance().getPlayer(playerId)
        //     if (player) {
        //         let playerInfo = player.getPropertyInfo()
        //         if (bit.band(playerInfo.status, opStatusType.STATUS_TYPE_TEAM) != 0 || bit.band(playerInfo.status, opStatusType.STATUS_TYPE_TEAMMATE) != 0 ) {
        //             JsUtil.arrayInstert(list, "jiaru")
        //         } else if (bit.band(playerInfo.status, opStatusType.STATUS_TYPE_TEAMMATE) == 0) {
        //             JsUtil.arrayInstert(list, "zudui")
        //         }
        //     }
        // }
        return list;
    };
    ////////////////////////////////////////////////////////////-响应函数//////////////////////////////////////////////////////////////////////
    MainPlayerFrame.prototype.onClickOption = function (args) {
        var name = args.target.name;
        if (name == "zhuanyang") {
            var message = GetMessage(opCodes.C2G_TEAM_CAPTAIN);
            message.id = this.playerId || 0;
            SendGameMessage(message);
        }
        else if (name == "xinxi") {
            GetPlayerInfo(this.playerId);
        }
        else if (name == "tianjia") {
            FriendSystem.getInstance().addFriend(this.playerId || 0);
        }
        else if (name == "xiaoxi") {
            // let player = ActorManager.getInstance().getPlayer(this.playerId || 0)
            // let window = WngMrg.getInstance().getWindow("FriendChatFrame")
            // if (player) {
            //     let playerInfo = player.getPropertyInfo()
            //     window.showFriendChatFrame(playerInfo.id, playerInfo.name, playerInfo.vocation)
            // } else {
            //     window.showFriendChatFrame(this.playerId)
            // }
            ChatWithPlayer(this.playerId, this.playerName);
        }
        else if (name == "tichu") {
            var plrId = this.playerId;
            var message = GetMessage(opCodes.C2G_TEAM_KICK);
            message.id = plrId;
            SendGameMessage(message);
        }
        else if (name == "zudui") {
            var _a = CheckMainFrameFunction("zudui"), flag = _a[0], str = _a[1];
            if (flag == false) {
                return MsgSystem.addTagTips(str);
            }
            //MsgSystem.addTagTips(Localize_cns("TEAM_TXT36"))
            var message = GetMessage(opCodes.C2G_TEAM_INVITE);
            message.id = this.playerId || 0;
            SendGameMessage(message);
        }
        else if (name == "zhuanyang") {
            var message = GetMessage(opCodes.C2G_TEAM_APPLY);
            message.id = this.playerId || 0;
            SendGameMessage(message);
        }
        else if (name == "jiaru") {
            var _b = CheckMainFrameFunction("zudui"), flag = _b[0], str = _b[1];
            if (flag == false) {
                return MsgSystem.addTagTips(str);
            }
            var message = GetMessage(opCodes.C2G_TEAM_APPLY);
            message.id = this.playerId || 0;
            SendGameMessage(message);
        }
        else if (name == "gerenzhuye") {
            var wnd = WngMrg.getInstance().getWindow("PersonalHomepageFrame");
            wnd.showWithPlayerInfo(this.playerId, 2);
        }
        else if (name == "songhua") {
            var player = ActorManager.getInstance().getPlayer(this.playerId || 0);
            if (player) {
                var playerInfo = player.getPropertyInfo();
                var wnd = WngMrg.getInstance().getWindow("FlowersMainFrame");
                wnd.showWithPlayerInfo(playerInfo.id, playerInfo.name);
            }
            else if (this.playerId && this.playerName && this.playerName != "") {
                var wnd = WngMrg.getInstance().getWindow("FlowersMainFrame");
                wnd.showWithPlayerInfo(this.playerId, this.playerName);
            }
        }
        else if (name == "heimingdan") {
            var player = ActorManager.getInstance().getPlayer(this.playerId || 0);
            if (player) {
                var playerInfo_1 = player.getPropertyInfo();
                if (FriendSystem.getInstance().checkIsMyFriendByID(this.playerId)) {
                    var t = {
                        onDialogCallback: function (result, userData) {
                            if (result == true) {
                                FriendSystem.getInstance().addPlayerBlackList(playerInfo_1.id, playerInfo_1.name);
                            }
                        }
                    };
                    MsgSystem.confirmDialog(Localize_cns("ADD_FRIENDS_TO_BLACK_TIPS"), t, null);
                    return;
                }
                FriendSystem.getInstance().addPlayerBlackList(playerInfo_1.id, playerInfo_1.name);
            }
            else if (this.playerId && this.playerName && this.playerName != "") {
                if (FriendSystem.getInstance().checkIsMyFriendByID(this.playerId)) {
                    var t = {
                        onDialogCallback: function (result, userData) {
                            if (result == true) {
                                FriendSystem.getInstance().addPlayerBlackList(this.playerId, this.playerName);
                            }
                        }
                    };
                    MsgSystem.confirmDialog(Localize_cns("ADD_FRIENDS_TO_BLACK_TIPS"), t, null);
                    return;
                }
                FriendSystem.getInstance().addPlayerBlackList(this.playerId, this.playerName);
            }
        }
        else if (name == "zhuanrxm") {
            if (TeamSystem.getInstance().checkPlayerIsCombatTeamByID(this.playerId) == false) {
                return;
            }
            var message = GetMessage(opCodes.C2G_COMBATTEAM_ABDICATE);
            message.playerId = this.playerId || 0;
            SendGameMessage(message);
        }
        else if (name == "tichuxm") {
            if (TeamSystem.getInstance().checkPlayerIsCombatTeamByID(this.playerId) == false) {
                return;
            }
            var message = GetMessage(opCodes.C2G_COMBATTEAM_EXPEL);
            message.playerId = this.playerId || 0;
            SendGameMessage(message);
        }
        else if (name == "tichutt") {
            //天梯踢出队伍的操作
            var message = GetMessage(opCodes.C2G_LEAGUE_MATCH_KICK_TEAM);
            message.id = this.playerId || 0;
            SendGameMessage(message);
        }
        return this.hideWnd();
    };
    MainPlayerFrame.prototype.onMouseDown = function (args) {
        var target = args.touchEvent.target;
        if (UiUtil.isExcludeChild(target, [this.mLayoutNode])) {
            this.hideWnd();
        }
    };
    //////////////////////////////////////////////////////////////公共接口////////////////////////////////////
    MainPlayerFrame.prototype.showMainPlayerFrame = function (spacex, spacey, playerId, playerName) {
        this.spacex = spacex;
        this.spacey = spacey;
        this.playerId = playerId;
        this.playerName = playerName;
        if (this.isVisible() == false) {
            return this.showWnd();
        }
        else {
            return this.refreshFrame();
        }
    };
    MainPlayerFrame.prototype.showMainPlayerFrameWithList = function (spacex, spacey, playerId, list, playerName) {
        this.showMainPlayerFrame(spacex, spacey, playerId, playerName); //{"", "", ""}
        this.refreshFrameWithList(list);
    };
    return MainPlayerFrame;
}(BaseWnd));
__reflect(MainPlayerFrame.prototype, "MainPlayerFrame");
//# sourceMappingURL=MainPlayerFrame.js.map