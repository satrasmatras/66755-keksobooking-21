'use strict';

const utils = window.utils;
const form = window.form;
const move = window.move;

const MIN_Y = 130;
const MAX_Y = 630;

const MAP_LIMITS = {
  MIN_Y,
  MAX_Y
};

const MainPinPointer = {
  WIDTH: 10,
  HEIGHT: 22
};

const mapElement = document.querySelector(`.map`);
const mainPinElement = mapElement.querySelector(`.map__pin--main`);

const updateAddressInput = () => {
  const {x, y} = getMainPinCoords();
  form.updateAddress(`${x}, ${y}`);
};

const getMainPinCoords = () => {
  const {left, top} = getComputedStyle(mainPinElement);
  const {offsetWidth, offsetHeight} = mainPinElement;

  const x = Math.round(parseInt(left, 10) + offsetWidth / 2);
  const y = Math.round(parseInt(top, 10) + offsetHeight + MainPinPointer.HEIGHT);

  return {x, y};
};

const setMainPinActive = (mainPinCallback) => {
  move.initialize(mainPinElement, mapElement, MAP_LIMITS, updateAddressInput);

  const onMainPinClick = (event) => {
    if (utils.isMainClick(event)) {
      mainPinCallback();
      mainPinElement.removeEventListener(`mousedown`, onMainPinClick);
      mainPinElement.removeEventListener(`keydown`, onMainPinEnterPressed);
    }
  };

  const onMainPinEnterPressed = (event) => {
    if (utils.isEnterKey(event)) {
      mainPinCallback();
      mainPinElement.removeEventListener(`mousedown`, onMainPinClick);
      mainPinElement.removeEventListener(`keydown`, onMainPinEnterPressed);
    }
  };

  mainPinElement.addEventListener(`mousedown`, onMainPinClick);
  mainPinElement.addEventListener(`keydown`, onMainPinEnterPressed);
};

const mainPinInitialPositionStyles = {
  left: mainPinElement.style.left,
  top: mainPinElement.style.top
};

const resetMainPinCoordinates = () => {
  const {left, top} = mainPinInitialPositionStyles;
  mainPinElement.style.left = left;
  mainPinElement.style.top = top;
};

window.mainPin = {
  resetCoords: resetMainPinCoordinates,
  setActive: setMainPinActive,
  updateAddressInput
};
