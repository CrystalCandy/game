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
var OdysseyEscortFrame = (function (_super) {
    __extends(OdysseyEscortFrame, _super);
    function OdysseyEscortFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OdysseyEscortFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/xiyouhusong/OdysseyEscortLayout.exml"];
        this.select = -1;
    };
    OdysseyEscortFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_back", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_refresh", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onRefreshClick, _c),
            (_d = {}, _d["name"] = "btn_oneKeyRf", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onOneKeyClick, _d),
            (_e = {}, _e["name"] = "btn_goto", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onGotoClick, _e),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        /*let group: eui.Group = this.mElemList["group_scroll"]
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group, UIScrollList.DIR_VERTICAL)*/
        this.mElemList["rd_tips"].setAlignFlag(gui.Flag.LEFT_TOP);
        this.mElemList["rd_rf_cost"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["rd_oneKey_cost"].setAlignFlag(gui.Flag.CENTER_CENTER);
        var _a, _b, _c, _d, _e;
    };
    OdysseyEscortFrame.prototype.onUnLoad = function () {
    };
    OdysseyEscortFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.onRefresh();
    };
    OdysseyEscortFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    OdysseyEscortFrame.prototype.updateWnd = function () {
        this.onRefresh();
    };
    OdysseyEscortFrame.prototype.onRefresh = function () {
        var actInfo = GetActivity(ActivityDefine.HuSong).getActInfo();
        if (size_t(actInfo) == 0)
            return;
        this.select = actInfo.index;
        // let scroll = this.scroll
        // scroll.clearItemList()
        var escortlist = GameConfig.EscortConfig;
        for (var k = 1; k <= size_t(escortlist); k++) {
            var v = escortlist[k];
            //let window = scroll.getItemWindow(k, 550, 120 , 0, 0)
            var window_1 = this.mElemList["group_scroll"];
            this.initItemWindow(window_1, k);
            this.refreshItemWindow(k, v);
        }
        //PET_TXT4 rd_tips rd_oneKey_cost rd_rf_cost
        AddRdContent(this.mElemList["rd_tips"], Localize_cns("ESCORT_DES_TXT1"), "ht_20_cc", "black");
        var unit = 2;
        var moneystr = GetMoneyIcon(unit);
        var oneKeyStr = "";
        var costId = 60071;
        var onecost = 450;
        var oneCostCount = ItemSystem.getInstance().getItemCount(costId);
        if (oneCostCount == 0) {
            oneKeyStr = GetMoneyIcon(unit);
        }
        else {
        }
        var cost = 50;
        AddRdContent(this.mElemList["rd_oneKey_cost"], Localize_cns("PET_TXT4") + moneystr + onecost, "ht_20_cc", "black");
        AddRdContent(this.mElemList["rd_rf_cost"], Localize_cns("PET_TXT4") + moneystr + cost, "ht_20_cc", "black");
        //rd_twice
        var twice = actInfo.husongTwice || 0;
        AddRdContent(this.mElemList["rd_twice"], Localize_cns("ESCORT_TXT1") + twice + "/" + 3, "ht_20_cc", "black");
    };
    OdysseyEscortFrame.prototype.initItemWindow = function (window, index) {
        var name = "group" + index;
        var width = 550;
        var height = 120;
        var y = 125 * (index - 1);
        if (this.mElemList[name + "_bg"] != null)
            return;
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = name + "_bg", _a["image"] = "ty_uiDi03", _a["autoScale"] = true, _a["x"] = 0, _a["y"] = y, _a["w"] = width, _a["h"] = height, _a),
            (_b = {}, _b["index_type"] = eui.Image, _b["name"] = name + "_title_bg", _b["parent"] = name + "_bg", _b["image"] = "cw_textDi02", _b["x"] = 15, _b["y"] = 0, _b["w"] = 44, _b["h"] = 120, _b),
            (_c = {}, _c["index_type"] = gui.RichDisplayer, _c["name"] = name + "_title", _c["parent"] = name + "_title_bg", _c["title"] = "", _c["image"] = "", _c["font"] = "ht_20_cc", _c["color"] = "", _c["x"] = 8, _c["y"] = 17, _c["w"] = 28, _c["h"] = 86, _c),
            (_d = {}, _d["index_type"] = eui.Group, _d["name"] = name + "_group_prize", _d["parent"] = name + "_bg", _d["title"] = "", _d["x"] = 223, _d["y"] = 10, _d["w"] = 320, _d["h"] = 100, _d["messageFlag"] = true, _d),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window);
        this.mElemList[name + "_title"].setAlignFlag(gui.Flag.CENTER_CENTER);
        var _a, _b, _c, _d;
    };
    OdysseyEscortFrame.prototype.refreshItemWindow = function (index, config) {
        var name = "group" + index;
        var ColorList = ["#ublack", "#green", "#blue", "#purple", "#orange"];
        var titleColor = ColorList[index - 1];
        AddRdContent(this.mElemList[name + "_title"], titleColor + config.tips, "ht_20_cc");
        var prizelist = AnalyPrizeFormat(config.prize);
        for (var i = 0; i < size_t(prizelist); i++) {
            var x = 80 * i;
            var y = 0;
            var id = prizelist[i][0];
            var count = prizelist[i][1];
            var itemName = GameConfig.itemConfig[id].name;
            if (this.mElemList[name + "_group_prize_" + i] == null) {
                var mElemInfo = [
                    (_a = {}, _a["index_type"] = eui.Group, _a["name"] = name + "_group_prize_" + i, _a["title"] = "", _a["image"] = "", _a["font"] = "ht_18_cc", _a["x"] = x, _a["y"] = 0, _a["w"] = 80, _a["h"] = 100, _a),
                    (_b = {}, _b["index_type"] = eui.Group, _b["name"] = name + "_prize_container_" + i, _b["parent"] = name + "_group_prize_" + i, _b["title"] = "", _b["image"] = "", _b["font"] = "ht_18_cc", _b["x"] = 0, _b["y"] = 0, _b["w"] = 80, _b["h"] = 80, _b),
                    (_c = {}, _c["index_type"] = eui.Label, _c["name"] = name + "_prize_name_" + i, _c["parent"] = name + "_group_prize_" + i, _c["title"] = "", _c["image"] = "", _c["font"] = "ht_18_cc", _c["x"] = 0, _c["y"] = 80, _c["w"] = 80, _c["h"] = 20, _c),
                ];
                UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, this.mElemList[name + "_group_prize"]);
                this.mElemList[name + "_prizeBox_" + i] = UIItemBox.newObj(this.mLayoutNode, name + "_prizeBox_" + i, 0, 0, this.mElemList[name + "_prize_container_" + i]);
            }
            this.mElemList[name + "_prizeBox_" + i].updateByEntry(id, count);
            this.mElemList[name + "_prize_name_" + i].text = itemName;
        }
        this.mElemList[name + "_bg"].source = "ty_uiDi03";
        if (index == this.select) {
            this.mElemList[name + "_bg"].source = "ty_uiDi04";
        }
        var _a, _b, _c;
    };
    ////响应事件
    OdysseyEscortFrame.prototype.onRefreshClick = function () {
        var unit = 2;
        var had = GetHeroMoney(unit);
        var need = 50;
        if (had < need) {
            MsgSystem.addTagTips(Localize_cns("COPY_TXT16"));
            return;
        }
        RpcProxy.call("C2G_RandEscortIndex", 0);
    };
    OdysseyEscortFrame.prototype.onOneKeyClick = function () {
        var id = 60071;
        var had = ItemSystem.getInstance().getItemCount(id);
        if (had == 0) {
            had = GetHeroMoney(2);
        }
        if (had < 450) {
            MsgSystem.addTagTips(Localize_cns("COPY_TXT16"));
            return;
        }
        var wnd = WngMrg.getInstance().getWindow("EscortTipsFrame");
        var str = Localize_cns("ESCORT_TIPS_TXT5");
        wnd.onShowWnd(str);
    };
    OdysseyEscortFrame.prototype.onGotoClick = function () {
        var wnd = WngMrg.getInstance().getWindow("EscortTipsFrame");
        var str1 = Localize_cns("ESCORT_TIPS_TXT3");
        var str2 = Localize_cns("ESCORT_TIPS_TXT4");
        wnd.onShowWnd(str1, str2);
    };
    return OdysseyEscortFrame;
}(BaseWnd));
__reflect(OdysseyEscortFrame.prototype, "OdysseyEscortFrame");
//# sourceMappingURL=OdysseEscortFrame.js.map