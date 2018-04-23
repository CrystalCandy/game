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
function PushUIShow(exceptPushList, exceptHideList) {
    WngMrg.getInstance().pushShowStatck(exceptPushList, exceptHideList);
}
function PopUIShow(exceptHideList) {
    WngMrg.getInstance().popShowStatck(exceptHideList);
}
var WngMrg = (function (_super) {
    __extends(WngMrg, _super);
    function WngMrg() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //refreshDotTipsTimer: any;
    WngMrg.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.bShowStateWindow = true;
        this.windows = {};
        this.stackList = null;
        //this.refreshDotTipsTimer = null
    };
    WngMrg.prototype.destory = function () {
    };
    WngMrg.prototype.start = function () {
        RegisterEvent(EventDefine.PRECEDURE_ACTIVE, this.onPrecedureActive, this);
        RegisterEvent(EventDefine.PRECEDURE_DEACTIVE, this.onPrecedureDeactive, this);
        //RegisterEvent(EventDefine.HERO_ENTER_GAME, this.onHeroEnterGame, this)
        // RegisterEvent(EventDefine.UI_SHOW, this.onUIShowEvent, this)
        // RegisterEvent(EventDefine.UI_HIDE, this.onUIHideEvent, this)
        for (var state in WndsMap) {
            var infoList = WndsMap[state];
            for (var name in infoList) {
                var info = infoList[name];
                //if (info.init == true) {
                this.getWindow(name); // -- 自动创建
                //}
            }
        }
    };
    WngMrg.prototype.stop = function () {
        UnRegisterEvent(EventDefine.PRECEDURE_ACTIVE, this.onPrecedureActive, this);
        UnRegisterEvent(EventDefine.PRECEDURE_DEACTIVE, this.onPrecedureDeactive, this);
        //UnRegisterEvent(EventDefine.HERO_ENTER_GAME, this.onHeroEnterGame, this)
        // UnRegisterEvent(EventDefine.UI_SHOW, this.onUIShowEvent, this)
        //UnRegisterEvent(EventDefine.UI_HIDE, this.onUIHideEvent, this)
    };
    WngMrg.prototype.onClear = function () {
        this.stackList = null;
        // if (this.refreshDotTipsTimer) {
        // 	KillTimer(this.refreshDotTipsTimer)
        // 	this.refreshDotTipsTimer = null
        // }
    };
    //显示窗口
    WngMrg.prototype.showWindow = function (name, parentName) {
        var wnd = this.getWindow(name);
        var parentWnd = null;
        if (parentName) {
            parentWnd = this.getWindow(parentName);
        }
        if (wnd == null) {
            TLog.Error("WngMrg.showWindow %s", name);
            return;
        }
        wnd.showWnd(parentWnd);
    };
    //隐藏窗口
    WngMrg.prototype.hideWindow = function (name) {
        var wnd = this.getWindow(name);
        if (wnd == null) {
            TLog.Error("WngMrg.hideWindow %s", name);
            return;
        }
        wnd.hideWnd();
    };
    WngMrg.prototype.isVisible = function (name) {
        var wnd = this.windows[name];
        if (wnd == null)
            return false;
        return wnd.isVisible();
    };
    WngMrg.prototype.getWindow = function (name) {
        var wnd = this.windows[name];
        if (wnd == null) {
            wnd = this.createWindow(name);
            if (wnd != null) {
                this.windows[name] = wnd;
            }
        }
        return wnd;
    };
    WngMrg.prototype.findWndMapInfo = function (name) {
        var info = null;
        var commonList = WndsMap["Common"];
        var info = commonList[name];
        if (info) {
            return info;
        }
        JsUtil.objectForEach(WndsMap, function (v, k) {
            info = v[name];
            if (info) {
                return true; //终止循环
            }
            return false;
        });
        return info;
    };
    WngMrg.prototype.createWindow = function (name) {
        var info = this.findWndMapInfo(name);
        if (!info) {
            TLog.Error("WngMrg.getWindow %s info not exsit", name);
            return null;
        }
        var wnd = null;
        var defineClass = egret.getDefinitionByName(name);
        if (defineClass == null) {
            TLog.Error("WngMrg.getWindow _G[%s] not exsit", name);
        }
        else {
            //wnd = new defineClass(info);
            TLog.Assert(defineClass.newObj != null); //必须继承TClass
            wnd = defineClass.newObj(info);
        }
        return wnd;
    };
    WngMrg.prototype.onPrecedureActive = function (event) {
        this.showStateWindows(event.state);
    };
    WngMrg.prototype.onPrecedureDeactive = function (event) {
        this.hideStateWindows(event.state);
    };
    WngMrg.prototype.onUIShowEvent = function (args) {
        var wndName = args.window.classname;
        // let info = WndsOpenRelationMap[wndName]
        // if(info && info.show ){	
        // 	//关闭互斥模块
        // 	if(info.show.Mutex ){
        // 		for(let _ = 0; _ < info.show.Mutex.length; _++){
        // 		let name = info.show.Mutex[_]
        // 			if(name != "" && this.isVisible(name) ){
        // 				this.hideWindow(name)
        // 			}
        // 		}
        // 	}
        // 	//打开关联模块
        // 	if(info.show.Relation ){
        // 		for(let _ = 0; _ < info.show.Relation.length; _++){
        // 		let name = info.show.Relation[_]
        // 			if(name != "" && ! this.isVisible(name) ){
        // 				this.showWindow(name)
        // 			}
        // 		}
        // }		
        // }
        //跨服内不让显示界面
        if (IsInGlobalActvity() != null && table_isExsit(GlobalForbidMap["show"], wndName)) {
            args.window.hideWnd();
            return;
        }
        // if(table_isExsit(WndsForbitFindWayMap, wndName) ){
        // 	GetHero().moveStop()
        // 	Command_Move(GetHero().getCellXY())
        // }
    };
    WngMrg.prototype.setShowStateWindow = function (show) {
        this.bShowStateWindow = show;
    };
    //显示游戏状态的所有窗口
    WngMrg.prototype.showStateWindows = function (state) {
        if (this.bShowStateWindow == false) {
            return;
        }
        //TLog.Debug("WngMrg.showStateWindows %d", state)
        var subMap = WndsMap[state];
        if (!subMap) {
            //TLog.Error("WngMrg.showStateWindows no ui exsit with state:%d", state)
            return;
        }
        for (var name in subMap) {
            var v = subMap[name];
            if (v.autoshow == true) {
                this.showWindow(name);
            }
        }
    };
    //隐藏游戏状态的所有窗口
    WngMrg.prototype.hideStateWindows = function (state) {
        //TLog.Debug("WngMrg.hideStateWindows %d", state)
        var subMap = WndsMap[state];
        if (!subMap) {
            //TLog.Error("WngMrg.showStateWindows no ui exsit with state:%d", state)
            return;
        }
        g_WndList.forEach(function (wnd) {
            var name = wnd.classname;
            var info = subMap[name];
            if (info) {
                wnd.hideWnd();
                if (info.mode == LOAD_RECYCLE_STATE) {
                    wnd.unLoadWnd();
                }
            }
        });
    };
    WngMrg.prototype.pushShowStatck = function (exceptPushList, exceptHideList) {
        if (this.stackList == null) {
            this.stackList = Queue_new();
        }
        var saveData = {};
        saveData.visibleList = {};
        Queue_push_first(this.stackList, saveData);
        exceptPushList = exceptPushList || []; //排除不需要结束时pop时恢复显示的界面
        exceptHideList = exceptHideList || []; //排除不需要进入时push时关闭的界面
        var copy_list = {};
        for (var name_1 in this.windows) {
            copy_list[name_1] = this.windows[name_1];
        }
        for (var name_2 in copy_list) {
            var window_1 = copy_list[name_2];
            if (window_1.isVisible() && window_1.info.common != true && table_isExsit(exceptPushList, window_1.classname) == false) {
                //saveData.visibleList[name] = window
                saveData.visibleList[window_1.hashCode] = window_1.getShowOrder();
            }
            if (table_isExsit(exceptHideList, window_1.classname) == false) {
                window_1._hideWnd(); //隐藏所有当前窗口
            }
        }
    };
    WngMrg.prototype.popShowStatck = function (exceptHideList) {
        //TLog.Assert(this.stackList)
        if (this.stackList == null) {
            return;
        }
        var sortWindowList = [];
        exceptHideList = exceptHideList || [];
        var saveData = Queue_pop_first(this.stackList);
        var copy_list = {};
        for (var name_3 in this.windows) {
            copy_list[name_3] = this.windows[name_3];
        }
        for (var name_4 in copy_list) {
            var window_2 = copy_list[name_4];
            if (!table_isExsit(exceptHideList, window_2.classname)) {
                window_2.hideWnd();
            }
            var order = saveData.visibleList[window_2.hashCode];
            if (order && window_2.isAutoStackReshow()) {
                JsUtil.arrayInstert(sortWindowList, [order, window_2]);
            }
        }
        if (sortWindowList.length > 0 && PrecedureManager.getInstance().getCurrentPrecedureId() == PRECEDURE_GAME) {
            var sortFunc = function (a, b) {
                return a[0] - b[0];
            };
            table_sort(sortWindowList, sortFunc);
            //按显示order排序再显示
            for (var _ = 0; _ < sortWindowList.length; _++) {
                var v = sortWindowList[_];
                var window_3 = v[1];
                window_3.showWnd(window_3.getRelateParent());
            }
        }
        if (Queue_empty(this.stackList)) {
            this.stackList = null;
        }
    };
    //手动清除已在UI栈中的窗体
    WngMrg.prototype.removeShowStatck = function (window) {
        if (!this.stackList || window == null) {
            return;
        }
        var saveData = Queue_pop_first(this.stackList);
        delete saveData.visibleList[window.hashCode];
        Queue_push_first(this.stackList, saveData);
    };
    return WngMrg;
}(TClass));
__reflect(WngMrg.prototype, "WngMrg");
//# sourceMappingURL=WngMrg.js.map