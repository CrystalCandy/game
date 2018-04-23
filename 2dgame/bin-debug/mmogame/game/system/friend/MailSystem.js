/*
作者:
    panyuxiong
    
创建时间：
    2014.09.01(星期一)

意图：
    邮件管理系统

公共接口：

        getMailList(){																	//-获取邮件列表

        setMailList(list){														//-设置邮件列表
    
*/
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
var MailSystem = (function (_super) {
    __extends(MailSystem, _super);
    function MailSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //IconMsgList: any[];
    MailSystem.prototype.initObj = function () {
        var args = [];
        for (var _a = 0; _a < arguments.length; _a++) {
            args[_a] = arguments[_a];
        }
        this.onClear();
    };
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    MailSystem.prototype.destory = function () {
    };
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    MailSystem.prototype.prepareResource = function (workQueue) {
    };
    MailSystem.prototype.onClear = function () {
        this.mail_list = []; //邮件列表
        //this.IconMsgList = []
    };
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    //-设置邮件列表
    MailSystem.prototype.setMailList = function (list) {
        for (var _ in list) {
            var v = list[_];
            var falg = true;
            for (var i in this.mail_list) {
                var value = this.mail_list[i];
                if (v["id"] == value["id"]) {
                    falg = false;
                }
            }
            if (falg) {
                JsUtil.arrayInstert(this.mail_list, v);
            }
        }
        this._onUpdate();
    };
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    //-获取邮件列表
    MailSystem.prototype.getMailList = function () {
        var returnMail = this.mail_list;
        if (this.mail_list.length > defaultValue.DEFALUT_EMAIL_MAX) {
            returnMail = [];
            for (var i = 0; i < defaultValue.DEFALUT_EMAIL_MAX; i++) {
                JsUtil.arrayInstert(returnMail, this.mail_list[i]);
            }
        }
        return returnMail;
    };
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    //-邮件已读
    MailSystem.prototype.setReadMail = function (id, status) {
        for (var i in this.mail_list) {
            var v = this.mail_list[i];
            if (v["id"] == id) {
                v["status"] = status;
            }
        }
        this._onUpdate();
    };
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    //-获取邮件数量
    MailSystem.prototype.getEmailCount = function () {
        var emailList = [];
        for (var i in this.mail_list) {
            var v = this.mail_list[i];
            JsUtil.arrayInstert(emailList, v);
        }
        return emailList.length;
    };
    //-删除邮件
    MailSystem.prototype.removeEmailById = function (id) {
        //TLog.Debug("MailSystem.removeEmailById", id)
        // if (this.mail_list[id]) {
        //     if (this.mail_list[id].id == id) {
        //         //TLog.Debug("removeEmailById 1 ")
        //         JsUtil.arrayRemove(this.mail_list, id)
        //         return
        //     }
        // }
        var removeIndex = null;
        //for (let _i in this.mail_list) {
        for (var _i = 0; _i < this.mail_list.length; _i++) {
            var _v = this.mail_list[_i];
            if (_v.id == id) {
                removeIndex = _i;
                break;
            }
        }
        if (removeIndex != null) {
            //TLog.Debug("removeEmailById 2 ")
            JsUtil.arrayRemove(this.mail_list, removeIndex);
            //return
        }
        this._onUpdate();
    };
    MailSystem.prototype._onUpdate = function () {
        if (this.getUnReadEmailCount() <= 0) {
            //this.removeAllIconMsgInfo();
            MsgSystem.removeIconMsgByType(IconMsgType.EMAIL_LIST);
        }
    };
    // removeAllIconMsgInfo() {
    //     for (let _i in this.IconMsgList) {
    //         let _info = this.IconMsgList[_i]
    //         MsgSystem.removeIconMsg(_info.iconID)
    //     }
    //     this.IconMsgList = []
    // }
    // addIconMsgInfo(info) {
    //     JsUtil.arrayInstert(this.IconMsgList, info)
    // }
    // getIconMsgList() {
    //     return this.IconMsgList
    // }
    MailSystem.prototype.getUnReadEmailCount = function () {
        var count = 0;
        for (var i in this.mail_list) {
            var v = this.mail_list[i];
            if (v.status == opEmailStatus.UnReadNoGet) {
                count = count + 1;
            }
        }
        return count;
    };
    return MailSystem;
}(BaseSystem));
__reflect(MailSystem.prototype, "MailSystem");
//# sourceMappingURL=MailSystem.js.map