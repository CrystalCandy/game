//表演动作分了3个流程
//1.起手动作
//2.表演动作
//3.Power显示
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
//吟唱:
//1.吟唱开始：RCODE_SPELL_PREPARE，则开始起手动作，如果起手动作执行完毕，则循环起手动作
//2.吟唱结束：RCODE_SPELL_PREPARE_HIT,开始表演动作，表演动作完毕，则结束FightResult
//持续施法：
//1.持续施法开始：RCODE_SPELL_INTERVAL，则开始起手动作，表演动作。表演动作结束后，循环表演动作
//2.持续施法过程：RCODE_SPELL_INTERVAL_HIT， 跳过起手动作，直接出手（包括相应power效果）
//2.持续施法结束：RCODE_SPELL_INTERVAL_END， 直接结束FightResult
//begin(){
//finish(){
//
//replayreadyAction(){
//replayShowAction(){
//
//isSpellInterval(){
//isSpellPrepare(){
//isSpellPrepareHit(){
//
//dumpEvent( event){
// let pairs = pairs
// let ipairs = ipairs
var FightShowState = {
    ready: 1,
    Show: 2,
    End: 3,
};
var COMBAT_OBJECT_ID = 10000;
var FightResult = (function (_super) {
    __extends(FightResult, _super);
    function FightResult() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FightResult.prototype.initObj = function () {
        //s_fightResultId = s_fightResultId + 1
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.bFinish = false;
        this.bBegin = false;
        this.id = GetResultId(); //s_fightResultId
        this.nowTime = 0;
        this.action_list_ready = [];
        this.action_list_show = [];
        this.action_list_end = [];
        this.powerList = [];
        this.stateList = [];
        //recvEvent时候会导致堆栈很深，所以分帧优化处理
        //但是析构时候就不能分帧处理了
        this.bUseLockEvent = true;
        this.bLockEvent = false;
        this.lockEventList = [];
        this.lockEventDeep = 0;
        this.curCastTime = 0;
        //以准备动作完成为标识（攻击动作开始后）result表演
        //不可被其他result打断
        this.bStartFirstAction = false; //标志第一个起手动作
        this.actionObjectPool = {}; //对象池，用来管理特效、分身等
        this.actionObjectIdPool = {};
        this.idSeed = COMBAT_OBJECT_ID; //保证不和actor的ID范围冲突
        this.showState = -1;
        this.bSpellIntervalHitShowLast = false;
        this.doubleHitPowerList = [];
        this.speed = 1;
        this.result = null;
        this.inorgeRestore = false;
        this.mFightSystem = FightSystem.getInstance();
    };
    FightResult.prototype.destory = function () {
        //最后一次刷新，如果之前表演刷新过了，就不会重复刷
        this.flushPowerAction();
        this.restoreCasterState();
        this.setAllTargetBeingAttacked(false);
        this.finish(true); //this.bFinish = true
        //////////////////////////////////////////////////
        for (var i = 0; i < this.action_list_ready.length; i++) {
            var action = this.action_list_ready[i];
            action.deleteObj();
        }
        this.action_list_ready = [];
        for (var i = 0; i < this.action_list_show.length; i++) {
            var action = this.action_list_show[i];
            action.deleteObj();
        }
        this.action_list_show = [];
        for (var i = 0; i < this.action_list_end.length; i++) {
            var action = this.action_list_end[i];
            action.deleteObj();
        }
        this.action_list_end = [];
        //////////////////////////////////////////////////
        for (var i = 0; i < this.powerList.length; i++) {
            var power = this.powerList[i];
            power.deleteObj();
        }
        this.powerList = [];
        for (var i = 0; i < this.stateList.length; i++) {
            var state = this.stateList[i];
            state.deleteObj();
        }
        for (var _ in this.actionObjectPool) {
            var v = this.actionObjectPool[_];
            v.deleteObj();
        }
        this.actionObjectPool = null;
        this.actionObjectIdPool = null;
        this.stateList = [];
        FireEvent(EventDefine.COMBAT_FIGHT_RESULT_END, CombatResultEvent.newObj(this.result));
        // let actor = GetFightActor(this.result.caster)
        // if (actor) {
        // 	MsgSystem.addChannel(channelType.SYSTEM, "xxxxxx" + this.result.spellId + " " + this.result.code + " " + actor.getProperty("pos"))
        // }
        //调试显示打击技能总伤害值
        if (GAME_DEBUG && size_t(this.damageList) != 0) {
            //let strList: any = {}
            for (var _ in this.result.fightPowers) {
                var power = this.result.fightPowers[_];
                if (power.effect == powerEffects.EFFECT_HP_LESS) {
                    var actor = GetFightActor(this.result.caster);
                    if (actor) {
                        var side = actor.getSide(), pos = actor.getPos();
                        var emActor = GetFightActor(power.target);
                        if (emActor && emActor.isDeadState() == true) {
                            var eSide = emActor.getSide(), ePos = emActor.getPos();
                            var _a = this.mFightSystem.getCurFightType(), fightType = _a[0], campId = _a[1];
                            var _b = this.mFightSystem.getCurFightTime(), _1 = _b[0], time = _b[1];
                            //let maxTime = opFightLimitTime[fightType] || 230000
                            var maxTime = 230000;
                            time = maxTime - time;
                            if (time < 0) {
                                time = 0;
                            }
                            var timeStr = getFormatDiffTime(Math.floor(time / 1000));
                            var msgString = String.format(Localize_cns("DEMAGE_SCORSE_TIPS"), side, pos, this.result.spellId, eSide, ePos, power.point) + "  " + timeStr;
                            //MsgSystem.AddTagTips(msgString)
                            MsgSystem.addChannel(channelType.SYSTEM, msgString);
                        }
                    }
                }
            }
        }
    };
    //保存状态
    FightResult.prototype.saveCasterState = function (actor) {
        if (!actor) {
            actor = GetFightActor(this.result.caster);
            if (actor == null) {
                return;
            }
        }
        var mp = actor.getMapXY();
        this.casterMapX = mp.x;
        this.casterMapY = mp.y;
        this.casterScale = actor.getScale();
        this.casterRotate = actor.getRotate();
        var colorInfo = actor.getActorColor();
        this.casterAlpha = colorInfo.alpha;
    };
    //复制状态
    FightResult.prototype.copyCasterState = function (result) {
        this.casterMapX = result.casterMapX;
        this.casterMapY = result.casterMapY;
        this.casterScale = result.casterScale;
        this.casterRotate = result.casterRotate;
        this.casterAlpha = result.casterAlpha;
    };
    //设置是否恢复原来状态
    FightResult.prototype.inorgeRestoreCater = function (flag) {
        this.inorgeRestore = flag || false;
    };
    //恢复状态
    FightResult.prototype.restoreCasterState = function () {
        if (this.inorgeRestore) {
            return;
        }
        var actor = GetFightActor(this.result.caster);
        if (actor == null || !this.casterMapX) {
            return;
        }
        if (this.casterMapX == null || this.casterMapY == null) {
            return;
        }
        actor.setMapXY(this.casterMapX, this.casterMapY);
        actor.setScale(this.casterScale);
        actor.setRotate(this.casterRotate);
        //actor.setAlpha(this.casterAlpha)
        actor.setFlipXY(false, false);
        actor.clearFade();
        if (actor.getSide() == fightSide.FIGHT_LEFT) {
            actor.setDir(ActorDirMap.RightBottom);
        }
        else {
            actor.setDir(ActorDirMap.LeftUp);
        }
        actor.restoreFightAI();
    };
    FightResult.prototype.analyzeResult = function (result) {
        var srcConfig = this.mFightSystem.getConfigSystem().getConfig(result);
        var destConfig = table_copy(srcConfig); //复制配置表，避免程序改了配置表
        this.result = result;
        if (result.spellId) {
            this.speed = 1; //SkillSystem.getInstance().getSkillSpeed(result.spellId)
        }
        this.maxTime = destConfig.maxTime || MaxShowTime; //每个阶段的最大表演时间
        //action必须有caster存在
        if (GetFightActor(result.caster || 0)) {
            for (var i_1 = 0; i_1 < destConfig.elem_list_ready.length; i_1++) {
                var v_1 = destConfig.elem_list_ready[i_1];
                var action_1 = this.createAction(v_1);
                JsUtil.arrayInstert(this.action_list_ready, action_1);
            }
            for (var i_2 = 0; i_2 < destConfig.elem_list_show.length; i_2++) {
                var v_2 = destConfig.elem_list_show[i_2];
                var action_2 = this.createAction(v_2);
                JsUtil.arrayInstert(this.action_list_show, action_2);
            }
            for (var i = 0; i < destConfig.elem_list_end.length; i++) {
                var v = destConfig.elem_list_end[i];
                var action = this.createAction(v);
                this.action_list_end.push(action);
            }
        }
        //被打断文字提示放到最后（避免黑屏下看不到）
        //由于配表有可能在技能中表演了power（包含被打断），因此特别将之延后处理
        var flag = false;
        for (var _ in result.fightPowers) {
            var powerInfo = result.fightPowers[_];
            if (powerInfo.effect == powerEffects.EFFECT_BREAK) {
                powerInfo.times = powerInfo.times + 1;
                if (flag == false) {
                    flag = true;
                }
            }
        }
        if (flag == true) {
            result.castCount = result.castCount + 1;
        }
    };
    FightResult.prototype.setAllTargetBeingAttacked = function (b) {
        var caster = this.getActionObjectByName("caster")[0];
        var flag = false;
        var actor_list = this.getActionObjectByName("targetList");
        for (var _ = 0; _ < actor_list.length; _++) {
            var actor = actor_list[_];
            actor.setBeingAttacked(b);
            //			if (!flag && caster && actor.getSide() != caster.getSide()) {
            //				//caster.faceToActor(actor)
            //				var targetP = actor.getMapXY()
            //				var casterP = caster.getMapXY()
            //				if (targetP.x > casterP.x) {
            //					caster.setDir(ActorDirMap.Right)
            //				} else {
            //					caster.setDir(ActorDirMap.Left)
            //				}
            //
            //				flag = true
            //			}
        }
    };
    FightResult.prototype.analyzeDamage = function () {
        //根据目标的受击动作次数来决定掉血信息的显示次数
        //每次掉血的数值=总伤害/受击动作次数
        //为了表现更好一些，再将以上结果进行一次随机，但要保证总掉血量与服务器发过来的总伤害是相等的
        //如果总伤害量为0（例如闪避、无敌状态等），则只在响应事件那里播放对应的信息
        var damageCount = 0;
        var actorInjuryList = {};
        this.damageList = {};
        for (var _ = 0; _ < this.action_list_ready.length; _++) {
            var v = this.action_list_ready[_];
            if (v.actionConfig.content.code == "ATTACKED_PLAYANIM") {
                damageCount = damageCount + 1;
                this.tidyActorInjury(actorInjuryList, v.actionConfig.content.param1);
            }
        }
        for (var _ = 0; _ < this.action_list_show.length; _++) {
            var v = this.action_list_show[_];
            if (v.actionConfig.content.code == "ATTACKED_PLAYANIM") {
                damageCount = damageCount + 1;
                this.tidyActorInjury(actorInjuryList, v.actionConfig.content.param1);
            }
        }
        for (var _ = 0; _ < this.action_list_end.length; _++) {
            var v = this.action_list_end[_];
            if (v.actionConfig.content.code == "ATTACKED_PLAYANIM") {
                damageCount = damageCount + 1;
                this.tidyActorInjury(actorInjuryList, v.actionConfig.content.param1);
            }
        }
        var injuryList = {};
        var defendState = {};
        var targetFlag = {};
        for (var i = 0; i < this.result.powerCount; i++) {
            var powerInfo = this.result.fightPowers[i];
            if (powerInfo && actorInjuryList[powerInfo.target] != null) {
                if (powerInfo.effect == powerEffects.EFFECT_HP_LESS) {
                    injuryList[powerInfo.target] = injuryList[powerInfo.target] || 0;
                    injuryList[powerInfo.target] = injuryList[powerInfo.target] + powerInfo.point;
                    //记录对应tagetd的flag，暴击的优先级最高，因为是模拟数据，所以只能粗略表现
                    if (powerInfo.flag == powerXPFlag.CRITICAL) {
                        targetFlag[powerInfo.target] = powerInfo.flag;
                    }
                    else if (!targetFlag[powerInfo.target]) {
                        targetFlag[powerInfo.target] = powerInfo.flag;
                    }
                    powerInfo.flag = powerXPFlag.NOT_SHOW;
                }
                else if (defendState[powerInfo.target] == null) {
                    if (powerInfo.effect == powerEffects.EFFECT_ABSORB || powerInfo.effect == powerEffects.EFFECT_DODGE
                        || powerInfo.effect == powerEffects.EFFECT_IMMUNIZE) {
                        defendState[powerInfo.target] = powerInfo.effect;
                    }
                }
            }
        }
        //测试先取平均值
        var sumNumber = 0;
        for (var combatId in injuryList) {
            var sumDamage = injuryList[combatId];
            //遍历injuryList是为了确保以power为准
            var count = actorInjuryList[combatId];
            //let point = Math.floor(sumDamage / count)
            var list = MathUtil.getRandomArray(count, sumDamage, 0.5);
            sumNumber = sumNumber + sumDamage;
            for (var i = 0; i < count; i++) {
                //if(i < count ){
                //	sum = sum + point
                //}else{
                //	point = sumDamage - sum		//保证数值不会出现误差
                //}
                var point = list[i];
                var p = {};
                p.effect = powerEffects.EFFECT_HP_LESS;
                p.target = combatId;
                p.point = point;
                p.flag = targetFlag[combatId] || powerXPFlag.NORMAL;
                p.times = 1;
                this.damageList[combatId] = this.damageList[combatId] || [];
                JsUtil.arrayInstert(this.damageList[combatId], p);
                JsUtil.arrayInstert(this.doubleHitPowerList, p);
            }
        }
        this.doubleHitPowerList["sumDamage"] = sumNumber;
        //检漏
        for (var combatId in defendState) {
            var effect = defendState[combatId];
            if (injuryList[combatId] == null || injuryList[combatId] == 0) {
                var count = actorInjuryList[combatId];
                for (var i = 0; i < count; i++) {
                    var p = {};
                    p.effect = effect;
                    p.target = combatId;
                    p.flag = targetFlag[combatId] || powerXPFlag.NORMAL;
                    p.times = 1;
                    this.damageList[combatId] = this.damageList[combatId] || [];
                    JsUtil.arrayInstert(this.damageList[combatId], p);
                }
            }
        }
    };
    FightResult.prototype.tidyActorInjury = function (list, targetName) {
        targetName = targetName || "targetList";
        var targetNameList = splitString(targetName, ",");
        var actorList = [];
        for (var _ in targetNameList) {
            var name_1 = targetNameList[_];
            var t = this.getActionObjectByName(name_1);
            table_merge(actorList, t);
        }
        for (var _ in actorList) {
            var actor = actorList[_];
            var combatId = actor.getCombatId();
            list[combatId] = list[combatId] || 0;
            list[combatId] = list[combatId] + 1;
        }
    };
    FightResult.prototype.getDamagePowerList = function (combatId) {
        if (!this.damageList || !this.damageList[combatId]) {
            return [];
        }
        var p = this.damageList[combatId].shift();
        var t = (p == null) && [] || [p];
        return t;
    };
    FightResult.prototype.begin = function (result, straight) {
        if (!straight) {
            var flag = false;
            var actor = GetFightActor(result.caster);
            if (actor && table_isExsit(FIGHT_ACOTCONTROL_MAPPING, actor.getProperty("type_id"))) {
                flag = actor.delayBeginResult(this, result);
                //this.mFightSystem.addFighterList({GreateBackerInfo(2, 18000, this, result)})
            }
            this.analyzeResult(result);
            this.analyzeDamage();
            //一般buff的持续时间比较短，而客户端表演有延时，以防
            //buff的持续时间过短，造成删除buff的result比创建的（power部分）要早
            //造成buff特效（客户端）一直没有被清除，在result开始的时候即创建buff，（暂行方案先创建特效，忽略后面注释）但不创建特效
            //到power表演的时候再创建buff对应的特效
            // this.handleBuffAhead()
            if (flag == true) {
                return;
            }
        }
        return this._begin(result);
    };
    //从头开始执行（内部用）
    FightResult.prototype._begin = function (result) {
        //this.analyzeResult(result)
        //this.analyzeDamage()
        if (this.bBegin == true) {
            return;
        }
        this.bBegin = true;
        var showState = -1;
        var justPower = false;
        if (this.isSpellPrepareHit()) {
            showState = FightShowState.Show;
        }
        else if (this.isRcodePower()) {
            this.flushPowerAction();
            justPower = true;
        }
        else {
            showState = FightShowState.ready;
        }
        if (justPower == false) {
            var actor = GetFightActor(result.caster);
            if (actor) {
                actor.moveStop();
            }
            else {
                showState = FightShowState.End;
            }
        }
        if (showState > 0) {
            this.changeShowState(showState);
        }
        //显示吟唱中字体
        if (this.isSpellPrepare()) {
            this.showSpellPre(true);
            //吟唱开始时头顶冒泡
            var fightShowSystem = this.mFightSystem.getShowSystem();
            fightShowSystem.showSkillBubbleWord(this.result);
        }
        else if (this.isSpellInterval()) {
            //持续施法开始时头顶冒泡
            var fightShowSystem = this.mFightSystem.getShowSystem();
            fightShowSystem.showSkillBubbleWord(this.result);
        }
        else if (this.isSpellHit()) {
            var fightShowSystem = this.mFightSystem.getShowSystem();
            fightShowSystem.showSkillBubbleWord(this.result);
        }
        else if (this.isRcodePower() == false) {
            //清除技能描述
            var fightShowSystem = this.mFightSystem.getShowSystem();
            fightShowSystem.showSkillBubbleWord(this.result, true);
        }
        if (GAME_DEBUG) {
            if (this.isRcodePower() == false) {
                if (!GetFightActor(result.caster)) {
                    TLog.Error("FightResult.begin the result's caster is empty! %s", result.caster);
                    table_print(result);
                    //io.read()
                }
            }
        }
        this.saveCasterState();
        this.setAllTargetBeingAttacked(true);
    };
    FightResult.prototype.changeShowState = function (state) {
        this.showState = state;
        this.cur_action_list = []; //null
        if (this.showState == FightShowState.ready) {
            //TLog.Debug("changeShowState ready")
            this.cur_action_list = this.action_list_ready;
        }
        else if (this.showState == FightShowState.Show) {
            //TLog.Debug("changeShowState Show")
            this.cur_action_list = this.action_list_show;
        }
        else if (this.showState == FightShowState.End) {
            //TLog.Debug("changeShowState End")
            this.cur_action_list = this.action_list_end;
        }
        this.nowTime = 0;
    };
    FightResult.prototype.changeNextShowState = function () {
        if (this.showState == FightShowState.ready) {
            if (this.isSpellPrepare()) {
                if (this.isSpecialFight()) {
                    this.finish();
                }
                else {
                    this.replayreadyAction(true);
                }
            }
            else if (this.isSpellInterval()) {
                if (this.isSpecialFight()) {
                    this.finish();
                }
                else {
                    this.replayreadyAction(); //this.finish()
                }
            }
            else {
                this.changeShowState(FightShowState.Show);
            }
        }
        else if (this.showState == FightShowState.Show) {
            //持续施法不表演收手，除非是（RCODE_SPELL_INTERVAL_END）设了bSpellIntervalHitShowLast
            if (this.isSpellIntervalHit() && !this.bSpellIntervalHitShowLast) {
                if (this.isSpecialFight()) {
                    this.finish();
                }
                else {
                    this.replayShowAction();
                }
            }
            else {
                //TLog.Debug("ccccccccccccccccccc", this.isSpellIntervalHit(), this.bSpellIntervalHitShowLast)
                this.changeShowState(FightShowState.End); //收手
            }
        }
        else if (this.showState == FightShowState.End) {
            this.changeShowState(-1); //表演结束
        }
        if (this.showState == -1) {
            this.finish();
        }
    };
    FightResult.prototype.isSpecialFight = function () {
        var _a = MovieSystem.getInstance().isPlayingMovie(), isMovie = _a[0], _ = _a[1];
        var flag = this.mFightSystem.isFightVideo();
        flag = flag || this.mFightSystem.isClientFighting();
        flag = flag || isMovie;
        return flag && this.mFightSystem.getShowSystem().isResultQueueEmpty();
    };
    FightResult.prototype.handleBuffAhead = function () {
        for (var _ = 0; _ < this.result.fightPowers.length; _++) {
            var powerInfo = this.result.fightPowers[_];
            if (!powerInfo.ahead) {
                if (powerInfo.effect == powerEffects.EFFECT_ADD_BUFF) {
                    //TLog.Debug("555555555555555555554444444444444", powerInfo.buff, powerInfo.target)
                    var buff = Buff.newObj(powerInfo.buff, powerInfo.life, powerInfo.count, powerInfo);
                    BuffSystem.getInstance().addBuff(powerInfo.target, buff, true);
                    powerInfo.ahead = true; //标识已经提前处理
                }
                else if (powerInfo.effect == powerEffects.EFFECT_SPIRIT_CD) {
                    //FireEvent(EventDefine.COMBAT_FIGHT_SPIRIT_CD, FunnalCDEvent.newObj(powerInfo.side, powerInfo.time))
                    this.createPowerList([powerInfo]);
                    powerInfo.ahead = true;
                }
                else if (powerInfo.effect == powerEffects.EFFECT_REBOUND) {
                    this.createPowerList([powerInfo]);
                    powerInfo.ahead = true;
                }
                else if (powerInfo.effect == powerEffects.EFFECT_BREAK) {
                    var actor = GetFightActor(powerInfo.target);
                    if (actor) {
                        actor.breakSkill();
                    }
                }
            }
        }
    };
    //暂停
    FightResult.prototype.isPause = function () {
        var casterActor = GetFightActor(this.result.caster);
        if (casterActor && casterActor.isPause()) {
            return true;
        }
        return false;
    };
    FightResult.prototype.tick = function (delay) {
        //TLog.Debug("FightResult.tick", this.bFinish)
        if (this.bFinish) {
            return true;
        }
        if (this.bBegin == false) {
            return;
        }
        this.lockEventDeep = 0;
        var actor = GetFightActor(this.result.caster);
        if (actor) {
            if (actor.isDeadState()) {
                return true;
            }
        }
        this.nowTime = this.nowTime + delay;
        this.tickDelayEvent();
        var count = 0;
        //for(let i = 0; i < this.cur_action_list.length; i++){
        //let action = this.cur_action_list[i]
        for (var i = 0; i < this.cur_action_list.length; i++) {
            var action = this.cur_action_list[i];
            action.tick(delay);
            if (action.isFinish()) {
                count = count + 1;
            }
        }
        //for(let i = 0; i < this.powerList.length; i++){
        //let power = this.powerList[i]
        for (var i = 0; i < this.powerList.length; i++) {
            var power = this.powerList[i];
            power.tick(delay);
        }
        //for(let i = 0; i < this.stateList.length; i++){
        //let state = this.stateList[i]
        for (var i = 0; i < this.stateList.length; i++) {
            var state = this.stateList[i];
            state.tick(delay);
        }
        //编辑器模式或者debug模式才检查
        if (GAME_MODE == GAME_TOOL) {
            if (this.nowTime >= this.maxTime) {
                var err_list = [];
                for (var i = 0; i < this.cur_action_list.length; i++) {
                    var action = this.cur_action_list[i];
                    if (action.isFinish() == false) {
                        var str = String.format("[%d]%s", i, action.classname);
                        JsUtil.arrayInstert(err_list, str);
                    }
                }
                if (err_list.length > 0) {
                    var err_str = table_concat(err_list, "|");
                    MsgSystem.confirmDialog_YES(String.format(Localize_cns("FIGHT_RESULT_MAX_TIME"), this.result.spellId) + err_str);
                    TLog.Error("spellid:%d", this.result.spellId);
                    for (var i = 0; i < this.cur_action_list.length; i++) {
                        var action = this.cur_action_list[i];
                        TLog.Error("index:%d %s: isBegin:%s isFinish:%s", i, action.classname, tostring(action.isBegin()), tostring(action.isFinish()));
                    }
                }
            }
        }
        if (count == this.cur_action_list.length || this.nowTime >= this.maxTime) {
            this.changeNextShowState(); //转移到下个状态
        }
        return this.bFinish;
    };
    FightResult.prototype.finish = function (destory) {
        if (this.bFinish == true) {
            return;
        }
        var _a = FightSystem.getInstance().getCurFightTime(), time = _a[0], _ = _a[1];
        //TLog.Debug("FightResult.finish result %d is finish!	%d	%d	%d %d", this.id, time, this.result.round, this.result.code, this.result.caster )
        //TLog.Debug("FightResult.finish result %d is finish!	%d	%d	%d", this.id, this.result.secIndex || 0, this.result.time, this.result.code)//this.result.caster, )
        if (!destory) {
            var flag = false;
            this.damageList = this.damageList || {};
            for (var _2 in this.damageList) {
                var list = this.damageList[_2];
                if (list.length != 0) {
                    flag = true;
                    break;
                }
            }
            if (flag) {
                TLog.Error("FightResult.finish the actor damage is error!");
                table_print(this.damageList);
            }
        }
        if (this.isSpellPrepare()) {
            this.showSpellPre(false);
        }
        //if(this.isSpellHit() ){
        //	let fightShowSystem = this.mFightSystem.getShowSystem()
        //	fightShowSystem.showSkillBubbleWord(this.result)
        //}
        this.bFinish = true;
    };
    FightResult.prototype.isFinish = function () {
        return this.bFinish;
    };
    FightResult.prototype.tickDelayEvent = function () {
        if (this.lockEventList.length > 0) {
            var tempEventList = this.lockEventList;
            this.lockEventList = [];
            TLog.Warn("FightResult.tickDelayEvent count:%d", tempEventList.length);
            for (var _ = 0; _ < tempEventList.length; _++) {
                var v = tempEventList[_];
                this.recElemResult(v);
            }
        }
    };
    FightResult.prototype.onRecvElemResult = function (event) {
        for (var i = 0; i < this.cur_action_list.length; i++) {
            var v = this.cur_action_list[i];
            v.recElemResult(event);
        }
    };
    //收到事件
    FightResult.prototype.recElemResult = function (event) {
        if (this.bFinish) {
            TLog.Debug("FightResult.recElemResult the result %d is finished", this.id);
            return;
        }
        if (this.bUseLockEvent && this.bLockEvent) {
            this.lockEventDeep = this.lockEventDeep + 1;
            if (this.lockEventDeep >= 3) {
                JsUtil.arrayInstert(this.lockEventList, event);
                return;
            }
        }
        this.bLockEvent = true;
        this.onRecvElemResult(event);
        this.bLockEvent = false;
    };
    FightResult.prototype.dumpEvent = function (event) {
        TLog.Debug("////////////////////////////////-");
        TLog.Debug("FightResult.dumpEvent spellId:", this.id, this.result.spellId);
        //for(let _ in this.finishConditionList){
        //let v = this.finishConditionList[_]
        //	TLog.Debug("finish", v.elem_name, v.event_name, v.finish)
        //}
        for (var i = 0; i < this.action_list_ready.length; i++) {
            var v = this.action_list_ready[i];
            TLog.Debug("action:", i, v.elemInfo.code);
            TLog.Debug(v.elemName, "finish:", v.isFinish(), "begin:", v.isBegin());
        }
        for (var i = 0; i < this.action_list_show.length; i++) {
            var v = this.action_list_show[i];
            TLog.Debug("action:", i, v.elemInfo.code);
            TLog.Debug(v.elemName, "finish:", v.isFinish(), "begin:", v.isBegin());
        }
        for (var i = 0; i < this.action_list_end.length; i++) {
            var v = this.action_list_end[i];
            TLog.Debug("action:", i, v.elemInfo.code);
            TLog.Debug(v.elemName, "finish:", v.isFinish(), "begin:", v.isBegin());
        }
        TLog.Debug("////////////////////////////////-");
        //io.read()
    };
    FightResult.prototype.getActorIdListFromResult = function (actorName) {
        var target_list = [];
        if (actorName == null) {
            return target_list;
        }
        if (actorName == "targetList") {
            var targetList_1 = this.result["targetList"];
            var actor = GetFightActor(this.result["caster"]);
            //如果角色已经不在了，就不做攻击表演了
            if (!actor || !targetList_1) {
                return target_list;
            }
            var side = actor.getSide();
            //判断第10位是否为1判断己方敌方，原来的最后一位判断容易与负值重叠造成误判
            if (bit.band(targetList_1, 0x00080000) == 0) {
                side = side % 2 + 1;
            }
            for (var i = 1; i <= 30; i++) {
                if (bit.band(targetList_1, Math.pow(2, i - 1)) != 0) {
                    var actor_1 = GetFightActorByPos(side, i);
                    if (actor_1) {
                        JsUtil.arrayInstert(target_list, actor_1.getCombatId());
                    }
                }
            }
            return target_list;
        }
        JsUtil.arrayInstert(target_list, this.result[actorName]);
        return target_list;
    };
    FightResult.prototype.getPower = function (index) {
        var powerList = [];
        for (var i = 0; i < this.result.fightPowers.length; i++) {
            var power = this.result.fightPowers[i];
            if (power.times == index && !table_isExsit(ELEM_IGNORE_POWER, power.effect)) {
                JsUtil.arrayInstert(powerList, power);
            }
        }
        return powerList;
    };
    FightResult.prototype.getState = function (index) {
        var stateList = [];
        for (var i in this.result.fightPowers) {
            var power = this.result.fightPowers[i];
            if (power.times == index && power.effect == powerEffects.EFFECT_STATUS) {
                JsUtil.arrayInstert(stateList, power);
            }
        }
        return stateList;
    };
    FightResult.prototype.createAction = function (elem) {
        var actionType = elem.content.code;
        var actionClassName = ENUM_FIGHT_ACTION[actionType];
        var actionObj = egret.getDefinitionByName(actionClassName);
        //TLog.Debug("ENUM_ACTION[actionType]", actionClassName, actionType)
        var action = actionObj.newObj(this, elem);
        //action.actionConfig = elem //FightConfigSystem.readActionConfig
        return action;
    };
    //创建Power
    FightResult.prototype.createPowerList = function (powerList, callBack, obj, playSomeSound) {
        //for i, info in ipairs(powerList) do
        for (var i = 0; i < powerList.length; i++) {
            var info = powerList[i];
            if (ENUM_FIGHT_POWER[info.effect]) {
                var powerClassName = ENUM_FIGHT_POWER[info.effect];
                var powerObj = egret.getDefinitionByName(powerClassName);
                var power = powerObj.newObj(this, info, callBack, obj, playSomeSound);
                power.play();
                //table.insert(this.powerList, power)
                this.powerList.push(power);
            }
            else {
                TLog.Debug("FightResult.createPowerList The PowerEfffect is %d", info.effect);
            }
        }
    };
    FightResult.prototype.createStateList = function (stateList) {
        for (var i = 0; i < stateList.length; i++) {
            var info = stateList[i];
            var stateClassName = ENUM_FIGHT_STATE[info.status];
            var stateObj = egret.getDefinitionByName(stateClassName);
            if (stateObj) {
                var state = stateObj.newObj(this, info);
                state.play();
                this.stateList.push(state);
            }
            else {
                TLog.Error("FightResult.createStateList status object is ! exsit! %d", info.status);
            }
        }
    };
    FightResult.prototype.getCurCastTime = function () {
        return this.curCastTime;
    };
    FightResult.prototype.showNextPower = function (playSomeSound) {
        this.curCastTime = this.curCastTime + 1;
        var powerList = this.getPower(this.curCastTime);
        var stateList = this.getState(this.curCastTime);
        if (powerList.length > 0) {
            this.createPowerList(powerList, null, null, playSomeSound);
        }
        if (stateList.length > 0) {
            this.createStateList(stateList);
        }
    };
    FightResult.prototype.flushPowerAction = function () {
        var _this = this;
        if (this.curCastTime >= this.result.castCount) {
            return;
        }
        //power的事件，不用缓冲事件，避免tick延时处理
        this.bUseLockEvent = false;
        while (this.curCastTime < this.result.castCount) {
            this.showNextPower();
        }
        //检漏
        JsUtil.objectForEach(GetFightActorList(), function (actor, combatId) {
            while (true) {
                var powerList = _this.getDamagePowerList(combatId);
                if (powerList.length == 0) {
                    break;
                }
                var t = powerList[0];
                //t.flag = 0
                _this.createPowerList(powerList);
            }
        });
    };
    FightResult.prototype.showTargetPower = function (target, playSomeSound) {
        if (!target) {
            return;
        }
        var targetId = target.getCombatId();
        var powerList = [];
        for (var i = 0; i < this.result.fightPowers.length; i++) {
            var power = this.result.fightPowers[i];
            if (power.target == targetId && !table_isExsit(ELEM_IGNORE_POWER, power.effect)) {
                //power的表演只有一次
                power.times = 0;
                JsUtil.arrayInstert(powerList, power);
            }
        }
        if (powerList.length > 0) {
            this.createPowerList(powerList, null, null, playSomeSound);
        }
    };
    //重新开始起手动作
    FightResult.prototype.replayreadyAction = function (reshow) {
        TLog.Warn("replayreadyAction casterid:%d spellid:%d", this.result.caster, this.result.spellId);
        if (reshow) {
            for (var _ = 0; _ < this.action_list_ready.length; _++) {
                var v = this.action_list_ready[_];
                v.reset();
            }
            for (var _ = 0; _ < this.action_list_show.length; _++) {
                var v = this.action_list_show[_];
                v.reset();
            }
            for (var _ = 0; _ < this.action_list_end.length; _++) {
                var v = this.action_list_end[_];
                v.reset();
            }
        }
        else {
            for (var _ = 0; _ < this.action_list_ready.length; _++) {
                var v = this.action_list_ready[_];
                v.finish();
            }
            for (var _ = 0; _ < this.action_list_show.length; _++) {
                var v = this.action_list_show[_];
                v.finish();
            }
            for (var _ = 0; _ < this.action_list_end.length; _++) {
                var v = this.action_list_end[_];
                v.finish();
            }
        }
        this.changeShowState(FightShowState.ready);
    };
    //重新执行showAction
    FightResult.prototype.replayShowAction = function (reShow) {
        TLog.Warn("replayShowAction casterid:%d spellid:%d", this.result.caster, this.result.spellId);
        if (reShow) {
            for (var _ = 0; _ < this.action_list_show.length; _++) {
                var v = this.action_list_show[_];
                v.reset();
            }
            for (var _ = 0; _ < this.action_list_end.length; _++) {
                var v = this.action_list_end[_];
                v.reset();
            }
        }
        else {
            for (var _ = 0; _ < this.action_list_show.length; _++) {
                var v = this.action_list_show[_];
                v.finish();
            }
            for (var _ = 0; _ < this.action_list_end.length; _++) {
                var v = this.action_list_end[_];
                v.finish();
            }
        }
        this.changeShowState(FightShowState.Show);
    };
    //是否只表演power
    FightResult.prototype.isRcodePower = function () {
        return this.result.code == resultOptions.RCODE_POWER || this.result.code == resultOptions.RCODE_ADD_MONSTER;
    };
    //普通表演技能
    FightResult.prototype.isSpellHit = function () {
        return this.result.code == resultOptions.RCODE_SPELL_HIT;
    };
    //是否持续施法开始
    FightResult.prototype.isSpellInterval = function () {
        return this.result.code == resultOptions.RCODE_SPELL_INTERVAL;
    };
    //是否持续施法，中间过程结果包
    FightResult.prototype.isSpellIntervalHit = function () {
        return this.result.code == resultOptions.RCODE_SPELL_INTERVAL_HIT;
    };
    FightResult.prototype.setSpellIntervalHitShowLast = function (b) {
        this.bSpellIntervalHitShowLast = b;
    };
    //是否吟唱过程
    FightResult.prototype.isSpellPrepare = function () {
        return this.result.code == resultOptions.RCODE_SPELL_PREPARE;
    };
    //是否吟唱结束
    FightResult.prototype.isSpellPrepareHit = function () {
        return this.result.code == resultOptions.RCODE_SPELL_PREPARE_HIT;
    };
    FightResult.prototype.isSpellActions = function () {
        return this.showState != FightShowState.ready;
    };
    FightResult.prototype.isLastShowAction = function (action) {
        var index = 0;
        var bFind = false;
        for (var i = 0; i < this.action_list_ready.length; i++) {
            var v = this.action_list_ready[i];
            index = index + 1;
            if (v == action) {
                bFind = true;
                break;
            }
        }
        if (bFind == false) {
            for (var i = 0; i < this.action_list_show.length; i++) {
                var v = this.action_list_show[i];
                index = index + 1;
                if (v == action) {
                    break;
                }
            }
        }
        return (index == this.action_list_ready.length + this.action_list_show.length);
    };
    FightResult.prototype.breakSkill = function () {
        //let code = this.result.code
        //if(code == resultOptions.RCODE_SPELL_PREPARE ||
        //	code == resultOptions.RCODE_SPELL_INTERVAL ){
        //	this.finish()
        //	
        //}else{
        //	TLog.Error("actorid:%d isn't Spell prepare || interval", this.result.caster)	
        //}
        //直接finish
        this.finish();
    };
    FightResult.prototype.addLocalMessage = function () {
        if (!GAME_DEBUG) {
            return;
        }
        var actor = GetFightActor(this.result.caster);
        var spellId = this.result.spellId;
        if (!spellId || !GameConfig.FightActionConfig[spellId] || this.result.side == fightSide.FIGHT_LEFT || spellId == 801) {
            return;
        }
        var point = "";
        for (var _ in this.result.fightPowers) {
            var power = this.result.fightPowers[_];
            if (power.effect == powerEffects.EFFECT_HP_LESS) {
                point = "#red" + power.point + "#rf#space";
            }
            else if (power.effect == powerEffects.EFFECT_HP_PLUS) {
                point = "#blue" + power.point + "#rf#space";
            }
        }
        MsgSystem.addTagTips(point + String.format(Localize_cns("FIGHT_SKILL_SHOW"), actor.getName(), GameConfig.FightActionConfig[spellId].name, spellId));
    };
    FightResult.prototype.addActionObject = function (name, object) {
        if (object == null) {
            return;
        }
        var combatId = object.getCombatId();
        TLog.Assert(combatId == 0);
        TLog.Assert(name && name != "");
        this.idSeed = this.idSeed + 1;
        combatId = this.idSeed;
        object.setCombatId(combatId);
        if (this.actionObjectIdPool[name] == null) {
            this.actionObjectIdPool[name] = [];
        }
        //管理ID
        var objectIdList = this.actionObjectIdPool[name];
        JsUtil.arrayInstert(objectIdList, combatId);
        //管理object
        this.actionObjectPool[combatId] = object;
    };
    FightResult.prototype.removeActionObject = function (name, object) {
        var combatId = object.getCombatId();
        if (this.actionObjectPool[combatId]) {
            var objectIdList = this.actionObjectIdPool[name];
            TLog.Assert(objectIdList);
            table_remove(objectIdList, combatId);
            // 删除对象
            delete this.actionObjectPool[combatId];
            //object.deleteObj() 
        }
    };
    FightResult.prototype.getActionObject = function (id) {
        if (id < COMBAT_OBJECT_ID) {
            return GetFightActor(id);
        }
        return this.actionObjectPool[id];
    };
    FightResult.prototype.getActionObjectByName = function (name) {
        var list = [];
        var actor = GetFightActor(this.result.caster);
        if (actor == null) {
            return list;
        }
        var actor_list = GetFightActorList();
        //施法者
        if (name == "caster") {
            JsUtil.arrayInstert(list, actor);
            //受击者
        }
        else if (name == "targetList") {
            var targetList_2 = this.result["targetList"];
            //对于RCODE_POWER，RCODE_SPELL_PREPARE，RCODE_SPELL_INTERVAL，RCODE_SPELL_INTERVAL_END是没有targetList的		
            if (GAME_DEBUG) {
                if (this.isSpellHit() || this.isSpellPrepareHit() || this.isSpellIntervalHit()) {
                    if (!targetList_2 || targetList_2 == 0) {
                        //	MsgSystem.ConfirmDialog_YES(String.format(Localize_cns("FIGHT_RESULT_NO_TARGET"), this.result.spellId, this.result.code))
                    }
                }
            }
            if (targetList_2 && targetList_2 != 0) {
                var side = actor.getSide();
                //判断第10位是否为1判断己方敌方，原来的最后一位判断容易与负值重叠造成误判
                if (bit.band(targetList_2, opBattleSideTag) == 0) {
                    side = side % 2 + 1;
                }
                for (var i = 1; i <= PET_COUNT; i++) {
                    if (bit.band(targetList_2, Math.pow(2, i - 1)) != 0) {
                        var actor_2 = GetFightActorByPos(side, i);
                        if (actor_2) {
                            JsUtil.arrayInstert(list, actor_2);
                        }
                    }
                }
            }
        }
        else if (name == "mySide") {
            var casterSide = actor.getSide();
            for (var _ in actor_list) {
                var v = actor_list[_];
                if (v.getSide() == casterSide) {
                    JsUtil.arrayInstert(list, v);
                }
            }
        }
        else if (name == "enemySide") {
            var casterSide = actor.getSide();
            for (var _ in actor_list) {
                var v = actor_list[_];
                if (v.getSide() != casterSide) {
                    JsUtil.arrayInstert(list, v);
                }
            }
            //特效,分身...
        }
        else if (StringUtil.stringMatch(name, /target(\d+)/)) {
            var index = tonumber(StringUtil.stringMatch(name, /target(\d+)/)[0]);
            if (index) {
                var targetList_3 = this.result["targetList"];
                if (targetList_3 && targetList_3 != 0) {
                    var side = actor.getSide();
                    //判断第10位是否为1判断己方敌方，原来的最后一位判断容易与负值重叠造成误判
                    if (bit.band(targetList_3, opBattleSideTag) == 0) {
                        side = side % 2 + 1;
                    }
                    for (var i = 1; i <= PET_COUNT; i++) {
                        if (bit.band(targetList_3, Math.pow(2, i - 1)) != 0) {
                            var actor_3 = GetFightActorByPos(side, i);
                            if (actor_3 && actor_3.isDeadState() == false) {
                                index = index - 1;
                                if (index == 0) {
                                    JsUtil.arrayInstert(list, actor_3);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        else {
            var objectIdList = this.actionObjectIdPool[name];
            if (objectIdList) {
                for (var _ = 0; _ < objectIdList.length; _++) {
                    var id = objectIdList[_];
                    JsUtil.arrayInstert(list, this.actionObjectPool[id]);
                }
            }
        }
        return list;
    };
    FightResult.prototype.getCasterOriginXY = function () {
        return newPos(this.casterMapX, this.casterMapY);
    };
    FightResult.prototype.showSpellPre = function (visible) {
        var actor = GetFightActor(this.result.caster);
        if (actor) {
            actor.setSpellPreState(visible, visible);
        }
    };
    FightResult.prototype.isActorResultEffect = function (targetId, effect) {
        var flag = false;
        for (var _ in this.result.fightPowers) {
            var powerInfo = this.result.fightPowers[_];
            if (powerInfo.target == targetId) {
                if (powerInfo.effect == effect) {
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    };
    //连击伤害显示
    FightResult.prototype.showDoubleHit = function (powerInfo) {
        if (this.mFightSystem.isPauseSkill() == false) {
            return;
        }
        if (!table_isExsit(this.doubleHitPowerList, powerInfo)) {
            return;
        }
        if (powerInfo.effect != powerEffects.EFFECT_HP_LESS) {
            return;
        }
        //let wnd = WngMrg.getInstance().getWindow("FightDoubleHitFrame")
        //wnd.showDoubleHit(powerInfo.point, this.doubleHitPowerList["sumDamage"])
    };
    FightResult.prototype.getActionSpeed = function (speed) {
        return speed * this.speed;
    };
    FightResult.prototype.getActionDuration = function (time) {
        return time / this.speed;
    };
    return FightResult;
}(TClass));
__reflect(FightResult.prototype, "FightResult");
//# sourceMappingURL=FightResult.js.map