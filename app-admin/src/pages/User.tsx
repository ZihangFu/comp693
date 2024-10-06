import React,{useEffect,useState} from 'react';
import { Space, Table, Tag, Button } from 'antd';
import type { TableProps } from 'antd';
import myAxios from "../utils/Axios";

      
type UserDataType ={
    key: Number,
    _id:string,
    username: string,
    password: number,
    email: string,
    tags: string[]
}
const User: React.FC = () => {
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
          title: 'PassWord',
          dataIndex: 'password',
          key: 'password',
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
          dataIndex:"email",
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
              <Space size="middle"> <Button onClick={()=>deleted(record._id)} color="danger" variant="solid">
              Delete
            </Button></Space>
           ),
        }];
      
      
      const data: UserDataType[] = [
       
      ];
    async function deleted(id:String) {
        await myAxios.delete(`/users/${id}`);
        setUsers(Users.filter(item=>item._id!==id))
        setLoading(false)
    }
    const [Users,setUsers] = useState(data)
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        async function fn (){
           var res = await myAxios.get('/users')
           let {data:{code,data}} = res;
           if(code===200){
               for(let i=0;i<data.length;i++){
                data[i].key=i+1
               }
               setUsers(data)
           }
        }
        fn()
    },[])
    return (
        <Table<UserDataType> columns={columns} dataSource={Users} />
    )
};
export default User