// TypeScript file
class EscortTipsFrame extends BaseWnd {
	firstStr 
	secondStr 
    
    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/xiyouhusong/EscortTipsLayout.exml"]
		
      
	}
    public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.mLayoutNode.width= 517
		this.mLayoutNode.height = 332
		this.setAlignCenter(true, true)
		this.initSkinElemList()

		var elemInfo = [
			{ ["name"]: "btn_sure", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onSureClick },
			{ ["name"]: "btn_cancel", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            ];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)
        
		this.mElemList["rd_ps"].setAlignFlag(gui.Flag.CENTER_CENTER)
		this.mElemList["rd_tips"].setAlignFlag(gui.Flag.CENTER_CENTER)
        
		//this.firstStr = null
		//this.secondStr = null

	}
    public onUnLoad(): void {

	}


	public onShow(): void {
		this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
		
		if(this.firstStr == null) {
			return 
		}

		//rd_tips
		AddRdContent(this.mElemList["rd_tips"], this.firstStr,"ht_20_cc", "black")
		//rd_ps
		if(this.secondStr == null) {
			return 
		}
		AddRdContent(this.mElemList["rd_ps"], this.secondStr,"ht_20_cc")
	}	

	public onHide(): void {
		this.mLayoutNode.visible = false;
		this.mLayoutNode.setDoModal(false);
  	}

	/////////////响应
	onSureClick(){
		
		if(this.firstStr == Localize_cns("ESCORT_TIPS_TXT6")){
			let unit = 2
			if(GetHeroMoney(3) < 300 && GetHeroMoney(2) < 300){
				MsgSystem.addTagTips(Localize_cns("COPY_TXT16"))
				return 
			}
			RpcProxy.call("C2G_QuickOverEscort")
			RpcProxy.call("C2G_GetEscortPrizeInfo")
			this.hideWnd()
		}else if(this.firstStr == Localize_cns("ESCORT_TIPS_TXT3")){
			RpcProxy.call("C2G_BeginEscort")
			this.hideWnd()
			let wnd1 :BaseWnd = WngMrg.getInstance().getWindow("OdysseyEscortFrame")
			wnd1.hideWnd()
			let wnd = WngMrg.getInstance().getWindow("EscortFrame")
			wnd.showWnd()
		}else if(this.firstStr == Localize_cns("ESCORT_TIPS_TXT5")){
			RpcProxy.call("C2G_RandEscortIndex", 1)
			this.hideWnd()
		}
	}

	onShowWnd(str1, str2?){
		this.firstStr = str1
		this.secondStr = str2 || null
		this.showWnd()
	}

}