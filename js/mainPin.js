'use strict';

const utils = window.utils;
const form = window.form;
const move = window.move;

const MainPinPointer = {
  WIDTH: 10,
  HEIGHT: 23
};

const MAP_LIMITS = {
  MIN_Y: 130,
  MAX_Y: 630
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

  const mapElementIsDisabled = mapElement.classList.contains(`map--faded`);

  const x = Math.round(parseInt(left, 10) + offsetWidth / 2);
  const y = mapElementIsDisabled ?
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

const mainPinInitialPositionStyles = {
  left: mainPinElement.style.left,
  top: mainPinElement.style.top
};

const mainPinOffsetY = mainPinElement.offsetHeight + MainPinPointer.HEIGHT;
move.initialize(mainPinElement, mapElement, MAP_LIMITS, mainPinOffsetY, updateAddressInput);

window.mainPin = {
  resetCoords: resetMainPinCoordinates,
  setActive: setMainPinActive,
  updateAddressInput
};
