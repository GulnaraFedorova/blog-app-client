# 🚀 Blog App

Полноценное приложение для ведения блога с возможностью загрузки изображений и видео.

## 📌 Функционал

- 📄 Создание, редактирование и удаление постов
- 📷 Загрузка изображений и видео
- 🏷️ Фильтрация постов (все посты / только свои)
- 🔑 Авторизация и аутентификация пользователей

## 🎥 Поддержка видео

- Видео в формате `.mov` не отображаются в Chrome. Рекомендуется загружать `.mp4`.  


## 📦 Стек технологий

**Frontend:**
- React.js
- Ant Design (UI)
- Axios (запросы к API)
- Date-fns (форматирование дат)

**Backend:**
- Node.js + Express
- PostgreSQL + Sequelize ORM
- Multer (загрузка файлов)
- JSON Web Token (JWT) для аутентификации

---

## 🚀 Запуск проекта

### 1️⃣ Клонирование репозитория
```bash
 git clone https://github.com/GulnaraFedorova/blog-app-client.git
 cd blog-app
```

### 2️⃣ Запуск сервера

#### 2.1 Настроим переменные окружения
Создай файл `.env` в папке `server/` и добавь:
```env
DB_NAME=blog_db
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=your_host
DB_PORT=5432
JWT_SECRET=your_secret_key
```

#### 2.2 Установим зависимости и запустим сервер
```bash
cd server
npm install
npm start
```
По умолчанию сервер запустится на `http://localhost:5000`

### 3️⃣ Запуск фронтенда
```bash
cd client
npm install
npm start
```
По умолчанию приложение доступно по адресу: `http://localhost:3000`
