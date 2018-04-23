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
var RoleFunTitleWindow = (function (_super) {
    __extends(RoleFunTitleWindow, _super);
    function RoleFunTitleWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoleFunTitleWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    RoleFunTitleWindow.prototype.onLoad = function () {
        var parent = this.mParentWnd;
        this.mElemList = parent.mElemList;
        this.actor = parent.actor;
    };
    RoleFunTitleWindow.prototype.onUnLoad = function () {
    };
    RoleFunTitleWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this);
        RegisterEvent(EventDefine.ACTOR_ROLE_UPDATE, this.onRefresh, this);
        this.mElemList["label_wndName"].text = Localize_cns("ROLE_TXT43");
        this.onRefresh();
    };
    RoleFunTitleWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this);
        UnRegisterEvent(EventDefine.ACTOR_ROLE_UPDATE, this.onRefresh, this);
    };
    RoleFunTitleWindow.prototype.onInitData = function () {
        var index = this.mParentWnd.tabWndList.getTabIndex();
        var info = RoleSystem.getInstance().getRecvList();
        if (size_t(info) == 0)
            return;
        this.jiHuoList = info["unlockfashionlist"];
        this.unreal = info["fashionindex"];
        this.type = cellOptionsIndex.HeroEquip;
        if (index == 1) {
            this.jiHuoList = info["unlocktitlelist"];
            this.unreal = info["titleindex"];
            this.type = cellOptionsIndex.Hero;
        }
        var arr = GameConfig.FunSkinConfig[cellOptionsName[this.type - 1]];
        this.controlList = [];
        if (this.unreal != 0)
            JsUtil.arrayInstert(this.controlList, arr[this.unreal]);
        for (var k in this.jiHuoList) {
            var v = this.jiHuoList[k];
            if (v != this.unreal) {
                JsUtil.arrayInstert(this.controlList, arr[v]);
            }
        }
        for (var k in arr) {
            if (!JsUtil.arrayExsit(this.jiHuoList, k)) {
                JsUtil.arrayInstert(this.controlList, arr[tonumber(k)]);
            }
        }
    };
    RoleFunTitleWindow.prototype.onRefresh = function () {
        this.onInitData();
        var count = size_t(this.controlList);
        //战力
        var length = size_t(this.jiHuoList);
        var totolConfig = GetSumFashionAndTitleProperty(cellOptionsName[this.type - 1]);
        var zhanLi = GetForceMath(totolConfig);
        var str = String.format(Localize_cns("ROLE_SKIN_TXT3"), zhanLi, length);
        AddRdContent(this.mElemList["rd_3"], str, "ht_22_lc", "ublack");
        this.stage = this.stage || 1;
        this.select = this.select || 1;
        this.onRefreshGroup(this.stage);
        this.onShowSelect(this.select);
        //自定义红点
        this.mParentWnd.refreshDotTips();
    };
    RoleFunTitleWindow.prototype.onShowSelect = function (index) {
        for (var i = 1; i <= 5; i++) {
            if (i == index) {
                this.mElemList["select" + i].visible = true;
            }
            else {
                this.mElemList["select" + i].visible = false;
            }
        }
        this.onRefreshDes(index);
    };
    RoleFunTitleWindow.prototype.onRefreshDes = function (index) {
        //common
        index = index + (this.stage - 1) * 5;
        var list = this.controlList[index - 1];
        var str = "";
        var arr = list.effects;
        var skinIndex = list.Index;
        var typename = cellOptionsName[this.type - 1];
        var attrList = GetSingleSkinProperty(typename, skinIndex);
        for (var k_1 in attrList) {
            str += GetPropertyName(lastAbilityNameToIdOptions[k_1]) + attrList[k_1] + "#br";
        }
        if (JsUtil.arrayExsit(this.jiHuoList, skinIndex)) {
            str = "#lime" + str;
        }
        else {
            str = "#gray" + str;
        }
        var desStr = String.format(Localize_cns("ROLE_SKIN_TXT1"), str);
        AddRdContent(this.mElemList["rd_1"], desStr, "ht_22_lc", "white");
        var skinid = list.skin;
        //更新模型
        if (this.mParentWnd.tabWndList.getTabIndex() == 0) {
            var playerInfo = GetHeroPropertyInfo();
            this.mElemList["actor"].visible = true;
            this.mElemList["title_icon"].visible = false;
            var modelList = {
                heroShapeId: skinid,
                rideShapeId: playerInfo.rideShapeId,
            };
            this.actor.updateByPlayerSomeInfo(playerInfo, modelList);
        }
        else {
            this.mElemList["actor"].visible = false;
            this.mElemList["title_icon"].visible = true;
            var image = GetShapeImage(skinid);
            this.mElemList["title_icon"].source = image;
        }
        //this.onRefreshActor(skinid)    
        //战力
        var force = GetForceMath(attrList);
        DrawNumberStringImage(this.mElemList["bImage"], "zhanLi_", "z" + force, 0, 0, -3);
        //已幻化
        if (list["Index"] == this.unreal) {
            this.mElemList["group_rd2"].visible = false;
            this.mElemList["btn_unreal"].visible = false;
            return;
        }
        //已激活
        var k = list["Index"];
        if (JsUtil.arrayExsit(this.jiHuoList, k)) {
            this.mElemList["group_rd2"].visible = false;
            this.mElemList["btn_unreal"].name = "btn_unreal";
            this.mElemList["btn_unreal"].text = Localize_cns("PET_TURN");
            this.mElemList["btn_unreal"].visible = true;
        }
        else {
            var had = ItemSystem.getInstance().getItemCount(list["itemid"]);
            var need = list.itemnum;
            if (had >= need) {
                this.mElemList["group_rd2"].visible = false;
                this.mElemList["btn_unreal"].name = "btn_jiHuo";
                this.mElemList["btn_unreal"].text = Localize_cns("ROLE_TXT20");
                this.mElemList["btn_unreal"].visible = true;
            }
            else {
                this.mElemList["group_rd2"].visible = true;
                this.mElemList["btn_unreal"].visible = false;
                var name_1 = list.nameStr;
                var nameStr = String.format(Localize_cns("ROLE_SKIN_TXT2"), name_1, had, need);
                AddRdContent(this.mElemList["rd_2"], nameStr, "ht_22_lc", "ublack");
                this.mElemList["itemBox"].updateByEntry(list["itemid"]);
                // this.mElemList["rd_4"] 获取途径
            }
        }
    };
    RoleFunTitleWindow.prototype.onRefreshGroup = function (stage) {
        var arr = this.controlList;
        for (var i = 1; i <= 5; i++) {
            var index = (stage - 1) * 5 + (i - 1);
            if (arr[index]) {
                if (!this.mElemList["skin_label" + i]) {
                    var info = [
                        (_a = {}, _a["index_type"] = eui.Label, _a["name"] = "skin_label" + i, _a["title"] = "", _a["font"] = "ht_30_cc", _a["image"] = "", _a["color"] = "white", _a["x"] = 34, _a["y"] = 64, _a["w"] = 48, _a["h"] = 171, _a),
                    ];
                    UiUtil.createElem(info, this.mLayoutNode, this.mElemList, this, this.mElemList["group" + i]);
                }
                this.mElemList["skin_label" + i].text = this.controlList[index].nameStr;
                this.mElemList["name" + i].visible = false;
                this.mElemList["select" + i].visible = false;
                this.mElemList["unreal" + i].visible = false;
                this.mElemList["group" + i].visible = true;
                if (arr[index]["Index"] == this.unreal) {
                    this.mElemList["unreal" + i].visible = true;
                }
            }
            else {
                this.mElemList["group" + i].visible = false;
            }
        }
        this.mElemList["btn_left"].visible = true;
        this.mElemList["btn_right"].visible = true;
        if (this.stage == 1) {
            this.mElemList["btn_left"].visible = false;
        }
        if (this.stage == Math.ceil(size_t(this.controlList) / 5)) {
            this.mElemList["btn_right"].visible = false;
        }
        var _a;
    };
    //btn响应事件
    RoleFunTitleWindow.prototype.onLeftClick = function () {
        if (this.stage == 1)
            return;
        this.stage = this.stage - 1;
        this.onRefreshGroup(this.stage);
    };
    RoleFunTitleWindow.prototype.onRightClick = function () {
        var arr = this.controlList;
        var maxLengh = Math.ceil(size_t(arr) / 5);
        if (this.stage == maxLengh)
            return;
        this.stage = this.stage + 1;
        this.onRefreshGroup(this.stage);
    };
    RoleFunTitleWindow.prototype.onSearchClick = function () {
        var temp = this.mElemList["label_wndName"].text;
        var name = temp.substring(0, 2);
        name = name + Localize_cns("ROLE_SKIN_TXT9");
        var pos = (this.stage - 1) * 5 + (this.select - 1);
        var list = this.controlList[pos];
        var skinIndex = list.Index;
        var str = "";
        var typename = "";
        if (this.mParentWnd.tabWndList.getTabIndex() == 0) {
            typename = "HeroEquip";
        }
        else {
            typename = "Hero";
        }
        var attrList = GetSingleSkinProperty(typename, skinIndex);
        var zhanLi = GetForceMath(attrList);
        for (var k in attrList) {
            str += GetPropertyName(lastAbilityNameToIdOptions[k]) + "#lime" + attrList[k] + "#rf#space";
        }
        var wnd = WngMrg.getInstance().getWindow("CommonSkinPropertyFrame");
        wnd.onShowWnd(zhanLi, name, str);
    };
    RoleFunTitleWindow.prototype.onUnrealClick = function (event) {
        var name = event.target.name;
        var pos = (this.select - 1) + (this.stage - 1) * 5;
        var index = this.controlList[pos].Index;
        if (name == "btn_unreal") {
            if (this.mParentWnd.tabWndList.getTabIndex() == 0) {
                RpcProxy.call("C2G_ACTOR_ROLE_FASHION_SET", tonumber(index));
            }
            else {
                RpcProxy.call("C2G_ACTOR_ROLE_TITLE_SET", tonumber(index));
            }
        }
        else if (name == "btn_jiHuo") {
            if (this.mParentWnd.tabWndList.getTabIndex() == 0) {
                RpcProxy.call("C2G_ACTOR_ROLE_FASHION_UNLOCK", tonumber(index));
            }
            else {
                RpcProxy.call("C2G_ACTOR_ROLE_TITLE_UNLOCK", tonumber(index));
            }
        }
    };
    RoleFunTitleWindow.prototype.onClickSkin = function (event) {
        var name = event.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        //this.onRefreshDes(index);
        this.select = tonumber(index);
        this.onShowSelect(this.select);
    };
    RoleFunTitleWindow.prototype.refreshIconDot = function () {
        var controlList = this.controlList;
        if (controlList == null)
            return;
        for (var k = 1; k <= 5; k++) {
            var pos = (k - 1) + (this.stage - 1) * 5;
            var title = this.controlList[pos];
            if (title == null)
                return;
            var check = GuideFuncSystem.getInstance().checkHeroTitle(title);
            if (check) {
                this.mParentWnd.createDotTipsUI(this.mElemList["group" + k]);
            }
        }
    };
    return RoleFunTitleWindow;
}(BaseCtrlWnd));
__reflect(RoleFunTitleWindow.prototype, "RoleFunTitleWindow");
//# sourceMappingURL=RoleFunTitleWindow.js.map