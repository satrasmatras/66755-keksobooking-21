'use strict';

const backend = window.backend;
const error = window.error;
const success = window.success;
const utils = window.utils;
const fileChooser = window.fileChooser;

const TYPE_MIN_PRICE_MAP = {
  "bungalow": 0,
  "flat": 1000,
  "house": 5000,
  "palace": 10000
};

const IMAGE_FILE_TYPES = [
  `png`,
  `jpg`,
  `jpeg`,
  `svg`
];

const adFormElement = document.querySelector(`.ad-form`);
const adFormFieldsetElements = adFormElement.querySelectorAll(`fieldset`);

const adAvatarPickerElement = adFormElement.querySelector(`#avatar`);
const adAvatarPreviewImageElement = adFormElement.querySelector(`.ad-form-header__preview img`);

const adImagesPickerElement = adFormElement.querySelector(`#images`);
const adImagesPreviewImageElement = adFormElement.querySelector(`.ad-form__photo`);

const addressInputElement = adFormElement.querySelector(`#address`);
const priceInputElement = adFormElement.querySelector(`#price`);
const houseTypeSelectElement = adFormElement.querySelector(`#type`);

const timeinSelectElement = adFormElement.querySelector(`#timein`);
const timeoutSelectElement = adFormElement.querySelector(`#timeout`);

const roomsSelectElement = adFormElement.querySelector(`#room_number`);
const guestsSelectElement = adFormElement.querySelector(`#capacity`);

const resetButtonElement = adFormElement.querySelector(`.ad-form__reset`);

const onAvatarChange = (src) => {
  adAvatarPreviewImageElement.src = src;
};

const resetAvatarImage = () => {
  adAvatarPreviewImageElement.src = defaultAvatarImage;
};

const resetAdImage = () => {
  adImagesPreviewImageElement.innerHTML = ``;
};

const createAdImage = (src) => {
  const imageElement = document.createElement(`img`);

  imageElement.src = src;
  imageElement.alt = `Фотография жилья 1`;
  imageElement.style.maxWidth = `100%`;

  return imageElement;
};

const renderAdImage = (src) => {
  resetAdImage();
  const imageElement = createAdImage(src);
  adImagesPreviewImageElement.append(imageElement);
};

const onImagesChange = (src) => {
  renderAdImage(src);
};

const initialize = (setPageInactive) => {
  const onResetButtonElementClick = (event) => {
    if (utils.isMainClick(event)) {
      event.preventDefault();
      setPageInactive();
    }
  };

  const onResetButtonElementEnterPressed = (event) => {
    if (utils.isEnterKey(event)) {
      event.preventDefault();
      setPageInactive();
    }
  };

  resetButtonElement.addEventListener(`click`, onResetButtonElementClick);
  resetButtonElement.addEventListener(`keydown`, onResetButtonElementEnterPressed);
};

const setFormActive = (setPageInactive) => {
  adFormElement.classList.remove(`ad-form--disabled`);
  adFormFieldsetElements.forEach((fieldset) => {
    fieldset.disabled = false;
  });

  const onFormSaveSuccess = () => {
    success.show();
    adFormElement.reset();
    setPageInactive();
  };

  const onAdFormSubmit = (event) => {
    event.preventDefault();
    setAndReportGuestsSelectValidity();
    if (adFormElement.reportValidity()) {
      const data = new FormData(adFormElement);

      backend.save(data, onFormSaveSuccess, error.show);
      adFormElement.removeEventListener(`submit`, onAdFormSubmit);
    }
  };

  adFormElement.addEventListener(`submit`, onAdFormSubmit);
};

const setFormInactive = (mainPin) => {
  adFormElement.reset();
  adFormElement.classList.add(`ad-form--disabled`);
  adFormFieldsetElements.forEach((fieldset) => {
    fieldset.disabled = true;
  });
  resetAvatarImage();
  resetAdImage();
  updatePriceAttrsByHouseTypeSelectValue();
  mainPin.updateAddressInput();
};

const onTimeinSelectChanged = (event) => {
  timeoutSelectElement.value = event.target.value;
};

const onTimeoutSelectChanged = (event) => {
  timeinSelectElement.value = event.target.value;
};

const onHouseTypeSelectElement = () => {
  updatePriceAttrsByHouseTypeSelectValue();
};

const updatePriceAttrsByHouseTypeSelectValue = () => {
  const selectedType = houseTypeSelectElement.value;
  const newMinPrice = TYPE_MIN_PRICE_MAP[selectedType];

  priceInputElement.min = newMinPrice;
  priceInputElement.placeholder = newMinPrice;
};

const guestsSelectIsValid = () => {
  const roomsCount = parseInt(roomsSelectElement.value, 10);
  const guestsCount = parseInt(guestsSelectElement.value, 10);

  if (roomsCount === 100 && guestsCount === 0) {
    return true;
  }

  return roomsCount < 100 && guestsCount <= roomsCount && guestsCount !== 0;
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

const setAddressInputValue = (value) => {
  addressInputElement.value = value;
};

const defaultAvatarImage = adAvatarPreviewImageElement.src;

houseTypeSelectElement.addEventListener(`change`, onHouseTypeSelectElement);

timeinSelectElement.addEventListener(`change`, onTimeinSelectChanged);
timeoutSelectElement.addEventListener(`change`, onTimeoutSelectChanged);

roomsSelectElement.addEventListener(`change`, onRoomsSelectChange);
guestsSelectElement.addEventListener(`change`, onGuestsSelectChange);

updatePriceAttrsByHouseTypeSelectValue();

fileChooser.initialize(adAvatarPickerElement, IMAGE_FILE_TYPES, onAvatarChange);
fileChooser.initialize(adImagesPickerElement, IMAGE_FILE_TYPES, onImagesChange);

window.form = {
  initialize,
  setActive: setFormActive,
  setInactive: setFormInactive,
  updateAddress: setAddressInputValue
};
