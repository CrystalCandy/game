/*
作者:
    liuziming

创建时间：
    2014.08.21(星期四)

意图：
  主要处理战斗中部下的buff

公共接口：

*/
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
var colorList = [
    [255, 255, 255],
    [208, 0, 0],
    [168, 0, 0],
    [128, 0, 0],
];
var buffOrder = 0;
var BuffSystem = (function (_super) {
    __extends(BuffSystem, _super);
    function BuffSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BuffSystem.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        RegisterEvent(EventDefine.COMBAT_FIGHT_WIN, this.onFightFinish, this);
        RegisterEvent(EventDefine.COMBAT_FIGHT_LOST, this.onFightFinish, this);
        RegisterEvent(EventDefine.COMBAT_FIGHTER_BUFF_UPDATE, this.updateActorEffect, this);
        //this.onClear()
        this.buffList = {};
        //活动buff
        this.actBuffList = {};
    };
    BuffSystem.prototype.destory = function () {
        this.onClear();
    };
    BuffSystem.prototype.prepareResource = function (workQueue) {
        GameConfig.initBuffSystemCsv(workQueue);
    };
    BuffSystem.prototype.onClear = function () {
        //this.buffList = {}
        this.actBuffList = {};
        buffOrder = 0;
        this.onFightFinish();
    };
    ////////////////////////////////////////////////////////////-
    BuffSystem.prototype.getBuffTemplateInfo = function (buffId) {
        return GameConfig.BuffConfig[buffId];
    };
    BuffSystem.prototype.getBuffOrder = function (buff) {
        buffOrder = buffOrder + 1;
        return buffOrder;
    };
    BuffSystem.prototype.addBuff = function (actorId, buff, createEffect) {
        if (!GetFightActor(actorId)) {
            TLog.Warn("BuffSystem.addBuff the actor %d is ! exsit!", actorId);
            return;
        }
        var actor = GetFightActor(actorId);
        this.buffList[actorId] = this.buffList[actorId] || {};
        var buffEntryId = buff.getEntryId();
        //if(this.buffList[actorId][buffEntryId] ){
        //	TLog.Warn("BuffSystem.addBuff the buff %d in actor %d is exsit!", buffEntryId, actorId)
        //}
        //同一角色身上可以有多个entryId相同buff
        this.buffList[actorId][buffEntryId] = this.buffList[actorId][buffEntryId] || [];
        var flag = false;
        for (var _ in this.buffList[actorId][buffEntryId]) {
            var sBuff = this.buffList[actorId][buffEntryId][_];
            if (sBuff.powerInfo == buff.powerInfo) {
                flag = true;
                buff = sBuff;
                break;
            }
        }
        if (!flag) {
            JsUtil.arrayInstert(this.buffList[actorId][buffEntryId], buff);
            //TLog.Debug("444444444444444444444", actorId, buffEntryId)
        }
        if (createEffect) {
            this.addBuffEffect(actor, buff);
        }
        FireEvent(EventDefine.COMBAT_FIGHTER_BUFF_UPDATE, FighterBuffEvent.newObj(actorId));
    };
    BuffSystem.prototype.removeBuff = function (actorId, buffId) {
        if (!GetFightActor(actorId)) {
            TLog.Warn("BuffSystem.removeBuff the actor %d is ! exsit!", actorId);
            return;
        }
        var actor = GetFightActor(actorId);
        this.buffList[actorId] = this.buffList[actorId] || {};
        if (!this.buffList[actorId][buffId] || this.buffList[actorId][buffId].length == 0) {
            TLog.Warn("BuffSystem.removeBuff the buff %d in actor %d is ! exsit!", buffId, actorId);
            return;
        }
        //TLog.Debug("443333333333333334444444444444444444", actorId, buffId)
        var buff = JsUtil.arrayRemove(this.buffList[actorId][buffId], 0);
        this.removeBuffEffect(buff);
        FireEvent(EventDefine.COMBAT_FIGHTER_BUFF_UPDATE, FighterBuffEvent.newObj(actorId));
        buff.deleteObj();
    };
    BuffSystem.prototype.updateBuff = function (actorId, buff) {
        if (!GetFightActor(actorId)) {
            TLog.Warn("BuffSystem.updateBuff the actor %d is ! exsit!", actorId);
            return;
        }
        var buffId = buff.getEntryId();
        var actor = GetFightActor(actorId);
        this.buffList[actorId] = this.buffList[actorId] || [];
        if (!this.buffList[actorId][buffId]) {
            TLog.Warn("BuffSystem.updateBuff the buff %d in actor %d is ! exsit!", buffId, actorId);
            return;
        }
        var oldBuff = JsUtil.arrayRemove(this.buffList[actorId][buffId], 0);
        //特效前后一致，没必要重复创建
        //this.updateBuffEffect(actor, oldBuff, buff)
        JsUtil.arrayInstert(this.buffList[actorId][buffId], buff);
        FireEvent(EventDefine.COMBAT_FIGHTER_BUFF_UPDATE, FighterBuffEvent.newObj(actorId));
        oldBuff.deleteObj();
    };
    BuffSystem.prototype.showBuffEffect = function (actorId, buffId, powerAddress) {
        var actor = GetFightActor(actorId);
        if (!actor) {
            TLog.Warn("BuffSystem.showBuffEffect the actor %d is ! exsit!", actorId);
            return;
        }
        var buff = null;
        if (this.buffList[actorId]) {
            if (this.buffList[actorId][buffId]) {
                for (var _ in this.buffList[actorId][buffId]) {
                    var v = this.buffList[actorId][buffId][_];
                    if (v.powerAddress == powerAddress) {
                        buff = v;
                        break;
                    }
                }
            }
        }
        if (buff) {
            this.addBuffEffect(actor, buff);
        }
    };
    BuffSystem.prototype.getActorBuffList = function (actorId) {
        return this.buffList[actorId] || null;
    };
    BuffSystem.prototype.updateOutDateBuff = function (buff) {
        var actorId = null;
        for (var id in this.buffList) {
            var list = this.buffList[id];
            for (var buffId in list) {
                var v = list[buffId];
                if (table_remove(list, buff) && buff.getEntry() == buffId) {
                    actorId = id;
                    break;
                }
            }
        }
        if (actorId) {
            this.removeBuffEffect(buff);
            FireEvent(EventDefine.COMBAT_FIGHTER_BUFF_UPDATE, FighterBuffEvent.newObj(actorId));
            buff.deleteObj();
            //this.removeBuff(actorId, buff.getEntry())
        }
    };
    BuffSystem.prototype.updateActorEffect = function (args) {
        var list = this.buffList[args.actorId] || {};
        var lastEffect = {};
        var lastOrder = 0;
        for (var buffId in list) {
            var buffList = list[buffId];
            for (var k = buffList.length - 1; k >= 0; k--) {
                var buff = buffList[k];
                var effectList_1 = buff.getEffectList();
                for (var i = effectList_1.length - 1; i >= 0; i--) {
                    var effect = effectList_1[i];
                    var _a = buff.checkBuffEffect("rebound"), flag = _a[0], param = _a[1];
                    if (flag == false) {
                        if (!lastEffect[effect.getBindBone()]) {
                            var t = {};
                            t[0] = effect;
                            t[1] = 1;
                            t[2] = buff.getBuffOrder();
                            lastEffect[effect.getBindBone()] = t;
                        }
                        else {
                            var elem = lastEffect[effect.getBindBone()];
                            if (elem[0].getBindBone() == effect.getBindBone()) {
                                if (elem[2] < buff.getBuffOrder()) {
                                    elem[0] = effect;
                                    elem[1] = 1;
                                    elem[2] = buff.getBuffOrder();
                                }
                                else if (elem[0].getEffectId() == effect.getEffectId()) {
                                    elem[1] = elem[1] + 1;
                                }
                            }
                        }
                    }
                    effect.setVisible(false);
                }
            }
        }
        for (var k in lastEffect) {
            var v = lastEffect[k];
            //同一绑定位置上根据特效的个数变化特效的颜色
            var effect = v[0];
            var count = v[1];
            var elem = colorList[count] || colorList[0];
            effect.setColor(elem[0], elem[1], elem[2]);
            effect.setVisible(true);
        }
    };
    ////////////////////// 通用函数，创建buff特效////////////////////////////-
    BuffSystem.prototype.addBuffEffect = function (actor, buff) {
        if (!buff.getRefProperty("effect") || buff.hasBuildEffect()) {
            return;
        }
        var scale = 0;
        if (actor.classname == "FightActor") {
            var config = GetFightActorConfig(actor)[0];
            if (config) {
                var scaleList = buff.getRefProperty("scaleList") || {};
                scale = scaleList[config.model] || 0;
            }
        }
        for (var i in buff.getRefProperty("effect")) {
            var v = buff.getRefProperty("effect")[i];
            var effect = EffectManager.getInstance().createBindEffect(v, actor);
            //effect.setDir(actor.getDir())
            if (scale != 0) {
                effect.setScale(scale);
            }
            if (actor.classname == "FightActor") {
                var effectRef = GameConfig.EffectConfig[v];
                if (effectRef) {
                    //编辑器以左边为准，右边的话要翻转
                    var _a = [checkNull(effectRef.offx, 0), checkNull(effectRef.offy, 0)], offsetx = _a[0], offsety = _a[1];
                    if (actor.getSide() != fightSide.FIGHT_LEFT) {
                        offsetx = -offsetx;
                        var bMirror = effect.getMirror();
                        bMirror = !bMirror;
                        effect.setMirror(bMirror);
                        effect.setDir(actor.getDir());
                    }
                    effect.setPositionXY(offsetx, offsety);
                }
            }
            //以buff实例作为caster
            effect.setCaster(buff);
            effect.setAutoBindDelete(false);
            buff.addEffect(effect);
        }
    };
    BuffSystem.prototype.removeBuffEffect = function (buff) {
        buff.clearEffectList();
    };
    BuffSystem.prototype.updateBuffEffect = function (actor, oldBuff, newBuff) {
        this.removeBuffEffect(oldBuff);
        this.addBuffEffect(actor, newBuff);
    };
    //////////////////////////////////////////////////////////////////////////-
    BuffSystem.prototype.onFightFinish = function () {
        for (var actorId in this.buffList) {
            var buffList = this.buffList[actorId];
            for (var buffId in buffList) {
                var v = buffList[buffId];
                for (var _ in v) {
                    var buff = v[_];
                    //let actor = GetFightActor(actorId)
                    //if(actor ){
                    this.removeBuffEffect(buff);
                    buff.deleteObj();
                    //}
                }
            }
        }
        this.buffList = {};
        buffOrder = 0;
    };
    BuffSystem.prototype.clearActorBuff = function (actorId) {
        var buffList = this.buffList[actorId] || {};
        for (var buffId in buffList) {
            var v = buffList[buffId];
            for (var _ in v) {
                var buff = v[_];
                this.removeBuffEffect(buff);
                buff.deleteObj();
            }
        }
        delete this.buffList[actorId];
    };
    BuffSystem.prototype.getActorBuffState = function (actorId, index) {
        var flag = false;
        var buffList = this.getActorBuffList(actorId);
        if (buffList) {
            for (var k in buffList) {
                var v = buffList[k];
                for (var _ in v) {
                    var buff = v[_];
                    var _a = buff.checkBuffEffect(index), ret = _a[0], _2 = _a[1];
                    flag = ret;
                    if (flag) {
                        break;
                    }
                }
                if (flag) {
                    break;
                }
            }
        }
        return flag;
    };
    BuffSystem.prototype.getBuffName = function (buffId) {
        if (!GameConfig.BuffConfig[buffId]) {
            return "";
        }
        return GameConfig.BuffConfig[buffId].name + "";
    };
    ////////活动buff//////////////////////////////-
    //加入新的活动buff
    BuffSystem.prototype.addActBuff = function (buffName, buffLeftTime, buffData) {
        var name = buffName;
        var dTime = buffLeftTime + GetServerTime();
        //actBuff结构			{buffName/名字, dTime/有效期}
        this.actBuffList[name] = [name, dTime, buffData];
    };
    BuffSystem.prototype.removeActBuff = function (buffName) {
        var name = buffName || "";
        delete this.actBuffList[name];
    };
    BuffSystem.prototype.getActBuffInfo = function (buffName) {
        return this.actBuffList[buffName];
    };
    return BuffSystem;
}(BaseSystem));
__reflect(BuffSystem.prototype, "BuffSystem");
//# sourceMappingURL=BuffSystem.js.map