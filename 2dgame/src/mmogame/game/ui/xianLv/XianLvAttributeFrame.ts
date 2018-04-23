class XianLvAttributeFrame extends BaseWnd {
    Player:Player
	selectId

    public initObj(...params: any[]) {
	    this.mLayoutPaths = ["layouts/xianlv/XianLvAttributeLayout.exml"]
      
	}
    public onLoad(): void {
		this.mLayoutNode.skinName = this.mLayoutPaths[0];
		this.setAlignCenter(true, true)
		this.initSkinElemList();

		var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_back", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },

				];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

        this.mElemList["rd_name"].setAlignFlag(gui.Flag.CENTER_CENTER)
        this.mElemList["rd_add"].setAlignFlag(gui.Flag.CENTER_CENTER)
		
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
        this.onRefresh()
	}

	public onHide(): void {
		this.mLayoutNode.visible = false;
	}

    onRefresh(){
        
        
        //名字星级
        let num = 1
        let stage = 1
        let step = 0
        let stageexp = 0
        if(XianLvSystem.getInstance().isExit(this.selectId)){
            stage = XianLvSystem.getInstance().getLevel(this.selectId)
            num = XianLvSystem.getInstance().getStar(this.selectId)
            stageexp = XianLvSystem.getInstance().getExpById(this.selectId)
        
        }

        this.onRefreshStar(num)

        let name = GameConfig.ActorXianLvConfig[this.selectId].name
        let quality = GameConfig.ActorXianLvConfig[this.selectId].quality
		let nameColor = GetQualityColorStr(quality)
        this.mElemList["label_wndName"].text = name 
       // name += "#" + nameColor + name
        AddRdContent(this.mElemList["rd_name"], name , "ht_24_cc_stroke", nameColor)

        //加成属性
        let attrlist = GetXianLvProperty(this.selectId)
        let att = attrlist["demage"]
        let hp  = attrlist["maxhp"]
        let def = attrlist["hujia"]
        let addStr = String.format(Localize_cns("ROLE_MOUNT_DAN_TXT2"), hp , att , def)
        AddRdContent(this.mElemList["rd_add"], addStr, "ht_24_cc", "ublack")

        
        //更新战力
        let force = GetForceMath(attrlist)
        DrawNumberStringImage(this.mElemList["bImage"], "zhanLi_", "z" + force, 0, 0, -3)
        //actor
        if (this.Player == null) {
			this.Player = Player.newObj()
	    }
        this.onRefreshActor(this.selectId)
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

    onRefreshStar(num){
        for(let i = 1; i <= 7; i++){
            if(!this.mElemList["star_" + i]) {
                let info = [
                     {  ["index_type"]: eui.Image, ["name"]: "star_" + i,  ["image"]: "ty_starDi01", ["x"]: 0, ["y"]: 0, ["w"]: 0, ["h"]: 0, ["messageFlag"]: true },
                ]
                 UiUtil.createElem(info, this.mLayoutNode, this.mElemList, this, this.mElemList["sx_star_wnd"])
            }
            
        }
        for(let i = 1; i <= num; i++){
            this.mElemList["star_" + i ].source = "ty_star01"
        }
        if(num < 7){
            for(let i = num + 1; i <= 7 ; i++){
                this.mElemList["star_" + i ].source = "ty_starDi01"
            }
        }
    }
  
    onShowWnd(id){
        this.selectId = id
        this.showWnd()
    }
}