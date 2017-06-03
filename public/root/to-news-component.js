angular.module('toNews', []);

angular.
    module('toNews').
    component('toNews', {
        templateUrl: 'public/root/to-news-template.html',
        controller: ['$http', '$scope', function($http, $scope){
          $http.get('/api/downloadMessageNews').then((response) => {
            console.log(response);
            let News = angular.element(document.querySelector(".News"));
            response.data.reverse();
            for(var i = 0; i < response.data.length; i++) {
              let newDiv = angular.element(`
                <p class="` + response.data[i].check + `">` + response.data[i].message + `</p>
                `)
                News.append(newDiv);
            }
          });
          $scope.alert1 = function(){
            let message = $scope.textarea;
            let check = $scope.color;
            let messageNews = { message: message, check: check };
            if(check == undefined || message == undefined){
              alert("Не отмечена важность или текст мероприятия");
            } else {
              $http.post('/api/messageNews', messageNews).then((response) => {
                if(response.data.status != false) {
                  console.log(response.data[0].message);
                  let News = angular.element(document.querySelector(".News1"));
                  let newDiv = angular.element(`
            				<p class="` + response.data[0].check + `">` + response.data[0].message + `</p>
            				`);
            			// добавим в div.quest
            			News.append(newDiv);
                }
              });
            }
          }
        }]
    });
>>>>>>> DesignV2.0
