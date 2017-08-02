(function () {

  "use strict";

  var validator = {
    inputName: false,
    inputSurname: false,
    inputEmail: false
  };

  var validatorRules = {
    name: ['inputName', /^[a-zA-Z -]+$/, 'name'],
    surname: ['inputSurname', /^[a-zA-Z -]+$/, 'surname'],
    email: ['inputEmail', /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/, 'email']
  };

  function Winner() {
    var table = document.querySelector('#table');
    var tableBody = table.querySelector('tbody');
    var inputName = document.querySelector('#inputName');
    var inputSurname = document.querySelector('#inputSurname');
    var inputEmail = document.querySelector('#inputEmail');
    var inputPhone = document.querySelector('#inputPhone');
    var saveValues = document.querySelector('#save-values');
    var alertText = document.querySelector('.alertText');
    var winnerButton = document.querySelector('.winner__btn');
    var newWinner = document.querySelector('.winner__new');
    var arrOfPersons = [];
    var that = this;

    that.isTrue = function (elem) {
      return elem === true;
    };

    that.checkValidator = function () {
      var booleanArr = [];

      Object.keys(validator).forEach(function (key) {
        booleanArr.push(this[key]);
      }, validator);

      return booleanArr.every(that.isTrue);
    };

    that.validateOnBlur = function (elemName, regExp, field, context) {
      if (!context.value.toString().match(regExp)) {
        alertText.textContent = 'Type correct ' + field;
        context.focus();
      }
      else {
        alertText.textContent = '';
        validator[elemName] = true;
      }
    };

    that.mountBlur = function (elem, elemName, regExp, field) {
      elem.addEventListener('blur', function () {
        that.validateOnBlur(elemName, regExp, field, this);
      });
    };

    that.addNewPerson = function () {
      arrOfPersons.push([
        inputName.value.trim(),
        inputSurname.value.trim(),
        inputEmail.value.trim(),
        inputPhone.value.trim()
      ]);
    };

    that.setTableElems = function () {
      var lastElem = arrOfPersons.length - 1;
      var row = document.createElement("tr");

      for (var i = 0; i < 4; i++) {
        var cell = document.createElement("td");
        var cellText = document.createTextNode(arrOfPersons[lastElem][i]);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      tableBody.appendChild(row);
    };

    that.clearInputs = function () {
      inputName.value = '';
      inputSurname.value = '';
      inputEmail.value = '';
      inputPhone.value = '';
    };

    that.setFalse = function () {
      for (var prop in validator) {
        validator[prop] = false;
      }
    };

    that.setTableRow = function (event) {
      event.preventDefault();
      if (that.checkValidator()) {
        that.addNewPerson();
        that.setTableElems();
        that.clearInputs();
        that.setFalse();
      }
      else {
        alertText.textContent = 'Fill all inputs *';
      }
    };

    that.mountClickOnSaveButton = function () {
      saveValues.addEventListener('click', function (event) {
        that.setTableRow(event);
      });
    };

    that.randomInteger = function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    };

    that.getArrMax = function () {
      return arrOfPersons.length - 1;
    };

    that.showWinner = function (text) {
      newWinner.textContent = text;
    };

    that.getWinner = function () {
      if (arrOfPersons.length === 0) {
        return;
      }
      else {
        var newWinner = that.randomInteger(0, that.getArrMax());
        that.showWinner(arrOfPersons[newWinner][0] + ' ' + arrOfPersons[newWinner][1]);
      }
    };

    that.mountClickOnWinnerButton = function () {
      winnerButton.addEventListener('click', that.getWinner);
    };

    that.init = function () {
      that.mountBlur(inputName, validatorRules.name[0], validatorRules.name[1], validatorRules.name[2]);
      that.mountBlur(inputSurname, validatorRules.surname[0], validatorRules.surname[1], validatorRules.surname[2]);
      that.mountBlur(inputEmail, validatorRules.email[0], validatorRules.email[1], validatorRules.email[2]);
      that.mountClickOnSaveButton();
      that.mountClickOnWinnerButton();
    }
  }

  var winner = new Winner();
  winner.init();

})();