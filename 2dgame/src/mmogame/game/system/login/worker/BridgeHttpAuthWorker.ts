class BridgeHttpAuthWorker extends TClass implements core.IHttpCallback{
	serverinfo:any;
	target:any;
	callback:Function;
	http_url:string;

    public initObj(...params:any[]):void{
		this.serverinfo = params[0];
		this.target = params[1];
		this.callback = params[2];
		this.http_url = IGlobal.sdkHelper.getStringConfigDef("BridgeUrl");
	}   

    public  destory():void{

	}

	send():void{

		var authorInfo = GameAccount.getInstance().getAuthorInfo();
		var serverId = this.serverinfo.ServerID;

		var request_url =  this.http_url + "?serverId=" + serverId;
		for(var k in authorInfo){
			var v = authorInfo[k];
			request_url = request_url + '&' + k + '=' + v;
		}
		TLog.Debug("request_url", request_url);
							
	    IGlobal.httpClient.send(request_url, this, 0);
	}


	onHttpResponse(url:string, data:any, userData:any){
		var param = JsUtil.JsonDecode(data);
		this.callback.call(this.target, url, param);
	}
	
	onHttpError(url:string, userData:any){
		var param:any = {};
		param.code = -1
		this.callback.call(this.target, url, param);
	}


}