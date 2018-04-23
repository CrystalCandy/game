// TypeScript file
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
//资源组定义
var ResGroupDisposeTime = 1000 * 300;
var GameConfig;
(function (GameConfig) {
    //==========================================资源组预加载=================================================
    var ResGroupkUnit = (function (_super) {
        __extends(ResGroupkUnit, _super);
        function ResGroupkUnit() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ResGroupkUnit.prototype.initObj = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            this.groupName = params[0];
        };
        ResGroupkUnit.prototype.destory = function () {
        };
        //返回true表示完成
        //返回false，则在完成后回调notifyComplete
        ResGroupkUnit.prototype.onExcute = function () {
            //IGlobal.resGroupManager.loadGroup(this.groupName, this)
            IGlobal.resGroupManager.loadGroup(this.groupName);
            return true;
        };
        return ResGroupkUnit;
    }(WorkUnit));
    __reflect(ResGroupkUnit.prototype, "ResGroupkUnit");
    function _initResouceGroupConfig(data, workQueue) {
        var groupConfig = readCSV(data);
        var groupNameInfo = {};
        for (var k in groupConfig) {
            var v = groupConfig[k];
            IGlobal.resGroupManager.addGroupConfig(v.groupName, v.path, v.type);
            if (groupNameInfo[v.groupName] == null) {
                groupNameInfo[v.groupName] = true;
            }
        }
        //资源析构时间，毫秒单位
        for (var groupName in groupNameInfo) {
            var group_1 = IGlobal.resGroupManager.getGroup(groupName);
            group_1.setDisposeTime(ResGroupDisposeTime);
        }
        //静态的不析构
        var group = IGlobal.resGroupManager.getGroup(ResourceGroupDefine.Group_Static);
        if (group)
            group.setDisposeTime(-1);
        //预加载资源
        workQueue.addWorkUnitFirst(ResGroupkUnit.newObj(ResourceGroupDefine.Group_Static));
        workQueue.addWorkUnitFirst(ResGroupkUnit.newObj(ResourceGroupDefine.Group_EnterGame));
    }
    function _initGameImageSetList(workQueue) {
        for (var k in GameConfig.ImageSetListConfig) {
            var v = GameConfig.ImageSetListConfig[k];
            if (v.type != "login") {
                workQueue.addWorkUnit(GameConfig.ImageSetWorkUnit.newObj(v.filename));
            }
        }
    }
    function initResourceFirst(workQueue) {
        workQueue.addWorkUnit(ZipWorkUnit.newObj("config.zip"));
        workQueue.addWorkUnit(ZipWorkUnit.newObj("config_ui.zip"));
        _initGameImageSetList(workQueue);
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\resource_group.csv", _initResouceGroupConfig, this, workQueue));
    }
    GameConfig.initResourceFirst = initResourceFirst;
    function initGuideResourceGroupConfig(workQueue) {
        var guideGroup = IGlobal.resGroupManager.getGroup(ResourceGroupDefine.Group_Guide, true);
        if (guideGroup)
            guideGroup.setDisposeTime(ResGroupDisposeTime);
        var addModelResPath = function (modelId) {
            var v = GameConfig.ModelConfig[modelId];
            if (v == null)
                return;
            var isbin = v.dbbin == 1;
            var tex_path = v.modelpath + "/" + v.model + "_tex.png";
            var tex_json = v.modelpath + "/" + v.model + "_tex.json";
            var ske_path = v.modelpath + "/" + v.model + "_ske.json";
            if (isbin) {
                ske_path = v.modelpath + "/" + v.model + "_ske.dbbin";
            }
            guideGroup.addResItemConfig(tex_path, core.ResourceType.TYPE_IMAGE);
            guideGroup.addResItemConfig(tex_json, core.ResourceType.TYPE_JSON);
            guideGroup.addResItemConfig(ske_path, core.ResourceType.TYPE_BIN);
        };
        workQueue.addWorkUnit(CallbackWorkUnit.newObj(function () {
            //预加载NPC
            var preloadNpcIds = [21001, 21003, 21004]; //圣地新手怪
            for (var _i = 0, preloadNpcIds_1 = preloadNpcIds; _i < preloadNpcIds_1.length; _i++) {
                var entryId = preloadNpcIds_1[_i];
                var npcRef = GameConfig.npcConfig[entryId];
                if (npcRef == null)
                    continue;
                addModelResPath(npcRef.model);
            }
            //预加载模型
            var preloadModelIds = [7000, 3010];
            for (var _a = 0, preloadModelIds_1 = preloadModelIds; _a < preloadModelIds_1.length; _a++) {
                var preModelId = preloadModelIds_1[_a];
                addModelResPath(preModelId);
            }
            //动态创建新手组资源
            //guideGroup.addResItemConfig()
            workQueue.addWorkUnitFirst(ResGroupkUnit.newObj(guideGroup.name));
        }));
    }
    GameConfig.initGuideResourceGroupConfig = initGuideResourceGroupConfig;
    ////////////////////////////////////////////////////////////////////////////////
    GameConfig.npcConfig = {};
    GameConfig.MonsterConfig = {};
    GameConfig.ModelConfig = {};
    GameConfig.MonsterScopeConfig = {};
    GameConfig.EffectConfig = {};
    GameConfig.ModelShapeConfig = {};
    //地图图片信息
    function _initMapStaticConfig(data) {
        //var tileMap = IGlobal.mapManager.getTileMap();
        var static_set = readCSVEx(data, 3, false);
        for (var k in static_set) {
            var info = static_set[k];
            var id = parseInt(info[1]);
            var path = info[2];
            var width = parseInt(info[3]);
            var height = parseInt(info[4]);
            IGlobal.mapManager.setStaticImage(id, path, width, height);
        }
    }
    function _initMapFrameAnimConfig(data) {
        var frame_anim_info_list = readCSV(data);
        for (var k in frame_anim_info_list) {
            var v = frame_anim_info_list[k];
            IGlobal.mapManager.addAreaAnimConfig(v.name, v.path, v.delay, v.scale);
        }
    }
    function _initMapParticleConfig(data) {
        var outside_particle_info_list = readCSV(data);
        for (var k in outside_particle_info_list) {
            var v = outside_particle_info_list[k];
            IGlobal.mapManager.addAreaParticleConfig(v.name, v.path);
        }
    }
    //模型信息
    function _initModelDeine(data) {
        GameConfig.ModelConfig = readCSV(data);
        for (var k in GameConfig.ModelConfig) {
            var v = GameConfig.ModelConfig[k];
            v.model = null;
            var path = v.modelpath;
            if (path == "") {
                //TLog.Error("ModelDefine: %s modelpath=%s", v.entryId, v.modelpath);
                continue;
            }
            var strList = path.split("/");
            var texturename = v.texturename;
            var modelname = strList[strList.length - 1];
            v.model = modelname;
            var isbin = v.dbbin == 1;
            IGlobal.spriteMangaer.defineModelPath(modelname, path, isbin);
        }
    }
    function initGameWorldCommonCsv(workQueue) {
        workQueue.addWorkUnit(ResWorkUnit.newObj("data/config/MapClient/static.csv", _initMapStaticConfig, this));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data/config/MapClient/sprite_frame_anim.csv", _initMapFrameAnimConfig, this));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data/config/MapClient/sprite_outside_particle.csv", _initMapParticleConfig, this));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data/config/npc.csv", readCSV, this, GameConfig.npcConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data/config/ModelMonster.csv", readCSV, this, GameConfig.MonsterConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data/config/ModelMonsterScope.csv", readCSV, this, GameConfig.MonsterScopeConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data/config/ModelDefine.csv", _initModelDeine, this, GameConfig.ModelConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data/config/ModelShape.csv", readCSV, this, GameConfig.ModelShapeConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data/config/ModelEffect.csv", readCSV, this, GameConfig.EffectConfig));
    }
    GameConfig.initGameWorldCommonCsv = initGameWorldCommonCsv;
    //==========================================地图系统=================================================
    GameConfig.MapConfig = {};
    //export var MapTipsConfig = {};
    GameConfig.MapLinkConfig = {};
    GameConfig.MapEnterList = {};
    //export var MapCampaignList = {};
    //export var MapTransferList = {};
    function _loadMapJumpCsv(data) {
        //var MapLinkConfig = GameConfig.MapLinkConfig;
        var MapLinkTable = readCSV(data);
        for (var index in MapLinkTable) {
            var record = MapLinkTable[index];
            if (GameConfig.MapLinkConfig[record.outMapId] == null) {
                //formerMapId = record.outMapId
                GameConfig.MapLinkConfig[record.outMapId] = [];
            }
            //if record.type == 1 then //普通跳转
            //	record.outX = npcConfig[record.npcId].x
            //	record.outY = npcConfig[record.npcId].y
            //end
            GameConfig.MapLinkConfig[record.outMapId].push(record);
        }
        MapLinkTable = null;
    }
    function initMapSystemCsv(workQueue) {
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Map\\map.csv", readCSV, this, GameConfig.MapConfig));
        //workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Map\\mapJumpTips.csv", readCSV, this, MapTipsConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\map_jump.csv", _loadMapJumpCsv, this));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\map_enter.csv", readCSV, this, GameConfig.MapEnterList));
        //workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\map_campaign.csv", readCSV, this, MapCampaignList));
        //workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\map_transfer.csv", readCSV, this, MapTransferList));
    }
    GameConfig.initMapSystemCsv = initMapSystemCsv;
    //==========================================战斗系统=================================================
    GameConfig.FightActionConfig = {};
    function _loadFightActionConfig(data) {
        GameConfig.FightActionConfig = JsUtil.JsonDecode(data);
        var fightSystem = FightSystem.getInstance();
        fightSystem.getConfigSystem().initFightActonConfig();
    }
    function initPositionDefine(data) {
        //var positionConfig = readCSV(data);
        POS_MAPPING_DEFINE = {};
        //for _, v in pairs(positionConfig) do
        //for (var i in positionConfig) {
        //    var v = positionConfig[i];
        //
        //    var lx = v.x > 320 ? 320 : v.x;
        //    var ly = v.y
        //      var rx = 640 - lx
        //
        //    POS_MAPPING_DEFINE[fightSide.FIGHT_LEFT] = POS_MAPPING_DEFINE[fightSide.FIGHT_LEFT] || {}
        //    POS_MAPPING_DEFINE[fightSide.FIGHT_LEFT][v.pos] = [lx, ly]
        //
        //    POS_MAPPING_DEFINE[fightSide.FIGHT_RIGHT] = POS_MAPPING_DEFINE[fightSide.FIGHT_RIGHT] || {}
        //    POS_MAPPING_DEFINE[fightSide.FIGHT_RIGHT][v.pos] = [rx, ly]
        //}
        //positionConfig = null;
        var indexToPos = [4, 5, 3, 6, 2, 7, 1, 10, 11, 9, 12, 8, 14, 15, 13, 16];
        var _a = [FIGHT_CENTER_X, FIGHT_CENTER_Y], centerX = _a[0], centerY = _a[1];
        //	let deepV, deepH = 3, 4
        var row = 80; //同排的距离
        var raw = FIGHT_MAP_ANGLE;
        var _b = [row * Math.cos(Math.abs(raw)), row * Math.sin(Math.abs(raw))], rowX = _b[0], rowY = _b[1];
        var cRow = 80; //左右-敌我距离
        var _c = [cRow * Math.cos(Math.abs(raw)), cRow * Math.sin(Math.abs(raw))], cRowX = _c[0], cRowY = _c[1];
        var pRow = 60; //同向两排间的距离
        var _d = [pRow * Math.cos(Math.abs(raw / 3)), pRow * Math.sin(Math.abs(raw / 3))], pRowX = _d[0], pRowY = _d[1];
        var list = {};
        function genPosHandler(r, cenX, cenY, index, side) {
            for (var i = 1; i <= 4; i++) {
                var _a = [cenX + (i - 1) * pRowX * r + r * cRowX, cenY + (i - 1) * pRowX * r + r * cRowY], cX = _a[0], cY = _a[1];
                index = index + 1;
                //JsUtil.arrayInstert(list, {cX, cY, index})
                POS_MAPPING_DEFINE[side] = checkNull(POS_MAPPING_DEFINE[side], {});
                POS_MAPPING_DEFINE[side][indexToPos[index - 1]] = [cX, cY];
                for (var j = 1; j <= 4 - i; j++) {
                    var _b = [cX + j * rowX, cY - j * rowY], ex = _b[0], ey = _b[1];
                    index = index + 1;
                    POS_MAPPING_DEFINE[side][indexToPos[index - 1]] = [ex, ey];
                    ex = cX - j * rowX;
                    ey = cY + j * rowY;
                    index = index + 1;
                    POS_MAPPING_DEFINE[side][indexToPos[index - 1]] = [ex, ey];
                }
            }
        }
        genPosHandler(1, centerX, centerY, 0, fightSide.FIGHT_RIGHT);
        genPosHandler(-1, centerX, centerY, 0, fightSide.FIGHT_LEFT);
    }
    function initFightSystemCsv(workQueue) {
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Combat\\fighterPosition.csv", initPositionDefine, this));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Combat\\fightAction.json", _loadFightActionConfig, this, GameConfig.FightActionConfig));
        var fightSystem = FightSystem.getInstance();
        var clientConfig = fightSystem.getConfigSystem().clientConfig;
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Combat\\clientCombatPlayer.csv", readCSV, this, clientConfig.playerList));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Combat\\clientCombatPower.csv", readCSV, this, clientConfig.powersList));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Combat\\clientCombatResult.csv", readCSV, this, clientConfig.resultList));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Combat\\clientCombatDialog.csv", readCSV, this, clientConfig.dialogFileList));
    }
    GameConfig.initFightSystemCsv = initFightSystemCsv;
    //==========================================技能系统=================================================
    //export var SkillInfoConfig = {};
    //export var SkillUpgradeCondition = {};
    // export var SkillCommonDefineConfig = {};
    // export var SkillDefineConfig = {};
    // export var SkillLevelDefineConfig = {};
    GameConfig.SkillDescribeConfig = {};
    // export var SkillExtraDescribeConfig = {};
    GameConfig.SkillPetActiveConfig = {};
    GameConfig.SkillPetPassiveConfig = {};
    function initSkillSystemCsv(workQueue) {
        //workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Skill\\Skill.csv", readCSV, this, SkillInfoConfig));
        // //workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\ActorSkillUp.csv", readCSV, this, SkillUpgradeCondition));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\SkillCommonDefine.csv", readCSV, this, SkillCommonDefineConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\SkillDefine.csv", readCSV, this, SkillDefineConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\SkillLevelDefine.csv", readCSV, this, SkillLevelDefineConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Skill\\SkillDescribe.csv", readCSV, this, GameConfig.SkillDescribeConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Skill\\SkillExtraDescribe.csv", readCSV, this, SkillExtraDescribeConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\ActorPetSkill.csv", readCSV, this, GameConfig.SkillPetActiveConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\ActorPetPassiveSkill.csv", readCSV, this, GameConfig.SkillPetPassiveConfig));
    }
    GameConfig.initSkillSystemCsv = initSkillSystemCsv;
    //==========================================Buff系统=================================================
    GameConfig.BuffConfig = {};
    function initBuffSystemCsv(workQueue) {
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Skill\\buff.csv", readCSV, this, GameConfig.BuffConfig));
    }
    GameConfig.initBuffSystemCsv = initBuffSystemCsv;
    //==========================================伙伴系统=================================================
    GameConfig.PetConfig = {};
    GameConfig.PartnerAwakeConfig = {};
    GameConfig.PartnerEvolutionConfig = {};
    //export var PartnerSkillConfig = {}
    GameConfig.PartnerBreakConfig = {};
    GameConfig.PartnerSpiritConfig = {};
    GameConfig.PartnerOrVocationLinkConfig = {};
    // export var UpgradeItemConfig = {}
    // export var NaturalStoneConfig = {}
    // export var NaturalStoneUpgradeConfig = {}
    //export var PetModelConfig = {}
    // export var SoulEntrtIdToPartnerId = {};
    // export var PetSummonConfig = {}
    //export var PetMagicCircleConfig = {};
    //export var GrowAbilityLevelRatioConfig = {}
    GameConfig.PetFunTipsConfig = {};
    // function _intSpirtConfig(data) {
    //     readCSV(data, PartnerSpiritConfig)
    //     for (let partnerid in PartnerSpiritConfig) {
    //         let v = PartnerSpiritConfig[partnerid]
    //         SoulEntrtIdToPartnerId[v.soulEntryId] = partnerid
    //     }
    // }
    // function _initPartnerAwakeConfig(data) {
    //     readCSV(data, PartnerAwakeConfig)
    //     for (let index in PartnerAwakeConfig) {
    //         let levellist = PartnerAwakeConfig[index]
    //         for (let leve in levellist) {
    //             let v = levellist[leve]
    //             if (Array.isArray(v.ConGrow) == false) {
    //                 let valuelist = [0, 0, 0, 0, 0]
    //                 for (let i = 1; i <= 5; i++) {
    //                     let val = v.ConGrow[i]
    //                     if (val != null) {
    //                         valuelist[i - 1] = val
    //                     }
    //                 }
    //                 v.ConGrow = valuelist  //转换成数组
    //             }
    //         }
    //     }
    // }
    // function _initPartnerModel(data) {
    //     PetModelConfig = {}
    //     let list = readCSV(data)
    //     for (let _ in list) {
    //         let t = list[_]
    //         let entryId = t.entryId
    //         let breakLevel = t.breakLevel
    //         let qualityLevel = t.qualityLevel
    //         PetModelConfig[entryId] = checkNull(PetModelConfig[entryId] , {})
    //         PetModelConfig[entryId][breakLevel] = checkNull(PetModelConfig[entryId][breakLevel] , {})
    //         PetModelConfig[entryId][breakLevel][qualityLevel] = t															//[entryId][breakLevel][qualityLevel]
    //     }
    // }
    function initPetSystemCsv(workQueue) {
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\Partner.csv", readCSV, this, PetConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\PartnerAwake.csv", _initPartnerAwakeConfig, this, PartnerAwakeConfig));
        // //workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\PartnerSkill.csv", readCSV, this, PartnerSkillConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\PartnerBreak.csv", readCSV, this, PartnerBreakConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\PartnerEvolution.csv", readCSV, this, PartnerEvolutionConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\PartnerSpirit.csv", _intSpirtConfig, this, PartnerSpiritConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\PartnerOrVocationLink.csv", readCSV, this, PartnerOrVocationLinkConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\UpgradeItem.csv", readCSV, this, UpgradeItemConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\NaturalStone.csv", readCSV, this, NaturalStoneConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\NaturalStoneUpgrade.csv", readCSV, this, NaturalStoneUpgradeConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\PartnerModel.csv", _initPartnerModel, this, PetModelConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Monster\\PetQuickRecruit.csv", readCSV, this, PetSummonConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\PetMagicCircle.csv", readCSV, this, PetMagicCircleConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\LevelToAbilityGrowRatio.csv", readCSV, this, GrowAbilityLevelRatioConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\ActorPet.csv", readCSV, this, GameConfig.PetConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\ActorPetFunTips.csv", readCSV, this, GameConfig.PetFunTipsConfig));
    }
    GameConfig.initPetSystemCsv = initPetSystemCsv;
    GameConfig.FakeChatConfig = {};
    GameConfig.GroupCmdConfig = {};
    //export var AnimalConfig = {}
    GameConfig.RoleHonorConfig = {};
    GameConfig.FakeChatConfig = {}; //新手机器人对白
    GameConfig.FakeBoxWorldChatConfig = {}; //新手假宝箱（世界频道）
    GameConfig.FakeBoxChatConfig = {}; //新手假宝箱
    GameConfig.ProfessionModelConfig = {};
    GameConfig.ActorRoleSkillConfig = {};
    GameConfig.ActorRoleConfig = {};
    function _initFakeChat(data) {
        var list = readCSV(data);
        GameConfig.FakeChatConfig = {}; //新手机器人对白
        for (var i = FakeChatId.SPROG_BEGIN; i <= FakeChatId.SPROG_END - 1; i++) {
            if (list[i]) {
                GameConfig.FakeChatConfig[i] = list[i];
            }
        }
        GameConfig.FakeBoxWorldChatConfig = {}; //新手假宝箱（世界频道）
        for (var i = FakeChatId.SPROG_BOX_WORLD_BEGIN; i <= FakeChatId.SPROG_BOX_WORLD_End - 1; i++) {
            if (list[i]) {
                GameConfig.FakeBoxWorldChatConfig[i] = list[i];
            }
        }
        GameConfig.FakeBoxChatConfig = {}; //新手假宝箱
        for (var i = FakeChatId.SPROG_BOX_BEGIN; i <= FakeChatId.SPROG_BOX_End - 1; i++) {
            if (list[i]) {
                GameConfig.FakeBoxChatConfig[i] = list[i];
            }
        }
    }
    //  export var HeroAwakeConfig = {}
    // export var HeroBreakConfig = {}
    function initRoleSystemCsv(workQueue) {
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\FakeChat.csv", _initFakeChat, this, GameConfig.FakeChatConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\groupcmd.csv", readCSV, this, GameConfig.GroupCmdConfig));
        //workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\GodAnimal.csv", readCSV, this, AnimalConfig));
        //workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\PlrAwake.csv", readCSV, this, HeroAwakeConfig));
        //workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\PlrBreak.csv", readCSV, this, HeroBreakConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\honor.csv", readCSV, this, GameConfig.RoleHonorConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\ProfessionModel.csv", readCSV, this, GameConfig.ProfessionModelConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\ActorRoleSkill.csv", readCSV, this, GameConfig.ActorRoleSkillConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\ActorRole.csv", readCSV, this, GameConfig.ActorRoleConfig));
    }
    GameConfig.initRoleSystemCsv = initRoleSystemCsv;
    //==========================================守护系统=================================================
    // export var SpiritSkillConfig = {};
    // export var DefendExpConfig = {};
    // export var DefendImageUnlockConfig = {};
    // export var DefendSkillHoleConfig = {};
    // export var DefendSkillUnlockConfig = {};
    // export var DefendSkillLockConfig = {};
    function initDefendSystemCsv(workQueue) {
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Wing\\SpiritSkill.csv", readCSV, this, SpiritSkillConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Wing\\WingExp.csv", readCSV, this, DefendExpConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Wing\\WingImageUnlock.csv", readCSV, this, DefendImageUnlockConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Wing\\WingSkillHole.csv", readCSV, this, DefendSkillHoleConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Wing\\WingSkillUnlock.csv", readCSV, this, DefendSkillUnlockConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Wing\\WingSkillLock.csv", readCSV, this, DefendSkillLockConfig));
    }
    GameConfig.initDefendSystemCsv = initDefendSystemCsv;
    //==========================================物品系统=================================================
    GameConfig.itemConfig = {};
    GameConfig.EquipConfigNew2 = {};
    GameConfig.Legendequip = {};
    GameConfig.CommonEquip = {};
    GameConfig.CommonEquipEffect = {};
    GameConfig.CommonEquipMelt = {};
    GameConfig.RoleEquipSuit = {};
    GameConfig.RoleEquip = {};
    GameConfig.RoleEquipEffect = {};
    GameConfig.RoleEquipMelt = {};
    GameConfig.TalismanEquip = {};
    GameConfig.TalismanEquipEffectConfig = {};
    GameConfig.TalismanEquipUpConfig = {};
    GameConfig.TalismanEquipMeltConfig = {};
    // export var EquipEnhance = {};
    // export var EquipmakeConfig = {};
    // export var EquipSpecialSkillEffectConfig = {};
    // export var EquipInheritConfig = {};
    //export var MaterialListConfig = {};
    // export var EquipResonateEffectConfig = {};
    // export var SacrificeConfig = {};
    // export var SacrificeImageUnlockConfig = {};
    // function _initLegendEquip(data) {
    //     readCSV(data, Legendequip)
    //     for (let i in Legendequip) {
    //         let v = Legendequip[i]
    //         itemConfig[i] = v;
    //         //JsUtil.arrayInstert(itemConfig,i,v) 
    //     }
    // }
    function initItemSystemCsv(workQueue) {
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Item\\item.csv", readCSV, this, GameConfig.itemConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Item\\equipConfigNew2.csv", readCSV, this, GameConfig.EquipConfigNew2));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Item\\LegendEquip.csv", readCSV, this, GameConfig.Legendequip));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Item\\CommonEquip.csv", readCSV, this, GameConfig.CommonEquip));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Item\\CommonEquipEffect.csv", readCSV, this, GameConfig.CommonEquipEffect));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Item\\CommonEquipMelt.csv", readCSV, this, GameConfig.CommonEquipMelt));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Item\\RoleEquipSuit.csv", readCSV, this, GameConfig.RoleEquipSuit));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Item\\RoleEquip.csv", readCSV, this, GameConfig.RoleEquip));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Item\\RoleEquipEffect.csv", readCSV, this, GameConfig.RoleEquipEffect));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Item\\RoleEquipMelt.csv", readCSV, this, GameConfig.RoleEquipMelt));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Item\\TalismanEquip.csv", readCSV, this, GameConfig.TalismanEquip));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Item\\TalismanEquipEffect.csv", readCSV, this, GameConfig.TalismanEquipEffectConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Item\\TalismanEquipUp.csv", readCSV, this, GameConfig.TalismanEquipUpConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Item\\TalismanEquipMelt.csv", readCSV, this, GameConfig.TalismanEquipMeltConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Item\\EquipEnhance.csv", readCSV, this, EquipEnhance));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Item\\equipMake.csv", readCSV, this, EquipmakeConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Item\\EquipSpecialSkillEffect.csv", readCSV, this, EquipSpecialSkillEffectConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Item\\EquipInherit.csv", readCSV, this, EquipInheritConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\MaterialList.csv", readCSV, this, MaterialListConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Item\\EquipResonateEffect.csv", readCSV, this, EquipResonateEffectConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Sacrifice.csv", readCSV, this, SacrificeConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\SacrificeImageUnlock.csv", readCSV, this, SacrificeImageUnlockConfig))
        workQueue.addWorkUnit(CallbackWorkUnit.newObj(function () {
            var neweffect = {};
            for (var i in GameConfig.CommonEquipEffect) {
                var v = GameConfig.CommonEquipEffect[i];
                if (neweffect[v.Pos] == null) {
                    neweffect[v.Pos] = {};
                }
                if (neweffect[v.Pos][v.Stage] == null) {
                    neweffect[v.Pos][v.Stage] = {};
                }
                neweffect[v.Pos][v.Stage][v.Quality] = v;
            }
            GameConfig.CommonEquipEffect = neweffect;
            //for (let i in CommonEquipEffect){
            //   let v = CommonEquipEffect[i]
            //}
            var eeffect = {};
            for (var i in GameConfig.RoleEquipEffect) {
                var v = GameConfig.RoleEquipEffect[i];
                if (eeffect[v.Suit] == null) {
                    eeffect[v.Suit] = {};
                }
                if (eeffect[v.Suit][v.Quality] == null) {
                    eeffect[v.Suit][v.Quality] = {};
                }
                eeffect[v.Suit][v.Quality][v.subtype] = v;
            }
            GameConfig.RoleEquipEffect = eeffect;
            //for (let i in RoleEquipEffect){
            //   let v = RoleEquipEffect[i]
            //}
            for (var i in GameConfig.CommonEquip) {
                var v = GameConfig.CommonEquip[i];
                GameConfig.itemConfig[i] = v;
            }
            for (var i in GameConfig.RoleEquip) {
                var v = GameConfig.RoleEquip[i];
                GameConfig.itemConfig[i] = v;
            }
        }));
        workQueue.addWorkUnit(CallbackWorkUnit.newObj(function () {
            for (var i in GameConfig.TalismanEquip) {
                var v = GameConfig.TalismanEquip[i];
                GameConfig.itemConfig[i] = v;
            }
        }));
    }
    GameConfig.initItemSystemCsv = initItemSystemCsv;
    //==========================================职业系统=================================================
    // export var ProfessionConfig = {};
    // export var ProfessionListConfig = {};
    //export var ProfessionSkillConfig = {};
    // export var VocationTypeConfig = {};
    // export var NaturalStoneConfig = {};
    // export function initProfessionSystemCsv(workQueue: WorkQueue) {
    //     // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\Vocation.csv", _initVocationConfig, this, ProfessionConfig));
    //     // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\VocationList.csv", readCSV, this, ProfessionListConfig));
    //     //workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\VocationSkill.csv", readCSV, this, ProfessionSkillConfig));
    //     // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\VocationType.csv", readCSV, this, VocationTypeConfig));
    //     //workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\NaturalStone.csv", readCSV, this, NaturalStoneConfig));
    //     workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\ProfessionModel.csv", readCSV, this, ProfessionModelConfig));
    //     workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\ActorRoleSkill.csv", readCSV, this, ActorRoleSkillConfig));
    //     workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\ActorRole.csv", readCSV, this, ActorRoleConfig));
    // }
    // function _initVocationConfig(data) {
    //     readCSV(data, ProfessionConfig)
    //     for (let index in ProfessionConfig) {
    //         let v = ProfessionConfig[index]
    //         if (Array.isArray(v.ConGrow) == false) {
    //             let valuelist = [0, 0, 0, 0, 0]
    //             for (let i = 1; i <= 5; i++) {
    //                 let val = v.ConGrow[i]
    //                 if (val != null) {
    //                     valuelist[i - 1] = val
    //                 }
    //             }
    //             v.ConGrow = valuelist  //转换成数组
    //         }
    //     }
    // }
    //==========================================成长系统=================================================
    // export var GrowEventTips = {};
    // export var GrowSelectTips = {};
    // export var GrowActionTips = {};
    // export var GrowLivePrice = {};
    // export var GrowSoonFinish = {};
    // export var GrowFeelPrize = {}
    GameConfig.PlayerExpConfig = {};
    function initGrowSystemCsv(workQueue) {
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\GrowEventTips.csv", readCSV, this, GrowEventTips));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\GrowSelectTips.csv", readCSV, this, GrowSelectTips));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\GrowActionTips.csv", readCSV, this, GrowActionTips));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\GrowLivePrice.csv", readCSV, this, GrowLivePrice));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\GrowSoonFinish.csv", readCSV, this, GrowSoonFinish));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\GrowFeelingPrize.csv", readCSV, this, GrowFeelPrize));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\PlayerExp.csv", readCSV, this, GameConfig.PlayerExpConfig));
    }
    GameConfig.initGrowSystemCsv = initGrowSystemCsv;
    //==========================================任务系统=================================================
    //export var TaskHeroConfig = {};
    //export var NPCMask = {};
    //export var GoddessKissConfig = {};
    GameConfig.DynamicTipsConfig = {};
    GameConfig.TaskAcceptNpcConfig = {};
    GameConfig.TaskTraceLib = {};
    GameConfig.TaskDescribe = {};
    GameConfig.TaskTraceTips = {};
    GameConfig.TaskConfig = {};
    GameConfig.DialogBoxConfig = {};
    GameConfig.TaskKeyMapping = {};
    var TaskWorkUnit = (function (_super) {
        __extends(TaskWorkUnit, _super);
        function TaskWorkUnit() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TaskWorkUnit.prototype.initObj = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            this.taskFileList = params[0];
            this.dialogFileList = params[1];
            this.taskKeyFileMapping = params[2];
            this.taskList = [];
            this.dialogList = [];
            this.taskKeyMapping = [];
            this.progress = 0;
        };
        TaskWorkUnit.prototype.destory = function () {
        };
        TaskWorkUnit.prototype.loadConfig = function (configList, OneCompleteFunc, allCompleteFunc, userData) {
            var _this = this;
            if (configList.length == 0) {
                allCompleteFunc.call(this);
                return;
            }
            var count = 0;
            var all = configList.length;
            var callback = {
                onResItemLoad: function (res) {
                    OneCompleteFunc.call(_this, res.getData(), res.getKey(), userData);
                    count++;
                    if (count >= all) {
                        allCompleteFunc.call(_this, userData);
                    }
                },
                onResItemError: function (key) {
                    count++; //表单出错
                    if (count >= all) {
                        allCompleteFunc.call(_this, userData);
                    }
                }
            };
            for (var k in configList) {
                var path = configList[k];
                IGlobal.resManager.loadResAsyn(path, callback, core.ResourceType.TYPE_TEXT);
            }
        };
        TaskWorkUnit.prototype.mergeTaskConfig = function (taskList) {
            var new_t = taskList[0];
            if (taskList.length < 2) {
                return new_t;
            }
            for (var i = 1; i < taskList.length; i++) {
                for (var taskId in taskList[i]) {
                    var v = taskList[i][taskId];
                    new_t[taskId] = v;
                }
            }
            return new_t;
        };
        TaskWorkUnit.prototype.mergeDialogConfig = function (dialogList) {
            var new_t = {};
            for (var i = 0; i < dialogList.length; i++) {
                var dialog = dialogList[i];
                for (var k in dialog) {
                    var v = dialog[k];
                    if (new_t[v.TalkId] == null) {
                        new_t[v.TalkId] = {};
                    }
                    new_t[v.TalkId][v.NodeId] = v;
                }
            }
            return new_t;
        };
        TaskWorkUnit.prototype.mergeKeyMapping = function (taskKeyMapping) {
            var new_t = {};
            for (var i = 0; i < taskKeyMapping.length; i++) {
                var keyMapping = taskKeyMapping[i];
                for (var k in keyMapping) {
                    var v = keyMapping[k];
                    if (new_t[v.kType] == null) {
                        new_t[v.kType] = {};
                    }
                    new_t[v.kType][v.key] = v;
                }
            }
            return new_t;
        };
        TaskWorkUnit.prototype._completeOneConfig = function (data, path, userData) {
            var t = readCSV(data);
            JsUtil.arrayInstert(userData, t);
        };
        TaskWorkUnit.prototype._completeConfig = function (userData) {
            if (this.taskList == userData) {
                GameConfig.TaskConfig = this.mergeTaskConfig(this.taskList); //生成任务配置
            }
            else if (this.dialogList == userData) {
                GameConfig.DialogBoxConfig = this.mergeDialogConfig(this.dialogList); //生成对话配置
            }
            else if (this.taskKeyMapping == userData) {
                GameConfig.TaskKeyMapping = this.mergeKeyMapping(this.taskKeyMapping);
            }
            this._updateProgress();
        };
        TaskWorkUnit.prototype._updateProgress = function () {
            this.progress++;
            if (this.progress >= 3) {
                this.notifyExcuteComplete();
            }
        };
        TaskWorkUnit.prototype.onExcute = function () {
            this.loadConfig(this.taskFileList, this._completeOneConfig, this._completeConfig, this.taskList);
            this.loadConfig(this.dialogFileList, this._completeOneConfig, this._completeConfig, this.dialogList);
            this.loadConfig(this.taskKeyFileMapping, this._completeOneConfig, this._completeConfig, this.taskKeyMapping);
            return false;
        };
        return TaskWorkUnit;
    }(WorkUnit));
    __reflect(TaskWorkUnit.prototype, "TaskWorkUnit");
    function _initTaskFileList(data, workQueue) {
        var fileList = readCSV(data);
        var taskList = [];
        var dialogFileList = [];
        var taskKeyMapping = [];
        var taskPre = "task_";
        var actPre = "activity_";
        var dialogPre = "dialog_";
        var cnDefPre = "key_translate_";
        for (var _ in fileList) {
            var v = fileList[_];
            var file_name = v.filename;
            var path = StringUtil.stringReplace(v.path, "\\\\", "/");
            if (file_name.substring(0, taskPre.length) == taskPre || file_name.substring(0, actPre.length) == actPre) {
                //let t = readCSV(path+file_name)
                JsUtil.arrayInstert(taskList, path + file_name);
            }
            else if (file_name.substring(0, dialogPre.length) == dialogPre) {
                //let t = readCSV(path+file_name)
                JsUtil.arrayInstert(dialogFileList, path + file_name);
                //mergeDialogFileIndex(file_name, t)		//保存文件与talkId的索引关系
            }
            else if (file_name.substring(0, cnDefPre.length) == cnDefPre) {
                //let t = readCSV(path+file_name)
                JsUtil.arrayInstert(taskKeyMapping, path + file_name);
            }
        }
        workQueue.addWorkUnit(TaskWorkUnit.newObj(taskList, dialogFileList, taskKeyMapping));
    }
    function initTaskSystemCsv(workQueue) {
        //workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Task\\task_hero_config.csv", readCSV, this, TaskHeroConfig));
        //workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Task\\NPCMask.csv", readCSV, this, NPCMask));
        //workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Task\\GoddessKiss.csv", readCSV, this, GoddessKissConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Task\\auxiliary\\DynamicTips.csv", readCSV, this, GameConfig.DynamicTipsConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Task\\task_accpet_npc.csv", readCSV, this, GameConfig.TaskAcceptNpcConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Task\\task_trace_lib.csv", readCSV, this, GameConfig.TaskTraceLib));
        //workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Task\\explore_point.csv", readCSV, this, ExplorePoint));
        //workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Task\\task_describe.csv", readCSV, this, TaskDescribe));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Task\\task_trace_info.csv", readCSV, this, GameConfig.TaskTraceTips));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Task\\task_file_list.csv", _initTaskFileList, this, workQueue));
    }
    GameConfig.initTaskSystemCsv = initTaskSystemCsv;
    //==========================================关卡系统=================================================
    GameConfig.CampaignConfig = {};
    GameConfig.FuncInfoConfig = {};
    // export var CampaignExciteConfig = {};
    // export var FirstCampaignPrizeConfig = {};
    // export var ExciteServerFirstConfig = {};
    // export var CampaignGiftsConfig = {}
    function initCampaignSystemCsv(workQueue) {
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Task\\auxiliary\\Campaign.csv", readCSV, this, GameConfig.CampaignConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Task\\auxiliary\\FuncInformation.csv", readCSV, this, GameConfig.FuncInfoConfig));
        //workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\CampaignGifts.csv", readCSV, this, CampaignGiftsConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\ExcitingPoint\\ExciteLimitCampaign.csv", readCSV, this, CampaignExciteConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\ExcitingPoint\\ExciteFirstCampaign.csv", readCSV, this, FirstCampaignPrizeConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\ExcitingPoint\\ExciteServerFirst.csv", readCSV, this, ExciteServerFirstConfig));
    }
    GameConfig.initCampaignSystemCsv = initCampaignSystemCsv;
    //==========================================活动系统=================================================
    GameConfig.RuleDescriptionConfig = {};
    GameConfig.WorldQuestionConfig = {};
    GameConfig.OnLineQuestionConfig = {};
    // export var RobberMonsterConfig = {};
    // export var RobberSkillConfig = {};
    // export var RobberSkillViewConfig = {};
    // export var RobberSkillNormalConfig = {};
    // export var RobberBossConfig = {}
    //export var SealedGroundConfig = {};
    // export var SkyTowerEnemyConfig = {};
    // export var SkyTowerExciteConfig = {};
    // export var SkyTowerServerExciteConfig = {};
    //export var FakeChatConfig = {}
    GameConfig.ChampionPrizeConfig = {};
    GameConfig.ChampionRankPrizeConfig = {};
    GameConfig.ChampionServerRankPrizeConfig = {};
    GameConfig.MeiRiQianDaoConfig = {};
    // export var SevenDayDetailPrizeConfig = {}
    // export var SevenDayPrizeConfig = {}
    // export var StartOperationConfig = {}
    // export var StartOperatePrizeConfig = {}
    //export var UnionPrizeConfig = {}
    //export var CampaginRobberConfig = {}
    GameConfig.InviteCodePrize = {};
    GameConfig.BossSingleConfig = {};
    GameConfig.BossGlobalConfig = {};
    GameConfig.BossWildConfig = {};
    GameConfig.BossBefallConfig = {};
    GameConfig.CopyMaterialConfig = {};
    GameConfig.CopyDragonConfig = {};
    GameConfig.CopyTempleConfig = {};
    GameConfig.CopyHeavenConfig = {};
    //跨服
    GameConfig.GlobalTeamConfig = {};
    //export var LevelFundConfig = {}
    //export var LadderConfig = {}
    //export var SystemImgConfig = {}
    GameConfig.ActivityPrizeClientConfig = {};
    GameConfig.AutoFightMonsterConfig = {};
    GameConfig.CharmRankPrizeConfig = {};
    GameConfig.OpenRankConfig = {};
    GameConfig.OpenRankPrizeConfig = {};
    //export var TeamWillConfig = {}
    GameConfig.DailyShareConfig = {};
    GameConfig.ZhongKuiDemonConfig = {};
    GameConfig.EveryDayLiLianUpConfig = {};
    GameConfig.EveryDayLiLianTaskConfig = {};
    GameConfig.DailyLiLianShapeConfig = {};
    GameConfig.EveryDaySanBaiConfig = {};
    GameConfig.AutoFightMonsterConfig = {};
    GameConfig.EscortConfig = {};
    GameConfig.DailyLoginConfig = {};
    GameConfig.StageUpConfig = {};
    GameConfig.DailyExpensiveGiftConfig = {};
    GameConfig.LevelRewardConfig = {};
    GameConfig.XiyouWelfareConfig = {};
    GameConfig.FactionMonsterConfig = {};
    GameConfig.MarriageConfig = {};
    GameConfig.MarriageGiftConfig = {};
    //function _initShare(data) {
    //    DailyShareConfig = readCSV(data);
    //}
    function initActivitySystemCsv(workQueue) {
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\RuleDescription.csv", readCSV, this, GameConfig.RuleDescriptionConfig));
        //workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\ActivityPrizeClient.csv", readCSV, this, ActivityPrizeClientConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\CharmRankPrize.csv", readCSV, this, GameConfig.CharmRankPrizeConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\WorldQuestion.csv", readCSV, this, GameConfig.WorldQuestionConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\OnlineQuestion.csv", readCSV, this, GameConfig.OnLineQuestionConfig));
        //workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Faction\\FactionMap.csv", readCSV, this, SealedGroundConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\ChampionPrize.csv", readCSV, this, GameConfig.ChampionPrizeConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\ExcitingPoint\\ExciteJJCRank.csv", readCSV, this, GameConfig.ChampionRankPrizeConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\ExcitingPoint\\ExciteServerJJCRank.csv", readCSV, this, GameConfig.ChampionServerRankPrizeConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\meiRiQianDao.csv", readCSV, this, GameConfig.MeiRiQianDaoConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\inviteCodePrize.csv", readCSV, this, GameConfig.InviteCodePrize));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\OpenRank.csv", readCSV, this, GameConfig.OpenRankConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\OpenRankPrize.csv", readCSV, this, GameConfig.OpenRankPrizeConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\Escort.csv", readCSV, this, GameConfig.EscortConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\ActivationCode\\dailyShare.csv", readCSV, this, GameConfig.DailyShareConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\Boss\\BossSingle.csv", readCSV, this, GameConfig.BossSingleConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\Boss\\BossWorld.csv", readCSV, this, GameConfig.BossGlobalConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\Boss\\WildBoss.csv", readCSV, this, GameConfig.BossWildConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\Boss\\LifeAndDeathBoss.csv", readCSV, this, GameConfig.BossBefallConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\Boss\\MaterialBoss.csv", readCSV, this, GameConfig.CopyMaterialConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\Boss\\DragonBoss.csv", readCSV, this, GameConfig.CopyDragonConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\Boss\\SmallThunderTemple.csv", readCSV, this, GameConfig.CopyTempleConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\Boss\\HeavenTrial.csv", readCSV, this, GameConfig.CopyHeavenConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\Boss\\ZhongKuiDemon.csv", readCSV, this, GameConfig.ZhongKuiDemonConfig));
        //跨服
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\Global\\GlobalTeam.csv", readCSV, this, GameConfig.GlobalTeamConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\Boss\\EveryDayLiLianTask.csv", readCSV, this, GameConfig.EveryDayLiLianTaskConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\Boss\\EveryDayLiLianUp.csv", readCSV, this, GameConfig.EveryDayLiLianUpConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\DailyLiLianShape.csv", readCSV, this, GameConfig.DailyLiLianShapeConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\Boss\\EveryDaySanBai.csv", readCSV, this, GameConfig.EveryDaySanBaiConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\Boss\\AutoFightMonster.csv", readCSV, this, GameConfig.AutoFightMonsterConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\Operate\\DailyLogin.csv", readCSV, this, GameConfig.DailyLoginConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\Operate\\StageUp.csv", readCSV, this, GameConfig.StageUpConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\Operate\\DailyExpensiveGift.csv", readCSV, this, GameConfig.DailyExpensiveGiftConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\LevelReward.csv", readCSV, this, GameConfig.LevelRewardConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\XiyouWelfare.csv", readCSV, this, GameConfig.XiyouWelfareConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Faction\\FactionMonster.csv", readCSV, this, GameConfig.FactionMonsterConfig));
        //三生三世
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Social\\Marriage.csv", readCSV, this, GameConfig.MarriageConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Social\\MarriageGift.csv", readCSV, this, GameConfig.MarriageGiftConfig));
    }
    GameConfig.initActivitySystemCsv = initActivitySystemCsv;
    //==========================================跳转系统=================================================
    GameConfig.FunTipsConfig = {};
    function initFastJumpSystemCsv(workQueue) {
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Funtips.csv", readCSV, this, GameConfig.FunTipsConfig));
    }
    GameConfig.initFastJumpSystemCsv = initFastJumpSystemCsv;
    //==========================================新手系统=================================================
    GameConfig.GuideConfig = {};
    GameConfig.FuncDefineConfig = {};
    GameConfig.FuncPreviewConfig = {};
    function initGuideSystemCsv(workQueue) {
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Task\\guide.csv", readCSV, this, GameConfig.GuideConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Task\\auxiliary\\FuncDefine.csv", readCSV, this, GameConfig.FuncDefineConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Task\\auxiliary\\FuncPreview.csv", readCSV, this, GameConfig.FuncPreviewConfig));
    }
    GameConfig.initGuideSystemCsv = initGuideSystemCsv;
    //==========================================新手红点系统=================================================
    GameConfig.ButtonTipsConfig = {};
    function initGuideFuncSystem(workQueue) {
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\buttonTips.csv", readCSV, this, GameConfig.ButtonTipsConfig));
    }
    GameConfig.initGuideFuncSystem = initGuideFuncSystem;
    //==========================================VIP系统=================================================
    GameConfig.VIPExplain = {};
    GameConfig.VipEXP = {};
    GameConfig.VipPrivilege = {};
    //export var VipBuffConfig = {};
    GameConfig.VipGiftsConfig = {};
    GameConfig.VipChatBubbleConfig = {};
    function initVipSystemCsv(workQueue) {
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\VIPExplain.csv", readCSV, this, GameConfig.VIPExplain));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\vip.csv", readCSV, this, GameConfig.VipEXP));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\VipPrivilege.csv", readCSV, this, GameConfig.VipPrivilege));
        //workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\VipBuffEffect.csv", readCSV, this, VipBuffConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Item\\VipGifts.csv", readCSV, this, GameConfig.VipGiftsConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\VipChatBubble.csv", readCSV, this, GameConfig.VipChatBubbleConfig));
    }
    GameConfig.initVipSystemCsv = initVipSystemCsv;
    //==========================================付费系统=================================================
    GameConfig.RechargeConfig = {};
    //export var PaySellPetConfig = {};
    GameConfig.FirstRechargeConfig = {};
    GameConfig.LevelFundsConfig = {};
    GameConfig.InvestPlanConfig = {};
    GameConfig.meiRiQianDaoConfig = {};
    function initPaySystemCsv(workQueue) {
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\Recharge.csv", readCSV, this, GameConfig.RechargeConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\Operate\\FirstRecharge.csv", readCSV, this, GameConfig.FirstRechargeConfig));
        //workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\PaySellPet.csv", readCSV, this, PaySellPetConfig));
        //成长基金
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\Operate\\LevelFunds.csv", readCSV, this, GameConfig.LevelFundsConfig));
        //投资计划
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\Operate\\InvestPlan.csv", readCSV, this, GameConfig.InvestPlanConfig));
        //投资计划
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\meiRiQianDao.csv", readCSV, this, GameConfig.meiRiQianDaoConfig));
    }
    GameConfig.initPaySystemCsv = initPaySystemCsv;
    ////////
    // export var RelicTimeRatioConfig = {}
    // export var RelicMineConfig = {}
    //==========================================公会系统=================================================
    GameConfig.FactionActiveLevelConfig = {};
    GameConfig.FactionActiveDailyiPrizeConfig = {};
    GameConfig.FactionActiveTaskConfig = {};
    GameConfig.FactionExpConfig = {};
    GameConfig.FactionMapConfig = {};
    GameConfig.FactionMapTaskConfig = {};
    GameConfig.FactionRenqiCondConfig = {};
    GameConfig.FactionRenqiPrizeConfig = {};
    GameConfig.FactionSkillConfig = {};
    GameConfig.FactionExchangeConfig = {};
    GameConfig.FactionRecordConfig = {};
    function initClubSystemCsv(workQueue) {
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Faction\\FactionActiveDailyiPrize.csv", readCSV, this, GameConfig.FactionActiveDailyiPrizeConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Faction\\FactionActiveLevel.csv", readCSV, this, GameConfig.FactionActiveLevelConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Faction\\FactionActiveTask.csv", readCSV, this, GameConfig.FactionActiveTaskConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Faction\\FactionExp.csv", readCSV, this, GameConfig.FactionExpConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Faction\\FactionInstanceZones.csv", readCSV, this, GameConfig.FactionMapConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Faction\\FactionMapTask.csv", readCSV, this, GameConfig.FactionMapTaskConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Faction\\FactionRenqiCond.csv", readCSV, this, GameConfig.FactionRenqiCondConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Faction\\FactionRenqiPrize.csv", readCSV, this, GameConfig.FactionRenqiPrizeConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Faction\\FactionSkill.csv", readCSV, this, GameConfig.FactionSkillConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Faction\\FactionExchangeItem.csv", readCSV, this, GameConfig.FactionExchangeConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Faction\\FactionRecord.csv", readCSV, this, GameConfig.FactionRecordConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Faction\\FactionTask.csv", readCSV, this, FactionTaskConfig));
        // workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Faction\\FacTaskPointPrize.csv", readCSV, this, FacTaskPointPrizeConfig));
    }
    GameConfig.initClubSystemCsv = initClubSystemCsv;
    //==========================================坐骑系统=================================================
    //export var RideListConfig = {};
    function initMountsSystemCsv(workQueue) {
        //workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Ride\\Ride.csv", readCSV, this, RideListConfig));
    }
    GameConfig.initMountsSystemCsv = initMountsSystemCsv;
    //==========================================商店系统=================================================
    GameConfig.ShopCommodityConfig = {};
    function initShopSystemCsv(workQueue) {
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Item\\shopCommodity.csv", readCSV, this, GameConfig.ShopCommodityConfig));
    }
    GameConfig.initShopSystemCsv = initShopSystemCsv;
    /*
        function readShopConfig(data){
            let csvConfig = readCSV(data)
    
            for(let k in csvConfig){
                let tempConfig = csvConfig[k]
                let key = shopOptionName[k]
                ShopCommodityConfig[key] = tempConfig
            }
        }*/
    //==========================================寻宝系统=================================================
    GameConfig.XunBaoConfig = {};
    function initXunBaoSystemCsv(workQueue) {
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Item\\shopCommodity.csv", readCSV, this, GameConfig.XunBaoConfig));
    }
    GameConfig.initXunBaoSystemCsv = initXunBaoSystemCsv;
    //==========================================天仙系统=================================================
    GameConfig.FunTianXianDanYaoConfig = {};
    GameConfig.FunTianXianJingMaiConfig = {};
    GameConfig.FunTianXianJingMaiTypeConfig = {};
    GameConfig.ShopCommodityConfig = {};
    function initTianXianSystemCsv(workQueue) {
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\FunTianxianDanyao.csv", readCSV, this, GameConfig.FunTianXianDanYaoConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\FunTianxianJingmai.csv", readCSV, this, GameConfig.FunTianXianJingMaiConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\FunTianxianJingmaiType.csv", readCSV, this, GameConfig.FunTianXianJingMaiTypeConfig));
    }
    GameConfig.initTianXianSystemCsv = initTianXianSystemCsv;
    //==========================================锻造系统=================================================
    GameConfig.FunForgeConfig = {};
    GameConfig.FunForgeAbilityConfig = {};
    GameConfig.FunForgeMasterConfig = {};
    function initForgeSystemCsv(workQueue) {
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\FunForge.csv", readCSV, this, GameConfig.FunForgeConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\FunForgeAbility.csv", readCSV, this, GameConfig.FunForgeAbilityConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\FunForgeMaster.csv", readCSV, this, GameConfig.FunForgeMasterConfig));
    }
    GameConfig.initForgeSystemCsv = initForgeSystemCsv;
    //==========================================仙侣系统=================================================
    GameConfig.ActorXianLvConfig = {};
    GameConfig.ActorXianLvSkillConfig = {};
    function initXianLvSystemCsv(workQueue) {
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\ActorXianlvSkill.csv", readCSV, this, GameConfig.ActorXianLvSkillConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\ActorXianlv.csv", readCSV, this, GameConfig.ActorXianLvConfig));
    }
    GameConfig.initXianLvSystemCsv = initXianLvSystemCsv;
    //==========================================神兵系统=================================================
    GameConfig.ImmortalsExpConfig = {};
    GameConfig.ImmortalsViewConfig = {};
    function initImmortalsSystemCsv(workQueue) {
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Item\\ImmortalsExp.csv", readCSV, this, GameConfig.ImmortalsExpConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Item\\ImmortalsView.csv", readCSV, this, GameConfig.ImmortalsViewConfig));
    }
    GameConfig.initImmortalsSystemCsv = initImmortalsSystemCsv;
    //==========================================彩蛋系统=================================================
    GameConfig.EasterEggConfig = {};
    function initEasterEggSystemCsv(workQueue) {
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Activity\\SpecialPrize.csv", readCSV, this, GameConfig.EasterEggConfig));
    }
    GameConfig.initEasterEggSystemCsv = initEasterEggSystemCsv;
    //==========================================通用界面=================================================
    GameConfig.FunUpgradeStageConfig = {};
    GameConfig.FunSkinConfig = {};
    GameConfig.FunSkillCaseConfig = {};
    GameConfig.FunShapeConfig = {};
    GameConfig.FunEquipCaseConfig = {};
    GameConfig.FunEquipCaseList = {};
    GameConfig.FunAbilityDrugConfig = {};
    GameConfig.FunGrowAddConfig = {};
    GameConfig.FunSpendMoneyItemConfig = {};
    GameConfig.FunUpgradeEffectConfig = {};
    GameConfig.FunUpStarConfig = {};
    GameConfig.FunSkillWashConfig = {};
    GameConfig.FunLevelNumConfig = {};
    //export var FunForgeConfig = {};
    function initFunSystemCsv(workQueue) {
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\FunUpgradeStage.csv", readCSV, this, GameConfig.FunUpgradeStageConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\FunSkin.csv", readCSV, this, GameConfig.FunSkinConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\FunSkillCase.csv", readCSV, this, GameConfig.FunSkillCaseConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\FunShape.csv", readCSV, this, GameConfig.FunShapeConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\FunEquipCase.csv", readCSV, this, GameConfig.FunEquipCaseConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\FunAbilityDrug.csv", readCSV, this, GameConfig.FunAbilityDrugConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\FunGrowAdd.csv", readCSV, this, GameConfig.FunGrowAddConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\FunSpendMoneyItem.csv", readCSV, this, GameConfig.FunSpendMoneyItemConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\FunUpgradeEffect.csv", readCSV, this, GameConfig.FunUpgradeEffectConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\FunUpStart.csv", readCSV, this, GameConfig.FunUpStarConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\FunSkillWash.csv", readCSV, this, GameConfig.FunSkillWashConfig));
        workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\FunLevelNum.csv", readCSV, this, GameConfig.FunLevelNumConfig));
        //  workQueue.addWorkUnit(ResWorkUnit.newObj("data\\config\\Actor\\FunForge.csv", readCSV, this, FunForgeConfig));
        workQueue.addWorkUnit(CallbackWorkUnit.newObj(function () {
            for (var i in GameConfig.FunEquipCaseConfig) {
                var config = GameConfig.FunEquipCaseConfig[i].subtype;
                for (var _ in config) {
                    GameConfig.FunEquipCaseList[config[_]] = GameConfig.FunEquipCaseConfig[i].title;
                }
            }
        }));
    }
    GameConfig.initFunSystemCsv = initFunSystemCsv;
})(GameConfig || (GameConfig = {}));
//# sourceMappingURL=Config_Logic.js.map