import React, {useState} from 'react';
import MainLayout from "../layouts/MainLayout";
import useSWR from 'swr'
import fetcher from "../lib/fetcher";
import { Table } from "antd";
import {useNavigate} from 'react-router-dom';

const PAGE_SIZE = 20;

const columns = [
  {
    title: '번호',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '제목',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '생성일',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (createdAt) => {
      const time = new Date(createdAt);
      return `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`;
    }
  },
  {
    title: '액션',
    key: 'id',
    dataIndex: 'id',
    render: (key) => {
      return <button onClick={()=> {console.log(key,'삭제')}}>삭제</button>
    },
  }
];

const ListPage = () => {
  const { data, err } = useSWR('/surveys',fetcher);
  const navigate = useNavigate();
  const [page, SetPage] = useState(1);
  console.log('data ',data);


  if(err) {
    return 'error';
  }

  if(!data){
    return 'loading...'
  }

  return (
    <MainLayout selectedKeys={"list"}>
      <Table
        onRow={(record, rowIndex)=> {
          return {
            onClick: event => {
              console.log('onclick',record.id)
              navigate(`/builder/${record.id}`)
            }
          }
        }}
        pagination={{
          total: data.length,
          current: page,
          pageSize: PAGE_SIZE
        }}
        onChange={(pagination) => {
          SetPage(pagination.current)
        }}
        columns={columns} dataSource={data.map((item)=> ({...item, key:item.id}))}/>
    </MainLayout>
  )
};

export default ListPage;
