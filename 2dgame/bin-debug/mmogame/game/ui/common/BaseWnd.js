// TypeScript file
/*
作者:
    yangguiming
    
创建时间：
   2016.12.23(周五)

意图：
   1.窗口加载onLoad不是同步的，需要等待布局文件下载并解析后才执行。
   2.窗口不要额外添加接口，统一使用doCommand，此函数会在窗口加载完成后才执行

公共接口：
    ------------------------------------------------
    --BaseWnd接口
    --BaseWnd.showWnd = function(self)
    --BaseWnd.hideWnd = function(self)
    --BaseWnd.loadWnd = function(self)
    --BaseWnd.unLoadWnd = function(self)
    --BaseWnd.isVisible = function(self)
    --BaseWnd.isLoadComplete = function(self)
    
    --必须继承
    public initObj(...params:any[]){
    public onLoad():void{
    public onUnLoad():void{
    public onShow():void{
    public onHide():void{
    
    
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
/*模版类
class TemplateFrame extends BaseWnd{
    public initObj(...params:any[]){
        this.mLayoutPaths = ["layouts/MainMenuLayout.exml"]
    }

    public onLoad():void{
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true)
        this.initSkinElemList();

        var elemInfo = [
            { ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            { ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
    }

    public onUnLoad():void{

    }

    public onShow():void{
        this.mLayoutNode.visible = true;
    }

    public onHide():void{
        this.mLayoutNode.visible = false;
    }
}






//使用标签分页 UITabWndList模版
class TemplateTabFrame extends BaseWnd {

    emptyView: UIEmptyView;
    tabWndList: UITabWndList;
    tabIndex: number;

    public initObj(...params: any[]) {
        this.mLayoutPaths = ["layouts/EquipFactoryLayout.exml"]
        this.tabIndex = -1;
    }

    public onLoad(): void {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.initSkinElemList();
        this.setAlignCenter(true, true)

        let tabInfoList = [
            { name: "tab1", wnd: EquipFactory_EnhanceWnd.newObj(this.mLayoutNode, this) },
            { name: "tab2", wnd: EquipFactory_IdentWnd.newObj(this.mLayoutNode, this) },
            { name: "tab3", wnd: EquipFactory_ChongSuoWnd.newObj(this.mLayoutNode, this) },
            { name: "tab4", wnd: EquipFactory_InhertWnd.newObj(this.mLayoutNode, this) },
        ]
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList)
    }


    public onUnLoad(): void {

    }

    public onShow(): void {
      
        this.mLayoutNode.visible = true;
        this.tabWndList.setWndVisible(true);
        if (this.tabIndex != -1) {
            this.tabWndList.changeTabWithIndex(this.tabIndex)
        }

    }

    public onHide(): void {
       
        this.mLayoutNode.visible = false;
        this.tabWndList.setWndVisible(false);
    }


    ////////////////////////////////////////////////////////////////////////////////////
    //以0开头，0是第一个标签
    showWithIndex(index?) {
        if (index == null) {
            index = 0
        }
        this.tabIndex = index;
        this.showWnd();
    }
}

*/
var ORDER_SEED = 100;
var g_WndList = [];
var g_FullScreenRegisterMap = {};
var BaseWnd = (function (_super) {
    __extends(BaseWnd, _super);
    function BaseWnd() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.info = null; //
        return _this;
    }
    // public constructor(){
    // 	super();
    // }
    BaseWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.info = params[0];
        //this.mParentLayer = IGlobal.guiManager.getLayerNode();
        this.mParentLayer = null;
        this.mbLoad = false;
        this.mbLoadComplete = false;
        this.mCommandList = null;
        this.mVisible = false;
        this.mLayoutNodeList = null;
        this.mShowOrder = -1;
        this.mLayoutNode = null;
        //子类需要重载的变量
        this.mLayoutPaths = null;
        this.mElemList = null;
        this.mbModal = false;
        this.mParentWnd = null;
        this.relateWndList = [];
        this.bHideRelateWnd = true;
        this.bAutoReshow = true;
        this.mLoadedCallbackList = [];
        JsUtil.arrayInstert(g_WndList, this);
        this.mAnimTipsWndList = [];
        this.mDotTipsWndList = [];
        this.mbFireUIEvent = true;
        if (this.info) {
            if (this.info.uievent != null) {
                this.mbFireUIEvent = !!this.info.uievent;
            }
        }
    };
    BaseWnd.prototype.destory = function () {
        // if (this.mLayoutNode) {
        // 	this.mLayoutNode.removeFromtParent();
        // 	this.mLayoutNode = null;
        // }
        this.hideWnd();
        this.unLoadWnd();
        JsUtil.arrayRemoveVal(g_WndList, this);
    };
    //-------------------begin 覆盖函数----------------
    BaseWnd.prototype.onLoad = function () {
    };
    BaseWnd.prototype.onUnLoad = function () {
    };
    // public onLoadComplete():void{
    // }
    BaseWnd.prototype.onShow = function () {
    };
    BaseWnd.prototype.onHide = function () {
    };
    //-------------------end 覆盖函数----------------
    BaseWnd.prototype.loadWnd = function () {
        if (this.mbLoad == false) {
            this.mbLoad = true;
            TLog.Assert(this.mLayoutNode == null);
            this.mElemList = {};
            this.mLayoutNodeList = [];
            this.mDotTipsWndList = [];
            this.mAnimTipsWndList = [];
            this.mLayoutNode = this.createLayoutNode(this.classname);
            this.mLayoutNode.name = this.frameName || this.classname;
            if (this.mLayoutPaths == null || this.mLayoutPaths.length == 0) {
                this.loadComplete();
            }
            else {
                IGlobal.guiManager.loadLayoutAsyn(this.mLayoutPaths, this.loadComplete, this);
            }
        }
    };
    BaseWnd.prototype.loadComplete = function () {
        if (!this.mbLoad) {
            return;
        }
        if (this.mbLoadComplete)
            return;
        this.mbLoadComplete = true;
        this.onLoad();
        if (this.mVisible)
            this._onShow();
        this.updateCommandList();
        for (var _i = 0, _a = this.mLoadedCallbackList; _i < _a.length; _i++) {
            var info = _a[_i];
            info.callback.call(info.thisObj, this);
        }
        this.mLoadedCallbackList = [];
    };
    BaseWnd.prototype.unLoadWnd = function () {
        if (this.mbLoad) {
            this.mbLoad = false;
            this.mbLoadComplete = false;
            this.onUnLoad();
            this.mElemList = null;
            this.mDotTipsWndList = [];
            this.mAnimTipsWndList = [];
            this.mLoadedCallbackList = [];
            this.clearLayoutNodes();
        }
    };
    BaseWnd.prototype.clearLayoutNodes = function () {
        if (this.mLayoutNodeList != null) {
            this.mLayoutNodeList.forEach(function (node) {
                egret.Tween.removeTweens(node);
                node.removeFromtParent();
            });
            this.mLayoutNode = null;
            this.mLayoutNodeList = null;
        }
    };
    BaseWnd.prototype.setUiEventEnable = function (b) {
        this.mbFireUIEvent = b;
    };
    BaseWnd.prototype._fireUiEvent = function (eventname) {
        if (this.mbFireUIEvent) {
            FireEvent(eventname, UIShowEvent.newObj(this));
        }
    };
    BaseWnd.prototype._onShow = function () {
        this._fireUiEvent(EventDefine.UI_SHOW_START);
        this.onShow();
        //可能在刷新的时候调用了this.hideWnd
        if (this.mVisible == true) {
            this.switchDotTipsEvent(true);
            this.refreshDotTips();
            this._fireUiEvent(EventDefine.UI_SHOW);
        }
    };
    BaseWnd.prototype.showWnd = function (parentWnd) {
        //TLog.Debug("BaseWnd.showWnd",this.classname)
        if (this.mVisible == false) {
            //TLog.Debug("BaseWnd.showWnd",this.classname)
            this.mShowOrder = ORDER_SEED;
            ORDER_SEED = ORDER_SEED + 1;
            this.loadWnd();
            this.mVisible = true;
            if (this.mbLoadComplete) {
                this._onShow();
            }
        }
        //当前界面于显示状态才进行关联子、父界面的处理
        if (this.mVisible == true) {
            if (this.mParentWnd != parentWnd) {
                if (this.mParentWnd) {
                    this.mParentWnd.removeRelateChild(this);
                }
                this.mParentWnd = parentWnd;
                if (this.mParentWnd) {
                    this.mParentWnd.addRelateChild(this);
                }
            }
            //检查是不是存在循环
            if (parentWnd) {
                var parent_1 = this.getRelateParent();
                while (parent_1) {
                    if (parent_1 == this) {
                        TLog.Error("% showWnd loop", this.classname);
                        TLog.Throw();
                    }
                    parent_1 = parent_1.getRelateParent();
                }
            }
        }
    };
    BaseWnd.prototype._hideWnd = function () {
        if (this.mbLoad && this.isVisible()) {
            this.mVisible = false;
            this.clearCommand();
            if (this.mbLoadComplete) {
                this.onHide();
                this.switchDotTipsEvent(false);
                if (this.checkDotTipsTimer) {
                    KillTimer(this.checkDotTipsTimer);
                    this.checkDotTipsTimer = null;
                }
                this._fireUiEvent(EventDefine.UI_HIDE);
            }
            // 如果是用一次的
            if (this.info && this.info.mode == LOAD_RECYCLE) {
                this.unLoadWnd();
            }
        }
    };
    BaseWnd.prototype.hideWnd = function () {
        //TLog.Debug("BaseWnd.hideWnd",this.classname,this.mbLoad,this.isVisible(),this.mVisible)
        if (this.mbLoad && this.isVisible()) {
            //隐藏自己
            this._hideWnd();
            if (this.bHideRelateWnd) {
                //相关父窗口隐藏
                var parent_2 = this.getRelateParent();
                if (parent_2) {
                    parent_2.hideWnd();
                }
                //所有相关子窗口都隐藏
                for (var _ = 0; _ < this.relateWndList.length; _++) {
                    var wnd = this.relateWndList[_];
                    wnd.hideWnd();
                }
            }
        }
    };
    BaseWnd.prototype.pushShowWnd = function (name, bHideSelf) {
        if (bHideSelf) {
            this.hideWnd();
        }
        WngMrg.getInstance().showWindow(name, this.classname);
    };
    BaseWnd.prototype.popShowWnd = function () {
        if (this.mbLoad && this.isVisible()) {
            this._hideWnd();
            var parent_3 = this.getRelateParent();
            if (parent_3) {
                parent_3.showWnd(parent_3.getRelateParent());
            }
        }
    };
    BaseWnd.prototype.getRelateParent = function () {
        return this.mParentWnd;
    };
    BaseWnd.prototype.setHideRelateWnd = function (b) {
        this.bHideRelateWnd = b;
    };
    BaseWnd.prototype.addRelateChild = function (wnd) {
        if (table_isExsit(this.relateWndList, wnd) == false) {
            table_insert(this.relateWndList, wnd);
        }
    };
    BaseWnd.prototype.removeRelateChild = function (wnd) {
        table_remove(this.relateWndList, wnd);
    };
    BaseWnd.prototype.isAutoStackReshow = function () {
        return this.bAutoReshow;
    };
    BaseWnd.prototype.getShowOrder = function () {
        return this.mShowOrder;
    };
    BaseWnd.prototype.isVisible = function () {
        return this.mVisible;
    };
    BaseWnd.prototype.isLoadComplete = function () {
        return this.mbLoadComplete;
    };
    BaseWnd.prototype.createLayoutNode = function (name) {
        var node = new gui.LayoutNode;
        if (name != null) {
            node.name = name;
        }
        if (this.mParentLayer != null)
            this.mParentLayer.addChild(node);
        this.mLayoutNodeList.push(node);
        return node;
    };
    //////////////////////////////红点提示//////////////////////////////////////////////
    ////红点提示，如果参数是动态的，这里则需要返回具体的（例如当前伙伴，当前物品等等）
    BaseWnd.prototype.getDotTipsArgsImp = function (checkParam) {
        return null;
    };
    //自定义红点继承实现
    BaseWnd.prototype.refreshDotTipsImp = function () {
    };
    BaseWnd.prototype.switchDotTipsEvent = function (register) {
        var pathsToConfigList = GuideFuncSystem.getInstance().getConfigList(this.classname);
        if (pathsToConfigList == null) {
            return;
        }
        var eventMap = {};
        for (var path in pathsToConfigList) {
            var confgList = pathsToConfigList[path];
            for (var _ = 0; _ < confgList.length; _++) {
                var config = confgList[_];
                var eventList = GuideFuncSpace.GuideFuncEvent[config.checkEvent];
                if (eventList) {
                    for (var _1 = 0; _1 < eventList.length; _1++) {
                        var eventName = eventList[_1];
                        eventMap[eventName] = true; //事件登记是唯一的
                    }
                }
            }
        }
        if (register) {
            for (var eventName in eventMap) {
                var _ = eventMap[eventName];
                RegisterEvent(eventName, this.refreshDotTipsEvent, this);
            }
            RegisterEvent(EventDefine.GUIDE_FUNC_REFRESH, this.refreshDotTipsEvent, this);
        }
        else {
            for (var eventName in eventMap) {
                var _ = eventMap[eventName];
                UnRegisterEvent(eventName, this.refreshDotTipsEvent, this);
            }
            UnRegisterEvent(EventDefine.GUIDE_FUNC_REFRESH, this.refreshDotTipsEvent, this);
        }
    };
    //刷新红点
    BaseWnd.prototype.refreshDotTipsEvent = function (args) {
        if (this.checkDotTipsTimer != null)
            return;
        //let timerId = 0;
        var onTimerCallback = function (dt) {
            KillTimer(this.checkDotTipsTimer);
            this.checkDotTipsTimer = null;
            this.refreshDotTips();
        };
        this.checkDotTipsTimer = SetTimer(onTimerCallback, this, 1000);
    };
    //刷新红点
    BaseWnd.prototype.refreshDotTips = function () {
        if (this.mLayoutNode == null || GAME_MODE != GAME_NORMAL) {
            return;
        }
        //游戏登陆会有大量重复刷新操作，这里先延迟统一处理
        // if(WngMrg.getInstance().isRefreshDotTipsLater() ){
        // 	return
        // }
        this.hideAllDotTipsUI();
        // if (!GuideSystem.getInstance().isFinishGuideClient()) {
        // 	return false
        // }
        this.refreshDotTipsImp();
        var pathsToConfigList = GuideFuncSystem.getInstance().getConfigList(this.classname);
        if (pathsToConfigList == null) {
            return false;
        }
        for (var path in pathsToConfigList) {
            var confgList = pathsToConfigList[path];
            //顶层窗口的，不处理，子类覆盖处理
            if (path != this.classname) {
                for (var _ = 0; _ < confgList.length; _++) {
                    var config = confgList[_];
                    var args = this.getDotTipsArgsImp(config.checkParam);
                    var bCheck = GuideFuncSystem.getInstance().checkFunc(config, args);
                    if (bCheck) {
                        var parentWnd = IGlobal.guiManager.getChildFromPath(path);
                        if (this.createAnimTipsUI(parentWnd, config) == false) {
                            this.createDotTipsUI(parentWnd); //有一个开启红点就够
                        }
                        //break
                    }
                }
            }
        }
    };
    BaseWnd.prototype.createDotTipsUI = function (parentWnd, autoDelete) {
        if (parentWnd == null) {
            return;
        }
        if (autoDelete == null)
            autoDelete = true;
        //let dotWnd = parentWnd.getChildByName("btnTips")  //this.getBtnTipsFrame(addName)
        var dotWnd = parentWnd["btnTips"];
        var elemList = {};
        if (!dotWnd) {
            var elemInfo = [
                (_a = {}, _a["index_type"] = eui.Image, _a["name"] = "btnTips", _a["title"] = "", _a["font"] = "ht_20_lc", _a["image"] = "zjm_hongDian01", _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["w"] = 40, _a["h"] = 40, _a["event_name"] = null, _a["fun_index"] = null, _a["messageFlag"] = true, _a),
            ];
            UiUtil.createElem(elemInfo, this.mLayoutNode, elemList, this, parentWnd);
            dotWnd = elemList["btnTips"];
            dotWnd._autoDelete = autoDelete;
            parentWnd["btnTips"] = dotWnd;
            JsUtil.arrayInstert(this.mDotTipsWndList, dotWnd);
        }
        var offx = 0;
        var offy = -5;
        //某些控件不是继承egret.DisplayObjectContainer
        if (dotWnd.parent == parentWnd) {
            dotWnd.right = offx;
            dotWnd.top = offy;
            //UiUtil.setXY(animWnd, offsetX, offsetY)
        }
        else {
            var parentW = parentWnd.width;
            var parentH = parentWnd.height;
            UiUtil.setXY(dotWnd, parentWnd.x + parentW - dotWnd.width + offx, parentWnd.y + offy);
        }
        dotWnd.visible = (true);
        var _a;
    };
    BaseWnd.prototype.createAnimTipsUI = function (parentWnd, config) {
        var showConfig = config.show;
        if (parentWnd == null || showConfig == null) {
            return false;
        }
        var animName = showConfig.animbox;
        TLog.Assert(animName != null);
        var info = IGlobal.animSet.getAnimSize(animName);
        var animW = info.w, animH = info.h;
        TLog.Assert(animW != 0 && animH != 0);
        var offsetX = showConfig.offsetX || 0;
        var offsetY = showConfig.offsetY || 0;
        var width = showConfig.width || 0;
        var height = showConfig.height || 0;
        var badp = showConfig.adp;
        var animSpeed = checkNull(showConfig.animSpeed, -1);
        //let animWnd: gui.AnimBox = <gui.AnimBox>parentWnd.getChildByName("btnAnimTips")  //this.getBtnTipsFrame(addName)
        var animWnd = parentWnd["btnAnimTips"]; //this.getBtnTipsFrame(addName)
        var elemList = {};
        if (!animWnd) {
            var elemInfo = [
                (_a = {}, _a["index_type"] = gui.AnimBox, _a["name"] = "btnAnimTips", _a["title"] = null, _a["font"] = null, _a["image"] = null, _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = null, _a["messageFlag"] = true, _a),
            ];
            UiUtil.createElem(elemInfo, this.mLayoutNode, elemList, this, parentWnd);
            animWnd = elemList["btnAnimTips"];
            parentWnd["btnAnimTips"] = animWnd;
            JsUtil.arrayInstert(this.mAnimTipsWndList, animWnd);
            animWnd.play();
        }
        animWnd.setAnimName(animName);
        if (animSpeed != -1) {
            animWnd.setAnimInterval(animSpeed);
        }
        if (animWnd.parent == parentWnd) {
            UiUtil.setXY(animWnd, offsetX, offsetY);
        }
        else {
            UiUtil.setXY(animWnd, parentWnd.x + offsetX, parentWnd.y + offsetY);
        }
        if (badp) {
            var parentW = parentWnd.width;
            var parentH = parentWnd.height;
            UiUtil.setWH(animWnd, parentW, parentH);
        }
        else {
            if (width == 0 || height == 0) {
                UiUtil.setWH(animWnd, animW, animH);
            }
            else {
                UiUtil.setWH(animWnd, width, height);
            }
        }
        animWnd.visible = (true);
        return true;
        var _a;
    };
    //createDotTipsUIByPath( path){
    //	let parentWnd = this.mRootWindow.GetChildFromPath(path, string.len(path))
    //	this.createDotTipsUI(parentWnd)
    //}
    //隐藏红点
    BaseWnd.prototype.hideAllDotTipsUI = function () {
        for (var _ in this.mDotTipsWndList) {
            var dotWnd = this.mDotTipsWndList[_];
            if (dotWnd._autoDelete == true)
                dotWnd.visible = (false);
        }
        for (var _ in this.mAnimTipsWndList) {
            var dotWnd = this.mAnimTipsWndList[_];
            dotWnd.visible = (false);
        }
    };
    BaseWnd.prototype.hideDotTipsUI = function (parentWnd) {
        if (parentWnd == null) {
            return;
        }
        var dotWnd = parentWnd["btnTips"]; //this.getBtnTipsFrame(addName)
        if (dotWnd) {
            dotWnd.visible = (false);
        }
        var animWnd = parentWnd["btnAnimTips"]; //this.getBtnTipsFrame(addName)
        if (animWnd) {
            animWnd.visible = (false);
        }
    };
    ////////////////////////////////////////////////////////////////-
    BaseWnd.prototype.setRootFrameName = function (frameName) {
        this.frameName = frameName;
    };
    BaseWnd.prototype.setRootLayer = function (node) {
        this.mParentLayer = node;
    };
    //游戏内全屏，保留上下边
    BaseWnd.prototype.setFullScreen = function (b, image) {
        if (image == null)
            image = true;
        if (b) {
            this.mLayoutNode.top = 50;
            this.mLayoutNode.bottom = 110;
            if (image)
                g_FullScreenRegisterMap[this.classname] = true;
        }
        else {
            this.mLayoutNode.percentWidth = NaN;
            this.mLayoutNode.percentHeight = NaN;
            delete g_FullScreenRegisterMap[this.classname];
        }
    };
    //真正的全屏
    BaseWnd.prototype.setFullScreenRaw = function (b) {
        if (b) {
            this.mLayoutNode.top = 0;
            this.mLayoutNode.bottom = 0;
            this.mLayoutNode.percentWidth = 100;
            this.mLayoutNode.percentHeight = 100;
        }
        else {
            this.mLayoutNode.percentWidth = NaN;
            this.mLayoutNode.percentHeight = NaN;
        }
    };
    //居中对齐
    BaseWnd.prototype.setAlignCenter = function (b, modal) {
        if (b) {
            this.mLayoutNode.horizontalCenter = 0;
            this.mLayoutNode.verticalCenter = 0;
        }
        else {
            this.mLayoutNode.horizontalCenter = NaN;
            this.mLayoutNode.verticalCenter = NaN;
        }
        if (modal == true) {
            this.mLayoutNode.setDoModal(true);
        }
        else {
            this.mLayoutNode.setDoModal(false);
        }
    };
    BaseWnd.prototype.initSkinElemList = function () {
        // let skin = this.mLayoutNode.skin;
        // if(skin){
        // 	var elemInfo:any[] =[]
        // 	for(let name of skin.skinParts){
        // 		elemInfo.push({ ["name"]: name, ["event_name"]: null, ["fun_index"]: null })
        // 	}
        // 	UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        // }
        //初始化皮肤，把所有的id控件存储在elemList里
        UiUtil.initElemWithComponent(this.mLayoutNode, this.mElemList, this);
    };
    //-------------------因为界面布局延迟，需要命令队列延迟执行----------------
    BaseWnd.prototype.doCommand = function (funcname, param1, param2) {
        if (this.mVisible == false || this.mbLoad == false)
            return;
        if (this.mbLoadComplete) {
            this.doCommandFunction(funcname, param1, param2);
            return;
        }
        if (!this.mCommandList)
            this.mCommandList = [];
        var commandObj = {};
        commandObj.funcname = funcname;
        commandObj.param1 = param1;
        commandObj.param2 = param2;
        this.mCommandList.push(commandObj);
    };
    BaseWnd.prototype.clearCommand = function () {
        this.mCommandList = null;
    };
    BaseWnd.prototype.updateCommandList = function () {
        var _this = this;
        if (this.mCommandList == null)
            return;
        var commandList = this.mCommandList;
        commandList.forEach(function (commandObj) {
            _this.doCommandFunction(commandObj.funcname, commandObj.param1, commandObj.param2);
        });
        this.mCommandList.length = 0; //清空命令列表
    };
    BaseWnd.prototype.doCommandFunction = function (funcname, param1, param2) {
        var fun = this[funcname];
        if (fun) {
            TLog.Assert(typeof fun == "function"); //一定是函数名
            fun.call(this, param1, param2);
        }
    };
    //加载成功后的回调
    BaseWnd.prototype.addLoadCallback = function (cb, obj) {
        this.mLoadedCallbackList.push({ callback: cb, thisObj: obj });
    };
    //监听listenWndName关闭时候，重新打开自己窗口
    BaseWnd.prototype.setReopenListenWnd = function (listenWndName) {
        if (listenWndName == null) {
            if (this.listenWndName) {
                this.listenWndName = null;
                UnRegisterEvent(EventDefine.UI_HIDE, this.onUIHideEvent, this);
            }
        }
        else {
            if (this.listenWndName == null) {
                RegisterEvent(EventDefine.UI_HIDE, this.onUIHideEvent, this);
            }
            this.listenWndName = listenWndName;
        }
    };
    BaseWnd.prototype.onUIHideEvent = function (args) {
        if (this.listenWndName == null) {
            return;
        }
        //自身是关闭状态，才会监听
        if (this.isVisible()) {
            return;
        }
        //正在活动中，不处理
        var wngMgr = WngMrg.getInstance();
        if (wngMgr.stackList != null) {
            this.setReopenListenWnd(null);
            return;
        }
        //不是游戏流程状态
        if (PrecedureManager.getInstance().getCurrentPrecedureId() != PRECEDURE_GAME) {
            this.setReopenListenWnd(null);
            return;
        }
        if (this.listenWndName == args.window.classname) {
            this.setReopenListenWnd(null);
            this.showWnd();
        }
    };
    return BaseWnd;
}(TClass));
__reflect(BaseWnd.prototype, "BaseWnd");
//# sourceMappingURL=BaseWnd.js.map