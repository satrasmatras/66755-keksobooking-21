'use strict';

(() => {
  const {mainPinElement} = window.elements;
  const {
    setMapActive,
    setMapInactive,
    updateAddressInput,
    clearPins,
    renderPinElements
  } = window.map;
  const {setFormInactive, setFormActive} = window.form;
  const {isMainClick, isEnterKey} = window.utils;
  const {generateAds} = window.data;
  const ADS_COUNT = 8;

  const ads = generateAds(ADS_COUNT);

  const setPageActive = () => {
    setMapActive();
    setFormActive();
    removeMainPinListeners();
    renderPinElements(ads);
  };

  const setPageInactive = () => {
    setMapInactive();
    setFormInactive();
    addMainPinListeners();
    clearPins();
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

  setPageInactive();
  updateAddressInput();
})();
