define(['core/ShapeRenderer'], function(ShapeRenderer) {
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
					ShapeRenderer.drawCircle(this, ctx);
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
					ShapeRenderer.drawSquare(this, ctx);
				}
			}
		}
	}

	return ShapeFactory;
	
})