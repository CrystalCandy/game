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
    lintianfeng
    
创建时间：
   2013.10.26(周六)

意图：
   暂停动作

公共接口：
   
*/
var Movie_openTask = (function (_super) {
    __extends(Movie_openTask, _super);
    function Movie_openTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Movie_openTask.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.talkId = args[0].talkId;
        this.entryId = args[0].entryId;
        this.nodeId = args[0].nodeId;
    };
    Movie_openTask.prototype.onBegin = function () {
        TaskDialogue.getInstance().showDramaState(this.talkId, this.entryId, this.nodeId);
        MovieSystem.getInstance().stopTick();
        //this.finish()
    };
    //onTick( delay){
    //}
    Movie_openTask.prototype.destory = function () {
    };
    Movie_openTask.prototype.onFinish = function () {
    };
    return Movie_openTask;
}(Movie_Elem));
__reflect(Movie_openTask.prototype, "Movie_openTask");
//# sourceMappingURL=Movie_openTask.js.map