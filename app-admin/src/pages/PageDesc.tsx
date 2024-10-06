import React,{useState,useEffect} from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import { useParams } from 'react-router-dom';
import { getPageDesc } from '../utils/PagesDescEdit';


const PageDest: React.FC = () => {
    const {id} = useParams();
     const [FormValue,setFormValue] = useState([]);
    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
        setFormValue(values)
      };
      useEffect(()=>{
        async function fn (){
            let {data} = await getPageDesc("670038f2437bf92b35ccc2ca")
            let last_data = data.data[0];
            last_data.desc = FormValue;
        }
        fn()
      },[FormValue])
    return (

    <Form
    name="dynamic_form_nest_item"
    onFinish={onFinish}
    style={{ maxWidth: 600 }}
    autoComplete="off"
    initialValues={{pageList:[]}}
  >
    <Form.List name="pageList">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
              <Form.Item
                {...restField}
                name={[name, 'first']}
                rules={[{ required: true, message: 'Missing  name' }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'last']}
                rules={[{ required: true, message: 'Missing value' }]}
              >
                <Input placeholder="value" />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add Desc
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);
}
export default PageDest;