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
var CommonOpenTipsFrame = (function (_super) {
    __extends(CommonOpenTipsFrame, _super);
    function CommonOpenTipsFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonOpenTipsFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.xPos = 0;
        this.yPos = 0;
    };
    CommonOpenTipsFrame.prototype.onLoad = function () {
        UiUtil.setWH(this.mLayoutNode, 216, 107);
        //  this.setAlignCenter(true, true)
        var mElemInfo = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = "group", _a["title"] = null, _a["font"] = null, _a["image"] = "", _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["w"] = 216, _a["h"] = 107, _a),
            (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = "bg_", _b["title"] = null, _b["font"] = null, _b["image"] = "ty_tipsDi", _b["color"] = gui.Color.white, _b["x"] = 0, _b["y"] = 0, _b["w"] = 216, _b["h"] = 107, _b),
            (_c = {}, _c["index_type"] = eui.Group, _c["name"] = "group_btn", _c["title"] = null, _c["font"] = null, _c["image"] = "", _c["color"] = gui.Color.white, _c["x"] = 0, _c["y"] = 0, _c["w"] = 216, _c["h"] = 107, _c),
            (_d = {}, _d["index_type"] = gui.Button, _d["name"] = "btn_xianlv", _d["title"] = null, _d["image"] = "zjm_Bt23", _d["color"] = gui.Color.white, _d["x"] = 0, _d["y"] = 0, _d["w"] = 108, _d["h"] = 107, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onXianLvClick, _d),
            (_e = {}, _e["index_type"] = gui.Button, _e["name"] = "btn_tiannv", _e["title"] = null, _e["image"] = "zjm_Bt23", _e["color"] = gui.Color.white, _e["x"] = 108, _e["y"] = 0, _e["w"] = 108, _e["h"] = 107, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onTianNvClick, _e),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        var _a, _b, _c, _d, _e;
    };
    CommonOpenTipsFrame.prototype.onUnLoad = function () {
    };
    CommonOpenTipsFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = (true);
        this.onRefresh();
    };
    CommonOpenTipsFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = (false);
    };
    CommonOpenTipsFrame.prototype.onRefresh = function () {
        var btnList = (_a = {},
            _a[4] = [
                this.mElemList["btn_xianlv"], this.mElemList['btn_tiannv']
            ],
            _a);
        this.mLayoutNode.x = this.xPos;
        this.mLayoutNode.y = this.yPos;
        var btnGroup = btnList[this.index];
        var top = this.mElemList["group_btn"];
        var childNum = top.numElements;
        for (var k = 0; k < top.numElements; k++) {
            var child = top.getChildAt(k);
            top.removeChild(child);
        }
        for (var k = 0; k < size_t(btnGroup); k++) {
            var btn = btnGroup[k];
            top.addChildAt(btn, k);
        }
        var _a;
    };
    ////---------响应事件
    CommonOpenTipsFrame.prototype.onXianLvClick = function () {
        ExecuteMainFrameFunction("xianlv");
        this.hideWnd();
    };
    CommonOpenTipsFrame.prototype.onTianNvClick = function () {
        ExecuteMainFrameFunction("tiannv");
        this.hideWnd();
    };
    CommonOpenTipsFrame.prototype.onShowWnd = function (index, xPos, yPos) {
        this.index = index;
        this.xPos = xPos;
        this.yPos = yPos;
        this.showWnd();
    };
    return CommonOpenTipsFrame;
}(BaseWnd));
__reflect(CommonOpenTipsFrame.prototype, "CommonOpenTipsFrame");
//# sourceMappingURL=CommonOpenTipsFrame.js.map