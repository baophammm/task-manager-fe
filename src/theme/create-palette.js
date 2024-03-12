import { common } from "@mui/material/colors";
import { alpha } from "@mui/material/styles";
import { error, indigo, info, neutral, success, warning } from "./colors";

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
      // default: common.white,
      default: neutral[100],
      secondary: neutral[900],
      paper: common.white,
      // paper: neutral[600],
    },
    divider: "#F2F4F7",
    error,
    info,
    mode: "light",
    neutral,
    primary: indigo,
    success,
    text: {
      // primary: "F2F4F7",
      primary: neutral[600],
      secondary: neutral[100],
      disabled: alpha(neutral[900], 0.38),
    },
    warning,
  };
}
