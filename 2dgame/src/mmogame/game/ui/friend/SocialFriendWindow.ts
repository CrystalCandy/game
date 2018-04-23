// TypeScript file


class SocialFriendWindow extends BaseCtrlWnd {
    mElemList;
    scroll: UIScrollList;

    public initObj(...params: any[]): void {

    }

    public onLoad(): void {

        this.mElemList = this.mParentWnd.mElemList;

        var elemInfo = [
            { ["name"]: "input_edit", ["title"]: "", ["prompt"]: Localize_cns("INPUT_FRIEND_NAME_OR_ID"), ["font"]: "ht_22_lc", ["image"]: null, ["color"]: gui.Color.white, ["event_name"]: null, ["fun_index"]: null, },
            { ["name"]: "btn_search", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onClickSearchFriend },
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

        let group = <eui.Group>this.mElemList["friend_scroll_wnd"]
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "friend_scroll", 10, 5, group.width - 20, group.height - 10, group)
    }

    public onUnLoad(): void {
    }

    public onShow(): void {
        RegisterEvent(EventDefine.FRIEND_LIST_UPDATE, this.refresh, this)
        RegisterEvent(EventDefine.APPLY_TO_FRIEND, this.refresh, this)
        RegisterEvent(EventDefine.FRIEND_ONOFF_LINE, this.refresh, this)
        RegisterEvent(EventDefine.SENT_POWER_LIST, this.refresh, this)

        this.mElemList["friend_wnd"].visible = true;
        this.mElemList["tips_rd"].visible = true;

        this.refresh()
    }

    public onHide(): void {
        UnRegisterEvent(EventDefine.FRIEND_LIST_UPDATE, this.refresh, this)
        UnRegisterEvent(EventDefine.APPLY_TO_FRIEND, this.refresh, this)
        UnRegisterEvent(EventDefine.FRIEND_ONOFF_LINE, this.refresh, this)
        UnRegisterEvent(EventDefine.SENT_POWER_LIST, this.refresh, this)

        this.mElemList["friend_wnd"].visible = false;
        this.mElemList["tips_rd"].visible = false;

        this.mElemList["input_edit"].text = ""
    }

    refresh() {
        let friendList = FriendSystem.getInstance().getFriendInfoList()

        let onlineSortList = []
        let offLineSortList = []
        for (let friendId in friendList) {
            let friendInfo = friendList[friendId]

            let t: any = {}
            t.friendId = friendId
            t.friendInfo = friendInfo

            if (friendInfo.isOnline == 0) {
                JsUtil.arrayInstert(offLineSortList, t)
            } else {
                JsUtil.arrayInstert(onlineSortList, t)
            }
        }

        // 排序在线好友
        table_sort(onlineSortList, function (a, b) {
            return b.friendInfo.level - a.friendInfo.level
        })

        // 排序离线好友
        table_sort(offLineSortList, function (a, b) {
            return b.friendInfo.level - a.friendInfo.level
        })

        onlineSortList = table_merge(onlineSortList, offLineSortList)

        this.scroll.clearItemList()
        let group = <eui.Group>this.mElemList["friend_scroll_wnd"]
        for (let i in onlineSortList) {
            let v = onlineSortList[i]

            let window = this.scroll.getItemWindow(tonumber(i), group.width - 20, 130, 0, 0, 0)
            this.initItemWindow(window)
            this.refreshItemWindow(window, v)
        }
        this.scroll.refreshScroll()

        //人数
        let str = Localize_cns("DELETE_FRIEND_TIPS") + "#br"
        str = str + String.format(Localize_cns("FRIEND_COUNT"), size_t(onlineSortList), size_t(onlineSortList) - size_t(offLineSortList))
        AddRdContent(this.mElemList["tips_rd"], str, "ht_24_cc", "ublack", 6)
    }

