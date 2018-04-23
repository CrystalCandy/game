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
var test;
(function (test) {
    var TestEnterMap = (function (_super) {
        __extends(TestEnterMap, _super);
        function TestEnterMap() {
            var _this = _super.call(this) || this;
            _this.precedure = PRECEDURE_GAME;
            _this.setHeroEnterMap(50014, 50, 32);
            _this.setHeroShow(true);
            RegisterEvent(EventDefine.PRECEDURE_ACTIVE, _this.onGamePrecedure, _this);
            return _this;
            //IGlobal.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStageMouseDown, this);
        }
        TestEnterMap.prototype.setHeroEnterMap = function (mapId, x, y) {
            this.heroMapId = mapId;
            this.heroX = x;
            this.heroY = y;
        };
        TestEnterMap.prototype.setHeroShow = function (show) {
            this.heroShow = show;
        };
        TestEnterMap.prototype.onStart = function () {
            //WngMrg.getInstance().setShowStateWindow(false);
            IGlobal.setting.setRoleName("test");
            PrecedureManager.getInstance().changePrecedure(this.precedure);
        };
        TestEnterMap.prototype.onExit = function () {
        };
        TestEnterMap.prototype.onStageMouseDown = function (event) {
        };
        TestEnterMap.prototype.onGamePrecedure = function (event) {
            if (event.state != PRECEDURE_GAME)
                return;
            if (this.heroShow) {
                var message = GetMessage(opCodes.G2C_MAP_ENTER);
                message.mapId = this.heroMapId;
                message.cellx = this.heroX;
                message.celly = this.heroY;
                GameNetDispatcher.getInstance().dispatchMessage(message);
                //var message = GetMessage(opCodes.G2C_HERO_INFO)
                var info = {};
                info.id = 10;
                info.name = "test";
                info.followTip = 0;
                info.sex = 0;
                info.race = 0;
                info.icon = 101;
                info.body = 0;
                info.level = 10;
                info.experience = 0;
                info.funds = 0;
                info.gold = 0;
                info.power = 0;
                info.saveRecord = {};
                info.vocation = 10001;
                info.rideShapeId = 0;
                info.heroTitleId = 80002;
                // info.petShapeId = 20002
                // info.petTLShapeId = 18001//通灵
                // info.petSHShapeId = 22001//兽魂
                // info.xianlvShapeId = 17001
                // info.xlFZShapeId = 18002//法阵
                // info.xlXWShapeId = 80001//仙位
                RpcLogic.G2C_HeroInfoInit(info);
                // message.info = info
                // GameNetDispatcher.getInstance().dispatchMessage(message)
            }
            var hero = GetHero();
            hero.doCommand(ActorCommand.ShowCombatAutoHpSlot, 0.5, fightSide.FIGHT_RIGHT);
            hero.doCommand(ActorCommand.SetFactionName, "factionStr");
            // hero.loadModel(31001)
            // hero.setWing(103001)
            // hero.setRide(105001)
            // hero.setWeaponId(102001)
            ChangePatrolState(false);
            // let hero:Hero = GetHero()
            // hero.setFootBindEffect(GetShapeEffectId(18001))
            // let timerId = 0;
            // let onTimerCallback = function(dt){
            // 	KillTimer(timerId);
            // 	GetHero().setWing(-1)
            // }
            // timerId = SetTimer(onTimerCallback, this, 1000);
            //SceneManager.getInstance().setBgImage("ui/image/daTi/dt_ztBg01.png", 0, 200)
            //this.testPerform()
            // var boneParam:any = {}
            // boneParam.name = "wing_point"
            // boneParam.order = -1
            // let actor = GetHero();
            // var effect:Effect = EffectManager.getInstance().createBindEffect(90056, actor, boneParam)
            //effect = EffectManager.getInstance().createBindEffect(90057, actor, boneParam)
            // boneParam.order = 1
            // var effect:Effect = EffectManager.getInstance().createBindEffect(90058, actor, boneParam)
            //effect = EffectManager.getInstance().createBindEffect(90057, actor, boneParam)
        };
        TestEnterMap.prototype.testPerform = function () {
            TLog.Debug("TestEnterMap.testPerform");
            var timerId = 0;
            //let modelIdList:any = {10003, 40001, 10002, 30002}
            //let modelIdList:any = {10001}
            var modelIdList = [21001, 21003, 21004, 21005, 21006, 21013, 21017, 21018];
            var all = 300;
            function moveActorRandom(_) {
                var objList = ActorManager.getInstance().getNpcList();
                var scope = 100;
                //for(let i = 1; i <=  100;i++){
                //	let ri = MathUtil.random(1, all)
                //	let obj = objList[ri]
                //	if(obj &&  obj.isState(characterState.actionState_idle) ){
                //		let cellx, celly = obj.getCellXY()
                //		
                //		let dx = MathUtil.random(1, scope*2) - scope
                //		let dy = MathUtil.random(1, scope*2) - scope
                //		
                //		obj.wantToGoByCell(cellx+dx, celly + dy, true)
                //	}
                //}
                for (var id in objList) {
                    var obj = objList[id];
                    if (obj.isState(characterState.actionState_idle)) {
                        var cellPos = obj.getCellXY();
                        var dx = MathUtil.random(1, scope * 2) - scope;
                        var dy = MathUtil.random(1, scope * 2) - scope;
                        obj.wantToGoByCell(cellPos.x + dx, cellPos.y + dy, true);
                    }
                }
            }
            function addNpcFunction(dt) {
                for (var i = 1; i <= all; i++) {
                    var index = MathUtil.random(1, modelIdList.length);
                    // let message = GetMessage(opCodes.G2C_ROLE_ADD)
                    // let info = PlayerInfo.newObj()
                    // info.id = i
                    // info.body = modelIdList[modelIdx - 1]
                    // info.name = "name_"+i
                    // info.level = 0
                    // info.Icon = 0
                    // message.info = info
                    // message.cellx = this.heroX + (i % 10) * 3
                    // message.celly = this.heroY + (i / 10)
                    // message.mapId = this.heroMapId
                    // GameNetDispatcher.getInstance().onTcpRecv(message)
                    var entryId = modelIdList[index - 1];
                    var npcInfo = {};
                    npcInfo.cellx = this.heroX - (i % 10) * 3;
                    npcInfo.celly = this.heroY + (i / 10);
                    npcInfo.dir = 1;
                    npcInfo.entryId = GameConfig.npcConfig[entryId].id;
                    npcInfo.id = i;
                    npcInfo.image = GameConfig.npcConfig[entryId].model;
                    npcInfo.name = "";
                    npcInfo.param = [];
                    npcInfo.taskInfo = {};
                    var npc = ActorManager.getInstance().createNpc(npcInfo);
                    npc.setTouchEnable(false);
                }
                KillTimer(timerId);
                //SetTimer(moveActorRandom, this, 1000)
            }
            timerId = SetTimer(addNpcFunction, this, 3000); //延时3秒，为了可以正常加载地图
        };
        return TestEnterMap;
    }(test.TestUnit));
    test.TestEnterMap = TestEnterMap;
    __reflect(TestEnterMap.prototype, "test.TestEnterMap");
})(test || (test = {}));
//# sourceMappingURL=TestEnterMap.js.map