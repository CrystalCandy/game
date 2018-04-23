
function replaceWholeWord(text, word, replace)
	text = string.gsub(text, "([^%w])".. word .."([^%w])", "%1"..replace.."%2")
	text = string.gsub(text, "(\n)".. word .."([^%w])", "%1"..replace.."%2")

	text = string.gsub(text, "([^%w])".. word .."$", "%1"..replace)
	return text
end



function replaceDefine(text)
	--opCodes = {  ->let opCodes = {
	--self.opCodes 不匹配
	text = string.gsub(text, "[\n]([_%w]+)%s*=%s*{", "\nlet %1:any = {")
	text = string.gsub(text, "[ \t]([_%w]+)%s*=%s*{", " %1:any = {")
	text = string.gsub(text, "{.-}", function(s)
							--s = string.gsub(s, "([_%[%]%w%.]+)[%s\t]*=[%s\t]*(.-)[%s\t]*,", "%1 : %2,")
							s = string.gsub(s, "=", ":")
							return s  end)

	return text
end

function replaceClass(text)

	--全局函数
	text = string.gsub(text, "function%s+([_%w]+)%s*%((.-)%)", "function %1(%2){")


	local temp = string.gsub(text, "([_%w]+)%s*=%s*inherit%(([_%w]+).-%)", "class %1 extends %2{")
	--判断有class则加{
	local hasClass = false
	if temp ~= text then
		hasClass = true
	end

	text = temp

	--构造函数
	text = string.gsub(text, "([_%w]+)%.init%s*=%s*function%(self,?(.-)%)", "public initObj(...args:any[]):void {")
	--成员函数
	text = string.gsub(text, "([_%w]+)%.([_%w]+)%s*=%s*function%s-%(self,?(.-)%)", "%2(%3){")

	--普通函数(self)
	text = string.gsub(text, "([_%w]+)%s*=%s*function%(self,?(.-)%)", "function %1(%2){")
	--没有self
	text = string.gsub(text, "([_%w]+)%s*=%s*function%((.-)%)", "function %1(%2){")

	text = string.gsub(text, "local%s-function", "function")

	--class之间加上}  ([%-]-)捕获注释符号--
	text = string.gsub(text, "([%-]-)class", "%1}\n\n%1class")
	text = string.gsub(text, "}\n\nclass", "class", 1) --把第一个class前面的}去掉

	if hasClass then
		text = text .. "\n}"
	end


	return text
end

function replaceFor(text)

	--for i in pairs(list) do
	local p = "for%s+([_%w]+)%s*in%s+pairs%s*%((.-)%)%s-do"
	text = string.gsub(text, p, "for(let %1 in %2){")

	--for i in ipairs(list) do
	local p = "for%s+([_%w]+)%s*in%s+ipairs%s*%((.-)%)%s-do"
	text = string.gsub(text, p, "for(let %1 in %2){")

	--for i,v in pairs(list) do
	local p = "for%s+([_%w]+)%s*,%s*([_%w]+)%s+in%s+pairs%s*%((.-)%)%s-do"
	text = string.gsub(text, p, [[for(let %1 in %3){
			let %2 = %3[%1]
	]])

	--for i,v in ipairs(list) do
	local p = "for%s+([_%w]+)%s*,%s*([_%w]+)%s+in%s+ipairs%s*%((.-)%)%s-do"
	text = string.gsub(text, p, [[for(let %1 = 0; %1 < %3.length; %1++){
			let %2 = %3[%1]
	]])

	--for i = 1, 3 do
	local p = "for%s+([_%w]+)%s*=%s*(.-)%s*,(.-)%s*do"
	text = string.gsub(text, p, [[for(let %1 = %2; %1 <= %3;%1++){]])


	return text
end

--语法
function replaceSyntax(text)

	text = string.gsub(text, "%-%-%[%[", "/*")
	text = string.gsub(text, "%]%]%-%-", "*/")
	text = string.gsub(text, "%]%]", "*/")

	text = string.gsub(text, "%-%-", "//")
	text = string.gsub(text, "%.%.%s+", "+")
	text = string.gsub(text, "([_%w]+):([_%w]+)%(", "%1.%2(")--match t:_foo()
	text = string.gsub(text, "(%(%s*%)):", "%1.") --match ():
	text = string.gsub(text, "~=", "!=")
	text = string.gsub(text, "#([%w%._]+)", "%1.length")


	text = replaceWholeWord(text, "local", "let")
	text = replaceWholeWord(text, "self", "this")
	text = replaceWholeWord(text, "nil", "null")

	text = replaceWholeWord(text, "not", "!")
	text = replaceWholeWord(text, "or", "||")
	text = replaceWholeWord(text, "and", "&&")

	text = string.gsub(text, "if%s+", "if(")
	text = replaceWholeWord(text, "then", "){")
	text = replaceWholeWord(text, "else", "}else{")
	text = replaceWholeWord(text, "elseif", "}else if")
	text = replaceWholeWord(text, "end", "}")

	text = replaceWholeWord(text, "while", "while(")
	text = replaceWholeWord(text, "do", "){")


	return text
end


--逻辑
function replaceLogic(text)

	text = string.gsub(text, "%.new%(", ".newObj(")
	text = string.gsub(text, "%.delete%(", ".deleteObj(")

	text = string.gsub(text, "ReadString1024", "readString")
	text = string.gsub(text, "ReadString64k", "readString")
	text = string.gsub(text, "ReadChar", "readChar")
	text = string.gsub(text, "ReadUChar", "readUChar")
	text = string.gsub(text, "ReadShort", "readShort")
	text = string.gsub(text, "ReadUShort", "readUShort")
	text = string.gsub(text, "ReadInt", "readInt")
	text = string.gsub(text, "ReadUInt", "readUInt")
	text = string.gsub(text, "ReadFloat", "readFloat")
	text = string.gsub(text, "ReadDouble", "readDouble")
	text = string.gsub(text, "ReadBool", "readBool")
	--text = replaceWholeWord(text, "Read", "read")
	--text = string.gsub(text, "Read", "read")

	text = string.gsub(text, "WriteString1024", "writeString")
	text = string.gsub(text, "WriteString64k", "writeString")
	text = string.gsub(text, "WriteChar", "writeChar")
	text = string.gsub(text, "WriteUChar", "writeUChar")
	text = string.gsub(text, "WriteShort", "writeShort")
	text = string.gsub(text, "WriteUShort", "writeUShort")
	text = string.gsub(text, "WriteInt", "writeInt")
	text = string.gsub(text, "WriteUInt", "writeUInt")
	text = string.gsub(text, "WriteFloat", "writeFloat")
	text = string.gsub(text, "WriteDouble", "writeDouble")
	text = string.gsub(text, "WriteBool", "writeBool")
	--text = replaceWholeWord(text, "Write", "write")


	text = string.gsub(text, "table%.load", "table_load")
	text = string.gsub(text, "table%.save", "table_save")
	text = string.gsub(text, "table%.sort", "table_sort")
	text = string.gsub(text, "table%.remove", "JsUtil.arrayRemove")
	text = string.gsub(text, "table%.insert", "JsUtil.arrayInstert")

	text = string.gsub(text, "extends null", "extends TClass")

	text = string.gsub(text, "Log%.Debug", "TLog.Debug")
	text = string.gsub(text, "Log%.Warning", "TLog.Warn")
	text = string.gsub(text, "Log%.Error", "TLog.Error")
	text = replaceWholeWord(text, "print", "TLog.Debug")
	text = replaceWholeWord(text, "assert", "TLog.Assert")
	text = replaceWholeWord(text, "math", "Math")


	text = string.gsub(text, "Timer%.getInstance%(%)%.killTimer", "KillTimer")
	text = string.gsub(text, "Timer%.getInstance%(%)%.setTimer", "SetTimer")

	text = string.gsub(text, "string%.format", "String.format")


	text = string.gsub(text, "gui.Color16", "gui.Color")
	text = string.gsub(text, "%.SetTitleUtf8", ".text = ")
	text = string.gsub(text, ":SetTitleUtf8", ".text = ")

	text = string.gsub(text, "%.SetTitleColor", ".textColor = ")
	text = string.gsub(text, ":SetTitleColor", ".textColor = ")

	text = string.gsub(text, "%.SetVisible", ".visible = ")
	text = string.gsub(text, ":SetVisible", ".visible = ")

	text = string.gsub(text, "%.SetEnable", ".enabled = ")
	text = string.gsub(text, ":SetEnable", ".enabled = ")

	text = string.gsub(text, "%.SetImageName", ".source = ")
	text = string.gsub(text, ":SetImageName", ".source = ")

	text = string.gsub(text, "%.GetName%(%)", ".name")
	text = string.gsub(text, "%.GetWidth%(%)", ".width")
	text = string.gsub(text, "%.GetHeight%(%)", ".height")

	text = string.gsub(text, "%.SetDoModel", ".setDoModal")




	text = string.gsub(text, "gui.Window.MouseUpEvent", "egret.TouchEvent.TOUCH_TAP")
	text = string.gsub(text, "gui.Window.MouseClickEvent", "egret.TouchEvent.TOUCH_TAP")


	text = string.gsub(text, "gui.Window.TraceMouseAll", "true")





	return text
end


function lua2ts(text)

	text = replaceDefine(text)
	text = replaceClass(text)
	text = replaceFor(text)
	text = replaceSyntax(text)
	text = replaceLogic(text)


	return text
end


function main()
	local inputName = "input.txt"
	local outName = "output.txt"

	local file = io.open(inputName, "r+")
	local text = file:read("*a")
	file:close()

	text = lua2ts(text)


	local file = io.open(outName, "w+")
	file:write(text)
	file:close()

	print(text)
end


main()
