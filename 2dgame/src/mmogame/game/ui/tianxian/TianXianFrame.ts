// TypeScript file
class TianXianFrame extends BaseWnd {

    emptyView: UIEmptyView;
    tabWndList: UITabWndList;
    tabIndex: number;
    Player : Player
    actor : UIActorView

    public initObj(...params: any[]) {
        this.mLayoutPaths = ["layouts/tianxian/TianXianLayout.exml"]
        this.tabIndex = -1;
    }

    public onLoad(): void {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.initSkinElemList();
        this.setFullScreen(true)

        var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },

				];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

        let tabInfoList = [
            { name: "TianXian", wnd: TianXian_GoddessWnd.newObj(this.mLayoutNode, this) },
            { name: "TianXianWeapon", wnd: TianXian_ArtifactWnd.newObj(this.mLayoutNode, this) },
            { name: "tab2", wnd: TianXian_PelletWnd.newObj(this.mLayoutNode, this) },
            { name: "tab3", wnd: TianXian_MeridianWnd.newObj(this.mLayoutNode, this) },
        ]
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList)

        this.tabWndList.setSelectedCallback(this.refreshDotTips, this)

        this.actor  = <UIActorView>UIActorView.newObj(this.mLayoutNode, "actorview", 0, 0, this.mElemList["actor"])
    }


    public onUnLoad(): void {
        let actorView:UIActorView = this.mElemList["actorview"]
		actorView.clearView()
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

    ////////////////////红点提示/////////////////////
    //自定义红点继承实现
	refreshDotTipsImp() {
		FunUITools.refreshEquipDotTIps(this.tabWndList.getCurrentWnd().type, this.tabWndList.getCurrentWnd())
        FunUITools.refreshSkillDotTIps(this.tabWndList.getCurrentWnd().type, this.tabWndList.getCurrentWnd())
		FunUITools.refreshUpgradeDotTIps(this.tabWndList.getCurrentWnd().type, this.tabWndList.getCurrentWnd())
	}

	getDotTipsArgsImp(checkParam) {
		let args: any = {}
		args.index = this.tabWndList.getTabIndex()
		args.type = this.tabWndList.getCurrentWnd().type
		return args
	}

    ////////////////////////////////////////////////////////////////////////////////////
    //以0开头，0是第一个标签
    showWithIndex(index?) {
        if (index == null) {
            index = 0
        }
        this.tabIndex = index;
        this.showWnd();
    }
}