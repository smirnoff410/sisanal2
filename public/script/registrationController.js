angular.module('vpoliteve', ['ngCookies']);

angular.
	module('vpoliteve').
	controller('registrationController', ['$scope', '$http', '$location', '$cookies',
		function ($scope, $http, $location, $cookies) {
		$scope.user = {teacherstudent: "Я студент"};
		$scope.registration = (user) => {
			let test = true;
			let myRe = /([А-Яа-я]+)/i;
			let nametest = myRe.exec(user.name);
			let surnametest = myRe.exec(user.surname);
			let patronymictest = myRe.exec(user.patronymic);
			let schooltest = myRe.exec(user.school);

			if(!nametest || !(nametest.input == nametest[0])){
				test = false;
		        angular.element(".class1").addClass("has-error");
		    } else {
		        angular.element(".class1").addClass("has-success");
		    }
		    if(!surnametest || !(surnametest.input == surnametest[0])){
		        test = false;
		        angular.element(".class2").addClass("has-error");
		    } else {
		        angular.element(".class2").addClass("has-success");
		    }
		    if(!patronymictest || !(patronymictest.input == patronymictest[0])){
		        test = false;
		        angular.element(".class3").addClass("has-error");
		    } else {
		        angular.element(".class3").addClass("has-success");
		    }
		    if(!schooltest || !(schooltest.input == schooltest[0])){
		        test = false;
		        angular.element(".class5").addClass("has-error");
		    } else {
		        angular.element(".class5").addClass("has-success");
		    }

		    myRe = /\w+@([a-z]+).[a-z]{2,4}/i;
			let emailtest = myRe.exec(user.email);
			if(!emailtest || !(emailtest.input == emailtest[0])){
        		test = false;
        		angular.element(".class4").addClass("has-error");
      		} else {
        		angular.element(".class4").addClass("has-success");
      		}

      		if (user.password.length < 5){
        		test = false;
     			angular.element(".class9").addClass("has-error");
    		} else {
    		    angular.element(".class9").addClass("has-success");
      		}

			if(user.teacherstudent == "Я преподаватель"){
				myRe = /id\d+/i;
				let teacherkeytest = myRe.exec(user.id);
				let myRe1 = /[А-Яа-я]+/i;
				let pulpittest = myRe1.exec(user.pulpit);
				if(!teacherkeytest || !(teacherkeytest.input == teacherkeytest[0])){
          			test = false;
          			angular.element(".class7").addClass("has-error");
        		} else {
          			angular.element(".class7").addClass("has-success");
        		}
        		if(!pulpittest || !(pulpittest.input == pulpittest[0])){
          			test = false;
          			angular.element(".class8").addClass("has-error");
        		} else {
          			angular.element(".class8").addClass("has-success");
        		}
			}
			else{
				myRe = /([А-Я]{2,5}-\d{3})/i;
				let grouptest = myRe.exec(user.group);
				if(!grouptest || !(grouptest.input == grouptest[0])){
          			test = false;
          			angular.element(".class6").addClass("has-error");
        		} else {
          			angular.element(".class6").addClass("has-success");
        		}

			}
      		if(user.password !== user.password1){
        		test = false;
        		angular.element(".class10").addClass("has-error");
      		} else {
        		angular.element(".class10").addClass("has-success");
      		}

      		let key = CryptoJS.SHA256(user.email).toString();
      		const userCrypt = {};

      		for (let i in user) {
      			userCrypt[i] = CryptoJS.AES.encrypt(user[i], key).toString();
      		}
      		userCrypt.key = key;

      		if (test) {
	      		$http.post('/api/users', userCrypt).then((response) => {
	      			if(!response.data.status)
	                    alert("Такой челик уже есть");
	                else {
	                    document.location.href = '/main';
	                }
	      		});
			}
		}
	}]);