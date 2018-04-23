/*
作者:
    ChenPeng
	
创建时间：
    2017.06.05(星期一) 

意图：
  	部下战力变化
	
公共接口：
	
*/

class PetCombatForceTipsFrame extends BaseWnd {

    showResultAction:MoveAction;
    delta:number;

    public initObj(...args: any[]): void {
        this.delta = 0;

        //PetCombatForceToShow
        //RegisterEvent(EventDefine.INIT_ALL_PET_COMBATFORCE, this.onInit, this)
        RegisterEvent(EventDefine.SHOW_COMBATFORCE_CHANGED, this.showCombatForceChange, this)
    }

    destory() {
        UnRegisterEvent(EventDefine.SHOW_COMBATFORCE_CHANGED, this.showCombatForceChange, this)
    }


    showCombatForceChange(args) {


        //let old = this.combatForceRecord[petEntry] || 0
        let delta = args.delta//petInfo.combateForce - old
        this.delta = delta

        //this.combatForceRecord[petEntry] = petInfo.combateForce

        if (delta != 0) {
            if (this.isVisible()) {
                this.hideWnd()
            }
            return this.showWnd()
        }
    }


    onLoad() {
        let width = 474, height = 90
       
        UiUtil.setWH(this.mLayoutNode, width, height)
        this.mLayoutNode.touchEnabled = false
        this.mLayoutNode.touchChildren = false
        this.mLayoutNode.setLayer(gui.GuiLayer.Top)

        this.mElemList = {}
        let mElemInfo: any = [
            //{ ["index_type"]: eui.Image,        ["name"]: "bg",           ["title"]: null, ["font"]: null, ["image"]: "ty_zhanLiDi02", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["percentWidth"]: 100, ["percentHeight"]: 100, ["event_name"]: null, ["fun_index"]: null },

            { ["index_type"]: eui.Group,        ["name"]: "group",           ["horizontalCenter"]: 0, ["y"]: 0, },
            { ["index_type"]: eui.Image,        ["name"]: "addOrSub",        ["parent"]: "group",     ["title"]: null, ["font"]: null, ["image"]: "", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 15,  ["event_name"]: null, ["fun_index"]: null },
            { ["index_type"]: gui.BatchImage,   ["name"]: "combatForceChanged", ["parent"]: "group",  ["title"]: null, ["font"]: null, ["image"]: "", ["color"]: null, ["x"]:190, ["y"]: 13, ["event_name"]: null, ["fun_index"]: null },
            //{ ["index_type"]: eui.Label, ["name"]: "combatForceChanged", ["title"]: "Lv.99", ["font"]: "ht_30_cc_stroke", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: 640, ["h"]: 60, ["messageFlag"]: true },
        ]
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this)

        let data: any = { ["startX"]: 83, ["startY"]: 500, ["endX"]: 83, ["endY"]: 350,  ["moveType"]: "inertional", }
        this.showResultAction = MoveAction.newObj(this.mLayoutNode, 1000, data, this.hideWnd, this)

        // let label:eui.Label = this.mElemList["combatForceChanged"]
        // label.size = 40;
    }

    onUnLoad() {
        //this.effect.deleteObj()
        //UnRegisterEvent(EventDefine.INIT_ALL_PET_COMBATFORCE, this.onInit, this)
        UnRegisterEvent(EventDefine.SHOW_COMBATFORCE_CHANGED, this.showCombatForceChange, this)
    }

    onShow() {
        this.mLayoutNode.visible = (true)
        //this.showResultAction.stop()
        this.showResultAction.run()
        this.refreshFrame()
    }

    onHide() {
        this.mLayoutNode.visible = (false)
        this.showResultAction.stop()
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////-

    refreshFrame() {
        let batchImage:gui.BatchImage = this.mElemList["combatForceChanged"]

        //let absVal = Math.abs(this.delta)

        let delta = Math.abs(this.delta)
        let deltaStr = delta + "";
        
        if(delta <= defaultValue.FORCE_EXPRESS_VALUE ){
            //delta = tostring(delta * 100) +"%"
            let allForce = GetHeroProperty("allCombatForce") || 1
            
            deltaStr = Math.ceil(delta / allForce * 100) +"%"
        }


        if (this.delta < 0) {
            let head = this.mElemList["addOrSub"]
            head.source = ("zhanLiJian")


            //this.mElemList["bg"].source = "ty_zhanLiDi03"

            batchImage.beginDraw();
            //batchImage.drawImage("zhanLiJia")
            batchImage.drawNumberString("zhanLiJian0", deltaStr)
            batchImage.endDraw();

        } else {
            let head = this.mElemList["addOrSub"]
            head.source = ("zhanLiJia")

            //this.mElemList["bg"].source = "ty_zhanLiDi02"

            batchImage.beginDraw();
            //batchImage.drawImage("zhanLiJia")
            batchImage.drawNumberString("zhanLiJia0", deltaStr)
            batchImage.endDraw();
        }

        // let absVal = Math.abs(this.delta)

        // if(this.delta > 0){
        //     let label:eui.Label = this.mElemList["combatForceChanged"]
        //     label.text = String.format(Localize_cns("FIGHT_ZHANLI_ADD"), "+" + absVal) 
        //     label.textColor = gui.Color.orange;
        // }else if(this.delta < 0){
        //     let label:eui.Label = this.mElemList["combatForceChanged"]
        //     label.text = String.format(Localize_cns("FIGHT_ZHANLI_REDUCE"), "-" + absVal) 
        //     label.textColor = gui.Color.lime;
        // }
    }
}