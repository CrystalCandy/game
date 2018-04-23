//declare module allusdk {
    ////appid:分配给的appid;cb:初始化之后的回调;shareInfo:分享的信息;test:预留  是否是测试 默认传false;
    declare function allusdk_init(appid:string,cb:()=>void,shareInfo:any,test:boolean): boolean;
    //显示二维码
    declare function allusdk_showSDKQrCode(): void;
    //2.2充值
    declare function allusdk_showRecharge(payItems:any,callbackFunction:(any)=>void, showerrorfun:(number)=>void):void;
    declare function allusdk_payOne(amount:number, orderData:any, callback:(number)=>void):void;
    //2.3.1 登陆错误时的调用
    declare function allusdk_connectError():void;
    //2.3.2 是否打开分享礼包
    declare function allusdk_isOpenShare(isOpenShareCallback:(boolean)=>void):void;
    //2.3.3 设置分享回调
    declare function allusdk_setShareCallback(shareCallback:(boolean)=>void):void;
    //2.3.3.1 打开分享 
    declare function allusdk_showShare():void;
    //2.3.4 获取关注状态（用于判断用户是否关注公众号）
    declare function allusdk_getFocusState(appIdv:string, openIdv:string, openKeyv:string, focusStateCallback:(number)=>void):void;
    //2.3.5 数据上报
    declare function allusdk_reportRoleCreate(serverid:string, roleid:string, rolename:string, rolelevel:number, pfid:string):void;
    declare function allusdk_reportRoleLogin(serverid:string, roleid:string, rolename:string, rolelevel:number, pfid:string):void;
    //2.3.6 发送到桌面（将游戏快捷方式图标保存到桌面，个别渠道需要接入）
    declare function allusdk_sendToDesktop():void;
    //2.3.7 打开话题圈(打开话题圈 前往论坛等类似功能，个别渠道需要接入)
    declare function allusdk_openTopicCircle():void;
    //2.3.8 是否显示下载微端 聚合sdk功能
    declare function allusdk_isDownloadable(cb:boolean):void;
    //聚合微博分享
    declare function allusdk_weiboShare(str,openId,openKey)
//}
