import React, { useState } from "react";
import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createPost } from "../api/api";

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const formData = new FormData();
            formData.append("content", values.content.trim());

            if (fileList.length > 0) {
                formData.append("media", fileList[0].originFileObj);
            }

            setLoading(true);
            await createPost(formData);
            message.success("Пост создан");
            setFileList([]);
            form.resetFields();
            onPostCreated();
            onClose();
        } catch (error) {
            message.error("Ошибка при создании поста");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Создание поста"
            open={isOpen}
            onCancel={onClose}
            onOk={handleSubmit}
            confirmLoading={loading}
            okText="Опубликовать"
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
                <Form.Item label="Добавить медиа">
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

export default CreatePostModal;