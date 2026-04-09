import "../css/reset.css";
import "../css/global.css";
import "../css/main.css";
import "../css/components/header.css";
import "../css/components/nav.css";
import {initIcons} from "./iconInjections.js";
import {navBar, transitionLoad} from "./DOM.js"
initIcons()
navBar()
transitionLoad()
console.log("hi")