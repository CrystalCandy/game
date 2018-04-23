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
var tool;
(function (tool) {
    var FightEditor = (function (_super) {
        __extends(FightEditor, _super);
        function FightEditor() {
            var _this = _super.call(this) || this;
            //--不显示主UI
            WngMrg.getInstance().setShowStateWindow(false);
            egret.TextField.default_size = 20;
            return _this;
        }
        FightEditor.prototype.onEnterGame = function () {
            this.casterPos = 1;
            this.heroFlag = true;
            this.showResultName = Localize_cns("FIGHT_ONCE_ATTACK");
            initFightResultConfig();
            initFightTooConfig();
            //战斗开始，添加角色
            this.refreshCombat();
            this.triggerEditor = tool.FightTriggerFrame.newObj(this);
            this.triggerEditor.showWnd();
            this.instructEditor = tool.FightInstructFrame.newObj(this);
            this.instructEditor.showWnd();
            this.actionEditor = tool.FightActionFrame.newObj(this);
            //this.actionEditor.showWnd()
            this.effectEditor = tool.FightEffectFrame.newObj(this);
            //this.effectEditor.showWnd();
            MapSystem.getInstance().enterMap(50014, 100, 100);
        };
        FightEditor.prototype.testSkillShow = function (skillShow) {
            FightSystem.getInstance().getConfigSystem().readActionConfig(skillShow);
            FightSystem.getInstance().getShowSystem().onClear();
            var result_list = TEST_ATTACK_TYPE[this.showResultName]; //or TEST_ATTACK_TYPE[varize_cns["FIGHT_ONCE_ATTACK"]] 
            TLog.Debug(this.showResultName, "cccccccccccccc");
            //for _, result in ipairs(result_list) do
            for (var i = 0; i < result_list.length; i++) {
                var result = result_list[i];
                var tempResult = JsUtil.objectCopy(result);
                tempResult.spellId = skillShow.index;
                if (this.seatType) {
                    //bit.bor(tempResult.targetList)
                    var pos = SeatMap[this.seatType][0];
                    tempResult.targetList = bit.bor(tempResult.targetList, Math.pow(2, pos - 1));
                    //for _, power in ipairs(tempResult.fightPowers) do
                    for (var j = 0; j < tempResult.fightPowers.length; j++) {
                        var power = tempResult.fightPowers[j];
                        var actor = GetFightActorByPos(TOOL_ENEMEY_SIDE, pos);
                        power.target = actor.getCombatId();
                    }
                }
                if (this.heroFlag == true) {
                    var actor = GetFightActorByPos(TOOL_MY_SIDE, this.casterPos);
                    if (actor) {
                        tempResult.caster = actor.getCombatId();
                    }
                }
                else {
                    tempResult.caster = FIGHT_FUNNAL_ID[TOOL_MY_SIDE];
                }
                FightSystem.getInstance().addResult(tempResult);
            }
        };
        FightEditor.prototype.refreshCombat = function () {
            var figherList = this.getToolFightList();
            FightSystem.getInstance().endFight();
            var timer = null;
            function tick(delay) {
                //再开始战斗
                FightSystem.getInstance().beginFight();
                FightSystem.getInstance().addFighterList(figherList);
                if (timer) {
                    KillTimer(timer);
                    timer = null;
                }
            }
            timer = SetTimer(tick, this, 1, false);
        };
        FightEditor.prototype.setShowResult = function (resultName) {
            this.showResultName = resultName;
        };
        FightEditor.prototype.setSeatType = function (seatType) {
            this.seatType = seatType;
        };
        FightEditor.prototype.setCasterEntry = function (entryId) {
            this.casterEntry = entryId;
        };
        FightEditor.prototype.setCasterPos = function (pos) {
            this.casterPos = pos;
        };
        FightEditor.prototype.getToolFightList = function () {
            var _this = this;
            var index = 0;
            var tempFighterList = JsUtil.objectCopy(FightResultSpace.testFighterList);
            var fighterList = [];
            //设置敌方位置
            if (this.seatType) {
                //for i, v in pairs(tempFighterList) do
                tempFighterList.forEach(function (v) {
                    if (v.side == TOOL_ENEMEY_SIDE) {
                        if (SeatMap[_this.seatType][index]) {
                            v.pos = SeatMap[_this.seatType][index];
                            index = index + 1;
                        }
                    }
                });
            } //
            //for _, v in pairs(tempFighterList) do
            tempFighterList.forEach(function (v) {
                if (v.side == TOOL_MY_SIDE) {
                    if (v.pos == _this.casterPos || v.pos == FUNNAL_ACTOR_POS) {
                        //table.insert(fighterList, v)
                        fighterList.push(v);
                    }
                }
                else {
                    fighterList.push(v);
                }
            });
            //设置自方模型
            if (this.casterEntry) {
                //for i, v in pairs(fighterList) do
                fighterList.forEach(function (v) {
                    if (v.side == TOOL_MY_SIDE) {
                        v.entry = _this.casterEntry;
                        //v.type_id = objectType.OBJECT_TYPE_PET
                        if (GameConfig.MonsterScopeConfig[_this.casterEntry]) {
                            v.entry = 100101;
                            v.type_id = objectType.OBJECT_TYPE_MONSTER;
                            v.image = _this.casterEntry;
                        }
                        else if (GameConfig.ActorXianLvConfig[_this.casterEntry]) {
                            v.type_id = objectType.OBJECT_TYPE_MONSTER;
                        }
                        else if (GameConfig.PetConfig[_this.casterEntry]) {
                            v.type_id = objectType.OBJECT_TYPE_PET;
                        }
                        else if (GameConfig.ActorRoleConfig[_this.casterEntry]) {
                            v.type_id = objectType.OBJECT_TYPE_PLAYER;
                        }
                    }
                });
            }
            return fighterList;
        };
        return FightEditor;
    }(tool.ToolEnterMap));
    tool.FightEditor = FightEditor;
    __reflect(FightEditor.prototype, "tool.FightEditor");
})(tool || (tool = {}));
//# sourceMappingURL=FightEditor.js.map