/*
作者:
    liuziming
	
创建时间：
   2017.02.24(周五)

意图：
   生活场景，对玩家的相关操作界面
公共接口：
   
*/
class MainPlayerFrame extends BaseWnd {
    funcList: any = {
        ["xinxi"]: Localize_cns("TEAM_TXT25"),         //角色信息
        ["gerenzhuye"]: Localize_cns("PER_HOMEPAGE_TEXT"),  //个人主页
        ["songhua"]: Localize_cns("PER_HOMEPAGE_TEXT8"), //送花
        ["tianjia"]: Localize_cns("TEAM_TXT26"),         //添加好友
        ["heimingdan"]: Localize_cns("ADD_BLACK"),          //加入黑名单
        ["xiaoxi"]: Localize_cns("TEAM_TXT27"),         //发送消息
        ["zudui"]: Localize_cns("TEAM_TXT41"),         //组队
        ["jiaru"]: Localize_cns("TEAM_TXT42"),         //加入队伍
        ["zhuanyang"]: Localize_cns("TEAM_TXT24"),         //转让队长
        ["tichu"]: Localize_cns("TEAM_TXT28"),        //踢出
        ["zhuanrxm"]: Localize_cns("UNION_TEXT24"),   //转让首领
        ["tichuxm"]: Localize_cns("UNION_TEXT25"),   //踢出血盟
        ["tichutt"]: Localize_cns("LADDER_TXT45"),   //踢出血盟
    }


    spacex: number;
    spacey: number;
    playerId: number;
    playerName: string;

    public initObj(...args: any[]): void {

    }

    onLoad() {
        this.createFrame()
    }

    onUnLoad() {

    }

    onShow() {
        RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (true)
        this.refreshFrame()
    }

    onHide() {
        UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        this.mLayoutNode.visible = (false)
    }

