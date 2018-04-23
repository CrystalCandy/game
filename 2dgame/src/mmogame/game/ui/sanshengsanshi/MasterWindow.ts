class MasterWindow extends BaseCtrlWnd {
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
		this.mElemList["btn_rule"].visible = true;
		this.mElemList["weiwang_shop"].visible = true;
		this.mElemList["title"].text = Localize_cns("SANSHENG_TXT9")
	}

	public onHide(): void {
		this.mElemList["group3"].visible = false;
		this.mElemList["btn_rule"].visible = false;
		this.mElemList["weiwang_shop"].visible = false;
	}
	
	onRefresh() {
		
    }

	initItemWindow(window){
	
	}

	refreshItemWindow(window, data){
	
	}
 }