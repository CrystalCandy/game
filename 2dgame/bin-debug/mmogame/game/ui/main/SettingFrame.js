// TypeScript file
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
var SettingFrame = (function (_super) {
    __extends(SettingFrame, _super);
    function SettingFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SettingFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/SettingLayout.exml"];
    };
    SettingFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        //this.setFullScreen(true)
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "label_title", _a["title"] = Localize_cns("PALYER_DETAILS_TXT3"), _a["event_name"] = null, _a["fun_index"] = null, _a),
            (_b = {}, _b["name"] = "label_music", _b["title"] = Localize_cns("SETTING_TXT1"), _b["event_name"] = null, _b["fun_index"] = null, _b),
            (_c = {}, _c["name"] = "label_effect", _c["title"] = Localize_cns("SETTING_TXT2"), _c["event_name"] = null, _c["fun_index"] = null, _c),
            (_d = {}, _d["name"] = "label_player", _d["title"] = Localize_cns("SETTING_TXT3"), _d["event_name"] = null, _d["fun_index"] = null, _d),
            (_e = {}, _e["name"] = "check_music", _e["title"] = null, _e["event_name"] = egret.Event.CHANGE, _e["fun_index"] = this.onMusicCheck, _e),
            (_f = {}, _f["name"] = "check_effect", _f["title"] = null, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onSoundCheck, _f),
            (_g = {}, _g["name"] = "check_player", _g["title"] = null, _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = this.onHidePlayerCheck, _g),
            (_h = {}, _h["name"] = "btn_relogin", _h["title"] = Localize_cns("SETTING_RETURN_LOGIN"), _h["event_name"] = egret.TouchEvent.TOUCH_TAP, _h["fun_index"] = this.onReturnLogin, _h),
            (_j = {}, _j["name"] = "btn_close", _j["title"] = null, _j["event_name"] = egret.TouchEvent.TOUCH_TAP, _j["fun_index"] = this.hideWnd, _j),
            (_k = {}, _k["name"] = "btn_close_top", _k["title"] = null, _k["event_name"] = egret.TouchEvent.TOUCH_TAP, _k["fun_index"] = this.hideWnd, _k),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    };
    SettingFrame.prototype.onUnLoad = function () {
    };
    SettingFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.LOGIN_GUEST_BIND_STATE_UPDATE, this.refreshUI, this);
        RegisterEvent(EventDefine.SERVER_APPLY_STATUS, this.refreshUI, this);
        //RegisterEvent(SdkFunctionDefine.FBShare, this.onShareReturn, this)
        this.refreshUI();
        this.SetSeverTime();
        this.mLayoutNode.visible = true;
    };
    SettingFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.LOGIN_GUEST_BIND_STATE_UPDATE, this.refreshUI, this);
        UnRegisterEvent(EventDefine.SERVER_APPLY_STATUS, this.refreshUI, this);
        //UnRegisterEvent(SdkFunctionDefine.FBShare, this.onShareReturn, this)
        this.mLayoutNode.visible = false;
        this.resetTimer();
    };
    SettingFrame.prototype.refreshUI = function () {
        var bCheck = GameSound.getInstance().getMusicStatus();
        this.mElemList["check_music"].selected = (bCheck);
        //this.mElemList["music_mark"].visible = (false)
        bCheck = GameSound.getInstance().getEffectStatus();
        this.mElemList["check_effect"].selected = (bCheck);
        //this.mElemList["sound_mark"].visible = (false)
        bCheck = ActorManager.getInstance().getShowPlayerStatus();
        this.mElemList["check_player"].selected = (!bCheck);
        //this.mElemList["hideplayer_mark"].visible = (false)
        //let bCheck = GameSound.getInstance().getAutoVoicStatus()	
        //this.mElemList["autoVoice"]:SetCheck(bCheck)
        //
        //
        //刷新屏蔽申请
        //let status = FriendSystem.getInstance().getApplyStatue() 
        //if(status == 0 ){
        //	this.mElemList["refusefriend"]:SetCheck(false)
        //}else{
        //	this.mElemList["refusefriend"]:SetCheck(true)
        //}
        //隐藏所有按钮
        //this.hideAllBtn()
        //this.showBtnList = {}
        //判断需要显示哪些按钮，逐个加入this.showBtnList
        //JsUtil.arrayInstert(this.showBtnList,showBtnList["return_login"])
        //JsUtil.arrayInstert(this.showBtnList,showBtnList["update"])	
        //let showService = SdkHelper.getInstance().getStringConfigDef("ShowOfficialUrl", "1")
        //if(false && showService != "0" && ! GAME_FRESH == true ){
        //	JsUtil.arrayInstert(this.showBtnList,showBtnList["offical_web"])
        //}
        //JsUtil.arrayInstert(this.showBtnList,showBtnList["return_login"])
        ////如果是可以绑定，但是还没绑定的，就显示绑定按钮
        //if(! LoginSystem.getInstance().isBindAccount() ){
        //	JsUtil.arrayInstert(this.showBtnList,showBtnList["roleBingAccount"])
        //}
        //JsUtil.arrayInstert(this.showBtnList,showBtnList["noticeConfig"])
        //let showService = SdkHelper.getInstance().getStringConfigDef("ShowServiceInSetting", "0")
        //if(showService != "0" ){
        //	JsUtil.arrayInstert(this.showBtnList,showBtnList["showService"])
        //}
        //判断需要显示哪些按钮 }
        //排序按钮 根据index
        //function sortFunc(a,b){
        //	return a.index > b.index
        //}
        //table_sort(this.showBtnList,sortFunc)
        ////排序按钮 }
        //for(let i = 1; i <=  this.showBtnList.length,1;i++){
        //	let info = this.showBtnList[i]
        //	let btn = this.mElemList["btn"..i]
        //	let btnName = Localize_cns(info.btnName)
        //	btn.text = (btnName)
        //	btn.visible = (true)
        //}
    };
    //hideAllBtn( args){
    //	for(let i = 1; i <=  6 , 1;i++){
    //		let btn = this.mElemList["btn"..i]
    //		if(btn ){
    //			btn.visible = (false)
    //		}
    //	}	
    //}
    SettingFrame.prototype.onMusicCheck = function (args) {
        var btn = args.target;
        GameSound.getInstance().setMusicStatus(btn.selected);
    };
    //
    SettingFrame.prototype.onSoundCheck = function (args) {
        var btn = args.target;
        GameSound.getInstance().setEffectStatus(btn.selected);
    };
    //
    SettingFrame.prototype.onHidePlayerCheck = function (args) {
        var btn = args.target;
        ActorManager.getInstance().setShowPlayerStatus(!btn.selected);
    };
    //
    // onRefuseFriendCheck(args) {
    //     let check = this.mElemList["refusefriend"]:GetCheck()
    //     //Config.getInstance().setRoleSetting("bool","refusefriend",check)
    //     let setStatus = 0
    //     if (check) {
    //         setStatus = 1
    //     }
    //     let getStatus = FriendSystem.getInstance().getApplyStatue()
    //     if (getStatus != setStatus) {
    //         FriendSystem.getInstance().setMsgToSetApplyStatue(setStatus)
    //     }
    // }
    SettingFrame.prototype.onReturnLogin = function (args) {
        ConfirmRetryLogin(Localize_cns("RETURN_LOGIN_CONFIRM"), false);
    };
    SettingFrame.prototype.onClickHandbook = function (args) {
        WngMrg.getInstance().showWindow("HandbookFrame");
    };
    SettingFrame.prototype.SetSeverTime = function () {
        function TimeRun() {
            var time1 = GetServerTime();
            var text = getFormatTimeSec(time1);
            this.mElemList["severTime"].text = (Localize_cns("SETTING_SERVER_TIME") + "  " + text);
        }
        if (!this.serverTimer) {
            this.serverTimer = SetTimer(TimeRun, this, 1000, true); //延时3秒，为了可以正常加载地图
        }
    };
    SettingFrame.prototype.resetTimer = function () {
        if (this.serverTimer) {
            KillTimer(this.serverTimer);
            this.serverTimer = null;
        }
    };
    SettingFrame.prototype.onUpdateCheck = function (args) {
        var wnd = WngMrg.getInstance().getWindow("UpdateNoticeFrame");
        wnd.showWnd();
    };
    return SettingFrame;
}(BaseWnd));
__reflect(SettingFrame.prototype, "SettingFrame");
//# sourceMappingURL=SettingFrame.js.map