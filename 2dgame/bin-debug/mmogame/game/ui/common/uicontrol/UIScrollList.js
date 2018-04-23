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
var UIScrollList = (function (_super) {
    __extends(UIScrollList, _super);
    function UIScrollList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIScrollList.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mParentNode = args[0];
        this.name = args[1];
        var x = args[2];
        var y = args[3];
        var w = args[4];
        var h = args[5];
        var parentWnd = args[6];
        this.dir = UIScrollList.DIR_VERTICAL;
        if (args[7] != null) {
            this.dir = args[7];
        }
        this.mElemList = {};
        var mElemInfo = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = this.name + "_group", _a["percentWidth"] = 100, _a["percentHeight"] = 100, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = null, _a),
            (_b = {}, _b["index_type"] = gui.Scroller, _b["name"] = this.name, _b["viewport"] = this.name + "_group", _b["x"] = x, _b["y"] = y, _b["w"] = w, _b["h"] = h, _b["event_name"] = null, _b["fun_index"] = null, _b),
        ];
        UiUtil.createElem(mElemInfo, this.mParentNode, this.mElemList, this, parentWnd);
        var layout = null;
        var group = this.mElemList[this.name + "_group"];
        if (this.dir == UIScrollList.DIR_VERTICAL) {
            layout = new eui.VerticalLayout();
        }
        else {
            layout = new eui.HorizontalLayout();
        }
        group.layout = layout;
        this.contentGroup = group;
        this.scroller = this.mElemList[this.name];
        this.scroller.bounces = false;
        this.scrollH = 0;
        this.scrollV = 0;
        var _a, _b;
    };
    UIScrollList.prototype.destory = function () {
    };
    UIScrollList.prototype.saveViewXY = function () {
        var viewport = this.scroller.viewport;
        this.scrollH = viewport.scrollH;
        this.scrollV = viewport.scrollV;
    };
    UIScrollList.prototype.restoreViewXY = function () {
        var viewport = this.scroller.viewport;
        viewport.scrollH = this.scrollH;
        viewport.scrollV = this.scrollV;
    };
    UIScrollList.prototype.clearItemList = function () {
        this.contentGroup.removeChildren();
    };
    UIScrollList.prototype.setVisible = function (b) {
        this.contentGroup.visible = b;
    };
    UIScrollList.prototype.getItemWindow = function (index, itemWidth, itemHeight, biasX, biasY, spaceY) {
        var group = this.contentGroup.getChildByName("group" + index);
        if (group != null) {
            return group;
        }
        biasX = biasX || 0;
        biasY = biasY || 0;
        spaceY = biasY || 0;
        itemWidth = checkNull(itemWidth, 0);
        itemHeight = checkNull(itemHeight, 0);
        group = UiUtil.createGroup("group" + index, itemWidth, itemHeight, this.contentGroup);
        group.x = biasX;
        group.y = biasY;
        return group;
    };
    UIScrollList.prototype.refreshScroll = function (noAnim, reset) {
    };
    UIScrollList.prototype.getWidth = function () {
        return this.contentGroup.width;
    };
    UIScrollList.prototype.getHeight = function () {
        this.contentGroup.height;
    };
    // makeSureShowIndex(index:number){
    //     if(this.contentGroup.numChildren <= 0)
    //         return;
    //     let group:eui.Group = <eui.Group>this.contentGroup.getChildAt(index);
    //     if(group == null)
    //         return;
    //     let viewport = this.scroller.viewport
    //     viewport.validateNow();
    //     if(this.dir == UIScrollList.DIR_VERTICAL){
    //     }else{
    //         let beginx = group.x;
    //         let endx = beginx + group.width;
    //         let center = (beginx + endx) / 2
    //         let viewportright = viewport.scrollH + viewport.width
    //         let byleft = (center < viewport.scrollH)
    //         let byright = (center > viewportright)
    //         if (byleft){
    //             viewport.scrollH = beginx
    //             return
    //         }
    //         if (byright){
    //             viewport.scrollH = endx - viewport.width
    //             return
    //         }
    //     }
    // }
    UIScrollList.prototype.moveToScrollIndex = function (index, anim) {
        if (this.contentGroup.numChildren <= 0)
            return;
        var group = this.contentGroup.getChildAt(index);
        if (group == null)
            return;
        if (anim == null) {
            anim = false;
        }
        var viewport = this.scroller.viewport;
        viewport.validateNow();
        this.scroller.scrollToXY(group.x, group.y, anim);
    };
    UIScrollList.prototype.moveRelativeItemWindow = function (relNumber, anim) {
        relNumber = relNumber || 1;
        var viewport = this.scroller.viewport;
        var group = this.contentGroup.getChildAt(0);
        if (group == null)
            return;
        var ww = group.width;
        var wh = group.height;
        if (this.dir == UIScrollList.DIR_VERTICAL) {
            var curIndex = Math.floor(viewport.scrollV / wh);
            this.moveToScrollIndex(MathUtil.clamp(curIndex + relNumber, 0, this.contentGroup.numChildren - 1), anim);
        }
        else {
            var curIndex = Math.floor(viewport.scrollH / ww);
            this.moveToScrollIndex(MathUtil.clamp(curIndex + relNumber, 0, this.contentGroup.numChildren - 1), anim);
        }
    };
    UIScrollList.DIR_VERTICAL = 1;
    UIScrollList.DIR_HORIZON = 2;
    return UIScrollList;
}(TClass));
__reflect(UIScrollList.prototype, "UIScrollList");
//# sourceMappingURL=UIScrollList.js.map