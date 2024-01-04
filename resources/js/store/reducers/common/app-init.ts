import { createSlice } from "@reduxjs/toolkit";

export interface IAppInit {
  init: boolean;
  // если true - делается запрос за seo данными
  gettingSEO: boolean;
}

export const createAppInitReducerReducer = () => {
  return createSlice({
    name: "appInitReducer",
    initialState: {
      // приложение еще не инициализировано
      init: false,
      // true - приложение получает в текущий момент seo данные
      gettingSEO: false
    } as IAppInit,
    reducers: {
      set: (state, action) => {
        state.init = action.payload.init;
        state.gettingSEO = action.payload.gettingSEO;
      }
    }
  });
};

export const appInitReducer = createAppInitReducerReducer();

// Action creators are generated for each case reducer function
export const { set } = appInitReducer.actions;

export default appInitReducer.reducer;
