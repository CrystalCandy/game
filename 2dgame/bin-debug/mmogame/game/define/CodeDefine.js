/*
作者:
    yangguiming
    
创建时间：
   2013.6.07(周五)

意图：
   客户端定义的操作码

公共接口：
   
*/
var ServerOpcodes = {
    MSG_NULL: 0,
    CMSG_PING: 1,
    SMSG_PONG: 2,
    CMSG_COMM: 10,
    CMSG_LOGIN: 11,
    SMSG_LOGIN: 12,
    CMSG_LOGOUT: 13,
    SMSG_LOGOUT: 14,
    CMSG_LOGIN_USER: 15,
    SMSG_LOGIN_USER: 16,
};
var ServerOpcodesName = {};
for (var k in ServerOpcodes) {
    var v = ServerOpcodes[k];
    ServerOpcodesName[v] = k;
}
var LoginOpcodes = {
    C2L_CONNECT: 17,
    L2C_CONNECT: 18,
    C2L_STATE: 22,
    L2C_STATE: 23,
    C2L_VERSION: 24,
    L2C_VERSION: 25,
    C2L_VERVIFY_CODE: 26,
    L2C_VERVIRY_CODE: 27,
    C2L_ROLE_SELECT: 28,
    L2C_ROLE_SELECT: 29,
    C2L_ROLE_LIST: 30,
    L2C_ROLE_LIST: 31,
    C2L_ROLE_CREATE: 32,
    L2C_ROLE_CREATE: 33,
    L2C_QUEUE_UPDATE: 36,
};
var LoginOpcodesName = {};
for (var k in LoginOpcodes) {
    var v = LoginOpcodes[k];
    LoginOpcodesName[v] = k;
}
var ErrorCode = {
    ERR_OK: 0,
    //ERR_UNKNOWN : 1,
    //ERR_USERNAME_FAIL : 2,							// 用户名错
    //ERR_PASSWD_FAIL : 3,								// 密码错
    //ERR_USER_BLANK : 2,									//用户名为空
    //ERR_PSW_BLANK : 3,									//密码为空
    ERR_USER_NULL: 4,
    ERR_PSW_FAIL: 5,
    ERR_LOGIN_REPEAT: 1001,
    ERR_REGIONSERVER_FAIL: 1002,
    ERR_VERIFYCODE_MISMATCH: 1003,
    ERR_SESSIONKEY_FAIL: 1004,
    ERR_GAMESERVER_UNREACHED: 1005,
    ERR_FORBID_LOGIN: 1006,
    ERR_DBSERVER_UNREACHED: 1007,
    ERR_FORCE_LOGOUT: 1008,
    ERR_CONNECT_NOTFOUND: 1009,
    ERR_ATIVESERVER_FAIL: 1010,
    ERR_RELAY_HOST: 1011,
    ERR_REACH_MAXLIMIT: 1012,
};
var StaticTexDefine = {};
//错误码文本
function errCode2Text(result) {
    var msg = null;
    if (result == ErrorCode.ERR_UNKNOWN) {
        msg = "ERR_UNKNOWN";
        //}else if(result == ErrorCode.ERR_USERNAME_FAIL ){
        //	msg = "ERR_USERNAME_FAIL"
        //}else if(result == ErrorCode.ERR_PASSWD_FAIL ){
        //	msg = "ERR_PASSWD_FAIL"
    }
    else if (result == ErrorCode.ERR_USER_NULL) {
        msg = "ERR_USER_NULL";
    }
    else if (result == ErrorCode.ERR_PSW_FAIL) {
        msg = "ERR_PSW_FAIL";
    }
    else if (result == ErrorCode.ERR_LOGIN_REPEAT) {
        msg = "ERR_LOGIN_REPEAT";
    }
    else if (result == ErrorCode.ERR_REGIONSERVER_FAIL) {
        msg = "ERR_REGIONSERVER_FAIL";
    }
    else if (result == ErrorCode.ERR_VERIFYCODE_MISMATCH) {
        msg = "ERR_VERIFYCODE_MISMATCH";
    }
    else if (result == ErrorCode.ERR_SESSIONKEY_FAIL) {
        msg = "ERR_SESSIONKEY_FAIL";
    }
    else if (result == ErrorCode.ERR_GAMESERVER_UNREACHED) {
        msg = "ERR_GAMESERVER_UNREACHED";
    }
    else if (result == ErrorCode.ERR_FORBID_LOGIN) {
        msg = "ERR_FORBID_LOGIN";
    }
    else if (result == ErrorCode.ERR_DBSERVER_UNREACHED) {
        msg = "ERR_DBSERVER_UNREACHED";
    }
    else if (result == ErrorCode.ERR_FORCE_LOGOUT) {
        msg = "ERR_FORCE_LOGOUT";
    }
    else if (result == ErrorCode.ERR_CONNECT_NOTFOUND) {
        msg = "ERR_CONNECT_NOTFOUND";
    }
    else if (result == ErrorCode.ERR_ATIVESERVER_FAIL) {
        msg = "ERR_ATIVESERVER_FAIL";
    }
    else if (result == ErrorCode.ERR_RELAY_HOST) {
        msg = "ERR_RELAY_HOST";
    }
    else if (result == ErrorCode.ERR_REACH_MAXLIMIT) {
        //enter_game_transition.destroy_change()
        msg = "ERR_REACH_MAXLIMIT";
    }
    else {
        msg = "ERR_ERROR_OTHER";
    }
    //TLog.Debug("login_net.ShowErrCode", result)
    //if(msg ){
    //	MsgSystem.ConfirmDialog_YES( string.format(Localize_cns(msg), result) )
    //}
    return msg;
}
//# sourceMappingURL=CodeDefine.js.map