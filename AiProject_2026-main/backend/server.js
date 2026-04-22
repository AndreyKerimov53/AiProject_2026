const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Секретный ключ для JWT
const JWT_SECRET = 'secretkey123';

// Middleware для проверки токена
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'Нет токена, доступ запрещен' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.user.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Неверный токен' });
  }
};

// Настройка multer для сохранения картинок
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/adboard')
  .then(() => console.log('✅ MongoDB подключена'))
  .catch(err => console.log('❌ Ошибка MongoDB:', err));

// ========== СХЕМЫ ==========

// Схема пользователя
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Схема объявления
const adSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  promo: { type: Boolean, default: false },
  src: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Ad = mongoose.model('Ad', adSchema);

// ========== API ПОЛЬЗОВАТЕЛЕЙ ==========

// Регистрация
app.post('/api/users/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Проверяем существование
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    }
    
    const user = new User({ email, password });
    await user.save();
    
    const token = jwt.sign({ user: { id: user._id } }, JWT_SECRET);
    res.json({ token, userId: user._id, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка регистрации' });
  }
});

// Логин
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'Неверный email или пароль' });
    }
    
    if (user.password !== password) {
      return res.status(400).json({ message: 'Неверный email или пароль' });
    }
    
    const token = jwt.sign({ user: { id: user._id } }, JWT_SECRET);
    res.json({ token, userId: user._id, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка логина' });
  }
});

// Получить текущего пользователя
app.get('/api/users/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// ========== API ОБЪЯВЛЕНИЙ ==========

// Получить все объявления
app.get('/api/ads', async (req, res) => {
  try {
    const ads = await Ad.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка загрузки' });
  }
});

// Получить мои объявления
app.get('/api/ads/my', auth, async (req, res) => {
  try {
    const ads = await Ad.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка загрузки' });
  }
});

// Получить одно объявление
app.get('/api/ads/:id', async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ message: 'Объявление не найдено' });
    }
    res.json(ad);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка загрузки' });
  }
});

// Создать объявление
app.post('/api/ads', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, desc, promo } = req.body;
    const src = req.file ? `/uploads/${req.file.filename}` : '';
    
    if (!src) {
      return res.status(400).json({ message: 'Картинка обязательна' });
    }
    
    const ad = new Ad({
      title,
      desc,
      promo: promo === 'true' || promo === true,
      src,
      userId: req.userId
    });
    
    await ad.save();
    res.json(ad);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка создания' });
  }
});

// Обновить объявление
app.put('/api/ads/:id', auth, async (req, res) => {
  try {
    const { title, desc } = req.body;
    const ad = await Ad.findById(req.params.id);
    
    if (!ad) {
      return res.status(404).json({ message: 'Объявление не найдено' });
    }
    
    if (ad.userId !== req.userId) {
      return res.status(403).json({ message: 'Нет прав' });
    }
    
    ad.title = title;
    ad.desc = desc;
    await ad.save();
    
    res.json(ad);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка обновления' });
  }
});

// Удалить объявление
app.delete('/api/ads/:id', auth, async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    
    if (!ad) {
      return res.status(404).json({ message: 'Объявление не найдено' });
    }
    
    if (ad.userId !== req.userId) {
      return res.status(403).json({ message: 'Нет прав' });
    }
    
    await ad.deleteOne();
    res.json({ message: 'Объявление удалено' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка удаления' });
  }
});

// ========== ЗАПУСК ==========
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});