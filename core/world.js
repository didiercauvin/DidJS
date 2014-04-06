var DidJS = DidJS || {};

define(['core/Renderer',
	    'core/Collider/Collider'], function(Renderer, Collider) {
	DidJS.World = function(canvasName, width, height) {
		var _renderer;
		var _worldObjects = [];
		var _collider = new Collider(_worldObjects);

		_renderer = new Renderer(canvasName, width, height);

		var gameLoop = function() {
			_renderer.clearScene();
			_worldObjects.forEach(function(obj) {
				var hasKeyboard = !!obj.keyboard;
				if (hasKeyboard) {
					obj.keyboard.stroke();
				}

				DidJS.AnimationManager.animate(obj);
				_renderer.draw(obj);

				obj.animations.forEach(function(animation) {
					animation.active = false;
					if (!animation.bindkey) {
						animation.active = true;
					}
				});
			});

			requestAnimationFrame(gameLoop);
		}

		this.render = function() {
			gameLoop();
		}

		this.add = function(gameObject) {
			_worldObjects.push(gameObject);
		}
	}

	return DidJS.World;
})