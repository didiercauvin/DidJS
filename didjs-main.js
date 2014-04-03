define(['core/didjs', 'core/world', 'core/Movement', 'core/Vector'], function(DidJS, World, Movement, Vector) {
	
	DidJS.Game.register('Resources/').asPathFor('Assets');
	
	DidJS.Game.world = new World('mycanvas');

	var circle = DidJS.Game.world.create('circle').withProperties({
		position : DidJS.Vector(100, 100),
		radius : 30,
		velX : 0
	});

	var square = DidJS.Game.world.create('square').withProperties({
		position : DidJS.Vector(300, 200),
		side : 50,
		velX : 2
	});

	var rectangle = DidJS.Game.world.create('rectangle').withProperties({
		position : DidJS.Vector(600, 400),
		width : 100,
		height : 50,
		velX : 3
	});

	//var player = DidJS.Game.GameObject

	var movement = new Movement();

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
	



	var keyboard = DidJS.Game.world.createKeyboard().connectTo(square);

	//square.keyboard.redefineKey(customKey);

	DidJS.Game.world.add(circle);
	DidJS.Game.world.add(square);
	DidJS.Game.world.add(rectangle);


	DidJS.Game.world.render();
})