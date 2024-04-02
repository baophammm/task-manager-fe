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

export function createPalette() {
  return {
    action: {
      active: neutral[500],
      disabled: alpha(neutral[900], 0.8),
      disabledBackground: alpha(neutral[900], 0.12),
      focus: alpha(neutral[900], 0.16),
      hover: alpha(neutral[900], 0.04),
      selected: alpha(neutral[900], 0.12),
    },
    background: {
      default: neutral[100],
      secondary: neutral[900],
      paper: common.white,
    },
    divider: "#F2F4F7",
    error,
    info,
    mode: "light",
    neutral,
    // primary: indigo,
    primary,
    success,
    text: {
      primary: neutral[600],
      secondary: neutral[100],
      disabled: alpha(neutral[900], 0.38),
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
