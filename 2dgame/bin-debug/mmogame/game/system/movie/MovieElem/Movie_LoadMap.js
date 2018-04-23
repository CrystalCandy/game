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
     电影加载地图元素

公共接口：
   
*/
var Movie_LoadMap = (function (_super) {
    __extends(Movie_LoadMap, _super);
    function Movie_LoadMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Movie_LoadMap.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mapId = args[0].map;
        this.mapX = args[0].x, this.mapY = args[0].y;
        this.old_mapId = MapSystem.getInstance().getMapId();
        var heroPos = GetHero().getCellXY();
        this.old_mapX = heroPos.x, this.old_mapY = heroPos.y;
        this.time = 200;
    };
    Movie_LoadMap.prototype.destory = function () {
        //let message = GetMessage(opCodes.G2C_MAP_ENTER)
        //message.mapId = this.old_mapId 
        //message.cellx = this.old_mapX
        //message.celly = this.old_mapY
        //GameNetDispatcher.getInstance().onTcpRecv(message)
    };
    Movie_LoadMap.prototype.onBegin = function () {
        if (!GameConfig.MapConfig[this.mapId]) {
            TLog.Warn("the %d map is null!!!!!!!!!!!!!", this.mapId);
            this.finish();
            return;
        }
        TLog.Debug("Movie_LoadMap", this.mapId);
        MapSystem.getInstance().loadMovieMap(this.mapId, this.mapX, this.mapY);
        //MapSystem.getInstance().loadMap(this.mapId, this.mapX, this.mapY)
        this.finish();
    };
    Movie_LoadMap.prototype.onTick = function (delay) {
    };
    Movie_LoadMap.prototype.onFinish = function () {
    };
    return Movie_LoadMap;
}(Movie_Elem));
__reflect(Movie_LoadMap.prototype, "Movie_LoadMap");
//# sourceMappingURL=Movie_LoadMap.js.map