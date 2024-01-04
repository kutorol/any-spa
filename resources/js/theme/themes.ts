import { createTheme } from "@mui/material/styles";
// @ts-ignore
import colors from "../../assets/scss/themes-vars.module.scss";
import componentStyleOverrides from "./comp-style-override";
import themePalette from "./palette";
import themeTypography, { IThemeTypography } from "./typography";

export const theme = () => {
  const color = colors;

  const themeOption: IThemeTypography = {
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    grey500: color.grey500,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.secondaryLight,
    divider: color.grey200,
    customization: {
      fontFamily: `'Roboto', sans-serif`,
      borderRadius: 9
    }
  };

  const themeOptions = {
    direction: "ltr",
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: "48px",
        padding: "16px",
        "@media (min-width: 600px)": {
          minHeight: "48px"
        }
      }
    },
    typography: themeTypography(themeOption)
  };

  // @ts-ignore
  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
