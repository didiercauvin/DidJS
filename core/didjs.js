var DidJS = DidJS || {};

define(['core/Game', 'core/world', 'core/Vector'], function(Game, World, Vector) {
	DidJS.Game = new Game();

	return DidJS;
})