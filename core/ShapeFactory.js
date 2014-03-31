define(function() {
	function ShapeFactory() {

		this.create = function(shape, properties) {
			if (shape === 'circle') {
				return createCircle(properties);
			}
			else if (shape === 'square') {
				return createSquare(properties);
			}
			else {
				throw 'Shape ' + shape + ' unknown';
			}
		}

		var createCircle = function(properties) {
			return  {
				x : properties.x,
				y : properties.y,
				radius : properties.radius,
				velX : properties.velX,
				draw : function(ctx) {
					ctx.beginPath();
		            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		            ctx.closePath();
		            ctx.stroke();
		            ctx.fill();
				}
			}
		}

		var createSquare = function(properties) {
			return  {
				x : properties.x,
				y : properties.y,
				side : properties.side,
				velX : properties.velX,
				draw : function(ctx) {
					ctx.beginPath();
			        ctx.rect(this.x, this.y, this.side, this.side);
			        ctx.fill();
			        ctx.lineWidth = 1;
			        ctx.stroke();
				}
			}
		}
	}

	return ShapeFactory;
	
})