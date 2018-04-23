//引擎输出的全局对象
var IGlobal;
var GAME_NORMAL = 1;
var GAME_TEST = 2;
var GAME_TOOL = 3;
var TOOL_MODE = 1;
var GAME_MODE = GAME_NORMAL;
var GAME_DEBUG = true;
var GAME_GUIDE = true;
var GAME_FRESH = false; //true是审核版本
//游戏流程定义
var PRECEDURE_VERSION_UPDATE = 19; //验证版本，更新下载
var PRECEDURE_LOADING = 20; //加载阶段
var PRECEDURE_LOGIN = 22; //连接登陆服
var PRECEDURE_GAME = 25; //连接游戏服
var Event_STAGE_RESIZE = "Event_STAGE_RESIZE";
var SdkEventDefine = {
    ACTIVE_APP: "ACTIVE_APP",
    APP_UPDATE: "APP_UPDATE",
    CHECK_VERSION_BEGIN: "CHECK_VERSION_BEGIN",
    CHECK_VERSION_FINISH: "CHECK_VERSION_FINISH",
    DEFINE_RES_BEGIN: "DEFINE_RES_BEGIN",
    DEFINE_RES_FINISH: "DEFINE_RES_FINISH",
    DOWNLOAD_RES_BEGIN: "DOWNLOAD_RES_BEGIN",
    DOWNLOAD_RES_REJECT: "DOWNLOAD_RES_REJECT",
    DOWNLOAD_RES_FINISH: "DOWNLOAD_RES_FINISH",
    FIRST_LOADING_BEGIN: "FIRST_LOADING_BEGIN",
    FIRST_LOADING_FINISH: "FIRST_LOADING_FINISH",
    SERVER_LIST_BEGIN: "SERVER_LIST_BEGIN",
    SERVER_LIST_FINISH: "SERVER_LIST_FINISH",
    SDK_LOGIN_SCRIPT_FINISH: "SDK_LOGIN_SCRIPT_FINISH",
    BRIDGE_BEGIN: "BRIDGE_BEGIN",
    BRIDGE_FINISH: "BRIDGE_FINISH",
    LOGIN_CONNET_BEGIN: "LOGIN_CONNET_BEGIN",
    LOGIN_CONNET_FINISH: "LOGIN_CONNET_FINISH",
    CREATE_ROLE_FINISH: "CREATE_ROLE_FINISH",
    GAME_LOADING_BEGIN: "GAME_LOADING_BEGIN",
    GAME_LOADING_FINISH: "GAME_LOADING_FINISH",
    ENTER_GAMESVR_BEGIN: "ENTER_GAMESVR_BEGIN",
    ENTER_GAMESVR_FINISH: "ENTER_GAMESVR_FINISH",
    ACCOUNT_AUTH_BEGIN: "SdkLogin",
    ACCOUNT_AUTH_FINISH: "SdkLoginReturn",
    SDK_PAY_BEGIN: "SdkPay",
    SDK_PAY_FINISH: "SdkPayReturn",
};
var SdkMode = {
    Officiail: 1,
    ThirdPartySDK: 2 //第三方SDK
};
var SdkFunctionDefine = {
    SetPlayerInfo: "SetPlayerInfo",
    VisitorBind: "VisitorBind",
    QueryVisitorBindState: "QueryVisitorBindState",
    FBLogin: "FBLogin",
    FBLogout: "FBLogout",
    FBShare: "FBShare",
    FBInviteFriendsInfo: "FBInviteFriendsInfo",
    FBInvite: "FBInvite",
    LineShareText: "LineShareText",
    LineShareImage: "LineShareImage",
    ShowServiceView: "ShowServiceView",
    AddNotification: "AddNotification",
    RemoveNotification: "RemoveNotification",
    OnCreateRole: "OnCreateRole",
    OnLevelUp: "OnLevelUp",
    OnEnterGame: "OnEnterGame",
    PickImageAndSave: "PickImageAndSave",
};
//# sourceMappingURL=LaunchDefine.js.map