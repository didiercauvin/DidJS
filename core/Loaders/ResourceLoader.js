define(['core/Loaders/ImageLoader'], function(ImageLoader) {
	var loaders = [];
	function ResourceLoader() { 
		this._imgLoader = new ImageLoader();
	}

	ResourceLoader.prototype.getAll = function(files, type, callback)  {
		var self = this;
		var nbFiles = files.length;
		var nbFilesProcessed = 0;
		var images = [];
		if (type === 'Images') {
			files.forEach(function(file) {
				self._imgLoader.load(file, function(img, e) {
					if (img) {
						images.push(img);
						nbFilesProcessed++;
						if (nbFilesProcessed === nbFiles) {
							callback(images, e);
						}
					}
					else {
						callback(null, e);
						return;
					}
				});
			})
		}
	}

	ResourceLoader.prototype.get = function(name, type, callback) {
		var resource = null;

		if (type === 'Images') {
			this._imgLoader.load(name, callback);
		}
		
		return resource;
	}

	return ResourceLoader;
})