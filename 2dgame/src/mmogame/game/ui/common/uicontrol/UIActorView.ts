/*
作者:
    yangguiming
	
创建时间：
   2017.03.22(周三)

意图：
   模型播放封装
公共接口：
   
*/

class UIActorView extends TClass {

    mLayoutNode: gui.LayoutNode;
    name: string;
    mElemList: any;
    rootWnd: any;


    animTims: number;
    action: string;
    curTimes: number

    actor: Actor;


    callbackFunc: Function;
    callbackObj: any;
    userData: any;
    scale: number;

    lockEvent:boolean;


    public initObj(...args: any[]): void {
        this.mLayoutNode = args[0]
        this.name = args[1]
        let x = args[2]
        let y = args[3]

        let parentWnd = args[4]

        let width = 1
        let height = 1

        this.rootWnd = null

        this.mElemList = {}
        let rootName = this.name
        let mElemInfo: any = [
            { ["index_type"]: gui.ActorView, ["name"]: this.name , ["title"]: "", ["x"]: x, ["y"]: y, ["w"]: width, ["h"]: height, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
        ]
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, parentWnd)
        this.rootWnd = this.mElemList[this.name]

        this.clearData()

        this.lockEvent = false
    }

    destory() {
        this.clearView()
    }


    setVisible(b) {
        this.rootWnd.visible = (b)
    }

    isVisible() {
        return this.rootWnd.visible
    }

    setXY(x, y) {
        UiUtil.setXY(this.rootWnd,x, y)
    }

    getRootWnd(){
        return this.rootWnd
    }

    setTouchEnable(b){
        this.rootWnd.touchEnabled = b;
        this.rootWnd.touchChildren = b;
    }

    clearData() {
        this.animTims = -1
        this.action = null
        this.curTimes = 0
    }

    clearView() {
        this.clearData()
        this.refreshActorView(-1)
    }

    updateByOnceEffect(effectId, times?) {
        times = checkNull(times , 1)
        return this.updateByEffect(effectId, times)
    }

    updateByEffect(effectId, times?) {
        if (effectId == null || effectId < 0) {
            this.clearView()
            return
        }

        let effectRef = GameConfig.EffectConfig[effectId]
        if (effectRef == null) {
            TLog.Error("UIActorView.updateWithEffect %s", effectId)
            return effectRef
        }

        let actorView = this.mElemList[this.name ]
        if (!this.actor) {
            this.actor = Effect.newObj()
            //this.actor.enterViewer(actorView)

            let listener: any = { this_index: this, notify_name: "end", function_index: this.onAnimNotify }
            this.actor.addAnimListener(listener)
            this.actor.enterViewer(actorView)

        }

        this.clearData()
        if (times) {
            this.animTims = times
        }

        if(this.lockEvent == false ){
            this.refreshActorView(effectRef.model)
        }else{
            DelayEvecuteFunc(1, this.refreshActorView, this, effectRef.model)
        }
        return this.actor
    }

    updateByPlayer(modelId, action?, dir?) {
        if (modelId == null || modelId < 0) {
            this.clearView()
            return
        }

        let actorView = this.mElemList[this.name ]
        if (!this.actor) {
            this.actor = Player.newObj()
            //this.actor.setPositionXY(0, -80) 
            this.actor.setDir(checkNull(dir, ActorDirMap.RightBottom))
            this.actor.enterViewer(actorView)
        }

        this.clearData()
        this.action = action || "idle"

        
        if(this.lockEvent == false ){
            this.refreshActorView(modelId)
        }else{
            DelayEvecuteFunc(1, this.refreshActorView, this, modelId)
        }
        return this.actor
    }

