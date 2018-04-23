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
// TypeScript file
var Club_SkillWnd = (function (_super) {
    __extends(Club_SkillWnd, _super);
    function Club_SkillWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Club_SkillWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    Club_SkillWnd.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var ElemInfo = [
            (_a = {}, _a["name"] = "btn_upgrade", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onUpgradeSkill, _a)
        ];
        UiUtil.initElem(ElemInfo, this.mLayoutNode, this.mElemList, this);
        ElemInfo = [];
        var group = this.mElemList["attr_wnd"];
        for (var i = 0; i < 8; i++) {
            table_insert(ElemInfo, (_b = {}, _b["index_type"] = gui.RichDisplayer, _b["name"] = "skill_attr_" + i, _b["x"] = 0, _b["y"] = 0, _b["w"] = group.width / 4, _b["h"] = group.height / 3, _b["messageFlag"] = true, _b));
        }
        UiUtil.createElem(ElemInfo, this.mLayoutNode, this.mElemList, this, group);
        this.mElemList["skill_level_rd"].setAlignFlag(gui.Flag.H_CENTER);
        this.mElemList["cost_rd"].setAlignFlag(gui.Flag.H_CENTER);
        for (var i = 0; i < 8; i++) {
            this.mElemList["lv_wnd" + i].visible = false;
            this.mElemList["select_" + i].visible = false;
        }
        var _a, _b;
    };
    Club_SkillWnd.prototype.onUnLoad = function () {
    };
    Club_SkillWnd.prototype.onShow = function () {
        RegisterEvent(EventDefine.CLUB_SKILL_INFO, this.refreshFrame, this);
        this.mElemList["group4"].visible = true;
        this.mElemList["title"].text = Localize_cns("CLUB_TXT7");
        RpcProxy.call("C2G_FactionSkillInfo");
        this.refreshFrame();
    };
    Club_SkillWnd.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.CLUB_SKILL_INFO, this.refreshFrame, this);
        this.mElemList["group4"].visible = false;
    };
    Club_SkillWnd.prototype.refreshFrame = function () {
        var skillInfo = ClubSystem.getInstance().getClubSkillInfo();
        if (skillInfo == null) {
            return;
        }
        var level = skillInfo.level; //最大等级
        var index = skillInfo.index; //最大索引
        var force = skillInfo.force; //总战力
        var list = skillInfo.list; //等级列表
        //升级到哪个技能
        var curSkillIndex = index - 1;
        //更新技能信息
        for (var i = 0; i < 8; i++) {
            this.mElemList["select_" + i].visible = false;
            if (i == curSkillIndex) {
                this.mElemList["select_" + i].visible = true;
            }
            this.mElemList["lv_" + i].text = list[i];
        }
        var maxLevel = (index == 1) ? level : list[index - 1];
        var limitLevel = ClubSystem.getInstance().getClubSkillLimit() || 0;
        var skillLevelText = String.format(Localize_cns("CLUB_TXT40"), maxLevel + "/" + limitLevel);
        //技能升级信息文本
        AddRdContent(this.mElemList["skill_level_rd"], skillLevelText, "ht_24_cc", "lime");
        //更新战力
        this.mElemList["force_batch"].beginDraw();
        this.mElemList["force_batch"].drawNumberString("zhanLi_", "z" + force, 0, 0, -3);
        this.mElemList["force_batch"].endDraw();
        //更新当前技能信息
        var curProperty = table_effect(ClubSystem.getInstance().getClubSkillProperty(level, index));
        var nextProperty = table_effect(ClubSystem.getInstance().getClubSkillProperty(level, index));
        //更新消耗
        var curBangGong = 0;
        var nextBangGong = ClubSystem.getInstance().getClubSkillConfig(level + 1, "facContribute");
        var color = curBangGong >= nextBangGong ? "#lime" : "#red";
        var str = Localize_cns("CLUB_TXT101") + color + curBangGong + "#lime/" + nextBangGong;
        AddRdContent(this.mElemList["cost_rd"], str, "ht_24_cc", "white");
        var str = "";
        for (var k in curProperty) {
            str = str + GetPropertyName(k);
            str = str + "#rf#lime+" + curProperty[k] + "#br#ublack";
        }
        AddRdContent(this.mElemList["skill_cur_rd"], str, "ht_24_cc", "ublack", 5);
        str = "";
        for (var k in nextProperty) {
            str = str + GetPropertyName(k);
            str = str + "#rf#lime+" + curProperty[k] + "#br#ublack";
        }
        AddRdContent(this.mElemList["skill_next_rd"], str, "ht_24_cc", "ublack", 5);
        //更新总属性
        var sumProperty = ClubSystem.getInstance().getClubSkillSumProperty(level);
        var control = 0;
        for (var k in sumProperty) {
            if (control >= 8) {
                break;
            }
            var proName = GetPropertyName(k);
            var proValue = sumProperty[k];
            if (this.mElemList["skill_attr_" + control]) {
                AddRdContent(this.mElemList["skill_attr_" + control], proName + "#rf#lime+" + proValue, "ht_24_cc", "ublack");
            }
            control += 1;
        }
    };
    //升级
    Club_SkillWnd.prototype.onUpgradeSkill = function () {
        RpcProxy.call("C2G_FactionSkillLevelUp");
    };
    return Club_SkillWnd;
}(BaseCtrlWnd));
__reflect(Club_SkillWnd.prototype, "Club_SkillWnd");
//# sourceMappingURL=Club_SkillWnd.js.map