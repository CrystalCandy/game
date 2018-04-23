class FaBaoFaBaoWindow extends BaseCtrlWnd {
	mElemList;
	actor : UIActorView
	select : number
	fabaoScroll : UIScrollList
	controlData  

	public initObj(...params: any[]) {

	}
    public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;
		this.actor = this.mParentWnd.actor
		
		
		let group : eui.Group = this.mElemList["fabao"]
		this.fabaoScroll = UIScrollList.newObj(this.mLayoutNode, "fabaoScroll", 0, 0, group.width, group.height, group)
	}

	public onUnLoad(): void {

	}

	public onShow(): void {
        RegisterEvent(EventDefine.ACTOR_ROLE_UPDATE, this.onRefresh, this)
		RegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this)
		this.mElemList["group_fabao"].visible = true;
        this.mElemList["fabao"].visible = true;
		
		this.mElemList["title"].text = Localize_cns("FABAO_TITLE_TXT1");

		this.onRefresh();
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.ACTOR_ROLE_UPDATE, this.onRefresh, this)
		UnRegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this)
		this.mElemList["group_fabao"].visible = false;
        this.mElemList["fabao"].visible =  false
		this.mParentWnd.selectIndex = this.select	
	}

    onRefresh(){
		this.mParentWnd.refreshFaBaoItem()
		let fabaoInfo = RoleSystem.getInstance().getFaBaoInfo()
		if(fabaoInfo == null) return 
		let force = fabaoInfo["force"]
		DrawNumberStringImage(this.mElemList["bImage"], "zhanLi_", "z" + force, 0, 0, -3)

		this.select = this.mParentWnd.selectIndex  || 2
		this.mElemList["btn_quality"].visible =  true
		let playerInfo = GetHeroPropertyInfo()
		let actorView:UIActorView = this.actor
		actorView.updateByPlayerAppearInfo(playerInfo)

		for(let k = 1; k <= 4; k++){
			this.mElemList["image_select_" + k].visible = false
		}
		this.mElemList["image_select_" + this.select].visible = true

		//滑动区域
		let scroll = this.fabaoScroll
		this.controlData = {}
		scroll.clearItemList()
		let itemType = opItemType.ROLE_ALLSMAN	
		let list = ItemSystem.getInstance().getItemLogicInfoByType(itemType)
		let showList = splitListByCount(list, 4)
		for(let k = 0; k < size_t(showList); k++){
			let v = showList[k]
			let window = scroll.getItemWindow(k, 440, 102 , 0, 0)
			this.onInitWindow(window)
			this.refreshWidow(window, v, k)
		}
		scroll.refreshScroll(true, true)
		scroll.restoreViewXY()
    }
	
	onInitWindow(window){
		let name = window.name
		let w = 102
		let height = window.height
		
		for(let k = 1; k <= 4; k++){
			let x = 112 * (k-1)
			let windName = "_fabao" + k
			let mElemInfo: any = [
		 		{ ["index_type"]: eui.Group, ["name"]: name + windName +  "_group", ["title"]:"", ["x"]: x, ["y"]: 0, ["w"]: w, ["h"]: height,},
		 		{ ["index_type"]: eui.Image,["name"] : name + windName +"_bg",  ["parent"]:name + windName +  "_group", ["image"]: "fb_faBaoDi01",  ["x"] : 0, ["y"] : 0,["w"] :w ,["h"] : height, ["messageFlag"]: true },	
		 		{ ["index_type"]: eui.Image, ["name"]: name + windName + "_item" ,["parent"]:name + windName +  "_group", ["title"]:"", ["font"]: "", ["image"]: "ty_zhuangBeiBg03", ["color"]: null, ["x"]: 11, ["y"]: 11, ["w"]: 80, ["h"]: 80,},
		 		{ ["index_type"]: gui.Button, ["name"]: name + windName + "_suo" ,["parent"]:name + windName +  "_group", ["title"]:"", ["font"]: "", ["image"]: "cw_jiNengSuo02",  ["x"]: 70, ["y"]: 0, ["w"]: 32, ["h"]: 41, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onSuoClick},
				{ ["index_type"]: eui.Image, ["name"]: name + windName + "_name_bg" ,["parent"]:name + windName +  "_group", ["title"]:"", ["font"]: "", ["image"]: "fb_faBaoTextDi01", ["color"]: null, ["x"]: 4, ["y"]: 75, ["w"]: 94, ["h"]: 34,["messageFlag"]: true },
		 		{ ["index_type"]: eui.Label, ["name"]: name + windName + "_name" ,["parent"]:name + windName +  "_group", ["title"]:"", ["font"]: "ht_20_cc", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 82, ["w"]: w, ["h"]: 20, ["messageFlag"]: true },
		 		
			];
        	UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window );

			let group : eui.Image = this.mElemList[name + windName + "_item"]
			group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFaBaoWear, this)
		}
		
	}

	refreshWidow(window, config, index){
		let name = window.name
		for(let k = 1; k<= 4; k++){ 
			let windName = "_fabao" + k
			let item : Item = config[k-1]
			if(item){
				let dataKey = tostring(index) + k
				this.controlData[dataKey] = item
				this.mElemList[name + windName +  "_group"].visible = true
				let itemName =  item.getRefProperty("name")
				let icon = GetItemIcon(item.entryId)
				let image = item.getProperty("talisman_lock") == 0 ? "cw_jiNengSuo02" : "cw_jiNengSuo03"
			
				let fontColor = GetItemFontGUIColor(item.entryId)
				this.mElemList[name + windName + "_item"].source = icon
				this.mElemList[name + windName + "_name"].textColor = fontColor
				this.mElemList[name + windName + "_name"].text = itemName

				this.mElemList[name + windName + "_suo"].source = image

			}else{
				this.mElemList[name + windName +  "_group"].visible = false
			}
		}
	}

	////////------------响应事件
	onFaBaoClick(args : egret.Event){
		let name = args.target.name
		let index  = name.replace(/[^0-9]/ig, "") 

		this.select = tonumber(index)
		this.mParentWnd.selectIndex = this.select
		for(let k = 1; k <= 4; k++){
			this.mElemList["image_select_" + k].visible = false
		}
		this.mElemList["image_select_" + this.select].visible = true
	}

	onFaBaoWear(args : egret.Event){
		let name = args.target.name
		let index  = name.replace(/[^0-9]/ig, "") 
		
		let item  : Item = this.controlData[index]
		if(item == null) return 
		let osTime = GetServerTime()
		if(this.mElemList[name].touchTime == null){
			this.mElemList[name].touchTime = osTime
		}
		let diffTime = osTime - this.mElemList[name].touchTime
		if(diffTime != 0 && diffTime <= 1){
			MsgSystem.addTagTips("shuangji")
			this.mElemList[name].touchTime == null
		}else{
			let wnd : FaBaoItemTipsFrame = WngMrg.getInstance().getWindow("FaBaoItemTipsFrame")
			wnd.onShowWnd(item, true, this.select)
		}
	}

	onSuoClick(args){
		let name = args.target.name
		let index  = name.replace(/[^0-9]/ig, "") 
		
		let item  : Item = this.controlData[index]
		let sendNumber = this.mElemList[name].source == "cw_jiNengSuo02" ?1 : 0
		RpcProxy.call("C2G_EquipTalismanLock", item.id , sendNumber)
	}
}