define(['core/Loaders/ResourceLoader', 
	    'core/ShapeFactory', 
	    'core/Keyboard', 
	    'core/Utils/FileUtils'], function(ResourceLoader, ShapeFactory, Keyboard, FileUtils) {
	 function Game() {
		var _resources = [];
		var resourceLoader = new ResourceLoader();
		var _shapeFactory = new ShapeFactory();

		this.world = null;
		this.register = function(path) {
			return {
				asPathFor : function(resourcesType) {
					var self = this;
					return {
						load : function(fileInfos, callback) {
							var resources = [];
							var nbFiles = fileInfos.length;
							var nbFileProcessed = 0;

							fileInfos.forEach(function(fileInfo) {
								var fullFileName = path + fileInfo.file;
								resourceLoader.get(fullFileName, resourcesType, function(resource, ex) {
									if (ex == null) {
										nbFileProcessed++;
										resources.push({ id : name, resource : resource});
										if (nbFiles === nbFileProcessed) {
											var resource = {
												path : path,
												resources : resources,
												resourceType : resourcesType
											};

											_resources.push(resource);
											callback();
										}
									}
									else {
										if (self.onerror) {
											self.onerror(ex.message);
										}
									}
								})
							});

							return self;
						}
					}

					return self;
				}
			}
		}

		var getResource = function(name) {
			var res = null;
			_resources.forEach(function(resource) {
				resource.resources.forEach(function(r) {
					var fileName = FileUtils.getFileNameWithExtension(r.resource.src, resource.path);
					if (fileName === name + '.gif') {
						res = r;
						return;
					}
				})
			})

			return res;
		}

		this.create = function(shape) {
			return {
				withProperties : function(properties) {
					return _shapeFactory.create(shape, properties);
				}
			}
		}

		this.createGameObject = function(resourceName, shapeType) {
			return {
				withProperties : function(properties) {
					properties.resourceInfo = getResource(resourceName);
					properties.sourceX = 0;
					properties.sourceY = 0;
					return _shapeFactory.create(shapeType, properties);
				}
			}
		}

		this.createKeyboard = function(keys) {
			return new Keyboard(keys);
		}

	}

	return Game;
})