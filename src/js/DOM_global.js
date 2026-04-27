import { navIndicator, mainComponents } from "./DOM_components.js";

export function transitionLoad() {
  window.addEventListener("load", () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        navIndicator.classList.add("transitionIndicator");
        mainComponents.forEach((comp) => {
          comp.classList.add("transition");
        });
      });
    });
  });
}
