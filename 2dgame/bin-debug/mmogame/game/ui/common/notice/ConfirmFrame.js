/*
作者:
    lintianfeng
    
创建时间：
   2013.8.14(周三)

意图：
   确认提示框

公共接口：
    setMsgText( msgText){
    setOkText( text){
    setOkImage( ImageName){
    setOkWH(width,height){
  setOkXY(x,y){
    setCancelText( text){
    setCancelImage( ImageName){
    setCancelWH(width,height){
  setCancelXY(x,y){
    

 
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
var ConfirmFrame = (function (_super) {
    __extends(ConfirmFrame, _super);
    function ConfirmFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConfirmFrame.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.msgData = null;
    };
    ConfirmFrame.prototype.onLoad = function () {
        this.timerList = {};
        this.createLayout();
    };
    ConfirmFrame.prototype.onUnLoad = function () {
    };
    ConfirmFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.refreshUI();
        var callbackObject = this.msgData.callbackData.ret;
        var callbackUserData = this.msgData.callbackData.userData;
        //给个机会自定义窗口内容
        // if (callbackObject && callbackObject.DialogShowCallBack) {
        // 	callbackObject.DialogShowCallBack.call(this, callbackUserData)
        // }
    };
    ConfirmFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        for (var _ in this.timerList) {
            var timer = this.timerList[_];
            KillTimer(timer);
        }
        this.timerList = {};
    };
    ConfirmFrame.prototype.createLayout = function () {
        this.mLayoutNode.percentWidth = 100;
        this.mLayoutNode.percentHeight = 100;
        this.mElemList = {};
        var ElemInfo = [
            (_a = {}, _a["index_type"] = eui.Rect, _a["name"] = "bg", _a["color"] = gui.Color.black, _a["alpha"] = 0.5, _a["x"] = 0, _a["y"] = 0, _a["percentWidth"] = 100, _a["percentHeight"] = 100, _a["event_name"] = null, _a["fun_index"] = null, _a["touchChildren"] = true, _a),
            (_b = {}, _b["index_type"] = eui.Group, _b["name"] = "wnd", _b["horizontalCenter"] = 0, _b["verticalCenter"] = 0, _b["w"] = 510, _b["h"] = 320, _b["event_name"] = null, _b["fun_index"] = null, _b),
            (_c = {}, _c["index_type"] = gui.Grid9Image, _c["name"] = "bgimg", _c["parent"] = "wnd", _c["image"] = "ty_uiDi01", _c["x"] = 0, _c["y"] = 0, _c["percentWidth"] = 100, _c["percentHeight"] = 100, _c["event_name"] = null, _c["fun_index"] = null, _c),
            (_d = {}, _d["index_type"] = gui.Grid9Image, _d["name"] = "bgimg2", _d["parent"] = "wnd", _d["image"] = "ty_uiDi02", _d["left"] = 40, _d["top"] = 55, _d["right"] = 45, _d["bottom"] = 100, _d["event_name"] = null, _d["fun_index"] = null, _d),
            (_e = {}, _e["index_type"] = eui.Label, _e["name"] = "wnd_title", _e["parent"] = "wnd", _e["title"] = Localize_cns("CONFIRM_TITLE"), _e["font"] = "ht_24_cc", _e["image"] = "", _e["color"] = gui.Color.white, _e["x"] = 0, _e["y"] = 3, _e["w"] = 510, _e["h"] = 30, _e["event_name"] = null, _e["fun_index"] = null, _e),
            (_f = {}, _f["index_type"] = gui.RichDisplayer, _f["name"] = "text", _f["parent"] = "wnd", _f["title"] = null, _f["font"] = "ht_24_lc", _f["color"] = gui.Color.yellow, _f["x"] = 60, _f["y"] = 80, _f["w"] = 400, _f["h"] = 105, _f["messageFlag"] = true, _f),
            (_g = {}, _g["index_type"] = gui.Button, _g["name"] = "cancel", _g["parent"] = "wnd", _g["font"] = "ht_24_cc_stroke", _g["color"] = gui.Color.white, _g["title"] = Localize_cns("CANCEL"), _g["image"] = "ty_tongYongBt1", _g["right"] = 70, _g["bottom"] = 32, _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = this.OnClickCancel, _g),
            (_h = {}, _h["index_type"] = gui.Button, _h["name"] = "ok", _h["parent"] = "wnd", _h["font"] = "ht_24_cc_stroke", _h["color"] = gui.Color.white, _h["title"] = Localize_cns("SURE"), _h["image"] = "ty_tongYongBt1", _h["left"] = 70, _h["bottom"] = 32, _h["event_name"] = egret.TouchEvent.TOUCH_TAP, _h["fun_index"] = this.OnClickOK, _h),
            (_j = {}, _j["index_type"] = gui.Button, _j["name"] = "okYes", _j["parent"] = "wnd", _j["font"] = "ht_24_cc_stroke", _j["color"] = gui.Color.white, _j["title"] = Localize_cns("SURE"), _j["image"] = "ty_tongYongBt1", _j["horizontalCenter"] = 0, _j["bottom"] = 32, _j["event_name"] = egret.TouchEvent.TOUCH_TAP, _j["fun_index"] = this.OnClose, _j),
            (_k = {}, _k["index_type"] = eui.Group, _k["name"] = "doNotAskToday", _k["parent"] = "wnd", _k["horizontalCenter"] = 0, _k["bottom"] = -60, _k["w"] = 240, _k["h"] = 55, _k["event_name"] = null, _k["fun_index"] = null, _k),
            (_l = {}, _l["index_type"] = gui.Grid9Image, _l["name"] = "doNotAskTodaybg", _l["parent"] = "doNotAskToday", _l["image"] = "ty_tipsDi", _l["x"] = 0, _l["y"] = 0, _l["percentWidth"] = 100, _l["percentHeight"] = 100, _l["event_name"] = null, _l["fun_index"] = null, _l),
            (_m = {}, _m["index_type"] = eui.CheckBox, _m["name"] = "gouXuan", _m["parent"] = "doNotAskToday", _m["title"] = "", _m["font"] = "ht_20_cc", _m["image"] = "ty_xuanZheDi01", _m["image_down"] = "ty_xuanZhe01", _m["color"] = gui.Color.white, _m["x"] = 5, _m["y"] = 2, _m["event_name"] = egret.TouchEvent.TOUCH_TAP, _m["fun_index"] = null, _m),
            (_o = {}, _o["index_type"] = eui.Label, _o["name"] = "toDayTips", _o["parent"] = "doNotAskToday", _o["title"] = Localize_cns("COMMON_TXT4"), _o["font"] = "ht_24_cc", _o["image"] = "", _o["color"] = gui.Color.white, _o["x"] = 60, _o["y"] = 0, _o["w"] = 150, _o["h"] = 49, _o["event_name"] = null, _o["fun_index"] = null, _o),
        ];
        UiUtil.createElem(ElemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["text"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mLayoutNode.setLayer(3 /* Top */);
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    };
    ConfirmFrame.prototype.setTitle = function (text) {
        this.mElemList["wnd_title"].text = text;
    };
    ConfirmFrame.prototype.setMsgData = function (msgData) {
        this.msgData = msgData;
    };
    ConfirmFrame.prototype.setMsgText = function (msgText) {
        AddRdContent(this.mElemList["text"], msgText, "ht_24_cc_stroke_zongse", "white", 3);
    };
    ConfirmFrame.prototype.setOkText = function (text) {
        this.mElemList["ok"].text = (text);
    };
    ConfirmFrame.prototype.setOkImage = function (ImageName) {
        this.mElemList["ok"].source = (ImageName);
    };
    ConfirmFrame.prototype.setOkWH = function (width, height) {
        UiUtil.setWH(this.mElemList["ok"], width, height);
    };
    ConfirmFrame.prototype.setOkXY = function (x, y) {
        UiUtil.setXY(this.mElemList["ok"], x, y);
    };
    ConfirmFrame.prototype.setCancelText = function (text) {
        this.mElemList["cancel"].text = (text);
    };
    ConfirmFrame.prototype.setCancelImage = function (ImageName) {
        this.mElemList["cancel"].source = (ImageName);
    };
    ConfirmFrame.prototype.setCancelWH = function (width, height) {
        UiUtil.setWH(this.mElemList["cancel"], width, height);
    };
    ConfirmFrame.prototype.setCancelXY = function (x, y) {
        UiUtil.setXY(this.mElemList["cancel"], x, y);
    };
    ConfirmFrame.prototype.refreshUI = function () {
        this.setMsgText(this.msgData.msg);
        var baseH = 100; //rd的基本高度
        var rdH = AdjustRdContentViewH(this.mElemList["text"], baseH);
        UiUtil.setWH(this.mElemList["wnd"], 510, 315 + rdH - baseH);
        //UiUtil.setXY(this.mElemList["bg"], 0, 420 - rdH + baseH)
        //UiUtil.setXY(this.mElemList["countDownTime"], 200, 350 - rdH + baseH)
        var userData = this.msgData.callbackData.userData;
        if (userData == null || !table_isExsit(ConfirmFrom, userData)) {
            this.mElemList["doNotAskToday"].visible = (false);
        }
        if (userData && table_isExsit(ConfirmFrom, userData)) {
            this.mElemList["doNotAskToday"].visible = (true);
            this.mElemList["gouXuan"].selected = (false);
        }
        //this.refreshCheckBox()
        if (this.msgData.dialogType == CONFIRM_DIALOG_YES_OR_NO) {
            this.mElemList["cancel"].visible = (true);
            this.mElemList["ok"].visible = (true);
            this.mElemList["okYes"].visible = (false);
        }
        else if (this.msgData.dialogType == CONFIRM_DIALOG_YES) {
            this.mElemList["cancel"].visible = (false);
            this.mElemList["ok"].visible = (false);
            this.mElemList["okYes"].visible = (true);
        }
        //倒计时
        // if (this.timerList["countDownTime"]) {
        // 	KillTimer(this.timerList["countDownTime"])
        // 	delete this.timerList["countDownTime"]
        // }
        // if (this.msgData.callbackData.ret && this.msgData.callbackData.ret.countDownTime && this.msgData.callbackData.ret.countDownTime > 0) {
        // 	this.mElemList["countDownTime"].visible = (true)
        // 	let leftTime = this.msgData.callbackData.ret.countDownTime
        // 	let tick =function (delay) {
        // 		leftTime = leftTime - delay / 1000
        // 		let lTime = Math.ceil(leftTime)					//Math.ceil(0.5)=-0
        // 		if (leftTime < 0 && leftTime > -1) {
        // 			lTime = 0
        // 		}
        // 		if (lTime < 0) {
        // 			if (this.timerList["countDownTime"]) {
        // 				KillTimer(this.timerList["countDownTime"])
        // 				delete this.timerList["countDownTime"]
        // 			}
        // 			this.mElemList["countDownTime"].visible = (false)
        // 		}
        // 		this.mElemList["countDownTime"].text = getFormatDiffTime(lTime)
        // 		//更新描述文字
        // 		if (this.msgData.callbackData.ret.updateMsg) {
        // 			let msg = this.msgData.callbackData.ret.updateMsg(leftTime)
        // 			this.setMsgText(msg)
        // 		}
        // 	}
        // 	this.timerList["countDownTime"] = SetTimer(tick, this, 100, true)
        // } else {
        // 	this.mElemList["countDownTime"].visible = (false)
        // }
    };
    // refreshCheckBox() {
    // 	if (this.mElemList["gouXuan"]:GetCheck() == true ){
    // 		this.mElemList["gouXuan_tick"].visible = (true)
    // 		this.mElemList["gouXuan"].source = ("ty_tipsXuanZhe01")
    // 	}else{
    // 		this.mElemList["gouXuan_tick"].visible = (false)
    // 		this.mElemList["gouXuan"].source = ("ty_tipsXuanZhe02")
    // 	}
    // }
    ConfirmFrame.prototype.OnClickCancel = function (args) {
        this.hideWnd();
        if (this.msgData.callback) {
            if (table_isExsit(ConfirmFrom, this.msgData.callbackData.userData)) {
                //选中,记录当前提示框今天内不在出现
                var todayNoTips = this.mElemList["gouXuan"].selected;
                //更新今天不再提示的提示框
                if (todayNoTips) {
                    var todayNoNotifyStr = IGlobal.setting.getRoleSetting(UserSetting.TYPE_STRING, "todayNoNotify", table_save({}));
                    var todayNoNotify = table_load(todayNoNotifyStr);
                    todayNoNotify[this.msgData.callbackData.userData] = GetServerTime();
                    IGlobal.setting.setRoleSetting(UserSetting.TYPE_STRING, "todayNoNotify", table_save(todayNoNotify));
                }
            }
            this.msgData.callback.onDialogCallback(false, this.msgData.callbackData);
        }
    };
    ConfirmFrame.prototype.OnClickOK = function (args) {
        this.hideWnd();
        if (this.msgData.callback) {
            if (table_isExsit(ConfirmFrom, this.msgData.callbackData.userData)) {
                //选中,记录当前提示框今天内不在出现
                var todayNoTips = this.mElemList["gouXuan"].selected;
                //更新今天不再提示的提示框
                if (todayNoTips) {
                    var todayNoNotifyStr = IGlobal.setting.getRoleSetting(UserSetting.TYPE_STRING, "todayNoNotify", table_save({}));
                    var todayNoNotify = table_load(todayNoNotifyStr);
                    todayNoNotify[this.msgData.callbackData.userData] = GetServerTime();
                    IGlobal.setting.setRoleSetting(UserSetting.TYPE_STRING, "todayNoNotify", table_save(todayNoNotify));
                }
            }
            this.msgData.callback.onDialogCallback(true, this.msgData.callbackData);
        }
    };
    ConfirmFrame.prototype.OnClose = function () {
        this.hideWnd();
        if (this.msgData.callback) {
            this.msgData.callback.onDialogCallback(true, this.msgData.callbackData);
        }
    };
    return ConfirmFrame;
}(BaseWnd));
__reflect(ConfirmFrame.prototype, "ConfirmFrame");
//# sourceMappingURL=ConfirmFrame.js.map