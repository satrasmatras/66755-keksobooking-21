'use strict';

const ADS_COUNT = 8;

const TYPES = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
];

const ROOM_TYPE_KEYS = {
  'palace': `Дворец`,
  'flat': `Квартира`,
  'house': `Дом`,
  'bungalow': `Бунгало`
};

const MAX_ROOMS = 10;

const MAX_GUESTS = 15;

const CHECK_TIMES = [
  `12:00`,
  `13:00`,
  `14:00`
];

const FEATURES = [
  `wifi`,
  `dishwater`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];

const TITLES_MOCK = [
  `Отличная квартира!`,
  `Сдам срочно!`,
  `Купите, пожалуйста`,
  `Ищу соседа`,
  `Всем привет!`,
  `Сдается произведение искусства`,
  `Золотой дворец и 999 наложниц в придачу`,
  `Чайная церемония в подарок`,
  `Идеальный ретритный центр`
];

const DESCRIPTIONS_MOCK = [
  `В этой квартире жил сам Хидэо Кодзима!`,
  `Вас будут охранять профессиональные охранники Акита и Сиба ину!`,
  `Медитировал в этой квартире 99999999 часов!`,
  `Квартира хорошая! Не звонить! Только текст`,
  `Хорошие соседи и отличный вид из окна!`,
  `Минималистичная квартира для людей, заботящихся о своем пространстве`
];

const MIN_AD_PRICE = 10000;
const MAX_AD_PRICE = 100000000;

const MIN_LOCATION_X = 0;
const MAX_LOCATION_X = 1000;

const MIN_LOCATION_Y = 130;
const MAX_LOCATION_Y = 630;

const MAX_PHOTOS_COUNT = 3;

const Pin = {
  WIDTH: 50,
  HEIGHT: 70
};

const PHOTOS_MOCK = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
];

const getRandomNumberInRange = (min, max) => {
  return Math.round(Math.random() * (max - min)) + min;
};

const getRandomItemFromArray = (array) => {
  return array[getRandomNumberInRange(0, array.length - 1)];
};

const getRandomItemsFromArray = (array) => {
  return array.filter(() => getRandomNumberInRange(0, 1));
};

const generateRandomPhotoArray = () => {
  return PHOTOS_MOCK.slice(0, getRandomNumberInRange(1, MAX_PHOTOS_COUNT));
};

const generateAd = (index) => {
  const avatar = `img/avatars/user0${index + 1}.png`;
  const title = TITLES_MOCK[index];
  const location = [
    getRandomNumberInRange(MIN_LOCATION_X, MAX_LOCATION_X),
    getRandomNumberInRange(MIN_LOCATION_Y, MAX_LOCATION_Y)
  ];
  const price = getRandomNumberInRange(MIN_AD_PRICE, MAX_AD_PRICE);
  const type = getRandomItemFromArray(TYPES);
  const rooms = getRandomNumberInRange(1, MAX_ROOMS);
  const guests = getRandomNumberInRange(1, MAX_GUESTS);
  const checkin = getRandomItemFromArray(CHECK_TIMES);
  const checkout = getRandomItemFromArray(CHECK_TIMES);
  const features = getRandomItemsFromArray(FEATURES);
  const description = getRandomItemFromArray(DESCRIPTIONS_MOCK);
  const photos = generateRandomPhotoArray();

  return {
    author: {
      avatar
    },
    offer: {
      title,
      address: location.join(`, `),
      price,
      type,
      rooms,
      guests,
      checkin,
      checkout,
      features,
      description,
      photos
    },
    location: {
      x: location[0],
      y: location[1]
    }
  };
};

const generateAds = (count) => {
  const ads = [];

  for (let i = 0; i < count; i++) {
    const ad = generateAd(i);
    ads.push(ad);
  }

  return ads;
};

const getPinTemplate = () => {
  return document
    .querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);
};

const generatePinElement = (pinTemplate, ad) => {
  const pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = `${ad.location.x - Pin.WIDTH / 2}px`;
  pinElement.style.top = `${ad.location.y - Pin.HEIGHT}px`;

  const pinImage = pinElement.querySelector(`img`);
  pinImage.src = ad.author.avatar;
  pinImage.alt = ad.offer.title;

  return pinElement;
};

const renderPinElements = (pinTemplate, ads) => {
  const fragment = document.createDocumentFragment();
  const mapPins = document.querySelector(`.map__pins`);
  const pinElements = [];

  ads.forEach((ad) => {
    const pinElement = generatePinElement(pinTemplate, ad);
    pinElements.push(pinElement);
  });

  fragment.append(...pinElements);
  mapPins.append(fragment);
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

const createCardElement = (cardTemplate, ad) => {
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

  return cardElement;
};

const renderCardElement = (mapElement, mapFilterContainerElement, cardElement) => {
  mapElement.insertBefore(cardElement, mapFilterContainerElement);
};

const mapElement = document.querySelector(`.map`);
const mapFilterContainerElement = mapElement.querySelector(`.map__filters-container`);

const ads = generateAds(ADS_COUNT);

mapElement.classList.remove(`map--faded`);

const pinTemplate = getPinTemplate();
renderPinElements(pinTemplate, ads);

const cardTemplate = getCardTemplate();
const cardElement = createCardElement(cardTemplate, ads[0]);
renderCardElement(mapElement, mapFilterContainerElement, cardElement);
