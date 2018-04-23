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
var XianLvFightFrame = (function (_super) {
    __extends(XianLvFightFrame, _super);
    function XianLvFightFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XianLvFightFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/xianlv/XianLvFightLayout.exml"];
    };
    XianLvFightFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        UiUtil.setFrameSize(this.mLayoutNode, 640, 400, 0, 215);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_1", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onBtn1Click, _b),
            (_c = {}, _c["name"] = "btn_2", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onBtn2Click, _c),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.fightList = {};
        for (var index = 1; index <= 2; index++) {
            this.mElemList["rd_star_" + index].setAlignFlag(gui.Flag.CENTER_CENTER);
            this.mElemList["rd_name_" + index].setAlignFlag(gui.Flag.CENTER_CENTER);
        }
        var _a, _b, _c;
    };
    XianLvFightFrame.prototype.onUnLoad = function () {
    };
    XianLvFightFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.onRefresh();
    };
    XianLvFightFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    XianLvFightFrame.prototype.onRefresh = function () {
        this.fightList = XianLvSystem.getInstance().getFightList();
        //let controlList = XianLvSystem.getInstance().getControlList()
        for (var i = 1; i <= 2; i++) {
            this.mElemList["group_" + i].visible = false;
        }
        for (var k in this.fightList) {
            this.onRefreshGroup(tonumber(k), this.fightList[k]);
        }
    };
    XianLvFightFrame.prototype.onRefreshGroup = function (id, index) {
        this.mElemList["group_" + index].visible = true;
        var icon = "pet_" + id;
        this.mElemList["sprite_" + index].source = icon;
        //星级
        var star = XianLvSystem.getInstance().getStar(this.id);
        var xingStr = "";
        for (var i = 0; i < star; i++) {
            xingStr = xingStr + "#STAR";
        }
        AddRdContent(this.mElemList["rd_star_" + index], xingStr, "ht_20_cc");
        //name
        var name = GameConfig.ActorXianLvConfig[id].name;
        AddRdContent(this.mElemList["rd_name_" + index], name, "ht_24_cc_stroke");
        //阶数
        var level = XianLvSystem.getInstance().getLevel(this.id);
        var jieStr = level + "阶";
        this.mElemList["lv_" + index].text = jieStr;
    };
    XianLvFightFrame.prototype.onBtn1Click = function () {
        RpcProxy.call("C2G_ACTOR_XIANLV_COMBAT_SET", this.id, 1);
        this.hideWnd();
    };
    XianLvFightFrame.prototype.onBtn2Click = function () {
        RpcProxy.call("C2G_ACTOR_XIANLV_COMBAT_SET", this.id, 2);
        this.hideWnd();
    };
    XianLvFightFrame.prototype.onShowWnd = function (id) {
        this.id = id;
        this.showWnd();
    };
    return XianLvFightFrame;
}(BaseWnd));
__reflect(XianLvFightFrame.prototype, "XianLvFightFrame");
// TypeScript file 
//# sourceMappingURL=XianLvFightFrame.js.map