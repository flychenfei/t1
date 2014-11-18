var app = app || {};
(function() {
	app.liveFolderApi = {
		getRootFolder : function() {
			var param = {};
			param.method = "Get";
			return app.getJsonData(contextPath + "/liveFolder/getRootFolder", param);
		},
		getFolderFilesList : function(id) {
			var param = {id:id};
			param.method = "Get";
			return app.getJsonData(contextPath + "/liveFolder/getFolderFilesList", param);
		},
		getFolder : function(id) {
			var param = {id:id};
			param.method = "Get";
			return app.getJsonData(contextPath + "/liveFolder/getFolder", param);
		},
		"saveFolder": function (folder) {
            return app.getJsonData(contextPath + "/liveFolder/saveFolder", folder);
        }
	}
})();