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
var UIGainBox = (function (_super) {
    __extends(UIGainBox, _super);
    function UIGainBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIGainBox.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mParentNode = args[0];
        this.name = args[1];
        var x = args[2];
        var y = args[3];
        var w = 0;
        var h = 0;
        var parentWnd = args[4];
        this.content = args[5] || "";
        this.mElemList = {};
        var mElemInfo = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = this.name, _a["x"] = x, _a["y"] = y, _a["w"] = w, _a["h"] = h, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.openGainLink, _a),
            (_b = {}, _b["index_type"] = gui.RichDisplayer, _b["name"] = this.name + "_rd", _b["parent"] = this.name, _b["x"] = 0, _b["y"] = 0, _b["w"] = w, _b["h"] = h, _b["messageFlag"] = true, _b),
            (_c = {}, _c["index_type"] = eui.Rect, _c["name"] = this.name + "_line", _c["parent"] = this.name, _c["color"] = gui.Color.lime, _c["x"] = 0, _c["y"] = 0, _c["w"] = w, _c["h"] = 2, _c["messageFlag"] = true, _c),
        ];
        UiUtil.createElem(mElemInfo, this.mParentNode, this.mElemList, this, parentWnd);
        this.updateContent();
        var _a, _b, _c;
    };
    UIGainBox.prototype.updateContent = function () {
        AddRdContent(this.mElemList[this.name + "_rd"], this.content, "ht_24_cc", "lime");
        var w = this.content.length * 24;
        var h = 28;
        UiUtil.setWH(this.mElemList[this.name], w, h);
        UiUtil.setWH(this.mElemList[this.name + "_rd"], w, h);
        UiUtil.setWH(this.mElemList[this.name + "_line"], w, 2);
        UiUtil.setXY(this.mElemList[this.name + "_line"], 0, h - 2);
    };
    UIGainBox.prototype.setLink = function (param, content) {
        if (content) {
            this.content = content;
            this.updateContent();
        }
        //param= {define : ["item", entry], index : 1}
        this.param = param || {};
    };
    UIGainBox.prototype.openGainLink = function () {
        if (!this.param) {
            return;
        }
        var define = this.param.define;
        var index = this.param.define;
        var ftype = define[0];
        var fId = define[1];
        var funConfig = FastJumpSystem.getInstance().getFunTipsConfig(ftype, fId);
        if (!funConfig) {
            return;
        }
        if (index == null) {
            //{""shangcheng"",30006}
            var approach = funConfig.approach[index];
            FastJumpSystem.getInstance().doFastJump(approach[0], approach[1]);
        }
        else {
            if (ftype != "item") {
                var approach = funConfig.approach;
                for (var i in approach) {
                    FastJumpSystem.getInstance().doFastJump(approach[i][0], approach[i][1]);
                }
            }
            else {
                var item = ItemSystem.getInstance().getItemLogicInfoByID(fId);
                if (item.getRefProperty("shopEntry") > 0) {
                    var quickWnd = WngMrg.getInstance().getWindow("GoodsAsseceFrame");
                    quickWnd.onShowWnd(fId, true);
                }
            }
        }
    };
    return UIGainBox;
}(TClass));
__reflect(UIGainBox.prototype, "UIGainBox");
//# sourceMappingURL=UIGainBox.js.map