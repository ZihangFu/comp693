import React,{useEffect,useState} from 'react';
import { Space, Table, Tag, Button } from 'antd';
import type { TableProps } from 'antd';
import myAxios from "../utils/Axios";

type CommentDataType ={
    title:String,
    hots:Number,
    Activity_id:string
    _id:string
}
const Activity:React.FC = () =>{
    const columns: TableProps<CommentDataType>['columns'] = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Hots',
          dataIndex: 'hots',
          key: 'hots',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
              <Space size="middle">
                 <Button onClick={()=>add(record._id)} color="danger" variant="solid">
                    Add
                </Button>
                <Button onClick={()=>edit(record._id)} color="danger" variant="solid">
                    Edit
                </Button>
                <Button onClick={()=>deleted(record._id)} color="danger" variant="solid">
                    Deleted
                </Button>
            </Space>
           ),
        }];
      
      
      
      const data: CommentDataType[] = [
       
      ];
    async function deleted(id:String) {
        await myAxios.delete(`/comment/${id}`);
        setUsers(Users.filter(item=>item._id!==id))
        setLoading(false)
    }
    async function add(id:string) {
        
    }
    async function edit(id:string) {
        
    }
    const [Users,setUsers] = useState(data)
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        async function fn (){
           var res = await myAxios.get('/comment')
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
        <Table<CommentDataType> columns={columns} dataSource={Users} />
    )
}
export default Activity;