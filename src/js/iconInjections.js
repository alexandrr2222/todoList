import * as icons from "./icons.js";

function injectIcon(className) {
  if (document.querySelectorAll(`.${className}`).length > 1) {
    let classes = document.querySelectorAll(`.${className}`);
    classes.forEach((c) => {
      c.innerHTML = icons[`${className}Icon`];
    });
  } else
    document.querySelector(`.${className}`).innerHTML =
      icons[`${className}Icon`];
}

export function initIcons() {
  // header
  injectIcon("menu");
  injectIcon("date");
  injectIcon("search");
  // main
  injectIcon("add");
  injectIcon("closeDialog");
  // nav
  injectIcon("dividerLine");
  injectIcon("allTasksSVG");
  injectIcon("uncategorizedSVG");
  injectIcon("completedSVG");
  injectIcon("bookmarkSVG");
  // lower nav
  injectIcon("notesSVG");
  injectIcon("statsSVG");
  injectIcon("settingsSVG");
}
