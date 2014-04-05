define(['core/Utils/FileUtils'], function(FileUtils) {
	var images = [];

	function ImageLoader(imagesUrl, path) {
		this.urls = imagesUrl;
		this.path = path;
	}

	ImageLoader.prototype.load = function(callback) {
		var nbImages = this.urls.length;
		var nbImagesProcessed = 0;
		var selfUrls = this.urls;
		var path = this.path;
		selfUrls.forEach(function(imageUrl) {
			var myimage = new Image();
			var fullPath = path + imageUrl;
			myimage.src = fullPath;

			myimage.onerror = function() {
				callback(null, { message : "Erreur au chargement de l'image " + fullPath });
			}

			myimage.onload = function() {
				images.push(myimage);
				nbImagesProcessed++;
				if (nbImagesProcessed === nbImages) {
					callback(images, null);
				}
			}

		})
	}

	ImageLoader.prototype.get = function(name) {
		for(var image in images) {
			var fileName = FileUtils.getFileNameWithExtension(images[image].src, this.path);
			if (fileName === name + '.gif')
				return images[image];	
		}

		return null;
	}

	return ImageLoader;
})