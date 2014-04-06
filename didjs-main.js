require(['core/didjs'], function(DidJS) {
	
	var registeredPath = DidJS.Game.register('Resources/').asPathFor('Images')
				.load([{name : 'luigi',  file : 'luigi.gif'}, { name : 'mario', file : 'mario_run_left.gif'}], gameInit);

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
			velY : 3,
			frames : 3,
			fps : 4,
			animated : true
		});

		var luigi = DidJS.Game.createGameObject('luigi', 'rectangle').withProperties( {
			position : new DidJS.Vector(400, 400),
			width : 36,
			height : 37,
			velX : 3,
			velY : 3,
			frames : 3,
			fps : 3,
			animated : true
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
		//square.keyboard.redefineKey(customKey);

		// DidJS.Game.world.add(circle);
		// DidJS.Game.world.add(square);
		// DidJS.Game.world.add(rectangle);
		DidJS.Game.world.add(player);
		DidJS.Game.world.add(luigi);


		DidJS.Game.world.render();
	}
})