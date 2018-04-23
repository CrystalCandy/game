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
    yangguiming
    
创建时间：
   2018.04.19(周四)

意图：
   提示式指引窗口
    可移动的帧动画（如果不设置moveTarget,作用与AnimTipsFrame一样）
公共接口：
   
*/
var MovableAnimTipsFrame = (function (_super) {
    __extends(MovableAnimTipsFrame, _super);
    function MovableAnimTipsFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MovableAnimTipsFrame.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.spacex = 100;
        this.spacey = 100;
        this.registEvent = false;
        this.bMoving = false;
    };
    MovableAnimTipsFrame.prototype.destory = function () {
        if (this.registEvent) {
            this.registEvent = false;
            UnRegisterEvent(EventDefine.UI_SHOW, this.onUISHowEvent, this);
        }
    };
    MovableAnimTipsFrame.prototype.onLoad = function () {
        this.timerList = {};
        this.createFrame();
    };
    MovableAnimTipsFrame.prototype.onUnLoad = function () {
    };
    MovableAnimTipsFrame.prototype.onShow = function () {
        function tick(delay) {
            if (this.bMoving == false) {
                this.refreshDockPos();
            }
            this.checkDockPos();
        }
        this.timerList["delayShow"] = SetTimer(tick, this, 200, false);
        this.mLayoutNode.visible = (true);
        this.bMoving = false;
        this.curTargetWindow = IGlobal.guiManager.getChildFromPath(this.curWindowPath);
        this.refreshAnim();
        this.refreshDockPos();
        this.checkDockPos();
    };
    MovableAnimTipsFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = (false);
        for (var _ in this.timerList) {
            var timer = this.timerList[_];
            KillTimer(timer);
        }
        this.timerList = {};
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    MovableAnimTipsFrame.prototype.createFrame = function () {
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
    MovableAnimTipsFrame.prototype.setTipsData = function (param, window, parentWnd) {
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
        this.curTargetWindow = window || null;
        //当前控件路径
        if (this.curTargetWindow != null) {
            this.srcWindowPath = IGlobal.guiManager.getPathFromChild(this.curTargetWindow);
            this.curWindowPath = this.srcWindowPath;
        }
        this.ox = param["offsetX"] || 0;
        this.oy = param["offsetY"] || 0;
        this.srcOx = this.ox;
        this.srcOy = this.oy;
        this.targetOx = param["targetOffsetX"] || 0;
        this.targetOy = param["targetOffsetY"] || 0;
        //目标控件路径
        this.targetWindowPath = param["moveTarget"] || "";
        var pathlist = splitString(this.targetWindowPath, "/");
        if (pathlist.length > 0) {
            var targetWindowName = pathlist[0];
            this.targetWnd = WngMrg.getInstance().getWindow(targetWindowName);
        }
        else {
            this.targetWnd = null;
        }
        this.moveTime = checkNull(param["moveTime"], 1000);
    };
    MovableAnimTipsFrame.prototype.refreshAnim = function () {
        var animBox = this.mElemList["animbox"];
        animBox.setAnimName(this.animBoxName); //("guide_arrow_left")//(param[""])//
        animBox.setAnimInterval(this.animSpeed);
        animBox.setLoop(this.loop);
    };
    MovableAnimTipsFrame.prototype.refreshDockPos = function () {
        var animBox = this.mElemList["animbox"];
        var new_w = this.w;
        var new_h = this.h;
        if (this.curTargetWindow) {
            if (this.curTargetWindow.stage == null) {
                this.curTargetWindow = IGlobal.guiManager.getChildFromPath(this.curWindowPath);
                if (this.curTargetWindow == null) {
                    //开始位置窗口隐藏了，这里也要关闭
                    if (this.curWindowPath == this.srcWindowPath) {
                        this.hideWnd();
                    }
                    return;
                }
            }
            //TLog.Debug("add Window")
            //TLog.Debug("add Window",this.frame.name(),this.addWindow.name())
            var baisx = 0;
            var baisy = 0;
            var parent_1 = this.curTargetWindow;
            if (parent_1.addChild == null) {
                parent_1 = this.curTargetWindow.parent;
                baisx = this.curTargetWindow.x;
                baisy = this.curTargetWindow.y;
            }
            if (parent_1 != null) {
                if (!parent_1.getChildByName(this.mLayoutNode.name)) {
                    parent_1.addChild(this.mLayoutNode);
                    //this.frame.SetLayer(gui.Window.LayerEffect)
                }
                if (this.adp == true) {
                    new_w = new_w + this.curTargetWindow.width;
                    new_h = new_h + this.curTargetWindow.height;
                }
                UiUtil.setXY(this.mLayoutNode, this.ox + baisx, this.oy + baisy);
            }
        }
        UiUtil.setWH(animBox, new_w, new_h);
        UiUtil.setWH(this.mLayoutNode, new_w, new_h);
        animBox.anchorOffsetX = animBox.width / 2;
        animBox.anchorOffsetY = animBox.height / 2;
    };
    MovableAnimTipsFrame.prototype.checkDockPos = function () {
        if (this.targetWnd == null)
            return;
        //移动过程中，父类关闭了
        if (this.bMoving) {
            if (this.curTargetWindow && this.curTargetWindow.stage == null) {
                this.curTargetWindow = IGlobal.guiManager.getChildFromPath(this.curWindowPath);
                if (this.curTargetWindow == null) {
                    if (this.curWindowPath == this.targetWindowPath) {
                        this.startMoveToTarget(this.srcWindowPath, this.srcOx, this.srcOy); //回到原来控件
                    }
                    else {
                        this.hideWnd();
                    }
                }
            }
            return;
        }
        if (this.targetWnd.isVisible() && this.targetWnd.isLoadComplete()) {
            this.startMoveToTarget(this.targetWindowPath, this.targetOx, this.targetOy); //移到目标位置
        }
        else {
            this.startMoveToTarget(this.srcWindowPath, this.srcOx, this.srcOy); //回到原来控件
        }
    };
    MovableAnimTipsFrame.prototype.startMoveToTarget = function (path, offsetX, offsetY) {
        if (this.curWindowPath == path)
            return;
        this.ox = offsetX;
        this.oy = offsetY;
        //let curWindow = <egret.DisplayObjectContainer>IGlobal.guiManager.getChildFromPath(this.curWindowPath)
        var targetWindow = IGlobal.guiManager.getChildFromPath(path);
        if (targetWindow == null) {
            TLog.Error("MovableAnimTipsFrame %s not exsit", path);
            return;
        }
        var node = this.mLayoutNode;
        TLog.Assert(node.parent != null);
        //开始位置
        var startPos = null;
        if (gui.GuiManager.getInstance().isRootNode(node.parent) == true) {
            startPos = new egret.Point(node.x, node.y);
        }
        else {
            startPos = core.EgretUtil.nodeToStageXY(node, 0, 0);
        }
        //目标位置
        var endPos = core.EgretUtil.nodeToStageXY(targetWindow, this.ox, this.oy);
        if (node.parent) {
            node.parent.removeChild(node);
            gui.GuiManager.getInstance().setNodeLayer(node, 3 /* Top */);
        }
        egret.Tween.removeTweens(node);
        egret.Tween.get(node).set({ x: startPos.x, y: startPos.y }).to({ x: endPos.x, y: endPos.y }, this.moveTime).call(this.onMoveToComplete, this, []);
        this.bMoving = true;
        this.curWindowPath = path;
        this.curTargetWindow = targetWindow;
    };
    MovableAnimTipsFrame.prototype.onMoveToComplete = function () {
        this.bMoving = false;
        this.refreshDockPos();
    };
    MovableAnimTipsFrame.prototype.onUISHowEvent = function (args) {
        if (args.window == this.parentWnd) {
            this.showWnd();
        }
    };
    return MovableAnimTipsFrame;
}(BaseWnd));
__reflect(MovableAnimTipsFrame.prototype, "MovableAnimTipsFrame");
//# sourceMappingURL=MovableAnimTipsFrame.js.map