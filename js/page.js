'use strict';

(() => {
  const form = window.form;
  const filter = window.filter;
  const map = window.map;
  const {getAds} = window.data;

  const setPageActive = () => {
    map.setActive(ads);
    filter.setActive();
    form.setActive();
  };

  const setPageInactive = () => {
    map.setInactive(setPageActive);
    filter.setInactive();
    form.setInactive();
  };

  const ads = getAds();

  window.page = {
    setInactive: setPageInactive,
    setActive: setPageActive
  };
})();
