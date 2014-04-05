define(['core/Loaders/ImageLoader'], function(ImageLoader) {
	var loaders = [];
	function ResourceLoader() { 
		
	}

	ResourceLoader.prototype.getAll = function(files, path, type, callback)  {
		if (type === 'Images') {
			var imgLoader = new ImageLoader(files, path);
			loaders[type] = imgLoader;
			imgLoader.load(callback);
		}
	}

	ResourceLoader.prototype.get = function(name, type) {
		var resource = null;

		if (loaders.indexOf(type) !== -1) {
			return loaders[type].get(name);
		}

		return resource;
	}

	return ResourceLoader;
})