    updateByPlayerAppearInfo(appearInfo, action?, dir?) {
        if(action == null)
            action = "idle"
        //let actorView:UIActorView = this.mElemList["actorview"]

		let model = GetProfessionModel(appearInfo.vocation, checkNull(appearInfo.sexId , genderOptions.MALE), appearInfo.rideShapeId)
		//时装模型ID(可能坐骑模型也变了)
        if(appearInfo.heroShapeId != null && appearInfo.heroShapeId != 0){
            let shapeModel = GetShapeModelId(appearInfo.heroShapeId, checkNull(appearInfo.sexId , genderOptions.MALE)) 
            if(shapeModel > 0){
                model = shapeModel
            }
        }

		let player = <Player>this.updateByPlayer(model, action, dir)
		//坐骑
        player.setRide(GetShapeEffectId(appearInfo.rideShapeId), GetShapeRideOffY(appearInfo.rideShapeId))
        //神兵
        player.setWeaponId(GetShapeEffectId(appearInfo.weaponShapeId))
         //翅膀
        player.setWing(GetShapeEffectId(appearInfo.wingShapeId))
    }

    updateByPlayerSomeInfo(...args : any []){
        let playerInfo = args[0]
        let modelList = args[1]

        let model = GetProfessionModel(playerInfo.vocation, checkNull(playerInfo.sexId , genderOptions.MALE), playerInfo.rideShapeId)

        let player = <Player>this.updateByPlayer(model, "idle", 3)

        for(let k in modelList){
            let modelType = modelList[k]
            if(k == "rideShapeId"){
                player.setRide(GetShapeEffectId(modelType), GetShapeRideOffY(modelType))
            }else if(k == "weaponShapeId"){
                player.setWeaponId(GetShapeEffectId(modelType))
            }else if(k == "wingShapeId"){
                player.setWing(GetShapeEffectId(modelType))
            }else if (k == "heroShapeId"){
                if(modelType != null && modelType != 0){
                    let shapeModel = GetShapeModelId(modelType, checkNull(playerInfo.sexId , genderOptions.MALE)) 
                    if(shapeModel > 0){
                        model = shapeModel
                    }
                }
                let player = <Player>this.updateByPlayer(model, "idle", 3)
            }
        }
    }

    refreshActorView(modelId) {
        if(this.actor == null ){
            return
        }
        let actorView = this.mElemList[this.name ]

        if (modelId < 0) {
            if (this.actor) {
                this.actor.clearAnimListener();
                this.actor.leaveViewer(actorView)
                this.actor.deleteObj()
            }
            this.actor = null
            return
        }
        //TLog.Debug("UIActorView.refreshActorView", modelId, "action:",this.action)

        this.actor.setScale(1)                              //重置
        this.actor.loadModel(modelId)
        if (!this.action) {
            this.actor.changeAction("", 1.0, true)
        } else {
            //modify:有可能模型配置还没加载
            // if(this.action == "idle"){
            //     if(this.actor.hasActionId("idle") == false){
            //         this.action = "combat_idle"
            //     }
            // }

            this.actor.changeAction(this.action, 1.0, true)
        }

        let defaultScale = this.actor.getScale()
        this.actor.setScale(checkNull(this.scale , defaultScale))
    }

    onAnimNotify(notify) {
        if (notify == "end") {
            this.curTimes = this.curTimes + 1

            this.lockEvent = true
            if (this.callbackFunc) {
                this.callbackFunc.call(this.callbackObj, this.actor, this.userData, notify)
            }
            this.lockEvent = false

            if (this.animTims > 0 && this.animTims <= this.curTimes) {
                this.clearView()
                return
            }


        }
    }


    setAnimOneCycleCallback(callback, obj, userData) {
        this.callbackFunc = callback
        this.callbackObj = obj
        this.userData = userData
    }

    changeAction(action, speed?, isLoop?) {
        if (!this.actor) {
            return
        }

        this.actor.changeAction(action || "idle", speed || 1.0, !!isLoop)
        return this.actor
    }

    setActorScale(scale) {
        if (scale == null){
            this.scale = 1
        }else{
            this.scale = scale
        }
    }

    setActorDir( dir){
        this.actor.setDir(dir)
    }
}