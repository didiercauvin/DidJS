var DidJS = DidJS || {};

define(['core/Movement'], function(Movement) {

	var movement = new DidJS.Movement();

	var defaultKeyboardKeys = [
		{
			name : 'left',
			key : 37,
			strokeMethod: function(gObject) {
				movement.move(gObject).toXAxis(-1);
			}
		},
		{
			name : 'up',
			key : 38,
			strokeMethod: function(gObject) {
				movement.move(gObject).toYAxis(-1);
			}
		},
		{
			name : 'right',
			key : 39,
			strokeMethod: function(gObject) {
				movement.move(gObject).toXAxis(1);
			}
		},
		{
			name : 'down',
			key : 40,
			strokeMethod: function(gObject) {
				movement.move(gObject).toYAxis(1);
			}
		}
	]

	var keysStroke = [];

	function Keyboard(keys) {

		this._keys = keys;

		if (!keys) {
			this._keys = defaultKeyboardKeys;
		}


		this.setStrokeMethodFor = function(keyName, method) {
			this._keys.forEach(function(key) {
				if (key.name === keyName) {
					key.strokeMethod = method;
					return;
				}
			});
		}

		this.connectTo = function(gObject) {
			console.log('keyboard connected to object');
			gObject.keyboard = this;
			gObject.keyboard.parent = gObject;

			return this;
		}

		this.addButton = function(buttonProperties) {
			this._keys.push(buttonProperties);
		}

		this.stroke = function() {
			var self = this;
			var gObject = self.parent;

			keysStroke.forEach(function(keyCode) {
				self._keys.forEach(function(keyProperties) {
					if (keyCode == keyProperties.key) {
						keyProperties.strokeMethod(gObject);
						return;
					}
				})
			}) 
			
		}

		this.redefineKeys = function(keysToMap) {
			var self = this;
			keysToMap.forEach(function(keyToMap) {
				self._keys.forEach(function(key) {
					if (keyToMap.name == key.name) {
						key.key = keyToMap.key;
						return;
					}
				})
			})

			return this;
		}

		this.redefineKey = function(keyToMap) {
			return this.redefineKeys([keyToMap]);
		}
	}

	window.addEventListener("keydown", function(e) {
		var index = keysStroke.indexOf(e.keyCode);
		if (index === -1) {
			keysStroke.push(e.keyCode);
		}
	});

	window.addEventListener("keyup", function(e) {
		var index = keysStroke.indexOf(e.keyCode);
		if (index !== -1) {
			keysStroke.splice(index, 1);
		}
	});

	return Keyboard;
})