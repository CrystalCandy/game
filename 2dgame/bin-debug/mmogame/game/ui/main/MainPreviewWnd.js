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
var MainPreviewWnd = (function (_super) {
    __extends(MainPreviewWnd, _super);
    function MainPreviewWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainPreviewWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.controlDataList = {};
    };
    MainPreviewWnd.prototype.onLoad = function () {
        this.createFrame();
    };
    MainPreviewWnd.prototype.onUnLoad = function () {
    };
    MainPreviewWnd.prototype.onShow = function () {
        RegisterEvent(EventDefine.GUIDE_FUNC_LIST_UPDATE, this.refreshFrame, this);
        //this.requestMeiri = false;
        this.mElemList["preview_wnd"].visible = true;
        this.refreshFrame();
    };
    MainPreviewWnd.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.GUIDE_FUNC_LIST_UPDATE, this.refreshFrame, this);
        this.mElemList["preview_wnd"].visible = false;
    };
    MainPreviewWnd.prototype.refreshFrame = function () {
        this.controlDataList = {};
        var list = [];
        for (var _ in GameConfig.FuncPreviewConfig) {
            var v = GameConfig.FuncPreviewConfig[_];
            table_insert(list, v);
        }
        table_sort(list, function (a, b) { return a.funcIndex - b.funcIndex; });
        var flag = false;
        var config = null;
        for (var i = 0; i < list.length; i++) {
            var v = list[i];
            if (GuideSystem.getInstance().isFuncOpen(v.funcName, true) == false) {
                flag = true;
                config = v;
                break;
            }
        }
        if (flag == false) {
            this.mElemList["preview_wnd"].visible = false;
        }
        else {
            this.mElemList["preview_wnd"].visible = true;
            this.mElemList["preview_name"].text = config.name;
            var actorElem = this.mElemList["preview_view"];
            actorElem.clearView();
            var modelID = config.monModelId;
            this.mElemList["preview_anim_box"].visible = false;
            if (modelID) {
                var modelType = "";
                var modelShape = "";
                if (config.shape && size_t(config.shape) > 0) {
                    modelType = config.shape[0][0];
                    modelShape = config.shape[0][1];
                }
                actorElem.setActorScale(config.scale);
                actorElem.setXY(config.pos[0][0] || 0, config.pos[0][1] || 0);
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
                this.mElemList["preview_anim_box"].setAnimName(config.effect);
                this.mElemList["preview_anim_box"].visible = true;
            }
            AddRdContent(this.mElemList["open_level"], config.conditionDes, "ht_18_cc_stroke", "white");
            this.controlDataList["preview_btn"] = config.funcName;
        }
    };
    MainPreviewWnd.prototype.createFrame = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "preview_anim_box", _a["messageFlag"] = true, _a),
            (_b = {}, _b["name"] = "preview_view_group", _b["messageFlag"] = true, _b),
            (_c = {}, _c["name"] = "open_level", _c["messageFlag"] = true, _c),
            (_d = {}, _d["name"] = "preview_name_pic", _d["messageFlag"] = true, _d),
            (_e = {}, _e["name"] = "preview_name", _e["messageFlag"] = true, _e),
            (_f = {}, _f["name"] = "preview_view_group", _f["messageFlag"] = true, _f),
            (_g = {}, _g["name"] = "preview_btn", _g["title"] = null, _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = this.onClickPreview, _g),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["preview_view"] = UIActorView.newObj(this.mLayoutNode, "preview_view", 0, 0, this.mElemList["preview_view_group"]);
        //this.mElemList["preview_view"].updateByPlayer(20001)
        this.mElemList["open_level"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["preview_anim_box"].visible = false;
        var _a, _b, _c, _d, _e, _f, _g;
    };
    //////////////////////////////////////////////////
    MainPreviewWnd.prototype.onClickPreview = function (args) {
        var name = args.target.name;
        if (!this.controlDataList[name]) {
            return;
        }
        var funcIndex = this.controlDataList[name];
        var wnd = WngMrg.getInstance().getWindow("FuncPreviewFrame");
        wnd.showFuncPreviewFrame(funcIndex);
    };
    return MainPreviewWnd;
}(BaseCtrlWnd));
__reflect(MainPreviewWnd.prototype, "MainPreviewWnd");
//# sourceMappingURL=MainPreviewWnd.js.map