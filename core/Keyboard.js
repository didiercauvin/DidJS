var DidJS = DidJS || {};

define(function() {

	var keysStroke = [];
	var _bindedAnimations = [];

	function Keyboard(keys) {
		var self = this;


		var defaultKeyboardKeys = [
			{
				name : 'left',
				key : 37,
				strokeMethod: function(gObject) {
					self.move().toXAxis(-1);
				}
			},
			{
				name : 'up',
				key : 38,
				strokeMethod: function(gObject) {
					self.move().toYAxis(-1);
				}
			},
			{
				name : 'right',
				key : 39,
				strokeMethod: function(gObject) {
					self.move().toXAxis(1);
				}
			},
			{
				name : 'down',
				key : 40,
				strokeMethod: function(gObject) {
					self.move().toYAxis(1);
				}
			}
		];

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

		this.redefineKey = function(keyToMap, behaviour) {
			//return this.redefineKeys([keyToMap]);
			this._keys.forEach(function(key) {
				if (key.name === keyToMap) {
					key.strokeMethod = behaviour;
				}
			})
		}

		

		this.move = function() {
			var gObject = this.parent;
			return { 
				toXAxis : function(direction) {
					var x = gObject.position.X + (gObject.velX * direction);
					var boundariesStatus = DidJS.Game.world.getBoundariesStatusFor(x, gObject.position.Y, gObject.width, gObject.height);

					if (boundariesStatus.onXMin) {
						gObject.position.X = DidJS.Game.world.getBoundaryOnXMin();
					}
					else if (boundariesStatus.onXMax) {
						gObject.position.X = DidJS.Game.world.getBoundaryOnXMax() - gObject.width; 
					}
					else {
						gObject.position.X = x;
					}
				},
				toYAxis : function(direction) {
					var y = gObject.position.Y + gObject.velY * direction;
					var boundariesStatus = DidJS.Game.world.getBoundariesStatusFor(gObject.position.X, y, gObject.width, gObject.height);

					if (boundariesStatus.onYMin) {
						gObject.position.Y = DidJS.Game.world.getBoundaryOnYMin();
					}
					else if (boundariesStatus.onYMax) {
						gObject.position.Y = DidJS.Game.world.getBoundaryOnYMax() - gObject.height; 
					}
					else {
						gObject.position.Y = y;
					}
					
				}
			}
		}

		this.bindKey = function(bindkey) {
			var self = this;
			return {
				to : function(animation) {
					animation.bindkey = bindkey;
				}
			}
		}

		window.addEventListener("keydown", function(e) {
			var index = keysStroke.indexOf(e.keyCode);
			if (index === -1) {
				keysStroke.push(e.keyCode);
			}

			if (self.onKeyDown) {
				self._keys.forEach(function(keyProperties) {
					if (e.keyCode == keyProperties.key) {
						self.onKeyDown(keyProperties);
						
					}
				});
			}
		});

		window.addEventListener("keyup", function(e) {
			var index = keysStroke.indexOf(e.keyCode);
			if (index !== -1) {
				keysStroke.splice(index, 1);
			}

			if (self.onKeyUp) {
				self._keys.forEach(function(keyProperties) {
					if (e.keyCode == keyProperties.key) {
						self.onKeyUp(keyProperties);
						
					}
				});
			}
		});
	}



	return Keyboard;
})