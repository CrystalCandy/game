// TypeScript file
class XianLvPropertyFrame extends BaseWnd {
	id;
    Player:Player
    
    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/xianlv/XianLvPropertyLayout.exml"]
      
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
        this.mElemList["rd_2"].setAlignFlag(gui.Flag.CENTER_TOP);
        
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
        this.mElemList["label_wndName"].text = Localize_cns("XIANLV_TXT8")
       
	//	AddRdContent(this.mElemList["rd_1"],this.str,"ht_24_cc","ublack") 
        this.onRefresh()
	}

    onRefresh(){
        let totalList = GetSumXianLvProperty()
	
        let att = totalList["demage"] || 0
        let hp = totalList["maxhp"] || 0
        let def = totalList["hujia"] || 0
        
        let str1 = String.format(Localize_cns("ROLE_MOUNT_DAN_TXT2"), hp, att, def)
        AddRdContent(this.mElemList["rd_1"],str1, "ht_24_cc","black")


        let str2 = String.format(Localize_cns("ROLE_MOUNT_DAN_TXT2"), 0,0,0)
        let qiyuan = XianLvSystem.getInstance().getQiYuanProperty()
        if(qiyuan.length == 0){
            qiyuan = [0, 0]
        }
        let qiyuanStr = String.format(Localize_cns("XIANLV_PROPERTY_TXT1"),qiyuan[0], qiyuan[1])
        str2 += "#br#rf" + qiyuanStr
        AddRdContent(this.mElemList["rd_2"],str2, "ht_24_cc", "black")
        //战力
        let force = XianLvSystem.getInstance().getTotalForce()
        DrawNumberStringImage(this.mElemList["bImage"], "zhanLi_", "z" + force, 0, 0, -3)

        if(this.Player ==null){
            this.Player = Player.newObj()
        }
        this.onRefreshActor(this.id)
    }

	public onHide(): void {
		this.mLayoutNode.visible = false;
		this.mLayoutNode.setDoModal(false);
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
        actor.setDir(3)
    }
    onShowWnd(id){ //id 更新模型
		this.id = id
        this.showWnd()
	}

}