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
/*
作者:
    liuziming
    
创建时间：
   2014.7.22(周二)

意图：
   处理退出战斗的流程控制

公共接口：
   
*/
var FightFinishHandler = (function (_super) {
    __extends(FightFinishHandler, _super);
    function FightFinishHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FightFinishHandler.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mOnAir = false;
        //记录战斗完后通过的关卡ID
        this.passCampaign = null;
        this.fightSystem = args[0];
        this.endFightCallBack = args[1];
        this.externalHandlerList = [];
        this.accountSettle = [];
        //this.saveExternalHandler = {}
        RegisterEvent(EventDefine.COMBAT_FIGHT_WIN, this.onStartWinHandle, this);
        RegisterEvent(EventDefine.COMBAT_FIGHT_LOST, this.onStartLostHandle, this);
    };
    FightFinishHandler.prototype.onClear = function () {
        this.mOnAir = false;
        this.externalHandlerList = [];
        //elf.win = null
        this.hangUp = 0;
        this.accountSettle = [];
        if (this.timeId) {
            KillTimer(this.timeId);
            this.timeId = null;
        }
    };
    FightFinishHandler.prototype.startProcess = function () {
        if (this.mOnAir) {
            return;
        }
        this.mOnAir = true;
        //this.externalHandlerList = {}
        this.win = null;
        this.hangUp = 0;
        //可扩展部分
        this.MAX_WAIT_TIME = 0;
        if (this.fightSystem.isClientFighting() == true) {
            this.MAX_WAIT_TIME = 500;
        }
        // } else if (this.fightSystem.getCurFightType() != opFightType.FIGHT_TYPE_COMMON) {
        // 	this.MAX_WAIT_TIME = 1500
        // }
        if (!this.timeId) {
            this.timeId = SetTimer(this.tick, this, 500, false);
            this.nowTime = 0;
            this.cacheTime = 0;
        }
        FireEvent(EventDefine.COMBAT_SHOW_END, null);
    };
    FightFinishHandler.prototype.tick = function (delay) {
        this.nowTime = this.nowTime + delay;
        this.cacheTime = this.cacheTime + delay;
        if (this.hangUp > 0) {
            if (this.cacheTime < 7000) {
                this.nowTime = this.nowTime - delay;
            }
        }
        if (this.nowTime > this.MAX_WAIT_TIME) {
            if (this.timeId) {
                KillTimer(this.timeId);
                this.timeId = null;
            }
            //通知服务器已经完成战斗表演
            if (this.fightSystem.fightVideo == true || this.fightSystem.isClientFighting() == true) {
                //if(this.fightSystem.fightVideo == true ){
                //	let wnd = WngMrg.getInstance().getWindow("FightRecordFrame")
                //	wnd.showWnd()
                //}
                this.callBack();
            }
            else {
                var winParam = this.accountSettle[0]; //只处理第一个结算数据
                if (winParam) {
                    var win = winParam.result;
                    var param = winParam.prize;
                    this.fightEndResult(win, param);
                }
                // let message = GetMessage(opCodes.C2G_FIGHT_DRAWDONE)
                // SendGameMessage(message)
            }
        }
        else if (this.nowTime > 1000) {
            this.fightSystem.recycleAward = true;
        }
    };
    FightFinishHandler.prototype.getDelayHandle = function (waitTime, handle, obj, param) {
        var time = 0;
        var timeId = null;
        function tickDelay(delay) {
            time = time + delay;
            if (time > waitTime) {
                if (timeId) {
                    KillTimer(timeId);
                    timeId = null;
                }
                handle(obj, param);
            }
        }
        timeId = SetTimer(tickDelay, this, 500);
        return tickDelay;
    };
    FightFinishHandler.prototype.addFightAccountSettle = function (win, param) {
        if (this.fightSystem.isFight() == false) {
            this.fireFightResult(win, param);
            return;
        }
        table_insert(this.accountSettle, { result: win, prize: param });
    };
    // delayShow(args) {
    // 	let win = args[0]
    // 	let param = args[1]
    // 	this.fightSystem.forceEndFight(param)
    // 	if (win) {
    // 		FireEvent(EventDefine.COMBAT_FIGHT_WIN, CombatEndEvent.newObj(table_copy(param), this.callBack, this))
    // 	} else {
    // 		FireEvent(EventDefine.COMBAT_FIGHT_LOST, CombatEndEvent.newObj(table_copy(param), this.callBack, this))
    // 	}
    // }
    ////////////////////////////////////////////////////////////////-
    //外部接口
    FightFinishHandler.prototype.fightEndResult = function (win, param, passCampaign) {
        if (this.fightSystem.isFight() == false) {
            return;
        }
        TLog.Debug("FightFinishHandler.fightEndResult", win);
        if (!this.mOnAir) {
            this.mOnAir = true;
            //this.externalHandlerList = {}
            this.hangUp = 0;
            //TLog.Debug("222222222222222222", this.fightSystem.getCurFightTime())
            //return this.getDelayHandle(this.fightSystem.suspendDelay, this.delayShow, this, {win, param})
            this.fightSystem.forceEndFight();
        }
        this.passCampaign = passCampaign || null;
        //如果是自动战斗模式（且战胜了），则直接返回
        if (this.isFinishAtOnce(win, param)) {
            this.win = win;
            return this.callBack();
        }
        this.fireFightResult(win, param);
    };
    FightFinishHandler.prototype.fireFightResult = function (win, param) {
        if (win) {
            this.win = true;
            //战胜特效
            //MsgSystem.showScreenEffect(effectIndex.FightWin)
            FireEvent(EventDefine.COMBAT_FIGHT_WIN, CombatEndEvent.newObj(table_copy(param), this.callBack, this));
        }
        else {
            this.win = false;
            FireEvent(EventDefine.COMBAT_FIGHT_LOST, CombatEndEvent.newObj(table_copy(param), this.callBack, this));
        }
    };
    //自动结束战斗状态
    FightFinishHandler.prototype.isFinishAtOnce = function (win, param) {
        var _a = FightSystem.getInstance().getCurFightType(), fightType = _a[0], _ = _a[1];
        //
        var flag = false;
        //圣地，非PK类型，都直接结束
        // if(GetActivity(ActivityDefine.Robber).isStart() ){
        // 	flag = GetActivity(ActivityDefine.Robber).isShowFightPrize(fightType, table_copy(param), win)
        // }
        return flag;
    };
    FightFinishHandler.prototype.clearUpFightState = function () {
        if (this.fightSystem.isFight() == false) {
            return;
        }
        this.mOnAir = true;
        this.fightSystem.forceEndFight();
        return this.callBack();
    };
    FightFinishHandler.prototype.addEndFightHandler = function (callBack, obj, param) {
        var t = [];
        JsUtil.arrayInstert(t, callBack);
        JsUtil.arrayInstert(t, obj);
        JsUtil.arrayInstert(t, param);
        JsUtil.arrayInstert(this.externalHandlerList, t);
        //this.externalHandler = callBack
        //this.externalObj		 = obj
        //this.externalParam	 = param
    };
    FightFinishHandler.prototype.isOnAir = function () {
        return this.mOnAir;
    };
    // sweepAwayFight(param, campaignId) {
    // 	if (this.fightSystem.isFight() == true) {
    // 		return this.fightEndResult(true, param, campaignId)
    // 	}
    // 	this.mOnAir = true
    // 	//this.externalHandlerList = {}
    // 	this.passCampaign =  null
    // 	this.win = true
    // 	FireEvent(EventDefine.COMBAT_FIGHT_WIN, CombatEndEvent.newObj(table_copy(param), this.sweepAwayFightCallBack, this))
    // }
    FightFinishHandler.prototype.setHangUp = function (b) {
        if (!this.mOnAir) {
            return;
        }
        if (b == true) {
            this.hangUp = this.hangUp + 1;
        }
        else {
            this.hangUp = this.hangUp - 1;
        }
    };
    ////////////////////////////////////////////////////////////
    //
    FightFinishHandler.prototype.callBack = function () {
        if (!this.mOnAir || !this.endFightCallBack) {
            return;
        }
        this.mOnAir = false;
        if (this.timeId) {
            KillTimer(this.timeId);
            this.timeId = null;
        }
        //以防由于卡帧而误触
        SetGlobalInputStatus(false, "FightFrame");
        var externalHandlerList = this.externalHandlerList;
        var fightType = this.endFightCallBack.call(this.fightSystem);
        FireEvent(EventDefine.COMBAT_END, CombatEvent.newObj(fightType, this.win));
        for (var _ in externalHandlerList) {
            var v = externalHandlerList[_];
            var callBack = v[0];
            var obj = v[1];
            var param = v[2];
            callBack.call(obj, param);
        }
        this.externalHandlerList = [];
        if (this.passCampaign) {
            FireEvent(EventDefine.CAMPAIGN_FINISH, CampaignEvent.newObj(this.passCampaign));
        }
        else {
        }
        //以防由于卡帧而误触
        SetGlobalInputStatus(true, "FightFrame");
    };
    // sweepAwayFightCallBack() {
    // 	if (this.mOnAir == false) {
    // 		return
    // 	}
    // 	this.mOnAir = false
    // 	if (this.timeId) {
    // 		KillTimer(this.timeId)
    // 		this.timeId = null
    // 	}
    // 	if (this.lastBgm) {
    // 		GameSound.getInstance().playMusic(this.lastBgm)
    // 		this.lastBgm = null
    // 	}
    // 	FireEvent(EventDefine.COMBAT_END, CombatEvent.newObj(opFightType.FIGHT_TYPE_COMMON, this.win))
    // 	for (let _ in this.externalHandlerList) {
    // 		let v = this.externalHandlerList[_]
    // 		let callBack = v[0]
    // 		let obj = v[1]
    // 		let param = v[2]
    // 		callBack(obj, param)
    // 	}
    // 	this.externalHandlerList = []
    // 	this.win = null
    // 	if (this.passCampaign) {
    // 		return FireEvent(EventDefine.CAMPAIGN_FINISH, CampaignEvent.newObj(this.passCampaign))
    // 	}
    // }
    FightFinishHandler.prototype.onStartWinHandle = function (args) {
        this._onStartFinishHandle();
        if (args.param.fightType) {
            if (FightFinishWndDefend["win"][args.param.fightType]) {
                var wndName = FightFinishWndDefend["win"][args.param.fightType];
                var wnd = WngMrg.getInstance().getWindow(wndName);
                wnd.onCombatEnd(args);
            }
        }
        this.callBack();
    };
    FightFinishHandler.prototype.onStartLostHandle = function (args) {
        this._onStartFinishHandle();
        if (args.param.fightType) {
            if (FightFinishWndDefend["lost"][args.param.fightType]) {
                var wndName = FightFinishWndDefend["lost"][args.param.fightType];
                var wnd = WngMrg.getInstance().getWindow(wndName);
                wnd.onCombatEnd(args);
            }
            this.callBack();
        }
    };
    FightFinishHandler.prototype._onStartFinishHandle = function (args) {
        this.lastBgm = GameSound.getInstance().getCurMusicName() || null;
        //GameSound.getInstance().stopMusic()
        //清除战斗里的引导遮罩
        //GuideSystem.getInstance().clearWindowAction()
    };
    return FightFinishHandler;
}(TClass));
__reflect(FightFinishHandler.prototype, "FightFinishHandler");
//# sourceMappingURL=FightFinishHandler.js.map