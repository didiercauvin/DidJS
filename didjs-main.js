require(['core/didjs'], function(DidJS) {
	
	var registeredPath = DidJS.Game.register('Resources/').asPathFor('Images')
				.load([
					{ name : 'luigi',  file : 'luigi.gif' }, 
					{ name : 'mario', file : 'mario_complete.gif' }
					], gameInit);

	registeredPath.onerror = function(error) {
		alert(error);
	};
	
	function gameInit() {
		DidJS.Game.world = new DidJS.World('mycanvas');
		// var circle = DidJS.Game.create('circle').withProperties({
		// 	position : new DidJS.Vector(100, 100),
		// 	radius : 30,
		// 	velX : 0,
		// 	filled : false
		// });

		// var square = DidJS.Game.create('square').withProperties({
		// 	position : new DidJS.Vector(300, 200),
		// 	side : 50,
		// 	velX : 1,
		// 	filled : true
		// });

		// var rectangle = DidJS.Game.create('rectangle').withProperties({
		// 	position : new DidJS.Vector(600, 400),
		// 	width : 100,
		// 	height : 50,
		// 	velX : 3,
		// 	filled : false
		// });

		var player = DidJS.Game.createGameObject('mario', 'rectangle').withProperties({
			position : new DidJS.Vector(400, 100),
			width : 21,
			height : 27,
			velX : 3,
			velY : 3
		});

		var luigi = DidJS.Game.createGameObject('luigi', 'rectangle').withProperties( {
			position : new DidJS.Vector(400, 400),
			width : 36,
			height : 37,
			velX : 3,
			velY : 3
		})

		var customKey =
			{
				name : 'left',
				key : 75
			}
			//,
			// {
			// 	name : 'up',
			// 	key : 79
			// },
			// {
			// 	name : 'right',
			// 	key : 77
			// },
			// {
			// 	name : 'down',
			// 	key : 76
			// }
		



		var keyboard = DidJS.Game.createKeyboard().connectTo(player);

		keyboard.setBoundariesOnX(0, 800);
		keyboard.setBoundariesOnY(0, 600);


		// keyboard.redefineKey('left', function() {
		// 	keyboard.parent.animated = true;
		// 	keyboard.move().toXAxis(1);
		// })

		var animationIdlePlayer = {key : "idle", frameStart : 7, frameEnd : 7, fps: 1, active: true};
		var animationWalkLeft = { key : "walkleft", frameStart : 0, frameEnd : 2, fps : 4, active: false };
		var animationWalkRight = {key : "walkright", frameStart : 3, frameEnd : 5, fps : 4, active: false };
		var animationJump = { key : "jump", frameStart : 8, frameEnd : 8, fps : 1, active: false };
		var animationDown = { key : "down", frameStart : 6, frameEnd : 6, fps : 1, active : false };

		var animationIdleLuigi = {key : "idle", frameStart : 0, frameEnd : 2, fps : 3, active : true };

	
		DidJS.Game
		.setAnimation(
			[
				animationIdlePlayer, 
				animationWalkLeft,
				animationWalkRight,
				animationJump,
				animationDown
			])
		.to(player);

		DidJS.Game.setAnimation([animationIdleLuigi]).to(luigi);

		keyboard.bindKey("left").to(animationWalkLeft);
		keyboard.bindKey("right").to(animationWalkRight);
		keyboard.bindKey("up").to(animationJump);
		keyboard.bindKey("down").to(animationDown);

		//square.keyboard.redefineKey(customKey);

		// DidJS.Game.world.add(circle);
		// DidJS.Game.world.add(square);
		// DidJS.Game.world.add(rectangle);
		DidJS.Game.world.add(player);
		//DidJS.Game.world.add(luigi);


		DidJS.Game.world.render();
	}
})