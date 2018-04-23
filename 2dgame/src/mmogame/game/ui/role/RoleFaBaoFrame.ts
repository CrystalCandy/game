class RoleFaBaoFrame extends BaseWnd {
    tabWndList: UITabWndList
    tabIndex: number
	selectIndex : number
	actor : UIActorView
    
    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/role/RoleFaBaoLayout.exml"]
        this.tabIndex = -1
	}
    public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setFullScreen(true)
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_quality", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onQualityClick },

			{ ["name"]: "image_select_1", ["messageFlag"] :true },
			{ ["name"]: "image_select_2", ["messageFlag"] :true },
			{ ["name"]: "image_select_3", ["messageFlag"] :true },
			{ ["name"]: "image_select_4", ["messageFlag"] :true },
			
			];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

		let tabInfoList = [
			{ name: "tab_0", wnd: FaBaoFaBaoWindow.newObj(this.mLayoutNode, this) },
			{ name: "tab_1", wnd: FaBaoUpgradeWindow.newObj(this.mLayoutNode, this) },
			{ name: "tab_2", wnd: FaBaoDaZaoWindow.newObj(this.mLayoutNode, this) },
			{ name: "tab_3", wnd: FaBaoFenJieWindow.newObj(this.mLayoutNode, this) },
			
		]
		this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList)

		this.actor = UIActorView.newObj(this.mLayoutNode, "actorview", 0, 0, this.mElemList["actor"])

		for(let k = 1; k <= 4 ; k++){
			let group : eui.Group = this.mElemList["fabao_" + k]
			group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFaBaoClick, this)
		}
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
	////--------刷新元宝显示
	refreshFaBaoItem(){

		let fabaoInfo = RoleSystem.getInstance().getFaBaoInfo() //"talismanLevelList:table", "talismanlist:table"
		if(fabaoInfo == null) return 
		let levelList = fabaoInfo["talismanLevelList"]	

		for(let k = 1; k <= 4; k++){
			let item  : Item = RoleSystem.getInstance().getFaBaoItem(k)
			let source = ""
			let name = Localize_cns("FABAO_NAME")
			if(item == null){
				let unLockList = [
					100, 105, 110, 165
				]
			
				let level = GetHeroProperty("level")
				source = "ty_jiNengDi03"
				if(level < unLockList[k-1]){
					source = "cw_jiNengSuo"
					name = unLockList[k-1] + Localize_cns("FABAO_JIESUO")
				}
				this.mElemList["image_sprite_" + k].source = source
				this.mElemList["label_level_" + k].visible = false
				this.mElemList["level_bg_" + k].visible = false
				this.mElemList["name_" + k].text = name
				this.mElemList["label_level_" + k].visible = false
				continue
			}
			source = GetItemIcon(item.entryId)
			this.mElemList["image_sprite_" + k].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenTipsClick, this)
			name  = item.getName()
			this.mElemList["image_sprite_" + k].source = source
			this.mElemList["label_level_" + k].visible = true
			this.mElemList["level_bg_" + k].visible = true
			this.mElemList["label_level_" + k].text = levelList[k + opTalismanEquipPos.begin - 1] 
			this.mElemList["name_" + k].text = name
		}
	}


	///--------------响应事件
	onQualityClick(){
		let wnd : RoleFaBaoQualityFrame = WngMrg.getInstance().getWindow("RoleFaBaoQualityFrame")
		wnd.showWithIndex(0)
	}

	onFaBaoClick(args : egret.Event){
		let wnd = this.tabWndList.getCurrentWnd()
        if (wnd) {
			if(wnd.onFaBaoClick == null) return 
            wnd.onFaBaoClick(args)
        }
	}

	onOpenTipsClick(args ){
		let name = args.target.name
		let index  = name.replace(/[^0-9]/ig, "")
		let item  : Item = RoleSystem.getInstance().getFaBaoItem(tonumber(index)) 
		if(item == null) return 
		let wnd : FaBaoItemTipsFrame = WngMrg.getInstance().getWindow("FaBaoItemTipsFrame")
		wnd.onShowHeroFaBao(item, true, tonumber(index))
	}


	 showWithIndex(index, seletIndex?) {
        this.tabIndex = index;
		this.selectIndex = seletIndex || 2
        this.showWnd();
    }

}