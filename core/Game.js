define(['core/Loaders/ResourceLoader'], function(ResourceLoader) {
	 function Game() {
		var _resourcesTypes = [];
		var resourceLoader = new ResourceLoader();

		this.world = null;
		this.register = function(path) {
			return {
				asPathFor : function(resourcesType) {
					var self = this;
					return {
						onload : function(files, callback) {
							resourceLoader.getAll(files, path, resourcesType, function(resources, ex){
								if (ex == null) {
									var resourceType = {
										resources : resources,
										resourceType : resourcesType
									};

									_resourcesTypes.push(resourceType);
									callback('ok');
								}
								else {
									if (self.onerror) {
										self.onerror(ex.message);
									}
								}
							});
							
							return self;
						}
					}

					return self;
				}
			}
		}
	}

	return Game;
})