define(function() {
	function KeyboardManager() {
		
	}

	window.addEventListener("keydown", function(e) {
		_keys.push(e.keyCode);
	});

	window.addEventListener("keyup", function(e) {
		_keys.splice(0, e.keyCode);
	});

	return KeyboardManager;
})