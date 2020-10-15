'use strict';

(() => {
  const mapElement = document.querySelector(`.map`);
  const mainPinElement = mapElement.querySelector(`.map__pin--main`);

  window.elements = {
    mapElement,
    mainPinElement
  };
})();
