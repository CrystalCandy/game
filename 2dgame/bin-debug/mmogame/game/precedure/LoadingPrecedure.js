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
var LoadingPrecedure = (function (_super) {
    __extends(LoadingPrecedure, _super);
    function LoadingPrecedure() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //bPreloaded:boolean
    //mImageSetCsv:any;
    LoadingPrecedure.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mbLoad = false;
        //this.bPreloaded = false;
        this.workQueue = WorkQueue.newObj();
        this.workQueue.setCallback(this);
        //this.mImageSetCsv = {};
    };
    LoadingPrecedure.prototype.destory = function () {
        this.workQueue.deleteObj();
        this.workQueue = null;
    };
    LoadingPrecedure.prototype.onActive = function (lastId) {
        TLog.Debug("LoadingPrecedure.onActive lastId:%d", lastId);
        FireEvent(EventDefine.PRECEDURE_ACTIVE, PrecedureEvent.createObj(this.id));
        if (this.mbLoad == false) {
            this.mbLoad = true;
            //this.startPreLoading();
            this.startLoading();
        }
        // var timerId = 0;
        // function testLoad(){
        // 	KillTimer(timerId);
        // 	FireEvent(EventDefine.LOADING_LANCH_RESOURCE_FINISH, null);
        // }
        // timerId = SetTimer(testLoad, this, 100);
    };
    LoadingPrecedure.prototype.onDeactive = function (currentId) {
        TLog.Debug("LoadingPrecedure.onDeactive currentId:%d", currentId);
        FireEvent(EventDefine.PRECEDURE_DEACTIVE, PrecedureEvent.createObj(this.id));
    };
    //预加载imagesetcsv
    // startPreLoading():void{
    // 	fontSetInit();
    // 	if(this.bPreloaded == false){
    // 		this.workQueue.clear();	
    // 		this.workQueue.addWorkUnit(ResWorkUnit.newObj("data/config/image_set_list.csv", readCSV, this, this.mImageSetCsv) );
    // 		this.workQueue.start();
    // 	}
    // }
    //--------------------------------------------------------------------------------------------------
    // loadImageSet(workQueue:WorkQueue){
    // 	for(var k in this.mImageSetCsv){
    // 		var v = this.mImageSetCsv[k];
    // 		this.workQueue.addWorkUnit(ImageSetWorkUnit.newObj(v.filename));
    // 	}
    // 	this.mImageSetCsv = null;
    // }
    LoadingPrecedure.prototype.startLoading = function () {
        fontSetInit();
        this.workQueue.clear();
        GameConfig.initCommonCsv(this.workQueue);
        //this.loadImageSet(this.workQueue);
        this.workQueue.start();
    };
    LoadingPrecedure.prototype.onBeginWorkQueue = function (allCount) {
    };
    LoadingPrecedure.prototype.onUpdateWorkQueue = function (unit, cur, all) {
        LoadingUI.setProgress(cur, all);
    };
    LoadingPrecedure.prototype.onEndWorkQueue = function () {
        // //预加载一次
        // if(this.bPreloaded == false){
        // 	this.bPreloaded = true;
        // 	this.startLoading()
        // }else{
        // 	//真正加载完成
        // 	FireEvent(EventDefine.LOADING_LANCH_RESOURCE_FINISH, null);
        // }
        FireEvent(EventDefine.LOADING_LANCH_RESOURCE_FINISH, null);
    };
    return LoadingPrecedure;
}(BasePrecedure));
__reflect(LoadingPrecedure.prototype, "LoadingPrecedure", ["WorkQueueCallback"]);
//# sourceMappingURL=LoadingPrecedure.js.map