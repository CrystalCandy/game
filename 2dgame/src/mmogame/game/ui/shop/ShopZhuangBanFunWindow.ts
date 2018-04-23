class ShopZhuangBanFunWindow extends BaseCtrlWnd {
	mElemList;
    select:any;
    scroll:UIScrollList
	type
	
	public initObj(...params: any[]) {
		
	}
    public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;
        this.scroll = this.mParentWnd.scroll
        if(this.scroll == null){
            let group: eui.Group = this.mElemList["group_scroll"]
            this.scroll = UIScrollList.newObj(this.mLayoutNode, "tempScroll", 0, 0, group.width, group.height, group)
        }
        
        this.mParentWnd.scroll = this.scroll
		 
        this.select = 0		
	}

	public onUnLoad(): void {
		
	}

	public onShow(): void {
        RegisterEvent(EventDefine.SHOP_FUN_UPDATE, this.onRefresh, this)
		this.mElemList["group_tempcell"].visible = true;
        this.mElemList["group_equip"].visible = false;
        
        this.onRefresh()
	}

	public onHide(): void {
        UnRegisterEvent(EventDefine.SHOP_FUN_UPDATE, this.onRefresh, this)
        this.mElemList["group_tempcell"].visible = false;
	}

    onRefresh(){
        
        let groupNameList = [
			ShopSystem.SHOP_ZHUANGBAN,ShopSystem.SHOP_PIFU, ShopSystem.SHOP_YOUQING, ShopSystem.SHOP_WEIWANG
		]

        let index = this.mParentWnd.tabWndList.getTabIndex()
        let groupName = groupNameList[index]

        this.mElemList["rd_access"].visible = false
        this.mElemList["group_richang"].visible = false
        this.mElemList["rd_limit"].visible = false
        let hadStr = ShopSystem.getInstance().getShopCostItemStr(groupName)
        AddRdContent(this.mElemList["rd_had"], hadStr, "ht_20_cc")

        let shopEntry = ShopSystem.getInstance().getShopEntryByGroupName(groupName)
        this.type = shopEntry
        let list = ShopSystem.getInstance().getShopItemList(shopEntry)

        this.mElemList["title"].text = ShopSystem.getInstance().getShopNameByEntry(shopEntry)

        let scroll = this.scroll
        let showList = splitListByCount(list, 2)
        scroll.clearItemList()
        
        for(let k = 0; k < size_t(showList); k++){
                
            let v = showList[k]
            
			let window = scroll.getItemWindow(k, 560, 150, 0, 0)
            this.initItemWindow(window)
            this.refreshItemWindow(window, v, k)
        }
        
        scroll.refreshScroll(true, true)
        scroll.restoreViewXY()

	}	
     initItemWindow(window) {
        let name = window.name
        for(let i = 1; i <= 2; i++) {
            let x = 290*(i-1)
            this.mElemList[name + "_shopBox" + i] = UIShopBox.newObj(this.mLayoutNode, name + "_shopBox" + i, x, 0 , window)
        }
    }

    refreshItemWindow(window, config, index) {
        let name = window.name

        for (let i = 1; i <= 2; i++) {
           if (config[i-1]) {
                let pos = index * 2 + i
                this.mElemList[name + "_shopBox" + i].updateByEntry(this.type, pos)
            } else {
                this.mElemList[name + "_shopBox" + i].setVisible(false)
            }
        }
    }
}