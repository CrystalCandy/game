// TypeScript file

class SocialApplyWindow extends BaseCtrlWnd {
    mElemList;
    scroll: UIScrollList;
    list: any[];

    public initObj(...params: any[]): void {
        this.list = []
    }
    public onLoad(): void {
        this.mElemList = this.mParentWnd.mElemList;

        let ElemInfo = [
            { ["name"]: "btn_apply1", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["index_type"]: this.onClickAddFriendBtn }
        ]

        let group = <eui.Group>this.mElemList["apply_scroll_wnd"]
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "apply_scroll", 0, 0, group.width, group.height, group)
    }

    public onUnLoad(): void {
    }

    public onShow(): void {
        RegisterEvent(EventDefine.RECOMMEND_FRIEND, this.refreshRecommendFriendFrame, this)
        RegisterEvent(EventDefine.FRIEND_APPLYLIST_UPDATE, this.refresh, this)
        RegisterEvent(EventDefine.CHAT_GROUP_INVITE_LIST, this.refresh, this)
        RegisterEvent(EventDefine.CHAT_GROUP_AGREE_JOIN, this.refresh, this)
        RegisterEvent(EventDefine.APPLY_TO_FRIEND, this.refresh, this)

        this.mElemList["apply_wnd"].visible = true;

        this.refresh()
    }

    public onHide(): void {
        UnRegisterEvent(EventDefine.RECOMMEND_FRIEND, this.refreshRecommendFriendFrame, this)
        UnRegisterEvent(EventDefine.FRIEND_APPLYLIST_UPDATE, this.refresh, this)
        UnRegisterEvent(EventDefine.CHAT_GROUP_INVITE_LIST, this.refresh, this)
        UnRegisterEvent(EventDefine.CHAT_GROUP_AGREE_JOIN, this.refresh, this)
        UnRegisterEvent(EventDefine.APPLY_TO_FRIEND, this.refresh, this)

        this.mElemList["apply_wnd"].visible = (false)
    }

    onShowRecommendWnd() {
        this.mElemList["recommand_player1"].visible = (true)
        this.mElemList["recommand_player2"].visible = (true)

        // let group = <eui.Group>this.mElemList["apply_scroll_wnd"]
        // UiUtil.setWH(group, 560, 365)
        // this.scroll.refreshScroll()
    }

    onHideRecommendWnd() {
        this.mElemList["recommand_player1"].visible = (false)
        this.mElemList["recommand_player2"].visible = (false)
        // let group = <eui.Group>this.mElemList["apply_scroll_wnd"]
        // UiUtil.setWH(group, 560, 672)
        // this.scroll.refreshScroll()
    }

    //推荐好友
    refreshRecommendFriendFrame() {
        let recommendList = FriendSystem.getInstance().getRecommendFriendList()

        if (recommendList.length > 0) {
            this.onShowRecommendWnd()
            for (let i = 1; i <= 2; i++) {
                let friendInfo = recommendList[i - 1]
                let wnd = this.mElemList["recommand_player" + i]
                if (friendInfo == null) {
                    wnd.visible = (false)
                } else {
                    //存在则显示它,注意z顺序与定义顺序一致
                    let str = "#saddlebrown" + friendInfo.roleName + "#rfLv." + friendInfo.level
                    if (!friendInfo.factionName || friendInfo.factionName == "") {
                        str = str + "#br#ublack" + (Localize_cns("NO_JUNTUAN"))
                    } else {
                        str = str + "#br#ublack" + (friendInfo.factionName)
                    }
                    AddRdContent(this.mElemList["name_rd" + i], str, "ht_24_cc", "ublack", 3)

                    this.mElemList["player_icon" + i].source = GetProfessionIcon(friendInfo.vocation, friendInfo.sexId)
                }
            }
        } else {
            this.onHideRecommendWnd()
        }
    }

    refresh() {
        MsgSystem.removeIconMsgByType(IconMsgType.FRIEND_APPLY)
        let strangerList = FriendSystem.getInstance().getApplyStrangerList()

        let show_list = [];
        for (let _strangerId in strangerList) {
            let strangerId = tonumber(_strangerId)
            let strangerInfo = strangerList[strangerId]
            show_list.push({ strangerId, strangerInfo })
        }

        this.list = show_list

        this.scroll.clearItemList()
        for (let i = 0; i < size_t(show_list); i++) {
            let v = show_list[i]
            let window = this.scroll.getItemWindow(i, 560, 130, 0, 0, 0)
            this.initItemWindow(window)
            this.refreshItemWindow(window, v)
        }
        this.scroll.refreshScroll()

        this.refreshRecommendFriendFrame()
    }

    initItemWindow(window) {
        let name = window.name

        let Info = [
            { ["index_type"]: gui.Grid9Image, ["name"]: name + "_bg", ["title"]: null, ["font"]: null, ["image"]: "ty_uiDi03", ["color"]: null, ["x"]: 0, ["y"]: 0, ["w"]: 560, ["h"]: 130, ["messageFlag"]: true },
            { ["index_type"]: gui.Grid9Image, ["name"]: name + "_iconBg", ["title"]: null, ["font"]: null, ["image"]: "ty_renWuKuang01", ["color"]: null, ["x"]: 10, ["y"]: 2, ["w"]: 140, ["h"]: 140, ["messageFlag"]: true },
            { ["index_type"]: gui.Grid9Image, ["name"]: name + "_icon", ["title"]: null, ["font"]: null, ["image"]: "zctx_90001", ["color"]: null, ["x"]: 17, ["y"]: 0, ["w"]: 140, ["h"]: 140, ["event_name"]: egret.TouchEvent.TOUCH_TAP },
            { ["index_type"]: gui.RichDisplayer, ["name"]: name + "_rd", ["x"]: 155, ["y"]: 30, ["w"]: 250, ["h"]: 70, ["messageFlag"]: true },
            { ["index_type"]: gui.Button, ["name"]: name + "_refuse_btn", ["title"]: Localize_cns("FRIENDS_TXT8"), ["font"]: "ht_24_cc_stroke", ["image"]: "ty_tongYongBt2", ["color"]: gui.Color.white, ["x"]: 446, ["y"]: 10, ["w"]: 94, ["h"]: 49, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
            { ["index_type"]: gui.Button, ["name"]: name + "_agree_btn", ["title"]: Localize_cns("FRIENDS_TXT9"), ["font"]: "ht_24_cc_stroke", ["image"]: "ty_tongYongBt2", ["color"]: gui.Color.white, ["x"]: 446, ["y"]: 66, ["w"]: 94, ["h"]: 49, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
        ]
        UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window)
    }

    refreshItemWindow(window, data) {
        let strangerId = data.strangerId
        let strangerInfo = data.strangerInfo
        let name = window.name

        //存在则显示它,注意z顺序与定义顺序一致
        let str = "#saddlebrown" + strangerInfo.roleName + "#rfLv." + strangerInfo.level
        if (!strangerInfo.factionName || strangerInfo.factionName == "") {
            str = str + "#br#ublack" + (Localize_cns("NO_JUNTUAN"))
        } else {
            str = str + "#br#ublack" + (strangerInfo.factionName)
        }
        AddRdContent(this.mElemList[name + "_rd"], str, "ht_24_cc", "ublack", 3)

        this.mElemList[name + "_icon"].source = GetProfessionIcon(strangerInfo.vocation, strangerInfo.sexId)
    }

    //////////////////////////////////////////////////////////////////////
    //推荐好友
    onClickAddFriendBtn(args: egret.TouchEvent) {
        let name = args.target.name
        let index = name.replace(/[^0-9]/ig, "")

        let recommendList = FriendSystem.getInstance().getRecommendFriendList()
        let playerID = recommendList[index - 1]
        if (!playerID) {
            return TLog.Error("FriendFrame get playerID  Error  can't find ", name);
        }

        FriendSystem.getInstance().removeRecommendFriendByID(playerID)

        // let message = GetMessage(opCodes.C2G_DELETE_RECOMMEND_FRIEND)
        // message.deleteID = playerID
        // SendGameMessage(message)
        FriendSystem.getInstance().addFriend(playerID)
    }

    onAgreeClick(args) {
        let name = args.target.name
        let index = name.replace(/[^0-9]/ig, "")

        let strangerInfo = this.list[index].strangerInfo

        // let message = GetMessage(opCodes.C2G_APPLY_FRIEND_ADD_AGREE)
        // message.friendId = tonumber(strangerInfo.roleId)
        // message.isAgree = 1
        // SendGameMessage(message)
    }

    onRefuseClick(args) {
        let name = args.target.name
        let index = name.replace(/[^0-9]/ig, "")

        let strangerInfo = this.list[index].strangerInfo

        // let message = GetMessage(opCodes.C2G_APPLY_FRIEND_ADD_AGREE)
        // message.friendId = tonumber(strangerInfo.roleId)
        // message.isAgree = 0
        // SendGameMessage(message)
    }
}