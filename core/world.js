define(['core/Renderer', 'core/ShapeFactory'], function(Renderer, ShapeFactory) {
	function World(canvasName, width, height) {
		var _renderer;
		var _shapeFactory;
		var _worldObjects = [];
		var _keys = [];

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

		var defaultKeyboard = {
			leftKey : '37',
			rightKey : '39',
			upKey : '38',
			downKey : '40'
		}

		this.addKeyboard = function(keyboard) {
			if (!keyboard) {
				keyboard = defaultKeyboard;
			}

			keyboard.connectTo = function(gObject) {
				console.log('keyboard connected to object');
				gObject.keyboard = this;
				gObject.keyboard.parent = gObject;
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