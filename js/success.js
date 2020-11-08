'use strict';

const utils = window.utils;

const DEFAULT_SUCCESS_MESSAGE = `Ваше объявление<br>успешно размещено!`;

const mainElement = document.querySelector(`main`);

const getSuccessMessageTemplate = () => {
  return document
    .querySelector(`#success`)
    .content
    .querySelector(`.success`);
};

const getCurrentSuccessMessage = () => document.querySelector(`.success`);

const createSuccessMessageElement = (successMessage) => {
  const successMessageElement = successMessageTemplate.cloneNode(true);

  const successMessageTextElement = successMessageElement.querySelector(`.success__message`);
  successMessageTextElement.innerHTML = successMessage;

  return successMessageElement;
};

const onEscPressed = (event) => {
  if (utils.isEscapeKey(event)) {
    removeCurrentSuccessMessageElement();
    document.removeEventListener(`keydown`, onEscPressed);
  }
};

const renderSuccessMessageElement = (successMessage = DEFAULT_SUCCESS_MESSAGE) => {
  removeCurrentSuccessMessageElement();

  const successMessageElement = createSuccessMessageElement(successMessage);

  const onDocumentClick = (event) => {
    if (utils.isMainClick(event)) {
      successMessageElement.remove();
      document.removeEventListener(`click`, onDocumentClick);
      document.removeEventListener(`keydown`, onEscPressed);
    }
  };

  document.addEventListener(`click`, onDocumentClick);
  document.addEventListener(`keydown`, onEscPressed);

  mainElement.append(successMessageElement);
};

const removeCurrentSuccessMessageElement = () => {
  const currentSuccessMessageElement = getCurrentSuccessMessage();

  if (currentSuccessMessageElement) {
    currentSuccessMessageElement.remove();
  }

  document.removeEventListener(`keydown`, onEscPressed);
};

const successMessageTemplate = getSuccessMessageTemplate();

window.success = {
  show: renderSuccessMessageElement
};
