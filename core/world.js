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

		this.getBoundariesStatusFor = function(obj) {
			var whichBoundary = {
				onXMin : false,
				onYMin : false,
				onXMax : false,
				onYMax : false
			}

			if (obj.position.X - obj.getShiftValues().shiftX < _boundaryOnXMin) {
				whichBoundary.onXMin = true;
			}

			if (obj.position.X + obj.width > _boundaryOnXMax) {
				whichBoundary.onXMax = true;
			}

			if (obj.position.Y - obj.getShiftValues().shiftY < _boundaryOnYMin) {
				whichBoundary.onYMin = true;
			}

			if (obj.position.Y + obj.position.height > _boundaryOnYMax) {
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

				var boundaryStatus = self.getBoundariesStatusFor(obj);
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