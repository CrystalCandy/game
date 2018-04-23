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
var ClubPeopleInfoFrame = (function (_super) {
    __extends(ClubPeopleInfoFrame, _super);
    function ClubPeopleInfoFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClubPeopleInfoFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/club/ClubPeopleInfoLayout.exml"];
    };
    ClubPeopleInfoFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_exit", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onExitClicked, _c),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["scroll_wnd"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 5, 5, group.width - 10, group.height - 10, group);
        var _a, _b, _c;
    };
    ClubPeopleInfoFrame.prototype.onUnLoad = function () {
    };
    ClubPeopleInfoFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        RegisterEvent(EventDefine.GET_CLUB_MENBER_LIST, this.refreshFrame, this);
        this.refreshFrame();
    };
    ClubPeopleInfoFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        UnRegisterEvent(EventDefine.GET_CLUB_MENBER_LIST, this.refreshFrame, this);
    };
    ClubPeopleInfoFrame.prototype.refreshFrame = function () {
        var list = ClubSystem.getInstance().getClubMemberList();
        // console.log("clubPeopleInfo=========")
        // table_print(list)
        this.list = list;
        this.scroll.clearItemList();
        var group = this.mElemList["scroll_wnd"];
        var myInfo = null;
        for (var i = 0; i < size_t(list); i++) {
            if (list[i].id == GetHeroProperty("id")) {
                myInfo = list[i];
            }
        }
        this.myInfo = myInfo;
        for (var i = 0; i < size_t(list); i++) {
            var v = list[i];
            var window_1 = this.scroll.getItemWindow(i, group.width - 10, 130, 0, 0, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v);
        }
        this.scroll.refreshScroll();
        if (myInfo == null) {
            return;
        }
        var myJob = ClubSystem.getInstance().getPosName(myInfo.post);
        var colorText = ClubSystem.getInstance().getPosNameColor(myInfo.post);
        var postText = Localize_cns("CLUB_TXT48") + colorText + myJob;
        var contributeNum = myInfo.contribute;
        var contributeText = Localize_cns("CLUB_TXT49") + "#lime" + contributeNum;
        AddRdContent(this.mElemList["my_rd"], postText + "#space_10#ublack" + contributeText, "ht_22_cc", "ublack");
    };
    ClubPeopleInfoFrame.prototype.initItemWindow = function (window) {
        var name = window.name;
        var w = window.width;
        var h = window.height;
        var Info = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = name + "bg", _a["title"] = null, _a["font"] = null, _a["image"] = "ty_uiDi03", _a["color"] = null, _a["x"] = 0, _a["y"] = 0, _a["w"] = w, _a["h"] = h, _a),
            (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = name + "_icon_bg", _b["parent"] = name + "bg", _b["image"] = "ty_renWuKuang01", _b["x"] = 0, _b["y"] = -10, _b["w"] = 140, _b["h"] = 140, _b["messageFlag"] = true, _b),
            (_c = {}, _c["index_type"] = gui.Grid9Image, _c["name"] = name + "_icon", _c["parent"] = name + "_icon_bg", _c["image"] = "zctx_90001", _c["x"] = 0, _c["y"] = -10, _c["w"] = 140, _c["h"] = 140, _c["messageFlag"] = true, _c),
            (_d = {}, _d["index_type"] = gui.RichDisplayer, _d["name"] = name + "_name_rd", _d["parent"] = name + "_bg", _d["x"] = 145, _d["y"] = 20, _d["w"] = 250, _d["h"] = 90, _d["event_name"] = null, _d["fun_index"] = null, _d),
            (_e = {}, _e["index_type"] = eui.Label, _e["name"] = name + "online", _e["parent"] = name + "bg", _e["title"] = Localize_cns("CLUB_TXT45"), _e["font"] = "ht_24_cc", _e["image"] = null, _e["color"] = gui.Color.green, _e["x"] = 355, _e["y"] = 45, _e["w"] = 100, _e["h"] = 30, _e["event_name"] = null, _e["fun_index"] = null, _e["messageFlag"] = true, _e),
            (_f = {}, _f["index_type"] = gui.Button, _f["name"] = name + "_appoint_btn", _f["parent"] = name + "_bg", _f["title"] = Localize_cns("CLUB_TXT88"), _f["font"] = "ht_22_cc_stroke", _f["image"] = "ty_tongYongBt2", _f["color"] = gui.Color.white, _f["x"] = 450, _f["y"] = 12, _f["w"] = 94, _f["h"] = 49, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onAppointClick, _f),
            (_g = {}, _g["index_type"] = gui.Button, _g["name"] = name + "_out_btn", _g["parent"] = name + "_bg", _g["title"] = Localize_cns("CLUB_TXT89"), _g["font"] = "ht_22_cc_stroke", _g["image"] = "ty_tongYongBt2", _g["color"] = gui.Color.white, _g["x"] = 450, _g["y"] = 69, _g["w"] = 94, _g["h"] = 49, _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = this.onOutClick, _g),
        ];
        UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window);
        this.mElemList[name + "_appoint_btn"].visible = false;
        this.mElemList[name + "_out_btn"].visible = false;
        var _a, _b, _c, _d, _e, _f, _g;
    };
    ClubPeopleInfoFrame.prototype.refreshItemWindow = function (window, data) {
        var name = window.name;
        var colorText = ClubSystem.getInstance().getPosNameColor(data.post);
        var posName = ClubSystem.getInstance().getPosName(data.post);
        var roleName = data.name;
        var rd_text = String.format(Localize_cns("CLUB_TXT62"), colorText, posName, roleName, data.contribute, data.force);
        AddRdContent(this.mElemList[name + "_name_rd"], rd_text, "ht_24_cc", "ublack", 8);
        this.mElemList[name + "_icon"].source = GetProfessionIcon(data.vocation, data.sexId);
        var isLive = false;
        if (data.online == 1) {
            isLive = true;
        }
        if (isLive) {
            this.mElemList[name + "online"].color = gui.Color.green;
            this.mElemList[name + "online"].text = Localize_cns("CLUB_TXT46");
        }
        else {
            if (data.logout == 0) {
                this.mElemList[name + "online"].color = gui.Color.gray;
                this.mElemList[name + "online"].text = Localize_cns("CLUB_TXT65");
            }
            else {
                var timeRd = GetLastLogoutTimeStr(data.logout);
                this.mElemList[name + "online"].color = gui.Color.red;
                this.mElemList[name + "online"].text = timeRd;
            }
        }
        //屏蔽自己和权力大的玩家
        if (this.myInfo && this.myInfo.id != data.id && this.myInfo.post < data.post) {
            var post = this.myInfo.post;
            this.mElemList[name + "_appoint_btn"].visible = (post == opFactionOfficeOptions.LEADER);
            this.mElemList[name + "_out_btn"].visible = !(post == opFactionOfficeOptions.MEMBER);
        }
    };
    ClubPeopleInfoFrame.prototype.onAppointClick = function (event) {
        var name = event.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        var data = this.list[index];
        if (data) {
            var wnd = WngMrg.getInstance().getWindow("ClubAppointFrame");
            wnd.onShowAndSetData(data);
        }
    };
    //踢出
    ClubPeopleInfoFrame.prototype.onOutClick = function (event) {
        var name = event.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        var data = this.list[index];
        if (data) {
            RpcProxy.call("C2G_FactionFire", data.id);
        }
    };
    ClubPeopleInfoFrame.prototype.onExitClicked = function () {
        var text = "";
        if (this.myInfo.post == 1 && size_t(this.list) != 1) {
            text = Localize_cns("CLUB_TXT64");
            MsgSystem.confirmDialog_YES(text);
        }
        else {
            text = Localize_cns("CLUB_TXT63");
            var t = {
                onDialogCallback: function (result, userData) {
                    if (result == true) {
                        RpcProxy.call("C2G_FactionLeave");
                        var wnd = WngMrg.getInstance().getWindow("ClubFrame");
                        if (wnd.isVisible()) {
                            wnd.hideWnd();
                        }
                        var wnd1 = WngMrg.getInstance().getWindow("ClubPeopleInfoFrame");
                        if (wnd1.isVisible()) {
                            wnd1.hideWnd();
                        }
                    }
                }
            };
            MsgSystem.confirmDialog(text, t, null);
        }
    };
    return ClubPeopleInfoFrame;
}(BaseWnd));
__reflect(ClubPeopleInfoFrame.prototype, "ClubPeopleInfoFrame");
//# sourceMappingURL=ClubPeopleInfoFrame.js.map