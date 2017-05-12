const vpoliteve = angular.module('vpoliteve', ['ngAnimate']);

vpoliteve.controller('mainController', function($http, $scope, $animate) {
	const self = this;
	$http.get('groups/groups.json').then((response) => {
		$scope.allGroups = response.data;
		for (let i = 0; i < $scope.allGroups.length; ++i) {
			$http.get(`groups/${$scope.allGroups[i].source}`).then((response) => {
				$scope.allGroups[i].students = response.data;
			});
		}
	});

	$http.get('chairs/chairs.json').then((response) => {
		$scope.allChairs = response.data;
		for (let i = 0; i < $scope.allChairs.length; ++i) {
			$http.get(`chairs/${$scope.allChairs[i].source}`).then((response) => {
				$scope.allChairs[i].allTeachers = response.data;
			});
		}
	});

	$scope.showGroup = (group) => {
		let flag = group.user.show;
		for (let i = 0; i < $scope.allGroups.length; ++i) {
			$scope.allGroups[i].show = false;
		}
		if (!flag)
			group.user.show = true;
	}

	$scope.showChair = (chair) => {
		let flag = chair.user.show;
		for (let i = 0; i < $scope.allChairs.length; ++i) {
			$scope.allChairs[i].show = false;
		}
		if (!flag)
			chair.user.show = true;
	}
});