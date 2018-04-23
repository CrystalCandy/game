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
var ForgeDuanZaoWindow = (function (_super) {
    __extends(ForgeDuanZaoWindow, _super);
    function ForgeDuanZaoWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ForgeDuanZaoWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.type = "duanlian";
        this.force = 0;
    };
    ForgeDuanZaoWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        this.oldlist = {};
        this.recvList = {};
        this.select = -1;
        this.timer = null;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_oneKey", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onOneKeyClick, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a;
    };
    ForgeDuanZaoWindow.prototype.onUnLoad = function () {
    };
    ForgeDuanZaoWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.FORGE_UPDATE, this.onRefresh, this);
        RegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this);
        //this.mElemList["image_jianTou"].visible = true;
        this.mElemList["label_wndName"].text = Localize_cns("FORGE_TXT3");
        var str = String.format(Localize_cns("FORGE_BTN"), Localize_cns("FORGE_TXT3"));
        this.mElemList["btn_oneKey"].text = str;
        this.onInit();
        this.onRefresh();
    };
    ForgeDuanZaoWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.FORGE_UPDATE, this.onRefresh, this);
        UnRegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this);
        //this.mElemList["image_jianTou"].visible = false;
        if (this.timer != null) {
            KillTimer(this.timer);
            this.timer = null;
        }
    };
    ForgeDuanZaoWindow.prototype.onInit = function () {
        this.recvList = ForgeSystem.getInstance().getForgeInfo(this.type);
        this.oldlist = this.recvList;
        for (var i = 1; i <= 10; i++) {
            this.mElemList["equipItem_select" + i].visible = false;
        }
        this.onInitForce();
    };
    ForgeDuanZaoWindow.prototype.onRefresh = function () {
        ///刷新大师
        var forgeType = ForgeSystem.getInstance().getForgeInfo("forgeType");
        if (forgeType == null)
            return;
        if (this.timer != null)
            return;
        var index = this.mParentWnd.tabWndList.getTabIndex();
        var dashiLevel = ForgeSystem.getInstance().getForgeClassType(this.type);
        var forgeLevel = ForgeSystem.getInstance().getForgeTypeLevel(this.type);
        var isJiHuo = dashiLevel == 0 ? false : true;
        var needLevel = ForgeSystem.getInstance().getDaShiNeedLevel(this.type, index);
        var shulianStr = "#lime(" + forgeLevel + "/" + needLevel + ")";
        AddRdContent(this.mElemList["rd_shuLianDu"], shulianStr, "ht_20_cc");
        UiUtil.grayComponent(this.mElemList["dashi_icon"], !isJiHuo);
        if (dashiLevel == 0) {
            this.mElemList["label_jie"].visible = false;
        }
        else {
            this.mElemList["label_jie"].visible = true;
            this.mElemList["label_jie"].text = dashiLevel + Localize_cns("PET_TXT10");
        }
        var imageName = "dz_Bt0";
        imageName = imageName + (index + 1);
        this.mElemList["dashi_icon"].source = imageName;
        this.select = 1;
        this.recvList = ForgeSystem.getInstance().getForgeInfo(this.type);
        if (size_t(this.recvList) == 0)
            return;
        this.stage = 5;
        var arr = this.oldlist;
        var count = size_t(arr);
        for (var i = 0; i < count; i++) {
            if (arr[i] != 0) {
                this.mElemList["equipItem_lv" + (i + 1)].visible = true;
                var str = String.format(Localize_cns("FORGE_TXT5"), arr[i]);
                this.mElemList["equipItem_lv" + (i + 1)].text = str;
            }
            else {
                this.mElemList["equipItem_lv" + (i + 1)].visible = false;
            }
            if (arr[i + 1] < arr[i]) {
                this.select = i + 1 + 1;
            }
        }
        this.onRefreshDes();
        if (this.oldlist[this.select - 1] != this.recvList[this.select - 1]) {
            if (this.timer == null) {
                this.timer = SetTimer(this.onTimer, this, 100);
            }
            this.onRefreshDes();
        }
        //
    };
    ForgeDuanZaoWindow.prototype.onInitForce = function () {
        var levelList = this.oldlist;
        var forceConfig = {};
        for (var k = 1; k <= 10; k++) {
            var config = GameConfig.FunForgeConfig[this.type];
            var stage = levelList[k - 1];
            if (stage == 0)
                continue;
            var tempcConfig = ForgeSystem.getInstance().getCellForgeConfig(this.type, k - 1, stage);
            forceConfig = table_effect_add(forceConfig, tempcConfig);
        }
        this.force = GetForceMath(forceConfig);
        this.refreshForceNum(this.force);
    };
    ForgeDuanZaoWindow.prototype.onTimer = function () {
        for (var i = 1; i <= 10; i++) {
            this.mElemList["equipItem_select" + i].visible = false;
        }
        this.select += 1;
        this.onRefreshDes();
    };
    ForgeDuanZaoWindow.prototype.onRefreshDes = function () {
        var endIndex = 11;
        var isEnd = false;
        var arr = this.recvList;
        for (var i = 0; i < size_t(arr); i++) {
            if (arr[i - 1] > arr[i]) {
                endIndex = i + 1;
            }
        }
        if (this.select == endIndex) {
            isEnd = true;
        }
        if (this.select > 10) {
            // select -= 10
            this.select -= 10;
        }
        var index = this.mParentWnd.tabWndList.getTabIndex();
        //rd_des
        var levelList = this.recvList;
        var level = levelList[this.select - 1];
        var config = GameConfig.FunForgeConfig[this.type];
        this.mElemList["rd_baoshi"].visible = false;
        this.mElemList["group_qianghua"].visible = true;
        var nowConfig = ForgeSystem.getInstance().getCellForgeConfig(this.type, this.select - 1, level);
        var nextConfig = ForgeSystem.getInstance().getCellForgeConfig(this.type, this.select - 1, level + 1);
        var force = 0;
        var str1 = "";
        var str2 = "";
        if (level == 0) {
            str1 = Localize_cns("FORGE_LEVEL_FALSE");
            str2 = ForgeSystem.getInstance().getForgeConfigStr(nextConfig);
        }
        else {
            str1 = ForgeSystem.getInstance().getForgeConfigStr(nowConfig);
            force = GetForceMath(nowConfig);
            str2 = ForgeSystem.getInstance().getForgeConfigStr(nextConfig);
        }
        AddRdContent(this.mElemList["rd_1"], str1, "ht_20_cc_stroke", "white");
        AddRdContent(this.mElemList["rd_2"], "#lime" + str2, "ht_20_cc_stroke", "white");
        //rd_cost
        var had = 0;
        var maxCost = 0;
        var costConfig = config[level + 1] || config[level];
        var countId = costConfig.itemid;
        had = ItemSystem.getInstance().getItemCount(countId);
        maxCost = costConfig.itemnum;
        var cStr;
        if (had >= maxCost) {
            cStr = "#lime";
        }
        else {
            cStr = "#red";
        }
        var itemStr = GetTagIcon(countId);
        var costStr = String.format(Localize_cns("FORGE_COST"), itemStr, cStr, had, maxCost);
        AddRdContent(this.mElemList["rd_cost"], costStr, "ht_20_cc_stroke", "white");
        //rd_access
        var accessStr = Localize_cns("FORGE_TXT1" + (index + 1));
        AddRdContent(this.mElemList["rd_access"], accessStr, "ht_20_cc", "lime");
        this.mElemList["rect_rd"].width = 20 * accessStr.length;
        this.mElemList["equipItem_select" + this.select].visible = true;
        if (this.recvList[this.select - 1] != 0) {
            this.mElemList["equipItem_lv" + this.select].visible = true;
            var str = String.format(Localize_cns("FORGE_TXT5"), this.recvList[this.select - 1]);
            this.mElemList["equipItem_lv" + this.select].text = str;
        }
        else {
            this.mElemList["equipItem_lv" + this.select].visible = false;
        }
        var oldlevel = this.oldlist[this.select - 1];
        var oldForce = 0;
        if (oldlevel != 0) {
            var oldForceConfig = ForgeSystem.getInstance().getCellForgeConfig(this.type, this.select - 1, oldlevel);
            oldForce = GetForceMath(oldForceConfig);
        }
        if (this.timer != null) {
            this.force += (force - oldForce);
        }
        this.refreshForceNum(this.force);
        if (isEnd == true) {
            if (this.timer != null) {
                KillTimer(this.timer);
                this.timer = null;
                this.oldlist = levelList;
                this.onInitForce();
            }
        }
    };
    ForgeDuanZaoWindow.prototype.refreshForceNum = function (force) {
        DrawNumberStringImage(this.mElemList["bImage"], "zhanLi_", "z" + force, 0, 0, -3);
    };
    //////响应事件
    ForgeDuanZaoWindow.prototype.onOneKeyClick = function () {
        if (this.timer != null)
            return;
        var index = this.mParentWnd.tabWndList.getTabIndex();
        if (index == 2) {
            var countId = GameConfig.FunForgeConfig[this.type][this.recvList[this.select - 1] + 1].itemid;
            var had = ItemSystem.getInstance().getItemCount(countId);
            var maxCost = GameConfig.FunForgeConfig[this.type][this.recvList[this.select - 1] + 1].itemnum;
            if (had < maxCost) {
                var wnd = WngMrg.getInstance().getWindow("GoodsAsseceFrame");
                wnd.onShowWnd(countId, maxCost - had);
            }
            else {
                this.oldlist = this.recvList;
                RpcProxy.call("C2G_EQUIP_FORGE_UPGRADE", index + 1);
            }
        }
    };
    return ForgeDuanZaoWindow;
}(BaseCtrlWnd));
__reflect(ForgeDuanZaoWindow.prototype, "ForgeDuanZaoWindow");
//# sourceMappingURL=ForgeDuanZaoWindow.js.map