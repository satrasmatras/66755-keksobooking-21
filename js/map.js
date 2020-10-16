'use strict';

(() => {
  const {isEscapeKey, isMainClick, isEnterKey} = window.utils;
  const {generatePinElement} = window.pin;
  const {createCardElement} = window.card;
  const {setAddressInputValue} = window.form;
  const {setMapFilterActive, setMapFilterInactive} = window.mapFilter;

  const mapElement = document.querySelector(`.map`);
  const mainPinElement = mapElement.querySelector(`.map__pin--main`);

  const mapPinsElement = document.querySelector(`.map__pins`);
  const mapFilterContainerElement = mapElement.querySelector(`.map__filters-container`);

  const getCurrentCardElement = () => mapElement.querySelector(`.popup`);

  const onEscCardElementPressed = (event) => {
    if (isEscapeKey(event)) {
      const currentCardElement = getCurrentCardElement();
      currentCardElement.remove();
      document.removeEventListener(`keydown`, onEscCardElementPressed);
    }
  };

  const renderCardElement = (ad) => {
    document.addEventListener(`keydown`, onEscCardElementPressed);

    const cardElement = createCardElement(ad, () => {
      document.removeEventListener(`keydown`, onEscCardElementPressed);
    });

    const previousCardElement = getCurrentCardElement();

    if (previousCardElement) {
      mapElement.replaceChild(cardElement, previousCardElement);
    } else {
      mapElement.insertBefore(cardElement, mapFilterContainerElement);
    }
  };

  const renderPinElements = (ads) => {
    const fragment = document.createDocumentFragment();

    ads.forEach((ad) => {
      const pinElement = generatePinElement(ad, () => {
        renderCardElement(ad);
      });
      fragment.append(pinElement);
    });

    mapPinsElement.append(fragment);
  };

  const clearPins = () => {
    const pins = mapElement.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pins.forEach((pin) => {
      pin.remove();
    });
  };

  const MainPinPointer = {
    WIDTH: 10,
    HEIGHT: 22
  };

  const getMainPinCoords = () => {
    const {left, top} = getComputedStyle(mainPinElement);
    const {offsetWidth, offsetHeight} = mainPinElement;

    const x = parseInt(left, 10) + offsetWidth / 2;
    const y = parseInt(top, 10) + offsetHeight + MainPinPointer.HEIGHT;

    return {x, y};
  };

  const updateAddressInput = () => {
    const {x, y} = getMainPinCoords();
    setAddressInputValue(`${x}, ${y}`);
  };

  const setMapActive = (ads) => {
    mapElement.classList.remove(`map--faded`);
    setMapFilterActive();
    renderPinElements(ads);
  };

  const setMapInactive = (mainPinCallback) => {
    mapElement.classList.add(`map--faded`);
    setMapFilterInactive();

    const onMainPinClick = (event) => {
      if (isMainClick(event)) {
        mainPinCallback();
        mainPinElement.removeEventListener(`click`, onMainPinClick);
        mainPinElement.removeEventListener(`keydown`, onMainPinEnterPressed);
      }
    };

    const onMainPinEnterPressed = (event) => {
      if (isEnterKey(event)) {
        mainPinCallback();
        mainPinElement.removeEventListener(`click`, onMainPinClick);
        mainPinElement.removeEventListener(`keydown`, onMainPinEnterPressed);
      }
    };

    mainPinElement.addEventListener(`click`, onMainPinClick);
    mainPinElement.addEventListener(`keydown`, onMainPinEnterPressed);

    clearPins();
    resetMainPinCoordinates();
    updateAddressInput();
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

  window.map = {
    setMapActive,
    setMapInactive,
    updateAddressInput,
    resetMainPinCoordinates
  };
})();
