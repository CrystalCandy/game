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
    var FightInstructFrame = (function (_super) {
        __extends(FightInstructFrame, _super);
        function FightInstructFrame() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FightInstructFrame.prototype.initObj = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            this.mLayoutPaths = ["layouts/tool/FightInstructLayout.exml"];
            this.mFightEditor = params[0];
        };
        FightInstructFrame.prototype.onLoad = function () {
            this.mLayoutNode.skinName = this.mLayoutPaths[0];
            this.mLayoutNode.right = 0;
            this.mLayoutNode.top = 0;
            this.mLayoutNode.setCanDrag(true);
            var elemInfo = [
                (_a = {}, _a["name"] = "btn_refresh", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onRefresh, _a),
                (_b = {}, _b["name"] = "btn_casterMode", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onCasterMode, _b),
                (_c = {}, _c["name"] = "btn_exchangeSide", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onExchangeSide, _c),
                (_d = {}, _d["name"] = "combox_attacktype", _d["title"] = null, _d["event_name"] = gui.ComboBox.onClick, _d["fun_index"] = this.onAttackTypeChange, _d),
                (_e = {}, _e["name"] = "combox_seattype", _e["title"] = null, _e["event_name"] = gui.ComboBox.onClick, _e["fun_index"] = this.onSeatTypeChange, _e),
                (_f = {}, _f["name"] = "combox_modeltype", _f["title"] = null, _f["event_name"] = gui.ComboBox.onClick, _f["fun_index"] = this.onModelTypeChange, _f),
                (_g = {}, _g["name"] = "combox_posttype", _g["title"] = null, _g["event_name"] = gui.ComboBox.onClick, _g["fun_index"] = this.onPosTypeChange, _g),
            ];
            UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
            this.initCombox(this.mElemList["combox_attacktype"]);
            this.initCombox(this.mElemList["combox_seattype"]);
            this.initCombox(this.mElemList["combox_modeltype"]);
            this.initCombox(this.mElemList["combox_posttype"]);
            this.initAttackTypeCombox();
            this.initSeatTypeCombox();
            this.initModelTypeCombox();
            this.initPostTypeCombox();
            var _a, _b, _c, _d, _e, _f, _g;
        };
        FightInstructFrame.prototype.initCombox = function (cb) {
            //设置标题
            cb.setTitleHeight(20);
            cb.setTitleBackground("titleBackground");
            cb.setTitleFontSize(20);
            cb.setItemWidth(cb.width);
            cb.setItemHeight(25);
            cb.setItemFontSize(18);
        };
        FightInstructFrame.prototype.initAttackTypeCombox = function () {
            var data = [];
            JsUtil.objectForEach(TEST_ATTACK_TYPE, function (v, i) {
                data.push({ bg: "itemBg4", content: i });
            });
            var cb = this.mElemList["combox_attacktype"];
            cb.data = data;
            cb.setTitle(Localize_cns("FIGHT_ONCE_ATTACK"));
            this.mFightEditor.setShowResult(Localize_cns("FIGHT_ONCE_ATTACK"));
        };
        FightInstructFrame.prototype.initSeatTypeCombox = function () {
            var data = [
                { bg: "itemBg4", content: Localize_cns("FIGHT_SEAT_WHOLE") },
                { bg: "itemBg4", content: Localize_cns("FIGHT_SEAT_FRONT_FRONT") },
                { bg: "itemBg4", content: Localize_cns("FIGHT_SEAT_BACK_BACK") },
            ];
            var cb = this.mElemList["combox_seattype"];
            cb.data = data;
            cb.setTitle(data[0].content);
        };
        FightInstructFrame.prototype.initModelTypeCombox = function () {
            //角色表
            var sortRoleList = [];
            JsUtil.objectForEach(GameConfig.ProfessionModelConfig, function (list) {
                JsUtil.objectForEach(list, function (v) {
                    var name = "undefine";
                    if (GameConfig.ActorRoleConfig[v.entryId]) {
                        name = GameConfig.ActorRoleConfig[v.entryId].name;
                    }
                    sortRoleList.push({ bg: "itemBg4", content: v.entryId + "_" + name, id: v.entryId });
                });
            });
            sortRoleList.sort(function (a, b) {
                return a.id - b.id;
            });
            //部下表
            var sortPetList = [];
            JsUtil.objectForEach(GameConfig.PetConfig, function (v) {
                sortPetList.push({ bg: "itemBg4", content: v.Id + "_" + v.name, id: v.Id });
            });
            sortPetList.sort(function (a, b) {
                return a.id - b.id;
            });
            //怪物表
            var sortMonsterList = [];
            JsUtil.objectForEach(GameConfig.MonsterScopeConfig, function (v) {
                sortMonsterList.push({ bg: "itemBg4", content: v.Id + "_" + v.Name, id: v.Id });
            });
            sortMonsterList.sort(function (a, b) {
                return a.id - b.id;
            });
            //仙侣表
            var sortXianLvList = [];
            JsUtil.objectForEach(GameConfig.ActorXianLvConfig, function (v) {
                sortXianLvList.push({ bg: "itemBg4", content: v.Id + "_" + v.Name, id: v.Id });
            });
            sortXianLvList.sort(function (a, b) {
                return a.id - b.id;
            });
            var data = sortRoleList.concat(sortPetList, sortMonsterList, sortXianLvList);
            var cb = this.mElemList["combox_modeltype"];
            cb.data = data;
            cb.setTitle("模型选择");
        };
        FightInstructFrame.prototype.initPostTypeCombox = function () {
            var data = [
                { bg: "itemBg4", content: 1 },
                { bg: "itemBg4", content: 2 },
                { bg: "itemBg4", content: 3 },
                { bg: "itemBg4", content: 4 },
                { bg: "itemBg4", content: 5 },
                { bg: "itemBg4", content: 6 },
                { bg: "itemBg4", content: FUNNAL_ACTOR_POS },
            ];
            var cb = this.mElemList["combox_posttype"];
            cb.data = data;
            cb.setTitle("位置选择");
        };
        FightInstructFrame.prototype.onUnLoad = function () {
        };
        FightInstructFrame.prototype.onShow = function () {
            this.mLayoutNode.visible = true;
        };
        FightInstructFrame.prototype.onHide = function () {
            this.mLayoutNode.visible = false;
        };
        FightInstructFrame.prototype.onRefresh = function () {
            this.mFightEditor.refreshCombat();
        };
        FightInstructFrame.prototype.onCasterMode = function () {
            if (this.mFightEditor.heroFlag == true) {
                this.mFightEditor.heroFlag = false;
                this.mElemList["btn_casterMode"].label = "翅膀发动";
            }
            else {
                this.mFightEditor.heroFlag = true;
                this.mElemList["btn_casterMode"].label = "角色发动";
            }
        };
        FightInstructFrame.prototype.onExchangeSide = function () {
            //交换位置
            if (TOOL_MY_SIDE == fightSide.FIGHT_LEFT) {
                TOOL_MY_SIDE = fightSide.FIGHT_RIGHT;
                TOOL_ENEMEY_SIDE = fightSide.FIGHT_LEFT;
            }
            else {
                TOOL_MY_SIDE = fightSide.FIGHT_LEFT;
                TOOL_ENEMEY_SIDE = fightSide.FIGHT_RIGHT;
            }
            FightResultSpace.testFighterList.forEach(function (v) {
                if (v.side == fightSide.FIGHT_LEFT) {
                    v.side = fightSide.FIGHT_RIGHT;
                }
                else {
                    v.side = fightSide.FIGHT_LEFT;
                }
            });
            this.mFightEditor.refreshCombat();
        };
        FightInstructFrame.prototype.onAttackTypeChange = function (event) {
            var cb = this.mElemList["combox_attacktype"];
            var data = cb.data;
            cb.setTitle(data[event.data.itemIndex].content);
            cb.hide();
            this.mFightEditor.setShowResult(data[event.data.itemIndex].content);
        };
        FightInstructFrame.prototype.onSeatTypeChange = function (event) {
            var cb = this.mElemList["combox_seattype"];
            var data = cb.data;
            cb.setTitle(data[event.data.itemIndex].content);
            cb.hide();
            this.mFightEditor.setSeatType(data[event.data.itemIndex].content);
            this.mFightEditor.refreshCombat();
        };
        FightInstructFrame.prototype.onModelTypeChange = function (event) {
            var cb = this.mElemList["combox_modeltype"];
            var data = cb.data;
            var content = data[event.data.itemIndex].content;
            cb.setTitle(content);
            cb.hide();
            var modelEntryStr = StringUtil.stringMatch(content, /(\d+)_.+/)[0];
            var modelEntry = tonumber(modelEntryStr);
            this.mFightEditor.setCasterEntry(modelEntry);
            this.mFightEditor.refreshCombat();
        };
        FightInstructFrame.prototype.onPosTypeChange = function (event) {
            var cb = this.mElemList["combox_posttype"];
            var data = cb.data;
            cb.setTitle(data[event.data.itemIndex].content);
            cb.hide();
            this.mFightEditor.setCasterPos(data[event.data.itemIndex].content);
            this.mFightEditor.refreshCombat();
        };
        return FightInstructFrame;
    }(BaseWnd));
    tool.FightInstructFrame = FightInstructFrame;
    __reflect(FightInstructFrame.prototype, "tool.FightInstructFrame");
})(tool || (tool = {}));
//# sourceMappingURL=FightInstructFrame.js.map