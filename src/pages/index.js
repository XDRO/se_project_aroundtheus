import Card from "../components/scripts/Card.js";
import FormValidation from "../components/scripts/FormValidator.js";
// import Popup from "../scripts/Popup.js";
import PopupWithForm from "../components/scripts/PopupWithForm.js";
import PopupWithImage from "../components/scripts/PopupWithImage.js";
import UserInfo from "../components/scripts/UserInfo.js";
import Section from "../components/scripts/Section.js";
import * as DOM from "../utils/constants.js";
import { validationSettings } from "../utils/utils.js";
import { initialCards } from "../utils/utils.js";

import "../pages/index.css";

// popup with form
const newCardPopup = new PopupWithForm(
  "#profile-add-modal",
  handleCardFormSubmit
);
newCardPopup.setEventListeners();
// edit popup form
const userInfo = new UserInfo(".profile__title", ".profile__description");
const popupEditForm = new PopupWithForm("#profile-edit-modal", (formData) => {
  userInfo.setUserInfo(formData);
  popupEditForm.close();
});
popupEditForm.setEventListeners();
// popup with image
const popupImage = new PopupWithImage("#preview-image-modal");
popupImage.setEventListeners();

// section
function createCard(item) {
  const cardElement = new Card(item, "#card-template", handleImageClick);
  return cardElement.getView();
}

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      section.addItem(cardElement);
    },
  },
  ".cards__list"
);
section.renderItems();

// functions

function handleCardFormSubmit(data) {
  const cardInput = createCard(data);
  section.addItem(cardInput);
  newCardPopup.close();
}

function handleImageClick(data) {
  popupImage.open(data);
}

const editFormValidator = new FormValidation(
  validationSettings,
  DOM.profileEditForm
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidation(
  validationSettings,
  DOM.profileAddForm
);
addFormValidator.enableValidation();

//event listeners
DOM.profileEditButton.addEventListener("click", () => {
  const formData = userInfo.getUserInfo();
  popupEditForm.setInputValues(formData);
  popupEditForm.open();
});

// add new card button
DOM.profileAddButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  newCardPopup.open();
});
