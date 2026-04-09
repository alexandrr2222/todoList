import {dividerLineIcon, burgerMenuIcon, moreOptionsIcon, searchIcon, plusIcon, plusSymbol} from "./icons.js";

export function initIcons(){
    // header
    const menuButton = document.querySelector(".menuButton");
    menuButton.innerHTML = burgerMenuIcon;
    const moreOptionsButton = document.querySelector(".moreOptionsButton");
    moreOptionsButton.innerHTML = moreOptionsIcon;
    const searchButton = document.querySelector(".searchButton");
    searchButton.innerHTML = searchIcon;

    // main
    const plusButton = document.querySelector(".plusButton");
    plusButton.insertAdjacentHTML("afterbegin", plusIcon)

    // nav
    const dividerLineIcons = document.querySelectorAll(".dividerLine")
    dividerLineIcons.forEach(div => {
        div.innerHTML = dividerLineIcon;
    });

    
}

