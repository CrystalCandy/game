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
var UIXianLvListBox = (function (_super) {
    __extends(UIXianLvListBox, _super);
    function UIXianLvListBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIXianLvListBox.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mParentNode = args[0];
        var name = args[1];
        var x = args[2];
        var y = args[3];
        var w = args[4];
        var h = args[5];
        this.parentWnd = args[6];
        this.mElemList = {};
        this.select = 0; //默认
        this.scroll = UIScrollList.newObj(this.mParentNode, "xianlv_scroll" + name, x, y, w, h, this.parentWnd, UIScrollList.DIR_HORIZON);
        RegisterEvent(EventDefine.ACTOR_XIANLV_UPDATE, this.setXianLvList, this);
    };
    UIXianLvListBox.prototype._initXianLvWindow = function (window, k) {
        var name = window.name;
        var ElemInfo = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = name + "_group_XianLv", _a["x"] = 0, _a["y"] = 0, _a["w"] = 100, _a["h"] = 150, _a),
            (_b = {}, _b["index_type"] = eui.Group, _b["name"] = name + "_box_wnd", _b["x"] = 0, _b["y"] = 0, _b["w"] = 100, _b["h"] = 150, _b),
            (_c = {}, _c["index_type"] = gui.RichDisplayer, _c["name"] = name + "_rd_name", _c["parent"] = name + "_box_wnd", _c["x"] = 0, _c["y"] = 90, _c["w"] = 100, _c["h"] = 25, _c["messageFlag"] = true, _c),
            (_d = {}, _d["index_type"] = eui.Label, _d["name"] = name + "_lv", _d["parent"] = name + "group_XianLv_", _d["title"] = "", _d["font"] = "ht_20_cc_stroke", _d["color"] = gui.Color.yellow, _d["x"] = 0, _d["y"] = 120, _d["w"] = 100, _d["h"] = 25, _d["messageFlag"] = true, _d),
        ];
        UiUtil.createElem(ElemInfo, this.mParentNode, this.mElemList, this, window);
        this.mElemList[name + "_rd_name"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList[name + "_lv"].textColor = gui.Color.yellow;
        this.mElemList[name + "_lv"].visible = false;
        this.mElemList["petBox_" + name] = UIPetBox.newObj(this.mParentNode, "petBox_" + name, 10, 8, this.mElemList[name + "_box_wnd"]);
        this.mElemList["petBox_" + name].setClickListner(this.onXianLvCallBack, this, k);
        var _a, _b, _c, _d;
    };
    UIXianLvListBox.prototype._refreshXianLvWindow = function (window, entryId, index) {
        var name = window.name;
        var data = GameConfig.ActorXianLvConfig[entryId];
        var star = -1;
        var fightlist = XianLvSystem.getInstance().getFightList();
        var level = XianLvSystem.getInstance().getLevel(entryId);
        var quality = GameConfig.ActorXianLvConfig[entryId].quality;
        var color = GetQualityColorStr(quality);
        AddRdContent(this.mElemList[name + "_rd_name"], data.name, "ht_20_cc_stroke", color);
        //如果激活
        this.mElemList["petBox_" + name].setEnable(false);
        if (XianLvSystem.getInstance().isExit(entryId)) {
            star = XianLvSystem.getInstance().getStar(entryId);
            var jieStr = level + "阶";
            this.mElemList[name + "_lv"].text = jieStr;
            this.mElemList[name + "_lv"].visible = true;
            this.mElemList["petBox_" + name].setEnable(true);
        }
        this.mElemList["petBox_" + name].updateByEntry(entryId, star);
        if (this.select == index) {
            this.mElemList["petBox_" + name].select(true);
        }
        for (var k in fightlist) {
            if (tonumber(k) == entryId) {
                this.mElemList["petBox_" + name].setFightFlag();
            }
        }
    };
    UIXianLvListBox.prototype.onXianLvCallBack = function (entryId, index) {
        if (this.select == index)
            return true;
        this.select = index;
        var max = size_t(this.xianlvList);
        for (var i = 0; i < max; i++) {
            var window_1 = this.scroll.getItemWindow(i, 100, 150, 0, 0, 0);
            var name_1 = window_1.name;
            this.mElemList["petBox_" + name_1].select(false);
            if (this.select == i) {
                this.mElemList["petBox_" + name_1].select(true);
            }
        }
        if (this.mCallbackFunc && this.mCallbackObj) {
            this.mCallbackFunc.call(this.mCallbackObj, this.xianlvList[this.select]);
        }
        return true;
    };
    UIXianLvListBox.prototype.setClickListner = function (func, obj) {
        this.mCallbackFunc = func;
        this.mCallbackObj = obj;
    };
    UIXianLvListBox.prototype.rightMove = function () {
        var elem = this.scroll.scroller;
        var moveDis = elem.viewport.scrollH;
        var index = Math.floor(moveDis / 100);
        var limit = size_t(this.xianlvList);
        var moveTo = ((index + 6) > limit) ? (limit - 5) : (index + 5);
        this.scroll.moveToScrollIndex(moveTo, true);
    };
    UIXianLvListBox.prototype.leftMove = function () {
        var elem = this.scroll.scroller;
        var moveDis = elem.viewport.scrollH;
        var index = Math.floor(moveDis / 80);
        var moveTo = (index - 5) < 0 ? 0 : (index - 5);
        this.scroll.moveToScrollIndex(moveTo, true);
    };
    UIXianLvListBox.prototype.setXianLvList = function () {
        this.xianlvList = [];
        this.xianlvList = XianLvSystem.getInstance().getControlList();
        this.scroll.clearItemList();
        //更新拥有
        var max = size_t(this.xianlvList);
        for (var i = 0; i < max; i++) {
            var v = this.xianlvList[i].Id;
            var window_2 = this.scroll.getItemWindow(i, 100, 150, 0, 0, 0);
            this._initXianLvWindow(window_2, i);
            this._refreshXianLvWindow(window_2, v, i);
        }
        this.scroll.refreshScroll();
        this.scroll.restoreViewXY();
        if (this.mCallbackObj && this.callbackIndex != null) {
            this.onRefreshDotTips(this.mCallbackObj, this.callbackIndex);
        }
        return this.xianlvList[this.select].Id;
    };
    //---------自定义红点
    UIXianLvListBox.prototype.onRefreshDotTips = function (obj, index) {
        var xianlvList = this.xianlvList;
        for (var k in xianlvList) {
            var xianlvInfo = xianlvList[k];
            var xianlvId = xianlvInfo.Id;
            var check = false;
            if (index == 0) {
                check = GuideFuncSystem.getInstance().checkXianLvUpgrade(xianlvId);
            }
            else {
                check = GuideFuncSystem.getInstance().checkXialvUpStart(xianlvId);
            }
            if (check) {
                var window_3 = this.scroll.getItemWindow(tonumber(k), 100, 150, 0, 0, 0);
                obj.createDotTipsUI(this.mElemList["petBox_" + window_3.name].rootWnd);
            }
        }
    };
    return UIXianLvListBox;
}(TClass));
__reflect(UIXianLvListBox.prototype, "UIXianLvListBox");
//# sourceMappingURL=UIXianLvListBox.js.map