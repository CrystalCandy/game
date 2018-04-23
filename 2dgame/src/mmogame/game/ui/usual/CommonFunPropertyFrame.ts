// TypeScript file
class CommonFunPropertyFrame extends BaseWnd {
    type
    select
    Player

    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/usual/CommonFunPropertyLayout.exml"]
      
	}
    public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.mLayoutNode.width = 560
        this.mLayoutNode.height = 720

        this.setAlignCenter(true, true)
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			
			];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

		this.mElemList["rd_1"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["rd_2"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["rd_3"].setAlignFlag(gui.Flag.CENTER_CENTER);
		this.mElemList["rd_4"].setAlignFlag(gui.Flag.CENTER_CENTER);
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
        
		this.onRefresh();
	}

	public onHide(): void {
		this.mLayoutNode.visible = false;
		this.mLayoutNode.setDoModal(false);
	}
    
	onRefresh(){
		let funInfo = FunSystem.getInstance().getFunInfoWithType(this.type)
        let force = funInfo.force
        this.refreshForceNum(force)

        let skinList = {
           [cellOptionsIndex.HeroRide]: 1, 
           [cellOptionsIndex.HeroWing]: 1,
           [cellOptionsIndex.TianNv]: 1,
           [cellOptionsIndex.TianXian]: 1,
           [cellOptionsIndex.TianXianWeapon]: 1,
        }


		let configList = GetTemCellTotalProperty(this.type)
        //let strlist = []
        for(let k = 1; k <= size_t(configList); k++){
            let tempConfig = configList[k-1]
            let tempStr = ""
            for(let k in tempConfig){
                tempStr +=  GetPropertyName(lastAbilityNameToIdOptions[k])  + "#green" + tempConfig[k] + "#rf#space"
            }
            AddRdContent( this.mElemList["rd_" + k],tempStr,"ht_20_cc","black");
        }

        if(!skinList[this.type]){
            this.mElemList["group_property"].height = 228
            this.mElemList["group_skin"].visible = false
        }else{
            this.mElemList["group_property"].height = 304
            this.mElemList["group_skin"].visible = true
        }

		if(this.Player == null){
            this.Player = Player.newObj()
        }

		let modelid = GameConfig.FunShapeConfig[cellOptionsName[this.type - 1]][this.select].Shape
        this.onRefreshActor(modelid)
	}

    onShowWnd(cellOptionsIndex, select){
	//	this.used = used;
		this.type = cellOptionsIndex
        this.select = select
        this.showWnd()
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
        actor.setDir(3)
    }
}