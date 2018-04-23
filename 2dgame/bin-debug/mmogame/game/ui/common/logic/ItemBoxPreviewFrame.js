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
//排行界面的通用基类，主要实现genConfigList refreshItemWindow refreshHeroRank三个接口，如果有特殊调整，可以在子类先调用super.initItemWindow再创建子类适用的控件等
var ItemBoxPreviewFrame = (function (_super) {
    __extends(ItemBoxPreviewFrame, _super);
    function ItemBoxPreviewFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemBoxPreviewFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.itemList = [];
        this.currencyType = opItemUnit.CURRENCY;
        this.consumNum = 0;
        this.mLayoutPaths = ["layouts/common/ItemBoxPreviewLayout.exml"];
    };
    ItemBoxPreviewFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        var mElemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_back", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "open_btn", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickOpen, _c),
            (_d = {}, _d["name"] = "tips_tl", _d["color"] = gui.Color.lime, _d["event_name"] = null, _d["fun_index"] = null, _d["messageFlag"] = true, _d),
        ];
        UiUtil.initElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["scroll_group"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group);
        this.mElemList["consum_rd"].setAlignFlag(gui.Flag.H_CENTER);
        var _a, _b, _c, _d;
    };
    ItemBoxPreviewFrame.prototype.onUnLoad = function () {
    };
    ItemBoxPreviewFrame.prototype.onShow = function () {
        //RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (true);
        this.refreshFrame();
    };
    ItemBoxPreviewFrame.prototype.onHide = function () {
        //UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (false);
        this.callBack = null;
        this.obj = null;
        this.param = null;
    };
    ItemBoxPreviewFrame.prototype.initItemWindow = function (window) {
        var name = window.name;
        for (var i = 0; i < 4; i++) {
            this.mElemList[name + "itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, name + "itemBox" + i, 20 + 90 * i, 0, window);
        }
        //ui_util.CreateDrawRectPtr(this.mElemList[name +"_dec"], gui.Color32Half.green)
        //AddRdContent(this.mElemList[name + "_dec"], Localize_cns("CHAT_ERROE_JINYAN"), "ht_20_cc", "zongse")
    };
    ItemBoxPreviewFrame.prototype.refreshItemWindow = function (window, config) {
        var name = window.name;
        for (var i = 0; i < 4; i++) {
            if (config[i]) {
                this.mElemList[name + "itemBox" + i].setVisible(true);
                var _a = config[i], entryId = _a[0], count = _a[1];
                this.mElemList[name + "itemBox" + i].updateByEntry(entryId, count);
            }
            else {
                this.mElemList[name + "itemBox" + i].setVisible(false);
            }
        }
    };
    ItemBoxPreviewFrame.prototype.refreshFrame = function () {
        var list = [];
        var list1 = this.genConfigList(); //[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1 ,1 ]
        var t = [];
        for (var i = 0; i < list1.length; i++) {
            var v = list1[i];
            table_insert(t, v);
            if (t.length >= 4) {
                table_insert(list, t);
                t = [];
            }
        }
        if (t.length > 0) {
            table_insert(list, t);
        }
        var group = this.mElemList["scroll_group"];
        var scroll = this.scroll;
        scroll.clearItemList();
        this.controlDataTable = {};
        for (var k = 0; k < list.length; k++) {
            var v = list[k];
            var window_1 = scroll.getItemWindow(k, group.width - 3, 85, 3, 5, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v);
        }
        //消耗描述
        AddRdContent(this.mElemList["consum_rd"], GetMoneyIcon(this.currencyType) + " " + this.consumNum, "ht_24_cc_stroke", "white");
    };
    /////////////////////////////////////////////////////////////////
    ItemBoxPreviewFrame.prototype.genConfigList = function () {
        // return [[60061, 20000], [60061, 20000], [60061, 20000], [60061, 20000], [60061, 20000], [60061, 20000], [60061, 20000], [60061, 20000]
        // , [60061, 20000], [60061, 20000], [60061, 20000], [60061, 20000], [60061, 20000], [60061, 20000], [60061, 20000],[60061, 20000],[60061, 20000]]
        return this.itemList;
    };
    //////////////////////////////////////////
    ItemBoxPreviewFrame.prototype.onClickOpen = function (args) {
        var _this = this;
        var t = {
            onDialogCallback: function (result, userData) {
                if (result == true) {
                    if (_this.callBack) {
                        _this.callBack.call(_this.obj, _this.param);
                    }
                    _this.hideWnd();
                }
            }
        };
        MsgSystem.confirmDialog(String.format(Localize_cns("COMMON_TXT9"), this.consumNum + Localize_cns(ItemUnitName[this.currencyType])), t, null);
    };
    /////////////////////////////////////////////////公共接口////////////////////////////
    ItemBoxPreviewFrame.prototype.showPreviewFrame = function (itemList, currencyType, consumNum, callBack, obj, param) {
        this.itemList = itemList || [];
        this.currencyType = currencyType;
        this.consumNum = consumNum;
        this.callBack = callBack;
        this.obj = obj;
        this.param = param;
        this.showWnd();
    };
    return ItemBoxPreviewFrame;
}(BaseWnd));
__reflect(ItemBoxPreviewFrame.prototype, "ItemBoxPreviewFrame");
//# sourceMappingURL=ItemBoxPreviewFrame.js.map