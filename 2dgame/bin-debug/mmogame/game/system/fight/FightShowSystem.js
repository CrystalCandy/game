/*
    战斗表演系统，主管战斗表演，解析结果
*/
// let pairs = pairs
// let ipairs = ipairs
//let table_remove = table_remove
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
var g_TestDumpResult = false;
var s_fightResultId = 0;
var s_MaxFightEndTime = 3000; //收到战斗结束后，X毫秒后结束战斗
//注册result的id
function GetResultId() {
    s_fightResultId = s_fightResultId + 1;
    return s_fightResultId;
}
var FightShowSystem = (function (_super) {
    __extends(FightShowSystem, _super);
    function FightShowSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FightShowSystem.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.onClear();
    };
    //清除数据
    FightShowSystem.prototype.onClear = function () {
        if (this.actorShowResultMap != null) {
            for (var _ in this.actorShowResultMap) {
                var showResult = this.actorShowResultMap[_];
                showResult.deleteObj();
            }
        }
        this.actorShowResultMap = {};
        this.allResultQueue = {};
        this.nowRound = 0; //当前回合数
        this.maxRound = 0; //当前最大回合数
        this.lockResult = false; //表示是否已经进入当前回合
        this.resultQueue = [];
        this.nowTime = 0;
        this.beginShowTime = -1; //开始时间
        var c = this.showedResultCount;
        this.showedResultCount = {};
        this.serverDelayTime = 0;
        if (this.serverDelayTimer) {
            KillTimer(this.serverDelayTimer);
            this.serverDelayTimer = null;
        }
        this.mFightEndStartTime = -1;
        this.bFightEnding = false;
        this.bPauseSkillShow = false;
        this.bClientFightShow = false;
        //this.beginShow = false
        //this.nowShowTime = 0
        //this.startPauseSkillTime = 0
        //this.suspendDelay = 0
        //this.suppending = false
        s_fightResultId = 0;
        this.removeManualEffect();
    };
    //开始战斗
    FightShowSystem.prototype.onBeginFight = function () {
        //this.beginShow = false
    };
    FightShowSystem.prototype.setPauseSkillShow = function (bShow) {
        this.bPauseSkillShow = bShow;
    };
    FightShowSystem.prototype.setBeginShow = function () {
        //this.beginShow = true
    };
    //外部添加结果到待处理列表
    FightShowSystem.prototype.addResult = function (result) {
        //服务器必须保证，时间是递增的
        //if(this.resultQueue.length > 0 ){
        //	let r = this.resultQueue[this.resultQueue.length]
        //	TLog.Assert(r.time <= result.time)
        //}
        //原因不明，观察堆栈，确定范围
        TLog.Assert(result.caster != null);
        this.showedResultCount[result.caster] = checkNull(this.showedResultCount[result.caster], []);
        table_insert(this.showedResultCount[result.caster], result.spellId);
        this.transferResult(result);
        this.advanceResultPower(result);
        this.allResultQueue[result.round] = checkNull(this.allResultQueue[result.round], []);
        table_insert(this.allResultQueue[result.round], result);
        if (this.maxRound < result.round) {
            this.maxRound = result.round;
        }
        if (this.lockResult == true && this.nowRound == result.round) {
            table_insert(this.resultQueue, table_copy(result));
        }
        //        let index = this.resultQueue.length
        //        for (let i = index - 1; i >= 0; i--) {
        //            let r = this.resultQueue[i]
        //            if (r.time <= result.time) {
        //                break
        //            }
        //
        //            index = index - 1
        //        }
        //        JsUtil.arrayInstert(this.resultQueue, index, result)
        //
        //
        //        for (let i = index - 1; i >= 0; i--) {
        //            let r = this.resultQueue[i]
        //
        //            if (r.time < result.time) {
        //                break
        //            }
        //
        //            //从加入过程可以看出，只有最后面的一个可能为最新的手动技能
        //           if (r.time == result.time && r.caster == result.caster) {
        //               if (SkillSystem.getInstance().ismanualSkill(result.spellId) == false) {
        //                   if (SkillSystem.getInstance().ismanualSkill(r.spellId) == true) {
        //                       this.resultQueue[i] = result
        //                        this.resultQueue[index] = r
        //                    }
        //                }
        //
        //                break
        //            }
        //        }
        //
        //       //时间纠正
        //        this.correctNotTime(result.time)
    };
    FightShowSystem.prototype.insertResultWithCasterTime = function (result) {
        //可能是因为power造成的result，要插入到最前的队列里，以便于马上执行
        var index = -1;
        //for i, v in ipairs(this.resultQueue) do
        for (var i = 0; i < this.resultQueue.length; i++) {
            var v = this.resultQueue[i];
            if (v.caster == result.caster) {
                result.time = v.time;
                index = i;
                break;
            }
        }
        if (index == -1) {
            result.time = this.nowTime;
            index = 0;
        }
        JsUtil.arrayInstert(this.resultQueue, index, result);
    };
    FightShowSystem.prototype.createShowResult = function (result) {
        TLog.Assert(result.caster != null);
        var fightResult = FightResult.newObj();
        fightResult.begin(result);
        return fightResult;
    };
    FightShowSystem.prototype.getShowResult = function (actorId) {
        return this.actorShowResultMap[actorId];
    };
    //解析结果
    FightShowSystem.prototype.beginShowResult = function (result) {
        this.stopShowResult(result.caster);
        //TLog.Debug("FightShowSystem.beginShowResult result time is:%d, notTime:%d, resultCode:%d", result.time, this.nowTime, result.code)
        this.showSkillPaperboard(result);
        var fightResult = this.createShowResult(result);
        this.actorShowResultMap[result.caster] = fightResult;
    };
    FightShowSystem.prototype.isResultCanBegin = function (result) {
        //let showResult = this.actorShowResultMap[result.target || 0]
        //if(showResult && ! showResult.canResultBroken() ){		//开始表演动作的不可
        //return false
        //}else if(showResult && this.isActorAttacked(result.target) ){	//
        //return false
        //}else if(! showResult && this.isActorAttacked(result.caster) ){
        //return false
        //}
        return true;
    };
    //重置出招者的状态
    FightShowSystem.prototype.resetCasterState = function (combatId) {
        var actor = GetFightActor(combatId);
        if (actor) {
            actor.setKnockFlyContrl();
        }
    };
    //isActorAttacked( target){
    //	if(target == 0 ){
    //		return false
    //	}
    //	
    //	for(let _ in this.actorShowResultMap){
    //let showResult = this.actorShowResultMap[_]
    //
    //		if(showResult.result.target == target ){
    //			return true
    //		}
    //	}
    //	
    //	return false
    //}
    FightShowSystem.prototype.stopShowResult = function (casterId, restoreCater) {
        TLog.Assert(casterId);
        //let casterId = showResult.result.caster
        var showResult = this.actorShowResultMap[casterId];
        if (showResult) {
            //modify:yangguiming 应该都要flushpower
            //if(flushPower ){
            //	showResult.flushFinish()
            //}
            if (restoreCater) {
                showResult.inorgeRestoreCater(true);
            }
            showResult.deleteObj();
            delete this.actorShowResultMap[casterId];
        }
    };
    FightShowSystem.prototype.beginShowAction = function (result) {
        var showResult = this.actorShowResultMap[result.caster];
        if (showResult) {
            this.stopShowResult(result.caster, true);
        }
        var fightResult = this.createShowResult(result);
        if (showResult) {
            fightResult.copyCasterState(showResult);
        }
        fightResult.replayShowAction();
        this.actorShowResultMap[result.caster] = fightResult;
    };
    FightShowSystem.prototype.isreadyFinish = function () {
        return (size_t(this.actorShowResultMap) == 0 && this.resultQueue.length == 0 && this.nowRound >= this.maxRound);
    };
    //    checkResultTime(result) {
    //        return this.nowTime >= result.time
    //    }
    FightShowSystem.prototype.notifyEnd = function () {
        this.bFightEnding = true;
        this.mFightEndStartTime = GetCurMillSec();
    };
    /*   checkPlayerShowing(result) {
           let casterId = result.caster
           TLog.Assert(casterId != null)
   
           //检测是不是在表演
           let showResult = this.actorShowResultMap[casterId]
           if (showResult && !showResult.isSpellPrepare() && !showResult.isSpellInterval()
               && !showResult.isSpellIntervalHit()) {
   
               //TLog.Error("skill:%d [client showTime] larget than [server showTime] code:%d id:%d ", result.spellId,result.code,this.actorShowResultMap[casterId].id, this.actorShowResultMap[casterId].result.spellId || 0)
               //throw()
               return false
           }
   
           return true
       }
   
   
       checkResultDelay(delay) {
           if (this.resultQueue.length <= 0) {
               return
           }
   
           //容错处理
           //如果未处理的result时间比当前时间滞后超过MaxShowTime，则直接showPower
           var tempResultList = []
   
           for (var i = 0; i < this.resultQueue.length; i++) {
               var result = this.resultQueue[i]
               if (this.nowTime - result.time > MaxShowTime) {
   
                   //1.如果当前正在表演，就直接结束
                   var actorId = result.caster
                   var fightResult = this.actorShowResultMap[actorId]
                   if (fightResult) {
                       this.stopShowResult(actorId)
                   }
   
                   //2.直接表演result结果
                   this.showResultPower(result)
                   tempResultList.push(result);
               }
           }
   
           if (tempResultList.length > 0) {
               for (var i = 0; i < tempResultList.length; i++) {
                   var result = tempResultList[i]
                   JsUtil.arrayRemoveVal(this.resultQueue, result)
               }
           }
   
       }
   */
    FightShowSystem.prototype.checkResultBegin = function (delay) {
        if (this.resultQueue.length <= 0) {
            return;
        }
        //检测showResult能否开始
        var tempResultList = [];
        //暂时流程是一个接一个result表演
        if (size_t(this.actorShowResultMap) == 0) {
            var firstResult = JsUtil.arrayRemove(this.resultQueue, 0);
            while (firstResult) {
                table_insert(tempResultList, firstResult);
                if (firstResult.code == resultOptions.RCODE_POWER || firstResult.code == resultOptions.RCODE_ADD_MONSTER) {
                    firstResult = JsUtil.arrayRemove(this.resultQueue, 0);
                }
                else {
                    break;
                }
            }
        }
        if (tempResultList.length > 0) {
            for (var _ = 0; _ < tempResultList.length; _++) {
                var result = tempResultList[_];
                if (this.isResultCanBegin(result)) {
                    if (result.code == resultOptions.RCODE_POWER || result.code == resultOptions.RCODE_ADD_MONSTER) {
                        this.showResultPower(result);
                    }
                    else {
                        if (result.code == resultOptions.RCODE_SPELL_HIT) {
                            this.resetCasterState(result.caster);
                        }
                        this.beginShowResult(result);
                    }
                }
            }
        }
    };
    FightShowSystem.prototype.checkResultFinish = function (delay) {
        //检测showResult能否结束
        var nowTime = GetCurMillSec();
        var finishShowResultList = [];
        for (var k in this.actorShowResultMap) {
            var v = this.actorShowResultMap[k];
            //表演没有暂停
            if (v.isPause() == false && v.tick(delay)) {
                finishShowResultList.push(v);
            }
            else if (this.bFightEnding && (v.isSpellInterval() || v.isSpellPrepare() || v.isSpellIntervalHit())) {
                //如果战斗结束了，而且showresult是吟唱或者持续施法就马上停止了
                if (FightSystem.getInstance().isFightVideo() == false) {
                    finishShowResultList.push(v);
                }
            }
        }
        if (finishShowResultList.length > 0) {
            for (var i = 0; i < finishShowResultList.length; i++) {
                var v = finishShowResultList[i];
                this.stopShowResult(v.result.caster);
            }
        }
    };
    FightShowSystem.prototype.checkResultRound = function (delay) {
        if (this.lockResult == true) {
            if (size_t(this.resultQueue) == 0) {
                if (size_t(this.actorShowResultMap) == 0) {
                    this.lockResult = false;
                }
            }
        }
        if (this.lockResult == false) {
            if (this.nowRound < this.maxRound) {
                this.nowRound = this.nowRound + 1; //下一回合
                this.lockResult = true;
                this.resultQueue = table_copy(checkNull(this.allResultQueue[this.nowRound], []));
                FireEvent(EventDefine.COMBAT_FIGHT_ROUND_UPDATE, null);
            }
        }
    };
    FightShowSystem.prototype.showResultPower = function (result) {
        var fightResult = this.createShowResult(result);
        fightResult.flushPowerAction();
        fightResult.deleteObj();
        this.showedResultCount = this.showedResultCount + 1;
    };
    /*    checkResultQueue(delay) {
            if (this.resultQueue.length <= 0) {
                return
            }
    
            //倒序循环
            //吟唱或者持续施法，因为是可以被打断的，所以要保证别人的打断是后面执行。要结束所有未完成的包
            let tempResultList: any = {}
            for (var index = this.resultQueue.length - 1; index >= 0; index--) {
                let result = this.resultQueue[index]
                if (this.checkResultTime(result) && tempResultList[result.caster] == null) {
    
                    let tempList = []
                    if (result.code == resultOptions.RCODE_SPELL_PREPARE ||
                        result.code == resultOptions.RCODE_SPELL_INTERVAL ||
                        (this.ismanualSkill(result.spellId) &&
                            result.code == resultOptions.RCODE_SPELL_HIT)) {//开始吟唱或者持续施法
                        //if(this.isResultCanBegin(result) ){
                        //1.停止当前表演
                        //this.stopShowResult(result.caster, true)
                        //2.开始新的表演
                        this.resetCasterState(result.caster)
                        this.beginShowResult(result)
                        JsUtil.arrayInstert(tempList, result)
                        //}
    
                        //把之前的action执行一次就删了
                        for (var i = 0; i < index; i++) {
                            let r = this.resultQueue[i]
                            if (r.caster == result.caster) {
                                this.showResultPower(r)
                                JsUtil.arrayInstert(tempList, r)
                            }
                        }
                        tempResultList[result.caster] = tempList
                    }
                }
            }
    
            for (let casterId in tempResultList) {
                let resultList = tempResultList[casterId]
    
                for (let i = 0; i < resultList.length; i++) {
                    let result = resultList[i]
    
                    table_remove(this.resultQueue, result)
                }
            }
    
            let tempResultList2 = [];
            //正序循环
            for (let index = 0; index < this.resultQueue.length; index++) {
                let result = this.resultQueue[index]
                if (this.checkResultTime(result)) {
    
                    if (result.code == resultOptions.RCODE_POWER || result.code == resultOptions.RCODE_ADD_MONSTER) {
                        //如果显示power的，直接显示
                        this.showResultPower(result)
                        JsUtil.arrayInstert(tempResultList2, result)
                    } else if (result.code == resultOptions.RCODE_SPELL_PREPARE_HIT) {	//吟唱结束
                        let bShowPower = true
                        let showResult = this.actorShowResultMap[result.caster]
                        if (showResult) {
                            //如果是在吟唱，就开始攻击
                            if (showResult.isSpellPrepare()) {
                                //if(this.isResultCanBegin(result) ){
                                //this.stopShowResult(result.caster)
                                this.beginShowResult(result)
                                //}
    
                                bShowPower = false
                            }
                        }
                        if (bShowPower) {
                            TLog.Error("checkResultQueue casterid:%d RCODE_SPELL_PREPARE_HIT", result.caster)
                            this.showResultPower(result)//找不到人？直接显示power
                        }
                        JsUtil.arrayInstert(tempResultList2, result)
    
                    } else if (result.code == resultOptions.RCODE_SPELL_INTERVAL_HIT) {//技能持续施法
                        this.beginShowAction(result)
                        JsUtil.arrayInstert(tempResultList2, result)
    
                    } else if (result.code == resultOptions.RCODE_SPELL_INTERVAL_END) { //持续施法结束
                        //如果当前是持续施法
    
                        //服务器一起发RCODE_SPELL_INTERVAL_HIT， RCODE_SPELL_INTERVAL_END，所以这里是让showResult能结束出手阶段表演
                        let showResult = this.actorShowResultMap[result.caster]
                        if (showResult && showResult.isSpellIntervalHit()) {
                            showResult.setSpellIntervalHitShowLast(true)
                        }
    
                        //let showResult = this.actorShowResultMap[result.caster]
                        //if(showResult && showResult.isSpellIntervalHit() ){
                        //	//this.stopShowResult(result.caster)
                        //	showResult.changeNextShowState()
                        //}else{
                        //	//TLog.Error("checkResultQueue casterid:%d RCODE_SPELL_INTERVAL_END ShowResult:%s", result.caster, tostring(showResult))
                        //}
                        this.showSkillBubbleWord(result)
    
                        JsUtil.arrayInstert(tempResultList2, result)
                    }
    
                }
    
            }
    
    
            if (tempResultList2.length > 0) {
                for (let i = 0; i < tempResultList2.length; i++) {
                    let result = tempResultList2[i]
    
                    table_remove(this.resultQueue, result)
                }
            }
    
        }
    
        checkResultBuff(delay) {
            //被动技能的buff可能因为code=2的缘故造成buff不正常出现或者清除异常
            //因此将buff的执行优先级提到最高
            for (let i = 0; i < this.resultQueue.length; i++) {
                let result = this.resultQueue[i]
                //TLog.Debug(this.nowTime, result.time, this.resultQueue.length, "code:", result.code)
                if (this.checkResultTime(result)) {
                    for (let _ = 0; _ < result.fightPowers.length; _++) {
                        let powerInfo = result.fightPowers[_]
    
                        if (GetFightActor(powerInfo.target)) {
                            if (powerInfo.effect == powerEffects.EFFECT_ADD_BUFF && !powerInfo.ahead) {
                                let buff = Buff.newObj(powerInfo.buff, powerInfo.life, powerInfo.count, powerInfo)
                                BuffSystem.getInstance().addBuff(powerInfo.target, buff, true)
    
                                powerInfo.ahead = true			//标识已经提前处理
                            }
                        }
                    }
                }
            }
        }
    */
    //定时器
    FightShowSystem.prototype.tick = function (delay) {
        //if(this.beginShow ){
        //	this.nowShowTime = this.nowShowTime + delay
        //}
        //暂停技能
        //因为客户端配置的时间nowTime是固定的，所以不能继续tick
        //如果是联网的，服务器在暂停时候nowTime还是继续走，所以不用作处理
        //if(this.bPauseSkillShow ){
        //	//现在第一次战斗，result的开始时间应该配错了
        //	//if(this.bClientFightShow ){
        //	//	this.checkResultFinish(delay)
        //	//	return
        //	//}
        //}
        //网络延迟处理
        if (GAME_MODE != GAME_TOOL) {
            if (this.isreadyFinish()) {
                if (!this.serverDelayTimer &&
                    !FightSystem.getInstance().isFightEnding() &&
                    FightSystem.getInstance().isShowingFight()) {
                    this.serverDelayTime = this.serverDelayTime + delay;
                    if (this.serverDelayTime > 3000) {
                        if (this.serverDelayTimer) {
                            KillTimer(this.serverDelayTimer);
                            this.serverDelayTimer = null;
                        }
                        this.serverDelayTimer = SetTimer(this.serverDelayTick, this, 500);
                    }
                }
            }
            else {
                this.serverDelayTime = 0;
                if (this.serverDelayTimer) {
                    KillTimer(this.serverDelayTimer);
                    this.serverDelayTimer = null;
                    FireEvent(EventDefine.MSG_WAIT_END, null);
                }
            }
        }
        this.nowTime = this.nowTime + delay;
        this.checkResultRound(delay); //处理里表演回合
        //        this.checkResultBuff(delay)//buff的处理（新增+）具有最高优先级
        //        this.checkResultDelay(delay)//处理延时已久、目标为空（暂时指定为0）时的网络包
        //        this.checkResultQueue(delay)//处理吟唱、持续施法包，还有一些没有caster的result
        this.checkResultFinish(delay); //处理ShowResult的结束
        this.checkResultBegin(delay); //处理result包的开始
        if (g_TestDumpResult) {
            TLog.Debug("this.showSystem.getShowingCount()", size_t(this.actorShowResultMap));
            TLog.Debug("Queue_size(this.showSystem..resultQueue)", this.resultQueue.length);
            for (var i in this.actorShowResultMap) {
                var v = this.actorShowResultMap[i];
                v.dumpEvent();
            }
        }
    };
    FightShowSystem.prototype.serverDelayTick = function (delay) {
        if (this.serverDelayTime > 0 && FightSystem.getInstance().isFightEnding() == false) {
            //FireEvent(EventDefine.MSG_WAIT_BEGIN, ClientWaitEvent.createObj(false))
        }
        else {
            if (this.serverDelayTimer) {
                KillTimer(this.serverDelayTimer);
                this.serverDelayTimer = null;
            }
        }
    };
    //表演时间（战斗时间）的管理
    FightShowSystem.prototype.getCurFightTime = function () {
        var nowShowTime = (this.beginShowTime < 0) && 0 || this.nowTime;
        return [this.nowTime, nowShowTime];
    };
    //getCurFightShowTime(){
    //	return this.nowShowTime
    //}
    FightShowSystem.prototype.initFightRound = function (startRound, bReFight) {
        this.nowRound = startRound;
        if (bReFight) {
            this.beginShowTime = 0;
        }
        else {
            this.beginShowTime = this.nowTime;
        }
    };
    FightShowSystem.prototype.correctNotTime = function (rTime) {
        if (GAME_MODE == GAME_TOOL) {
            return;
        }
        if (FightSystem.getInstance().isFightVideo() == true || this.isClientFighting()) {
            return;
        }
        if (StateManager.getInstance().GetCurrentStateType() == state_type.COMBAT_STORY_STATE) {
            return;
        }
        var err = rTime - this.nowTime;
        if (err > 500 || err < -500) {
            this.nowTime = rTime;
        }
    };
    //initCurFightShowTime( startTime){
    //	if(this.beginShow ){
    //		return
    //	}
    //	
    //	this.nowShowTime = startTime
    //}
    //beginSuspend(){
    //	if(this.suspending ){
    //		return
    //	}
    //	
    //	this.suspending = true
    //	this.suspendDelay = 0
    //}
    //
    //endSuspend(){
    //	if(! this.suspending ){
    //		return
    //	}
    //	
    //	this.suspending = false
    //}
    FightShowSystem.prototype.showSkillPaperboard = function (result) {
        if (GAME_FRESH == true) {
            return;
        }
        if (result.code != resultOptions.RCODE_SPELL_HIT &&
            result.code != resultOptions.RCODE_SPELL_PREPARE &&
            result.code != resultOptions.RCODE_SPELL_INTERVAL) {
            TLog.Debug("FightShowSystem.showSkillPaperboard the code is %d, %d", result.code, resultOptions.RCODE_SPELL_PREPARE);
            return;
        }
        var skillId = result.spellId;
        var actor = GetFightActor(result.caster);
        if (!actor || actor.isDeadState()) {
            return;
        }
        var type_id = actor.getProperty("type_id");
        if (objectType.OBJECT_TYPE_PET == type_id || objectType.OBJECT_TYPE_PLAYER == type_id) {
            //绝招、奥义发招特效
            var flag = this.ismanualSkill(skillId);
            if (flag == true) {
                //let var effectType:any = {
                //											[1] : 90157,
                //											[2] : 90156,
                //									}
                //this.removeManualEffect()
                //let screenX, screenY = actor.getMapXY()//SceneManager.getInstance().mapXYtoScreenXY(actor.getMapXY())
                //this.manualEffect = EffectManager.getInstance().createScreenEffect(effectType[type], screenX - 320, 480 - screenY)
                //let var listener:any = {this_index : this, function_index : this.manualSkillAnimNotify}
                //this.manualEffect.addAnimListener(listener)
                //this.manualEffect.changeAction("Animation1", 1, false)
                //H5奥义绝技不显示
                //FireEvent(EventDefine.COMBAT_FIGHT_SHOW_SKILL, CombatFightSkillEvent.newObj(skillId, actor))
            } //
        }
        else if (type_id == objectType.OBJECT_TYPE_FUNNAL) {
            FireEvent(EventDefine.COMBAT_FIGHT_SHOW_SKILL, CombatFightSkillEvent.newObj(skillId, actor));
        }
    };
    FightShowSystem.prototype.ismanualSkill = function (spellId) {
        if (!spellId) {
            return false;
        }
        // return SkillSystem.getInstance().ismanualSkill(spellId)
        return false;
    };
    FightShowSystem.prototype.manualSkillAnimNotify = function (notify) {
        // if (notify == "end") {
        //     this.removeManualEffect()
        // }
    };
    FightShowSystem.prototype.removeManualEffect = function () {
        // if (this.manualEffect) {
        //     this.manualEffect.deleteObj()
        // }
        // this.manualEffect = null
    };
    FightShowSystem.prototype.forceEndFight = function () {
        var casterIdList = [];
        for (var _ in this.actorShowResultMap) {
            var showResult = this.actorShowResultMap[_];
            JsUtil.arrayInstert(casterIdList, showResult.result.caster);
        }
        for (var _ in casterIdList) {
            var casterId = casterIdList[_];
            this.stopShowResult(casterId);
        }
        this.resultQueue = [];
        this.nowRound = this.maxRound;
    };
    //为功能、处理流程相同的result.code转换为原有的code类型result，并按原来的流程处理
    FightShowSystem.prototype.transferResult = function (result) {
        if (result.code == resultOptions.RCODE_SPELL_SPIRIT_HIT) {
            result.sourceCode = result.code;
            result.code = resultOptions.RCODE_SPELL_HIT;
            //此处result.caster 为了协议的统一性，这里翅膀发招时casterId是其所属的主角的fightId，所以在这里要转成翅膀的实际id，也就是对应的roleId
            var fighter = GetFightActor(result.caster);
            if (fighter) {
                result.caster = fighter.getProperty("roleId");
            }
            if (FightSystem.getInstance().getSelfFightSide() == fightSide.FIGHT_LEFT) {
                //	result.caster = result.caster % 2 + 1
            }
            //result.caster 		= FIGHT_FUNNAL_ID[result.caster]
        }
    };
    FightShowSystem.prototype.advanceResultPower = function (result) {
        for (var _ = 0; _ < result.fightPowers.length; _++) {
            var powerInfo = result.fightPowers[_];
            if (powerInfo.effect == powerEffects.EFFECT_STATUS) {
                if (powerInfo.status == powerStatus.PSTATUS_TARGET_DIE) {
                    FightSystem.getInstance().onFighterDieing(powerInfo.target);
                    FireEvent(EventDefine.COMBAT_FIGHTER_DIEING, CombatFighterEvent.newObj(powerInfo.target));
                }
            }
        }
    };
    FightShowSystem.prototype.setClientFighting = function (b) {
        this.bClientFightShow = b;
    };
    FightShowSystem.prototype.isClientFighting = function () {
        return this.bClientFightShow;
    };
    FightShowSystem.prototype.showSkillBubbleWord = function (result, isIgnore) {
        var actor = GetFightActor(result.caster);
        if (!actor || actor.getProperty("type_id") != objectType.OBJECT_TYPE_MONSTER) {
            return;
        }
        //按出手次数以及按生命比例触发说话
        if (!isIgnore) {
            var wordList = SkillSystem.getInstance().getSkillBubbleWord(actor.getProperty("entry"), result.spellId) || {};
            actor.recordSpell(result.spellId);
            var word = "";
            var times = actor.getSkillSpellTimes(result.spellId);
            var list = wordList["times"] || [];
            for (var _ = 0; _ < list.length; _++) {
                var v = list[_];
                if (commonCmp(v[0], times) == true) {
                    word = v[1];
                    break;
                }
            }
            var _a = actor.getHP(), curHp = _a[0], totalHp = _a[1];
            list = wordList["hp"] || [];
            for (var _ = 0; _ < list.length; _++) {
                var v = list[_];
                if (commonCmp(v[0], curHp / totalHp) == true) {
                    word = v[1];
                    break;
                }
            }
            if (word != "") {
                actor.doCommand(ActorCommand.AddChatBubble, word, false, 4000);
            }
            else {
                actor.doCommand(ActorCommand.HideChatBubble, "", false);
            }
        }
        else {
            actor.doCommand(ActorCommand.HideChatBubble, "", false);
        }
    };
    FightShowSystem.prototype.isResultQueueEmpty = function () {
        return this.resultQueue.length < 1;
    };
    FightShowSystem.prototype.isActorSpelling = function (id) {
        var flag = false;
        for (var _ in this.resultQueue) {
            var result = this.resultQueue[_];
            if (result.spellId) {
                if (result.spellId == id) {
                    flag = true;
                    break;
                }
            }
        }
        if (this.actorShowResultMap[id] && this.actorShowResultMap[id].isFinish() == false) {
            flag = true;
        }
        return flag;
    };
    FightShowSystem.prototype.getCurFightRound = function () {
        return [this.nowRound, this.maxRound];
    };
    return FightShowSystem;
}(TClass));
__reflect(FightShowSystem.prototype, "FightShowSystem");
//# sourceMappingURL=FightShowSystem.js.map