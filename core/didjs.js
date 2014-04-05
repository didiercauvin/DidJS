var DidJS = DidJS || {};

define(['core/Game', 'core/world', 'core/Movement', 'core/Vector'], function(Game, World, Movement, Vector) {
	DidJS.Game = new Game();

	return DidJS;
})