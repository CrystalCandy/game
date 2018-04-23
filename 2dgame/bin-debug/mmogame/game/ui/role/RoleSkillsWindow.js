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
var RoleSkillsWindow = (function (_super) {
    __extends(RoleSkillsWindow, _super);
    function RoleSkillsWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoleSkillsWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    RoleSkillsWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_S_onekeyUp", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onOneKeyClick, _a),
            (_b = {}, _b["name"] = "btn_S_Up", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onUpClick, _b),
            (_c = {}, _c["name"] = "btn_skillSetting", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onSkillsSettingClick, _c),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.select = -1;
        this.mElemList["rd_S_lvUp"].setAlignFlag(gui.Flag.H_CENTER);
        this.mElemList["rd_S_upGrade"].setAlignFlag(gui.Flag.H_CENTER);
        this.mElemList["label_skillname"].textColor = "black";
        this.mElemList["label_skillInstruction"].textColor = "black";
        var _a, _b, _c;
    };
    RoleSkillsWindow.prototype.onUnLoad = function () {
    };
    RoleSkillsWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.ACTOR_ROLE_UPDATE, this.onRefresh, this);
        this.mElemList["group_skills"].visible = true;
        this.mElemList["label_wndName"].text = Localize_cns("ROLE_TXT12");
        this.onRefresh();
    };
    RoleSkillsWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ACTOR_ROLE_UPDATE, this.onRefresh, this);
        this.mElemList["group_skills"].visible = false;
    };
    RoleSkillsWindow.prototype.onRefresh = function () {
        var info = RoleSystem.getInstance().getRecvList();
        if (size_t(info) == 0)
            return;
        this.levelList = info["skilllevellist"];
        var entryId = RoleSystem.getInstance().getRoleInfo("entryid"); //10001
        this.skillList = GameConfig.ActorRoleConfig[entryId].skill;
        this.onInitSkillItem();
        if (this.select == -1)
            this.select = 1;
        this.onShowItemDes(this.skillList[this.select], this.levelList[this.select - 1], this.select);
        var count = this.onCountList(this.levelList);
        var manji = true;
        var level = RoleSystem.getInstance().getRoleInfo("stage");
        var toMoney = 0;
        for (var i = 0; i < count; i++) {
            var temp = this.levelList[i];
            if (temp < level) {
                manji = false;
            }
            toMoney = toMoney + GameConfig.FunSpendMoneyItemConfig["HeroSkill"][temp].money;
        }
        var unitType = GameConfig.FunSpendMoneyItemConfig["HeroSkill"][1].moneyunit;
        var str1 = GetMoneyIcon(unitType) + String.format(Localize_cns("ROLE_TXT30"), toMoney);
        if (manji == true) {
            str1 = GetMoneyIcon(unitType) + Localize_cns("ROLE_TXT31");
        }
        AddRdContent(this.mElemList["rd_S_upGrade"], str1, "ht_24_cc", "ublack");
    };
    RoleSkillsWindow.prototype.onInitSkillItem = function () {
        var list = GameConfig.ActorRoleSkillConfig;
        var count = size_t(this.levelList);
        var skillList = this.skillList;
        for (var i = 1; i <= 8; i++) {
            var skillName = Localize_cns("ROLE_TXT21");
            var name_1 = "skillItem";
            if (!this.mElemList[name_1 + "skillBox" + i]) {
                this.mElemList[name_1 + "skillBox" + i] = UISkillBox.newObj(this.mLayoutNode, name_1 + "skillBox" + i, 17, 17, this.mElemList["skill" + i]);
                var mElemInfo = [
                    (_a = {}, _a["index_type"] = eui.Image, _a["name"] = name_1 + "name_bg" + i, _a["image"] = "ty_textDi05", _a["x"] = 3, _a["y"] = 116, _a["w"] = 0, _a["h"] = 0, _a["event_name"] = null, _a["fun_index"] = null, _a["messageFlag"] = true, _a),
                    (_b = {}, _b["index_type"] = eui.Label, _b["name"] = name_1 + "_name" + i, _b["parent"] = name_1 + "name_bg" + i, _b["title"] = skillName, _b["font"] = "ht_24_cc_stroke", _b["image"] = null, _b["color"] = gui.Color.white, _b["x"] = 0, _b["y"] = 0, _b["w"] = 127, _b["h"] = 40, _b["messageFlag"] = true, _b),
                    (_c = {}, _c["index_type"] = gui.Grid9Image, _c["name"] = name_1 + "_lv_bg" + i, _c["parent"] = name_1 + "_bg" + i, _c["title"] = "", _c["image"] = "ty_textDi01", _c["color"] = gui.Color.white, _c["x"] = 51, _c["y"] = 100, _c["w"] = 30, _c["h"] = 20, _c["messageFlag"] = true, _c),
                    (_d = {}, _d["index_type"] = eui.Label, _d["name"] = name_1 + "_lv" + i, _d["parent"] = name_1 + "_lv_bg" + i, _d["title"] = "", _d["font"] = "ht_20_cc", _d["image"] = null, _d["color"] = gui.Color.white, _d["x"] = 0, _d["y"] = 0, _d["w"] = 30, _d["h"] = 20, _d["messageFlag"] = true, _d),
                ];
                UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, this.mElemList["skill" + i]);
                //	this.mElemList[name + "_select" + i].visible = false;
            }
            if (skillList[i - 1] && this.levelList[i - 1] != null) {
                this.mElemList[name_1 + "skillBox" + i].updateRoleSkill(skillList[i - 1], this.levelList[i - 1]);
                this.mElemList[name_1 + "skillBox" + i].setTipsListner(this.onShowItemDes, this, i);
                this.mElemList[name_1 + "_lv" + i].text = tostring(this.levelList[i - 1]);
                this.mElemList[name_1 + "_lv_bg" + i].visible = true;
                this.mElemList[name_1 + "_lv" + i].visible = true;
                var id = skillList[i - 1];
                skillName = SkillSystem.getInstance().getSkillName(id);
                this.mElemList[name_1 + "_name" + i].text = skillName;
            }
            else {
                this.mElemList[name_1 + "skillBox" + i].lock();
                this.mElemList[name_1 + "_lv_bg" + i].visible = false;
                this.mElemList[name_1 + "_lv" + i].visible = false;
                if (skillList[i - 1]) {
                    var config = elemSkillLoopOptions[cellOptionsIndex.HeroSkill]["UnlockLevel"];
                    this.mElemList[name_1 + "_name" + i].text = config[i - 1] + Localize_cns("ROLE_LEVEL_OPEN");
                }
            }
        }
        var _a, _b, _c, _d;
    };
    RoleSkillsWindow.prototype.onShowItemDes = function (skillId, skillLv, index) {
        var id = skillId;
        var list = GameConfig.ActorRoleSkillConfig[id];
        this.select = index;
        if (list) {
            //label_skillname   label_skillInstruction
            var str_1 = String.format(Localize_cns("ROLE_TXT34"), this.levelList[index - 1]);
            var name_2 = SkillSystem.getInstance().getSkillName(skillId) + " " + str_1;
            this.mElemList["label_skillname"].text = name_2;
            var type_1 = list.effects[0][0];
            this.mElemList["label_skillInstruction"].text = SkillSystem.getInstance().getSkillDes(skillId); //skillLv)
        }
        var name = "skillItem";
        for (var i = 1; i <= size_t(this.levelList); i++) {
            this.mElemList[name + "skillBox" + i].select(false);
        }
        this.mElemList[name + "skillBox" + index].select(true);
        var upSpend = GameConfig.FunSpendMoneyItemConfig["HeroSkill"];
        var money = upSpend[skillLv].money;
        var unitType = upSpend[skillLv].moneyunit;
        var str = GetMoneyIcon(unitType) + String.format(Localize_cns("ROLE_TXT30"), money);
        AddRdContent(this.mElemList["rd_S_lvUp"], str, "ht_24_cc");
    };
    RoleSkillsWindow.prototype.onCountList = function (list) {
        var count = 0;
        for (var i = 0; i < size_t(list); i++) {
            if (list[i] != 0) {
                count++;
            }
        }
        return count;
    };
    RoleSkillsWindow.prototype.onOneKeyClick = function () {
        var show = true;
        var level = RoleSystem.getInstance().getRoleInfo("stage");
        for (var k in this.levelList) {
            if (this.levelList[k] < level) {
                show = false;
            }
        }
        if (show == true) {
            MsgSystem.addTagTips(Localize_cns("ROLE_ADD_tips_2"));
            return;
        }
        var ownMoney = GetHeroProperty("funds");
        var toMoney = 0;
        for (var i = 0; i < size_t(this.levelList); i++) {
            var temp = this.levelList[i];
            toMoney = toMoney + GameConfig.FunSpendMoneyItemConfig["HeroSkill"][temp].money;
        }
        if (ownMoney < toMoney) {
            MsgSystem.addTagTips(Localize_cns("ROLE_ADD_tips_1"));
            return;
        }
        RpcProxy.call("C2G_ACTOR_ROLE_SKILL_UPGRADE_MUCH", 0);
    };
    RoleSkillsWindow.prototype.onUpClick = function () {
        var thislevel = this.levelList[this.select - 1];
        var herolevel = RoleSystem.getInstance().getRoleInfo("stage");
        if (thislevel >= herolevel) {
            MsgSystem.addTagTips(Localize_cns("ROLE_ADD_tips_3"));
            return;
        }
        var ownMoney = GetHeroProperty("funds");
        var upSpend = GameConfig.FunSpendMoneyItemConfig["HeroSkill"];
        var money = upSpend[this.levelList[this.select - 1]].money;
        if (ownMoney < money) {
            MsgSystem.addTagTips(Localize_cns("ROLE_ADD_tips_1"));
            return;
        }
        RpcProxy.call("C2G_ACTOR_ROLE_SKILL_UPGRADE_ONE", this.select);
    };
    RoleSkillsWindow.prototype.onSkillsSettingClick = function () {
        var wnd = WngMrg.getInstance().getWindow("RoleSkillsSettingFrame");
        wnd.onShowWnd(this.levelList);
    };
    return RoleSkillsWindow;
}(BaseCtrlWnd));
__reflect(RoleSkillsWindow.prototype, "RoleSkillsWindow");
//# sourceMappingURL=RoleSkillsWindow.js.map