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
/*
作者:
    liuziming
    
创建时间：
   2015.10.20(周二)

意图：
   
公共接口：
   
*/
var FightRecordFrame = (function (_super) {
    __extends(FightRecordFrame, _super);
    function FightRecordFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FightRecordFrame.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //this.controlDataTable = {}
    };
    FightRecordFrame.prototype.onLoad = function () {
        this.createFrame();
    };
    FightRecordFrame.prototype.onUnLoad = function () {
    };
    FightRecordFrame.prototype.onShow = function () {
        //if(CampaignSystem.getInstance().isCampaignPass(1036) == false ){
        //	MsgSystem.AddTagTips(Localize_cns("RECORD_OPEN_TIPS"))
        //	return this.hideWnd()
        //}
        this.mLayoutNode.visible = (true);
        this.refreshFrame();
    };
    FightRecordFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = (false);
    };
    ////////////////////////////////////////////////////////////////////-
    FightRecordFrame.prototype.createFrame = function () {
        UiUtil.setWH(this.mLayoutNode, 640, 960);
        this.setAlignCenter(true, true);
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = "_bg", _a["image"] = "ty_UIDi01", _a["title"] = null, _a["percentWidth"] = 100, _a["percentHeight"] = 100, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = null, _a),
            (_b = {}, _b["index_type"] = eui.Image, _b["name"] = "bgtitle", _b["title"] = null, _b["font"] = null, _b["image"] = "ty_biaoTiHuaWen01", _b["color"] = gui.Color.white, _b["horizontalCenter"] = 0, _b["y"] = 30, _b["event_name"] = null, _b["fun_index"] = null, _b),
            (_c = {}, _c["index_type"] = eui.Label, _c["name"] = "title", _c["parent"] = "bgtitle", _c["title"] = Localize_cns("FIGHT_TXT2"), _c["font"] = "ht_28_cc_stroke", _c["color"] = gui.Color.white, _c["horizontalCenter"] = 0, _c["y"] = 16, _c["event_name"] = null, _c["fun_index"] = null, _c),
            (_d = {}, _d["index_type"] = gui.Grid9Image, _d["name"] = "scroll_bg", _d["title"] = null, _d["font"] = null, _d["image"] = "ty_UIBg02", _d["color"] = gui.Color.navajowhite, _d["x"] = 40, _d["y"] = 95, _d["w"] = 560, _d["h"] = 760, _d["event_name"] = null, _d["fun_index"] = null, _d),
            (_e = {}, _e["index_type"] = gui.Button, _e["name"] = "btn_close_top", _e["title"] = null, _e["font"] = null, _e["image"] = "ty_bt_back02", _e["color"] = gui.Color.white, _e["right"] = 0, _e["top"] = 0, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.hideWnd, _e),
            (_f = {}, _f["index_type"] = gui.Button, _f["name"] = "btn_close", _f["title"] = null, _f["font"] = null, _f["image"] = "ty_bt_back04", _f["color"] = gui.Color.white, _f["right"] = 0, _f["bottom"] = 0, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.hideWnd, _f),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        var name = "scroll";
        var window = UIScrollList.newObj(this.mLayoutNode, "scroll", 5, 10, 550, 740, this.mElemList["scroll_bg"]);
        this.scroll = window;
        var _a, _b, _c, _d, _e, _f;
    };
    FightRecordFrame.prototype.refreshFrame = function () {
        var content = table_copy(FightSystem.getInstance().getFightRecord());
        //let content = Localize_cns("FIGHT_CHANGE_POSTION2")
        //for(let i = 1; i <=  20;i++){
        //	content = content +Localize_cns("FIGHT_CHANGE_POSTION2")
        //}
        //
        var _a = FightSystem.getInstance().getFightDamage(), leftDamage = _a[0], rightDamage = _a[1];
        var side = FightSystem.getInstance().getSelfFightSide();
        if (side == fightSide.FIGHT_RIGHT) {
            rightDamage = leftDamage, leftDamage = rightDamage;
        }
        //敌方
        JsUtil.arrayInstert(content, 0, "#cyan " + Localize_cns("RECORD_BATTLE_TXT2") + "#br" + rightDamage + "#rf#br");
        //我方
        JsUtil.arrayInstert(content, 0, "#navajowhite " + Localize_cns("RECORD_BATTLE_TXT1") + "#br" + leftDamage + "#rf#br");
        var scroll = this.scroll;
        scroll.clearItemList();
        for (var index = 0; index < content.length; index++) {
            var xml = content[index];
            var window_1 = scroll.getItemWindow(index, scroll.getWidth(), 100, 0, 0);
            this.refreshItemWindow(window_1, xml, index);
        }
    };
    FightRecordFrame.prototype.refreshItemWindow = function (window, xml, index) {
        var name = window.name;
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.RichDisplayer, _a["name"] = "rd" + name, _a["title"] = null, _a["font"] = null, _a["image"] = "", _a["color"] = gui.Color.navajowhite, _a["x"] = 0, _a["y"] = 0, _a["w"] = 550, _a["h"] = 240, _a["event_name"] = null, _a["fun_index"] = null, _a),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window);
        var rd = this.mElemList["rd" + name];
        //rd.SetRowDistance(2)
        //ui_util.CreateDrawRectPtr(rd, gui.Color32Half.green)
        rd.clear();
        var font = {};
        font.no_change_font = true;
        font.defalut_font = "ht_24_cc_stroke";
        font.default_color = "oldlace";
        xml = XmlConverter.parseText(xml, font);
        rd.addXmlString(xml);
        var height = rd.getLogicHeight() + 5;
        //height = Math_util.clamp(height, 50, 620)
        rd.height = height;
        window.height = height;
        var _a;
    };
    ////////////////////////////////-响应函数////////////////////////////////-
    FightRecordFrame.prototype.onReturn = function (args) {
        return this.hideWnd();
    };
    return FightRecordFrame;
}(BaseWnd));
__reflect(FightRecordFrame.prototype, "FightRecordFrame");
//# sourceMappingURL=FightRecordFrame.js.map