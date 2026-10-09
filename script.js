const defaultBudget = 2500;

const expenses = [
  { id: 1, name: 'Groceries', category: 'Food', amount: 180 },
  { id: 2, name: 'Fuel', category: 'Transport', amount: 90 },
  { id: 3, name: 'Streaming', category: 'Entertainment', amount: 20 },
  { id: 4, name: 'Electricity', category: 'Utilities', amount: 110 }
];

const totalBudgetElement = document.getElementById('total-budget');
const totalExpensesElement = document.getElementById('total-expenses');
const remainingBudgetElement = document.getElementById('remaining-budget');
const budgetStatusElement = document.getElementById('budget-status');
const categorySummaryElement = document.getElementById('category-summary');
const expenseTableBody = document.getElementById('expense-table-body');
const expenseForm = document.getElementById('expense-form');
const budgetInput = document.getElementById('budget-input');
const saveBudgetButton = document.getElementById('save-budget');
const resetBudgetButton = document.getElementById('reset-budget');

let monthlyBudget = defaultBudget;

function formatCurrency(value) {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(value);
}

function calculateTotalExpenses() {
  let total = 0;

  for (const expense of expenses) {
    total += expense.amount;
  }

  return total;
}

function getCategoryTotals() {
  const categoryTotals = {};

  for (const expense of expenses) {
    if (!categoryTotals[expense.category]) {
      categoryTotals[expense.category] = 0;
    }

    categoryTotals[expense.category] += expense.amount;
  }

  return categoryTotals;
}

function getBudgetStatusMessage(remainingBudget) {
  if (remainingBudget < 0) {
    return {
      text: 'Your spending is above budget. Reduce some costs this month.',
      type: 'danger'
    };
  }

  if (remainingBudget <= monthlyBudget * 0.2) {
    return {
      text: 'You are near your limit. Keep an eye on your next purchases.',
      type: 'warning'
    };
  }

  return {
    text: 'You are on track and still have room in your budget.',
    type: 'success'
  };
}

function renderCategorySummary() {
  const categoryTotals = getCategoryTotals();
  const entries = Object.entries(categoryTotals);

  if (entries.length === 0) {
    categorySummaryElement.innerHTML = '<li class="empty-state">No expenses yet.</li>';
    return;
  }

  const items = entries
    .map(([category, total]) => {
      return `<li><span>${category}</span><strong>${formatCurrency(total)}</strong></li>`;
    })
    .join('');

  categorySummaryElement.innerHTML = items;
}

function renderExpenses() {
  if (expenses.length === 0) {
    expenseTableBody.innerHTML = '<tr><td colspan="4" class="empty-state">No expenses added yet.</td></tr>';
    return;
  }

  expenseTableBody.innerHTML = expenses
    .map(
      (expense) => `
        <tr>
          <td>${expense.name}</td>
          <td>${expense.category}</td>
          <td>${formatCurrency(expense.amount)}</td>
          <td><button class="delete-btn" data-id="${expense.id}" type="button">Delete</button></td>
        </tr>
      `
    )
    .join('');
}

function updateDashboard() {
  const totalExpenses = calculateTotalExpenses();
  const remainingBudget = monthlyBudget - totalExpenses;
  const status = getBudgetStatusMessage(remainingBudget);

  totalBudgetElement.textContent = formatCurrency(monthlyBudget);
  totalExpensesElement.textContent = formatCurrency(totalExpenses);
  remainingBudgetElement.textContent = formatCurrency(remainingBudget);

  budgetStatusElement.textContent = status.text;
  budgetStatusElement.className = `status-box ${status.type}`;

  renderCategorySummary();
  renderExpenses();
}

function addExpense(event) {
  event.preventDefault();

  const expenseName = document.getElementById('expense-name').value.trim();
  const expenseCategory = document.getElementById('expense-category').value;
  const expenseAmount = Number(document.getElementById('expense-amount').value);

  if (!expenseName || Number.isNaN(expenseAmount) || expenseAmount <= 0) {
    return;
  }

  expenses.push({
    id: Date.now(),
    name: expenseName,
    category: expenseCategory,
    amount: expenseAmount
  });

  expenseForm.reset();
  updateDashboard();
}

function removeExpense(event) {
  const target = event.target;

  if (!target.classList.contains('delete-btn')) {
    return;
  }

  const idToDelete = Number(target.dataset.id);
  const index = expenses.findIndex((expense) => expense.id === idToDelete);

  if (index !== -1) {
    expenses.splice(index, 1);
    updateDashboard();
  }
}

function updateBudget() {
  const newBudget = Number(budgetInput.value);

  if (Number.isNaN(newBudget) || newBudget < 0) {
    return;
  }

  monthlyBudget = newBudget;
  updateDashboard();
}

function resetBudget() {
  monthlyBudget = defaultBudget;
  budgetInput.value = defaultBudget;
  updateDashboard();
}

saveBudgetButton.addEventListener('click', updateBudget);
resetBudgetButton.addEventListener('click', resetBudget);
expenseForm.addEventListener('submit', addExpense);
expenseTableBody.addEventListener('click', removeExpense);

budgetInput.value = monthlyBudget;
updateDashboard();
