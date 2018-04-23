// TypeScript file
/*
作者:
    lqx

创建时间：
    2017.03.17(星期五)

意图：
    空提示

公共接口：

*/
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
var UIEmptyView = (function (_super) {
    __extends(UIEmptyView, _super);
    function UIEmptyView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIEmptyView.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mLayoutNode = args[0];
        this.x = args[1] || 0;
        this.y = args[2] || 0;
        this.mParent = args[3] || null;
        var scale = args[4] || 1;
        this.scale = scale;
        this.mElemList = {};
        this.visible = false;
        var elemInfo = [
            (_a = {}, _a["index_type"] = eui.Image, _a["name"] = "Empty_Bg", _a["image"] = "ty_beiBaoKong01", _a["x"] = this.x, _a["y"] = this.y, _a["w"] = 416 * scale, _a["h"] = 421 * scale, _a["touchEnabled"] = true, _a),
            (_b = {}, _b["index_type"] = gui.RichDisplayer, _b["name"] = "Rd_Empty_Talk", _b["x"] = this.x + 36 * scale, _b["y"] = this.y + 26 * scale, _b["w"] = 340 * scale, _b["h"] = 80 * scale, _b["touchEnabled"] = true, _b),
        ];
        UiUtil.createElem(elemInfo, this.mLayoutNode, this.mElemList, this.mParent);
        var rd = this.mElemList["Rd_Empty_Talk"];
        rd.setAlignFlag(gui.Flag.H_CENTER);
        var _a, _b;
        //this.setDescText()
        //this.rootWnd.SetVisible(false)
    };
    UIEmptyView.prototype.destory = function () {
    };
    //-设置文本//////////////////////////////////////////////////////////
    UIEmptyView.prototype.setDescText = function (_text, _font, _color) {
        var text = _text || Localize_cns("EMPTY_DEFAULT_TEXT");
        var font = _font || "ht_24_lc";
        var color = _color || "ublack";
        AddRdContent(this.mElemList["Rd_Empty_Talk"], text, font, color, 2);
        //let rd = this.mElemList["Rd_Empty_Talk"]
        //rd.SetXY(36, 66-rd.GetAllRowHeight()/2)
        //rd.setAlignFlag(Core.Flag.H_CENTER)
    };
    UIEmptyView.prototype.setVisible = function (b) {
        this.mElemList["Empty_Bg"].visible = b;
        this.mElemList["Rd_Empty_Talk"].visible = b;
    };
    return UIEmptyView;
}(TClass));
__reflect(UIEmptyView.prototype, "UIEmptyView");
//# sourceMappingURL=UIEmptyView.js.map