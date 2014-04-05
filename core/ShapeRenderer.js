define(function() {
	function drawCircle(circle, ctx) {
                if (circle.image) {
                        draw(circle, ctx);
                }
                else {
        		ctx.beginPath();
                        ctx.arc(circle.position.X, circle.position.Y, circle.radius, 0, 2 * Math.PI, false);
                        ctx.closePath();
                        ctx.stroke();
                        ctx.fill();
                }
	}

	function drawSquare(square, ctx) {
                if (square.image) {
                        draw(square, ctx);
                }
                else {
                    ctx.beginPath();
                        ctx.rect(square.position.X, square.position.Y, square.side, square.side);
                        ctx.fill();
                        ctx.lineWidth = 1;
                        ctx.stroke();    
                }
	}

        function drawRectangle(rectangle, ctx) {
                if (rectangle.image) {
                        draw(rectangle, ctx);
                }
                else {
                        ctx.beginPath();
                        ctx.rect(rectangle.position.X, rectangle.position.Y, rectangle.width, rectangle.height);
                        ctx.fill();
                        ctx.lineWidth = 1;
                        ctx.stroke(); 
                }
        }

        function draw(obj, ctx) {
                ctx.drawImage(obj.image, obj.sourceX, obj.sourceY, obj.width, obj.height, obj.position.X, obj.position.Y, obj.width, obj.height);
        }

	return { drawCircle : drawCircle, drawSquare : drawSquare, drawRectangle : drawRectangle }
})