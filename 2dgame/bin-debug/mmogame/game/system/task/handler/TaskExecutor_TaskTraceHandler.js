/*
作者:
    yangguiming
    
创建时间：
   2013.7.01(周一)

意图：
   任务追踪handler

公共接口：
   
*/
ImportType(ClientTaskField);
var TaskTraceSpace;
(function (TaskTraceSpace) {
    ////任务追踪
    TaskTraceSpace.TaskTrackHandler = {};
    var save_random_link = {};
    //对每个任务的所有某个子任务的跟踪
    //回调结构
    //XML格式不需要link，Tree控件才需要link
    //{
    //[finish]或者[AllFinish]
    //[content]
    //[link]
    //[taskId]
    //}
    function getSaveRandomLink(taskId, default_link) {
        if (save_random_link[taskId]) {
            return save_random_link[taskId];
        }
        save_random_link[taskId] = default_link;
        return default_link;
    }
    //////////////////////////////////////////////////////////////////////////////-
    //任务跟踪搜索库
    function getTaskLibLink(taskId, deal_index, targetId) {
        if (!GameConfig.TaskConfig[taskId].FindLink) {
            return "";
        }
        var info = GameConfig.TaskConfig[taskId].FindLink[deal_index];
        if (info) {
            for (var _ = 0; _ < info.length; _++) {
                var libId = info[_];
                var libInfo = GameConfig.TaskTraceLib[libId]; //任务跟踪搜索库，暂时只支持怪物，物品
                if (libInfo) {
                    for (var _4 = 0; _4 < libInfo.Lib.length; _4++) {
                        var id = libInfo.Lib[_4];
                        if (id == targetId) {
                            var isSpecial = void 0, link = specialLink(libInfo.FindLink, targetId);
                            if (isSpecial) {
                                return link;
                            }
                            else {
                                return libInfo.FindLink;
                            }
                        }
                    }
                }
            }
        }
        return "";
    }
    //任务跟踪搜索库（不需要提供targetId或不需要检查Lib的id）
    function getTaskLibLinkEx(taskId, deal_index) {
        if (!GameConfig.TaskConfig[taskId].FindLink) {
            return ["", false];
        }
        var flag = false;
        var info = GameConfig.TaskConfig[taskId].FindLink[deal_index];
        if (info) {
            flag = true;
            for (var _ = 0; _ < info.length; _++) {
                var libId = info[_];
                var libInfo = GameConfig.TaskTraceLib[libId];
                if (libInfo) {
                    return [libInfo.FindLink || "", true]; //第二个参数表示有指定FindLink
                }
            }
        }
        return ["", flag];
    }
    function specialLink(linkStr, targetId) {
        var type = tonumber(StringUtil.stringMatch(linkStr, /;(%d);/));
        //let type = tonumber(string.match(linkStr, ";(%d);"))
        if (type == TaskLinkType.ITEM_TIPS || type == TaskLinkType.PET_TIPS) {
            return [true, "1;" + type + ";" + targetId];
        }
        return [false];
    }
    //返回NPC表的寻路信息
    function getConfigNpcLink(npcIds, taskId) {
        //TLog.Debug("111111111111111", type(npcIds), npcIds)
        var link = "";
        var entryId = 0;
        if (type(npcIds) == "number") {
            entryId = npcIds;
        }
        else if (type(npcIds) == "string") {
            entryId = tonumber(GetStringSplitBySchool(npcIds));
        }
        //TLog.Debug("getConfigNpcLink   entryId", npcIds, entryId, type(npcIds), GetStringSplitBySchool(npcIds), GetHeroProperty("school"))
        if (entryId && entryId != 0) {
            return TaskExecutor.getInstance().genTalkNpcLink(entryId, taskId);
        }
        return link;
    }
    //str_num_num 模式
    function str_num_num(taskId, deal_index, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var finishList = taskInfo.finish[deal_index];
        var dataList = taskInfo.data[deal_index]; //此时一定是table
        var colItemGive = (deal_index == taskField.FIELD_FINISH_COLLECTITEM && taskInfo.data[taskField.FIELD_FINISH_GIVE_RES]); //收集物品，先判断是否已经上交
        var colPetGive = (deal_index == taskField.FIELD_FINISH_COLLECTPET && taskInfo.data[taskField.FIELD_FINISH_GIVE_PET]); //收集宠物，先判断是否已经上交
        var flag = false;
        for (var finishId in finishList) {
            var finishCount = finishList[finishId];
            var link = getTaskLibLink(taskId, deal_index, finishId);
            var dataCount = 0;
            if (dataList && dataList[finishId]) {
                dataCount = dataList[finishId];
            }
            if (dataCount >= finishCount) {
                dataCount = finishCount;
                link = "";
            }
            if (colPetGive || colItemGive) {
                dataCount = finishCount;
                link = "";
            }
            var id = finishId;
            var t = {};
            t.finish = (dataCount == finishCount);
            t.taskId = taskId;
            var name_1 = "ErrorMONSTER";
            if (deal_index == taskField.FIELD_FINISH_KILLMONSTER || deal_index == taskField.FIELD_FINISH_COLLECTPET) {
                if (GameConfig.PetConfig[id]) {
                    name_1 = GameConfig.PetConfig[id].name;
                }
            }
            else if (deal_index == taskField.FIELD_FINISH_COLLECTITEM) {
                name_1 = ItemSystem.getInstance().getItemName(id);
            }
            t.content = String.format(GameConfig.TaskTraceTips[deal_index].XMLContent, name_1, dataCount, finishCount); //如：nor.length杀死怪物：nl.length|%s|%snor.length(%d/%d)
            t.planetxt = String.format(GameConfig.TaskTraceTips[deal_index].Content, name_1, dataCount, finishCount);
            t.link = link;
            flag = flag || listener.func.call(listener.this_index, t, listener.userData); //回调
        }
        return flag;
    }
    //////////////////////////////////////////////////////////////////////////////-
    //寻找NPC提示
    function getFindNpcInfo(taskId, finishId, isRichDisplayer) {
        finishId = tonumber(GetStringSplitBySchool(finishId));
        var name = ActorManager.getInstance().getNpcNameWithEntryId(finishId);
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var link = getConfigNpcLink(finishId, taskId);
        if (taskInfo.data && taskInfo.data["INIT_FACTION_NPC"]) {
            var initData = taskInfo.data["INIT_FACTION_NPC"][finishId];
            if (initData && initData[6]) {
                name = initData[6];
            }
        }
        var t = {};
        t.taskId = taskId;
        t.content = String.format(GameConfig.TaskTraceTips[taskField.FIELD_FINISH_FINDNPC].XMLContent, name);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskField.FIELD_FINISH_FINDNPC].Content, name);
        t.link = link;
        return [t, name];
    }
    //最后完成后的回调信息
    function finishReCall(taskId, listener, isSpecail) {
        var taskRef = GameConfig.TaskConfig[taskId];
        var flag = false;
        if (taskRef) {
            TLog.Debug("TaskTrackHandler.finishReCall taskId:", taskId);
            var npcInfo = getFindNpcInfo(taskId, taskRef.NpcIds, listener.isRichDisplayer);
            var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
            if (taskInfo.data["COMMIT_NPC"]) {
                var npcEntryId = taskInfo.data["COMMIT_NPC"];
                npcInfo = getFindNpcInfo(taskId, npcEntryId, listener.isRichDisplayer);
            }
            var t = npcInfo[0];
            var name_2 = npcInfo[1];
            var _a = getTaskLibLinkEx(taskId, "finishReCall"), findLink = _a[0], personal = _a[1];
            if (personal) {
                t.link = findLink;
            }
            t.content = String.format(taskRef.TraceXMLContent, name_2);
            t.planetxt = String.format(taskRef.TraceContent, name_2);
            t.AllFinish = true; // 全部完成，不再显示动态信息，只是显示交任务的目标NPC
            if (isSpecail && TaskChecker.getInstance().checkFinish(taskId)) {
                var br = "<br />";
                var index = t.content.lastIndexOf(br);
                if (index != -1) {
                    t.content = t.content.substring(0, index); //去掉换行
                }
                var tag = Localize_cns("TASK_FINISH");
                t.content = t.content + tag;
            }
            flag = flag || listener.func.call(listener.this_index, t, listener.userData); //回调
        }
        return flag;
    }
    TaskTraceSpace.finishReCall = finishReCall;
    ////////////////////////////////////////////////////////////////////////////////////////
    //处理handler
    //杀死怪物 %s (%d,%d)
    function killMonsterTrace(taskId, listener) {
        str_num_num(taskId, taskField.FIELD_FINISH_KILLMONSTER, listener);
    }
    TaskTraceSpace.TaskTrackHandler[taskField.FIELD_FINISH_KILLMONSTER] = killMonsterTrace;
    //收集物品 %s (%d,%d)
    function collectItemTrace(taskId, listener) {
        str_num_num(taskId, taskField.FIELD_FINISH_COLLECTITEM, listener);
    }
    TaskTraceSpace.TaskTrackHandler[taskField.FIELD_FINISH_COLLECTITEM] = collectItemTrace;
    //收集宠物 %s (%d,%d)
    function collectPetTrace(taskId, listener) {
        str_num_num(taskId, taskField.FIELD_FINISH_COLLECTPET, listener);
    }
    TaskTraceSpace.TaskTrackHandler[taskField.FIELD_FINISH_COLLECTPET] = collectPetTrace;
    //寻找NPC
    function findNpcTrace(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var finishList = taskInfo.finish[taskField.FIELD_FINISH_FINDNPC];
        var dataList;
        var notfindway = false;
        if (finishList["notfindway"] == true) {
            notfindway = true;
        }
        if (taskInfo.data) {
            dataList = taskInfo.data[taskField.FIELD_FINISH_FINDNPC]; //此时一定是table
        }
        var flag = finishList.isonebyone || false;
        var returnFlag = false;
        if (flag) {
            var npcIndex = dataList && dataList.length || 0;
            var count = finishList.length;
            if (npcIndex >= finishList.length) {
                return finishReCall(taskId, listener);
            }
            else {
                var _a = getFindNpcInfo(taskId, finishList[npcIndex + 1], listener.isRichDisplayer), t = _a[0], name_3 = _a[1];
                if (notfindway) {
                    t.links = TaskLinkType.ADD_TIPS + ";" + taskId;
                }
                t.content = String.format(GameConfig.TaskTraceTips[taskField.FIELD_FINISH_FINDNPC].XMLContent, name_3);
                t.planetxt = String.format(GameConfig.TaskTraceTips[taskField.FIELD_FINISH_FINDNPC].Content, name_3);
                t.finish = false;
                return listener.func.call(listener.this_index, t, listener.userData);
            }
        }
        var formatString = GameConfig.TaskTraceTips[taskField.FIELD_FINISH_FINDNPC].Content;
        if (dataList == null) {
            var flag_1 = false;
            for (var _ in finishList) {
                var finishId = finishList[_];
                var t = void 0, name_4 = getFindNpcInfo(taskId, finishId, listener.isRichDisplayer);
                if (notfindway) {
                    t.links = TaskLinkType.ADD_TIPS + ";" + taskId;
                }
                t.content = String.format(GameConfig.TaskTraceTips[taskField.FIELD_FINISH_FINDNPC].XMLContent, name_4);
                t.planetxt = String.format(GameConfig.TaskTraceTips[taskField.FIELD_FINISH_FINDNPC].Content, name_4);
                t.finish = false;
                flag_1 = flag_1 || listener.func.call(listener.this_index, t, listener.userData); //回调
            }
            return flag_1;
        }
        var unFinishList = {};
        flag = false;
        for (var _ in finishList) {
            var finishId = finishList[_];
            //已经完成的NPC列表
            for (var __ in dataList) {
                var dataId = dataList[__];
                if (finishId == dataId) {
                    unFinishList[finishId] = true;
                    var _b = getFindNpcInfo(taskId, finishId, listener.isRichDisplayer), t = _b[0], name_5 = _b[1];
                    if (notfindway) {
                        t.links = TaskLinkType.ADD_TIPS + ";" + taskId;
                    }
                    t.content = String.format(GameConfig.TaskTraceTips[taskField.FIELD_FINISH_FINDNPC].XMLContent, name_5);
                    t.planetxt = String.format(GameConfig.TaskTraceTips[taskField.FIELD_FINISH_FINDNPC].Content, name_5);
                    t.finish = true;
                    flag = flag || listener.func.call(listener.this_index, t, listener.userData); //回调
                }
            }
        }
        for (var _ in finishList) {
            var finishId = finishList[_];
            if (unFinishList[finishId] != true) {
                var _c = getFindNpcInfo(taskId, finishId, listener.isRichDisplayer), t = _c[0], name_6 = _c[1];
                if (notfindway) {
                    t.links = TaskLinkType.ADD_TIPS + ";" + taskId;
                }
                t.content = String.format(GameConfig.TaskTraceTips[taskField.FIELD_FINISH_FINDNPC].XMLContent, name_6);
                t.planetxt = String.format(GameConfig.TaskTraceTips[taskField.FIELD_FINISH_FINDNPC].Content, name_6);
                t.finish = false;
                flag = flag || listener.func.call(listener.this_index, t, listener.userData); //回调
            }
        }
        return flag;
    }
    TaskTraceSpace.TaskTrackHandler[taskField.FIELD_FINISH_FINDNPC] = findNpcTrace;
    //////////////////////////////////////////////////////-字符串索引////////////////////////////////////////////////-
    function fightWinNpc(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var entryId = taskInfo.finish["FIGHTWIN_NPC"][0];
        var _a = getFindNpcInfo(taskId, entryId, listener.isRichDisplayer), t = _a[0], name = _a[1];
        t.finish = false;
        t.content = String.format(GameConfig.TaskTraceTips[TaskS2D["FIGHTWIN_NPC"]].XMLContent, name);
        t.planetxt = String.format(GameConfig.TaskTraceTips[TaskS2D["FIGHTWIN_NPC"]].Content, name);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler["FIGHTWIN_NPC"] = fightWinNpc;
    //对应条件"CAMPAIGN"的处理
    // function winCampaign(taskId, listener) {
    // 	let taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo()
    // 	let t: any = {}
    // 	t.taskId = taskId
    // 	t.finish = false
    // 	let campaignId = taskInfo.finish["CAMPAIGN"]
    // 	let campaignName = "error"
    // 	if (GameConfig.CampaignConfig[campaignId]) {
    // 		campaignName = GameConfig.CampaignConfig[campaignId].name
    // 		campaignName = campaignName != "" && campaignName || GameConfig.CampaignConfig[campaignId].indexName
    // 	}
    // 	let conditionStr = ""
    // 	let campRobberConfig = GameConfig.CampaginRobberConfig[campaignId]
    // 	if(campRobberConfig && campRobberConfig.robberKillCount > 0){
    // 		let robberKill = GetHeroProperty("robberKill") || 0
    // 	 	let color = robberKill < campRobberConfig.robberKillCount ? "#red" : "#lime"
    // 		if(robberKill > campRobberConfig.robberKillCount)
    // 			robberKill = campRobberConfig.robberKillCount;
    //         conditionStr = color + String.format(Localize_cns("CAMPAIGN_TXT102_0"), robberKill, campRobberConfig.robberKillCount)
    // 	}
    // 	function func() {
    // 		if (HeroIsInTeam() == true) {
    // 			if (HeroIsCaptain() == false) {
    // 				MsgSystem.addTagTips(Localize_cns("TEAM_TXT32"))
    // 			} else {
    // 				let message = GetMessage(opCodes.C2G_FIGHT_ENTER_CAMPAIGN_INFO)
    // 				SendGameMessage(message)
    // 				let mapId = MapSystem.getInstance().getMapId()
    // 				WngMrg.getInstance().getWindow("CopyCardFrame").showCopyCard(mapId, null, campaignId)
    // 			}
    // 		} else {
    // 			let mapId = MapSystem.getInstance().getMapId()
    // 			WngMrg.getInstance().getWindow("CopyCardFrame").showCopyCard(mapId, null, campaignId)
    // 		}
    // 	}
    // 	t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func)
    // 	t.content = String.format(GameConfig.TaskTraceTips[TaskS2D["CAMPAIGN"]].XMLContent, campaignName) + "#br" + conditionStr
    // 	t.planetxt = String.format(GameConfig.TaskTraceTips[TaskS2D["CAMPAIGN"]].Content, campaignName)
    // 	t.icon = TaskTraceIcon.CAMPAIGN
    // 	return listener.func.call(listener.this_index, t, listener.userData) //回调
    // }
    // TaskTrackHandler["CAMPAIGN"] = winCampaign
    function fightDynamicNpc(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var entryId = taskInfo.finish[ClientTaskField.FIELD_FINISH_FIGHTDYNAMICNPC][0];
        var _a = getFindNpcInfo(taskId, entryId, listener.isRichDisplayer), t = _a[0], name = _a[1];
        t.finish = false;
        var _b = getTaskLibLinkEx(taskId, ClientTaskField.FIELD_FINISH_FIGHTDYNAMICNPC), findLink = _b[0], personal = _b[1];
        if (personal) {
            t.link = findLink;
        }
        t.content = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_FIGHTDYNAMICNPC]].XMLContent, name);
        t.planetxt = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_FIGHTDYNAMICNPC]].Content, name);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[ClientTaskField.FIELD_FINISH_FIGHTDYNAMICNPC] = fightDynamicNpc;
    //击杀圣地怪物（封魔任务）
    function killMonster(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var killMonsterInfo = taskInfo.finish[ClientTaskField.FIELD_FINISH_KILL_MONSTER];
        var content = "";
        var nextEntryId = null;
        for (var entryId in killMonsterInfo) {
            var count = killMonsterInfo[entryId];
            var _a = TaskSystem.getInstance().getDynamicNpcName(taskId, entryId), name_7 = _a[0], _1 = _a[1], _2 = _a[2], _3 = _a[3];
            var curCount = 0;
            if (taskInfo.data[ClientTaskField.FIELD_FINISH_KILL_MONSTER]) {
                curCount = taskInfo.data[ClientTaskField.FIELD_FINISH_KILL_MONSTER][entryId] || 0;
            }
            var txt = String.format("%s(#red%d/%d#rf)", name_7, curCount, count);
            if (content != "") {
                txt = "," + txt;
            }
            content = content + txt;
            if (nextEntryId == null && curCount < count) {
                nextEntryId = entryId;
            }
        }
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        t.link = getConfigNpcLink(nextEntryId, taskId);
        t.content = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_KILL_MONSTER]].XMLContent, content);
        t.planetxt = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_KILL_MONSTER]].Content, content);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[ClientTaskField.FIELD_FINISH_KILL_MONSTER] = killMonster;
    //5件装备强化等级>=3
    function equipEnhance(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var data = taskInfo.data[ClientTaskField.FIELD_FINISH_EQUIP_ENHANCE] || {};
        var count = data[0] || 0;
        var level = data[1] || 0;
        var finish = taskInfo.finish[ClientTaskField.FIELD_FINISH_EQUIP_ENHANCE] || {};
        var needCount = finish[0] || 0;
        var needLevel = finish[1] || 0;
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("gongfang");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_EQUIP_ENHANCE]].XMLContent, needLevel, count, needCount);
        t.planetxt = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_EQUIP_ENHANCE]].Content, needLevel, count, needCount);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[ClientTaskField.FIELD_FINISH_EQUIP_ENHANCE] = equipEnhance;
    //主角等级>=20级
    function playerLevel(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var needLevel = taskInfo.finish[ClientTaskField.FIELD_FINISH_PLR_LEVEL] || 0;
        var level = taskInfo.data[ClientTaskField.FIELD_FINISH_PLR_LEVEL] || GetHeroProperty("level") || 0;
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("shengji");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_PLR_LEVEL]].XMLContent, level, needLevel);
        t.planetxt = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_PLR_LEVEL]].Content, level, needLevel);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[ClientTaskField.FIELD_FINISH_PLR_LEVEL] = playerLevel;
    //3个伙伴等级>=20级
    function petLevel(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var data = taskInfo.data[ClientTaskField.FIELD_FINISH_PET_LEVEL] || {};
        var count = data[0] || 0;
        var level = data[1] || 0;
        var finish = taskInfo.finish[ClientTaskField.FIELD_FINISH_PET_LEVEL] || {};
        var needCount = finish[0] || 0;
        var needLevel = finish[1] || 0;
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("petshengji");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_PET_LEVEL]].XMLContent, needLevel, count, needCount);
        t.planetxt = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_PET_LEVEL]].Content, needLevel, count, needCount);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[ClientTaskField.FIELD_FINISH_PET_LEVEL] = petLevel;
    //祭台抽奖>=10次
    function petLottery(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var needCount = taskInfo.finish[ClientTaskField.FIELD_FINISH_PET_LOTTERY] || 0;
        var count = taskInfo.data[ClientTaskField.FIELD_FINISH_PET_LOTTERY] || 0;
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("jitan");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_PET_LOTTERY]].XMLContent, count, needCount);
        t.planetxt = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_PET_LOTTERY]].Content, count, needCount);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[ClientTaskField.FIELD_FINISH_PET_LOTTERY] = petLottery;
    //所有伙伴+主角穿戴>=10件>=2阶装备
    function equipOn(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var data = taskInfo.data[ClientTaskField.FIELD_FINISH_EQUIP_ON] || {};
        var count = data[0] || 0;
        var level = data[1] || 0;
        var finish = taskInfo.finish[ClientTaskField.FIELD_FINISH_EQUIP_ON] || {};
        var needCount = finish[0] || 0;
        var needLevel = finish[1] || 0;
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            //ExecuteMainFrameFunction("petshengji")
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_EQUIP_ON]].XMLContent, needLevel, count, needCount);
        t.planetxt = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_EQUIP_ON]].Content, needLevel, count, needCount);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[ClientTaskField.FIELD_FINISH_EQUIP_ON] = equipOn;
    //地宫层数>=20
    function skyTower(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var needLayer = taskInfo.finish[ClientTaskField.FIELD_FINISH_SKY_TOWER] || 0;
        var layer = taskInfo.data[ClientTaskField.FIELD_FINISH_SKY_TOWER] || 0;
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("shilian");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_SKY_TOWER]].XMLContent, layer, needLayer);
        t.planetxt = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_SKY_TOWER]].Content, layer, needLayer);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[ClientTaskField.FIELD_FINISH_SKY_TOWER] = skyTower;
    //进入竞技场前5000名
    function championRank(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var needRank = taskInfo.finish[ClientTaskField.FIELD_FINISH_CHAMPION] || 0;
        var rank = taskInfo.data[ClientTaskField.FIELD_FINISH_CHAMPION] || 0;
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("jingjichang");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_CHAMPION]].XMLContent, needRank);
        t.planetxt = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_CHAMPION]].Content, needRank);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[ClientTaskField.FIELD_FINISH_CHAMPION] = championRank;
    //(主角/伙伴)进阶等级>=2
    function allAwakeLevel(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var data = taskInfo.data[ClientTaskField.FIELD_FINISH_AWAKE_LEVEL] || {};
        var count = data[1] || 0;
        var level = data[0] || 0;
        var finish = taskInfo.finish[ClientTaskField.FIELD_FINISH_AWAKE_LEVEL] || {};
        var needCount = finish[1] || 0;
        var needLevel = finish[0] || 0;
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            //let wnd = WngMrg.getInstance().getWindow("PetFrame")
            //wnd.showTabEntryId(PetFrame.WakeTab, 0)
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_AWAKE_LEVEL]].XMLContent, needCount, needLevel);
        t.planetxt = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_AWAKE_LEVEL]].Content, needCount, needLevel);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[ClientTaskField.FIELD_FINISH_AWAKE_LEVEL] = allAwakeLevel;
    //(主角/伙伴)蜕变等级>=2
    function allBreakLevel(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var data = taskInfo.data[ClientTaskField.FIELD_FINISH_BREAK_LEVEL] || {};
        var entryId = data[0] || 0;
        var level = data[1] || 0;
        var finish = taskInfo.finish[ClientTaskField.FIELD_FINISH_BREAK_LEVEL] || {};
        var needEntryId = finish[0] || 0;
        var needLevel = finish[1] || 0;
        var name = Localize_cns("ROLE_TXT9");
        var tabEntry = needEntryId;
        if (needEntryId != growOptions.playerOwnerId) {
            var petInfo = PetSystem.getInstance().getPetInfoEntry(needEntryId);
            if (petInfo) {
                name = petInfo.name;
            }
            else {
                name = PetSystem.getInstance().getPetName(needEntryId);
            }
        }
        else {
            tabEntry = 0;
        }
        if (needEntryId != entryId) {
            level = 0;
        }
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            //let wnd = WngMrg.getInstance().getWindow("PetFrame")
            //wnd.showTabEntryId(PetFrame.BreakTab, tabEntry)
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_BREAK_LEVEL]].XMLContent, name, level, needLevel);
        t.planetxt = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_BREAK_LEVEL]].Content, name, level, needLevel);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[ClientTaskField.FIELD_FINISH_BREAK_LEVEL] = allBreakLevel;
    //守护等级>=3级
    function wingLevel(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var needLevel = taskInfo.finish[ClientTaskField.FIELD_FINISH_WING_LEVEL] || 0;
        var level = taskInfo.data[ClientTaskField.FIELD_FINISH_WING_LEVEL] || 0;
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("shouhu");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_WING_LEVEL]].XMLContent, level, needLevel);
        t.planetxt = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_WING_LEVEL]].Content, level, needLevel);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[ClientTaskField.FIELD_FINISH_WING_LEVEL] = wingLevel;
    //互动次数
    // function wudongCount( taskId, listener){
    // 	let taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo()
    // 	let finishInfo = taskInfo.finish[ClientTaskField.FIELD_FINISH_WUDONG_COUNT] || {}
    // 	let dataInfo = taskInfo.data[ClientTaskField.FIELD_FINISH_WUDONG_COUNT] || {}
    // 	let needCount = finishInfo[1] || 0
    // 	let count = dataInfo[1] || 0
    // 	let entryId = finishInfo[0]
    // 	let name = Localize_cns("ROLE_TXT9")
    // 	if(entryId != growOptions.playerOwnerId ){
    // 		let petInfo = PetSystem.getInstance().getPetInfoEntry(entryId)
    // 		if(petInfo ){
    // 			name = petInfo.name
    // 		}else{
    // 			name = PetSystem.getInstance().getPetName(entryId)
    // 		}
    // 	}
    // 	let t:any = {}
    // 	t.finish = false
    // 	t.taskId = taskId
    // 	function func(){
    // 		let wnd:GrowFrame = WngMrg.getInstance().getWindow("GrowFrame")
    // 		wnd.showEntryId(entryId)
    // 	}
    // 	t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func)
    // 	t.content = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_WUDONG_COUNT]].XMLContent, name, count, needCount)
    // 	t.planetxt = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_WUDONG_COUNT]].Content, name, count, needCount)
    // 	return listener.func.call(listener.this_index, t, listener.userData) //回调
    // }
    // TaskTrackHandler[ClientTaskField.FIELD_FINISH_WUDONG_COUNT] = wudongCount
    //使用1次圣地技能次数1003
    // function useRobberSkill( taskId, listener){
    // 	let taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo()
    // 	let finishInfo = taskInfo.finish[ClientTaskField.FIELD_FINISH_ROBBER_SKILL] || {}
    // 	let dataInfo = taskInfo.data[ClientTaskField.FIELD_FINISH_ROBBER_SKILL] || {}
    // 	let skillId = finishInfo[0] || 0
    // 	let needCount = finishInfo[1] || 0
    // 	let dSkillId = checkNull(dataInfo[0] , -1)
    // 	let count = dataInfo[1] || 0
    // 	if(skillId != dSkillId ){
    // 		count = 0
    // 	}
    // 	let config = GameConfig.RobberSkillConfig[skillId]
    // 	let skillName = tostring(skillId)
    // 	if(config ){
    // 		skillName = config.name
    // 	}
    // 	let t:any = {}
    // 	t.finish = false
    // 	t.taskId = taskId
    // 	function func(){
    // 		let activity = GetActivity(ActivityDefine.Robber)
    // 		if(! activity.isAutoFight() ){
    // 			MsgSystem.addTagTips(Localize_cns("ROBBER_TXT41"))
    // 			return
    // 		}
    // 	//	ExecuteMainFrameFunction("yangcheng")
    // 		//MsgSystem.addTagTips(Localize_cns("ROBBER_TXT158"))
    // 		let message = GetMessage(opCodes.C2G_ROBBER_USE_SKILL)
    // 		message.skillId = skillId
    // 		SendGameMessage(message)
    // 	}
    // 	t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func)
    // 	t.content = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_ROBBER_SKILL]].XMLContent, skillName, count, needCount)
    // 	t.planetxt = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_ROBBER_SKILL]].Content, skillName, count, needCount)
    // 	return listener.func.call(listener.this_index, t, listener.userData) //回调
    // }
    // TaskTrackHandler[ClientTaskField.FIELD_FINISH_ROBBER_SKILL] = useRobberSkill
    //解锁1个2阶职业
    function unlockVocation(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var finishInfo = taskInfo.finish[ClientTaskField.FIELD_FINISH_UNLOCK_VOCATION] || {};
        var dataInfo = taskInfo.data[ClientTaskField.FIELD_FINISH_UNLOCK_VOCATION] || {};
        var vLevel = finishInfo[0] || 0;
        var needCount = finishInfo[1] || 0;
        var count = dataInfo[1] || 0;
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("zhiye");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_UNLOCK_VOCATION]].XMLContent, vLevel, count, needCount);
        t.planetxt = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_UNLOCK_VOCATION]].Content, vLevel, count, needCount);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[ClientTaskField.FIELD_FINISH_UNLOCK_VOCATION] = unlockVocation;
    //领取2次心情奖励
    function gainFeellingGift(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var finishInfo = taskInfo.finish[ClientTaskField.FIELD_FINISH_FEEL_GIFT] || 0;
        var dataInfo = taskInfo.data[ClientTaskField.FIELD_FINISH_FEEL_GIFT] || 0;
        var needCount = finishInfo;
        var count = dataInfo;
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("yangcheng");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_FEEL_GIFT]].XMLContent, count, needCount);
        t.planetxt = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_FEEL_GIFT]].Content, count, needCount);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[ClientTaskField.FIELD_FINISH_FEEL_GIFT] = gainFeellingGift;
    //接取任务后占领或掠夺N次
    function holdReliceMine(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var finishInfo = taskInfo.finish[ClientTaskField.FIELD_FINISH_RELICE_MINE] || 0;
        var dataInfo = taskInfo.data[ClientTaskField.FIELD_FINISH_RELICE_MINE] || 0;
        var needCount = finishInfo;
        var count = dataInfo;
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("hanghai");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_RELICE_MINE]].XMLContent, count, needCount);
        t.planetxt = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_RELICE_MINE]].Content, count, needCount);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[ClientTaskField.FIELD_FINISH_RELICE_MINE] = holdReliceMine;
    //圣地杀怪xxx数量1
    // function changeKillMonster( taskId, listener){
    // 	let taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo()
    // 	let finishInfo = taskInfo.finish[ClientTaskField.FIELD_FINISH_CHANG_KILL_MONSTER] || {}
    // 	let dataInfo = taskInfo.data[ClientTaskField.FIELD_FINISH_CHANG_KILL_MONSTER] || {}
    // 	let index = finishInfo[0] || 0
    // 	let needCount = finishInfo[1] || 0
    // 	let curIndex = checkNull(dataInfo[0] , -1)
    // 	let count = dataInfo[1] || 0
    // 	let name = tostring(index)
    // 	let npcEntryId = null
    // 	if(GameConfig.RobberMonsterConfig[index] ){
    // 		npcEntryId = GameConfig.RobberMonsterConfig[index].npcEntryId
    // 		let config = GameConfig.npcConfig[npcEntryId]
    // 		if(config ){
    // 			name = config.name
    // 		}
    // 	}
    // 	let t:any = {}
    // 	t.finish = false
    // 	t.taskId = taskId
    // 	function func(){
    // 		let activity = GetActivity(ActivityDefine.Robber)
    // 		if(TeamBaned() ){
    // 			return
    // 		}
    // 		//if(activity.isAutoFight() == true ){
    // 		//	let statusInfo = activity.getHeroHangStatus()
    // 		//	let curIndex = statusInfo.prizeIndex
    // 		//	if(index == curIndex ){
    // 		//		
    // 		//	}else{
    // 		//		MsgSystem.addTagTips(Localize_cns("ROBBER_TXT71"))
    // 		//		return
    // 		//	}
    // 		//}
    // 		if(npcEntryId ){
    // 			activity.stopFightToFindMonster(npcEntryId)
    // 		}
    // 	}
    // 	t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func)
    // 	t.content = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_CHANG_KILL_MONSTER]].XMLContent, name, count, needCount)
    // 	t.planetxt = String.format(GameConfig.TaskTraceTips[TaskS2D[ClientTaskField.FIELD_FINISH_CHANG_KILL_MONSTER]].Content, name, count, needCount)
    // 	return listener.func.call(listener.this_index, t, listener.userData) //回调
    // }
    // TaskTrackHandler[ClientTaskField.FIELD_FINISH_CHANG_KILL_MONSTER] = changeKillMonster
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //角色技能等级
    function roleSkillLv(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curLv = taskInfo.data[taskFinishId.R_SKILL_MAX_LV];
        var needLv = taskInfo.finish[taskFinishId.R_SKILL_MAX_LV];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("RoleFrame");
            wnd.showWithIndex(1);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.R_SKILL_MAX_LV].XMLContent, curLv, needLv);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.R_SKILL_MAX_LV].Content, curLv, needLv);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.R_SKILL_MAX_LV] = roleSkillLv;
    //角色技能次数
    function roleSkillTime(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.R_SKILL_UP_NUM];
        var needTime = taskInfo.finish[taskFinishId.R_SKILL_UP_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("RoleFrame");
            wnd.showWithIndex(1);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.R_SKILL_UP_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.R_SKILL_UP_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.R_SKILL_UP_NUM] = roleSkillTime;
    //穿戴装备数量
    function wearEquipCount(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        //当前数量
        var curCount = taskInfo.data[taskFinishId.R_EQUIP_MAX_NUM];
        //需求数量
        var needCount = taskInfo.finish[taskFinishId.R_EQUIP_MAX_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("jiaose");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQUIP_MAX_NUM].XMLContent, curCount, needCount);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQUIP_MAX_NUM].Content, curCount, needCount);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.R_EQUIP_MAX_NUM] = wearEquipCount;
    //穿戴装备次数
    function wearEquipTime(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.R_EQUIP_CHANGE_NUM];
        var needTime = taskInfo.finish[taskFinishId.R_EQUIP_CHANGE_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("jiaose");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQUIP_CHANGE_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQUIP_CHANGE_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.R_EQUIP_CHANGE_NUM] = wearEquipTime;
    //装备强化最高达到等级
    function roleEquipQHMax(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.R_EQ_QH_MAX_LEVEL];
        var needTime = taskInfo.finish[taskFinishId.R_EQ_QH_MAX_LEVEL];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("duanzao");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQ_QH_MAX_LEVEL].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQ_QH_MAX_LEVEL].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.R_EQ_QH_MAX_LEVEL] = roleEquipQHMax;
    //装备强化最低达到等级
    function roleEquipQHMin(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.R_EQ_QH_MIN_LEVEL];
        var needTime = taskInfo.finish[taskFinishId.R_EQ_QH_MIN_LEVEL];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("duanzao");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQ_QH_MIN_LEVEL].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQ_QH_MIN_LEVEL].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.R_EQ_QH_MIN_LEVEL] = roleEquipQHMin;
    //装备强化次数
    function roleEquipQHTime(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.R_EQ_QH_NUM];
        var needTime = taskInfo.finish[taskFinishId.R_EQ_QH_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("duanzao");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQ_QH_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQ_QH_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.R_EQ_QH_NUM] = roleEquipQHTime;
    //精炼最高等级
    function roleEquipJLMax(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.R_EQ_JL_MAX_LEVEL];
        var needTime = taskInfo.finish[taskFinishId.R_EQ_JL_MAX_LEVEL];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("ForgeFrame");
            wnd.showWithIndex(1);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQ_JL_MAX_LEVEL].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQ_JL_MAX_LEVEL].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.R_EQ_JL_MAX_LEVEL] = roleEquipJLMax;
    //精炼最低等级
    function roleEquipJLMin(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.R_EQ_JL_MIN_LEVEL];
        var needTime = taskInfo.finish[taskFinishId.R_EQ_JL_MIN_LEVEL];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("ForgeFrame");
            wnd.showWithIndex(1);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQ_JL_MIN_LEVEL].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQ_JL_MIN_LEVEL].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.R_EQ_JL_MIN_LEVEL] = roleEquipJLMin;
    //装备精练次数
    function roleEquipJLTime(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.R_EQ_JL_NUM];
        var needTime = taskInfo.finish[taskFinishId.R_EQ_JL_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("ForgeFrame");
            wnd.showWithIndex(1);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQ_JL_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQ_JL_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.R_EQ_JL_NUM] = roleEquipJLTime;
    //装备锻炼最高达到等级
    function roleEquipDLMax(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.R_EQ_DL_MAX_LEVEL];
        var needTime = taskInfo.finish[taskFinishId.R_EQ_DL_MAX_LEVEL];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("ForgeFrame");
            wnd.showWithIndex(2);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQ_DL_MAX_LEVEL].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQ_DL_MAX_LEVEL].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.R_EQ_DL_MAX_LEVEL] = roleEquipDLMax;
    //装备锻炼最低达到等级
    function roleEquipDLMin(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.R_EQ_DL_MIN_LEVEL];
        var needTime = taskInfo.finish[taskFinishId.R_EQ_DL_MIN_LEVEL];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("ForgeFrame");
            wnd.showWithIndex(2);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQ_DL_MIN_LEVEL].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQ_DL_MIN_LEVEL].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.R_EQ_DL_MIN_LEVEL] = roleEquipDLMin;
    //装备锻炼次数
    function roleEquipDLTime(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.R_EQ_DL_NUM];
        var needTime = taskInfo.finish[taskFinishId.R_EQ_DL_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("ForgeFrame");
            wnd.showWithIndex(2);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQ_DL_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQ_DL_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.R_EQ_DL_NUM] = roleEquipDLTime;
    //装备宝石最高达到等级
    function roleEquipBSMax(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.R_EQ_BS_MAX_LEVEL];
        var needTime = taskInfo.finish[taskFinishId.R_EQ_BS_MAX_LEVEL];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("ForgeFrame");
            wnd.showWithIndex(3);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQ_BS_MAX_LEVEL].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQ_BS_MAX_LEVEL].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.R_EQ_BS_MAX_LEVEL] = roleEquipBSMax;
    //装备宝石最低达到等级
    function roleEquipBSMin(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.R_EQ_BS_MIN_LEVEL];
        var needTime = taskInfo.finish[taskFinishId.R_EQ_BS_MIN_LEVEL];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("ForgeFrame");
            wnd.showWithIndex(3);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQ_BS_MIN_LEVEL].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQ_BS_MIN_LEVEL].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.R_EQ_BS_MIN_LEVEL] = roleEquipBSMin;
    //装备宝石次数
    function roleEquipBSTime(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.R_EQ_BS_NUM];
        var needTime = taskInfo.finish[taskFinishId.R_EQ_BS_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("ForgeFrame");
            wnd.showWithIndex(3);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQ_BS_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQ_BS_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.R_EQ_BS_NUM] = roleEquipBSTime;
    //装备熔炼次数
    function roleEquipSmelte(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.R_EQ_MELT_NUM];
        var needTime = taskInfo.finish[taskFinishId.R_EQ_MELT_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("ronglian");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQ_MELT_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.R_EQ_MELT_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.R_EQ_MELT_NUM] = roleEquipSmelte;
    //世界聊天多少次
    function roleWorldTalk(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.ROLE_WORLD_TALK_NUM];
        var needTime = taskInfo.finish[taskFinishId.ROLE_WORLD_TALK_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            WngMrg.getInstance().showWindow("ChatInChannelFrame");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.ROLE_WORLD_TALK_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.ROLE_WORLD_TALK_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.ROLE_WORLD_TALK_NUM] = roleWorldTalk;
    //BOSS关卡
    function campaignBoss(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var campaignId = taskInfo.finish[taskFinishId.CAMPAIGN_ID] || 0;
        var campaignName = CampaignSystem.getInstance().getCampaignName(campaignId);
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("guanka");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.CAMPAIGN_ID].XMLContent, campaignName);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.CAMPAIGN_ID].Content, campaignName);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.CAMPAIGN_ID] = campaignBoss;
    //通过关卡数量
    function campaignTime(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.CAMPAIGN_NUM];
        var needTime = taskInfo.finish[taskFinishId.CAMPAIGN_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("guanka");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.CAMPAIGN_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.CAMPAIGN_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.CAMPAIGN_NUM] = campaignTime;
    //关卡boss自动战斗
    function campaignBossAuto(taskId, listener) {
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.CAMPAIGN_SET_AUTO].XMLContent);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.CAMPAIGN_SET_AUTO].Content);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.CAMPAIGN_SET_AUTO] = campaignBossAuto;
    //进入地图
    function enterMap(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var mapId = taskInfo.finish[taskFinishId.ENTRY_MAP];
        var mapName = MapSystem.getInstance().getMapName(mapId);
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("ditu");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.ENTRY_MAP].XMLContent, mapName);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.ENTRY_MAP].Content, mapName);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.ENTRY_MAP] = enterMap;
    //收集多少个宠物
    function collectPet(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.PET_COUNT];
        var needTime = taskInfo.finish[taskFinishId.PET_COUNT];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("guanka");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.PET_COUNT].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.PET_COUNT].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.PET_COUNT] = collectPet;
    //宠物升级次数
    function upgradePet(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.PET_STAGE_STEP_NUM];
        var needTime = taskInfo.finish[taskFinishId.PET_STAGE_STEP_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("chongwu");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.PET_STAGE_STEP_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.PET_STAGE_STEP_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.PET_STAGE_STEP_NUM] = upgradePet;
    //宠物最高多少阶
    function petUpgradeMax(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.PET_STAGE_MAX_LV];
        var needTime = taskInfo.finish[taskFinishId.PET_STAGE_MAX_LV];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("chongwu");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.PET_STAGE_MAX_LV].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.PET_STAGE_MAX_LV].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.PET_STAGE_MAX_LV] = upgradePet;
    //收集多少个仙侣
    function collectXianNv(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.XL_COUNT];
        var needTime = taskInfo.finish[taskFinishId.XL_COUNT];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("xianlv");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.XL_COUNT].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.XL_COUNT].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.XL_COUNT] = collectXianNv;
    //仙侣升级次数
    function upgradeXianNv(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.XL_STAGE_STEP_NUM];
        var needTime = taskInfo.finish[taskFinishId.XL_STAGE_STEP_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("xianlv");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.XL_STAGE_STEP_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.XL_STAGE_STEP_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.XL_STAGE_STEP_NUM] = upgradeXianNv;
    //仙侣最高多少阶
    function xianNvUpgradeMax(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.XL_STAGE_MAX_LV];
        var needTime = taskInfo.finish[taskFinishId.XL_STAGE_MAX_LV];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("xianlv");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.XL_STAGE_MAX_LV].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.XL_STAGE_MAX_LV].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.XL_STAGE_MAX_LV] = upgradeXianNv;
    //角色坐骑升阶
    function rideUpgrade(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.RIDE_STAGE_STEP_NUM];
        var needTime = taskInfo.finish[taskFinishId.RIDE_STAGE_STEP_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("RoleFrame");
            wnd.showWithIndex(2);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.RIDE_STAGE_STEP_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.RIDE_STAGE_STEP_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.RIDE_STAGE_STEP_NUM] = rideUpgrade;
    //角色坐骑最高多少阶
    function rideUpgradeMax(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.RIDE_STAGE_LEVEL];
        var needTime = taskInfo.finish[taskFinishId.RIDE_STAGE_LEVEL];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("RoleFrame");
            wnd.showWithIndex(2);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.RIDE_STAGE_LEVEL].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.RIDE_STAGE_LEVEL].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.RIDE_STAGE_LEVEL] = rideUpgradeMax;
    //角色翅膀升阶
    function wingUpgrade(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.WING_STAGE_STEP_NUM];
        var needTime = taskInfo.finish[taskFinishId.WING_STAGE_STEP_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("RoleFrame");
            wnd.showWithIndex(3);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.WING_STAGE_STEP_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.WING_STAGE_STEP_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.WING_STAGE_STEP_NUM] = wingUpgrade;
    //角色翅膀最高多少阶
    function wingUpgradeMax(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.WING_STAGE_LEVEL];
        var needTime = taskInfo.finish[taskFinishId.WING_STAGE_LEVEL];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("RoleFrame");
            wnd.showWithIndex(3);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.WING_STAGE_LEVEL].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.WING_STAGE_LEVEL].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.WING_STAGE_LEVEL] = wingUpgradeMax;
    //宠物通灵升阶
    function tongLinUpgrade(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.TONGLIN_STAGE_STEP_NUM];
        var needTime = taskInfo.finish[taskFinishId.TONGLIN_STAGE_STEP_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("PetFrame");
            wnd.showWithIndex(2);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.TONGLIN_STAGE_STEP_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.TONGLIN_STAGE_STEP_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.TONGLIN_STAGE_STEP_NUM] = tongLinUpgrade;
    //宠物通灵最高多少阶
    function tongLinUpgradeMax(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.TONGLIN_STAGE_LEVEL];
        var needTime = taskInfo.finish[taskFinishId.TONGLIN_STAGE_LEVEL];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("PetFrame");
            wnd.showWithIndex(2);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.TONGLIN_STAGE_LEVEL].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.TONGLIN_STAGE_LEVEL].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.TONGLIN_STAGE_LEVEL] = tongLinUpgradeMax;
    //宠物兽魂升阶
    function shouHunUpgrade(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.SOUHUN_STAGE_STEP_NUM];
        var needTime = taskInfo.finish[taskFinishId.SOUHUN_STAGE_STEP_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("PetFrame");
            wnd.showWithIndex(3);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.SOUHUN_STAGE_STEP_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.SOUHUN_STAGE_STEP_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.SOUHUN_STAGE_STEP_NUM] = shouHunUpgrade;
    //宠物兽魂最高多少阶
    function shouHunUpgradeMax(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.SOUHUN_STAGE_LEVEL];
        var needTime = taskInfo.finish[taskFinishId.SOUHUN_STAGE_LEVEL];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("PetFrame");
            wnd.showWithIndex(3);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.SOUHUN_STAGE_LEVEL].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.SOUHUN_STAGE_LEVEL].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.SOUHUN_STAGE_LEVEL] = shouHunUpgradeMax;
    //仙侣法阵升阶
    function faZhenUpgrade(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.FAZHEN_STAGE_STEP_NUM];
        var needTime = taskInfo.finish[taskFinishId.FAZHEN_STAGE_STEP_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("XianLvFrame");
            wnd.showWithIndex(2);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.FAZHEN_STAGE_STEP_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.FAZHEN_STAGE_STEP_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.FAZHEN_STAGE_STEP_NUM] = faZhenUpgrade;
    //仙侣法阵最高多少阶
    function faZhenUpgradeMax(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.FAZHEN_STAGE_LEVEL];
        var needTime = taskInfo.finish[taskFinishId.FAZHEN_STAGE_LEVEL];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("XianLvFrame");
            wnd.showWithIndex(2);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.FAZHEN_STAGE_LEVEL].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.FAZHEN_STAGE_LEVEL].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.FAZHEN_STAGE_LEVEL] = faZhenUpgradeMax;
    //仙侣仙位升阶
    function xianWeiUpgrade(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.XIANWEI_STAGE_STEP_NUM];
        var needTime = taskInfo.finish[taskFinishId.XIANWEI_STAGE_STEP_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("XianLvFrame");
            wnd.showWithIndex(3);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.XIANWEI_STAGE_STEP_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.XIANWEI_STAGE_STEP_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.XIANWEI_STAGE_STEP_NUM] = xianWeiUpgrade;
    //仙侣仙位最高多少阶
    function xianWeiUpgradeMax(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.XIANWEI_STAGE_LEVEL];
        var needTime = taskInfo.finish[taskFinishId.XIANWEI_STAGE_LEVEL];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("XianLvFrame");
            wnd.showWithIndex(3);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.XIANWEI_STAGE_LEVEL].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.XIANWEI_STAGE_LEVEL].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.XIANWEI_STAGE_LEVEL] = xianWeiUpgradeMax;
    //天仙升阶
    function tianXianUpgrade(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.TX_STAGE_STEP_NUM];
        var needTime = taskInfo.finish[taskFinishId.TX_STAGE_STEP_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("tianxian");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.TX_STAGE_STEP_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.TX_STAGE_STEP_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.TX_STAGE_STEP_NUM] = tianXianUpgrade;
    //天仙最高多少阶
    function tianXianUpgradeMax(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.TX_STAGE_LEVEL];
        var needTime = taskInfo.finish[taskFinishId.TX_STAGE_LEVEL];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("tianxian");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.TX_STAGE_LEVEL].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.TX_STAGE_LEVEL].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.TX_STAGE_LEVEL] = tianXianUpgradeMax;
    //天仙武器升阶
    function txWeaponUpgrade(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.TXWEAPON_STAGE_STEP_NUM];
        var needTime = taskInfo.finish[taskFinishId.TXWEAPON_STAGE_STEP_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("TianXianFrame");
            wnd.showWithIndex(1);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.TXWEAPON_STAGE_STEP_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.TXWEAPON_STAGE_STEP_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.TXWEAPON_STAGE_STEP_NUM] = txWeaponUpgrade;
    //天仙武器最高多少阶
    function txWeaponUpgradeMax(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.TXWEAPON_STAGE_LEVEL];
        var needTime = taskInfo.finish[taskFinishId.TXWEAPON_STAGE_LEVEL];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("TianXianFrame");
            wnd.showWithIndex(1);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.TXWEAPON_STAGE_LEVEL].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.TXWEAPON_STAGE_LEVEL].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.TXWEAPON_STAGE_LEVEL] = txWeaponUpgradeMax;
    //天女升阶
    function tianNvUpgrade(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.TN_STAGE_STEP_NUM];
        var needTime = taskInfo.finish[taskFinishId.TN_STAGE_STEP_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("tiannv");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.TN_STAGE_STEP_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.TN_STAGE_STEP_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.TN_STAGE_STEP_NUM] = tianNvUpgrade;
    //天女最高多少阶
    function tianNvUpgradeMax(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.TN_STAGE_LEVEL];
        var needTime = taskInfo.finish[taskFinishId.TN_STAGE_LEVEL];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("tiannv");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.TN_STAGE_LEVEL].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.TN_STAGE_LEVEL].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.TN_STAGE_LEVEL] = tianNvUpgradeMax;
    //天女仙器升阶
    function xianQiUpgrade(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.TNXIANQI_STAGE_STEP_NUM];
        var needTime = taskInfo.finish[taskFinishId.TNXIANQI_STAGE_STEP_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("TianNvFrame");
            wnd.showWithIndex(1);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.TNXIANQI_STAGE_STEP_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.TNXIANQI_STAGE_STEP_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.TNXIANQI_STAGE_STEP_NUM] = xianQiUpgrade;
    //天女仙器最高多少阶
    function xianQiUpgradeMax(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.TNXIANQI_STAGE_LEVEL];
        var needTime = taskInfo.finish[taskFinishId.TNXIANQI_STAGE_LEVEL];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("TianNvFrame");
            wnd.showWithIndex(1);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.TNXIANQI_STAGE_LEVEL].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.TNXIANQI_STAGE_LEVEL].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.TNXIANQI_STAGE_LEVEL] = xianQiUpgradeMax;
    //天女花辇升阶
    function huaNianUpgrade(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.TNHUANIAN_STAGE_STEP_NUM];
        var needTime = taskInfo.finish[taskFinishId.TNHUANIAN_STAGE_STEP_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("TianNvFrame");
            wnd.showWithIndex(2);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.TNHUANIAN_STAGE_STEP_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.TNHUANIAN_STAGE_STEP_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.TNHUANIAN_STAGE_STEP_NUM] = huaNianUpgrade;
    //天女花辇最高多少阶
    function huaNianUpgradeMax(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.TNHUANIAN_STAGE_LEVEL];
        var needTime = taskInfo.finish[taskFinishId.TNHUANIAN_STAGE_LEVEL];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("TianNvFrame");
            wnd.showWithIndex(2);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.TNHUANIAN_STAGE_LEVEL].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.TNHUANIAN_STAGE_LEVEL].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.TNHUANIAN_STAGE_LEVEL] = huaNianUpgradeMax;
    //天女灵气升阶
    function lingQiUpgrade(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.TNLINGQI_STAGE_STEP_NUM];
        var needTime = taskInfo.finish[taskFinishId.TNLINGQI_STAGE_STEP_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("TianNvFrame");
            wnd.showWithIndex(3);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.TNLINGQI_STAGE_STEP_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.TNLINGQI_STAGE_STEP_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.TNLINGQI_STAGE_STEP_NUM] = lingQiUpgrade;
    //天女灵气最高多少阶
    function lingQiUpgradeMax(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.TNLINGQI_STAGE_LEVEL];
        var needTime = taskInfo.finish[taskFinishId.TNLINGQI_STAGE_LEVEL];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("TianNvFrame");
            wnd.showWithIndex(3);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.TNLINGQI_STAGE_LEVEL].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.TNLINGQI_STAGE_LEVEL].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.TNLINGQI_STAGE_LEVEL] = lingQiUpgradeMax;
    //角色等级到达多少级
    function roleUpgradeLv(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curLv = taskInfo.data[taskFinishId.ROLE_MAX_LEVEL];
        var needLv = taskInfo.finish[taskFinishId.ROLE_MAX_LEVEL];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("jiaose");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.ROLE_MAX_LEVEL].XMLContent, curLv, needLv);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.ROLE_MAX_LEVEL].Content, curLv, needLv);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.ROLE_MAX_LEVEL] = roleUpgradeLv;
    //角色等级到达多少级
    function roleUpgradeTime(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.ROLE_LEVEl_NUM];
        var needTime = taskInfo.finish[taskFinishId.ROLE_LEVEl_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("jiaose");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.ROLE_LEVEl_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.ROLE_LEVEl_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.ROLE_LEVEl_NUM] = roleUpgradeTime;
    //个人boss累积次数
    function copyPersonTime(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.COPY_PERSON_COUNT];
        var needTime = taskInfo.finish[taskFinishId.COPY_PERSON_COUNT];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("gerenboss");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.COPY_PERSON_COUNT].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.COPY_PERSON_COUNT].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.COPY_PERSON_COUNT] = copyPersonTime;
    //个人boss打多少次　接到任务后统计数量
    function copyPersonNum(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.COPY_PERSON_NUM];
        var needTime = taskInfo.finish[taskFinishId.COPY_PERSON_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("gerenboss");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.COPY_PERSON_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.COPY_PERSON_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.COPY_PERSON_NUM] = copyPersonNum;
    //龙王宝藏完成指定关卡
    function copyDragonLevel(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var passId = taskInfo.finish[taskFinishId.COPY_DRAGON_LEVEL];
        var passName = GameConfig.CopyDragonConfig[passId].chapterName;
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("CopyMainFrame");
            wnd.showBossFrame(1);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.COPY_DRAGON_LEVEL].XMLContent, passName);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.COPY_DRAGON_LEVEL].Content, passName);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.COPY_DRAGON_LEVEL] = copyDragonLevel;
    //龙王宝藏最高关卡
    function copyDragonMax(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.COPY_DRAGON_MAX];
        var needTime = taskInfo.finish[taskFinishId.COPY_DRAGON_MAX];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("CopyMainFrame");
            wnd.showBossFrame(1);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.COPY_DRAGON_MAX].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.COPY_DRAGON_MAX].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.COPY_DRAGON_MAX] = copyDragonMax;
    //龙王宝藏打多少次　接到任务后统计数量
    function copyDragonNum(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.COPY_DRAGON_NUM];
        var needTime = taskInfo.finish[taskFinishId.COPY_DRAGON_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("CopyMainFrame");
            wnd.showBossFrame(1);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.COPY_DRAGON_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.COPY_DRAGON_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.COPY_DRAGON_NUM] = copyDragonNum;
    //龙王宝藏累星奖励领取多少次　接到任务后统计数量
    function copyDragonStarNum(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.COPY_DRAGON_START_NUM];
        var needTime = taskInfo.finish[taskFinishId.COPY_DRAGON_START_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("CopyMainFrame");
            wnd.showBossFrame(1);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.COPY_DRAGON_START_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.COPY_DRAGON_START_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.COPY_DRAGON_START_NUM] = copyDragonStarNum;
    //材料副本，完成指定副本索引
    function copyMaterialCount(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var fubenId = taskInfo.finish[taskFinishId.COPY_MATERIAL_COUNT];
        var fubenName = GameConfig.CopyMaterialConfig[fubenId].title;
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("longwang");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.COPY_MATERIAL_COUNT].XMLContent, fubenName);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.COPY_MATERIAL_COUNT].Content, fubenName);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.COPY_MATERIAL_COUNT] = copyMaterialCount;
    //材料副本打多少次　接到任务后统计数量
    function copyMaterialNum(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.COPY_MATERIAL_NUM];
        var needTime = taskInfo.finish[taskFinishId.COPY_MATERIAL_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("longwang");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.COPY_MATERIAL_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.COPY_MATERIAL_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.COPY_MATERIAL_NUM] = copyMaterialNum;
    //钟馗伏魔今日战斗次数
    function copyZhongKuiCount(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.COPY_ZHONGKUI_COUNT];
        var needTime = taskInfo.finish[taskFinishId.COPY_ZHONGKUI_COUNT];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("richang");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.COPY_ZHONGKUI_COUNT].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.COPY_ZHONGKUI_COUNT].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.COPY_ZHONGKUI_COUNT] = copyZhongKuiCount;
    //钟馗伏魔打多少次　接到任务后统计数量
    function copyZhongKuiNum(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.COPY_ZHONGKUI_NUM];
        var needTime = taskInfo.finish[taskFinishId.COPY_ZHONGKUI_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("richang");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.COPY_ZHONGKUI_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.COPY_ZHONGKUI_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.COPY_ZHONGKUI_NUM] = copyZhongKuiNum;
    //小雷音寺最高通关层数
    function copyThunderMax(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.COPY_THUNDER_MAX];
        var needTime = taskInfo.finish[taskFinishId.COPY_THUNDER_MAX];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("CopyMainFrame");
            wnd.showBossFrame(2);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.COPY_THUNDER_MAX].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.COPY_THUNDER_MAX].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.COPY_THUNDER_MAX] = copyThunderMax;
    //小雷音寺打多少次　接到任务后统计数量
    function copyThunderNum(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.COPY_THUNDER_NUM];
        var needTime = taskInfo.finish[taskFinishId.COPY_THUNDER_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            var wnd = WngMrg.getInstance().getWindow("CopyMainFrame");
            wnd.showBossFrame(2);
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.COPY_THUNDER_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.COPY_THUNDER_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.COPY_THUNDER_NUM] = copyThunderNum;
    //跨服组队，完成条件：组队进入副本次数达到指定次数完成条件
    function crossDressNum(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.COPY_TEAM_COMBAT_NUM];
        var needTime = taskInfo.finish[taskFinishId.COPY_TEAM_COMBAT_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("global");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.COPY_TEAM_COMBAT_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.COPY_TEAM_COMBAT_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.COPY_TEAM_COMBAT_NUM] = crossDressNum;
    //竞技场擂台比武，完成条件：当天累计比武次数达到指定次数完成任务
    function championNum(taskId, listener) {
        var taskInfo = TaskSystem.getInstance().getTask(taskId).getPropertyInfo();
        var curTime = taskInfo.data[taskFinishId.CHAMPION_NUM];
        var needTime = taskInfo.finish[taskFinishId.CHAMPION_NUM];
        var t = {};
        t.finish = false;
        t.taskId = taskId;
        function func() {
            ExecuteMainFrameFunction("jingjichang");
        }
        t.link = TaskExecutor.getInstance().getInteriorHandler(taskId, func);
        t.content = String.format(GameConfig.TaskTraceTips[taskFinishId.CHAMPION_NUM].XMLContent, curTime, needTime);
        t.planetxt = String.format(GameConfig.TaskTraceTips[taskFinishId.CHAMPION_NUM].Content, curTime, needTime);
        return listener.func.call(listener.this_index, t, listener.userData); //回调
    }
    TaskTraceSpace.TaskTrackHandler[taskFinishId.CHAMPION_NUM] = championNum;
})(TaskTraceSpace || (TaskTraceSpace = {}));
//# sourceMappingURL=TaskExecutor_TaskTraceHandler.js.map