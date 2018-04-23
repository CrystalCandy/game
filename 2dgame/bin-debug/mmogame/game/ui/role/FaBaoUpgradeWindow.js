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
var FaBaoUpgradeWindow = (function (_super) {
    __extends(FaBaoUpgradeWindow, _super);
    function FaBaoUpgradeWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FaBaoUpgradeWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    FaBaoUpgradeWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        this.actor = this.mParentWnd.actor;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_up", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onUpClick, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a;
    };
    FaBaoUpgradeWindow.prototype.onUnLoad = function () {
    };
    FaBaoUpgradeWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.ACTOR_ROLE_FABAO_UPDATE, this.onRefresh, this);
        RegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this);
        this.mElemList["group_fabao"].visible = true;
        this.mElemList["shengji"].visible = true;
        this.mElemList["title"].text = Localize_cns("FABAO_TITLE_TXT2");
        this.onRefresh();
    };
    FaBaoUpgradeWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ACTOR_ROLE_FABAO_UPDATE, this.onRefresh, this);
        UnRegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this);
        this.mElemList["group_fabao"].visible = false;
        this.mElemList["shengji"].visible = false;
    };
    FaBaoUpgradeWindow.prototype.onRefresh = function () {
        this.mParentWnd.refreshFaBaoItem();
        var fabaoInfo = RoleSystem.getInstance().getFaBaoInfo(); //"talismanLevelList:table", "talismanlist:table"
        if (fabaoInfo == null)
            return;
        var levelList = fabaoInfo["talismanLevelList"];
        var force = fabaoInfo["force"];
        DrawNumberStringImage(this.mElemList["bImage"], "zhanLi_", "z" + force, 0, 0, -3);
        this.select = this.mParentWnd.selectIndex || 2;
        this.mElemList["btn_quality"].visible = true;
        var playerInfo = GetHeroPropertyInfo();
        var actorView = this.actor;
        actorView.updateByPlayerAppearInfo(playerInfo);
        //如果没有法宝，不能升级
        var equipItem = RoleSystem.getInstance().getFaBaoItem(this.select);
        if (levelList[this.select + opTalismanEquipPos.begin - 1] == null || equipItem == null) {
            this.mElemList["shengji"].visible = false;
            this.mElemList["fabao"].visible = true;
            return;
        }
        this.mElemList["shengji"].visible = true;
        this.mElemList["fabao"].visible = false;
        var stage = levelList[this.select + opTalismanEquipPos.begin - 1] || 0;
        var upConfig = GameConfig.TalismanEquipUpConfig[stage];
        var itemid = upConfig.entryId;
        this.needId = itemid;
        var count = upConfig.needNum;
        var percent = upConfig.percentage;
        var nextPercent = GameConfig.TalismanEquipUpConfig[stage + 1].percentage;
        var item = equipItem.entryId;
        var quality = equipItem.getProperty("quality");
        var effectConfig = GameConfig.TalismanEquipEffectConfig[item][quality];
        var config = table_effect(effectConfig.effects);
        var desStr1 = String.format("#blue" + Localize_cns("FABAO_UPGRADE_TXT1"), percent * 100) + "#br#rf";
        for (var k in config) {
            var v = config[k];
            desStr1 += GetPropertyName(k) + "#lime" + FormatNumberInt(v) + "+" + FormatNumberInt(v * percent) + "#br#rf";
        }
        var desStr2 = String.format("#blue" + Localize_cns("FABAO_UPGRADE_TXT1"), nextPercent * 100) + "#br#rf";
        for (var k in config) {
            var v = config[k];
            desStr2 += GetPropertyName(k) + "#lime" + FormatNumberInt(v) + "+" + FormatNumberInt(v * nextPercent) + "#br#rf";
        }
        AddRdContent(this.mElemList["rd_effect_1"], desStr1, "ht_20_lc");
        AddRdContent(this.mElemList["rd_effect_2"], desStr2, "ht_20_lc");
        if (this.mElemList["upgradeBox"] == null) {
            this.mElemList["upgradeBox"] = UIItemBox.newObj(this.mLayoutNode, "upgradeBox", 30, 210, this.mElemList["shengji"]);
        }
        this.mElemList["upgradeBox"].updateByEntry(itemid);
        var hadStr = "#" + GetItemFontColor(itemid) + GameConfig.itemConfig[itemid].name + "#red*" + count;
        var had = ItemSystem.getInstance().getItemCount(itemid);
        this.needNum = count - had;
        hadStr += "#br#br#rf" + Localize_cns("ITEM_TXT30") + "#green" + had;
        AddRdContent(this.mElemList["rd_had"], hadStr, "ht_20_lc");
    };
    ////////------------响应事件
    FaBaoUpgradeWindow.prototype.onFaBaoClick = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        this.select = tonumber(index);
        this.mParentWnd.selectIndex = this.select;
        for (var k = 1; k <= 4; k++) {
            this.mElemList["image_select_" + k].visible = false;
        }
        this.mElemList["image_select_" + this.select].visible = true;
        this.onRefresh();
    };
    FaBaoUpgradeWindow.prototype.onUpClick = function () {
        if (this.needNum > 0) {
            if (this.needId == null || this.needNum == null)
                return;
            var wnd = WngMrg.getInstance().getWindow("GoodsAsseceFrame");
            wnd.onShowWnd(this.needId, this.needNum);
            return;
        }
        RpcProxy.call("C2G_EquipTalismanUp", this.select + opTalismanEquipPos.begin - 1);
    };
    return FaBaoUpgradeWindow;
}(BaseCtrlWnd));
__reflect(FaBaoUpgradeWindow.prototype, "FaBaoUpgradeWindow");
//# sourceMappingURL=FaBaoUpgradeWindow.js.map