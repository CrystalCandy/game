/*
作者:
    panyuxiong
    
创建时间：
    2014.09.01(星期一)

意图：
        邮件信息处理
    
公共接口：
    
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
var MailMessageHandler = (function (_super) {
    __extends(MailMessageHandler, _super);
    function MailMessageHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MailMessageHandler.prototype.initObj = function () {
        var args = [];
        for (var _a = 0; _a < arguments.length; _a++) {
            args[_a] = arguments[_a];
        }
        this.register(opCodes.G2C_EMAIL_RECV, this.onRecvG2C_EMAIL_RECV, this); //邮件列表
        this.register(opCodes.G2C_EMAIL_READ, this.onRecvG2C_EMAIL_READ, this); //邮件已读	
        this.register(opCodes.G2C_EMAIL_REMOVE, this.onRecvG2C_EMAIL_REMOVE, this); //邮件删除	
    };
    MailMessageHandler.prototype.onRecvG2C_EMAIL_RECV = function (dispatcher, message) {
        var mailCount = 0;
        for (var _i in message.mail_list) {
            var _v = message.mail_list[_i];
            mailCount = mailCount + 1;
        }
        //TLog.Debug("shou mail icon   count = ",mailCount )
        if (mailCount <= 0) {
            return;
        }
        MailSystem.getInstance().setMailList(message.mail_list);
        FireEvent(EventDefine.MAIL_LIST, null);
        var cbObj = {
            onIconMsgCallBack: function (id, userData) {
                WngMrg.getInstance().showWindow("MailListFrame");
                return false;
            }
        };
        if (MsgSystem.isIconTypeExsit(IconMsgType.EMAIL_LIST) == false) {
            MsgSystem.addIconMsg(cbObj, null, IconMsgType.EMAIL_LIST);
        }
    };
    MailMessageHandler.prototype.onRecvG2C_EMAIL_READ = function (dispatcher, message) {
        MailSystem.getInstance().setReadMail(message.id, message.staust);
        FireEvent(EventDefine.MAIL_READ, null);
    };
    MailMessageHandler.prototype.onRecvG2C_EMAIL_REMOVE = function (dispatcher, message) {
        MailSystem.getInstance().removeEmailById(message.mailId);
        FireEvent(EventDefine.MAIL_READ, null);
    };
    return MailMessageHandler;
}(MessageHandler));
__reflect(MailMessageHandler.prototype, "MailMessageHandler");
//# sourceMappingURL=MailMessagehandler.js.map