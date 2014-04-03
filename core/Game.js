define(['core/didjs'], function(DidJS) {
	function Game() {
		var _resourcesTypes = [];
		
		this.world = null;
		this.register = function(path) {
			return {
				asPathFor : function(resourcesType) {
					var resourceType = {
						path : path,
						resourceType : resourcesType
					};

					_resourcesTypes.push(resourceType);
				}
			}
		}
	}

	return Game;
})