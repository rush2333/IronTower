import React from 'react';
import {Layout, Menu, Icon} from 'antd';
import SideMenu from '../SideMenu/SideMenu'
import style from './Layout.css'

const { Header, Content, Footer, } = Layout;

class BasicLayout extends React.Component{
    render(){
        const menu = (
            <Menu selectedKeys={[]}>
                <Menu.Item>
                    <Icon type="user" />个人中心
                </Menu.Item>
                <Menu.Item key='logout'>
                    <Icon type="logout" />退出
                </Menu.Item>
            </Menu>
        )
        return(
            <Layout style={{ minHeight: '100vh' }}>
                <SideMenu />
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                            <div className={style.logo}></div>
                    </Header>
                    <Content></Content>
                    <Footer style={{ textAlign: 'center' }}>
                            China Tower ©2018 Created by Rush
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}
export default BasicLayout