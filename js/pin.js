'use strict';

const utils = window.utils;
const card = window.card;

const Pin = {
  WIDTH: 50,
  HEIGHT: 70
};

const mapElement = document.querySelector(`.map`);

const addPinActiveClass = (pinElement) => {
  pinElement.classList.add(`map__pin--active`);
};

const removePinActiveClass = (pinElement) => {
  pinElement.classList.remove(`map__pin--active`);
};

const getCurrentActivePin = () => {
  return mapElement.querySelector(`.map__pin--active`);
};

const removeCurrentPinActiveClass = () => {
  const currentActivePin = getCurrentActivePin();

  if (currentActivePin) {
    removePinActiveClass(currentActivePin);
  }
};

const getPinTemplate = () => {
  return document
    .querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);
};

const generatePinElement = (ad) => {
  const pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = `${ad.location.x - Pin.WIDTH / 2}px`;
  pinElement.style.top = `${ad.location.y - Pin.HEIGHT}px`;

  const pinImageElement = pinElement.querySelector(`img`);
  pinImageElement.src = ad.author.avatar;
  pinImageElement.alt = ad.offer.title;

  const onPinElementClick = (event) => {
    if (utils.isMainClick(event)) {
      card.render(ad);
      removeCurrentPinActiveClass();
      addPinActiveClass(pinElement);
    }
  };

  pinElement.addEventListener(`click`, onPinElementClick);

  return pinElement;
};

const pinTemplate = getPinTemplate();

card.initialize(removeCurrentPinActiveClass);

window.pin = {
  generate: generatePinElement,
  removeActiveFromCurrent: removeCurrentPinActiveClass
};
