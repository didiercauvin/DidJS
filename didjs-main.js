define(['core/didjs', 'core/world'], function(DidJS, World) {
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

	var keyboard = DidJS.world.addKeyboard().connectTo(square);
	
	keyboard.addButton({
		key : 37,
		strokeMethod : function() {
			console.log('left key stroken')
		}
	});

	keyboard.addButton({
		key : 38,
		strokeMethod : function() {
			console.log('up key stroken')
		}
	});

	keyboard.addButton({
		key : 39,
		strokeMethod : function() {
			console.log('right key stroken')
		}
	});

	keyboard.addButton({
		key : 40,
		strokeMethod : function() {
			console.log('down key stroken')
		}
	});

	DidJS.world.add(circle);
	DidJS.world.add(square);


	DidJS.world.render();
})