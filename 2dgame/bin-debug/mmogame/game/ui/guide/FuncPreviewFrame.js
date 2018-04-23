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
var FuncPreviewFrame = (function (_super) {
    __extends(FuncPreviewFrame, _super);
    function FuncPreviewFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FuncPreviewFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/FuncPreviewLayout.exml"];
    };
    FuncPreviewFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        //this.setFullScreen(true)
        var mElemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_back", _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "confirm_btn", _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.hideWnd, _c),
        ];
        UiUtil.initElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        for (var i = 0; i < 3; i++) {
            this.mElemList["itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, "itemBox" + i, 140 + 100 * i, 525);
        }
        this.mElemList["mon_veiw"] = UIActorView.newObj(this.mLayoutNode, "mon_veiw", 60, 90, this.mElemList["mon_group"]);
        //this.mElemList["mon_veiw"].updateByPlayer(20001)
        this.mElemList["open_gain_rd"].setAlignFlag(gui.Flag.RIGHT);
        AddRdContent(this.mElemList["open_gain_rd"], Localize_cns("BOSS_TXT28"), "ht_24_cc", "ublack");
        AddRdContent(this.mElemList["open_con_rd"], Localize_cns("BOSS_TXT28"), "ht_24_cc", "ublack");
        this.mElemList["label_wndName"].text = Localize_cns("GUIDE_TXT9");
        var _a, _b, _c;
    };
    FuncPreviewFrame.prototype.onUnLoad = function () {
    };
    FuncPreviewFrame.prototype.onShow = function () {
        //RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (true);
        this.refreshFrame();
    };
    FuncPreviewFrame.prototype.onHide = function () {
        //UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (false);
    };
    FuncPreviewFrame.prototype.refreshFrame = function () {
        if (!this.funcIndex) {
            return;
        }
        var config = GameConfig.FuncPreviewConfig[this.funcIndex];
        if (!config) {
            return;
        }
        var actorElem = this.mElemList["mon_veiw"];
        actorElem.clearView();
        var modelID = config.monModelId;
        this.mElemList["mon_anim_box"].visible = false;
        if (modelID) {
            var modelType = "";
            var modelShape = "";
            if (config.shape && size_t(config.shape) > 0) {
                modelType = config.shape[0][0];
                modelShape = config.shape[0][1];
            }
            actorElem.setActorScale(config.scale);
            if (modelType == "role") {
                var playerInfo = GetHeroPropertyInfo();
                var modelList = {};
                modelList[modelShape] = modelID;
                actorElem.updateByPlayerSomeInfo(playerInfo, modelList);
            }
            else {
                actorElem.updateByPlayer(modelID);
            }
        }
        else {
            actorElem.clearView();
            this.mElemList["mon_anim_box"].setAnimName(config.effect);
            this.mElemList["mon_anim_box"].visible = true;
        }
        this.mElemList["func_name"].text = config.name;
        AddRdContent(this.mElemList["open_con_rd"], Localize_cns("GUIDE_TXT10") + "#red" + config.conditionDes, "ht_24_cc", "ublack");
        AddRdContent(this.mElemList["open_gain_rd"], config.prizeDes, "ht_24_cc", "ublack");
        var list = AnalyPrizeFormat(config.showItem);
        for (var i = 0; i < 3; i++) {
            var v = list[i];
            if (v) {
                this.mElemList["itemBox" + i].setVisible(true);
                this.mElemList["itemBox" + i].updateByEntry(v[0], v[1]);
            }
            else {
                this.mElemList["itemBox" + i].setVisible(false);
            }
        }
    };
    //////////////////////////////////////////
    /////////////////////////////////////////////公共接口//////////////////////////////
    FuncPreviewFrame.prototype.showFuncPreviewFrame = function (funcIndex) {
        this.funcIndex = funcIndex;
        this.showWnd();
    };
    return FuncPreviewFrame;
}(BaseWnd));
__reflect(FuncPreviewFrame.prototype, "FuncPreviewFrame");
//# sourceMappingURL=FuncPreviewFrame.js.map