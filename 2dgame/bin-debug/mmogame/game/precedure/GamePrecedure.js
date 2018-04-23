//var START_MOVIE_NAME = "Movie0"
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
var GamePrecedure = (function (_super) {
    __extends(GamePrecedure, _super);
    function GamePrecedure() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamePrecedure.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mbLoad = false;
        this.mbAnalyze = false;
        this.allCount = 0;
        this.workQueue = WorkQueue.newObj();
        this.workQueue.setCallback(this);
    };
    GamePrecedure.prototype.destory = function () {
        this.workQueue.deleteObj();
        this.workQueue = null;
    };
    GamePrecedure.prototype.onActive = function (lastId) {
        TLog.Debug("GamePrecedure.onActive lastId:%d", lastId);
        this.registerEventHandle(EventDefine.SYSTEM_MOUSE_DOWN, this.onTouchBegin, this);
        this.registerEventHandle(EventDefine.SYSTEM_MOUSE_MOVE, this.onTouchMove, this);
        this.registerEventHandle(EventDefine.SYSTEM_MOUSE_UP, this.onTouchEnd, this);
        // this.registerEventHandle(EventDefine.SYSTEM_MOUSE_CLICK,this.onTouchClick, this)
        // this.registerEventHandle(EventDefine.SYSTEM_MOUSE_DBCLICK,this.onTouchDBClick, this)
        this.registerEventHandle(EventDefine.SYSTEM_RESUME, this.onGameResume, this);
        this.registerEventHandle(EventDefine.SYSTEM_PAUSE, this.onGamePause, this);
        FireEvent(EventDefine.MSG_WAIT_END, null);
        LoginNetDispatcher.getInstance().disconnect();
        //先加载资源
        this.workQueue.clear();
        if (this.mbLoad == false) {
            this.mbLoad = true;
            //SDKAnalyzer(SdkEventDefine.GAME_LOADING_BEGIN, "")
            this.mbAnalyze = true;
            this.onLoadBegin();
        }
        this.workQueue.start();
    };
    GamePrecedure.prototype.onDeactive = function (currentId) {
        TLog.Debug("GamePrecedure.onDeactive currentId:%d", currentId);
        this.unregisterEventHandle(EventDefine.SYSTEM_MOUSE_DOWN);
        this.unregisterEventHandle(EventDefine.SYSTEM_MOUSE_MOVE);
        this.unregisterEventHandle(EventDefine.SYSTEM_MOUSE_UP);
        // this.unregisterEventHandle(EventDefine.SYSTEM_MOUSE_CLICK)
        // this.unregisterEventHandle(EventDefine.SYSTEM_MOUSE_DBCLICK)
        this.unregisterEventHandle(EventDefine.SYSTEM_RESUME);
        this.unregisterEventHandle(EventDefine.SYSTEM_PAUSE);
        //先退圣地
        //GetActivity(ActivityDefine.Robber).stop()
        //状态初始化
        StateManager.getInstance().onClear();
        MsgSystem.onClear();
        ActorManager.getInstance().onClear();
        GameNetDispatcher.getInstance().disconnect();
        WngMrg.getInstance().onClear();
        FireEvent(EventDefine.PRECEDURE_DEACTIVE, PrecedureEvent.createObj(this.id));
        var systemNum = BaseSystem.s_systemList.length;
        for (var i = systemNum - 1; i >= 0; i--) {
            var v = BaseSystem.s_systemList[i];
            v.onClear();
        }
        //GameSound.getInstance():clearAutoPlayList()
        //如果是快速重连，就不用隐藏角色
        var bQuickLogin = LoginSystem.getInstance().isQuickLogin();
        GetHero().setVisible(bQuickLogin);
        GetHero().setMoveable(false); //快速重连时候，不能跑地图
    };
    GamePrecedure.prototype.onLoadBegin = function () {
        GameConfig.initResourceFirst(this.workQueue);
        if (GAME_MODE == GAME_NORMAL) {
            var loginRoleInfo = LoginSystem.getInstance().getLoginRoleInfo();
            if (loginRoleInfo.level <= 1) {
                GameConfig.initGuideResourceGroupConfig(this.workQueue);
            }
        }
        FireEvent(EventDefine.LOADING_GAME_RESOURCE_PREPARE, LoadingEvent.createObj(this.workQueue));
    };
    GamePrecedure.prototype.onLoadFinish = function () {
        TLog.Debug("===========GamePrecedure.onLoadFinish===========");
        IGlobal.resGroupManager.unLoadGroup(ResourceGroupDefine.Group_LOGINPRELOAD);
        if (this.mbAnalyze) {
            this.mbAnalyze = false;
            //SDKAnalyzer(SdkEventDefine.GAME_LOADING_FINISH, "")
        }
        //SceneManager.getInstance().setScenePersScale(SCENE_PERS_SCALE_LIVE)//精灵缩放比例
        this.workQueue.clear();
        var loginRoleInfo = LoginSystem.getInstance().getLoginRoleInfo();
        //判断顺序，本地记录、角色等级、登陆角色等级
        // if (IGlobal.setting.getRoleSetting(UserSetting.TYPE_NUMBER, START_MOVIE_NAME, 0) == 0 && (loginRoleInfo && loginRoleInfo.level <= 0) && GAME_MODE == GAME_NORMAL) {
        //     FireEvent(EventDefine.LOGIN_LOGO_HIDE_BEGIN, GameUserDataEvent.newObj(false))
        //     //WngMrg.getInstance():getWindow("LoginLogoFrame"):setAddMemeryFrameState(false)
        //     MovieSystem.getInstance().playMovieAndSetCallback(START_MOVIE_NAME, this, this.connectGameServer)
        // } else {
        //     this.connectGameServer()
        // }
        this.connectGameServer();
    };
    GamePrecedure.prototype.connectGameServer = function () {
        if (GAME_MODE == GAME_NORMAL) {
            var account = GameAccount.getInstance();
            var ip = account.getGameIp();
            var port = account.getGamePort();
            //连接游戏服务器
            //print("break.................")
            GameNetDispatcher.getInstance().disconnect();
            GameNetDispatcher.getInstance().connect(ip, port);
            TLog.Warn("=======connect game ip:%s port:%d===========", ip, port);
        }
        LoginSystem.getInstance().setQuickLogin(false);
        //--如果回到本服，就清空跨服信息
        if (g_CrossServerInfo && g_CrossServerInfo.state == CS_FINISH) {
            g_CrossServerInfo = null;
        }
        // --Config.getInstance():flush()
        FireEvent(EventDefine.PRECEDURE_ACTIVE, PrecedureEvent.createObj(this.id));
    };
    GamePrecedure.prototype.onTouchBegin = function (args) {
        StateManager.getInstance().OnEvent("OnVpMouseDownEvent", args);
    };
    GamePrecedure.prototype.onTouchMove = function (args) {
        StateManager.getInstance().OnEvent("OnVpMouseMoveEvent", args);
    };
    GamePrecedure.prototype.onTouchEnd = function (args) {
        StateManager.getInstance().OnEvent("OnVpMouseUpEvent", args);
    };
    GamePrecedure.prototype.onBeginWorkQueue = function (allCount) {
        this.allCount = allCount;
        FireEvent(EventDefine.LOADING_GAME_RESOURCE_BEGIN, LoadingUpdateEvent.createObj(0, allCount));
    };
    GamePrecedure.prototype.onUpdateWorkQueue = function (unit, cur, allCount) {
        TLog.Debug("GamePrecedure percent: %d %%", cur / allCount * 100);
        FireEvent(EventDefine.LOADING_GAME_RESOURCE_UPDATE, LoadingUpdateEvent.createObj(cur, allCount));
    };
    GamePrecedure.prototype.onEndWorkQueue = function () {
        FireEvent(EventDefine.LOADING_GAME_RESOURCE_FINISH, LoadingUpdateEvent.createObj(this.allCount, this.allCount));
        this.onLoadFinish();
    };
    GamePrecedure.prototype.onGameResume = function (args) {
        //StateManager.getInstance().OnEvent("OnVpMouseDBClickEvent", args)
        TLog.Debug("GamePrecedure.onGameResume");
        SendSynGameTime(); //同步一下游戏时间
        FireEvent(EventDefine.GAME_RESUME, null);
    };
    GamePrecedure.prototype.onGamePause = function (args) {
        TLog.Debug("GamePrecedure.onGamePause");
        //StateManager.getInstance().OnEvent("OnVpMouseDBClickEvent", args)
        FireEvent(EventDefine.GAME_PAUSE, null);
    };
    return GamePrecedure;
}(BasePrecedure));
__reflect(GamePrecedure.prototype, "GamePrecedure", ["WorkQueueCallback"]);
//# sourceMappingURL=GamePrecedure.js.map