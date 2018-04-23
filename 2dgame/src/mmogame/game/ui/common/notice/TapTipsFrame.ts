class TapTipsFrame extends BaseWnd{

	MaxCount:number;
	mLayoutNodeList:gui.LayoutNode[];

	mFrameInfoList:any;
	lastIndex:number;
	
	public initObj(...params:any[]){
        //this.mLayoutPaths = ["layouts/common/TapTipsLayout.exml"];
		this.MaxCount = 10;
		this.mLayoutNodeList = [];

		this.mFrameInfoList = {};
		this.lastIndex = -1;
		
    }

	public onLoad():void{
		//this.mLayerNodeList.push(this.mLayoutNode);

		
		for(var i = 0; i < this.MaxCount ; i++){
			var mElemList = {}

			let node:gui.LayoutNode = this.createLayoutNode();
			node.setLayer(gui.GuiLayer.Top);
			node.width = 620;
			node.height = 40;
			// node.skinName = this.mLayoutPaths[0];
			 node.visible = false;
			 this.mLayoutNodeList.push(node);

			let elemInfo =[
				//{["name"] : "msg",  ["title"] : null,  ["event_name"] : null, ["fun_index"] : null},
				{ ["index_type"]: gui.Grid9Image,  ["name"]: "bg",   ["image"]:"ty_huoDeDi01", ["percentWidth"]: 100, ["percentHeight"]: 100,  ["event_name"]: null, ["fun_index"]: null },
				{ ["index_type"]: gui.RichDisplayer,  ["name"]: "msg", ["title"]: "", ["font"]: "ht_24_cc_stroke", ["color"]: gui.Color.white,  ["w"]: 620, ["h"]: 40,  ["event_name"]: null, ["fun_index"]: null },
			];
			UiUtil.createElem(elemInfo, node, mElemList, this);

			node.touchEnabled = false;
        	node.touchChildren = false


			mElemList["msg"].setAlignFlag(gui.Flag.H_CENTER+gui.Flag.V_CENTER);

			this.mFrameInfoList[i] = {msg: mElemList["msg"], node:node , time:0};
		}

		

	}

	public onUnLoad():void{
		for(var i = 0; i < this.MaxCount ; i++){
			this.mLayoutNodeList[i].removeFromtParent();
		}
		this.mLayoutNodeList.length = 0;
		this.mFrameInfoList = null;
	}

	public onShow():void{

	}
	
	public onHide():void{

	}


	addNewMsg(msg:string):void{
		
		var startY = -120;
		let nowTime = core.TimeStamp.CurrentTime;


		let showCount = 0;
		for(var i = 0; i < this.MaxCount ; i++){
			let info = this.mFrameInfoList[i];
			if(info.node.visible && nowTime - info.time < 500){
				showCount++;
			}
		}
		if(showCount >= this.MaxCount - 1){
			return ;
		}

		this.lastIndex = (this.lastIndex + 1) % this.MaxCount;
		var info = this.mFrameInfoList[this.lastIndex];
		info.node.visible = true;
		info.node.alpha = 1;
		info.node.horizontalCenter = 0;
		info.node.verticalCenter = startY;
		info.time = nowTime;

		info.msg.width = 640

		AddRdContent(info.msg, msg, "ht_22_cc", "white");
		AdjustRdContentViewW(info.msg, 10)
		AdjustRdContentViewH(info.msg, 40)
		
		UiUtil.setWH(info.node, info.msg.width, info.msg.height)
		//info.msg.text = msg;
		//info.msg.width = 620;



		let endY = startY - (60 + (showCount) * (info.node.height -5))
		egret.Tween.removeTweens(info.node);
		egret.Tween.get(info.node).to({verticalCenter: endY}, 800).wait(500).to({alpha:0}, 300).call(this.onLayoutNodeComplete, this, [info]);

		// var topIndex = this.lastIndex
		// for(var i = 1; i <= this.MaxCount - 1; i++){
		// 	topIndex--;
		// 	if( topIndex < 0){
		// 		topIndex = this.MaxCount - 1;
		// 	}

		// 	var node:gui.LayoutNode = this.mFrameInfoList[topIndex].node;
		// 	if(node.visible){
		// 		node.horizontalCenter = 0
		// 		node.verticalCenter = -45 * i - startY;
		// 	}
		// }
	}


	onLayoutNodeComplete(info:any){
		//TLog.Debug("onOneNodeComplete")
		info.node.visible = false;
	}
}