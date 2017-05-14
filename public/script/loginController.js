angular.module('vpoliteve', ['ngCookies']);

angular.
	module('vpoliteve').
	controller('loginController', ['$scope', '$http', '$location', '$cookieStore', '$cookies',
		function($scope, $http, $location, $cookieStore, $cookies) {
			$cookies.remove('id');
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
				let key = CryptoJS.SHA256(user.email).toString();
				const userCrypt = {};

				for (let i in user) {
					userCrypt[i] = CryptoJS.AES.encrypt(user[i], key).toString();
				}
				userCrypt.key = key;

				$http.post('/api/userss', userCrypt).then((response) => {
					if (response.data.status) {
						document.location.href = '/main';

						let date = new Date();
						date.setMonth(date.getMonth() + 1);
						date = date.toUTCString();
						$cookies.put('id', response.data.id, {'expires':date});
					} else {
						alert("Пользователь с такими данными не зарегистрирован");
					}
				});
			}
		}]
	);