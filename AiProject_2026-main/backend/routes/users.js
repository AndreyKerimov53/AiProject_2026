const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'secretkey123';

// Регистрация
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Проверяем, существует ли пользователь
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    }
    
    // Создаем пользователя
    user = new User({ email, password });
    await user.save();
    
    // Создаем токен
    const token = jwt.sign({ user: { id: user._id } }, JWT_SECRET);
    
    res.json({ 
      token, 
      userId: user._id, 
      email: user.email 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Логин
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Ищем пользователя
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Неверный email или пароль' });
    }
    
    // Проверяем пароль (временно без хеширования)
    if (user.password !== password) {
      return res.status(400).json({ message: 'Неверный email или пароль' });
    }
    
    // Создаем токен
    const token = jwt.sign({ user: { id: user._id } }, JWT_SECRET);
    
    res.json({ 
      token, 
      userId: user._id, 
      email: user.email 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Получить текущего пользователя
router.get('/me', async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ message: 'Нет токена' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.user.id).select('-password');
    
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: 'Неверный токен' });
  }
});

module.exports = router;