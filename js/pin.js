'use strict';

(() => {
  const {isMainClick, isEnterKey} = window.utils;
  const {renderCardElement} = window.card;

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

  const generatePinElement = (ad) => {
    const pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = `${ad.location.x - Pin.WIDTH / 2}px`;
    pinElement.style.top = `${ad.location.y - Pin.HEIGHT}px`;

    const pinImage = pinElement.querySelector(`img`);
    pinImage.src = ad.author.avatar;
    pinImage.alt = ad.offer.title;

    const onPinElementClick = (event) => {
      if (isMainClick(event)) {
        renderCardElement(ad);
      }
    };

    const onPinElementEnterPressed = (event) => {
      if (isEnterKey(event)) {
        renderCardElement(ad);
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
