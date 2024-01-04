export const TOGGLE_SUPPORT_TECH_EVENT: string = "TOGGLE_SUPPORT_TECH_EVENT";
export const SCROLL_UP_EVENT: string = "SCROLL_UP_EVENT";
export const TOGGLE_LOGIN_POPUP_EVENT: string = "TOGGLE_LOGIN_POPUP_EVENT";
export const TOGGLE_REGISTER_POPUP_EVENT: string = "TOGGLE_REGISTER_POPUP_EVENT";

// createEvent Отправляет собственное событие
export const createEvent = (name: string, detail: object = {}): void => {
  document.dispatchEvent(new CustomEvent(name, {
    detail
  }));
};

// eventScrollUp Поднимает страницу к верху
export const eventScrollUp = (timeOut?: number) => {
  setTimeout(() => createEvent(SCROLL_UP_EVENT), timeOut ? timeOut : 0);
};

// toggleSupportTech Открывает/закрывает попап с тех поддержкой
export const toggleSupportTech = (e?: any): void => {
  e && e.preventDefault();
  createEvent(TOGGLE_SUPPORT_TECH_EVENT);
};

// toggleLoginPopup Открывает/закрывает попап с логином
export const toggleLoginPopup = (e?: any): void => {
  e && e.preventDefault();
  createEvent(TOGGLE_LOGIN_POPUP_EVENT);
};

// toggleRegisterPopup Открывает/закрывает попап с регистрацией
export const toggleRegisterPopup = (e?: any): void => {
  e && e.preventDefault();
  createEvent(TOGGLE_REGISTER_POPUP_EVENT);
};