"use strict";
const remainingBudget = document.querySelector(".remaining-budget-text");
const totalSpent = document.querySelector(".total-spent-text");
const currentBudget = document.querySelector(".current-budget");
const categories = document.querySelector(".categories");
const updateBudget = document.querySelector(".update-budget");
const categoriesModal = document.querySelector(".categories-modal");
const transactionList = document.querySelector(".transaction-list");
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
  const expenseName = document.querySelector("#name").value;
  const newExpense = { expenseType, expenseValues, expenseName };
  expenseArray.push(newExpense);
  spent += parseInt(newExpense.expenseValues);
  balance = parseInt(budget) - parseInt(spent);
  // if (balance < 0) {
  //   alert("You suck with money");
  // }
  remainingBudget.textContent = `$${balance}`;
  totalSpent.textContent = `$${spent}`;
  const newList = document.createElement("li");
  const newAmount = document.createElement("p");
  const newType = document.createElement("p");
  const newName = document.createElement("p");
  const trash = document.createElement("i");
  trash.classList.add("fa-solid", "fa-trash");
  newList.classList.add("expense-item");
  newAmount.textContent = `$${newExpense.expenseValues}`;
  newType.textContent = newExpense.expenseType;
  newName.textContent = newExpense.expenseName;
  newList.append(newType, newName, newAmount, trash);
  transactionList.append(newList);
  expenseModal.classList.add("toggle-modal");
});

transactionList.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-trash")) {
  }
});
