// TypeScript file

class PlayerListFrame extends BaseWnd {


    clickCallback: Function;
    clickObj: any;

    public initObj(...params: any[]) {
        this.mLayoutPaths = ["layouts/PlayerListLayout.exml"]
    }

    public onLoad(): void {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        // this.setFullScreen(true)
        this.initSkinElemList();
        this.mLayoutNode.setLayer(gui.GuiLayer.Bottom)
        this.mLayoutNode.left = 0
        this.mLayoutNode.top = 350

        var elemInfo = [
            { ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },

        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

        let list: eui.List = this.mElemList["list"]
        list.itemRenderer = itemRender.PlayerListItem

    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        this.mLayoutNode.visible = true;

        //RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        RegisterEvent(EventDefine.PLAYER_ENTER_MAP, this.refreshFrame, this)
        RegisterEvent(EventDefine.PLAYER_LEAVE_MAP, this.refreshFrame, this)
        RegisterEvent(EventDefine.PLAYER_INFO_UPDATE, this.refreshFrame, this)
        RegisterEvent(EventDefine.ROBBER_TEMPLE_APPEAR, this.refreshFrame, this)

        //this.switchListGroup(false)
        this.refreshFrame();

    }

    public onHide(): void {
        //UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        UnRegisterEvent(EventDefine.PLAYER_ENTER_MAP, this.refreshFrame, this)
        UnRegisterEvent(EventDefine.PLAYER_LEAVE_MAP, this.refreshFrame, this)
        UnRegisterEvent(EventDefine.PLAYER_INFO_UPDATE, this.refreshFrame, this)
        UnRegisterEvent(EventDefine.ROBBER_TEMPLE_APPEAR, this.refreshFrame, this)

        this.mLayoutNode.visible = false;

        //this.clickCallback = null;
        //this.clickObj = null;
    }

    // switchListGroup(b: boolean) {
    //     this.mElemList["btn_show"].selected = !!b;
    //     this.refreshFrame()
    // }



    refreshFrame() {
        let count = 0
        let show_list = []
        let player_list = ActorManager.getInstance().getPlayerList()
        for (let _ in player_list) {
            let player = player_list[_]

            let info = player.getPropertyInfo()
            //if(bit.band(info.status, opStatusType.STATUS_ROBBER_DEAD) != opStatusType.STATUS_ROBBER_DEAD ){
            JsUtil.arrayInstert(show_list, player)
            //}
            count++;
            if(count >= 30)
                break;
        }
        //let count = size_t(show_list)
        // //let count = size_t(list)

        // let count = 0
        // let show_list = []
        // for (let _ in list) {
        //     let v = list[_]
        //     show_list.push(v)
        //     count++;

        //     if (count >= 30)
        //         break;
        // }

        show_list.sort(function (a, b) {
            return a.id - b.id
        })

        let listbox: eui.List = this.mElemList["list"]
        UiUtil.updateList(listbox, show_list);


        // let bSelected = this.mElemList["btn_show"].selected
        // this.mElemList["group_list"].visible = bSelected


    }



    // onClickShowBtn(event: egret.Event) {
    //     this.refreshFrame()
    // }


    // onMouseDown(args: GameTouchEvent) {
    //     let group = <eui.Group>this.mElemList["group_list"]
    //     if (group.visible == false)
    //         return;
    //     let target = args.touchEvent.target;
    //     let isExclude = UiUtil.isExcludeChild(target, [this.mLayoutNode])
    //     if (isExclude) {
    //         this.switchListGroup(false)
    //     }
    // }



    showPlayerList(callback, obj) {
        this.clickCallback = callback
        this.clickObj = obj
        this.showWnd()
    }



}


module itemRender {
    export class PlayerListItem extends eui.ItemRenderer {
        mElemList: any;

