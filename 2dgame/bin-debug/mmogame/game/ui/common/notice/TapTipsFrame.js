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
var TapTipsFrame = (function (_super) {
    __extends(TapTipsFrame, _super);
    function TapTipsFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TapTipsFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        //this.mLayoutPaths = ["layouts/common/TapTipsLayout.exml"];
        this.MaxCount = 10;
        this.mLayoutNodeList = [];
        this.mFrameInfoList = {};
        this.lastIndex = -1;
    };
    TapTipsFrame.prototype.onLoad = function () {
        //this.mLayerNodeList.push(this.mLayoutNode);
        for (var i = 0; i < this.MaxCount; i++) {
            var mElemList = {};
            var node = this.createLayoutNode();
            node.setLayer(3 /* Top */);
            node.width = 620;
            node.height = 40;
            // node.skinName = this.mLayoutPaths[0];
            node.visible = false;
            this.mLayoutNodeList.push(node);
            var elemInfo = [
                (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = "bg", _a["image"] = "ty_huoDeDi01", _a["percentWidth"] = 100, _a["percentHeight"] = 100, _a["event_name"] = null, _a["fun_index"] = null, _a),
                (_b = {}, _b["index_type"] = gui.RichDisplayer, _b["name"] = "msg", _b["title"] = "", _b["font"] = "ht_24_cc_stroke", _b["color"] = gui.Color.white, _b["w"] = 620, _b["h"] = 40, _b["event_name"] = null, _b["fun_index"] = null, _b),
            ];
            UiUtil.createElem(elemInfo, node, mElemList, this);
            node.touchEnabled = false;
            node.touchChildren = false;
            mElemList["msg"].setAlignFlag(gui.Flag.H_CENTER + gui.Flag.V_CENTER);
            this.mFrameInfoList[i] = { msg: mElemList["msg"], node: node, time: 0 };
        }
        var _a, _b;
    };
    TapTipsFrame.prototype.onUnLoad = function () {
        for (var i = 0; i < this.MaxCount; i++) {
            this.mLayoutNodeList[i].removeFromtParent();
        }
        this.mLayoutNodeList.length = 0;
        this.mFrameInfoList = null;
    };
    TapTipsFrame.prototype.onShow = function () {
    };
    TapTipsFrame.prototype.onHide = function () {
    };
    TapTipsFrame.prototype.addNewMsg = function (msg) {
        var startY = -120;
        var nowTime = core.TimeStamp.CurrentTime;
        var showCount = 0;
        for (var i = 0; i < this.MaxCount; i++) {
            var info_1 = this.mFrameInfoList[i];
            if (info_1.node.visible && nowTime - info_1.time < 500) {
                showCount++;
            }
        }
        if (showCount >= this.MaxCount - 1) {
            return;
        }
        this.lastIndex = (this.lastIndex + 1) % this.MaxCount;
        var info = this.mFrameInfoList[this.lastIndex];
        info.node.visible = true;
        info.node.alpha = 1;
        info.node.horizontalCenter = 0;
        info.node.verticalCenter = startY;
        info.time = nowTime;
        info.msg.width = 640;
        AddRdContent(info.msg, msg, "ht_22_cc", "white");
        AdjustRdContentViewW(info.msg, 10);
        AdjustRdContentViewH(info.msg, 40);
        UiUtil.setWH(info.node, info.msg.width, info.msg.height);
        //info.msg.text = msg;
        //info.msg.width = 620;
        var endY = startY - (60 + (showCount) * (info.node.height - 5));
        egret.Tween.removeTweens(info.node);
        egret.Tween.get(info.node).to({ verticalCenter: endY }, 800).wait(500).to({ alpha: 0 }, 300).call(this.onLayoutNodeComplete, this, [info]);
        // var topIndex = this.lastIndex
        // for(var i = 1; i <= this.MaxCount - 1; i++){
        // 	topIndex--;
        // 	if( topIndex < 0){
        // 		topIndex = this.MaxCount - 1;
        // 	}
        // 	var node:gui.LayoutNode = this.mFrameInfoList[topIndex].node;
        // 	if(node.visible){
        // 		node.horizontalCenter = 0
        // 		node.verticalCenter = -45 * i - startY;
        // 	}
        // }
    };
    TapTipsFrame.prototype.onLayoutNodeComplete = function (info) {
        //TLog.Debug("onOneNodeComplete")
        info.node.visible = false;
    };
    return TapTipsFrame;
}(BaseWnd));
__reflect(TapTipsFrame.prototype, "TapTipsFrame");
//# sourceMappingURL=TapTipsFrame.js.map