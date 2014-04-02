define(['core/Renderer', 'core/ShapeFactory', 'core/Movement'], function(Renderer, ShapeFactory, Movement) {
	function World(canvasName, width, height) {
		var _renderer;
		var _shapeFactory;
		var _worldObjects = [];
		var _keys = [];
		var movement = new Movement();

		_renderer = new Renderer(canvasName, width, height);
		_shapeFactory = new ShapeFactory();

		var gameLoop = function() {
			_renderer.clearScene();
			_worldObjects.forEach(function(obj) {
				if (!!obj.keyboard) {
					_keys.forEach(function(keyCode) {
						obj.keyboard.stroke(keyCode);
					})
				}

				_renderer.draw(obj);
			});

			requestAnimationFrame(gameLoop);
		}

		this.render = function() {
			gameLoop();
		}

		this.create = function(shape, properties) {
			return _shapeFactory.create(shape, properties);
		}

		this.add = function(gameObject) {
			_worldObjects.push(gameObject);
		}

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

		this.createKeyboard = function(keys) {
			var keyboard = { _keys : keys };

			if (!keys) {
				keyboard._keys = defaultKeyboardKeys;
			}

			keyboard.setStrokeMethodFor = function(keyName, method) {
				this._keys.forEach(function(key) {
					if (key.name === keyName) {
						key.strokeMethod = method;
						return;
					}
				});
			}

			keyboard.connectTo = function(gObject) {
				console.log('keyboard connected to object');
				gObject.keyboard = this;
				gObject.keyboard.parent = gObject;

				return this;
			}

			keyboard.addButton = function(buttonProperties) {
				this._keys.push(buttonProperties);
			}

			keyboard.stroke = function(keyCode) {
				var gObject = this.parent;
				this._keys.forEach(function(keyProperties) {
					if (keyCode == keyProperties.key) {
						keyProperties.strokeMethod(gObject);
					}
				})
			}

			keyboard.redefineKeys = function(keysToMap) {
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

			keyboard.redefineKey = function(keyToMap) {
				return this.redefineKeys([keyToMap]);
			}

			return keyboard;
		}

		window.addEventListener("keydown", function(e) {
			_keys.push(e.keyCode);
		});

		window.addEventListener("keyup", function(e) {
			_keys.splice(0, e.keyCode);
		});

		

	}

	return World;
})