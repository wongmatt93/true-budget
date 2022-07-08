"use strict";
const remainingBudget = document.querySelector(".remaining-budget-text");
const totalSpent = document.querySelector(".total-spent-text");
const currentBudget = document.querySelector(".current-budget");
const categories = document.querySelector(".categories");
const updateBudget = document.querySelector(".update-budget");
const categoriesModal = document.querySelector(".categories-modal");
const formModal = document.querySelector(".form-modal");
const form = document.querySelector(".budget-form form");
const closeCategories = document.querySelector(".close-categories");
const expenseButton = document.querySelector(".expense-button");
const expenseForm = document.querySelector(".expense-form");
const expenseModal = document.querySelector(".expense-modal");

const expenseArray = [];

let balance = 0;
let spent = 0;
let budget = 0;

categories.addEventListener("click", () => {
  categoriesModal.classList.remove("toggle-modal");
});

updateBudget.addEventListener("click", () => {
  formModal.classList.remove("toggle-modal");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  budget = document.querySelector("#budget").value;
  currentBudget.textContent = `$${budget}`;
  balance = parseInt(budget) - parseInt(spent);
  remainingBudget.textContent = `$${balance}`;
  formModal.classList.add("toggle-modal");
});

closeCategories.addEventListener("click", () => {
  categoriesModal.classList.add("toggle-modal");
});

expenseButton.addEventListener("click", () => {
  expenseModal.classList.remove("toggle-modal");
});

expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const expenseType = document.querySelector("#categories").value;
  const expenseValues = document.querySelector("#amount").value;
  const newExpense = { expenseType, expenseValues };
  expenseArray.push(newExpense);
  spent += parseInt(newExpense.expenseValues);
  balance = parseInt(budget) - parseInt(spent);
  remainingBudget.textContent = `$${balance}`;
  totalSpent.textContent = `$${spent}`;
  console.log(balance, budget);
  expenseModal.classList.add("toggle-modal");
});
