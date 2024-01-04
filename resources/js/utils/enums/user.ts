// Пол человека
export enum ESex {
  MALE = "male",
  FEMALE = "female",
}

// Роль юзера
export enum ERoles {
  SITE_ADMIN = "site_admin",
  SITE_MANAGER = "site_manager",

  ADMIN = "admin",
  MANAGER = "manager",
  EMPLOYEE = "employee",

  USER = "user",
  GUEST = "guest",
  TEST_USER = "test_user",
}

// Язык
export enum ELanguages {
  RU = "ru",
  EN = "en"
}

// Виды избранного
export enum EFavorite {
  NEWS = "news",
}

// Куда можно "поделиться" статьями разными
export enum EShareSocial {
  WHATSAPP = "whatsapp",
  TELEGRAM = "telegram",
  FACEBOOK = "facebook",
  TWITTER = "twitter",
  REDDIT = "reddit",
  VK = "vk",
  OK = "ok",
  COPY_LINK = "copy_link",
}

export enum EMainPageTabs {
  USER = "user",
  ADMIN = "admin"
}
