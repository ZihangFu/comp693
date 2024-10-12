import React, { useEffect, useState } from 'react';
import { Upload, Modal, Form, Input, Select, Space, Table, Button } from 'antd';
import type { TableProps, UploadFile } from 'antd';
import myAxios from "../utils/Axios";
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';

type ActivityDataType = {
    _id: string,
    title: string,
    img_url: string,
    desc: string,
    Pages_id?: string
}

type AddActivityData = {
    title?: string,
    img?: File,
    desc?: string,
    Pages_id?: string
}

type EditActivityData = {
    title?: string,
    img?: File,
    img_url?: string,
    desc?: string,
    Pages_id?: string
}

type PagesDictData = {
    _id: string,
    title: string,
}

const Activity: React.FC = () => {
    // const Navigate = useNavigate();
    const [addActivityForm] = Form.useForm<AddActivityData>();
    const [editActivityForm] = Form.useForm<EditActivityData>();
    const data: ActivityDataType[] = [];
    const [Users, setUsers] = useState(data)
    const [loading, setLoading] = useState(false)
    const [recordId, setRecordId] = useState(String)
    const [isAdd, setIsAdd] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [preview, setPreview] = useState<UploadFile[]>([]);
    const pagesDictData: PagesDictData[] = [];
    const [pagesDict, setPagesDict] = useState(pagesDictData);

    const columns: TableProps<ActivityDataType>['columns'] = [
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
            title: 'Pages',
            dataIndex: 'Pages_id',
            key: 'Pages_id',
            render: (Pages_id) => {
                // Find the matching page title based on Pages_id
                const page = pagesDict.find((p) => p._id === Pages_id);
                return page ? page.title : 'None';
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {/* <Button onClick={() => add(record._id)} color="primary" variant="solid">
                        Add
                    </Button> */}
                    <Button onClick={() => showModal(2, record._id)} color="default" >
                        Edit
                    </Button>
                    <Button onClick={() => showModal(3, record._id)} color="danger" variant="solid">
                        Delete
                    </Button>
                </Space>
            ),
        }];

    // async function add(id: String) {
    //     Navigate(`/ActivityAdd/${id}`)
    // }

    async function addActivity(data: AddActivityData) {
        // await myAxios.post(`/Activitys/`, data);
        const formData = new FormData();
        formData.append('title', data.title || '');
        formData.append('desc', data.desc || '');
        formData.append('Pages_id', data.Pages_id || '');
        if (data.img) {
            formData.append('img', data.img);
        }
        await myAxios.post(`/Activitys/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        setLoading(false)
    }

    async function deleted(id: String) {
        await myAxios.delete(`/Activitys/${id}`);
        setUsers(Users.filter(item => item._id !== id))
        setLoading(false)
    }

    async function editActivity(id: String, data: EditActivityData) {
        // await myAxios.put(`/Activitys/${id}`, data);
        const formData = new FormData();
        formData.append('title', data.title || '');
        formData.append('desc', data.desc || '');
        formData.append('Pages_id', data.Pages_id || '');
        if (data.img) {
            formData.append('img', data.img);
        }
        await myAxios.put(`/Activitys/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        setLoading(false)
    }

    async function getActivity(id: string) {
        try {
            const item = Users.find((item) => item._id === id)
            if (item) {
                editActivityForm.setFieldsValue({
                    title: item.title,
                    desc: item.desc,
                    img_url: item.img_url,
                    Pages_id: item.Pages_id
                });
                setPreview([{ uid: '-1', name: item.img_url.split('/').pop() || '', status: 'done', url: item.img_url }]);
            } else {
                console.log("None")
            }
        } catch (error) {
            console.error('Failed to fetch activity data:', error);
            throw error;
        }

    }

    async function getPagesDict() {
        try {
            const res = await myAxios.get('/pagesDict');
            const { code, data } = res.data;
            if (code === 200) {
                setPagesDict(data);
            }
        } catch (error) {
            console.error('Failed to fetch pagesDict data:', error);
        }
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
                    await getActivity(recordId);
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
                addActivityForm.resetFields();
                break;
            case 2:
                setIsEdit(false);
                editActivityForm.resetFields();
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
        addActivityForm
            .validateFields()
            .then(values => {
                const file = fileList[0]?.originFileObj as File;
                addActivity({ ...values, img: file });
                setTimeout(() => {
                    setIsAdd(false);
                    addActivityForm.resetFields();
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
        editActivityForm
            .validateFields()
            .then(values => {
                const img_url = fileList.length > 0 ? fileList[0].url : '';
                const file = fileList[0]?.originFileObj as File;
                editActivity(recordId, { ...values, img_url, img: file });
                setTimeout(() => {
                    setIsEdit(false);
                    editActivityForm.resetFields();
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
        editActivityForm.setFieldsValue({ img_url: '' });
    };

    useEffect(() => {
        setLoading(true)
        getPagesDict();
        async function fn() {
            var res = await myAxios.get('/Activitys')
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
            <Table<ActivityDataType> columns={columns} dataSource={Users} />
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
                    form={addActivityForm}
                    layout="vertical"
                    name="addActivityForm"
                    initialValues={{ title: '', desc: '', Pages_id: '' }}
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
                    <Form.Item
                        name="Pages_id"
                        label="Pages"
                        rules={[{ required: true, message: 'Please enter the Pages' }]}
                    >
                        <Select placeholder="Select a page">
                            {pagesDict.map((page) => (
                                <Select.Option key={page._id} value={page._id}>
                                    {page.title}
                                </Select.Option>
                            ))}
                        </Select>
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
                    form={editActivityForm}
                    layout="vertical"
                    name="editActivityForm"
                    initialValues={{ title: '', desc: '', img_url: '', Pages_id: '' }}
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
                                        src={editActivityForm.getFieldValue('img_url')}
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
                    <Form.Item
                        name="Pages_id"
                        label="Pages"
                        rules={[{ required: true, message: 'Please enter the Pages' }]}
                    >
                        <Select placeholder="Select a page">
                            {pagesDict.map((page) => (
                                <Select.Option key={page._id} value={page._id}>
                                    {page.title}
                                </Select.Option>
                            ))}
                        </Select>
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
                <p>Are you sure you want to delete this activity?</p>
            </Modal>
        </>
    )
}
export default Activity