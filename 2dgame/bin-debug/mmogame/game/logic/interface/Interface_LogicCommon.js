//战斗中（挂机不算）
function IsFightState() {
    var fightSystem = FightSystem.getInstance();
    if (fightSystem.isFight() == false)
        return false;
    var _a = fightSystem.getCurFightType(), fightType = _a[0], _ = _a[1];
    if (fightType == opFightResultType.PATROL)
        return false;
    return true;
}
//检查战斗操作，弹出提示
function CheckFightState() {
    if (IsFightState()) {
        MsgSystem.addTagTips(Localize_cns("FIGHT_TXT10"));
        return true;
    }
    return false;
}
//立刻结束战斗(如果是非挂机战斗，不能结束)
function CheckEndFightNow() {
    if (CheckFightState()) {
        return false;
    }
    var fightSystem = FightSystem.getInstance();
    if (fightSystem.isFight() == true) {
        FightSystem.getInstance().clearUpFightState();
    }
    ChangePatrolState(false); //停止巡逻
    return true;
}
//# sourceMappingURL=Interface_LogicCommon.js.map