    initItemWindow(window) {
        let name = window.name
        let w = window.width
        let h = window.height

        let Info: any = [
            { ["index_type"]: eui.Group, ["name"]: name + "_group", ["x"]: 0, ["y"]: 0, ["w"]: w, ["h"]: h },
            { ["index_type"]: gui.Grid9Image, ["name"]: name + "_bg", ["parent"]: name + "_group", ["image"]: "ty_uiDi03", ["x"]: 0, ["y"]: 0, ["w"]: w, ["h"]: h, ["messageFlag"]: true },
            //头像
            { ["index_type"]: gui.Grid9Image, ["name"]: name + "_icon_bg", ["parent"]: name + "_group", ["image"]: "ty_renWuKuang01", ["x"]: 10, ["y"]: h - 128, ["w"]: 140, ["h"]: 140, ["messageFlag"]: true },
            { ["index_type"]: gui.Grid9Image, ["name"]: name + "_icon", ["parent"]: name + "_icon_bg", ["image"]: "zctx_90001", ["x"]: 4, ["y"]: 0, ["w"]: 140, ["h"]: 140, ["messageFlag"]: true },

            //名字等级
            { ["index_type"]: gui.RichDisplayer, ["name"]: name + "_name_rd", ["parent"]: name + "_group", ["x"]: 155, ["y"]: 35, ["w"]: 250, ["h"]: 60, ["event_name"]: null, ["fun_index"]: null, },

            { ["index_type"]: gui.Button, ["name"]: "chatBtn", ["image"]: "ty_tongYongBt2", ["title"]: Localize_cns("LIAO_TIAN"), ["font"]: "ht_20_cc_stroke", ["color"]: gui.Color.white, ["x"]: 436, ["y"]: 40, ["w"]: 94, ["h"]: 49, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onChatBtnClick, },
        ]
        UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window)
    }

    refreshItemWindow(window, data) {
        let name = window.name
    }

    onChatBtnClick(args) {
        alert('hello world in TypeScript!');
        // let friendInfo = this.data.friendInfo
        // let roleId = tonumber(friendInfo.roleId)
        // let body = friendInfo.body
        // let name = friendInfo.roleName

        // let window = WngMrg.getInstance().getWindow("FriendChatFrame")
        // window.loadWnd()
        // window.showFriendChatFrame(roleId, name, body)
        // ChatWithPlayer(roleId, name)

        // GameSound.getInstance().playEffect(SystemSound.effect_btnClick)
    }

    onClickSearchFriend(args) {
        let edit = this.mElemList["input_edit"]
        let bEmpty = StringUtil.isEmpty(edit.text)
        if (bEmpty) {
            return
        } else {
            FriendSystem.getInstance().searchPlayerByName(edit.text)
        }
    }
}


module itemRender {
    export class SocialFriendItem extends eui.ItemRenderer {
        mElemList: any;
        constructor() {
            super();

            this.mElemList = {}

            let width = 560, height = 125

            let Info: any = [
                //背景
                { ["index_type"]: gui.Grid9Image, ["name"]: "bg", ["title"]: null, ["font"]: null, ["image"]: "ty_uiDi03", ["color"]: null, ["x"]: 0, ["y"]: 0, ["w"]: width, ["h"]: height, ["event_name"]: null, ["fun_index"]: null, },
                // { ["index_type"]: gui.Grid9Image, ["name"]: "bg2", ["title"]: null, ["font"]: null, ["image"]: "ty_UIDi05", ["color"]: null, ["x"]: 430, ["y"]: 36, ["w"]: 115, ["h"]: 84, ["event_name"]: null, ["fun_index"]: null, },

                //名字等级
                { ["index_type"]: eui.Label, ["name"]: "friend_name_level", ["title"]: "Test1", ["font"]: "ht_24_lc", ["image"]: null, ["color"]: gui.Color.saddlebrown, ["x"]: 126, ["y"]: 35, ["w"]: 400, ["h"]: 30, ["event_name"]: null, ["fun_index"]: null, },

                ////缘分
                { ["index_type"]: eui.Label, ["name"]: "yuanFen", ["title"]: Localize_cns("YUAN_FEN_ZHI"), ["font"]: "ht_20_lc", ["image"]: null, ["color"]: gui.Color.ublack, ["x"]: 126, ["y"]: 70, ["w"]: 200, ["h"]: 20, ["event_name"]: null, ["fun_index"]: null, },
                { ["index_type"]: eui.Label, ["name"]: "yuanFenChenhao", ["title"]: Localize_cns("FRIEND_YUANFEN_STAR5"), ["font"]: "ht_20_lc", ["image"]: null, ["color"]: gui.Color.ublack, ["x"]: 200, ["y"]: 70, ["w"]: 200, ["h"]: 20, ["event_name"]: null, ["fun_index"]: null, },
                //
                ////上次登录时间
                //{["index_type"] : gui.ControlType.Label,						["name"] : "lastLoginTime",  	  ["title"] : Localize_cns("FRIEND_LAST_LOGIN_TIME3"), ["font"] : "ht_18_lc",   ["image"] : null,   ["color"] : gui.Color.ublack,		["x"] : 270, 		["y"] : 11,	["w"] : 200,["h"] : 20,["event_name"] : null, ["fun_index"] : null,},
                //

                //-长按短按事件响应
                { ["index_type"]: eui.Group, ["name"]: "eventRec", ["title"]: "", ["font"]: null, ["image"]: null, ["color"]: null, ["x"]: 120, ["y"]: 0, ["w"]: width - 120, ["h"]: height, ["event_name"]: gui.TouchEvent.TOUCH_LONG, ["fun_index"]: this.onClickDeleteFriend, },

                // { ["index_type"]: gui.Button, ["name"]: "tiliBtn", ["bAdapteWindow"]: true, ["image"]: "ty_tongYongBt19", ["title"]: Localize_cns("SONG_TI_LI"), ["font"]: "ht_20_cc_stroke", ["color"]: gui.Color.white, ["x"]: 377, ["y"]: 39, ["w"]: 78, ["h"]: 78, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onTiliBtnClick, },
                { ["index_type"]: gui.Button, ["name"]: "chatBtn", ["bAdapteWindow"]: true, ["image"]: "ty_tongYongBt2", ["title"]: Localize_cns("LIAO_TIAN"), ["font"]: "ht_20_cc_stroke", ["color"]: gui.Color.white, ["x"]: 450, ["y"]: 40, ["w"]: 94, ["h"]: 49, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onChatBtnClick, },
            ]
            UiUtil.createElem(Info, this, this.mElemList, this)
            //this.mElemList[ "eventRec"].addEventListener(gui.TouchEvent.TOUCH_SHORT, this.showFriendInfo, this)
            //this.mElemList[ "eventRec"].addEventListener(gui.Window.MouseDownEvent, this.onPlayEffect, this)
            //this.mElemList["lastLoginTime"].visible = (false)

            this.mElemList["petBox"] = UIPetBox.newObj(this, "petBox", 20, 20, this.mElemList["bg"])

        }

