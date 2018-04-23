// TypeScript file


class WordFilter {
    private static mFilterList = null;
    private static mForbidNameList = null;

    static initFilterList(list: string[]) {
        this.mFilterList = list;
    }

    static initForbidName(list: string[]) {
        if (list == null)
            list = [];

        list.push(",")
        list.push("#")
        list.push(";")
        list.push("'")
        list.push("\"")
        this.mForbidNameList = list;
    }

    static checkword(str: string): boolean {
        if (this.mForbidNameList == null)
            return true;

        for (let word of this.mForbidNameList) {
            if (str.indexOf(word) != -1)
                return false;
        }

        for (let word of this.mFilterList) {
            if (str.indexOf(word) != -1)
                return false;
        }

        return true;
    }

    static filtWord(str: string): string {
        if (this.mFilterList == null)
            return str;
        //获取文本输入框中的内容  

        //遍历敏感词数组  
        for (var i = 0; i < this.mFilterList.length; i++) {
            let word = this.mFilterList[i];
            //全局替换  

            //判断内容中是否包括敏感词  
            if (str.indexOf(word) != -1) {
                var reg = new RegExp(word, "g");
                var result = str.replace(reg, "*");
                str = result;
            }
        }

        return str;
    }
}