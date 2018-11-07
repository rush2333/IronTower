import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import style from './SideMenu.css';
import { Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class SiderMenu extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    render() {
        return (
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className={style.logo} />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                          <Link to='/monitor'>
                            <Icon type="table" />
                            <span>
                            铁塔监控
                            </span>
                          </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                         <Link to='/gps'>                          
                          <Icon type="desktop" />
                          <span>GPS</span>
                          </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                         <Link to='/error'>                          
                            <Icon type="info-circle" theme="outlined" />                        
                          <span>故障记录</span>
                          </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
        );
    }
}

