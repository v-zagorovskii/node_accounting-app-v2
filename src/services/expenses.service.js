'use strict';

let expenses = [];

function getAllExpenses() {
  return expenses;
}

function getByIdExpense(id) {
  return expenses.find((item) => item.id === id);
}

function createExpense(userId, spentAt, title, amount, category, note) {
  const expense = {
    id: '0',
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
}

function deleteByIdExpense(id) {
  const newExpenses = expenses.filter((item) => item.id !== id);

  expenses = newExpenses;
}

function updateExpense(id, spentAt, title, amount, category, note) {
  const targetExpense = getByIdExpense(id);

  if (!targetExpense) {
    return;
  }

  Object.assign(targetExpense, {
    spentAt,
    title,
    amount,
    category,
    note,
  });
}

const expensesService = {
  getAllExpenses,
  getByIdExpense,
  createExpense,
  deleteByIdExpense,
  updateExpense,
};

module.exports = {
  expensesService,
};
