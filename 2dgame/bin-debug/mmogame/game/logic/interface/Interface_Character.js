// TypeScript file
function GetStringSplitBySchool(content, schoolId, count) {
    return content;
}
function LookAtHero() {
    var _a = MovieSystem.getInstance().isPlayingMovie(), isMovie = _a[0], _ = _a[1];
    if (FightSystem.getInstance().isFight() == false && isMovie == false) {
        var point = GetHero().getMapXY();
        SceneManager.getInstance().lookAtCenter(point.x, point.y);
    }
}
// 人物系统接口
function IsPlayer(actor) {
    if (actor.getActorType() != actor_Type.ACTOR_TYPE_PLAYER) {
        return false;
    }
    var id = actor.getId();
    var findActor = ActorManager.getInstance().getPlayer(id);
    if (!findActor) {
        return false;
    }
    return true;
}
function FaceToHero(npcId) {
    var npc = ActorManager.getInstance().getNpc(npcId);
    if (npc) {
        var heroPos = GetHero().getCellXY();
        var npcPos = npc.getCellXY();
        var entryId = npc.getEntryId();
        if (GameConfig.npcConfig[entryId]["type"] == 1) {
            return;
        }
        if (heroPos.x < npcPos.x) {
            npc.setDir(ActorDirMap.Left);
        }
        else {
            npc.setDir(ActorDirMap.Right);
        }
    }
}
// function GetActorProperty(actorInfo, fieldIndex) {
//     let value = 0
//     if (actorInfo.classname == "PetInfo") {
//         value = actorInfo.getProperty(pet_objectFiled[fieldIndex])
//     } else if (actorInfo.classname == "HeroInfo" || actorInfo.classname == "PlayerInfo") {
//         value = actorInfo.getProperty(role_objectFiled[fieldIndex])
//     }
//     return value
// }
function GetPlayerInfo(playerId) {
    var wnd = WngMrg.getInstance().getWindow("PlayerInfoFrame");
    wnd.loadWnd();
    wnd.setPlayerId(playerId);
    //只申请一次
    var message = GetMessage(opCodes.C2G_ROLE_DETAILED_INFO);
    message.id = playerId;
    message.checkType = BattleQueueType.Campaign;
    SendGameMessage(message);
}
function RandomRobotName() {
    var xing = "", ming = "";
    var count = size_t(GameConfig.nameConfig);
    var randomIndex = MathUtil.random(1, count);
    xing = GameConfig.nameConfig[randomIndex].xing;
    randomIndex = MathUtil.random(1, count);
    ming = GameConfig.nameConfig[randomIndex].nanming;
    return xing + ming;
}
//# sourceMappingURL=Interface_Character.js.map