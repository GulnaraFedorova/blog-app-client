# Blog App

Полноценное веб-приложение для ведения блога с возможностью добавления постов, редактирования, удаления, загрузки изображений и видео.

## Демо

- Фронтенд: https://blog-app-client.vercel.app
- Бэкенд: https://blog-app-server-mn0b.onrender.com
- API-документация: https://blog-app-server-mn0b.onrender.com/api-docs/

## Функционал

- Создание, редактирование и удаление постов
- Загрузка изображений и видео
- Фильтрация постов (все посты / только свои)
- Авторизация и аутентификация пользователей

## Поддержка видео

- Видео в формате `.mov` не отображаются в Chrome. Рекомендуется загружать `.mp4`.  

---

## Стек технологий

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

## Запуск проекта

## 1 Клонирование репозитория
#### Клонируем клиент
git clone https://github.com/GulnaraFedorova/blog-app-client.git

#### Клонируем сервер
git clone https://github.com/GulnaraFedorova/blog-app-server.git

## 2 Запуск клиента и сервера

#### 2.1 Настроим переменные окружения
Создай файл `.env` в папке `server/` и добавь:
```env
DB_NAME=blog_db
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=your_host
DB_PORT=5432
JWT_SECRET=your_secret_key
UPLOADS_FOLDER=uploads
```

#### 2.2 Установим зависимости и запустим сервер
```bash
cd server
npm install
npm start
```
По умолчанию сервер запустится на `http://localhost:5000`

#### 2.3 Запуск фронтенда
```bash
cd client
npm install
npm start
```
По умолчанию приложение доступно по адресу: `http://localhost:3000`
