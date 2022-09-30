import React from 'react';
import styled from "styled-components";
import {Button} from 'antd';
import {DeleteOutlined, DownOutlined, UpOutlined} from '@ant-design/icons'

const Card = ({title, desc, children, onUpButton, onDownButton, onDeleteButton}) => {
  return (
    <CardWrapper>
      <Head>
        <Title>{title}</Title>
        <Desc>{desc}</Desc>
      </Head>
      <Body>
        {children}
      </Body>
      <ButtonGroupWrapper>
        <ButtonGroup>
          <Button type={"text"} onClick={onUpButton} icon={<UpOutlined/>}></Button>
          <Button type={"text"} onClick={onDownButton} icon={<DownOutlined/>}></Button>
          <Button type={"text"} onClick={onDeleteButton} icon={<DeleteOutlined/>}></Button>
        </ButtonGroup>
      </ButtonGroupWrapper>
    </CardWrapper>
  );
};

const ButtonGroupWrapper =styled.div`
  position: absolute;
  display: none;
  top: 0;
  left: calc(100%);
`

const ButtonGroup = styled.div`
  background: #ffffff;
  margin-left: 30px;
  border: 1px solid #dddddd;
  border-radius: 5px;
`
const CardWrapper = styled.div`
  border: 1px solid #dddddd;
  width :300px;
  margin: 10px auto;
  background: #ffffff;
  position: relative;
  
  &:hover ${ButtonGroupWrapper} {
    display: block;
  }
`;

const Head = styled.div`
  border-bottom: 1px solid #dddddd;
  padding: 15px;
`

const Title = styled.div`
  font-weight: 600;
`;

const Desc = styled.div`
  color: #666666;
  margin-left: 5px;
`;

const Body = styled.div`
  padding: 15px;
`


export default Card;
