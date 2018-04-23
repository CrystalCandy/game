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
var EscortFrame = (function (_super) {
    __extends(EscortFrame, _super);
    function EscortFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EscortFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/xiyouhusong/EscortLayout.exml"];
        this.isIn = false;
        this.select = -1;
        this.oldList = [];
        this.windowList = [];
    };
    EscortFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_escort", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onEscortClick, _c),
            (_d = {}, _d["name"] = "btn_intercept", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onInterceptClick, _d),
            (_e = {}, _e["name"] = "image_kuang", _e["messageFlag"] = true, _e),
            (_f = {}, _f["name"] = "btn_left", _f["title"] = null, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onLeftClick, _f),
            (_g = {}, _g["name"] = "btn_right", _g["title"] = null, _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = this.onRightClick, _g),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["group_time"].visible = false;
        this.mElemList["rd_quickFinish"].setAlignFlag(gui.Flag.LEFT_BOTTOM);
        this.mElemList["rd_quickFinish"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuickClick, this);
        var _a, _b, _c, _d, _e, _f, _g;
    };
    EscortFrame.prototype.onUnLoad = function () {
    };
    EscortFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        //  this.mLayoutNode.setDoModal(true);
        this.onRefresh();
        RpcProxy.call("C2G_EnterEscortActivity");
    };
    EscortFrame.prototype.updateWnd = function () {
        this.onRefresh();
    };
    EscortFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        //this.mLayoutNode.setDoModal(false);
        //this.window.hideWnd()
        if (this.timer != null) {
            KillTimer(this.timer);
            this.timer = null;
        }
        for (var k in this.windowList) {
            if (this.windowList[k] != null) {
                this.windowList[k].setVisibleFalse();
            }
        }
    };
    EscortFrame.prototype.onRefresh = function () {
        var actInfo = GetActivity(ActivityDefine.HuSong).getActInfo();
        var list = GetActivity(ActivityDefine.HuSong).getHuSongList();
        if (size_t(actInfo) == 0)
            return;
        //if(size_t(list) == 0) return
        if (this.select == -1) {
            this.select = 0;
        }
        //rd_intercept  rd_escort
        var hadHusong = actInfo.husongTwice || 0;
        var hadLanjie = actInfo.lanjieTwice || 0;
        AddRdContent(this.mElemList["rd_escort"], Localize_cns("ESCORT_TXT1") + hadHusong + "/" + 3, "ht_20_cc");
        AddRdContent(this.mElemList["rd_intercept"], Localize_cns("ESCORT_TXT2") + hadLanjie + "/" + 5, "ht_20_cc");
        if (actInfo.time != 0 && actInfo.time - GetServerTime() < 0) {
            RpcProxy.call("C2G_GetEscortPrizeInfo");
            //RpcProxy.call("C2G_EnterEscortActivity")
            return;
        }
        if (actInfo.time != 0) {
            this.refreshTime = actInfo.time;
            this.isIn = true;
        }
        else if (actInfo.time == 0) {
            this.isIn = false;
            this.refreshTime = null;
        }
        if (this.isIn) {
            this.mElemList["btn_escort"].visible = false;
            this.mElemList["group_time"].visible = true;
            //rd_quickFinish
            var str = Localize_cns("ESCORT_TXT3");
            AddRdContent(this.mElemList["rd_quickFinish"], str, "ht_20_cc", "lime");
            //if(this.refreshTime - GetServerTime() == 0) return			
            if (this.timer == null) {
                this.timer = SetTimer(this.onRefreshTimer, this, 1000, true);
            }
            this.onRefreshTimer();
        }
        else {
            this.mElemList["btn_escort"].visible = true;
            this.mElemList["group_time"].visible = false;
        }
        this.mElemList["btn_left"].visible = false;
        this.mElemList["btn_right"].visible = false;
        if (size_t(list) == 0 /*|| size_t(list) == size_t(this.oldList)*/) {
            if (this.windowList[this.select] != null) {
                this.windowList[this.select].onShowAction(list);
            }
            return;
        }
        var showListArray = splitListByCount(list, 6);
        var count = size_t(showListArray);
        this.endIndex = count + 1;
        for (var k in showListArray) {
            if (this.windowList[k] == null) {
                this.windowList[k] = EscortActionBox.newObj(this.mLayoutNode, "escortWidnow" + k, 0, 0, this.mElemList["group_action"]);
            }
            if (size_t(this.oldList) == size_t(list)) {
                this.windowList[k].onShowAction(showListArray[k]);
            }
            else {
                this.windowList[k].onRefreshShow(showListArray[k]);
            }
            this.windowList[k].setVisible(false);
        }
        if (this.windowList[this.select] != null) {
            this.windowList[this.select].setVisible(true);
            //	this.windowList[this.select].rootWnd = true
            //	this.windowList[this.select].boxRun()
        }
        this.oldList = list;
    };
    //////////响应
    EscortFrame.prototype.onInterceptClick = function () {
        var wnd = WngMrg.getInstance().getWindow("InterceptRecordFrame");
        wnd.showWnd();
    };
    EscortFrame.prototype.onEscortClick = function () {
        var actInfo = GetActivity(ActivityDefine.HuSong).getActInfo();
        if (actInfo.husongTwice == 0) {
            MsgSystem.addTagTips(Localize_cns("ESCORT_TIPS_TXT7"));
            return;
        }
        var wnd = WngMrg.getInstance().getWindow("OdysseyEscortFrame");
        this.hideWnd();
        wnd.showWnd();
    };
    EscortFrame.prototype.onLeftClick = function () {
        if (this.select >= this.endIndex)
            return;
        this.select += 1;
        this.onRefresh();
    };
    EscortFrame.prototype.onRightClick = function () {
        if (this.select <= 1)
            return;
        this.select -= 1;
        this.onRefresh();
    };
    EscortFrame.prototype.onQuickClick = function () {
        var str1 = Localize_cns("ESCORT_TIPS_TXT6");
        var str2 = Localize_cns("ESCORT_TIPS_TXT2");
        var wnd = WngMrg.getInstance().getWindow("EscortTipsFrame");
        wnd.onShowWnd(str1, str2);
    };
    //-----------刷新Timer
    EscortFrame.prototype.onRefreshTimer = function () {
        var time = this.refreshTime;
        if (time == null)
            return;
        var nowtime = GetServerTime();
        var diffTime = time - nowtime;
        if (diffTime <= 0) {
            if (this.timer != null) {
                KillTimer(this.timer);
                this.timer = null;
            }
            RpcProxy.call("C2G_GetEscortPrizeInfo");
            RpcProxy.call("C2G_EnterEscortActivity");
        }
        var timeStr = getFormatDiffTimeSimple(diffTime);
        AddRdContent(this.mElemList["rd_time"], Localize_cns("ESCORT_TXT4") + timeStr, "ht_20_cc");
    };
    /////////////----------响应更新
    EscortFrame.prototype.onShowPrize = function () {
        var wnd = WngMrg.getInstance().getWindow("EscortPrizeFrame");
        wnd.showWnd();
    };
    return EscortFrame;
}(BaseWnd));
__reflect(EscortFrame.prototype, "EscortFrame");
//# sourceMappingURL=EscortFrame.js.map