
//  
//  WebCC
//  Made by 1lann and GravityScore
//  



var osAPI = {};


osAPI.setAlarm = function(L) {

}


osAPI.getComputerID = function(L) {
	C.lua_pushnumber(L, tempID);
	return 1;
}


osAPI.getComputerLabel = function(L) {
	if (label) {
		C.lua_pushstring(L, label);
		return 1;
	} else {
		return 0;
	}
}


osAPI.setComputerLabel = function(L) {
	var str = C.luaL_checkstring(L, 1);
	label = str;
	return 0;
}


osAPI.clock = function(L) {
	var diff = Date.now() - startClock;
	var retDiff = Math.round(diff * 0.1) / 100;
	C.lua_pushnumber(L, retDiff);
	return 1;
}


osAPI.time = function(L) {
	C.lua_pushstring(L, "Time not supported!");
	C.lua_error(L);
	return 0;
}


osAPI.day = function(L) {

}


osAPI.startTimer = function(L) {
	var time = C.luaL_checknumber(L, 1);
	computer.lastTimerID++;

	var timerID = computer.lastTimerID;
	setTimeout(function() {
		computer.eventStack.push(["timer", timerID]);
		resumeThread();
	}, time * 1000);
	C.lua_pushnumber(L, timerID);

	return 1;
}


osAPI.queueEvent = function(L) {
	var queueObject = [];
	queueObject.push(C.luaL_checkstring(L, 1));

	var top = C.lua_gettop(L);
	for (var i = 1; i <= top; i++) {
		var t = C.lua_type(L, i);
		if (t == C.LUA_TSTRING) {
			queueObject.push(C.lua_tostring(L, i));
		} else if (t == C.LUA_TBOOLEAN) {
			if (C.lua_toboolean(L, i)) {
				queueObject.push(true);
			} else {
				queueObject.push(false);
			}
		} else if (t == C.LUA_TNUMBER) {
			queueObject.push(C.lua_tonumber(L, i));
		} else {
			queueObject.push(null);
		}
	}

	computer.eventStack.push(queueObject);
	return 0;
}


osAPI.shutdown = function(L) {

}


osAPI.reboot = function(L) {

}


osAPI["computerLabel"] = osAPI["getComputerLabel"];
osAPI["computerID"] = osAPI["getComputerID"];
