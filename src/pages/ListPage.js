import React, {useMemo, useState} from 'react';
import MainLayout from "../layouts/MainLayout";
import useSWR from 'swr'
import fetcher from "../lib/fetcher";
import {Button, Table} from "antd";
import {useNavigate} from 'react-router-dom';
import styled from "styled-components";
import deleteSurvey from "../service/deleteSurvey";

const PAGE_SIZE = 20;


const ListPage = () => {
  const { data, err, mutate } = useSWR('/surveys?_sort=id&_order=desc',fetcher);
  const navigate = useNavigate();
  const [page, SetPage] = useState(1);
  console.log('data ',data);

  const columns = useMemo(() => ([
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
      key: 'action',
      dataIndex: 'id',
      render: (id) => {
        return (
          <Button danger
                  onClick={(e)=> {
                    deleteSurvey(id).then(() => {mutate();});
                    e.stopPropagation();
                    e.preventDefault();
                  }}
          >삭제
          </Button>)
      },
    }
  ]), [mutate])



  if(err) {
    return 'error';
  }

  if(!data){
    return 'loading...'
  }

  return (
    <MainLayout selectedKeys={"list"}>
      <CreateButtonWrapper>
        <Button onClick={() => {navigate('/builder')}}>새로운 설문조사 생성</Button>
      </CreateButtonWrapper>
      <Table
        onRow={(record, rowIndex)=> {
          return {
            onClick: event => {
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

const CreateButtonWrapper = styled.div`
  text-align: right;
  margin-bottom: 25px;
`

export default ListPage;
