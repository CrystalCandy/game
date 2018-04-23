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
var CommonSkinsFrame = (function (_super) {
    __extends(CommonSkinsFrame, _super);
    function CommonSkinsFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonSkinsFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/usual/CommonSkinsLayout.exml"];
        this.jiHuoList = {};
    };
    CommonSkinsFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        this.controlList = [];
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_left", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onLeftClick, _b),
            (_c = {}, _c["name"] = "btn_right", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onRightClick, _c),
            (_d = {}, _d["name"] = "btn_search", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onSearchClick, _d),
            (_e = {}, _e["name"] = "btn_unreal", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onUnrealClick, _e),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.select = 0;
        this.mElemList["rd_1"].setAlignFlag(gui.Flag.H_CENTER);
        this.mElemList["rd_2"].setAlignFlag(gui.Flag.LEFT_CENTER);
        this.mElemList["rd_3"].setAlignFlag(gui.Flag.LEFT_CENTER);
        this.mElemList["rd_4"].setAlignFlag(gui.Flag.LEFT_CENTER);
        this.mElemList["itemBox"] = UIItemBox.newObj(this.mLayoutNode, "itemBox", 0, -2, this.mElemList["group_rd2"]);
        var _a, _b, _c, _d, _e;
    };
    CommonSkinsFrame.prototype.onUnLoad = function () {
        if (this.Player) {
            var actorview = this.mElemList["actor_view"];
            this.Player.leaveViewer(actorview);
            this.Player.deleteObj();
            this.Player = null;
        }
        var actorView = this.mElemList["actorview"];
        actorView.clearView();
    };
    CommonSkinsFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.PET_FUN_INFO_UPDATE, this.onRefresh, this);
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.onRefresh();
    };
    CommonSkinsFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.PET_FUN_INFO_UPDATE, this.onRefresh, this);
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
        this.jiHuoList = {};
        this.controlList = {};
    };
    CommonSkinsFrame.prototype.onChargeClick = function () {
    };
    CommonSkinsFrame.prototype.onRefresh = function () {
        var skinName = cellOptionsName[this.type - 1];
        var funInfo = FunSystem.getInstance().getFunInfoWithType(this.type);
        this.unreal = funInfo.curskin; //当前皮肤
        this.jiHuoList = funInfo.skinlist;
        var arr = GameConfig.FunSkinConfig[skinName];
        var wndName = (_a = {},
            _a["HeroRide"] = Localize_cns("HeroRide"),
            _a["HeroWing"] = Localize_cns("HeroWing"),
            _a["TianNv"] = Localize_cns("TianNv"),
            _a["TianXianWeapon"] = Localize_cns("TianXianWeapon"),
            _a["TianXian"] = Localize_cns("TianXian"),
            _a);
        this.mElemList["title"].text = wndName[skinName] + Localize_cns("ROLE_TXT37");
        // if(size_t(this.controlList) == 0){
        this.controlList = [];
        if (this.unreal != 0)
            JsUtil.arrayInstert(this.controlList, arr[this.unreal]);
        for (var k in this.jiHuoList) {
            var v = this.jiHuoList[k];
            if (v != this.unreal) {
                JsUtil.arrayInstert(this.controlList, arr[v]);
            }
        }
        //let count = size_t(this.controlList);
        for (var k in arr) {
            if (!JsUtil.arrayExsit(this.jiHuoList, k)) {
                JsUtil.arrayInstert(this.controlList, arr[tonumber(k)]);
            }
        }
        //   }
        //战力
        var config = GetSumSkinProperty(this.type);
        var zhanLi = GetForceMath(config);
        var str = String.format(Localize_cns("ROLE_SKIN_TXT3"), zhanLi, size_t(this.jiHuoList));
        AddRdContent(this.mElemList["rd_3"], str, "ht_22_lc", "ublack");
        this.select = 1;
        this.stage = 1;
        this.onRefreshGroup(this.stage);
        this.onShowSelect(this.select);
        var _a;
    };
    CommonSkinsFrame.prototype.onRefreshGroup = function (stage) {
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
                var elem = this.mElemList["group" + i];
                elem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSkin, this);
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
    CommonSkinsFrame.prototype.onShowWnd = function (cellOptionsIndex) {
        this.type = cellOptionsIndex;
        this.showWnd();
    };
    CommonSkinsFrame.prototype.onClickSkin = function (event) {
        var name = event.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        //this.onRefreshDes(index);
        this.select = tonumber(index);
        this.onShowSelect(this.select);
    };
    CommonSkinsFrame.prototype.onShowSelect = function (index) {
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
    CommonSkinsFrame.prototype.onRefreshDes = function (index) {
        //common
        index = index + (this.stage - 1) * 5;
        var list = this.controlList[index - 1];
        var str = "";
        var skinIndex = list.Index;
        var arr = list.effects;
        var attrList = GetSingleSkinProperty(cellOptionsName[this.type - 1], skinIndex);
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
        ////更新模型
        var skinid = list.skin;
        if (this.Player == null) {
            this.Player = Player.newObj();
        }
        if (this.mElemList["actorview"] == null) {
            this.mElemList["actorview"] = UIActorView.newObj(this.mLayoutNode, "actorview", 0, 0, this.mElemList["actor"]);
        }
        var lodelRide = false;
        var playerInfo = GetHeroPropertyInfo();
        var typeList = (_a = {},
            _a[cellOptionsIndex.TianXian] = {
                rideShapeId: playerInfo.rideShapeId,
                wingShapeId: skinid,
            },
            _a[cellOptionsIndex.HeroWing] = {
                rideShapeId: playerInfo.rideShapeId,
                wingShapeId: skinid,
            },
            _a);
        for (var k_2 in typeList) {
            if (tonumber(k_2) == this.type) {
                lodelRide = true;
                break;
            }
        }
        if (lodelRide == true) {
            this.mElemList["actor"].visible = true;
            this.mElemList["actor_view"].visible = false;
            var modelList = typeList[this.type];
            this.mElemList["actorview"].updateByPlayerSomeInfo(playerInfo, modelList);
        }
        else {
            this.mElemList["actor"].visible = false;
            this.mElemList["actor_view"].visible = true;
            this.onRefreshActor(skinid);
        }
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
        var _a;
    };
    CommonSkinsFrame.prototype.onRefreshActor = function (id) {
        var actorview = this.mElemList["actor_view"];
        var actor = this.Player;
        var modelId = id;
        actor.loadModel(modelId);
        actor.changeAction("idle", 1.0, true);
        actor.setPositionXY(0, 0);
        actor.enterViewer(actorview);
        //缩放
        actor.setScale(1.0);
        //方向
        actor.setDir(1);
    };
    ////////////////////////响应事件
    CommonSkinsFrame.prototype.onLeftClick = function () {
        if (this.stage == 1)
            return;
        this.stage = this.stage - 1;
        // console.log(this.stage)
        this.onRefreshGroup(this.stage);
    };
    CommonSkinsFrame.prototype.onRightClick = function () {
        var arr = this.controlList;
        var maxLengh = Math.ceil(size_t(arr) / 5);
        if (this.stage == maxLengh)
            return;
        this.stage = this.stage + 1;
        console.log(this.stage);
        this.onRefreshGroup(this.stage);
    };
    CommonSkinsFrame.prototype.onUnrealClick = function (event) {
        var name = event.target.name;
        var pos = (this.select - 1) + (this.stage - 1) * 5;
        var index = this.controlList[pos].Index;
        if (name == "btn_unreal") {
            RpcProxy.call("C2G_TEMPCELLFUN_SKIN_SET", this.type, index);
        }
        else if (name == "btn_jiHuo") {
            RpcProxy.call("C2G_TEMPCELLFUN_SKIN_UNLOCK", this.type, index);
        }
        else {
        }
    };
    CommonSkinsFrame.prototype.onSearchClick = function () {
        var temp = this.mElemList["title"].text;
        var name = temp.substring(0, 2);
        name = name + Localize_cns("ROLE_SKIN_TXT9");
        var pos = (this.stage - 1) * 5 + (this.select - 1);
        var list = this.controlList[pos];
        if (list == null)
            return;
        var skinIndex = list.Index;
        var str = "";
        var attrList = GetSingleSkinProperty(cellOptionsName[this.type - 1], skinIndex);
        var zhanLi = GetForceMath(attrList);
        for (var k in attrList) {
            str += GetPropertyName(lastAbilityNameToIdOptions[k]) + "#lime" + attrList[k] + "#rf#space";
        }
        var wnd = WngMrg.getInstance().getWindow("CommonSkinPropertyFrame");
        wnd.onShowWnd(zhanLi, name, str, list.skin);
    };
    return CommonSkinsFrame;
}(BaseWnd));
__reflect(CommonSkinsFrame.prototype, "CommonSkinsFrame");
//# sourceMappingURL=CommonSkinsFrame.js.map