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
/*
作者:
        panjunhua
   
    
创建时间：
   2015.3.30(周一)

意图：
   玩家信息

公共接口：
     //消息包解析 read(reader){

*/
var RoleInfo = (function (_super) {
    __extends(RoleInfo, _super);
    function RoleInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoleInfo.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = null;
        this.name = null;
        this.vocation = null;
        this.sexId = null;
        this.VipLevel = null;
    };
    RoleInfo.prototype.read = function (reader) {
        this.id = reader.readUInt(); //ID
        this.name = reader.readString(); //名字
        this.vocation = reader.readUInt(); //职业
        this.sexId = reader.readUChar(); //性别
        this.VipLevel = reader.readUChar(); //Vip等级
    };
    return RoleInfo;
}(TClass));
__reflect(RoleInfo.prototype, "RoleInfo");
//# sourceMappingURL=RoleInfo.js.map