/*
作者:
    ljq
    
创建时间：
    2018.3.21(周四)

意图：
    商店系统

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
var ShopSystem = (function (_super) {
    __extends(ShopSystem, _super);
    function ShopSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShopSystem.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.onClear();
    };
    ShopSystem.prototype.onClear = function () {
        this.shopList = {};
    };
    ShopSystem.prototype.destory = function () {
        this.onClear();
    };
    ShopSystem.prototype.prepareResource = function (workQueue) {
        GameConfig.initShopSystemCsv(workQueue);
    };
    ShopSystem.prototype.initShopList = function (info) {
        this.shopList = {};
        for (var k = 0; k < size_t(info); k++) {
            var v = info[k];
            var tempConfig = {};
            tempConfig["shopEntry"] = v[2];
            tempConfig["index"] = v[0];
            tempConfig["count"] = v[1];
            if (this.shopList[v[2]] == null) {
                this.shopList[v[2]] = [];
            }
            table_insert(this.shopList[v[2]], tempConfig);
        }
        FireEvent(EventDefine.SHOP_FUN_UPDATE, null);
    };
    //更新消息
    ShopSystem.prototype.updateShopInfoField = function (id, info) {
    };
    ShopSystem.prototype.getShopInfo = function (shopEntry) {
        return this.shopList[shopEntry];
    };
    ShopSystem.prototype.getShopPosInfo = function (shopEntry, index) {
        var tempConfig = this.shopList[shopEntry];
        if (tempConfig == null) {
            return null;
        }
        for (var k in tempConfig) {
            var temp = tempConfig[k];
            if (temp.index = index) {
                return temp;
            }
        }
        return null;
    };
    //---------------装备商店
    ShopSystem.prototype.getShopEquipItemList = function () {
        var equiplist = [];
        var tempConfig = GameConfig.ShopCommodityConfig;
        for (var k in tempConfig) {
            var v = tempConfig[k];
            for (var key in v) {
                var temp = v[key];
                if (temp.groupName == ShopSystem.SHOP_ZHUANGBEI) {
                    if (table_isExsit(equiplist, temp.shopEntry) == false) {
                        table_insert(equiplist, temp.shopEntry);
                    }
                }
            }
        }
        return equiplist;
    };
    ///////////////////////通用商店接口
    //获取各个商店的shopEntry
    ShopSystem.prototype.getShopEntryByGroupName = function (groupName) {
        if (groupName == ShopSystem.SHOP_ZHUANGBEI) {
            return 0;
        }
        var tempConfig = GameConfig.ShopCommodityConfig;
        for (var k in tempConfig) {
            var v = tempConfig[k];
            for (var key in v) {
                if (v[key].groupName == groupName) {
                    return v[key].shopEntry;
                }
            }
        }
    };
    //更具商店的shopEntry获得商店名字
    ShopSystem.prototype.getShopNameByEntry = function (entry) {
        if (entry == 0) {
            return Localize_cns("SHOP_TXT1");
        }
        return GameConfig.ShopCommodityConfig[entry][1].shopName;
    };
    //根据商店的shopEntry获得商店的itemlist
    ShopSystem.prototype.getShopItemList = function (entry) {
        var tempConfig = GameConfig.ShopCommodityConfig[entry];
        var recvConfig = [];
        var limitConfig = [];
        for (var k in tempConfig) {
            var netConfig = this.getShopPosInfo(entry, k);
            if (netConfig != null) {
                var limitTwice = this.getLimitTwice(entry, k); // 为0无限制
                if (limitTwice == 0) {
                    for (var k_1 in tempConfig) {
                        table_insert(recvConfig, tempConfig[k_1]);
                    }
                    return recvConfig;
                }
                if (netConfig.count >= limitTwice) {
                    table_insert(limitConfig, tempConfig[k]);
                }
                else {
                    table_insert(recvConfig, tempConfig[k]);
                }
            }
            else {
                table_insert(recvConfig, tempConfig[k]);
            }
        }
        if (size_t(limitConfig) != 0) {
            for (var k in limitConfig) {
                table_insert(recvConfig, limitConfig[k]);
            }
        }
        return recvConfig;
    };
    //取到消耗物品
    ShopSystem.prototype.getShopCostItemStr = function (groupName) {
        var entry = this.getShopEntryByGroupName(groupName);
        var costItem = GameConfig.ShopCommodityConfig[entry][1].costItem || 2;
        var recvStr = "";
        if (costItem == 2 || costItem == 3) {
            recvStr += GetMoneyIcon(costItem) + GetHeroMoney(costItem);
        }
        else {
            recvStr += GetTagIcon(costItem) + ItemSystem.getInstance().getItemCount(costItem);
        }
        return recvStr;
    };
    //////ShopitemBox
    ShopSystem.prototype.getShopCostStr = function (shopEntry, index) {
        var recvStr = "";
        var shopConfig = GameConfig.ShopCommodityConfig[shopEntry][index];
        if (shopConfig.money != 0) {
            recvStr += GetMoneyIcon(shopConfig.money) + "X" + shopConfig.price;
        }
        else if (shopConfig.unit != 0) {
            recvStr += GetTagIcon(shopConfig.unit) + "X" + shopConfig.price;
        }
        return recvStr;
    };
    ShopSystem.prototype.getShopJudgeStr = function (shopEntry, index) {
        var recvStr = Localize_cns("SHOP_TXT4");
        var shopConfig = GameConfig.ShopCommodityConfig[shopEntry][index];
        var tempInfo = this.getShopPosInfo(shopEntry, index);
        var limitTwice = this.getLimitTwice(shopEntry, index); //限购次数
        if (limitTwice != 0) {
            var hadBuy = 0;
            if (tempInfo != null) {
                hadBuy = tempInfo.count;
            }
            recvStr = String.format(Localize_cns("SHOP_TXT2"), hadBuy, limitTwice);
        }
        var limit = 0;
        var isEnough = false; //未解锁
        for (var k in opJudgeJieSuo) {
            var v = opJudgeJieSuo[k];
            if (shopConfig[v] != 0) {
                limit = shopConfig[v];
                isEnough = this.getJudgeIsEnough(v, limit); //是否达到解锁条件
                if (tempInfo != null) {
                    var hadBuy = tempInfo.count;
                    if (isEnough != false) {
                        recvStr = "#red" + String.format(this.getJudgeStr(v), limit);
                    }
                    else {
                        if (hadBuy >= limitTwice) {
                            recvStr = Localize_cns("SHOP_TXT3");
                        }
                        else {
                            recvStr = String.format(Localize_cns("SHOP_TXT2"), hadBuy, limitTwice);
                        }
                    }
                }
                else {
                    recvStr = "#red" + String.format(this.getJudgeStr(v), limit);
                }
            }
        }
        return recvStr;
    };
    ///----- 玩家各个条件
    ShopSystem.prototype.getHeroJudge = function (key) {
        var judgeList = {
            levelNum: GetHeroProperty("level"),
            gameCaseNum: 0,
            factionLevel: 0,
            rankingNum: 0,
            convoyNum: GetActivity(ActivityDefine.HuSong).getConvoyNum(),
            answerNum: 0,
        };
        return judgeList[key];
    };
    ////---- 判断玩家条件是否充足
    ShopSystem.prototype.getJudgeIsEnough = function (key, limit) {
        var heroJude = this.getHeroJudge(key);
        if (heroJude >= limit) {
            return true;
        }
        return false;
    };
    ShopSystem.prototype.getJudgeStr = function (key) {
        var judgeList = {
            levelNum: Localize_cns("SHOP_TIAOJIAN_TXT1"),
            gameCaseNum: Localize_cns("SHOP_TIAOJIAN_TXT2"),
            factionLevel: Localize_cns("SHOP_TIAOJIAN_TXT3"),
            rankingNum: Localize_cns("SHOP_TIAOJIAN_TXT4"),
            convoyNum: Localize_cns("SHOP_TIAOJIAN_TXT5"),
            answerNum: Localize_cns("SHOP_TIAOJIAN_TXT6"),
        };
        return judgeList[key];
    };
    ///获取限购次数
    ShopSystem.prototype.getLimitTwice = function (shopEntry, index) {
        var tempConfig = GameConfig.ShopCommodityConfig[shopEntry][index];
        if (tempConfig.limit != 0) {
            return tempConfig.limit;
        }
        else if (tempConfig.weekLimit != 0) {
            return tempConfig.weekLimit;
        }
        else if (tempConfig.lifeLimit != 0) {
            return tempConfig.lifeLimit;
        }
        else {
            return 0;
        }
    };
    ShopSystem.SHOP_YUANBAO = "yuanbao";
    ShopSystem.SHOP_BANGYUAN = "bangyuan";
    ShopSystem.SHOP_CHONGWU = "chongwu";
    ShopSystem.SHOP_XIANLV = "xianlv";
    ShopSystem.SHOP_ZHUANGBEI = "zhuangbei";
    ShopSystem.SHOP_LEIYIN = "leiyin";
    ShopSystem.SHOP_BANGHUI = "banghuishangdian";
    ShopSystem.FULI_BANGHUI = "banghuifuli";
    ShopSystem.SHOP_ZHUANGBAN = "zhuangban";
    ShopSystem.SHOP_PIFU = "pifu";
    ShopSystem.SHOP_YOUQING = "youqing";
    ShopSystem.SHOP_WEIWANG = "weiwang";
    ShopSystem.SHOP_JINGJI = "jingjishangdian";
    ShopSystem.FULI_JINGJI = "jingjifuli";
    ShopSystem.SHOP_HUSONG = "husong";
    ShopSystem.SHOP_DATI = "dati";
    return ShopSystem;
}(BaseSystem));
__reflect(ShopSystem.prototype, "ShopSystem");
//# sourceMappingURL=ShopSystem.js.map