vpoliteve.factory('dataService', ['$cookies', '$http', function($cookies, $http){
  const obj = {user:{}};
  $http.get('/getUser').then((response) => {
    obj.user.name = CryptoJS.AES.decrypt(response.data[0].name, response.data[0].key).toString(CryptoJS.enc.Utf8);
    obj.user.surname = CryptoJS.AES.decrypt(response.data[0].surname, response.data[0].key).toString(CryptoJS.enc.Utf8);
    obj.user.patronymic = CryptoJS.AES.decrypt(response.data[0].patronymic, response.data[0].key).toString(CryptoJS.enc.Utf8);
    obj.user.email = CryptoJS.AES.decrypt(response.data[0].email, response.data[0].key).toString(CryptoJS.enc.Utf8);
    obj.user.group = CryptoJS.AES.decrypt(response.data[0].group, response.data[0].key).toString(CryptoJS.enc.Utf8);
    obj.user.school = CryptoJS.AES.decrypt(response.data[0].school, response.data[0].key).toString(CryptoJS.enc.Utf8);
    obj.user.password = CryptoJS.AES.decrypt(response.data[0].password, response.data[0].key).toString(CryptoJS.enc.Utf8);
  });
  return obj;
}]);
