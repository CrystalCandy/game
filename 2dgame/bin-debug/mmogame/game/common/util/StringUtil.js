var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StringUtil = (function () {
    function StringUtil() {
    }
    StringUtil.splitString = function (str, sep) {
        return str.split(sep);
    };
    StringUtil.isEmpty = function (str) {
        return str.trim() == "";
    };
    StringUtil.isAlphaNumber = function (str) {
        var result = this.stringMatch(str, /\w+/);
        if (result == null)
            return false;
        return result[0] == str;
    };
    StringUtil.isNumber = function (str) {
        var result = this.stringMatch(str, /\d+/);
        if (result == null)
            return false;
        return result[0] == str;
    };
    StringUtil.lower = function (str) {
        return str.toLowerCase();
    };
    //指定开始位置，使用正则表达式搜索
    StringUtil.stringSeach = function (str, pattern, pos) {
        if (!pos) {
            pos = 0;
        }
        var reg = new RegExp(pattern, "g");
        reg.lastIndex = pos;
        var result = reg.exec(str);
        if (result) {
            return result.index;
        }
        // var str="target12"
        // str.match(/target(\d+\)/)
        return -1;
    };
    StringUtil.stringMatch = function (str, pattern) {
        //该数组的第 0 个元素存放的是匹配文本，而其余的元素存放的是与正则表达式的子表达式匹配的文本。返回的数组还含有两个对象属性:
        //index 属性声明的是匹配文本的起始字符在 stringObject 中的位置
        //input 属性声明的是对 stringObject 的引用
        var result = str.match(pattern);
        if (result) {
            if (result.length == 1) {
                return result;
            }
            result.splice(0, 1); //第一个匹配文本不用保存
            return result;
        }
        return null;
    };
    StringUtil.stringReplace = function (str, pattern, replaceVal) {
        var reg = new RegExp(pattern, "g");
        return str.replace(reg, replaceVal);
    };
    StringUtil.stringReplaceWithReg = function (str, reg, replace) {
        //var reg = new RegExp(pattern, "g");
        return str.replace(reg, replace);
    };
    StringUtil.isEmptyContent = function (str) {
        return str.match(/^\s*$/) != null;
    };
    //bit是1开始
    StringUtil.getBit = function (num, _bit) {
        var bit = _bit - 1;
        var n = num.charAt(bit);
        if (n == "") {
            return "0";
        }
        return n;
    };
    //字符串式整型，逻辑上位数自左至右递增，例如整型1010，的字符串式为"0101"  bit是1开始
    StringUtil.changeBit = function (num, _bit, cs) {
        var reNum = "";
        var bit = _bit - 1;
        var n = num.charAt(bit);
        if (n == "" || n == null) {
            for (var i = 0; i <= bit; i++) {
                var n_1 = num.charAt(i);
                if (n_1 == "" || n_1 == null) {
                    n_1 = "0";
                }
                if (bit == i) {
                    n_1 = cs;
                }
                reNum = reNum + n_1;
            }
        }
        else {
            for (var i = 0; i < num.length; i++) {
                var n_2 = num.charAt(i);
                if (i == bit) {
                    n_2 = cs;
                }
                reNum = reNum + n_2;
            }
        }
        //TLog.Debug("2222222222222222", reNum)
        return reNum;
    };
    ///////////////////////////////////////////////////////////////////////////////////////////
    //将时间字符串转成秒数,格式：xxxx-xx-xx xx:xx:xx
    StringUtil.getTimeFromString = function (str) {
        if (str == null || str == "") {
            return null;
        }
        var ret = this.stringMatch(str, /(\d+)-(\d+)-(\d+) ?(\d*):?(\d*):?(\d*)/);
        var year = tonumber(ret[0]) || 0;
        var month = tonumber(ret[1]) || 0;
        var day = tonumber(ret[2]) || 0;
        var hour = tonumber(ret[3]) || 0;
        var min = tonumber(ret[4]) || 0;
        var sec = tonumber(ret[5]) || 0;
        var d = new Date();
        d.setFullYear(year, month - 1, day);
        d.setHours(hour, min, sec, 0);
        return d.getTime() / 1000;
    };
    return StringUtil;
}());
__reflect(StringUtil.prototype, "StringUtil");
//# sourceMappingURL=StringUtil.js.map