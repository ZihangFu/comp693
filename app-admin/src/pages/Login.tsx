import React from 'react';
import type { FormProps } from 'antd';
import { Card, Button, Checkbox, Form, Input } from 'antd';
import './Login.css'; 

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login: React.FC = () => {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    if (values.username === 'admin' && values.password === '123456') {
      let localUser = values.username ? values.username : "";
      localStorage.setItem("username", localUser)
      location.href = "/"
      return;
    }
    alert("Incorrect Username or Password.")
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    return;
  };

  return (
    <>
      <div className="login-container">
        <div className="login-background">
          <div className="logo-container">
            <img src="logo.png" alt="Logo" className="logo" />
            <h1 className="system-name">SocialGather+ System</h1>
          </div>
          <Card style={{ width: '500px', height: '320px', margin: 'auto' }}>
            <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              style={{ margin: "auto", paddingTop: '30px' }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 6, span: 16 }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Button type="primary" htmlType="submit" block>
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Login;