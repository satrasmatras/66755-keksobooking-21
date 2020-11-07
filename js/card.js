'use strict';

const utils = window.utils;

const ROOM_TYPE_KEYS = {
  'palace': `Дворец`,
  'flat': `Квартира`,
  'house': `Дом`,
  'bungalow': `Бунгало`
};

const getCardTemplate = () => {
  return document
    .querySelector(`#card`)
    .content
    .querySelector(`.popup`);
};

const fillFeatureElement = (element, features) => {
  const featuresItems = element.children;

  for (let i = 0; i < featuresItems.length; i++) {
    const featureItem = featuresItems[i];
    const featureClasses = featureItem.className;

    if (features.every((feature) => !featureClasses.includes(feature))) {
      featureItem.remove();
    }
  }
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

  const title = cardElement.querySelector(`.popup__title`);
  if (offer.title) {
    title.textContent = offer.title;
  } else {
    title.remove();
  }

  const address = cardElement.querySelector(`.popup__text--address`);
  if (offer.address) {
    address.textContent = offer.address;
  } else {
    address.remove();
  }

  const price = cardElement.querySelector(`.popup__text--price`);
  if (offer.price) {
    price.textContent = `${offer.price}₽/ночь`;
  } else {
    price.remove();
  }

  const type = cardElement.querySelector(`.popup__type`);
  if (offer.type) {
    type.textContent = ROOM_TYPE_KEYS[offer.type];
  } else {
    type.remove();
  }

  const capacity = cardElement.querySelector(`.popup__text--capacity`);
  if (offer.rooms && offer.guests) {
    capacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else {
    capacity.remove();
  }

  const time = cardElement.querySelector(`.popup__text--time`);
  if (offer.checkin && offer.checkout) {
    time.textContent = `Заезд после ${offer.checkin},  выезд до ${offer.checkout}`;
  } else {
    time.remove();
  }

  const features = cardElement.querySelector(`.popup__features`);
  if (offer.features) {
    fillFeatureElement(features, offer.features);
  } else {
    features.remove();
  }

  const description = cardElement.querySelector(`.popup__description`);
  if (offer.description) {
    description.textContent = offer.description;
  } else {
    description.remove();
  }

  const photos = cardElement.querySelector(`.popup__photos`);
  if (offer.photos) {
    fillPhotosElement(photos, offer.photos);
  } else {
    photos.remove();
  }

  const avatar = cardElement.querySelector(`.popup__avatar`);
  if (author.avatar) {
    avatar.src = author.avatar;
  } else {
    avatar.remove();
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

const mapElement = document.querySelector(`.map`);

const mapFilterContainerElement = mapElement.querySelector(`.map__filters-container`);

window.card = {
  render: renderCardElement,
  clear: removeCurrentCardElement
};
