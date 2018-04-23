// TypeScript file
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
var ClubDonateFrame = (function (_super) {
    __extends(ClubDonateFrame, _super);
    function ClubDonateFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClubDonateFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/club/ClubDonateLayout.exml"];
    };
    ClubDonateFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var listBox = this.mElemList["list_donate"];
        listBox.itemRenderer = itemRender.ClubPeopleDonateItem;
        var _a, _b;
    };
    ClubDonateFrame.prototype.onUnLoad = function () {
    };
    ClubDonateFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.ITEM_UPDATE, this.refreshFrame, this);
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.refreshFrame();
    };
    ClubDonateFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ITEM_UPDATE, this.refreshFrame, this);
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    ClubDonateFrame.prototype.refreshFrame = function () {
        var list = ItemSystem.getInstance().getFactionMaterial();
        var listbox = this.mElemList["list_donate"];
        UiUtil.updateList(listbox, list);
    };
    return ClubDonateFrame;
}(BaseWnd));
__reflect(ClubDonateFrame.prototype, "ClubDonateFrame");
var itemRender;
(function (itemRender) {
    var ClubPeopleDonateItem = (function (_super) {
        __extends(ClubPeopleDonateItem, _super);
        function ClubPeopleDonateItem() {
            var _this = _super.call(this) || this;
            _this.mElemList = {};
            var width = 530, height = 110;
            var Info = [
                (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = "bg", _a["title"] = null, _a["font"] = null, _a["image"] = "ty_uiDi03", _a["color"] = null, _a["x"] = 10, _a["y"] = 0, _a["w"] = width, _a["h"] = height, _a["event_name"] = null, _a["fun_index"] = null, _a),
                (_b = {}, _b["index_type"] = eui.Label, _b["name"] = "itemName", _b["parent"] = "bg", _b["title"] = "", _b["font"] = "ht_24_lc", _b["color"] = gui.Color.saddlebrown, _b["x"] = 110, _b["y"] = 25, _b["w"] = 150, _b["h"] = 25, _b["messageFlag"] = true, _b),
                (_c = {}, _c["index_type"] = eui.Label, _c["name"] = "des", _c["parent"] = "bg", _c["title"] = "", _c["font"] = "ht_24_lc", _c["color"] = gui.Color.saddlebrown, _c["x"] = 110, _c["y"] = 60, _c["w"] = 150, _c["h"] = 25, _c["messageFlag"] = true, _c),
                (_d = {}, _d["index_type"] = gui.Button, _d["name"] = "donate_btn", _d["bAdapteWindow"] = true, _d["image"] = "ty_tongYongBt3", _d["x"] = 410, _d["y"] = 30, _d["w"] = 117, _d["h"] = 51, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = _this.onDonateClick, _d),
                (_e = {}, _e["index_type"] = eui.Label, _e["name"] = "donate_text", _e["parent"] = "donate_btn", _e["title"] = Localize_cns("CLUB_TXT45"), _e["font"] = "ht_20_cc_stroke", _e["image"] = null, _e["color"] = gui.Color.white, _e["x"] = 0, _e["y"] = 0, _e["w"] = 117, _e["h"] = 51, _e["event_name"] = null, _e["fun_index"] = null, _e["messageFlag"] = true, _e),
            ];
            UiUtil.createElem(Info, _this, _this.mElemList, _this);
            _this.mElemList["itemBox"] = UIItemBox.newObj(_this.mElemList, "itemBox", 15, 15, _this.mElemList["bg"]);
            _this.mElemList["itemBox"].updateByEntry(60024);
            return _this;
            var _a, _b, _c, _d, _e;
        }
        ClubPeopleDonateItem.prototype.dataChanged = function () {
            var item = this.data;
            this.mElemList["itemName"].text = item.getRefProperty("name");
            this.mElemList["des"].text = item.getRefProperty("description");
        };
        ClubPeopleDonateItem.prototype.onDonateClick = function (args) {
            var item = this.data;
            RpcProxy.call("C2G_FactionDonation", item.entryId);
        };
        return ClubPeopleDonateItem;
    }(eui.ItemRenderer));
    itemRender.ClubPeopleDonateItem = ClubPeopleDonateItem;
    __reflect(ClubPeopleDonateItem.prototype, "itemRender.ClubPeopleDonateItem");
})(itemRender || (itemRender = {}));
//# sourceMappingURL=ClubDonateFrame.js.map