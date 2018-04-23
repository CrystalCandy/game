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
var RoleEquipsWindow = (function (_super) {
    __extends(RoleEquipsWindow, _super);
    function RoleEquipsWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoleEquipsWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    RoleEquipsWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_fashion", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onFashionClick, _a),
            (_b = {}, _b["name"] = "btn_title", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onFashionClick, _b),
            (_c = {}, _c["name"] = "btn_fman", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onFmanClick, _c),
            (_d = {}, _d["name"] = "btn_fabao", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onFaBaoClick, _d),
            (_e = {}, _e["name"] = "btn_Echange", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onEquipClick, _e),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["rd_lv"].setAlignFlag(gui.Flag.LEFT_CENTER);
        this.mElemList["rd_exp"].setAlignFlag(gui.Flag.RIGHT_CENTER);
        this.onInitEquip(this.mElemList["equip"]);
        this.isEnough = false;
        var image = this.mElemList["hero_icon"];
        image.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickIcon, this);
        for (var k = 1; k <= 4; k++) {
            var tempGroup = this.mElemList["fabao_sprite_" + k];
            tempGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.faBaoItemClick, this);
        }
        var _a, _b, _c, _d, _e;
    };
    RoleEquipsWindow.prototype.onUnLoad = function () {
    };
    RoleEquipsWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.ACTOR_ROLE_UPDATE, this.onRefresh, this);
        this.mElemList["group_equips"].visible = true;
        this.mElemList["label_wndName"].text = Localize_cns("ROLE_TXT11");
        this.onRefresh();
    };
    RoleEquipsWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ACTOR_ROLE_UPDATE, this.onRefresh, this);
        this.mElemList["group_equips"].visible = false;
    };
    RoleEquipsWindow.prototype.onRefresh = function () {
        this.onUpdate();
        this.onRefreshEquip();
    };
    RoleEquipsWindow.prototype.onUpdate = function () {
        //人物图片
        var id = GetHeroProperty("vocation");
        var sex = GetHeroProperty("sexId");
        this.mElemList["hero_icon"].source = GetProfessionImage(id, sex);
        var btnList = [
            this.mElemList["btn_title"], this.mElemList["btn_fman"], this.mElemList["btn_fashion"],
            this.mElemList["btn_fabao"],
        ];
        var top = this.mElemList["group_Etop"];
        var childNum = top.numElements;
        for (var k = 0; k < top.numElements; k++) {
            var child = top.getChildAt(k);
            top.removeChild(child);
        }
        for (var k = 0; k < size_t(btnList); k++) {
            var btn = btnList[k];
            if (btn.visible == true) {
                top.addChildAt(btn, k);
            }
        }
        var info = RoleSystem.getInstance().getRecvList();
        if (size_t(info) == 0)
            return;
        var stage = info["stage"];
        var curExp = info["stageexp"];
        var maxExp = GameConfig.FunUpgradeStageConfig["Hero"][stage].maxexp;
        if (stage >= 80) {
            this.mElemList["bt_E_levelUp"].enabled = true;
            this.mElemList["bt_E_levelUp"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpClick, this);
            this.isEnough = (curExp >= maxExp) ? true : false;
        }
        this.mElemList["bt_E_levelUp"].enabled = false;
        var curExpStr = RoleSystem.getInstance().getExpStr(curExp);
        var maxExpStr = RoleSystem.getInstance().getExpStr(maxExp);
        var strlv = String.format(Localize_cns("ROLE_TXT28"), stage);
        AddRdContent(this.mElemList["rd_lv"], strlv, "ht_20_cc", "ublack");
        var strexp = String.format(Localize_cns("ROLE_EXP"), curExpStr, maxExpStr);
        AddRdContent(this.mElemList["rd_exp"], strexp, "ht_20_cc", "ublack");
        //如果可以换装备-->显示换装按钮
        var equiplist = RoleSystem.getInstance().getRoleEquipList();
        if (size_t(equiplist) == 0) {
            this.mElemList["btn_Echange"].visible = false;
        }
        else {
            this.mElemList["btn_Echange"].visible = true;
        }
        var force = info.force; //GetHeroProperty("force")
        DrawNumberStringImage(this.mElemList["bImage"], "zhanLi_", "z" + force, 0, 0, -3);
    };
    RoleEquipsWindow.prototype.onInitEquip = function (window) {
        var name = "equip";
        for (var i = 1; i <= 10; i++) {
            if (this.mElemList[name + "_bg" + i] == null) {
                var x = 0;
                var y = 110 * (i - 1);
                var parent_1 = "role_equip_left";
                if (i >= 6) {
                    parent_1 = "role_equip_right";
                    y = 110 * (i - 6);
                }
                var icon = RoleSystem.getInstance().getZhuangBeiIcon(i - 1);
                var mElemInfo = [
                    (_a = {}, _a["index_type"] = eui.Group, _a["name"] = name + "_bg" + i, _a["parent"] = parent_1, _a["image"] = "", _a["x"] = x, _a["y"] = y, _a["w"] = 100, _a["h"] = 100, _a),
                    (_b = {}, _b["index_type"] = eui.Image, _b["name"] = name + "_initsprite" + i, _b["parent"] = name + "_bg" + i, _b["title"] = "", _b["image"] = icon, _b["x"] = 10, _b["y"] = 0, _b["w"] = 80, _b["h"] = 80, _b),
                    (_c = {}, _c["index_type"] = eui.Group, _c["name"] = name + "_item" + i, _c["parent"] = name + "_bg" + i, _c["image"] = "", _c["x"] = 0, _c["y"] = 0, _c["w"] = 100, _c["h"] = 100, _c),
                    (_d = {}, _d["index_type"] = eui.Label, _d["name"] = name + "_lv" + i, _d["parent"] = name + "_bg" + i, _d["title"] = "", _d["font"] = "ht_20_cc", _d["image"] = null, _d["color"] = gui.Color.black, _d["x"] = 0, _d["y"] = 80, _d["w"] = 100, _d["h"] = 20, _d),
                ];
                UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window);
                this.mElemList[name + "itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, name + "itemBox" + i, 10, 0, this.mElemList[name + "_item" + i]);
                this.mElemList[name + "_item" + i].visible = false;
                this.mElemList[name + "_lv" + i].visible = false;
            }
        }
        var _a, _b, _c, _d;
    };
    RoleEquipsWindow.prototype.onRefreshEquip = function () {
        var arr = RoleSystem.getInstance().getRoleEquipItemList();
        var count = size_t(arr);
        var name = "equip";
        var subtypeList = GameConfig.FunEquipCaseConfig["Hero"].subtype;
        for (var i = 1; i <= 10; i++) {
            var subtype = subtypeList[i - 1];
            var roleItem = RoleSystem.getInstance().getRoleEquipItem(subtype);
            if (roleItem == null) {
                this.mElemList[name + "_item" + i].visible = false;
                this.mElemList[name + "_lv" + i].visible = false;
            }
            else {
                this.mElemList[name + "_item" + i].visible = true;
                this.mElemList[name + "_lv" + i].visible = true;
                this.mElemList[name + "itemBox" + i].updateByItem(roleItem);
                var level = roleItem.getRefProperty("uselevel");
                var str = String.format(Localize_cns("ROLE_TXT34"), level);
                this.mElemList[name + "_lv" + i].text = str;
            }
        }
    };
    RoleEquipsWindow.prototype.onFashionClick = function (event) {
        var name = event.target.name;
        var index = (name == "btn_fashion") ? 0 : 1;
        var wnd = WngMrg.getInstance().getWindow("RoleFATFrame");
        wnd.showWithIndex(index);
    };
    RoleEquipsWindow.prototype.onUpClick = function (event) {
        if (this.isEnough == false)
            return;
        RpcProxy.call("C2G_ACTOR_ROLE_UPGRADE");
    };
    RoleEquipsWindow.prototype.onFmanClick = function () {
        var wnd = WngMrg.getInstance().getWindow("RoleFashionPeopleFrame");
        wnd.showWnd();
    };
    RoleEquipsWindow.prototype.onEquipClick = function () {
        var stage = RoleSystem.getInstance().getRoleInfo("stage");
        var equiplist = RoleSystem.getInstance().getRoleEquipList(stage);
        if (size_t(equiplist) == 0)
            return;
        var gidList = [];
        for (var k in equiplist) {
            var item = equiplist[k];
            JsUtil.arrayInstert(gidList, item.id);
        }
        RpcProxy.call("C2G_ACTOR_ROLE_INFO_EQUIP_SET", gidList);
    };
    RoleEquipsWindow.prototype.onFaBaoClick = function (event) {
        var wnd = WngMrg.getInstance().getWindow("RoleFaBaoFrame");
        wnd.showWithIndex(0);
    };
    RoleEquipsWindow.prototype.faBaoItemClick = function (event) {
        var name = event.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        var wnd = WngMrg.getInstance().getWindow("RoleFaBaoFrame");
        wnd.showWithIndex(0, tonumber(index));
    };
    RoleEquipsWindow.prototype.onClickIcon = function () {
        var wnd = WngMrg.getInstance().getWindow("RolePropertyFrame");
        wnd.showWnd();
    };
    return RoleEquipsWindow;
}(BaseCtrlWnd));
__reflect(RoleEquipsWindow.prototype, "RoleEquipsWindow");
//# sourceMappingURL=RoleEquipsWindow.js.map