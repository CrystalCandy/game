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
var BridgeHttpAuthWorker = (function (_super) {
    __extends(BridgeHttpAuthWorker, _super);
    function BridgeHttpAuthWorker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BridgeHttpAuthWorker.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.serverinfo = params[0];
        this.target = params[1];
        this.callback = params[2];
        this.http_url = IGlobal.sdkHelper.getStringConfigDef("BridgeUrl");
    };
    BridgeHttpAuthWorker.prototype.destory = function () {
    };
    BridgeHttpAuthWorker.prototype.send = function () {
        var authorInfo = GameAccount.getInstance().getAuthorInfo();
        var serverId = this.serverinfo.ServerID;
        var request_url = this.http_url + "?serverId=" + serverId;
        for (var k in authorInfo) {
            var v = authorInfo[k];
            request_url = request_url + '&' + k + '=' + v;
        }
        TLog.Debug("request_url", request_url);
        IGlobal.httpClient.send(request_url, this, 0);
    };
    BridgeHttpAuthWorker.prototype.onHttpResponse = function (url, data, userData) {
        var param = JsUtil.JsonDecode(data);
        this.callback.call(this.target, url, param);
    };
    BridgeHttpAuthWorker.prototype.onHttpError = function (url, userData) {
        var param = {};
        param.code = -1;
        this.callback.call(this.target, url, param);
    };
    return BridgeHttpAuthWorker;
}(TClass));
__reflect(BridgeHttpAuthWorker.prototype, "BridgeHttpAuthWorker", ["core.IHttpCallback"]);
//# sourceMappingURL=BridgeHttpAuthWorker.js.map