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
     类似GuideTipsFrame，但这个是通过Animbox的帧动画来表现
公共接口：
   
*/
var AnimTipsFrame = (function (_super) {
    __extends(AnimTipsFrame, _super);
    function AnimTipsFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnimTipsFrame.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.spacex = 100;
        this.spacey = 100;
        this.registEvent = false;
    };
    AnimTipsFrame.prototype.destory = function () {
        if (this.registEvent) {
            this.registEvent = false;
            UnRegisterEvent(EventDefine.UI_SHOW, this.onUISHowEvent, this);
        }
    };
    AnimTipsFrame.prototype.onLoad = function () {
        this.timerList = {};
        this.createFrame();
    };
    AnimTipsFrame.prototype.onUnLoad = function () {
    };
    AnimTipsFrame.prototype.onShow = function () {
        this.pointWindow = IGlobal.guiManager.getChildFromPath(this.pointWindowFullPath);
        this.addWindow = IGlobal.guiManager.getChildFromPath(this.addWindowFullPath);
        function tick(delay) {
            this.refreshFrame();
        }
        this.timerList["delayShow"] = SetTimer(tick, this, 200, false);
        this.mLayoutNode.visible = (true);
        this.refreshFrame();
    };
    AnimTipsFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = (false);
        if (this.guideType > 0) {
            //this.mLayoutNode.setDoModal(false, 10)
        }
        for (var _ in this.timerList) {
            var timer = this.timerList[_];
            KillTimer(timer);
        }
        this.timerList = {};
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    AnimTipsFrame.prototype.createFrame = function () {
        var width = 164, height = 116;
        var rdWidth = 300, rdHeight = 200;
        UiUtil.setWH(this.mLayoutNode, width, height);
        this.mElemList = {};
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.AnimBox, _a["name"] = "animbox", _a["title"] = null, _a["image"] = null, _a["color"] = gui.Color.white, _a["horizontalCenter"] = 0, _a["verticalCenter"] = 0, _a["w"] = 200, _a["h"] = 200, _a["event_name"] = null, _a["fun_index"] = null, _a["messageFlag"] = true, _a),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        this.mLayoutNode.setLayer(3 /* Top */);
        this.mLayoutNode.touchEnabled = false;
        this.mLayoutNode.touchChildren = false;
        this.mLayoutNode.includeInLayout = false;
        var _a;
        // this.mElemList["animbox"]:SubscribeEvent(gui.Window.DestoryEvent, this.onAnimBoxDesotry, this)
        // this.mElemList["animbox"]:Play()
    };
    AnimTipsFrame.prototype.setTipsData = function (param, window, parentWnd) {
        //附加的BaseWnd
        this.parentWnd = parentWnd;
        if (this.registEvent == false) {
            this.registEvent = true;
            RegisterEvent(EventDefine.UI_SHOW, this.onUISHowEvent, this);
        }
        this.animBoxName = param["animbox"];
        // if (!gb.anim_set.GetInfo(this.animBoxName)) {
        //     this.animBoxName = "guideFang"
        // }
        this.loop = param["loop"] || false;
        this.adp = param["adp"] || false;
        //TLog.Debug("AnimTipsFrame.setTipsData")
        var info = IGlobal.animSet.getAnimInfo(this.animBoxName);
        if (info == null) {
            return;
        }
        TLog.Assert(info != null, "AnimTipsFrame animBoxName:%s", tostring(this.animBoxName));
        this.animSpeed = param["animSpeed"] || info.interval;
        if (this.adp) {
            this.w = param["width"] || 0;
            this.h = param["height"] || 0;
        }
        else {
            this.w = param["width"] || info.w;
            this.h = param["height"] || info.h;
        }
        this.addWindow = window || null;
        this.guideType = param["guideType"] || 0;
        this.ox = param["offsetX"] || 0;
        this.oy = param["offsetY"] || 0;
        if ((param["pointingInfo"] || param["window"]) && GAME_DEBUG == false) {
            this.guideType = 0;
        }
        this.showTime = param["delayTime"] || 300;
        this.dir = 0;
        this.pointWindow = null;
        if (param["pointingInfo"]) {
            var windowName = param["pointingInfo"].windowName;
            var windowInfo = IGlobal.guiManager.getChildFromPath(windowName);
            if (param["pointingInfo"]["windowInfo"]) {
                var window_1 = UI_GetWindowByInfo(param["windowInfo"]);
                windowInfo = windowInfo || window_1;
            }
            this.pointWindow = windowInfo;
        }
        if (this.addWindow != null) {
            this.addWindowFullPath = IGlobal.guiManager.getPathFromChild(this.addWindow);
        }
        if (this.pointWindow) {
            this.pointWindowFullPath = IGlobal.guiManager.getPathFromChild(this.pointWindow);
        }
    };
    AnimTipsFrame.prototype.checkWindow = function (window) {
        if (window == null) {
            this.hideWnd();
            return false;
        }
        return true;
    };
    AnimTipsFrame.prototype.refreshFrame = function () {
        var animBox = this.mElemList["animbox"];
        var new_w = this.w;
        var new_h = this.h;
        animBox.setAnimName(this.animBoxName); //("guide_arrow_left")//(param[""])//
        animBox.setAnimInterval(this.animSpeed);
        //animBox.SetReverse(this.loop)
        animBox.setLoop(this.loop);
        //animBox.Play()
        //TLog.Debug("refreshFrame",this.spacex, this.spacey,OffsetX,OffsetY)
        if (this.pointWindow) {
            if (this.pointWindow.stage == null) {
                this.pointWindow = IGlobal.guiManager.getChildFromPath(this.pointWindowFullPath);
                if (this.checkWindow(this.pointWindow) == false)
                    return;
            }
            //TLog.Debug("pointWindow")
            var spacePoint = core.EgretUtil.nodeToStageXY(this.pointWindow, 0, 0);
            this.spacex = spacePoint.x + this.ox;
            this.spacey = spacePoint.y + this.oy;
            if (this.adp == true) {
                new_w = new_w + this.pointWindow.width;
                new_h = new_h + this.pointWindow.height;
            }
            UiUtil.setXY(this.mLayoutNode, this.spacex, this.spacey);
            this.guideType = 10;
            //this.mLayoutNode.SetLayer(gui.Window.LayerEffect)
        }
        if (this.addWindow) {
            if (this.addWindow.stage == null) {
                this.addWindow = IGlobal.guiManager.getChildFromPath(this.addWindowFullPath);
                if (this.checkWindow(this.addWindow) == false)
                    return;
            }
            //TLog.Debug("add Window")
            //TLog.Debug("add Window",this.frame.name(),this.addWindow.name())
            var baisx = 0;
            var baisy = 0;
            var parent_1 = this.addWindow;
            if (parent_1.addChild == null) {
                parent_1 = this.addWindow.parent;
                baisx = this.addWindow.x;
                baisy = this.addWindow.y;
            }
            if (parent_1 != null) {
                if (!parent_1.getChildByName(this.mLayoutNode.name)) {
                    parent_1.addChild(this.mLayoutNode);
                    //this.frame.SetLayer(gui.Window.LayerEffect)
                }
                if (this.adp == true) {
                    new_w = new_w + this.addWindow.width;
                    new_h = new_h + this.addWindow.height;
                }
                UiUtil.setXY(this.mLayoutNode, this.ox + baisx, this.oy + baisy);
            }
        }
        UiUtil.setWH(animBox, new_w, new_h);
        UiUtil.setWH(this.mLayoutNode, new_w, new_h);
        this.updateDir();
    };
    AnimTipsFrame.prototype.updateDir = function () {
        var animBox = this.mElemList["animbox"];
        animBox.anchorOffsetX = animBox.width / 2;
        animBox.anchorOffsetY = animBox.height / 2;
        animBox.rotation = this.dir;
    };
    AnimTipsFrame.prototype.onUISHowEvent = function (args) {
        if (args.window == this.parentWnd) {
            this.showWnd();
        }
    };
    return AnimTipsFrame;
}(BaseWnd));
__reflect(AnimTipsFrame.prototype, "AnimTipsFrame");
//# sourceMappingURL=AnimTipsFrame.js.map