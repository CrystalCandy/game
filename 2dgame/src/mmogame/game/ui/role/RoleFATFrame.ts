class RoleFATFrame extends BaseWnd {
    tabWndList: UITabWndList
    tabIndex: number
	select;
	stage;
	jiHuoList;
    controlList;
    unreal;
    actor
    
    
    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/role/RoleFATLayout.exml"]
        this.tabIndex = -1
	}
    public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setFullScreen(true)
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_unreal", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onUnrealClick},
			{ ["name"]: "btn_left", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onLeftClick },
            { ["name"]: "btn_right", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onRightClick },
			{ ["name"]: "btn_search", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onSearchClick },
				];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

		this.mElemList["rd_1"].setAlignFlag(gui.Flag.CENTER_TOP);
        this.mElemList["rd_2"].setAlignFlag(gui.Flag.LEFT_CENTER);
        this.mElemList["rd_3"].setAlignFlag(gui.Flag.LEFT_CENTER);
        this.mElemList["rd_4"].setAlignFlag(gui.Flag.LEFT_CENTER);

		this.mElemList["itemBox"] = UIItemBox.newObj(this.mLayoutNode, "itemBox",0, -2, this.mElemList["group_rd2"])
		//this.mElemList["btn_unreal"].visible = false;

		for(let i = 1; i <= 5; i++){
			this.mElemList["group" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSkin, this)
		}
		let tabInfoList = [
			{ name: "fashion", wnd: RoleFunTitleWindow.newObj(this.mLayoutNode, this) },
			{ name: "title", wnd: RoleFunTitleWindow.newObj(this.mLayoutNode, this) },
			
		]
		this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList)

        this.tabWndList.setSelectedCallback(this.refreshDotTips, this)

        this.actor = UIActorView.newObj(this.mLayoutNode, "actor", 0, 0, this.mElemList["actor"])
	}
    public onUnLoad(): void {
        let actorView:UIActorView = this.mElemList["actor"]
		actorView.clearView()
	}

	public onShow(): void {
      //  RegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this)
		this.mLayoutNode.visible = true;
		this.tabWndList.setWndVisible(true);
       

		if (this.tabIndex != -1) {
			this.tabWndList.changeTabWithIndex(this.tabIndex)
		}
	}

	public onHide(): void {
      //  UnRegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this)
		this.mLayoutNode.visible = false;
		this.tabWndList.setWndVisible(false);
		
	}
    
    ///----------响应事件
	onLeftClick() {
        let wnd = this.tabWndList.getCurrentWnd()
        if(wnd){
            wnd.onLeftClick(event)
        }
    }
    onRightClick() {
        let wnd = this.tabWndList.getCurrentWnd()
        if(wnd){
            wnd.onRightClick(event)
        }
    } 
    
    onSearchClick(){
        let wnd = this.tabWndList.getCurrentWnd()
        if(wnd){
            wnd.onSearchClick(event)
        }
    }

    onUnrealClick(event :egret.TouchEvent){
        let wnd = this.tabWndList.getCurrentWnd()
        if(wnd){
            wnd.onUnrealClick(event)
        }
	}
	
    showWithIndex(index) {
        this.tabIndex = index;
        this.showWnd();
    }
	
	onClickSkin(event: egret.TouchEvent) {
        let wnd = this.tabWndList.getCurrentWnd()
        if(wnd){
            wnd.onClickSkin(event)
        }
    }

    	////////////////////红点提示/////////////////////
	//自定义红点继承实现
	refreshDotTipsImp() {
        this.refreshIconDot()
	}

    refreshIconDot(){
        let wnd = this.tabWndList.getCurrentWnd()
        if(wnd){
            wnd.refreshIconDot(event)
        }
	}
}