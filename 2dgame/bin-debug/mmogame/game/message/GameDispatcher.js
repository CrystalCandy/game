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
function setNetFromConfig(net, key) {
    var encrypt = IGlobal.setting.getCommonSetting(UserSetting.TYPE_BOOLEAN, "encrypt", true);
    var decrypt = IGlobal.setting.getCommonSetting(UserSetting.TYPE_BOOLEAN, "decrypt", true);
    var encrypt_seed = IGlobal.setting.getCommonSetting(UserSetting.TYPE_NUMBER, "encrypt_seed", 11);
    var decrypt_seed = IGlobal.setting.getCommonSetting(UserSetting.TYPE_NUMBER, "decrypt_seed", 11);
    var sendSerialNumber = IGlobal.setting.getCommonSetting(UserSetting.TYPE_BOOLEAN, "send_serial_number", true);
    net.setEncrypt(encrypt, decrypt);
    //net.SetKey(encrypt_key, decrypt_key)
    net.setSeed(encrypt_seed, decrypt_seed);
    net.setSendSerialNumber(sendSerialNumber);
}
var LoginNetDispatcher = (function (_super) {
    __extends(LoginNetDispatcher, _super);
    function LoginNetDispatcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginNetDispatcher.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        setNetFromConfig(this.mNetWork, "login_net");
    };
    return LoginNetDispatcher;
}(MessageDispatcher));
__reflect(LoginNetDispatcher.prototype, "LoginNetDispatcher");
var GameNetDispatcher = (function (_super) {
    __extends(GameNetDispatcher, _super);
    function GameNetDispatcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameNetDispatcher.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        setNetFromConfig(this.mNetWork, "game_net");
    };
    return GameNetDispatcher;
}(MessageDispatcher));
__reflect(GameNetDispatcher.prototype, "GameNetDispatcher");
var s_LoginNetDispatcher = null;
function SendLoginMessage(message) {
    if (PrecedureManager.getInstance().getCurrentPrecedureId() != PRECEDURE_LOGIN) {
        return;
    }
    if (s_LoginNetDispatcher == null) {
        s_LoginNetDispatcher = LoginNetDispatcher.getInstance();
    }
    if (s_LoginNetDispatcher.isConnect() == false) {
        return;
    }
    s_LoginNetDispatcher.sendPacket(message);
}
var s_GameNetDispatcher = null;
function SendGameMessage(message, wait) {
    if (PrecedureManager.getInstance().getCurrentPrecedureId() != PRECEDURE_GAME) {
        return;
    }
    if (s_GameNetDispatcher == null) {
        s_GameNetDispatcher = GameNetDispatcher.getInstance();
    }
    if (s_GameNetDispatcher.isConnect() == false) {
        return;
    }
    if (wait) {
        //s_GameNetDispatcher.addWaitingMsg(message)
    }
    s_GameNetDispatcher.sendPacket(message);
}
//# sourceMappingURL=GameDispatcher.js.map