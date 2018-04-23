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
var OfficiailHttpAccountAuthWorker = (function (_super) {
    __extends(OfficiailHttpAccountAuthWorker, _super);
    function OfficiailHttpAccountAuthWorker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OfficiailHttpAccountAuthWorker.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.userData = params[0];
        this.target = params[1];
        this.callback = params[2];
        this.http_url = IGlobal.sdkHelper.getStringConfigDef("AuthUrl");
    };
    OfficiailHttpAccountAuthWorker.prototype.destory = function () {
    };
    OfficiailHttpAccountAuthWorker.prototype.send = function () {
        var md5_content = "appId=" + this.userData.AppId +
            "&password=" + this.userData.PassWord +
            "&accountId=" + this.userData.UserName +
            "&clientKey=" + this.userData.ClientId;
        //todo:yangguiming
        var md5_string = "11";
        var full_url = this.http_url + "?accountId=" + this.userData.UserName +
            "&password=" + this.userData.PassWord +
            "&appId=" + this.userData.AppId +
            "&sign=" + md5_string +
            "&time=" + GetOSTime();
        IGlobal.httpClient.send(full_url, this, 0);
    };
    OfficiailHttpAccountAuthWorker.prototype.onHttpResponse = function (url, data, userData) {
        var param = JsUtil.JsonDecode(data);
        this.callback.call(this.target, url, param);
    };
    OfficiailHttpAccountAuthWorker.prototype.onHttpError = function (url, userData) {
        var param = {};
        param.code = -1;
        this.callback.call(this.target, url, param);
        FireEvent(EventDefine.MSG_WAIT_END, null);
    };
    return OfficiailHttpAccountAuthWorker;
}(TClass));
__reflect(OfficiailHttpAccountAuthWorker.prototype, "OfficiailHttpAccountAuthWorker", ["core.IHttpCallback"]);
//# sourceMappingURL=OfficiailHttpAccountAuthWorker.js.map