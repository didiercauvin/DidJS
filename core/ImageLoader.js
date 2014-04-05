define(['Utils/FileUtils'], function(FileUtils) {
	function ImageLoader(imagesUrl) {
		this.urls = imagesUrl;
		this.images = [];
	}

	ImageLoader.prototype.load = function(callback) {
		var nbImages = this.urls.length;
		var nbImagesProcessed = 0;

		for (var imageUrl in this.urls) {
			var myimage = new Image();
			myimage.src = this.urls[imageUrl];
			myimage.onload = function() {
				nbImagesProcessed++;
				if (nbImagesProcessed === nbImages) {
					callback();
				}
			}

			this.images.push(myimage);
		}
	}

	ImageLoader.prototype.get = function(name) {
		for(var image in this.images) {
			var fileName = FileUtils.getFileNameWithExtension(this.images[image].src, 'Resources/');
			if (fileName === name + '.gif')
				return this.images[image];	
		}

		return null;
	}

	return ImageLoader;
})