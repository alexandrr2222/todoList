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
  // injectIcon("date");
  injectIcon("search");
  injectIcon("threeDots");

  // main
  injectIcon("add");
  injectIcon("closeSVG");
  injectIcon("editSVG");
  injectIcon("deleteSVG");
  // nav
  injectIcon("dividerLine");
  injectIcon("allTasksSVG");
  injectIcon("uncategorizedSVG");
  injectIcon("completedSVG");
  // lower nav
  injectIcon("notesSVG");
  injectIcon("statisticsSVG");
  injectIcon("settingsSVG");
}
