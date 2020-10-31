'use strict';

(() => {
  const pins = window.pins;
  const card = window.card;

  const ANY_VALUE = `any`;
  const LOW_PRICE_KEY = `low`;
  const MIDDLE_PRICE_KEY = `middle`;
  const HIGH_PRICE_KEY = `high`;

  const isAny = (value) => value === ANY_VALUE;

  const housingTypeIsCorrect = (itemValue, filterValue) => {
    if (isAny(filterValue)) {
      return true;
    }
    return itemValue === filterValue;
  };

  const housingPriceIsCorrect = (itemValue, filterValue) => {
    switch (filterValue) {
      case ANY_VALUE:
        return true;
      case LOW_PRICE_KEY:
        return itemValue < 10000;
      case MIDDLE_PRICE_KEY:
        return itemValue >= 10000 && itemValue <= 50000;
      case HIGH_PRICE_KEY:
        return itemValue > 50000;
      default: return false;
    }
  };

  const housingRoomsIsCorrect = (itemValue, filterValue) => {
    if (isAny(filterValue)) {
      return true;
    }

    return itemValue === +filterValue;
  };

  const housingGuestsIsCorrect = (itemValue, filterValue) => {
    if (isAny(filterValue)) {
      return true;
    }

    return itemValue === +filterValue;
  };

  const housingFeaturesAreCorrect = (itemFeatures, filterFeatures) => {
    if (filterFeatures.length === 0) {
      return true;
    }
    return filterFeatures.every((filterFeature) => itemFeatures.indexOf(filterFeature) !== -1);
  };

  const getCheckedHousingFeatures = () => {
    return Array.from(housingFeatureCheckboxElements)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);
  };

  const adIsCorrect = (ad) => {
    return housingTypeIsCorrect(ad.offer.type, housingTypeSelectElement.value) &&
    housingPriceIsCorrect(ad.offer.price, housingPriceSelectElement.value) &&
    housingRoomsIsCorrect(ad.offer.rooms, housingRoomsSelectElement.value) &&
    housingGuestsIsCorrect(ad.offer.guests, housingGuestsSelectElement.value) &&
    housingFeaturesAreCorrect(ad.offer.features, getCheckedHousingFeatures());
  };

  const mapFiltersElement = document.querySelector(`.map__filters`);
  const mapFiltersFieldsetElements = mapFiltersElement.querySelectorAll(`input, select`);

  const housingTypeSelectElement = mapFiltersElement.querySelector(`#housing-type`);
  const housingPriceSelectElement = mapFiltersElement.querySelector(`#housing-price`);
  const housingRoomsSelectElement = mapFiltersElement.querySelector(`#housing-rooms`);
  const housingGuestsSelectElement = mapFiltersElement.querySelector(`#housing-guests`);
  const housingFeatureCheckboxElements = mapFiltersElement.querySelectorAll(`.map__checkbox`);

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
    housingPriceSelectElement.addEventListener(`change`, onFilterElementsChange);
    housingRoomsSelectElement.addEventListener(`change`, onFilterElementsChange);
    housingGuestsSelectElement.addEventListener(`change`, onFilterElementsChange);
    housingFeatureCheckboxElements.forEach((checkbox) => {
      checkbox.addEventListener(`change`, onFilterElementsChange);
    });
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
    housingPriceSelectElement.removeEventListener(`change`, onFilterElementsChange);
    housingRoomsSelectElement.removeEventListener(`change`, onFilterElementsChange);
    housingGuestsSelectElement.removeEventListener(`change`, onFilterElementsChange);
    housingFeatureCheckboxElements.forEach((checkbox) => {
      checkbox.removeEventListener(`change`, onFilterElementsChange);
    });
  };

  window.filter = {
    setActive: setFilterActive,
    setInactive: setFilterInactive
  };
})();
