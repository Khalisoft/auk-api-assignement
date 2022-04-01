import express from 'express';
import prisma from '../services/prisma';

const router = express.Router();

router.get('', async (_req, res) => {
  try {
    const books = await prisma.books.findMany({ include: { author: true } });
    res.status(200).json(books);
  } catch (err) {
    res.json({ok: false, message: err.message})
  }
});

router.post('/register', async (req, res) => {
  const user = req.body.user;
  try {
    if (user) {
      const result = await prisma.users.create({
        data: user
      })
      res.status(201).json(result);
    } else {
      res.status(400).send('Bad request parameters');
    }
  } catch (err) {
    res.json({ ok: false, message: err.message })
  }
})

router.post('/login', async (req, res) => {
  const user = req.body.user;
  try {
    if (user) {
      const result = await prisma.users.findOne({
        username: user.username
      })
      res.status(201).json({...result, status:"success"});
    } else {
      res.status(400).send('Bad request parameters');
    }
  } catch (err) {
    res.json({ ok: false, message: err.message })
  }
})

export default router;
