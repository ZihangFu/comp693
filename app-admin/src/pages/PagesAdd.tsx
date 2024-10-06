import { Col, Row } from 'antd';
import { useParams } from "react-router-dom";
import React, { useState } from 'react';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import {
    Button,
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Rate,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload,
  } from 'antd';




const PagesAdd:React.FC = () => {
      
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
      <Form.Item name="desc" label="Desc">
        <TextArea rows={4} />
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
export default PagesAdd;