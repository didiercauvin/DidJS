define(['core/didjs', 'core/world'], function(DidJS, World) {
	DidJS.world = new World('mycanvas', 800, 600);

	DidJS.world.add('circle', {
		x : 100,
		y : 100,
		radius : 30,
		velX : 0
	});

	DidJS.world.add('square', {
		x : 300,
		y : 200,
		side : 50,
		velX : 2
	})

	DidJS.world.render();
})