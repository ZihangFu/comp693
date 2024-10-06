import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input ,notification} from 'antd';


type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

const Login: React.FC = () => {
const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    if(values.username==='admin'&&values.password==='123456'){
        let localUser = values.username?values.username:"";
        localStorage.setItem("username", localUser)
        location.href="/"
        return;
    }
    alert("账号或密码错误")
    };
    
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        return;
    };
    
return(
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 ,margin:"auto",marginTop:"180px" }}
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
      wrapperCol={{ offset: 8, span: 16 }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Login
      </Button>
    </Form.Item>
  </Form>
);
}

export default Login;