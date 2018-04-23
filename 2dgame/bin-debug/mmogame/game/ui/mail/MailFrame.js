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
var MailFrame = (function (_super) {
    __extends(MailFrame, _super);
    function MailFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MailFrame.prototype.initObj = function () {
        var params = [];
        for (var _a = 0; _a < arguments.length; _a++) {
            params[_a] = arguments[_a];
        }
        this.mail = {};
        this.isGot = false;
    };
    MailFrame.prototype.onLoad = function () {
        UiUtil.setWH(this.mLayoutNode, 600, 540);
        this.setAlignCenter(true, true);
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = "bg_", _a["title"] = null, _a["font"] = null, _a["image"] = "ty_uiDi01", _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["percentWidth"] = 100, _a["percentHeight"] = 100, _a["event_name"] = null, _a["fun_index"] = null, _a),
            (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = "bg", _b["title"] = null, _b["font"] = null, _b["image"] = "ty_uiDi02", _b["color"] = gui.Color.white, _b["x"] = 30, _b["y"] = 60, _b["w"] = 540, _b["h"] = 376, _b["event_name"] = null, _b["fun_index"] = null, _b),
            (_c = {}, _c["index_type"] = gui.RichDisplayer, _c["name"] = "emailMsg", _c["title"] = null, _c["font"] = "ht_24_lc_stroke", _c["image"] = "", _c["color"] = gui.Color.white, _c["x"] = 44, _c["y"] = 70, _c["w"] = 480, _c["h"] = 200, _c["event_name"] = null, _c["fun_index"] = null, _c),
            (_d = {}, _d["index_type"] = gui.RichDisplayer, _d["name"] = "prizePoint_rd", _d["title"] = null, _d["font"] = "ht_24_lc_stroke", _d["image"] = "", _d["color"] = gui.Color.white, _d["x"] = 64, _d["y"] = 260, _d["w"] = 522, _d["h"] = 60, _d["event_name"] = null, _d["fun_index"] = null, _d),
            (_e = {}, _e["index_type"] = gui.Button, _e["name"] = "confirmBtn", _e["title"] = Localize_cns("SURE"), _e["font"] = "ht_24_cc_stroke_saddlebrown", _e["image"] = "ty_tongYongBt1", _e["color"] = gui.Color.white, _e["x"] = 215, _e["y"] = 432, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onClickConfirmBtn, _e),
            (_f = {}, _f["index_type"] = gui.Button, _f["name"] = "close_btn_top", _f["title"] = null, _f["image"] = "ty_bt_back02", _f["color"] = gui.Color.white, _f["right"] = 0, _f["top"] = 0, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.hideWnd, _f),
            (_g = {}, _g["index_type"] = gui.Button, _g["name"] = "close_btn", _g["title"] = null, _g["image"] = "ty_bt_back04", _g["color"] = gui.Color.white, _g["right"] = 0, _g["bottom"] = 0, _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = this.hideWnd, _g),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        var itemW = 85;
        var spaceX = 5;
        var beginX = (600 - 5 * (itemW + spaceX) - spaceX) / 2;
        for (var i = 1; i <= 5; i++) {
            var x = beginX + (i - 1) * (itemW + spaceX);
            var y = 300;
            this.mElemList["itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, "itemBox_" + i, x, y);
            //this.mElemList["itemBox"+i]:updateByEntry(30001)
            this.mElemList["itemBox" + i].setVisible(false);
        }
        var _a, _b, _c, _d, _e, _f, _g;
    };
    MailFrame.prototype.onUnLoad = function () {
    };
    MailFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.MAIL_READ, this.onRefresh, this);
        //RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (true);
        this.isGot = false;
        this.onRefresh();
    };
    MailFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.MAIL_READ, this.onRefresh, this);
        //UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (false);
    };
    MailFrame.prototype.onRefresh = function () {
        var mail_list = MailSystem.getInstance().getMailList();
        for (var i in mail_list) {
            var v = mail_list[i];
            if (v["id"] == this.mail["id"]) {
                this.mail = v;
                this.setContext();
                break;
            }
        }
        if (this.isGot) {
            this.isGot = false;
            this.hideWnd();
            // this.showAction.stop()
            // this.hideAction.run()
            return;
        }
    };
    MailFrame.prototype.setContext = function () {
        var context = this.mail["context"] || "";
        AddRdContent(this.mElemList["emailMsg"], context, "ht_24_lc_stroke", "white");
        //TLog.Debug("=============================================item")
        //TLog.Debug_r(this.mail["item"])
        var itemCount = 0;
        if (this.mail["item"] && size_t(this.mail["item"]) != 0) {
            var i = 1;
            for (var _a = 0, _b = this.mail["item"]; _a < _b.length; _a++) {
                var v = _b[_a];
                //TLog.Debug("=============================================item",v[0],v[1])
                this.mElemList["itemBox" + i].updateByEntry(v[0] || 30001, v[1] || 1);
                this.mElemList["itemBox" + i].setVisible(size_t(v) != 0);
                itemCount = itemCount + 1;
                i = i + 1;
            }
        }
        var pointCount = 0;
        var str = null;
        for (var _i in this.mail["momey"]) {
            var _v = this.mail["momey"][_i];
            if (type(_v) == "object") {
                var value = _v[1] || 0;
                TLog.Assert(value >= 0);
                if (!str) {
                    str = GetMoneyIcon(_v[0]) + tostring(value);
                }
                else {
                    str = str + "#space" + GetMoneyIcon(_v[0]) + tostring(value);
                }
                pointCount = pointCount + 1;
            }
        }
        AddRdContent(this.mElemList["prizePoint_rd"], str || "", "ht_30_lc_stroke", "white");
        if (itemCount > 0) {
            UiUtil.setXY(this.mElemList["prizePoint_rd"], 64, 260);
        }
        else {
            UiUtil.setXY(this.mElemList["prizePoint_rd"], 64, 340);
        }
        if (itemCount > 0 && pointCount > 0) {
            UiUtil.setWH(this.mElemList["emailMsg"], this.mElemList["emailMsg"].width, 200);
        }
        else {
            UiUtil.setWH(this.mElemList["emailMsg"], this.mElemList["emailMsg"].width, 260);
        }
    };
    MailFrame.prototype.onClickConfirmBtn = function () {
        if (this.mail["mail_type"] == opEmailType.NORMAL || this.mail["mail_type"] == opEmailType.SYSTEM_NOTICE) {
            this.isGot = true;
            var message_1 = GetMessage(opCodes.C2G_EMAIL_REMOVE);
            message_1.mailId = this.mail["id"];
            SendGameMessage(message_1);
            this.hideWnd();
            return;
        }
        var message = GetMessage(opCodes.C2G_EMAIL_GET_ANNEX);
        message.id = this.mail["id"];
        SendGameMessage(message);
        this.isGot = true;
    };
    //  onMouseDown(args: GameTouchEvent) {
    //     let target = args.touchEvent.target;
    //     let isExclude = UiUtil.isExcludeChild(target, [this.mLayoutNode])
    //     if(isExclude){
    //         this.hideWnd();
    //     }
    //  }
    MailFrame.prototype.showWithMailInfo = function (mail) {
        this.mail = mail;
        this.showWnd();
    };
    return MailFrame;
}(BaseWnd));
__reflect(MailFrame.prototype, "MailFrame");
//# sourceMappingURL=MailFrame.js.map