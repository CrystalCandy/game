

function getPetFollowInfo(followType) { //宠物跟踪信息
    let followInfo: any = {}
    if (followType == "pet") {
        followInfo.allowX = 5		        //允许范围
        followInfo.allowY = 5		        //允许范围
        followInfo.stopAdjust = false       //stop时是否马上调整位置、方向
        followInfo.defaultOffx = 3                //默认偏移位置
        followInfo.defaultOffy = 3                //默认偏移位置
    } else if (followType == "xianlv") {    //仙侣
        followInfo.allowX = 5		        //允许范围
        followInfo.allowY = 5		        //允许范围
        followInfo.stopAdjust = false       //stop时是否马上调整位置、方向
        followInfo.defaultOffx = 3                //默认偏移位置
        followInfo.defaultOffy = 0                //默认偏移位置
    } else if (followType == "tianxian") {  //天仙
        followInfo.allowX = 2		        //允许范围
        followInfo.allowY = 6		        //允许范围
        followInfo.stopAdjust = true       //stop时是否马上调整位置、方向
        followInfo.defaultOffx = 2                //默认偏移位置
        followInfo.defaultOffy = -5                //默认偏移位置
    }
    //followInfo.head  = 1      //宠物开始走的位置
    return followInfo
}


class Player extends Character {

    mFollowerList: any;
    head: number
    space: any;

    
    
    //maskid: number;

    //maskEffect: Effect;
    wingid: number;
    wingEffect: Effect;

     leftWeaponId: number;
    //rightWeaponId: number;
    leftWeaponEffect: Effect;
    //rightWeaponEffect: Effect;

    rideid: number;
    rideOffsetY:number;
    rideEffect: Player;
    

    traceEffectList: Effect[];
    curDir: number

    moveTargetPos: any;
    bNetMoveEnable: boolean;

    //deleyWingTimerId: number;

    public initObj(...args: any[]): void {
        this.setMovementNotifyEnable(true)
        this.mFollowerList = {}
        this.head = 1
        this.space = null

        this.wingid = -1
        this.wingEffect = null

        this.rideid = -1
        this.rideOffsetY = 0
        this.rideEffect = null

        //this.maskid = -1
        //this.maskEffect = null


        this.leftWeaponId = -1
       // this.rightWeaponId = -1
        this.leftWeaponEffect = null
        //this.rightWeaponEffect = null

        this.traceEffectList = []
        this.curDir = 0

        this.moveTargetPos = null
        this.bNetMoveEnable = true

        this.actorType = actor_Type.ACTOR_TYPE_PLAYER;
    }


    setHeroSpace(space) {
        this.space = space
    }

    getHeroSpace() {
        return this.space
    }

    destory() {
        this.clearFollower()
        this.deleteWing()
        //this.deleteMask()
        this.deleteWeapon()

        this.clearTraceEffect()
        this.deleteRide()
    }


    setVisible(selfVisible, petVisible?) {         //第二个参数控制宠物的显示，默认是宠物与玩家同时显示或隐藏
        let visible = petVisible || selfVisible

        super.setVisible(selfVisible);

        for (let _ in this.mFollowerList) {
            let followActor = this.mFollowerList[_]
            followActor.setVisible(selfVisible);
        }
    }

    initFollowModel(followType, modelId) {
        if(modelId != null && modelId > 0 ){
            let pet = this.mFollowerList[followType]
            if (pet == null) {
                pet = Pet.newObj(this)
                pet.loadModel(modelId)
                pet.enterMap()
                let pos = this.getCellXY()

                let info = getPetFollowInfo(followType)
                pet.setCellXY(pos.x+info.defaultOffx, pos.y+info.defaultOffy)
                
                let heroDir = this.getDir()
                pet.setDir(heroDir)
                
                this.mFollowerList[followType] = pet
            } else{
                pet.loadModel(modelId)
                pet.changeAction("idle")
            }

            if(! this.isVisible() ){
                pet.setVisible(false)
            }
         } else{
            if (this.mFollowerList[followType]) {
                this.mFollowerList[followType].deleteObj()
                this.mFollowerList[followType] = null
            }
         }
    }

    clearFollower() {
        for (let _ in this.mFollowerList) {
            let followActor = this.mFollowerList[_]
            followActor.deleteObj()
        }
        this.mFollowerList = {}
    }

    setFollowPet(modelId) {
         this.initFollowModel("pet", modelId)
    }

