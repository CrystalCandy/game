/*

//模版系统
class TemplateSystem extends BaseSystem{
    
    public initObj(...params:any[]):void{
        
    }

    destory(){
        
    }

    prepareResource(workQueue:WorkQueue):void{

    }

    onClear():void{

    }

}

*/
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
var BaseSystem = (function (_super) {
    __extends(BaseSystem, _super);
    function BaseSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseSystem.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        RegisterEvent(EventDefine.LOADING_GAME_RESOURCE_PREPARE, this.onPrepareResource, this);
        BaseSystem.s_systemList.push(this);
    };
    BaseSystem.prototype.destory = function () {
        UnRegisterEvent(EventDefine.LOADING_GAME_RESOURCE_PREPARE, this.onPrepareResource, this);
    };
    BaseSystem.prototype.onPrepareResource = function (args) {
        this.prepareResource(args.workQueue);
    };
    BaseSystem.prototype.prepareResource = function (workQueue) {
    };
    BaseSystem.prototype.onClear = function () {
    };
    BaseSystem.s_systemList = [];
    return BaseSystem;
}(TClass));
__reflect(BaseSystem.prototype, "BaseSystem");
//# sourceMappingURL=BaseSystem.js.map