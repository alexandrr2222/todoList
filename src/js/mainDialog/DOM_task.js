const prioButtons = document.querySelectorAll(".prioButton");

export function switchPrio() {
  prioButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedPrioBtn = document.querySelector(".selectedPrio");
      selectedPrioBtn.classList.remove("selectedPrio");
      btn.classList.add("selectedPrio");
    });
  });
}
