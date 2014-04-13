require(['core/didjs'], function(DidJS) {
	
	var registeredPath = DidJS.Game.register('Resources/Arkanodid/').asPathFor('Images')
				.load([{ Name : 'ball', file : 'ball.gif' }], gameInit);

	registeredPath.onerror = function(error) {
		alert(error);
	};
	
	function gameInit() {
		DidJS.Game.world = new DidJS.World('mycanvas');
		var width = 400, height = 330;

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

		var ball = DidJS.Game.create('circle').withProperties({
			position : new DidJS.Vector(200, 300),
			radius : 4,
			velX : 1,
			velY : 1,
			filled : true,
			fillStyle : "blue"
		});

		var angleX = 2, angleY = -4;

		ball.onTick = function() {
			this.position.X += 1 * angleX;
			this.position.Y += 1 * angleY;
		}

		ball.onBoundaryCollision = function(boundaryStatus) {
			if (boundaryStatus.onXMin || boundaryStatus.onXMax) {
				angleX *= -1;
			}

			if (boundaryStatus.onYMin || boundaryStatus.onYMax) {
				angleY *= -1;
			}
		}

		var keyboard = DidJS.Game.createKeyboard().connectTo(pad);

		keyboard.redefineKey('up', function() {

		})

		keyboard.redefineKey('down', function() {

		})

		DidJS.Game.world.add(ball);
		DidJS.Game.world.add(pad);

		DidJS.Game.world.render();
	}
})