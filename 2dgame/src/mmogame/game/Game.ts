
let cmdline:string = "";

function g_GameStart(){
    

    GAME_MODE = IGlobal.config.getNumber("mode", GAME_NORMAL);
    GAME_DEBUG = IGlobal.config.getBoolean("debug", true);
    GAME_GUIDE = IGlobal.config.getBoolean("guide", true);


    //选择启动模式
    var gameMain:GameMain = GameMain.getInstance();
    if(GAME_MODE == GAME_NORMAL){
        gameMain.setDelegate(new GameNormalDelegate);
    }else if(GAME_MODE == GAME_TEST){
        gameMain.setDelegate(new test.GameTestDelegate);
    }else if(GAME_MODE == GAME_TOOL){
        gameMain.setDelegate(new tool.GameToolDelegate);
    }

    TLog.SetEnable(GAME_DEBUG);

	gameMain.start();
}




class GameNormalDelegate extends GameModeDelegate{
    public onGameStart():void{
        PrecedureManager.getInstance().changePrecedure(PRECEDURE_LOGIN)
	}

	public onGameClose():boolean{
        return true;
	}
}


function GameClearCache(){
    
}


let NAME_LENGTH_LIMIT = 6

class GameMain extends TClass{

    mInput:GameInput;
    mModeDelegate : GameModeDelegate;
    //mCmdListValueList:any;
    //public static sCmdLine: string = null;
    
	initObj(...params:any[]){
		
        this.mInput = new GameInput;

        
	}


    public setupPrecedure():void{
        var mgr:PrecedureManager = PrecedureManager.getInstance();
        mgr.clear();

        mgr.registerPrecedure(PRECEDURE_LOADING, LoadingPrecedure.newObj() );
        mgr.registerPrecedure(PRECEDURE_LOGIN, LoginPrecedure.newObj() );
        mgr.registerPrecedure(PRECEDURE_GAME, GamePrecedure.newObj() );
    }


    public setupCollectGarbage():void{
        core.TextureManager.getInstance().setAutoDisposeTime(5000, 60000);
        IGlobal.spriteMangaer.setAutoDisposeTime(600000)//没使用的模型X毫秒自动析构
    }

    

	public start():void{
		//初始化配置

		//加载资源

		//资源回掉后，显示登陆

		//this.test();
        this.setupPrecedure();

        RegisterEvent(EventDefine.LOADING_LANCH_RESOURCE_FINISH, this.onResourceReady, this)
        PrecedureManager.getInstance().changePrecedure(PRECEDURE_LOADING);
	}


    setDelegate(delegate:GameModeDelegate){
        this.mModeDelegate = delegate; 
    }
    
    //加载完毕
    public onResourceReady():void{
        //TLog.Debug("onResourceReady.............");
        LoadingUI.hide();


        gameStaticInit();
        WngMrg.getInstance().start()
        this.setupCollectGarbage();

        if(this.mModeDelegate){
            this.mModeDelegate.onGameStart();
        }
        this.preLoadRes();
    }


    private preLoadRes(){

        let timerId = 0;
        let onTimerCallback = function(dt){
            KillTimer(timerId);
             //预加载 imageset
            let imagset_callback:core.ZipItemCallback = {
                onZipItemLoad(key, result:number):void{
                    let guideGroup = IGlobal.resGroupManager.getGroup(ResourceGroupDefine.Group_LOGINPRELOAD, true)
                    guideGroup.setDisposeTime(ResGroupDisposeTime);

                    for(var k in GameConfig.ImageSetListConfig){
                        var v = GameConfig.ImageSetListConfig[k];
                        if(v.type != "login"){
                            guideGroup.addResItemConfig(v.filename, core.ResourceType.TYPE_JSON);
                        }
                    }
                    //预加载
                    guideGroup.load();
                }
            }
            IGlobal.resManager.addZipPacket("config_ui.zip", imagset_callback)
        }

        timerId = SetTimer(onTimerCallback, this, 100);

       
    }

}