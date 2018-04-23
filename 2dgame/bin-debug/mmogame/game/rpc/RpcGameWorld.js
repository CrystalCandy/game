var RpcLogic;
(function (RpcLogic) {
    function _handleHeroInfo(roleInfo) {
        if (roleInfo.experience)
            roleInfo.experience = tonumber(roleInfo.experience);
        if (roleInfo.funds)
            roleInfo.funds = tonumber(roleInfo.funds);
        if (roleInfo.combatForce)
            roleInfo.combatForce = tonumber(roleInfo.combatForce);
        // if(roleInfo.funds)
        //     roleInfo.funds = tonumber(roleInfo.funds)
    }
    //角色信息，第一次进入游戏加载
    function G2C_HeroInfoInit(roleInfo) {
        //预处理
        _handleHeroInfo(roleInfo);
        // let heroInfo = HeroInfo.newObj();
        // for (let k in roleInfo) {
        //     heroInfo[k] = roleInfo[k]
        // }
        var hero = GetHero();
        ActorManager.getInstance().updateHeroInfo(roleInfo, true);
        GuideSystem.getInstance().filterEntry();
        SetServerTime(hero.getProperty("ServerTime") || 0); //设置服务器事件
        SetSCDiffTime(StringUtil.getTimeFromString(hero.getProperty("ServerDataTime"))); //服务器客户端时间差
        //设置生活状态
        StateManager.getInstance().ActiveState(state_type.LIVE_BASE_STATE);
        hero.enterMap(); //进入地图
        hero.setVisible(true);
        hero.setMoveable(true);
        //hero.changeAction("idle");
        FireEvent(EventDefine.LOGIN_LOGO_HIDE_BEGIN, GameUserDataEvent.newObj(true));
        FireEvent(EventDefine.HERO_ENTER_GAME, null);
        if (WngMrg.getInstance().isVisible("LoginFrame") == false) {
            FireEvent(EventDefine.LOGIN_LOGO_HIDE_FINISH, null);
        }
        //主角进入跨服服务器
        if (g_CrossServerInfo) {
            FireEvent(EventDefine.HERO_ENTER_CROSS_SERVER, null);
        }
        if (GAME_MODE == GAME_NORMAL) {
            var heroInfo = GetHeroPropertyInfo();
            var serverInfo = LoginSystem.getInstance().getRecentLoginServerInfo();
            IGlobal.errorReport.addUserParam("roleId", heroInfo["id"]);
            IGlobal.errorReport.addUserParam("serverId", serverInfo.ServerID);
            //serverId:string, serverName:string, roleId:string, roleName:string, roleLevel:number
            IGlobal.gameSdk.reportRoleLogin(serverInfo.ServerID, serverInfo.ServerName, heroInfo["id"], heroInfo["name"], heroInfo["level"]);
        }
    }
    RpcLogic.G2C_HeroInfoInit = G2C_HeroInfoInit;
    //主角自动更新
    function G2C_HeroInfoUpdate(id, updateInfo) {
        _handleHeroInfo(updateInfo);
        // let heroInfo = HeroInfo.newObj();
        //  for (let k in updateInfo) {
        //     heroInfo[k] = updateInfo[k]
        // }
        ActorManager.getInstance().updateHeroInfo(updateInfo);
    }
    RpcLogic.G2C_HeroInfoUpdate = G2C_HeroInfoUpdate;
    function G2C_PlayerAppeare(mapId, cellx, celly, playerInfo) {
        var param = {};
        param.cellx = cellx;
        param.celly = celly;
        param.mapId = mapId;
        param.info = playerInfo;
        if (ActorManager.getInstance().addObjectStorage(onRoleAdd, this, param)) {
            return;
        }
        onRoleAdd(param);
    }
    RpcLogic.G2C_PlayerAppeare = G2C_PlayerAppeare;
    function G2C_PlayerAppeareChange(mapId, cellx, celly, playerInfo) {
        var param = playerInfo;
        if (ActorManager.getInstance().addObjectStorage(onRoleChange, this, param)) {
            return;
        }
        onRoleChange(param);
    }
    RpcLogic.G2C_PlayerAppeareChange = G2C_PlayerAppeareChange;
    function G2C_ObjectAdd(npcInfo) {
        var param = npcInfo;
        if (ActorManager.getInstance().addObjectStorage(onObjectAdd, this, param)) {
            return;
        }
        onObjectAdd(param);
    }
    RpcLogic.G2C_ObjectAdd = G2C_ObjectAdd;
    function G2C_Disappear(id, Type) {
        var param = {};
        param.id = id;
        param.Type = Type;
        if (ActorManager.getInstance().addObjectStorage(onRoleDisappear, this, param)) {
            return;
        }
        onRoleDisappear(param);
    }
    RpcLogic.G2C_Disappear = G2C_Disappear;
    function onObjectAdd(param) {
        var npcObject = ActorManager.getInstance().createNpc(param);
    }
    function onRoleAdd(param) {
        if (MapSystem.getInstance().getMapId() == param.mapId) {
            var playerObject = ActorManager.getInstance().createPlayer(param.info, param.cellx, param.celly);
        }
    }
    function onRoleDisappear(param) {
        if (param.Type == objectType.OBJECT_TYPE_PLAYER) {
            ActorManager.getInstance().deletePlayer(param.id);
        }
        else if (param.Type == objectType.OBJECT_TYPE_GAMEOBJECT) {
            ActorManager.getInstance().deleteNpc(param.id);
        }
    }
    function onRoleChange(param) {
        if (MapSystem.getInstance().getMapId() == param.mapId) {
            ActorManager.getInstance().updatePlayer(param.id, param);
        }
    }
})(RpcLogic || (RpcLogic = {}));
//# sourceMappingURL=RpcGameWorld.js.map