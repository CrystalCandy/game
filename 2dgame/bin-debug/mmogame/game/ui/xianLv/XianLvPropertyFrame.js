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
var XianLvPropertyFrame = (function (_super) {
    __extends(XianLvPropertyFrame, _super);
    function XianLvPropertyFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XianLvPropertyFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/xianlv/XianLvPropertyLayout.exml"];
    };
    XianLvPropertyFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        UiUtil.setFrameSize(this.mLayoutNode, 520, 700, 20, 85);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_back", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["rd_1"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["rd_2"].setAlignFlag(gui.Flag.CENTER_TOP);
        var _a, _b;
    };
    XianLvPropertyFrame.prototype.onUnLoad = function () {
        if (this.Player) {
            var actorview = this.mElemList["actor_view"];
            this.Player.leaveViewer(actorview);
            this.Player.deleteObj();
            this.Player = null;
        }
    };
    XianLvPropertyFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.mElemList["label_wndName"].text = Localize_cns("XIANLV_TXT8");
        //	AddRdContent(this.mElemList["rd_1"],this.str,"ht_24_cc","ublack") 
        this.onRefresh();
    };
    XianLvPropertyFrame.prototype.onRefresh = function () {
        var totalList = GetSumXianLvProperty();
        var att = totalList["demage"] || 0;
        var hp = totalList["maxhp"] || 0;
        var def = totalList["hujia"] || 0;
        var str1 = String.format(Localize_cns("ROLE_MOUNT_DAN_TXT2"), hp, att, def);
        AddRdContent(this.mElemList["rd_1"], str1, "ht_24_cc", "black");
        var str2 = String.format(Localize_cns("ROLE_MOUNT_DAN_TXT2"), 0, 0, 0);
        var qiyuan = XianLvSystem.getInstance().getQiYuanProperty();
        if (qiyuan.length == 0) {
            qiyuan = [0, 0];
        }
        var qiyuanStr = String.format(Localize_cns("XIANLV_PROPERTY_TXT1"), qiyuan[0], qiyuan[1]);
        str2 += "#br#rf" + qiyuanStr;
        AddRdContent(this.mElemList["rd_2"], str2, "ht_24_cc", "black");
        //战力
        var force = XianLvSystem.getInstance().getTotalForce();
        DrawNumberStringImage(this.mElemList["bImage"], "zhanLi_", "z" + force, 0, 0, -3);
        if (this.Player == null) {
            this.Player = Player.newObj();
        }
        this.onRefreshActor(this.id);
    };
    XianLvPropertyFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    XianLvPropertyFrame.prototype.onRefreshActor = function (id) {
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
        actor.setDir(3);
    };
    XianLvPropertyFrame.prototype.onShowWnd = function (id) {
        this.id = id;
        this.showWnd();
    };
    return XianLvPropertyFrame;
}(BaseWnd));
__reflect(XianLvPropertyFrame.prototype, "XianLvPropertyFrame");
//# sourceMappingURL=XianLvPropertyFrame.js.map