    getFollowPet() {
         return this.mFollowerList["pet"]
    }


    setFollowXianlv(modelId) {
        this.initFollowModel("xianlv", modelId)
    }

    getFollowXianlv() {
         return this.mFollowerList["xianlv"]
    }

    setFollowTianxian(modelId) {
        this.initFollowModel("tianxian", modelId)
    }



    onMoveBegin(args) {
        super.onMoveBegin(args);

      
        FireEvent(EventDefine.PLAYER_MOVE_BEGIN, ActorEvent.newObj(this))
    }

    onMoveStop(args) {
        super.onMoveStop(args);

        for (let fType in this.mFollowerList) {
            let followActor = this.mFollowerList[fType]

            let followInfo = getPetFollowInfo(fType)
            if (followInfo.stopAdjust == true) {
                let heroDir = this.getDir()

                //followActor.onPlayerStop(this)

                let dirOffsetMap:any = {
                    [3] : [-followInfo.defaultOffx, followInfo.defaultOffy],
                    [4] : [-followInfo.defaultOffx, followInfo.defaultOffy],
                    [5] : [-followInfo.defaultOffx, followInfo.defaultOffy],

                    [7] : [followInfo.defaultOffx, followInfo.defaultOffy],
                    [0] : [followInfo.defaultOffx, followInfo.defaultOffy],
                    [1] : [followInfo.defaultOffx, followInfo.defaultOffy],

                    [6] : [0, followInfo.defaultOffy],
                    [2] : [0, followInfo.defaultOffy],
                }
                //TLog.Error(heroDir)
                let cellX = this.getCellX()
                let cellY = this.getCellY()
                let speed = this.getMoveSpeed()
                let dirOffset = dirOffsetMap[heroDir] || [0, 0]
                followActor.setMoveSpeed(1.2 * speed)
                followActor.wantToGoByCell(cellX + dirOffset[0], cellY + dirOffset[1],true)
            }
        }
         

        FireEvent(EventDefine.PLAYER_MOVE_STOP, ActorEvent.newObj(this))
    }

    onMoving(args) {
        //宠物跟随
         for (let fType in this.mFollowerList) {
            let followActor = this.mFollowerList[fType]

            let followInfo = getPetFollowInfo(fType)
         	let followCellX = followActor.getCellX()
            let followCellY = followActor.getCellY()
         	let heroCellX = this.getCellX()
            let heroCellY = this.getCellY()

         	//无效步数
         	if((Math.abs(followCellX - heroCellX) <= followInfo.allowX) && (Math.abs(followCellY - heroCellY) <= followInfo.allowY) ){
         		return
         	}

         	//if(followActor.isMoving() ){
         	//	return
         	//}

         	let heroDir = this.getDir()
         	let dirOffsetMap:any = {
                [3] : [-followInfo.defaultOffx, followInfo.defaultOffy],
                [4] : [-followInfo.defaultOffx, followInfo.defaultOffy],
                [5] : [-followInfo.defaultOffx, followInfo.defaultOffy],

                [7] : [followInfo.defaultOffx, followInfo.defaultOffy],
                [0] : [followInfo.defaultOffx, followInfo.defaultOffy],
                [1] : [followInfo.defaultOffx, followInfo.defaultOffy],

                [6] : [0, followInfo.defaultOffy],
                [2] : [0, followInfo.defaultOffy],
            }
         	let speed = this.getMoveSpeed()
            let dirOffset = dirOffsetMap[heroDir] || [0, 0]
            followActor.setMoveSpeed(1.2 * speed)
            followActor.wantToGoByCell(heroCellX + dirOffset[0], heroCellY + dirOffset[1],true)
         	//this.mFollowerList.setGoalCellXY(wantCellX,wantCellY,true)
         	//TLog.Error("now turn to go %d  ,  %d",wantCellX,wantCellY) 
         }
        FireEvent(EventDefine.PLAYER_MOVE, ActorEvent.newObj(this))
    }

    hasStatus(v) {
        if (this.propertyInfo == null) {
            return false
        }
        return bit.band(this.propertyInfo.status, v) == v
    }


