// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WordFilter = (function () {
    function WordFilter() {
    }
    WordFilter.initFilterList = function (list) {
        this.mFilterList = list;
    };
    WordFilter.initForbidName = function (list) {
        if (list == null)
            list = [];
        list.push(",");
        list.push("#");
        list.push(";");
        list.push("'");
        list.push("\"");
        this.mForbidNameList = list;
    };
    WordFilter.checkword = function (str) {
        if (this.mForbidNameList == null)
            return true;
        for (var _i = 0, _a = this.mForbidNameList; _i < _a.length; _i++) {
            var word = _a[_i];
            if (str.indexOf(word) != -1)
                return false;
        }
        for (var _b = 0, _c = this.mFilterList; _b < _c.length; _b++) {
            var word = _c[_b];
            if (str.indexOf(word) != -1)
                return false;
        }
        return true;
    };
    WordFilter.filtWord = function (str) {
        if (this.mFilterList == null)
            return str;
        //获取文本输入框中的内容  
        //遍历敏感词数组  
        for (var i = 0; i < this.mFilterList.length; i++) {
            var word = this.mFilterList[i];
            //全局替换  
            //判断内容中是否包括敏感词  
            if (str.indexOf(word) != -1) {
                var reg = new RegExp(word, "g");
                var result = str.replace(reg, "*");
                str = result;
            }
        }
        return str;
    };
    WordFilter.mFilterList = null;
    WordFilter.mForbidNameList = null;
    return WordFilter;
}());
__reflect(WordFilter.prototype, "WordFilter");
//# sourceMappingURL=WordFilter.js.map