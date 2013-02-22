var app = app || {};
(function() {
    app.foursquareApi = {
        getUserInfo: function () {
            var param = {};
            param.method = "Get";
            return app.getJsonData(contextPath + "/foursquare/getUserInfo", param);
        },
        getFriends: function () {
            param.method = "Get";
            return app.getJsonData(contextPath + "/foursquare/getUserFriends", param);
        },
        searchUser: function (param) {
            param = param||{};
            param.method = "Get";
            return app.getJsonData(contextPath + "/foursquare/searchUser", param);
        },
        recentCheckins: function (param) {
            param = param||{};
            param.method = "Get";
            return app.getJsonData(contextPath + "/foursquare/recentCheckins", param);
        },
        venuesCategories: function (param) {
            param = param||{};
            param.method = "Get";
            return app.getJsonData(contextPath + "/foursquare/venuesCategories", param);
        },
        venuesSearch: function (param) {
            param = param||{};
            param.method = "Get";
            return app.getJsonData(contextPath + "/foursquare/venuesSearch", param);
        }
    };
})();
