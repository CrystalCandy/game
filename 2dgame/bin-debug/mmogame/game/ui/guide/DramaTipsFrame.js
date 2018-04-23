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
// TypeScript file
var DramaTipsFrame = (function (_super) {
    __extends(DramaTipsFrame, _super);
    function DramaTipsFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DramaTipsFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/TaskDialogLayout.exml"];
        this.content = null;
        this.font = "ht_24_cc";
        this.window_y = 0;
        this.rightType = false;
        this.headID = 3009;
        this.guideType = 0;
        this.timerList = {};
    };
    DramaTipsFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        //this.setFullScreen(true)
        //this.setAlignCenter(true, true)
        this.mLayoutNode.setDoModal(true, 10);
        this.initSkinElemList();
        var elemInfo = [];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mLayoutNode.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTips, this);
        this.actorView = UIActorView.newObj(this.mLayoutNode, "actorView", 0, 0, this.mElemList["group_actorview"]);
        this.actorView.setActorScale(1.2);
    };
    DramaTipsFrame.prototype.onUnLoad = function () {
    };
    DramaTipsFrame.prototype.onShow = function () {
        UiUtil.registerTouchOutsideEvent(this.onClickTips, this, [this.mLayoutNode]);
        RegisterEvent(EventDefine.STATE_ACTIVE, this.fightHideFrame, this);
        RegisterEvent(EventDefine.STATE_DEACTIVE, this.fightEndShowFrame, this);
        if (this.guideType > 0) {
            this.mLayoutNode.setDoModal(true, this.guideType);
        }
        this.mLayoutNode.visible = true;
        this.refreshFrame();
        if (!this.timerList["moveToFront"]) {
            var tick = function (delay) {
                this.mLayoutNode.moveToFront();
            };
            this.timerList["moveToFront"] = SetTimer(tick, this, 0, false);
        }
    };
    DramaTipsFrame.prototype.onHide = function () {
        UiUtil.unRegisterTouchOutsideEvent(this.onClickTips, this);
        UnRegisterEvent(EventDefine.STATE_ACTIVE, this.fightHideFrame, this);
        UnRegisterEvent(EventDefine.STATE_DEACTIVE, this.fightEndShowFrame, this);
        this.actorView.clearView();
        this.mLayoutNode.visible = false;
        if (this.guideType > 0) {
            this.mLayoutNode.setDoModal(false, 0);
        }
        for (var _ in this.timerList) {
            var timer = this.timerList[_];
            KillTimer(timer);
        }
        this.timerList = {};
    };
    DramaTipsFrame.prototype.setTipsData = function (param) {
        this.window_y = param["window_y"] || 0;
        this.rightType = param["rightType"] || false;
        this.content = param["content"] || null;
        this.font = param["font"] || "ht_24_lc";
        this.headID = param["headID"] || 7000;
        this.curIndex = 0;
        this.guideType = param["guideType"] || 0;
        this.click = param["clickClose"] || false;
    };
    DramaTipsFrame.prototype.refreshFrame = function () {
        var modelId = this.headID || 3009;
        var player = this.actorView.updateByPlayer(modelId);
        if (this.rightType == true) {
            this.mLayoutNode.currentState = "my";
            player.setDir(ActorDirMap.Left);
        }
        else {
            this.mLayoutNode.currentState = "other";
            player.setDir(ActorDirMap.Right);
        }
        var showContent = this.content[this.curIndex];
        showContent = XmlConverter.convertDynamicWord(showContent);
        var rd = this.mElemList["rd_content"];
        AddRdContent(rd, showContent, this.font, "black", 2);
        this.mLayoutNode.y = this.window_y;
    };
    DramaTipsFrame.prototype.onClickTips = function (event) {
        if (!this.click) {
            return;
        }
        var parentNode = this.mLayoutNode.parent;
        var childIndex = parentNode.getChildIndex(this.mLayoutNode);
        if (childIndex != parentNode.numChildren - 1)
            return;
        //TLog.Debug("DramaTipsFrame.onClickTips")
        if (this.curIndex < this.content.length - 1) {
            this.curIndex = this.curIndex + 1;
            this.refreshFrame();
        }
        else {
            this.hideWnd();
        }
    };
    DramaTipsFrame.prototype.fightEndShowFrame = function (args) {
        //TLog.Debug("DramaTipsFrame.fightEndShowFrame",args.stateType) 
        if (args.stateType == state_type.COMBAT_BASE_STATE) {
            if (this.guideType > 0) {
                this.mLayoutNode.setDoModal(true, this.guideType);
            }
            this.mLayoutNode.visible = (true);
            this.refreshFrame();
        }
    };
    DramaTipsFrame.prototype.fightHideFrame = function (args) {
        if (args.stateType == state_type.COMBAT_BASE_STATE || args.stateType == state_type.LIVE_STORY_STATE) {
            this.mLayoutNode.visible = (false);
            if (this.guideType > 0) {
                this.mLayoutNode.setDoModal(false, this.guideType);
            }
        }
    };
    return DramaTipsFrame;
}(BaseWnd));
__reflect(DramaTipsFrame.prototype, "DramaTipsFrame");
//# sourceMappingURL=DramaTipsFrame.js.map