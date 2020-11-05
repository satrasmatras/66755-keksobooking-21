'use strict';

const utils = window.utils;
const card = window.card;

const Pin = {
  WIDTH: 50,
  HEIGHT: 70
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

  const pinImage = pinElement.querySelector(`img`);
  pinImage.src = ad.author.avatar;
  pinImage.alt = ad.offer.title;

  const onPinElementClick = (event) => {
    if (utils.isMainClick(event)) {
      card.render(ad);
    }
  };

  const onPinElementEnterPressed = (event) => {
    if (utils.isEnterKey(event)) {
      card.render(ad);
    }
  };

  pinElement.addEventListener(`click`, onPinElementClick);
  pinElement.addEventListener(`keydown`, onPinElementEnterPressed);

  return pinElement;
};

const pinTemplate = getPinTemplate();

window.pin = {
  generate: generatePinElement,
};
