// TypeScript file
function Task_ShowNpcDialogWithNpc(npcId) {
    FaceToHero(npcId);
    var dialog = TaskDialogue.getInstance();
    dialog.talkWithNpc(npcId);
}
function Task_ShowNpcDialogWithEntry(entryId) {
    var window = TaskDialogue.getInstance();
    window.talkWithNpc(-1, entryId);
}
////////////////////////////////////////////////////
function Chat_AddChannelMsg(channel, msg) {
    var packet = ChannelMsgPacket.newObj();
    packet.roleId = GetHeroProperty("id");
    packet.name = GetHeroProperty("name"); //name
    packet.channel = channel;
    packet.sexId = checkNull(GetHeroProperty("sexId"), 1);
    packet.data = msg;
    packet.vocation = GetHeroProperty("vocation");
    ChannelMrg.getInstance().addChannelMsg(channel, packet);
}
function UI_GetWindowByInfo(info) {
    var window = WngMrg.getInstance().getWindow(info.rootWindow);
    if (window) {
        return window.getWindowByInfo(info);
    }
    else {
        TLog.Error("UI_GetWindowByInfo can ! find Window %s ", info.rootWindow);
        return null;
    }
}
//# sourceMappingURL=Interface_UI.js.map