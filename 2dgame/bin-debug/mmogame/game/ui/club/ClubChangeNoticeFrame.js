// TypeScript file
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
var ClubChangeNoticeFrame = (function (_super) {
    __extends(ClubChangeNoticeFrame, _super);
    function ClubChangeNoticeFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // subWndList:any;
    // tabIndex:string;
    // emptyView:UIEmptyView;
    //curNotice:any;
    ClubChangeNoticeFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/club/ClubChangeNoticeLayout.exml"];
    };
    ClubChangeNoticeFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.changeNoticeClick, _c),
            (_d = {}, _d["name"] = "edit_input", _d["font"] = "ht_22_cc", _d["color"] = gui.Color.saddlebrown, _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = null, _d),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var edit = this.mElemList["edit_input"];
        edit.text = "";
        edit.multiline = true;
        var _a, _b, _c, _d;
    };
    ClubChangeNoticeFrame.prototype.onUnLoad = function () {
    };
    ClubChangeNoticeFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.UPDATE_CLUB_NOTICE, this.refreshnoticeText, this);
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.refreshFrame();
    };
    ClubChangeNoticeFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.UPDATE_CLUB_NOTICE, this.refreshnoticeText, this);
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    ClubChangeNoticeFrame.prototype.refreshFrame = function () {
        var edit = this.mElemList["edit_input"];
        var clubInfo = ClubSystem.getInstance().getCurClubInfo();
        if (clubInfo == null) {
            return;
        }
        edit.text = clubInfo.notice;
    };
    ClubChangeNoticeFrame.prototype.refreshnoticeText = function () {
        var edit = this.mElemList["edit_input"];
        var noticeText = ClubSystem.getInstance().getNotice();
        if (noticeText == null) {
            return;
        }
        edit.text = ClubSystem.getInstance().getNotice();
    };
    ClubChangeNoticeFrame.prototype.changeNoticeClick = function () {
        var content = this.mElemList["edit_input"].text;
        if (content.length == 0) {
            // MsgSystem.addTagTips(Localize_cns("CLUB_TXT53"))
        }
        else if (content.length > 50) {
            MsgSystem.addTagTips(Localize_cns("CLUB_TXT77"));
        }
        else {
            //发协议
            var isHaveClubJurisdiction = ClubSystem.getInstance().isHaveClubJurisdiction();
            if (isHaveClubJurisdiction) {
                var noticeString = content;
                RpcProxy.call("C2G_FactionNotice", noticeString);
                this.hideWnd();
            }
        }
    };
    return ClubChangeNoticeFrame;
}(BaseWnd));
__reflect(ClubChangeNoticeFrame.prototype, "ClubChangeNoticeFrame");
//# sourceMappingURL=ClubChangeNoticeFrame.js.map