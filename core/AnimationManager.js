define(function() {
	function AnimationManager() {
		this._animatedObjects = [];
	}

	AnimationManager.prototype.add = function(gObject) {
		var animatedObject = {
			baseObject : gObject,
			timeBetweenFrames : 1 / gObject.fps,
			timeSinceLastFrame : new Date().getTime(),
			currentDisplayedFrame : 0,
			setCurrentDisplayedFrame : function() {
				++this.currentDisplayedFrame;
				if (this.currentDisplayedFrame > this.baseObject.frames - 1) {
					this.currentDisplayedFrame = 0;
				}
			}
		}

		this._animatedObjects.push(animatedObject);
	}

	AnimationManager.prototype.isAnimatedObject = function(gObject) {
		var isAnimated = false;
		this._animatedObjects.forEach(function(aObj) {
			if (aObj.id === gObject.id) {
				isAnimated = true;
				return;
			} 
		})

		return isAnimated;
	}


	AnimationManager.prototype.animate = function(gObject) {

		var aObject = null; 

		this._animatedObjects.forEach(function(o) {
			if (o.baseObject.id === gObject.id) {
				aObject = o;
				return;
			}
		})

		var timeExhausted = function(time1, time2) {
			return time1 >= time2;
		}

		var getCurrentTime = function() {
			return new Date().getTime();
		}

		if (aObject) {
			aObject.baseObject.sourceX = 0;
	        aObject.baseObject.width = aObject.baseObject.image.width / aObject.baseObject.frames;
			if (aObject.baseObject.moving) {
	            aObject.baseObject.sourceX = aObject.baseObject.width * aObject.currentDisplayedFrame;
			}

			if (aObject.baseObject.animated) {
	            aObject.baseObject.sourceX = aObject.baseObject.width * aObject.currentDisplayedFrame;
			}

			var timeForThisFrame = getCurrentTime();
	        var timeDiff = (timeForThisFrame - aObject.timeSinceLastFrame) / 1000;
	        
	        if (timeExhausted(timeDiff, aObject.timeBetweenFrames))
	        {
	           aObject.setCurrentDisplayedFrame();
	           aObject.timeSinceLastFrame = getCurrentTime();
	        }
		}
	}


	return AnimationManager;
})