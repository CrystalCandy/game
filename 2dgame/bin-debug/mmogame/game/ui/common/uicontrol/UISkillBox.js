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
/*
作者:
    
    
创建时间：
   2017.02.24

意图：
   技能框通用控件
   
公共接口：
   
*/
var UISkillBox = (function (_super) {
    __extends(UISkillBox, _super);
    function UISkillBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UISkillBox.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mParentNode = args[0];
        this.name = args[1];
        var x = args[2];
        var y = args[3];
        var parentWnd = args[4];
        var scale = args[5] || 1.0;
        var w = 100 * scale;
        var h = 99 * scale;
        this.bEnable = true;
        this.mElemList = {};
        var mElemInfo = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = "group_" + this.name, _a["x"] = x, _a["y"] = y, _a["w"] = w, _a["h"] = h, _a["event_name"] = gui.TouchEvent.TOUCH_SHORT, _a["fun_index"] = this.onClickSkill, _a),
            (_b = {}, _b["index_type"] = eui.Image, _b["name"] = "iconBg_" + this.name, _b["parent"] = "group_" + this.name, _b["image"] = "", _b["x"] = 0, _b["y"] = 0, _b["w"] = w, _b["h"] = h, _b["messageFlag"] = true, _b),
            (_c = {}, _c["index_type"] = eui.Image, _c["name"] = "icon_" + this.name, _c["parent"] = "iconBg_" + this.name, _c["image"] = "", _c["x"] = 9 * scale, _c["y"] = 8 * scale, _c["w"] = 82 * scale, _c["h"] = 82 * scale, _c["messageFlag"] = true, _c),
            (_d = {}, _d["index_type"] = gui.Grid9Image, _d["name"] = "selectIcon_" + this.name, _d["parent"] = "group_" + this.name, _d["image"] = "hb_jiNengXuanZhong", _d["x"] = -16 * scale, _d["y"] = -17 * scale, _d["w"] = 133 * scale, _d["h"] = 133 * scale, _d["messageFlag"] = true, _d),
            (_e = {}, _e["index_type"] = gui.RichDisplayer, _e["name"] = "star_wnd_" + this.name, _e["parent"] = "group_" + this.name, _e["image"] = "", _e["x"] = 0, _e["y"] = 0, _e["w"] = w, _e["h"] = 20, _e["messageFlag"] = true, _e),
        ];
        UiUtil.createElem(mElemInfo, this.mParentNode, this.mElemList, this, parentWnd);
        this.rootWnd = this.mElemList["group_" + this.name];
        this.mElemList["selectIcon_" + this.name].visible = false;
        this.mElemList["star_wnd_" + this.name].visible = false;
        this.mElemList["star_wnd_" + this.name].setAlignFlag(gui.Flag.CENTER_TOP);
        var _a, _b, _c, _d, _e;
    };
    UISkillBox.prototype._updatePetSkill = function () {
        var skillInfo = SkillSystem.getInstance().getPetSkillInfo(this.skillId);
        if (skillInfo == null) {
            TLog.Debug("PetSkill info is null");
            return;
        }
        this._updateIcon(GetSkillQualityIcon(this.skillId), GetSkillIcon(this.skillId));
    };
    UISkillBox.prototype._updateRoleSkill = function () {
        var skillInfo = SkillSystem.getInstance().getRoleSkillInfo(this.skillId);
        if (skillInfo == null) {
            TLog.Debug("RoleSkill info is null");
            return;
        }
        this._updateIcon(GetSkillQualityIcon(this.skillId), GetSkillIcon(this.skillId));
    };
    UISkillBox.prototype._updateXianLvSkill = function () {
        var skillInfo = SkillSystem.getInstance().getXianLvSkillInfo(this.skillId, this.skillLv);
        if (skillInfo == null) {
            TLog.Debug("XianLvSkill info is null");
            return;
        }
        var star = this.skillLv;
        var xingStr = "";
        if (star > 3) {
            xingStr += "#yellow" + star + "#STAR";
        }
        else {
            for (var i = 0; i < star; i++) {
                xingStr += "#STAR";
            }
        }
        AddRdContent(this.mElemList["star_wnd_" + this.name], xingStr, "ht_24_cc");
        this.mElemList["star_wnd_" + this.name].visible = true;
        this._updateIcon(GetSkillQualityIcon(this.skillId, this.skillLv), GetSkillIcon(this.skillId, this.skillLv));
    };
    UISkillBox.prototype._updateIcon = function (bgIcon, icon) {
        this.bEnable = true;
        this.mElemList["iconBg_" + this.name].source = bgIcon;
        this.mElemList["icon_" + this.name].source = icon;
    };
    UISkillBox.prototype.onClickSkill = function (args) {
        if (!this.bEnable) {
            return;
        }
        if (this.tipsFunc) {
            //返回true，表示拦截不查看技能信息
            if (this.tipsFunc.call(this.tipsObj, this.skillId, this.skillLv, this.userData, args)) {
                return;
            }
        }
        else {
            var wnd = WngMrg.getInstance().getWindow("CommonTipsFrame");
            wnd.showCommonTips(this.skillType, this.skillId, this.skillLv);
        }
    };
    //////////////////////通用接口////////////////////////
    UISkillBox.prototype.setVisible = function (b) {
        this.rootWnd.visible = (b);
    };
    UISkillBox.prototype.clear = function () {
        this.setVisible(false);
    };
    UISkillBox.prototype.lock = function () {
        this.mElemList["iconBg_" + this.name].source = "cw_jiNengSuo";
        this.mElemList["icon_" + this.name].source = "";
        this.select();
        this.setHintEnable();
    };
    UISkillBox.prototype.select = function (b) {
        this.mElemList["selectIcon_" + this.name].visible = b;
    };
    UISkillBox.prototype.setHintEnable = function (b) {
        this.bEnable = b;
    };
    UISkillBox.prototype.setTipsListner = function (func, obj, userData) {
        this.tipsFunc = func;
        this.tipsObj = obj;
        this.userData = userData;
    };
    UISkillBox.prototype.updatePetSkill = function (skillId) {
        this.skillId = skillId;
        this.skillType = cellOptionsIndex.Pet;
        this._updatePetSkill();
    };
    UISkillBox.prototype.updateRoleSkill = function (skillId, level) {
        this.skillId = skillId;
        this.skillType = cellOptionsIndex.Hero;
        this.skillLv = level;
        this._updateRoleSkill();
    };
    UISkillBox.prototype.updateXianLvSkill = function (skillId, level) {
        this.skillId = skillId;
        this.skillType = cellOptionsIndex.XianLv;
        this.skillLv = level;
        this._updateXianLvSkill();
    };
    return UISkillBox;
}(TClass));
__reflect(UISkillBox.prototype, "UISkillBox");
//# sourceMappingURL=UISkillBox.js.map