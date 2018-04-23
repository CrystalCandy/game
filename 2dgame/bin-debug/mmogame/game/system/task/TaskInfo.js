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
var TaskInfo = (function (_super) {
    __extends(TaskInfo, _super);
    function TaskInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskInfo.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    TaskInfo.prototype.read = function (reader) {
        var this_ = this;
        this_.taskId = reader.readUInt(); //任务ID
        this_.Type = reader.readUChar(); //任务类型
        this_.hoop = reader.readUInt(); //环【大】
        this_.segment = reader.readUInt(); //段【小】
        this_.init = table_load(reader.readString()); //初始数据
        this_.finish = table_load(reader.readString()); //完成任务的数据
        this_.prize = table_load(reader.readString()); //任务奖励
        this_.data = table_load(reader.readString()); //当前任务进行的数据
        this_.time = reader.readUInt();
    };
    return TaskInfo;
}(TClass));
__reflect(TaskInfo.prototype, "TaskInfo");
//# sourceMappingURL=TaskInfo.js.map