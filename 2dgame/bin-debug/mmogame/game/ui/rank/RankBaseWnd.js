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
var itemRender;
(function (itemRender) {
    var RankItem = (function (_super) {
        __extends(RankItem, _super);
        function RankItem() {
            var _this = _super.call(this) || this;
            _this.mElemList = {};
            var Info = [
                (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = "bg", _a["image"] = "ty_uiDi04", _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["w"] = 410, _a["h"] = 85, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = null, _a),
                (_b = {}, _b["index_type"] = eui.Image, _b["name"] = "rankbg", _b["image"] = "bh_textDi01", _b["color"] = gui.Color.white, _b["x"] = 15, _b["y"] = 15, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = null, _b),
                (_c = {}, _c["index_type"] = eui.Label, _c["name"] = "rankTitle", _c["parent"] = "rankbg", _c["title"] = "", _c["font"] = "ht_24_cc", _c["color"] = gui.Color.white, _c["x"] = 0, _c["y"] = 0, _c["w"] = 50, _c["h"] = 50, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = null, _c),
                (_d = {}, _d["index_type"] = eui.Group, _d["name"] = "group_petbox", _d["image"] = "ty_uiDi04", _d["color"] = gui.Color.white, _d["x"] = 60, _d["y"] = -10, _d["w"] = 80, _d["h"] = 80, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = null, _d),
                (_e = {}, _e["index_type"] = eui.Image, _e["name"] = "vipbg", _e["image"] = "ty_textDi05", _e["color"] = gui.Color.white, _e["x"] = 70, _e["y"] = 60, _e["w"] = 85, _e["h"] = 35, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = null, _e),
                (_f = {}, _f["index_type"] = eui.Image, _f["name"] = "vipIcon", _f["image"] = "vipLv01", _f["parent"] = "vipbg", _f["color"] = gui.Color.white, _f["x"] = 0, _f["y"] = 0, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = null, _f),
                (_g = {}, _g["index_type"] = gui.Grid9Image, _g["name"] = "plrBg", _g["image"] = "phb_textDi", _g["color"] = gui.Color.white, _g["x"] = 160, _g["y"] = 10, _g["w"] = 140, _g["h"] = 65, _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = null, _g),
                (_h = {}, _h["index_type"] = eui.Label, _h["name"] = "nameTitle", _h["parent"] = "plrBg", _h["title"] = "", _h["font"] = "ht_22_lc", _h["color"] = gui.Color.ublack, _h["x"] = 5, _h["y"] = 5, _h["w"] = 130, _h["h"] = 25, _h["event_name"] = egret.TouchEvent.TOUCH_TAP, _h["fun_index"] = null, _h),
                (_j = {}, _j["index_type"] = eui.Label, _j["name"] = "forceTitle", _j["parent"] = "plrBg", _j["title"] = "", _j["font"] = "ht_22_lc", _j["color"] = gui.Color.zongse, _j["x"] = 5, _j["y"] = 35, _j["w"] = 130, _j["h"] = 25, _j["event_name"] = egret.TouchEvent.TOUCH_TAP, _j["fun_index"] = null, _j),
                (_k = {}, _k["index_type"] = eui.Image, _k["name"] = "extrabg", _k["image"] = "phb_textDi02", _k["color"] = gui.Color.white, _k["x"] = 300, _k["y"] = 10, _k["event_name"] = egret.TouchEvent.TOUCH_TAP, _k["fun_index"] = null, _k),
                (_l = {}, _l["index_type"] = gui.RichDisplayer, _l["name"] = "extraRd", _l["parent"] = "extrabg", _l["color"] = gui.Color.white, _l["x"] = 20, _l["y"] = 10, _l["w"] = 90, _l["h"] = 50, _l["event_name"] = egret.TouchEvent.TOUCH_TAP, _l["fun_index"] = null, _l),
            ];
            UiUtil.createElem(Info, _this, _this.mElemList, _this);
            _this.mElemList["petIcon"] = UIPetBox.newObj(_this, "petIcon", 0, 0, _this.mElemList["group_petbox"], 0.7);
            _this.mElemList["extraRd"].setAlignFlag(gui.Flag.CENTER_CENTER);
            return _this;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        }
        RankItem.prototype.dataChanged = function () {
            var wrapData = this.data;
            var data = wrapData.data;
            if (wrapData.index == 1) {
                this.mElemList["bg"].source = "ty_uiDi04";
            }
            else {
                this.mElemList["bg"].source = "ty_uiDi03";
            }
            //plrLevel, force, plrId, vipLevel,  plrName, plrVocation, plrSex
            this.mElemList["rankTitle"].text = wrapData.index;
            this.mElemList["vipIcon"].source = GetVipIcon(data[3]);
            this.mElemList["nameTitle"].text = data[4]; //名字
            this.mElemList["forceTitle"].text = String.format(Localize_cns("RANK_TXT3"), MakeLongNumberShort(data[1])); //战力
            this.mElemList["petIcon"].updateRoleInfo(data[5], data[6], data[2]);
            //自定义更新
            wrapData.listener.onItemExtraUpdate(data, this.mElemList);
        };
        return RankItem;
    }(eui.ItemRenderer));
    itemRender.RankItem = RankItem;
    __reflect(RankItem.prototype, "itemRender.RankItem");
})(itemRender || (itemRender = {}));
var RankBaseWnd = (function (_super) {
    __extends(RankBaseWnd, _super);
    function RankBaseWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RankBaseWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.rankType = params[2];
    };
    RankBaseWnd.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
    };
    RankBaseWnd.prototype.onUnLoad = function () {
    };
    RankBaseWnd.prototype.onShow = function () {
        RegisterEvent(EventDefine.ACTIVITY_RANK_UPDATE, this.getUpdateData, this);
        this.sendRankRequire();
        //测试
        // let list = []
        // list.push([30, GetHeroProperty("force"), GetHeroProperty("id"), 1, GetHeroProperty("name"), GetHeroProperty("vocation"), GetHeroProperty("sexId")])
        // for(let i = 0; i < 40; i++){
        // 	list.push([30, 88888888, 1+i, 8, "玩家aaa"+i, 10001, 1])
        // }
        // let appearInfo:any = {}
        // appearInfo.vocation = GetHeroProperty("vocation")
        // appearInfo.sexId = GetHeroProperty("sexId")
        // appearInfo.heroShapeId = 0
        // appearInfo.rideShapeId = 15001
        // appearInfo.weaponShapeId = 0
        // appearInfo.wingShapeId = 0
        // appearInfo.petShapeId = 0
        // appearInfo.tianxianShapeId = 0
        // this.onRefresh(list, appearInfo)
    };
    RankBaseWnd.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ACTIVITY_RANK_UPDATE, this.getUpdateData, this);
        var actorView = this.mElemList["actorview"];
        actorView.clearView();
        actorView = this.mElemList["actorview2"];
        actorView.clearView();
    };
    RankBaseWnd.prototype.getUpdateData = function (args) {
        var getType = args.ranktype;
        var getList = args.ranklist;
        var appearData = args.firstAppearData;
        //刷新
        if (getType == this.rankType) {
            this.onRefresh(getList, appearData);
        }
    };
    RankBaseWnd.prototype.onRefresh = function (getList, appearData) {
        var list = [];
        for (var i in getList) {
            var data = getList[i];
            var t = {};
            t.index = Number(i) + 1;
            t.data = data;
            t.listener = this; //需要有onListItemUpdate
            JsUtil.arrayInstert(list, t);
        }
        var listbox = this.mElemList["list_rank"];
        UiUtil.updateList(listbox, list);
        this.updateMyRank(getList);
        if (size_t(appearData) == 0) {
            var actorView = this.mElemList["actorview"];
            actorView.clearView();
        }
        else {
            this.onAppearUpdate(appearData);
        }
    };
    RankBaseWnd.prototype.updateMyRank = function (list) {
        var myId = GetHeroProperty("id");
        this.mElemList["my_rank"].text = (Localize_cns("RANK_TXT1"));
        for (var i in list) {
            var v = list[i];
            var roleId = v[2];
            if (roleId == myId) {
                this.mElemList["my_rank"].text = String.format(Localize_cns("RANK_TXT2"), Number(i) + 1);
                break;
            }
        }
        //this.mElemList["my_rank"].visible = (true)
    };
    //发送协议获取排行数据
    RankBaseWnd.prototype.sendRankRequire = function () {
        var message = GetMessage(opCodes.C2G_ROLE_RANK);
        message.rankType = this.rankType;
        message.index = 1;
        SendGameMessage(message);
    };
    ////////////////////////////////////////////////////////////////////////////////////////////
    //重载
    RankBaseWnd.prototype.onItemExtraUpdate = function (data, mElemList) {
        var str = String.format(Localize_cns("RANK_TXT5"), data[0]);
        AddRdContent(mElemList["extraRd"], str, "ht_24_cc_stroke", "lime");
    };
    //外观更新
    RankBaseWnd.prototype.onAppearUpdate = function (appearInfo) {
        if (appearInfo == null)
            return;
        var actorView = this.mElemList["actorview"];
        actorView.updateByPlayerAppearInfo(appearInfo);
        var actorView2 = this.mElemList["actorview2"];
        var model = GetShapeModelId(appearInfo.tianxianShapeId);
        actorView2.updateByPlayer(model);
    };
    return RankBaseWnd;
}(BaseCtrlWnd));
__reflect(RankBaseWnd.prototype, "RankBaseWnd");
//# sourceMappingURL=RankBaseWnd.js.map