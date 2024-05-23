import { COLOR_PALETTE } from "./constants.js";
import { createElement } from "./create-element.js";

export const resetPositionButton = createElement("button", {
  textContent: "Reset Position",
  style: {
    position: "fixed",
    top: "16px",
    right: "16px",
    padding: "12px 16px",
    fontSize: "16px",
    fontWeight: "bold",
    fontFamily: "sans-serif",
    background: COLOR_PALETTE.PRIMARY,
    color: COLOR_PALETTE.BACKGROUND,
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
});
