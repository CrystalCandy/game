// TypeScript file
class BeiBaoSmelteFrame extends BaseWnd {
    scroll:UIScrollList;
    

	public initObj(...params: any[]) {
		this.mLayoutPaths = ["layouts/item/BeiBaoSmelteLayout.exml"]
		
	}

	public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setFullScreen(true)
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_back", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
		    { ["name"]: "btn_smelte", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onSmelteClick },
			{ ["name"]: "btn_smelte50", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onSmelteClick },
        ];
		 UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

		let group: eui.Group = this.mElemList["group_scroll"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, 485, 396, group)	   
		
        this.mElemList["rd_tips"].setAlignFlag(gui.Flag.LEFT_TOP)
	}

	public onUnLoad(): void {

	}
	public onShow(): void {
        RegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this)
		this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.onRefresh();
	}

	public onHide(): void {
        UnRegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this)
		this.mLayoutNode.visible = false;
		this.mLayoutNode.setDoModal(false);
	}
	
	onRefresh(){

        //let level = RoleSystem.getInstance().getRoleInfo("stage")//GetHeroProperty("level")
        let itemType1 = opItemType.ROLE_EQUIP//角色装备
       
        let smeltList =  /*ItemSystem.getInstance().getBeiBaoSmeltList(level)*/ ItemSystem.getInstance().getItemLogicInfoByType(itemType1)//ItemSystem.getInstance().getBeiBaoSmeltList(level)
        table_sort(smeltList, function(a, b){
            let aLevel = a.getRefProperty("level")
			let bLevel = b.getRefProperty("level")
            return aLevel - bLevel
        })
        //let smeltList = ItemSystem.getInstance().getResolveList()
        let showlist = []
        for(let i = 0; i < 9; i++){
            if(smeltList[i]){
                JsUtil.arrayInstert(showlist, smeltList[i])
            }
        }

        let list = splitListByCount(showlist, 3)
        let scroll = this.scroll
        
        scroll.clearItemList()
        
        for(let k = 0; k < 3 ; k++){
                
            let itemlist = list[k]
			let window = scroll.getItemWindow(k, 485, 110, 0, 0)
            this.initItemWindow(window)
            this.refreshItemWindow(window, itemlist)
        }
        
        scroll.refreshScroll(true, true)

        //rd_tips
        let str = Localize_cns("BEIBAO_SMELT_DES")
        AddRdContent(this.mElemList["rd_tips"],str, "ht_24_cc", "black")
	}	
    initItemWindow(window) {
        let name = window.name
        for (let i = 1; i <= 3; i++) {
                let x = 50+160 * (i-1);
                let y = 12;
                let mElemInfo: any = [

                    { ["index_type"]: eui.Group, ["name"]: name + "_equip_bg" + i, ["image"]: "", ["x"]: x, ["y"]: y, ["w"]: 100, ["h"]: 110, ["messageFlag"]: true },
                    { ["index_type"]: eui.Group, ["name"]: name + "_equip" + i, ["parent"]:name + "_equip_bg" + i, ["image"]: "", ["x"]: 10, ["y"]: 0, ["w"]: 80, ["h"]: 80, ["messageFlag"]: true },
                    { ["index_type"]: eui.Label, ["name"]: name + "_equip_lv" + i,["parent"]:name + "_equip_bg" + i, ["title"]:"", ["font"]: "ht_18_cc", ["image"]: null, ["color"]: "ublack", ["x"]: 0, ["y"]: 85, ["w"]: 100, ["h"]: 20,["messageFlag"]: true },
                    
                ];
                UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window );
            
             this.mElemList[name + "itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, name + "itemBox" + i, 1, 0, this.mElemList[name + "_equip_bg" + i])

        }
    }

    refreshItemWindow(window, config) {
        let name = window.name

        if(config == null){
            for(let i = 1; i<= 3; i++){
                this.mElemList[name + "_equip_lv" + i].visible = false
            } 
            return
        }

        for (let i = 1; i <= 3; i++) {
            let item = config[i-1]
            if (item) {
                let entryId = item.entryId
                let level = item.getRefProperty("level")
                this.mElemList[name + "_equip_lv" + i].text = "LV." + level
                this.mElemList[name + "itemBox" + i].updateByItem(item)
              
            } else {
                this.mElemList[name + "_equip_lv" + i].visible = false
            }
        }
    }



    /////////////////btn响应事件
    onSmelteClick(event : egret.Event){
        let name = event.target.name
        if(name == "btn_smelte"){
            RpcProxy.call("C2G_EquipMelt", 9)
        }else if(name = "btn_smelte50"){
            RpcProxy.call("C2G_EquipMelt", 50)
        }
        
	}
	
}