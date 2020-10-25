'use strict';

(() => {
  const random = window.random;

  const TYPES = [
    `palace`,
    `flat`,
    `house`,
    `bungalow`
  ];

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

  const PHOTOS_MOCK = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
  ];

  const ADS_COUNT = 8;

  const generateRandomPhotoArray = () => {
    return PHOTOS_MOCK.slice(0, random.getRandomNumberInRange(1, MAX_PHOTOS_COUNT));
  };

  const generateAd = (index) => {
    const avatar = `img/avatars/user0${index + 1}.png`;
    const title = TITLES_MOCK[index];
    const location = [
      random.getRandomNumberInRange(MIN_LOCATION_X, MAX_LOCATION_X),
      random.getRandomNumberInRange(MIN_LOCATION_Y, MAX_LOCATION_Y)
    ];
    const price = random.getRandomNumberInRange(MIN_AD_PRICE, MAX_AD_PRICE);
    const type = random.getRandomItemFromArray(TYPES);
    const rooms = random.getRandomNumberInRange(1, MAX_ROOMS);
    const guests = random.getRandomNumberInRange(1, MAX_GUESTS);
    const checkin = random.getRandomItemFromArray(CHECK_TIMES);
    const checkout = random.getRandomItemFromArray(CHECK_TIMES);
    const features = random.getRandomItemsFromArray(FEATURES);
    const description = random.getRandomItemFromArray(DESCRIPTIONS_MOCK);
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

  const getAds = () => data;

  const data = generateAds(ADS_COUNT);

  window.data = {
    getAds,
    MIN_LOCATION_Y,
    MAX_LOCATION_Y
  };
})();
