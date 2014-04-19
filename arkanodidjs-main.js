require(['core/didjs'], function(DidJS) {
	
	var registeredPath = DidJS.Game.register('Resources/Arkanodid/').asPathFor('Images')
				.load([{ Name : 'ball', file : 'ball.gif' }], gameInit);

	registeredPath.onerror = function(error) {
		alert(error);
	};
	
	function gameInit() {
		DidJS.Game.world = new DidJS.World('mycanvas');
		var width = 400, height = 330;
		var _padSpeed = 7;

		DidJS.Game.world.setBoundariesOnX(0, width);
		DidJS.Game.world.setBoundariesOnY(0, height);

		var padWidth = 50, padHeight = 10;

		var posPadX = (width / 2) - (padWidth / 4);
		var posPadY = height - 5;

		var pad = DidJS.Game.create('rectangle').withProperties({
			position : new DidJS.Vector(posPadX, posPadY),
			width : padWidth,
			height : padHeight,
			velX : 1,
			velY : 1,
			filled : true,
			fillStyle : "red"
		})

		pad.id = 'mypad';

		var ball = DidJS.Game.create('circle').withProperties({
			position : new DidJS.Vector(200, 300),
			radius : 4,
			velX : 1,
			velY : 1,
			filled : true,
			fillStyle : "blue"
		});

		DidJS.Game.world.setCollisionObjects(ball, [
				pad
			]);

		var angleX = 2, angleY = -4;

		ball.onTick = function() {
			this.position.X += 1 * angleX;
			this.position.Y += 1 * angleY;
		}

		ball.onBoundaryCollision = function(boundaryStatus) {
			if (boundaryStatus.onXMin || boundaryStatus.onXMax) {
				angleX *= -1;
			}

			if (boundaryStatus.onYMin) {
				angleY *= -1;
			}

			if (boundaryStatus.onYMax) {
				angleY *= 0;
				angleX *= 0;
			}
		}

		ball.onCollisionWith = function(object, where) {
			if (object.id === 'mypad') {
				if (where === 'top') {
					angleY *= -1;
				}
			}
		}

		pad.onBoundaryCollision = function(boundaryStatus) {
			if (boundaryStatus.onXMax){
				this.position.X = width - this.width;
				pad.speed = 0;
			}
			if (boundaryStatus.onXMin){
				this.position.X = 0;
				pad.speed = 0;
			}
		}

		var keyboard = DidJS.Game.createKeyboard().connectTo(pad);

		keyboard.redefineKey('left', function() {
			pad.position.X -= _padSpeed;
		})

		keyboard.redefineKey('right', function() {
			pad.position.X += _padSpeed;
		})

		keyboard.redefineKey('up', function() {

		})

		keyboard.redefineKey('down', function() {

		})

		DidJS.Game.world.add(ball);
		DidJS.Game.world.add(pad);

		DidJS.Game.world.render();
	}
})