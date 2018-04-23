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
  lintianfeng
  
创建时间：
  2014.1.04(周六)

意图：


公共接口：

*/
var MovieDramaFrame = (function (_super) {
    __extends(MovieDramaFrame, _super);
    function MovieDramaFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MovieDramaFrame.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/MovieDramaLayout.exml"];
        this.npcModelId = 0;
        this.name = "";
        this.text = "";
        // RegisterEvent(EventDefine.STATE_ACTIVE, this.onStateActive, this)
        //RegisterEvent(EventDefine.MOVIE_BEGIN, this.onLoginStateWnd, this)
    };
    MovieDramaFrame.prototype.destory = function () {
        // UnRegisterEvent(EventDefine.STATE_ACTIVE, this.onStateActive, this)
        //UnRegisterEvent(EventDefine.MOVIE_BEGIN, this.onLoginStateWnd, this)
    };
    MovieDramaFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.initSkinElemList();
        this.mLayoutNode.left = 0;
        this.mLayoutNode.bottom = 0;
        //this.mLayoutNode.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkipClick, this)
        var elemInfo = [
            (_a = {}, _a["name"] = "rd_content", _a["title"] = null, _a["event_name"] = gui.RichDisplayer.RichDisplayerTranslateEvent, _a["fun_index"] = this.onDialogTranslateWord, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.actorView = UIActorView.newObj(this.mLayoutNode, "actorView", 0, 0, this.mElemList["group_actorview"]);
        this.actorView.setActorScale(1.2);
        var _a;
    };
    MovieDramaFrame.prototype.onLoginStateWnd = function (args) {
        this.showWnd();
    };
    MovieDramaFrame.prototype.onUnLoad = function () {
    };
    MovieDramaFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = (true);
        this.setBottomWindowVisible(false);
        RegisterEvent(EventDefine.MOVIE_END, this.hideWnd, this);
        RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onSkipClick, this);
    };
    MovieDramaFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onSkipClick, this);
        this.mLayoutNode.visible = (false);
        //this.mLayoutNode.setDoModal(false)
        //this.skipFrame.visible = (false)
        this.npcModelId = 0;
        this.name = "";
        this.text = "";
        UnRegisterEvent(EventDefine.MOVIE_END, this.hideWnd, this);
        this.actorView.clearView();
        // if (this.actorInfo) {
        // 	this.actorInfo.player.leaveViewer(this.actorInfo.window)
        // 	this.actorInfo.player.deleteObj()
        // 	this.actorInfo = null
        // }
    };
    MovieDramaFrame.prototype.onDialogTranslateWord = function (args) {
        var word = args.getTranslateWord();
        args.setTranslateWord(TaskExecutor.getInstance().executeGetReplaceWord(word, 0));
    };
    MovieDramaFrame.prototype.changeModel = function (npcModelId, dir) {
        if (npcModelId == 0) {
            this.mElemList["group_actorview"].visible = (false);
            this.mElemList["rd_content"].clear();
            return;
        }
        this.mElemList["group_actorview"].visible = (true);
        if (dir == 0) {
            this.mLayoutNode.currentState = "my";
            var player = this.actorView.updateByPlayer(npcModelId);
            player.setDir(ActorDirMap.Left);
        }
        else {
            var player = this.actorView.updateByPlayer(npcModelId);
            player.setDir(ActorDirMap.Right);
            this.mLayoutNode.currentState = "other";
        }
        var rd = this.mElemList["rd_content"];
        AddRdContent(rd, this.text, "ht_24_cc", "black", 2);
        // let rd: gui.RichDisplayer = this.mElemList["rd_content"]
        // AddRdContent(rd, content, "ht_30_cc", "black", 5)
        // //调整字体大小
        // let h = rd.getLogicHeight()
        // if (h > rd.height) {
        // 	AddRdContent(rd, content, "ht_24_cc", "black", 2)
        // }
        var h = rd.getLogicHeight();
        if (h > rd.height) {
            AddRdContent(rd, this.text, "ht_20_cc", "black", 2);
        }
    };
    MovieDramaFrame.prototype.setContent = function (name, text) {
        this.name = name;
        this.text = text;
    };
    MovieDramaFrame.prototype.showSpeaking = function (name, text, npcModelId, dir, hideBust) {
        this.name = name;
        this.text = text;
        this.showWnd();
        this.doCommand("showDialog");
        this.doCommand("changeModel", npcModelId, dir);
    };
    MovieDramaFrame.prototype.setBottomWindowVisible = function (visible) {
        if (this.isLoadComplete() == false)
            return;
        //TLog.Debug("setBottomWindowVisible",visible)	
        this.mElemList["group_root"].visible = (visible);
        // this.mElemList["bustWindow"].visible = (visible)
        // this.mElemList["bottomWindow"].visible = (visible)
    };
    MovieDramaFrame.prototype.onSkipClick = function (args) {
        if (this.mElemList["group_root"].visible == false)
            return;
        //MovieSystem.getInstance().skipMovie()
        MovieSystem.getInstance().skipNextElem();
    };
    MovieDramaFrame.prototype.hideDialog = function () {
        if (this.isLoadComplete() == false)
            return;
        this.showSpeaking("", "", 0);
        this.setBottomWindowVisible(false);
    };
    MovieDramaFrame.prototype.showDialog = function () {
        this.setBottomWindowVisible(true);
    };
    return MovieDramaFrame;
}(BaseWnd));
__reflect(MovieDramaFrame.prototype, "MovieDramaFrame");
//# sourceMappingURL=MovieDramaFrame.js.map