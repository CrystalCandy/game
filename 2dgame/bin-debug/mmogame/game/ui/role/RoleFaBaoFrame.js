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
var RoleFaBaoFrame = (function (_super) {
    __extends(RoleFaBaoFrame, _super);
    function RoleFaBaoFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoleFaBaoFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/role/RoleFaBaoLayout.exml"];
        this.tabIndex = -1;
    };
    RoleFaBaoFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_quality", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onQualityClick, _c),
            (_d = {}, _d["name"] = "image_select_1", _d["messageFlag"] = true, _d),
            (_e = {}, _e["name"] = "image_select_2", _e["messageFlag"] = true, _e),
            (_f = {}, _f["name"] = "image_select_3", _f["messageFlag"] = true, _f),
            (_g = {}, _g["name"] = "image_select_4", _g["messageFlag"] = true, _g),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var tabInfoList = [
            { name: "tab_0", wnd: FaBaoFaBaoWindow.newObj(this.mLayoutNode, this) },
            { name: "tab_1", wnd: FaBaoUpgradeWindow.newObj(this.mLayoutNode, this) },
            { name: "tab_2", wnd: FaBaoDaZaoWindow.newObj(this.mLayoutNode, this) },
            { name: "tab_3", wnd: FaBaoFenJieWindow.newObj(this.mLayoutNode, this) },
        ];
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList);
        this.actor = UIActorView.newObj(this.mLayoutNode, "actorview", 0, 0, this.mElemList["actor"]);
        for (var k = 1; k <= 4; k++) {
            var group = this.mElemList["fabao_" + k];
            group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFaBaoClick, this);
        }
        var _a, _b, _c, _d, _e, _f, _g;
    };
    RoleFaBaoFrame.prototype.onUnLoad = function () {
    };
    RoleFaBaoFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.tabWndList.setWndVisible(true);
        if (this.tabIndex != -1) {
            this.tabWndList.changeTabWithIndex(this.tabIndex);
        }
    };
    RoleFaBaoFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.tabWndList.setWndVisible(false);
    };
    ////--------刷新元宝显示
    RoleFaBaoFrame.prototype.refreshFaBaoItem = function () {
        var fabaoInfo = RoleSystem.getInstance().getFaBaoInfo(); //"talismanLevelList:table", "talismanlist:table"
        if (fabaoInfo == null)
            return;
        var levelList = fabaoInfo["talismanLevelList"];
        for (var k = 1; k <= 4; k++) {
            var item = RoleSystem.getInstance().getFaBaoItem(k);
            var source = "";
            var name_1 = Localize_cns("FABAO_NAME");
            if (item == null) {
                var unLockList = [
                    100, 105, 110, 165
                ];
                var level = GetHeroProperty("level");
                source = "ty_jiNengDi03";
                if (level < unLockList[k - 1]) {
                    source = "cw_jiNengSuo";
                    name_1 = unLockList[k - 1] + Localize_cns("FABAO_JIESUO");
                }
                this.mElemList["image_sprite_" + k].source = source;
                this.mElemList["label_level_" + k].visible = false;
                this.mElemList["level_bg_" + k].visible = false;
                this.mElemList["name_" + k].text = name_1;
                this.mElemList["label_level_" + k].visible = false;
                continue;
            }
            source = GetItemIcon(item.entryId);
            this.mElemList["image_sprite_" + k].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenTipsClick, this);
            name_1 = item.getName();
            this.mElemList["image_sprite_" + k].source = source;
            this.mElemList["label_level_" + k].visible = true;
            this.mElemList["level_bg_" + k].visible = true;
            this.mElemList["label_level_" + k].text = levelList[k + opTalismanEquipPos.begin - 1];
            this.mElemList["name_" + k].text = name_1;
        }
    };
    ///--------------响应事件
    RoleFaBaoFrame.prototype.onQualityClick = function () {
        var wnd = WngMrg.getInstance().getWindow("RoleFaBaoQualityFrame");
        wnd.showWithIndex(0);
    };
    RoleFaBaoFrame.prototype.onFaBaoClick = function (args) {
        var wnd = this.tabWndList.getCurrentWnd();
        if (wnd) {
            if (wnd.onFaBaoClick == null)
                return;
            wnd.onFaBaoClick(args);
        }
    };
    RoleFaBaoFrame.prototype.onOpenTipsClick = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        var item = RoleSystem.getInstance().getFaBaoItem(tonumber(index));
        if (item == null)
            return;
        var wnd = WngMrg.getInstance().getWindow("FaBaoItemTipsFrame");
        wnd.onShowHeroFaBao(item, true, tonumber(index));
    };
    RoleFaBaoFrame.prototype.showWithIndex = function (index, seletIndex) {
        this.tabIndex = index;
        this.selectIndex = seletIndex || 2;
        this.showWnd();
    };
    return RoleFaBaoFrame;
}(BaseWnd));
__reflect(RoleFaBaoFrame.prototype, "RoleFaBaoFrame");
//# sourceMappingURL=RoleFaBaoFrame.js.map