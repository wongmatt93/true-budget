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
const entertainmentTotal = document.querySelector(".entertainment-total");
const bilsTotal = document.querySelector(".bils-total");
const clothingTotal = document.querySelector(".clothing-total");
const foodTotal = document.querySelector(".food-total");
const miscellaneousTotal = document.querySelector(".miscellaneous-total");
const brokenPiggy = document.querySelector(".broken-piggy");

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

const footerButton = () => {
  expenseModal.classList.remove("toggle-expense");
};
expenseButton.addEventListener("click", footerButton);

const updateExpenseList = () => {
  transactionList.textContent = "";
  expenseArray.forEach((expenses, index) => {
    const newList = document.createElement("tr");
    const newAmount = document.createElement("td");
    const newType = document.createElement("td");
    const newName = document.createElement("td");
    const newTrash = document.createElement("td");
    const trash = document.createElement("i");
    trash.classList.add("fa-solid", "fa-trash");
    trash.setAttribute("data-index", index);
    newAmount.textContent = `$${expenses.expenseValues}`;
    newType.textContent = expenses.expenseType;
    newName.textContent = expenses.expenseName;
    newTrash.append(trash);
    newList.append(newType, newName, newAmount, newTrash);
    transactionList.append(newList);
  });
};

const subTotal = (array) => {
  let entertainmentBudget = 0;
  let billsBudget = 0;
  let clothingBudget = 0;
  let foodBudget = 0;
  let miscellaneousBudget = 0;
  for (let item of array) {
    if (item.expenseType === "Entertainment") {
      entertainmentBudget += parseInt(item.expenseValues);
    } else if (item.expenseType === "Bills") {
      billsBudget += parseInt(item.expenseValues);
    } else if (item.expenseType === "Clothing") {
      clothingBudget += parseInt(item.expenseValues);
    } else if (item.expenseType === "Food") {
      foodBudget += parseInt(item.expenseValues);
    } else {
      miscellaneousBudget += parseInt(item.expenseValues);
    }
  }
  entertainmentTotal.textContent = `Entertainment Total = $${entertainmentBudget}`;
  bilsTotal.textContent = `Bills Total = $${billsBudget}`;
  clothingTotal.textContent = `Clothing Total = $${clothingBudget}`;
  foodTotal.textContent = `Food Total = $${foodBudget}`;
  miscellaneousTotal.textContent = `Miscellaneous Total = $${miscellaneousBudget}`;
};

const addExpense = (event) => {
  event.preventDefault();
  const expenseType = document.querySelector("#categories").value;
  const expenseValues = document.querySelector("#amount").value;
  const expenseName = document.querySelector("#name").value;
  const newExpense = { expenseType, expenseValues, expenseName };
  expenseArray.push(newExpense);
  spent += parseInt(newExpense.expenseValues);
  balance = parseInt(budget) - parseInt(spent);
  if (balance < 0) {
    expenseButton.removeEventListener("click", footerButton);
    brokenPiggy.classList.remove("toggle-piggy");
  }
  remainingBudget.textContent = `$${balance}`;
  totalSpent.textContent = `$${spent}`;
  expenseModal.classList.add("toggle-expense");

  subTotal(expenseArray);

  updateExpenseList();
};
// brokenPiggy.addEventListener("click", (event) => {
//   if (event.target.classList.contains("broken-piggy")) {
//     brokenPiggy.classList.add("toggle-piggy");
//   }
// });

expenseForm.addEventListener("submit", addExpense);

transactionList.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-trash")) {
    const index = event.target.getAttribute("data-index");
    spent -= expenseArray[index].expenseValues;
    balance = parseInt(budget) - parseInt(spent);

    expenseArray.splice(index, 1);
    updateExpenseList();
    subTotal(expenseArray);

    remainingBudget.textContent = `$${balance}`;
    totalSpent.textContent = `$${spent}`;
  }
});

updateExpenseList();
