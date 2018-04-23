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
var XianLvSkillDesFrame = (function (_super) {
    __extends(XianLvSkillDesFrame, _super);
    function XianLvSkillDesFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XianLvSkillDesFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/xianlv/XianLvSkillDesLayout.exml"];
    };
    XianLvSkillDesFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        //UiUtil.setFrameSize(this.mLayoutNode, 470, 442, 85, 229)
        this.initSkinElemList();
        var w = 470;
        var h = 442;
        this.mLayoutNode.width = w;
        this.mLayoutNode.height = h;
        this.setAlignCenter(true, true);
        this.mElemList["skillBox"] = UISkillBox.newObj(this.mLayoutNode, "skillBox", 35, 10, this.mElemList["group_1"]);
        this.mElemList["rd_name"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["rd_now"].setAlignFlag(gui.Flag.H_CENTER);
        this.mElemList["rd_next"].setAlignFlag(gui.Flag.H_CENTER);
        this.mElemList["rd_need"].setAlignFlag(gui.Flag.H_CENTER);
        this.mElemList["rd_level"].setAlignFlag(gui.Flag.RIGHT_CENTER);
    };
    XianLvSkillDesFrame.prototype.onUnLoad = function () {
    };
    XianLvSkillDesFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP, this.onMouseUp, this);
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.onRefresh();
    };
    XianLvSkillDesFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP, this.onMouseUp, this);
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    XianLvSkillDesFrame.prototype.onRefresh = function () {
        this.mElemList["skillBox"].updateXianLvSkill(this.id, this.level);
        //rd_name
        var name = GameConfig.ActorXianLvSkillConfig[this.id][this.level].Name;
        // let str1 = String.format(Localize_cns("XIANLV_TXT9"), name )
        AddRdContent(this.mElemList["rd_name"], "#green" + name, "ht_24_cc_stroke");
        //rd_level
        var str1 = String.format(Localize_cns("XIANLV_TXT9"), this.level);
        AddRdContent(this.mElemList["rd_level"], str1, "ht_24_cc_stroke");
        //rd_now
        var nowStr = SkillSystem.getInstance().getSkillDes(this.id, this.level);
        AddRdContent(this.mElemList["rd_now"], nowStr, "ht_24_cc_stroke");
        if (this.level == 7) {
            this.mLayoutNode.height = 280;
            this.mElemList["group_1"].height = 280;
            this.mElemList["image_2"].visible = false;
            this.mElemList["image_3"].visible = false;
            this.mElemList["rd_next"].visible = false;
            this.mElemList["rd_need"].visible = false;
        }
        else {
            //rd_next
            var nextStr = SkillSystem.getInstance().getSkillDes(this.id, this.level + 1);
            AddRdContent(this.mElemList["rd_next"], nextStr, "ht_24_cc_stroke");
            //rd_need
            var needStr = String.format(Localize_cns("XIANLV_TXT10"), this.level + 1);
            AddRdContent(this.mElemList["rd_need"], needStr, "ht_24_cc_stroke");
        }
    };
    XianLvSkillDesFrame.prototype.onMouseUp = function (args) {
        return this.hideWnd();
    };
    XianLvSkillDesFrame.prototype.onShowWnd = function (id, level) {
        this.id = id;
        this.level = level;
        this.showWnd();
    };
    return XianLvSkillDesFrame;
}(BaseWnd));
__reflect(XianLvSkillDesFrame.prototype, "XianLvSkillDesFrame");
//# sourceMappingURL=XianLvSkillDesFrame.js.map