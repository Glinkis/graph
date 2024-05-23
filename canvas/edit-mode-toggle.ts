import { COLOR_PALETTE } from "./constants.js";
import { createElement } from "./create-element.js";

export let editMode = "move";

function onChange(event: Event) {
  if (event.target instanceof HTMLInputElement) {
    editMode = event.target.value;
  }
}

const sharedStyle: Partial<CSSStyleDeclaration> = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "12px 16px",
  gap: "8px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
  fontFamily: "sans-serif",
  borderRadius: "4px",
  background: COLOR_PALETTE.PRIMARY,
  color: COLOR_PALETTE.BACKGROUND,
};

export const editModeToggle = createElement("fieldset", {
  onchange: onChange,
  style: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: "96px",
    right: "16px",
    gap: "4px",
    border: "none",
  },
  children: [
    createElement("legend", {
      textContent: "Edit Mode",
      style: {
        color: COLOR_PALETTE.PRIMARY,
        fontSize: "16px",
        fontWeight: "bold",
        fontFamily: "sans-serif",
      },
    }),
    createElement("label", {
      style: sharedStyle,
      textContent: "Move",
      children: createElement("input", {
        type: "radio",
        name: "edit-mode",
        value: "move",
        checked: true,
      }),
    }),
    createElement("label", {
      style: sharedStyle,
      textContent: "Add Edge",
      children: createElement("input", {
        type: "radio",
        name: "edit-mode",
        value: "add-edge",
      }),
    }),
    createElement("label", {
      style: sharedStyle,
      textContent: "Add Node",
      children: createElement("input", {
        type: "radio",
        name: "edit-mode",
        value: "add-node",
      }),
    }),
    createElement("label", {
      style: sharedStyle,
      textContent: "Remove Node",
      children: createElement("input", {
        type: "radio",
        name: "edit-mode",
        value: "remove-node",
      }),
    }),
  ],
});
