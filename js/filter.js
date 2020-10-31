'use strict';

(() => {
  const pins = window.pins;
  const card = window.card;

  const ANY_VALUE = `any`;

  const isAny = (value) => value === ANY_VALUE;

  const assertStringsEqual = (adPropValue, filterValue) => {
    if (isAny(filterValue)) {
      return true;
    }
    return adPropValue === filterValue;
  };

  const adIsCorrect = (ad) => {
    return assertStringsEqual(ad.offer.type, housingTypeSelectElement.value);
  };

  const mapFiltersElement = document.querySelector(`.map__filters`);
  const mapFiltersFieldsetElements = mapFiltersElement.querySelectorAll(`input, select`);

  const housingTypeSelectElement = mapFiltersElement.querySelector(`#housing-type`);

  let onFilterElementsChange;

  const setFilterActive = (ads) => {
    mapFiltersElement.classList.remove(`map__filters--disabled`);
    mapFiltersFieldsetElements.forEach((fieldset) => {
      fieldset.disabled = false;
    });

    onFilterElementsChange = () => {
      const filteredAds = getFilteredAds(ads);
      pins.clear();
      card.clear();
      pins.render(filteredAds);
    };

    housingTypeSelectElement.addEventListener(`change`, onFilterElementsChange);
  };

  const getFilteredAds = (ads) => {
    return ads.filter((ad) => {
      return adIsCorrect(ad);
    });
  };

  const setFilterInactive = () => {
    mapFiltersElement.classList.add(`map__filters--disabled`);
    mapFiltersFieldsetElements.forEach((fieldset) => {
      fieldset.disabled = true;
    });

    mapFiltersElement.reset();
    housingTypeSelectElement.removeEventListener(`change`, onFilterElementsChange);
  };

  window.filter = {
    setActive: setFilterActive,
    setInactive: setFilterInactive
  };
})();
