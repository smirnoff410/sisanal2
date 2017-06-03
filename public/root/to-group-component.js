angular.
    module('toGroup').
    component('toGroup', {
        templateUrl: 'public/root/to-group-template.html',
        controller: ['$scope', '$http', 'dataService',
            function toHomeController($scope, $http, dataService) {
              let group;
              $http.get('groups/groups.json').then((response) => {
                for(let i = 0; i < response.data.length; i++) {
                  if(response.data[i].title == dataService.user.group) {
                      group = response.data[i].source;
                      $scope.group = response.data[i].title;
                  }
                }

                $http.get(`groups/${group}`).then((response) => {
                  let classmates = angular.element(document.querySelector(".classmates"));
                  for( let i = 0; i < response.data.length; i++) {
                    let newDiv = angular.element(`
                      <div><a href="` + response.data[i].link + `" target="_blank">` + response.data[i].lastName + ` ` + response.data[i].firstName + ` ` + response.data[i].patronymic +`</a></div><hr>
                      `)
                      classmates.append(newDiv);
                  }
                  console.log(response);
                });
              });
            }
        ]
    });
angular.
    module('toGroup').
    component('toGroup', {
        templateUrl: 'public/root/to-group-template.html',
        controller: ['$scope', '$http', 'dataService',
            function toHomeController($scope, $http, dataService) {
              let group;
              $http.get('groups/groups.json').then((response) => {
                for(let i = 0; i < response.data.length; i++) {
                  if(response.data[i].title == dataService.user.group) {
                      group = response.data[i].source;
                      $scope.group = response.data[i].title;
                  }
                }

                $http.get(`groups/${group}`).then((response) => {
                  let classmates = angular.element(document.querySelector(".classmates"));
                  for( let i = 0; i < response.data.length; i++) {
                    let newDiv = angular.element(`
                      <a href="` + response.data[i].link + `" target="_blank">` + response.data[i].lastName + ` ` + response.data[i].firstName + ` ` + response.data[i].patronymic +`</a><br>
                      `)
                      classmates.append(newDiv);
                  }
                  console.log(response);
                });
              });
            }
        ]
    });