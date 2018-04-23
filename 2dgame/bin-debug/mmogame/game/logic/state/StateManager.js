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
var StateManager = (function (_super) {
    __extends(StateManager, _super);
    function StateManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //子类复写 初始化函数
    StateManager.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.currentState = null; //当前状态
        this.currentMainState = null; //当前主状态
        this.currentSubState = null; //当前子状态
        this.statelist = {}; //主状态列表
        this.substatelist = {}; //子状态列表	
        StateManagerStaticInit(this); // 注册状态
    };
    //子类复写 析构函数
    StateManager.prototype.destory = function () {
    };
    StateManager.prototype.onClear = function () {
        if (this.currentMainState) {
            this.currentMainState.Deactive();
            this.NotifyStateDeactive(this.currentMainState.GetStateType());
        }
        if (this.currentSubState != null) {
            this.currentSubState.Deactive();
            this.NotifyStateDeactive(this.currentSubState.GetStateType());
        }
        this.currentState = null; //当前状态
        this.currentMainState = null; //当前主状态
        this.currentSubState = null; //当前子状态
    };
    StateManager.prototype.registerMainState = function (statetype, state) {
        state.mStateType = statetype;
        this.statelist[statetype] = state;
    };
    StateManager.prototype.registerSubState = function (statetype, state) {
        state.mStateType = statetype;
        this.substatelist[statetype] = state;
    };
    StateManager.prototype.ActiveState = function (statetype) {
        if (this.statelist[statetype] == null) {
            TLog.Error("StateManager.ActiveState statetype:" + statetype + " not found");
            return;
        }
        if (this.currentMainState != this.statelist[statetype]) {
            //旧的子状态结束
            if (this.currentSubState != null) {
                this.currentSubState.Deactive();
                this.NotifyStateDeactive(this.currentSubState.GetStateType());
                this.currentSubState = null;
            }
            //旧的主状态结束
            if (this.currentMainState != null) {
                this.currentMainState.Deactive();
                this.NotifyStateDeactive(this.currentMainState.GetStateType());
                this.currentMainState = null;
            }
            //新的状态开始
            this.currentMainState = this.statelist[statetype];
            this.currentMainState.Activate();
            this.currentState = this.currentMainState;
            this.NotifyStateActive(this.currentMainState.GetStateType());
        }
    };
    StateManager.prototype.ActiveSubState = function (statetype) {
        TLog.Debug("StateManager.ActiveSubState:", statetype, this.substatelist[statetype]);
        if (this.substatelist[statetype] == null) {
            TLog.Error("StateManager.ActiveSubState statetype:" + statetype + " not found");
            return;
        }
        if (this.currentMainState == null) {
            TLog.Error("StateManager.ActiveSubState currentState == null");
            return;
        }
        if (this.currentSubState != this.substatelist[statetype]) {
            //通过当前主状态,检查是否接受子状态的加载	
            if (this.currentMainState.EnableSubState(statetype) == false) {
                TLog.Error("StateManager.ActiveSubState statetype:" + statetype + " can't add to state:" + this.currentState.GetStateType());
                return;
            }
            if (this.currentSubState != null) {
                this.currentSubState.Deactive();
                this.NotifyStateDeactive(this.currentSubState.GetStateType());
            }
            this.currentSubState = this.substatelist[statetype];
            this.currentSubState.Activate();
            this.currentState = this.currentSubState; //当前状态是子状态
            this.NotifyStateActive(this.currentSubState.GetStateType());
        }
    };
    StateManager.prototype.DeactiveSubState = function (statetype) {
        if (this.substatelist[statetype] == null || this.currentSubState == null) {
            TLog.Error("StateManager.DeactiveSubState statetype:" + statetype + " not found");
            //Log.Error("StateManager.DeactiveSubState statetype:"+statetype+" not found")
            return;
        }
        if (this.currentSubState.GetStateType() != statetype) {
            TLog.Error("StateManager.DeactiveSubState currentSubState:" + this.currentSubState.GetStateType() + " is not " + statetype);
            //Log.Error("StateManager.DeactiveSubState currentSubState:"+this.currentSubState.GetStateType()+" is not "+statetype)
            return;
        }
        this.currentSubState.Deactive();
        this.currentState = this.currentMainState;
        this.NotifyStateDeactive(this.currentSubState.GetStateType());
        this.currentSubState = null;
    };
    StateManager.prototype.GetCurrentStateType = function () {
        if (!this.currentState) {
            return state_type.BASE_STATE;
        }
        return this.currentState.GetStateType();
    };
    StateManager.prototype.IsTheSubState = function (statetype) {
        var bRet = false;
        var currentSubState = this.currentSubState;
        if (currentSubState && currentSubState == this.substatelist[statetype]) {
            bRet = true;
        }
        return bRet;
    };
    StateManager.prototype.NotifyStateActive = function (statetype) {
        FireEvent(EventDefine.STATE_ACTIVE, StateEvent.newObj(statetype));
    };
    StateManager.prototype.NotifyStateDeactive = function (statetype) {
        FireEvent(EventDefine.STATE_DEACTIVE, StateEvent.newObj(statetype));
    };
    StateManager.prototype.OnEvent = function (eventname, args) {
        if (this.currentMainState == null) {
            TLog.Error("StateManager.OnEvent %s", eventname);
            return;
        }
        //子状态先处理，看消息是否拦截
        var bBlock = false;
        if (this.currentSubState) {
            var func = this.currentSubState[eventname];
            if (func) {
                bBlock = func.call(this.currentState, args); //return true 就拦截
            }
        }
        if (bBlock == false) {
            var func = this.currentMainState[eventname];
            if (func) {
                func.call(this.currentState, args);
            }
        }
    };
    return StateManager;
}(TClass));
__reflect(StateManager.prototype, "StateManager");
//# sourceMappingURL=StateManager.js.map