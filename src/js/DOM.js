    const menuButton = document.querySelector(".menuButton")
    const overlay = document.querySelector(".overlay")
    const nav = document.querySelector("nav")
    const main = document.querySelector("main")
    const header = document.querySelector("header")
    const mainComponents = [overlay, nav, main, header]

export function navBar(){
    menuButton.addEventListener("click", () => {
        mainComponents.forEach(comp => {
            comp.classList.add("open")
        });
    })
    overlay.addEventListener("click", () => {    
        mainComponents.forEach(comp => {
            comp.classList.remove("open")
        });
    })
}
export function transitionLoad(){
    window.addEventListener("load", () => {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            mainComponents.forEach(comp => {
            comp.classList.add("transition")
            });
        })
    })
})
}