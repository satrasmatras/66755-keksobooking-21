'use strict';

(() => {
  const {mapElement} = window.elements;
  const {isEscapeKey, isMainClick, isEnterKey} = window.utils;
  const {generatePinElement} = window.pin;
  const {createCardElement} = window.card;
  const {setAddressInputValue, setFormActive, setFormInactive} = window.form;
  const {generateAds} = window.data;

  const ADS_COUNT = 8;

  const mapFiltersElement = mapElement.querySelector(`.map__filters`);
  const mapPinsElement = document.querySelector(`.map__pins`);
  const mapFilterContainerElement = mapElement.querySelector(`.map__filters-container`);
  const mainPinElement = mapElement.querySelector(`.map__pin--main`);

  const renderPinElements = (ads) => {
    const fragment = document.createDocumentFragment();
    const pinElements = [];

    ads.forEach((ad) => {
      const pinElement = generatePinElement(ad);
      addPinListeners(pinElement, ad);
      pinElements.push(pinElement);
    });

    fragment.append(...pinElements);
    mapPinsElement.append(fragment);
  };

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

  const addPinListeners = (pinElement, ad) => {
    const onPinElementClick = (event) => {
      if (isMainClick(event)) {
        renderCardElement(ad);
      }
    };

    const onPinElementEnterPressed = (event) => {
      if (isEnterKey(event)) {
        renderCardElement(ad);
      }
    };

    const addPinElementListeners = () => {
      pinElement.addEventListener(`click`, onPinElementClick);
      pinElement.addEventListener(`keydown`, onPinElementEnterPressed);
    };

    addPinElementListeners();
  };

  const showPins = () => {
    renderPinElements(ads);
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

    removeMainPinListeners();
    showPins();
  };

  const setMapInactive = () => {
    mapElement.classList.add(`map--faded`);

    mapFiltersElement.classList.add(`map__filters--disabled`);

    addMainPinListeners();
    clearPins();
  };

  const setPageActive = () => {
    setMapActive();
    setFormActive();
  };

  const setPageInactive = () => {
    setMapInactive();
    setFormInactive();
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

  const onMainPinMousedown = (event) => {
    if (isMainClick(event)) {
      setPageActive();
      updateAddressInput();
    }
  };

  const onMainPinEnterPressed = (event) => {
    if (isEnterKey(event)) {
      setPageActive();
      updateAddressInput();
    }
  };

  const addMainPinListeners = () => {
    mainPinElement.addEventListener(`mousedown`, onMainPinMousedown);
    mainPinElement.addEventListener(`keydown`, onMainPinEnterPressed);
  };

  const removeMainPinListeners = () => {
    mainPinElement.removeEventListener(`mousedown`, onMainPinMousedown);
    mainPinElement.removeEventListener(`keydown`, onMainPinEnterPressed);
  };

  const ads = generateAds(ADS_COUNT);

  window.map = {
    setPageActive,
    setPageInactive,
    updateAddressInput
  };
})();
