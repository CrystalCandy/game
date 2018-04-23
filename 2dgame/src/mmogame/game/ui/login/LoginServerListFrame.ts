

class LoginServerListFrame extends BaseWnd{

    static STATE_LOGO:number = 0;//背景图
    static STATE_AUTH:number = 1;//授权信息
    static STATE_RENCENT:number = 2;//最近登陆
    static STATE_REGISTER:number = 3;//注册
	
    public initObj(...params:any[]){
        this.mLayoutPaths = ["layouts/login/LoginServerListLayout.exml",];
                             //"layouts/itemRender/LoginServerItemLayout.exml"];
    }

    public onLoad():void{
        //this.createLayerNode();
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.initSkinElemList()
        // this.mLayoutNode.bottom = 0
        // this.mLayoutNode.horizontalCenter = 0;
        this.setAlignCenter(true, true)

        var elemInfo =[
            // {["name"] : "icon_serverStat",  ["title"] : null,  ["event_name"] : null, ["fun_index"] : null},
            // {["name"] : "label_serverStat",  ["title"] : null,  ["event_name"] : null, ["fun_index"] : null},
            // {["name"] : "icon_serverNew",  ["title"] : null,  ["event_name"] : null, ["fun_index"] : null},
            //{["name"] : "label_serverName",  ["title"] : null,  ["event_name"] : egret.TouchEvent.TOUCH_TAP, ["fun_index"] : this.onRecentServerTap},

            //{["name"] : "list_serverlist",  ["title"] : null,  ["event_name"] : null, ["fun_index"] : null},
            {["name"] : "btn_close",  ["title"] : null,  ["event_name"] : egret.TouchEvent.TOUCH_TAP, ["fun_index"] : this.hideWnd},
            {["name"] : "btn_close_top",  ["title"] : null,  ["event_name"] : egret.TouchEvent.TOUCH_TAP, ["fun_index"] : this.hideWnd},
            //{["name"] : "btn_refresh",  ["title"] : null,  ["event_name"] : egret.TouchEvent.TOUCH_TAP, ["fun_index"] : this.onServerListRefresh},
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

        //this.mElemList["btn_refresh"].visible = false;

        var listBox:eui.List = this.mElemList["list_regionlist"];
         listBox.itemRenderer = itemRender.LoginServerRegionItem;

         var listBox:eui.List = this.mElemList["list_serverlist"];
         listBox.itemRenderer = itemRender.LoginServerItem;
        
	}

	public onUnLoad():void{
		
	}

    public onShow():void{
		 this.mLayoutNode.visible = true;
         RegisterEvent(EventDefine.LOGIN_SERVERLIST_UPDATE,	this.refreshUI,this);
         this.refreshUI();
	}

	public onHide():void{
        this.mLayoutNode.visible = false;
        UnRegisterEvent(EventDefine.LOGIN_SERVERLIST_UPDATE,	this.refreshUI,this);
	}


    refreshUI():void{
        // var loginSystem:LoginSystem = LoginSystem.getInstance();
        // var recentServerInfo = loginSystem.getRecentLoginServerInfo();
        // if(recentServerInfo == null)
        //     return;

        // var textInfo = loginSystem.getServerStateText(recentServerInfo);
        // this.mElemList["label_serverStat"].textColor = textInfo.color;
        // this.mElemList["label_serverStat"].text = textInfo.text;
        
        
        // this.mElemList["label_serverName"].textColor = gui.Color.cyan;
        // this.mElemList["label_serverName"].text = recentServerInfo.ServerName;

        // this.mElemList["icon_serverStat"].source = textInfo.image;
        // this.mElemList["icon_serverNew"].visible = !!recentServerInfo.IsNew;


        let regionList = []
        let regionPerCount = 20
        let regionCount = Math.ceil(ServerConfig.length / regionPerCount) 

        for(let i = 0; i < regionCount; i++){
            let v:any = {}
            v.start = i * regionPerCount
            v.end = v.start + regionPerCount - 1
            v.select = false
            v.parent = this
            regionList.push(v)
        }

        let v:any = {}
        v.start = -1
        v.end = -1
        v.select = false
        v.parent = this
        regionList.push(v)

        //index==1的，是最新开服的区
        let selectRegion = null;
        if(regionCount == 0){
            selectRegion = regionList[0]
        }else{
            selectRegion = regionList[1]
        }
        selectRegion.select = true

        regionList = regionList.reverse()

        this.refreshRegion(selectRegion.start, selectRegion.end, regionList)

    }

    refreshRegion(start, end, regionList?):void{
        //刷新区服列表
        var listBox:eui.List = this.mElemList["list_regionlist"];
        if(regionList == null){
            regionList = UiUtil.getListDataSouce(listBox)
            for(let i = 0; i < regionList.length; i++){
                let regionInfo = regionList[i]
                if(regionInfo.start == start && regionInfo.end == end){
                    regionInfo.select = true
                }else{
                    regionInfo.select = false
                }
            }
        }
        UiUtil.updateList(listBox, regionList);


        //刷新服务器列表
        let serverList = []
        if(start < 0){
            var loginSystem:LoginSystem = LoginSystem.getInstance();
            var recentServerInfo = loginSystem.getRecentLoginServerInfo();
            if(recentServerInfo != null){
                serverList.push(recentServerInfo)
            }
        }else{
            for(let i = start; i < end; i ++){
                let serverInfo = ServerConfig[i]
                if(serverInfo != null)
                    serverList.push(serverInfo)
            }
        }

        var listBox:eui.List = this.mElemList["list_serverlist"];
        UiUtil.updateList(listBox, serverList);
        
    }
    



	// onServerListRefresh(event:egret.TouchEvent):void{
    //     LoginSystem.getInstance().requestServerList();
	// }

    // onRecentServerTap(event:egret.TouchEvent):void{
    //     var recentServerId = LoginSystem.getInstance().getLastSelectedServerIndex();
	//     LoginSystem.getInstance().setSelectedServerIndex(recentServerId)
    //     this.hideWnd();
    // }
}



module itemRender{

    
    export class LoginServerRegionItem extends eui.ItemRenderer{
        mElemList: any;

