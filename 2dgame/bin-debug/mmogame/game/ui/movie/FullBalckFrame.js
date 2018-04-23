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
lintianfeng

创建时间：
2014.2.18(周二)

意图：


公共接口：

*/
var FullBalckFrame = (function (_super) {
    __extends(FullBalckFrame, _super);
    function FullBalckFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FullBalckFrame.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mElemList = {};
        this.gradualChange = null;
        this.callBackFunc = null;
        this.callBackObj = null;
        this.blackTime = 200;
        this.saveHideTime = 200;
    };
    FullBalckFrame.prototype.onLoad = function () {
        this.create_frame();
    };
    FullBalckFrame.prototype.onUnLoad = function () {
        //this.bgAlphaChange2 = null
    };
    FullBalckFrame.prototype.onShow = function () {
        //TLog.Debug("FullBalckFrame.onShow",this.gradualChange)	
        //TLog.Debug("FullBalckFrame.onShow",this.showCount,this.gradualChange)
        this.mLayoutNode.visible = (true);
        if (this.gradualChange) {
            this.mLayoutNode.alpha = 0;
            //TLog.Debug("FullBalckFrame.onShow",22222222222222222)		
            this.bgAlphaChang1.run();
        }
        else {
            this.mLayoutNode.alpha = 1;
        }
    };
    FullBalckFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = (false);
    };
    FullBalckFrame.prototype.create_frame = function () {
        this.setFullScreen(true);
        this.mLayoutNode.setLayer(3 /* Top */);
        var ElemInfo = [
            (_a = {}, _a["index_type"] = eui.Rect, _a["name"] = "wnd", _a["color"] = gui.Color.black, _a["alpha"] = 1, _a["x"] = 0, _a["y"] = 0, _a["percentWidth"] = 100, _a["percentHeight"] = 100, _a["event_name"] = null, _a["fun_index"] = null, _a["touchChildren"] = true, _a),
        ];
        UiUtil.createElem(ElemInfo, this.mLayoutNode, this.mElemList, this);
        this.mLayoutNode.touchChildren = false;
        var data1 = (_b = {}, _b["alpha"] = 255, _b);
        this.bgAlphaChang1 = AlphaAction.newObj(this.mLayoutNode, this.blackTime, data1, this.refreshFrame, this);
        var data2 = (_c = {}, _c["alpha"] = 0, _c);
        this.bgAlphaChange2 = AlphaAction.newObj(this.mLayoutNode, this.blackTime, data2, this.onChangeEnd, this);
        var _a, _b, _c;
    };
    FullBalckFrame.prototype.refreshFrame = function () {
        if (this.callBackFunc) {
            this.callBackFunc.call(this.callBackObj);
            this.callBackFunc = null;
            this.callBackObj = null;
        }
    };
    FullBalckFrame.prototype.onCloseFrame = function () {
        this.mLayoutNode.visible = (false);
        this.gradualChange = null;
    };
    FullBalckFrame.prototype.fastFinishAlphaChange = function () {
        //TLog.Debug("FullBalckFrame.fastFinishAlphaChange",this.bgAlphaChang1,this.bgAlphaChang2)
        if (this.bgAlphaChang1 && this.bgAlphaChang1.isRunning()) {
            this.bgAlphaChang1.finish();
        }
        if (this.bgAlphaChange2 && this.bgAlphaChange2.isRunning()) {
            this.bgAlphaChange2.finish();
        }
    };
    FullBalckFrame.prototype.playAlphaChange = function (index) {
        if (index == 2 && this.gradualChange) {
            //TLog.Debug("FullBalckFrame.playAlphaChange",22222222222222222)	
            if (!this.mLayoutNode) {
                this.showWnd();
            }
            this.mLayoutNode.alpha = 1;
            var data2 = (_a = {}, _a["alpha"] = 0, _a);
            var time = this.saveHideTime || 200;
            this.bgAlphaChange2 = AlphaAction.newObj(this.mLayoutNode, time, data2, this.onChangeEnd, this);
            this.bgAlphaChange2.run();
        }
        var _a;
    };
    FullBalckFrame.prototype.playChangeHide = function (time) {
        //TLog.Debug("FullBalckFrame.playChangeHide",time,this.mLayoutNode) 
        if (time) {
            if (!this.mLayoutNode) {
                this.showWnd();
            }
            this.mLayoutNode.alpha = 1;
            var data2 = (_a = {}, _a["alpha"] = 0, _a);
            this.saveHideTime = time;
            this.bgAlphaChange2 = AlphaAction.newObj(this.mLayoutNode, time, data2, this.onChangeEnd, this);
            //TLog.Debug("FullBalckFrame.FullBalckFrame.playChangeHide",22222222222222222)		
            this.bgAlphaChange2.run();
            //TLog.Debug("FullBalckFrame.playChangeHide",time) 
        }
        var _a;
    };
    FullBalckFrame.prototype.setWindowTYpe = function (change, blackTime, callBack, callBackObj) {
        //TLog.Debug("FullBalckFrame.setWindowTYpe",change,blackTime,callBack,callBackObj)
        this.gradualChange = change || null;
        this.blackTime = blackTime || 200;
        var data1 = (_a = {}, _a["alpha"] = 255, _a);
        this.bgAlphaChang1 = AlphaAction.newObj(this.mLayoutNode, this.blackTime, data1, this.refreshFrame, this);
        var data2 = (_b = {}, _b["alpha"] = 0, _b);
        this.bgAlphaChange2 = AlphaAction.newObj(this.mLayoutNode, this.blackTime, data2, this.onChangeEnd, this);
        this.callBackFunc = callBack || null;
        this.callBackObj = callBackObj || null;
        var _a, _b;
    };
    FullBalckFrame.prototype.onChangeEnd = function () {
        //TLog.Debug("FullBalckFrame.onChangeEnd")
        this.hideWnd();
    };
    return FullBalckFrame;
}(BaseWnd));
__reflect(FullBalckFrame.prototype, "FullBalckFrame");
//# sourceMappingURL=FullBalckFrame.js.map