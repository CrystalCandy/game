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
   2013.10.31(周四)

意图：
   提示式指引窗口

公共接口：
   
*/
var GuideMaskFrame = (function (_super) {
    __extends(GuideMaskFrame, _super);
    function GuideMaskFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuideMaskFrame.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.spacex = 100;
        this.spacey = 100;
        this.w = 100;
        this.h = 100;
        this.ox = 0;
        this.oy = 0;
        this.showTimer = null;
        this.curTime = 0;
        this.window = null;
        this.isNoHandle = null;
        this.noTick = false;
        this.shapeType = GuideMaskFrame.ShapeType_Circle;
    };
    GuideMaskFrame.prototype.onLoad = function () {
        var width = 100, height = 100;
        UiUtil.setWH(this.mLayoutNode, width, height);
        this.mLayoutNode.setDoModal(true, 10);
        this.mLayoutNode.setDoModalMask(true);
        //this.setAlignCenter(true, true)
        // this.mElemList = {}
        // let mElemInfo: any = [
        //     { ["index_type"]: gui.Grid9Image, ["name"]: "bg", ["title"]: null, ["image"]: "ty_UIBg08", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["percentWidth"]: 50, ["percentHeight"]: 50, ["event_name"]: null, ["fun_index"]: null, ["messageFlag"]: true },
        //     //{["index_type"] : gui.ControlType.AnimBox,	["name"] : "animbox",  	["title"] : null,   ["image"] : null,	["color"] : gui.Color.white,		["x"] : 0, ["y"] : 0,		 	["w"] : 200,["h"] : 200, ["event_name"] : null, ["fun_index"] : null,["bAdapteWindow"]:true},
        // ]
        // UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this)
        // let maskIcon:egret.Shape = new egret.Shape();
        // maskIcon.graphics.beginFill(0x000000, 1);
        // maskIcon.graphics.drawCircle(width / 2, height/2, 50);
        // maskIcon.graphics.endFill();
        // this.mLayoutNode.addChild(maskIcon);
    };
    GuideMaskFrame.prototype.onUnLoad = function () {
        this.clearUpdateTimer();
    };
    GuideMaskFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.STATE_ACTIVE, this.fightHideFrame, this);
        RegisterEvent(EventDefine.STATE_DEACTIVE, this.fightEndShowFrame, this);
        RegisterEvent(EventDefine.UI_SHOW, this.onShowEventFunc, this);
        RegisterEvent(EventDefine.UI_HIDE, this.onHideEventFunc, this);
        UiUtil.registerTouchOutsideEvent(this.onClickDown, this, [this.mLayoutNode], true);
        this.mLayoutNode.visible = (true);
        this.setUpdateTimer();
        this.setClickTimer();
        this.setCheckTimer(); //可能布局未加载完，需要定时器刷新
        this.needSecondShow = true;
    };
    GuideMaskFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.STATE_ACTIVE, this.fightHideFrame, this);
        UnRegisterEvent(EventDefine.STATE_DEACTIVE, this.fightEndShowFrame, this);
        UnRegisterEvent(EventDefine.UI_SHOW, this.onShowEventFunc, this);
        UnRegisterEvent(EventDefine.UI_HIDE, this.onHideEventFunc, this);
        UiUtil.unRegisterTouchOutsideEvent(this.onClickDown, this);
        this.mLayoutNode.visible = (false);
        this.clearUpdateTimer();
        this.clearClickTimer();
        this.clearCheckTimer();
    };
    GuideMaskFrame.prototype.setUpdateTimer = function () {
        this.clearUpdateTimer();
        this.showTimer = SetTimer(this.onShowTimer, this, 10, true);
    };
    GuideMaskFrame.prototype.clearUpdateTimer = function () {
        if (this.showTimer) {
            KillTimer(this.showTimer);
            this.showTimer = null;
        }
        this.curTime = 0;
    };
    GuideMaskFrame.prototype.setClickTimer = function () {
        this.clearClickTimer();
        SetGlobalInputStatus(false, this.frameName);
        var clickTimerFunc = function () {
            this.clearClickTimer();
        };
        this.inputTimer = SetTimer(clickTimerFunc, this, 500);
    };
    GuideMaskFrame.prototype.clearClickTimer = function () {
        SetGlobalInputStatus(true, this.frameName);
        if (this.inputTimer) {
            KillTimer(this.inputTimer);
            this.inputTimer = null;
        }
    };
    GuideMaskFrame.prototype.setCheckTimer = function () {
        this.clearCheckTimer();
        function checkFunc(dt) {
            if (this.showTimer != null)
                return;
            var lastSpaceX = this.spacex;
            var lastSpaceY = this.spacey;
            if (this.refreshPosition() == false) {
                return;
            }
            if (lastSpaceX != this.spacex || lastSpaceY != this.spacey) {
                this.refreshFrame(1);
            }
        }
        this.checkTimer = SetTimer(checkFunc, this, 500);
    };
    GuideMaskFrame.prototype.clearCheckTimer = function () {
        if (this.checkTimer) {
            KillTimer(this.checkTimer);
            this.checkTimer = null;
        }
    };
    GuideMaskFrame.prototype.setTipsData = function (param, window, rootWndName) {
        TLog.Debug("AnimTipsFrame.setTipsData");
        this.w = checkNull(param["width"], 100);
        this.h = checkNull(param["height"], 100);
        this.window = null;
        this.ox = param["offsetX"] || 0;
        this.oy = param["offsetY"] || 0;
        this.isNoHandle = param["noHandle"] || null;
        // if (param["ImageType"]) {
        //     this.bgImage = param["ImageType"]
        // }
        if (param["shapeType"]) {
            this.shapeType = param["shapeType"];
        }
        if (window) {
            //TLog.Debug("window:",window.name())
            this.window = window;
            this.windowFulPath = IGlobal.guiManager.getPathFromChild(this.window);
            this.w = window.width + (param["width"] || 0);
            this.h = window.height + (param["height"] || 0);
        }
        else {
            this.spacex = this.ox;
            this.spacey = this.oy;
        }
        this.addSide = 1800;
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    GuideMaskFrame.prototype.onShowTimer = function (dt) {
        this.curTime = this.curTime + dt;
        if (this.noTick) {
            return;
        }
        this.refreshFrame(this.curTime / 300);
    };
    //////////////////
    GuideMaskFrame.prototype.drawMaskGraph = function (w, h, x, y) {
        x = Math.floor(x);
        y = Math.floor(y);
        var maskIcon = this.mMaskIcon;
        if (this.mMaskIcon == null) {
            this.mMaskIcon = new egret.Shape();
            this.mLayoutNode.addChild(this.mMaskIcon);
            maskIcon = this.mMaskIcon;
        }
        var halfW = Math.floor(w / 2), halfH = Math.floor(h / 2);
        maskIcon.graphics.clear();
        maskIcon.graphics.beginFill(0x000000, 1);
        if (GuideMaskFrame.ShapeType_Rect == this.shapeType) {
            maskIcon.graphics.drawRect(0, 0, w, h); //绘制方形
        }
        else {
            maskIcon.graphics.drawCircle(halfW, halfH, halfW); //绘制图形
        }
        maskIcon.graphics.endFill();
        //mLayoutNode的描点是中心，所以x,y值的是mLayouNode的中心
        UiUtil.setWH(this.mLayoutNode, w, h);
        UiUtil.setXY(this.mLayoutNode, x, y);
        this.mLayoutNode.anchorOffsetX = halfW;
        this.mLayoutNode.anchorOffsetY = halfH;
    };
    GuideMaskFrame.prototype.checkWindow = function (window) {
        if (window == null) {
            this.hideWnd();
            return false;
        }
        return true;
    };
    GuideMaskFrame.prototype.refreshPosition = function () {
        if (this.window) {
            if (this.window.stage == null) {
                this.window = IGlobal.guiManager.getChildFromPath(this.windowFulPath);
                if (this.checkWindow(this.window) == false)
                    return false;
            }
            var point = core.EgretUtil.nodeToStageXY(this.window, this.window.width / 2, this.window.height / 2);
            this.spacex = point.x + this.ox;
            this.spacey = point.y + this.oy;
            // this.spacex = this.spacex - this.mRootWindow.width / 2
            // this.spacey = this.spacey - this.mRootWindow.height / 2
            //TLog.Debug("window",this.window.name(), this.spacex,this.spacey,point.x,point.y)
        }
        return true;
    };
    GuideMaskFrame.prototype.refreshFrame = function (timePercent) {
        if (this.refreshPosition() == false) {
            return;
        }
        var new_w = this.w;
        var new_h = this.h;
        var pos_x = this.spacex + 1;
        var pos_y = this.spacey + 1;
        if (timePercent >= 1) {
            timePercent = 1;
            this.needSecondShow = true;
            this.clearUpdateTimer();
        }
        if (timePercent <= 1) {
            new_w = this.w + (this.addSide) * (1 - timePercent);
            new_h = this.h + (this.addSide) * (1 - timePercent);
            this.mLayoutNode.moveToFront();
        }
        this.drawMaskGraph(new_w - 2, new_h - 2, pos_x, pos_y);
    };
    GuideMaskFrame.prototype.onClickDown = function (args) {
        if (WngMrg.getInstance().getWindow("DramaTipsFrame").isVisible() == true) {
            return;
        }
        if (this.needSecondShow) {
            this.needSecondShow = false;
            this.curTime = 0;
            this.setUpdateTimer();
            this.setClickTimer();
        }
    };
    GuideMaskFrame.prototype.fightHideFrame = function (args) {
        if (args.stateType == state_type.COMBAT_BASE_STATE || args.stateType == state_type.LIVE_STORY_STATE) {
            //TLog.Debug("GuideMaskFrame.fightHideFrame")
            this.mLayoutNode.visible = (false);
            this.clearUpdateTimer();
        }
    };
    GuideMaskFrame.prototype.fightEndShowFrame = function (args) {
        if (args.stateType == state_type.COMBAT_BASE_STATE) {
            this.setUpdateTimer();
            this.mLayoutNode.visible = (true);
            //this.mLayoutNode.SubscribeEvent(gui.Window.DoModalScreenEvent, this.onClickDoModel,this)	  
        }
    };
    GuideMaskFrame.prototype.onShowEventFunc = function (args) {
        if (args.window.classname == "ConfirmFrame") {
            this.noTick = true;
        }
    };
    GuideMaskFrame.prototype.onHideEventFunc = function (args) {
        if (args.window.classname == "ConfirmFrame") {
            this.noTick = false;
        }
    };
    GuideMaskFrame.ShapeType_Circle = "circle";
    GuideMaskFrame.ShapeType_Rect = "rect";
    return GuideMaskFrame;
}(BaseWnd));
__reflect(GuideMaskFrame.prototype, "GuideMaskFrame");
//# sourceMappingURL=GuideMaskFrame.js.map