		constructor() {
			super();
			this.mElemList = {}

            let Info: any = [
				//背景
				{ ["index_type"]: gui.Button, ["name"]: "btn_region", ["title"]: "", ["font"]: "ht_24_cc", ["color"]: gui.Color.ublack, ["image"]: "dl_fuWuQiDi03", ["x"]: 0, ["y"]: 10, ["w"]: null, ["h"]: null, ["event_name"]: gui.TouchEvent.TOUCH_SHORT, ["fun_index"]: this.onClickBtn },

				//{ ["index_type"]: gui.Grid9Image, ["name"]: name + "touch", ["title"]: null, ["font"]: null, ["image"]: "", ["x"]: 10, ["y"]: 0, ["w"]: w - 20, ["h"]: h, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onSetpost },
			]
			UiUtil.createElem(Info, this, this.mElemList, this)
        }


        protected dataChanged(): void {
			let v = this.data

            let btn:gui.Button = this.mElemList["btn_region"]
            if(v.select == true){
                btn.source = "dl_fuWuQiDi03"
            }else{
                btn.source = "dl_fuWuQiDi01"
                
            }
            
            if(v.start < 0){
                btn.text = Localize_cns("LAST_LOGIN_ROLE")
            }else{
                btn.text = String.format("S%d-%d", v.start+1, v.end+1)
            }
        }

        onClickBtn(args:egret.TouchEvent) {
            let v = this.data
            v.parent.refreshRegion(v.start, v.end)
        }
        
    }







    export class LoginServerItem extends eui.ItemRenderer{

         mElemList: any;

        

        constructor(){
            super();
            this.mElemList = {}

            let Info: any = [
				//背景
				{ ["index_type"]: gui.Button, ["name"]: "btn_server", ["title"]: "", ["font"]: "ht_24_cc", ["color"]: gui.Color.ublack,  ["image"]: "dl_fuWuQiDi02", ["x"]: 0, ["y"]: 10, ["w"]: null, ["h"]: null, ["event_name"]: gui.TouchEvent.TOUCH_SHORT, ["fun_index"]: this.onServerItemTap },
                { ["index_type"]: eui.Image, ["name"]: "serverIcon", ["image"]: "dl_biaoQian01", ["parent"]:"btn_server", ["x"]: 0, ["y"]: 0, ["w"]: null, ["h"]: null,  ["messageFlag"]: true,  ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },

				//{ ["index_type"]: gui.Grid9Image, ["name"]: name + "touch", ["title"]: null, ["font"]: null, ["image"]: "", ["x"]: 10, ["y"]: 0, ["w"]: w - 20, ["h"]: h, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onSetpost },
			]
			UiUtil.createElem(Info, this, this.mElemList, this)
        }

        

        protected dataChanged():void{
            // let listbox = <eui.List>this.parent;
            // let param = listbox.dataProvider["param"];
            
            var serverInfo = this.data;

            var loginSystem = LoginSystem.getInstance();
            //var textInfo = loginSystem.getServerStateText(serverInfo);

            let text = ""
            let color = gui.Color.ublack
            if(serverInfo.State == StateType.UNABLE ){
                text = String.format("(%s)", Localize_cns("WEIHU"))
                color = gui.Color.gray;
            }


            this.mElemList["btn_server"].text = text + serverInfo.ServerName
            this.mElemList["btn_server"].textColor = color
            
            this.mElemList["serverIcon"].visible = !!serverInfo.IsNew;

            // this.label_serverStat.textColor = textInfo.color;
            // this.label_serverStat.text = textInfo.text;
            
            // this.label_serverName.textColor = gui.Color.cyan
            // this.label_serverName.text = serverInfo.ServerName;

            // this.icon_serverStat.source = textInfo.image;
            // this.icon_serverNew.visible = !!serverInfo.IsNew;

        }

        onServerItemTap(event:egret.TouchEvent):void{
            //TLog.Debug("onServerItemTap index:", this.itemIndex); 
            //LoginSystem.getInstance().setSelectedServerIndex(this.itemIndex);
            var serverInfo = this.data;
            let index = ServerConfig.indexOf(serverInfo)

            LoginSystem.getInstance().setSelectedServerIndex(index);
            WngMrg.getInstance().hideWindow("LoginServerListFrame");
        }
    }

}
