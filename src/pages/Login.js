import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/api";
import { Button, Input, Form, Card, Typography, message } from "antd";

const { Title, Text } = Typography;

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log("⏳ Отправка запроса на вход:", values);
        setLoading(true);

        try {
            const response = await loginUser(values);
            console.log("Успешный вход:", response.data);

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.userId); 
                localStorage.setItem("userName", response.data.name || "Пользователь");
                message.success(`Добро пожаловать, ${response.data.name || "Пользователь"}!`);

                setTimeout(() => navigate("/blog"), 1500);
            } else {
                throw new Error("Ошибка сервера: токен не получен");
            }
        } catch (error) {
            console.error("Ошибка входа:", error);

            if (error.response) {
                console.log("Ответ сервера:", error.response.data);
                message.error(error.response.data.error || "Ошибка входа, попробуйте снова.");
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
            <Title level={3} style={{ marginBottom: "20px" }}>Вход</Title>

            <Form layout="vertical" onFinish={onFinish} style={{ textAlign: "left" }}>
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
                    rules={[{ required: true, message: "Введите пароль" }]}
                >
                    <Input.Password placeholder="Введите пароль" size="large" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block size="large" loading={loading}>
                        Войти
                    </Button>
                </Form.Item>
            </Form>

            <Text type="secondary">
                Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
            </Text>
        </Card>
    );
};

export default Login;