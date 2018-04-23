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
var Fight_DirAction = (function (_super) {
    __extends(Fight_DirAction, _super);
    function Fight_DirAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight_DirAction.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.targetName = checkNull(this.elemInfo.param1, "caster");
        this.dirType = checkNull(this.elemInfo.param2, "relate");
        this.refer = checkNull(this.elemInfo.param3, "caster");
        this.dirIndex = checkNull(this.elemInfo.param4, null);
        this.targetNameList = splitString(this.targetName, ",");
    };
    Fight_DirAction.prototype.onFinish = function () {
        function callback(actor, index) {
            if (this.dirType == "relate") {
                var fighter = this.fightResult.getActionObjectByName(this.refer)[0];
                if (fighter) {
                    if (this.dirIndex == 0) {
                        actor.setDir(fighter.getDir());
                    }
                    else if (this.dirIndex == 4) {
                        actor.setDir((fighter.getDir() + 4) % 8);
                    }
                    else {
                        var emp = fighter.getMapXY();
                        var myp = actor.getMapXY();
                        if (emp.x < myp.x) {
                            actor.setDir(ActorDirMap.Left);
                        }
                        else {
                            actor.setDir(ActorDirMap.Right);
                        }
                    }
                }
            }
            else {
                actor.setDir(this.dirIndex);
            }
        }
        this.iteratorActorList(callback, this.targetNameList);
    };
    return Fight_DirAction;
}(Fight_BaseAction));
__reflect(Fight_DirAction.prototype, "Fight_DirAction");
//# sourceMappingURL=Fight_DirAction.js.map