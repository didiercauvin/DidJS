define(function() {
	function drawCircle(circle, ctx) {
		ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
	}

	function drawSquare(square, ctx) {
		ctx.beginPath();
        ctx.rect(square.x, square.y, square.side, square.side);
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.stroke();
	}

	return { drawCircle : drawCircle, drawSquare : drawSquare }
})