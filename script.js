const remainingBudget = document.querySelector(".remaining-budget-text");
const totalSpent = document.querySelector(".total-spent-text");
let balance = 0;
let spent = 0;
const currentBudget = document.querySelector(".current-budget");
const categories = document.querySelector(".categories");
const updateBudget = document.querySelector(".update-budget");
const categoriesModal = document.querySelector(".categories-modal");
const formModal = document.querySelector(".form-modal");
const form = document.querySelector(".budget-form form");

categories.addEventListener("click", () => {
  categoriesModal.classList.remove("toggle-modal");
});

updateBudget.addEventListener("click", () => {
  formModal.classList.remove("toggle-modal");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const budget = document.querySelector("#budget").value;
  currentBudget.textContent = `$${budget}`;
  balance = budget - spent;
  remainingBudget.textContent = `$${balance}`;
  formModal.classList.add("toggle-modal");
});
