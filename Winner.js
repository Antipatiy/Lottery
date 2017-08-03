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

      Object.keys(validator).forEach( function (key) {
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
      this.arrOfPersons.push([
        this.getElem('#inputName').value.trim(),
        this.getElem('#inputSurname').value.trim(),
        this.getElem('#inputEmail').value.trim(),
        this.getElem('#inputPhone').value.trim()
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
      this.getElem('.winner__btn').addEventListener('click', () => {
        this.getWinner();
      });
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