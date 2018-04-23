// TypeScript file
class BeiBaoPropsWindow extends BaseCtrlWnd {
	mElemList;
    propItemList ;
	mLayoutNode ;
	scroll:UIScrollList;

	public initObj(...params: any[]) {

	}
    public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;
        this.mLayoutNode = this.mParentWnd.mLayoutNode;
        
	
		let group: eui.Group = this.mElemList["scroll_Prop"]
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "PropScroll", 0, 0, group.width, group.height, group)	   
        
       
	}

	public onUnLoad(): void {

	}

	public onShow(): void {
        RegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this)
		this.mElemList["group_prop"].visible = true;
        this.mElemList["label_wndName"].text = Localize_cns("BEIBAO_PROP");
        this.onRefresh();
	}

	public onHide(): void {
        UnRegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this)
		this.mElemList["group_prop"].visible = false;
	}
    

    onRefresh(){
        
        let itemType = opItemType.ITEM_TYPE_GOODS 
        let propItemList = ItemSystem.getInstance().getItemLogicInfoByType(itemType)
        let list = splitListByCount(propItemList, 5)

        let scroll = this.scroll 
        scroll.clearItemList()
        
        for(let k = 0; k < size_t(list); k++){
                
            let item = <Item>list[k]
            
			let window = scroll.getItemWindow(k, 500, 110, 0, 0)
            this.initItemWindow(window)
            this.refreshItemWindow(window, item)
        }
        
        scroll.refreshScroll(true, true)

	}	
     initItemWindow(window) {
        let name = window.name
        for (let i = 1; i <= 5; i++) {
                let x = 107 * (i-1);
                let y = 2;

                let mElemInfo: any = [

                    { ["index_type"]: eui.Group, ["name"]: name + "_prop_bg" + i, ["image"]: "", ["x"]: x, ["y"]: y, ["w"]: 100, ["h"]: 110,  },
                    { ["index_type"]: eui.Group, ["name"]: name + "_prop" + i, ["parent"]:name + "_prop_bg" + i, ["image"]: "", ["x"]: 10, ["y"]: 0, ["w"]: 80, ["h"]: 80,  },
                    { ["index_type"]: eui.Label, ["name"]: name + "_name" + i,["parent"]:name + "_prop_bg" + i, ["title"]:"", ["font"]: "ht_18_cc", ["image"]: null, ["color"]:gui.Color.white, ["x"]: 0, ["y"]: 85, ["w"]: 100, ["h"]: 20,["messageFlag"]: true },
                ];
                UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window );
            
                this.mElemList[name + "propBox" + i] = UIItemBox.newObj(this.mLayoutNode, name + "propBox" + i, 0, 0 , this.mElemList[name +"_prop"+ i])
           
           
        }
    }

    refreshItemWindow(window, config) {
        let name = window.name

        for (let i = 1; i <= 5; i++) {
            if (config[i-1]) {
                let entryId = config[i-1].entryId
                this.mElemList[name + "_name" + i].text = config[i-1].getName()
                let count = ItemSystem.getInstance().getItemCount(entryId)
                this.mElemList[name + "propBox" + i].updateByEntry(entryId, count)
               
            } else {
                this.mElemList[name + "_prop_bg" + i].visible = false
            }
        }
    }
    
}