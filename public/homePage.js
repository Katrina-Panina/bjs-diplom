"use strict"; // код  обрабатывается в строгом режиме
const logout = new LogoutButton();

logout.action = function () {
  ApiConnector.current((response) => {
    if (response.success) {
      location.reload();
    }
  });
};

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

const currency = new RatesBoard();

function currencyRates(currency) {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      currency.clearTable();
      currency.fillTable(response.data);
    }
  });
}

currencyRates(currency);
setInterval(currencyRates, 60000, currency);

const moneyControl = new MoneyManager();

moneyControl.addMoneyCallback = function (data) {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      this.setMessage(true, "Баланс пополнен");
    } else {
      this.setMessage(false, response.error);
    }
  });
};

moneyControl.conversionMoneyCallback = function (data) {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      this.setMessage(true, "Конвертация выполнена");
    } else {
      this.setMessage(false, response.error);
    }
  });
};

moneyControl.sendMoneyCallback = function (data) {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      this.setMessage(true, "Перевод выполнен успешно");
    } else {
      this.setMessage(false, response.error);
    }
  });
};

const favorit = new FavoritesWidget();

function updateFavorites(response) {
  favorit.clearTable();
  favorit.fillTable(response.data);
  moneyControl.updateUsersList(response.data);
}

ApiConnector.getFavorites((response) => {
  if (response.success) {
    updateFavorites(response);
  }
});

favorit.addUserCallback = function (data) {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      updateFavorites(response);
      this.setMessage(true, "Пользователь добавлен в избранное");
    } else {
      this.setMessage(false, response.error);
    }
  });
};

favorit.removeUserCallback = function (data) {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      updateFavorites(response);
      this.setMessage(true, "Пользователь удален из избранного");
    } else {
      this.setMessage(false, response.error);
    }
  });
};
