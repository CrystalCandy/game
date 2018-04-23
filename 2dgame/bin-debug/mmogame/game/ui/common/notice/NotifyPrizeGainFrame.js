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
var NotifyPrizeGainFrame = (function (_super) {
    __extends(NotifyPrizeGainFrame, _super);
    function NotifyPrizeGainFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NotifyPrizeGainFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.title = Localize_cns("CAMPAIGN_TXT4");
        this.des = Localize_cns("CAMPAIGN_TXT5");
        this.mLayoutPaths = ["layouts/NotifyPrizeGainLayout.exml"];
    };
    NotifyPrizeGainFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        // this.setFullScreen(true)
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_back", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "gain_btn", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickGain, _c),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["scroll_group"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group);
        for (var i = 0; i < 4; i++) {
            this.mElemList["itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, "itemBox" + i, 28 + 90 * i, 10, this.mElemList["scroll_group"]);
        }
        var _a, _b, _c;
    };
    NotifyPrizeGainFrame.prototype.onUnLoad = function () {
    };
    NotifyPrizeGainFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.refreshFrame();
    };
    NotifyPrizeGainFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
    };
    // switchListGroup(b: boolean) {
    //     this.mElemList["btn_show"].selected = !!b;
    //     this.refreshFrame()
    // }
    NotifyPrizeGainFrame.prototype.initItemWindow = function (window) {
        var name = window.name;
        // let mElemInfo: any = [
        // 	{ ["index_type"]: gui.Grid9Image,   ["name"]: name + "_bg", ["title"]: null, ["font"]: null, ["image"]: "ty_uiDi03", ["autoScale"]:true, ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: window.width, ["h"]: window.height, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
        // ]
        // UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window)
        //ui_util.CreateDrawRectPtr(this.mElemList[name +"_dec"], gui.Color32Half.green)
        //AddRdContent(this.mElemList[name + "_dec"], Localize_cns("CHAT_ERROE_JINYAN"), "ht_20_cc", "zongse")
        for (var i = 0; i < 4; i++) {
            this.mElemList[name + "itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, name + "itemBox" + i, 10 + 100 * i, 10, window);
        }
    };
    NotifyPrizeGainFrame.prototype.refreshItemWindow = function (window, config) {
    };
    NotifyPrizeGainFrame.prototype.refreshFrame = function () {
        var list = [1, 1, 1, 1, 1]; //[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1 ,1 ]
        for (var i = 0; i < 4; i++) {
            this.mElemList["itemBox" + i].setVisible(false);
        }
        this.scroll.setVisible(true);
        if (list.length <= 4) {
            this.scroll.setVisible(false);
            var l = list.length;
            var w = l * 80 + (l - 1) * 10;
            var sx = (this.mElemList["scroll_group"].width - w) / 2;
            for (var i = 0; i < l; i++) {
                this.mElemList["itemBox" + i].setVisible(true);
                this.mElemList["itemBox" + i].setXY(sx + i * (80 + 10), 10);
            }
        }
        else {
            var list1_1 = [];
            var t = [];
            list.forEach(function (v) {
                table_insert(t, v);
                if (size_t(t) == 4) {
                    table_insert(list1_1, t);
                    t = [];
                }
            });
            if (t.length > 0) {
                table_insert(list1_1, t);
            }
            var group = this.mElemList["scroll_group"];
            var scroll_1 = this.scroll;
            scroll_1.clearItemList();
            var hasNum = list.length;
            for (var k = 0; k < list1_1.length; k++) {
                var v = list[k];
                var window_1 = scroll_1.getItemWindow(k, group.width - 3, 125, 3, 5, 0);
                this.initItemWindow(window_1);
                this.refreshItemWindow(window_1, v);
            }
        }
        this.mElemList["label_wndName"].text = this.title;
        this.mElemList["dec_rd"].setAlignFlag(gui.Flag.H_CENTER);
        AddRdContent(this.mElemList["dec_rd"], this.des, "ht_24_cc", "zongse");
    };
    /////////////////////////////////////////////////
    NotifyPrizeGainFrame.prototype.onClickGain = function (args) {
        if (this.clickCallback) {
            if (this.clickCallback.call(this.clickObj)) {
                return;
            }
        }
        //
    };
    NotifyPrizeGainFrame.prototype.showPrizeGainFrame = function (callback, obj, prizeList, title, des) {
        this.clickCallback = callback;
        this.clickObj = obj;
        this.prizeList = prizeList;
        this.title = title;
        this.des = des;
        this.showWnd();
    };
    return NotifyPrizeGainFrame;
}(BaseWnd));
__reflect(NotifyPrizeGainFrame.prototype, "NotifyPrizeGainFrame");
//# sourceMappingURL=NotifyPrizeGainFrame.js.map