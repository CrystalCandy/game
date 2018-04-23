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
var RoleMountsSkinsFrame = (function (_super) {
    __extends(RoleMountsSkinsFrame, _super);
    function RoleMountsSkinsFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoleMountsSkinsFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/role/RoleMountsSkinsLayout.exml"];
    };
    RoleMountsSkinsFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_back", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["group_scroll"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group, UIScrollList.DIR_HORIZON);
        var _a;
    };
    RoleMountsSkinsFrame.prototype.onUnLoad = function () {
    };
    RoleMountsSkinsFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.mElemList["label_wndName"].text = "坐骑皮肤";
        this.onRefresh();
    };
    RoleMountsSkinsFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    RoleMountsSkinsFrame.prototype.onChargeClick = function () {
    };
    RoleMountsSkinsFrame.prototype.onRefresh = function () {
        var scroll = this.scroll;
        scroll.clearItemList();
        for (var k = 0; k < 6; k++) {
            var window_1 = scroll.getItemWindow(k, 114, 321, 0, 0);
            this.initItemWindow(window_1);
            //this.refreshItemWindow(window, v)
        }
        scroll.refreshScroll(true, true);
    };
    RoleMountsSkinsFrame.prototype.initItemWindow = function (window) {
        var name = window.name;
        var mElemInfo = [
            (_a = {}, _a["index_type"] = eui.Image, _a["name"] = name + "_bg", _a["image"] = "", _a["x"] = 0, _a["y"] = 0, _a["w"] = 144, _a["h"] = 321, _a["event_name"] = null, _a["fun_index"] = null, _a["messageFlag"] = true, _a),
            (_b = {}, _b["index_type"] = eui.Image, _b["name"] = name + "_skin", _b["parent"] = name + "_bg", _b["title"] = "", _b["font"] = "", _b["image"] = "zq_piFu01", _b["color"] = gui.Color.saddlebrown, _b["x"] = 17, _b["y"] = 17, _b["w"] = 114, _b["h"] = 291, _b["event_name"] = null, _b["fun_index"] = null, _b["messageFlag"] = true, _b),
            (_c = {}, _c["index_type"] = eui.Image, _c["name"] = name + "_select", _c["parent"] = name + "_bg", _c["image"] = "zq_xuanZhong01", _c["x"] = 0, _c["y"] = 0, _c["w"] = 144, _c["h"] = 321, _c["event_name"] = null, _c["fun_index"] = null, _c["messageFlag"] = true, _c),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window);
        var _a, _b, _c;
    };
    RoleMountsSkinsFrame.prototype.refreshItemWindow = function (window, config) {
        var name = window.name;
    };
    return RoleMountsSkinsFrame;
}(BaseWnd));
__reflect(RoleMountsSkinsFrame.prototype, "RoleMountsSkinsFrame");
//# sourceMappingURL=RoleMountsSkinsFrame.js.map