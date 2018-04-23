// TypeScript file
class PlayerDetailsRenameFrame extends BaseWnd {


    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/role/PlayerDetailsReNameLayout.exml"]
        
	}
    public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.mLayoutNode.width= 500
		this.mLayoutNode.height = 300
		this.setAlignCenter(true, true)
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_sure", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onSureClick },
            { ["name"]: "btn_cancel", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onCancelClick},
			{ ["name"]: "input_name", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null},
           	];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

		
	}
    public onUnLoad(): void {

	}

	public onShow(): void {
		this.mLayoutNode.visible = true;
      //  this.mLayoutNode.setDoModal(true);
		this.onRefresh();
	}

	public onHide(): void {
		this.mLayoutNode.visible = false;
	//	this.mLayoutNode.setDoModal(false);
	}

	onRefresh(){
		let name = GetHeroProperty("name")
		this.mElemList["input_name"].text = name ;
		
		let oldName = getSaveRecord(opSaveRecordKey.oldName) 
		let costStr = Localize_cns("RENAME_TXT1")
		if(oldName != "" && oldName != null){
			costStr = GetMoneyIcon(2) +  "X200"
		}
		AddRdContent(this.mElemList["rd_cost"], costStr, "ht_24_lc","black")
	}
    public onSureClick():void{
		let name = GetHeroProperty("name")
		let textName : string = this.mElemList["input_name"].text
		if(WordFilter.checkword(textName) == false){
			MsgSystem.addTagTips(Localize_cns("PLAYER_DETAILS_TXT10"))
			this.mElemList["input_name"].text = name
			return
		}
		if( name == textName){
			MsgSystem.addTagTips(Localize_cns("PLAYER_DETAILS_TXT8"))
			return 
		}
		if(textName.length > 6){
			MsgSystem.addTagTips(Localize_cns("PLAYER_DETAILS_NAME_LIMIT"))
			this.mElemList["input_name"].text = name
			return
		}
		let oldName = getSaveRecord(opSaveRecordKey.oldName) || ""
		if(oldName != ""){
			let unit = 2
			let money = GetHeroMoney(unit)
			if(money < 200){
				MsgSystem.addTagTips("LUCKY_TXT3")
				return 
			}
		}
		let id = GetHeroProperty("id")
		let message = GetMessage(opCodes.C2G_ROLE_CHANGE_NAME)
		message.itemID = id
		message.newName = textName
		SendGameMessage(message)
		this.hideWnd()
    }
    public onCancelClick():void{
		this.hideWnd()
    }
}