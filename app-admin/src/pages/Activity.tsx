import React,{useEffect,useState} from 'react';
import { Space, Table, Tag, Button } from 'antd';
import type { TableProps } from 'antd';
import myAxios from "../utils/Axios";
import { useNavigate } from 'react-router-dom';

type ActivityDataType ={
    title:String,
    img_url:String,
    desc:String,
    _id:String
}
const Activity:React.FC = () =>{
    const Navigate = useNavigate();
    const columns: TableProps<ActivityDataType>['columns'] = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Desc',
          dataIndex: 'desc',
          key: 'desc',
        },
        {
            title: 'Img',
            dataIndex: 'img_url',
            key: 'img_url',
            render: (text) => <img src={text} alt="" style={{width:"50px"}}/>
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
              <Space size="middle">
                 <Button onClick={()=>add(record._id)} color="primary" variant="solid">
                    Add
                </Button>
                <Button onClick={()=>edit(record._id)} color="default" variant="solid">
                    Edit
                </Button>
                <Button onClick={()=>deleted(record._id)} color="danger" variant="solid">
                    Delete
                </Button>
            </Space>
           ),
        }];
      
      
      
      const data: ActivityDataType[] = [
       
      ];
    async function deleted(id:String) {
        await myAxios.delete(`/Activitys/${id}`);
        setUsers(Users.filter(item=>item._id!==id))
        setLoading(false)
    }
    async function add(id:String) {
        Navigate(`/ActivityAdd/${id}`)
    }
    async function edit(id:String) {
        
    }
    const [Users,setUsers] = useState(data)
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        async function fn (){
           var res = await myAxios.get('/Activitys')
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
        <Table<ActivityDataType> columns={columns} dataSource={Users} />
    )
}
export default Activity