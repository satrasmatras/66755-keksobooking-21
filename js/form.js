'use strict';

(() => {
  const adFormElement = document.querySelector(`.ad-form`);
  const adFormFieldsetElements = adFormElement.querySelectorAll(`fieldset`);

  const addressInputElement = adFormElement.querySelector(`#address`);
  const priceInputElement = adFormElement.querySelector(`#price`);
  const houseTypeSelectElement = adFormElement.querySelector(`#type`);

  const timeinSelectElement = adFormElement.querySelector(`#timein`);
  const timeoutSelectElement = adFormElement.querySelector(`#timeout`);

  const TYPE_MIN_PRICE_MAP = {
    "bungalow": 0,
    "flat": 1000,
    "house": 5000,
    "palace": 10000
  };

  const setFormActive = () => {
    adFormElement.classList.remove(`ad-form--disabled`);
    adFormFieldsetElements.forEach((fieldset) => {
      fieldset.disabled = false;
    });
  };

  const setFormInactive = () => {
    adFormElement.classList.add(`ad-form--disabled`);
    adFormFieldsetElements.forEach((fieldset) => {
      fieldset.disabled = true;
    });
  };

  const onTimeinSelectChanged = (event) => {
    timeoutSelectElement.value = event.target.value;
  };

  const onTimeoutSelectChanged = (event) => {
    timeinSelectElement.value = event.target.value;
  };

  timeinSelectElement.addEventListener(`change`, onTimeinSelectChanged);
  timeoutSelectElement.addEventListener(`change`, onTimeoutSelectChanged);

  const onHouseTypeSelectElement = () => {
    updatePriceAttrsByHouseTypeSelectValue();
  };

  const updatePriceAttrsByHouseTypeSelectValue = () => {
    const selectedType = houseTypeSelectElement.value;
    const newMinPrice = TYPE_MIN_PRICE_MAP[selectedType];

    priceInputElement.min = newMinPrice;
    priceInputElement.placeholder = newMinPrice;
  };

  houseTypeSelectElement.addEventListener(`change`, onHouseTypeSelectElement);

  const roomsSelectElement = adFormElement.querySelector(`#room_number`);
  const guestsSelectElement = adFormElement.querySelector(`#capacity`);

  const guestsSelectIsValid = () => {
    const roomsCount = parseInt(roomsSelectElement.value, 10);
    const guestsCount = parseInt(guestsSelectElement.value, 10);

    if (roomsCount === 100 && guestsCount === 0) {
      return true;
    }

    return roomsCount < 100 && guestsCount <= roomsCount;
  };

  const setAndReportGuestsSelectValidity = () => {
    const guestsCustomValidityValue = guestsSelectIsValid() ? `` : `Вы не можете выбрать такое количество гостей`;

    guestsSelectElement.setCustomValidity(guestsCustomValidityValue);
    guestsSelectElement.reportValidity();
  };

  const onRoomsSelectChange = () => {
    setAndReportGuestsSelectValidity();
  };

  const onGuestsSelectChange = () => {
    setAndReportGuestsSelectValidity();
  };

  roomsSelectElement.addEventListener(`change`, onRoomsSelectChange);
  guestsSelectElement.addEventListener(`change`, onGuestsSelectChange);

  const onAdFormSubmit = (event) => {
    setAndReportGuestsSelectValidity();
    if (!adFormElement.reportValidity()) {
      event.preventDefault();
    }
  };

  const setAddressInputValue = (x, y) => {
    addressInputElement.value = `${x}, ${y}`;
  };

  adFormElement.addEventListener(`submit`, onAdFormSubmit);
  updatePriceAttrsByHouseTypeSelectValue();

  window.form = {
    setFormActive,
    setFormInactive,
    setAddressInputValue
  };
})();
