import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { updatePost } from "../api/api";

const EditPostModal = ({ isOpen, onClose, post, onPostUpdated }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (post) {
            form.setFieldsValue({ content: post.content });

            if (post.mediaUrl) {
                setFileList([
                    {
                        uid: "-1",
                        name: "Текущее изображение",
                        url: post.mediaUrl.startsWith("http") ? post.mediaUrl : `https://blog-app-server-mn0b.onrender.com${post.mediaUrl}`,
                    },
                ]);
            }
        }
    }, [post, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const formData = new FormData();
            formData.append("content", values.content.trim());

            if (fileList.length > 0 && fileList[0].originFileObj) {
                formData.append("media", fileList[0].originFileObj);
            } else if (post?.mediaUrl) {
                formData.append("mediaUrl", post.mediaUrl);
            }

            setLoading(true);
            await updatePost(post.id, formData);
            message.success("Пост обновлён");
            setFileList([]);
            onPostUpdated();
            onClose();
        } catch (error) {
            message.error("Ошибка при редактировании поста");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Редактирование поста"
            open={isOpen}
            onCancel={onClose}
            onOk={handleSubmit}
            confirmLoading={loading}
            okText="Сохранить"
            cancelText="Отмена"
        >
            <Form layout="vertical" form={form}>
                <Form.Item
                    name="content"
                    label="Текст поста"
                    rules={[{ required: true, message: "Введите текст" }]}
                >
                    <Input.TextArea rows={4} placeholder="Введите текст поста" />
                </Form.Item>
                <Form.Item label="Заменить изображение">
                    <Upload
                        beforeUpload={() => false}
                        fileList={fileList}
                        onChange={({ fileList }) => setFileList(fileList)}
                        onRemove={() => setFileList([])}
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>Выбрать файл</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditPostModal;