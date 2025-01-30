import React, { useEffect, useState } from "react";
import { fetchPosts, deletePost } from "../api/api";
import { Card, Button, message, Typography, Select } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import ru from "date-fns/locale/ru";
import CreatePostModal from "./CreatePostModal";
import EditPostModal from "./EditPostModal";

const { Title, Text } = Typography;
const BASE_URL = "https://blog-app-server-mn0b.onrender.com";

// Функция для получения корректного URL медиафайла
const getMediaUrl = (mediaUrl) => mediaUrl ? (mediaUrl.startsWith("http") ? mediaUrl : `${BASE_URL}${mediaUrl}`) : null;

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [filter, setFilter] = useState("all");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const userId = Number(localStorage.getItem("userId")) || null;

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            const response = await fetchPosts();
            setPosts(response.data);
        } catch {
            message.error("Ошибка загрузки постов");
        }
    };

    const handleDelete = async (postId) => {
        try {
            await deletePost(postId);
            message.success("Пост удалён!");
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        } catch {
            message.error("Ошибка при удалении поста");
        }
    };

    return (
        <div style={{
            maxWidth: "700px",
            margin: "50px auto",
            padding: "20px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}>
            <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>Блог</Title>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsCreateModalOpen(true)}>
                    Добавить пост
                </Button>
                <Select
                    value={filter}
                    onChange={(value) => setFilter(value)}
                    options={[
                        { value: "all", label: "Все посты" },
                        { value: "my", label: "Мои посты" },
                    ]}
                    style={{ width: 150 }}
                />
            </div>

            {posts.length === 0 ? (
                <Text type="secondary">Нет записей</Text>
            ) : (
                posts
                    .filter(post => filter === "all" || Number(post.authorId) === userId)
                    .map((post) => (
                        <Card
                            key={post.id}
                            style={{ marginBottom: "15px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                        >
                            <Text strong>{post.author?.name || "Аноним"}</Text>
                            <Text type="secondary" style={{ display: "block", fontSize: "12px", marginBottom: "10px" }}>
                                {format(new Date(post.createdAt), "dd MMMM yyyy HH:mm", { locale: ru })}
                            </Text>
                            <p>{post.content}</p>

                            {/* Отображение медиафайлов */}
                            {post.mediaUrl && (
                                <div style={{ marginTop: "10px" }}>
                                    {post.mediaUrl.endsWith(".mp4") ? (
                                        <video
                                            controls
                                            style={{ width: "100%", borderRadius: "8px" }}
                                            preload="metadata"
                                            onError={(e) => console.error("Ошибка загрузки видео:", e)}
                                        >
                                            <source src={getMediaUrl(post.mediaUrl)} type="video/mp4" />
                                            Ваш браузер не поддерживает видео.
                                        </video>
                                    ) : (
                                        <img
                                            src={getMediaUrl(post.mediaUrl)}
                                            alt="Медиа"
                                            style={{ maxWidth: "100%", borderRadius: "8px" }}
                                        />
                                    )}
                                </div>
                            )}

                            {/* Кнопки редактирования и удаления */}
                            {Number(userId) === Number(post.authorId) && (
                                <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                                    <Button icon={<EditOutlined />} onClick={() => setEditingPost(post)}>
                                        Редактировать
                                    </Button>
                                    <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(post.id)}>
                                        Удалить
                                    </Button>
                                </div>
                            )}
                        </Card>
                    ))
            )}

            {/* Модальное окно создания поста */}
            <CreatePostModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onPostCreated={loadPosts}
            />

            {/* Модальное окно редактирования поста */}
            <EditPostModal
                isOpen={!!editingPost}
                onClose={() => setEditingPost(null)}
                post={editingPost}
                onPostUpdated={loadPosts}
            />
        </div>
    );
};

export default Blog;