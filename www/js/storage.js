storage = {
	putString:function(nameOfStorage,e){
		localStorage[nameOfStorage] = e;
	},
	getString:function(nameOfStorage){
		return localStorage[nameOfStorage];
	},
	putInt:function(nameOfStorage, e){
		localStorage[nameOfStorage] = e;
	},
	getInt:function (nameOfStorage){
		return parseInt(localStorage[nameOfStorage]);
	},
	putObject:function (nameOfStorage,e){
		var currentValue = JSON.stringify(e);
		localStorage[nameOfStorage] = currentValue;
	},
	getObject:function(nameOfStorage){
		var currentValue = localStorage[nameOfStorage];
		return JSON.parse(currentValue);
	},
	putBool:function(nameOfStorage,e){
		localStorage[nameOfStorage] = e;
	},
	getBool:function(nameOfStorage){
		var currentValue = localStorage[nameOfStorage];
		currentValue = currentValue.toLowerCase();
		if (currentValue != ("false" &&"0"& ""))
			return true;
		else
			return false;
	},
	clearAllStorage:function()
	{
		localStorage.clear();
	}
};
