var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CharacterUpperFrame = (function (_super) {
    __extends(CharacterUpperFrame, _super);
    function CharacterUpperFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CharacterUpperFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        //this.mLayoutPaths = ["layouts/mainmenu/MainMenuLayout.exml"]
        this.bShowHpSlotTimer = false;
    };
    CharacterUpperFrame.prototype.onLoad = function () {
        var width = 250, height = 120;
        // // this.mLayoutNode.percentWidth = 100;
        // // this.mLayoutNode.percentHeight = 100;
        // UiUtil.setWH(this.mLayoutNode, width, height);
        // this.mLayoutNode.horizontalCenter = 0;
        // this.mLayoutNode.top = -height;
        this.mLayoutNode.percentWidth = 100;
        this.mLayoutNode.percentHeight = 100;
        this.mLayoutNode.touchChildren = false;
        this.mLayoutNode.touchEnabled = false;
        // var elemInfo = [
        // 	//对齐布局
        // 	//{ ["index_type"]: eui.Group, ["name"]: "layout", ["x"]: 0, ["y"]: 0, ["w"]: width, ["h"]: height, ["event_name"]: null, ["fun_index"]: null, ["touchEnabled"]:false},
        // 	{ ["index_type"]: gui.BatchImage, ["name"]: "hp_prgress", ["title"]: "", ["parent"]: "", ["font"]: "ht_20_cc", ["color"]: gui.Color.white, ["horizontalCenter"]: 0, ["top"]: -20, ["w"]: 100, ["h"]: 20, ["event_name"]: null, ["fun_index"]: null, },
        // 	{ ["index_type"]: eui.Label, ["name"]: "name", ["title"]: "", ["parent"]: "", ["font"]: "ht_24_cc_stroke", ["color"]: gui.Color.white, ["horizontalCenter"]: 0, ["bottom"]: -20, ["event_name"]: null, ["fun_index"]: null },
        // ]
        // UiUtil.createElem(elemInfo, this.mLayoutNode, this.mElemList, this)
        var info = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = "group_up", _a["title"] = "", _a["font"] = null, _a["image"] = null, _a["color"] = gui.Color.white, _a["horizontalCenter"] = 0, _a["top"] = -height, _a["w"] = width, _a["h"] = height, _a["touchEnabled"] = false, _a["touchChildren"] = false, _a),
            (_b = {}, _b["index_type"] = gui.RichDisplayer, _b["name"] = "name", _b["title"] = null, _b["font"] = "ht_24_cc_stroke", _b["image"] = "", _b["color"] = gui.Color.goldenrod, _b["horizontalCenter"] = 0, _b["bottom"] = -40, _b["w"] = 500, _b["h"] = 30, _b),
            (_c = {}, _c["index_type"] = gui.RichDisplayer, _c["name"] = "faction_name", _c["title"] = null, _c["font"] = "ht_24_cc_stroke", _c["image"] = "", _c["color"] = gui.Color.goldenrod, _c["horizontalCenter"] = 0, _c["bottom"] = -60, _c["w"] = 250, _c["h"] = 30, _c),
            (_d = {}, _d["index_type"] = gui.BatchImage, _d["name"] = "hp_prgress", _d["parent"] = "group_up", _d["title"] = "", _d["font"] = null, _d["image"] = null, _d["color"] = gui.Color.white, _d["horizontalCenter"] = 0, _d["bottom"] = 10, _d["w"] = 51, _d["h"] = 12, _d),
            (_e = {}, _e["index_type"] = eui.Image, _e["name"] = "fightState_icon", _e["parent"] = "group_up", _e["title"] = "", _e["font"] = null, _e["image"] = "", _e["color"] = gui.Color.white, _e["horizontalCenter"] = 0, _e["bottom"] = 40, _e["w"] = 31, _e["h"] = 32, _e),
            (_f = {}, _f["index_type"] = eui.Image, _f["name"] = "state_icon", _f["parent"] = "group_up", _f["title"] = null, _f["font"] = "", _f["color"] = gui.Color.goldenrod, _f["image"] = "", _f["horizontalCenter"] = 0, _f["bottom"] = 40, _f),
            (_g = {}, _g["index_type"] = eui.Image, _g["name"] = "combat_mark", _g["parent"] = "group_up", _g["title"] = null, _g["font"] = null, _g["image"] = "", _g["color"] = gui.Color.white, _g["horizontalCenter"] = 0, _g["bottom"] = 40, _g["w"] = 49, _g["h"] = 49, _g["event_name"] = null, _g["fun_index"] = null, _g),
            (_h = {}, _h["index_type"] = eui.Image, _h["name"] = "chengHao", _h["parent"] = "group_up", _h["title"] = "", _h["font"] = "ht_24_cc_stroke", _h["image"] = "", _h["color"] = gui.Color.white, _h["horizontalCenter"] = 0, _h["bottom"] = 25, _h),
        ];
        UiUtil.createElem(info, this.mLayoutNode, this.mElemList, this);
        //组队图标		
        // for (let i = 1; i <= 4; i++) {
        // 	let info: any = [
        // 		{ ["index_type"]: eui.Image, ["name"]: "icon" + i, ["title"]: "", ["font"]: null, ["image"]: "", ["color"]: gui.Color.white, ["x"]: 65, ["y"]: 0 + this.offset, ["w"]: 42, ["h"]: 42 },
        // 	]
        // 	UiUtil.createElem(info, this.mLayoutNode, this.mElemList, this)
        // 	//ui_util.CreateDrawRectPtr(this.mElemList["icon"..i], gui.Color32Half.orange)
        // }
        //全部默认隐藏
        for (var i in this.mElemList) {
            var v = this.mElemList[i];
            v.visible = (false);
            // v.visible = (true)
            // if(v.addChild)
            // 	UiUtil.forTestDrawBg(v);
        }
        this.mElemList["group_up"].visible = true;
        if (TEST_UI_RECT) {
            UiUtil.forTestDrawBg(this.mLayoutNode);
        }
        var _a, _b, _c, _d, _e, _f, _g, _h;
    };
    CharacterUpperFrame.prototype.onUnLoad = function () {
    };
    CharacterUpperFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
    };
    CharacterUpperFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        if (this.autoHideHpTimer != null) {
            KillTimer(this.autoHideHpTimer);
            this.autoHideHpTimer = null;
        }
        if (this.timer) {
            KillTimer(this.timer);
            this.timer = null;
            this.EndTime = 0;
        }
    };
    CharacterUpperFrame.prototype.setHpSlotVisible = function (visible) {
        this.mElemList["hp_prgress"].visible = visible;
        UiUtil.forTestDrawBg(this.mElemList["hp_prgress"]);
    };
    CharacterUpperFrame.prototype._setHpSlot = function (percent, pro_imagename) {
        var batchImage = this.mElemList["hp_prgress"];
        batchImage.beginDraw();
        batchImage.drawImage("zd_xueTiaodi");
        batchImage.drawImageProgress(pro_imagename, percent);
        batchImage.endDraw();
        // batchImage.image = "xueTiao2_duiYouDi";
        // batchImage.thumbImage = pro_imagename;
        // batchImage.value = percent;
    };
    CharacterUpperFrame.prototype.showCombatAutoHpSlot = function (percent, side) {
        var pro_image = "zd_xueTiao02";
        if (side == fightSide.FIGHT_RIGHT) {
            pro_image = "zd_xueTiao01";
        }
        this._setHpSlot(percent, pro_image);
        this.setHpSlotVisible(true);
        this.bShowHpSlotTimer = (this.autoHideHpTimer != null);
        if (!this.autoHideHpTimer) {
            var hideHpCallback = function (dt) {
                if (this.bShowHpSlotTimer == false) {
                    KillTimer(this.autoHideHpTimer);
                    this.autoHideHpTimer = null;
                    // this.setHpSlotVisible(false)
                }
                this.bShowHpSlotTimer = false; //XX毫秒后检查，如果没有再次调用就隐藏了
            };
            this.autoHideHpTimer = SetTimer(hideHpCallback, this, 1000);
        }
    };
    CharacterUpperFrame.prototype.setFightStateVisible = function (visible, imageName) {
        this.mElemList["fightState_icon"].visible = (visible);
        this.mElemList["fightState_icon"].source = (imageName);
    };
    //令牌、队长、战斗、暴徒
    CharacterUpperFrame.prototype.setMoreIcon = function (visible, playinfo) {
        //TLog.Debug("CharacterUpperFrame.setMoreIcon",playinfo.status )
        // for (let i = 1; i <= 4; i++) {
        // 	//this.mElemList["icon"+i].enabled = (true)			
        // 	this.mElemList["icon" + i].visible = (false)
        // }
        // if (!visible) {
        // 	this.updateIconRDPos()
        // 	return
        // }
        // let x = 0
        // let count = 0
        // let IconIndex: any = {}
        // let width = this.mLayoutNode.width
        // let oddMIdX = (width - 50) / 2
        // let list = {
        // 	[1]: [oddMIdX],
        // 	[2]: [1 * (width / 4), 2 * (width / 4)],
        // 	[3]: [oddMIdX - 50, oddMIdX, oddMIdX + 50],
        // 	[4]: [0, 1 * (width / 4), 2 * (width / 4), 3 * (width / 4)],
        // }
        // if (playinfo.status) {
        // 	if (bit.band(playinfo.status, opStatusType.STATUS_TYPE_FIGHT) == opStatusType.STATUS_TYPE_FIGHT) {
        // 		count = count + 1
        // 		IconIndex[count] =  PlayerStatusToImage[opStatusType.STATUS_TYPE_FIGHT]
        // 	}
        // 	if (bit.band(playinfo.status, opStatusType.STATUS_TYPE_TICKET) == opStatusType.STATUS_TYPE_TICKET) {
        // 		count = count + 1
        // 		IconIndex[count] =  PlayerStatusToImage[opStatusType.STATUS_TYPE_TICKET]
        // 	}
        // 	if (bit.band(playinfo.status, opStatusType.STATUS_TYPE_TEAM) == opStatusType.STATUS_TYPE_TEAM) {
        // 		count = count + 1
        // 		IconIndex[count] =  PlayerStatusToImage[opStatusType.STATUS_TYPE_TEAM]			
        // 	} else if (bit.band(playinfo.status, opStatusType.STATUS_TYPE_TEAMMATE) == opStatusType.STATUS_TYPE_TEAMMATE) {
        // 		count = count + 1
        // 		IconIndex[count] =  PlayerStatusToImage[opStatusType.STATUS_TYPE_TEAMMATE]
        // 		//this.mElemList["icon"..count].enabled = (false)
        // 	}
        // 	if (bit.band(playinfo.status, opStatusType.STATUS_TYPE_EREN) == opStatusType.STATUS_TYPE_EREN) {
        // 		count = count + 1
        // 		IconIndex[count] =  PlayerStatusToImage[opStatusType.STATUS_TYPE_EREN]
        // 	} else if (bit.band(playinfo.status, opStatusType.STATUS_TYPE_BAOTU) == opStatusType.STATUS_TYPE_BAOTU) {
        // 		count = count + 1
        // 		IconIndex[count] =  PlayerStatusToImage[opStatusType.STATUS_TYPE_BAOTU]
        // 	} else if (bit.band(playinfo.status, opStatusType.STATUS_TYPE_MOTOU) == opStatusType.STATUS_TYPE_MOTOU) {
        // 		count = count + 1
        // 		IconIndex[count] =  PlayerStatusToImage[opStatusType.STATUS_TYPE_MOTOU]
        // 	}
        // 	if (bit.band(playinfo.status, opStatusType.STATUS_TYPE_NORMAL_FLAG) == opStatusType.STATUS_TYPE_NORMAL_FLAG) {
        // 		count = count + 1
        // 		IconIndex[count] = "TB_qiZhi02"
        // 	} else if (bit.band(playinfo.status, opStatusType.STATUS_TYPE_SENIOR_FLAG) == opStatusType.STATUS_TYPE_SENIOR_FLAG) {
        // 		count = count + 1
        // 		IconIndex[count] = "TB_qiZhi01"
        // 	} 
        // 	if (bit.band(playinfo.status, opStatusType.STATUS_TYPE_EMPTY_FIGHT) == opStatusType.STATUS_TYPE_EMPTY_FIGHT) {
        // 		count = count + 1
        // 		IconIndex[count] =  PlayerStatusToImage[opStatusType.STATUS_TYPE_EMPTY_FIGHT]
        // 	}
        // 	if (bit.band(playinfo.status, opStatusType.STATUS_TYPE_ROBBER_BBOX) == opStatusType.STATUS_TYPE_ROBBER_BBOX) {
        // 		count = count + 1
        // 		IconIndex[count] =  PlayerStatusToImage[opStatusType.STATUS_TYPE_ROBBER_BBOX]
        // 	}
        // 	if (bit.band(playinfo.status, opStatusType.STATUS_TYPE_FACT_WAR) == opStatusType.STATUS_TYPE_FACT_WAR) {
        // 		count = count + 1
        // 		IconIndex[count] =  PlayerStatusToImage[opStatusType.STATUS_TYPE_FACT_WAR]
        // 	}
        // }
        // if(count > 4){
        // 	count = 4
        // }
        // //TLog.Assert(count <= 4)
        // let set_y = 40 + this.offset
        // if (this.mElemList["faction_name"].visible) {
        // 	set_y = set_y - 30
        // }
        // if (this.timer) {
        // 	set_y = set_y - 20
        // }
        // //TLog.Debug("CharacterUpperFrame.setMoreIcon",set_y)
        // for (let i = 1; i <= count; i++) {
        // 	this.mElemList["icon" + i].visible = (visible)
        // 	this.mElemList["icon" + i].source = (IconIndex[i])
        // 	UiUtil.setXY(this.mElemList["icon" + i], list[count][i - 1], set_y + this.getChengHaoOffsetY())
        // }
        // this.updateIconRDPos()
    };
    CharacterUpperFrame.prototype.setCombatMaikVisible = function (visible) {
        this.mElemList["combat_mark"].visible = (visible);
    };
    //文字
    CharacterUpperFrame.prototype.setNameTitle = function (name, level, color) {
        if (!name || name == "") {
            this.mElemList["name"].visible = (false);
        }
        else {
            this.mElemList["name"].visible = (true);
            //this.mElemList["name"].text = (name)
            var rd = this.mElemList["name"];
            var fontInfo = {};
            var text = void 0;
            if (level && level != "") {
                text = level + "#rf" + name;
            }
            else {
                text = name;
            }
            //TLog.Debug("setNameTitle( name, level, color){",this.Namecolor)
            if (!this.Namecolor) {
                this.Namecolor = "aquamarine";
            }
            if (!this.Namefont) {
                this.Namefont = "ht_18_cc_stroke";
            }
            //UiUtil.setXY(rd, -125, 80 + this.offset)
            UiUtil.setWH(rd, 500, 30);
            rd.source = ("");
            //TLog.Debug("setNameTitle", rd.y,this.mElemList["faction_name"]:y)
            fontInfo.default_color = this.Namecolor;
            fontInfo.defalut_font = this.Namefont;
            fontInfo.no_change_font = true;
            //fontInfo.no_change_color = true
            rd.setAlignFlag(gui.Flag.H_CENTER);
            rd.clear();
            rd.addXmlString(XmlConverter.parseText(text, fontInfo));
            //rd.showLastRow()
            //TLog.Debug("22222222222222222222222", this.Namefont, this.Namecolor, text)
            //ui_util.CreateDrawRectPtr(this.mLayoutNode, gui.Color32Half.green)
            //
        }
    };
    CharacterUpperFrame.prototype.setNameColor = function (color, bottoming) {
        //this.mElemList["name"].textColor = (color)
        this.Namecolor = color;
        this.bottoming = bottoming;
    };
    CharacterUpperFrame.prototype.setNameFont = function (font) {
        //this.mElemList["name"]:SetFontName(font)
        this.Namefont = font;
    };
    //图标
    CharacterUpperFrame.prototype.setStateIcon = function (imageName, visible) {
        this.mElemList["state_icon"].source = (imageName);
        this.mElemList["state_icon"].visible = (visible);
    };
    //////////////////////////////////////////////////////////////////////////////////////-
    ////头顶倒计时
    CharacterUpperFrame.prototype.setTimeCountDown = function (visible, Time) {
    };
    //////////////////////////////////////////////////////////////////////////////////////-
    ////////////////-军团信息////////////-
    CharacterUpperFrame.prototype.setFactionNameTitle = function (str, font, color) {
        var rd = this.mElemList["faction_name"];
        if (!str || str == "") {
            rd.visible = (false);
        }
        else {
            var fontInfo = {};
            fontInfo.default_color = color || "aquamarine";
            fontInfo.defalut_font = font || "ht_18_cc_stroke";
            fontInfo.no_change_font = true;
            rd.visible = (true);
            rd.setAlignFlag(gui.Flag.H_CENTER);
            rd.clear();
            rd.addXmlString(XmlConverter.parseText(str, fontInfo));
            //rd.showLastRow()
            //UiUtil.setWH(rd, 0, 60 + this.offset)//设置军团信息坐标
            UiUtil.setWH(rd, 250, 30);
        }
    };
    CharacterUpperFrame.prototype.setChengHaoTitle = function (chengHaoId) {
        if (chengHaoId == 0) {
            this.mElemList["chengHao"].visible = (false);
            return;
        }
        var imagetName = GetShapeImage(chengHaoId);
        this.mElemList["chengHao"].visible = (true);
        this.mElemList["chengHao"].source = imagetName;
    };
    return CharacterUpperFrame;
}(BaseWnd));
__reflect(CharacterUpperFrame.prototype, "CharacterUpperFrame");
//# sourceMappingURL=CharacterUpperFrame.js.map