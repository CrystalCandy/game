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
var ItemBatchUseFrame = (function (_super) {
    __extends(ItemBatchUseFrame, _super);
    function ItemBatchUseFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemBatchUseFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/ItemBatchUseLayout.exml"];
        this.maxNum = 100;
        this.curNum = -1;
        this.unit = 1;
        this.longSchedule = null;
        this.selectName = null;
        this.obj = null;
    };
    ItemBatchUseFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "leftBtn", _c["title"] = null, _c["event_name"] = gui.TouchEvent.TOUCH_SHORT, _c["fun_index"] = this.onClickChangeBtn, _c),
            (_d = {}, _d["name"] = "rightBtn", _d["title"] = null, _d["event_name"] = gui.TouchEvent.TOUCH_SHORT, _d["fun_index"] = this.onClickChangeBtn, _d),
            (_e = {}, _e["name"] = "useBtn", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onClickUseItem, _e),
            (_f = {}, _f["name"] = "choose_slider", _f["title"] = null, _f["event_name"] = egret.Event.CHANGE, _f["fun_index"] = this.onSliderChange, _f),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["itemBox"] = UIItemBox.newObj(this.mLayoutNode, "itemBox", 0, 0, this.mElemList["group_item"]);
        this.mElemList["itemBox"].setCountVisible(false);
        this.mElemList["dec_rd"].setAlignFlag(gui.Flag.RIGHT);
        var _a, _b, _c, _d, _e, _f;
    };
    ItemBatchUseFrame.prototype.onUnLoad = function () {
    };
    ItemBatchUseFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this);
        this.mLayoutNode.visible = true;
        this.curNum = -1;
        //this.mElemList["choose_slider"]:SetPercent(0)
        this.refreshFrame();
        this.refreshSlider();
    };
    ItemBatchUseFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this);
        if (this.longSchedule) {
            KillTimer(this.longSchedule);
            this.longSchedule = null;
        }
        //this.shopItem = null
        //this.callback = null
        //this.obj  = null
        this.mLayoutNode.visible = false;
        this.useTitle = null;
        this.obj = null;
        this.genDecCallback = null;
        this.clickCallback = null;
    };
    // longClickBuy(args: egret.TouchEvent) {
    //     this.selectName = args.target.name
    //     if (this.longSchedule) {
    //         KillTimer(this.longSchedule)
    //         this.longSchedule = null
    //     }
    //     this.longSchedule = SetTimer(this.addShopItem, this, 100, true)
    // }
    // //计时器回调
    // addShopItem(args) {
    //     let name = this.selectName
    //     if (!name) {
    //         return
    //     }
    //     let dirty = false
    //     if (name == "leftBtn") {
    //         if (this.curNum - 1 > 0) {
    //             this.curNum = this.curNum - 1
    //             dirty = true
    //         }
    //     } else if (name == "rightBtn") {
    //         if (this.curNum + 1 <= this.maxNum) {
    //             this.curNum = this.curNum + 1
    //             dirty = true
    //         }
    //     }
    //     if (dirty) {
    //         this.refreshFrame()
    //         this.refreshSlider()
    //     }
    // }
    ItemBatchUseFrame.prototype.refreshFrame = function () {
        if (!this.itemInfo) {
            this.hideWnd();
            return;
        }
        var itemInfo = ItemSystem.getInstance().getItemLogicInfoByID(this.itemInfo.id);
        if (!itemInfo) {
            this.hideWnd();
            return;
        }
        this.mElemList["itemBox"].updateByItem(itemInfo);
        this.maxNum = itemInfo.getProperty("count") || 0;
        if (this.curNum < 0) {
            this.curNum = this.maxNum;
        }
        this.mElemList["storeCount"].text = (String.format(Localize_cns("HAVE_NUMBER"), this.maxNum));
        var btnTitle = this.useTitle || Localize_cns("USE");
        this.mElemList["useBtn"].text = (btnTitle);
        this.refreshUseCount();
    };
    ItemBatchUseFrame.prototype.refreshUseCount = function () {
        this.mElemList["useCount"].text = ("x" + this.curNum);
        var txt = "";
        if (this.obj && this.genDecCallback) {
            txt = this.genDecCallback.call(this.obj, this.curNum);
        }
        AddRdContent(this.mElemList["dec_rd"], txt, "ht_22_cc_stroke", "white");
    };
    ItemBatchUseFrame.prototype.refreshSlider = function () {
        var maxNum = this.maxNum;
        var curNum = this.curNum;
        if (maxNum < 1) {
            maxNum = 1;
        }
        if (curNum < 1) {
            curNum = 1;
        }
        var slider = this.mElemList["choose_slider"];
        slider.maximum = maxNum;
        slider.minimum = 1;
        slider.value = curNum;
        slider.snapInterval = 1; ///通过 snapInterval 属性设置增加的有效值。
        //this.mElemList["choose_slider"].enabled = (this.maxNum > 1)
        //this.mElemList["leftBtn"].enabled = (this.maxNum > 1)
        //this.mElemList["rightBtn"].enabled = (this.maxNum > 1)
    };
    //-增加或减少一个数量
    ItemBatchUseFrame.prototype.onClickChangeBtn = function (args) {
        var name = args.target.name;
        if (this.longSchedule) {
            KillTimer(this.longSchedule);
            this.longSchedule = null;
            return;
        }
        var dirty = false;
        if (name == "leftBtn") {
            if (this.curNum - 1 > 0) {
                this.curNum = this.curNum - 1;
                dirty = true;
            }
        }
        else if (name == "rightBtn") {
            if (this.curNum + 1 <= this.maxNum) {
                this.curNum = this.curNum + 1;
                dirty = true;
            }
        }
        if (dirty) {
            this.refreshSlider();
            this.refreshUseCount();
        }
    };
    ItemBatchUseFrame.prototype.onSliderChange = function (args) {
        var slilder = args.target;
        this.curNum = Math.ceil(slilder.pendingValue);
        if (this.curNum == 0) {
            this.curNum = 1;
        }
        //TLog.Debug("DealItemFrame.onSliderChange",args.percent, args.absolute,	this.curNum, this.maxNum)
        //强制调整slider
        if (this.maxNum == 1) {
            this.refreshSlider();
        }
        this.refreshUseCount();
    };
    ItemBatchUseFrame.prototype.onClickUseItem = function (args) {
        if (this.curNum < this.unit) {
            MsgSystem.addTagTips(Localize_cns("ITEM_COUNT_ERROR"));
            return;
        }
        if (this.obj && this.clickCallback) {
            this.clickCallback.call(this.obj, this.curNum);
            return this.hideWnd();
        }
        //if(this.curNum <= 0 ){
        //	this.hideWnd()
        //	return
        //}
        var item = ItemSystem.getInstance().getItemLogicInfoByID(this.itemInfo.id);
        if (item != null) {
            UseItem(item, this.curNum);
        }
        this.hideWnd();
    };
    //////////////////////////////////////////////////////////////////////////////////////-
    ItemBatchUseFrame.prototype.showWithItemInfo = function (itemInfo, useTitle, obj, genDecCallback, clickCallback, unit) {
        this.itemInfo = itemInfo;
        this.useTitle = useTitle;
        this.obj = obj;
        this.genDecCallback = genDecCallback;
        this.clickCallback = clickCallback;
        this.unit = checkNull(unit, 1);
        this.showWnd();
    };
    return ItemBatchUseFrame;
}(BaseWnd));
__reflect(ItemBatchUseFrame.prototype, "ItemBatchUseFrame");
//# sourceMappingURL=ItemBatchUseFrame.js.map