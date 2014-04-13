var DidJS = DidJS || {};

define(['core/Renderer',
	    'core/Collider/Collider'], function(Renderer, Collider) {
	DidJS.World = function(canvasName, width, height) {
		var self = this;
		var _boundaryOnXMin, _boundaryOnXMax, _boundaryOnYMin, _boundaryOnYMax;
		var _renderer;
		var _worldObjects = [];
		var _collider = new Collider(_worldObjects);

		_renderer = new Renderer(canvasName, width, height);

		this.getBoundariesStatusFor = function(x, y, width, height, posXForCollision, posYForCollision) {
			var whichBoundary = {
				onXMin : false,
				onYMin : false,
				onXMax : false,
				onYMax : false
			}

			if (x - posXForCollision < _boundaryOnXMin) {
				whichBoundary.onXMin = true;
			}

			if (x + width > _boundaryOnXMax) {
				whichBoundary.onXMax = true;
			}

			if (y - posYForCollision < _boundaryOnYMin) {
				whichBoundary.onYMin = true;
			}

			if (y + height > _boundaryOnYMax) {
				whichBoundary.onYMax = true;
			}

			return whichBoundary;
		}

		var gameLoop = function() {
			_renderer.clearScene();
			_worldObjects.forEach(function(obj) {
				if (obj.onTick) {
					obj.onTick();
				}

				if (obj.keyboard) {
					obj.keyboard.stroke();
				}

				var boundaryStatus = self.getBoundariesStatusFor(obj.position.X, obj.position.Y, obj.width, obj.height, obj.posXForCollision, obj.posYForCollision);
				if (boundaryStatus.onXMin || boundaryStatus.onXMax || boundaryStatus.onYMin || boundaryStatus.onYMax) {
					if (obj.onBoundaryCollision) {
						obj.onBoundaryCollision(boundaryStatus);
					}
				}

				 DidJS.AnimationManager.animate(obj);
				 _renderer.draw(obj);

			});

			requestAnimationFrame(gameLoop);
		}

		this.render = function() {
			gameLoop();
		}

		this.add = function(gameObject) {
			_worldObjects.push(gameObject);
		}

		

		this.setBoundariesOnX = function(min, max) {
			_boundaryOnXMin = min;
			_boundaryOnXMax = max;
		}

		this.setBoundariesOnY = function(min, max) {
			_boundaryOnYMin = min;
			_boundaryOnYMax = max;
		}

		this.getBoundaryOnXMin = function() {
			return _boundaryOnXMin;
		}

		this.getBoundaryOnXMax = function() {
			return _boundaryOnXMax;
		}

		this.getBoundaryOnYMin = function() {
			return _boundaryOnYMin;
		}

		this.getBoundaryOnYMax = function() {
			return _boundaryOnYMax;
		}
	}


	return DidJS.World;
})