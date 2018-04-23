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
   2017.03.31(周五)

意图：
   结算界面的基类，提供基本的战斗流程相关的接入处理
公共接口：
   FightEndBaseFrame.starShowCombatEnd					实现接口，子类自己根据自身判断执行showwnd
   FightEndBaseFrame.endShowCombatEnd									要关闭界面时，可直接调用这个接口
   this.param																	为结算时服务器返回的相关数据，不同活动可能结构不一样table
*/
var FightEndBaseFrame = (function (_super) {
    __extends(FightEndBaseFrame, _super);
    function FightEndBaseFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FightEndBaseFrame.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.teamTicker = null;
        this.singleTicker = null;
        this.bAutoHide = true;
        this.maxDelayTime = 5 * 1000;
        RegisterEvent(EventDefine.UI_SHOW, this.onUIShowEvent, this);
        RegisterEvent(EventDefine.UI_HIDE, this.onUIHideEvent, this);
    };
    FightEndBaseFrame.prototype.destory = function () {
        UnRegisterEvent(EventDefine.UI_SHOW, this.onUIShowEvent, this);
        UnRegisterEvent(EventDefine.UI_HIDE, this.onUIHideEvent, this);
    };
    FightEndBaseFrame.prototype.onUIShowEvent = function (args) {
        if (args.window != this) {
            return;
        }
        if (HeroIsInTeam()) {
            var tick = function (delay) {
                if (this.teamTicker) {
                    KillTimer(this.teamTicker);
                    this.teamTicker = null;
                }
                if (this.isVisible() == true) {
                    this.endShowCombatEnd();
                }
            };
            this.teamTicker = SetTimer(tick, this, 20 * 1000, false);
        }
        else {
            if (this.bAutoHide == true) {
                var maxTime_1 = this.maxDelayTime;
                var tick = function (delay) {
                    maxTime_1 = maxTime_1 - delay;
                    if (maxTime_1 < 0) {
                        if (this.singleTicker) {
                            KillTimer(this.singleTicker);
                            this.singleTicker = null;
                        }
                        if (this.isVisible() == true) {
                            this.endShowCombatEnd();
                        }
                    }
                    else {
                        this.autoHideTick(maxTime_1);
                    }
                };
                this.singleTicker = SetTimer(tick, this, 100, true);
            }
        }
    };
    FightEndBaseFrame.prototype.onUIHideEvent = function (args) {
        if (args.window != this) {
            return;
        }
        if (this.teamTicker) {
            KillTimer(this.teamTicker);
            this.teamTicker = null;
        }
        if (this.singleTicker) {
            KillTimer(this.singleTicker);
            this.singleTicker = null;
        }
    };
    FightEndBaseFrame.prototype.onShow = function () {
        WngMrg.getInstance().hideWindow("FightFrame");
        IGlobal.resGroupManager.loadGroup(ResourceGroupDefine.Group_LiveState);
    };
    FightEndBaseFrame.prototype.onHide = function () {
        this.callBack = null;
        this.param = null;
        this.obj = null;
    };
    ////////////////////////////////////////////////-实现接口////////////////////////////
    FightEndBaseFrame.prototype.starShowCombatEnd = function () {
    };
    FightEndBaseFrame.prototype.autoHideTick = function (leftTime) {
    };
    ////////////////////////////////////////////////////////////-响应函数//////////////////////////////////////////////////////////////////////
    FightEndBaseFrame.prototype.endShowCombatEnd = function (args) {
        // if (this.callBack && this.obj) {
        //     this.callBack.call(this.obj)
        // }
        this.hideWnd();
    };
    FightEndBaseFrame.prototype.onCombatEnd = function (args) {
        this.callBack = args.callBack;
        this.param = args.param;
        this.obj = args.obj;
        this.starShowCombatEnd();
    };
    return FightEndBaseFrame;
}(BaseWnd));
__reflect(FightEndBaseFrame.prototype, "FightEndBaseFrame");
//# sourceMappingURL=FightEndBaseFrame.js.map