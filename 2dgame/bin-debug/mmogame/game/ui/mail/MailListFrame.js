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
var MailListFrame = (function (_super) {
    __extends(MailListFrame, _super);
    function MailListFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MailListFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/MailListLayout.exml"];
    };
    MailListFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "getAllBtn", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickGetAllBtn, _c),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var list = this.mElemList["list_email"];
        list.itemRenderer = itemRender.MailListItem;
        this.emptyView = UIEmptyView.newObj(this.mLayoutNode, 110, 240);
        this.emptyView.setDescText(Localize_cns("EMPTY_EMAIL_TEXT"));
        var _a, _b, _c;
    };
    MailListFrame.prototype.onUnLoad = function () {
    };
    MailListFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.MAIL_LIST, this.onRefresh, this);
        RegisterEvent(EventDefine.MAIL_READ, this.onRefresh, this);
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.onRefresh();
    };
    MailListFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.MAIL_LIST, this.onRefresh, this);
        UnRegisterEvent(EventDefine.MAIL_READ, this.onRefresh, this);
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    MailListFrame.prototype.onRefresh = function () {
        this.mail_list = MailSystem.getInstance().getMailList();
        //TLog.Debug("================this.mail_list==============")
        //TLog.Debug_r(this.mail_list)
        // if (!this.mail_list) {
        //     return
        // }
        if (size_t(this.mail_list) == 0) {
            this.emptyView.setVisible(true);
            this.mElemList["getAllBtn"].enabled = (false);
        }
        else {
            this.emptyView.setVisible(false);
            this.mElemList["getAllBtn"].enabled = (true);
        }
        //对邮件未读取排序
        table_sort(this.mail_list, function (a, b) {
            if (a.status != b.status) {
                return b.status - a.status;
            }
            else {
                return b.send_time - a.send_time;
            }
        });
        var list = this.mElemList["list_email"];
        UiUtil.updateList(list, this.mail_list);
    };
    MailListFrame.prototype.onClickGetAllBtn = function () {
        //this.scroll.clearItemList()
        var mailList = MailSystem.getInstance().getMailList();
        if (size_t(mailList) > 0) {
            var message = GetMessage(opCodes.C2G_EMAIL_ALL);
            SendGameMessage(message);
        }
        else {
            MsgSystem.addTagTips(Localize_cns("EMAIL_IS_NULL"));
        }
    };
    return MailListFrame;
}(BaseWnd));
__reflect(MailListFrame.prototype, "MailListFrame");
var itemRender;
(function (itemRender) {
    var MailListItem = (function (_super) {
        __extends(MailListItem, _super);
        function MailListItem() {
            var _this = _super.call(this) || this;
            _this.mElemList = {};
            var name = _this.name;
            var w = 500;
            var h = 106;
            var mElemInfo = [
                (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = "emailbg", _a["title"] = null, _a["font"] = null, _a["image"] = "ty_uiDi03", _a["color"] = null, _a["x"] = 0, _a["y"] = 0, _a["w"] = w, _a["h"] = h, _a["event_name"] = gui.TouchEvent.TOUCH_SHORT, _a["fun_index"] = _this.onClickEmail, _a),
                (_b = {}, _b["index_type"] = eui.Image, _b["name"] = "emailicon", _b["bAdapteWindow"] = true, _b["title"] = "", _b["image"] = "yj_youJianIcon01", _b["x"] = 10, _b["y"] = 8, _b["w"] = 90, _b["h"] = 90, _b["event_name"] = null, _b["fun_index"] = null, _b["messageFlag"] = true, _b),
                (_c = {}, _c["index_type"] = eui.Label, _c["name"] = "emailsender", _c["title"] = "", _c["font"] = "ht_24_lc", _c["image"] = null, _c["color"] = gui.Color.saddlebrown, _c["x"] = 112, _c["y"] = 8, _c["w"] = 300, _c["h"] = 30, _c["event_name"] = null, _c["fun_index"] = null, _c["messageFlag"] = true, _c),
                (_d = {}, _d["index_type"] = eui.Label, _d["name"] = "emaildate", _d["title"] = "", _d["font"] = "ht_24_lc", _d["image"] = null, _d["color"] = gui.Color.ublack, _d["x"] = 112, _d["y"] = 52, _d["w"] = 200, _d["h"] = 30, _d["event_name"] = null, _d["fun_index"] = null, _d["messageFlag"] = true, _d),
            ];
            UiUtil.createElem(mElemInfo, _this, _this.mElemList, _this);
            return _this;
            var _a, _b, _c, _d;
        }
        MailListItem.prototype.dataChanged = function () {
            var v = this.data;
            var name = String.format(Localize_cns("EMAIL_SENDER"), v.name);
            //let time = String.format("%d-%d-%d", os.date("%Y", v.send_time), os.date("%m", v.send_time), os.date("%d", v.send_time))
            var time = getFormatTime(v.send_time);
            this.mElemList["emailsender"].text = (name);
            if (v.name == "") {
                this.mElemList["emailsender"].text = (Localize_cns("EMAIL_SENDER_SYSTEM"));
            }
            this.mElemList["emaildate"].text = (time);
            if (v.status == opEmailStatus.UnReadNoGet) {
                this.mElemList["emailicon"].source = ("yj_youJianIcon01");
            }
            else {
                this.mElemList["emailicon"].source = ("yj_youJianIcon02");
            }
        };
        MailListItem.prototype.onClickEmail = function (args) {
            var v = this.data;
            this.mElemList["emailicon"].source = ("yj_youJianIcon02");
            var wnd = WngMrg.getInstance().getWindow("MailFrame");
            wnd.showWithMailInfo(v);
            //发送已读信息
            if (v["status"] == opEmailStatus.UnReadNoGet) {
                var message = GetMessage(opCodes.C2G_EMAIL_READ);
                message.id = v["id"];
                SendGameMessage(message, true);
            }
        };
        return MailListItem;
    }(eui.ItemRenderer));
    itemRender.MailListItem = MailListItem;
    __reflect(MailListItem.prototype, "itemRender.MailListItem");
})(itemRender || (itemRender = {}));
//# sourceMappingURL=MailListFrame.js.map