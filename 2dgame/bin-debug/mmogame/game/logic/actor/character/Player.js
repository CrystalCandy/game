var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function getPetFollowInfo(followType) {
    var followInfo = {};
    if (followType == "pet") {
        followInfo.allowX = 5; //允许范围
        followInfo.allowY = 5; //允许范围
        followInfo.stopAdjust = false; //stop时是否马上调整位置、方向
        followInfo.defaultOffx = 3; //默认偏移位置
        followInfo.defaultOffy = 3; //默认偏移位置
    }
    else if (followType == "xianlv") {
        followInfo.allowX = 5; //允许范围
        followInfo.allowY = 5; //允许范围
        followInfo.stopAdjust = false; //stop时是否马上调整位置、方向
        followInfo.defaultOffx = 3; //默认偏移位置
        followInfo.defaultOffy = 0; //默认偏移位置
    }
    else if (followType == "tianxian") {
        followInfo.allowX = 2; //允许范围
        followInfo.allowY = 6; //允许范围
        followInfo.stopAdjust = true; //stop时是否马上调整位置、方向
        followInfo.defaultOffx = 2; //默认偏移位置
        followInfo.defaultOffy = -5; //默认偏移位置
    }
    //followInfo.head  = 1      //宠物开始走的位置
    return followInfo;
}
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //deleyWingTimerId: number;
    Player.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.setMovementNotifyEnable(true);
        this.mFollowerList = {};
        this.head = 1;
        this.space = null;
        this.wingid = -1;
        this.wingEffect = null;
        this.rideid = -1;
        this.rideOffsetY = 0;
        this.rideEffect = null;
        //this.maskid = -1
        //this.maskEffect = null
        this.leftWeaponId = -1;
        // this.rightWeaponId = -1
        this.leftWeaponEffect = null;
        //this.rightWeaponEffect = null
        this.traceEffectList = [];
        this.curDir = 0;
        this.moveTargetPos = null;
        this.bNetMoveEnable = true;
        this.actorType = actor_Type.ACTOR_TYPE_PLAYER;
    };
    Player.prototype.setHeroSpace = function (space) {
        this.space = space;
    };
    Player.prototype.getHeroSpace = function () {
        return this.space;
    };
    Player.prototype.destory = function () {
        this.clearFollower();
        this.deleteWing();
        //this.deleteMask()
        this.deleteWeapon();
        this.clearTraceEffect();
        this.deleteRide();
    };
    Player.prototype.setVisible = function (selfVisible, petVisible) {
        var visible = petVisible || selfVisible;
        _super.prototype.setVisible.call(this, selfVisible);
        for (var _ in this.mFollowerList) {
            var followActor = this.mFollowerList[_];
            followActor.setVisible(selfVisible);
        }
    };
    Player.prototype.initFollowModel = function (followType, modelId) {
        if (modelId != null && modelId > 0) {
            var pet = this.mFollowerList[followType];
            if (pet == null) {
                pet = Pet.newObj(this);
                pet.loadModel(modelId);
                pet.enterMap();
                var pos = this.getCellXY();
                var info = getPetFollowInfo(followType);
                pet.setCellXY(pos.x + info.defaultOffx, pos.y + info.defaultOffy);
                var heroDir = this.getDir();
                pet.setDir(heroDir);
                this.mFollowerList[followType] = pet;
            }
            else {
                pet.loadModel(modelId);
                pet.changeAction("idle");
            }
            if (!this.isVisible()) {
                pet.setVisible(false);
            }
        }
        else {
            if (this.mFollowerList[followType]) {
                this.mFollowerList[followType].deleteObj();
                this.mFollowerList[followType] = null;
            }
        }
    };
    Player.prototype.clearFollower = function () {
        for (var _ in this.mFollowerList) {
            var followActor = this.mFollowerList[_];
            followActor.deleteObj();
        }
        this.mFollowerList = {};
    };
    Player.prototype.setFollowPet = function (modelId) {
        this.initFollowModel("pet", modelId);
    };
    Player.prototype.getFollowPet = function () {
        return this.mFollowerList["pet"];
    };
    Player.prototype.setFollowXianlv = function (modelId) {
        this.initFollowModel("xianlv", modelId);
    };
    Player.prototype.getFollowXianlv = function () {
        return this.mFollowerList["xianlv"];
    };
    Player.prototype.setFollowTianxian = function (modelId) {
        this.initFollowModel("tianxian", modelId);
    };
    Player.prototype.onMoveBegin = function (args) {
        _super.prototype.onMoveBegin.call(this, args);
        FireEvent(EventDefine.PLAYER_MOVE_BEGIN, ActorEvent.newObj(this));
    };
    Player.prototype.onMoveStop = function (args) {
        _super.prototype.onMoveStop.call(this, args);
        for (var fType in this.mFollowerList) {
            var followActor = this.mFollowerList[fType];
            var followInfo = getPetFollowInfo(fType);
            if (followInfo.stopAdjust == true) {
                var heroDir = this.getDir();
                //followActor.onPlayerStop(this)
                var dirOffsetMap = (_a = {},
                    _a[3] = [-followInfo.defaultOffx, followInfo.defaultOffy],
                    _a[4] = [-followInfo.defaultOffx, followInfo.defaultOffy],
                    _a[5] = [-followInfo.defaultOffx, followInfo.defaultOffy],
                    _a[7] = [followInfo.defaultOffx, followInfo.defaultOffy],
                    _a[0] = [followInfo.defaultOffx, followInfo.defaultOffy],
                    _a[1] = [followInfo.defaultOffx, followInfo.defaultOffy],
                    _a[6] = [0, followInfo.defaultOffy],
                    _a[2] = [0, followInfo.defaultOffy],
                    _a);
                //TLog.Error(heroDir)
                var cellX = this.getCellX();
                var cellY = this.getCellY();
                var speed = this.getMoveSpeed();
                var dirOffset = dirOffsetMap[heroDir] || [0, 0];
                followActor.setMoveSpeed(1.2 * speed);
                followActor.wantToGoByCell(cellX + dirOffset[0], cellY + dirOffset[1], true);
            }
        }
        FireEvent(EventDefine.PLAYER_MOVE_STOP, ActorEvent.newObj(this));
        var _a;
    };
    Player.prototype.onMoving = function (args) {
        //宠物跟随
        for (var fType in this.mFollowerList) {
            var followActor = this.mFollowerList[fType];
            var followInfo = getPetFollowInfo(fType);
            var followCellX = followActor.getCellX();
            var followCellY = followActor.getCellY();
            var heroCellX = this.getCellX();
            var heroCellY = this.getCellY();
            //无效步数
            if ((Math.abs(followCellX - heroCellX) <= followInfo.allowX) && (Math.abs(followCellY - heroCellY) <= followInfo.allowY)) {
                return;
            }
            //if(followActor.isMoving() ){
            //	return
            //}
            var heroDir = this.getDir();
            var dirOffsetMap = (_a = {},
                _a[3] = [-followInfo.defaultOffx, followInfo.defaultOffy],
                _a[4] = [-followInfo.defaultOffx, followInfo.defaultOffy],
                _a[5] = [-followInfo.defaultOffx, followInfo.defaultOffy],
                _a[7] = [followInfo.defaultOffx, followInfo.defaultOffy],
                _a[0] = [followInfo.defaultOffx, followInfo.defaultOffy],
                _a[1] = [followInfo.defaultOffx, followInfo.defaultOffy],
                _a[6] = [0, followInfo.defaultOffy],
                _a[2] = [0, followInfo.defaultOffy],
                _a);
            var speed = this.getMoveSpeed();
            var dirOffset = dirOffsetMap[heroDir] || [0, 0];
            followActor.setMoveSpeed(1.2 * speed);
            followActor.wantToGoByCell(heroCellX + dirOffset[0], heroCellY + dirOffset[1], true);
            //this.mFollowerList.setGoalCellXY(wantCellX,wantCellY,true)
            //TLog.Error("now turn to go %d  ,  %d",wantCellX,wantCellY) 
        }
        FireEvent(EventDefine.PLAYER_MOVE, ActorEvent.newObj(this));
        var _a;
    };
    Player.prototype.hasStatus = function (v) {
        if (this.propertyInfo == null) {
            return false;
        }
        return bit.band(this.propertyInfo.status, v) == v;
    };
    Player.prototype.onPropertyChange = function () {
        this.id = this.propertyInfo.id;
        var count = 0;
        for (var _ in opStatusType) {
            var v = opStatusType[_];
            if (this.propertyInfo.status && bit.band(this.propertyInfo.status, v) == v) {
                count = count + 1;
            }
        }
        //TLog.Debug("Player.onPropertyChange")
        //TLog.Debug_r(this.propertyInfo)
        //设置军团信息
        var factionStr = "";
        var heroInfo = GetHeroPropertyInfo();
        if (this.propertyInfo["faction"] && this.propertyInfo["factionName"] && this.propertyInfo["factionPos"] && this.propertyInfo["faction"] > 0) {
            var posName = ClubSystem.getInstance().getPosName(this.propertyInfo["factionPos"]);
            if (!posName) {
                posName = "";
            }
            var fontName = "#darksalmon";
            //darkorange
            if (heroInfo && this.propertyInfo["faction"] == heroInfo["faction"]) {
                fontName = "#darkorange";
            }
            //if(ClubSystem.getInstance().GetIsInMyUnion(this.propertyInfo["faction"]) ){
            //	fontName = "#lime"
            //}
            var factionName = this.propertyInfo["factionName"];
            factionStr = fontName + String.format("[%s]%s", posName, factionName);
        }
        this.doCommand(ActorCommand.SetFactionName, factionStr);
        if (this.propertyInfo.status && count >= 1) {
            this.doCommand(ActorCommand.SetMoreIcon, true, this.propertyInfo);
        }
        else {
            this.doCommand(ActorCommand.SetMoreIcon, false, this.propertyInfo);
        }
    };
    Player.prototype.clearTraceEffect = function () {
        for (var _ in this.traceEffectList) {
            var v = this.traceEffectList[_];
            v.deleteObj();
        }
        this.traceEffectList = [];
        this.curDir = this.getDir();
    };
    Player.prototype.handleAnimNotify = function (notify, effect) {
        if (notify == "end") {
            table_remove(this.traceEffectList, effect);
        }
    };
    Player.prototype.onStateChange = function (oldState, curState) {
        //TLog.Warn("Character.onStateChange old:%s, cur:%s", tostring(oldState), tostring(curState))
        var bHandle = _super.prototype.onStateChange.call(this, oldState, curState);
        if (this.stateMrg.isActionState(curState)) {
            if (curState == characterState.actionState_move) {
                if (this.wingEffect) {
                    this.wingEffect.setVisibleRaw(true);
                    this.wingEffect.changeAction("run");
                }
            }
            else if (curState == characterState.actionState_idle) {
                if (this.wingEffect) {
                    this.wingEffect.setVisibleRaw(true);
                    this.wingEffect.changeAction("idle");
                }
            }
            else {
                if (this.wingEffect) {
                    this.wingEffect.setVisibleRaw(false);
                }
            }
        }
        return bHandle;
    };
    Player.prototype.loadModel = function (modelId) {
        var wingid = this.wingid;
        var rideid = this.rideid;
        var rideOffsetY = this.rideOffsetY;
        //let maskid = this.maskid
        var leftWeaponId = this.leftWeaponId;
        //let rightWeaponId = this.rightWeaponId
        this.deleteWing();
        //this.deleteMask()
        this.deleteRide();
        this.deleteWeapon();
        this.wingid = -1;
        this.rideid = -1;
        //this.maskid = -1
        this.leftWeaponId = -1;
        //this.rightWeaponId = -1
        _super.prototype.loadModel.call(this, modelId);
        this.setWing(wingid);
        //this.setMask(maskid)
        this.setRide(rideid, rideOffsetY);
        this.setWeaponId(leftWeaponId);
    };
    Player.prototype.clearModelEffect = function () {
        this.deleteWing();
        //this.deleteMask()
        this.deleteRide();
        this.deleteWeapon();
        this.wingid = -1;
        this.rideid = -1;
        //this.maskid = -1
        this.leftWeaponId = -1;
        // this.rightWeaponId = -1
    };
    Player.prototype.setWing = function (wingid) {
        wingid = wingid || 0;
        if (this.wingid == wingid) {
            return;
        }
        this.deleteWing();
        this.wingid = -1;
        if (wingid <= 0) {
            return;
        }
        this.wingid = wingid;
        //if (this.rideid < 0) {
        var boneParam = {};
        boneParam.name = "wing_point";
        boneParam.order = 0;
        boneParam.transfrom = true;
        //修改plist配置尺寸，翅膀降低高度
        this.wingEffect = EffectManager.getInstance().createBindEffect(wingid, this, boneParam, true);
        // if (this.stateMrg.isState(characterState.actionState_idle)) {
        //     this.wingEffect.changeAction("idle")
        // } else if (this.stateMrg.isState(characterState.actionState_move)) {
        //     this.wingEffect.changeAction("run")
        // }
        // this.wingEffect.setPositionXY(0, 10)
        //}
    };
    Player.prototype.deleteWing = function () {
        if (this.wingEffect) {
            this.wingEffect.deleteObj();
            this.wingEffect = null;
            this.updateBoundRect();
        }
        // if (this.deleyWingTimerId) {
        //     KillTimer(this.deleyWingTimerId)
        //     this.deleyWingTimerId = null
        // }
    };
    Player.prototype.deleteRide = function () {
        if (this.rideEffect) {
            this.rideEffect.deleteObj();
            this.rideEffect = null;
            this.rideOffsetY = 0;
            this.setPositionOffset(0, 0);
        }
    };
    Player.prototype.setRide = function (rideid, offsety) {
        rideid = rideid || 0;
        if (this.rideid == rideid) {
            return;
        }
        this.deleteRide();
        this.rideid = -1;
        if (rideid <= 0) {
            return;
        }
        this.rideid = rideid;
        var boneParam = {};
        boneParam.name = "ride_point";
        boneParam.order = 0;
        boneParam.transfrom = true;
        this.rideEffect = EffectManager.getInstance().createBindEffect(rideid, this, boneParam, true);
        if (offsety != null) {
            this.rideOffsetY = offsety;
            this.setPositionOffset(0, offsety);
        }
    };
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
    Player.prototype.setNetMoveEnable = function (bEnable) {
        this.bNetMoveEnable = bEnable;
    };
    Player.prototype.isNetMoveEnable = function (bEnable) {
        return this.bNetMoveEnable;
    };
    Player.prototype.setMoveTargetPos = function (pos) {
        this.moveTargetPos = pos;
    };
    Player.prototype.getMoveTargetPos = function () {
        return this.moveTargetPos;
    };
    Player.prototype.setWeaponId = function (leftWeaponId) {
        leftWeaponId = leftWeaponId || 0;
        //rightWeaponId = rightWeaponId || 0
        //if (this.leftWeaponId == leftWeaponId && this.rightWeaponId == rightWeaponId) {
        if (this.leftWeaponId == leftWeaponId) {
            return;
        }
        this.deleteWeapon();
        this.leftWeaponId = -1;
        //this.rightWeaponId = -1
        if (leftWeaponId > 0) {
            this.leftWeaponId = leftWeaponId;
            //if (this.rideid < 0) {
            var boneParam = {};
            boneParam.name = "leftweapon";
            boneParam.order = 0;
            boneParam.transfrom = true;
            //10000 showid不存在，则取defaultid-1
            //this.changePartShow("leftweapon", 10000, -1)
            this.leftWeaponEffect = EffectManager.getInstance().createBindEffect(leftWeaponId, this, boneParam, true);
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
    };
    Player.prototype.deleteWeapon = function () {
        var bUpdate = false;
        if (this.leftWeaponEffect) {
            this.leftWeaponEffect.deleteObj();
            this.leftWeaponEffect = null;
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
            this.updateBoundRect();
        }
    };
    return Player;
}(Character));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map