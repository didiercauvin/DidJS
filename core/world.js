var DidJS = DidJS || {};

define(['core/Renderer',
	    'core/Collider/Collider', 'core/AnimationManager'], function(Renderer, Collider, AnimationManager) {
	DidJS.World = function(canvasName, width, height) {
		var _animationManager = new AnimationManager();
		var _renderer;
		var _worldObjects = [];
		var _collider = new Collider(_worldObjects);

		_renderer = new Renderer(canvasName, width, height);

		var gameLoop = function() {
			_renderer.clearScene();
			_worldObjects.forEach(function(obj) {

				if (!!obj.keyboard) {
					obj.keyboard.stroke();
				}

				_animationManager.animate(obj);
				_renderer.draw(obj);
			});

			requestAnimationFrame(gameLoop);
		}

		this.render = function() {
			gameLoop();
		}

		this.add = function(gameObject) {
			_worldObjects.push(gameObject);

			if (gameObject.frames) {
				_animationManager.add(gameObject);
			}
		}
	}

	return DidJS.World;
})