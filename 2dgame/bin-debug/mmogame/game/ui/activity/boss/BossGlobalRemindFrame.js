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
var BossGlobalRemindFrame = (function (_super) {
    __extends(BossGlobalRemindFrame, _super);
    function BossGlobalRemindFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BossGlobalRemindFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/boss/BossGlobalRemindLayout.exml"];
    };
    BossGlobalRemindFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.Button, _a["name"] = "btn_close", _a["title"] = null, _a["color"] = gui.Color.white, _a["right"] = 0, _a["top"] = 0, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["index_type"] = gui.Button, _b["name"] = "btn_back", _b["title"] = null, _b["color"] = gui.Color.white, _b["right"] = 0, _b["bottom"] = 0, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["scroll_group"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group);
        var _a, _b;
    };
    BossGlobalRemindFrame.prototype.onUnLoad = function () {
    };
    BossGlobalRemindFrame.prototype.onShow = function () {
        //RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (true);
        this.refreshFrame();
    };
    BossGlobalRemindFrame.prototype.onHide = function () {
        //UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (false);
    };
    BossGlobalRemindFrame.prototype.initItemWindow = function (window) {
        var name = window.name;
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = name + "_bg", _a["title"] = null, _a["font"] = null, _a["image"] = "ty_uiDi03", _a["autoScale"] = true, _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["w"] = window.width, _a["h"] = window.height, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = null, _a),
            (_b = {}, _b["index_type"] = eui.Label, _b["name"] = name + "_name", _b["title"] = Localize_cns("BOSS_TXT12"), _b["font"] = "ht_22_lc", _b["color"] = gui.Color.black, _b["x"] = 30, _b["y"] = 15, _b["w"] = 200, _b["h"] = 25, _b["fun_index"] = null, _b["messageFlag"] = true, _b),
            (_c = {}, _c["index_type"] = eui.Label, _c["name"] = name + "_level", _c["title"] = 356, _c["font"] = "ht_22_lc", _c["color"] = gui.Color.black, _c["x"] = 250, _c["y"] = 15, _c["w"] = 200, _c["h"] = 25, _c["fun_index"] = null, _c["messageFlag"] = true, _c),
            (_d = {}, _d["index_type"] = eui.CheckBox, _d["name"] = name + "_remind", _d["title"] = "", _d["font"] = "ht_20_cc", _d["image"] = "ty_xuanZheDi01", _d["image_down"] = "ty_xuanZhe01", _d["color"] = gui.Color.white, _d["x"] = 350, _d["y"] = 5, _d["event_name"] = egret.Event.CHANGE, _d["fun_index"] = this.onCheckChange, _d),
            (_e = {}, _e["index_type"] = eui.Label, _e["name"] = name + "_tips", _e["title"] = Localize_cns("BOSS_TXT26"), _e["font"] = "ht_22_lc", _e["color"] = gui.Color.saddlebrown, _e["x"] = 400, _e["y"] = 15, _e["w"] = 200, _e["h"] = 25, _e["fun_index"] = null, _e["messageFlag"] = true, _e),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window);
        var _a, _b, _c, _d, _e;
        //ui_util.CreateDrawRectPtr(this.mElemList[name +"_dec"], gui.Color32Half.green)
        //AddRdContent(this.mElemList[name + "_dec"], Localize_cns("CHAT_ERROE_JINYAN"), "ht_20_cc", "zongse")
    };
    BossGlobalRemindFrame.prototype.refreshItemWindow = function (window, config) {
        var name = window.name;
        var monName = "";
        var conf = GameConfig.MonsterConfig[config.entryId];
        if (conf) {
            monName = conf.Name;
        }
        this.mElemList[name + "_name"].text = monName;
        this.mElemList[name + "_level"].text = config.level;
        this.mElemList[name + "_remind"].selected = true;
        this.controlDataTable[name + "_remind"] = config.index;
    };
    BossGlobalRemindFrame.prototype.refreshFrame = function () {
        var list = []; //[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1 ,1 ]
        for (var k in GameConfig.BossGlobalConfig) {
            var v = GameConfig.BossGlobalConfig[k];
            table_insert(list, v);
        }
        table_sort(list, function (a, b) { return a.level - b.level; });
        var group = this.mElemList["scroll_group"];
        var scroll = this.scroll;
        scroll.clearItemList();
        this.controlDataTable = {};
        var hasNum = list.length;
        for (var k = 0; k < list.length; k++) {
            var v = list[k];
            var window_1 = scroll.getItemWindow(k, group.width - 3, 60, 3, 5, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v);
        }
    };
    //////////////////////////////////////////
    BossGlobalRemindFrame.prototype.onCheckChange = function (args) {
        var state = args.target.selected;
    };
    return BossGlobalRemindFrame;
}(BaseWnd));
__reflect(BossGlobalRemindFrame.prototype, "BossGlobalRemindFrame");
//# sourceMappingURL=BossGlobalRemindFrame.js.map