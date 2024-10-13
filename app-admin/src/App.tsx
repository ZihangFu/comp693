import React, { useState, useEffect } from 'react';
import { Button, Breadcrumb, Layout, Menu, theme, Modal } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;
import { useLogin } from "./hooks/useLogin";

const items = [
  {
    label: 'Home',
    key: '/'
  },
  {
    label: 'Venue',
    key: '/venue'
  },
  {
    label: 'Category',
    key: '/category'
  },
  {
    label: 'User',
    key: '/user'
  }
];
const App: React.FC = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname; 
  const [isModalVisible, setIsModalVisible] = useState(false);


  useEffect(() => {
    if (!useLogin()) {
      Navigate('/login')
    }
  }, [])
  
  const { token: { colorBgContainer, borderRadiusLG },} = theme.useToken();
  function nav(obj: any) {
    Navigate(obj.key)
  }
  // TODO: log out function
  function logout() {
    localStorage.removeItem('userToken'); 
    sessionStorage.removeItem('userToken');
    window.location.href = '/login'; 
  }

  function showLogoutModal() {
    setIsModalVisible(true);
  }

  function handleOk() {
    setIsModalVisible(false);
    logout(); 
  }

  function handleCancel() {
    setIsModalVisible(false);
  }

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[currentPath]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
          onSelect={e => { nav(e) }}
        />
        {/* log out  */}
        <Button
          type="text"
          icon={<LogoutOutlined />}
          onClick={showLogoutModal}
          style={{ color: 'white', fontSize: '16px' }}
        >
          Log Out
        </Button>
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        SocialGather+ ©{new Date().getFullYear()} Created
      </Footer>
      <Modal
        title="Confirm Logout"
        open={isModalVisible}
        onOk={handleOk} 
        onCancel={handleCancel} 
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </Layout>
  );
};

export default App;