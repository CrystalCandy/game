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
var AlluGameSdk = (function (_super) {
    __extends(AlluGameSdk, _super);
    function AlluGameSdk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AlluGameSdk.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mGameSdk = params[0];
        AlluGameSdk.inst = this;
        this.minit = false;
    };
    AlluGameSdk._initCallback = function () {
        TLog.Debug("static AlluGameSdk::_initCallback");
        AlluGameSdk.inst.initCallback();
    };
    AlluGameSdk.prototype.initCallback = function () {
        TLog.Debug("AlluGameSdk::initCallback");
        //this.mGameSdk.onInitSdkReturn(true);
        this.checkInviteStatus();
        this.setInviteCallback();
        this.checkAttentionStatus();
    };
    // resetServerListUrl() {
    //     //this.mplatform = this.mGameSdk.getFromCmdLine("platform");
    //     //this.mplatform_id = this.mGameSdk.getFromCmdLine("platform_id");
    //     //if (this.mplatform != null && this.mplatform.length > 1 && this.mplatform_id != null && this.mplatform_id.length > 1){
    //     //    //url = http://192.168.1.254/console/common/serverlist.php?platform=allu
    //     //    let url = this.mowner.getServerListUrl();
    //     //    let splitindex = url.indexOf("?");
    //     //    if (splitindex != -1){
    //     //        let newurl = url.substr(0, splitindex);
    //     //        newurl = newurl + "?platform=" + this.mplatform + this.mplatform_id;
    //     //        this.mowner.setServerListUrl(newurl);
    //     //    }
    //     //}
    // }
    // //设置账号信息，登陆时就不需要账号和密码了..
    // setAccountInfo() {
    //     //let openid = this.mGameSdk.getFromCmdLine("openid");
    //     //let noice = this.mGameSdk.getFromCmdLine("noice");
    //     //let sign = this.mGameSdk.getFromCmdLine("sign");
    //     if (this.mopenid != null && this.mnoice != null && this.msign != null) {
    //         let openkey = this.mGameSdk.getFromCmdLine("openkey");
    //         let appid = this.mGameSdk.getFromCmdLine("appid");
    //         //这三样都有，就已经是经过 sdk登陆了
    //         var gameKey = this.mGameSdk.getStringConfigDef("GameKey");
    //         var gameName = this.mGameSdk.getStringConfigDef("GameName");
    //         var qdKey = this.mGameSdk.getStringConfigDef("QD_Key");
    //         var code1 = this.mGameSdk.getStringConfigDef("QD_Code1");
    //         var code2 = this.mGameSdk.getStringConfigDef("QD_Code2");
    //         var authorInfo: any = {};
    //         authorInfo.userId = this.mopenid; //账号ID，目前和userName废弃
    //         authorInfo.userName = this.mopenid;
    //         authorInfo.sign = this.msign;
    //         authorInfo.tstamp = this.mnoice;
    //         authorInfo.loginKey = openkey;
    //         authorInfo.code1 = qdKey;
    //         authorInfo.code2 = code2;
    //         authorInfo.qdKey = qdKey;
    //         authorInfo.deviceid = "pc";
    //         authorInfo.gameKey = gameKey;
    //         authorInfo.gameName = gameName;
    //         GameAccount.getInstance().setAuthorInfo(authorInfo)
    //     }
    // }
    //检查关注状态
    AlluGameSdk._checkAttentionStatusCallback = function (status) {
        TLog.Debug("_checkAttentionStatusCallback", status);
        AlluGameSdk.inst.checkAttentionStatusCallback(status);
    };
    AlluGameSdk.prototype.checkAttentionStatusCallback = function (status) {
        TLog.Debug("AlluGameSdk::checkAttentionStatusCallback", status);
        this.mGameSdk.setAttentionStatus(status);
    };
    AlluGameSdk.prototype.checkAttentionStatus = function () {
        TLog.Debug("AlluGameSdk::checkAttentionStatus");
        var appid = this.mappid;
        var openid = this.mopenid;
        var openkey = this.mopenkey;
        allusdk_getFocusState(appid, openid, openkey, AlluGameSdk._checkAttentionStatusCallback);
    };
    //检查是不是可以开分享功能
    AlluGameSdk._checkInviteStatusCallback = function (status) {
        TLog.Debug("_checkInviteStatusCallback", status);
        AlluGameSdk.inst.checkInviteStatusCallback(status);
    };
    AlluGameSdk.prototype.checkInviteStatusCallback = function (status) {
        TLog.Debug("AlluGameSdk::checkInviteStatusCallback", status);
        this.mGameSdk.setSupportInvite(status);
    };
    AlluGameSdk.prototype.checkInviteStatus = function () {
        TLog.Debug("AlluGameSdk::checkInviteStatus");
        allusdk_isOpenShare(AlluGameSdk._checkInviteStatusCallback);
    };
    //分享返回
    AlluGameSdk._onInviteReturnCallback = function (ret) {
        TLog.Debug("_onInviteReturnCallback", ret);
        AlluGameSdk.inst.onInviteReturnCallback(ret);
    };
    AlluGameSdk.prototype.onInviteReturnCallback = function (ret) {
        TLog.Debug("AlluGameSdk::onInviteReturnCallback", ret);
        this.mGameSdk.onInviteReturn(ret);
    };
    AlluGameSdk.prototype.setInviteCallback = function () {
        TLog.Debug("AlluGameSdk::setInviteCallback");
        allusdk_setShareCallback(AlluGameSdk._onInviteReturnCallback);
    };
    // setServerId() {
    //     let zoneid: number = tonumber(this.mserverid);
    //     LoginSystem.getInstance().setTargetServerId(zoneid)
    // }
    AlluGameSdk.prototype.initSdk = function () {
        //$url = $gameUrl."?a=b&openid=".$openId."&openkey=".$openKey."&noice=".$noice."&appid=".$appId."&opensign=".$sign."&sign=".$yixiuMd5Encode."&serverid=".$serverId."&platformid=".$platformId."&platform=".$platform;
        this.mopenid = this.mGameSdk.getFromCmdLine("openid");
        this.mopenkey = this.mGameSdk.getFromCmdLine("openkey");
        this.mnoice = this.mGameSdk.getFromCmdLine("noice");
        this.mappid = this.mGameSdk.getFromCmdLine("appid");
        this.mopensign = this.mGameSdk.getFromCmdLine("opensign");
        this.msign = this.mGameSdk.getFromCmdLine("sign");
        this.mserverid = this.mGameSdk.getFromCmdLine("serverid");
        this.mopenplatformid = this.mGameSdk.getFromCmdLine("platformid");
        this.mopenplatform = this.mGameSdk.getFromCmdLine("platform");
        if (this.mopenid == null || this.mopenid.length <= 1) {
            return false;
        }
        var appid = this.mappid; //AlluGameSdk.APPID;
        var shareinfo = {
            title: '乱斗全明星',
            imgUrl: 'ldqmx.cdnunion.com/h5mxdld/share_icon4.jpg',
            desc: '二次元女神大乱斗，快来帮我收服这个水兵月！',
            openId: this.mopenid
            //status:this.mserverid
        };
        var test = true;
        TLog.Debug("AlluGameSdk::initSdk", appid);
        var cheat = false;
        if (cheat) {
            TLog.Debug("AlluGameSdk::initSdk cheat");
            this.mGameSdk.setAttentionStatus(0);
            this.mGameSdk.setSupportInvite(true);
            this.minit = true;
            return true;
        }
        TLog.Debug("AlluGameSdk::initSdk", "call allusdk_init");
        this.minit = allusdk_init(appid, AlluGameSdk._initCallback, shareinfo, test);
        if (this.minit != true) {
            return false;
        }
        // this.resetServerListUrl();
        // this.setAccountInfo();
        //this.setServerId(); 
        //allusdk.init(appid, _initCallback, shareinfo, test);
        return true;
    };
    AlluGameSdk.prototype._payCallback = function (result) {
        this.payCallback(result);
    };
    AlluGameSdk.prototype.payCallback = function (result) {
        //res:状态码 -1失败 0取消 1成功
        if (result == 1) {
            this.mGameSdk.onPayReturn(0, "ok");
        }
        else if (result == 0) {
            this.mGameSdk.onPayReturn(-2, "cancel");
        }
        else {
            this.mGameSdk.onPayReturn(-3, "error code:" + result);
        }
    };
    AlluGameSdk.prototype.login = function (params) {
        var openid = this.mGameSdk.getFromCmdLine("openid");
        var noice = this.mGameSdk.getFromCmdLine("noice");
        var sign = this.mGameSdk.getFromCmdLine("sign");
        var openkey = this.mGameSdk.getFromCmdLine("openkey");
        var appid = this.mGameSdk.getFromCmdLine("appid");
        var loginInfo = {};
        loginInfo.openid = openid;
        loginInfo.tstamp = noice;
        loginInfo.sign = sign;
        loginInfo.loginKey = openkey;
        loginInfo.openid = openid;
        var paramsStr = core.GameSdkUtil.httpParamsToString(loginInfo);
        this.mGameSdk.onLoginReturn(0, paramsStr);
        return true;
    };
    AlluGameSdk.prototype.pay = function (itemparams) {
        if (this.minit != true) {
            return false;
        }
        var paramlist = core.GameSdkUtil.splitHttpParams(itemparams);
        //let payParams = "title="+title+"&acctType="+title+"&saveValue="+saveValue+"&payMoney="+ rechargeAdd + "&zoneId=" + zoneId + "&roleId=" + roleId + "&itemId=" + itemid
        //payParams = payParams + "&roleName="+"blank" + "&roleLevel="+roleLevel + "&roleMission="+roleMission
        //payParams = payParams + "&accountId="+accountId
        //payParams = payParams + "&thirdPayLevel="+thirdPayLevel //google商店下，开启第三方支付的等级
        //payParams = payParams + "&isItemShop="+isItemShop //是否月卡        
        //        {
        //        orderNo:'',
        //        ext:'',//需要透传的参数 充值后的回调会回传
        //        appId:11923893,
        //        openId:'',
        //        openKey:'',
        //        appUserName:'昵称',
        //        subject:'元宝'//道具名
        //        }
        var itemname = paramlist['saveValue'] + paramlist['title'];
        if (paramlist['itemId'] == "1000") {
            itemname = paramlist['title'];
        }
        var amount = core.GameSdkUtil.toNumber(paramlist['payMoney']) * 100;
        //$zoneid,$roleid, $ts, $role_level, $role_mission
        var curtime = core.GameSdkUtil.getOSTime();
        var ext = paramlist['itemId'] + "_" + paramlist['zoneId'] + "_" + paramlist['roleId'] + "_" + paramlist['roleName'] + "_" + curtime + "_" + paramlist['roleLevel'] + "_" + paramlist['roleMission'];
        var itemData = {
            "orderNo": ext,
            "ext": ext,
            "appId": this.mappid,
            "openId": this.mopenid,
            "openKey": this.mopenkey,
            "appUserName": paramlist['roleName'],
            "subject": itemname,
        };
        allusdk_payOne(amount, itemData, this._payCallback);
        return true;
    };
    AlluGameSdk.prototype.showShare = function (params) {
        if (this.minit != true) {
            return false;
        }
        allusdk_showShare();
        return true;
    };
    AlluGameSdk.prototype.showAttention = function (params) {
        if (this.minit != true) {
            return false;
        }
        allusdk_showSDKQrCode();
        return true;
    };
    AlluGameSdk.prototype.reportRoleCreate = function (serverid, servername, roleid, rolename, rolelevel) {
        TLog.Debug("AlluGameSdk::reportRoleCreate", roleid);
        if (this.minit != true) {
            return false;
        }
        allusdk_reportRoleCreate(serverid, this.mopenid, rolename, rolelevel, this.mplatform_id);
        return true;
    };
    AlluGameSdk.prototype.reportRoleLogin = function (serverid, servername, roleid, rolename, rolelevel) {
        TLog.Debug("AlluGameSdk::reportRoleLogin", roleid);
        if (this.minit != true) {
            return false;
        }
        allusdk_reportRoleLogin(serverid, this.mopenid, rolename, rolelevel, this.mplatform_id);
        return true;
    };
    AlluGameSdk.APPID = "g2460d3bf0ce7495dc";
    AlluGameSdk.APPKEY = "2bc39abf3291a4ccadca4640e646ec00";
    return AlluGameSdk;
}(TClass));
__reflect(AlluGameSdk.prototype, "AlluGameSdk", ["InterfaceGameSdk"]);
