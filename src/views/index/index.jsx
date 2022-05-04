import React from 'react'
import './layout.scss'
import { Layout } from 'antd';
import Aside from './components/aside';


const { Header,  Sider, Content } = Layout;

const Index = () => {
    return (
        <Layout style={{
            height:' 100%',
            width: '100%',
        }}>
            <Sider width='250px'><Aside /></Sider>
           <Layout>
               <Header className='layout-header'>头部</Header>
               <Content className='layout-main'>内容区域</Content>
           </Layout>
        </Layout>
    )
}


export default Index

