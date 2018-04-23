class ShopEquipWindow extends BaseCtrlWnd {
	mElemList;
    select:any;
    scroll:UIScrollList
	type
    index
    equipScroll :UIScrollList
	
	public initObj(...params: any[]) {
		
	}
    public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;
        
       
        let group: eui.Group = this.mElemList["equip_shop"]
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "equipScroll", 0, 0, group.width, group.height, group)
       
        let equipGroup:eui.Group = this.mElemList["equip_shop_scroll"]
        this.equipScroll  = UIScrollList.newObj(this.mLayoutNode, "equipScroll", 0, 0, equipGroup.width, equipGroup.height, equipGroup)
        
		 
        this.select = -1
	}

	public onUnLoad(): void {
		
	}

	public onShow(): void {
        RegisterEvent(EventDefine.SHOP_FUN_UPDATE, this.onRefresh, this)
		this.mElemList["group_tempcell"].visible = false
        this.mElemList["group_equip"].visible = true;
        this.onRefresh()
     //   this.onRefreshItemShow()
	}

	public onHide(): void {
        UnRegisterEvent(EventDefine.SHOP_FUN_UPDATE, this.onRefresh, this)
		this.mElemList["group_equip"].visible = false;
	}

    onRefresh(){
        let groupName = ShopSystem.SHOP_ZHUANGBEI

        this.mElemList["group_richang"].visible = false
        this.mElemList["rd_access"].visible = true
        let hadLimit = ShopSystem.getInstance().getHeroJudge(opJudgeJieSuo.GAMECASENUM)
        let limitStr = "#white" + Localize_cns("SHOP_HAD_TXT1") + "#lime" + hadLimit
        AddRdContent(this.mElemList["rd_limit"],limitStr, "ht_20_cc")
        
        AddRdContent(this.mElemList["rd_access"], "#lime" + Localize_cns("ACCESS_TXT2"), "ht_20_cc")
        this.mElemList["rd_access"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAccessClick, this)

        let equipEntry = ShopSystem.getInstance().getShopEntryByGroupName(groupName)
        this.mElemList["title"].text = ShopSystem.getInstance().getShopNameByEntry(equipEntry)

        let showlist = ShopSystem.getInstance().getShopEquipItemList()
        
        let scroll = this.scroll
        scroll.clearItemList()
        
        for(let k = 0; k < size_t(showlist); k++){

            let entry = showlist[k]     
			let window = scroll.getItemWindow(k, 155, 71, 0, 0)
            this.initBtnItemWindow(window)
            this.refreshBtnItemWindow(window, entry)
        }
        scroll.refreshScroll(true, true)
        scroll.restoreViewXY()


        //频道单选
		var radioGroup: eui.RadioButtonGroup = new eui.RadioButtonGroup();
		radioGroup.addEventListener(eui.UIEvent.CHANGE, this.onBtnClick, this);
        for (let i = 0; i < size_t(showlist); i++) {
			let radioBtn = <eui.RadioButton>this.mElemList["group" + i + "_radio"]
			radioBtn.group = radioGroup;
			radioBtn.value = i
		}

        if(this.select == -1){
            this.select = 0
        }

        let radioBtn : eui.RadioButton = this.mElemList["group" + this.select + "_radio"]
        radioBtn.selected = true
        this.type = showlist[this.select]
        this.onRefreshItemShow()  

	}	
    initBtnItemWindow(window) {
        let name = window.name
        var elemInfo = [
                { ["index_type"]: eui.RadioButton, ["name"]: name + "_radio", ["image"]:"sd_biaoQian02", ["font"]: "ht_22_cc",["image_down"]:"sd_biaoQian01", ["x"]: -8, ["y"]: 0, ["w"]: 155, ["h"]: 71, ["event_name"]: null, ["fun_index"]: null},
			]
		UiUtil.createElem(elemInfo, this.mLayoutNode, this.mElemList, this, window)
    }

    refreshBtnItemWindow(window, entry) {
        let name = window.name
        this.mElemList[name + "_radio"].label = ShopSystem.getInstance().getShopNameByEntry(entry)
    }

    

    onRefreshItemShow(){
        
        let list = ShopSystem.getInstance().getShopItemList(this.type)

        let scroll = this.equipScroll
        scroll.clearItemList()

        for(let k = 0; k < size_t(list); k++){
            let config = list[k]
			let window = scroll.getItemWindow(k, 393, 130, 0, 0)
            this.initEquipItemWindow(window)
            this.refreshEquipItemWindow(window, config)
        }
        
        scroll.refreshScroll(true, true)
        scroll.restoreViewXY()
    }

    initEquipItemWindow(window){
        let name = window.name

        let mElemInfo = [
			
			{ ["index_type"]: gui.Grid9Image, ["name"]: name + "_equip_bg",  ["title"]: "", ["font"]: "ht_20_cc", ["image"]: "ty_uiDi03", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: 393, ["h"]: 130, ["messageFlag"]: true},
            { ["index_type"]: eui.Label , ["name"]: name + "_equip_name",  ["titile"]: "", ["font"]: "ht_20_lc", ["image"]: "", ["color"]: gui.Color.black, ["x"]: 109, ["y"]: 29, ["w"]: 200, ["h"]: 20, ["messageFlag"]: true },
			{ ["index_type"]: gui.Grid9Image, ["name"]: name + "_cost_bg",  ["title"]: "", ["font"]: "ht_20_cc", ["image"]: "ty_textDi01", ["color"]: gui.Color.white, ["x"]: 109, ["y"]: 65, ["w"]: 100, ["h"]: 26, ["messageFlag"]: true},
			{ ["index_type"]: eui.Group, ["name"]: name + "_equip_item",  ["title"]: "", ["font"]: "ht_20_cc", ["color"]: gui.Color.white, ["x"]: 20, ["y"]: 20, ["w"]: 80, ["h"]: 80, },
            { ["index_type"]: gui.RichDisplayer, ["name"]: name + "_equip_cost",  ["parent"]: name + "_cost_bg", ["titile"]: "", ["font"]: "ht_20_cc", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 3, ["w"]: 90, ["h"]: 20, ["messageFlag"]: true },
			{ ["index_type"]: gui.RichDisplayer, ["name"]: name + "_equip_limit",  ["title"]: "", ["font"]: "ht_20_cc", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 281, ["y"]: 29, ["w"]: 200, ["h"]: 20, ["messageFlag"]: true },
            { ["index_type"]: gui.Button, ["name"]: name + "_btn_buy",  ["title"]: Localize_cns("SHOP_TXT5"), ["font"]: "ht_20_cc_stroke", ["image"]: "ty_tongYongBt2", ["color"]: gui.Color.white, ["x"]: 281, ["y"]: 54, ["w"]: 94, ["h"]: 49, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onBuyClick },
            { ["index_type"]: gui.RichDisplayer, ["name"]: name + "_equip_force",  ["title"]: "", ["font"]: "ht_16_cc", ["image"]: "", ["color"]: gui.Color.white, ["x"]: 20, ["y"]: 100, ["w"]: 200, ["h"]: 20, ["messageFlag"]: true },
        ]
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window)

        this.mElemList[name + "_equipBox"] = UIItemBox.newObj(this.mLayoutNode, name + "_equipBox", 0, 0 , this.mElemList[name + "_equip_item"])

        this.mElemList[name + "_equip_limit"].visible = false
        this.mElemList[name + "_equip_force"].visible = false
        this.mElemList[name + "_equip_cost"].setAlignFlag(gui.Flag.CENTER_CENTER)
    }

    refreshEquipItemWindow(window, config) {
        let name = window.name
        let id = config.itemEntry
        let item = GameConfig.itemConfig[id]
        let equipName = ""
        //是否装备
        if(config.shopEntry == 5){
            equipName = item.name
        }else{
            let itemInfo: any = {}
			itemInfo.entry = id
			itemInfo.quality = config.quality
			let this_item = <Item>Item.newObj(itemInfo)
            let subtype = this_item.getRefProperty("subtype")
            let roleEquip = RoleSystem.getInstance().getRoleEquipItem(subtype)
            equipName = item.name + String.format("(Lv.%d)", this_item.getRefProperty("level"))

            let itemPro = GetRoleEquipBaseProperty(this_item.entryId, this_item.getProperty("quality"))
			let itemForce = GetForceMath(itemPro)

            if(roleEquip != null){
				let ePro = GetRoleEquipBaseProperty(roleEquip.entryId, roleEquip.getProperty("quality"))
				let eForce = GetForceMath(ePro)
				
				if(itemForce < eForce){
					this.mElemList[name + "_equip_force"].visible = false
				}else{
					this.mElemList[name + "_equip_force"].visible = true
                    let addStr = String.format(Localize_cns("SHOP_TXT6"), itemForce - eForce)
                    AddRdContent(this.mElemList[name + "_equip_force"], addStr, "ht_16_cc")
				}
            }else{
                this.mElemList[name + "_equip_force"].visible = true
                let addStr = String.format(Localize_cns("SHOP_TXT6"), itemForce)
                AddRdContent(this.mElemList[name + "_equip_force"], addStr, "ht_16_cc")
            }
            //如果该装备大于人物装备那么显示
            
        }
        this.mElemList[name + "_equip_name"].text = equipName
        this.mElemList[name + "_equipBox"].updateByEntry(id)

        let limit = ShopSystem.getInstance().getLimitTwice(config.shopEntry, config.Index)
        if(limit != 0){
            let hadBuy = ShopSystem.getInstance().getShopInfo(config.shopEntry) || 0
            let limitStr = String.format(Localize_cns("SHOP_TXT2"), hadBuy, limit)
            AddRdContent(this.mElemList[name + "_equip_limit"],limitStr, "ht_20_cc")
            this.mElemList[name + "_equip_limit"].visible = true
        }
        let str = "#orange" + config.price
        AddRdContent(this.mElemList[name + "_equip_cost"], str, "ht_20_cc")
    }


    /////响应事件
    onBtnClick(event: egret.Event){
        var radioGroup: eui.RadioButtonGroup = event.target;
		let radiobtn = radioGroup.selection
        let showlist = ShopSystem.getInstance().getShopEquipItemList()
        this.select = radiobtn.value
        this.type = showlist[this.select] 
        this.onRefreshItemShow()
    }


    onBuyClick(args:egret.Event){
        let name = args.target.name
        let index = name.replace(/[^0-9]/ig, ""); 
        this.index = tonumber(index) + 1
        let wnd = WngMrg.getInstance().getWindow("ShopItemBuyFrame")
        wnd.onShowWnd(this.type, this.index)
    }

    onAccessClick(){

    }
}