import axios from './utils/http';
import React, { useState } from 'react';
import { Avatar, Space, Form, Modal, Layout, Input, Button } from 'antd';
import { LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import useUserData from './hooks/LoginStatus';
import useVenueData from './hooks/SearchReasult';
const { Header, Content, Footer } = Layout;
const { Search } = Input;

type LoginDataType = {
  username: string,
  password: string
}

type SignUpDataType = {
  name: string,
  username: string,
  password: string,
  email: string,
}

const App: React.FC = () => {
  const userData = useUserData();
  const Navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);
  const [loginForm] = Form.useForm<LoginDataType>();
  const [signupForm] = Form.useForm<SignUpDataType>();
  const { updateVenueData } = useVenueData();
  const [query, setQuery] = useState<string>('');

  const navigateFrontPage = () => {
    Navigate(`/`);
  }

  const navigateSearchResPage = () => {
    if (query) {
      if (location.pathname !== '/searchResult') {
        Navigate(`/searchResult`);
        fetchSearch(query);
      } else {
        window.location.href = '/searchResult';
        fetchSearch(query);
      }
    } else {
      Navigate(`/`);
    }
  }


  const logout = () => {
    localStorage.removeItem('userData');
    sessionStorage.removeItem('userData');
    window.location.href = '/';
  }

  const showModal = async (type: number) => {
    switch (type) {
      case 1:
        setShowLoginModal(true);
        break;
      case 2:
        setShowLogoutModal(true);
        break;
      case 3:
        setShowSignUpModal(true);
        break;
      default:
        console.log("None");
    }
  }

  const handleLoginOk = () => {
    setConfirmLoading(true);
    loginForm
      .validateFields()
      .then(values => {
        loginRequest(values.username, values.password)
        setTimeout(() => {
          setShowLoginModal(false);
          loginForm.resetFields();
          setConfirmLoading(false);
          window.location.reload();
        }, 1000);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
        setConfirmLoading(false);
      });
  }

  const handleLogOutOk = () => {
    setShowLogoutModal(false);
    logout();
  }

  const handleSignUpOk = () => {
    setConfirmLoading(true);
    signupForm
      .validateFields()
      .then(values => {
        signUpRequest(values)
        setTimeout(() => {
          setShowSignUpModal(false);
          signupForm.resetFields();
          setConfirmLoading(false);
          window.location.reload();
        }, 1000);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
        setConfirmLoading(false);
      });
  }

  const handleCancel = (type: number) => {
    switch (type) {
      case 1:
        setShowLoginModal(false);
        break;
      case 2:
        setShowLogoutModal(false);
        break;
      case 3:
        setShowSignUpModal(false);
        break;
      default:
        console.log("None");
    }
  }

  async function loginRequest(username: string, password: string) {
    try {
      const formData = new FormData();
      formData.append('username', username || '');
      formData.append('password', password || '');
      const res = await axios.post(`/login/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { code, data } = res.data;
      if (code === 200) {
        setLoading(false);
        localStorage.setItem('userData', JSON.stringify(data));
      }
    } catch (error) {
      console.error('Failed:', error);
    } finally {
      setLoading(false);
    }
  }

  async function signUpRequest(data: SignUpDataType) {
    await axios.post(`/users/`, data);
    setLoading(false)
  }

  async function fetchSearch(params: string) {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('params', params);
      const res = await axios.post(`/searchVenue/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { code, data } = res.data;
      if (code === 200) {
        updateVenueData(data);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  }



  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }} onClick={navigateFrontPage}>
          <img src="/logo.png" alt="Logo" style={{ height: '32px', marginRight: '16px' }} />
          <h1 style={{ color: 'white', margin: 0 }}>SocialGather+</h1>
        </div>
        <Search
          placeholder="Search in SocialGather+ "
          style={{ width: 400, margin: '0 16px', borderRadius: 20 }}
          onSearch={navigateSearchResPage}
          onChange={(e) => setQuery(e.target.value)}
          loading={loading}
        />
        <div>
          {userData == null ? (
            <>
              <Button onClick={() => showModal(1)} type="link" icon={<LoginOutlined />}>Log In</Button>
              <Button onClick={() => showModal(3)} type="primary">Sign Up</Button>
            </>
          ) : (
            <>
              <Space wrap size={16}>
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                <h4 style={{ color: 'white' }}>{userData.name}</h4>
                <Button
                  type="link"
                  onClick={() => showModal(2)}
                  icon={<LogoutOutlined />}
                >
                  Log Out
                </Button>
              </Space>
            </>
          )}
        </div>
      </Header>
      <Content style={{ padding: '24px 50px' }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        SocialGather+ ©{new Date().getFullYear()} Created
      </Footer>

      {/* login */}
      <Modal
        title="Log In"
        open={showLoginModal}
        onOk={handleLoginOk}
        confirmLoading={confirmLoading}
        onCancel={() => handleCancel(1)}
        loading={loading}
        getContainer={false}
      >
        <Form
          form={loginForm}
          layout="vertical"
          name="loginForm"
          initialValues={{ username: '', password: '' }}
        >
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
        </Form>
      </Modal>

      {/* logout */}
      <Modal
        title="Confirm Logout"
        open={showLogoutModal}
        onOk={handleLogOutOk}
        onCancel={() => handleCancel(2)}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to log out?</p>
      </Modal>

      {/* signup */}
      <Modal
        title="SignUp"
        open={showSignUpModal}
        onOk={handleSignUpOk}
        confirmLoading={confirmLoading}
        onCancel={() => handleCancel(3)}
        loading={loading}
        getContainer={false}
      >
        {/* form */}
        <Form
          form={signupForm}
          layout="vertical"
          name="signupForm"
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

    </Layout>
  );
};

export default App;