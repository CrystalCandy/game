class DailyXiYouWindow extends BaseCtrlWnd {
	mElemList
    scroll: UIScrollList;
    select 
    endIndex
    maxCount

	public initObj(...params: any[]) {
        this.select = -1
        this.endIndex = -1
        this.maxCount = -1
	}
    public onLoad(): void {
		this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
			{ ["name"]: "btn_upgrade", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onUpClick },
            { ["name"]: "btn_find", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onFindBack },
            { ["name"]: "btn_left", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onLeftClick },
            { ["name"]: "btn_right", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onRightClick },
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this)

        let group = <eui.Group>this.mElemList["group_scroll"]
		this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group)

        this.mElemList["rd_hp"].setAlignFlag(gui.Flag.LEFT_CENTER)
        this.mElemList["rd_att"].setAlignFlag(gui.Flag.LEFT_CENTER)
        this.mElemList["rd_def"].setAlignFlag(gui.Flag.LEFT_CENTER)
        this.mElemList["rd_judge"].setAlignFlag(gui.Flag.CENTER_CENTER)
	}

	public onUnLoad(): void {
        
	}

	public onShow(): void {
		this.mElemList["group_xiYou"].visible = true;
      //  this.mElemList["group_pro"].visible = false
        this.mElemList["title"].text = Localize_cns("DAILY_TXT4")
        
     //   this.mElemList["group_rd_1"].visible = false
       // this.mElemList["group_rd_2"].visible = true

		this.onRefresh()
        RpcProxy.call("C2G_XiyouLilian_Info")
         
	}

	public onHide(): void {
		this.mElemList["group_xiYou"].visible = false;
	}

    updateWnd(){
        this.onRefresh()
    }

    onRefresh(){

        let actInfo = GetActivity(ActivityDefine.Boss).getXiyouInfo()

        if(size_t(actInfo) == 0) return

        let level = actInfo.level || 0
        this.mElemList["label_lv"].text = "Lv: " + level
        

        let xiyouConfig = GameConfig.EveryDayLiLianUpConfig[level]
        let config = table_effect(xiyouConfig.effects)

        //属性显示 测试数据
        let hp  = config.maxhp
        let att = config.demage
        let def = config.hujia
        let hpStr = String.format(Localize_cns("DAILY_TXT5"),hp)
        AddRdContent(this.mElemList["rd_hp"], hpStr, "ht_20_cc")
        let attStr = String.format(Localize_cns("DAILY_TXT6"),att)
        AddRdContent(this.mElemList["rd_att"], attStr, "ht_20_cc")
        let defStr = String.format(Localize_cns("DAILY_TXT7"),def)
        AddRdContent(this.mElemList["rd_def"], defStr, "ht_20_cc")

        //战力
        let force = actInfo.force
        this.refreshForceNum(force)

        //奖励
        let prizeList = AnalyPrizeFormat(xiyouConfig.prize)
        this.onRefreshPrize(prizeList)

        let curexp = actInfo.curexp || 0
        let maxexp = xiyouConfig.exp
        UiUtil.updateProgress(this.mElemList["xiyou_pro"], curexp, maxexp)
        this.mElemList["label_progress"].text = curexp + "/" + maxexp

        let shapeConfig = GameConfig.DailyLiLianShapeConfig
        this.endIndex = -1
        for(let k in shapeConfig){
            let shape = shapeConfig[k]
            if(shape.level > level){
                if(this.endIndex == -1){
                    this.endIndex = tonumber(k)
                }
            }
            if(this.maxCount <= tonumber(k)){
                this.maxCount = tonumber(k)
            }
        }
        
        if(this.select == -1){
            this.select = 1
        }
        this.onRefreshChose()
        //
        this.refreshFrame()
    }

    onRefreshPrize(list){
        for(let i = 1; i <= size_t(list);i++){
            if(!this.mElemList["xiYouPrizeBox" + i]){
                this.mElemList["xiYouPrizeBox" + i] = UIItemBox.newObj(this.mLayoutNode, "xiYouPrizeBox" + i, 0, 0 ,this.mElemList["group_prize"])
            }
            let item = list[i-1]
            this.mElemList["xiYouPrizeBox" + i].updateByEntry(item[0], item[1])
        }
    }

    refreshFrame() {

		let taskList = GetActivity(ActivityDefine.Boss).getXiYouTaskList() //|| GameConfig.EveryDayLiLianTaskConfig

        if(size_t(taskList) == 0) return

        let group = <eui.Group>this.mElemList["group_scroll"]

		this.scroll.clearItemList()
	///	let list = []
        for (let i = 0; i < size_t(taskList); i++) {
			let v = taskList[i]
			let window = this.scroll.getItemWindow(i, group.width, 61, 0, 0)
			this.initItemWindow(window)
			this.refreshItemWindow(window, v, i)
		}
		this.scroll.refreshScroll()
	}

	initItemWindow(window) {
		let name = window.name
		let w = window.width
		let h = window.height

		let elemInfo = [
            { ["index_type"]: eui.Group, ["name"]: "groupTask_" + name, ["title"]: null, ["x"]: 0, ["y"]: 7, ["w"]: w, ["h"]: h,},
            { ["index_type"]: gui.Grid9Image, ["name"]: "bg_" + name, ["parent"]:"groupTask_" + name, ["title"]: null, ["image"] : "ty_uiDi03", ["x"]: 10, ["y"]: 0, ["w"]: w-20, ["h"]: h, ["messageFlag"]: true },
            { ["index_type"]: eui.Label, ["name"]: "name_" + name, ["parent"]:"groupTask_" + name, ["title"]: "", ["font"]:"ht_20_cc",["image"]: "", ["x"]: 0, ["y"]: 0, ["w"]: 147, ["h"]: h },
            { ["index_type"]: gui.RichDisplayer, ["name"]: "twice_" + name, ["parent"]:"groupTask_" + name, ["title"]: null, ["image"]: "", ["x"]: 147, ["y"]: 0, ["w"]: 123, ["h"]: h },
            { ["index_type"]: eui.Label, ["name"]: "exp_" + name, ["parent"]:"groupTask_" + name, ["title"]: "", ["font"]:"ht_20_cc",["image"]: "", ["x"]: 270, ["y"]: 0, ["w"]: 147, ["h"]: h },
            { ["index_type"]: gui.Button, ["name"]: "btn_" + name, ["parent"]:"groupTask_" + name, ["title"]: Localize_cns("TASK_PANEL_QIANWANG"), ["font"]:"ht_20_cc_stroke", ["color"]: gui.Color.white,["image"]: "ty_tongYongBt2", ["x"]: 450, ["y"]: 6, ["w"]: 94, ["h"]: 49 ,["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onGotoClick},
            { ["index_type"]: eui.Label, ["name"]: "finish_" + name, ["parent"]:"groupTask_" + name, ["title"]: Localize_cns("FINISHED"),["color"]: gui.Color.white, ["font"]:"ht_20_cc",["image"]: "", ["x"]: 450, ["y"]: 15, ["w"]: 94, ["h"]: 30 },
        ]
		UiUtil.createElem(elemInfo, this.mLayoutNode, this.mElemList, this, window)

        this.mElemList["twice_" + name].setAlignFlag(gui.Flag.CENTER_CENTER)
        this.mElemList["finish_" + name].visible = false
        this.mElemList["btn_" + name].visible = false
    
	}

	refreshItemWindow(window, data, index) {
        let name = window.name 
        //任务名字
        this.mElemList["name_" + name].text = data.name
        //任务次数
        let twiceColor = "#red"
        if(data.curTwice >= data.maxCount){
            twiceColor = "#green"
            this.mElemList["finish_" + name].visible = true
        }else{
            this.mElemList["btn_" + name].visible = true     
        }
        let twice = data.curTwice || 0
        AddRdContent(this.mElemList["twice_" + name], twiceColor + twice  + "/" + data.maxCount , "ht_20_cc")

        //单次经验
        this.mElemList["exp_" + name].text = data.exp + Localize_cns("DAILY_LILIAN_TXT1")
	}

    ///换模型
    onRefreshChose(){
        this.mElemList["btn_left"].visible = true
        this.mElemList["btn_right"].visible = true
        this.mElemList["image_yulan"].visible = false
        this.mElemList["image_jiHuo"].visible = true
        this.mElemList["rd_judge"].visible = false

        let tempConfig = GameConfig.DailyLiLianShapeConfig[this.select]
        
        if(this.select == 1){
            this.mElemList["btn_left"].visible = false
        }

        if(this.endIndex != -1){
            
            if(this.select == (this.endIndex - 1)){
                this.mElemList["image_yulan"].visible = true
            }
            if(this.select == this.endIndex ){
                this.mElemList["btn_right"].visible = false
                this.mElemList["image_jiHuo"].visible = false
                this.mElemList["rd_judge"].visible = true

                let str = String.format(Localize_cns("DAILY_JIHUO"),tempConfig.level)
                AddRdContent(this.mElemList["rd_judge"], str, "ht_20_cc", "red")
            }

        }else{
            if(this.select == this.maxCount){
                this.mElemList["btn_right"].visible = false
            }
        }



        this.mElemList["shape_name"].text = tempConfig.name

    }

    ///-- 战力
    refreshForceNum(force) {
        this.mElemList["bImage"].beginDraw();
        this.mElemList["bImage"].drawNumberString("zhanLi_", "z" + force, 0, 0, -3)
        this.mElemList["bImage"].endDraw();
    }

    ///------------响应事件
    onUpClick(){
        let actInfo = GetActivity(ActivityDefine.Boss).getXiyouInfo() 
        let xiyouConfig = GameConfig.EveryDayLiLianUpConfig[actInfo.level]
        if(xiyouConfig == null) return
        if(actInfo.curexp < xiyouConfig.exp) return
        //发送升级协议
        RpcProxy.call("C2G_XiyouLilian_ActiveLevelUp")
    }

    onGotoClick(args){
       let name = args.target.name;
	   let index  = name.replace(/[^0-9]/ig, "");

       let taskList = GetActivity(ActivityDefine.Boss).getXiYouTaskList()
       let task = taskList[index]
       if(task == null) return

       /*let wnd = WngMrg.getInstance().getWindow(task.finish[0])
       let tabIndex = task.finish[1]

       wnd.showWithIndex(tabIndex)*/
       
    }

    onFindBack(){
        let wnd : DailyFindBackFrame = WngMrg.getInstance().getWindow("DailyFindBackFrame")
        wnd.showWnd()
    }


    onLeftClick(){
        if(this.select <= 1) return
        this.select -= 1
        this.onRefreshChose()
    }

    onRightClick(){
        let endIndex = this.endIndex
        if(endIndex == -1)
        endIndex = this.maxCount
        if(this.select >= endIndex) return
        this.select += 1
        this.onRefreshChose()
    }
} // TypeScript file