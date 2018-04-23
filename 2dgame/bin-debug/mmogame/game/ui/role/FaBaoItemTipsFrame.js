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
var FaBaoItemTipsFrame = (function (_super) {
    __extends(FaBaoItemTipsFrame, _super);
    function FaBaoItemTipsFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FaBaoItemTipsFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/role/FaBaoItemTipsLayout.exml"];
        this.isPlayer = false;
    };
    FaBaoItemTipsFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        //	this.mLayoutNode.width = 514
        //	this.mLayoutNode.height = 332
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_show", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_wear", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onWearClick, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["itemBox"] = UIItemBox.newObj(this.mLayoutNode, "itemBox", 0, 5, this.mElemList["item"]);
        var group = this.mElemList["equip_wnd"];
        group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideWnd, this);
        var _a, _b;
    };
    FaBaoItemTipsFrame.prototype.onUnLoad = function () {
    };
    FaBaoItemTipsFrame.prototype.onShow = function () {
        //  RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP, this.hideWnd, this)
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.onRefresh();
    };
    FaBaoItemTipsFrame.prototype.onHide = function () {
        // UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP, this.hideWnd, this)
        this.mLayoutNode.setDoModal(false);
        this.mLayoutNode.visible = false;
        this.isHero = false;
        this.isPlayer = false;
        this.index = -1;
        this.item = null;
    };
    FaBaoItemTipsFrame.prototype.onRefresh = function () {
        if (this.item == null)
            return;
        var itemId = this.item.getProperty("entry");
        var quality = this.item.getProperty("quality");
        //common 
        this.mElemList["itemBox"].updateByEntry(itemId, 1, quality);
        this.mElemList["itemBox"].setItemTipsListner(this.onOpenTipsClick, this, this.item);
        var fontColor = GetQualityColorStr(quality);
        var item = this.item;
        var name = item.getName();
        var effectConfig = GameConfig.TalismanEquipEffectConfig[itemId][quality];
        var NameStr = "#" + fontColor + name;
        var qualityStr = "#yellow" + Localize_cns("FABAO_QUALITY_TXT7") + "#" + fontColor + GetFaBaoQualityStr(quality);
        var configStr = "#yellow" + Localize_cns("ITEM_FIXED_PROPERTY") + "#br";
        if (this.isHero) {
            var levelList = RoleSystem.getInstance().getFaBaoInfoByKey("talismanLevelList");
            var level = levelList[this.index + opTalismanEquipPos.begin - 1] || 0;
            var upConfig = GameConfig.TalismanEquipUpConfig[level];
            var percent = upConfig.percentage;
            this.percent = percent || -1;
            var addPercent = String.format("#orange" + Localize_cns("FABAO_UPGRADE_TXT1"), percent * 100) + "#br#rf";
            configStr += addPercent;
        }
        var config = table_effect(effectConfig.effects);
        var force = GetForceMath(config);
        if (this.isHero && this.percent != -1) {
            var tempConfig = {};
            for (var k in config) {
                tempConfig[k] = config[k] * this.percent;
            }
            force = GetForceMath(tempConfig);
        }
        this.mElemList["bImage"].beginDraw();
        this.mElemList["bImage"].drawNumberString("zhanLi_", "z" + force, 0, 0, -3);
        this.mElemList["bImage"].endDraw();
        for (var k in config) {
            configStr += "#orange" + GetPropertyName(k) + "#rf" + config[k];
            if (this.isHero && this.percent != -1) {
                configStr += "+" + config[k] * this.percent;
            }
            configStr += "#br";
        }
        AddRdContent(this.mElemList["name"], NameStr, "ht_24_lc");
        AddRdContent(this.mElemList["des"], qualityStr, "ht_20_lc");
        AddRdContent(this.mElemList["rd_base"], configStr, "ht_20_cc");
        if (effectConfig.skillTips != "") {
            AddRdContent(this.mElemList["rd_effect"], effectConfig.skillTips, "ht_20_cc");
        }
        var h = 400; //默认是有打造者，也有技能效果
        this.mElemList["group_effect"].visible = true;
        this.mElemList["group_dazao"].visible = true;
        if (quality >= 5 && this.isPlayer == false) {
            this.mElemList["group_dazao"].visible = false;
            h = 329;
        }
        else if (this.isPlayer == true && quality < 5) {
            this.mElemList["group_effect"].visible = false;
            var playerStr = "#orange" + Localize_cns("FABAO_DAZAOZHE") + GetHeroProperty("name");
            AddRdContent(this.mElemList["rd_dazao"], playerStr, "ht_20_lc");
            h = 309;
        }
        else if (this.isPlayer == false && quality < 5) {
            this.mElemList["group_effect"].visible = false;
            this.mElemList["group_dazao"].visible = false;
            h = 219;
        }
        if (this.isHero) {
            this.mElemList["group_effect"].visible = true;
            this.mElemList["group_dazao"].visible = true;
            var playerStr = "#orange" + Localize_cns("FABAO_DAZAOZHE") + GetHeroProperty("name");
            AddRdContent(this.mElemList["rd_dazao"], playerStr, "ht_20_lc");
            h = 400;
        }
        this.mLayoutNode.height = h;
        this.mLayoutNode.width = 450;
        var btn_name = [
            "btn_show", "btn_wear"
        ];
        if (this.index == -1 || this.isHero == true) {
            this.mElemList["btn_wear"].visible = false;
        }
        else {
            this.mElemList["btn_wear"].visible = true;
        }
        var group = this.mElemList["btn_group"];
        var childNum = group.numElements;
        for (var k = 0; k < group.numElements; k++) {
            var child = group.getChildAt(k);
            group.removeChild(child);
        }
        for (var k in btn_name) {
            var btn = btn_name[k];
            if (this.mElemList[btn].visible == true) {
                group.addChild(this.mElemList[btn]);
            }
        }
    };
    FaBaoItemTipsFrame.prototype.onRefreshHero = function () {
        var levelList = RoleSystem.getInstance().getFaBaoInfoByKey("talismanLevelList");
        var level = levelList[this.index + opTalismanEquipPos.begin - 1] || 0;
        var upConfig = GameConfig.TalismanEquipUpConfig[level];
        var percent = upConfig.percentage;
        var addPercent = String.format("#orange" + Localize_cns("FABAO_UPGRADE_TXT1"), percent * 100) + "#br#rf";
        var configStr = "#yellow" + Localize_cns("ITEM_FIXED_PROPERTY") + "#br" + addPercent;
        var itemId = this.item.entryId;
        var quality = this.item.getProperty("quality");
        var effectConfig = GameConfig.TalismanEquipEffectConfig[itemId][quality];
        var config = table_effect(effectConfig.effects);
        for (var k in config) {
            configStr += GetPropertyName(k) + "#blue#space_10" + FormatNumberInt(config[k] * percent) + "#br#rf";
        }
    };
    FaBaoItemTipsFrame.prototype.onRefreshNormal = function () {
    };
    //////////--------------
    FaBaoItemTipsFrame.prototype.onWearClick = function (args) {
        var item = this.item;
        var check = RoleSystem.getInstance().checkFaBaoItem(item.entryId, this.index);
        if (!check) {
            MsgSystem.addTagTips(Localize_cns("FABAO_TIPS_TXT2"));
            return;
        }
        RpcProxy.call("C2G_EquipTalismanSet", item.id, this.index + opTalismanEquipPos.begin - 1);
    };
    FaBaoItemTipsFrame.prototype.onOpenTipsClick = function (logicItem, item) {
        return true;
    };
    //////////////---------
    FaBaoItemTipsFrame.prototype.onShowWnd = function (item, isPlayer, index) {
        this.item = item;
        this.isPlayer = isPlayer || false;
        this.index = index || -1;
        this.showWnd();
    };
    FaBaoItemTipsFrame.prototype.onShowHeroFaBao = function (item, isHero, index) {
        this.item = item;
        this.isHero = isHero;
        this.index = index;
        this.showWnd();
    };
    return FaBaoItemTipsFrame;
}(BaseWnd));
__reflect(FaBaoItemTipsFrame.prototype, "FaBaoItemTipsFrame");
//# sourceMappingURL=FaBaoItemTipsFrame.js.map