newsPlusApp.controller('NewsPlusController', ['$scope', '$sce', 'NewsService', 'WeatherService', function($scope, $sce, NewsService, WeatherService	){
	$scope.mainDate = new Date().toDateString();
	$scope.newsSource = 'yahoo'; // default
	$scope.articles = NewsService($scope.newsSource).query();
	$scope.articleTitle;
	$scope.articleLink;
	$scope.articleContent;
	$scope.articleLocation;
	$scope.weather;
	$scope.weatherTitle;
	$scope.weatherSummary;

	$scope.loadNews = function(){
		$scope.reset();
		$scope.articles = NewsService($scope.newsSource).query();
	}

	$scope.reset = function(){
		$scope.articleTitle = ''
		$scope.articleContent = '';
		$scope.weatherSummary = '';
		$scope.weatherTitle = '';
	}
	
	$scope.openArticle = function(){
		var article = this.article;
		var articleText = article.description;
		$scope.reset();
		try{
			articleText = $(article.description).text();
		} catch(ex){}

		$scope.articleLink = article.link;
		$scope.articleTitle = article.title;
		$scope.articleContent = $sce.trustAsHtml(article.description);
		$scope.articleLocation = articleText.split('(')[0].trim();
		$scope.weather = WeatherService($scope.articleLocation, function(weather){
			$scope.weather = weather;
			$scope.weatherTitle = $scope.weather? $scope.weather.title.replace('Yahoo! Weather', 'Weather conditions at ') : '';
			$scope.weatherSummary = $scope.weather ? $sce.trustAsHtml($scope.weather.item.description) : '';
		});
	}

	$('.dropdown').dropdown({
		transition: 'drop', 
		onChange: function(text, value) {
			if(text){
				$scope.newsSource = text;
				$scope.loadNews();
			}
		}
	});

	$('.sticky').sticky({context: '.container'});
}]);
