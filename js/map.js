'use strict';

const pins = window.pins;
const mainPin = window.mainPin;

const mapElement = document.querySelector(`.map`);

const setMapActive = (ads) => {
  mapElement.classList.remove(`map--faded`);
  pins.render(ads);
};

const setMapInactive = (setPageActive) => {
  mapElement.classList.add(`map--faded`);

  mainPin.setActive(setPageActive);
  pins.clear();
  mainPin.resetCoords();
  mainPin.updateAddressInput();
};

window.map = {
  setActive: setMapActive,
  setInactive: setMapInactive
};
