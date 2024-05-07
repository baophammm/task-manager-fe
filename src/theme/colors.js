import { alpha } from "@mui/material/styles";
import {
  blue as muiBlue,
  green as muiGreen,
  purple as muiPurple,
  red as muiRed,
  orange as muiOrange,
  yellow as muiYellow,
} from "@mui/material/colors";
const withAlphas = (color) => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.3),
    alpha50: alpha(color.main, 0.5),
  };
};

export const neutral = {
  50: "#F8F9FA",
  100: "#F3F4F6",
  200: "#E5E7EB",
  300: "#D2D6DB",
  400: "#9DA4AE",
  500: "#6C737F",
  600: "#4D5761",
  700: "#2F3746",
  800: "#1C2536",
  900: "#111927",
};

export const indigo = withAlphas({
  lightest: "#F5F7FF",
  light: "#EBEEFE",
  main: "#6366F1",
  dark: "#4338CA",
  darkest: "#312E81",
  contrastText: "#FFFFFF",
});

export const primary = withAlphas({
  lightest: "#F0F5FF",
  light: "#CDE0F7",
  main: "#2684FC",
  dark: "#1860D9",
  darkest: "#0c2461",
  contrastText: "#FFFFFF",
});

export const success = withAlphas({
  lightest: "#F0FDF9",
  light: "#3FC79A",
  main: "#10B981",
  dark: "#0B815A",
  darkest: "#134E48",
  contrastText: "#FFFFFF",
});

export const info = withAlphas({
  lightest: "#ECFDFF",
  light: "#CFF9FE",
  main: "#06AED4",
  dark: "#0E7090",
  darkest: "#164C63",
  contrastText: "#FFFFFF",
});

export const warning = withAlphas({
  lightest: "#FFFAEB",
  light: "#FFAF38",
  main: "#F79009",
  dark: "#B54708",
  darkest: "#7A2E0E",
  contrastText: "#FFFFFF",
});

export const error = withAlphas({
  lightest: "#FEF3F2",
  light: "#FEE4E2",
  main: "#F04438",
  dark: "#B42318",
  darkest: "#7A271A",
  contrastText: "#FFFFFF",
});

export const green = withAlphas({
  lightest: muiGreen[100],
  light: muiGreen[300],
  main: muiGreen[500],
  dark: muiGreen[700],
  darkest: muiGreen[900],
  contrastText: "#FFFFFF",
});

export const blue = withAlphas({
  lightest: muiBlue[100],
  light: muiBlue[300],
  main: muiBlue[500],
  dark: muiBlue[700],
  darkest: muiBlue[900],
  contrastText: "#FFFFFF",
});

export const purple = withAlphas({
  lightest: muiPurple[100],
  light: muiPurple[300],
  main: muiPurple[500],
  dark: muiPurple[700],
  darkest: muiPurple[900],
  contrastText: "#FFFFFF",
});

export const red = withAlphas({
  lightest: muiRed[100],
  light: muiRed[300],
  main: muiRed[500],
  dark: muiRed[700],
  darkest: muiRed[900],
  contrastText: "#FFFFFF",
});

export const orange = withAlphas({
  lightest: muiOrange[100],
  light: muiOrange[300],
  main: muiOrange[500],
  dark: muiOrange[700],
  darkest: muiOrange[900],
  contrastText: "#FFFFFF",
});

export const yellow = withAlphas({
  lightest: muiYellow[100],
  light: muiYellow[300],
  main: muiYellow[500],
  dark: muiYellow[700],
  darkest: muiYellow[900],
  contrastText: "#FFFFFF",
});
