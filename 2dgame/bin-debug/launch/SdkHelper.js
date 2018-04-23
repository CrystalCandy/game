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
function SDKAnalyzer(eventId, eventStr) {
    if (eventId == null) {
        TLog.Throw();
    }
    //TLog.Debug("SDKAnalyzer", eventId)
    if (GAME_NORMAL == GAME_MODE) {
        eventStr = eventStr || "";
        TLog.Debug("=========SDKAnalyzer %s %s", eventId, eventStr);
        //Core.IGameSdk.inst.CallAnalytics("name="+eventId+'&body='+eventStr)
    }
}
// class PayEventArgs extends core.EventArgs {
//     code: number;
//     params: string;
// }
var SdkHelper = (function (_super) {
    __extends(SdkHelper, _super);
    function SdkHelper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //initWithJson(json:string){
    //    this.mConfig = new core.ConfigFile;
    //    this.mConfig.initWithJson(json);
    //}
    SdkHelper.prototype.getStringConfigDef = function (key, def) {
        return IGlobal.gameSdk.getStringConfigDef(key, def);
        //return this.mConfig.getString(key, def);        
    };
    SdkHelper.prototype.getBoolConfigDef = function (key, def) {
        return IGlobal.gameSdk.getBoolConfigDef(key, def);
        //return this.mConfig.getBoolean(key, def);
    };
    SdkHelper.prototype.getSdkMode = function () {
        var isOffical = this.getBoolConfigDef("IsOfficialLogin");
        return isOffical ? SdkMode.Officiail : SdkMode.ThirdPartySDK;
    };
    SdkHelper.prototype.callSdk = function (strFun, param) {
    };
    SdkHelper.prototype.callPay = function (payParams) {
        IGlobal.gameSdk.callPay(payParams);
    };
    SdkHelper.prototype.authToSdk = function (loginInfo, callback, target) {
        if (this.subscribe != true) {
            IGlobal.gameSdk.addEventListener(core.GameSdk.LoginEvent, this.onAuthReponse, this);
            this.subscribe = true;
        }
        //TLog.Debug("SdkHelper.authToSdk", loginType, callback, target, target.classname,  tostring(this))
        //GameSdk.instance.GetSrvListSuccessToSdk(json)
        this.autoCallback = callback;
        this.callbackTarget = target;
        IGlobal.gameSdk.callLogin(loginInfo);
    };
    SdkHelper.prototype.onAuthReponse = function (args) {
        var timerId = null;
        function onAuthRetCallback(delay) {
            if (timerId != null) {
                KillTimer(timerId);
                timerId = null;
            }
            if (this.autoCallback) {
                this.autoCallback.call(this.callbackTarget, this.resultEvent.code, this.resultEvent.params);
            }
        }
        this.resultEvent = args;
        timerId = SetTimer(onAuthRetCallback, this, 1);
    };
    return SdkHelper;
}(core.EventSet));
__reflect(SdkHelper.prototype, "SdkHelper");
//# sourceMappingURL=SdkHelper.js.map