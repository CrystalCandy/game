class MapFrame extends BaseWnd {
    scroll: UIScrollList;
    headControl: eui.Group;

    public initObj(...params: any[]) {
        this.mLayoutPaths = ["layouts/map/MapLayout.exml"]
    }

    public onLoad(): void {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true)
        this.initSkinElemList();
        this.setAlignCenter(true, true)

        var elemInfo = [
            { ["name"]: "btn_close", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.hideWnd },
            { ["name"]: "touch_wnd", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onMouseUp },
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);

        this.initMapWithConfig()
    }

    initMapWithConfig() {
        let elemInfo = []
        let config = GameConfig.MapEnterList
        for (let i in config) {
            let info = config[i]
            JsUtil.arrayInstert(elemInfo, { ["index_type"]: gui.Button, ["name"]: "btn_" + i, ["title"]: null, ["parent"]: "map_wnd", ["image"]: info.icon, ["x"]: info.iconX, ["y"]: info.iconY, ["w"]: info.iconW, ["h"]: info.iconH })
            JsUtil.arrayInstert(elemInfo, { ["index_type"]: eui.Image, ["name"]: "passIcon_" + i, ["parent"]: "btn_" + i, ["image"]: "sjdt_text01", ["x"]: (info.iconW - 79) / 2, ["y"]: (info.iconH - 29) / 2, ["w"]: 79, ["h"]: 29, ["messageFlag"]: true })
        }
        JsUtil.arrayInstert(elemInfo, { ["index_type"]: eui.Group, ["name"]: "head_group", ["parent"]: "map_wnd", ["x"]: 0, ["y"]: 0, ["w"]: 140, ["h"]: 140, ["messageFlag"]: true})
        JsUtil.arrayInstert(elemInfo, { ["index_type"]: eui.Image, ["name"]: "head_bg", ["parent"]: "head_group", ["image"]: "ty_renWuKuang01", ["x"]: 0, ["y"]: 0, ["w"]: 140, ["h"]: 140})
        JsUtil.arrayInstert(elemInfo, { ["index_type"]: eui.Image, ["name"]: "head_icon", ["parent"]: "head_group", ["image"]: "", ["x"]: 0, ["y"]: 0, ["w"]: 140, ["h"]: 140})
        UiUtil.createElem(elemInfo, this.mLayoutNode, this.mElemList, this)

        let group = <eui.Group>this.mElemList["head_group"]
        group.scaleX = 0.6
        group.scaleY = 0.6
        group.visible = false
        this.headControl = group

        this.mElemList["head_icon"].source = GetHeroIcon()

        for (let i in config) {
            let btn = <gui.Button>this.mElemList["btn_" + i]
            btn.addEventListener(gui.TouchEvent.TOUCH_SHORT, this.onEnterMap, this)
        }
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true)
        this.refreshFrame()
    }

    public onHide(): void {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false)
    }

    refreshFrame() {
        let elemInfo = []
        let config = GameConfig.MapEnterList
        for (let i in config) {
            if (this.mElemList["passIcon_" + i]) {
                let mapIndex = tonumber(i)
                let curMapId = MapSystem.getInstance().getMapId()
                let curMapIndex = MapSystem.getInstance().getMapIndex(curMapId)
                if (curMapIndex > mapIndex) {//已通关
                    this.mElemList["passIcon_" + i].visible = true
                } else if (curMapIndex == mapIndex) { // 冒险中
                    let btn = <gui.Button>this.mElemList["btn_" + i]
                    UiUtil.setXY(this.headControl, btn.x, btn.y + btn.height/2)
                    this.headControl.visible = true

                    this.mElemList["passIcon_" + i].visible = false
                }
                 else {
                    this.mElemList["passIcon_" + i].visible = false
                }
            }
        }
    }

    onMouseUp(args) {
        return this.hideWnd()
    }

    onEnterMap(event: egret.TouchEvent) {
        let name: string = event.target.name
        let index = name.replace(/[^0-9]/ig, "")
        let info = GameConfig.MapEnterList[index]
        if (info == null) {
            return
        }

        let mapName = info.inMapName
        let mapIndex = info.index
        let mapLv = info.level

        let isTaskExsit = TaskSystem.getInstance().isTaskExsit(info.taskId)
        let heroLv = GetHeroProperty("level")
        let curMapId = MapSystem.getInstance().getMapId()
        let curMapIndex = MapSystem.getInstance().getMapIndex(curMapId)
        let curMapName = MapSystem.getInstance().getMapName(curMapId)

        if (curMapIndex > mapIndex) {//已通关
            MsgSystem.addTagTips(mapName + Localize_cns("MAP_TXT1"))
        } else if (curMapIndex == mapIndex) {//冒险中
            MsgSystem.addTagTips(mapName + Localize_cns("MAP_TXT2"))
        } else if (curMapIndex < mapIndex) {//未进入
            if (isTaskExsit && heroLv >= mapLv) {
                RpcProxy.call("C2G_MAP_ENTER", info.index)
                this.hideWnd()
            } else {
                let oldMapName = GameConfig.MapEnterList[tonumber(index) - 1].inMapName
                let str = String.format(Localize_cns("MAP_TXT3"), mapName, mapLv, oldMapName)
                MsgSystem.confirmDialog_YES(str)
            }
        }
    }
}