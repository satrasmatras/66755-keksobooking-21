'use strict';

(() => {
  const {generatePinElement} = window.pin;
  const {mapElement} = window.elements;

  const mapPinsElement = mapElement.querySelector(`.map__pins`);

  const renderPinElements = (ads) => {
    const fragment = document.createDocumentFragment();

    ads.forEach((ad) => {
      const pinElement = generatePinElement(ad);
      fragment.append(pinElement);
    });

    mapPinsElement.append(fragment);
  };

  const clearPinElements = () => {
    const pins = mapPinsElement.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    pins.forEach((pin) => {
      pin.remove();
    });
  };

  window.pins = {
    renderPinElements,
    clearPinElements
  };
})();
