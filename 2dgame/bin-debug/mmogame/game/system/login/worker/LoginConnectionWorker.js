//登陆连接
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
var LoginConnectionWorker = (function (_super) {
    __extends(LoginConnectionWorker, _super);
    function LoginConnectionWorker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginConnectionWorker.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    LoginConnectionWorker.prototype.destory = function () {
    };
    LoginConnectionWorker.prototype.send = function () {
        var brigeInfo = GameAccount.getInstance().getBrigeInfo();
        if (brigeInfo == null) {
            TLog.Error("sendConnectRequest brigeInfo == nil");
            return;
        }
        var account = GameAccount.getInstance();
        var ip = account.getLoginIp();
        var port = account.getLoginPort();
        LoginNetDispatcher.getInstance().disconnect();
        LoginNetDispatcher.getInstance().connect(ip, port);
        //记录桥信息
        account.setAccountId(brigeInfo.identityId);
        account.setTimeStamp(brigeInfo.tstamp);
        account.setToken(brigeInfo.sign);
        account.setQDInfo(brigeInfo.qdKey, brigeInfo.code1, brigeInfo.code2, brigeInfo.deviceid);
    };
    return LoginConnectionWorker;
}(TClass));
__reflect(LoginConnectionWorker.prototype, "LoginConnectionWorker");
//# sourceMappingURL=LoginConnectionWorker.js.map