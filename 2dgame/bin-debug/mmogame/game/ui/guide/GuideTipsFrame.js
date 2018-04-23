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
     用于文字提示说明
公共接口：
   
*/
var GuideTipsFrame = (function (_super) {
    __extends(GuideTipsFrame, _super);
    function GuideTipsFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuideTipsFrame.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.content = "aaaaaaaaaaaaaaaaaa";
        this.max_w = 300;
        this.spacex = 100;
        this.spacey = 100;
        this.font = null;
        //this.createFrame()
        this.click = false;
        this.guideType = 0;
        this.pointWindow = null;
        //this.showTimer = null
        this.curTime = 0;
    };
    GuideTipsFrame.prototype.onLoad = function () {
        //this.setStateAutoShow(true)
        this.createFrame();
    };
    GuideTipsFrame.prototype.onUnLoad = function () {
    };
    GuideTipsFrame.prototype.onShow = function () {
        //TLog.Debug("GuideTipsFrame.onShow")
        this.mLayoutNode.visible = (true);
        if (this.guideType > 0) {
            this.mLayoutNode.setDoModal(true, 10);
        }
        this.refreshFrame();
    };
    GuideTipsFrame.prototype.fightEndShowFrame = function (args) {
        if (args.stateType == state_type.COMBAT_BASE_STATE) {
            // if (this.showTimer == null) {
            //     this.showTimer = SetTimer(this.onShowTimer, this, 20, true)
            // }
            this.mLayoutNode.visible = (true);
            if (this.guideType > 0) {
                this.mLayoutNode.setDoModal(true, 10);
            }
            this.refreshFrame();
        }
    };
    GuideTipsFrame.prototype.onHide = function () {
        TLog.Debug("GuideTipsFrame.onHide");
        this.mLayoutNode.visible = (false);
        if (this.guideType > 0) {
            this.mLayoutNode.setDoModal(false, 10);
        }
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    GuideTipsFrame.prototype.createFrame = function () {
        var width = 164, height = 116;
        var rdWidth = 300, rdHeight = 200;
        UiUtil.setWH(this.mLayoutNode, width, height);
        this.mElemList = {};
        var mElemInfo = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = "bg_arrow", _a["x"] = 0, _a["y"] = 0, _a["w"] = 34, _a["h"] = 30, _a),
            (_b = {}, _b["index_type"] = eui.Image, _b["name"] = "icon_arrow", _b["parent"] = "bg_arrow", _b["image"] = "zhiYinTiShiKuang01", _b["verticalCenter"] = 0, _b["horizontalCenter"] = 0, _b["w"] = 34, _b["h"] = 30, _b),
            (_c = {}, _c["index_type"] = gui.Grid9Image, _c["name"] = "bg", _c["title"] = null, _c["font"] = "ht_20_cc", _c["image"] = "zhiYinTiShiKuang02", _c["color"] = gui.Color.springgreen, _c["x"] = 0, _c["y"] = 0, _c["w"] = rdWidth, _c["h"] = rdHeight, _c["event_name"] = null, _c["fun_index"] = null, _c),
            (_d = {}, _d["index_type"] = gui.RichDisplayer, _d["name"] = "content", _d["parent"] = "bg", _d["title"] = null, _d["font"] = "ht_20_cc", _d["image"] = "", _d["color"] = gui.Color.springgreen, _d["x"] = 5, _d["y"] = 5, _d["w"] = rdWidth, _d["h"] = rdHeight, _d["event_name"] = null, _d["fun_index"] = null, _d),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        this.mLayoutNode.touchEnabled = false;
        this.mLayoutNode.touchChildren = false;
        var imgArrow = this.mElemList["icon_arrow"];
        imgArrow.anchorOffsetX = imgArrow.width / 2;
        imgArrow.anchorOffsetY = imgArrow.height / 2;
        var _a, _b, _c, _d;
    };
    GuideTipsFrame.prototype.setTipsData = function (param, window) {
        this.content = param["content"] || null;
        this.max_w = param["content_w"] || 200;
        this.ox = param["offsetX"] || 0;
        this.oy = param["offsetY"] || 0;
        this.font = param["font"] || "ht_20_cc";
        this.addWindow = null;
        this.pointWindow = null;
        this.guideType = param["guideType"] || 0;
        this.dir = param["dir"] || "left";
        //TLog.Debug("setTipsData")
        if (window) {
            this.addWindow = window;
        }
        else if (param["pointingInfo"]) {
            var windowInfo = void 0;
            if (param["windowInfo"]) {
                var window_1 = UI_GetWindowByInfo(param["windowInfo"]);
                if (!window_1) {
                    TLog.Error("windowInfo Error  window can't find ");
                    return;
                }
                windowInfo = window_1;
            }
            else {
                var windowName = param["pointingInfo"].windowName;
                windowInfo = IGlobal.guiManager.getChildFromPath(windowName);
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
    GuideTipsFrame.prototype.checkWindow = function (window) {
        if (window == null) {
            this.hideWnd();
            return false;
        }
        return true;
    };
    GuideTipsFrame.prototype.refreshFrame = function () {
        //TLog.Debug("GuideTipsFrame.refreshFrame")
        if (!this.content) {
            this.hideWnd();
            return;
        }
        var bg = this.mElemList["bg"];
        var rd = this.mElemList["content"];
        var bg_arrow = this.mElemList["bg_arrow"];
        var icon_arrow = this.mElemList["icon_arrow"];
        rd.width = this.max_w;
        AddRdContent(rd, this.content, this.font, "black", 2);
        var new_w = Math.max(rd.getLogicWidth(), 50);
        var new_h = Math.max(rd.getLogicHeight(), 50);
        UiUtil.setWH(rd, new_w + 5, new_h + 5);
        //TLog.Debug("new_h",new_w,new_h,this.frame.GetX(),this.frame.GetY(),this.frame.width)
        //this.frame.SetXY(this.spacex, this.spacey)
        var wnd_w = new_w + 15;
        var wnd_h = new_h + 15;
        if (wnd_h < 35) {
            wnd_h = 35;
        }
        UiUtil.setWH(bg, wnd_w, wnd_h); //这时是bg的宽高
        if (this.dir == "top") {
            UiUtil.setXY(bg, 0, 30);
            wnd_w = wnd_w;
            wnd_h = wnd_h + 30;
            var arrw = bg_arrow.width;
            var arrh = bg_arrow.height;
            UiUtil.setXY(bg_arrow, (wnd_w - arrw) / 2, 3);
            icon_arrow.rotation = 180;
        }
        else if (this.dir == "left") {
            UiUtil.setXY(bg, 30, 0);
            wnd_w = wnd_w + 30;
            wnd_h = wnd_h;
            var arrw = bg_arrow.width;
            var arrh = bg_arrow.height;
            UiUtil.setXY(bg_arrow, 3, (wnd_h - arrh) / 2);
            icon_arrow.rotation = 90;
        }
        else if (this.dir == "right") {
            UiUtil.setXY(bg, 0, 0);
            wnd_w = wnd_w + 30;
            wnd_h = wnd_h;
            var arrw = bg_arrow.width;
            var arrh = bg_arrow.height;
            UiUtil.setXY(bg_arrow, wnd_w - arrw - 3, (wnd_h - arrh) / 2);
            icon_arrow.rotation = 270;
        }
        else {
            UiUtil.setXY(bg, 0, 0);
            wnd_w = wnd_w;
            wnd_h = wnd_h + 30;
            var arrw = bg_arrow.width;
            var arrh = bg_arrow.height;
            UiUtil.setXY(bg_arrow, (wnd_w - arrw) / 2, wnd_h - arrh - 3);
            icon_arrow.rotation = 0;
        }
        UiUtil.setWH(this.mLayoutNode, wnd_w, wnd_h);
        //TLog.Debug("GuideTipsFrame.refreshFrame  111111111")
        if (this.addWindow) {
            if (this.addWindow.stage == null) {
                this.addWindow = IGlobal.guiManager.getChildFromPath(this.addWindowFullPath);
                if (this.checkWindow(this.addWindow) == false)
                    return;
            }
            this.addWindow.addChild(this.mLayoutNode);
            UiUtil.setXY(this.mLayoutNode, this.ox, this.oy);
        }
        else if (this.pointWindow) {
            if (this.pointWindow.stage == null) {
                this.pointWindow = IGlobal.guiManager.getChildFromPath(this.pointWindowFullPath);
                if (this.checkWindow(this.pointWindow) == false)
                    return;
            }
            var spacePoint = core.EgretUtil.nodeToStageXY(this.pointWindow, 0, 0);
            this.spacex = spacePoint.x + this.ox;
            this.spacey = spacePoint.y + this.oy;
            UiUtil.setXY(this.mLayoutNode, this.spacex, this.spacey);
        }
    };
    return GuideTipsFrame;
}(BaseWnd));
__reflect(GuideTipsFrame.prototype, "GuideTipsFrame");
//# sourceMappingURL=GuideTipsFrame.js.map