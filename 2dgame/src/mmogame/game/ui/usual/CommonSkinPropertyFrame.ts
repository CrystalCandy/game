// TypeScript file
class CommonSkinPropertyFrame extends BaseWnd {
	zhanLi;
    str;
    name;
	Player:Player
    id
	
    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/usual/CommonSkinPropertyLayout.exml"]
      
	}
    public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		UiUtil.setFrameSize(this.mLayoutNode, 520, 700, 20, 85)
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_back", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
		
			];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)


		this.mElemList["rd_1"].setAlignFlag(gui.Flag.CENTER_CENTER);
        
	}
    public onUnLoad(): void {
        if (this.Player) {
			let actorview = this.mElemList["actor_view"]
			this.Player.leaveViewer(actorview)
			this.Player.deleteObj()
			this.Player = null
		}
	}

	public onShow(): void {
		this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.mElemList["label_wndName"].text = this.name
        this.refreshForceNum(this.zhanLi)
		
		AddRdContent(this.mElemList["rd_1"],this.str,"ht_24_cc","ublack") 
         if (!this.Player) {
            this.Player = Player.newObj()
        }
		this.onRefreshActor(this.id)
	}

	public onHide(): void {
		this.mLayoutNode.visible = false;
		this.mLayoutNode.setDoModal(false);
           
	}

    refreshForceNum(force) {
    
        this.mElemList["bImage"].beginDraw();
        this.mElemList["bImage"].drawNumberString("zhanLi_", "z" + force, 0, 0, -3)
        this.mElemList["bImage"].endDraw();
        
    }

	onRefreshActor(id){
        let actorview = this.mElemList["actor_view"]
        let actor = this.Player
        let modelId = id
        actor.loadModel(modelId)
        actor.changeAction("idle", 1.0, true);
        actor.setPositionXY(0, 0)
        actor.enterViewer(actorview)

        //缩放
        actor.setScale(1.0)
        //方向
        actor.setDir(1)
    }
    onShowWnd(zhanLi,name,str, id?){
		this.zhanLi = zhanLi
        this.name = name
        this.str = str
        this.id = id
        this.showWnd()
	}

}