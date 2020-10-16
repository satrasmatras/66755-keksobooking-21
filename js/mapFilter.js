'use strict';

(() => {
  const mapFiltersElement = document.querySelector(`.map__filters`);
  const mapFiltersFieldsetElements = mapFiltersElement.querySelectorAll(`input, select`);

  const setMapFilterActive = () => {
    mapFiltersElement.classList.remove(`map__filters--disabled`);
    mapFiltersFieldsetElements.forEach((fieldset) => {
      fieldset.disabled = false;
    });
  };

  const setMapFilterInactive = () => {
    mapFiltersElement.classList.add(`map__filters--disabled`);
    mapFiltersFieldsetElements.forEach((fieldset) => {
      fieldset.disabled = true;
    });
  };

  window.mapFilter = {
    setMapFilterActive,
    setMapFilterInactive
  };
})();
