/* 
作者: 
  lintianfeng
  
创建时间： 
  2014.1.04(周六) 

意图： 


公共接口： 

*/
class MovieDramaFrame extends BaseWnd {
	npcModelId: number;
	name: string;
	text: string;
	actorInfo: any;


	actorView:UIActorView


	public initObj(...args: any[]): void {
		this.mLayoutPaths = ["layouts/MovieDramaLayout.exml"]

		this.npcModelId = 0
		this.name = ""
		this.text = ""

		// RegisterEvent(EventDefine.STATE_ACTIVE, this.onStateActive, this)
		//RegisterEvent(EventDefine.MOVIE_BEGIN, this.onLoginStateWnd, this)
	}

	destory() {
		// UnRegisterEvent(EventDefine.STATE_ACTIVE, this.onStateActive, this)
		//UnRegisterEvent(EventDefine.MOVIE_BEGIN, this.onLoginStateWnd, this)
	}

	onLoad() {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.initSkinElemList();

		this.mLayoutNode.left = 0;
		this.mLayoutNode.bottom = 0;
		//this.mLayoutNode.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkipClick, this)

		var elemInfo = [
			{ ["name"]: "rd_content", ["title"]: null, ["event_name"]: gui.RichDisplayer.RichDisplayerTranslateEvent, ["fun_index"]: this.onDialogTranslateWord },
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

		this.actorView = UIActorView.newObj(this.mLayoutNode, "actorView", 0, 0, this.mElemList["group_actorview"])
		this.actorView.setActorScale(1.2)
		
	}

	onLoginStateWnd(args) {
		this.showWnd()

	}
	onUnLoad() {

	}

	onShow() {
		this.mLayoutNode.visible = (true)
		this.setBottomWindowVisible(false)
		RegisterEvent(EventDefine.MOVIE_END, this.hideWnd, this)
		RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onSkipClick, this)
	}

	onHide() {
		UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onSkipClick, this)
		this.mLayoutNode.visible = (false)
		//this.mLayoutNode.setDoModal(false)
		//this.skipFrame.visible = (false)
		this.npcModelId = 0
		this.name = ""
		this.text = ""
		UnRegisterEvent(EventDefine.MOVIE_END, this.hideWnd, this)

		this.actorView.clearView();
		// if (this.actorInfo) {
		// 	this.actorInfo.player.leaveViewer(this.actorInfo.window)
		// 	this.actorInfo.player.deleteObj()
		// 	this.actorInfo = null
		// }
	}

	

	onDialogTranslateWord(args) {
		let word = args.getTranslateWord()
        args.setTranslateWord(TaskExecutor.getInstance().executeGetReplaceWord(word, 0))
	}

	changeModel(npcModelId, dir) {
		if (npcModelId == 0) {
			this.mElemList["group_actorview"].visible = (false)
			this.mElemList["rd_content"].clear()
			return
		}

		this.mElemList["group_actorview"].visible = (true)


		if (dir == 0) {
			this.mLayoutNode.currentState = "my"

			let player = this.actorView.updateByPlayer(npcModelId)
			player.setDir(ActorDirMap.Left)

		} else {

			let player = this.actorView.updateByPlayer(npcModelId)
			player.setDir(ActorDirMap.Right)

			this.mLayoutNode.currentState = "other";
		}
		
		let rd: gui.RichDisplayer = this.mElemList["rd_content"]
		AddRdContent(rd, this.text, "ht_24_cc", "black", 2)

		// let rd: gui.RichDisplayer = this.mElemList["rd_content"]
		// AddRdContent(rd, content, "ht_30_cc", "black", 5)

		// //调整字体大小
		// let h = rd.getLogicHeight()
		// if (h > rd.height) {
		// 	AddRdContent(rd, content, "ht_24_cc", "black", 2)
		// }

		let h = rd.getLogicHeight()
		if (h > rd.height) {
			AddRdContent(rd, this.text, "ht_20_cc", "black", 2)
		}
	}

	setContent(name, text) {
		this.name = name
		this.text = text
	}

	showSpeaking(name, text, npcModelId, dir?, hideBust?) {
		this.name = name
		this.text = text
		this.showWnd();
		this.doCommand("showDialog")
		this.doCommand("changeModel", npcModelId, dir)
		
	}

	setBottomWindowVisible(visible) {
		if(this.isLoadComplete() == false)
			return;
		//TLog.Debug("setBottomWindowVisible",visible)	
		this.mElemList["group_root"].visible = (visible)
		// this.mElemList["bustWindow"].visible = (visible)
		// this.mElemList["bottomWindow"].visible = (visible)

	}

	onSkipClick(args) {
		if(this.mElemList["group_root"].visible == false)
			return;
		//MovieSystem.getInstance().skipMovie()
		MovieSystem.getInstance().skipNextElem()
	}


	hideDialog(){
		if(this.isLoadComplete() == false)
			return
		this.showSpeaking("", "", 0)
		this.setBottomWindowVisible(false)
	}

	showDialog(){
		this.setBottomWindowVisible(true)
	}
}