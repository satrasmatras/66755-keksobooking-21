'use strict';

const utils = window.utils;
const form = window.form;
const move = window.move;

const MAP_LIMITS = {
  MIN_Y: 130,
  MAX_Y: 630
};

const MainPinPointer = {
  WIDTH: 10,
  HEIGHT: 22
};

const updateAddressInput = () => {
  const {x, y} = getMainPinCoords();
  form.updateAddress(`${x}, ${y}`);
};

const getMainPinCoords = () => {
  const {left, top} = getComputedStyle(mainPinElement);
  const {offsetWidth, offsetHeight} = mainPinElement;

  const mapIsDisabled = mapElement.classList.contains(`map--faded`);

  const x = Math.round(parseInt(left, 10) + offsetWidth / 2);
  const y = mapIsDisabled ?
    Math.round(parseInt(top, 10) + offsetHeight / 2) :
    Math.round(parseInt(top, 10) + offsetHeight + MainPinPointer.HEIGHT);

  return {x, y};
};

const setMainPinActive = (mainPinCallback) => {
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

const resetMainPinCoordinates = () => {
  const {left, top} = mainPinInitialPositionStyles;
  mainPinElement.style.left = left;
  mainPinElement.style.top = top;
};

const mapElement = document.querySelector(`.map`);
const mainPinElement = mapElement.querySelector(`.map__pin--main`);

const mainPinInitialPositionStyles = {
  left: mainPinElement.style.left,
  top: mainPinElement.style.top
};

move.initialize(mainPinElement, mapElement, MAP_LIMITS, updateAddressInput);

window.mainPin = {
  resetCoords: resetMainPinCoordinates,
  setActive: setMainPinActive,
  updateAddressInput
};
