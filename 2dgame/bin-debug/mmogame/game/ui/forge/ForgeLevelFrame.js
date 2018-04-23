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
var ForgeLevelFrame = (function (_super) {
    __extends(ForgeLevelFrame, _super);
    function ForgeLevelFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ForgeLevelFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    ForgeLevelFrame.prototype.onLoad = function () {
        this.mLayoutNode.width = 560;
        this.mLayoutNode.height = 450;
        this.setAlignCenter(true, true);
        var mElemInfo = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = "group_dashi", _a["title"] = null, _a["font"] = null, _a["image"] = "", _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["w"] = 560, _a["h"] = 450, _a),
            (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = "bg", _b["title"] = null, _b["font"] = null, _b["image"] = "ty_tipsDi", _b["color"] = gui.Color.white, _b["x"] = 0, _b["y"] = 0, _b["w"] = 560, _b["h"] = 450, _b),
            (_c = {}, _c["index_type"] = eui.Image, _c["name"] = "sprite", _c["title"] = null, _c["font"] = null, _c["image"] = "", _c["color"] = gui.Color.white, _c["x"] = 20, _c["y"] = 15, _c["w"] = 100, _c["h"] = 96, _c),
            (_d = {}, _d["index_type"] = eui.Label, _d["name"] = "label_jie", _d["title"] = "", _d["font"] = "ht_22_cc", _d["image"] = "", _d["color"] = gui.Color.orange, _d["x"] = 22, _d["y"] = 26, _d["w"] = 35, _d["h"] = 22, _d),
            (_e = {}, _e["index_type"] = gui.RichDisplayer, _e["name"] = "rd_exp", _e["title"] = null, _e["font"] = "ht_24_lc", _e["image"] = "", _e["color"] = gui.Color.lime, _e["x"] = 8, _e["y"] = 113, _e["w"] = 120, _e["h"] = 24, _e),
            (_f = {}, _f["index_type"] = gui.RichDisplayer, _f["name"] = "rd_des", _f["title"] = null, _f["font"] = "ht_24_lc", _f["image"] = "", _f["color"] = gui.Color.white, _f["x"] = 145, _f["y"] = 30, _f["w"] = 380, _f["h"] = 80, _f),
            (_g = {}, _g["index_type"] = gui.Grid9Image, _g["name"] = "line", _g["title"] = null, _g["font"] = null, _g["image"] = "cz_uiLine01", _g["color"] = gui.Color.white, _g["x"] = 10, _g["y"] = 145, _g["w"] = 540, _g["h"] = 16, _g),
            (_h = {}, _h["index_type"] = gui.RichDisplayer, _h["name"] = "rd_effect", _h["title"] = null, _h["font"] = "ht_24_lc", _h["image"] = "", _h["color"] = gui.Color.white, _h["x"] = 40, _h["y"] = 170, _h["w"] = 480, _h["h"] = 280, _h),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["rd_exp"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["rd_des"].setAlignFlag(gui.Flag.LEFT_CENTER);
        this.mElemList["rd_effect"].setAlignFlag(gui.Flag.LEFT_TOP);
        var _a, _b, _c, _d, _e, _f, _g, _h;
    };
    ForgeLevelFrame.prototype.onUnLoad = function () {
    };
    ForgeLevelFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP, this.hideWnd, this);
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.onRefresh();
    };
    ForgeLevelFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP, this.hideWnd, this);
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    ForgeLevelFrame.prototype.onRefresh = function () {
        //common
        var imageName = "dz_Bt0";
        imageName = imageName + (this.index + 1);
        this.mElemList["sprite"].source = imageName;
        var forgeTypeInfo = ForgeSystem.getInstance().getForgeInfo("forgeType");
        var typeName = elemForgeNames[this.index];
        var forgeType = ForgeSystem.getInstance().getForgeClassType(typeName);
        var forgeLevel = ForgeSystem.getInstance().getForgeTypeLevel(typeName);
        var needLevel = ForgeSystem.getInstance().getDaShiNeedLevel(typeName, this.index);
        var tempConfig = GameConfig.FunForgeMasterConfig[typeName][needLevel];
        var expStr = "#lime(" + forgeLevel + "/" + needLevel + ")";
        AddRdContent(this.mElemList["rd_exp"], expStr, "ht_24_cc");
        this.mElemList["label_jie"].text = forgeType + Localize_cns("PET_TXT10");
        var quanShenlist = [
            Localize_cns("FORGE_TXT6"), Localize_cns("FORGE_TXT7"),
            Localize_cns("FORGE_TXT8"), Localize_cns("FORGE_TXT8"),
        ];
        var desStr = "";
        var effectStr = "";
        var height = 0;
        if (forgeType == 0) {
            this.mElemList["label_jie"].visible = false;
            UiUtil.grayComponent(this.mElemList["sprite"], true);
            desStr += Localize_cns("FORGE_LEVEL_DES_FALSE") + "#br#br" + Localize_cns("FORGE_LEVEL_FALSE");
            var nextConfig = table_effect(tempConfig.effects);
            var nextStr = tempConfig.explain;
            var zhanLiStr = String.format(Localize_cns("FORGE_LEVEL_ZHANLI"), GetForceMath(nextConfig));
            effectStr += "#gray" + Localize_cns("FORGE_LEVEL_EFFECT_NEXT") + quanShenlist[this.index] + "+" + needLevel + "#br#br#space" + nextStr + "#br#br#br#lime" + zhanLiStr;
            height = 350;
        }
        else {
            this.mElemList["label_jie"].visible = true;
            UiUtil.grayComponent(this.mElemList["sprite"], false);
            var masterHadConfig = GameConfig.FunForgeMasterConfig[typeName];
            var hadLevel = ForgeSystem.getInstance().getNowForgeLevel(masterHadConfig, forgeType);
            desStr = quanShenlist[this.index] + "+" + hadLevel + "#br#br" + Localize_cns("FORGE_LEVEL_TRUE");
            var effects = masterHadConfig[hadLevel].effects;
            var hadConfig = table_effect(effects);
            var hadStr = masterHadConfig[hadLevel].explain;
            var hadForce = GetForceMath(hadConfig);
            effectStr += Localize_cns("FORGE_LEVEL_EFFECT") + "#orange" + quanShenlist[this.index] + "+" + hadLevel + "#rf#br#br#space" + hadStr + "#br#br";
            if (forgeType != needLevel) {
                var nextConfig = table_effect(tempConfig.effects);
                var nextStr = tempConfig.explain;
                var nextForce = GetForceMath(nextConfig);
                var forceStr = String.format(Localize_cns("FORGE_LEVEL_ZHANLI"), nextForce - hadForce);
                effectStr += "#gray" + Localize_cns("FORGE_LEVEL_EFFECT_NEXT") + quanShenlist[this.index] + "+" + needLevel + "#br#br#space" + nextStr + "#br#br#br#lime" + forceStr;
            }
            height = 450;
        }
        AddRdContent(this.mElemList["rd_des"], desStr, "ht_24_lc");
        AddRdContent(this.mElemList["rd_effect"], effectStr, "ht_24_lc");
        this.mLayoutNode.height = height;
        this.mElemList["group_dashi"].height = height;
        this.mElemList["bg"].height = height;
    };
    ForgeLevelFrame.prototype.onShowWnd = function (index) {
        this.index = index;
        this.showWnd();
    };
    return ForgeLevelFrame;
}(BaseWnd)); // TypeScript file
__reflect(ForgeLevelFrame.prototype, "ForgeLevelFrame");
//# sourceMappingURL=ForgeLevelFrame.js.map