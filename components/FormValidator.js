export default class FormValidation {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._form = formElement;
    this._inputElm = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );
    this._submitButton = formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputEl, errorMessageEl) {
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError() {
    const errorMessageEl = document.querySelector(".modal__input");
    errorMessageEl.textContent = " ";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _hasInvalidInput() {
    return !this._inputElm.every((inputEl) => inputEl.validity.valid);
  }

  _toggleButtonState(inputElm) {
    if (this._hasInvalidInput(inputElm)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
      return;
    }
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _checkInputValidity(formEl, inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(
        inputEl,
        document.querySelector(`#${inputEl.id}-error`)
      );
    } else {
      this._hideInputError(formEl, inputEl);
    }
  }

  _checkFormValidity = () => {
    return Array.from(this._form.querySelectorAll(this._inputSelector)).every(
      (input) => input.validity.valid
    );
  };

  setEventListeners(formEl) {
    const submitButton = document.querySelector(this._submitButtonSelector);
    this._inputElm.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(formEl, inputEl);
        this._toggleButtonState(inputEl, submitButton);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this.setEventListeners(this._form, {
      inputErrorClass: this._inputErrorClass,
      errorClass: this._errorClass,
      inactiveButtonClass: this._inactiveButtonClass,
    });
  }
}