'use strict';

(() => {
  const pin = window.pin;

  const renderPinElements = (ads) => {
    const fragment = document.createDocumentFragment();

    ads.forEach((ad) => {
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
    clear: clearPinElements
  };
})();
