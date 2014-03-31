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

	var keyboard = DidJS.world.addKeyboard();
	
	keyboard.connectTo(square);

	square.keyboard.stroke = function(keyCode) {
		switch(keyCode) {
			case 37 :
				this.parent.goOnXAxis(-1);
				break;
			case 38 :
				this.parent.goOnYAxis(-1);
				break;
			case 39 :
				this.parent.goOnXAxis(1);
				break;
			case 40 :
				this.parent.goOnYAxis(1);
				break;
			default:
				break;
		}
	};

	DidJS.world.add(circle);
	DidJS.world.add(square);


	DidJS.world.render();
})