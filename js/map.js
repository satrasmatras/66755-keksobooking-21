'use strict';

(() => {
  const {mapElement, mainPinElement} = window.elements;
  const {isEscapeKey, isMainClick} = window.utils;
  const {generatePinElement} = window.pin;
  const {createCardElement} = window.card;
  const {setAddressInputValue} = window.form;

  const mapFiltersElement = mapElement.querySelector(`.map__filters`);
  const mapPinsElement = document.querySelector(`.map__pins`);
  const mapFilterContainerElement = mapElement.querySelector(`.map__filters-container`);

  const addCardElementListeners = (cardElement) => {
    const cardCloseElement = cardElement.querySelector(`.popup__close`);

    const cardElementCloseClick = (event) => {
      if (isMainClick(event)) {
        cardElement.remove();
        document.removeEventListener(`keydown`, onEscCardElementPressed);
      }
    };

    cardCloseElement.addEventListener(`click`, cardElementCloseClick);
    document.addEventListener(`keydown`, onEscCardElementPressed);
  };

  const renderCardElement = (ad) => {
    const cardElement = createCardElement(ad);

    addCardElementListeners(cardElement);

    const previousCardElement = getCurrentCardElement();

    if (previousCardElement) {
      mapElement.replaceChild(cardElement, previousCardElement);
    } else {
      mapElement.insertBefore(cardElement, mapFilterContainerElement);
    }
  };

  const getCurrentCardElement = () => mapElement.querySelector(`.popup`);

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

  const setMapActive = () => {
    mapElement.classList.remove(`map--faded`);
    mapFiltersElement.classList.remove(`map__filters--disabled`);
  };

  const setMapInactive = () => {
    mapElement.classList.add(`map--faded`);
    mapFiltersElement.classList.add(`map__filters--disabled`);
  };

  const MainPinPointer = {
    WIDTH: 10,
    HEIGHT: 22
  };

  const getMainPinCoords = () => {
    const {left, top} = getComputedStyle(mainPinElement);
    const {offsetWidth, offsetHeight} = mainPinElement;

    const pinLocationX = parseInt(left, 10) + offsetWidth / 2;
    const pinLocationY = parseInt(top, 10) + offsetHeight + MainPinPointer.HEIGHT;

    return [pinLocationX, pinLocationY];
  };

  const onEscCardElementPressed = (event) => {
    if (isEscapeKey(event)) {
      const currentCardElement = getCurrentCardElement();
      currentCardElement.remove();
      document.removeEventListener(`keydown`, onEscCardElementPressed);
    }
  };

  const updateAddressInput = () => {
    const [x, y] = getMainPinCoords();
    setAddressInputValue(x, y);
  };

  window.map = {
    setMapActive,
    setMapInactive,
    updateAddressInput,
    renderPinElements,
    clearPins
  };
})();
