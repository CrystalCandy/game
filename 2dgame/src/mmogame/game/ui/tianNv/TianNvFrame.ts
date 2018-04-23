class TianNvFrame extends BaseWnd {
    tabWndList: UITabWndList
    tabIndex: number
    Player : Player


    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/TianNvLayout.exml"]
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
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

		let tabInfoList = [
			{ name: "tiannv", wnd: TianNvTianNvWindow.newObj(this.mLayoutNode, this), check:this.onTab0Click, obj:this },
			{ name: "xianqi", wnd: TianNvXianQiWindow.newObj(this.mLayoutNode, this), check:this.onTab1Click, obj:this },
			{ name: "huanian", wnd: TianNvHuaNianWindow.newObj(this.mLayoutNode, this), check:this.onTab2Click, obj:this  },
			{ name: "lingqi", wnd: TianNvLingQiWindow.newObj(this.mLayoutNode, this), check:this.onTab3Click, obj:this  },
		]
		this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList)
	
		this.tabWndList.setSelectedCallback(this.refreshDotTips, this)
		
		
	}
    public onUnLoad(): void {
		
	}

	public onShow(): void {
	//	RegisterEvent(EventDefine.ACTOR_XIANLV_UPDATE, this.onRefresh, this)
		this.mLayoutNode.visible = true;
		this.tabWndList.setWndVisible(true);
       
		if (this.tabIndex != -1) {
			this.tabWndList.changeTabWithIndex(this.tabIndex)
		}
	}

	public onHide(): void {
	//	UnRegisterEvent(EventDefine.ACTOR_XIANLV_UPDATE, this.onRefresh, this)
		this.mLayoutNode.visible = false;
		this.tabWndList.setWndVisible(false);
		
	}

    ////接口
    showWithIndex(index){
        this.tabIndex = index
        this.showWnd()
    }


   ///////////////// ///响应事件
    onTab0Click(){
        return true
    }
	onTab1Click(){
        return true
    }
	onTab2Click(){
        return true
    }
	onTab3Click(){
        return true
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


}