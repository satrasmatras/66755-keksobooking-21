'use strict';

(() => {
  const form = window.form;
  const filter = window.filter;
  const map = window.map;
  const backend = window.backend;
  const error = window.error;

  const setPageActive = () => {
    backend.load((ads) => {
      map.setActive(ads);
      filter.setActive();
      form.setActive();
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
