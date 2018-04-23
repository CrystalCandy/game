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
var BeiBaoPropsWindow = (function (_super) {
    __extends(BeiBaoPropsWindow, _super);
    function BeiBaoPropsWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BeiBaoPropsWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    BeiBaoPropsWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        this.mLayoutNode = this.mParentWnd.mLayoutNode;
        var group = this.mElemList["scroll_Prop"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "PropScroll", 0, 0, group.width, group.height, group);
    };
    BeiBaoPropsWindow.prototype.onUnLoad = function () {
    };
    BeiBaoPropsWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this);
        this.mElemList["group_prop"].visible = true;
        this.mElemList["label_wndName"].text = Localize_cns("BEIBAO_PROP");
        this.onRefresh();
    };
    BeiBaoPropsWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this);
        this.mElemList["group_prop"].visible = false;
    };
    BeiBaoPropsWindow.prototype.onRefresh = function () {
        var itemType = opItemType.ITEM_TYPE_GOODS;
        var propItemList = ItemSystem.getInstance().getItemLogicInfoByType(itemType);
        var list = splitListByCount(propItemList, 5);
        var scroll = this.scroll;
        scroll.clearItemList();
        for (var k = 0; k < size_t(list); k++) {
            var item = list[k];
            var window_1 = scroll.getItemWindow(k, 500, 110, 0, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, item);
        }
        scroll.refreshScroll(true, true);
    };
    BeiBaoPropsWindow.prototype.initItemWindow = function (window) {
        var name = window.name;
        for (var i = 1; i <= 5; i++) {
            var x = 107 * (i - 1);
            var y = 2;
            var mElemInfo = [
                (_a = {}, _a["index_type"] = eui.Group, _a["name"] = name + "_prop_bg" + i, _a["image"] = "", _a["x"] = x, _a["y"] = y, _a["w"] = 100, _a["h"] = 110, _a),
                (_b = {}, _b["index_type"] = eui.Group, _b["name"] = name + "_prop" + i, _b["parent"] = name + "_prop_bg" + i, _b["image"] = "", _b["x"] = 10, _b["y"] = 0, _b["w"] = 80, _b["h"] = 80, _b),
                (_c = {}, _c["index_type"] = eui.Label, _c["name"] = name + "_name" + i, _c["parent"] = name + "_prop_bg" + i, _c["title"] = "", _c["font"] = "ht_18_cc", _c["image"] = null, _c["color"] = gui.Color.white, _c["x"] = 0, _c["y"] = 85, _c["w"] = 100, _c["h"] = 20, _c["messageFlag"] = true, _c),
            ];
            UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window);
            this.mElemList[name + "propBox" + i] = UIItemBox.newObj(this.mLayoutNode, name + "propBox" + i, 0, 0, this.mElemList[name + "_prop" + i]);
        }
        var _a, _b, _c;
    };
    BeiBaoPropsWindow.prototype.refreshItemWindow = function (window, config) {
        var name = window.name;
        for (var i = 1; i <= 5; i++) {
            if (config[i - 1]) {
                var entryId = config[i - 1].entryId;
                this.mElemList[name + "_name" + i].text = config[i - 1].getName();
                var count = ItemSystem.getInstance().getItemCount(entryId);
                this.mElemList[name + "propBox" + i].updateByEntry(entryId, count);
            }
            else {
                this.mElemList[name + "_prop_bg" + i].visible = false;
            }
        }
    };
    return BeiBaoPropsWindow;
}(BaseCtrlWnd));
__reflect(BeiBaoPropsWindow.prototype, "BeiBaoPropsWindow");
//# sourceMappingURL=BeiBaoPropsWindow.js.map