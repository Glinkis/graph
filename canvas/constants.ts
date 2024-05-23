const style = getComputedStyle(document.body);

// Allows accessing CSS vaiables in JS.
export const COLOR_PALETTE = {
  get BACKGROUND() {
    return style.getPropertyValue("--background-color");
  },
  get PRIMARY() {
    return style.getPropertyValue("--primary-color");
  },
  get SECONDARY() {
    return style.getPropertyValue("--secondary-color");
  },
  get TERTIARY() {
    return style.getPropertyValue("--tertiary-color");
  },
  get QUATERNARY() {
    return style.getPropertyValue("--quaternary-color");
  },
};
