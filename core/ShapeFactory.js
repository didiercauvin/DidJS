define(['core/ShapeRenderer'], function(ShapeRenderer) {
	function ShapeFactory() {

		this.create = function(shape, properties) {
			if (!properties.resourceInfo) {
				properties.resourceInfo = {id : shape};
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
				id : properties.resourceInfo.id,
				position : properties.position,
				image : properties.resourceInfo.resource,
				sourceX : properties.sourceX,
				sourceY : properties.sourceY,
				radius : properties.radius,
				velX : properties.velX,
				velY : properties.velY,
				filled : properties.filled,
				frames : properties.frames,
				fps : properties.fps,
				currentDisplayedFrame : properties.currentDisplayedFrame,
				moving : properties.moving,
				animated : properties.animated,
				draw : function(ctx) {
					ShapeRenderer.drawCircle(this, ctx);
				}
			}
		}

		var createSquare = function(properties) {
			return  {
				id : properties.resourceInfo.id,
				position : properties.position,
				image : properties.resourceInfo.resource,
				sourceX : properties.sourceX,
				sourceY : properties.sourceY,
				side : properties.side,
				velX : properties.velX,
				velY : properties.velY,
				filled : properties.filled,
				frames : properties.frames,
				fps : properties.fps,
				currentDisplayedFrame : properties.currentDisplayedFrame,
				moving : properties.moving,
				animated : properties.animated,
				draw : function(ctx) {
					ShapeRenderer.drawSquare(this, ctx);
				}
			}
		}

		var createRectangle = function(properties) {
			return {
				id : properties.resourceInfo.id,
				position : properties.position,
				image : properties.resourceInfo.resource,
				sourceX : properties.sourceX,
				sourceY : properties.sourceY,
				width : properties.width,
				height : properties.height,
				velX : properties.velX,
				velY : properties.velY,
				filled : properties.filled,
				frames : properties.frames,
				fps : properties.fps,
				currentDisplayedFrame : properties.currentDisplayedFrame,
				moving : properties.moving,
				animated : properties.animated,
				draw : function(ctx) {
					ShapeRenderer.drawRectangle(this, ctx);
				}
			}
		}
	}

	return ShapeFactory;
	
})