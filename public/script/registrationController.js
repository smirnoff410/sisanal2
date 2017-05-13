angular.module('vpoliteve', []);

angular.
	module('vpoliteve').
	controller('registrationController', function ($scope, $http, $location) {
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
		        angular.element("div.class1").addClass("has-error");
		    } else {
		        angular.element("div.class1").addClass("has-success");
		    }
		    if(!surnametest || !(surnametest.input == surnametest[0])){
		        test = false;
		        angular.element("div.class2").addClass("has-error");
		    } else {
		        angular.element("div.class2").addClass("has-success");
		    }
		    if(!patronymictest || !(patronymictest.input == patronymictest[0])){
		        test = false;
		        angular.element("div.class3").addClass("has-error");
		    } else {
		        angular.element("div.class3").addClass("has-success");main.html
		    }
		    if(!schooltest || !(schooltest.input == schooltest[0])){
		        test = false;
		        angular.element("div.class5").addClass("has-error");
		    } else {
		        angular.element("div.class5").addClass("has-success");
		    }

		    myRe = /\w+@([a-z]+).[a-z]{2,4}/i;
			let emailtest = myRe.exec(user.email);
			if(!emailtest || !(emailtest.input == emailtest[0])){
        		test = false;
        		angular.element("div.class4").addClass("has-error");
      		} else {
        		angular.element("div.class4").addClass("has-success");
      		}

      		if (user.password.length < 5){
        		test = false;
     			angular.element("div.class9").addClass("has-error");
    		} else {
    		    angular.element("div.class9").addClass("has-success");
      		}

			if(user.teacherstudent == "Я преподаватель"){
				myRe = /id\d+/i;
				let teacherkeytest = myRe.exec(user.id);
				let myRe1 = /[А-Яа-я]+/i;
				let pulpittest = myRe1.exec(user.pulpit);
				if(!teacherkeytest || !(teacherkeytest.input == teacherkeytest[0])){
          			test = false;
          			angular.element("div.class7").addClass("has-error");
        		} else {
          			angular.element("div.class7").addClass("has-success");
        		}
        		if(!pulpittest || !(pulpittest.input == pulpittest[0])){
          			test = false;
          			angular.element("div.class8").addClass("has-error");
        		} else {
          			angular.element("div.class8").addClass("has-success");
        		}
			}
			else{
				myRe = /([А-Я]{2,5}-\d{3})/i;
				let grouptest = myRe.exec(user.group);
				if(!grouptest || !(grouptest.input == grouptest[0])){
          			test = false;
          			angular.element("div.class6").addClass("has-error");
        		} else {
          			angular.element("div.class6").addClass("has-success");
        		}

			}
      		if(password !== password1){
        		test = false;
        		angular.element("div.class10").addClass("has-error");
      		} else {
        		angular.element("div.class10").addClass("has-success");
      		}

      		if (test) {
	      		$http.post('/api/users', user).then((response) => {
	      			if(!response.data)
	                    alert("Такой челик уже есть");
	                else {
	                    document.location.href = '/main';
	                }
	      		});
			}
		}
	});