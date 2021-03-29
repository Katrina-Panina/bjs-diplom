"use strict"; // код  обрабатывается в строгом режиме
const user = new UserForm();

user.loginFormCallback = function(data) {
    ApiConnector.login(data, (response) => {
        response.success ? location.reload() : this.setLoginErrorMessage(response.error)
    })
};

user.registerFormCallback = function (data) {
    ApiConnector.register(data, (response) => {
        response.success ? location.reload() : this.setRegisterErrorMessage(response.error)
    })
};
