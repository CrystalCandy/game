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
var PrizeShowFrame = (function (_super) {
    __extends(PrizeShowFrame, _super);
    function PrizeShowFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PrizeShowFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.actorList = {};
        this.mLayoutPaths = ["layouts/item/PrizeShowLayout.exml"];
    };
    PrizeShowFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        // this.mLayoutNode.setLayer(gui.GuiLayer.Top)
        this.mLayoutNode.verticalCenter = -100;
        var elemInfo = [
            (_a = {}, _a["name"] = "return_btn", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["scroll_group"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group);
        var _a;
    };
    PrizeShowFrame.prototype.onUnLoad = function () {
    };
    PrizeShowFrame.prototype.onShow = function () {
        _super.prototype.onShow.call(this);
        this.mLayoutNode.visible = true;
        this.refreshFrame();
    };
    PrizeShowFrame.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        this.mLayoutNode.visible = false;
        var list = [];
        for (var name_1 in this.actorList) {
            var actor = this.actorList[name_1];
            JsUtil.arrayInstert(list, name_1);
        }
    };
    PrizeShowFrame.prototype.initItemWindow = function (window) {
        var name = window.name;
        for (var i = 0; i < 4; i++) {
            this.mElemList[name + "itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, name + "itemBox" + i, 40 + 110 * i, 10, window);
        }
    };
    PrizeShowFrame.prototype.refreshItemWindow = function (window, config) {
        var name = window.name;
        for (var i = 0; i < 4; i++) {
            if (config[i]) {
                var _a = config[i], entryId = _a[0], count = _a[1];
                this.mElemList[name + "itemBox" + i].setVisible(true);
                this.mElemList[name + "itemBox" + i].updateByEntry(entryId, count);
            }
            else {
                this.mElemList[name + "itemBox" + i].setVisible(false);
            }
        }
    };
    PrizeShowFrame.prototype.refreshFrame = function () {
        var list = AnalyPrizeFormat(this.itemList);
        var list1 = [];
        var t = [];
        list.forEach(function (v) {
            table_insert(t, v);
            if (size_t(t) == 4) {
                table_insert(list1, t);
                t = [];
            }
        });
        if (t.length > 0) {
            table_insert(list1, t);
        }
        var group = this.mElemList["scroll_group"];
        var scroll = this.scroll;
        scroll.clearItemList();
        this.controlDataTable = {};
        for (var k = 0; k < list1.length; k++) {
            var v = list1[k];
            var window_1 = scroll.getItemWindow(k, group.width - 3, 100, 3, 5, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v);
        }
    };
    PrizeShowFrame.prototype.showAndSetData = function (itemList) {
        this.itemList = itemList;
        this.showWnd();
    };
    return PrizeShowFrame;
}(BaseWnd));
__reflect(PrizeShowFrame.prototype, "PrizeShowFrame");
//# sourceMappingURL=PrizeShowFrame.js.map