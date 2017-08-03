(function () {

  "use strict";

  let validator = {
    inputName: false,
    inputSurname: false,
    inputEmail: false
  };

  let validatorRules = {
    name: ['inputName', /^[a-zA-Z -]+$/, 'name'],
    surname: ['inputSurname', /^[a-zA-Z -]+$/, 'surname'],
    email: ['inputEmail', /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/, 'email']
  };

  class Winner {
    constructor() {
      this.arrOfPersons = [];
    }

    getElem(selector) {
      return document.querySelector(selector);
    }

    isTrue(elem) {
      return elem === true;
    }

    checkValidator() {
      let booleanArr = [];

      Object.keys(validator).forEach((key) => {
        booleanArr.push(this[key]);
      }, validator);

      return booleanArr.every(this.isTrue);
    }

    validateOnBlur(elemName, regExp, field, context) {
      if (!context.value.toString().match(regExp)) {
        this.getElem('.alertText').textContent = 'Type correct ' + field;
        context.focus();
      }
      else {
        this.getElem('.alertText').textContent = '';
        validator[elemName] = true;
      }
    }

    mountBlur(elem, elemName, regExp, field) {
      let that = this;
      elem.addEventListener('blur', function () {
        that.validateOnBlur(elemName, regExp, field, this);
      });
    }

    addNewPerson() {
      let that = this;
      this.arrOfPersons.push([
        that.getElem('#inputName').value.trim(),
        that.getElem('#inputSurname').value.trim(),
        that.getElem('#inputEmail').value.trim(),
        that.getElem('#inputPhone').value.trim()
      ]);
    }

    setTableElems() {
      let lastElem = this.arrOfPersons.length - 1;
      let row = document.createElement("tr");

      for (let i = 0; i < 4; i++) {
        let cell = document.createElement("td");
        let cellText = document.createTextNode(this.arrOfPersons[lastElem][i]);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      this.getElem('tbody').appendChild(row);
    }

    clearInputs() {
      this.getElem('#inputName').value = '';
      this.getElem('#inputSurname').value = '';
      this.getElem('#inputEmail').value = '';
      this.getElem('#inputPhone').value = '';
    }

    setFalse() {
      for (let prop in validator) {
        validator[prop] = false;
      }
    }

    setTableRow(event) {
      event.preventDefault();
      if (this.checkValidator()) {
        this.addNewPerson();
        this.setTableElems();
        this.clearInputs();
        this.setFalse();
      }
      else {
        this.getElem('.alertText').textContent = 'Fill all inputs *';
      }
    }

    mountClickOnSaveButton() {
      this.getElem('#save-values').addEventListener('click', (event) => {
        this.setTableRow(event);
      });
    }

    randomInteger(min, max) {
      let rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    }

    getArrMax() {
      return this.arrOfPersons.length - 1;
    }

    showWinner(text) {
      this.getElem('.winner__new').textContent = text;
    }

    getWinner() {
      if (this.arrOfPersons.length === 0) {
        return;
      }
      else {
        let newWinner = this.randomInteger(0, this.getArrMax());
        this.showWinner(this.arrOfPersons[newWinner][0] + ' ' + this.arrOfPersons[newWinner][1]);
      }
    }

    mountClickOnWinnerButton() {
      this.getElem('.winner__btn').addEventListener('click', this.getWinner);
    }

    init() {
      this.mountBlur(this.getElem('#inputName'), validatorRules.name[0], validatorRules.name[1], validatorRules.name[2]);
      this.mountBlur(this.getElem('#inputSurname'), validatorRules.surname[0], validatorRules.surname[1], validatorRules.surname[2]);
      this.mountBlur(this.getElem('#inputEmail'), validatorRules.email[0], validatorRules.email[1], validatorRules.email[2]);
      this.mountClickOnSaveButton();
      this.mountClickOnWinnerButton();
    }
  }

  let winner = new Winner();
  winner.init();

})();

// (function () {
//
//   "use strict";
//
//   var validator = {
//     inputName: false,
//     inputSurname: false,
//     inputEmail: false
//   };
//
//   var validatorRules = {
//     name: ['inputName', /^[a-zA-Z -]+$/, 'name'],
//     surname: ['inputSurname', /^[a-zA-Z -]+$/, 'surname'],
//     email: ['inputEmail', /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/, 'email']
//   };
//
//   function Winner() {
//
//     var arrOfPersons = [];
//     var that = this;
//
//     that.getElem = function (selector) {
//       return document.querySelector(selector);
//     };
//
//     that.isTrue = function (elem) {
//       return elem === true;
//     };
//
//     that.checkValidator = function () {
//       var booleanArr = [];
//
//       Object.keys(validator).forEach(function (key) {
//         booleanArr.push(this[key]);
//       }, validator);
//
//       return booleanArr.every(that.isTrue);
//     };
//
//     that.validateOnBlur = function (elemName, regExp, field, context) {
//       if (!context.value.toString().match(regExp)) {
//         that.getElem('.alertText').textContent = 'Type correct ' + field;
//         context.focus();
//       }
//       else {
//         that.getElem('.alertText').textContent = '';
//         validator[elemName] = true;
//       }
//     };
//
//     that.mountBlur = function (elem, elemName, regExp, field) {
//       elem.addEventListener('blur', function () {
//         that.validateOnBlur(elemName, regExp, field, this);
//       });
//     };
//
//     that.addNewPerson = function () {
//       arrOfPersons.push([
//         that.getElem('#inputName').value.trim(),
//         that.getElem('#inputSurname').value.trim(),
//         that.getElem('#inputEmail').value.trim(),
//         that.getElem('#inputPhone').value.trim()
//       ]);
//     };
//
//     that.setTableElems = function () {
//       var lastElem = arrOfPersons.length - 1;
//       var row = document.createElement("tr");
//
//       for (var i = 0; i < 4; i++) {
//         var cell = document.createElement("td");
//         var cellText = document.createTextNode(arrOfPersons[lastElem][i]);
//         cell.appendChild(cellText);
//         row.appendChild(cell);
//       }
//       that.getElem('tbody').appendChild(row);
//     };
//
//     that.clearInputs = function () {
//       that.getElem('#inputName').value = '';
//       that.getElem('#inputSurname').value = '';
//       that.getElem('#inputEmail').value = '';
//       that.getElem('#inputPhone').value = '';
//     };
//
//     that.setFalse = function () {
//       for (var prop in validator) {
//         validator[prop] = false;
//       }
//     };
//
//     that.setTableRow = function (event) {
//       event.preventDefault();
//       if (that.checkValidator()) {
//         that.addNewPerson();
//         that.setTableElems();
//         that.clearInputs();
//         that.setFalse();
//       }
//       else {
//         that.getElem('.alertText').textContent = 'Fill all inputs *';
//       }
//     };
//
//     that.mountClickOnSaveButton = function () {
//       that.getElem('#save-values').addEventListener('click', function (event) {
//         that.setTableRow(event);
//       });
//     };
//
//     that.randomInteger = function (min, max) {
//       var rand = min + Math.random() * (max + 1 - min);
//       rand = Math.floor(rand);
//       return rand;
//     };
//
//     that.getArrMax = function () {
//       return arrOfPersons.length - 1;
//     };
//
//     that.showWinner = function (text) {
//       that.getElem('.winner__new').textContent = text;
//     };
//
//     that.getWinner = function () {
//       if (arrOfPersons.length === 0) {
//         return;
//       }
//       else {
//         var newWinner = that.randomInteger(0, that.getArrMax());
//         that.showWinner(arrOfPersons[newWinner][0] + ' ' + arrOfPersons[newWinner][1]);
//       }
//     };
//
//     that.mountClickOnWinnerButton = function () {
//       that.getElem('.winner__btn').addEventListener('click', that.getWinner);
//     };
//
//     that.init = function () {
//       that.mountBlur(that.getElem('#inputName'), validatorRules.name[0], validatorRules.name[1], validatorRules.name[2]);
//       that.mountBlur(that.getElem('#inputSurname'), validatorRules.surname[0], validatorRules.surname[1], validatorRules.surname[2]);
//       that.mountBlur(that.getElem('#inputEmail'), validatorRules.email[0], validatorRules.email[1], validatorRules.email[2]);
//       that.mountClickOnSaveButton();
//       that.mountClickOnWinnerButton();
//     }
//   }
//
//   var winner = new Winner();
//   winner.init();
//
// })();