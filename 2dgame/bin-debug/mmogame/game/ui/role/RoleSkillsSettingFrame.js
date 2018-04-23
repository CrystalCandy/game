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
var RoleSkillsSettingFrame = (function (_super) {
    __extends(RoleSkillsSettingFrame, _super);
    function RoleSkillsSettingFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoleSkillsSettingFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/role/RoleSkillsSettingLayout.exml"];
    };
    RoleSkillsSettingFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_back", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["group_skills"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group);
        var _a;
    };
    RoleSkillsSettingFrame.prototype.onUnLoad = function () {
    };
    RoleSkillsSettingFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.ACTOR_ROLE_UPDATE, this.onRefresh, this);
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.onRefresh();
    };
    RoleSkillsSettingFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ACTOR_ROLE_UPDATE, this.onRefresh, this);
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    RoleSkillsSettingFrame.prototype.onRefresh = function () {
        var list = RoleSystem.getInstance().getRoleInfo("skillorderlist");
        if (size_t(list) == 0)
            return;
        var entryId = RoleSystem.getInstance().getRoleInfo("entryid");
        var skillList = GameConfig.ActorRoleConfig[entryId].skill;
        var count = size_t(list);
        if (count == 0)
            return;
        var scroll = this.scroll;
        scroll.clearItemList();
        for (var k = 1; k <= count; k++) {
            var id = skillList[list[k - 1] - 1];
            var level = this.levelList[list[k - 1] - 1];
            var window_1 = scroll.getItemWindow(list[k - 1], 500, 154, 0, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, id, level);
        }
        scroll.refreshScroll(true, true);
    };
    RoleSkillsSettingFrame.prototype.initItemWindow = function (window) {
        var name = window.name;
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = name + "_bg", _a["image"] = "ty_uiDi03", _a["autoScale"] = true, _a["x"] = 0, _a["y"] = 0, _a["w"] = 500, _a["h"] = 154, _a),
            (_b = {}, _b["index_type"] = eui.Group, _b["name"] = name + "_skill", _b["parent"] = name + "_bg", _b["title"] = "", _b["x"] = 9, _b["y"] = 28, _b["w"] = 80, _b["h"] = 80, _b["messageFlag"] = true, _b),
            (_c = {}, _c["index_type"] = eui.Image, _c["name"] = name + "_name_bg", _c["parent"] = name + "_bg", _c["title"] = "", _c["font"] = "", _c["image"] = "hb_textDi02", _c["color"] = null, _c["x"] = 122, _c["y"] = 10, _c["w"] = 0, _c["h"] = 0, _c["messageFlag"] = true, _c),
            (_d = {}, _d["index_type"] = eui.Label, _d["name"] = name + "_name", _d["parent"] = name + "_name_bg", _d["title"] = "", _d["font"] = "ht_24_cc", _d["image"] = "", _d["color"] = "ublack", _d["x"] = 20, _d["y"] = 10, _d["w"] = 186, _d["h"] = 30, _d["messageFlag"] = true, _d),
            (_e = {}, _e["index_type"] = gui.RichDisplayer, _e["name"] = name + "_instruct", _e["parent"] = name + "_bg", _e["title"] = "", _e["font"] = "ht_20_cc", _e["image"] = "", _e["color"] = "ublack", _e["x"] = 122, _e["y"] = 60, _e["w"] = 240, _e["h"] = 70, _e["messageFlag"] = true, _e),
            (_f = {}, _f["index_type"] = gui.Button, _f["name"] = name + "_btnUp", _f["parent"] = name + "_bg", _f["title"] = Localize_cns("ROLE_TXT35"), _f["font"] = "ht_24_cc_stroke", _f["image"] = "ty_tongYongBt2", _f["color"] = gui.Color.white, _f["x"] = 382, _f["y"] = 53, _f["w"] = 0, _f["h"] = 0, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onBtnUpClick, _f),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window);
        //	if(!this.mElemList[name + "_skilbox"]){
        this.mElemList[name + "_skilbox"] = UISkillBox.newObj(this.mLayoutNode, name + "_skilbox", 0, 0, this.mElemList[name + "_skill"]);
        //	}  
        this.mElemList[name + "_instruct"].setAlignFlag(gui.Flag.LEFT_TOP);
        var _a, _b, _c, _d, _e, _f;
    };
    RoleSkillsSettingFrame.prototype.refreshItemWindow = function (window, id, level) {
        var config = GameConfig.ActorRoleSkillConfig[id];
        var name = window.name;
        var str = String.format(Localize_cns("ROLE_TXT34"), level);
        var skillName = SkillSystem.getInstance().getSkillName(id) + str;
        this.mElemList[name + "_name"].text = skillName;
        var type = config.effects[0][0];
        // if(type == "demage")  {
        //let str = String.format(Localize_cns("ROLE_TXT32"),config.effects[0][1]);
        var desStr = String.format(SkillSystem.getInstance().getSkillDes(id));
        AddRdContent(this.mElemList[name + "_instruct"], desStr, "ht_20_cc", "black");
        //.text = desStr
        //}
        this.mElemList[name + "_skilbox"].updateRoleSkill(id);
    };
    RoleSkillsSettingFrame.prototype.onBtnUpClick = function (event) {
        var name = event.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        RpcProxy.call("C2G_ACTOR_ROLE_SKILL_ORDER_UP", tonumber(index));
    };
    RoleSkillsSettingFrame.prototype.onShowWnd = function (list) {
        this.levelList = list;
        this.showWnd();
    };
    return RoleSkillsSettingFrame;
}(BaseWnd));
__reflect(RoleSkillsSettingFrame.prototype, "RoleSkillsSettingFrame");
//# sourceMappingURL=RoleSkillsSettingFrame.js.map