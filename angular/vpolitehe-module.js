const vpoliteve = angular.module('vpoliteve', []);

vpoliteve.controller('mainController', function($http) {
	this.allGroups = [];
	this.allChairs = [];

	const self = this;
	$http.get('groups/groups.json').then((response) => {
		self.allGroups = response.data;
	});

	$http.get('chairs/chairs.json').then((response) => {
		self.allChairs = response.data;
	});

	for (let i = 0; i < this.allGroups.length; ++i) {
		$http.get(`groups/${this.allGroups[i].source}`).then((response) => {
			self.allGroups[i].students = response.data;
		});
	}

	for (let i = 0; i < this.allChairs.length; ++i) {
		$http.get(`chairs/${this.allChairs[i].source}`).then((response) => {
			self.allChairs[i].allTeachers = response.data;
		});
	}

	this.showGroup = (group) => {

	}
});