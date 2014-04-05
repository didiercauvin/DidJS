define(['Loader/ImageLoader'], function(ImageLoader) {
	function ResourceLoader() {
		this.imagesUrl = ['Resources/circuit1_mask.gif', 'Resources/circuit1.gif', 'Resources/player1.gif'];
		this.imgLoader = new ImageLoader(this.imagesUrl);
	}

	ResourceLoader.prototype.initialize = function(callback) {

		var callbackImage = function() {
			callback();
		}

		
		this.imgLoader.load(callbackImage);
	}

	ResourceLoader.prototype.get = function(name, type) {
		var resource = null;

		if (type === 'image') {
			return this.imgLoader.get(name);
		}

		return resource;
	}

	return ResourceLoader;
})