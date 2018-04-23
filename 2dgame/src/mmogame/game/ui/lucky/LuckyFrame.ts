class LuckyFrame extends BaseWnd {
    tabWndList: UITabWndList
	radioConfig;
	activityIndex : number

    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/lucky/LuckyLayout.exml"]
	}

    public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setFullScreen(true)
		this.initSkinElemList();
		this.mLayoutNode.setDoModal(true)

		this.mElemList["group_tab1"].visible = false;
		this.mElemList["group_tab2"].visible = false;

		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "lucky_btn1", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClick },
			{ ["name"]: "lucky_btn2", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClick },
			{ ["name"]: "lucky_btn3", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClick },
			];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

		let tabInfoList = [
			{ name: "radio1", wnd: XunbaoWindow.newObj(this.mLayoutNode, this) },
			{ name: "radio2", wnd: LuckyWindow.newObj(this.mLayoutNode, this) },
		]
		this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList)

		for (let i = 1; i<4; i++) {
			let rd = this.mElemList["lucky_rd"+i]
			rd.setAlignFlag(gui.Flag.H_CENTER)
		}
		
		this.tabWndList.setSelectedCallback(this.test, this)
	}

	test(){

	}

    public onUnLoad(): void {    
		
	}

	public onShow(): void {
		RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this)
		this.mLayoutNode.visible = true;
		this.onRefresh()
		this.tabWndList.setWndVisible(true);
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this)
		this.mLayoutNode.visible = false;
		this.tabWndList.setWndVisible(false);
	}

	onRefresh(){

	}

	initItemWindow(window,data){
	
	}

	refreshItemWindow(window, data){

	}

	onClick(args){
		let name = args.target.name
		let index = name.replace(/[^0-9]/ig, "")	//选择的是第几个按钮
		index = tonumber(index)
		let info = this.radioConfig[index-1] || null
		if(info == null){
			return
		}

		let bindGold = GetHeroProperty("bindGold")
		let curGold= GetHeroProperty("gold")
		// let config = info.config[index]
		let typeS =  info[1]
		let needNum = info[2]
		if(typeS == opItemUnit.BIND_CURRENCY){
			if(needNum > bindGold){
				MsgSystem.addTagTips(Localize_cns("LUCKY_TXT3"))
				return
			}
		}else if(typeS == opItemUnit.CURRENCY){
			if(needNum > curGold){
				MsgSystem.addTagTips(Localize_cns("LUCKY_TXT4"))
				return
			}
		}

		RpcProxy.call("C2G_DoOperateActivity",this.activityIndex,[index])	//抽奖
	}
}