//var allusdk;
//(function (allusdk) {
//-----------------------------------------------
//初始化
//appid:分配给的appid;cb:初始化之后的回调;shareInfo:分享的信息;test:预留  是否是测试 默认传false;
function allusdk_init(appid,cb,shareInfo,test)
{
	console.log("allusdk_inita");
	console.log(appid);
	//if (g2f == null){
	//console.log(typeof(g2f));
	if (typeof(g2f) == "undefined"){
		console.log("allusdk_init g2f == null");
		return false;
	}
	g2f.init(appid,cb,shareInfo,false);
	return true;
}
//allusdk.init = init;

//显示二维码
function allusdk_showSDKQrCode()
{
	if (typeof(g2f) == "undefined"){
		return;
	}
	g2f.showQrCode();
}
//allusdk.showSDKQrCode = showSDKQrCode;
//2.2充值
function allusdk_showRecharge(payItems,callbackFunction, showerrorfun)
{
	if (typeof(g2f) == "undefined"){
		return;
	}
	//payItems 充值条目  function1 下单回调 返回订单号 function2 充值成功回调
	g2f.showRecharge(payItems,callbackFunction,showerrorfun);
}
//2.2.1充值
function allusdk_payOne(amount, orderData, callback)
{
	if (typeof(g2f) == "undefined"){
		return;
	}	
	//amount 多少钱  function1 下单数据 function2 充值成功回调
	g2f.pay(amount,orderData,callback);
}
//allusdk.showRecharge = showRecharge;
////充值成功回调
//function showerrorfun(result)
//{
//	if (-1 == result) {
//	    alert("充值失败！");
//	    return;
//	}
//	else if (0 == result) {
//	    alert("充值取消！");
//	    return;
//	}
//	else if (1 == result) {
//	    alert("充值成功！");
//	    return;
//	}
//	console.log(result);//res:状态码 -1失败 0取消 1成功
//}

//2.3.1 登陆错误时的调用
function allusdk_connectError()
{
	if (g2f == null){
		return;
	}
	g2f.onloginerror();
}
//allusdk.connectError = connectError;
//2.3.2是否打开分享礼包
function allusdk_isOpenShare(isOpenShareCallback)
{
	console.log("allusdk_isOpenShare")
	if (typeof(g2f) == "undefined"){
		console.log("allusdk_isOpenShare g2f == null");
		return;
	}
	//open:true 需要打开分享礼包功能 显示分享礼包按钮 false:不需要 不显示
	g2f.isOpenShare(isOpenShareCallback);
}
//allusdk.isOpenShare = isOpenShare;
//2.3.3设置分享回调
function allusdk_setShareCallback(shareCallback)
{
	console.log("allusdk_setShareCallback")
	if (typeof(g2f) == "undefined"){
		console.log("allusdk_setShareCallback g2f == null");
		return;
	}
	//设置分享回调 分享成功后会调用传入的function 可以在里面领奖   注：界面设计有一定的要求，可以写成分享到朋友，朋友群，不要出现朋友圈，因为涉及到微信的规则问题
	//result  true 分享成功 false 分享失败
	g2f.setShareCallback(shareCallback);
}

 //2.3.3.1 打开分享 
 function allusdk_showShare()
 {
	console.log("allusdk_showShare")
	if (typeof(g2f) == "undefined"){
		console.log("allusdk_showShare g2f == null");
		return;
	}

	g2f.showShare();
 }

//allusdk.setShareCallback = setShareCallback;
//2.3.4获取关注状态（用于判断用户是否关注公众号）
function allusdk_getFocusState(appIdv, openIdv, openKeyv, focusStateCallback)
{
	if (g2f == null){
		return;
	}
	//查询关注状态
	//{appid:'appid',openId:'openId',openKey:'openKey'}
	//function 查询回调;
	g2f.getFocusState({appId:appIdv,openId:openIdv,openKey:openKeyv}, focusStateCallback);
	//注:未关注需显示关注按钮 已关注需隐藏关注按钮并给玩家发放关注礼包 -1状态为不需要关注礼包功能 不需要显示关注按钮 关注按钮会调用显示二维码方法引导用户关注
}
//allusdk.getFocusState = getFocusState;
//2.3.5 数据上报 serverid:number, roleid:string, rolename:string, pfid
function allusdk_reportRoleCreate(serverid, roleid, rolename, rolelevel, pfid)
{
	console.log("allusdk_reportRoleCreate")
	if (g2f == null){
		console.log("allusdk_reportRoleCreate g2f == null");
		return;
	}
	g2f.reportData({
			action:"create_role",//行为  login:登陆 create_role: 创建角色  暂时需要上报这两项
	        roleid: roleid,
	        srvid: serverid,
	        rolelevel: rolelevel,
	        pfid: pfid,
	        rolename: rolename
	    });
}

function allusdk_reportRoleLogin(serverid, roleid, rolename, rolelevel, pfid)
{
	console.log("allusdk_reportRoleLogin")
	if (g2f == null){
		console.log("allusdk_reportRoleLogin g2f == null");
		return;
	}
	g2f.reportData({
			action:"login",//行为  login:登陆 create_role: 创建角色  暂时需要上报这两项
	        roleid: roleid,
	        srvid: serverid,
	        rolelevel: rolelevel,
	        pfid: pfid,
	        rolename: rolename
	    });
}
//allusdk.reportSDK = reportSDK;
//2.3.6 发送到桌面（将游戏快捷方式图标保存到桌面，个别渠道需要接入）
function allusdk_sendToDesktop()
{
	if (g2f == null){
		return;
	}
	g2f.sendToDesktop();
}
//allusdk.sendToDesktop = sendToDesktop;
//2.3.7 打开话题圈(打开话题圈 前往论坛等类似功能，个别渠道需要接入)
function allusdk_openTopicCircle()
{
	if (g2f == null){
		return;
	}
	g2f.openTopicCircle();
}
//allusdk.openTopicCircle = openTopicCircle;
//2.3.8 是否显示下载微端 聚合sdk功能
function allusdk_isDownloadable(cb)
{
	if (g2f == null){
		return;
	}
	if(g2f && g2f.isDownloadable){
	    g2f.isDownloadable(cb);
	}
}
//allusdk.isDownloadable = isDownloadable;
//聚合微博分享
function allusdk_weiboShare(str,openId,openKey)
{
	if (g2f == null){
		return;
	}
	g2f.weiboShare(str)
}
//allusdk.weiboShare = weiboShare;
//})(allusdk || (allusdk = {}));