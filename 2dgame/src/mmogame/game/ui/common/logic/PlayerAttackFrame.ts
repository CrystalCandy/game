/*
作者:
    liuziming
	
创建时间：
   2017.02.04(周六)

意图：
   混沌世界内攻击玩家
公共接口：
   
*/
class PlayerAttackFrame extends BaseWnd {
    controlDataTable:any;

    playerId:number;
    playerInfo:any;
    callback:Function;
    obj:any;

    timerList:any;

    public initObj(...args: any[]): void {
        this.controlDataTable = {}
        this.timerList = {}

        this.playerId = -1

        this.obj = null
        this.callback = null
    }

    onLoad() {
        this.createFrame()
    }

    onUnLoad() {

    }

    onShow() {
        this.mLayoutNode.visible = (true)

        this.refreshFrame()
    }

    onHide() {
        this.mLayoutNode.visible = (false)

        this.callback = null
        this.obj = null

        for(let _ in this.timerList){
                let timer = this.timerList[_]
        
            KillTimer(timer)
        }
        this.timerList = {}
    }

    ////////////////////////////////////////////////////////////////////-
    createFrame() {

        let  width = 210, height = 120

        UiUtil.setWH(this.mLayoutNode, width, height)
        UiUtil.setXY(this.mLayoutNode, 150, 200)

        this.mElemList = {}
        let mElemInfo: any = [
            { ["index_type"]: gui.Grid9Image, ["name"]: "bg", ["title"]: null, ["font"]: null, ["image"]: "ty_zhuangBeiBg00", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: width, ["h"]: height, ["event_name"]: null, ["fun_index"]: null },

            { ["index_type"]: eui.Image, ["name"]: "player_kuang", ["title"]: null, ["font"]: "ht_24_cc_stroke", ["image"]: "ty_pet_pinJieBg05", ["color"]: gui.Color.white, ["bAdapteWindow"]: true, ["x"]: 20, ["y"]: 0, ["w"]: 77, ["h"]: 77, ["event_name"]: null, ["fun_index"]: null, },
            { ["index_type"]: eui.Image, ["name"]: "player_icon", ["parent"]: "player_kuang", ["title"]: null, ["font"]: "ht_24_cc_stroke", ["image"]: "pet_3001", ["color"]: gui.Color.white, ["bAdapteWindow"]: true, ["x"]: 0, ["y"]: 0, ["w"]: 77, ["h"]: 77, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickHead },

            { ["index_type"]: eui.Label, ["name"]: "player_name", ["title"]: Localize_cns("TYPE_ACC_INFO"), ["font"]: "ht_16_cc_stroke", ["scale_image"]: "", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 75, ["w"]: 116, ["h"]: 25, ["event_name"]: null, ["fun_index"]: null, ["messageFlag"]: true, },
            { ["index_type"]: eui.Label, ["name"]: "player_level", ["title"]: "Lv 24", ["font"]: "ht_16_cc_stroke", ["scale_image"]: "", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 95, ["w"]: 116, ["h"]: 25, ["event_name"]: null, ["fun_index"]: null, ["messageFlag"]: true, },

            { ["index_type"]: gui.Button, ["name"]: "attack", ["title"]: Localize_cns("FIGHT_ATTACK_TITLE"), ["font"]: "ht_20_cc_stroke", ["image"]: "ty_tongYongBt07", ["color"]: gui.Color.white, ["x"]: 110, ["y"]: 25, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickAttackBtn },

        ]
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this)
        
    }

    refreshFrame() {

        let player = ActorManager.getInstance().getPlayer(this.playerId)
        TLog.Debug("this.playerId", this.playerId, player)
        if (player == null) {
            return this.hideWnd()
        }

        this.mElemList["attack"].enabled = ( configRobber.mapId == MapSystem.getInstance().getMapId() || this.callback != null)

        this.playerInfo = player.getPropertyInfo()
        if (this.timerList["show"]) {
            KillTimer(this.timerList["show"])
            delete this.timerList["show"]
        }

        this.timerList["show"] = SetTimer(this.showingTick, this, 5 * 1000, false)

        //this.mElemList["player_kuang"].source = (ProfessionSystem.getInstance().getProfessionQualityImage(this.playerInfo.vocation))
        this.mElemList["player_icon"].source = (GetProfessionIcon(this.playerInfo.vocation, this.playerInfo.sexId))

        this.mElemList["player_name"].text = (this.playerInfo.name)
        this.mElemList["player_level"].text = ("Lv." + this.playerInfo.level)
    }

    showingTick(delay) {
        if (this.timerList["show"]) {
            KillTimer(this.timerList["show"])
            delete this.timerList["show"]
        }
        this.hideWnd()
        //this.hideAction.run()
    }
    ////////////////////////////////////////////////////////////-响应函数//////////////////////////////////////////////////////////////////////


    onClickAttackBtn(args) {
        if (this.obj && this.callback) {
            this.callback.call(this.obj, this.playerId, this.playerInfo)
        } else {
            // let activity = GetActivity(ActivityDefine.Robber)
            // activity.attackPlayer(this.playerId)

            // this.refreshFrame()
        }
    }

    onClickHead(args:egret.TouchEvent) {

        
        let spacex = args.stageX
        let spacey = args.stageY
        let playerId = this.playerId

        let wnd = WngMrg.getInstance().getWindow("MainPlayerFrame")
        wnd.showMainPlayerFrame(spacex, spacey, playerId)
    }
    ////////////////////////////////////////////////////////公共接口//////////////////////////////////////////////////-
    showWithCallback(playerId, callback?, obj?) {
        this.playerId = playerId

        this.obj = obj
        this.callback = callback

        if (this.isVisible() == false) {
            return this.showWnd()
        } else {
            return this.refreshFrame()
        }
    }
}