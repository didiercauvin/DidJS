define(function() {
	function Renderer(viewName, width, height) {
		var canvas = document.getElementById(viewName);
		this.ctx = canvas.getContext('2d');

		this.draw = function(obj) {
			obj.draw(this.ctx);
		}

	}

	return Renderer;
})