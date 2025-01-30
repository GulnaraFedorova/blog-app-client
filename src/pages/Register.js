import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";

const { Title, Text } = Typography;

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleRegister = async (values) => {
        console.log("Отправка данных на сервер:", values);
        setLoading(true);
    
        try {
            const response = await registerUser(values);
            console.log("Успешная регистрация:", response.data);
    
            // Сохраняем токен и данные пользователя
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.id);
            localStorage.setItem("userName", response.data.name || response.data.email);
    
            message.success(`Регистрация успешна! Добро пожаловать, ${response.data.name || response.data.email}`);
    
            // Перенаправляем сразу в блог
            setTimeout(() => navigate("/blog"), 2000);
        } catch (error) {
            console.error("Ошибка регистрации:", error);
    
            if (error.response) {
                console.log("⚠️ Ответ сервера:", error.response.data);
                message.error(error.response.data.error || "Ошибка регистрации, попробуйте снова.");
            } else {
                message.error("Ошибка сети, попробуйте позже.");
            }
        } finally {
            setLoading(false);
        }
    };    

    return (
        <Card
            style={{
                maxWidth: 400,
                margin: "50px auto",
                padding: "30px",
                textAlign: "center",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
        >
            <Title level={3} style={{ marginBottom: "20px" }}>Регистрация</Title>

            <Form
                layout="vertical"
                onFinish={handleRegister}
                style={{ textAlign: "left" }}
            >
                <Form.Item
                    label="Имя"
                    name="name"
                    rules={[
                        { required: true, message: "Введите ваше имя" },
                        { min: 2, message: "Имя должно содержать минимум 2 символа" }
                    ]}
                >
                    <Input placeholder="Введите имя" size="large" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Введите ваш email" },
                        { type: "email", message: "Некорректный email" },
                    ]}
                >
                    <Input placeholder="Введите email" size="large" />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[
                        { required: true, message: "Введите пароль" },
                        { min: 6, message: "Пароль должен содержать минимум 6 символов" }
                    ]}
                >
                    <Input.Password placeholder="Введите пароль" size="large" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block size="large" loading={loading}>
                        Зарегистрироваться
                    </Button>
                </Form.Item>
            </Form>

            <Text type="secondary">
                Уже есть аккаунт? <Link to="/login">Войти</Link>
            </Text>
        </Card>
    );
};

export default Register;