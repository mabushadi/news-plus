
var newsServices = angular.module('newsServices', ['ngResource']);
newsServices.factory('NewsService', ['$resource', function($resource){
	var newsSources = {
		'yahoo' : 'http://news.yahoo.com/rss/topstories',
		'reuters' : 'http://feeds.reuters.com/reuters/worldNews'
	};

	return function(newsSource){
		var newsSourceUrl = newsSources[newsSource];
		return $resource('https://query.yahooapis.com/v1/public/yql?q=select * from rss where url="' + newsSourceUrl + '"&format=json', {}, { query: {method:'GET'}});
	};
}]);


var weatherService = angular.module('weatherService', []);
weatherService.factory('WeatherService', ['$http', function($http){
	var weatherSources = {
		'yahoo' : 'https://query.yahooapis.com/v1/public/yql?q='
	};
	
 	return function(location, onLoaded){
 		var weatherQuery = 'select * from weather.forecast where woeid in (select woeid from geo.places where text="' + location + '") limit 1&format=json';
		$http.get(weatherSources['yahoo'] + weatherQuery).
		  success(function(data, status, headers, config) {
		    onLoaded(data.query.results.channel);
		  }).
		  error(function(data, status, headers, config) {
		  	console.log('Error loading weather...');
		    console.log(arguments);
		  });
	};
}])
