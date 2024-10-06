import { Col, Row } from 'antd';
import { useParams } from "react-router-dom";
import React, { useState } from 'react';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// function MyComponent() {
//   const [value, setValue] = useState('');

//   return <ReactQuill theme="snow" value={value} onChange={setValue} />;
// }
import {
    Button,
    Form,
    Input,
    Upload,
  } from 'antd';




const ActivityAdd:React.FC = () => {
    const [value, setValue] = useState('');
      const { TextArea } = Input;
      
      const normFile = (e: any) => {
        console.log(e)
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };
      const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
      };
  const { id } = useParams();
  console.log(id)

  return (
      <Row>
        <Col style={{display:'flex',justifyContent:'center',}} span={24}>
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600}}
      onFinish={onFinish}
    >
      <Form.Item name="title" label="title" style={{marginTop:"100px" }}>
        <Input />
      </Form.Item>
      <Form.Item  label="Desc">
      <ReactQuill theme="snow" style={{minHeight:"300px",minWidth:"300px"}} value={value} onChange={setValue} />
      </Form.Item>
      <Form.Item label="Img" valuePropName="fileList" getValueFromEvent={normFile}>
        <Upload name="logo" action="/upload.do" listType="picture">
        <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit">
        Submit
        </Button>
      </Form.Item>
    </Form>
        </Col>
      </Row>
  );
};
export default ActivityAdd;