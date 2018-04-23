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
   2013.10.28(周一)

意图：
   

公共接口：
   
*/
var Movie_MoveCamera = (function (_super) {
    __extends(Movie_MoveCamera, _super);
    function Movie_MoveCamera() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Movie_MoveCamera.prototype.initObj = function () {
        //let mapInstance = gb.map_sys.GetMap()
        //this.begin_x = mapInstance.GetViewBeginX()
        //this.begin_y = mapInstance.GetViewBeginY()
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var mapPos = SceneManager.getInstance().cellXYtoMapXY(args[0].x, args[0].y);
        this.mapX = mapPos.x, this.mapY = mapPos.y;
        this.max_time = args[0].time || 2000;
        this.nowX = 0;
        this.nowY = 0;
    };
    Movie_MoveCamera.prototype.onBegin = function () {
        SceneManager.getInstance().cameraUnLinkActor();
        var pos = SceneManager.getInstance().getCameraXY();
        this.beginX = pos.x, this.beginY = pos.y;
        this.offset_x = this.mapX - this.beginX;
        this.offset_y = this.mapY - this.beginY;
        this.nowX = this.beginX;
        this.nowY = this.beginY;
    };
    Movie_MoveCamera.prototype.onTick = function (delay) {
        var bit = delay / this.max_time;
        if (this.mapX == this.nowX && this.mapY == this.nowY) {
            this.finish();
        }
        else {
            this.nowX = this.nowX + bit * this.offset_x;
            this.nowY = this.nowY + bit * this.offset_y;
            if (this.mapX > this.beginX) {
                if (this.nowX > this.mapX) {
                    this.nowX = this.mapX;
                }
            }
            else {
                if (this.nowX < this.mapX) {
                    this.nowX = this.mapX;
                }
            }
            if (this.mapY > this.beginY) {
                if (this.nowY > this.mapY) {
                    this.nowY = this.mapY;
                }
            }
            else {
                if (this.nowY < this.mapY) {
                    this.nowY = this.mapY;
                }
            }
            SceneManager.getInstance().lookAtCenter(this.nowX, this.nowY);
        }
        //let mapInstance = gb.map_sys.GetMap()
    };
    Movie_MoveCamera.prototype.destory = function () {
        SceneManager.getInstance().cameraLinkActor(GetHero());
    };
    Movie_MoveCamera.prototype.onFinish = function () {
        SceneManager.getInstance().lookAtCenter(this.mapX, this.mapY);
    };
    return Movie_MoveCamera;
}(Movie_Elem));
__reflect(Movie_MoveCamera.prototype, "Movie_MoveCamera");
//# sourceMappingURL=Movie_MoveCamera.js.map