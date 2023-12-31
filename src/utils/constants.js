import { validationSettings } from "./utils";

export const modals = [...document.querySelectorAll(".modal")];
export const forms = [
  ...document.querySelectorAll(validationSettings.formSelector),
];

export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileAddModal = document.querySelector("#profile-add-modal");
export const profileEditForm =
  profileEditModal.querySelector("#edit-card-form");
export const profileAddForm = profileAddModal.querySelector(".modal__form");

export const cardListEl = document.querySelector(".cards__list");
export const profileAddButton = document.querySelector("#profile-add-button");
export const avatarImgButton = document.querySelector(
  ".profile__avatar-button"
);
