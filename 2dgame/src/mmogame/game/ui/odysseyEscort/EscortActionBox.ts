class EscortActionBox extends TClass {
	mParentNode: eui.Component;
	name: string;
	mElemList: any;
	parentWnd: any;

    rootWnd: any;

    showActionList
    timerList

    controlList 
    macheList
    showList
    startXlist;

    static xPosList = [
        -200, -250, -300, -400, -450, -500,
    ]

	public initObj(...args: any[]) {
        this.mParentNode = args[0]
		this.name = args[1]
		let x = args[2]
		let y = args[3]

        let parentWnd = args[4]
        let w = 500
        let h = 340

        this.rootWnd = null
        this.mElemList = {}
		let boxName = this.name;
        let mElemInfo: any = [
            { ["index_type"]: eui.Group, ["name"]: this.name, ["title"]: "", ["font"]: "ht_20_cc", ["color"]: gui.Color.white, ["x"]: x, ["y"]: y, ["w"]: w, ["h"]: h,},
               
        ]
        UiUtil.createElem(mElemInfo, this.mParentNode, this.mElemList, this, parentWnd)

        this.rootWnd = this.mElemList[boxName]
        this.timerList = []
        this.macheList = {}
        this.showActionList = {}
        this.startXlist = {}
	}

    destory() {
       
	}

    setVisible(b) {
		this.rootWnd.visible = (b)
	}

    //重新刷新
    onRefreshShow(list){
        for(let k in this.startXlist){
            this.startXlist[k] == null
        }

        this.onShowAction(list)
    }

    onShowAction(list){

        this.macheList = {}

        for(let k = 0; k < 6; k ++){
            let posList = [2, 1, 3]
            let pos = posList[k] || posList[k - 3]
            this.createAction(k, pos)

            let name = "action_" + k
            this.mElemList[name].visible = false

            if(this.timerList[k] != null){
                KillTimer(this.timerList[k])
                this.timerList[k] = null
            }
            this.showActionList[k].stop()
        }

        for(let k = 0; k < size_t(list); k++){
            let posList = [2, 1, 3]
            let pos = posList[k] || posList[k - 3]
            this.macheList[k] = list[k]
            this.refreshAction(k, pos, list[k])    
        }

    }

    createAction(k, pos){
        let name = "action_" + k
        if(this.mElemList[name] != null) return 
        let y = 120* (pos - 1)
        let x = EscortActionBox.xPosList[k]
        let _this = this


        let mElemInfo: any = [
            { ["index_type"]: eui.Group, ["name"]: name , ["title"]: "", ["font"]: "ht_20_cc", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: y, ["w"]: 200, ["h"]: 120,},
            { ["index_type"]: gui.Grid9Image, ["name"]: name + "_sprite", ["parent"] : name ,["title"]: "", ["iamge"]: "ty_uiDi02", ["font"]: "ht_20_cc", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: 200, ["h"]: 120,["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]:     this.onClickAction},
            { ["index_type"]: eui.Label, ["name"]: name + "_name",["parent"] : name , ["title"]: "", ["font"]: "ht_20_cc", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 80, ["w"]: 200, ["h"]: 20, ["messageFlag"]: true },
            { ["index_type"]: eui.Label, ["name"]: name + "_time", ["parent"] : name , ["title"]: "", ["font"]: "ht_20_cc", ["color"]: gui.Color.lime, ["x"]: 0, ["y"]: 100, ["w"]: 200, ["h"]: 20, ["messageFlag"]: true },
        ]
        UiUtil.createElem(mElemInfo, this.mParentNode, this.mElemList, this, this.rootWnd)

        let data: any = { ["startX"]: x, ["startY"]: y, ["endX"]: 560, ["endY"]: y,  ["moveType"]: "inertional", }
        let time = (data.endX - data.startX)/0.06

        if(this.showActionList[k] == null){
            let showAction = MoveAction.newObj(this.mElemList[name], time, data, function () {
                _this.recycleAction(k)
            }, this)

            this.showActionList[k] = showAction
        }else{
            this.showActionList[k].Data = data
        }
        this.showActionList[k].stop()
    }

    refreshAction(k, pos , config){
        let name = "action_" + k
        let _this = this
        let x = EscortActionBox.xPosList[k]

        let desColorList = [
          gui.Color.white, gui.Color.lime, gui.Color.blue,  gui.Color.purple, gui.Color.orange
        ]
        let color = desColorList[config.index - 1]
        this.mElemList[name + "_name"].textColor = color
        this.mElemList[name + "_name"].text = config.name

        if(_this.timerList[k] != null){
            KillTimer(_this.timerList[k])
             _this.timerList[k] = null
        }

        if(this.timerList[k] == null){
            this.timerList[k] = SetTimer( function(){
            let diff_time = config.time - GetServerTime()
            if(diff_time <= 0){
                _this.mElemList[name].visible = false
                _this.showActionList[k].stop()
                _this.showActionList[k].startX = x
                if(_this.timerList[k] != null){
                    KillTimer(_this.timerList[k])
                     _this.timerList[k] = null
                }        
            }else{
               // _this.mElemList[name].visible = true
                _this.mElemList[name + "_time"].text = getFormatDiffTimeSimple(diff_time)
             }
        }, this , 1000, true)
        }
/*
        if(this.startXlist[k] != null){
            if(this.mElemList[name].visible = false){
                this.showActionList[k].startX = x
            }else{
                this.showActionList[k].startX = this.startXlist[k]
            } 
        }*/

        this.showActionList[k].startX = x 
        this.showActionList[k].endX  = 560
        this.showActionList[k].time = (this.showActionList[k].endX - this.showActionList[k].startX)/0.06
        this.showActionList[k].run()

        this.mElemList[name].visible = true

        this.showActionList[k].run()
    }

    //跑完
    recycleAction(index){
       let showAction = <MoveAction>this.showActionList[index]

       let x = -200
       showAction.startX = x 
       showAction.endX  = 560
       showAction.time = (showAction.endX - showAction.startX)/0.06
       showAction.run()
    }

    //点击马车
    onClickAction(args){
        let name = args.target.name
        let index  = name.replace(/[^0-9]/ig, "");
        let config = this.macheList[index]
        if(config == null){
            return
        }
        let heroname = config.name
        
        let selfName = GetHeroProperty("name")

        if(heroname == selfName){
            MsgSystem.addTagTips(Localize_cns("ESCORT_BOX_TXT1"))
            return
        }

        let wnd = WngMrg.getInstance().getWindow("InterceptTipsFrame")
        wnd.onShowWnd(config)
    }

    setVisibleFalse(){
        this.setVisible(false)
        this.boxStop()
    }

    setVisibleTrue(){
        this.setVisible(true)
        this.boxRun()
    }

    boxStop(){
        for(let k in this.showActionList){
            let name = "action_" + k
            if(this.mElemList[name].visible = true){
                this.startXlist[k] = this.mElemList[name].x
            }else{
                this.startXlist[k] = null
            }

            this.showActionList[k].stop()
        }
    }

    boxRun(){
        for(let k in this.showActionList){
            if(this.mElemList["action_" + k].visible == true){
                this.showActionList[k].run()
            }
        }
    }
}