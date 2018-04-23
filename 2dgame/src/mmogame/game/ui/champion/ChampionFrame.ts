class ChampionFrame extends BaseWnd {
    tabWndList: UITabWndList
    tabIndex: number

    public initObj(...params: any[]) {
        this.mLayoutPaths = ["layouts/champion/ChampionLayout.exml"]

        this.tabIndex = -1;
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
            { name: "arena", wnd: ChampionArenaWindow.newObj(this.mLayoutNode, this) },
            { name: "peerless", wnd: ChampionPeerlessWindow.newObj(this.mLayoutNode, this) },
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

    //以0开头，0是第一个标签
    showWithIndex(index?) {
        if (index == null) {
            index = 0
        }
        this.tabIndex = index;
        this.showWnd();
    }
}