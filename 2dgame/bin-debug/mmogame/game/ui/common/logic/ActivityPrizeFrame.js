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
var ActivityPrizeFrame = (function (_super) {
    __extends(ActivityPrizeFrame, _super);
    function ActivityPrizeFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActivityPrizeFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/ActivityPrizeLayout.exml"];
    };
    ActivityPrizeFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var configList = this.actConfig;
        var tabNum = size_t(configList);
        if (tabNum > 1) {
            var elemInfoList = [];
            for (var i = 1; i <= tabNum; i++) {
                var v = configList[i];
                var elem = (_c = {}, _c["index_type"] = eui.RadioButton, _c["name"] = "tab" + i, _c["title"] = v.title, _c["color"] = gui.Color.white, _c["font"] = "ht_22_cc_stroke", _c["image"] = "ty_tongYongBt05", _c["image_down"] = "ty_tongYongBt04", _c["w"] = 110, _c["h"] = 50, _c["event_name"] = null, _c["fun_index"] = null, _c);
                elemInfoList.push(elem);
            }
            UiUtil.createElem(elemInfoList, this.mLayoutNode, this.mElemList, this, this.mElemList["group_tab"]);
            var radioGroup = new eui.RadioButtonGroup();
            radioGroup.addEventListener(eui.UIEvent.CHANGE, this.onSelected, this);
            for (var i = 1; i <= tabNum; i++) {
                var radioBtn = this.mElemList["tab" + i];
                radioBtn.group = radioGroup;
                radioBtn.value = i;
            }
        }
        var group = this.mElemList["group_content"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group);
        var _a, _b, _c;
    };
    ActivityPrizeFrame.prototype.onUnLoad = function () {
    };
    ActivityPrizeFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.curIndex = 1;
        this.refreshFrame();
    };
    ActivityPrizeFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
    };
    ActivityPrizeFrame.prototype.refreshFrame = function () {
        if (this.actConfig == null)
            return;
        var config = this.actConfig[this.curIndex];
        var radioBtn = this.mElemList["tab" + this.curIndex];
        if (radioBtn != null) {
            radioBtn.selected = true;
        }
        var prizeList = [];
        this.mElemList["label_title"].text = "";
        if (config) {
            prizeList = config.prizeList;
            this.mElemList["label_title"].text = config.title;
            AddRdContent(this.mElemList["rd_tips"], config.tips || "", "ht_24_cc", "ublack");
        }
        var list = splitListByCount(prizeList, 4);
        var scroll = this.scroll;
        scroll.clearItemList();
        this.controlDataTable = {};
        for (var k = 0; k < list.length; k++) {
            var v = list[k];
            var window_1 = scroll.getItemWindow(k, 560, 135, 10, 5);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v);
        }
        scroll.refreshScroll();
    };
    ActivityPrizeFrame.prototype.initItemWindow = function (window) {
        var name = window.name;
        for (var i = 1; i <= 4; i++) {
            this.mElemList[name + "itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, name + "itemBox" + i, 20 + (i - 1) * 140, 10, window);
            var mElemInfo = [
                (_a = {}, _a["index_type"] = eui.Label, _a["name"] = name + "_name" + i, _a["title"] = Localize_cns("ROBBER_TXT76"), _a["font"] = "ht_20_cc_stroke", _a["scale_image"] = "", _a["color"] = gui.Color.white, _a["x"] = -5, _a["y"] = 90, _a["w"] = 100, _a["h"] = 25, _a["event_name"] = null, _a["fun_index"] = null, _a),
            ];
            this.mElemList[name + "itemBox" + i].createElem(mElemInfo, this.mElemList, this);
        }
        var _a;
    };
    ActivityPrizeFrame.prototype.refreshItemWindow = function (window, config) {
        var name = window.name;
        for (var i = 1; i <= 4; i++) {
            var entryId = config[i - 1];
            if (entryId != null) {
                this.mElemList[name + "itemBox" + i].setVisible(true);
                this.mElemList[name + "itemBox" + i].updateByEntry(entryId, 1);
                this.mElemList[name + "_name" + i].text = ItemSystem.getInstance().getItemName(entryId);
            }
            else {
                this.mElemList[name + "itemBox" + i].setVisible(false);
            }
        }
    };
    ActivityPrizeFrame.prototype.onSelected = function (event) {
        var radioGroup = event.target;
        //console.log(radioGroup.selection);
        var radiobtn = radioGroup.selection;
        this.curIndex = radiobtn.value;
        this.refreshFrame();
    };
    ////////////////////////////////////////////////////////////公共接口//////////////////////////////////////////////////////
    ActivityPrizeFrame.prototype.showActivityPrizeFrame = function (actIndex) {
        if (this.isVisible() == true) {
            return;
        }
        if (!GameConfig.ActivityPrizeClientConfig[actIndex]) {
            return;
        }
        this.actConfig = GameConfig.ActivityPrizeClientConfig[actIndex];
        return this.showWnd();
    };
    return ActivityPrizeFrame;
}(BaseWnd));
__reflect(ActivityPrizeFrame.prototype, "ActivityPrizeFrame");
//# sourceMappingURL=ActivityPrizeFrame.js.map