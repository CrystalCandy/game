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
var CharacterFightFrame = (function (_super) {
    __extends(CharacterFightFrame, _super);
    function CharacterFightFrame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //战斗艺术字体
        _this.FightFontText = (_a = {},
            _a["baoji"] = "zd_baoJiDi",
            _a["mianyi"] = "wuDi",
            _a["shanbi"] = "shanBi",
            _a["xishou"] = "xiShou",
            _a["break"] = "beiDaDuan",
            _a["nagative"] = "wuMuBiao",
            _a);
        _this.showNumberPos = [
            [0, 0],
            [Math.PI * 1 / 4, 20],
            [Math.PI * 1 / 4, 30],
            [Math.PI * 1 / 4, 40],
            [0, 40],
            [Math.PI * 3 / 4, 20],
            [Math.PI * 3 / 4, 30],
            [Math.PI * 3 / 4, 40],
            [Math.PI * 3 / 4, 50],
        ];
        return _this;
        var _a;
    }
    CharacterFightFrame.prototype.initObj = function () {
        //this.mLayoutPaths = ["layouts/MainMenuLayout.exml"]
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.numberTimerList = {};
        this.runningGroupList = [];
        this.cacheGroupList = null;
    };
    CharacterFightFrame.prototype.onLoad = function () {
        //this.mLayoutNode.skinName = this.mLayoutPaths[0];
        // var offset = 92
        // var width = 150, height = 120+offset;
        this.mLayoutNode.width = 10;
        this.mLayoutNode.height = 10;
        this.mLayoutNode.horizontalCenter = 0;
        this.mLayoutNode.verticalCenter = 0;
        // this.mLayoutNode.horizontalCenter = 0;
        // this.mLayoutNode.top = -height;
        // if(TEST_UI_RECT){
        // 	UiUtil.forTestDrawBg(this.mLayoutNode);
        // }
        this.cacheGroupList = [];
    };
    CharacterFightFrame.prototype.onUnLoad = function () {
        for (var k in this.numberTimerList) {
            var timer = this.numberTimerList[k];
            KillTimer(timer);
        }
        this.numberTimerList = {};
        this.cacheGroupList = null;
    };
    CharacterFightFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
    };
    CharacterFightFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.owner = null;
    };
    CharacterFightFrame.prototype.setOwner = function (actor) {
        this.owner = actor;
    };
    CharacterFightFrame.prototype.showFloatText = function (text_info, all_time) {
        var title = text_info.title;
        var color = text_info.color || gui.Color.white;
        var font = text_info.font || "ht_24_lc_stroke";
        var group = this.createGroup();
        var label = group.mElemList.txt_info;
        IGlobal.fontSet.updateTextField(font, label);
        label.text = (title);
        label.textColor = (color);
        label.y = -40;
        var ax = label.x, ay = label.y;
        egret.Tween.get(label).to({ x: ax, y: ay - 40 }, 800).
            call(this.onCombatFrameFinishMove, this, [group]);
    };
    CharacterFightFrame.prototype.showCombatInfo = function (number_info, all_time) {
        TLog.Assert(this.owner != null);
        var signSymble = number_info.nature;
        var point = tostring(number_info.point);
        var imagePrefix = "zd_jiaXue_";
        //var imageStr = ""
        var isDrawNumber = true;
        var textList = [];
        if (number_info.Type == "hp") {
            if (signSymble == "-") {
                imagePrefix = "zd_kouXue_";
            }
            else {
                point = "+" + point;
            }
            if (number_info.flag == powerXPFlag.CRITICAL) {
                textList = number_info.textList || [];
            }
            else if (number_info.flag == powerXPFlag.NOT_SHOW) {
                return;
            }
        }
        else if (number_info.Type == "mp") {
            return;
        }
        else if (number_info.Type == "max_hp") {
        }
        else if (number_info.Type == "rp") {
            return;
        }
        else if (number_info.Type == "immunize") {
            //imageStr = varize_cns("IMMUNIZE")
            textList = number_info.textList || [];
            isDrawNumber = false;
        }
        else if (number_info.Type == "resist") {
            //imageStr = varize_cns("RESIST")
            textList = number_info.textList || [];
            isDrawNumber = false;
        }
        else if (number_info.Type == "dodge" ||
            number_info.Type == "absorb" ||
            number_info.Type == "mianyi" ||
            number_info.Type == "break" ||
            number_info.Type == "nagative") {
            textList = number_info.textList || [];
            isDrawNumber = false;
        }
        if (number_info.flag == powerXPFlag.CRITICAL) {
            imagePrefix = "zd_baoJi";
        }
        if (isDrawNumber) {
            this.showCombatNumber(imagePrefix, point, textList);
        }
        else {
            this.showCombatText(textList);
        }
    };
    CharacterFightFrame.prototype.createGroup = function () {
        var group = null;
        if (this.cacheGroupList.length > 0) {
            group = this.cacheGroupList.pop();
        }
        else {
            var width = 150, height = 50;
            group = new eui.Group;
            group.mElemList = {};
            group.touchEnabled = false;
            group.touchChildren = false;
            group.anchorOffsetX = width / 2;
            group.anchorOffsetY = height / 2;
            UiUtil.setWH(group, width, height);
            var info = [
                (_a = {}, _a["index_type"] = gui.BatchImage, _a["name"] = "combat_info", _a["parent"] = "fightInfo_bg", _a["title"] = "", _a["font"] = null, _a["image"] = null, _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["w"] = 67, _a["h"] = 13, _a),
                (_b = {}, _b["index_type"] = eui.Label, _b["name"] = "txt_info", _b["title"] = null, _b["font"] = "ht_24_lc_stroke", _b["color"] = gui.Color.lime, _b["x"] = 0, _b["y"] = 0, _b["w"] = width, _b["h"] = 30, _b),
            ];
            UiUtil.createElem(info, group, group.mElemList, this);
        }
        //直接假如到镜头前
        SceneManager.getInstance().addNodeToCamera(group);
        this.runningGroupList.push(group);
        // var batchImage:gui.BatchImage = new gui.BatchImage;
        // this.runningGroupList.push(batchImage);
        var size = this.owner.getContentSize();
        var pos = this.owner.getPositionXY();
        group.x = pos.x;
        group.y = pos.y - size.height / 2;
        var batchImage = group.mElemList["combat_info"];
        batchImage.scaleX = batchImage.scaleY = 1;
        batchImage.x = batchImage.y = 0;
        //UiUtil.forTestDrawBg(group);
        //this.mLayoutNode.addChild(batchImage);
        return group;
        var _a, _b;
    };
    CharacterFightFrame.prototype.showCombatNumber = function (imagePrefix, point, textList) {
        var group = this.createGroup();
        var batchImage = group.mElemList["combat_info"];
        var imageW = 0;
        if (textList.length == 0) {
            batchImage.beginDraw();
            imageW = batchImage.drawNumberString(imagePrefix, point);
            batchImage.endDraw();
        }
        else {
            imageW = this.drawTextList(batchImage, textList, true, imagePrefix, point);
        }
        var offx = 0, offy = 0;
        var showTime = 100;
        var holdTime = 500;
        var hideTime = 100;
        for (var k = 0; k < this.showNumberPos.length; k++) {
            if (!this.numberTimerList[k]) {
                var v = this.showNumberPos[k];
                offx = v[1] * Math.cos(v[0]);
                offy = v[1] * Math.sin(v[0]);
                var time = 0;
                var tick = function (delay) {
                    time = time + delay;
                    if (time > showTime + holdTime) {
                        if (this.numberTimerList[k]) {
                            KillTimer(this.numberTimerList[k]);
                            delete this.numberTimerList[k];
                        }
                    }
                };
                this.numberTimerList[k] = SetTimer(tick, this, 100, false);
                //table.insert(this.numberFrameList, frame)
                break;
            }
        }
        //之前的窗口变暗
        // for(var i = 0; i < this.runningBatchImageList.length - 1; i++){
        // 	//this.numberFrameList[i].alpha = 128;
        // }
        batchImage.scaleX = batchImage.scaleY = 0.2;
        // let startOffX = 0
        // if(IsFaceLeft(this.owner)){
        // 	startOffX = -40;
        // }else{
        // 	startOffX = -20;
        // }
        batchImage.x = group.width / 2 - imageW / 2;
        var ax = batchImage.x;
        var ay = batchImage.y;
        egret.Tween.get(batchImage).to({ scaleX: 1.2, scaleY: 1.2 }, showTime).
            to({ x: ax + offx, y: ay + offy }, showTime).
            wait(holdTime).
            to({ x: ax + offx, y: ay + offy - 60 }, showTime).
            call(this.onCombatFrameFinishMove, this, [group]);
    };
    CharacterFightFrame.prototype.onCombatFrameFinishMove = function (group) {
        JsUtil.arrayRemoveVal(this.runningGroupList, group);
        if (group.parent)
            group.parent.removeChild(group);
        if (this.cacheGroupList) {
            this.cacheGroupList.push(group);
        }
        if (this.runningGroupList.length == 0) {
            this.hideWnd();
        }
        // if(this.mLayoutNode.$children.length == 0){
        // 	this.hideWnd();//没有子节点，则关闭窗口
        // }
    };
    CharacterFightFrame.prototype.showCombatText = function (textList) {
        var group = this.createGroup();
        var batchImage = group.mElemList["combat_info"];
        this.drawTextList(batchImage, textList);
        var ax = batchImage.x;
        var ay = batchImage.y;
        egret.Tween.get(batchImage).to({ alpha: 1.2 }, 100).
            wait(400).
            to({ y: ay - 20 }, 200).
            call(this.onCombatFrameFinishMove, this, [group]);
    };
    CharacterFightFrame.prototype.drawTextList = function (batchImage, textList, includeNumber, imagePrefix, point) {
        var textImageName = this.FightFontText[textList[0]];
        var imageInfo = IGlobal.imageSet.getImageInfo(textImageName);
        if (imageInfo == null) {
            TLog.Error("drawTextList %s", textImageName);
            return 0;
        }
        batchImage.beginDraw();
        var w = batchImage.drawImage(textImageName, 0, 0);
        if (includeNumber) {
            w = w + batchImage.drawNumberString(imagePrefix, point, imageInfo.w, 0);
        }
        batchImage.endDraw();
        return w;
    };
    return CharacterFightFrame;
}(BaseWnd));
__reflect(CharacterFightFrame.prototype, "CharacterFightFrame");
//# sourceMappingURL=CharacterFightFrame.js.map