define(['core/ShapeRenderer'], function(ShapeRenderer) {
	function ShapeFactory() {

		this.create = function(shape, properties) {
			if (shape === 'circle') {
				return createCircle(properties);
			}
			else if (shape === 'square') {
				return createSquare(properties);
			}
			else if (shape === 'rectangle') {
				return createRectangle(properties);
			}
			else {
				throw 'Shape ' + shape + ' unknown';
			}
		}

		var createCircle = function(properties) {
			return  {
				position : properties.position,
				radius : properties.radius,
				velX : properties.velX,
				draw : function(ctx) {
					ShapeRenderer.drawCircle(this, ctx);
				}
			}
		}

		var createSquare = function(properties) {
			return  {
				position : properties.position,
				side : properties.side,
				velX : properties.velX,
				draw : function(ctx) {
					ShapeRenderer.drawSquare(this, ctx);
				}
			}
		}

		var createRectangle = function(properties) {
			return {
				position : properties.position,
				image : properties.image,
				sourceX : properties.sourceX,
				sourceY : properties.sourceY,
				width : properties.width,
				height : properties.height,
				velX : properties.velX,
				draw : function(ctx) {
					ShapeRenderer.drawRectangle(this, ctx);
				}
			}
		}
	}

	return ShapeFactory;
	
})