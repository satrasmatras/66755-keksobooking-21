'use strict';

(() => {
  const {isMainClick, isEnterKey} = window.utils;
  const {setAddressInputValue} = window.form;
  const {mapElement} = window.elements;

  const MainPinPointer = {
    WIDTH: 10,
    HEIGHT: 22
  };

  const mainPinElement = mapElement.querySelector(`.map__pin--main`);

  const updateAddressInput = () => {
    const {x, y} = getMainPinCoords();
    setAddressInputValue(`${x}, ${y}`);
  };

  const getMainPinCoords = () => {
    const {left, top} = getComputedStyle(mainPinElement);
    const {offsetWidth, offsetHeight} = mainPinElement;

    const x = parseInt(left, 10) + offsetWidth / 2;
    const y = parseInt(top, 10) + offsetHeight + MainPinPointer.HEIGHT;

    return {x, y};
  };

  const setMainPinActive = (setPageActive) => {
    const onMainPinClick = (event) => {
      if (isMainClick(event)) {
        setPageActive();
        mainPinElement.removeEventListener(`click`, onMainPinClick);
        mainPinElement.removeEventListener(`keydown`, onMainPinEnterPressed);
      }
    };

    const onMainPinEnterPressed = (event) => {
      if (isEnterKey(event)) {
        setPageActive();
        mainPinElement.removeEventListener(`click`, onMainPinClick);
        mainPinElement.removeEventListener(`keydown`, onMainPinEnterPressed);
      }
    };

    mainPinElement.addEventListener(`click`, onMainPinClick);
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
    updateAddressInput,
    setMainPinActive,
    resetMainPinCoordinates
  };
})();
