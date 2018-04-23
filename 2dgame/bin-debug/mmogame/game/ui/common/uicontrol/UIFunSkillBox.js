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
   

意图：
   FUN技能框通用控件
   
公共接口：
   
*/
var UIFunSkillBox = (function (_super) {
    __extends(UIFunSkillBox, _super);
    function UIFunSkillBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIFunSkillBox.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mParentNode = args[0];
        this.name = args[1];
        var x = args[2];
        var y = args[3];
        var w = 100;
        var h = 99;
        var parentWnd = args[4];
        var scale = args[5] || 1.0;
        w = w * scale;
        h = h * scale;
        this.funType = args[6];
        this.posIndex = args[7] || 0;
        this.mElemList = {};
        var mElemInfo = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = "group_" + this.name, _a["x"] = x, _a["y"] = y, _a["w"] = w, _a["h"] = h, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onClickSkill, _a),
            (_b = {}, _b["index_type"] = eui.Image, _b["name"] = "iconBg_" + this.name, _b["parent"] = "group_" + this.name, _b["image"] = "ty_jiNengDi01", _b["x"] = 0, _b["y"] = 0, _b["w"] = w, _b["h"] = h, _b["messageFlag"] = true, _b),
            (_c = {}, _c["index_type"] = eui.Image, _c["name"] = "icon_" + this.name, _c["parent"] = "iconBg_" + this.name, _c["image"] = "", _c["x"] = 9 * scale, _c["y"] = 8 * scale, _c["w"] = 82 * scale, _c["h"] = 82 * scale, _c["messageFlag"] = true, _c),
            (_d = {}, _d["index_type"] = gui.Grid9Image, _d["name"] = "lockBg_" + this.name, _d["parent"] = "group_" + this.name, _d["image"] = "zjm_shuRuDi01", _d["x"] = 0, _d["y"] = (h - 30) / 2, _d["w"] = w, _d["h"] = 30, _d["messageFlag"] = true, _d),
            (_e = {}, _e["index_type"] = eui.Label, _e["name"] = "lock_" + this.name, _e["parent"] = "lockBg_" + this.name, _e["title"] = "", _e["font"] = "ht_18_cc", _e["color"] = gui.Color.white, _e["x"] = 0, _e["y"] = 0, _e["w"] = w, _e["h"] = 30, _e["messageFlag"] = true, _e),
            (_f = {}, _f["index_type"] = eui.Image, _f["name"] = "select_" + this.name, _f["parent"] = "group_" + this.name, _f["image"] = "hb_jiNengXuanZhong", _f["x"] = (w - 133) / 2, _f["y"] = (h - 133) / 2, _f["w"] = 133, _f["h"] = 133, _f["messageFlag"] = true, _f),
            (_g = {}, _g["index_type"] = eui.Image, _g["name"] = "levelBg_" + this.name, _g["parent"] = "group_" + this.name, _g["image"] = "ty_daoJuLvDi01", _g["x"] = 0, _g["y"] = 0, _g["w"] = 34 * scale, _g["h"] = 34 * scale, _g["messageFlag"] = true, _g),
            (_h = {}, _h["index_type"] = eui.Label, _h["name"] = "level_" + this.name, _h["parent"] = "levelBg_" + this.name, _h["title"] = "", _h["font"] = "ht_18_cc_stroke", _h["color"] = gui.Color.white, _h["x"] = 0, _h["y"] = 0, _h["w"] = 34 * scale, _h["h"] = 34 * scale, _h["messageFlag"] = true, _h),
        ];
        UiUtil.createElem(mElemInfo, this.mParentNode, this.mElemList, this, parentWnd);
        this.mElemList["lockBg_" + this.name].visible = false;
        this.mElemList["lock_" + this.name].visible = false;
        this.mElemList["levelBg_" + this.name].visible = false;
        this.mElemList["level_" + this.name].visible = false;
        this.mElemList["select_" + this.name].visible = false;
        this.rootWnd = this.mElemList["group_" + this.name];
        this.updateFunSkill();
        var _a, _b, _c, _d, _e, _f, _g, _h;
    };
    UIFunSkillBox.prototype.updateFunSkill = function (_type, _pos) {
        if (_type)
            this.funType = _type;
        if (_pos)
            this.posIndex = _pos;
        var funInfo = FunSystem.getInstance().getFunInfoWithType(this.funType);
        if (funInfo == null)
            return;
        var skillId = FunSystem.getInstance().getFunSkillConfigWithPos(this.funType, this.posIndex + 1);
        this.mElemList["icon_" + this.name].source = GetSkillIcon(skillId);
        var skillList = funInfo.skilllevellist;
        var skillLevel = skillList[this.posIndex] || 0;
        if (skillLevel == 0) {
            this.mElemList["lockBg_" + this.name].visible = true;
            this.mElemList["lock_" + this.name].visible = true;
            this.mElemList["levelBg_" + this.name].visible = false;
            this.mElemList["level_" + this.name].visible = false;
            var unlockLv = GameConfig.FunSkillCaseConfig[cellOptionsName[this.funType - 1]][this.posIndex + 1].UnlockLevel;
            this.mElemList["lock_" + this.name].text = unlockLv + Localize_cns("PET_TXT12");
        }
        else {
            this.mElemList["lockBg_" + this.name].visible = false;
            this.mElemList["lock_" + this.name].visible = false;
            this.mElemList["levelBg_" + this.name].visible = true;
            this.mElemList["level_" + this.name].visible = true;
            this.mElemList["level_" + this.name].text = skillLevel;
        }
    };
    UIFunSkillBox.prototype.setClickCallBack = function (func, obj, data) {
        this.callback = func;
        this.obj = obj;
        this.userData = data;
    };
    UIFunSkillBox.prototype.select = function (_bool) {
        this.mElemList["select_" + this.name].visible = _bool;
    };
    UIFunSkillBox.prototype.onClickSkill = function () {
        if (this.callback && this.obj) {
            this.callback.call(this.obj, this.userData);
        }
        else {
            var wnd = WngMrg.getInstance().getWindow("FunSkillFrame");
            wnd.showWithTypeAndIndex(this.funType, this.posIndex);
        }
    };
    return UIFunSkillBox;
}(TClass));
__reflect(UIFunSkillBox.prototype, "UIFunSkillBox");
//# sourceMappingURL=UIFunSkillBox.js.map