class FaBaoQualityWindow extends BaseCtrlWnd {
	mElemList;
	scroll : UIScrollList
	controlData 

	public initObj(...params: any[]) {

	}
    public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;
		this.scroll = this.mParentWnd.scroll
	}

	public onUnLoad(): void {
		
	}

	public onShow(): void {
		
		this.onRefresh();
	}

	public onHide(): void {
		
	}

	onRefresh(){

		let index = this.mParentWnd.tabWndList.getTabIndex()
		let nameList = [
			Localize_cns("FABAO_QUALITY_TXT1"), Localize_cns("FABAO_QUALITY_TXT2"), Localize_cns("FABAO_QUALITY_TITLE"),
		]
		this.mElemList["title"].text = nameList[index]

		let qualitylist = [
			RoleSystem.FABAO_QUALITY_CHUANSHUO, RoleSystem.FABAO_QUALITY_WANMEI
		]

		let list = []
		let tempConfig = GameConfig.TalismanEquip
		if(qualitylist[index] != null){
			for(let k in tempConfig){
				let entryId = tonumber(k)
				let quality = qualitylist[index]
				let itemInfo: any = {}
				itemInfo.entry = entryId
				itemInfo.quality = quality
				let item = Item.newObj(itemInfo)
				table_insert(list, item )
			}
		}else{
			for(let i = 1 ; i <= 6 ; i++){
				if(table_isExsit(qualitylist, i)) continue
				for(let k in tempConfig){
					let entryId = tonumber(k)
					let quality =  i
					let itemInfo: any = {}
					itemInfo.entry = entryId
					itemInfo.quality = quality
					let item = Item.newObj(itemInfo)
					table_insert(list, item)
				}
			}
			/*for(let k in tempConfig){
				for(let i = 1 ; i <= 6 ; i++){
					if(table_isExsit(qualitylist, i)) continue
					let entryId = tonumber(k)
					let quality =  i
					let itemInfo: any = {}
					itemInfo.entry = entryId
					itemInfo.quality = quality
					let item = Item.newObj(itemInfo)
					table_insert(list, item)
				}
			}
			table_sort(list, function(a, b){
				return a.getProperty("quality") - b.getProperty("quality")
			})*/
		}

		if(this.scroll == null) return
		let scroll  = this.scroll
		let showList = splitListByCount(list, 2)
		scroll.clearItemList()
		this.controlData = {}
		for(let k = 1; k <= size_t(showList); k++){
			let config = showList[k - 1]
			let window = scroll.getItemWindow(k, 550, 102, 0,0)
			this.initWindow(window)
			this.refreshWindow(window, config , k)
		}
		scroll.refreshScroll(true, true)
		scroll.restoreViewXY()
	}

	initWindow(window ){
		let name = window.name
		for(let k = 1 ; k <= 2; k++){
			let x = 280*(k-1)
			let elemInfo = [
            	{ ["index_type"]: eui.Group, ["name"]: "group_" + k + name, ["title"]: "", ["font"]:"ht_20_lc",["image"]: "", ["color"]: gui.Color.ublack, ["x"]: x, ["y"]: 0, ["w"]: 270, ["h"]: 102 },
				{ ["index_type"]: gui.Grid9Image, ["name"]: "bg_"+ k + name, ["parent"]:"group_" + k + name, ["title"]: "", ["font"]:"ht_20_cc",["image"]: "ty_uiDi03", ["x"]: 0, ["y"]: 0, ["w"]: 270, ["h"]: 102 , ["messageFlag"] : true},
				{ ["index_type"]: eui.Group, ["name"]: "item_" + k + name, ["parent"]:"group_" + k + name, ["title"]: "", ["font"]:"ht_20_lc",["image"]: "", ["color"]: gui.Color.ublack, ["x"]: 0, ["y"]: 2, ["w"]: 100, ["h"]: 99 },
				{ ["index_type"]: eui.Image, ["name"]: "bg_name_"+ k + name, ["parent"]:"group_" + k + name, ["title"]: "", ["font"]:"ht_20_cc",["image"]: "fb_faBaoTextDi02", ["x"]: 107, ["y"]: 12, ["w"]: 157, ["h"]: 39, ["messageFlag"] : true},
            	{ ["index_type"]: eui.Label, ["name"]: "name_" + k + name, ["parent"]:"bg_name_"+ k + name, ["title"]: "", ["font"]:"ht_20_cc",["image"]: "", ["color"]: gui.Color.green, ["x"]: 0, ["y"]: 10, ["w"]: 157, ["h"]: 20 , ["messageFlag"] : true},
            	{ ["index_type"]: gui.RichDisplayer, ["name"]: "quality_" + k + name, ["parent"]:"group_" + k + name, ["title"]: "", ["font"]:"ht_24_lc",["image"]: "", ["color"]: gui.Color.blue, ["x"]: 107, ["y"]: 64, ["w"]: 157, ["h"]: 24 , ["messageFlag"] : true},
            	
        	]
			UiUtil.createElem(elemInfo, this.mLayoutNode, this.mElemList, this, window)
			this.mElemList["quality_" + k + name].setAlignFlag(gui.Flag.CENTER_CENTER)
			this.mElemList["itemBox_" + k + name] = UIItemBox.newObj(this.mElemList,"itemBox_" + k + name , 0, 0 , this.mElemList["item_" + k + name])
			this.mElemList["itemBox_" + k + name].setItemTipsListner(this.onOpenTipsClick, this, k)
		}
		

	}

	refreshWindow(window,config, index){
		let name = window.name 
		for(let k = 1; k <= 2 ; k++){
			let item : Item = config[k-1]
			if(item){
				this.mElemList["group_" + k + name].visible = true
				let dataKey = tostring(index) + k
				this.controlData[dataKey] = item
				let itemName = item.getName()
				let quality = item.getProperty("quality")
				let entryId = item.entryId
				let fontColor = "#" + GetQualityColorStr(quality)
				let fontGUIColor = GetQualityGUIColor(quality)
				this.mElemList["name_" + k + name].textColor = fontGUIColor
				this.mElemList["name_" + k + name].text = itemName

				let qualityStr = Localize_cns("FABAO_QUALITY_TXT7") + fontColor + GetFaBaoQualityStr(quality)
				AddRdContent(this.mElemList["quality_" + k + name], qualityStr , "ht_20_cc", "black")

				this.mElemList["itemBox_" + k + name].updateByItem(item)
			}else{
				this.mElemList["group_" + k + name].visible = false
			}
			
			
		}
	}

	//-----------
	onOpenTipsClick(logicItem , userData, args ){
		let wnd : FaBaoItemTipsFrame = WngMrg.getInstance().getWindow("FaBaoItemTipsFrame")
		wnd.onShowWnd(logicItem, false)	
		return true
	}

}