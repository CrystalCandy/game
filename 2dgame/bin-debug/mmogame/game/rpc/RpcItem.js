var RpcLogic;
(function (RpcLogic) {
    function G2C_ItemList(itemInfoList) {
        for (var k = 0; k < itemInfoList.length; k++) {
            var v = itemInfoList[k];
            var logicItem = Item.newObj(v);
            ItemSystem.getInstance().addItem(logicItem);
        }
        ItemSystem.getInstance().onGetItemList();
        FireEvent(EventDefine.ITEM_UPDATE, null);
    }
    RpcLogic.G2C_ItemList = G2C_ItemList;
    function G2C_ItemUpdate(itemInfoList) {
        for (var k = 0; k < itemInfoList.length; k++) {
            var v = itemInfoList[k];
            var logicItem = Item.newObj(v);
            // let itemEntryId = logicItem["propertyInfo"]["entry"]
            // let itemId = logicItem["id"]
            //TLog.Debug("UPDATE", itemEntryId, itemId)
            ItemSystem.getInstance().addItem(logicItem);
        }
        //FireEvent(EventDefine.ITEM_UPDATE_LIST, ItemUpdateListEvent.new(message.ItemList))
        FireEvent(EventDefine.ITEM_UPDATE, null);
    }
    RpcLogic.G2C_ItemUpdate = G2C_ItemUpdate;
    function G2C_ItemDrop(itemId) {
        ItemSystem.getInstance().removeItem(itemId);
        FireEvent(EventDefine.ITEM_UPDATE, null);
    }
    RpcLogic.G2C_ItemDrop = G2C_ItemDrop;
    function G2C_ItemSellList(shopIndex, itemInfoList) {
        var itemList = [];
        for (var k = 0; k < itemInfoList.length; k++) {
            var v = itemInfoList[k];
            var logicItem = Item.newObj(v);
            itemList.push(logicItem);
        }
        ItemSystem.getInstance().setShopSellItemList(shopIndex, itemList);
        var message = {};
        message.shopIndex = shopIndex;
        message.itemList = itemList;
        FireEvent(EventDefine.ITEM_SELL_LIST, NetMessageEvent.newObj(message));
    }
    RpcLogic.G2C_ItemSellList = G2C_ItemSellList;
    function G2C_ItemLottery(posList, itemInfoList) {
        for (var i = 0; i < posList.length; i++) {
            itemInfoList[i].lottoPos = posList[i];
        }
        FireEvent(EventDefine.RESOLVE_ITEM_RESULT, ResolveResult.newObj(itemInfoList.length, itemInfoList));
    }
    RpcLogic.G2C_ItemLottery = G2C_ItemLottery;
    //通用物品奖励
    function G2C_CommonItemPrize(itemList) {
        var wnd = WngMrg.getInstance().getWindow("PrizeShowFrame");
        wnd.showAndSetData(itemList);
    }
    RpcLogic.G2C_CommonItemPrize = G2C_CommonItemPrize;
})(RpcLogic || (RpcLogic = {}));
//# sourceMappingURL=RpcItem.js.map