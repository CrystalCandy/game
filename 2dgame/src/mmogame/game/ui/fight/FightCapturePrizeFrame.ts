// TypeScript file
//捕捉成果界面


class FightCapturePrizeFrame extends FightEndBaseFrame {
    controlDataTable: any
    actorView:UIActorView;
   

    public initObj(...params: any[]) {
       
        this.mLayoutPaths = ["layouts/fight/FightCapturePrizeLayout.exml"]
    }

    public onLoad(): void {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setAlignCenter(true, true)
        this.initSkinElemList();
        // this.mLayoutNode.setLayer(gui.GuiLayer.Top)

        this.mLayoutNode.verticalCenter = -100

        var elemInfo: any[] = [
            { ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onReturn },
            //{ ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onReturn },

          
        ];
        // }
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

        //let petEntry = 20001
        this.actorView = UIActorView.newObj(this.mLayoutNode, "actorview", 0, 0, this.mElemList["group_actorview"])
        this.actorView.setActorScale(1.2)
       

    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        super.onShow();
        this.bAutoHide = true
        this.maxDelayTime = 10 * 1000
        this.mLayoutNode.visible = true;

        GameSound.getInstance().playEffect(SystemSound.effect_win)
        this.refreshFrame()
    }

    public onHide(): void {
        super.onHide();
        
        this.mLayoutNode.visible = false;
        this.actorView.clearView()
       
    }

    refreshFrame() {
        //param:{commonPrize: {funds=0, bindCurrency=0, currency=0, plrExp=0, itemList={}, star=3, campaignId=0, petEntry=0}
        //         fightType: }
        let petEntry = 20001
        if (this.param && this.param.commonPrize) {
            petEntry = this.param.commonPrize.petEntry
        }
         this.actorView.updateByPlayer(GetPetModel(petEntry))
    }

    starShowCombatEnd() {
        return this.showWnd()
    }

    autoHideTick(leftTime) {
        this.mElemList["btn_close"].text = Localize_cns("SURE") + "(" + Math.floor(leftTime / 1000) + ")"
    }

    onReturn(args) {
        this.endShowCombatEnd()
    }
}