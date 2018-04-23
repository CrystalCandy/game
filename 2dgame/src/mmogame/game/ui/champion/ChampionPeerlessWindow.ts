// TypeScript file
class ChampionPeerlessWindow extends BaseCtrlWnd{
	ElemList;

	public initObj(...params:any[]){
		
	}

	public onLoad():void{
		this.mElemList = this.mParentWnd.mElemList
	}

	public onUnLoad():void{

	}

	public onShow():void{
		this.mElemList["Peerless_wnd"].visible = true
	}

	public onHide():void{
		this.mElemList["Peerless_wnd"].visible = false
	}
}