import { common } from "@mui/material/colors";
import { alpha } from "@mui/material/styles";
import {
  error,
  indigo,
  primary,
  info,
  neutral,
  success,
  warning,
  green,
  blue,
  purple,
  red,
  orange,
  yellow,
} from "./colors";

export function createPalette({ paletteMode = "dark" }) {
  return {
    action:
      paletteMode === "dark"
        ? {
            active: neutral[500],
            disabled: alpha(neutral[900], 0.8),
            disabledBackground: alpha(neutral[900], 0.12),
            focus: alpha(neutral[100], 0.16),
            hover: alpha(neutral[100], 0.04),
            selected: alpha(neutral[100], 0.12),
          }
        : {
            active: neutral[500],
            disabled: alpha(neutral[100], 0.8),
            disabledBackground: alpha(neutral[100], 0.12),
            focus: alpha(neutral[900], 0.16),
            hover: alpha(neutral[900], 0.04),
            selected: alpha(neutral[900], 0.12),
          },
    background:
      paletteMode === "dark"
        ? {
            default: neutral[900],
            secondary: neutral[100],
            paper: neutral[800],
          }
        : {
            default: neutral[100],
            secondary: neutral[900],
            paper: common.white,
          },

    divider: paletteMode === "dark" ? neutral[200] : neutral[800],

    error,
    info,
    mode: "dark",
    neutral,
    // primary: indigo,
    primary,
    success,
    text:
      paletteMode === "dark"
        ? {
            primary: neutral[100],
            secondary: neutral[700],
            disabled: alpha(neutral[200], 0.38),
          }
        : {
            primary: neutral[900],
            secondary: neutral[300],
            disabled: alpha(neutral[800], 0.38),
          },
    warning,
    tag: {
      green,
      blue,
      purple,
      red,
      orange,
      yellow,
    },
  };
}
