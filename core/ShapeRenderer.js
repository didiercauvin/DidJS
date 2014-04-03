define(function() {
	function drawCircle(circle, ctx) {
		ctx.beginPath();
                ctx.arc(circle.position.X, circle.position.Y, circle.radius, 0, 2 * Math.PI, false);
                ctx.closePath();
                ctx.stroke();
                ctx.fill();
	}

	function drawSquare(square, ctx) {
        	ctx.beginPath();
                ctx.rect(square.position.X, square.position.Y, square.side, square.side);
                ctx.fill();
                ctx.lineWidth = 1;
                ctx.stroke();
	}

        function drawRectangle(rectangle, ctx) {
                ctx.beginPath();
                ctx.rect(rectangle.position.X, rectangle.position.Y, rectangle.width, rectangle.height);
                ctx.fill();
                ctx.lineWidth = 1;
                ctx.stroke(); 
        }

	return { drawCircle : drawCircle, drawSquare : drawSquare, drawRectangle : drawRectangle }
})