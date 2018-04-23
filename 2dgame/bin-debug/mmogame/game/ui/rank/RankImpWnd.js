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
/////////////////////////////////////////////////////////
//战力榜
var RankPlrForcelWnd = (function (_super) {
    __extends(RankPlrForcelWnd, _super);
    function RankPlrForcelWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RankPlrForcelWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    //重载
    RankPlrForcelWnd.prototype.onItemExtraUpdate = function (data, mElemList) {
        var str = String.format(Localize_cns("RANK_TXT4"), data[0]);
        AddRdContent(mElemList["extraRd"], str, "ht_24_cc_stroke", "lime");
    };
    return RankPlrForcelWnd;
}(RankBaseWnd));
__reflect(RankPlrForcelWnd.prototype, "RankPlrForcelWnd");
/////////////////////////////////////////////////////////
//等级榜
var RankPlrLevelWnd = (function (_super) {
    __extends(RankPlrLevelWnd, _super);
    function RankPlrLevelWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RankPlrLevelWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    //重载
    RankPlrLevelWnd.prototype.onItemExtraUpdate = function (data, mElemList) {
        var str = String.format(Localize_cns("RANK_TXT4"), data[0]);
        AddRdContent(mElemList["extraRd"], str, "ht_24_cc_stroke", "lime");
    };
    return RankPlrLevelWnd;
}(RankBaseWnd));
__reflect(RankPlrLevelWnd.prototype, "RankPlrLevelWnd");
/////////////////////////////////////////////////////////
//宠物战力榜
var RankPetWnd = (function (_super) {
    __extends(RankPetWnd, _super);
    function RankPetWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RankPetWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    //重载
    RankPetWnd.prototype.onItemExtraUpdate = function (data, mElemList) {
        var str = String.format(Localize_cns("RANK_TXT4"), data[0]);
        AddRdContent(mElemList["extraRd"], str, "ht_24_cc_stroke", "lime");
    };
    //外观更新
    RankPetWnd.prototype.onAppearUpdate = function (appearInfo) {
        var model = GetPetModel(appearInfo.petShapeId);
        var actorView = this.mElemList["actorview"];
        actorView.updateByPlayer(model);
    };
    return RankPetWnd;
}(RankBaseWnd));
__reflect(RankPetWnd.prototype, "RankPetWnd");
/////////////////////////////////////////////////////////
//仙侣战力榜
var RankXianlvlWnd = (function (_super) {
    __extends(RankXianlvlWnd, _super);
    function RankXianlvlWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RankXianlvlWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    //重载
    // onItemExtraUpdate(data, mElemList) {
    // }
    //外观更新
    RankXianlvlWnd.prototype.onAppearUpdate = function (appearInfo) {
        var model = GetXianlvModel(appearInfo.tianxianShapeId);
        var actorView = this.mElemList["actorview"];
        actorView.updateByPlayer(model);
    };
    return RankXianlvlWnd;
}(RankBaseWnd));
__reflect(RankXianlvlWnd.prototype, "RankXianlvlWnd");
/////////////////////////////////////////////////////////
//坐骑榜
var RankRidelWnd = (function (_super) {
    __extends(RankRidelWnd, _super);
    function RankRidelWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RankRidelWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    //重载
    // onItemExtraUpdate(data, mElemList) {
    // }
    //外观更新
    RankRidelWnd.prototype.onAppearUpdate = function (appearInfo) {
        var effectId = GetShapeEffectId(appearInfo.rideShapeId);
        var actorView = this.mElemList["actorview"];
        var effect = actorView.updateByEffect(effectId);
        effect.changeAction("idle");
    };
    return RankRidelWnd;
}(RankBaseWnd));
__reflect(RankRidelWnd.prototype, "RankRidelWnd");
/////////////////////////////////////////////////////////
//翅膀榜
var RankWingWnd = (function (_super) {
    __extends(RankWingWnd, _super);
    function RankWingWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RankWingWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    return RankWingWnd;
}(RankBaseWnd));
__reflect(RankWingWnd.prototype, "RankWingWnd");
/////////////////////////////////////////////////////////
//天仙榜
var RankTianxianWnd = (function (_super) {
    __extends(RankTianxianWnd, _super);
    function RankTianxianWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RankTianxianWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    return RankTianxianWnd;
}(RankBaseWnd));
__reflect(RankTianxianWnd.prototype, "RankTianxianWnd");
/////////////////////////////////////////////////////////
//神兵榜
var RankImmortalsWnd = (function (_super) {
    __extends(RankImmortalsWnd, _super);
    function RankImmortalsWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RankImmortalsWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    return RankImmortalsWnd;
}(RankBaseWnd));
__reflect(RankImmortalsWnd.prototype, "RankImmortalsWnd");
/////////////////////////////////////////////////////////
//法阵榜
var RankFaZhenWnd = (function (_super) {
    __extends(RankFaZhenWnd, _super);
    function RankFaZhenWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RankFaZhenWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    return RankFaZhenWnd;
}(RankBaseWnd));
__reflect(RankFaZhenWnd.prototype, "RankFaZhenWnd");
/////////////////////////////////////////////////////////
//仙位榜
var RankXianWeiWnd = (function (_super) {
    __extends(RankXianWeiWnd, _super);
    function RankXianWeiWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RankXianWeiWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    return RankXianWeiWnd;
}(RankBaseWnd));
__reflect(RankXianWeiWnd.prototype, "RankXianWeiWnd");
/////////////////////////////////////////////////////////
//通灵榜
var RankTongLingWnd = (function (_super) {
    __extends(RankTongLingWnd, _super);
    function RankTongLingWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RankTongLingWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    return RankTongLingWnd;
}(RankBaseWnd));
__reflect(RankTongLingWnd.prototype, "RankTongLingWnd");
/////////////////////////////////////////////////////////
//兽魂榜
var RankShouHunWnd = (function (_super) {
    __extends(RankShouHunWnd, _super);
    function RankShouHunWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RankShouHunWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    return RankShouHunWnd;
}(RankBaseWnd));
__reflect(RankShouHunWnd.prototype, "RankShouHunWnd");
/////////////////////////////////////////////////////////
//天女榜
var RankTianNvWnd = (function (_super) {
    __extends(RankTianNvWnd, _super);
    function RankTianNvWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RankTianNvWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    return RankTianNvWnd;
}(RankBaseWnd));
__reflect(RankTianNvWnd.prototype, "RankTianNvWnd");
/////////////////////////////////////////////////////////
//仙器榜
var RankXianQiWnd = (function (_super) {
    __extends(RankXianQiWnd, _super);
    function RankXianQiWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RankXianQiWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    return RankXianQiWnd;
}(RankBaseWnd));
__reflect(RankXianQiWnd.prototype, "RankXianQiWnd");
/////////////////////////////////////////////////////////
//花辇榜
var RankHuaNianWnd = (function (_super) {
    __extends(RankHuaNianWnd, _super);
    function RankHuaNianWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RankHuaNianWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    return RankHuaNianWnd;
}(RankBaseWnd));
__reflect(RankHuaNianWnd.prototype, "RankHuaNianWnd");
/////////////////////////////////////////////////////////
//灵气榜
var RankLingQigWnd = (function (_super) {
    __extends(RankLingQigWnd, _super);
    function RankLingQigWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RankLingQigWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    return RankLingQigWnd;
}(RankBaseWnd));
__reflect(RankLingQigWnd.prototype, "RankLingQigWnd");
//# sourceMappingURL=RankImpWnd.js.map