'use strict';

const utils = window.utils;

const ROOM_TYPE_KEYS = {
  'palace': `Дворец`,
  'flat': `Квартира`,
  'house': `Дом`,
  'bungalow': `Бунгало`
};

const mapElement = document.querySelector(`.map`);
const mapFilterContainerElement = mapElement.querySelector(`.map__filters-container`);

const getCardTemplate = () => {
  return document
    .querySelector(`#card`)
    .content
    .querySelector(`.popup`);
};

const fillFeatureElement = (element, features) => {
  const fragment = document.createDocumentFragment();
  element.innerHTML = ``;

  features.forEach((feature) => {
    const liElement = document.createElement(`li`);
    liElement.classList.add(`popup__feature`);
    liElement.classList.add(`popup__feature--${feature}`);
    fragment.append(liElement);
  });

  element.append(fragment);
};

const fillPhotosElement = (element, photos) => {
  const photoElement = element.querySelector(`.popup__photo`);

  const photoElements = photos.map((photo) => {
    const newPhotoElement = photoElement.cloneNode(true);
    newPhotoElement.src = photo;

    return newPhotoElement;
  });

  photoElement.remove();
  element.append(...photoElements);
};

const createCardElement = (ad) => {
  const cardElement = cardTemplate.cloneNode(true);
  const {author, offer} = ad;

  const titleElement = cardElement.querySelector(`.popup__title`);
  if (offer.title) {
    titleElement.textContent = offer.title;
  } else {
    titleElement.remove();
  }

  const addressElement = cardElement.querySelector(`.popup__text--address`);
  if (offer.address) {
    addressElement.textContent = offer.address;
  } else {
    addressElement.remove();
  }

  const priceElement = cardElement.querySelector(`.popup__text--price`);
  if (offer.price) {
    priceElement.textContent = `${offer.price}₽/ночь`;
  } else {
    priceElement.remove();
  }

  const typeElement = cardElement.querySelector(`.popup__type`);
  if (offer.type) {
    typeElement.textContent = ROOM_TYPE_KEYS[offer.type];
  } else {
    typeElement.remove();
  }

  const capacityElement = cardElement.querySelector(`.popup__text--capacity`);
  if (offer.rooms && offer.guests) {
    capacityElement.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else {
    capacityElement.remove();
  }

  const timeElement = cardElement.querySelector(`.popup__text--time`);
  if (offer.checkin && offer.checkout) {
    timeElement.textContent = `Заезд после ${offer.checkin},  выезд до ${offer.checkout}`;
  } else {
    timeElement.remove();
  }

  const featuresElement = cardElement.querySelector(`.popup__features`);
  if (offer.features) {
    fillFeatureElement(featuresElement, offer.features);
  } else {
    featuresElement.remove();
  }

  const descriptionElement = cardElement.querySelector(`.popup__description`);
  if (offer.description) {
    descriptionElement.textContent = offer.description;
  } else {
    descriptionElement.remove();
  }

  const photosElement = cardElement.querySelector(`.popup__photos`);
  if (offer.photos) {
    fillPhotosElement(photosElement, offer.photos);
  } else {
    photosElement.remove();
  }

  const avatarElement = cardElement.querySelector(`.popup__avatar`);
  if (author.avatar) {
    avatarElement.src = author.avatar;
  } else {
    avatarElement.remove();
  }

  const cardCloseElement = cardElement.querySelector(`.popup__close`);

  const onCardElementCloseClick = (event) => {
    if (utils.isMainClick(event)) {
      cardElement.remove();
      cardCloseElement.removeEventListener(`click`, onCardElementCloseClick);
      document.removeEventListener(`keydown`, onEscCardElementPressed);
    }
  };

  cardCloseElement.addEventListener(`click`, onCardElementCloseClick);

  return cardElement;
};

const getCurrentCardElement = () => mapElement.querySelector(`.popup`);

const removeCurrentCardElement = () => {
  const previousCardElement = getCurrentCardElement();
  if (previousCardElement) {
    previousCardElement.remove();
  }
  document.removeEventListener(`keydown`, onEscCardElementPressed);
};

const onEscCardElementPressed = (event) => {
  if (utils.isEscapeKey(event)) {
    removeCurrentCardElement();
  }
};

const renderCardElement = (ad) => {
  removeCurrentCardElement();
  document.addEventListener(`keydown`, onEscCardElementPressed);

  const cardElement = createCardElement(ad);

  mapElement.insertBefore(cardElement, mapFilterContainerElement);
};

const cardTemplate = getCardTemplate();

window.card = {
  render: renderCardElement,
  clear: removeCurrentCardElement
};
