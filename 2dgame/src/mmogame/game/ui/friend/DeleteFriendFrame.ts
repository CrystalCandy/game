// TypeScript file


class DeleteFriendFrame extends BaseWnd {

    static deleteWndType = {
        deleteFriend: 1,
        deleteChat: 2,
        deleteEmail: 3,
        deleteMsg: 4, //留言
    }

    deleteType: number;
    friendIdToDelete:number;
    public initObj(...params: any[]) {
        this.deleteType = DeleteFriendFrame.deleteWndType.deleteFriend

    }

    public onLoad(): void {
        // 创建普通信息提示框
        UiUtil.setWH(this.mLayoutNode, 300, 160);
        this.setAlignCenter(true, true);
        let mElemInfo: any = [
            { ["index_type"]: gui.Grid9Image, ["name"]: "deleteBG", ["title"]: "", ["font"]: null, ["image"]: "ty_UIBg01", ["color"]: null, ["x"]: 0, ["y"]: 0, ["percentWidth"]: 100, ["percentHeight"]: 100, ["event_name"]: null, ["fun_index"]: null, },
            { ["index_type"]: gui.Button, ["name"]: "delete_btn", ["title"]: Localize_cns("DELETE_FRIEND"), ["font"]: "ht_24_cc_stroke", ["image"]: "ty_tongYongBt01", ["color"]: gui.Color.white, ["horizontalCenter"]: 0, ["verticalCenter"]: 0, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onDeleteFriendBtnClick },


            //{ ["index_type"]: gui.Button, ["name"]: "close_btn", ["image"]: "ty_bt_back01", ["left"]: 10, ["bottom"]: 10, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
        ]
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this)
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        this.mLayoutNode.visible = true;
        RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
    }

    public onHide(): void {
        this.mLayoutNode.visible = false;
        UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
    }

    setDeleteTypeAndShow(deleteType, friendIdToDelete) {
        this.deleteType = deleteType
        this.friendIdToDelete = friendIdToDelete
        this.showWnd()


        let deleteWndType = DeleteFriendFrame.deleteWndType
        if (deleteType == deleteWndType.deleteFriend) {
            this.mElemList["delete_btn"].text = (Localize_cns("DELETE_FRIEND"))
        } else if (deleteType == deleteWndType.deleteChat) {
            this.mElemList["delete_btn"].text = (Localize_cns("DELETE_CHAT"))
        } else if (deleteType == deleteWndType.deleteMsg) {
            this.mElemList["delete_btn"].text = (Localize_cns("PER_HOMEPAGE_TEXT62"))
        }
    }


    onDeleteFriendBtnClick(args) {
        TLog.Debug("DeleteFriendFrame.onDeleteFriendBtnClick", this.deleteType)
        let deleteWndType = DeleteFriendFrame.deleteWndType

        if (this.deleteType == deleteWndType.deleteFriend) {
            FriendSystem.getInstance().deleteFriend(this.friendIdToDelete)
        } else if (this.deleteType == deleteWndType.deleteChat) {
            FriendSystem.getInstance().deleteChatInfoByID(this.friendIdToDelete)
            WngMrg.getInstance().getWindow("FriendsFrame").refreshFrame()
        } else if (this.deleteType == deleteWndType.deleteMsg) {
            let message = GetMessage(opCodes.C2G_ROLE_HOME_PAGE_MESSAGE_CLEAR)
            message.msgIndex = this.friendIdToDelete
            message.isAllClear = 0
            SendGameMessage(message)
        } else {

        }
        this.hideWnd()
    }

     onMouseDown(args: GameTouchEvent) {
        
        let target = args.touchEvent.target;
        let isExclude = UiUtil.isExcludeChild(target, [this.mLayoutNode])
        if(isExclude){
            this.hideWnd()
        }
    }

}