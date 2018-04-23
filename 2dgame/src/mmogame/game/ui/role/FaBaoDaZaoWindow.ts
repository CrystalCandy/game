class FaBaoDaZaoWindow extends BaseCtrlWnd {
	mElemList;
    dazaoScroll: UIScrollList
	controlData 

	public initObj(...params: any[]) {

	}
    public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;
		
		var elemInfo = [
			{ ["name"]: "btn_putong", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onPuTongClick },
			{ ["name"]: "btn_wanmei", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onWanMeiClick },	
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

		let group : eui.Group = this.mElemList["dazao"]
		this.dazaoScroll = UIScrollList.newObj(this.mLayoutNode, "dazaoScroll", 0, 0, group.width, group.height, group)

		for(let k = 1; k <= 3; k++){
			let boxName = "dazaoBox_" + k
			let parent = this.mElemList["group_mat_"+ k]
			this.mElemList[boxName] = UIItemBox.newObj(this.mLayoutNode, boxName, 0, 0, parent)
		}
	}

	public onUnLoad(): void {

	}

	public onShow(): void {
        RegisterEvent(EventDefine.ACTOR_ROLE_FABAO_UPDATE, this.onRefresh, this)
		RegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this)
		this.mElemList["group_dazao"].visible = true;
		this.mElemList["title"].text = Localize_cns("FABAO_TITLE_TXT3");

		this.onRefresh();
	}

	public onHide(): void {
		UnRegisterEvent(EventDefine.ACTOR_ROLE_FABAO_UPDATE, this.onRefresh, this)
		UnRegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this)
		this.mElemList["group_dazao"].visible = false;
		
	}

    onRefresh(){

		let itemList = [
			RoleSystem.FABAO_DAZAO_MAT_FASHU, RoleSystem.FABAO_DAZAO_MAT_SHENTIE, 
			RoleSystem.FABAO_DAZAO_MAT_XUANJING
		]
		for(let k = 1; k <= 3; k++){
			let boxName = "dazaoBox_" + k
			let itemid = itemList[k-1]
			let fontColor = GetItemFontGUIColor(itemid)
			let had = ItemSystem.getInstance().getItemCount(itemid)
			let need = 1
			this.mElemList[boxName].updateByEntry(itemid)
			this.mElemList[boxName].setCountText(had, need)
			this.mElemList["mat_name_" + k].textColor = fontColor
			this.mElemList["mat_name_" + k].text = GameConfig.itemConfig[itemid].name
		}
		let accesStr1 = Localize_cns("FABAO_DAZAO_TXT1")
		let accesStr2 = Localize_cns("FABAO_DAZAO_TXT2")
		AddRdContent(this.mElemList["rd_mat_1"], accesStr1, "ht_20_cc")
		AddRdContent(this.mElemList["rd_mat_2"], accesStr2, "ht_20_cc")

		let twice = 0
		let twiceStr = String.format(Localize_cns("FABAO_DAZAO_TXT3"), twice)
		AddRdContent(this.mElemList["rd_twice"], twiceStr, "ht_20_cc")

		//滑动区域
		let scroll = this.dazaoScroll
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
			let windName = "_dazao" + k
			let mElemInfo: any = [
		 		{ ["index_type"]: eui.Group, ["name"]: name + windName +  "_group", ["title"]:"", ["x"]: x, ["y"]: 0, ["w"]: w, ["h"]: height,},
		 		{ ["index_type"]: eui.Image,["name"] : name + windName +"_bg",  ["parent"]:name + windName +  "_group", ["image"]: "fb_faBaoDi01",  ["x"] : 0, ["y"] : 0,["w"] :w ,["h"] : height},	
		 		{ ["index_type"]: eui.Image, ["name"]: name + windName + "_item" ,["parent"]:name + windName +  "_group", ["title"]:"", ["font"]: "", ["image"]: "ty_zhuangBeiBg03", ["color"]: null, ["x"]: 11, ["y"]: 11, ["w"]: 80, ["h"]: 80,},
		 		{ ["index_type"]: gui.Button, ["name"]: name + windName + "_suo" ,["parent"]:name + windName +  "_group", ["title"]:"", ["font"]: "", ["image"]: "cw_jiNengSuo02",  ["x"]: 70, ["y"]: 0, ["w"]: 32, ["h"]: 41, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onSuoClick},
				{ ["index_type"]: eui.Image, ["name"]: name + windName + "_name_bg" ,["parent"]:name + windName +  "_group", ["title"]:"", ["font"]: "", ["image"]: "fb_faBaoTextDi01", ["color"]: null, ["x"]: 4, ["y"]: 75, ["w"]: 94, ["h"]: 34,["messageFlag"]: true },
		 		{ ["index_type"]: eui.Label, ["name"]: name + windName + "_name" ,["parent"]:name + windName +  "_group", ["title"]:"", ["font"]: "ht_20_cc", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 82, ["w"]: w, ["h"]: 20, ["messageFlag"]: true },
		 		
			];
        	UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window );

			let group : eui.Image = this.mElemList[name + windName + "_item"]
			group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenTipsClick, this)
		}
		
	}

	refreshWidow(window, config , index){
		let name = window.name
		
		for(let k = 1; k <= 4; k++){
			let windName = "_dazao" + k 
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


	////--------------响应
	onPuTongClick(){
		let needItem = [
			RoleSystem.FABAO_DAZAO_MAT_FASHU, RoleSystem.FABAO_DAZAO_MAT_SHENTIE
		]
		getSaveRecord
		let isCan = true
		for(let k = 0; k < needItem.length; k++){
			let item = needItem[k]
			let had = ItemSystem.getInstance().getItemCount(item)
			let need = 1
			if(had < need ){
				isCan = false
				break
			}
		}
		if(!isCan){
			MsgSystem.addTagTips(Localize_cns("FABAO_TIPS_TXT1"))
			return 
		}
		RpcProxy.call("C2G_EquipTalismanCreate", 1)
	}

	onWanMeiClick(){
		let item = RoleSystem.FABAO_DAZAO_MAT_XUANJING
		let had = ItemSystem.getInstance().getItemCount(item)
		let need = 1
		if(had < need){
			let wnd : GoodsAsseceFrame = WngMrg.getInstance().getWindow("GoodsAsseceFrame")
			wnd.onShowWnd(item, need - had)
			return 
		}
		RpcProxy.call("C2G_EquipTalismanCreate", 2)
	}

	onSuoClick(args){
		let name = args.target.name
		let index  = name.replace(/[^0-9]/ig, "") 
		
		let item  : Item = this.controlData[index]
		let sendNumber = this.mElemList[name].source == "cw_jiNengSuo02" ?1 : 0
		RpcProxy.call("C2G_EquipTalismanLock", item.id , sendNumber)
	}

	onOpenTipsClick(args ){
		let name = args.target.name
		let index  = name.replace(/[^0-9]/ig, "") 
		let item  : Item = this.controlData[index]
		let wnd : FaBaoItemTipsFrame = WngMrg.getInstance().getWindow("FaBaoItemTipsFrame")
		wnd.onShowWnd(item , true)	
	}
}