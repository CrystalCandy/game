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
var FunInfo = (function (_super) {
    __extends(FunInfo, _super);
    function FunInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FunInfo.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    FunInfo.prototype.read = function (reader) {
        var this_ = this;
        this_.showIndex = reader.readUShort(); //0表示没有开，然后就结束协议，没有后面的数据
        if (this_.showIndex == 0) {
            return;
        }
        this_.level = reader.readUShort(); //等级
        this_.exp = reader.readUInt(); //经验
        var skillnum = reader.readChar(); //技能数量
        this_.skillList = [];
        for (var i = 0; i < skillnum; i++) {
            JsUtil.arrayInstert(this_.skillList, reader.readUShort());
        }
        var equipNum = reader.readChar(); //装备数量
        this_.equipList = [];
        for (var i = 0; i < equipNum; i++) {
            JsUtil.arrayInstert(this_.equipList, reader.readUInt());
        }
        this_.drugNum = reader.readUShort(); //使用属性丹
        this_.curSkin = reader.readUShort(); //当前皮肤
        var skinnum = reader.readUShort(); //皮肤列表
        this_.skinList = [];
        for (var i = 0; i < skinnum; i++) {
            JsUtil.arrayInstert(this_.skinList, reader.readUShort());
        }
        this_.curShare = reader.readUShort(); //当前外形(外形是每一阶段的，需要等级满足才会开启)
        //"entryid:uint32",
        //"showindex:uint32",
        //"stage:uint16",
        //"stageexp:uint32",
        //"skilllevellist:table",
        //"equiplist:table",
        //"drugnum:uint16",
        //"curskin:uint16",
        //"skinlist:table",
        //"curshape:uint16"
    };
    return FunInfo;
}(TClass));
__reflect(FunInfo.prototype, "FunInfo");
//# sourceMappingURL=FunInfo.js.map