    onPropertyChange() {
        this.id = this.propertyInfo.id

        let count = 0
        for (let _ in opStatusType) {
            let v = opStatusType[_]

            if (this.propertyInfo.status && bit.band(this.propertyInfo.status, v) == v) {
                count = count + 1
            }
        }
        //TLog.Debug("Player.onPropertyChange")
        //TLog.Debug_r(this.propertyInfo)
        //设置军团信息
        let factionStr = ""
        let heroInfo = GetHeroPropertyInfo()

        if (this.propertyInfo["faction"] && this.propertyInfo["factionName"] && this.propertyInfo["factionPos"] && this.propertyInfo["faction"] > 0) {
            let posName = ClubSystem.getInstance().getPosName(this.propertyInfo["factionPos"])
            if (!posName) {
                posName = ""
            }
            let fontName = "#darksalmon"
            //darkorange
            if (heroInfo && this.propertyInfo["faction"] == heroInfo["faction"]) {
                fontName = "#darkorange"
            }
            //if(ClubSystem.getInstance().GetIsInMyUnion(this.propertyInfo["faction"]) ){
            //	fontName = "#lime"
            //}
            let factionName = this.propertyInfo["factionName"]
            factionStr = fontName + String.format("[%s]%s", posName, factionName)
        }
        this.doCommand(ActorCommand.SetFactionName, factionStr)

        if (this.propertyInfo.status && count >= 1) {
            this.doCommand(ActorCommand.SetMoreIcon, true, this.propertyInfo)
        } else {
            this.doCommand(ActorCommand.SetMoreIcon, false, this.propertyInfo)
        }
    }

    clearTraceEffect() {
        for (let _ in this.traceEffectList) {
            let v = this.traceEffectList[_]

            v.deleteObj()
        }

        this.traceEffectList = []

        this.curDir = this.getDir()
    }

    handleAnimNotify(notify, effect) {
        if (notify == "end") {
            table_remove(this.traceEffectList, effect)
        }
    }

    onStateChange(oldState, curState) {
        //TLog.Warn("Character.onStateChange old:%s, cur:%s", tostring(oldState), tostring(curState))

        let bHandle = super.onStateChange(oldState, curState)


        if (this.stateMrg.isActionState(curState)) {
            if (curState == characterState.actionState_move) {
                if (this.wingEffect) {
                    this.wingEffect.setVisibleRaw(true)
                    this.wingEffect.changeAction("run")
                }
            } else if (curState == characterState.actionState_idle) {
                if (this.wingEffect) {
                    this.wingEffect.setVisibleRaw(true)
                    this.wingEffect.changeAction("idle")
                }
            } else {
                if (this.wingEffect) {
                    this.wingEffect.setVisibleRaw(false)
                }
            }
        }


        return bHandle
    }




    loadModel(modelId) {
        let wingid = this.wingid
        let rideid = this.rideid
        let rideOffsetY = this.rideOffsetY
        //let maskid = this.maskid

        let leftWeaponId = this.leftWeaponId
        //let rightWeaponId = this.rightWeaponId

        this.deleteWing()
        //this.deleteMask()
        this.deleteRide()
        this.deleteWeapon()
        this.wingid = -1
        this.rideid = -1
        //this.maskid = -1

        this.leftWeaponId = -1
        //this.rightWeaponId = -1


        super.loadModel(modelId)

        this.setWing(wingid)
        //this.setMask(maskid)
        this.setRide(rideid, rideOffsetY)
        this.setWeaponId(leftWeaponId)
    }


    clearModelEffect() {
        this.deleteWing()
        //this.deleteMask()
        this.deleteRide()
        this.deleteWeapon()
        this.wingid = -1
        this.rideid = -1
        //this.maskid = -1

        this.leftWeaponId = -1
       // this.rightWeaponId = -1
    }


    setWing(wingid) {
        wingid = wingid || 0

        if (this.wingid == wingid) {
            return
        }

        this.deleteWing()
        this.wingid = -1
        if (wingid <= 0) {
            return
        }
        this.wingid = wingid


        //if (this.rideid < 0) {
            let boneParam: any = {}
            boneParam.name = "wing_point"
            boneParam.order = 0
            boneParam.transfrom = true

            //修改plist配置尺寸，翅膀降低高度
            this.wingEffect = EffectManager.getInstance().createBindEffect(wingid, this, boneParam, true)
            // if (this.stateMrg.isState(characterState.actionState_idle)) {
            //     this.wingEffect.changeAction("idle")
            // } else if (this.stateMrg.isState(characterState.actionState_move)) {
            //     this.wingEffect.changeAction("run")
            // }
            // this.wingEffect.setPositionXY(0, 10)
        //}

    }

