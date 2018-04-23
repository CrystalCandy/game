/*
作者:
    yangguiming
    
创建时间：
    2014.09.19(星期五)

意图：
  

公共接口：
    //msg回调
    IconMsgCallBack( userData){
    
    removeMsg( id){
    addNewMsg( cbObj, userData){
    
    
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
//图标信息界面
var IconMsgFrame = (function (_super) {
    __extends(IconMsgFrame, _super);
    function IconMsgFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IconMsgFrame.prototype.initObj = function () {
        var args = [];
        for (var _a = 0; _a < arguments.length; _a++) {
            args[_a] = arguments[_a];
        }
        this.waitMsgList = [];
        this.showMsgList = [];
        this.MaxSize = 5;
        this.idSeed = 100;
        RegisterEvent(EventDefine.STATE_ACTIVE, this.onStateActive, this);
        RegisterEvent(EventDefine.STATE_DEACTIVE, this.onStateActive, this);
        this.hideState = true;
        this.imageDefine = (_b = {},
            _b[IconMsgType.FRIEND_CHAT] = "zjm_bt_tiShi01",
            _b[IconMsgType.FRIEND_APPLY] = "zjm_bt_tiShi04",
            _b[IconMsgType.TEAM_APPLY] = "zjm_bt_tiShi02",
            _b[IconMsgType.TEAM_INVITE] = "zjm_bt_tiShi02",
            _b[IconMsgType.TEAM_STATUS] = "zjm_bt_tiShi02",
            _b[IconMsgType.EMAIL_LIST] = "zjm_bt_tiShi03",
            _b[IconMsgType.CLUB_FUBEN] = "zjm_bt_tiShi07",
            _b[IconMsgType.CLUB_APPLY] = "zjm_bt_tiShi07",
            _b);
        var _b;
    };
    IconMsgFrame.prototype.destory = function () {
        UnRegisterEvent(EventDefine.STATE_ACTIVE, this.onStateActive, this);
        UnRegisterEvent(EventDefine.STATE_DEACTIVE, this.onStateActive, this);
        this.hideWnd();
    };
    IconMsgFrame.prototype.onLoad = function () {
        this.createLayout();
    };
    IconMsgFrame.prototype.onUnLoad = function () {
        // for(let i in this.iconList){
        // 		let v = this.iconList[i]
        // 	ui_util.ReleaseWindow(v)
        // }
        this.iconList = {};
    };
    IconMsgFrame.prototype.onShow = function () {
        //TLog.Debug("IconMsgFrame.onShow")
        this.mLayoutNode.visible = (true);
        //this.mLayoutNode.MoveToBack()
        this.mIconFrame.visible = (false);
        this.refreshUI();
        RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this);
    };
    IconMsgFrame.prototype.clearMsg = function () {
        for (var k in this.iconList) {
            var btn = this.iconList[k];
            btn.visible = false;
        }
        this.hideWnd();
        for (var _ in this.showMsgList) {
            var v = this.showMsgList[_];
            if (v.clearTimer) {
                KillTimer(v.clearTimer);
                v.clearTimer = null;
            }
        }
        this.showMsgList = [];
        for (var _ in this.waitMsgList) {
            var v = this.waitMsgList[_];
            if (v.clearTimer) {
                KillTimer(v.clearTimer);
                v.clearTimer = null;
            }
        }
        this.waitMsgList = [];
    };
    IconMsgFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this);
        //TLog.Debug("IconMsgFrame.onHide")
        this.mLayoutNode.visible = (false);
        this.mIconFrame.visible = (false);
        //this.hideShowWnd()
    };
    //resetShowWnd(){
    //	
    //	//TLog.Debug_r(this.showMsgList)
    //	let showCount = this.showMsgList.length
    //	for(let _ in this.showMsgList){
    //			let info = this.showMsgList[_]
    //		info.window.visible = (true)		
    //	}	
    //	//TLog.Debug("IconMsgFrame.resetShowWnd",showCount)
    //	//TLog.Debug_r(this.waitMsgList)
    //	for(let i = showCount+1; i <= this.MaxSize ,1;i++){
    //		let waitMsg = JsUtil.arrayRemove(this.waitMsgList, 0)
    //		
    //		
    //		
    //		//TLog.Debug("remove",i,waitMsg)
    //		if(waitMsg ){
    //			let iconSlot = this.getFreeIconSlot()
    //			TLog.Assert(iconSlot)		
    //			waitMsg.window = iconSlot
    //			this.openNextMsg(waitMsg)
    //			this.refreshUI()
    //		}		
    //	}	
    //	//TLog.Debug("IconMsgFrame.resetShowWnd }")
    //}
    IconMsgFrame.prototype.createLayout = function () {
        this.mElemList = {};
        //创建消息盒图标
        var w = 84, h = 84;
        UiUtil.setWH(this.mLayoutNode, w, h);
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.Button, _a["name"] = "msgBox", _a["title"] = null, _a["font"] = null, _a["image"] = "zjm_bt_shiJian01", _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onShowMsgList, _a),
            (_b = {}, _b["index_type"] = gui.AnimBox, _b["name"] = "anim", _b["color"] = gui.Color.white, _b["x"] = -30, _b["y"] = -35, _b["w"] = 130, _b["h"] = 130, _b["event_name"] = null, _b["fun_index"] = null, _b["messageFlag"] = true, _b),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        this.mLayoutNode.setLayer(0 /* Bottom */);
        this.mLayoutNode.left = 0;
        this.mLayoutNode.bottom = 330;
        this.mLayoutNode.touchEnabled = false;
        this.mElemList["anim"].setAnimName("yuan");
        //消息列表框
        this.mIconFrame = this.createLayoutNode("IconMsgFrame_Icon");
        var mElemInfo2 = [
            (_c = {}, _c["index_type"] = gui.Grid9Image, _c["name"] = "iconbg", _c["title"] = null, _c["font"] = null, _c["image"] = "ty_zhuangBeiBg00", _c["color"] = gui.Color.white, _c["percentWidth"] = 100, _c["percentHeight"] = 100, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = null, _c),
        ];
        UiUtil.createElem(mElemInfo2, this.mIconFrame, this.mElemList, this);
        UiUtil.setWH(this.mIconFrame, 640, 80);
        this.mIconFrame.setLayer(0 /* Bottom */);
        this.mIconFrame.left = 75;
        this.mIconFrame.bottom = this.mLayoutNode.bottom;
        this.mIconFrame.touchEnabled = false;
        //this.mIconFrame.MoveToBack()
        var iconW = 65;
        var iconH = 65;
        this.iconList = {};
        for (var i = 1; i <= this.MaxSize; i++) {
            var mElemInfo_1 = [
                (_d = {}, _d["index_type"] = gui.Button, _d["name"] = "iconLabel" + i, _d["title"] = null, _d["font"] = null, _d["image"] = "zjm_bt_tiShi08", _d["color"] = gui.Color.white, _d["x"] = 0, _d["y"] = 0, _d["w"] = iconW, _d["h"] = iconH, _d["fillMode"] = egret.BitmapFillMode.CLIP, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onIconClick, _d),
            ];
            UiUtil.createElem(mElemInfo_1, this.mIconFrame, this.mElemList, this);
            this.iconList[i] = this.mElemList["iconLabel" + i];
        }
        for (var i = 1; i <= this.MaxSize; i++) {
            //this.mElemList["Icon" +i].visible = (false)
            this.iconList[i].visible = (false);
            //this.iconList[i]:SetMessagePass(false)
        }
        var _a, _b, _c, _d;
        //this.mLayoutNode.SetMessagePass(true)
        //this.mLayoutNode.SetLayer(gui.Window.LayerTop)
    };
    IconMsgFrame.prototype.openNextMsg = function (msgData) {
        JsUtil.arrayInstert(this.showMsgList, msgData);
        msgData.window.visible = (true);
        //ui_util.CreateDrawRectPtr(msgData.window, gui.Color32Half.green)
        //let layer = msgData.userData.layer
        //TLog.Debug("IconMsgFrame.openNextMsg",layer,msgData.window.GetName())
        //if(layer ){
        //	msgData.window.SetLayer(layer)
        //}else{
        //	msgData.window.SetLayer(gui.Window.LayerBottom)
        //}	
        this.refreshUI();
    };
    IconMsgFrame.prototype.getImageByType = function (type) {
        var imageName = this.imageDefine[type] || "zjm_bt_tiShi08";
        return imageName;
    };
    IconMsgFrame.prototype.updateMsgBox = function () {
        var visible = this.mIconFrame.visible;
        if (visible) {
            this.mElemList["msgBox"].source = ("zjm_bt_shiJian02");
        }
        else {
            if (this.showMsgList.length == 1) {
                var msgData = this.showMsgList[0];
                var imageName_1 = this.getImageByType(msgData.type);
                this.mElemList["msgBox"].source = (imageName_1);
            }
            else {
                this.mElemList["msgBox"].source = ("zjm_bt_shiJian01");
            }
        }
        var imageName = visible == true && "zjm_bt_shiJian02" || "zjm_bt_shiJian01";
    };
    IconMsgFrame.prototype.refreshUI = function () {
        var msgCount = this.showMsgList.length;
        //TLog.Debug("IconMsgFrame.refreshUI",msgCount)
        if (msgCount <= 1) {
            this.mIconFrame.visible = (false);
        }
        this.updateMsgBox();
        if (msgCount == 0) {
            return;
        }
        var iconW = this.iconList[1].width; //this.mElemList["Icon1"].width
        var spaceX = 5;
        var startX = 10; //(640 - (iconW + (msgCount - 1) * (iconW + spaceX) ) ) / 2
        var startY = 5;
        for (var i = 0; i < this.showMsgList.length; i++) {
            var msgData = this.showMsgList[i];
            //let x = (msgCount - i) * (iconW + spaceX) + startX //从右到左
            var x = (i) * (iconW + spaceX) + startX; //从左到右
            var y = startY;
            UiUtil.setXY(msgData.window, x, y);
            var imageName = this.getImageByType(msgData.type);
            msgData.window.source = (imageName);
        }
        var frameW = 2 * startX + iconW + (msgCount - 1) * (iconW + spaceX);
        UiUtil.setWH(this.mIconFrame, frameW, this.mIconFrame.height);
    };
    IconMsgFrame.prototype.getFreeIconSlot = function () {
        //TLog.Debug("IconMsgFrame.getFreeIconSlot")
        //TLog.Debug_r(this.showMsgList)
        for (var i = 1; i <= this.MaxSize; i++) {
            //TLog.Debug("get window ", i)
            var window_1 = this.iconList[i]; // this.mElemList["Icon"+i]
            var isHaveDataWnd = false;
            for (var _i in this.showMsgList) {
                var _v = this.showMsgList[_i];
                if (_v.window == window_1) {
                    isHaveDataWnd = true;
                }
            }
            if (window_1.visible == false && !isHaveDataWnd) {
                return window_1;
            }
        }
        //TLog.Debug("IconMsgFrame.getFreeIconSlot null")
        return null;
    };
    IconMsgFrame.prototype.isIconTypeExsit = function (type) {
        for (var _a = 0, _b = this.waitMsgList; _a < _b.length; _a++) {
            var msgData = _b[_a];
            if (msgData.type == type)
                return true;
        }
        for (var _c = 0, _d = this.showMsgList; _c < _d.length; _c++) {
            var msgData = _d[_c];
            if (msgData.type == type)
                return true;
        }
        return false;
    };
    IconMsgFrame.prototype.addNewMsg = function (cbObj, userData, type) {
        this.idSeed = this.idSeed + 1;
        //TLog.Debug("IconMsgFrame.addNewMsg",this.idSeed,this.hideState)
        //TLog.Debug_r(userData)
        var msgData = {};
        msgData.id = this.idSeed;
        msgData.cbObj = cbObj; //callbackObj
        msgData.userData = userData;
        msgData.type = type;
        //新手期间，只是准许插入养成事件
        //if (!GuideSystem.getInstance().isFinishGuideEvent()) {
        //    if (type != IconMsgType.GROW_EVENT) {
        //        JsUtil.arrayInstert(this.waitMsgList, msgData)
        //        return msgData.id
        //    }
        //}
        if (!this.hideState) {
            JsUtil.arrayInstert(this.waitMsgList, msgData);
            return msgData.id;
        }
        GameSound.getInstance().playEffect(SystemSound.effect_newMsg);
        this.showWnd();
        var iconSlot = this.getFreeIconSlot();
        //TLog.Debug("get iconSlot" ,iconSlot.GetName())
        if (iconSlot) {
            msgData.window = iconSlot;
            this.openNextMsg(msgData);
        }
        else {
            JsUtil.arrayInstert(this.waitMsgList, msgData);
        }
        // WngMrg.getInstance().addHideStatck(this) ){
        //	this.hideWnd()
        //}
        return msgData.id;
    };
    IconMsgFrame.prototype.removeIconMsgByType = function (type) {
        var removeList = [];
        for (var _ = 0; _ < this.showMsgList.length; _++) {
            var v = this.showMsgList[_];
            if (v.type == type) {
                JsUtil.arrayInstert(removeList, v.id);
            }
        }
        for (var _ = 0; _ < this.waitMsgList.length; _++) {
            var v = this.waitMsgList[_];
            if (v.type == type) {
                JsUtil.arrayInstert(removeList, v.id);
            }
        }
        //把相同类型的全部删除了
        for (var _ = 0; _ < removeList.length; _++) {
            var id = removeList[_];
            this.removeMsg(id);
        }
    };
    IconMsgFrame.prototype.removeMsg = function (id) {
        //如果在等待列表中，就直接移除
        for (var i = 0; i < this.waitMsgList.length; i++) {
            var v = this.waitMsgList[i];
            if (v.id == id) {
                JsUtil.arrayRemove(this.waitMsgList, i);
                return;
            }
        }
        //从showMsgList移除
        var msgData = null;
        for (var i = 0; i < this.showMsgList.length; i++) {
            var v = this.showMsgList[i];
            if (v.id == id) {
                msgData = v;
                JsUtil.arrayRemove(this.showMsgList, i);
                break;
            }
        }
        //从等待列表找出新的消息
        if (msgData) {
            msgData.window.visible = (false);
            msgData.window = null;
            var waitMsg = JsUtil.arrayRemove(this.waitMsgList, 0);
            var iconSlot = this.getFreeIconSlot();
            TLog.Assert(iconSlot);
            if (waitMsg) {
                waitMsg.window = iconSlot;
                this.openNextMsg(waitMsg);
            }
            this.refreshUI();
        }
        if (this.showMsgList.length + this.waitMsgList.length == 0) {
            this.hideWnd();
        }
        return msgData;
    };
    IconMsgFrame.prototype.onShowMsgList = function (args) {
        //tolua.cast(args, "gui::GUIMouseEvent")
        if (this.showMsgList.length == 1) {
            var msgData = this.showMsgList[0];
            this.onHandleMsgData(msgData);
            return;
        }
        this.mIconFrame.visible = (!this.mIconFrame.visible);
        //this.mIconFrame.MoveToBack()
        this.refreshUI();
    };
    IconMsgFrame.prototype.onIconClick = function (args) {
        //tolua.cast(args, "gui::GUIMouseEvent")
        var msgData = null;
        for (var i = 0; i < this.showMsgList.length; i++) {
            var v = this.showMsgList[i];
            if (v.window == args.target) {
                msgData = v;
                break;
            }
        }
        this.onHandleMsgData(msgData);
        //TLog.Debug("IconMsgFrame.onIconClick",msgData)
        //if(msgData ){
        //	this.removeMsg(msgData.id)
        //	msgData.cbObj.IconMsgCallBack(msgData.userData)
        //}
    };
    IconMsgFrame.prototype.onHandleMsgData = function (msgData) {
        if (msgData) {
            var ret = msgData.cbObj.onIconMsgCallBack(msgData.id, msgData.userData);
            //返回false，表示不取消icon
            if (ret == false) {
                return;
            }
            this.removeMsg(msgData.id);
            // let removeList = []
            // for (let _ = 0; _ < this.showMsgList.length; _++) {
            //     let v = this.showMsgList[_]
            //     if (v.type == msgData.type) {
            //         JsUtil.arrayInstert(removeList, v.id)
            //     }
            // }
            // for (let _ = 0; _ < this.waitMsgList.length; _++) {
            //     let v = this.waitMsgList[_]
            //     if (v.type == msgData.type) {
            //         JsUtil.arrayInstert(removeList, v.id)
            //     }
            // }
            // //把相同类型的全部删除了
            // for (let _ = 0; _ < removeList.length; _++) {
            //     let id = removeList[_]
            //     this.removeMsg(id)
            // }
        }
    };
    //hideShowWnd(){
    //	//TLog.Debug("hideShowWnd")
    //	for(let _ in this.showMsgList){
    //			let info = this.showMsgList[_]
    //		info.window.visible = (false)
    //	}		
    //}
    //新手引导指定显示的类型(战斗结束后，要显示)
    IconMsgFrame.prototype.restoreNextMsg = function (type) {
        var iconSlot = this.getFreeIconSlot();
        if (iconSlot == null) {
            return;
        }
        var msgData = null;
        for (var i = 0; i < this.waitMsgList.length; i++) {
            var v = this.waitMsgList[i];
            if (v.type == type || type == null) {
                msgData = v;
                JsUtil.arrayRemove(this.waitMsgList, i);
                break;
            }
        }
        if (msgData == null) {
            return;
        }
        msgData.window = iconSlot;
        this.openNextMsg(msgData);
    };
    IconMsgFrame.prototype.onStateActive = function (args) {
        var isFightBegin = FightSystem.getInstance().isFight();
        var fightType = FightSystem.getInstance().getCurFightType()[0];
        if (isFightBegin == true && fightType == opFightResultType.PATROL) {
            this.setShowState(true);
            return;
        }
        var curState = StateManager.getInstance().GetCurrentStateType();
        if (curState == state_type.LIVE_BASE_STATE || curState == state_type.LIVE_ACTIVITY_MSG_STATE) {
            this.setShowState(true);
        }
        else {
            this.setShowState(false);
        }
    };
    IconMsgFrame.prototype.setShowState = function (state) {
        if (this.hideState == state) {
            return;
        }
        if (state) {
            this.loadWnd();
            this.hideState = true;
            var type_1 = null;
            //if (!GuideSystem.getInstance().isFinishGuideEvent()) {
            //    type = IconMsgType.GROW_EVENT
            //}
            this.restoreNextMsg(type_1);
            var msgCount = this.showMsgList.length;
            if (msgCount > 0) {
                this.showWnd();
                //临时
                //this.mLayoutNode.MoveToBack()
            }
            //this.resetShowWnd()
        }
        else {
            this.hideState = false;
            this.hideWnd();
            //this.hideShowWnd()
        }
    };
    IconMsgFrame.prototype.onMouseDown = function (args) {
        var target = args.touchEvent.target;
        if (UiUtil.isExcludeChild(target, [this.mLayoutNode, this.mIconFrame])) {
            this.mIconFrame.visible = (false);
            this.refreshUI();
        }
    };
    return IconMsgFrame;
}(BaseWnd));
__reflect(IconMsgFrame.prototype, "IconMsgFrame");
//# sourceMappingURL=IconMsgFrame.js.map