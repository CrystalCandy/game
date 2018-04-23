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
var ClubEventRecordFrame = (function (_super) {
    __extends(ClubEventRecordFrame, _super);
    function ClubEventRecordFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClubEventRecordFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/club/ClubEventRecordLayout.exml"];
    };
    ClubEventRecordFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 15, 15, 490, 590, this.mElemList["scroll_wnd"]);
        var _a, _b;
    };
    ClubEventRecordFrame.prototype.onUnLoad = function () {
    };
    ClubEventRecordFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.CLUB_EVENT_RECORD, this.refreshFrame, this);
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        RpcProxy.call("C2G_FactionRecord");
        this.refreshFrame();
    };
    ClubEventRecordFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.CLUB_EVENT_RECORD, this.refreshFrame, this);
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    ClubEventRecordFrame.prototype.refreshFrame = function () {
        var recordInfo = ClubSystem.getInstance().getClubEventInfo();
        if (!recordInfo) {
            return;
        }
        this.scroll.clearItemList();
        for (var i in recordInfo) {
            var record = recordInfo[i];
            var window_1 = this.scroll.getItemWindow(tonumber(i), 490, 70, 0, 0, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, record);
        }
    };
    ClubEventRecordFrame.prototype.initItemWindow = function (window) {
        var name = window.name;
        var Info = [
            (_a = {}, _a["index_type"] = gui.RichDisplayer, _a["name"] = "rd_" + name, _a["title"] = null, _a["x"] = 10, _a["y"] = 0, _a["w"] = 470, _a["h"] = 70, _a["messageFlag"] = true, _a),
            (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = "line_" + name, _b["title"] = null, _b["image"] = "cz_uiLine01", _b["x"] = 0, _b["y"] = 54, _b["w"] = 490, _b["h"] = 16, _b["messageFlag"] = true, _b),
        ];
        UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window);
        var _a, _b;
    };
    ClubEventRecordFrame.prototype.refreshItemWindow = function (window, record) {
        var name = window.name;
        var time = record[0];
        var id = record[1];
        var rname = record[2];
        var type = record[3];
        var param = record[4];
        var str = "";
        str = getFormatTime(time) + "#space_10" + getFormatTimeSec(time) + "#br";
        var des = GameConfig.FactionRecordConfig[type].des;
        if (type == opFacRecord.LevelUP) {
            str = str + String.format(des, param);
        }
        else if (type == opFacRecord.Appoinit) {
            var pos = opOfficeToStr[param];
            str = str + String.format(des, rname, Localize_cns(pos));
        }
        else {
            str = str + String.format(des, rname);
        }
        AddRdContent(this.mElemList["rd_" + name], str, "ht_24_cc", "ublack", 3);
    };
    return ClubEventRecordFrame;
}(BaseWnd));
__reflect(ClubEventRecordFrame.prototype, "ClubEventRecordFrame");
//# sourceMappingURL=ClubEventRecordFrame.js.map