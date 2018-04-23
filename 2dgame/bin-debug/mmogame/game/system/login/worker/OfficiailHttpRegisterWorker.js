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
var OfficiailHttpRegisterWorker = (function (_super) {
    __extends(OfficiailHttpRegisterWorker, _super);
    function OfficiailHttpRegisterWorker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OfficiailHttpRegisterWorker.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.userData = params[0];
        this.target = params[1];
        this.callback = params[2];
        this.http_url = IGlobal.sdkHelper.getStringConfigDef("RegisterUrl");
    };
    OfficiailHttpRegisterWorker.prototype.destory = function () {
    };
    OfficiailHttpRegisterWorker.prototype.send = function () {
        var request_url = this.http_url + "?accountId=" + this.userData.ACC
            + "&password=" + this.userData.PWD;
        TLog.Debug(request_url);
        IGlobal.httpClient.send(request_url, this, 0);
        FireEvent(EventDefine.MSG_WAIT_BEGIN, null);
    };
    OfficiailHttpRegisterWorker.prototype.onHttpResponse = function (url, data, userData) {
        var param = JsUtil.JsonDecode(data);
        param.accInfo = this.userData;
        this.callback.call(this.target, param);
        FireEvent(EventDefine.MSG_WAIT_END, null);
    };
    OfficiailHttpRegisterWorker.prototype.onHttpError = function (url, userData) {
        MsgSystem.confirmDialog_YES(Localize_cns("NET_ERROR1"));
        FireEvent(EventDefine.MSG_WAIT_END, null);
    };
    return OfficiailHttpRegisterWorker;
}(TClass));
__reflect(OfficiailHttpRegisterWorker.prototype, "OfficiailHttpRegisterWorker", ["core.IHttpCallback"]);
//# sourceMappingURL=OfficiailHttpRegisterWorker.js.map