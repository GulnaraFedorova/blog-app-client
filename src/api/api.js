import axios from "axios";

const API_URL = "https://blog-app-server-mn0b.onrender.com/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Регистрация
export const registerUser = async (userData) => {
    console.log("Отправка `POST`-запроса:", userData);
    return api.post("/users/register", userData);
};

// Логин
export const loginUser = async (userData) => {
    console.log("Отправка `POST`-запроса:", userData);
    return api.post("/users/login", userData);
};

// Получение всех постов
export const fetchPosts = async () => {
    return api.get("/posts");
};

// Получение токена из localStorage
const getAuthToken = () => {
    return localStorage.getItem("token");
};

// Функция для создания поста (обновленная)
export const createPost = async (formData) => {
    console.log("Отправляем запрос на сервер:", formData);

    const token = getAuthToken();
    if (!token) {
        console.error("Ошибка: Токен отсутствует в localStorage!");
        throw new Error("Пользователь не авторизован.");
    }

    return await axios.post(`${API_URL}/posts`, formData, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });
};

// Редактирование поста
export const updatePost = async (postId, formData) => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Ошибка: Токен отсутствует в localStorage!");
        throw new Error("Пользователь не авторизован.");
    }

    return axios.put(
        `${API_URL}/posts/${postId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
    );
};

// Удаление поста
export const deletePost = async (postId) => {
    const token = getAuthToken();
    if (!token) {
        console.error("Ошибка: Токен отсутствует в localStorage!");
        throw new Error("Пользователь не авторизован.");
    }

    return api.delete(`/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};