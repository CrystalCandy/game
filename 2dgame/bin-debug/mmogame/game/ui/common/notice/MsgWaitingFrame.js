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
    2014.08.05(星期二)

意图：
  网络包等待窗口

公共接口：
    
*/
var MsgWaitingFrame = (function (_super) {
    __extends(MsgWaitingFrame, _super);
    function MsgWaitingFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MsgWaitingFrame.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mElemList = {};
        RegisterEvent(EventDefine.MSG_WAIT_BEGIN, this.onMsgWaitBegin, this);
        RegisterEvent(EventDefine.MSG_WAIT_END, this.onMsgWaitEnd, this);
    };
    MsgWaitingFrame.prototype.destory = function () {
        UnRegisterEvent(EventDefine.MSG_WAIT_BEGIN, this.onMsgWaitBegin, this);
        UnRegisterEvent(EventDefine.MSG_WAIT_END, this.onMsgWaitEnd, this);
        this.resetDelayShowTimer();
    };
    MsgWaitingFrame.prototype.onLoad = function () {
        this.createFrame();
    };
    MsgWaitingFrame.prototype.onUnLoad = function () {
    };
    MsgWaitingFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = (true);
        // if (this.timerId == null) {
        //     this.during = 0
        //     this.timerId = SetTimer(this.animRotate, this, 100)
        // }
    };
    MsgWaitingFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = (false);
        // if (this.timerId) {
        //     KillTimer(this.timerId)
        //     this.timerId = null
        // }
        this.bShowAlways = false;
        SetGlobalInputStatus(true, "MsgWaitingFrame");
    };
    MsgWaitingFrame.prototype.createFrame = function () {
        this.mElemList = {};
        var width = 197;
        var height = 200;
        UiUtil.setWH(this.mLayoutNode, width, height);
        this.setAlignCenter(true, true);
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = "infobg", _a["image"] = "ty_zhuangBeiBg00", _a["color"] = gui.Color.white, _a["horizontalCenter"] = 0, _a["verticalCenter"] = 0, _a["w"] = 240, _a["h"] = 40, _a["event_name"] = null, _a["fun_index"] = null, _a),
            (_b = {}, _b["index_type"] = gui.AnimBox, _b["name"] = "animbox", _b["title"] = null, _b["image"] = null, _b["color"] = gui.Color.white, _b["horizontalCenter"] = 0, _b["verticalCenter"] = 0, _b["event_name"] = null, _b["fun_index"] = null, _b["messageFlag"] = true, _b),
            (_c = {}, _c["index_type"] = eui.Label, _c["name"] = "info", _c["title"] = "", _c["font"] = "ht_22_cc_stroke", _c["color"] = gui.Color.white, _c["horizontalCenter"] = 0, _c["verticalCenter"] = 0, _c["w"] = 240, _c["h"] = 30, _c["event_name"] = null, _c["fun_index"] = null, _c),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        // this.Circle_frame = this.mElemList["Circle_frame"]
        // this.Circle_frame.anchorOffsetX = width/2;
        // this.Circle_frame.anchorOffsetY = height/2;
        this.mElemList["animbox"].animName = "loading";
        var _a, _b, _c;
    };
    // animRotate(dt) {
    //     this.during = this.during + dt
    //     if (!this.bShowAlways && this.during > MAX_MSG_WAIT_TIME) {
    //         this.hideWnd()
    //         return
    //     }
    //     let rotate = Math.floor(this.during * 0.3) % 360
    //     this.Circle_frame.rotation = rotate;
    // }
    MsgWaitingFrame.prototype.resetDelayShowTimer = function () {
        if (this.delayShowTimer) {
            KillTimer(this.delayShowTimer);
            this.delayShowTimer = null;
            SetGlobalInputStatus(true, "MsgWaitingFrame");
        }
    };
    MsgWaitingFrame.prototype.onMsgWaitBegin = function (args) {
        TLog.Debug("MsgWaitingFrame.onMsgWaitBegin");
        function delayShow(dt) {
            var title = "";
            if (args) {
                title = args.text || "";
            }
            this.resetDelayShowTimer();
            this.showWnd();
            this.mElemList["info"].text = (title);
            this.mElemList["infobg"].visible = (title != "");
            this.mElemList["info"].visible = (title != "");
        }
        if (this.delayShowTimer == null) {
            var DELAY_TIME = 500; //XX毫秒如果没收到关闭，就显示
            this.delayShowTimer = SetTimer(delayShow, this, DELAY_TIME);
            if (!args || args.lockInput) {
                SetGlobalInputStatus(false, "MsgWaitingFrame");
            }
            this.bShowAlways = (args && args.bAlways == true);
        }
    };
    MsgWaitingFrame.prototype.onMsgWaitEnd = function (args) {
        //TLog.Debug("MsgWaitingFrame.onMsgWaitEnd")
        this.resetDelayShowTimer();
        this.hideWnd();
    };
    return MsgWaitingFrame;
}(BaseWnd));
__reflect(MsgWaitingFrame.prototype, "MsgWaitingFrame");
//# sourceMappingURL=MsgWaitingFrame.js.map