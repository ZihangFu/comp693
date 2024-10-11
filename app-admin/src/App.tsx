import React, { useEffect } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import router from './routes/route';
import { Outlet, useNavigate  } from 'react-router-dom';
import { key } from 'localforage';
const { Header, Content, Footer } = Layout;
import {useLogin} from "./hooks/useLogin";

// const items = new Array(15).fill(null).map((_, index) => ({
//   key: index + 1,
//   label: `nav ${index + 1}`,
// }));

const items = [
 {
  label: 'Home',
  key: '/'
 },
 {
  label: 'Activity',
  key: '/activity'
 },
//  {
//   label: 'Comment',
//   key: '/comment'
//  },
 {
  label: 'Page',
  key: '/page'
 },
 {
  label: 'User',
  key: '/user'
 }
];
const App: React.FC = () => {
  const Navigate = useNavigate();
  let check = "/"
  useEffect(()=>{
    if(!useLogin()){
      Navigate('/login')
    }
  },[])
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  function nav (obj:any){
    Navigate(obj.key)
  }
  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[check]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
          onSelect = {e =>{nav(e)}}
        />
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
        My-App ©{new Date().getFullYear()} Created
      </Footer>
    </Layout>
  );
};

export default App;