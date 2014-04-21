var DidJS = DidJS || {};

define(['core/Renderers/Renderer',
	    'core/Collider/Collider'], function(Renderer, Collider) {
	DidJS.World = function(canvasName, width, height) {
		var self = this;
		var _boundaryOnXMin, _boundaryOnXMax, _boundaryOnYMin, _boundaryOnYMax;
		var _renderer;
		var _worldObjects = [];
		var _collider = new Collider(_worldObjects);
		var _collisionObjects = [];
		this.tickStopped = false;

		_renderer = new Renderer(canvasName, width, height);

		this.getBoundariesStatusFor = function(x, y, width, height) {
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

		var gameLoop = function() {
			_renderer.clearScene();
			_worldObjects.forEach(function(obj) {
				if (obj.onTick) {
					obj.onTick();
				}

				if (obj.keyboard) {
					obj.keyboard.stroke();
				}

				var boundaryStatus = self.getBoundariesStatusFor(obj.position.X, obj.position.Y, obj.width, obj.height);
				if (boundaryStatus.onXMin || boundaryStatus.onXMax || boundaryStatus.onYMin || boundaryStatus.onYMax) {
					if (obj.onBoundaryCollision) {
						obj.onBoundaryCollision(boundaryStatus);
					}
				}

				var collisionObjects = _collisionObjects[obj.id];
				if (collisionObjects) {
					collisionObjects.forEach(function(cObject) {
						if (obj.type === 'circle') {
							var collisionResult = _collider.circleCollision(cObject, obj);
							if (collisionResult !== '') {
						    	obj.onCollisionWith(cObject, collisionResult);
							}
						}
					});
				}

				 DidJS.AnimationManager.animate(obj);
				 _renderer.draw(obj);

			});

			if (!self.tickStopped) {
				requestAnimationFrame(gameLoop);
			}
		}

		

		this.setCollisionObjects = function(gameObject, collisionObjects) {
			_collisionObjects[gameObject.id] = collisionObjects;
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