    ////////////////////////////////////////////////////////////////////-
    createFrame() {
        this.mLayoutNode.setLayer(gui.GuiLayer.Top)
        //UiUtil.setWH(this.mLayoutNode, 300, 300)

        let mElemInfo: any = [
            { ["index_type"]: gui.Grid9Image, ["name"]: "bg", ["image"]: "ty_xiTongTextBg", ["x"]: 0, ["y"]: 0, ["percentWidth"]: 100, ["percentHeight"]: 100, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
            { ["index_type"]: eui.Group, ["name"]: "group_content", ["x"]: 0, ["y"]: 0, ["percentWidth"]: 100, ["percentHeight"]: 100, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
        ]


        for (let k in this.funcList) {
            let v = this.funcList[k]
            let info = { ["index_type"]: gui.Button, ["name"]: k, ["parent"]: "group_content", ["image"]: "ty_tongYongBt20", ["title"]: v, ["font"]: "ht_20_cc_stroke", ["w"]: 110, ["h"]: 40, ["color"]: gui.Color.white, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickOption }
            mElemInfo.push(info)
        }

        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this)

        let group: eui.Group = this.mElemList["group_content"]

        var tLayout: eui.TileLayout = new eui.TileLayout();
        tLayout.paddingTop = 10;
        tLayout.paddingLeft = 10;
        tLayout.paddingRight = 10;
        tLayout.paddingBottom = 10;
        tLayout.requestedColumnCount = 2;
        group.layout = tLayout


    }

    refreshFrame() {
        let list = this.getPlayerStateList()//{"zhuanyang", "xinxi", "tianjia",  "tichu"}
        this.refreshFrameWithList(list)
    }

    refreshFrameWithList(list: string[]) {
        for (let index in this.funcList) {
            let v = this.funcList[index]

            UiUtil.setVisible(this.mElemList[index], false, false)
        }

        for (let i = 0; i < list.length; i++) {
            let index = list[i]
            UiUtil.setVisible(this.mElemList[index], true, true)
        }

        this.mLayoutNode.validateNow()


        let x = this.spacex, y = this.spacey

        x = MathUtil.clamp(x, 0, IGlobal.stageWidth - this.mLayoutNode.width)
        y = MathUtil.clamp(y, 0, IGlobal.stageHeight - this.mLayoutNode.height)
        UiUtil.setXY(this.mLayoutNode, x, y)

    }

    getPlayerStateList() {
        // let playerId = this.playerId

        let playerId = this.playerId
        let list = ["xinxi", "xiaoxi", "gerenzhuye"]

        if(IsInGlobalActvity() != null){				//跨服中
            return ["xinxi"]
        }

        //是否好友
        if (FriendSystem.getInstance().checkIsMyFriendByID(playerId) == false) {
            JsUtil.arrayInstert(list, "tianjia")
        }

        //是否黑名单
        if (FriendSystem.getInstance().checkPlayerInBlack(playerId) == false) {
            JsUtil.arrayInstert(list, "heimingdan")
        }

        //return list


        // //转让队长
        // if (HeroIsInTeam()) {
        //     if (HeroIsCaptain()) {
        //         if (PlayerIsInTeam(playerId)) {
        //             let memberInfo = TeamSystem.getInstance().getMemberInfo(playerId)
        //             if(memberInfo.status == ConfigTeamMemberStatus.ONLINE){
        //                 JsUtil.arrayInstert(list, "zhuanyang")
        //             }
        //             JsUtil.arrayInstert(list, "tichu")
        //         } else {
        //             let player = ActorManager.getInstance().getPlayer(playerId)
        //             if (player) {
        //                 let playerInfo = player.getPropertyInfo()
        //                 if (bit.band(playerInfo.status, opStatusType.STATUS_TYPE_TEAM) == 0) {
        //                     JsUtil.arrayInstert(list, "zudui")
        //                 }
        //             }
        //         }
        //     }
        // } else {							//组队
        //     let player = ActorManager.getInstance().getPlayer(playerId)
        //     if (player) {
        //         let playerInfo = player.getPropertyInfo()
        //         if (bit.band(playerInfo.status, opStatusType.STATUS_TYPE_TEAM) != 0 || bit.band(playerInfo.status, opStatusType.STATUS_TYPE_TEAMMATE) != 0 ) {
        //             JsUtil.arrayInstert(list, "jiaru")
        //         } else if (bit.band(playerInfo.status, opStatusType.STATUS_TYPE_TEAMMATE) == 0) {
        //             JsUtil.arrayInstert(list, "zudui")
        //         }
        //     }
        // }

        return list
    }
    ////////////////////////////////////////////////////////////-响应函数//////////////////////////////////////////////////////////////////////
    onClickOption(args: egret.TouchEvent) {
        let name = args.target.name;

        if (name == "zhuanyang") {
            let message = GetMessage(opCodes.C2G_TEAM_CAPTAIN)
            message.id = this.playerId || 0
            SendGameMessage(message)
        } else if (name == "xinxi") {					//个人信息
            GetPlayerInfo(this.playerId)
        } else if (name == "tianjia") {
            FriendSystem.getInstance().addFriend(this.playerId || 0)
        } else if (name == "xiaoxi") {
            // let player = ActorManager.getInstance().getPlayer(this.playerId || 0)
            // let window = WngMrg.getInstance().getWindow("FriendChatFrame")
            // if (player) {
            //     let playerInfo = player.getPropertyInfo()
            //     window.showFriendChatFrame(playerInfo.id, playerInfo.name, playerInfo.vocation)
            // } else {
            //     window.showFriendChatFrame(this.playerId)
            // }
            ChatWithPlayer(this.playerId, this.playerName)
        } else if (name == "tichu") {

            let plrId = this.playerId
            let message = GetMessage(opCodes.C2G_TEAM_KICK)
            message.id = plrId
            SendGameMessage(message)
            
        } else if (name == "zudui") {
            let [flag, str] = CheckMainFrameFunction("zudui")
            if (flag == false) {
                return MsgSystem.addTagTips(str)
            }

            //MsgSystem.addTagTips(Localize_cns("TEAM_TXT36"))

            let message = GetMessage(opCodes.C2G_TEAM_INVITE)
            message.id = this.playerId || 0
            SendGameMessage(message)
        } else if (name == "zhuanyang") {
            let message = GetMessage(opCodes.C2G_TEAM_APPLY)
            message.id = this.playerId || 0
            SendGameMessage(message)
        } else if (name == "jiaru") {
            let [flag, str] = CheckMainFrameFunction("zudui")
            if (flag == false) {
                return MsgSystem.addTagTips(str)
            }

            let message = GetMessage(opCodes.C2G_TEAM_APPLY)
            message.id = this.playerId || 0
            SendGameMessage(message)
        } else if (name == "gerenzhuye") {
            let wnd = WngMrg.getInstance().getWindow("PersonalHomepageFrame")
            wnd.showWithPlayerInfo(this.playerId, 2)
        } else if (name == "songhua") {
            let player = ActorManager.getInstance().getPlayer(this.playerId || 0)
            if (player) {
                let playerInfo = player.getPropertyInfo()
                let wnd = WngMrg.getInstance().getWindow("FlowersMainFrame")
                wnd.showWithPlayerInfo(playerInfo.id, playerInfo.name)
            } else if (this.playerId && this.playerName && this.playerName != "") {
                let wnd = WngMrg.getInstance().getWindow("FlowersMainFrame")
                wnd.showWithPlayerInfo(this.playerId, this.playerName)
            }
        } else if (name == "heimingdan") {
            let player = ActorManager.getInstance().getPlayer(this.playerId || 0)
            if (player) {
                let playerInfo = player.getPropertyInfo()
                if (FriendSystem.getInstance().checkIsMyFriendByID(this.playerId)) {
                    let t: IDialogCallback = {
                        onDialogCallback(result: boolean, userData): void {
                            if (result == true) {
                                FriendSystem.getInstance().addPlayerBlackList(playerInfo.id, playerInfo.name)
                            }
                        }
                    }
                    MsgSystem.confirmDialog(Localize_cns("ADD_FRIENDS_TO_BLACK_TIPS"), t, null)
                    return
                }
                FriendSystem.getInstance().addPlayerBlackList(playerInfo.id, playerInfo.name)
            } else if (this.playerId && this.playerName && this.playerName != "") {
                if (FriendSystem.getInstance().checkIsMyFriendByID(this.playerId)) {
                    let t: IDialogCallback = {
                        onDialogCallback(result: boolean, userData): void {
                            if (result == true) {
                                FriendSystem.getInstance().addPlayerBlackList(this.playerId, this.playerName)
                            }
                        }
                    }
                    MsgSystem.confirmDialog(Localize_cns("ADD_FRIENDS_TO_BLACK_TIPS"), t, null)
                    return
                }
                FriendSystem.getInstance().addPlayerBlackList(this.playerId, this.playerName)
            }
        }
        else if (name == "zhuanrxm") {
            if (TeamSystem.getInstance().checkPlayerIsCombatTeamByID(this.playerId) == false) {
                return
            }
            let message = GetMessage(opCodes.C2G_COMBATTEAM_ABDICATE)
            message.playerId = this.playerId || 0
            SendGameMessage(message)
        }
        else if (name == "tichuxm") {
            if (TeamSystem.getInstance().checkPlayerIsCombatTeamByID(this.playerId) == false) {
                return
            }
            let message = GetMessage(opCodes.C2G_COMBATTEAM_EXPEL)
            message.playerId = this.playerId || 0
            SendGameMessage(message)
        }else if(name == "tichutt" ){
            //天梯踢出队伍的操作
            let message = GetMessage(opCodes.C2G_LEAGUE_MATCH_KICK_TEAM)
            message.id = this.playerId || 0
            SendGameMessage(message)
        }

        return this.hideWnd()
    }

    onMouseDown(args: GameTouchEvent) {
        let target = args.touchEvent.target;

        if (UiUtil.isExcludeChild(target, [this.mLayoutNode])) {
            this.hideWnd()
        }
    }
    //////////////////////////////////////////////////////////////公共接口////////////////////////////////////
    showMainPlayerFrame(spacex, spacey, playerId, playerName?) {
        this.spacex = spacex
        this.spacey = spacey
        this.playerId = playerId
        this.playerName = playerName

        if (this.isVisible() == false) {
            return this.showWnd()
        } else {
            return this.refreshFrame()
        }
    }

    showMainPlayerFrameWithList(spacex, spacey, playerId, list, playerName?) {
        this.showMainPlayerFrame(spacex, spacey, playerId, playerName)						//{"", "", ""}
        this.refreshFrameWithList(list)
    }
}