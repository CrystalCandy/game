

function g_InitGlobal(){
	var app:Application = Application.getInstance();
	IGlobal = {
		rootNode : app.getRootNode(),
		stage : app.getStageNode(),
		netSystem :core.NetSystem.getInstance(),
		guiManager: gui.GuiManager.getInstance(),
        imageSet :gui.ImageSet.getInstance(),
        fontSet  : gui.FontSet.getInstance(),
        animSet  : gui.AnimSet.getInstance(),

        resManager: core.ResManager.getInstance(),
        resGroupManager: core.ResGroupManager.getInstance(),

        mapManager: map.MapManager.getInstance(),
        spriteMangaer : map.LogicSpriteManager.getInstance(),

        soundManager : core.SoundManager.getInstance(),
        

        setting : UserSetting.getInstance(),
        config : new core.ConfigFile,
        httpClient: null,
        gameSdk: core.GameSdk.getInstance(),
        sdkHelper:SdkHelper.getInstance(),

        stageWidth: app.getStageNode().stageWidth,
        stageHeight: app.getStageNode().stageHeight,


        errorReport: core.ErrorReport.getInstance(),

        //设计分辨率
        contentWidth: 640,
        contentHeight: 1060,
	}

    

     //监听舞台大小变化
    IGlobal.stage.addEventListener(egret.Event.RESIZE, onStageResie, null);
    
    let contentWidth  = IGlobal.contentWidth;
    let contentHeight  = IGlobal.contentHeight;
    let scaleMode = egret.StageScaleMode.SHOW_ALL;

    // let stageW = IGlobal.stageWidth
    // let stageH = IGlobal.stageHeight
    

    if(IGlobal.stageWidth / IGlobal.stageHeight > IGlobal.contentWidth / IGlobal.contentHeight ){
        
    }else if(IGlobal.stageWidth / IGlobal.stageHeight < 640 / 1136){
        contentWidth = 640;
        contentHeight = 1136;
    }else{
        scaleMode = egret.StageScaleMode.FIXED_WIDTH;
    }
    IGlobal.stage.setContentSize(contentWidth, contentHeight);
    IGlobal.stage.scaleMode = scaleMode;

     IGlobal.httpClient = IGlobal.netSystem.createHttpClient();
     //IGlobal.mapManager.getCamera().setViewSize(IGlobal.contentWidth, IGlobal.contentHeight);
   
    //throw new Error();
}



function onStageResie(){
    IGlobal.stageWidth  = IGlobal.stage.stageWidth;
    IGlobal.stageHeight = IGlobal.stage.stageHeight;

    IGlobal.mapManager.getCamera().setViewSize(IGlobal.stageWidth, IGlobal.stageHeight);
    FireEvent(Event_STAGE_RESIZE, null);
}


function g_LaunchInit(){

    //初始化全局变量
    g_InitGlobal();

    

    //检查版本
    var precedureMgr:PrecedureManager = PrecedureManager.getInstance();
    precedureMgr.registerPrecedure(PRECEDURE_VERSION_UPDATE, new VersionUpdatePrecedure);
    precedureMgr.changePrecedure(PRECEDURE_VERSION_UPDATE);
}