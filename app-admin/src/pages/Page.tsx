import React, { useEffect, useState } from 'react';
import { Upload, Modal, Form, Input, Space, Table, Button } from 'antd';
import type { TableProps, UploadFile } from 'antd';
import myAxios from "../utils/Axios";
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

// import { useNavigate } from 'react-router-dom';

type PagesDataType = {
    title: string,
    desc: string,
    img_url: string,
    _id: string
}

type AddPagesData = {
    title?: string,
    desc?: string,
    img?: File,
}

type EditPagesData = {
    title?: string,
    desc?: string,
    img_url?: string,
    img?: File,
}

const Page: React.FC = () => {
    const [addPageForm] = Form.useForm<AddPagesData>();
    const [editPageForm] = Form.useForm<EditPagesData>();
    const data: PagesDataType[] = [];
    const [Users, setUsers] = useState(data)
    const [loading, setLoading] = useState(false)
    const [recordId, setRecordId] = useState(String)
    const [isAdd, setIsAdd] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [preview, setPreview] = useState<UploadFile[]>([]);

    const columns: TableProps<PagesDataType>['columns'] = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Desc',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: 'Img',
            dataIndex: 'img_url',
            key: 'img_url',
            render: (text) => <img src={text} alt="" style={{ width: "50px" }} />
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => showModal(2, record._id)} color="default">
                        Edit
                    </Button>
                    <Button onClick={() => showModal(3, record._id)} color="danger" variant="solid">
                        Delete
                    </Button>
                </Space>
            ),
        }];

    async function deleted(id: String) {
        await myAxios.delete(`/pages/${id}`);
        setUsers(Users.filter(item => item._id !== id))
        setLoading(false)
    }

    async function getPage(id: string) {
        try {
            const item = Users.find((item) => item._id === id)
            if (item) {
                editPageForm.setFieldsValue({
                    title: item.title,
                    desc: item.desc,
                    img_url: item.img_url
                });
                setPreview([{ uid: '-1', name: item.img_url.split('/').pop() || '', status: 'done', url: item.img_url }]);
            } else {
                console.log("None")
            }
        } catch (error) {
            console.error('Failed to fetch page data:', error);
            throw error;
        }

    }

    async function addPage(data: AddPagesData) {
        const formData = new FormData();
        formData.append('title', data.title || '');
        formData.append('desc', data.desc || '');
        if (data.img) {
            formData.append('img', data.img);
        }
        await myAxios.post(`/pages/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        setLoading(false);
    }

    async function editPage(id: String, data: EditPagesData) {
        const formData = new FormData();
        formData.append('title', data.title || '');
        formData.append('desc', data.desc || '');
        if (data.img) {
            formData.append('img', data.img);
        }
        await myAxios.put(`/pages/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        setLoading(false)
    }

    const showModal = async (type: number, recordId: string) => {
        switch (type) {
            case 1:
                setIsAdd(true);
                break;
            case 2:
                setIsEdit(true);
                setRecordId(recordId);
                setLoading(true);
                try {
                    await getPage(recordId);
                    console.log(type);
                } catch (error) {
                    console.error('Failed to load user data:', error);
                } finally {
                    setTimeout(() => {
                        setLoading(false);
                    }, 500);
                }
                break;
            case 3:
                setIsDelete(true);
                setRecordId(recordId);
                break;
            default:
                console.log("None");
        }
    };

    const handleCancel = (type: number) => {
        switch (type) {
            case 1:
                setIsAdd(false);
                addPageForm.resetFields();
                break;
            case 2:
                setIsEdit(false);
                editPageForm.resetFields();
                break;
            case 3:
                setIsDelete(false);
                break;
            default:
                console.log("None");
        }
    };

    const handleAddOk = () => {
        setConfirmLoading(true);
        addPageForm
            .validateFields()
            .then(values => {
                const file = fileList[0]?.originFileObj as File;
                addPage({ ...values, img: file });
                setTimeout(() => {
                    setIsAdd(false);
                    addPageForm.resetFields();
                    setFileList([]);
                    setConfirmLoading(false);
                    window.location.reload();
                }, 1500);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
                setConfirmLoading(false);
            });
    };

    const handleDeleteOk = () => {
        setConfirmLoading(true);
        deleted(recordId);
        setTimeout(() => {
            setIsDelete(false);
            setRecordId("");
            setConfirmLoading(false);
        }, 1000);
    };

    const handleEditOk = () => {
        setConfirmLoading(true);
        editPageForm
            .validateFields()
            .then(values => {
                const img_url = fileList.length > 0 ? fileList[0].url : '';
                const file = fileList[0]?.originFileObj as File;
                editPage(recordId, { ...values, img_url, img: file });
                setTimeout(() => {
                    setIsEdit(false);
                    editPageForm.resetFields();
                    setFileList([]);
                    setPreview([]);
                    setConfirmLoading(false);
                    window.location.reload();
                }, 1500);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
                setConfirmLoading(false);
            });

    };

    const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
        setFileList(fileList);
    };

    const handleDeleteImage = (event: React.MouseEvent) => {
        event.stopPropagation();
        setPreview([]);
        setFileList([]);
        editPageForm.setFieldsValue({ img_url: '' });
    };

    useEffect(() => {
        setLoading(true)
        async function fn() {
            var res = await myAxios.get('/pages')
            let { data: { code, data } } = res;
            if (code === 200) {
                for (let i = 0; i < data.length; i++) {
                    data[i].key = i + 1
                }
                setUsers(data)
            }
        }
        fn()
    }, [])

    return (
        <>
            <Space size="middle" style={{ paddingBottom: '10px' }}>
                <Button type="primary" onClick={() => showModal(1, "add")} >Add</Button>
            </Space>
            <Table<PagesDataType> columns={columns} dataSource={Users} />
            {/* add */}
            <Modal
                title="Add"
                open={isAdd}
                onOk={handleAddOk}
                confirmLoading={confirmLoading}
                onCancel={() => handleCancel(1)}
            >
                {/* form */}
                <Form
                    form={addPageForm}
                    layout="vertical"
                    name="addPageForm"
                    initialValues={{ title: '', desc: '' }}
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please enter the title' }]}
                    >
                        <Input placeholder="Enter title" />
                    </Form.Item>
                    <Form.Item
                        name="desc"
                        label="Desc"
                        rules={[{ required: true, message: 'Please enter the desc' }]}

                    >
                        <Input placeholder="Enter desc" />
                    </Form.Item>
                    <Form.Item
                        name="img"
                        label="Image"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                        rules={[{ required: true, message: 'Please upload an image' }]}
                    >
                        <Upload
                            listType="picture"
                            accept="image/*"
                            maxCount={1}
                            beforeUpload={() => false}
                            onChange={handleFileChange}
                        >
                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
            {/* edit */}
            <Modal
                title="Edit"
                open={isEdit}
                onOk={handleEditOk}
                confirmLoading={confirmLoading}
                onCancel={() => handleCancel(2)}
                loading={loading}
                getContainer={false}
            >
                {/* form */}
                <Form
                    form={editPageForm}
                    layout="vertical"
                    name="editPageForm"
                    initialValues={{ title: '', desc: '' }}
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please enter the title' }]}
                    >
                        <Input placeholder="Enter title" />
                    </Form.Item>
                    <Form.Item
                        name="desc"
                        label="Desc"
                        rules={[{ required: true, message: 'Please enter the desc' }]}

                    >
                        <Input placeholder="Enter desc" />
                    </Form.Item>
                    <Form.Item
                        name="img"
                        label="Image"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                        rules={[{ required: true, message: 'Please upload an image' }]}
                    >
                        <Upload
                            listType="picture"
                            accept="image/*"
                            maxCount={1}
                            beforeUpload={() => false}
                            onChange={handleFileChange}
                        >
                            {preview.length > 0 ? (
                                <div>
                                    <img
                                        src={editPageForm.getFieldValue('img_url')}
                                        alt=""
                                        style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', marginTop: 8 }}
                                    />
                                    <Button
                                        icon={<DeleteOutlined />}
                                        onClick={handleDeleteImage}
                                        style={{ marginTop: 8 }}
                                        danger
                                    >
                                        Delete Image
                                    </Button>
                                </div>
                            ) : (
                                <Button icon={<UploadOutlined />}>Upload Image</Button>
                            )}
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
            {/* delete */}
            <Modal
                title="Delete"
                open={isDelete}
                onOk={handleDeleteOk}
                confirmLoading={confirmLoading}
                onCancel={() => handleCancel(3)}
            >
                {/* info */}
                <p>Are you sure you want to delete this page?</p>
            </Modal>
        </>
    )
}
export default Page