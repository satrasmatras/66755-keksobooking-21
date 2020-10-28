'use strict';

(() => {
  const form = window.form;
  const filter = window.filter;
  const map = window.map;
  const backend = window.backend;
  const message = window.message;

  const setPageActive = () => {
    backend.load((ads) => {
      map.setActive(ads);
      filter.setActive();
      form.setActive();
    }, message.onError);
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
