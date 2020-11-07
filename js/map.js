'use strict';

const pins = window.pins;
const mainPin = window.mainPin;
const card = window.card;

const setMapActive = (ads) => {
  mapElement.classList.remove(`map--faded`);
  pins.render(ads);
};

const setMapInactive = (setPageActive) => {
  mapElement.classList.add(`map--faded`);

  mainPin.setActive(setPageActive);
  pins.clear();
  card.clear();
  mainPin.resetCoords();
  mainPin.updateAddressInput();
};

const mapElement = document.querySelector(`.map`);

window.map = {
  setActive: setMapActive,
  setInactive: setMapInactive
};
