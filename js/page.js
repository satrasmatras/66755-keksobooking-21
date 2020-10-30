'use strict';

(() => {
  const form = window.form;
  const filter = window.filter;
  const map = window.map;
  const backend = window.backend;
  const error = window.error;
  const mainPin = window.mainPin;

  form.initialize(mainPin);

  const setPageActive = () => {
    backend.load((ads) => {
      map.setActive(ads);
      filter.setActive(ads);
      form.setActive(setPageInactive, mainPin);
    }, error.show);
  };

  const setPageInactive = () => {
    map.setInactive(setPageActive);
    filter.setInactive();
    form.setInactive();
  };

  window.page = {
    setInactive: setPageInactive,
    setActive: setPageActive
  };
})();