    deleteWing() {

        if (this.wingEffect) {
            this.wingEffect.deleteObj()
            this.wingEffect = null

            this.updateBoundRect()
        }

        // if (this.deleyWingTimerId) {
        //     KillTimer(this.deleyWingTimerId)
        //     this.deleyWingTimerId = null
        // }
    }

    deleteRide() {
        if (this.rideEffect) {
            this.rideEffect.deleteObj()
            this.rideEffect = null

            this.rideOffsetY = 0
            this.setPositionOffset(0, 0)
        }
    }


    setRide(rideid, offsety?) {

         rideid = rideid || 0

        if (this.rideid == rideid) {
            return
        }

        this.deleteRide()
        this.rideid = -1
        if (rideid <= 0) {
            return
        }
        this.rideid = rideid


        let boneParam: any = {}
        boneParam.name = "ride_point"
        boneParam.order = 0
        boneParam.transfrom = true

        this.rideEffect = EffectManager.getInstance().createBindEffect(rideid, this, boneParam, true)

        if(offsety != null){
            this.rideOffsetY = offsety
            this.setPositionOffset(0, offsety)
        }
           
    }

    // getRidePlayer() {
    //     return this.ridePlayer
    // }


    // deleteMask() {
    //     if (this.maskEffect) {
    //         this.maskEffect.deleteObj()
    //         this.maskEffect = null

    //         this.updateBoundRect()
    //     }
    // }

    //面具
    // setMask(maskid) {
    //     maskid = maskid || 0

    //     if (this.maskid == maskid) {
    //         return
    //     }

    //     this.deleteMask()
    //     this.maskid = -1
    //     if (maskid <= 0) {
    //         return
    //     }
    //     this.maskid = maskid

    //     let plr = this.ridePlayer

    //     if (plr == null) {
    //         plr = this
    //     }

    //     let boneParam: any = {}
    //     boneParam.name = "mask_point"
    //     boneParam.order = 1
    //     boneParam.transfrom = true
    //     this.maskEffect = EffectManager.getInstance().createBindEffect(maskid, plr, boneParam, true)

    // }


    setNetMoveEnable(bEnable) {
        this.bNetMoveEnable = bEnable
    }

    isNetMoveEnable(bEnable) {
        return this.bNetMoveEnable
    }

    setMoveTargetPos(pos) {
        this.moveTargetPos = pos
    }

    getMoveTargetPos() {
        return this.moveTargetPos
    }

    setWeaponId(leftWeaponId) {
        leftWeaponId = leftWeaponId || 0
        //rightWeaponId = rightWeaponId || 0


        //if (this.leftWeaponId == leftWeaponId && this.rightWeaponId == rightWeaponId) {
        if (this.leftWeaponId == leftWeaponId ) {
            return
        }

        this.deleteWeapon()
        this.leftWeaponId = -1
        //this.rightWeaponId = -1

        if (leftWeaponId > 0) {
            this.leftWeaponId = leftWeaponId
            //if (this.rideid < 0) {
                let boneParam: any = {}
                boneParam.name = "leftweapon"
                boneParam.order = 0
                boneParam.transfrom = true

                //10000 showid不存在，则取defaultid-1
                //this.changePartShow("leftweapon", 10000, -1)

                this.leftWeaponEffect = EffectManager.getInstance().createBindEffect(leftWeaponId, this, boneParam, true)
            //}
        }

        // if (rightWeaponId > 0) {
        //     this.rightWeaponId = rightWeaponId
        //     if (this.rideid < 0) {
        //         let boneParam: any = {}
        //         boneParam.name = "rightweapon"
        //         boneParam.order = 1
        //         boneParam.transfrom = true

        //         //10000 showid不存在，则取defaultid-1
        //         //this.changePartShow("rightweapon", 10000, -1)
        //         this.rightWeaponEffect = EffectManager.getInstance().createBindEffect(rightWeaponId, this, boneParam, true)
        //     }
        // }




    }

    deleteWeapon() {

        let bUpdate = false
        if (this.leftWeaponEffect) {
            this.leftWeaponEffect.deleteObj()
            this.leftWeaponEffect = null

            bUpdate = true;

            //this.changePartShow("leftweapon", -1, -1)
        }

        // if (this.rightWeaponEffect) {
        //     this.rightWeaponEffect.deleteObj()
        //     this.rightWeaponEffect = null

        //     //this.changePartShow("rightweapon", -1, -1)
        //     bUpdate = true;

        // }

        if (bUpdate) {
            this.updateBoundRect()
        }
    }
}