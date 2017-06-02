angular.module('toProfile', []);

angular.
    module('toProfile').
    component('toProfile', {
        templateUrl: 'public/root/to-profile-template.html',
        controller: ['dataService', '$scope', function(dataService, $scope){
            $scope.name = dataService.user.name;
            $scope.surname = dataService.user.surname;
            $scope.patronymic = dataService.user.patronymic;
            $scope.group = dataService.user.group;
            $scope.school = dataService.user.school;
            $scope.email = dataService.user.email;
        }]
    });
