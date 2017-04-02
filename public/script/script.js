(function() {

var check = document.getElementsByName('teacherstudent');

var count = 0;
	for(var i = 0; i < check.length; i++){
		check[i].onchange = createFormGroup;
	}
//console.log(count);

function createFormGroup(){
	count++;
	if(this.value == "Я преподаватель"){
		
		userForms.removeChild(userForms.children[8]);
		
		var div = document.createElement('div');
		div.className = "form-group";
		div.innerHTML = `<label for="teacherkey">Уникальный идентификатор преподавателя:</label>
				<input class="form-control" name="teacherkey" placeholder="id100" oninput="validateComments2(this)"/>`;

		userForms.insertBefore(div, userForms.children[8]);

		var div1 = document.createElement('div');
		div1.className = "form-group";
		div1.innerHTML = `<label for="pulpit">Кафедра:</label>
				<input class="form-control" name="pulpit"placeholder="ЭВМ" oninput="validateComments3(this)"/>`;

		userForms.insertBefore(div1, userForms.children[9]);
		count++;
		//console.log(count);
	}
	if(this.value == "Я студент"){
		if(count > 1){
			userForms.removeChild(userForms.children[8]);
			userForms.removeChild(userForms.children[8]);
		}
		
		var div2 = document.createElement('div');
		div2.className = "form-group";
		div2.innerHTML = `<label for="group">Группа(Например: ИВТ-260):</label>
				<input class="form-control" name="group" placeholder="ИВТ-260" oninput="validateComments4(this)"/>`;
				
		userForms.insertBefore(div2, userForms.children[8]);
		count++;
		//console.log(count);
	}
}

})();