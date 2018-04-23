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
/*
作者:
panjunhua

创建时间：
2014.11.4(周二)

意图：


公共接口：

*/
var FastEndMoiveFrame = (function (_super) {
    __extends(FastEndMoiveFrame, _super);
    function FastEndMoiveFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FastEndMoiveFrame.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        RegisterEvent(EventDefine.STATE_ACTIVE, this.onStateActive, this);
        RegisterEvent(EventDefine.MOVIE_BEGIN, this.onLoginStateWnd, this);
    };
    FastEndMoiveFrame.prototype.destory = function () {
        UnRegisterEvent(EventDefine.STATE_ACTIVE, this.onStateActive, this);
        UnRegisterEvent(EventDefine.MOVIE_BEGIN, this.onLoginStateWnd, this);
    };
    FastEndMoiveFrame.prototype.onLoad = function () {
        this.create_frame();
    };
    FastEndMoiveFrame.prototype.onUnLoad = function () {
    };
    FastEndMoiveFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = (true);
        RegisterEvent(EventDefine.MOVIE_END, this.onStateDeActive, this);
        //TLog.Debug("FastEndMoiveFrame.onShow")
    };
    FastEndMoiveFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = (false);
        UnRegisterEvent(EventDefine.MOVIE_END, this.onStateDeActive, this);
    };
    FastEndMoiveFrame.prototype.create_frame = function () {
        var width = 158, height = 100;
        UiUtil.setWH(this.mLayoutNode, 158, 100);
        this.mLayoutNode.top = 10;
        this.mLayoutNode.right = 0;
        this.mElemList = {};
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.Button, _a["name"] = "fastEnd", _a["image"] = "ty_skipAnNiu", _a["title"] = "", _a["font"] = "ht_18_cc", _a["color"] = gui.Color.white, _a["right"] = 0, _a["y"] = 0, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onClickFastEnd, _a),
            (_b = {}, _b["index_type"] = gui.AnimBox, _b["name"] = "autoAnim", _b["parent"] = "fastEnd", _b["x"] = -10, _b["y"] = -15, _b["w"] = 115, _b["h"] = 70, _b["messageFlag"] = true, _b),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["autoAnim"].setAnimName("xinShouKuang");
        this.mLayoutNode.setLayer(3 /* Top */);
        var _a, _b;
        //this.mElemList["fastText"]:SetHandleMessageFlag(true)
        //ui_util.CreateDrawRectPtr(this.mLayoutNode, gui.Color32Half.green)
    };
    FastEndMoiveFrame.prototype.onClickFastEnd = function (args) {
        MovieSystem.getInstance().fastEnd();
    };
    FastEndMoiveFrame.prototype.onStateDeActive = function (args) {
        //TLog.Debug("FastEndMoiveFrame.onStateDeActive")
        this.hideWnd();
    };
    FastEndMoiveFrame.prototype.onStateActive = function (args) {
        if (GAME_MODE != GAME_NORMAL) {
            return;
        }
        var _a = MovieSystem.getInstance().isPlayingMovie(), isMovie = _a[0], movieName = _a[1];
        //TLog.Debug("FastEndMoiveFrame.onStateActive",args.stateType,movieName)
        if (args.stateType == state_type.COMBAT_STORY_STATE) {
            this.hideWnd();
        }
        else if ((isMovie && args.stateType == state_type.COMBAT_BASE_STATE) || args.stateType == state_type.LIVE_STORY_STATE) {
            //this.showWnd()
            //TLog.Debug("11")
            //TLog.Debug("get record",Config.getInstance().getRoleSetting("int",movieName,0))
            if ((!movieName) || (!isMovie)) {
                this.hideWnd();
                return;
            }
            if (IGlobal.setting.getRoleSetting(UserSetting.TYPE_NUMBER, movieName, 0) == 0 && movieName != START_MOVIE_NAME) {
                this.hideWnd();
            }
            else {
                this.showWnd();
            }
        }
    };
    FastEndMoiveFrame.prototype.onLoginStateWnd = function (args) {
        //TLog.Debug("FastEndMoiveFrame.onLoginStateWnd")
        if (GAME_MODE != GAME_NORMAL) {
            return;
        }
        this.showWnd();
    };
    return FastEndMoiveFrame;
}(BaseWnd));
__reflect(FastEndMoiveFrame.prototype, "FastEndMoiveFrame");
//# sourceMappingURL=FastEndMoiveFrame.js.map