        constructor() {
            super();
            this.mElemList = {}

            let name = "item"
            let mElemInfo: any = [
                { ["index_type"]: gui.Grid9Image, ["name"]: "line", ["image"]: "cz_uiLine01", ["x"]: 0, ["y"]: 3, ["w"]: 200, ["h"]: 2, ["event_name"]: null, ["fun_index"]: null, ["messageFlag"]: true, },
                { ["index_type"]: eui.Label, ["name"]: "name", ["title"]: Localize_cns("TYPE_ACC_INFO"), ["font"]: "ht_16_lc_stroke", ["color"]: gui.Color.white, ["x"]: 80, ["y"]: 16, ["w"]: 120, ["h"]: 25, ["event_name"]: null, ["fun_index"]: null, ["messageFlag"]: true, },
                { ["index_type"]: eui.Label, ["name"]: "level", ["title"]: "Lv 24", ["font"]: "ht_16_lc_stroke", ["color"]: gui.Color.white, ["x"]: 80, ["y"]: 45, ["w"]: 70, ["h"]: 25, ["event_name"]: null, ["fun_index"]: null, ["messageFlag"]: true, },


                { ["index_type"]: eui.Label, ["name"]: "event", ["title"]: null, ["x"]: 0, ["y"]: 0, ["percentWidth"]: 100, ["percentHeight"]: 100, ["event_name"]: gui.TouchEvent.TOUCH_SHORT, ["fun_index"]: this.onClickPlayer },
                //{ ["index_type"]: gui.Button, ["name"]: "attack", ["image"]: "ty_tongYongBt07", ["title"]: Localize_cns("FIGHT_ATTACK_TITLE"), ["font"]: "ht_20_cc_stroke", ["color"]: gui.Color.white, ["x"]: 150, ["y"]: 40, ["w"]: 50, ["h"]: 50, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickAttackBtn },
            ]
            //UiUtil.createElem(mElemInfo, this, this.mElemList, this)

            let iconSize = 20
            for (let i = 1; i <= 3; i++) {
                let info: any = { ["index_type"]: eui.Image, ["name"]: name + "_statusicon" + i, ["parent"]: null, ["title"]: null, ["font"]: "ht_24_cc_stroke", ["image"]: "TB_duiZhang", ["color"]: gui.Color.white, ["bAdapteWindow"]: true, ["x"]: 75 + iconSize * (i - 1), ["y"]: 70, ["w"]: iconSize, ["h"]: iconSize, ["event_name"]: null, ["fun_index"]: null, ["messageFlag"]: true, }
                JsUtil.arrayInstert(mElemInfo, info)
            }
            UiUtil.createElem(mElemInfo, this, this.mElemList, this)

            this.mElemList["petBox"] = UIPetBox.newObj(this, "petBox", 0, 6, this, 0.6);
            //this.mElemList["attack"].visible = false;
        }

        updateStatusIcon(name, index, imageName) {
            if (this.mElemList[name + "_statusicon" + index]) {
                this.mElemList[name + "_statusicon" + index].source = (imageName)
            }
        }

        protected dataChanged(): void {

            let player = this.data;

            let playerInfo = player.getPropertyInfo()

            this.mElemList["petBox"].updateByEntryAndSex(playerInfo.vocation, playerInfo.sexId, playerInfo.id)


            this.mElemList["name"].text = (playerInfo.name)
            this.mElemList["level"].text = ("Lv." + playerInfo.level)

            let name = "item"

            //this.mElemList["attack"].visible = configRobber.mapId == MapSystem.getInstance().getMapId();

            for (let i = 1; i <= 3; i++) {
                this.mElemList[name + "_statusicon" + i].source = ("")
            }

            //TLog.Debug("PlayerListFrame.refreshItemWindow", playerInfo.status)
            if (playerInfo.status) {
                let index = 1
                if (bit.band(playerInfo.status, opStatusType.STATUS_TYPE_ROBBER_BBOX) == opStatusType.STATUS_TYPE_ROBBER_BBOX) {
                    this.updateStatusIcon(name, index, PlayerStatusToImage[opStatusType.STATUS_TYPE_ROBBER_BBOX])
                    index = index + 1
                }

                if (bit.band(playerInfo.status, opStatusType.STATUS_TYPE_TICKET) == opStatusType.STATUS_TYPE_TICKET) {
                    this.updateStatusIcon(name, index, PlayerStatusToImage[opStatusType.STATUS_TYPE_TICKET])
                    index = index + 1
                }

                if (bit.band(playerInfo.status, opStatusType.STATUS_TYPE_FACT_WAR) == opStatusType.STATUS_TYPE_FACT_WAR) {
                    this.updateStatusIcon(name, index, PlayerStatusToImage[opStatusType.STATUS_TYPE_FACT_WAR])
                    index = index + 1
                }

                let smallTempleCount = playerInfo.smallTempleCount || 0
                if (smallTempleCount > 0) {
                    this.updateStatusIcon(name, index, "TB_shenXiang01")
                    index = index + 1
                }

                let bigTempleCount = playerInfo.bigTempleCount || 0
                if (bigTempleCount > 0) {
                    this.updateStatusIcon(name, index, "TB_shenXiang02")
                    index = index + 1
                }

            }




        }



        onClickPlayer(args) {
            let player = this.data;
            let playerInfo = player.getPropertyInfo()

            let window = WngMrg.getInstance().getWindow("PlayerListFrame")
            if (window.clickCallback) {
                window.clickCallback.call(window.clickObj, playerInfo.id)
            }

        }

    }

}