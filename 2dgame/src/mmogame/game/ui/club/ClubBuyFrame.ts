// TypeScript file

class ClubBuyFrame extends BaseWnd{

    subWndList:any;
    tabIndex:string;

    emptyView:UIEmptyView;


	public initObj(...params:any[]){
		this.mLayoutPaths = ["layouts/club/ClubBuyLayout.exml"]
	}

	public onLoad():void{
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setFullScreen(true)
		this.initSkinElemList();
		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            { ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

	}

	public onUnLoad():void{

	}

	public onShow():void{
		this.mLayoutNode.visible = true;
        this.refreshFrame();
	}

	public onHide():void{
		this.mLayoutNode.visible = false;
	}

    refreshFrame() {
		
	}
}