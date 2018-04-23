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
var Movie_DeletePlayer = (function (_super) {
    __extends(Movie_DeletePlayer, _super);
    function Movie_DeletePlayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Movie_DeletePlayer.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = args[0].var;
    };
    Movie_DeletePlayer.prototype.destory = function () {
    };
    Movie_DeletePlayer.prototype.onBegin = function () {
        MovieSystem.getInstance().deletePlayer(this.id);
        this.finish();
    };
    //onTick( delay){
    //	let player = MovieSystem.getInstance().getPlayer(this.id)
    //	if(! player ){
    //		this.finish()
    //	}else{
    //		MovieSystem.getInstance().deletePlayer(this.id)
    //	}
    //}
    Movie_DeletePlayer.prototype.onFinish = function () {
    };
    return Movie_DeletePlayer;
}(Movie_Elem));
__reflect(Movie_DeletePlayer.prototype, "Movie_DeletePlayer");
//# sourceMappingURL=Movie_DeletePlayer.js.map