        protected dataChanged(): void {



            let friendId = this.data.friendId
            let friendInfo = this.data.friendInfo

            //存在则显示它,注意z顺序与定义顺序一致

            this.mElemList["friend_name_level"].text = (friendInfo.roleName + "  " + "Lv " + friendInfo.level)
            //let str = String.format(Localize_cns("YUAN_FEN_ZHI"),friendInfo.friendShip)
            //this.mElemList["yuanFen"].text = (str)


            let friendShipValue: any = {
                [1]: [0, 200],
                [2]: [200, 500],
                [3]: [500, 1200],
                [4]: [1200, 2500],
                [5]: [2500],
            }

            let LastLoginTime: any = {
                [1]: [1, 60],
                [2]: [60, 21600],
                [3]: [21600],
            }

            let frendship = friendInfo.friendShip
            //let frendship=100
            for (let _k in friendShipValue) {
                let k = tonumber(_k)
                let v = friendShipValue[k]

                if (k == size_t(friendShipValue)) {
                    if (frendship >= v[0]) {
                        this.mElemList["yuanFenChenhao"].text = (String.format(Localize_cns("FRIEND_YUANFEN_STAR" + k), frendship))
                    }
                } else {
                    if (frendship >= v[0] && frendship < v[1]) {
                        this.mElemList["yuanFenChenhao"].text = (String.format(Localize_cns("FRIEND_YUANFEN_STAR" + k), frendship))
                    }

                }

            }

            this.mElemList["petBox"].updateByEntryAndSex(friendInfo.vocation, friendInfo.sexId, friendInfo.roleId)
            this.mElemList["petBox"].setEnable(friendInfo.isOnline == 1)

            // let list = FriendSystem.getInstance().getSentPowerList()
            // if (list[friendInfo.roleId]) {
            //     this.mElemList[name + "tiliBtn"].enabled = (false)
            // } else {
            //     this.mElemList[name + "tiliBtn"].enabled = (true)
            // }
        }


        ////////////////////////////////-响应函数////////////////////////

        onClickDeleteFriend(args) {
            // let friendInfo = this.data.friendInfo

            // let window = WngMrg.getInstance().getWindow("DeleteFriendFrame")
            // window.setDeleteTypeAndShow(1, tonumber(friendInfo.roleId))
        }

        // onTiliBtnClick(args) {
        //     let friendInfo = this.data.friendInfo
        //     let roleId = tonumber(friendInfo.roleId)
        //     FriendSystem.getInstance().handselPowerToFriend([roleId])
        // }


        onChatBtnClick(args) {
            alert('hello world in TypeScript!');
            // let friendInfo = this.data.friendInfo
            // let roleId = tonumber(friendInfo.roleId)
            // let body = friendInfo.body
            // let name = friendInfo.roleName

            // let window = WngMrg.getInstance().getWindow("FriendChatFrame")
            // window.loadWnd()
            // window.showFriendChatFrame(roleId, name, body)
            // ChatWithPlayer(roleId, name)

            // GameSound.getInstance().playEffect(SystemSound.effect_btnClick)
        }





    }
}