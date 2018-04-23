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
var XianLvAttributeFrame = (function (_super) {
    __extends(XianLvAttributeFrame, _super);
    function XianLvAttributeFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XianLvAttributeFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/xianlv/XianLvAttributeLayout.exml"];
    };
    XianLvAttributeFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_back", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["rd_name"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["rd_add"].setAlignFlag(gui.Flag.CENTER_CENTER);
        var _a, _b;
    };
    XianLvAttributeFrame.prototype.onUnLoad = function () {
        if (this.Player) {
            var actorview = this.mElemList["actor_view"];
            this.Player.leaveViewer(actorview);
            this.Player.deleteObj();
            this.Player = null;
        }
    };
    XianLvAttributeFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.onRefresh();
    };
    XianLvAttributeFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
    };
    XianLvAttributeFrame.prototype.onRefresh = function () {
        //名字星级
        var num = 1;
        var stage = 1;
        var step = 0;
        var stageexp = 0;
        if (XianLvSystem.getInstance().isExit(this.selectId)) {
            stage = XianLvSystem.getInstance().getLevel(this.selectId);
            num = XianLvSystem.getInstance().getStar(this.selectId);
            stageexp = XianLvSystem.getInstance().getExpById(this.selectId);
        }
        this.onRefreshStar(num);
        var name = GameConfig.ActorXianLvConfig[this.selectId].name;
        var quality = GameConfig.ActorXianLvConfig[this.selectId].quality;
        var nameColor = GetQualityColorStr(quality);
        this.mElemList["label_wndName"].text = name;
        // name += "#" + nameColor + name
        AddRdContent(this.mElemList["rd_name"], name, "ht_24_cc_stroke", nameColor);
        //加成属性
        var attrlist = GetXianLvProperty(this.selectId);
        var att = attrlist["demage"];
        var hp = attrlist["maxhp"];
        var def = attrlist["hujia"];
        var addStr = String.format(Localize_cns("ROLE_MOUNT_DAN_TXT2"), hp, att, def);
        AddRdContent(this.mElemList["rd_add"], addStr, "ht_24_cc", "ublack");
        //更新战力
        var force = GetForceMath(attrlist);
        DrawNumberStringImage(this.mElemList["bImage"], "zhanLi_", "z" + force, 0, 0, -3);
        //actor
        if (this.Player == null) {
            this.Player = Player.newObj();
        }
        this.onRefreshActor(this.selectId);
    };
    XianLvAttributeFrame.prototype.onRefreshActor = function (id) {
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
    XianLvAttributeFrame.prototype.onRefreshStar = function (num) {
        for (var i = 1; i <= 7; i++) {
            if (!this.mElemList["star_" + i]) {
                var info = [
                    (_a = {}, _a["index_type"] = eui.Image, _a["name"] = "star_" + i, _a["image"] = "ty_starDi01", _a["x"] = 0, _a["y"] = 0, _a["w"] = 0, _a["h"] = 0, _a["messageFlag"] = true, _a),
                ];
                UiUtil.createElem(info, this.mLayoutNode, this.mElemList, this, this.mElemList["sx_star_wnd"]);
            }
        }
        for (var i = 1; i <= num; i++) {
            this.mElemList["star_" + i].source = "ty_star01";
        }
        if (num < 7) {
            for (var i = num + 1; i <= 7; i++) {
                this.mElemList["star_" + i].source = "ty_starDi01";
            }
        }
        var _a;
    };
    XianLvAttributeFrame.prototype.onShowWnd = function (id) {
        this.selectId = id;
        this.showWnd();
    };
    return XianLvAttributeFrame;
}(BaseWnd));
__reflect(XianLvAttributeFrame.prototype, "XianLvAttributeFrame");
//# sourceMappingURL=XianLvAttributeFrame.js.map