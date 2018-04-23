class MasterInviteWindow extends BaseCtrlWnd {
	mElemList;
	public initObj(...params: any[]) {
		
	}

    public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;
	}

	public onUnLoad(): void {
		
	}

	public onShow(): void {
		this.mElemList["group3"].visible = true;
	}

	public onHide(): void {
		this.mElemList["group3"].visible = false;
	}
	
	onRefresh() {
		
    }

	initItemWindow(window){
	
	}

	refreshItemWindow(window, data){
	
	}
 }