var globalInpueStatusList = {};
function SetGlobalInputStatus(status, key) {
    var setStatus = true;
    //TLog.Debug("SetGlobalInputStatus",size_t(globalInpueStatusList),setStatus)
    if (status) {
        delete globalInpueStatusList[key];
        for (var i in globalInpueStatusList) {
            var v = globalInpueStatusList[i];
            if (v == false) {
                setStatus = false;
                break;
            }
        }
    }
    else {
        globalInpueStatusList[key] = status;
        setStatus = false;
    }
    IGlobal.guiManager.setInputEnable(setStatus);
}
function WriteIntoFile(fileName, str, bReWrite) {
    IGlobal.setting.setRoleSetting(UserSetting.TYPE_STRING, fileName, str);
}
function ReadFromFile(fileName) {
    var readData = IGlobal.setting.getRoleSetting(UserSetting.TYPE_STRING, fileName, "");
    return readData;
}
//两种加入超链接的写法
//color.length|%s|描述文字XXX.length
//LinkSign +(%d);(%d+);(%d+);(.+) +LinkSign，第二种方法需要用到这个公共接口ContentParseLinkHandler
function ContentParseLinkHandler(linkContent, showColor) {
    var info = {};
    info.link = null;
    info.name = null;
    info.color = null;
    var _a = StringUtil.stringMatch(linkContent, /(\d);(\d+);(\d+);(.+)/), linkType = _a[0], playerId = _a[1], targetId = _a[2], content = _a[3];
    info.name = content;
    info.link = StringUtil.stringReplace(linkContent, " ", "-");
    info.color = showColor || "orange";
    if ((!playerId) || (!targetId) || (!content)) {
        return null;
    }
    return info;
}
//接上，针对第一种提供一种通用组合接口（主要是定义常用的用于统一奖励结构的解释）
function GenXMLStyleLinkContent(v, showColor) {
    var pstr = ""; //|1;entryid|		1物品；2伙伴
    var color = showColor || " #red";
    if (v[0] == "item") {
        if (!v[2] || v[2] <= 1) {
            pstr = color + "|1;" + v[1] + "|" + ItemSystem.getInstance().getItemName(v[1]);
        }
        else {
            pstr = color + "|1;" + v[1] + "|" + ItemSystem.getInstance().getItemName(v[1]) + "#rf*" + v[2];
        }
    }
    else if (v[0] == "rmb") {
        if (!v[1] || v[1] <= 1) {
            pstr = color + "|1;" + SpecailItemId.GOLD + "|" + ItemSystem.getInstance().getItemName(SpecailItemId.GOLD);
        }
        else {
            pstr = color + "|1;" + SpecailItemId.GOLD + "|" + ItemSystem.getInstance().getItemName(SpecailItemId.GOLD) + "#rf*" + v[1];
        }
    }
    else if (v[0] == "funs") {
        if (!v[1] || v[1] <= 1) {
            pstr = color + "|1;" + SpecailItemId.FUNDS + "|" + ItemSystem.getInstance().getItemName(SpecailItemId.FUNDS);
        }
        else {
            pstr = color + "|1;" + SpecailItemId.FUNDS + "|" + ItemSystem.getInstance().getItemName(SpecailItemId.FUNDS) + "#rf*" + v[1];
        }
    }
    else if (v[0] == "pet") {
        pstr = color + "|2;" + v[1] + "|" + PetSystem.getInstance().getPetName(v[1]) + "#rf*1";
    }
    return pstr;
}
function HandleXMLStyleHyperLink(link) {
    var _a = StringUtil.stringMatch(link, /(\d+);(\d+)/), ltype_ = _a[0], entryId = _a[1];
    var ltype = tonumber(ltype_) || 0;
    entryId = tonumber(entryId) || 0;
    if (ltype == 1) {
        ItemSystem.getInstance().showItemTipsByEntry(entryId);
    }
    else {
        PetSystem.getInstance().showPetTipsByEntry(entryId);
    }
}
function AddRdContent(rd, content, ft, color, dis, rffont, setBottom, addNew, linkShowColor) {
    if (!addNew) {
        rd.clear();
    }
    var font = {};
    font.no_change_font = true;
    font.defalut_font = ft;
    font.default_color = color || "white";
    font.link_parser = ContentParseLinkHandler; //默认第二种链接方式
    font.showColor = linkShowColor || "springgreen";
    rffont = rffont || "#rf";
    //content = string.gsub(content, "#rf", rffont)
    content = StringUtil.stringReplace(content, "#rf", rffont);
    if (dis != null) {
        rd.setRowDistance(dis);
    }
    else {
        rd.setRowDistance(0);
    }
    var xml = XmlConverter.parseText(content, font);
    rd.addXmlString(xml);
    //rd.showLastRow()
    // if (!setBottom) {
    // 	rd.ScrollToXY(0, 0, false)
    // }
}
//调整坐标
function AdjustRdContentViewH(rd, minH) {
    if (minH == null) {
        minH = 120;
    }
    var get_h = rd.getLogicHeight();
    if (get_h < minH) {
        get_h = minH;
    }
    else {
        get_h = get_h + 5;
    }
    rd.height = get_h;
    UiUtil.setWH(rd, rd.width, get_h);
    return get_h;
}
function AdjustRdContentViewW(rd, offW) {
    var w = rd.getLogicWidth() + (offW || 0);
    //UiUtil.setWH(rd, w, rd.height);
    rd.width = w;
}
//自动调整数据格式
//取小数点后指定位小数，如果小数部分刚好全为0则返回整数
function AdjustNumberFont(num, pointCount) {
    pointCount = pointCount;
    var str = String.format("%." + pointCount + "f", num);
    var result = StringUtil.stringMatch(str, /(\d+).(\d+)/);
    if (result == null) {
        return num;
    }
    var num1 = result[0], num2 = result[1];
    if (tonumber(num2) == 0) {
        return tonumber(num1);
    }
    else {
        return tonumber(str);
    }
}
function DrawNumberStringImage(bam, piefix, point, targetX, targetY, spaceX) {
    var parent = bam.parent;
    bam.beginDraw();
    var w = bam.drawNumberString(piefix, point, targetX || 0, targetY || 0, spaceX || 0);
    bam.endDraw();
    bam.x = (parent.width - w) / 2;
}
function IsFunctionOpen(func_bit) {
    var errantry = GetHeroProperty("errantry");
    if (errantry && bit.band(errantry, Math.pow(2, (func_bit - 1))) != 0) {
        return true;
    }
    else {
        return false;
    }
}
function SetRoleFunctionSetting(func_bit, isClose) {
    //TLog.Debug("SetRoleFunctionSetting",func_bit,isClose)
    // if (!table_isExsit(RoleFunctionSetting, func_bit)) {
    // 	return false
    // }
    var errantry = GuideSystem.getInstance().getFuncState();
    var changeType = 0;
    if (isClose) {
        errantry = StringUtil.changeBit(errantry, func_bit, "0");
    }
    else {
        //TLog.Debug("1111111111111111111", errantry, string.sub(errantry, func_bit, func_bit))
        if (StringUtil.getBit(errantry, func_bit) == "1") {
            return;
        }
        errantry = StringUtil.changeBit(errantry, func_bit, "1");
        changeType = 1;
    }
    GuideSystem.getInstance().setFuncState(errantry);
    var message = GetMessage(opCodes.C2G_ROLE_NEWBIE_CHANGE);
    message.errantry = func_bit;
    message.changeType = changeType;
    SendGameMessage(message);
    return true;
}
//品质底框
// function GetActorQualityImage(entryId, breakLevel) {
// 	let imageName = ""
// 	if (GameConfig.ProfessionConfig[entryId]) {
// 		imageName = ProfessionSystem.getInstance().getProfessionQualityImage(entryId)
// 	} else {
// 		imageName = PetSystem.getInstance().getPetQualityName(breakLevel)
// 	}
// 	return imageName
// }
//获取名称品质图片
// function GetQualityNameImage(entryId, breakLevel) {
// 	let imageName = ""
// 	// if (GameConfig.ProfessionConfig[entryId]) {
// 	// 	imageName = ProfessionSystem.getInstance().getProfessionQualityBG(entryId)
// 	// } else {
// 		imageName = PetSystem.getInstance().getPetQualityNameBG(breakLevel)
// 	//}
// 	return imageName
// }
//战斗中的半身像
// function GetActorZhanDouBust(entryId, sex?, breakLevel?, qualityLevel?) {
// 	let bust = _GetActorBust(entryId, sex, breakLevel, qualityLevel)
// 	return "zhanDou_" + bust
// }
//战斗中的小半身像
// function GetActorZhanDouXiaoBust(entryId, sex?, breakLevel?) {
// 	let bust = _GetActorBust(entryId, sex, breakLevel)
// 	return "zhanDou_xiaoTu_" + bust
// }
// function GetActorBust(entryId, sex?, breakLevel?, qualityLevel?) {
// 	let bust = _GetActorBust(entryId, sex, breakLevel, qualityLevel)
// 	return "bust_" + bust;
// }
//半身像
// function _GetActorBust(entryId, sex?, breakLevel?, qualityLevel?) {
// 	let bust = 3001
// 	if (GameConfig.PetConfig[entryId]) {
// 		breakLevel = breakLevel || 0
// 		qualityLevel = qualityLevel || 0
// 		if (GameConfig.PetModelConfig[entryId] && GameConfig.PetModelConfig[entryId][breakLevel]) {
// 			bust = GameConfig.PetModelConfig[entryId][breakLevel][qualityLevel].bust
// 		}
// 	} else if (GameConfig.MonsterConfig[entryId]) {
// 		bust = GameConfig.MonsterConfig[entryId].bust
// 	} else if (GameConfig.ProfessionConfig[entryId]) {
// 		sex = checkNull(sex, 1)
// 		bust = GameConfig.ProfessionModelConfig[entryId][sex].bust
// 	}
// 	return bust
// }
//下一帧执行
function DelayEvecuteFunc(delay, func, thisobj, param) {
    var timer = null;
    function tick(de) {
        if (timer) {
            KillTimer(timer);
            timer = null;
        }
        return func.call(thisobj, param);
    }
    timer = SetTimer(tick, thisobj, delay);
}
//按事件延迟执行
function DelayEventEvecuteFunc(event, func, obj, param) {
    //let callback = null
    var _this = {};
    function callback(args) {
        UnRegisterEvent(event, callback, _this);
        if (PrecedureManager.getInstance().getCurrentPrecedureId() != PRECEDURE_GAME) {
            return;
        }
        return func.call(obj, args, param);
    }
    RegisterEvent(event, callback, _this);
}
//获得离线多久的字符串
function GetLastLogoutTimeStr(logoutTime) {
    if (logoutTime < 0) {
        return Localize_cns("CLUB_TXT49");
    }
    var serverTime = GetServerTime();
    var ONE_HOUR_SEC = 3600; //一个小时
    var ONE_DAY_SEC = 86400; //一天时间
    var diffTime = serverTime - logoutTime;
    if (diffTime < 0) {
        return Localize_cns("CLUB_TXT49");
    }
    else {
        var str = "";
        if (diffTime < ONE_HOUR_SEC) {
            str = String.format(Localize_cns("CLUB_TXT46"), Math.floor(diffTime / 60));
        }
        else if (diffTime < ONE_DAY_SEC) {
            str = String.format(Localize_cns("CLUB_TXT47"), Math.floor(diffTime / ONE_HOUR_SEC));
        }
        else {
            str = String.format(Localize_cns("CLUB_TXT48"), Math.floor(diffTime / ONE_DAY_SEC));
        }
        return str;
    }
}
//查看录像
function GetFightVideo(videoId, roleId) {
    FireEvent(EventDefine.MSG_WAIT_BEGIN, null);
    var message = GetMessage(opCodes.C2G_FIGHT_CHAMPION_VIEDO);
    message.viedoID = videoId;
    message.roleId = roleId;
    SendGameMessage(message);
}
//查看跨服录像
function GetGlobalFightVideo(videoId, roleId) {
    //FireEvent(EventDefine.COMBAT_FIGHT_VIDEO_APPLY, null)
    FireEvent(EventDefine.MSG_WAIT_BEGIN, null);
    var message = GetMessage(opCodes.C2G_FIGHT_GLOBAL_VIEDO);
    message.viedoID = videoId;
    message.roleId = roleId;
    SendGameMessage(message);
}
function RefreshNearActor() {
    var message = GetMessage(opCodes.C2G_ROLE_REFRESH_NPC);
    SendGameMessage(message);
}
function ExecuteNoticeCmdLink(link) {
    ////6;1;世界BOSS//
    //非生活场景返回
    if (StateManager.getInstance().GetCurrentStateType() != state_type.LIVE_BASE_STATE
        || IsInGlobalActvity() != null) {
        return;
    }
    var _a = StringUtil.stringMatch(link, /(\d+);(\d+);(.+)/), linkType = _a[0], wndIndex = _a[1], content = _a[2];
    if (!linkType || !wndIndex || !content) {
        return null;
    }
    linkType = tonumber(linkType);
    wndIndex = tonumber(wndIndex);
    if (wndIndex == wndToJump.FINAL_DRAGON) {
        ExecuteMainFrameFunction("boss");
    }
    else if (wndIndex == wndToJump.MESS_WORLD) {
        //ExecuteMainFrameFunction("shengdi")
    }
    else if (wndIndex == wndToJump.QRENA) {
        ExecuteMainFrameFunction("jingjichang");
    }
    else if (wndIndex == wndToJump.SKY_TOWER) {
        ExecuteMainFrameFunction("shilian");
    }
    else if (wndIndex == wndToJump.PET_RECRUIT) {
        //MsgSystem.addTagTips(Localize_cns("PROFE_NOT_OPEN_TXT"))
    }
    else if (wndIndex == wndToJump.NOBLE_EXAMINE) {
        ExecuteMainFrameFunction("dati");
    }
}
function IsClientAutoShowUI() {
    if (StateManager.getInstance().GetCurrentStateType() != state_type.LIVE_BASE_STATE) {
        return false;
    }
    if (IsInGlobalActvity() != null) {
        return false;
    }
    if (GuideSystem.getInstance().isCanClientAutoUI() && FightSystem.getInstance().isFight() == false) {
        return true;
    }
    return false;
}
// function IsHeroInfo(info){
// 	if(info == null ){
// 		return false
// 	}
// 	return info.id == GetHeroProperty("id")
// }
// function GetActorInfoByEntry(entryId){
// 	// if( entryId <= 0)
// 	// 	return null;
// 	let actorInfo = null
// 	if(GameConfig.PetConfig[entryId] ){
// 		 actorInfo = PetSystem.getInstance().getPetInfoEntry(entryId)
// 	}else{
// 		actorInfo = GetHeroPropertyInfo()
// 	}
// 	return actorInfo
// }
function ChatWithPlayer(playerId, playerName) {
    var newStrangeInfo = null;
    var friendInfo = FriendSystem.getInstance().getFriendInfo(playerId);
    if (friendInfo == null) {
        //尝试找周围的
        var player = ActorManager.getInstance().getPlayer(playerId);
        if (player) {
            var playerInfo = player.getPropertyInfo();
            newStrangeInfo = StrangerInfo.newObj(playerInfo.id, playerInfo.name, playerInfo.vocation, "", playerInfo.sexId, playerInfo.VIP_level, playerInfo.level);
        }
        if (newStrangeInfo == null) {
            var msgPacket = ChannelMrg.getInstance().findMsgPacket(playerId);
            if (msgPacket) {
                newStrangeInfo = StrangerInfo.newObj(msgPacket.roleId, msgPacket.name, msgPacket.vocation, msgPacket.icon, msgPacket.sexId, msgPacket.VipLevel, msgPacket.level);
                if (msgPacket.offlineChat) {
                    newStrangeInfo.isOnline = 0;
                }
            }
        }
    }
    if (newStrangeInfo) {
        FriendSystem.getInstance().addChatStranger(newStrangeInfo);
    }
    var window = WngMrg.getInstance().getWindow("ChatInChannelFrame");
    window.chatWithPlayer(playerId, playerName);
}
// function EnterRoleActivitySpace(actIndex){
// 	let message = GetMessage(opCodes.C2G_ROLE_ENTER_SPACE)
// 	message.actIndex = actIndex
// 	SendGameMessage(message)
// }
// function LeaveRoleActivitySpace(){
// 	let message = GetMessage(opCodes.C2G_ROLE_LEAVE_SPACE)
// 	SendGameMessage(message)
// }
function ExecuteMainFrameLink(_type, _index) {
    if (_type == "enterclubmap") {
        var a = GetActivity(ActivityDefine.ClubMap);
        a.requestStart();
    }
    else {
        if (_index == null) {
            ExecuteMainFrameFunction(_type);
        }
        else {
            var window_1 = WngMrg.getInstance().getWindow(_type);
            window_1.hideWnd();
            window_1.showWithIndex(_index);
        }
    }
}
//# sourceMappingURL=Interface_LogicApi.js.map