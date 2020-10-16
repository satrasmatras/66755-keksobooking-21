'use strict';

(() => {
  const {isMainClick, isEnterKey} = window.utils;

  const getPinTemplate = () => {
    return document
      .querySelector(`#pin`)
      .content
      .querySelector(`.map__pin`);
  };

  const Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  const pinTemplate = getPinTemplate();

  const generatePinElement = (ad, pinCallback) => {
    const pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = `${ad.location.x - Pin.WIDTH / 2}px`;
    pinElement.style.top = `${ad.location.y - Pin.HEIGHT}px`;

    const pinImage = pinElement.querySelector(`img`);
    pinImage.src = ad.author.avatar;
    pinImage.alt = ad.offer.title;

    const onPinElementClick = (event) => {
      if (isMainClick(event)) {
        pinCallback();
      }
    };

    const onPinElementEnterPressed = (event) => {
      if (isEnterKey(event)) {
        pinCallback();
      }
    };

    pinElement.addEventListener(`click`, onPinElementClick);
    pinElement.addEventListener(`keydown`, onPinElementEnterPressed);

    return pinElement;
  };

  window.pin = {
    generatePinElement
  };
})();
