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
// TypeScript file
var ShareSystem = (function (_super) {
    __extends(ShareSystem, _super);
    function ShareSystem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mShowInviteBtn = false;
        _this.mAttentionStatus = core.GameSdk.NOT_SUPPORT_ATTENTION;
        _this.mHeroEnter = false;
        return _this;
    }
    ShareSystem.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        RegisterEvent(EventDefine.HERO_ENTER_GAME, this.onHeroEnterGame, this);
        //RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.checkShareStatus, this)
        IGlobal.gameSdk.addEventListener(core.GameSdk.SHARE_STATUS_CHANGE, this.checkShareStatus, this);
        IGlobal.gameSdk.addEventListener(core.GameSdk.SHARE_RETURN, this.onClientShareReturn, this);
        IGlobal.gameSdk.addEventListener(core.GameSdk.ATTENTION_STATUS_CHANGE, this.checkAttentionStatus, this);
        this.mShowInviteBtn = (IGlobal.gameSdk.canInvite());
        this.mAttentionStatus = (IGlobal.gameSdk.getAttentionStatus());
    };
    ShareSystem.prototype.destory = function () {
    };
    ShareSystem.prototype.prepareResource = function (workQueue) {
    };
    ShareSystem.prototype.onClear = function () {
    };
    ShareSystem.prototype.onHeroEnterGame = function (args) {
        TLog.Debug("ShareSystem.onHeroEnterGame");
        this.refreshInviteAttentionStatus();
        this.mHeroEnter = true;
    };
    ShareSystem.prototype.refreshInviteAttentionStatus = function () {
        TLog.Debug("ShareSystem.refreshInviteAttentionStatus", this.mShowInviteBtn, this.mAttentionStatus);
        this.setInviteBtnVisible(this.mShowInviteBtn);
        var show = (this.mAttentionStatus == core.GameSdk.NOT_ATTENTION);
        this.setAttentionBtnVisible(show);
        if (this.mAttentionStatus == core.GameSdk.AREADY_ATTENTION) {
            var msg = GetMessage(opCodes.C2G_PLAT_DAILY_SHARE);
            msg.platKey = "h5Attention";
            SendGameMessage(msg);
        }
    };
    ShareSystem.prototype.onClientShareReturn = function (args) {
        TLog.Debug("ShareSystem.onClientShareReturn");
        var msg = GetMessage(opCodes.C2G_PLAT_DAILY_SHARE);
        msg.platKey = "h5DailyShare";
        SendGameMessage(msg);
    };
    ShareSystem.prototype.checkAttentionStatus = function (args) {
        var value = IGlobal.gameSdk.getAttentionStatus();
        this.mAttentionStatus = value;
        TLog.Debug("ShareSystem.checkAttentionStatus", this.mAttentionStatus);
        if (this.mHeroEnter) {
            this.refreshInviteAttentionStatus();
        }
        //let show = (value == core.GameSdk.NOT_ATTENTION)
        //this.setInviteBtnVisible(show)       
    };
    ShareSystem.prototype.checkShareStatus = function (args) {
        var support = IGlobal.gameSdk.canInvite();
        this.mShowInviteBtn = support;
        TLog.Debug("ShareSystem.checkShareStatus", this.mShowInviteBtn);
        if (this.mHeroEnter) {
            this.refreshInviteAttentionStatus();
        }
        //this.setInviteBtnVisible(support)
        //let shareinfo = getSaveRecord("h5DailyShare")
        //let showcd = false
        //let count = 0//今天已经分享了多少次
        //if (shareinfo != null){
        //    let curtime = GetServerTime()
        //    if (curtime < shareinfo[0]){
        //        showcd = true
        //    }
        //    count = shareinfo[1]
        //}
    };
    ShareSystem.prototype.setInviteBtnVisible = function (show) {
        TLog.Debug("ShareSystem.setInviteBtnVisible", show);
        //if (this.mShowInviteBtn == show){
        //    return
        //}
        //this.mShowInviteBtn = show
        var wnd = WngMrg.getInstance().getWindow("MainFrame");
        //wnd.setShowInviteBtn(show)
    };
    ShareSystem.prototype.setAttentionBtnVisible = function (show) {
        TLog.Debug("ShareSystem.setAttentionBtnVisible", show);
        var wnd = WngMrg.getInstance().getWindow("MainFrame");
        //wnd.setShowAttentionBtn(show)
    };
    return ShareSystem;
}(BaseSystem));
__reflect(ShareSystem.prototype, "ShareSystem");
//# sourceMappingURL=ShareSystem.js.map