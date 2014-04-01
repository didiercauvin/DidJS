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
				strokeMethod: function() {
					movement.goToXAxis(-1);
				}
			},
			{
				name : 'up',
				key : 38,
				strokeMethod: function() {
					movement.goToYAxis(-1);
				}
			},
			{
				name : 'right',
				key : 39,
				strokeMethod: function() {
					movement.goToXAxis(1);
				}
			},
			{
				name : 'down',
				key : 40,
				strokeMethod: function() {
					movement.goToYAxis(1);
				}
			}
		]

		this.addKeyboard = function(keys) {
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
				movement.setTo(gObject);
				gObject.keyboard = this;
				gObject.keyboard.parent = gObject;

				return this;
			}

			keyboard.addButton = function(buttonProperties) {
				this._keys.push(buttonProperties);
			}

			keyboard.stroke = function(keyCode) {
				this._keys.forEach(function(keyProperties) {
					if (keyCode == keyProperties.key) {
						keyProperties.strokeMethod();
					}
				})
			}

			return keyboard;
		}

		document.body.addEventListener("keydown", function(e) {
			_keys.push(e.keyCode);
		});

		document.body.addEventListener("keyup", function(e) {
			_keys.splice(0, e.keyCode);
		});

		

	}

	return World;
})