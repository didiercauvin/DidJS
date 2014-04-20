define(['core/ShapeRenderer'], function(ShapeRenderer) {
	function ShapeFactory() {

		this.create = function(shape, properties) {
			if (!properties.resourceInfo) {
				properties.resourceInfo = {id : shape};
			}

			if (!properties.animations){
				properties.animations = [];
			}

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
				type : 'circle',
				id : properties.resourceInfo.id,
				position : properties.position,
				image : properties.resourceInfo.resource,
				sourceX : properties.sourceX,
				sourceY : properties.sourceY,
				radius : properties.radius,
				posXForCollision : properties.radius,
				posYForCollision : properties.radius,
				width : properties.radius,
				height : properties.radius,
				velX : properties.velX,
				velY : properties.velY,
				filled : properties.filled,
				animations : properties.animations,
				moving : properties.moving,
				animated : properties.animated,
				fillStyle : properties.fillStyle,
				draw : function(ctx) {
					ShapeRenderer.drawCircle(this, ctx);
				}
			}
		}

		var createSquare = function(properties) {
			return  {
				type : 'square',
				id : properties.resourceInfo.id,
				position : properties.position,
				image : properties.resourceInfo.resource,
				sourceX : properties.sourceX,
				sourceY : properties.sourceY,
				side : properties.side,
				posXForCollision : 0,
				posYForCollision : 0,
				velX : properties.velX,
				velY : properties.velY,
				filled : properties.filled,
				animations : properties.animations,
				moving : properties.moving,
				animated : properties.animated,
				fillStyle : properties.fillStyle,
				draw : function(ctx) {
					ShapeRenderer.drawSquare(this, ctx);
				}
			}
		}

		var createRectangle = function(properties) {
			return {
				type : 'rectangle',
				id : properties.resourceInfo.id,
				position : properties.position,
				image : properties.resourceInfo.resource,
				sourceX : properties.sourceX,
				sourceY : properties.sourceY,
				posXForCollision : 0,
				posYForCollision : 0,
				width : properties.width,
				height : properties.height,
				velX : properties.velX,
				velY : properties.velY,
				filled : properties.filled,
				animations : properties.animations,
				moving : properties.moving,
				animated : properties.animated,
				fillStyle : properties.fillStyle,
				draw : function(ctx) {
					ShapeRenderer.drawRectangle(this, ctx);
				}
			}
		}
	}

	return ShapeFactory;
	
})