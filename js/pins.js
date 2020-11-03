'use strict';

const pin = window.pin;

const MAX_RENDERED_PINS_COUNT = 5;

const renderPinElements = (ads) => {
  const fragment = document.createDocumentFragment();
  const renderingAds = ads.slice(0, MAX_RENDERED_PINS_COUNT);

  renderingAds.forEach((ad) => {
    const pinElement = pin.generate(ad);
    fragment.append(pinElement);
  });

  mapPinsElement.append(fragment);
};

const clearPinElements = () => {
  const pinElements = mapPinsElement.querySelectorAll(`.map__pin:not(.map__pin--main)`);

  pinElements.forEach((pinElement) => {
    pinElement.remove();
  });
};

const mapPinsElement = document.querySelector(`.map__pins`);

window.pins = {
  render: renderPinElements,
  clear: clearPinElements,
  MAX_RENDERED_PINS_COUNT
};
