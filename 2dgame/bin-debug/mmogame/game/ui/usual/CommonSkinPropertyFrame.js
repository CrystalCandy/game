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
var CommonSkinPropertyFrame = (function (_super) {
    __extends(CommonSkinPropertyFrame, _super);
    function CommonSkinPropertyFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonSkinPropertyFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/usual/CommonSkinPropertyLayout.exml"];
    };
    CommonSkinPropertyFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        UiUtil.setFrameSize(this.mLayoutNode, 520, 700, 20, 85);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_back", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["rd_1"].setAlignFlag(gui.Flag.CENTER_CENTER);
        var _a, _b;
    };
    CommonSkinPropertyFrame.prototype.onUnLoad = function () {
        if (this.Player) {
            var actorview = this.mElemList["actor_view"];
            this.Player.leaveViewer(actorview);
            this.Player.deleteObj();
            this.Player = null;
        }
    };
    CommonSkinPropertyFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.mElemList["label_wndName"].text = this.name;
        this.refreshForceNum(this.zhanLi);
        AddRdContent(this.mElemList["rd_1"], this.str, "ht_24_cc", "ublack");
        if (!this.Player) {
            this.Player = Player.newObj();
        }
        this.onRefreshActor(this.id);
    };
    CommonSkinPropertyFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    CommonSkinPropertyFrame.prototype.refreshForceNum = function (force) {
        this.mElemList["bImage"].beginDraw();
        this.mElemList["bImage"].drawNumberString("zhanLi_", "z" + force, 0, 0, -3);
        this.mElemList["bImage"].endDraw();
    };
    CommonSkinPropertyFrame.prototype.onRefreshActor = function (id) {
        var actorview = this.mElemList["actor_view"];
        var actor = this.Player;
        var modelId = id;
        actor.loadModel(modelId);
        actor.changeAction("idle", 1.0, true);
        actor.setPositionXY(0, 0);
        actor.enterViewer(actorview);
        //缩放
        actor.setScale(1.0);
        //方向
        actor.setDir(1);
    };
    CommonSkinPropertyFrame.prototype.onShowWnd = function (zhanLi, name, str, id) {
        this.zhanLi = zhanLi;
        this.name = name;
        this.str = str;
        this.id = id;
        this.showWnd();
    };
    return CommonSkinPropertyFrame;
}(BaseWnd));
__reflect(CommonSkinPropertyFrame.prototype, "CommonSkinPropertyFrame");
//# sourceMappingURL=CommonSkinPropertyFrame.js.map