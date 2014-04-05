var DidJS = DidJS || {};

define(function() {

	var keysStroke = [];

	function Keyboard(keys) {
		var _boundaryOnXMin, _boundaryOnXMax, _boundaryOnYMin, _boundaryOnYMax;
		var self = this;

		var defaultKeyboardKeys = [
			{
				name : 'left',
				key : 37,
				strokeMethod: function(gObject) {
					self.move(gObject).toXAxis(-1);
				}
			},
			{
				name : 'up',
				key : 38,
				strokeMethod: function(gObject) {
					self.move(gObject).toYAxis(-1);
				}
			},
			{
				name : 'right',
				key : 39,
				strokeMethod: function(gObject) {
					self.move(gObject).toXAxis(1);
				}
			},
			{
				name : 'down',
				key : 40,
				strokeMethod: function(gObject) {
					self.move(gObject).toYAxis(1);
				}
			}
		];

		var getBoundariesStatusFor = function(x, y, width, height) {
			var whichBoundary = {
				onXMin : false,
				onYMin : false,
				onXMax : false,
				onYMax : false
			}

			if (x < _boundaryOnXMin) {
				whichBoundary.onXMin = true;
			}

			if (x + width > _boundaryOnXMax) {
				whichBoundary.onXMax = true;
			}

			if (y < _boundaryOnYMin) {
				whichBoundary.onYMin = true;
			}

			if (y + height > _boundaryOnYMax) {
				whichBoundary.onYMax = true;
			}

			return whichBoundary;
		}

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

		this.setBoundariesOnX = function(min, max) {
			_boundaryOnXMin = min;
			_boundaryOnXMax = max;
		}

		this.setBoundariesOnY = function(min, max) {
			_boundaryOnYMin = min;
			_boundaryOnYMax = max;
		}

		this.move = function(gObject) {
			return { 
				toXAxis : function(direction) {
					var x = gObject.position.X + (gObject.velX * direction);
					var boundariesStatus = getBoundariesStatusFor(x, gObject.position.Y, gObject.width, gObject.height);

					if (boundariesStatus.onXMin) {
						gObject.position.X = _boundaryOnXMin;
					}
					else if (boundariesStatus.onXMax) {
						gObject.position.X = _boundaryOnXMax - gObject.width; 
					}
					else {
						gObject.position.X = x;
					}
				},
				toYAxis : function(direction) {
					var y = gObject.position.Y + gObject.velY * direction;
					var boundariesStatus = getBoundariesStatusFor(gObject.position.X, y, gObject.width, gObject.height);

					if (boundariesStatus.onYMin) {
						gObject.position.Y = _boundaryOnYMin;
					}
					else if (boundariesStatus.onYMax) {
						gObject.position.Y = _boundaryOnYMax - gObject.height; 
					}
					else {
						gObject.position.Y = y;
					}
					
				}
			}
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