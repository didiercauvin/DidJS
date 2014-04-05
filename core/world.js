var DidJS = DidJS || {};

define(['core/Renderer',
	    'core/Collider/Collider'], function(Renderer, Collider) {
	DidJS.World = function(canvasName, width, height) {
		var _renderer;
		var _worldObjects = [];
		var _boundaryOnXMin, _boundaryOnXMax, _boundaryOnYMin, _boundaryOnYMax;
		var _collider = new Collider(_worldObjects);

		_renderer = new Renderer(canvasName, width, height);

		var getBoundariesStatusFor = function(objectA) {
			var whichBoundary = {
				onXMin : false,
				onYMin : false,
				onXMax : false,
				onYMax : false
			}

			if (objectA.position.X < _boundaryOnXMin) {
				whichBoundary.onXMin = true;
			}

			if (objectA.position.X + objectA.width > _boundaryOnXMax) {
				whichBoundary.onXMax = true;
			}

			if (objectA.position.Y < _boundaryOnYMin) {
				whichBoundary.onYMin = true;
			}

			if (objectA.position.Y + objectA.height > _boundaryOnYMax) {
				whichBoundary.onYMax = true;
			}

			return whichBoundary;
		}

		var gameLoop = function() {
			_renderer.clearScene();
			_worldObjects.forEach(function(obj) {

				if (!!obj.keyboard) {
					obj.keyboard.stroke();
				}

				var boundariesStatus = getBoundariesStatusFor(obj);

				if (boundariesStatus.onXMin) {
					obj.position.X = _boundaryOnXMin;
				}

				if (boundariesStatus.onXMax) {
					obj.position.X = _boundaryOnXMax - obj.width;
				}

				if (boundariesStatus.onYMin) {
					obj.position.Y = _boundaryOnYMin;
				}

				if (boundariesStatus.onYMax) {
					obj.position.Y = _boundaryOnYMax - obj.height;
				}

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

		
	}

	return DidJS.World;
})