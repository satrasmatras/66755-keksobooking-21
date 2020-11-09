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

let removeCurrentPinActiveClass;

const initialize = (removeCurrentPinActiveClassFunction) => {
  removeCurrentPinActiveClass = removeCurrentPinActiveClassFunction;
};

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

const cardNodeIsEmpty = (node) => {
  return !node.textContent.trim() && !node.src && !node.children.length;
};

const removeEmptyCardChildren = (cardElement) => {
  const nodes = cardElement.children;

  Array.from(nodes).forEach((node) => {
    if (cardNodeIsEmpty(node)) {
      node.remove();
    }
  });
};

const createCardElement = (ad) => {
  const cardElement = cardTemplate.cloneNode(true);
  const {author, offer} = ad;

  if (offer.title) {
    const titleElement = cardElement.querySelector(`.popup__title`);
    titleElement.textContent = offer.title;
  }

  if (offer.address) {
    const addressElement = cardElement.querySelector(`.popup__text--address`);
    addressElement.textContent = offer.address;
  }

  if (offer.price) {
    const priceElement = cardElement.querySelector(`.popup__text--price`);
    priceElement.textContent = `${offer.price}₽/ночь`;
  }

  if (offer.type) {
    const typeElement = cardElement.querySelector(`.popup__type`);
    typeElement.textContent = ROOM_TYPE_KEYS[offer.type];
  }

  if (offer.rooms && offer.guests) {
    const capacityElement = cardElement.querySelector(`.popup__text--capacity`);
    capacityElement.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  }

  if (offer.checkin && offer.checkout) {
    const timeElement = cardElement.querySelector(`.popup__text--time`);
    timeElement.textContent = `Заезд после ${offer.checkin},  выезд до ${offer.checkout}`;
  }

  if (offer.features) {
    const featuresElement = cardElement.querySelector(`.popup__features`);
    fillFeatureElement(featuresElement, offer.features);
  }

  if (offer.description) {
    const descriptionElement = cardElement.querySelector(`.popup__description`);
    descriptionElement.textContent = offer.description;
  }

  if (offer.photos) {
    const photosElement = cardElement.querySelector(`.popup__photos`);
    fillPhotosElement(photosElement, offer.photos);
  }

  if (author.avatar) {
    const avatarElement = cardElement.querySelector(`.popup__avatar`);
    avatarElement.src = author.avatar;
  }

  removeEmptyCardChildren(cardElement);

  const cardCloseElement = cardElement.querySelector(`.popup__close`);

  const onCardElementCloseClick = (event) => {
    if (utils.isMainClick(event)) {
      cardElement.remove();
      removeCurrentPinActiveClass();
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
    removeCurrentPinActiveClass();
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
  initialize,
  render: renderCardElement,
  clear: removeCurrentCardElement
};
