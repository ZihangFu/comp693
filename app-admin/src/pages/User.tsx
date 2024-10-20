import React, { useEffect, useState } from 'react';
import { Form, Input, Space, Table, Tag, Button, Modal } from 'antd';
import type { TableProps } from 'antd';
import myAxios from "../utils/Axios";
import { md5 } from "js-md5";

type UserDataType = {
  key: Number,
  _id: string,
  name: string,
  username: string,
  password: string,
  email: string,
  tags: string[]
};


type AddUserFieldType = {
  name?: string;
  username?: string;
  password?: string;
  email?: string;
};

type EditUserFieldType = {
  name: string;
  username: string;
  password: string;
  email: string;
};

const User: React.FC = () => {
  const [addUserForm] = Form.useForm<AddUserFieldType>();
  const [editUserForm] = Form.useForm<EditUserFieldType>();
  const data: UserDataType[] = [];
  const [Users, setUsers] = useState(data)
  const [loading, setLoading] = useState(false)
  const [recordId, setRecordId] = useState(String)
  const [isAdd, setIsAdd] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false);

  const columns: TableProps<UserDataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'UserName',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: () => <Tag color="green" key="nice"> nice </Tag>
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: "email",
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => showModal(2, record._id)} color="default" >Edit</Button>
          <Button onClick={() => showModal(3, record._id)} color="danger" variant="solid">
            Delete
          </Button>
        </Space>
      ),
    }];

  async function addUser(data: AddUserFieldType) {
    try {
      const formData = new FormData();
      formData.append('name', data.name || '');
      formData.append('username', data.username || '');
      formData.append('password', md5(data.password + "md5") || '');
      formData.append('email', data.email || '');
      const res = await myAxios.post(`/users/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { code } = res.data;
      const result = res.data;
      if (code === 200) {
        if (result.message === "success") {
          setTimeout(() => {
            setConfirmLoading(false);
            setLoading(false);
            setIsAdd(false);
            addUserForm.resetFields();
            window.location.reload();
          }, 500);
        } else if (result.message === "registered") {
          addUserForm.setFields([
            {
              name: 'username',
              errors: ['User already registered'],
            },
          ]);
        }
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
        setConfirmLoading(false);
      }, 500);
    }
  }

  async function deleted(id: String) {
    await myAxios.delete(`/users/${id}`);
    setUsers(Users.filter(item => item._id !== id))
    setLoading(false)
  }

  async function updateUser(id: String, data: EditUserFieldType) {
    try {
      const formData = new FormData();
      formData.append('name', data.name || '');
      formData.append('username', data.username || '');
      if (data.password) {
        formData.append('password', md5(data.password + "md5") || '');
      }
      formData.append('email', data.email || '');
      const res = await myAxios.put(`/users/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { code } = res.data;
      const result = res.data;
      if (code === 200) {
        if (result.message === "success") {
          setTimeout(() => {
            setLoading(false);
            setConfirmLoading(false);
            editUserForm.resetFields();
          }, 500);
        }
      }
    } finally {
      setTimeout(() => {
        setIsEdit(false);
        window.location.reload();
      }, 500);
    }
  }

  async function getUser(id: string) {
    try {
      const user = Users.find((user) => user._id === id);
      if (user) {
        editUserForm.setFieldsValue({
          name: user.name,
          username: user.username,
          password: user.password,
          email: user.email,
        });
      } else {
        console.log("None")
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      throw error;
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
          await getUser(recordId);
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
        addUserForm.resetFields();
        break;
      case 2:
        setIsEdit(false);
        editUserForm.resetFields();
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
    addUserForm
      .validateFields()
      .then(values => {
        addUser(values)
      })
      .catch(info => {
        console.log('Validate Failed:', info);
        setConfirmLoading(false);
      });
  };

  const handleEditOk = () => {
    setConfirmLoading(true);
    editUserForm
      .validateFields()
      .then(values => {
        updateUser(recordId, values)
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

  useEffect(() => {
    setLoading(true);
    setIsAdd(false);
    setIsEdit(false);
    setIsDelete(false);
    editUserForm.resetFields();
    async function fn() {
      var res = await myAxios.get('/users')
      let { data: { code, data } } = res;
      if (code === 200) {
        for (let i = 0; i < data.length; i++) {
          data[i].key = i + 1
        }
        setUsers(data)
        setLoading(false)
      }
    }
    fn()
  }, [editUserForm])

  return (
    <>
      <Space size="middle" style={{ paddingBottom: '10px' }}>
        <Button type="primary" onClick={() => showModal(1, "add")}>Add</Button>
      </Space>
      <Table<UserDataType> loading={loading} columns={columns} dataSource={Users} />
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
          form={addUserForm}
          layout="vertical"
          name="addUserForm"
          initialValues={{ name: '', username: '', password: '', email: '' }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please enter the username' }]}

          >
            <Input placeholder="Enter username" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter the password' }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter the email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input placeholder="Enter email" />
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
          form={editUserForm}
          layout="vertical"
          name="editUserForm"
          initialValues={{ name: '', username: '', password: '', email: '' }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please enter the username' }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter the password' }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter the email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input placeholder="Enter email" />
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
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </>
  )
};
export default User