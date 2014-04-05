require(['core/didjs'], function(DidJS) {
	
	var registeredPath = DidJS.Game.register('Resources/').asPathFor('Images')
				.load(['bdd.gif', 'wcf.gif'], function() {
					gameInit();
				});

	registeredPath.onerror = function(error) {
		alert(error);
	};
	
	function gameInit() {
		DidJS.Game.world = new DidJS.World('mycanvas');

		var circle = DidJS.Game.create('circle').withProperties({
			position : new DidJS.Vector(100, 100),
			radius : 30,
			velX : 0
		});

		var square = DidJS.Game.create('square').withProperties({
			position : new DidJS.Vector(300, 200),
			side : 50,
			velX : 2
		});

		var rectangle = DidJS.Game.create('rectangle').withProperties({
			position : new DidJS.Vector(600, 400),
			width : 100,
			height : 50,
			velX : 3
		});

		var player = DidJS.Game.createGameObject('bdd', 'rectangle').withProperties({
			position : new DidJS.Vector(400, 100),
			width : 44,
			height : 17,
			velX : 3
		});

		//var movement = new Movement();

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
		



		var keyboard = DidJS.Game.createKeyboard().connectTo(square);

		//square.keyboard.redefineKey(customKey);

		DidJS.Game.world.add(circle);
		DidJS.Game.world.add(square);
		DidJS.Game.world.add(rectangle);
		DidJS.Game.world.add(player);


		DidJS.Game.world.render();
	}
})