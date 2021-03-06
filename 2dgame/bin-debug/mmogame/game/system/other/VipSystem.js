/*
作者:
    panyuxiong
    
创建时间：
    2014.11.27(星期四)

意图：
    管理VIP系统

公共接口：
    
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
var VipSystem = (function (_super) {
    __extends(VipSystem, _super);
    function VipSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VipSystem.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    VipSystem.prototype.destory = function () {
    };
    VipSystem.prototype.prepareResource = function (workQueue) {
        GameConfig.initVipSystemCsv(workQueue);
    };
    VipSystem.prototype.onClear = function () {
    };
    VipSystem.prototype.GetVipLevel = function () {
        var heroInfo = GetHeroPropertyInfo();
        if (heroInfo == null) {
            return 0;
        }
        return heroInfo.VIP_level || 0;
    };
    VipSystem.prototype.GetCurVipSkytowerCount = function () {
        var heroInfo = GetHeroPropertyInfo();
        var vipLevel = heroInfo.VIP_level;
        if (GameConfig.VipPrivilege[vipLevel]["skyTowerCount"]) {
            return GameConfig.VipPrivilege[vipLevel]["skyTowerCount"]["param"][0];
        }
        else {
            return 0;
        }
    };
    ////////////////////////////////////////////////////////////////////////////////-
    //-vipBuff
    VipSystem.prototype.GetVipBuff = function () {
        var heroInfo = GetHeroPropertyInfo();
        return heroInfo.VIPBuff;
    };
    ////////////////////////////////////////////////////////////////////////////////-
    //-VIP充值多少钱可以到下一级
    VipSystem.prototype.GetVipFeed = function () {
        var heroInfo = GetHeroPropertyInfo();
        var maxExp = 0;
        if (heroInfo.VIP_level + 1 > defaultValue.DEFALUT_VIP_MAX_LEVEL) {
            maxExp = GameConfig.VipEXP[defaultValue.DEFALUT_VIP_MAX_LEVEL]["exp"];
        }
        else {
            maxExp = GameConfig.VipEXP[heroInfo.VIP_level + 1]["exp"];
        }
        maxExp = maxExp - heroInfo.VIP_exp;
        return maxExp;
    };
    //获取指定vip等级所需晶石数
    VipSystem.prototype.getVipSumDia = function (vipLevel) {
        vipLevel = vipLevel + 1;
        if (vipLevel > defaultValue.DEFALUT_VIP_MAX_LEVEL) {
            vipLevel = defaultValue.DEFALUT_VIP_MAX_LEVEL;
        }
        var sum = GameConfig.VipEXP[vipLevel].exp;
        return sum;
    };
    //获取指定vip等级需要充值多少晶石
    VipSystem.prototype.getVipSum = function (vipLevel) {
        if (vipLevel == 0) {
            return 0;
        }
        vipLevel = vipLevel + 1;
        if (vipLevel > defaultValue.DEFALUT_VIP_MAX_LEVEL) {
            vipLevel = defaultValue.DEFALUT_VIP_MAX_LEVEL;
        }
        var config = GameConfig.VipEXP;
        //let sum = GameConfig.VipEXP[vipLevel].exp
        var sum = GameConfig.VipEXP[vipLevel].vip_exp;
        return sum;
    };
    ////////////////////////////////////////////////////////////////////////////////-
    //-获取VIP扫荡次数
    VipSystem.prototype.GetVipSweep = function () {
        var level = this.GetVipLevel();
        var count = GameConfig.VipPrivilege[level]["campainWipe"];
        return count["param"][0];
    };
    //-获取VIP竞技场挑战次数
    VipSystem.prototype.GetVipChampionTime = function () {
        var level = this.GetVipLevel();
        var count = GameConfig.VipPrivilege[level]["championCount"];
        return count["param"][0];
    };
    //-获取VIP免费抽环次数
    VipSystem.prototype.GetVipFreeBateTime = function () {
        var level = this.GetVipLevel();
        var count = GameConfig.VipPrivilege[level]["recruitBateCount"];
        return count["param"][0];
    };
    //-获取VIP免费刷新次数
    VipSystem.prototype.GetVipFreeUpdateTime = function () {
        var level = this.GetVipLevel();
        var count = GameConfig.VipPrivilege[level]["recruitHoopCount"];
        return count["param"][0] || 0;
    };
    //-获取VIP竞技场减cd时间
    VipSystem.prototype.GetVipChampionTimeTime = function () {
        var level = this.GetVipLevel();
        var count = GameConfig.VipPrivilege[level]["championTime"];
        return count["param"][0];
    };
    VipSystem.prototype.GetVipDivinationCpunt = function () {
        var level = this.GetVipLevel();
        var count = GameConfig.VipPrivilege[level]["choujiang"];
        return count["param"][0];
    };
    VipSystem.prototype.GetVipCanRestartTower = function () {
        var level = this.GetVipLevel();
        var count = GameConfig.VipPrivilege[level]["skyTowerCount"]["param"][0];
        return count;
    };
    //死亡领域重置数量
    VipSystem.prototype.getAbsoZoneReset = function () {
        var level = this.GetVipLevel();
        return GameConfig.VipPrivilege[level]["deadField"]["param"][0] || 0;
    };
    //购买金币和体力限制
    VipSystem.prototype.getGoldOrPowerLimit = function (buyType) {
        var vipLevel = this.GetVipLevel();
        if (buyType == opItemUnit.FUNDS) {
            return GameConfig.VipPrivilege[vipLevel]["buyFund"]["param"][0];
        }
        else if (buyType == opItemUnit.POWER) {
            return GameConfig.VipPrivilege[vipLevel]["buyPower"]["param"][0];
        }
        return 0;
    };
    //聊天气泡
    // getChatBubbleList() {
    //     let list = []
    //     let vipLevel = [0, 1, 3, 5, 8, 12]
    //     for (let _ in vipLevel) {
    //         let v = vipLevel[_]
    //         let info = GameConfig.VipPrivilege[v]["chatBubble"]["param"]
    //         JsUtil.arrayInstert(list, [info[0], info[1], v])
    //     }
    //     return list
    // }
    VipSystem.prototype.getHeadIconKuang = function (viplevel) {
        if (viplevel == null || viplevel <= 4) {
            return "ty_renWuKuang01";
        }
        if (viplevel <= 6) {
            return "ty_renWuKuang02";
        }
        if (viplevel <= 8) {
            return "ty_renWuKuang03";
        }
        if (viplevel <= 10) {
            return "ty_renWuKuang04";
        }
        if (viplevel <= 12) {
            return "ty_renWuKuang05";
        }
        return "ty_renWuKuang06";
        //0~4 01
        //5~6 02
        //7~8 03
        //9~10 04
        //11~12 05
        //13 06
    };
    //聊天气泡//getSortChatBubbleList
    VipSystem.prototype.getSortChatBubbleList = function () {
        var t1 = [], t2 = [], t3 = [];
        var size = size_t(GameConfig.VipChatBubbleConfig);
        for (var k = 1; k <= size; k++) {
            var v = GameConfig.VipChatBubbleConfig[k];
            if (size_t(v.quest) == 0) {
                JsUtil.arrayInstert(t1, v);
            }
            else if (v.quest[0] == "item") {
                JsUtil.arrayInstert(t2, v);
            }
            else if (v.quest[0] == "vip") {
                JsUtil.arrayInstert(t3, v);
            }
        }
        var list = [];
        for (var _ = 0; _ < t1.length; _++) {
            var v = t1[_];
            JsUtil.arrayInstert(list, v);
        }
        for (var _ = 0; _ < t2.length; _++) {
            var v = t2[_];
            JsUtil.arrayInstert(list, v);
        }
        table_sort(t3, function (a, b) {
            return a.quest[1] - b.quest[1];
        });
        for (var _ = 0; _ < t3.length; _++) {
            var v = t3[_];
            JsUtil.arrayInstert(list, v);
        }
        return list;
    };
    return VipSystem;
}(BaseSystem));
__reflect(VipSystem.prototype, "VipSystem");
//# sourceMappingURL=VipSystem.js.map