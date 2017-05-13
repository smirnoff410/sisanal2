angular.module('vpoliteve', []);

angular.
	module('vpoliteve').
	controller('loginController', ['$scope', '$http', '$location', 
		function($scope, $http, $location) {
			$scope.validateComments1 = (input) => {
				const email = document.querySelector('input[name="email"]');
				let myRe = /\w+@([a-z]+).[a-z]{2,4}/i;
				let nametest = myRe.exec(email.value);
		   		if (!nametest || !(nametest.input == nametest[0])) {
			  		// input.setCustomValidity("Некорректно введённые данные");
			  		email.setCustomValidity('Некорректно введённые данные');
		    	}
		    	else {
			  	// Длина комментария отвечает требованию,
			  	// поэтому очищаем сообщение об ошибке
			  		email.setCustomValidity('');
					// input.setCustomValidity("");
		    	}
			}

			$scope.validateComments5 = (input) => {
				const pass = document.querySelector('input[name="password"]');
		    	if (pass.value.length < 5) {
		    		pass.setCustomValidity('Некорректно введённые данные');
					// input.setCustomValidity("Некорректно введённые данные");
		    	}
		    	else {
					// Длина комментария отвечает требованию,
					// поэтому очищаем сообщение об ошибке
					pass.setCustomValidity('');
					// input.setCustomValidity("");
		    	}
			}

			$scope.login = (user) => {
				$http.post('/api/userss', user).then((response) => {
					if (response.data.length) {
						document.location.href = '/main';
					} else {
						alert("Пользователь с такими данными не зарегистрирован");
					}
				});
			}
		}]
	);