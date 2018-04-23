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
var cmdline = "";
function g_GameStart() {
    GAME_MODE = IGlobal.config.getNumber("mode", GAME_NORMAL);
    GAME_DEBUG = IGlobal.config.getBoolean("debug", true);
    GAME_GUIDE = IGlobal.config.getBoolean("guide", true);
    //选择启动模式
    var gameMain = GameMain.getInstance();
    if (GAME_MODE == GAME_NORMAL) {
        gameMain.setDelegate(new GameNormalDelegate);
    }
    else if (GAME_MODE == GAME_TEST) {
        gameMain.setDelegate(new test.GameTestDelegate);
    }
    else if (GAME_MODE == GAME_TOOL) {
        gameMain.setDelegate(new tool.GameToolDelegate);
    }
    TLog.SetEnable(GAME_DEBUG);
    gameMain.start();
}
var GameNormalDelegate = (function (_super) {
    __extends(GameNormalDelegate, _super);
    function GameNormalDelegate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameNormalDelegate.prototype.onGameStart = function () {
        PrecedureManager.getInstance().changePrecedure(PRECEDURE_LOGIN);
    };
    GameNormalDelegate.prototype.onGameClose = function () {
        return true;
    };
    return GameNormalDelegate;
}(GameModeDelegate));
__reflect(GameNormalDelegate.prototype, "GameNormalDelegate");
function GameClearCache() {
}
var NAME_LENGTH_LIMIT = 6;
var GameMain = (function (_super) {
    __extends(GameMain, _super);
    function GameMain() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //mCmdListValueList:any;
    //public static sCmdLine: string = null;
    GameMain.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mInput = new GameInput;
    };
    GameMain.prototype.setupPrecedure = function () {
        var mgr = PrecedureManager.getInstance();
        mgr.clear();
        mgr.registerPrecedure(PRECEDURE_LOADING, LoadingPrecedure.newObj());
        mgr.registerPrecedure(PRECEDURE_LOGIN, LoginPrecedure.newObj());
        mgr.registerPrecedure(PRECEDURE_GAME, GamePrecedure.newObj());
    };
    GameMain.prototype.setupCollectGarbage = function () {
        core.TextureManager.getInstance().setAutoDisposeTime(5000, 60000);
        IGlobal.spriteMangaer.setAutoDisposeTime(600000); //没使用的模型X毫秒自动析构
    };
    GameMain.prototype.start = function () {
        //初始化配置
        //加载资源
        //资源回掉后，显示登陆
        //this.test();
        this.setupPrecedure();
        RegisterEvent(EventDefine.LOADING_LANCH_RESOURCE_FINISH, this.onResourceReady, this);
        PrecedureManager.getInstance().changePrecedure(PRECEDURE_LOADING);
    };
    GameMain.prototype.setDelegate = function (delegate) {
        this.mModeDelegate = delegate;
    };
    //加载完毕
    GameMain.prototype.onResourceReady = function () {
        //TLog.Debug("onResourceReady.............");
        LoadingUI.hide();
        gameStaticInit();
        WngMrg.getInstance().start();
        this.setupCollectGarbage();
        if (this.mModeDelegate) {
            this.mModeDelegate.onGameStart();
        }
        this.preLoadRes();
    };
    GameMain.prototype.preLoadRes = function () {
        var timerId = 0;
        var onTimerCallback = function (dt) {
            KillTimer(timerId);
            //预加载 imageset
            var imagset_callback = {
                onZipItemLoad: function (key, result) {
                    var guideGroup = IGlobal.resGroupManager.getGroup(ResourceGroupDefine.Group_LOGINPRELOAD, true);
                    guideGroup.setDisposeTime(ResGroupDisposeTime);
                    for (var k in GameConfig.ImageSetListConfig) {
                        var v = GameConfig.ImageSetListConfig[k];
                        if (v.type != "login") {
                            guideGroup.addResItemConfig(v.filename, core.ResourceType.TYPE_JSON);
                        }
                    }
                    //预加载
                    guideGroup.load();
                }
            };
            IGlobal.resManager.addZipPacket("config_ui.zip", imagset_callback);
        };
        timerId = SetTimer(onTimerCallback, this, 100);
    };
    return GameMain;
}(TClass));
__reflect(GameMain.prototype, "GameMain");
//# sourceMappingURL=Game.js.map