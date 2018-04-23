class ShopYuanBaoFunWindow extends BaseCtrlWnd {
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
			ShopSystem.SHOP_YUANBAO,ShopSystem.SHOP_BANGYUAN, ShopSystem.SHOP_CHONGWU, ShopSystem.SHOP_XIANLV
		]

        let index = this.mParentWnd.tabWndList.getTabIndex()
        let groupName = groupNameList[index]

        this.mElemList["rd_limit"].visible = false
        this.mElemList["group_richang"].visible = false
        this.mElemList["rd_access"].visible = false

        if(index == 2){
            this.mElemList["group_richang"].visible = true
            this.mElemList["rd_1"].setAlignFlag(gui.Flag.LEFT_CENTER)
            AddRdContent(this.mElemList["rd_1"], Localize_cns("SHOP_HAD_TXT8"),"ht_20_cc")
            this.mElemList["rd_1"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAccessClick, this)
        }

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

    ///------------响应事件
    onAccessClick(){
        let wnd : DailyFrame = WngMrg.getInstance().getWindow("DailyFrame")
        wnd.showWithIndex(2)
    }
}