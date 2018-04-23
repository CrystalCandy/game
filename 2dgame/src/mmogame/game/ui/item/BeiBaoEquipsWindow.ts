// TypeScript file
class BeiBaoEquipsWindow extends BaseCtrlWnd {
	mElemList;
    equipItemList ;
	mLayoutNode ;
	scroll:UIScrollList;

	public initObj(...params: any[]) {

	}
    public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;
        this.mLayoutNode = this.mParentWnd.mLayoutNode;
		
        
        var elemInfo = [
            { ["name"]: "btn_add", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onAddClick},
            { ["name"]: "btn_smelte", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onSmelteClick },
              ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

        let group: eui.Group = this.mElemList["scroll_Equip"]
    
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "EquipScroll", 0, 0, group.width, group.height, group)
	   
}

    public onUnLoad(): void {

	}

	public onShow(): void {
        RegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this)
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this)
		this.mElemList["group_equip"].visible = true;
        this.mElemList["label_wndName"].text = Localize_cns("BEIBAO_EQUIP");
        this.onRefresh();
	}

	public onHide(): void {
        UnRegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this)
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this)
		this.mElemList["group_equip"].visible = false;
	}
    public onAddClick():void{
        let wnd = WngMrg.getInstance().getWindow("BeiBaoAddCapacityFrame");
		
		wnd.showWnd();

    }
    public onSmelteClick():void{
        let wnd = WngMrg.getInstance().getWindow("BeiBaoSmelteFrame");
		
		wnd.showWnd();
    }
   
    onRefresh(){
        
        let itemType1 = opItemType.ROLE_EQUIP//角色装备
        let equipItemList = ItemSystem.getInstance().getItemLogicInfoByType(itemType1)
        table_sort(equipItemList, function(a, b){
            let aLevel = a.getRefProperty("level")
			let bLevel = b.getRefProperty("level")
            return aLevel - bLevel
        })
        //let level = RoleSystem.getInstance().getRoleInfo("stage")
        //equipItemList = ItemSystem.getInstance().getSortEquipList(equipItemList,level )
        let itemType2 = opItemType.COMMON_EQUIP//通用装备
        let equipItemList2 = ItemSystem.getInstance().getItemLogicInfoByType(itemType2)
        table_sort(equipItemList2, function(a, b){
            let aLevel = a.getRefProperty("level")
			let bLevel = b.getRefProperty("level")
            return aLevel - bLevel
        })
		for (let i in equipItemList2) {
			let item = equipItemList2[i]
            JsUtil.arrayInstert(equipItemList, item)
        }
        

        let list = splitListByCount(equipItemList, 5)
        let scroll = this.scroll
        scroll.clearItemList()
        
        for(let k = 0; k < size_t(list); k++){
                 
            let item = list[k]
			let window = scroll.getItemWindow(k, 500, 110, 0, 0)
            this.initItemWindow(window)
            this.refreshItemWindow(window, item)
        }
        
        scroll.refreshScroll(true, true)


       
        let had = size_t(equipItemList)
        let maxCapacity =  GetHeroProperty("equipMax")
        this.mElemList["lable_capacity"].text = had + "/" + maxCapacity
       //lable_capacity


	}	
     initItemWindow(window) {
        let name = window.name
        for (let i = 1; i <= 5; i++) {
                let x = 107 * (i-1);
                let y = 2;

                let mElemInfo: any = [

                    { ["index_type"]: eui.Group, ["name"]: name + "_equip_bg" + i, ["image"]: "", ["x"]: x, ["y"]: y, ["w"]: 100, ["h"]: 110, },
                    { ["index_type"]: eui.Group, ["name"]: name + "_equip" + i, ["parent"]:name + "_equip_bg" + i, ["image"]: "", ["x"]: 10, ["y"]: 0, ["w"]: 80, ["h"]: 80,  },
                    { ["index_type"]: eui.Label, ["name"]: name + "_equip_lv" + i,["parent"]:name + "_equip_bg" + i, ["title"]:"", ["font"]: "ht_18_cc", ["image"]: null, ["color"]: "ublack", ["x"]: 0, ["y"]: 85, ["w"]: 100, ["h"]: 20,["messageFlag"]: true },
                    
                ];
                UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window );
            
                this.mElemList[name + "equipBox" + i] = UIItemBox.newObj(this.mLayoutNode, name + "equipBox" + i, 0, 0 , this.mElemList[name +"_equip"+ i])
           
           
        }
    }

    refreshItemWindow(window, config) {
        let name = window.name

        for (let i = 1; i <= 5; i++) {
            let item = config[i-1]
            if (item) {
                let entryId = item.entryId
                let type = item.getRefProperty("type")
                let level = item.getRefProperty("level")
                if(type == opItemType.ROLE_EQUIP){
                    this.mElemList[name + "_equip_lv" + i].text = "LV." + level
                }else if(type == opItemType.COMMON_EQUIP){
                    this.mElemList[name + "_equip_lv" + i].text =  level + "阶"
                }
                
                this.mElemList[name + "equipBox" + i].updateByItem(item)
              
            } else {
                this.mElemList[name + "_equip_bg" + i].visible = false
            }
        }
    }

}

