
class RankFrame extends BaseWnd {

    emptyView: UIEmptyView;
    tabWndList: UITabWndList;
    tabIndex: number;
    scroll : UIScrollList
    radio_data;

    public initObj(...params: any[]) {
        this.mLayoutPaths = ["layouts/RankLayout.exml"]
        this.tabIndex = -1;
    }

    public onLoad(): void {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.initSkinElemList();
        this.setFullScreen(true)

        var elemInfo = [
			{ ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
			{ ["name"]: "btn_close_top", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
		];
		UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

        // 
        let group : eui.Group = this.mElemList["group_tab"]
		this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group, UIScrollList.DIR_VERTICAL)

        let tabInfoList = [
            {index: 0,  wnd: RankPlrForcelWnd.newObj(this.mLayoutNode, this, configRankType.RANK_PLR_FORCE) ,titleText: Localize_cns("RANK_TXT6"),},
            {index: 1,  wnd: RankPlrLevelWnd.newObj(this.mLayoutNode, this, configRankType.RANK_PLR_LEVEL) ,titleText: Localize_cns("RANK_TXT7"),},
            {index: 2,  wnd: RankPetWnd.newObj(this.mLayoutNode, this, configRankType.RANK_PET_FORCE) ,titleText: Localize_cns("RANK_TXT8"),},
            {index: 3,  wnd: RankXianlvlWnd.newObj(this.mLayoutNode, this, configRankType.RANK_XIAN_LV) ,titleText: Localize_cns("RANK_TXT9"),},
            {index: 4,  wnd: RankRidelWnd.newObj(this.mLayoutNode, this, configRankType.RANK_RIDE),titleText: Localize_cns("RANK_TXT10"), },
            {index: 5,  wnd: RankWingWnd.newObj(this.mLayoutNode, this, configRankType.RANK_WING) ,titleText: Localize_cns("RANK_TXT11"),},
            {index: 6,  wnd: RankTianxianWnd.newObj(this.mLayoutNode, this , configRankType.RANK_TIAN_XIAN) ,titleText: Localize_cns("RANK_TXT12"),},
            {index: 7,  wnd: RankImmortalsWnd.newObj(this.mLayoutNode, this, configRankType.RANK_PLR_IMMORTALS) ,titleText: Localize_cns("RANK_TXT13"),}, 
            //法阵、仙位、通灵、兽魂、天女、仙器、花辇、灵气排行
            {index: 8,  wnd: RankFaZhenWnd.newObj(this.mLayoutNode, this, configRankType.RANK_FA_ZHEN) ,titleText: Localize_cns("RANK_TXT14"),},
            {index: 9,  wnd: RankXianWeiWnd.newObj(this.mLayoutNode, this, configRankType.RANK_XIAN_WEI) ,titleText: Localize_cns("RANK_TXT15"),},
            {index: 10,  wnd: RankTongLingWnd.newObj(this.mLayoutNode, this, configRankType.RANK_TONG_LING) ,titleText: Localize_cns("RANK_TXT16"),},
            {index: 11,  wnd: RankShouHunWnd.newObj(this.mLayoutNode, this, configRankType.RANK_SHOU_HUN) ,titleText: Localize_cns("RANK_TXT17"),},
            {index: 12,  wnd: RankTianNvWnd.newObj(this.mLayoutNode, this, configRankType.RANK_TIAN_NV),titleText: Localize_cns("RANK_TXT18"), },
            {index: 13,  wnd: RankXianQiWnd.newObj(this.mLayoutNode, this, configRankType.RANK_XIAN_QI) ,titleText: Localize_cns("RANK_TXT19"),},
            {index: 14,  wnd: RankHuaNianWnd.newObj(this.mLayoutNode, this , configRankType.RANK_HUAN_NIAN) ,titleText: Localize_cns("RANK_TXT20"),},
            {index: 15,  wnd: RankLingQigWnd.newObj(this.mLayoutNode, this, configRankType.RANK_LING_QI) ,titleText: Localize_cns("RANK_TXT21"),}, 
        ]
       
        this.radio_data = []
        for (let i = 0; i < size_t(tabInfoList); i++) {
            let v = tabInfoList[i]
            let window = this.scroll.getItemWindow(v.index, 155, 71, 0, 0, 0)
            this.initItemWindow(window , v)
            this.refreshItemWindow(window, v)
        }

        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, this.radio_data)
        
        //this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList)


        this.mElemList["actorview"] = UIActorView.newObj(this.mLayoutNode, "actorview", 0, 0, this.mElemList["group_actorview"])
        this.mElemList["actorview2"] = UIActorView.newObj(this.mLayoutNode, "actorview", 0, 0, this.mElemList["group_actorview"])
        //this.mElemList["actorview"].updateByPlayer(20001)

        let list:eui.List = this.mElemList["list_rank"]
        list.itemRenderer = itemRender.RankItem
    }


    public onUnLoad(): void {

    }

    public onShow(): void {
      
        this.mLayoutNode.visible = true;
        this.tabWndList.setWndVisible(true);
        if (this.tabIndex != -1) {
            this.tabWndList.changeTabWithIndex(this.tabIndex)
        }

    }

    public onHide(): void {
       
        this.mLayoutNode.visible = false;
        this.tabWndList.setWndVisible(false);
    }

    initItemWindow(window,data){
		let name = window.name
		let imageName = "sd_biaoQian02"
		let imageDownName = "sd_biaoQian01"
		let width = 155, height = 71
		let Info: any = [
               //背景
			   	{ ["index_type"]: eui.Group, ["name"]: name+"bg" , ["image"]: "", ["x"]: 0, ["y"]: 0, ["w"]: width, ["h"]: height, ["messageFlag"]: true },
				{ ["index_type"]: eui.RadioButton, ["name"]: name , ["image"]:imageName, ["font"]: "ht_20_cc_stroke",["image_down"]:imageDownName, ["x"]: 0, ["y"]: 0, ["w"]: width, ["h"]: height, ["event_name"]: null, ["fun_index"]: null},
			     { ["index_type"]: eui.Label, ["name"]: name + "text", ["parent"]: name, ["title"]: "", ["font"]: "ht_24_cc_stroke", ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: width, ["h"]: height, ["messageFlag"]: true },
                ]	
        UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window)
	}

	refreshItemWindow(window, data){
		let name = window.name
		data.name = name
        this.mElemList[name+"text"].text = data.titleText
		table_insert(this.radio_data,data)
	}
    ////////////////////////////////////////////////////////////////////////////////////
	//以0开头，0是第一个标签
    showWithIndex(index?) {
        if (index == null) {
            index = 0
        }
        this.tabIndex = index;
        this.showWnd();
    }
}
