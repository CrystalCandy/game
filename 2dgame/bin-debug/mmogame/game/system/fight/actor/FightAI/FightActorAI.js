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
var FightActorAI = (function (_super) {
    __extends(FightActorAI, _super);
    function FightActorAI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FightActorAI.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.isDefaultSeat = false;
    };
    FightActorAI.prototype.destory = function () {
    };
    /*	moveToNextPos() {
            let curResult = FightSystem.getInstance().getShowSystem().getShowResult(this.actor.getCombatId())
    
            if (curResult) {
                //this.actor.moveStop()
                return
            } else if (this.beginMove == false) {
                //this.adjustBodyDistance()
                return
            }
            let side = this.actor.getSide()
            let aPos = this.actor.getPos()
            let enemySide = side % 2 + 1
    
            let defaultTarget = this.actor.getDefaultTarget()
            //一般情况下必不为空
            if (defaultTarget) {
                this.curDefaultTarget = defaultTarget
            } else {
                this.actor.moveStop()
                this.curPosition = this.actor.getMapXY()
                return
            }
    
            let [config, scopeInfo] = GetFightActorConfig(this.actor)
            let [emConfig, emScopeInfo] = GetFightActorConfig(defaultTarget)
            if (config == null || emConfig == null) {
                return
            }
    
            var pos:any = this.actor.getCellXY()
            pos.attackScope = scopeInfo.AttackScope > emScopeInfo.BodyScope && scopeInfo.AttackScope || emScopeInfo.BodyScope
            pos.bodyScope = scopeInfo.BodyScope
    
            var emPos = defaultTarget.getFighterCurCellXY()
            emPos.attackScope = emScopeInfo.AttackScope
            emPos.bodyScope = emScopeInfo.BodyScope
    
            pos.attackScope = emPos.bodyScope > pos.attackScope && emPos.bodyScope || pos.attackScope
            //后排自动升级为远战
            if (aPos / FIGHT_COMBAT_ROW_COUNT > 1) {
                let flag = false
                let scope = 0
    
                let r = 0
                let frontActorPos = aPos
                for (let i = 3; i <= 1; i--) {
                    frontActorPos = frontActorPos - FIGHT_COMBAT_ROW_COUNT
                    if (frontActorPos <= 0) {
                        break
                    }
    
                    let index = Math.floor((frontActorPos - 1) / FIGHT_COMBAT_ROW_COUNT) * FIGHT_COMBAT_ROW_COUNT
                    let fightMod = 100
                    let isThere = false
                    for (let _i = 1; _i <= FIGHT_COMBAT_ROW_COUNT; _i++) {
                        let actor = GetFightActorByPos(side, index + _i)
    
                        if (actor && !actor.isDeadState() && fightMod > Math.abs((frontActorPos - index - _i) % FIGHT_COMBAT_ROW_COUNT)) {
                            let [config, scopeInfo] = GetFightActorConfig(actor)
                            scope = scopeInfo.AttackScope > scope && scopeInfo.AttackScope || scope
    
                            fightMod = Math.abs((frontActorPos - index - _i) % FIGHT_COMBAT_ROW_COUNT)
    
                            if (isThere == false) {
                                r = r + 1
                                isThere = true
                            }
    
                            flag = true
                        }
                    }
                }
    
                scope = scope + 8 * r
                if (flag == true) {
                    pos.attackScope = pos.attackScope > scope && pos.attackScope || scope
                }
            }
    
            //开始移动处理
            if (MathUtil.checkNormScope(pos.x, pos.y, emPos.x, emPos.y, pos.attackScope)) {
                this.actor.moveStop()
    
                this.beginMove = false
                //this.curPosition = {}
                if (side == fightSide.FIGHT_LEFT && pos.x - emPos.x > -1) {
                    this.curPosition = this.transferCell(emPos.x - pos.attackScope, emPos.y)
                } else if (side == fightSide.FIGHT_RIGHT && pos.x - emPos.x < 1) {
    
                    this.curPosition = this.transferCell(emPos.x + pos.attackScope, emPos.y)
                } else {
                    this.curPosition = this.actor.getMapXY()
                }
    
                //this.adjustBodyDistance()
                return
            }
    
            var x = emPos.x
            var y = emPos.y
            var sp = this.actor.getCellXY()
    
            var alph = Math.PI + Math.atan((y - sp.y) / (x - sp.x))//(side - 1) * math.pi + math.atan((y - sy) / (x - sx))
            //x = x + Math.cos(alph) * 2
            //y = y + Math.sin(alph) * 2
            x = x - Math.cos(alph) * 2
            y = y - Math.sin(alph) * 2
    
            //x = x + -2 * ((-1) ^ side)
            this.actor.wantToGoByCell(x, y, true)
        }
    */
    FightActorAI.prototype.onTick = function (delay) {
        if (!this.curDefaultTarget) {
            this.curDefaultTarget = this.actor.getDefaultTarget();
        }
        if (this.isDefaultSeat == true) {
            if (STAY_IN_DEFALUT_POSITION != true) {
                //				this.moveToNextPos()
            }
            if (this.actor.isIdleState()) {
                this.moveToDefaultSeat();
            }
        }
        else {
            this.moveToDefaultSeat();
        }
    };
    FightActorAI.prototype.moveToDefaultSeat = function () {
        var curResult = FightSystem.getInstance().getShowSystem().getShowResult(this.actor.getCombatId());
        if (curResult) {
            //			this.actor.moveStop()
            return;
        }
        var curPos = GetFightActorDefaultPosXY(this.actor.getSide(), this.actor.getPos());
        this.actor.setMapXY(curPos.x, curPos.y);
        this.isDefaultSeat == true;
        //		//当前位置
        //		let pos = SceneManager.getInstance().mapXYtoCellXY(this.curPosition.x, this.curPosition.y)
        //		var frompos = this.actor.getCellXY()
        //
        //		//如果在范围内，就不用动了
        //		if (MathUtil.checkNormScope(frompos.x, frompos.y, pos.x, pos.y, 1)) {
        //			if (this.isDefaultSeat == false) {
        //				this.setWaitSomeTime()
        //
        //				this.actor.completeBack = true
        //			}
        //
        //			if (this.isDefaultSeat == true && this.adjustBodyDistance() == false) {
        //				//this.actor.faceToActor(this.curDefaultTarget)
        //			}
        //
        //			return false
        //		}
        //
        //		//TLog.Debug("moveToNextPos", to_cellx, to_celly, this.actor.getMoveSpeed(), this.actor.getCombatId())
        //		//忽视阻挡移动，一定会成功的，除非x,y出错了
        //		if (this.actor.wantToGoByCell(pos.x, pos.y, true) == false) {
        //			TLog.Debug("ActorAI move Error:", frompos.x, frompos.y, pos.x, pos.y)
        //			//throw()
        //		}
    };
    return FightActorAI;
}(FightBaseAI));
__reflect(FightActorAI.prototype, "FightActorAI");
//# sourceMappingURL=FightActorAI.js.map