define(['core/didjs', 'core/world', 'core/Movement'], function(DidJS, World, Movement) {
	DidJS.world = new World('mycanvas');

	var circle = DidJS.world.create('circle', {
		x : 100,
		y : 100,
		radius : 30,
		velX : 0
	});

	var square = DidJS.world.create('square', {
		x : 300,
		y : 200,
		side : 50,
		velX : 2
	});


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
	



	var keyboard = DidJS.world.createKeyboard().connectTo(square);

	//square.keyboard.redefineKey(customKey);

	DidJS.world.add(circle);
	DidJS.world.add(square);


	DidJS.world.render();
})