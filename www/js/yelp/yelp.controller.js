app.controller('YelpCtrl', function($scope, YelpFactory, $state, $stateParams, $filter) {

	$scope.search = function(data) {
		return YelpFactory.get(data)
			.then(function(results) {
				$scope.find;
				$state.go('app.tab.yresults', {id: $stateParams.id})
			})
	}
})