// TypeScript file
class Club_SkillWnd extends BaseCtrlWnd {
    mElemList;

    public initObj(...params: any[]) {

    }

    public onLoad(): void {
        this.mElemList = this.mParentWnd.mElemList

        var ElemInfo = [
            { ["name"]: "btn_upgrade", ["title"]: null, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: this.onUpgradeSkill }
        ]
        UiUtil.initElem(ElemInfo, this.mLayoutNode, this.mElemList, this)

        ElemInfo = []
        let group = <eui.Group>this.mElemList["attr_wnd"]
        for (let i = 0; i < 8; i++) {
            table_insert(ElemInfo, { ["index_type"]: gui.RichDisplayer, ["name"]: "skill_attr_" + i, ["x"]: 0, ["y"]: 0, ["w"]: group.width / 4, ["h"]: group.height / 3, ["messageFlag"]: true })
        }
        UiUtil.createElem(ElemInfo, this.mLayoutNode, this.mElemList, this, group)

        this.mElemList["skill_level_rd"].setAlignFlag(gui.Flag.H_CENTER)
        this.mElemList["cost_rd"].setAlignFlag(gui.Flag.H_CENTER)

        for (let i = 0; i < 8; i ++) {
            this.mElemList["lv_wnd" + i].visible = false
            this.mElemList["select_" + i].visible = false
        }
    }

    public onUnLoad(): void {

    }

    public onShow(): void {
        RegisterEvent(EventDefine.CLUB_SKILL_INFO, this.refreshFrame, this)
        this.mElemList["group4"].visible = true
        this.mElemList["title"].text = Localize_cns("CLUB_TXT7")
        RpcProxy.call("C2G_FactionSkillInfo")
        this.refreshFrame()
    }

    public onHide(): void {
        UnRegisterEvent(EventDefine.CLUB_SKILL_INFO, this.refreshFrame, this)
        this.mElemList["group4"].visible = false
    }

    refreshFrame() {
        let skillInfo = ClubSystem.getInstance().getClubSkillInfo()
        if (skillInfo == null) {
            return
        }

        let level = skillInfo.level //最大等级
        let index = skillInfo.index //最大索引
        let force = skillInfo.force //总战力
        let list = skillInfo.list //等级列表

        //升级到哪个技能
        let curSkillIndex = index - 1
        //更新技能信息
        for (let i = 0; i < 8; i++) {
            this.mElemList["select_" + i].visible = false
            if (i == curSkillIndex) {
                this.mElemList["select_" + i].visible = true
            }

            this.mElemList["lv_" + i].text = list[i]
        }

        let maxLevel = (index == 1) ? level : list[index - 1]
        let limitLevel = ClubSystem.getInstance().getClubSkillLimit() || 0
        let skillLevelText = String.format(Localize_cns("CLUB_TXT40"), maxLevel + "/" + limitLevel)
        //技能升级信息文本
        AddRdContent(this.mElemList["skill_level_rd"], skillLevelText, "ht_24_cc", "lime")

        //更新战力
        this.mElemList["force_batch"].beginDraw();
        this.mElemList["force_batch"].drawNumberString("zhanLi_", "z" + force, 0, 0, -3)
        this.mElemList["force_batch"].endDraw();

        //更新当前技能信息
        let curProperty = table_effect(ClubSystem.getInstance().getClubSkillProperty(level, index))
        let nextProperty = table_effect(ClubSystem.getInstance().getClubSkillProperty(level, index))

        //更新消耗
        let curBangGong = 0
        let nextBangGong = ClubSystem.getInstance().getClubSkillConfig(level + 1, "facContribute")
        let color = curBangGong >= nextBangGong ? "#lime": "#red"
        var str = Localize_cns("CLUB_TXT101") + color + curBangGong + "#lime/" +  nextBangGong
        AddRdContent(this.mElemList["cost_rd"], str, "ht_24_cc", "white")

        var str = ""
        for (let k in curProperty) {
            str = str + GetPropertyName(k)
            str = str + "#rf#lime+" + curProperty[k] + "#br#ublack"
        }
        AddRdContent(this.mElemList["skill_cur_rd"], str, "ht_24_cc", "ublack", 5)

        str = ""
        for (let k in nextProperty) {
            str = str + GetPropertyName(k)
            str = str + "#rf#lime+" + curProperty[k] + "#br#ublack"
        }
        AddRdContent(this.mElemList["skill_next_rd"], str, "ht_24_cc", "ublack", 5)

        //更新总属性
        let sumProperty = ClubSystem.getInstance().getClubSkillSumProperty(level)
        let control = 0
        for (let k in sumProperty) {
            if (control >= 8) {
                break
            }
            let proName = GetPropertyName(k)
            let proValue = sumProperty[k]
            if (this.mElemList["skill_attr_" + control]) {
                AddRdContent(this.mElemList["skill_attr_" + control], proName + "#rf#lime+" + proValue, "ht_24_cc", "ublack")
            }
            control += 1
        }
    }

    //升级
    onUpgradeSkill() {
        RpcProxy.call("C2G_FactionSkillLevelUp")
    }
}