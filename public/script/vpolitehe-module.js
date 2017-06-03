vpoliteve.controller('mainController', ['$http', '$scope', '$animate', '$cookies', 'dataService',
	function($http, $scope, $animate, $cookies, dataService) {
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

		$scope.MainPage = () => {
			let MyProfile = angular.element(document.querySelector(".MyProfile"));
			MyProfile.remove();
			let MyNews = angular.element(document.querySelector(".MyNews"));
			MyNews.remove();
		}

		$scope.logOut = () => {
			$http.post('/api/logout').then((response) => {
				document.location.href = '/login';
				$cookies.remove('id');
				$cookies.remove('token');
			});
		}
}]);
