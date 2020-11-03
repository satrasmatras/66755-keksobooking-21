'use strict';

const utils = window.utils;

const getErrorMessageTemplate = () => {
  return document
    .querySelector(`#error`)
    .content
    .querySelector(`.error`);
};

const getCurrentErrorMessage = () => document.querySelector(`.error`);

const createErrorMessageElement = (errorMessage) => {
  const errorMessageElement = errorMessageTemplate.cloneNode(true);

  const errorMessageText = errorMessageElement.querySelector(`.error__message`);
  errorMessageText.textContent = errorMessage;

  const errorCloseButton = errorMessageElement.querySelector(`.error__button`);

  const onCloseButtonClick = (event) => {
    if (utils.isMainClick(event)) {
      errorMessageElement.remove();

      errorCloseButton.addEventListener(`click`, onCloseButtonClick);
      document.removeEventListener(`keydown`, onEscPressed);
      document.removeEventListener(`click`, onDocumentClick);
    }
  };

  const onCloseButtonEnterPressed = (event) => {
    if (utils.isEnterKey(event)) {
      errorMessageElement.remove();

      errorCloseButton.addEventListener(`click`, onCloseButtonClick);
      document.removeEventListener(`keydown`, onEscPressed);
      document.removeEventListener(`click`, onDocumentClick);
    }
  };

  errorCloseButton.addEventListener(`click`, onCloseButtonClick);
  errorCloseButton.addEventListener(`keydown`, onCloseButtonEnterPressed);

  return errorMessageElement;
};

const onEscPressed = (event) => {
  if (utils.isEscapeKey(event)) {
    removeCurrentErrorMessageElement();
  }
};

const onDocumentClick = (event) => {
  if (utils.isMainClick(event)) {
    removeCurrentErrorMessageElement();
  }
};

const renderErrorMessageElement = (errorMessage) => {
  removeCurrentErrorMessageElement();

  const errorMessageElement = createErrorMessageElement(errorMessage);

  document.addEventListener(`keydown`, onEscPressed);
  document.addEventListener(`click`, onDocumentClick);

  main.append(errorMessageElement);
};

const removeCurrentErrorMessageElement = () => {
  const currentErrorMessageElement = getCurrentErrorMessage();

  if (currentErrorMessageElement) {
    currentErrorMessageElement.remove();
  }

  document.removeEventListener(`keydown`, onEscPressed);
  document.removeEventListener(`click`, onDocumentClick);
};

const main = document.querySelector(`main`);
const errorMessageTemplate = getErrorMessageTemplate();

window.error = {
  show: renderErrorMessageElement
};
