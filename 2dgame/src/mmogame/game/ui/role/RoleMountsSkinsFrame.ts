// TypeScript file
class RoleMountsSkinsFrame extends BaseWnd {
    scroll :UIScrollList;
    
    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/role/RoleMountsSkinsLayout.exml"]
      
	}
    public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setFullScreen(true)
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "btn_back", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)
        let group: eui.Group = this.mElemList["group_scroll"]
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group, UIScrollList.DIR_HORIZON)
	}
    public onUnLoad(): void {

	}

	public onShow(): void {
		this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.mElemList["label_wndName"].text = "坐骑皮肤";
		this.onRefresh();
	}

	public onHide(): void {
		this.mLayoutNode.visible = false;
		this.mLayoutNode.setDoModal(false);
	}
    
    public onChargeClick():void{

    }
    
    onRefresh(){
       
        let scroll = this.scroll
        
        scroll.clearItemList()
        
        for(let k = 0; k < 6; k++){
                
        
			let window = scroll.getItemWindow(k, 114, 321, 0, 0)
            this.initItemWindow(window)
            //this.refreshItemWindow(window, v)
        }
        
        scroll.refreshScroll(true, true)

	}	
     initItemWindow(window) {
        let name = window.name
       
                let mElemInfo: any = [
				 { ["index_type"]: eui.Image, ["name"]: name + "_bg" , ["image"]: "", ["x"]: 0, ["y"]: 0, ["w"]: 144, ["h"]: 321, ["event_name"]: null, ["fun_index"]: null, ["messageFlag"]: true },
                 { ["index_type"]: eui.Image, ["name"]: name + "_skin" ,["parent"]:name + "_bg", ["title"]:"", ["font"]: "", ["image"]: "zq_piFu01", ["color"]: gui.Color.saddlebrown, ["x"]: 17, ["y"]: 17, ["w"]: 114, ["h"]: 291, ["event_name"]: null, ["fun_index"]: null,["messageFlag"]: true },
				 { ["index_type"]: eui.Image, ["name"]: name + "_select" , ["parent"]:name + "_bg",["image"]: "zq_xuanZhong01", ["x"]: 0, ["y"]: 0, ["w"]: 144, ["h"]: 321, ["event_name"]: null, ["fun_index"]: null, ["messageFlag"]: true },
				 ];
                UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window );
            
             

           
           
        
    }

    refreshItemWindow(window, config) {
        let name = window.name

     
    }
}