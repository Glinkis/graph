import { COLOR_PALETTE } from "./constants.js";

export const resetPositionButton = document.createElement("button");

resetPositionButton.textContent = "Reset Position";

Object.assign(resetPositionButton.style, {
  position: "fixed",
  top: "16px",
  right: "16px",
  padding: "8px 12px",
  fontSize: "16px",
  fontWeight: "bold",
  background: COLOR_PALETTE.PRIMARY,
  color: COLOR_PALETTE.BACKGROUND,
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
});
