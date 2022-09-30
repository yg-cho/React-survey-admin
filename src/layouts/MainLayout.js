import { Layout, Menu } from 'antd';
import {Link} from "react-router-dom";
import {useMemo} from "react";

const { Header, Content, Sider } = Layout;


const MainLayout = ({ selectedKeys, children}) => {
  const contentStyle = useMemo(() => {
    return {padding: 45};
  },[])

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider>
        <div className="logo" style={{height: 32, margin: 16, background: "rgba(255,25,255,0.3)" }}/>
        <Menu theme={"dark"} defaultSelectedKeys={selectedKeys} mode="inline" >
          <Menu.Item key={"list"}><Link to={"/list"}>설문조사 관리</Link></Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header/>
        <Content style={contentStyle}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
