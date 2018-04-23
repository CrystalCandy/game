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
var GameAccount = (function (_super) {
    __extends(GameAccount, _super);
    function GameAccount() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mAccountId = ""; //账号ID
        _this.mToken = "";
        _this.mUserName = ""; //用户账号
        _this.mUserLoginName = ""; //登陆账号显示的，如果平台没指定则用UserName
        _this.mUserNickName = ""; //创建角色时用
        _this.mTimeStamp = "";
        _this.mLoginIp = "";
        _this.mLoginPort = 0;
        _this.mLoginHostName = "";
        _this.mLoginSessionId = "";
        _this.mGameIp = "";
        _this.mGamePort = 0;
        _this.mGameSessionId = "";
        _this.mQdInfo = null; //渠道信息
        _this.mAuthorInfo = null; //认证信息
        _this.mBrigeInfo = null; //桥连接信息
        return _this;
    }
    GameAccount.prototype.setToken = function (value) {
        this.mToken = value;
    };
    GameAccount.prototype.getToken = function () {
        return this.mToken;
    };
    //账号ID
    GameAccount.prototype.setAccountId = function (value) {
        this.mAccountId = value;
    };
    GameAccount.prototype.getAccountId = function () {
        return this.mAccountId;
    };
    //用户名
    GameAccount.prototype.setUserName = function (value) {
        this.mUserName = value;
    };
    GameAccount.prototype.getUserName = function () {
        return this.mUserName;
    };
    //用户登陆显示名
    GameAccount.prototype.setUserLoginName = function (value) {
        this.mUserLoginName = value;
    };
    GameAccount.prototype.getUserLoginName = function () {
        return this.mUserLoginName;
    };
    //用户呢称
    GameAccount.prototype.setUserNickName = function (value) {
        this.mUserNickName = value;
    };
    GameAccount.prototype.getUserNickName = function () {
        return this.mUserNickName;
    };
    //密码
    GameAccount.prototype.setTimeStamp = function (value) {
        this.mTimeStamp = value;
    };
    GameAccount.prototype.getTimeStamp = function () {
        return this.mTimeStamp;
    };
    //登陆服务IP端口
    GameAccount.prototype.setLoginIpAndPort = function (id, port) {
        this.mLoginIp = id;
        this.mLoginPort = port;
    };
    GameAccount.prototype.getLoginIp = function () {
        return this.mLoginIp;
    };
    GameAccount.prototype.getLoginPort = function () {
        return this.mLoginPort;
    };
    //登陆服务别名
    GameAccount.prototype.setLoginHostName = function (value) {
        this.mLoginHostName = value;
    };
    GameAccount.prototype.getLoginHostName = function () {
        return this.mLoginHostName;
    };
    //当前登陆服务会话ID
    GameAccount.prototype.setLoginSessionId = function (value) {
        this.mLoginSessionId = value;
    };
    GameAccount.prototype.getLoginSessionId = function () {
        return this.mLoginSessionId;
    };
    //游戏服务IP端口
    GameAccount.prototype.setGameIpAndPort = function (id, port) {
        this.mGameIp = id;
        this.mGamePort = port;
    };
    GameAccount.prototype.getGameIp = function () {
        return this.mGameIp;
    };
    GameAccount.prototype.getGamePort = function () {
        return this.mGamePort;
    };
    //当前登陆服务会话ID
    GameAccount.prototype.setGameSessionId = function (value) {
        this.mGameSessionId = value;
    };
    GameAccount.prototype.getGameSessionId = function () {
        return this.mGameSessionId;
    };
    //渠道信息
    GameAccount.prototype.setQDInfo = function (qdKey, qdCode1, qdCode2, deviceid) {
        this.mQdInfo = this.mQdInfo || {};
        this.mQdInfo.qdKey = qdKey;
        this.mQdInfo.qdCode1 = qdCode1;
        this.mQdInfo.qdCode2 = qdCode2;
        this.mQdInfo.deviceid = deviceid;
    };
    GameAccount.prototype.getQDInfo = function () {
        return this.mQdInfo;
    };
    //认证信息
    GameAccount.prototype.setAuthorInfo = function (authorInfo) {
        this.mUserName = "";
        if (authorInfo) {
            this.mUserName = authorInfo.userId;
            if (authorInfo.userId == null) {
                this.mUserName = authorInfo.openid;
            }
            this.mUserNickName = authorInfo.nickname; //创建角色时用
            this.mUserLoginName = authorInfo.title; //显示登陆时用
            if (authorInfo.title == null) {
                this.mUserLoginName = this.mUserName;
            }
        }
        this.mAuthorInfo = authorInfo;
    };
    GameAccount.prototype.getAuthorInfo = function () {
        return this.mAuthorInfo;
    };
    //桥连接信息
    GameAccount.prototype.setBrigeInfo = function (value) {
        this.mBrigeInfo = value;
    };
    GameAccount.prototype.getBrigeInfo = function () {
        return this.mBrigeInfo;
    };
    return GameAccount;
}(TClass));
__reflect(GameAccount.prototype, "GameAccount");
//# sourceMappingURL=GameAccount.js.map