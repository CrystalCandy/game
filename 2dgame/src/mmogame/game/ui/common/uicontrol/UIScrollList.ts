


class UIScrollList extends TClass {
    mParentNode:eui.UIComponent;
    name:string;
    mElemList:any;

    static DIR_VERTICAL = 1
    static DIR_HORIZON = 2

    contentGroup:eui.Group;
    scroller:gui.Scroller;
    dir:number;

    scrollH:number;
    scrollV:number;

    public initObj(...args: any[]): void {
		this.mParentNode = args[0]
		this.name = args[1]
		let x = args[2]
		let y = args[3]
        let w = args[4]
        let h = args[5]
		let parentWnd = args[6]
        this.dir = UIScrollList.DIR_VERTICAL
        if (args[7] != null){
            this.dir = args[7]
        }

        this.mElemList = {};

        let mElemInfo = [
			{["index_type"] : eui.Group,	      ["name"] : this.name + "_group",      ["percentWidth"] : 100 ,["percentHeight"] : 100		,["event_name"] : egret.TouchEvent.TOUCH_TAP, ["fun_index"] :null},		
            {["index_type"] : gui.Scroller,	      ["name"] : this.name,  		        ["viewport"]:this.name + "_group",		["x"] : x, ["y"] : y,		 			["w"] : w ,["h"] : h		,["event_name"] : null, ["fun_index"] :null},		
		]
        UiUtil.createElem(mElemInfo, this.mParentNode, this.mElemList, this, parentWnd);


        let layout:eui.LayoutBase = null;
        let group:eui.Group = this.mElemList[this.name + "_group"]

        if(this.dir == UIScrollList.DIR_VERTICAL){
            layout  = new eui.VerticalLayout();
        }else{
            layout = new eui.HorizontalLayout();
        }
        
        group.layout = layout;

        this.contentGroup = group;
        this.scroller = this.mElemList[this.name]
        this.scroller.bounces = false;

        this.scrollH = 0
        this.scrollV = 0
    }

    destory() {

	}

    saveViewXY(){
        let viewport = this.scroller.viewport
        this.scrollH = viewport.scrollH
        this.scrollV = viewport.scrollV
    }

    

    restoreViewXY(){
        let viewport = this.scroller.viewport
        viewport.scrollH = this.scrollH
        viewport.scrollV = this.scrollV

    }

    clearItemList(){
        this.contentGroup.removeChildren();
    }

    setVisible(b: boolean) {
        this.contentGroup.visible = b
    }

    getItemWindow(index:number, itemWidth?, itemHeight?, biasX?, biasY?, spaceY?):eui.Group{
        let group = <eui.Group>this.contentGroup.getChildByName("group" + index)
        if(group != null){
            return group;
        }

        biasX = biasX || 0
        biasY = biasY || 0
        spaceY = biasY || 0

        itemWidth = checkNull(itemWidth, 0)
        itemHeight = checkNull(itemHeight, 0)

        group = UiUtil.createGroup("group" + index, itemWidth, itemHeight, this.contentGroup)
        group.x = biasX;
        group.y = biasY;

        return group;
    }




    refreshScroll(noAnim?, reset?){

    }


    getWidth(){
        return this.contentGroup.width
    }

    getHeight(){
        this.contentGroup.height;
    }

    // makeSureShowIndex(index:number){
    //     if(this.contentGroup.numChildren <= 0)
    //         return;

    //     let group:eui.Group = <eui.Group>this.contentGroup.getChildAt(index);
    //     if(group == null)
    //         return;
    //     let viewport = this.scroller.viewport
    //     viewport.validateNow();

    //     if(this.dir == UIScrollList.DIR_VERTICAL){

    //     }else{
    //         let beginx = group.x;
    //         let endx = beginx + group.width;
    //         let center = (beginx + endx) / 2
    //         let viewportright = viewport.scrollH + viewport.width
    //         let byleft = (center < viewport.scrollH)
    //         let byright = (center > viewportright)
    //         if (byleft){
    //             viewport.scrollH = beginx
    //             return
    //         }
    //         if (byright){
    //             viewport.scrollH = endx - viewport.width
    //             return
    //         }
    //     }

    // }

    moveToScrollIndex(index:number, anim?:boolean){
        if(this.contentGroup.numChildren <= 0)
            return;

        let group:eui.Group = <eui.Group>this.contentGroup.getChildAt(index);
        if(group == null)
            return;

        if(anim == null){
            anim = false;
        }

        let viewport = this.scroller.viewport
        viewport.validateNow();

        this.scroller.scrollToXY(group.x, group.y, anim)
    }

    moveRelativeItemWindow(relNumber?: number, anim?:boolean){
        relNumber = relNumber || 1
        let viewport = this.scroller.viewport
        let group:eui.Group = <eui.Group>this.contentGroup.getChildAt(0);
        if(group == null)
            return;

        let ww = group.width
        let wh = group.height

        if(this.dir == UIScrollList.DIR_VERTICAL){                              //上下滚动
            let curIndex = Math.floor(viewport.scrollV / wh)
            this.moveToScrollIndex(MathUtil.clamp(curIndex + relNumber, 0, this.contentGroup.numChildren - 1), anim)
        }else{                                                                  //左右滚动
            let curIndex = Math.floor(viewport.scrollH / ww)
            this.moveToScrollIndex(MathUtil.clamp(curIndex + relNumber, 0, this.contentGroup.numChildren - 1), anim)
        }
    }
}