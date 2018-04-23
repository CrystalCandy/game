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
var MapPlayType = {
    Campaign: 1,
    JJC: 2,
    Movie: 3,
    Team: 4,
    Default: 99,
};
var MapJumpRecord = (function (_super) {
    __extends(MapJumpRecord, _super);
    function MapJumpRecord() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MapJumpRecord.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.inMapId = args[0];
        this.x = args[1];
        this.y = args[2];
        this.type = args[3];
        this.npcName = args[4];
        this.npcId = args[5];
    };
    MapJumpRecord.prototype.destory = function () {
    };
    return MapJumpRecord;
}(TClass));
__reflect(MapJumpRecord.prototype, "MapJumpRecord");
function PushMapShow() {
    MapSystem.getInstance().pushMapStack();
}
function PopMapShow() {
    MapSystem.getInstance().popMapStack();
}
var MapSystem = (function (_super) {
    __extends(MapSystem, _super);
    function MapSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MapSystem.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        RegisterEvent(EventDefine.HERO_MOVE_STOP, this.onHeroMoveStop, this); //注册主角移动事件
        //RegisterEvent(EventDefine.HERO_MOVE, this.onHeroMove, this) //注册主角移动事件
        RegisterEvent(EventDefine.STATE_ACTIVE, this.onStateActive, this);
        //this.bFindWay = false
        //this.find_trace_list = nil
        //this.trace_head = 0   //当前寻路的目标，在find_trace_list的指针头,每当切换地图时候加1
        //this.mapId = 0
        //this.lastJumpRecord = nil
        //
        //this.transportList = {}
        this.mSceneMrg = SceneManager.getInstance();
        RegisterEvent(EventDefine.MOVIE_BEGIN, this.onMovieBegin, this);
        RegisterEvent(EventDefine.MOVIE_END, this.onMovieEnd, this);
        RegisterEvent(EventDefine.OBJECT_MESSAGE_MOVE, this.addPopMap, this);
        RegisterEvent(EventDefine.STATE_ACTIVE, this.onStateChange, this);
        this.onClear();
    };
    MapSystem.prototype.destory = function () {
        UnRegisterEvent(EventDefine.OBJECT_MESSAGE_MOVE, this.addPopMap, this);
        this.onClear();
    };
    MapSystem.prototype.onClear = function () {
        this.bFindWay = false;
        this.find_trace_list = null;
        this.trace_head = -1;
        this.lastJumpRecord = null;
        this.mapId = 0; //当前地图ID（包括多人地图和单人模式）
        this.enterMapId = 0; //多人地图ID
        this.mapStackList = null;
        this.clearTransport();
        this.clearScreenEffect();
        this.lockPopMap = false;
        this.bAutoRun = false;
        this.autoState = true;
    };
    //准备资源，把自己的workunit加载队列里
    MapSystem.prototype.prepareResource = function (workQueue) {
        //this._initConfig(workQueue)
        GameConfig.initMapSystemCsv(workQueue);
    };
    //加入新地图，保存原来地图坐标
    MapSystem.prototype.pushMapStack = function () {
        if (this.mapStackList == null) {
            this.mapStackList = Queue_new();
            //RegisterEvent(EventDefine.HERO_RESET_POSITION, this.onHeroResetPosition, this)
        }
        var saveData = {};
        saveData.mapId = this.mapId;
        var _a = MovieSystem.getInstance().isPlayingMovie(), isMovie = _a[0], _ = _a[1];
        if (isMovie == true) {
            var p = this.mSceneMrg.screenXYtoMapXY(0, 0);
            p = this.mSceneMrg.mapXYtoCellXY(p.x, p.y);
            saveData.cellX = p.x;
            saveData.cellY = p.y;
            saveData.callBack = this.loadMovieMap;
        }
        else {
            var p = GetHero().getCellXY();
            saveData.cellX = p.x;
            saveData.cellY = p.y;
            saveData.callBack = this.loadMap;
        }
        Queue_push_first(this.mapStackList, saveData);
        CommandManager.getInstance().clear();
        TLog.Debug("pushMapStack", saveData.mapId, saveData.cellX, saveData.cellY);
    };
    //恢复上一个地图
    MapSystem.prototype.popMapStack = function () {
        TLog.Assert(this.mapStackList);
        var saveData = Queue_pop_first(this.mapStackList);
        if (Queue_empty(this.mapStackList)) {
            this.mapStackList = null;
            //UnRegisterEvent(EventDefine.HERO_RESET_POSITION, this.onHeroResetPosition, this)
            //GetHero().setAloneMode(false)
        }
        TLog.Debug("popMapStack", saveData.mapId, saveData.cellX, saveData.cellY);
        if (!this.lockPopMap) {
            saveData.callBack.call(this, saveData.mapId, saveData.cellX, saveData.cellY);
        }
    };
    //-
    MapSystem.prototype.addPopMap = function (args) {
        var saveData = Queue_last(this.mapStackList);
        var heroId = GetHeroProperty("id");
        if (saveData && heroId == args.Id && args.Type == objectType.OBJECT_TYPE_PLAYER) {
            //saveData.mapId = saveData.mapId
            saveData.cellX = args.CellX;
            saveData.cellY = args.CellY;
            //saveData.callBack = this.loadMap
        }
        //Queue_push_first(this.mapStackList, saveData)
    };
    MapSystem.prototype.clearMapStack = function () {
        if (this.mapStackList) {
            //最后一个，就是真实地图ID
            var saveData = Queue_last(this.mapStackList);
            this.loadMap(saveData.mapId, saveData.cellX, saveData.cellY);
            this.mapStackList = null;
            //UnRegisterEvent(EventDefine.HERO_RESET_POSITION, this.onHeroResetPosition, this)
        }
    };
    MapSystem.prototype.setPopMapLock = function (lock) {
        this.lockPopMap = lock;
    };
    ////////////////////////////////////////////////////////
    MapSystem.prototype.isPlayMode = function () {
        return this.mapStackList != null;
    };
    MapSystem.prototype.enterMap = function (mapId, cellx, celly) {
        this.enterMapId = mapId;
        if (this.compelTransMap(mapId, cellx, celly)) {
            return;
        }
        FireEvent(EventDefine.HERO_ENTER_SERVERMAP, null);
        if (this.loadMap(mapId, cellx, celly)) {
        }
    };
    MapSystem.prototype.getEnterMapId = function () {
        return this.enterMapId;
    };
    MapSystem.prototype.compelTransMap = function (mapId, cellx, celly) {
        if (this.mapStackList) {
            var saveData = Queue_last(this.mapStackList);
            if (saveData) {
                saveData.mapId = mapId;
                saveData.cellX = cellx;
                saveData.cellY = celly;
                saveData.callBack = this.loadMap;
                ClearCurActorStorage();
                return true;
            }
        }
        return false;
    };
    MapSystem.prototype.loadSky = function (mapId) {
        // if(MapSkyConfig[mapId] == null ){
        // 	var mapConfig = MapConfig[mapId]
        // 	if(mapConfig.skyFile && mapConfig.skyFile != "" ){
        // 		var skyFile = "resource\\data\\config\\Map\\"..mapConfig.skyFile
        // 		MapSkyConfig[mapId] = json.readFile(skyFile)
        // 	}
        // }
        // var skyInfo = MapSkyConfig[mapId]
        // if(skyInfo == null ){
        // 	return
        // }
        // this.mSceneMrg.loadSky(skyInfo)
    };
    MapSystem.prototype.playBackgourdMusic = function (mapId_) {
        if (FightSystem.getInstance().isFight()) {
            //return
        }
        var mapId = mapId_ || this.mapId;
        var refMap = this.getMapRefProperty(mapId);
        if (refMap) {
            GameSound.getInstance().stopMusic();
            GameSound.getInstance().playMusic(refMap.music);
        }
    };
    MapSystem.prototype.clearScreenEffect = function () {
        // if(this.screenEffectList ){
        // 	for _, v in ipairs(this.screenEffectList) do
        // 		v:delete()
        // 	}
        // }
        // this.screenEffectList = {}
    };
    MapSystem.prototype.loadScreenEffect = function (mapConfig) {
        // this.clearScreenEffect()
        // if(mapConfig.effectBg != 0 ){
        // 	var effect = EffectManager.getInstance():createScreenEffect(mapConfig.effectBg, 0, 0, map.ICamera.eScreenLayer_Background)
        // 	table.insert(this.screenEffectList, effect)
        // }
        // if(mapConfig.effectFg != 0 ){
        // 	var effect = EffectManager.getInstance():createScreenEffect(mapConfig.effectFg, 0, 0, map.ICamera.eScreenLayer_Foreground)
        // 	table.insert(this.screenEffectList, effect)
        // }
    };
    MapSystem.prototype.loadMapFinish = function (mapid) {
        if (this.mapId != mapid) {
            return;
        }
        LookAtHero();
        FireEvent(EventDefine.HERO_ENTER_MAP, null);
        this.onHeroMoveStop(null);
    };
    //只是负责初始化地图，没逻辑
    MapSystem.prototype.loadMapRaw = function (mapId) {
        var mapConfig = GameConfig.MapConfig[mapId];
        if (mapConfig == null) {
            return;
        }
        var mapFile = mapConfig.mapFile;
        mapFile = "data/map/" + mapFile;
        //加载地图
        this.mSceneMrg.loadMap(mapFile, this.loadMapFinish, this, mapId);
        //设置透视
        this.mSceneMrg.setPerspective(mapConfig.persp);
        //加载天空
        this.loadSky(mapId);
        //加载音乐
        GameSound.getInstance().unloadAllEffect(); //卸载所有音响
        this.playBackgourdMusic(mapId);
        //地图的镜头特效
        this.loadScreenEffect(mapConfig);
    };
    MapSystem.prototype.loadMap = function (mapId, cellx, celly) {
        var mapConfig = GameConfig.MapConfig[mapId];
        if (mapConfig == null) {
            TLog.Error("loadMap MapConfig[%s] == null", mapId.toString());
            return false;
        }
        //this.mSceneMrg.transitionScene(MapTransitionStyle.SPLITROWS)
        TLog.Warn("loadMap%d(%d, %d)", mapId, cellx, celly);
        var bLoad = (this.mapId != mapId);
        this.mapId = mapId;
        var hero = GetHero();
        hero.moveStop();
        hero.setCellXY(cellx, celly);
        // if(hero.mFollowPet ){
        // 	var cellX, cellY = hero.getCellXY()
        // 	hero.mFollowPet:moveStop()
        // 	hero.mFollowPet:setCellXY(cellX - 5, cellY - 5)
        // 	Log.Warning("loadPetMap (%d, %d)", hero.mFollowPet:getCellXY())
        // }
        //TLog.Debug("11111111",bLoad,mapId,this.mapId,bloading)
        //镜头绑定主角
        this.mSceneMrg.cameraLinkActor(hero);
        LookAtHero();
        if (bLoad) {
            //删除所有精灵
            ActorManager.getInstance().clearAll();
            //TeamSystem.getInstance():clearAllNearPlayer()
            //加载地图
            this.loadMapRaw(mapId);
            //gb.main.viewport:SetInputEnable(false)
            this._onChangeMap();
            //this.loadMapSurprise(mapId,cellx,cellY)
            //FireEvent(EventDefine.HERO_ENTER_MAP, null)
        }
        return bLoad;
    };
    MapSystem.prototype.loadMapSurprise = function (mapId, cellx, cellY) {
        // if(RoleSystem.getInstance():isDoSurpriseEvent(mapId) && MapCampaignList && MapCampaignList[mapId] ){
        // 	var x = MapCampaignList[mapId]["surpriseX"] || 10
        // 	var y = MapCampaignList[mapId]["surpriseY"] || 10
        // 	var npcId = MapCampaignList[mapId]["surpriseID"]
        // 	var scope =  MapCampaignList[mapId]["scope"] || 5
        // 	//TLog.Debug("loadMapSurprise creat surprise",x, y, type(MapCampaignList[mapId]))
        // 	var npcInfo = {
        // 		["cellx"]	= x,
        // 		["celly"]	= y,
        // 		["classname"] = "NpcInfo",
        // 		["dir"] = 1,
        // 		["entryId"] = npcId,
        // 		["id"] = IsolationCharacterId.SupriseNpc,
        // 		["image"] = 0,
        // 		["name"] = "",
        // 		["param"]={
        // 		},
        // 		["taskInfo"]={
        // 		},
        // 	}			
        // 	//检查与玩家的位置
        // 	var npc = ActorManager.getInstance().createNpc(npcInfo)		
        // 	if(math_util:checkNormScope(cellx, cellx, x, y, scope) == false ){
        // 		npc:setVisible(false)
        // 	}
        // }
    };
    MapSystem.prototype.loadMovieMap = function (mapId, mapX, mapY) {
        if (this.mapId == mapId) {
            return;
        }
        this.mapId = mapId;
        var mapConfig = GameConfig.MapConfig[mapId];
        var mapFile = mapConfig.mapFile;
        this.loadMapRaw(mapId);
        this.mSceneMrg.cameraUnLinkActor();
        this.mSceneMrg.setAdjustViewCenter(true);
        this.mSceneMrg.lookAtCenter(mapX + IGlobal.stageWidth / 2, mapY + IGlobal.stageHeight / 2);
    };
    MapSystem.prototype.getMapRefProperty = function (id) {
        return GameConfig.MapConfig[id];
    };
    MapSystem.prototype.getMapId = function () {
        return this.mapId;
    };
    MapSystem.prototype.getCurMapSize = function () {
        return this.getMapSize(this.getMapId());
    };
    MapSystem.prototype.getMapSize = function (mapId) {
        if (GameConfig.MapConfig[mapId] == null) {
            TLog.Error("getMapSize MapConfig[%d] == null", mapId);
            return { w: 0, h: 0 };
        }
        var width = GameConfig.MapConfig[mapId].W;
        var height = GameConfig.MapConfig[mapId].H;
        return { w: width, h: height };
    };
    MapSystem.prototype.getMapName = function (mapId) {
        if (GameConfig.MapConfig[mapId] == null) {
            TLog.Error("getMapName MapConfig[%d] == null", mapId);
            return "";
        }
        return GameConfig.MapConfig[mapId].mapName;
    };
    MapSystem.prototype._findWayToGo = function (srcMapId, targetMapId, cellX, cellY) {
        this.find_trace_list = [];
        this.trace_head = 0; //当前寻路的目标，在find_trace_list的指针头,每当切换地图时候加1
        this._find_flag = {};
        var bFind = false;
        if (srcMapId == targetMapId) {
            bFind = true;
        }
        else {
            bFind = this.findPath(srcMapId, targetMapId);
        }
        if (bFind == true) {
            var Ttable = MapJumpRecord.newObj(targetMapId, cellX, cellY, 0, "");
            this.find_trace_list.push(Ttable);
            TLog.Debug(">>>find way trace:");
            this.find_trace_list.forEach(function (traceRecord) {
                TLog.Debug(">>>", traceRecord.inMapId, traceRecord.x, traceRecord.y);
            });
            bFind = this._heroMoveByRecord(this.trace_head);
        } //} if
        this._find_flag = null;
        return bFind;
    };
    MapSystem.prototype.findPath = function (srcId, targetId) {
        var queue = [];
        queue.push(srcId);
        var Path = {};
        Path[srcId] = Path[srcId] || {};
        Path[srcId][srcId] = true;
        Path[targetId] = Path[targetId] || {};
        Path[targetId][targetId] = false;
        var flag = {};
        while (queue.length != 0) {
            //var fromId = table.remove(queue, 1)
            var fromId = queue.shift();
            if (!fromId || !GameConfig.MapLinkConfig[fromId]) {
                break;
            }
            if (Path[targetId][targetId]) {
                break;
            }
            //for _, record in ipairs(GameConfig.MapLinkConfig[fromId]) do
            for (var k in GameConfig.MapLinkConfig[fromId]) {
                var record = GameConfig.MapLinkConfig[fromId][k];
                var toId = record.inMapId;
                if (toId != fromId && !flag[toId]) {
                    flag[toId] = true;
                    //var Ttable = {["inMapId"] = record.outMapId,["x"] = record.outX,["y"] = record.outY, ["type"] = record.type, ["npcName"] = record.npcName} //记录跳出点，类型，NPC名字
                    var Ttable = MapJumpRecord.newObj(record.outMapId, record.outX, record.outY, record.type, record.npcName, record.npcId);
                    Path[toId] = Path[toId] || {};
                    Path[toId][fromId] = Ttable;
                    queue.push(toId);
                    //TLog.Debug("toId",toId, "fromId", fromId)
                    if (toId == targetId) {
                        Path[toId][toId] = true;
                        break;
                    }
                }
            }
        }
        var hasFind = false;
        if (Path[targetId][targetId]) {
            if (this.getPath(srcId, targetId, Path)) {
                var list = this.find_trace_list;
                var len = list.length;
                for (var i = 0; i < len / 2; i++) {
                    var t = list[i];
                    list[i] = list[len - i + 1];
                    list[len - i + 1] = t;
                }
            }
            hasFind = true;
        }
        TLog.Debug("FindWayTOGo:", hasFind);
        Path = null;
        return hasFind;
    };
    MapSystem.prototype.getPath = function (srcId, targetId, Path) {
        TLog.Debug("getPath", srcId, targetId);
        this._find_flag[targetId] = true;
        if (srcId == targetId) {
            return true;
        }
        if (Path[targetId]) {
            //for fromId in pairs(Path[targetId]) do
            for (var fromId_ in Path[targetId]) {
                var fromId = tonumber(fromId);
                if (this._find_flag[fromId] == null) {
                    if (fromId != targetId) {
                        this.find_trace_list.push(Path[targetId][fromId]); //插入路径
                        var find = this.getPath(srcId, fromId, Path);
                        if (find) {
                            return true;
                        }
                        this.find_trace_list.pop();
                    }
                }
            }
        }
        return false;
    };
    MapSystem.prototype.findWayToGo = function (targetMapId, cellX, cellY) {
        var srcMapId = this.getMapId();
        if (this._findWayToGo(srcMapId, targetMapId, cellX, cellY)) {
            this.setFindWay(true);
            return true;
        }
        return false;
    };
    //寻路
    MapSystem.prototype.setFindWay = function (bFind) {
        if (this.bFindWay != bFind) {
            this.bFindWay = bFind;
            if (this.bFindWay == false) {
                this.find_trace_list = [];
                this.trace_head = 0;
            }
            FireEvent(EventDefine.HERO_FINDWAY_CHANGE, null);
        }
    };
    MapSystem.prototype.isFindWay = function () {
        return this.bFindWay;
    };
    //自动行走
    MapSystem.prototype.setAutoRun = function (bAutoRun) {
        if (this.bAutoRun != bAutoRun) {
            this.bAutoRun = bAutoRun;
            FireEvent(EventDefine.HERO_AUTORUN_CHANGE, null);
        }
    };
    MapSystem.prototype.isAutoRun = function () {
        return this.bAutoRun;
    };
    ////////////////////////////////////////////////////////////////////////////////
    MapSystem.prototype.checkCanJumpMap = function () {
        if (this.isAutoRun()) {
            return false;
        }
        return true;
    };
    MapSystem.prototype.onLinkJump = function (record) {
        //GetHero().sendMoveMessage()
        var message = GetMessage(opCodes.C2G_MAP_ENTER);
        message.index = record.index;
        SendGameMessage(message);
    };
    MapSystem.prototype.onNpcJump = function (record) {
        TLog.Debug("onNpcJump is here!", record.npcId, record.npcName);
        var npc = ActorManager.getInstance().getNpcWithEntryId(record.npcId);
        if (!npc) {
            return;
        }
        Task_ShowNpcDialogWithNpc(npc.getId());
    };
    MapSystem.prototype.checkJumpRecordScope = function (record, heroCellX, heroCellY) {
        return (heroCellX >= record.outX - record.W) && (heroCellX <= record.outX + record.W) && (heroCellY >= record.outY - record.H) && (heroCellY <= record.outY + record.H);
    };
    MapSystem.prototype._heroMoveByRecord = function (index) {
        var record = this.find_trace_list[index];
        if (record == null) {
            TLog.Error("_heroMoveByRecord %d", index);
        }
        if (record.type == 1) {
            return GetHero().wantToGoByCell(GameConfig.npcConfig[record.npcId].x, GameConfig.npcConfig[record.npcId].y);
        }
        return GetHero().wantToGoByCell(record.x, record.y); //主角移动
    };
    MapSystem.prototype.onHeroMoveStop = function (args) {
        // var campaignInfo = MapCampaignList[this.mapId]  
        if (CommandManager.getInstance().isCommandQueueEmpty() == false) {
            return;
        }
        if (this.autoState != false) {
            Command_AutoRun();
        }
        // var hero = GetHero()
        // var heroCellX, heroCellY = hero.getCellXY()
        // if(heroCellX < campaignInfo.x || heroCellX > campaignInfo.x + campaignInfo.w || heroCellY < campaignInfo.y || heroCellY > campaignInfo.y + campaignInfo.h ){
        // 	return
        // }
        // //打开关卡界面
        // //CampaignSystem.getInstance():setCurMap(this.mapId)
        // var chapterId = WngMrg.getInstance():getWindow("FunTipsFrame"):getOpenChapterId()
        // WngMrg.getInstance():getWindow("CopyCardFrame"):showCopyCard(this.mapId,chapterId)
        // GameSound.getInstance().playEffect(SystemSound.effect_transPoint)
    };
    MapSystem.prototype.setAutoState = function (b) {
        this.autoState = b;
    };
    MapSystem.prototype.getAutoState = function () {
        return this.autoState;
    };
    MapSystem.prototype._onChangeMap = function () {
        //处理主角移动
        //TLog.Debug("_onChangeMap gb.main.viewport:SetInputEnable true")
        //gb.main.viewport:SetInputEnable(true)
        GetHero().moveStop();
        if (this.find_trace_list != null && this.find_trace_list.length != 0 && this.trace_head != -1) {
            if (this.trace_head >= this.find_trace_list.length) {
                this.find_trace_list = null;
                this.trace_head = -1;
            }
            else {
                var flag = false;
                for (var i = 0; i < this.find_trace_list.length; i++) {
                    var record = this.find_trace_list[i];
                    if (i > this.trace_head) {
                        this.trace_head = i;
                        if (record.inMapId == this.mapId) {
                            flag = true;
                            break;
                        }
                    }
                }
                if (flag) {
                    //	this.heroStop()
                    //}else{				
                    this._heroMoveByRecord(this.trace_head);
                }
            }
        }
        //重置跳转标志位
        this.lastJumpRecord = null;
        //创建传送点
        this.createTransport();
    };
    MapSystem.prototype.clearTransport = function () {
        // if(this.transportList ){
        // 	var transport = table.remove(this.transportList)
        // 	while transport != null do		
        // 		transport:delete()
        // 		transport = table.remove(this.transportList)
        // 	}
        // }
        if (this.transportList) {
            this.transportList.length = 0;
        }
    };
    MapSystem.prototype.createTransport = function () {
        this.clearTransport();
        //print_r(MapCampaignList)
        // var campaignInfo = MapCampaignList[this.mapId] 
        // if(campaignInfo == null ){
        // 	return
        // }
        // var centerX = campaignInfo.x + campaignInfo.w / 2
        // var centerY = campaignInfo.y + campaignInfo.h / 2
        // TLog.Debug("createTransport", this.getMapId(), centerX, centerY)
        // var effect = EffectManager.getInstance():createSceneEffect(campaignInfo.transport, centerX, centerY, false)
        // effect:changeBottomMapLayer()
        // table.insert(this.transportList, effect)
    };
    MapSystem.prototype.getMapConfigTipsList = function (level) {
        // var list = {}
        // for i, v in pairs(MapTipsConfig) do
        // 	if(v.lowLevel<=level && v.highLevel>=level ){
        // 		table.insert(list, v)
        // 	}
        // }
        // return list
    };
    // getAutoWayFinishPoint() {
    // 	if (this.find_trace_list && this.find_trace_list[this.trace_head]) {
    // 		var elem = this.find_trace_list[this.trace_head]
    // 		return elem.inMapId, elem.x, elem.y
    // 	} else {
    // 		return null, null, null
    // 	}
    // }
    MapSystem.prototype.onMovieBegin = function (args) {
        this.clearTransport();
    };
    MapSystem.prototype.onMovieEnd = function (args) {
        this.createTransport();
    };
    MapSystem.prototype.onStateActive = function (args) {
        if (args.stateType == state_type.COMBAT_BASE_STATE) {
            this.clearTransport();
        }
        else if (args.stateType == state_type.LIVE_BASE_STATE) {
            this.createTransport();
        }
    };
    MapSystem.prototype.resetHeroPosition = function (cellX, cellY) {
        //检查是不是在玩法地图内
        //如果当前是单人玩法地图，则保存信息等待回到真正地图才重置
        //如果当前是多人玩法地图，就马上重置位置
        var bHandleReset = true;
        if (this.mapStackList) {
            if (GetHero().isAloneMode()) {
                bHandleReset = false;
                var enterMapData = Queue_last(this.mapStackList);
                enterMapData.cellX = cellX;
                enterMapData.cellY = cellY;
            }
        }
        if (bHandleReset) {
            var hero = GetHero();
            Command_MoveStop();
            hero.setCellXY(cellX, cellY);
            LookAtHero();
            FireEvent(EventDefine.HERO_RESET_POSITION, ActorEvent.createObj(hero));
        }
    };
    MapSystem.prototype.getMapEnterCellXY = function (mapId, defaultX, defaultY) {
        defaultX = defaultX || 0;
        defaultY = defaultY || 0;
        for (var _ in GameConfig.MapEnterList) {
            var config = GameConfig.MapEnterList[_];
            if (config.inMapId == mapId) {
                return newPos(config.inX, config.inY);
            }
        }
        return newPos(defaultX, defaultY);
    };
    MapSystem.prototype.onStateChange = function (args) {
        var curState = StateManager.getInstance().GetCurrentStateType();
        if (curState == state_type.LIVE_BASE_STATE) {
            ChangePatrolState(true);
        }
        else {
            ChangePatrolState(false);
        }
    };
    MapSystem.prototype.getMapIndex = function (mapId) {
        for (var _ in GameConfig.MapEnterList) {
            var config = GameConfig.MapEnterList[_];
            if (config.inMapId == mapId) {
                return _;
            }
        }
        return 0;
    };
    return MapSystem;
}(BaseSystem));
__reflect(MapSystem.prototype, "MapSystem");
//# sourceMappingURL=MapSystem.js.map