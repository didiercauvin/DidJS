define(function() {
	return function Renderer(viewName, width, height) {
		var canvas = document.getElementById(viewName);
		canvas.width = width;
		canvas.height = height;
		this.ctx = canvas.getContext('2d');

		

	}
})