// TypeScript file
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
var CommonTipsFrame = (function (_super) {
    __extends(CommonTipsFrame, _super);
    function CommonTipsFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonTipsFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    CommonTipsFrame.prototype.onLoad = function () {
        var w = 450;
        var h = 600;
        this.mLayoutNode.width = w;
        this.mLayoutNode.height = h;
        this.setAlignCenter(true, true);
        var mElemInfo = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = "group", _a["title"] = null, _a["x"] = 0, _a["y"] = 0, _a["w"] = w, _a["h"] = h, _a["messageFlag"] = true, _a),
            (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = "bgImage", _b["parent"] = "group", _b["title"] = null, _b["image"] = "ty_tipsDi", _b["x"] = 0, _b["y"] = 0, _b["w"] = w, _b["h"] = h, _b),
            (_c = {}, _c["index_type"] = gui.RichDisplayer, _c["name"] = "nameRd", _c["parent"] = "group", _c["title"] = null, _c["x"] = 148, _c["y"] = 40, _c["w"] = 250, _c["h"] = 30, _c),
            (_d = {}, _d["index_type"] = gui.RichDisplayer, _d["name"] = "typeRd", _d["parent"] = "group", _d["title"] = null, _d["x"] = 148, _d["y"] = 80, _d["w"] = 250, _d["h"] = 30, _d),
            (_e = {}, _e["index_type"] = gui.Grid9Image, _e["name"] = "line", _e["parent"] = "group", _e["title"] = null, _e["image"] = "cz_uiLine01", _e["x"] = 20, _e["y"] = 120, _e["w"] = w - 40, _e["h"] = "16", _e),
            (_f = {}, _f["index_type"] = gui.RichDisplayer, _f["name"] = "desRd", _f["parent"] = "group", _f["title"] = null, _f["x"] = 30, _f["y"] = 150, _f["w"] = w - 60, _f["h"] = 400, _f),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["skillBox"] = UISkillBox.newObj(this.mLayoutNode, "skillBox", 30, 20, this.mElemList["group"]);
        var _a, _b, _c, _d, _e, _f;
    };
    CommonTipsFrame.prototype.onUnLoad = function () {
    };
    CommonTipsFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP, this.onMouseUp, this);
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.refreshFrame();
    };
    CommonTipsFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP, this.onMouseUp, this);
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    CommonTipsFrame.prototype.refreshFrame = function () {
        var h = 0;
        var rdH = 0;
        var skillInfo = null;
        var sName = "";
        var sType = 0;
        var sdes = "";
        if (this.skillType == cellOptionsIndex.Pet) {
            h = 280;
            rdH = 100;
            skillInfo = SkillSystem.getInstance().getPetSkillInfo(this.skillId);
            sName = SkillSystem.getInstance().getSkillName(this.skillId);
            sType = skillInfo.fixed || 0;
            sdes = Localize_cns("SKILL_TXT1") + SkillSystem.getInstance().getSkillDes(this.skillId);
        }
        else if (this.skillType == cellOptionsIndex.XianLv) {
            //  h = 500
            //   rdH = 350
            //    if (this.skillLv == 7) { //满级
            //       h = 280
            //       rdH = 100
            //  }
            //  skillInfo = SkillSystem.getInstance().getXianLvSkillInfo(this.skillId, this.skillLv)
            //  sName = SkillSystem.getInstance().getSkillName(this.skillId)
            //  sName = sName + "#spaceLv." + this.skillLv
            //  this.mElemList["typeRd"].visible = false
            //  sdes = this.getXianLvDes()
            h = 280;
            rdH = 100;
            skillInfo = SkillSystem.getInstance().getPetSkillInfo(this.skillId);
            sName = SkillSystem.getInstance().getSkillName(this.skillId);
            // sType = skillInfo.fixed || 0
            sdes = Localize_cns("SKILL_TXT1") + SkillSystem.getInstance().getSkillDes(this.skillId);
        }
        this.mLayoutNode.height = h;
        this.mElemList["group"].height = h;
        this.mElemList["bgImage"].height = h;
        this.mElemList["typeRd"].height = rdH;
        this.mElemList["skillBox"].updatePetSkill(this.skillId);
        this.mElemList["skillBox"].setHintEnable();
        AddRdContent(this.mElemList["nameRd"], sName, "ht_30_lc", "cyan");
        AddRdContent(this.mElemList["typeRd"], Localize_cns("SKILL_TYPE" + sType), "ht_24_lc", "white");
        AddRdContent(this.mElemList["desRd"], sdes, "ht_24_lc", "white", 5);
    };
    CommonTipsFrame.prototype.getXianLvDes = function () {
        //当前
        var curStr = SkillSystem.getInstance().getSkillDes(this.skillId, this.skillLv);
        if (this.skillLv == 7) {
            return Localize_cns("SKILL_TXT2") + curStr;
        }
        else {
            //下一级
            var nextStr = SkillSystem.getInstance().getSkillDes(this.skillId, this.skillLv + 1);
            //升级条件
            var condStr = Localize_cns("SKILL_TXT4") + String.format(Localize_cns("SKILL_TXT5"), this.skillLv + 1);
            return curStr + "#br" + nextStr + "#br" + condStr;
        }
    };
    ////////////////////////////////-响应函数////////////////////////////////////////
    CommonTipsFrame.prototype.onMouseUp = function (args) {
        return this.hideWnd();
    };
    ////////////////////////////公共接口////////////////////////////////////-
    CommonTipsFrame.prototype.showCommonTips = function (skillType, skillId, skillLv) {
        this.skillType = skillType;
        this.skillId = skillId;
        this.skillLv = skillLv;
        this.showWnd();
    };
    return CommonTipsFrame;
}(BaseWnd));
__reflect(CommonTipsFrame.prototype, "CommonTipsFrame");
//# sourceMappingURL=CommonTipsFrame.js.map