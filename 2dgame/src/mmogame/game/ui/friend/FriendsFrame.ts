// TypeScript file

class FriendsFrame extends BaseWnd {
    tabWndList: UITabWndList;
    tabIndex: number;

    public initObj(...params: any[]) {
        this.mLayoutPaths = ["layouts/friend/FriendsLayout.exml"]
        this.tabIndex = -1
    }

    public onLoad(): void {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true)
        this.initSkinElemList();

        var elemInfo = [
            { ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            { ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

        let tabInfoList = [
            { name: "tab_friend", wnd: SocialFriendWindow.newObj(this.mLayoutNode, this) },
            { name: "tab_apply", wnd: SocialApplyWindow.newObj(this.mLayoutNode, this) },
            { name: "tab_black", wnd: SocialBlackListWindow.newObj(this.mLayoutNode, this) },
        ]
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList)
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        this.mLayoutNode.visible = true;
        this.tabWndList.setWndVisible(true);

		if (this.tabIndex != -1) {
			this.tabWndList.changeTabWithIndex(this.tabIndex)
		}
    }

    public onHide(): void {
        this.mLayoutNode.visible = false;
        this.tabWndList.setWndVisible(false);
    }
    ////////////////////////////////////////////////////////////////////////
    showWithIndex(index: number) {
        this.tabIndex = index;
        this.showWnd();
    }

}