class MarryWindow extends BaseCtrlWnd {
	mElemList;
	name:string
	checkBoxIndex:number
	public initObj(...params: any[]) {
		
	}

    public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;
			var elemInfo =[
				{["name"] : "combox_name",  ["title"] : null,  ["event_name"] : gui.ComboBox.onClick, ["fun_index"] : this.onPosTypeChange},
				{ ["name"]: "marry_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.marryClick },
				{ ["name"]: "checkBtn1", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickCheck },
				{ ["name"]: "checkBtn2", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickCheck },
				{ ["name"]: "divorce_btn", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.divorceClick },
			];
			UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
	}

	initPostTypeCombox(){
			var data = [
				{bg:"ty_tongYongBt1",content:"J9"},
			];

			let myName = GetHeroProperty("name")
			if(myName == "J9"){
				data = [
				{bg:"ty_tongYongBt1",content:"J6"},
				];
			}

			//let id = GetHeroProperty("id")
			//1017000053	J9
			//1017000052

			var cb:gui.ComboBox = this.mElemList["combox_name"];
			
			cb.setTitleHeight(48)

			cb.setItemWidth(250)
			cb.setItemHeight(55)
			cb.setItemTextAlign("center");	//middle

			cb.setTitle("");
			cb.data = data;
	}


	public onUnLoad(): void {
		
	}

	public onShow(): void {
		RegisterEvent(EventDefine.MARRY_UPDATE, this.onRefresh, this)
		this.mElemList["group1"].visible = true;
		this.mElemList["title"].text = Localize_cns("SANSHENG_TXT7")
		
		this.name = ""
		this.checkBoxIndex = -1
		for (let i = 1; i < 2; i++) {
			this.mElemList["checkSelect" + i].visible = false
		}
		this.onRefresh()
	}

	public onHide(): void {
		this.mElemList["group1"].visible = false;
		UnRegisterEvent(EventDefine.MARRY_UPDATE, this.onRefresh, this)
	}
	
	onRefresh() {
		let isMarry = (GetHeroProperty("spouseId")>0)	//是否结婚
		this.mElemList["notMarried_group"].visible = (isMarry == false)
		this.mElemList["marry_group"].visible = (isMarry)

		var cb:gui.ComboBox = this.mElemList["combox_name"];
		cb.setTitle("");

		let friendList = FriendSystem.getInstance().getFriendInfoList()
		this.initPostTypeCombox();
		
    }

	private onPosTypeChange(event){
			var cb = this.mElemList["combox_name"];
			var data = cb.data;
			//cb.setTitle(data[event.data.itemIndex].content ) ;
			cb.hide();
			this.mElemList["name_text"].text = data[event.data.itemIndex].content
			this.name = data[event.data.itemIndex].content
			// this.mFightEditor.setCasterPos(data[event.data.itemIndex].content)
			// this.mFightEditor.refreshCombat();
	}

	marryClick(){
		let wnd = WngMrg.getInstance().getWindow("ProposeFrame")
		let name = this.name
		if(name == ""){
			MsgSystem.addTagTips(Localize_cns("SANSHENG_TXT1"))
			return
		}
		if(this.checkBoxIndex == -1){
			MsgSystem.addTagTips(Localize_cns("SANSHENG_TXT2"))
			return
		}
		let id = GetHeroProperty("id")
		if(id == 1017000056){
			id = 1017000052
		}else{
			id = 1017000056
		}
		//1017000053	J9
		//1017000052
		let roleId = id
		let roleSex = this.checkBoxIndex
		wnd.onShowAndSetData(name,roleId,roleSex)
	}

	onClickCheck(args){
		let name = args.target.name
		let index = name.replace(/[^0-9]/ig, "")
		for (let i = 1; i < 3; i++) {
			this.mElemList["checkSelect"+i].visible = (i == tonumber(index))
		}
		this.checkBoxIndex = tonumber(index)
	}

	divorceClick(){
		let msg = Localize_cns("SANSHENG_TXT4")
		var callback: IDialogCallback = {
		onDialogCallback(result: boolean, userData): void {
				if (result) {
                	RpcProxy.call("C2G_EndMarriage")	//离婚
					let wnd = WngMrg.getInstance().getWindow("SanShengSanShiFrame")
					if (wnd.isVisible()) {
            			wnd.hideWnd()
					}
				}
	    	}
        }
        MsgSystem.confirmDialog(msg, callback, null)
	}
 }