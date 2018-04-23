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
var CommonFunPropertyFrame = (function (_super) {
    __extends(CommonFunPropertyFrame, _super);
    function CommonFunPropertyFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonFunPropertyFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/usual/CommonFunPropertyLayout.exml"];
    };
    CommonFunPropertyFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.mLayoutNode.width = 560;
        this.mLayoutNode.height = 720;
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close_top", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["rd_1"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["rd_2"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["rd_3"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["rd_4"].setAlignFlag(gui.Flag.CENTER_CENTER);
        var _a, _b;
    };
    CommonFunPropertyFrame.prototype.onUnLoad = function () {
        if (this.Player) {
            var actorview = this.mElemList["actor_view"];
            this.Player.leaveViewer(actorview);
            this.Player.deleteObj();
            this.Player = null;
        }
    };
    CommonFunPropertyFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.onRefresh();
    };
    CommonFunPropertyFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    CommonFunPropertyFrame.prototype.onRefresh = function () {
        var funInfo = FunSystem.getInstance().getFunInfoWithType(this.type);
        var force = funInfo.force;
        this.refreshForceNum(force);
        var skinList = (_a = {},
            _a[cellOptionsIndex.HeroRide] = 1,
            _a[cellOptionsIndex.HeroWing] = 1,
            _a[cellOptionsIndex.TianNv] = 1,
            _a[cellOptionsIndex.TianXian] = 1,
            _a[cellOptionsIndex.TianXianWeapon] = 1,
            _a);
        var configList = GetTemCellTotalProperty(this.type);
        //let strlist = []
        for (var k = 1; k <= size_t(configList); k++) {
            var tempConfig = configList[k - 1];
            var tempStr = "";
            for (var k_1 in tempConfig) {
                tempStr += GetPropertyName(lastAbilityNameToIdOptions[k_1]) + "#green" + tempConfig[k_1] + "#rf#space";
            }
            AddRdContent(this.mElemList["rd_" + k], tempStr, "ht_20_cc", "black");
        }
        if (!skinList[this.type]) {
            this.mElemList["group_property"].height = 228;
            this.mElemList["group_skin"].visible = false;
        }
        else {
            this.mElemList["group_property"].height = 304;
            this.mElemList["group_skin"].visible = true;
        }
        if (this.Player == null) {
            this.Player = Player.newObj();
        }
        var modelid = GameConfig.FunShapeConfig[cellOptionsName[this.type - 1]][this.select].Shape;
        this.onRefreshActor(modelid);
        var _a;
    };
    CommonFunPropertyFrame.prototype.onShowWnd = function (cellOptionsIndex, select) {
        //	this.used = used;
        this.type = cellOptionsIndex;
        this.select = select;
        this.showWnd();
    };
    CommonFunPropertyFrame.prototype.refreshForceNum = function (force) {
        this.mElemList["bImage"].beginDraw();
        this.mElemList["bImage"].drawNumberString("zhanLi_", "z" + force, 0, 0, -3);
        this.mElemList["bImage"].endDraw();
    };
    CommonFunPropertyFrame.prototype.onRefreshActor = function (id) {
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
    return CommonFunPropertyFrame;
}(BaseWnd));
__reflect(CommonFunPropertyFrame.prototype, "CommonFunPropertyFrame");
//# sourceMappingURL=CommonFunPropertyFrame.js.map