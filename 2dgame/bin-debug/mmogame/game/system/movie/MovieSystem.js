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
/*
作者:
    lintianfeng
    
创建时间：
   2013.10.26(周六)

意图：
     电影表演系统

公共接口：
   
*/
var movieActionType = (_a = {},
    _a["LoadMap"] = Movie_LoadMap,
    _a["PlaySound"] = Movie_PlaySound,
    _a["MoveCamera"] = Movie_MoveCamera,
    _a["CreateEffect"] = Movie_CreateEffect,
    _a["CreatePlayer"] = Movie_CreatePlayer,
    _a["CreatePlayerEffect"] = Movie_CreatePlayerEffect,
    _a["DeleteEffect"] = Movie_DeleteEffect,
    _a["DeletePlayer"] = Movie_DeletePlayer,
    _a["DeletePlayerEffect"] = Movie_DeletePlayerEffect,
    _a["Fight"] = Movie_Fight,
    _a["MovePlayer"] = Movie_MovePlayer,
    _a["ChangeAction"] = Movie_ChangeAction,
    _a["AddFightResult"] = Movie_AddFightResult,
    _a["Say"] = Movie_Say,
    _a["SetPlayerXY"] = Movie_SetPlayerXY,
    _a["ShakeMap"] = Movie_ShakeMap,
    _a["ShowImage"] = Movie_ShowImage,
    _a["Speak"] = Movie_Speak,
    _a["VisiblePlayer"] = Movie_VisiblePlayer,
    _a["WaitTime"] = Movie_WaitTime,
    _a["OpenTask"] = Movie_openTask,
    _a["FullBlack"] = Movie_FullBlack,
    //["HideImage"]: Movie_HideImage,
    _a["StopSound"] = Movie_StopSound,
    _a["AddFightPlayer"] = Movie_AddFightPlayer,
    //["preAddResource"]: Movie_preAddRes,
    _a["playFrameAnimation"] = Movie_PlayFrameAnimation,
    _a);
var MOVIE_ACTION_PRIORITY = (_b = {},
    //["preAddResource"]: 100,
    _b["LoadMap"] = 80,
    _b["CreateEffect"] = 60,
    _b["CreatePlayer"] = 60,
    _b["CreatePlayerEffect"] = 60,
    _b["FullBlack"] = 100,
    _b);
