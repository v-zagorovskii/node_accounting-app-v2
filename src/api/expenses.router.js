const { Router } = require('express');
const { expensesService } = require('./../services/expenses.service');

const expensesRouter = Router();

expensesRouter.get('/', async (req, res) => {
  const expenses = await expensesService.getAllExpenses();

  res.json(expenses);
});

expensesRouter.get('/:id', async (req, res) => {
  const expense = await expensesService.getByIdExpense(req.params.id);

  if (!expense) {
    return res.status(404).json({ message: 'Not Found' });
  }

  res.status(200).json(expense);
});

expensesRouter.post('/', async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    return res.sendStatus(400).json({ message: 'Error with params' });
  }

  const expense = await expensesService.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).json(expense);
});

expensesRouter.patch('/:id', async (req, res) => {
  const expense = expensesService.getByIdExpense(req.params.id);
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!expense) {
    return res.status(404).json({ message: 'Not Found' });
  }

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    return res.sendStatus(400).json({ message: 'Error with params' });
  }

  const updatedExpense = expensesService.updateExpense({
    id: req.params.id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(200).json(updatedExpense);
});

expensesRouter.delete('/:id', async (req, res) => {
  const expense = expensesService.getByIdExpense(req.params.id);

  if (!expense) {
    return res.status(404).json({ message: 'Not Found' });
  }

  await expensesService.deleteByIdExpense(req.params.id);

  res.status(204);
});

module.exports = {
  expensesRouter,
};
