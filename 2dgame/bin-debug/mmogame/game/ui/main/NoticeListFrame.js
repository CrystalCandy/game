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
var NoticeListFrame = (function (_super) {
    __extends(NoticeListFrame, _super);
    function NoticeListFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoticeListFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/NoticeListLayout.exml"];
        this.bEnterGameShow = false;
        this.readStateList = {};
        this.dataList = [];
        //this.CREATED_COUNT = 0
        this.indexToTitle = {};
        this.indexToId = {};
        RegisterEvent(EventDefine.HERO_ENTER_GAME, this.onHeroEnterGame, this);
    };
    NoticeListFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.mLayoutNode.setDoModal(true);
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "title", _a["font"] = "ht_30_cc_stroke", _a["color"] = gui.Color.white, _a),
            (_b = {}, _b["name"] = "btn_close", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_close_top", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.hideWnd, _c),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var name = "scroll";
        var group = this.mElemList["scroll_bg"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, name, 0, 0, 560, 535, group);
        var _a, _b, _c;
    };
    NoticeListFrame.prototype.onUnLoad = function () {
        this.mLayoutNode.setDoModal(false);
    };
    NoticeListFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.refreshFrame();
    };
    NoticeListFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
    };
    NoticeListFrame.prototype.onHeroEnterGame = function (args) {
        this.readStateList = {};
        if (IsCrossServer()) {
            return;
        }
        this.bEnterGameShow = true;
        this.onCheckPublicNotice();
    };
    NoticeListFrame.prototype.onCheckPublicNotice = function () {
        var qd_key = SdkHelper.getInstance().getStringConfigDef("QD_Key");
        var urlMap = {};
        var http_url = urlMap[qd_key] || "";
        if (http_url == "") {
            http_url = SdkHelper.getInstance().getStringConfigDef("PublicNoticeUrl");
        }
        if (http_url == "") {
            return;
        }
        var serverinfo = LoginSystem.getInstance().getRecentLoginServerInfo();
        if (serverinfo == null) {
            return;
        }
        var zoneId = serverinfo.ServerID;
        var allUrl = http_url + "?platform=" + qd_key + "&zoneid=" + zoneId;
        TLog.Debug(allUrl);
        IGlobal.httpClient.send(allUrl, this, 200);
        if (!this.bEnterGameShow) {
            FireEvent(EventDefine.MSG_WAIT_BEGIN, null);
        }
    };
    NoticeListFrame.prototype.refreshFrame = function () {
        var dataList = this.dataList; //{1,2,12,58,89,85,62,63,52}
        var curCount = size_t(dataList);
        //let num = curCount
        //curCount = (curCount > this.CREATED_COUNT) ? curCount : this.CREATED_COUNT
        this.indexToTitle = {};
        this.indexToId = {};
        var scroll = this.scroll;
        scroll.clearItemList();
        //取已创建的和需求之间的最大值去刷新
        for (var k = 0; k < curCount; k++) {
            var v = dataList[k];
            var window_1 = scroll.getItemWindow(k, 560, 110, 0, 0);
            this.initItemWindow(window_1);
            //this.CREATED_COUNT = this.CREATED_COUNT + 1
            this.refreshItemWindow(window_1, v, k);
        }
        scroll.refreshScroll();
    };
    NoticeListFrame.prototype.initItemWindow = function (window) {
        var name = window.name;
        var Info = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = name + "_bg", _a["image"] = "ty_UIDi08", _a["x"] = 0, _a["y"] = 0, _a["w"] = 560, _a["h"] = 110, _a["event_name"] = gui.TouchEvent.TOUCH_SHORT, _a["fun_index"] = this.onDetail, _a),
            (_b = {}, _b["index_type"] = eui.Label, _b["name"] = name + "_noticeTitle", _b["title"] = "", _b["font"] = "ht_24_cc", _b["color"] = gui.Color.maroon, _b["x"] = 0, _b["y"] = 40, _b["w"] = 560, _b["h"] = 30, _b["messageFlag"] = true, _b),
        ];
        UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window);
        var _a, _b;
    };
    NoticeListFrame.prototype.refreshItemWindow = function (window, data, index) {
        var name = window.name;
        this.mElemList[name + "_noticeTitle"].text = (data[2] || "");
        if (data[1] == 1) {
            //重要
        }
        else if (data[1] == 0) {
            //不重要
        }
        var id = data[0];
        if (this.readStateList[id] == null) {
            //未读
        }
        else {
            //已读
        }
        this.indexToTitle[name + "_bg"] = data[2];
        this.indexToId[name + "_bg"] = data[0];
    };
    NoticeListFrame.prototype.onDetail = function (args) {
        var name = args.target.name;
        var id = this.indexToId[name];
        var title = this.indexToTitle[name];
        var obj = {};
        var self = this;
        obj.onHttpResponse = function (url, data, userData) {
            //解析返回数据
            var jsonInfo = JsUtil.JsonDecodeSafeFormat(data);
            FireEvent(EventDefine.MSG_WAIT_END, null);
            var wnd = WngMrg.getInstance().getWindow("NoticeDetailFrame");
            var txt = jsonInfo.txt;
            var jsurl = jsonInfo.url;
            wnd.showWithTitle(title, txt, jsurl);
            if (!self.readStateList[id]) {
                self.readStateList[id] = true;
                //已读
            }
        };
        obj.onHttpError = function (url, userData) {
            FireEvent(EventDefine.MSG_WAIT_END, null);
        };
        var qd_key = SdkHelper.getInstance().getStringConfigDef("QD_Key");
        var urlMap = {};
        var http_url = urlMap[qd_key] || "";
        if (http_url == "") {
            http_url = SdkHelper.getInstance().getStringConfigDef("PublicNoticeContentUrl");
        }
        if (http_url == "") {
            return;
        }
        var allUrl = http_url + "?platform=" + qd_key + "&id=" + id + "&geturl=1";
        IGlobal.httpClient.send(allUrl, obj, 203);
        FireEvent(EventDefine.MSG_WAIT_BEGIN, null);
    };
    /////////////////////////////////////////////////////////////////////////////////
    NoticeListFrame.prototype.onHttpResponse = function (url, data, userData) {
        //解析返回数据
        FireEvent(EventDefine.MSG_WAIT_END, null);
        var jsonContent = JsUtil.JsonDecode(data);
        this.dataList = jsonContent;
        var guideFinished = true;
        if (GuideSystem.getInstance().isCanClientAutoUI() == false) {
            guideFinished = false;
        }
        //H5屏蔽自动打开公告
        guideFinished = false;
        if (size_t(this.dataList) > 0 && this.bEnterGameShow && guideFinished) {
            if (!this.isVisible()) {
                this.showWnd();
            }
            else {
                this.refreshFrame();
            }
        }
        else {
            if (this.isVisible()) {
                this.refreshFrame();
            }
        }
        this.bEnterGameShow = false;
    };
    NoticeListFrame.prototype.onHttpError = function (url, userData) {
        FireEvent(EventDefine.MSG_WAIT_END, null);
    };
    return NoticeListFrame;
}(BaseWnd));
__reflect(NoticeListFrame.prototype, "NoticeListFrame", ["core.IHttpCallback"]);
//# sourceMappingURL=NoticeListFrame.js.map