var START_MOVIE_NAME = "Movie0";
var START_MOVIE_NAME_VIDEO = "MovieVideo0";
var MovieSystem = (function (_super) {
    __extends(MovieSystem, _super);
    function MovieSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MovieSystem.prototype.initObj = function () {
        var args = [];
        for (var _a = 0; _a < arguments.length; _a++) {
            args[_a] = arguments[_a];
        }
        this.onClear();
        this.repeatableMovie = {};
        this.taskNoTick = null;
        this.curStoryState = state_type.LIVE_STORY_STATE;
        RegisterEvent(EventDefine.NPC_ENTER_MAP, this.playerEnterMap, this);
        RegisterEvent(EventDefine.PLAYER_ENTER_MAP, this.playerEnterMap, this);
        //RegisterEvent(EventDefine.HERO_MOVE, this.onHeroMove, this)
        //RegisterEvent(EventDefine.COMBAT_BEGIN, this.onCombatBegin, this)
        this.fastEndWnd = null;
        this.isfastEnd = null;
        //this.checkFileMoiveElem()
    };
    MovieSystem.prototype.destory = function () {
        this.onClear();
    };
    MovieSystem.prototype.onClear = function () {
        if (this.timerId) {
            KillTimer(this.timerId);
            this.timerId = null;
        }
        if (this.movie_show) {
            for (var i in this.movie_show) {
                var v = this.movie_show[i];
                for (var n in v) {
                    var elem = v[n];
                    elem.deleteObj();
                }
            }
        }
        this.movie_show = []; // 某个序号下动画的集合
        this.clearPlayerEffect();
        this.clearEffect();
        this.movieEnding = true;
        this.deleteAllPlayer();
        this.movieEnding = false;
        this.movieFile = null; // 读取动画配置表文件名
        this.movieIndex = 0; // 当前播放的动画序号
        this.playingMovie = false; // 判断剧情是否在播放中
        this.bSkip = false; // 是否在跳过剧情，如果是，则不可播放剧情，防止出现未知问题
        this.played_movie_list = [];
        this.skippAble = true;
        this.taskNoTick = false;
        //this.getMovieBlackSide().hideWnd() 
    };
    //准备资源，把自己的workunit加载队列里
    MovieSystem.prototype.prepareResource = function (workQueue) {
        // workQueue.addWorkUnit(createClosureWorkUnit( function(this)
        // 													//MapPlayMovie = readCSV("data\\config\\Movie\\MapPlayMovie.csv")
        // 													VideoManager.getInstance().onPrepareResource()
        // 													if(VideoManager.getInstance().isSupportVideo("gougou") == false ){
        // 														START_MOVIE_NAME = "Movie0"
        // 													}else{
        // 														START_MOVIE_NAME = "MovieVideo0"
        // 													}
        // 												}, this) 
        // 											)
    };
    // 获取电影表单
    MovieSystem.prototype.getMoveCSV = function (strFile, callback) {
        var elem = this.repeatableMovie[strFile];
        if (typeof elem == "object") {
            callback.call(this, strFile, elem);
        }
        else {
            var _this_1 = this;
            var bRepeat_1 = false;
            if (!this.repeatableMovie[strFile]) {
            }
            else if (this.repeatableMovie[strFile] == true) {
                bRepeat_1 = true;
            }
            var resCallback = {
                onResItemLoad: function (res) {
                    var moveFile = readCSV(res.getData());
                    var elem = [moveFile, bRepeat_1];
                    _this_1.repeatableMovie[strFile] = elem;
                    callback.call(_this_1, strFile, elem);
                },
                onResItemError: function (key) {
                }
            };
            var str = String.format("data\\config\\Movie\\%s.csv", strFile);
            IGlobal.resManager.loadResAsyn(str, resCallback, core.ResourceType.TYPE_TEXT);
        }
        // if (!this.repeatableMovie[strFile]) {
        // 	let str = String.format("data\\config\\Movie\\%s.csv", strFile)
        // 	let moveFile = readCSV(str) || {}
        // 	let elem = [moveFile, false]
        // 	this.repeatableMovie[strFile] = elem
        // 	return elem
        // } else if (this.repeatableMovie[strFile] == true) {
        // 	let str = String.format("data\\config\\Movie\\%s.csv", strFile)
        // 	let moveFile = readCSV(str) || {}
        // 	let elem: any = [moveFile, true]
        // 	this.repeatableMovie[strFile] = elem
        // 	return elem
        // } else {
        // 	return this.repeatableMovie[strFile]
        // }
    };
    MovieSystem.prototype._beginPlayCallback = function (movieFile, elem) {
        var movieCSV = elem[0];
        if (size_t(movieCSV) == 0) {
            TLog.Error("the %s Movie id null !!!!!!!", movieFile);
            return false;
        }
        this.movieFile = movieFile;
        //let msg = GetMessage(opCodes.C2G_ROLE_VIDEO)
        //SendGameMessage(msg)
        PushUIShow();
        PushActorStorage();
        FireEvent(EventDefine.MOVIE_BEGIN, MovieEvent.newObj(this.movieFile));
        //FireEvent(EventDefine.PRECEDURE_DEACTIVE, PrecedureEvent.newObj(PRECEDURE_GAME))
        PushMapShow();
        this.playingMovie = true;
        // 电影开始的一些操作
        if (StateManager.getInstance().GetCurrentStateType() == state_type.LIVE_BASE_STATE) {
            this.curStoryState = state_type.LIVE_STORY_STATE;
        }
        else if (StateManager.getInstance().GetCurrentStateType() == state_type.COMBAT_BASE_STATE) {
            this.curStoryState = state_type.COMBAT_STORY_STATE;
            this.initFightPlayerList();
        }
        // 保存地图信息
        //this.saveData = {}
        //this.saveData.mapId = MapSystem.getInstance().getMapId()	
        //this.saveData.cellX,this.saveData.cellY = GetHero().getCellXY()
        //TLog.Debug("save mapId",this.saveData.mapId)
        StateManager.getInstance().ActiveSubState(this.curStoryState);
        // 开始停止镜头绑定      
        GetHero().moveStop();
        SceneManager.getInstance().cameraUnLinkActor();
        this.hideAllPeople();
        //SceneManager.getInstance().transitionScene(MapTransitionStyle.FADEOUTDOWN_TILES)
        SceneManager.getInstance().setMaskEnable(false);
        movieCSV = this.sortMoiveAction(movieCSV);
        this.movie_show = this.getAnimeListByCSV(movieCSV);
        //TLog.Debug(this.movie_show)
        //io.read()
        this.getAllImageNameAndLoad(this.movie_show);
        this.setNext();
        if (this.timerId == null) {
            this.timerId = SetTimer(this.tick, this, 0);
        }
        //音量 
        GameSound.getInstance().setMusicVolume(1);
        GameSound.getInstance().setEffectVolume(1);
        GameSound.getInstance().resetEffect();
        //let window = WngMrg.getInstance().getWindow("MovieDramaFrame")
        //window.showWnd()
        return true;
    };
    // 开始播放电影
    MovieSystem.prototype.beginPlay = function (movieFile) {
        TLog.Debug("MovieSystem.beginPlay", movieFile);
        // 判断是否在播放剧情，是则返回
        if (this.playingMovie || !movieFile || movieFile == "") {
            TLog.Error("MovieSystem is Playing!!!!!!!");
            return false;
        }
        // 判断是否已播放过了，播放过了，就不再播放了
        var bFind = table_isExsit(this.played_movie_list, movieFile);
        if (bFind) {
            TLog.Error("the %s Movie is Played!!!!!!!", movieFile);
            //return
        }
        // 读取配置表
        this.getMoveCSV(movieFile, this._beginPlayCallback);
    };
    MovieSystem.prototype.getAllImageNameAndLoad = function (moive) {
        var imageNameList = [];
        for (var _i in moive) {
            var _v = moive[_i];
            for (var _j in _v) {
                var _info = _v[_j];
                if (_info.classname == "Movie_ShowImage" && _info.imageName) {
                    JsUtil.arrayInstert(imageNameList, _info.imageName);
                }
            }
        }
        for (var _i in imageNameList) {
            var _image = imageNameList[_i];
            //image_set.preLoadImage(_image)
        }
    };
    MovieSystem.prototype.sortMoiveAction = function (movieElem) {
        var elemList = [];
        for (var _i in movieElem) {
            var _v = movieElem[_i];
            //TLog.Debug("aaa~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~aa")
            JsUtil.arrayInstert(elemList, _v);
        }
        //TLog.Debug(movieElem)
        //TLog.Debug(elemList)	
        //io.read()
        table_sort(elemList, function (t1, t2) {
            //TLog.Debug("~~~~~~~~~~~~~~~~~~~~")
            //TLog.Debug(t1)
            //io.read()
            //TLog.Debug(t2)
            if (t1.ActionIndex != t2.ActionIndex) {
                return t1.ActionIndex - t2.ActionIndex;
            }
            else {
                //优先级越大，越靠前
                var p1 = MOVIE_ACTION_PRIORITY[t1.Action] || 0;
                var p2 = MOVIE_ACTION_PRIORITY[t2.Action] || 0;
                return p2 - p1;
            }
        });
        //TLog.Debug("aaa~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~aa")	
        //TLog.Debug(elemList)
        //io.read()
        //io.read()
        return elemList;
    };
    // 停止播放电影
    MovieSystem.prototype.endPlay = function () {
        if (this.playingMovie == false) {
            return;
        }
        this.movieEnding = true;
        TLog.Debug("MovieSystem.endPlay");
        if (this.timerId) {
            KillTimer(this.timerId);
            this.timerId = null;
        }
        for (var i in this.movie_show) {
            var v = this.movie_show[i];
            for (var n in v) {
                var elem = v[n];
                elem.finish();
                elem.deleteObj();
            }
        }
        if (this.movieFile && this.repeatableMovie[this.movieFile][1] == false) {
            JsUtil.arrayInstert(this.played_movie_list, this.movieFile);
        }
        this.clearPlayerEffect();
        this.clearEffect();
        this.deleteAllPlayer();
        StateManager.getInstance().DeactiveSubState(this.curStoryState);
        this.movieIndex = 0;
        var movie = this.movieFile;
        this.movieFile = null;
        this.movie_show = [];
        this.player_list = {};
        this.effectList = {};
        this.isfastEnd = null;
        // 还原原有的操作
        //if(this.saveData ){
        //	MapSystem.getInstance().loadMovieMap(this.saveData.mapId,this.saveData.cellX,this.saveData.cellY)
        //	//MapSystem.getInstance().loadMap(this.saveData.mapId,1,1)
        //	MapSystem.getInstance().playBackgourdMusic()
        //	let hero = GetHero()
        //	hero.moveStop()
        //	hero.setCellXY(this.saveData.cellX,this.saveData.cellY)
        //	this.saveData	=null
        //}
        GameClearCache();
        var mapPos = GetHero().getMapXY();
        SceneManager.getInstance().lookAtCenter(mapPos.x, mapPos.y);
        SceneManager.getInstance().cameraLinkActor(GetHero());
        SceneManager.getInstance().setMaskEnable(true);
        //SceneManager.getInstance().transitionScene(MapTransitionStyle.FADEOUTDOWN_TILES)
        //FireEvent(EventDefine.PRECEDURE_ACTIVE, PrecedureEvent.newObj(PRECEDURE_GAME))
        //if(this.curStoryState == state_type.COMBAT_STORY_STATE ){
        //	let message = GetMessage(opCodes.C2G_FIGHT_RESTART)
        //	return SendGameMessage(message)
        //}
        //io.read()
        PopUIShow();
        PopMapShow();
        PopActorStorage();
        this.playingMovie = false;
        this.taskNoTick = false;
        LookAtHero();
        this.showAllPeople();
        if (FightSystem.getInstance().isFight())
            SceneManager.getInstance().cameraUnLinkActor();
        this.skippAble = true;
        FireEvent(EventDefine.MOVIE_END, MovieEvent.newObj(movie));
        if (this.callBackFunc) {
            this.callBackFunc.call(this.callBackObj, this.callBackArgs);
            this.callBackFunc = null;
            this.callBackObj = null;
            this.callBackArgs = null;
        }
        if (GAME_MODE == GAME_NORMAL) {
            IGlobal.setting.setRoleSetting(UserSetting.TYPE_NUMBER, movie, 1);
        }
        if (movie == START_MOVIE_NAME) {
            var blackFrame = WngMrg.getInstance().getWindow("FullBalckFrame");
            blackFrame.setWindowTYpe();
            blackFrame.showWnd();
            if (GAME_MODE == GAME_NORMAL) {
                var hideCallback_1 = function () {
                    UnRegisterEvent(EventDefine.HERO_ENTER_GAME, hideCallback_1, this);
                    var blackFrame = WngMrg.getInstance().getWindow("FullBalckFrame");
                    blackFrame.playChangeHide(500);
                };
                RegisterEvent(EventDefine.HERO_ENTER_GAME, hideCallback_1, this);
            }
            else {
                blackFrame.playChangeHide(500);
            }
        }
        else {
            //TLog.Debug("show full black",movie)
            if (!FightSystem.getInstance().isFight()) {
                var blackFrame = WngMrg.getInstance().getWindow("FullBalckFrame");
                blackFrame.setWindowTYpe();
                blackFrame.showWnd();
                var hideTimer_1 = -1;
                var hideCallback = function (dt) {
                    if (hideTimer_1) {
                        KillTimer(hideTimer_1);
                        var blackFrame_1 = WngMrg.getInstance().getWindow("FullBalckFrame");
                        blackFrame_1.playChangeHide(500);
                        hideTimer_1 = null;
                    }
                };
                hideTimer_1 = SetTimer(hideCallback, this, 500);
            }
        }
        //音量
        GameSound.getInstance().setMusicVolume(1);
        GameSound.getInstance().setEffectVolume(1);
        GameSound.getInstance().resetEffect();
        this.movieEnding = false;
        //LuaCollectGarbage()
    };
    // 电影播放帧
    MovieSystem.prototype.tick = function (delay) {
        if (this.bSkip) {
            return;
        }
        if (this.taskNoTick) {
            return;
        }
        if (this.isfastEnd) {
            var elemCount = this.movie_show.length;
            var endType = "normal";
            elemCount = 0;
            for (var _i = 0; _i < this.movie_show.length; _i++) {
                var _v = this.movie_show[_i];
                if (_i > elemCount) {
                    elemCount = _i;
                }
            }
            //TLog.Debug("this.isfastEnd",size_t(this.movie_show[elemCount]),elemCount)
            //TLog.Debug(this.movie_show)
            //io.read()
            if (this.movie_show[elemCount] && size_t(this.movie_show[elemCount]) > 0) {
                //TLog.Debug(this.movie_show[elemCount])
                //io.read()
                for (var i in this.movie_show[elemCount]) {
                    var v = this.movie_show[elemCount][i];
                    //有repeat
                    if (v.classname == "Movie_openTask") {
                        endType = "openTask";
                        break;
                    }
                }
            }
            if (this.movie_show[this.movieIndex] && size_t(this.movie_show[this.movieIndex]) > 0) {
                var bFinish = true;
                var isFight = false;
                for (var i in this.movie_show[this.movieIndex]) {
                    var v = this.movie_show[this.movieIndex][i];
                    //有repeat
                    if (v.classname == "Movie_Fight") {
                        isFight = true;
                    }
                    bFinish = v.isFinish() && bFinish;
                    if (!v.isFinish()) {
                        v.tick(delay);
                    }
                }
                //TLog.Debug("}",isFight,bFinish,endType)
                if (isFight && bFinish) {
                    if (endType == "normal") {
                        this.fastEndNormal();
                    }
                    else if (endType == "openTask") {
                        this.fastEndOpenTask();
                    }
                }
                else if (!isFight) {
                    if (endType == "normal") {
                        this.fastEndNormal();
                    }
                    else if (endType == "openTask") {
                        this.fastEndOpenTask();
                    }
                }
            }
            else {
                this.endPlay();
            }
        }
        else {
            // 判断当前的剧情可否播放，否则完成剧情	
            if (this.movie_show[this.movieIndex] && size_t(this.movie_show[this.movieIndex]) > 0) {
                var bFinish = true;
                for (var i in this.movie_show[this.movieIndex]) {
                    var v = this.movie_show[this.movieIndex][i];
                    //有repeat
                    bFinish = v.isFinish() && bFinish;
                    if (!v.isFinish()) {
                        v.tick(delay);
                    }
                }
                if (bFinish) {
                    //TLog.Debug("movie index",this.movieIndex)
                    this.setNext();
                }
            }
            else {
                this.endPlay();
            }
        }
    };
    MovieSystem.prototype.setNext = function () {
        this.movieIndex = this.movieIndex + 1;
        var count = this.movie_show.length;
        for (var i = this.movieIndex; i < count; i++) {
            if (this.movie_show[i]) {
                this.movieIndex = i;
                return this.launchElem();
            }
        }
    };
    MovieSystem.prototype.launchElem = function () {
        var actionList = this.movie_show[this.movieIndex];
        if (actionList) {
            for (var i in actionList) {
                var v = actionList[i];
                v.begin();
            }
        }
    };
    MovieSystem.prototype.getAnime = function (actionName) {
        return movieActionType[actionName];
    };
    MovieSystem.prototype.getAnimeListByCSV = function (movieCSV) {
        var movie = [];
        for (var i in movieCSV) {
            var v = movieCSV[i];
            var index = v.ActionIndex;
            for (var i_1 = 1; i_1 <= v.Repeat; i_1++) {
                var Anime = this.getAnime(v.Action);
                if (Anime) {
                    var action = Anime.newObj(v.Param);
                    if (movie[index] == null) {
                        movie[index] = [];
                    }
                    JsUtil.arrayInstert(movie[index], action);
                }
            }
        }
        //TLog.Debug(movie)
        //io.read()
        //let sortList = this.sortAnimeList(movie)
        //return sortList
        return movie;
    };
    //重新排序动作
    MovieSystem.prototype.sortAnimeList = function (list) {
        var temp = [];
        for (var i in list) {
            var v = list[i];
            JsUtil.arrayInstert(temp, i);
        }
        table_sort(temp, function (a, b) {
            return (a - b);
        });
        var sortList = {};
        for (var i = 0; i < temp.length; i++) {
            var v = temp[i];
            JsUtil.arrayInstert(sortList, list[v]);
        }
        return sortList;
    };
    MovieSystem.prototype.initFightPlayerList = function () {
        var actorList = FightSystem.getInstance().getActorSystem().getActorList();
        for (var id in actorList) {
            var actor = actorList[id];
            var side = actor.getSide();
            var pos = actor.getPos();
            if (!this.player_list[side + "_" + pos]) {
                actor.enterMovie();
                //TLog.Debug("initFightPlayerList",side,pos)
                //actor.setVisible(false)
                this.player_list[side + "_" + pos] = actor;
            }
        }
    };
    // 创建角色
    MovieSystem.prototype.createPlayer = function (info, cellX, cellY) {
        var player_id = info.id;
        var playerObject = this.player_list[player_id] || Player.newObj();
        var mapPos = SceneManager.getInstance().screenXYtoMapXY(cellX, cellY);
        playerObject.setMapXY(mapPos.x, mapPos.y);
        playerObject.setPropertyInfo(info);
        if (info.body < 20) {
            playerObject.loadModel(GetPlayerModelByBody(info.body));
        }
        else {
            playerObject.loadModel(info.body);
        }
        playerObject.setDir(info.dir);
        //playerObject.doCommand(ActorCommand.SetNameColor, gui.Color[info.nameColor])
        playerObject.doCommand(ActorCommand.SetNameColor, "white");
        playerObject.doCommand(ActorCommand.SetName, info.name);
        playerObject.enterMap();
        this.player_list[player_id] = playerObject;
        //TLog.Debug("createPlayer",player_id)
    };
    MovieSystem.prototype.deletePlayer = function (id) {
        //TLog.Debug("deletePlayer",id)
        var playerObject = this.player_list[id];
        if (playerObject) {
            if (playerObject.classname == "FightActor") {
                var info = playerObject.getPropertyInfo();
                playerObject.setHP(info.hp, info.maxHp);
                if (!this.movieEnding) {
                    playerObject.setVisible(false);
                }
            }
            else {
                playerObject.deleteObj();
            }
        }
        else {
            TLog.Error("MovieSystem.removePlayer %s", tostring(id));
        }
        delete this.player_list[id];
    };
    MovieSystem.prototype.deleteAllPlayer = function () {
        //TLog.Debug("deleteAllPlayer")
        if (this.player_list) {
            var removeList = [];
            for (var k in this.player_list) {
                removeList.push(k);
            }
            for (var i = 0; i < removeList.length; i++) {
                this.deletePlayer(removeList[i]);
            }
        }
        this.player_list = {};
        //恢复战斗系统中的角色列表
        if (FightSystem.getInstance().isFight() == true) {
            FightSystem.getInstance().refreshPlayList();
        }
    };
    MovieSystem.prototype.hideAllPlayer = function () {
        for (var i in this.player_list) {
            var v = this.player_list[i];
            if (v) {
                //TLog.Debug("hide player",i)
                v.setVisible(false);
            }
        }
    };
    MovieSystem.prototype.showAllPlayer = function () {
        for (var i in this.player_list) {
            var v = this.player_list[i];
            if (v) {
                //TLog.Debug("show player",i)
                v.setVisible(true);
            }
        }
    };
    MovieSystem.prototype.getPlayer = function (id) {
        return this.player_list[id];
    };
    MovieSystem.prototype.getPlayerList = function (id) {
        return this.player_list;
    };
    // 判断是否在播放movie
    MovieSystem.prototype.isPlayingMovie = function () {
        return [this.playingMovie, this.movieFile];
    };
    // 创建特效
    MovieSystem.prototype.createEffect = function (effectId, x, y, once, id) {
        var effect = EffectManager.getInstance().createSceneEffect(effectId, x, y, once);
        // 一次性特效不保存
        if (!once) {
            this.effectList[id] = effect;
        }
        return effect;
    };
    MovieSystem.prototype.getEffect = function (id) {
        return this.effectList[id];
    };
    MovieSystem.prototype.getEffectList = function () {
        return this.effectList;
    };
    MovieSystem.prototype.removeEffect = function (id) {
        //TLog.Debug("MovieSystem.removeEffect")
        var effect = this.effectList[id];
        if (effect) {
            effect.deleteObj();
            delete this.effectList[id];
        }
    };
    MovieSystem.prototype.clearEffect = function () {
        if (this.effectList) {
            var removeList = [];
            for (var k in this.effectList) {
                removeList.push(k);
            }
            for (var i = 0; i < removeList.length; i++) {
                this.removeEffect(removeList[i]);
            }
        }
        this.effectList = {};
    };
    MovieSystem.prototype.updateEffect = function (id, effect) {
        this.effectList[id] = effect;
    };
    MovieSystem.prototype.hideAllEffect = function () {
        for (var i in this.effectList) {
            var v = this.effectList[i];
            if (v) {
                v.setVisible(false);
            }
        }
    };
    MovieSystem.prototype.showAllEffect = function () {
        for (var i in this.effectList) {
            var v = this.effectList[i];
            if (v) {
                v.setVisible(true);
            }
        }
    };
    // 电影开始隐藏界面所有动物
    MovieSystem.prototype.hideAllPeople = function () {
        //let playerList = ActorManager.getInstance().getPlayerList()
        //for(let i in playerList){
        //let v = playerList[i]
        //
        //	if(v ){
        //		v.setVisible(false)
        //	}
        //}
        ActorManager.getInstance().hideAllPlayer();
        var npcList = ActorManager.getInstance().getNpcList();
        for (var i in npcList) {
            var v = npcList[i];
            if (v) {
                v.setVisible(false);
            }
        }
        // 停止角色移动
        GetHero().moveStop();
        GetHero().setVisible(false);
    };
    // 电影结束显示界面所有动物
    MovieSystem.prototype.showAllPeople = function () {
        if (this.curStoryState == state_type.COMBAT_STORY_STATE) {
            return;
        }
        //let playerList = ActorManager.getInstance().getPlayerList()
        //for(let i in playerList){
        //let v = playerList[i]
        //
        //	if(v ){
        //		v.setVisible(true)
        //	}
        //}
        ActorManager.getInstance().showAllPlayer();
        var npcList = ActorManager.getInstance().getNpcList();
        for (var i in npcList) {
            var v = npcList[i];
            if (v) {
                v.setVisible(true);
                TLog.Debug("show npc", v.getProperty("entryId"), v.getProperty("id"));
            }
        }
        // 停止角色移动
        GetHero().setVisible(true);
    };
    MovieSystem.prototype.playerEnterMap = function (args) {
        if (this.playingMovie) {
            args.actor.setVisible(false);
        }
    };
    MovieSystem.prototype.onHeroMove = function (args) {
        // if (this.isPlayingMovie()) {
        // 	return
        // }
        // let hero = GetHero()
        // let heroPos = hero.getCellXY()
        // let taskList = TaskSystem.getInstance().getTaskList()
        // let mapId = MapSystem.getInstance().getMapId()
        // let taskId_list = []
        // for (let i in taskList) {
        // 	let task = taskList[i]
        // 	JsUtil.arrayInstert(taskId_list, task.getId())
        // }
    };
    // 跳过剧情表演，直接进入战斗
    MovieSystem.prototype.skipMovie = function () {
        if (!this.playingMovie || !this.timerId || this.skippAble == false) {
            return;
        }
        this.bSkip = true;
        this.movieIndex = this.movie_show.length;
        this.launchElem();
        this.bSkip = false;
    };
    MovieSystem.prototype.skipNextElem = function () {
        // 如果在跳过状态，则不设置
        if (this.bSkip || this.skippAble == false) {
            return;
        }
        this.bSkip = true;
        if (!this.playingMovie && !this.timerId) {
            return;
        }
        if (this.movie_show[this.movieIndex] && size_t(this.movie_show[this.movieIndex]) > 0) {
            for (var i in this.movie_show[this.movieIndex]) {
                var v = this.movie_show[this.movieIndex][i];
                v.finish();
            }
        }
        this.setNext();
        this.bSkip = false;
    };
    MovieSystem.prototype.testMovie = function (movie) {
        PushUIShow();
        PushActorStorage();
        FireEvent(EventDefine.MOVIE_BEGIN, null);
        //FireEvent(EventDefine.PRECEDURE_DEACTIVE, PrecedureEvent.newObj(PRECEDURE_GAME))
        this.playingMovie = true;
        // 电影开始的一些操作
        // 保存地图信息
        PushMapShow();
        StateManager.getInstance().ActiveSubState(state_type.LIVE_STORY_STATE);
        // 开始停止镜头绑定      
        SceneManager.getInstance().cameraUnLinkActor();
        this.hideAllPeople();
        //SceneManager.getInstance().transitionScene(MapTransitionStyle.FADEOUTDOWN_TILES)
        // 读取配置表
        var movieCSV = movie;
        this.movie_show = this.getAnimeListByCSV(movieCSV);
        this.setNext();
        if (this.timerId == null) {
            this.timerId = SetTimer(this.tick, this, 0);
        }
    };
    //模型特效
    MovieSystem.prototype.createPlayerEffect = function (effectId, offx, offy, id, actorId, ones) {
        if (!this.player_list[actorId]) {
            return TLog.Warn("MovieSystem.createPlayerEffect the actor %s is null!", tostring(actorId));
        }
        var actor = this.player_list[actorId];
        if (!ones) {
            var effect = EffectManager.getInstance().createBindEffect(effectId, actor);
            effect.setPositionXY(offx, offy);
            this.playerEffectList[actorId] = this.playerEffectList[actorId] || {};
            this.playerEffectList[actorId][id] = effect;
            return effect;
        }
        else {
            var effect = EffectManager.getInstance().createBindOnceEffect(effectId, actor);
            effect.setPositionXY(offx, offy);
        }
    };
    MovieSystem.prototype.removePlayerEffect = function (actorId, effectId) {
        //TLog.Debug("MovieSystem.removePlayerEffect",actorId,effectId)
        //delete角色时会自动把响应特效给清除
        if (!this.player_list[actorId]) {
            delete this.playerEffectList[actorId];
            return;
        }
        if (!this.playerEffectList[actorId] || !this.playerEffectList[actorId][effectId]) {
            return;
        }
        var effect = this.playerEffectList[actorId][effectId];
        effect.deleteObj();
        delete this.playerEffectList[actorId][effectId];
        //TLog.Debug("getPlayer",this.getPlayer(actorId))
    };
    MovieSystem.prototype.clearPlayerEffect = function () {
        if (this.playerEffectList) {
            for (var actorId in this.playerEffectList) {
                var v = this.playerEffectList[actorId];
                for (var effectId in v) {
                    var effect = v[effectId];
                    effect.deleteObj();
                }
            }
        }
        this.playerEffectList = {};
    };
    ////////////////////////////////////////////////////////////-
    MovieSystem.prototype.onCombatBegin = function (campainId, fightType) {
        // if (fightType != opFightType.FIGHT_TYPE_COMMON) {
        // 	return false
        // }
        var config = GameConfig.CampaignConfig[campainId];
        if (!campainId || campainId == 0
            || !config || !config.movieName
            || config.movieName == "") {
            //let message = GetMessage(opCodes.C2G_FIGHT_RESTART)
            //return SendGameMessage(message)
            return false;
        }
        // if (!GAME_DEBUG) {
        // 	if (!TaskSystem.getInstance().isTaskExsit(config.taskId) || CampaignSystem.getInstance().isCampaignPass(campainId) == true) {
        // 		return false
        // 	}
        // }
        var movieName = config.movieName;
        this.repeatableMovie[movieName] = this.repeatableMovie[movieName] || true;
        return this.beginPlay(movieName);
    };
    MovieSystem.prototype.stopTick = function () {
        this.taskNoTick = true;
    };
    MovieSystem.prototype.setSkippAble = function (able) {
        this.skippAble = able;
    };
    MovieSystem.prototype.playMovieAndSetCallback = function (movieName, obj, callback, args) {
        //TLog.Debug("playMovieAndSetCallback",movieName)
        //io.read()
        this.callBackObj = obj;
        this.callBackFunc = callback;
        this.callBackArgs = args;
        this.beginPlay(movieName);
    };
    MovieSystem.prototype.fastEnd = function () {
        //if(this.isPlayingMovie() ){
        //	this.endPlay()
        //}	
        if (!this.isfastEnd) {
            this.isfastEnd = true;
            if (FightSystem.getInstance().isShowingFight()) {
                FightSystem.getInstance().forceEndFight();
            }
        }
    };
    MovieSystem.prototype.fastEndNormal = function () {
        this.endPlay();
    };
    MovieSystem.prototype.fastEndOpenTask = function () {
        this.movieIndex = this.movie_show.length - 1;
        this.launchElem();
        this.getFastEndWnd().hideWnd();
    };
    MovieSystem.prototype.getFastEndWnd = function () {
        if (this.fastEndWnd == null) {
            this.fastEndWnd = WngMrg.getInstance().getWindow("FastEndMoiveFrame");
        }
        return this.fastEndWnd;
    };
    MovieSystem.prototype.getMovieBlackSide = function () {
        if (this.movieBalckSide == null) {
            this.movieBalckSide = WngMrg.getInstance().getWindow("FightMovieFrame");
        }
        return this.movieBalckSide;
    };
    return MovieSystem;
}(BaseSystem));
__reflect(MovieSystem.prototype, "MovieSystem");
var _a, _b;
//# sourceMappingURL=MovieSystem.js.map