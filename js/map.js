'use strict';

(() => {
  const {renderPinElements, clearPinElements} = window.pins;
  const {
    setMainPinActive,
    updateAddressInput,
    resetMainPinCoordinates
  } = window.mainPin;

  const {mapElement} = window.elements;

  const setMapActive = (ads) => {
    mapElement.classList.remove(`map--faded`);
    renderPinElements(ads);
  };

  const setMapInactive = (setPageActive) => {
    mapElement.classList.add(`map--faded`);

    setMainPinActive(setPageActive);
    clearPinElements();
    resetMainPinCoordinates();
    updateAddressInput();
  };

  window.map = {
    setMapActive,
    setMapInactive,
    updateAddressInput,
    resetMainPinCoordinates
  };
})();
